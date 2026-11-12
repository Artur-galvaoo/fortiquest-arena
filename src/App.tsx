import React, { useState, useEffect } from 'react';
import { Question, UserProgressItem, UserStats, UserSettings } from './types/quiz';
import { 
  initStorage, 
  saveQuestion, 
  saveQuestionsBatch, 
  deleteQuestion, 
  saveUserProgress, 
  resetAllProgress, 
  restoreDefaultSeed,
  DEFAULT_SETTINGS,
  DEFAULT_STATS
} from './utils/storage';
import { MinimalistTrainer } from './components/MinimalistTrainer';
import { SettingsModal } from './components/SettingsModal';
import { ToastProvider } from './components/ui/Toast';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserProgressItem>>({});
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load from IndexedDB on startup
  useEffect(() => {
    async function loadData() {
      try {
        const data = await initStorage();
        setQuestions(data.questions);
        setProgressMap(data.progress);
        setStats(data.stats);
        setSettings(data.settings);
      } catch (err) {
        console.error('Error loading initial data from storage:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveQuestion = async (updated: Question) => {
    await saveQuestion(updated);
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const handleBatchSaveQuestions = async (updatedList: Question[]) => {
    await saveQuestionsBatch(updatedList);
    const updatedMap = new Map(updatedList.map((q) => [q.id, q]));
    setQuestions((prev) => prev.map((q) => updatedMap.get(q.id) || q));
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(questionId);
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    setProgressMap((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  const handleUpdateProgress = async (item: UserProgressItem) => {
    await saveUserProgress(item);
    setProgressMap((prev) => ({ ...prev, [item.questionId]: item }));
  };

  const handleResetProgress = async () => {
    const resetMap = await resetAllProgress();
    setProgressMap(resetMap);
  };

  const handleRestoreOriginalSeed = async () => {
    const original = await restoreDefaultSeed();
    setQuestions(original);
  };

  const handleReloadAll = async () => {
    const data = await initStorage();
    setQuestions(data.questions);
    setProgressMap(data.progress);
    setStats(data.stats);
    setSettings(data.settings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-muted">
        <p className="text-[14px] font-medium">Carregando FortiQuest...</p>
      </div>
    );
  }

  return (
    <ToastProvider>
      <MinimalistTrainer
        questions={questions}
        progressMap={progressMap}
        onUpdateProgress={handleUpdateProgress}
        onSaveQuestion={handleSaveQuestion}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSettingsOpen={isSettingsOpen}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        questions={questions}
        progressMap={progressMap}
        stats={stats}
        settings={settings}
        onSaveQuestion={handleSaveQuestion}
        onBatchSaveQuestions={handleBatchSaveQuestions}
        onDeleteQuestion={handleDeleteQuestion}
        onResetProgress={handleResetProgress}
        onRestoreOriginalSeed={handleRestoreOriginalSeed}
        onReloadAllData={handleReloadAll}
      />
    </ToastProvider>
  );
}
