import React, { useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { EXAM_DOMAINS } from '../utils/domains';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Chip } from './ui/Chip';
import { Kbd } from './ui/Kbd';
import { useToast } from './ui/Toast';
import { Textarea } from './ui/Textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  MoreHorizontal, 
  FileText, 
  Download 
} from 'lucide-react';

interface GabaritoManagerProps {
  questions: Question[];
  onSaveQuestion: (updated: Question) => Promise<void>;
  onBatchSaveQuestions: (updated: Question[]) => Promise<void>;
  onClose: () => void;
  initialQuestionIndex?: number;
}

export const GabaritoManager: React.FC<GabaritoManagerProps> = ({
  questions,
  onSaveQuestion,
  onBatchSaveQuestions,
  onClose,
  initialQuestionIndex = 0,
}) => {
  const { showToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(initialQuestionIndex);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string>('');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchText, setBatchText] = useState('');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ) {
      setSelectedLetters(currentQ.correctAnswers || []);
      setExplanation(currentQ.explanation || '');
    }
  }, [currentQ]);

  // Keyboard navigation (‹ › and A-E)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA'].includes(activeTag) || showBatchModal) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else {
        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D', 'E'].includes(key)) {
          if (currentQ?.options.some((o) => o.letter === key)) {
            e.preventDefault();
            handleToggleLetter(key);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, currentQ, showBatchModal]);

  const handleToggleLetter = (letter: string) => {
    if (!currentQ) return;
    if (currentQ.isMultipleChoice) {
      setSelectedLetters((prev) =>
        prev.includes(letter) ? prev.filter((l) => l !== letter) : [...prev, letter]
      );
    } else {
      setSelectedLetters([letter]);
    }
  };

  const handleSaveCurrent = async () => {
    if (!currentQ) return;
    const updated: Question = {
      ...currentQ,
      correctAnswers: selectedLetters,
      explanation,
      isModified: true, // B1: mark as user modified
    };
    await onSaveQuestion(updated);
    showToast(`Gabarito da Questão #${currentQ.docNumber} salvo!`);
  };

  const handleApplyBatchGabarito = async () => {
    // Parse batch lines: "1: A", "8: A, B", "Q11: A", etc.
    const lines = batchText.split('\n');
    const updatesMap = new Map<number, string[]>();

    for (const line of lines) {
      const match = line.match(/(?:Q|Quest[aã]o\s*)?(\d+)\s*[:=\-]\s*([A-E,\s]+)/i);
      if (match) {
        const num = parseInt(match[1]);
        const answers = match[2]
          .split(/[,;\s]+/)
          .map((s) => s.trim().toUpperCase())
          .filter((s) => ['A', 'B', 'C', 'D', 'E'].includes(s));

        if (answers.length > 0) {
          updatesMap.set(num, answers);
        }
      }
    }

    if (updatesMap.size === 0) {
      showToast('Nenhum formato de gabarito válido encontrado.', 'danger');
      return;
    }

    const updatedList = questions.map((q) => {
      if (updatesMap.has(q.docNumber)) {
        return {
          ...q,
          correctAnswers: updatesMap.get(q.docNumber)!,
          isModified: true,
        };
      }
      return q;
    });

    await onBatchSaveQuestions(updatedList);
    setShowBatchModal(false);
    setBatchText('');
    showToast(`${updatesMap.size} questões atualizadas com sucesso!`);
  };

  if (!currentQ) {
    return (
      <div className="text-center py-12 text-muted text-[14px]">
        Nenhuma questão encontrada.
      </div>
    );
  }

  const statement =
    currentQ.blocks.find((b) => b.type === 'text' && b.content)?.content || '';

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="space-y-6">
      {/* Simple Header: Questão X de Y + progress bar + nav + kbd */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-semibold text-text whitespace-nowrap">
            Questão {currentQ.docNumber} de {questions.length}
          </span>

          <div className="w-24 sm:w-32 h-1 bg-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-faint">
            <Kbd>‹</Kbd> <Kbd>›</Kbd> navegar
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation IconButtons */}
          <IconButton
            aria-label="Questão anterior"
            tooltip="Anterior (Seta Esquerda)"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.75]" />
          </IconButton>

          <IconButton
            aria-label="Próxima questão"
            tooltip="Próxima (Seta Direita)"
            disabled={currentIndex === questions.length - 1}
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          >
            <ChevronRight className="w-4 h-4 stroke-[1.75]" />
          </IconButton>

          <div className="w-[1px] h-4 bg-border mx-1" />

          {/* MoreHorizontal Menu */}
          <div className="relative">
            <IconButton
              aria-label="Mais opções"
              tooltip="Opções de gabarito"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            >
              <MoreHorizontal className="w-4 h-4 stroke-[1.75]" />
            </IconButton>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-11 z-30 w-44 bg-surface border border-border rounded-md shadow-pop py-1 text-[13px] text-text">
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreMenuOpen(false);
                    setShowBatchModal(true);
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-subtle flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-muted stroke-[1.75]" />
                  <span>Importar em lote</span>
                </button>
              </div>
            )}
          </div>

          <Button variant="primary" size="sm" onClick={handleSaveCurrent}>
            Salvar alteração
          </Button>
        </div>
      </div>

      {/* Main Content: Question statement and options in "definir gabarito" mode */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {currentQ.domain && EXAM_DOMAINS[currentQ.domain] && (
            <Chip variant="neutral">
              {EXAM_DOMAINS[currentQ.domain].namePt}
            </Chip>
          )}
          <Chip variant="neutral">
            {currentQ.isMultipleChoice ? `Múltipla (${currentQ.requiredAnswersCount})` : 'Escolha Única'}
          </Chip>
        </div>

        <p className="text-[15px] font-normal text-text leading-relaxed whitespace-pre-line">
          {statement}
        </p>

        {/* Options to mark correct answer */}
        <div className="space-y-2 pt-2">
          <p className="text-[12px] text-muted font-medium">
            Clique na alternativa para definir o gabarito oficial:
          </p>

          {currentQ.options.map((option) => {
            const isCorrect = selectedLetters.includes(option.letter);

            return (
              <div
                key={option.id || option.letter}
                onClick={() => handleToggleLetter(option.letter)}
                className={`p-3.5 rounded-md border flex items-center justify-between gap-3.5 cursor-pointer transition-colors select-none ${
                  isCorrect
                    ? 'bg-success-soft border-success text-text'
                    : 'bg-surface border-border hover:border-border-strong text-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-sm flex items-center justify-center text-[12px] font-semibold ${
                      isCorrect
                        ? 'bg-success text-on-accent border border-success'
                        : 'bg-subtle text-muted border border-border'
                    }`}
                  >
                    {option.letter}
                  </span>
                  <span className="text-[15px] text-text">{option.text}</span>
                </div>

                {isCorrect && (
                  <Check className="w-4 h-4 text-success stroke-[2]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation editor field */}
        <div className="pt-4 border-t border-border">
          <label className="block text-[13px] font-semibold text-muted mb-2">
            Explicação da Questão
          </label>
          <Textarea
            rows={5}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="**Conceito:** ..."
          />
        </div>
      </div>

      {/* Batch Import Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-overlay backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-lg shadow-pop p-6 max-w-[500px] w-full space-y-4">
            <h3 className="text-[18px] font-semibold text-text">
              Importar Gabarito em Lote
            </h3>
            <p className="text-[13px] text-muted leading-relaxed">
              Cole linhas no formato: <code className="bg-subtle px-1 rounded-xs">1: A</code>,{' '}
              <code className="bg-subtle px-1 rounded-xs">8: A, B</code>, ou{' '}
              <code className="bg-subtle px-1 rounded-xs">Q31: C</code>
            </p>
            <Textarea
              rows={8}
              value={batchText}
              onChange={(e) => setBatchText(e.target.value)}
              placeholder="1: A&#10;2: A&#10;3: A, B"
            />
            <div className="flex justify-end gap-2.5">
              <Button variant="secondary" onClick={() => setShowBatchModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleApplyBatchGabarito}>
                Aplicar gabarito
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
