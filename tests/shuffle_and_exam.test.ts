import { test } from 'node:test';
import assert from 'node:assert';
import { buildDisplayOptions, originalToDisplayMap, shuffleOptions } from '../src/utils/shuffle.ts';
import { formatClock, elapsedMs, EXAM_LIMIT_MS } from '../src/utils/exam.ts';
import { SEED_QUESTIONS } from '../src/data/seedQuestions.ts';

test('shuffle: keeps every option exactly once and never the original order', () => {
  for (const q of SEED_QUESTIONS) {
    for (let i = 0; i < 20; i++) {
      const s = shuffleOptions(q.options);
      assert.deepStrictEqual(s.map((o) => o.letter).sort(), q.options.map((o) => o.letter).sort());
      assert.ok(s.some((o, idx) => o.letter !== q.options[idx].letter), `q${q.docNumber} not shuffled`);
    }
  }
});

test('shuffle: display letters are positional and map back to the original answers', () => {
  const q = SEED_QUESTIONS[0];
  const d = buildDisplayOptions(q.options, true);
  assert.deepStrictEqual(d.map((x) => x.displayLetter), q.options.map((_, i) => 'ABCDE'[i]));
  const map = originalToDisplayMap(d);
  for (const { option, displayLetter } of d) assert.strictEqual(map[option.letter], displayLetter);
});

test('shuffle off: original order and letters untouched', () => {
  const q = SEED_QUESTIONS[0];
  const d = buildDisplayOptions(q.options, false);
  assert.deepStrictEqual(d.map((x) => [x.option.letter, x.displayLetter]), q.options.map((o) => [o.letter, o.letter]));
});

test('exam clock: format and limit', () => {
  assert.strictEqual(formatClock(65_000), '01:05');
  assert.strictEqual(formatClock(EXAM_LIMIT_MS), '1:55:00');
  assert.strictEqual(
    elapsedMs({ active: true, elapsedBeforeMs: 1000, runningSince: 5000, answered: 0, correct: 0 }, 8000),
    4000
  );
});
