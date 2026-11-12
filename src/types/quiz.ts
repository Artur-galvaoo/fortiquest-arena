export type BlockType = 'text' | 'terminal' | 'image';

export type ExamDomain =
  | 'deployment_system'   // 1. Deployment and System Configuration
  | 'firewall_auth'       // 2. Firewall Policies and Authentication
  | 'content_inspection' // 3. Content Inspection
  | 'routing'            // 4. Routing
  | 'vpn';               // 5. VPN

export interface ContentBlock {
  id: string;
  type: BlockType;
  content?: string;
  url?: string;
  pending?: boolean;
  label?: string;
  originalCaption?: string;
}

export interface OptionItem {
  id: string;
  letter: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
}

export interface Question {
  id: string;
  docNumber: number; // 1 to 78 (skipping 73)
  origin: string;
  domain: ExamDomain;
  blocks: ContentBlock[];
  options: OptionItem[];
  isMultipleChoice: boolean;
  requiredAnswersCount: number; // 1, 2, or 3
  correctAnswers: string[]; // e.g. ['A'], ['B', 'D']
  explanation?: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean; // When edited by user in Bank or Gabarito, preserves against seed sync
  warnings?: string[];
}

export interface UserProgressItem {
  questionId: string;
  box: 1 | 2 | 3 | 4 | 5; // Leitner box (1 = repeat soon, 5 = mastered)
  consecutiveCorrect: number; // 3+ qualifies as memorized / decorada
  timesCorrect: number;
  timesIncorrect: number;
  lastAnsweredAt: number | null;
  lastResult: 'correct' | 'incorrect' | null;
  userNote?: string;
}

export interface UserSettings {
  soundEnabled?: boolean;
  timerEnabled?: boolean;
  timerDuration?: number;
}

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  lastStudyDate?: string;
}
