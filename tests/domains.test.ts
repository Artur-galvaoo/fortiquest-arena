import { test } from 'node:test';
import assert from 'node:assert';
import { generateDomainReport, EXAM_DOMAINS } from '../src/utils/domains.ts';
import { Question, UserProgressItem } from '../src/types/quiz.ts';

test('EXAM_DOMAINS contains all 5 official NSE4 domains', () => {
  assert.strictEqual(EXAM_DOMAINS.deployment_system.number, 1);
  assert.strictEqual(EXAM_DOMAINS.deployment_system.name, 'Deployment and System Configuration');
  assert.strictEqual(EXAM_DOMAINS.firewall_auth.number, 2);
  assert.strictEqual(EXAM_DOMAINS.firewall_auth.name, 'Firewall Policies and Authentication');
  assert.strictEqual(EXAM_DOMAINS.content_inspection.number, 3);
  assert.strictEqual(EXAM_DOMAINS.content_inspection.name, 'Content Inspection');
  assert.strictEqual(EXAM_DOMAINS.routing.number, 4);
  assert.strictEqual(EXAM_DOMAINS.routing.name, 'Routing');
  assert.strictEqual(EXAM_DOMAINS.vpn.number, 5);
  assert.strictEqual(EXAM_DOMAINS.vpn.name, 'VPN');
});

test('generateDomainReport accurately diagnoses the weakest domain needing study', () => {
  const dummyQuestions: Question[] = [
    {
      id: 'q-1',
      docNumber: 1,
      origin: 'orig 1',
      domain: 'routing',
      blocks: [],
      options: [],
      isMultipleChoice: false,
      requiredAnswersCount: 1,
      correctAnswers: ['A'],
      tags: [],
    },
    {
      id: 'q-2',
      docNumber: 2,
      origin: 'orig 2',
      domain: 'vpn',
      blocks: [],
      options: [],
      isMultipleChoice: false,
      requiredAnswersCount: 1,
      correctAnswers: ['B'],
      tags: [],
    },
  ];

  const progressMap: Record<string, UserProgressItem> = {
    'q-1': {
      questionId: 'q-1',
      box: 4,
      consecutiveCorrect: 4,
      timesCorrect: 4,
      timesIncorrect: 0,
      lastAnsweredAt: Date.now(),
      lastResult: 'correct',
    },
    'q-2': {
      questionId: 'q-2',
      box: 1,
      consecutiveCorrect: 0,
      timesCorrect: 1,
      timesIncorrect: 3,
      lastAnsweredAt: Date.now(),
      lastResult: 'incorrect',
    },
  };

  const report = generateDomainReport(dummyQuestions, progressMap);
  assert.ok(report.weakestDomain !== null);
  // VPN has 1 correct, 3 incorrect (25% accuracy) -> should be diagnosed as weakest
  assert.strictEqual(report.weakestDomain?.domain, 'vpn');
  assert.strictEqual(report.weakestDomain?.accuracy, 25);
  assert.strictEqual(report.strongestDomain?.domain, 'routing');
  assert.strictEqual(report.strongestDomain?.accuracy, 100);
});
