import { useCallback, useEffect, useState } from 'react';

export const EXAM_LIMIT_MINUTES = 115;
export const EXAM_LIMIT_MS = EXAM_LIMIT_MINUTES * 60 * 1000;

const KEY = 'fq-exam-session';
const PREFS_KEY = 'fq-prefs';

export interface ExamSession {
  active: boolean;
  /** Accumulated ms from finished running segments */
  elapsedBeforeMs: number;
  /** Timestamp when the current running segment started; null when paused */
  runningSince: number | null;
  answered: number;
  correct: number;
}

const EMPTY: ExamSession = { active: false, elapsedBeforeMs: 0, runningSince: null, answered: 0, correct: 0 };

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function elapsedMs(s: ExamSession, now = Date.now()): number {
  return s.elapsedBeforeMs + (s.runningSince ? now - s.runningSince : 0);
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export function useExamSession() {
  const [session, setSession] = useState<ExamSession>(() => load(KEY, EMPTY));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => save(KEY, session), [session]);

  useEffect(() => {
    if (!session.active || !session.runningSince) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [session.active, session.runningSince]);

  const start = useCallback(() => {
    setNow(Date.now());
    setSession({ ...EMPTY, active: true, runningSince: Date.now() });
  }, []);

  const stop = useCallback(() => setSession(EMPTY), []);

  const togglePause = useCallback(() => {
    setNow(Date.now());
    setSession((s) =>
      s.runningSince
        ? { ...s, elapsedBeforeMs: elapsedMs(s), runningSince: null }
        : { ...s, runningSince: Date.now() }
    );
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean) => {
    setSession((s) =>
      s.active ? { ...s, answered: s.answered + 1, correct: s.correct + (isCorrect ? 1 : 0) } : s
    );
  }, []);

  return { session, elapsed: elapsedMs(session, now), start, stop, togglePause, recordAnswer };
}

export interface TrainerPrefs {
  shuffleOptions: boolean;
}

export function useTrainerPrefs() {
  const [prefs, setPrefs] = useState<TrainerPrefs>(() => load(PREFS_KEY, { shuffleOptions: false }));
  useEffect(() => save(PREFS_KEY, prefs), [prefs]);
  return [prefs, setPrefs] as const;
}
