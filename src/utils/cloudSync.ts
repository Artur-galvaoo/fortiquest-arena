// Optional cloud sync with Firebase (Auth Google + Firestore).
// Local IndexedDB stays the source of truth; Firestore keeps a copy per user
// at users/{uid}/data/progress so progress follows the user across devices.
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { Question, UserProgressItem, UserSettings, UserStats } from '../types/quiz';
import { exportFullBackup, importFullBackup, setStorageChangeListener } from './storage';

// Firebase web config is public by design; access is protected by Firestore rules
// (each user can only read/write users/{own uid}) and API key referrer restrictions.
const firebaseConfig = {
  apiKey: 'AIzaSyDHQli74_SUy07fRuKMpwuuBHNEh-6amnY',
  authDomain: 'fortiquest-arena.firebaseapp.com',
  projectId: 'fortiquest-arena',
  storageBucket: 'fortiquest-arena.firebasestorage.app',
  messagingSenderId: '401434410025',
  appId: '1:401434410025:web:f5e8819d61e936c076b038',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export type SyncStatus = 'signed-out' | 'syncing' | 'synced' | 'error';

interface CloudPayload {
  progress: UserProgressItem[];
  stats: UserStats;
  settings: UserSettings;
  questions: Question[]; // only user-modified/custom questions
}

type Listener = (user: User | null, status: SyncStatus) => void;

let currentUser: User | null = null;
let status: SyncStatus = 'signed-out';
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let applyingRemote = false;
const listeners = new Set<Listener>();

function setStatus(s: SyncStatus) {
  status = s;
  listeners.forEach((l) => l(currentUser, status));
}

function userDoc(uid: string) {
  return doc(db, 'users', uid, 'data', 'progress');
}

async function readLocal(): Promise<CloudPayload & { allQuestions: Question[] }> {
  const parsed = JSON.parse(await exportFullBackup());
  return {
    progress: parsed.progress || [],
    stats: parsed.stats,
    settings: parsed.settings,
    allQuestions: parsed.questions || [],
    questions: (parsed.questions || []).filter((q: Question) => q.isModified || q.isCustom),
  };
}

function mergeProgress(a: UserProgressItem[], b: UserProgressItem[]): UserProgressItem[] {
  const map = new Map<string, UserProgressItem>();
  for (const item of [...a, ...b]) {
    const prev = map.get(item.questionId);
    if (!prev || (item.lastAnsweredAt || 0) > (prev.lastAnsweredAt || 0)) {
      map.set(item.questionId, item);
    }
  }
  return [...map.values()];
}

async function pushNow() {
  if (!currentUser) return;
  try {
    setStatus('syncing');
    const local = await readLocal();
    let payload: CloudPayload = {
      progress: local.progress,
      stats: local.stats,
      settings: local.settings,
      questions: local.questions,
    };
    // Firestore documents are limited to 1 MiB; drop edited questions (e.g. pasted images) if too big.
    if (JSON.stringify(payload).length > 900_000) payload = { ...payload, questions: [] };
    await setDoc(userDoc(currentUser.uid), { ...payload, updatedAt: serverTimestamp() });
    setStatus('synced');
  } catch (err) {
    console.error('Cloud push failed', err);
    setStatus('error');
  }
}

function schedulePush() {
  if (!currentUser || applyingRemote) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(pushNow, 2000);
}

/** Merge cloud data into local storage on login. Returns true if local data changed. */
async function pullAndMerge(uid: string): Promise<boolean> {
  const snap = await getDoc(userDoc(uid));
  if (!snap.exists()) return false;
  const remote = snap.data() as CloudPayload;
  const local = await readLocal();

  const progress = mergeProgress(local.progress, remote.progress || []);
  const stats =
    remote.stats && (remote.stats.totalAnswered || 0) > (local.stats?.totalAnswered || 0) ? remote.stats : local.stats;
  const remoteQ = new Map((remote.questions || []).map((q) => [q.id, q]));
  const localIds = new Set(local.allQuestions.map((q) => q.id));
  const questions = [
    ...local.allQuestions.map((q) => (!q.isModified && remoteQ.has(q.id) ? remoteQ.get(q.id)! : q)),
    ...(remote.questions || []).filter((q) => !localIds.has(q.id)),
  ];

  applyingRemote = true;
  try {
    await importFullBackup(
      JSON.stringify({ questions, progress, stats, settings: remote.settings || local.settings })
    );
  } finally {
    applyingRemote = false;
  }
  return true;
}

/**
 * Starts listening for auth changes. `onRemoteData` is called when cloud data was
 * merged into local storage so the UI can reload.
 */
export function initCloudSync(onRemoteData: () => void, listener: Listener): () => void {
  listeners.add(listener);
  listener(currentUser, status);
  setStorageChangeListener(schedulePush);

  const unsub = onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    if (!user) {
      setStatus('signed-out');
      return;
    }
    try {
      setStatus('syncing');
      const changed = await pullAndMerge(user.uid);
      if (changed) onRemoteData();
      await pushNow();
    } catch (err) {
      console.error('Cloud sync failed', err);
      setStatus('error');
    }
  });

  return () => {
    listeners.delete(listener);
    unsub();
  };
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (err: any) {
    if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/operation-not-supported-in-this-environment') {
      await signInWithRedirect(auth, provider);
    } else if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
      throw err;
    }
  }
}

export async function signOutCloud() {
  if (pushTimer) {
    clearTimeout(pushTimer);
    await pushNow();
  }
  await signOut(auth);
}
