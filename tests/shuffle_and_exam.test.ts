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
    elapsedMs({ active: true, elapsedBeforeMs: 1000, runningSince: 5000, answered: 0, correct: 0, seenIds: [] }, 8000),
    4000
  );
});

import { syncQuestionsWithSeed } from '../src/utils/storage.ts';

test('seed v5: docs 79–93 exist with images on disk and reach returning users', async () => {
  const fs = await import('node:fs');
  const added = SEED_QUESTIONS.filter((q) => q.docNumber >= 79);
  assert.strictEqual(added.length, 15);
  for (const q of SEED_QUESTIONS) {
    for (const b of q.blocks.filter((x) => x.type === 'image')) {
      assert.ok(b.url, `Q${q.docNumber} image without url`);
      assert.ok(fs.existsSync('public/' + b.url), `missing file ${b.url}`);
    }
  }
  const oldBank = SEED_QUESTIONS.filter((q) => q.docNumber <= 78);
  const res = syncQuestionsWithSeed(oldBank, SEED_QUESTIONS, 4, 5);
  assert.strictEqual(res.questions.length, 92);
});

test('Q92 is a drag-and-drop ordering with one distractor; Q36 uses images as alternatives', async () => {
  const fs = await import('node:fs');
  const q92 = SEED_QUESTIONS.find((q) => q.docNumber === 92)!;
  assert.strictEqual(q92.kind, 'order');
  assert.strictEqual(q92.options.length, 5);
  assert.strictEqual(q92.requiredAnswersCount, 4);
  const seq = q92.correctAnswers.map((l) => q92.options.find((o) => o.letter === l)!.text);
  assert.deepStrictEqual(seq, ['Connected monitored ports', 'Priority', 'HA uptime', 'FortiGate serial number']);

  const q36 = SEED_QUESTIONS.find((q) => q.docNumber === 36)!;
  assert.strictEqual(q36.kind, 'image-choice');
  assert.strictEqual(q36.blocks.filter((b) => b.type === 'image').length, 0);
  for (const o of q36.options) assert.ok(o.image && fs.existsSync('public/' + o.image), `Q36 ${o.letter} image`);
  assert.deepStrictEqual(q36.correctAnswers, ['A']);
});
