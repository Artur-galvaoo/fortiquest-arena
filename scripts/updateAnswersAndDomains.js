import fs from 'fs';
import path from 'path';

// Load existing seed
import { SEED_QUESTIONS } from '../src/data/seedQuestions.ts';

// Exact answers and domain mappings
const answersAndDomains = {
  1: { answers: ['A'], domain: 'routing' },
  2: { answers: ['A'], domain: 'vpn' },
  3: { answers: ['A', 'B'], domain: 'deployment_system' },
  4: { answers: ['B', 'C'], domain: 'firewall_auth' },
  5: { answers: ['A', 'D'], domain: 'deployment_system' },
  6: { answers: ['A', 'D'], domain: 'vpn' },
  7: { answers: ['C'], domain: 'content_inspection' },
  8: { answers: ['A', 'B'], domain: 'content_inspection' },
  9: { answers: ['C', 'D'], domain: 'deployment_system' },
  10: { answers: ['B', 'C'], domain: 'vpn' },
  11: { answers: ['A'], domain: 'firewall_auth' },
  12: { answers: ['D'], domain: 'content_inspection' },
  13: { answers: ['B', 'D'], domain: 'firewall_auth' },
  14: { answers: ['A', 'C'], domain: 'deployment_system' },
  15: { answers: ['D'], domain: 'deployment_system' },
  16: { answers: ['D'], domain: 'firewall_auth' },
  17: { answers: ['A', 'D'], domain: 'firewall_auth' },
  18: { answers: ['D'], domain: 'firewall_auth' },
  19: { answers: ['A'], domain: 'content_inspection' },
  20: { answers: ['A'], domain: 'content_inspection' },
  21: { answers: ['C', 'D'], domain: 'deployment_system' },
  22: { answers: ['D'], domain: 'routing' },
  23: { answers: ['C'], domain: 'firewall_auth' },
  24: { answers: ['C'], domain: 'firewall_auth' },
  25: { answers: ['A'], domain: 'firewall_auth' },
  26: { answers: ['B'], domain: 'firewall_auth' },
  27: { answers: ['D'], domain: 'deployment_system' },
  28: { answers: ['B'], domain: 'deployment_system' },
  29: { answers: ['D'], domain: 'content_inspection' },
  30: { answers: ['B', 'C'], domain: 'deployment_system' },
  31: { answers: ['C'], domain: 'content_inspection' },
  32: { answers: ['A', 'C'], domain: 'deployment_system' },
  33: { answers: ['B', 'D'], domain: 'content_inspection' },
  34: { answers: ['C', 'D', 'E'], domain: 'routing' },
  35: { answers: ['A'], domain: 'deployment_system' },
  36: { answers: ['A'], domain: 'deployment_system' },
  37: { answers: ['B', 'D'], domain: 'content_inspection' },
  38: { answers: ['B'], domain: 'content_inspection' },
  39: { answers: ['A'], domain: 'deployment_system' },
  40: { answers: ['D'], domain: 'vpn' },
  41: { answers: ['B', 'D'], domain: 'firewall_auth' },
  42: { answers: ['C'], domain: 'routing' },
  43: { answers: ['C', 'D'], domain: 'routing' },
  44: { answers: ['C'], domain: 'vpn' },
  45: { answers: ['C'], domain: 'content_inspection' },
  46: { answers: ['D'], domain: 'content_inspection' },
  47: { answers: ['A', 'C'], domain: 'deployment_system' },
  48: { answers: ['A', 'B'], domain: 'routing' },
  49: { answers: ['C', 'D'], domain: 'deployment_system' },
  50: { answers: ['A'], domain: 'content_inspection' },
  51: { answers: ['B'], domain: 'content_inspection' },
  52: { answers: ['B', 'D'], domain: 'deployment_system' },
  53: { answers: ['C', 'D'], domain: 'deployment_system' },
  54: { answers: ['A', 'B', 'D'], domain: 'routing' },
  55: { answers: ['A', 'D'], domain: 'firewall_auth' },
  56: { answers: ['A', 'B', 'D'], domain: 'content_inspection' },
  57: { answers: ['A', 'C'], domain: 'deployment_system' },
  58: { answers: ['A'], domain: 'deployment_system' },
  59: { answers: ['A'], domain: 'content_inspection' },
  60: { answers: ['D'], domain: 'firewall_auth' },
  61: { answers: ['C'], domain: 'content_inspection' },
  62: { answers: ['A', 'C'], domain: 'content_inspection' },
  63: { answers: ['A', 'C'], domain: 'routing' },
  64: { answers: ['A'], domain: 'firewall_auth' },
  65: { answers: ['C', 'D', 'E'], domain: 'routing' },
  66: { answers: ['C'], domain: 'deployment_system' },
  67: { answers: ['A'], domain: 'deployment_system' },
  68: { answers: ['A', 'B'], domain: 'firewall_auth' },
  69: { answers: ['B'], domain: 'firewall_auth' },
  70: { answers: ['A'], domain: 'firewall_auth' },
  71: { answers: ['C'], domain: 'firewall_auth' },
  72: { answers: ['A', 'C'], domain: 'vpn' },
  74: { answers: ['C'], domain: 'deployment_system' },
  75: { answers: ['C'], domain: 'deployment_system' },
  76: { answers: ['A'], domain: 'firewall_auth' },
  77: { answers: ['B'], domain: 'firewall_auth' },
  78: { answers: ['A', 'C'], domain: 'vpn' },
};

// Read explanations from markdown
const mdPath = path.resolve('./public/assets/aistudio/correcoes_fortiquest_4fcbc28f.md');
const mdContent = fs.readFileSync(mdPath, 'utf-8');

const expRegex = /### Q(\d+)\s*\(([^)]+)\)\n([\s\S]*?)(?=(?:\n### Q\d+|\n---|\n## Versão minimalista|$))/g;
let match;
const explanationsMap = {};
while ((match = expRegex.exec(mdContent)) !== null) {
  const docNum = parseInt(match[1], 10);
  const content = match[3].trim();
  explanationsMap[docNum] = content;
}

const updatedQuestions = SEED_QUESTIONS.map(q => {
  const meta = answersAndDomains[q.docNumber];
  const answers = meta ? meta.answers : (q.correctAnswers || []);
  const explanation = explanationsMap[q.docNumber] || q.explanation || '';
  const isMulti = answers.length > 1;
  const requiredCount = answers.length > 0 ? answers.length : 1;

  return {
    ...q,
    domain: meta ? meta.domain : (q.domain || 'deployment_system'),
    correctAnswers: answers,
    isMultipleChoice: isMulti,
    requiredAnswersCount: requiredCount,
    explanation: explanation,
  };
});

const tsContent = `// Auto-generated seed data for FortiQuest NSE4 questions
// Total questions: ${updatedQuestions.length} (Doc numbers 1 to 78, excluding 73)
// All answers loaded from official exam dump highlights and corrected table
import { Question } from '../types/quiz';

export const SEED_QUESTIONS: Question[] = ${JSON.stringify(updatedQuestions, null, 2)};
`;

fs.writeFileSync(path.resolve('./src/data/seedQuestions.ts'), tsContent, 'utf-8');
console.log(`Successfully updated seedQuestions.ts with official answers, ${Object.keys(explanationsMap).length} explanations and 5 domains!`);

