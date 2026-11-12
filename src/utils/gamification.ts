import { UserProgressItem, Question } from '../types/quiz';

export function isQuestionMastered(p?: UserProgressItem): boolean {
  if (!p) return false;
  return p.box === 5 || p.consecutiveCorrect >= 3;
}

// Spaced Repetition (Leitner system) question selector
export function selectNextLeitnerQuestion(
  availableQuestions: Question[],
  progressMap: Record<string, UserProgressItem>,
  recentlyAnsweredIds: string[] = []
): Question {
  // B7: Exclude questions with no correctAnswers defined
  const validQuestions = availableQuestions.filter(
    (q) => q.correctAnswers && q.correctAnswers.length > 0
  );

  if (validQuestions.length === 0) {
    throw new Error('Nenhuma questão válida com gabarito definido no banco.');
  }

  // Filter out recently answered in the last 3 questions (if pool allows)
  const candidatePool = validQuestions.filter(
    (q) => !recentlyAnsweredIds.slice(-Math.min(3, validQuestions.length - 1)).includes(q.id)
  );
  const pool = candidatePool.length > 0 ? candidatePool : validQuestions;

  // Weight formula by box: Box 1 has highest weight, Box 5 lowest weight
  const boxWeights: Record<number, number> = {
    1: 20,
    2: 10,
    3: 5,
    4: 2,
    5: 1,
  };

  const weightedItems = pool.map((q) => {
    const p = progressMap[q.id];
    const box = p ? p.box : 1;
    const baseWeight = boxWeights[box] || 10;
    // Add extra weight if never answered
    const freshnessBonus = !p || p.lastAnsweredAt === null ? 15 : 0;
    return {
      question: q,
      weight: baseWeight + freshnessBonus,
    };
  });

  const totalWeight = weightedItems.reduce((acc, curr) => acc + curr.weight, 0);
  let random = Math.random() * totalWeight;

  for (const item of weightedItems) {
    if (random < item.weight) {
      return item.question;
    }
    random -= item.weight;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export const LEVELS = [
  { level: 1, title: 'Cabo Desconectado', minXp: 0, nextXp: 300 },
  { level: 2, title: 'DHCP Discover', minXp: 300, nextXp: 800 },
  { level: 3, title: 'ARP Learner', minXp: 800, nextXp: 1600 },
  { level: 4, title: 'Static Router', minXp: 1600, nextXp: 2800 },
  { level: 5, title: 'Interface VLAN', minXp: 2800, nextXp: 4500 },
  { level: 6, title: 'Policy Authorizer', minXp: 4500, nextXp: 7000 },
  { level: 7, title: 'NAT Masquerader', minXp: 7000, nextXp: 10500 },
  { level: 8, title: 'Flow Antivirus Guardian', minXp: 10500, nextXp: 15000 },
  { level: 9, title: 'IPS Pattern Master', minXp: 15000, nextXp: 21000 },
  { level: 10, title: 'SSL Deep Inspector', minXp: 21000, nextXp: 29000 },
  { level: 11, title: 'SD-WAN Performance Pilot', minXp: 29000, nextXp: 39000 },
  { level: 12, title: 'IPsec Tunnel Architect', minXp: 39000, nextXp: 52000 },
  { level: 13, title: 'FSSO Identity Wizard', minXp: 52000, nextXp: 68000 },
  { level: 14, title: 'FGCP Cluster Master', minXp: 68000, nextXp: 90000 },
  { level: 15, title: 'Fortinet NSE4 Grandmaster', minXp: 90000, nextXp: 150000 },
];

export function getLevelInfo(totalXp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    const l = LEVELS[i];
    if (totalXp >= l.minXp) {
      const span = l.nextXp - l.minXp;
      const progress = Math.min(100, Math.max(0, Math.round(((totalXp - l.minXp) / span) * 100)));
      return {
        level: l.level,
        title: l.title,
        minXp: l.minXp,
        nextXp: l.nextXp,
        progressPercent: progress,
      };
    }
  }
  return {
    level: 1,
    title: LEVELS[0].title,
    minXp: 0,
    nextXp: LEVELS[0].nextXp,
    progressPercent: 0,
  };
}

export function calculateQuestionScore(
  timeRemaining: number,
  totalTime: number,
  streak: number,
  isTimerEnabled: boolean
): number {
  const basePoints = 1000;
  let speedMultiplier = 1;
  if (isTimerEnabled && totalTime > 0) {
    const timeFraction = Math.max(0, Math.min(1, timeRemaining / totalTime));
    speedMultiplier = 0.5 + 0.5 * timeFraction;
  }
  let streakMultiplier = 1.0;
  if (streak >= 10) streakMultiplier = 3.0;
  else if (streak >= 7) streakMultiplier = 2.5;
  else if (streak >= 5) streakMultiplier = 2.0;
  else if (streak >= 3) streakMultiplier = 1.5;

  return Math.round(basePoints * speedMultiplier * streakMultiplier);
}
