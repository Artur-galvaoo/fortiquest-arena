import { test } from 'node:test';
import assert from 'node:assert';
import { SEED_QUESTIONS } from '../src/data/seedQuestions.ts';

test('Question 28 (FortiGate CNF in AWS) data integrity', () => {
  const q28 = SEED_QUESTIONS.find(q => q.docNumber === 28);
  assert.ok(q28, 'Question 28 must exist in seed');
  assert.strictEqual(q28.id, 'q-28');
  assert.strictEqual(q28.domain, 'deployment_system');
  assert.deepStrictEqual(q28.correctAnswers, ['B']);
  assert.strictEqual(q28.isMultipleChoice, false);
  assert.strictEqual(q28.requiredAnswersCount, 1);

  // Check that option B is the GWLBe option
  const optB = q28.options.find(o => o.letter === 'B');
  assert.ok(optB, 'Option B must exist');
  assert.ok(optB.text.includes('GWLBe') || optB.text.includes('gateway load balancer endpoint'));

  // Test answer evaluation: selecting 'B' is correct
  const evaluateAnswer = (selected: string[], correct: string[]) => {
    const correctSorted = [...correct].sort().join(',');
    const submittedSorted = [...selected].sort().join(',');
    return correctSorted.length > 0 && correctSorted === submittedSorted;
  };

  assert.strictEqual(evaluateAnswer(['B'], q28.correctAnswers), true);
  assert.strictEqual(evaluateAnswer(['A'], q28.correctAnswers), false);
  assert.strictEqual(evaluateAnswer(['C'], q28.correctAnswers), false);
  assert.strictEqual(evaluateAnswer(['D'], q28.correctAnswers), false);
});

test('Question 50 (Web filtering facebook.com) data integrity', () => {
  const q50 = SEED_QUESTIONS.find(q => q.docNumber === 50);
  assert.ok(q50, 'Question 50 must exist in seed');
  assert.strictEqual(q50.id, 'q-50');
  assert.strictEqual(q50.domain, 'content_inspection');
  assert.deepStrictEqual(q50.correctAnswers, ['A']);
  assert.strictEqual(q50.isMultipleChoice, false);
  assert.strictEqual(q50.requiredAnswersCount, 1);

  // Check option A
  const optA = q50.options.find(o => o.letter === 'A');
  assert.ok(optA, 'Option A must exist');
  assert.ok(optA.text.includes('web rating override') || optA.text.includes('override'));
});

test('All 92 questions have verified answers, valid domains and consistent options', () => {
  assert.strictEqual(SEED_QUESTIONS.length, 92);

  SEED_QUESTIONS.forEach(q => {
    assert.ok(q.docNumber >= 1 && q.docNumber <= 93 && q.docNumber !== 73);
    assert.ok(q.correctAnswers && q.correctAnswers.length > 0, `Q#${q.docNumber} has no correct answers`);
    assert.ok(['deployment_system', 'firewall_auth', 'content_inspection', 'routing', 'vpn'].includes(q.domain || ''));
    
    // Check requiredAnswersCount and isMultipleChoice
    if (q.correctAnswers.length > 1) {
      assert.strictEqual(q.isMultipleChoice, true, `Q#${q.docNumber} must be multiple choice`);
      assert.strictEqual(q.requiredAnswersCount, q.correctAnswers.length);
    } else {
      assert.strictEqual(q.isMultipleChoice, false, `Q#${q.docNumber} must be single choice`);
      assert.strictEqual(q.requiredAnswersCount, 1);
    }

    // Every correct answer must exist in options
    const optLetters = q.options.map(o => o.letter);
    q.correctAnswers.forEach(ans => {
      assert.ok(optLetters.includes(ans), `Q#${q.docNumber} answer ${ans} not in options`);
    });

    // Check explanation
    assert.ok(q.explanation && q.explanation.length > 10, `Q#${q.docNumber} has valid explanation`);
  });
});

test('The 9 corrected questions have their exact new answers', () => {
  const expectedAnswers: Record<number, string[]> = {
    8: ['A', 'B'],
    11: ['A'],
    31: ['C'],
    56: ['A', 'B', 'D'],
    61: ['C'],
    63: ['A', 'C'],
    67: ['A'],
    69: ['B'],
    76: ['A'],
  };

  for (const [docNumStr, expected] of Object.entries(expectedAnswers)) {
    const docNum = Number(docNumStr);
    const q = SEED_QUESTIONS.find(item => item.docNumber === docNum);
    assert.ok(q, `Question #${docNum} must exist`);
    assert.deepStrictEqual(
      [...(q.correctAnswers || [])].sort(),
      [...expected].sort(),
      `Question #${docNum} answers mismatch`
    );
  }
});
