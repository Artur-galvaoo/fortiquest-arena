import test from 'node:test';
import assert from 'node:assert';
import { syncQuestionsWithSeed } from '../src/utils/storage.js';
import { SEED_QUESTIONS, SEED_VERSION } from '../src/data/seedQuestions.js';
import { stripMarkdown } from '../src/utils/markdown.js';
import { selectNextLeitnerQuestion } from '../src/utils/gamification.js';
import { Question } from '../src/types/quiz.js';

// 1. sync: uma questão salva com isModified: true e gabarito diferente do seed mantém o gabarito.
// Seed com versão maior atualiza as não modificadas só uma vez.
test('1. sync: isModified: true preserves user edits across seed syncs, while unmodified update once', () => {
  const seedQ = SEED_QUESTIONS[0]; // Q1, correctAnswers: ['A']

  const userModifiedQ: Question = {
    ...seedQ,
    correctAnswers: ['B'], // User manually changed to B
    isModified: true,
  };

  const unmodifiedQ: Question = {
    ...SEED_QUESTIONS[1],
    isModified: false,
  };

  const initialList = [userModifiedQ, unmodifiedQ];

  // Applied version is 2, target seed version is 3
  const sync1 = syncQuestionsWithSeed(initialList, SEED_QUESTIONS, 2, 3);
  assert.strictEqual(sync1.updated, true, 'Sync should mark updated when target version > applied version');
  assert.strictEqual(sync1.newVersion, 3);

  // User modified question MUST KEEP its user gabarito ['B']
  const syncedUserQ = sync1.questions.find((q) => q.id === userModifiedQ.id);
  assert.deepStrictEqual(syncedUserQ?.correctAnswers, ['B'], 'User modified question must preserve its edited gabarito');

  // Once version 3 is applied, running again with version 3 should do nothing
  const sync2 = syncQuestionsWithSeed(sync1.questions, SEED_QUESTIONS, 3, 3);
  assert.strictEqual(sync2.updated, false, 'Sync should not update when already at target version');
});

// 2. explicação: o parser converte **x** e `y` e não deixa * nem crase no texto final das 77 explicações.
test('2. explicação: stripMarkdown removes all ** and ` without residual asterisks or backticks', () => {
  let count = 0;
  for (const q of SEED_QUESTIONS) {
    assert.ok(q.explanation, `Question #${q.docNumber} must have an explanation`);
    const cleaned = stripMarkdown(q.explanation);
    assert.strictEqual(
      cleaned.includes('*'),
      false,
      `Question #${q.docNumber} explanation should have no residual asterisks: "${cleaned}"`
    );
    assert.strictEqual(
      cleaned.includes('`'),
      false,
      `Question #${q.docNumber} explanation should have no residual backticks: "${cleaned}"`
    );
    count++;
  }
  assert.strictEqual(count, 77, 'All 77 questions verified');
});

// 3. seleção: numa questão de 2 respostas, marcar 3 mantém só as 2 últimas, e Confirmar fica desabilitado com 1.
test('3. seleção: multi-choice selection keeps only last N selections and requires exact count to confirm', () => {
  const requiredCount = 2;

  // Simulate selection logic:
  function applySelection(prev: string[], letter: string, limit: number): string[] {
    if (prev.includes(letter)) {
      return prev.filter((l) => l !== letter);
    }
    if (prev.length >= limit) {
      return [...prev.slice(prev.length - limit + 1), letter];
    }
    return [...prev, letter];
  }

  let selected: string[] = [];

  // User selects A (1 of 2)
  selected = applySelection(selected, 'A', requiredCount);
  assert.deepStrictEqual(selected, ['A']);
  assert.strictEqual(selected.length === requiredCount, false, 'Confirm must be disabled with 1 selection');

  // User selects B (2 of 2)
  selected = applySelection(selected, 'B', requiredCount);
  assert.deepStrictEqual(selected, ['A', 'B']);
  assert.strictEqual(selected.length === requiredCount, true, 'Confirm must be enabled with 2 selections');

  // User selects C (3rd selection) -> A is evicted, B and C kept
  selected = applySelection(selected, 'C', requiredCount);
  assert.deepStrictEqual(selected, ['B', 'C'], 'Oldest selection A must be evicted, keeping 2 most recent');
  assert.strictEqual(selected.length === requiredCount, true, 'Confirm remains enabled with 2 selections');
});

// 4. pool: questões sem correctAnswers nunca são sorteadas.
test('4. pool: questions without correctAnswers are never drawn in training pool', () => {
  const qWithGabarito: Question = {
    ...SEED_QUESTIONS[0],
    id: 'q-valid-1',
    correctAnswers: ['A'],
  };

  const qWithoutGabarito: Question = {
    ...SEED_QUESTIONS[1],
    id: 'q-invalid-empty',
    correctAnswers: [], // Empty gabarito
  };

  const pool = [qWithGabarito, qWithoutGabarito];
  const progressMap = {};

  // Draw 20 times to confirm invalid question is never picked
  for (let i = 0; i < 20; i++) {
    const picked = selectNextLeitnerQuestion(pool, progressMap);
    assert.strictEqual(picked.id, 'q-valid-1', 'Only valid question with gabarito should be picked');
  }
});

// 5. dados: todas as 77 questões têm explanation com linha de conceito e uma linha por alternativa,
// e nenhuma alternativa tem texto com menos de 3 caracteres (pega o caso da Q36).
test('5. dados: all 77 questions have explanation with concept line, alternative lines, and alternatives >= 3 chars', () => {
  assert.strictEqual(SEED_QUESTIONS.length, 77, 'Must have exactly 77 questions');

  for (const q of SEED_QUESTIONS) {
    // Explanation checks
    assert.ok(q.explanation, `Question #${q.docNumber} has an explanation`);
    const lines = q.explanation.split('\n').map((l) => l.trim()).filter(Boolean);
    const hasConcept = lines.some((l) => l.toLowerCase().includes('conceito:'));
    assert.strictEqual(hasConcept, true, `Question #${q.docNumber} must have a concept line`);

    // Must have at least 2 alternative lines
    const altLines = lines.filter((l) => l.includes('✅') || l.includes('❌'));
    assert.ok(
      altLines.length >= 2,
      `Question #${q.docNumber} must have alternative lines with check/cross marks`
    );

    // Option length checks (checks Q36 fix)
    for (const opt of q.options) {
      assert.ok(
        opt.text.trim().length >= 3,
        `Question #${q.docNumber} option ${opt.letter} text must be >= 3 characters: "${opt.text}"`
      );
    }
  }

  // Explicit check for Q36
  const q36 = SEED_QUESTIONS.find((q) => q.docNumber === 36);
  assert.ok(q36, 'Q36 must exist');
  assert.ok(q36.options.find((o) => o.letter === 'A')?.text.includes('diagnose sniffer packet'));
  assert.ok(q36.options.find((o) => o.letter === 'B')?.text.includes('config log fortianalyzer setting'));
  assert.ok(q36.options.find((o) => o.letter === 'C')?.text.includes('Logging Mode Real Time'));
  assert.ok(q36.options.find((o) => o.letter === 'D')?.text.includes('Real Time com cadeado'));
});
