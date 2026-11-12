import React, { useState, useMemo } from 'react';
import { Question, UserProgressItem, UserStats, UserSettings } from '../types/quiz';
import { isQuestionMastered } from '../utils/gamification';
import { BankManager } from './BankManager';
import { GabaritoManager } from './GabaritoManager';
import { Modal } from './ui/Modal';
import { Tabs, TabItem } from './ui/Tabs';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ConfirmDialog } from './ui/ConfirmDialog';
import { useToast } from './ui/Toast';
import { Database, CheckSquare, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  progressMap: Record<string, UserProgressItem>;
  stats: UserStats;
  settings: UserSettings;
  onSaveQuestion: (question: Question) => Promise<void>;
  onBatchSaveQuestions: (questions: Question[]) => Promise<void>;
  onDeleteQuestion: (questionId: string) => Promise<void>;
  onResetProgress: () => Promise<void>;
  onRestoreOriginalSeed: () => Promise<void>;
  onReloadAllData: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  questions,
  progressMap,
  stats,
  settings,
  onSaveQuestion,
  onBatchSaveQuestions,
  onDeleteQuestion,
  onResetProgress,
  onRestoreOriginalSeed,
  onReloadAllData,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'bank' | 'gabarito' | 'reset'>('bank');
  const [gabaritoIndex, setGabaritoIndex] = useState(0);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // Tab items
  const tabItems: TabItem[] = [
    { id: 'bank', label: 'Questões', icon: <Database className="w-3.5 h-3.5 stroke-[1.75]" /> },
    { id: 'gabarito', label: 'Gabarito', icon: <CheckSquare className="w-3.5 h-3.5 stroke-[1.75]" /> },
    { id: 'reset', label: 'Progresso', icon: <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" /> },
  ];

  // Stats calculation for Progresso tab (3 números 20/600 tabular + rótulo 12 muted)
  const statsSummary = useMemo(() => {
    let decoradas = 0;
    let emAndamento = 0;
    let nuncaVistas = 0;

    questions.forEach((q) => {
      const p = progressMap[q.id];
      if (isQuestionMastered(p)) {
        decoradas++;
      } else if (p && (p.timesCorrect > 0 || p.timesIncorrect > 0)) {
        emAndamento++;
      } else {
        nuncaVistas++;
      }
    });

    return { decoradas, emAndamento, nuncaVistas };
  }, [questions, progressMap]);

  const handleExecuteReset = async () => {
    await onResetProgress();
    setIsConfirmDialogOpen(false);
    showToast('Todo o progresso de memorização foi zerado.');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Administração"
        maxWidth="960px"
        headerActions={
          <Tabs
            items={tabItems}
            activeId={activeTab}
            onChange={(id) => setActiveTab(id as 'bank' | 'gabarito' | 'reset')}
          />
        }
      >
        {activeTab === 'bank' && (
          <BankManager
            questions={questions}
            progressMap={progressMap}
            stats={stats}
            settings={settings}
            onSaveQuestion={onSaveQuestion}
            onDeleteQuestion={onDeleteQuestion}
            onResetProgress={onResetProgress}
            onRestoreOriginalSeed={onRestoreOriginalSeed}
            onReloadAllData={onReloadAllData}
            onOpenGabarito={(idx) => {
              setGabaritoIndex(idx);
              setActiveTab('gabarito');
            }}
          />
        )}

        {activeTab === 'gabarito' && (
          <GabaritoManager
            questions={questions}
            onSaveQuestion={onSaveQuestion}
            onBatchSaveQuestions={onBatchSaveQuestions}
            onClose={() => setActiveTab('bank')}
            initialQuestionIndex={gabaritoIndex}
          />
        )}

        {activeTab === 'reset' && (
          <div className="max-w-xl mx-auto py-6 sm:py-10 space-y-6">
            {/* 3 Metrics: decoradas, em andamento, nunca vistas */}
            <Card>
              <h3 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-4">
                Resumo da Memorização
              </h3>

              <div className="grid grid-cols-3 gap-4 text-center divide-x divide-border">
                <div className="px-2">
                  <div className="text-[20px] font-semibold text-text tabular-nums">
                    {statsSummary.decoradas}
                  </div>
                  <div className="text-[12px] text-muted mt-0.5">
                    Decoradas
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-[20px] font-semibold text-text tabular-nums">
                    {statsSummary.emAndamento}
                  </div>
                  <div className="text-[12px] text-muted mt-0.5">
                    Em andamento
                  </div>
                </div>

                <div className="px-2">
                  <div className="text-[20px] font-semibold text-text tabular-nums">
                    {statsSummary.nuncaVistas}
                  </div>
                  <div className="text-[12px] text-muted mt-0.5">
                    Nunca vistas
                  </div>
                </div>
              </div>
            </Card>

            {/* Reset Card */}
            <Card className="space-y-4">
              <div>
                <h4 className="text-[16px] font-semibold text-text leading-snug mb-1">
                  Reiniciar Progresso
                </h4>
                <p className="text-[13px] text-muted leading-relaxed">
                  Zera o histórico de acertos, erros e as caixas Leitner de todas as questões.
                  As questões cadastradas, imagens e gabarito <strong>não</strong> serão apagados.
                </p>
              </div>

              <div>
                <Button
                  variant="danger"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  Zerar progresso
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Modal>

      {/* ConfirmDialog for resetting progress */}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Zerar todo o progresso?"
        message="Esta ação moverá todas as questões de volta para a Caixa 1 e apagará os contadores de acertos e erros. Esta operação não pode ser desfeita."
        confirmLabel="Zerar progresso"
        variant="danger"
        onConfirm={handleExecuteReset}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </>
  );
};
