import { Question, UserProgressItem, UserStats, UserSettings } from '../types/quiz';
import { SEED_QUESTIONS, SEED_VERSION } from '../data/seedQuestions';

const DB_NAME = 'FortiQuestDB';
const DB_VERSION = 1;
const STORE_QUESTIONS = 'questions';
const STORE_PROGRESS = 'progress';
const STORE_META = 'metadata';

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: false,
  timerEnabled: false,
  timerDuration: 30,
};

export const DEFAULT_STATS: UserStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  lastStudyDate: new Date().toISOString().split('T')[0],
};

// Listener notified after any write (used by cloud sync)
let storageChangeListener: (() => void) | null = null;
export function setStorageChangeListener(fn: (() => void) | null) {
  storageChangeListener = fn;
}

// Open or create IndexedDB
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_QUESTIONS)) {
        db.createObjectStore(STORE_QUESTIONS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
        db.createObjectStore(STORE_PROGRESS, { keyPath: 'questionId' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function syncQuestionsWithSeed(
  existingQuestions: Question[],
  seedQuestions: Question[],
  appliedSeedVersion: number,
  targetSeedVersion: number
): { questions: Question[]; updated: boolean; newVersion: number } {
  if (appliedSeedVersion >= targetSeedVersion) {
    return { questions: existingQuestions, updated: false, newVersion: appliedSeedVersion };
  }

  const seedMap = new Map(seedQuestions.map((s) => [s.id, s]));
  let updated = false;

  const questions = existingQuestions.map((q) => {
    // B1: DO NOT overwrite questions marked as modified by the user
    if (q.isModified) {
      return q;
    }

    const seed = seedMap.get(q.id);
    if (seed) {
      updated = true;
      const existingBlocks = q.blocks || [];
      const seedBlocks = seed.blocks.map((sb) => {
        if (sb.type === 'image') {
          const existingImg = existingBlocks.find((eb) => eb.id === sb.id && eb.url);
          if (existingImg && existingImg.url) {
            return { ...sb, url: existingImg.url, pending: false };
          }
        }
        return sb;
      });

      return {
        ...q,
        domain: seed.domain,
        options: seed.options,
        kind: seed.kind,
        correctAnswers: seed.correctAnswers,
        isMultipleChoice: seed.isMultipleChoice,
        requiredAnswersCount: seed.requiredAnswersCount,
        explanation: seed.explanation,
        blocks: seedBlocks,
      };
    }
    return q;
  });

  // Questions added to the seed after the user's first visit (e.g. docs 79–93 in seed v5)
  const existingIds = new Set(questions.map((q) => q.id));
  for (const seed of seedQuestions) {
    if (!existingIds.has(seed.id)) {
      questions.push(seed);
      updated = true;
    }
  }

  return { questions, updated, newVersion: targetSeedVersion };
}

export async function initStorage(): Promise<{
  questions: Question[];
  progress: Record<string, UserProgressItem>;
  stats: UserStats;
  settings: UserSettings;
}> {
  const db = await openDB();

  // Load questions
  let questions = await getAllFromStore<Question>(db, STORE_QUESTIONS);
  if (!questions || questions.length === 0) {
    // Seed initial questions
    questions = SEED_QUESTIONS;
    await putManyToStore(db, STORE_QUESTIONS, questions);
    await putToStore(db, STORE_META, { key: 'seedVersionApplied', value: SEED_VERSION });
  } else {
    // B1: Check applied seed version and sync
    const appliedVerEntry = await getFromStore<{ key: string; value: number }>(db, STORE_META, 'seedVersionApplied');
    const appliedVersion = appliedVerEntry?.value ?? 0;

    const syncResult = syncQuestionsWithSeed(questions, SEED_QUESTIONS, appliedVersion, SEED_VERSION);
    if (syncResult.updated) {
      questions = syncResult.questions;
      await putManyToStore(db, STORE_QUESTIONS, questions);
    }
    if (syncResult.newVersion !== appliedVersion) {
      await putToStore(db, STORE_META, { key: 'seedVersionApplied', value: syncResult.newVersion });
    }
  }

  // Always sort numerically by docNumber
  questions.sort((a, b) => a.docNumber - b.docNumber);

  // Load progress
  const progressList = await getAllFromStore<UserProgressItem>(db, STORE_PROGRESS);
  const progressMap: Record<string, UserProgressItem> = {};
  for (const p of progressList) {
    progressMap[p.questionId] = p;
  }

  // Ensure every question has an entry in progressMap
  for (const q of questions) {
    if (!progressMap[q.id]) {
      progressMap[q.id] = {
        questionId: q.id,
        box: 1,
        consecutiveCorrect: 0,
        timesCorrect: 0,
        timesIncorrect: 0,
        lastAnsweredAt: null,
        lastResult: null,
      };
    }
  }

  // Reset progress (box 1, consecutiveCorrect 0) for the 9 corrected questions (one-time migration)
  const CORRECTED_DOC_NUMBERS = new Set([8, 11, 31, 56, 61, 63, 67, 69, 76]);
  const progressMigrationKey = 'progress_reset_v3_9_corrected';
  const progressMigration = await getFromStore<{ key: string; value: boolean }>(db, STORE_META, progressMigrationKey);

  if (!progressMigration) {
    const resetProgressList: UserProgressItem[] = [];
    for (const q of questions) {
      if (CORRECTED_DOC_NUMBERS.has(q.docNumber)) {
        const resetItem: UserProgressItem = {
          questionId: q.id,
          box: 1,
          consecutiveCorrect: 0,
          timesCorrect: 0,
          timesIncorrect: 0,
          lastAnsweredAt: null,
          lastResult: null,
        };
        progressMap[q.id] = resetItem;
        resetProgressList.push(resetItem);
      }
    }
    if (resetProgressList.length > 0) {
      await putManyToStore(db, STORE_PROGRESS, resetProgressList);
    }
    await putToStore(db, STORE_META, { key: progressMigrationKey, value: true });
  }

  // Load metadata (stats & settings)
  const statsEntry = await getFromStore<{ key: string; value: UserStats }>(db, STORE_META, 'stats');
  let stats: UserStats = statsEntry ? statsEntry.value : DEFAULT_STATS;

  const today = new Date().toISOString().split('T')[0];
  stats.lastStudyDate = today;

  const settingsEntry = await getFromStore<{ key: string; value: UserSettings }>(db, STORE_META, 'settings');
  const settings: UserSettings = settingsEntry ? settingsEntry.value : DEFAULT_SETTINGS;

  return { questions, progress: progressMap, stats, settings };
}

// Store helpers
export function getAllFromStore<T>(db: IDBDatabase, storeName: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export function getFromStore<T>(db: IDBDatabase, storeName: string, key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export function putToStore<T>(db: IDBDatabase, storeName: string, item: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put(item);
    tx.oncomplete = () => {
      storageChangeListener?.();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export function putManyToStore<T>(db: IDBDatabase, storeName: string, items: T[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    for (const item of items) {
      store.put(item);
    }
    tx.oncomplete = () => {
      storageChangeListener?.();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveQuestion(question: Question): Promise<void> {
  const db = await openDB();
  const toSave: Question = { ...question, isModified: true };
  return putToStore(db, STORE_QUESTIONS, toSave);
}

export async function saveQuestionsBatch(questions: Question[]): Promise<void> {
  const db = await openDB();
  const modifiedBatch = questions.map(q => ({ ...q, isModified: true }));
  return putManyToStore(db, STORE_QUESTIONS, modifiedBatch);
}

export async function deleteQuestion(questionId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_QUESTIONS, STORE_PROGRESS], 'readwrite');
    tx.objectStore(STORE_QUESTIONS).delete(questionId);
    tx.objectStore(STORE_PROGRESS).delete(questionId);
    tx.oncomplete = () => {
      storageChangeListener?.();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

export async function saveUserProgress(progress: UserProgressItem): Promise<void> {
  const db = await openDB();
  return putToStore(db, STORE_PROGRESS, progress);
}

export async function saveUserStats(stats: UserStats): Promise<void> {
  const db = await openDB();
  return putToStore(db, STORE_META, { key: 'stats', value: stats });
}

export async function saveUserSettings(settings: UserSettings): Promise<void> {
  const db = await openDB();
  return putToStore(db, STORE_META, { key: 'settings', value: settings });
}

export async function resetAllProgress(): Promise<Record<string, UserProgressItem>> {
  const db = await openDB();
  const questions = await getAllFromStore<Question>(db, STORE_QUESTIONS);

  const resetMap: Record<string, UserProgressItem> = {};
  const list: UserProgressItem[] = [];

  for (const q of questions) {
    const fresh: UserProgressItem = {
      questionId: q.id,
      box: 1,
      consecutiveCorrect: 0,
      timesCorrect: 0,
      timesIncorrect: 0,
      lastAnsweredAt: null,
      lastResult: null,
    };
    resetMap[q.id] = fresh;
    list.push(fresh);
  }

  await putManyToStore(db, STORE_PROGRESS, list);

  const freshStats: UserStats = {
    ...DEFAULT_STATS,
    lastStudyDate: new Date().toISOString().split('T')[0],
  };
  await saveUserStats(freshStats);

  return resetMap;
}

export async function restoreDefaultSeed(): Promise<Question[]> {
  const db = await openDB();
  await putManyToStore(db, STORE_QUESTIONS, SEED_QUESTIONS);
  await putToStore(db, STORE_META, { key: 'seedVersionApplied', value: SEED_VERSION });
  return SEED_QUESTIONS;
}

export async function exportFullBackup(): Promise<string> {
  const db = await openDB();
  const questions = await getAllFromStore<Question>(db, STORE_QUESTIONS);
  const progress = await getAllFromStore<UserProgressItem>(db, STORE_PROGRESS);
  const stats = (await getFromStore<{ value: UserStats }>(db, STORE_META, 'stats'))?.value || DEFAULT_STATS;
  const settings = (await getFromStore<{ value: UserSettings }>(db, STORE_META, 'settings'))?.value || DEFAULT_SETTINGS;

  const backupData = {
    app: 'FortiQuest NSE4 7.6',
    version: '3.0',
    exportedAt: new Date().toISOString(),
    questions,
    progress,
    stats,
    settings,
  };

  return JSON.stringify(backupData, null, 2);
}

export async function importFullBackup(jsonContent: string): Promise<{
  questions: Question[];
  progress: Record<string, UserProgressItem>;
  stats: UserStats;
  settings: UserSettings;
}> {
  const parsed = JSON.parse(jsonContent);
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    throw new Error('Formato de backup inválido: lista de questões ausente.');
  }

  const db = await openDB();
  await putManyToStore(db, STORE_QUESTIONS, parsed.questions);

  if (Array.isArray(parsed.progress)) {
    await putManyToStore(db, STORE_PROGRESS, parsed.progress);
  }

  if (parsed.stats) {
    await saveUserStats(parsed.stats);
  }

  if (parsed.settings) {
    await saveUserSettings(parsed.settings);
  }

  return initStorage();
}
