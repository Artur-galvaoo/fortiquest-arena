import test from 'node:test';
import assert from 'node:assert';
import { isQuestionMastered, selectNextLeitnerQuestion } from '../src/utils/gamification.js';
import { SEED_QUESTIONS } from '../src/data/seedQuestions.js';
import { UserProgressItem } from '../src/types/quiz.js';

test('Leitner repetition: question mastering and wrong answer penalty', () => {
  const qId = 'q-1';
  
  // Initial state: box 1, 0 consecutive
  let progress: UserProgressItem = {
    questionId: qId,
    box: 1,
    consecutiveCorrect: 0,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
  };

  assert.strictEqual(isQuestionMastered(progress), false);

  // 1st correct answer
  progress = {
    ...progress,
    box: 2,
    consecutiveCorrect: 1,
    timesCorrect: 1,
    lastResult: 'correct',
  };
  assert.strictEqual(isQuestionMastered(progress), false);

  // 2nd consecutive correct
  progress = {
    ...progress,
    box: 3,
    consecutiveCorrect: 2,
    timesCorrect: 2,
    lastResult: 'correct',
  };
  assert.strictEqual(isQuestionMastered(progress), false);

  // 3rd consecutive correct -> Now mastered!
  progress = {
    ...progress,
    box: 4,
    consecutiveCorrect: 3,
    timesCorrect: 3,
    lastResult: 'correct',
  };
  assert.strictEqual(isQuestionMastered(progress), true, 'Question should be mastered after 3 consecutive correct');

  // Wrong answer -> Drops immediately to box 1, consecutive 0, no longer mastered
  progress = {
    ...progress,
    box: 1,
    consecutiveCorrect: 0,
    timesIncorrect: 1,
    lastResult: 'incorrect',
  };
  assert.strictEqual(progress.box, 1);
  assert.strictEqual(progress.consecutiveCorrect, 0);
  assert.strictEqual(isQuestionMastered(progress), false, 'Wrong answer drops to box 1 and removes mastered status');
});

test('"Só as que errei" filtering identifies unmastered questions with errors', () => {
  const pMap: Record<string, UserProgressItem> = {
    'q-1': {
      questionId: 'q-1',
      box: 1,
      consecutiveCorrect: 0,
      timesCorrect: 2,
      timesIncorrect: 1, // Has error, not mastered -> SHOULD BE INCLUDED
      lastAnsweredAt: Date.now(),
      lastResult: 'incorrect',
    },
    'q-2': {
      questionId: 'q-2',
      box: 4,
      consecutiveCorrect: 3, // Mastered -> SHOULD BE EXCLUDED
      timesCorrect: 3,
      timesIncorrect: 1,
      lastAnsweredAt: Date.now(),
      lastResult: 'correct',
    },
    'q-3': {
      questionId: 'q-3',
      box: 2,
      consecutiveCorrect: 1,
      timesCorrect: 1,
      timesIncorrect: 0, // Never errored -> SHOULD BE EXCLUDED
      lastAnsweredAt: Date.now(),
      lastResult: 'correct',
    },
  };

  const sampleQuestions = SEED_QUESTIONS.slice(0, 3);
  const erroredQuestions = sampleQuestions.filter((q) => {
    const p = pMap[q.id];
    return Boolean(p && p.timesIncorrect > 0 && !isQuestionMastered(p));
  });

  assert.strictEqual(erroredQuestions.length, 1);
  assert.strictEqual(erroredQuestions[0].id, 'q-1');
});

test('Explanation formatting parses concept and options with check and cross icons', () => {
  const sampleExplanation = SEED_QUESTIONS[0].explanation!;
  assert.ok(sampleExplanation, 'Q1 should have explanation');

  const lines = sampleExplanation.split('\n').map((l) => l.trim()).filter(Boolean);
  const conceptLine = lines.find((l) => l.toLowerCase().startsWith('**conceito:') || l.toLowerCase().startsWith('conceito:'));
  assert.ok(conceptLine, 'Should have a concept line starting with Conceito:');
  assert.ok(conceptLine.includes('zona SD-WAN'));

  const altLines = lines.filter((l) => l !== conceptLine);
  assert.strictEqual(altLines.length, 4, 'Should have 4 alternatives');
  
  const correctLine = altLines.find((l) => l.includes('✅'));
  const wrongLines = altLines.filter((l) => l.includes('❌'));

  assert.ok(correctLine, 'Should have line with ✅');
  assert.strictEqual(wrongLines.length, 3, 'Should have 3 lines with ❌');
});
