import { ExamDomain, Question, UserProgressItem } from '../types/quiz';

export interface DomainMeta {
  key: ExamDomain;
  number: number;
  name: string;
  namePt: string;
  description: string;
}

export const EXAM_DOMAINS: Record<ExamDomain, DomainMeta> = {
  deployment_system: {
    key: 'deployment_system',
    number: 1,
    name: 'Deployment and System Configuration',
    namePt: 'Implantação e Configuração',
    description: 'Setup inicial, High Availability (FGCP/HA), VDOMs, Security Fabric, FortiAnalyzer e diagnósticos do sistema.',
  },
  firewall_auth: {
    key: 'firewall_auth',
    number: 2,
    name: 'Firewall Policies and Authentication',
    namePt: 'Firewall e Autenticação',
    description: 'Regras de firewall, Source NAT, Virtual IPs (DNAT), IP Pools, FSSO, RADIUS e controle de acesso.',
  },
  content_inspection: {
    key: 'content_inspection',
    number: 3,
    name: 'Content Inspection',
    namePt: 'Inspeção de Conteúdo',
    description: 'Web Filtering, Application Control, Antivirus (Flow/Proxy), IPS (Intrusion Prevention) e Deep SSL/SSH Inspection.',
  },
  routing: {
    key: 'routing',
    number: 4,
    name: 'Routing',
    namePt: 'Roteamento e SD-WAN',
    description: 'Rotas estáticas, Reverse Path Forwarding (RPF), ECMP, Performance SLAs e regras de SD-WAN.',
  },
  vpn: {
    key: 'vpn',
    number: 5,
    name: 'VPN',
    namePt: 'VPNs (IPsec e SSL)',
    description: 'IPsec VPN (Fase 1 e Fase 2), túneis redundantes, DPD (Dead Peer Detection) e integração FortiSASE.',
  },
};

export interface DomainPerformanceReport {
  domain: ExamDomain;
  meta: DomainMeta;
  totalQuestions: number;
  attemptedQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  masteredCount: number;
  masteredPercent: number;
}

export function generateDomainReport(
  questions: Question[],
  progressMap: Record<string, UserProgressItem>
): {
  reports: DomainPerformanceReport[];
  weakestDomain: DomainPerformanceReport | null;
  strongestDomain: DomainPerformanceReport | null;
} {
  const domainKeys: ExamDomain[] = [
    'deployment_system',
    'firewall_auth',
    'content_inspection',
    'routing',
    'vpn',
  ];

  const reports: DomainPerformanceReport[] = domainKeys.map((key) => {
    const domainQuestions = questions.filter((q) => q.domain === key);
    let correct = 0;
    let incorrect = 0;
    let mastered = 0;
    let attempted = 0;

    domainQuestions.forEach((q) => {
      const p = progressMap[q.id];
      if (p) {
        correct += p.timesCorrect;
        incorrect += p.timesIncorrect;
        if (p.timesCorrect > 0 || p.timesIncorrect > 0) {
          attempted += 1;
        }
        if (p.box === 5 || p.consecutiveCorrect >= 3) {
          mastered += 1;
        }
      }
    });

    const totalTrials = correct + incorrect;
    const accuracy = totalTrials > 0 ? Math.round((correct / totalTrials) * 100) : 0;
    const masteredPercent =
      domainQuestions.length > 0
        ? Math.round((mastered / domainQuestions.length) * 100)
        : 0;

    return {
      domain: key,
      meta: EXAM_DOMAINS[key],
      totalQuestions: domainQuestions.length,
      attemptedQuestions: attempted,
      correctCount: correct,
      incorrectCount: incorrect,
      accuracy,
      masteredCount: mastered,
      masteredPercent,
    };
  });

  const attemptedReports = reports.filter((r) => r.attemptedQuestions > 0);
  const weakest =
    attemptedReports.length > 0
      ? [...attemptedReports].sort((a, b) => a.accuracy - b.accuracy)[0]
      : reports[0];

  const strongest =
    attemptedReports.length > 0
      ? [...attemptedReports].sort((a, b) => b.accuracy - a.accuracy)[0]
      : null;

  return { reports, weakestDomain: weakest, strongestDomain: strongest };
}
