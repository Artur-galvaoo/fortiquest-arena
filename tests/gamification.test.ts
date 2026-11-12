import { test } from 'node:test';
import assert from 'node:assert';
import { 
  getLevelInfo, 
  calculateQuestionScore, 
  isQuestionMastered 
} from '../src/utils/gamification.js';

test('getLevelInfo returns correct level titles and XP progression', () => {
  const lvl1 = getLevelInfo(0);
  assert.strictEqual(lvl1.level, 1);
  assert.strictEqual(lvl1.title, 'Cabo Desconectado');

  const lvl5 = getLevelInfo(3000);
  assert.strictEqual(lvl5.level, 5);
  assert.strictEqual(lvl5.title, 'Interface VLAN');

  const maxLvl = getLevelInfo(100000);
  assert.strictEqual(maxLvl.level, 15);
  assert.strictEqual(maxLvl.title, 'Fortinet NSE4 Grandmaster');
});

test('calculateQuestionScore scales with speed and streak multiplier', () => {
  // Base with streak 0 (30s)
  const score1 = calculateQuestionScore(15, 30, 0, true);
  assert.ok(score1 >= 500 && score1 <= 1000);

  // Score with 10x streak should have 3x multiplier
  const scoreHighStreak = calculateQuestionScore(30, 30, 10, true);
  assert.strictEqual(scoreHighStreak, 3000);

  // Extended timer options: 120s and 180s
  const score120sFull = calculateQuestionScore(120, 120, 0, true);
  assert.strictEqual(score120sFull, 1000); // 100% time remaining -> full base points

  const score120sHalf = calculateQuestionScore(60, 120, 0, true);
  assert.strictEqual(score120sHalf, 750); // 50% time remaining -> 0.5 + 0.25 = 0.75 multiplier

  const score180sFull = calculateQuestionScore(180, 180, 0, true);
  assert.strictEqual(score180sFull, 1000);

  const score180sHalfWithStreak = calculateQuestionScore(90, 180, 3, true);
  assert.strictEqual(score180sHalfWithStreak, Math.round(1000 * 0.75 * 1.5)); // 1125 points
});

test('isQuestionMastered identifies box 5 or 3 consecutive correct', () => {
  assert.strictEqual(isQuestionMastered({
    questionId: 'q-1',
    box: 1,
    consecutiveCorrect: 2,
    timesCorrect: 2,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
  }), false);

  assert.strictEqual(isQuestionMastered({
    questionId: 'q-1',
    box: 1,
    consecutiveCorrect: 3,
    timesCorrect: 3,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
  }), true);

  assert.strictEqual(isQuestionMastered({
    questionId: 'q-1',
    box: 5,
    consecutiveCorrect: 1,
    timesCorrect: 5,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
  }), true);
});
