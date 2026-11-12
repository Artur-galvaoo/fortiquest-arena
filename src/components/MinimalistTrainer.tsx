import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Question, UserProgressItem, ContentBlock } from '../types/quiz';
import { EXAM_DOMAINS } from '../utils/domains';
import { isQuestionMastered, selectNextLeitnerQuestion } from '../utils/gamification';
import { parseInlineMarkdown } from '../utils/markdown';
import { ImageLightbox } from './ImageLightbox';
import { Button } from './ui/Button';
import { IconButton } from './ui/IconButton';
import { Chip } from './ui/Chip';
import { Kbd } from './ui/Kbd';
import { EmptyState } from './ui/EmptyState';
import { 
  Settings, 
  ZoomIn, 
  ImagePlus, 
  Copy, 
  Check, 
  X, 
  CircleCheck, 
  CircleX, 
  CheckCircle2, 
  AlertCircle,
  Sun,
  Moon,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../utils/theme';
import { buildDisplayOptions, originalToDisplayMap, DISPLAY_LETTERS } from '../utils/shuffle';
import { useExamSession, useTrainerPrefs } from '../utils/exam';
import { TrainingToolbar } from './TrainingToolbar';

interface MinimalistTrainerProps {
  questions: Question[];
  progressMap: Record<string, UserProgressItem>;
  onUpdateProgress: (item: UserProgressItem) => Promise<void>;
  onSaveQuestion: (question: Question) => Promise<void>;
  onOpenSettings: () => void;
  isSettingsOpen: boolean;
}

export const MinimalistTrainer: React.FC<MinimalistTrainerProps> = ({
  questions,
  progressMap,
  onUpdateProgress,
  onSaveQuestion,
  onOpenSettings,
  isSettingsOpen,
}) => {
  // Mode: All questions vs Only Errored questions
  const { theme, toggle: toggleTheme } = useTheme();
  const [onlyErrorsMode, setOnlyErrorsMode] = useState(false);
  const [prefs, setPrefs] = useTrainerPrefs();
  const exam = useExamSession();
  const [pickCount, setPickCount] = useState(0);

  // Active question and history
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Selection & Feedback state
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // On-screen order of alternatives (reshuffled every time a question is drawn)
  const currentOptions = currentQuestion?.options;
  const displayOptions = useMemo(
    () => buildDisplayOptions(currentOptions || [], prefs.shuffleOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQuestion?.id, currentOptions, prefs.shuffleOptions, pickCount]
  );
  const toDisplay = useMemo(() => originalToDisplayMap(displayOptions), [displayOptions]);
  const showLetter = (orig: string) => toDisplay[orig] || orig;

  // Terminal & Image interactions
  const [copiedBlockId, setCopiedBlockId] = useState<string | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<{
    url?: string;
    label?: string;
    blockId?: string;
  } | null>(null);

  // B7: Valid questions (must have non-empty correctAnswers)
  const validQuestions = useMemo(() => {
    return questions.filter((q) => q.correctAnswers && q.correctAnswers.length > 0);
  }, [questions]);

  // Mastered count (3 consecutive correct or box 5)
  const masteredCount = useMemo(() => {
    return validQuestions.filter((q) => isQuestionMastered(progressMap[q.id])).length;
  }, [validQuestions, progressMap]);

  // Unmastered questions with past errors
  const erroredQuestions = useMemo(() => {
    return validQuestions.filter((q) => {
      const p = progressMap[q.id];
      return Boolean(p && p.timesIncorrect > 0 && !isQuestionMastered(p));
    });
  }, [validQuestions, progressMap]);

  // Candidate pool based on active filter
  const activePool = useMemo(() => {
    if (onlyErrorsMode) {
      return erroredQuestions;
    }
    return validQuestions;
  }, [onlyErrorsMode, erroredQuestions, validQuestions]);

  // Pick next question via Leitner
  const pickNextQuestion = useCallback(
    (poolToUse: Question[], avoidIds: string[] = recentIds) => {
      if (poolToUse.length === 0) {
        setCurrentQuestion(null);
        return;
      }
      try {
        const nextQ = selectNextLeitnerQuestion(poolToUse, progressMap, avoidIds);
        setCurrentQuestion(nextQ);
        setSelectedAnswers([]);
        setIsSubmitted(false);
        setIsAnswerCorrect(null);
        setRecentIds((prev) => [...prev.slice(-4), nextQ.id]);
        setPickCount((c) => c + 1);
      } catch (err) {
        console.error('Error selecting next question:', err);
      }
    },
    [progressMap, recentIds]
  );

  // Initialize or update current question on pool change
  useEffect(() => {
    if (!currentQuestion && activePool.length > 0) {
      pickNextQuestion(activePool, []);
    }
  }, [activePool, currentQuestion, pickNextQuestion]);

  // Handle toggling "Só as que errei"
  useEffect(() => {
    if (onlyErrorsMode && erroredQuestions.length > 0 && currentQuestion) {
      const isInErrors = erroredQuestions.some((q) => q.id === currentQuestion.id);
      if (!isInErrors && !isSubmitted) {
        pickNextQuestion(erroredQuestions, recentIds);
      }
    }
  }, [onlyErrorsMode, erroredQuestions, currentQuestion, isSubmitted, pickNextQuestion, recentIds]);

  // B4: Toggle or select option with auto-eviction of oldest selection if exceeding limit
  const handleToggleOption = useCallback(
    (letter: string) => {
      if (isSubmitted || !currentQuestion) return;

      const limit = currentQuestion.requiredAnswersCount || 1;

      if (!currentQuestion.isMultipleChoice || limit === 1) {
        // Single choice: pick directly
        setSelectedAnswers([letter]);
      } else {
        // Multiple choice
        setSelectedAnswers((prev) => {
          if (prev.includes(letter)) {
            return prev.filter((l) => l !== letter);
          }
          if (prev.length >= limit) {
            // Drop oldest selection(s) to make room
            return [...prev.slice(prev.length - limit + 1), letter];
          }
          return [...prev, letter];
        });
      }
    },
    [isSubmitted, currentQuestion]
  );

  // Confirm answer submission
  const handleConfirmAnswer = useCallback(async () => {
    if (isSubmitted || !currentQuestion) return;

    const requiredCount = currentQuestion.requiredAnswersCount || 1;
    if (selectedAnswers.length !== requiredCount) return;

    const correctList = (currentQuestion.correctAnswers || []).slice().sort();
    const userList = selectedAnswers.slice().sort();

    const isCorrect =
      correctList.length === userList.length &&
      correctList.every((val, index) => val === userList[index]);

    setIsAnswerCorrect(isCorrect);
    setIsSubmitted(true);
    exam.recordAnswer(isCorrect, currentQuestion.id);

    // Update Leitner progress
    const currentProg = progressMap[currentQuestion.id] || {
      questionId: currentQuestion.id,
      box: 1 as 1 | 2 | 3 | 4 | 5,
      consecutiveCorrect: 0,
      timesCorrect: 0,
      timesIncorrect: 0,
      lastAnsweredAt: null,
      lastResult: null,
    };

    let newConsecutive = currentProg.consecutiveCorrect;
    let newBox = currentProg.box;

    if (isCorrect) {
      newConsecutive += 1;
      newBox = Math.min(5, newBox + 1) as 1 | 2 | 3 | 4 | 5;
    } else {
      newConsecutive = 0;
      newBox = 1; // Wrong answer drops immediately to box 1
    }

    const updatedProgress: UserProgressItem = {
      ...currentProg,
      box: newBox,
      consecutiveCorrect: newConsecutive,
      timesCorrect: isCorrect ? currentProg.timesCorrect + 1 : currentProg.timesCorrect,
      timesIncorrect: !isCorrect ? currentProg.timesIncorrect + 1 : currentProg.timesIncorrect,
      lastAnsweredAt: Date.now(),
      lastResult: isCorrect ? 'correct' : 'incorrect',
    };

    await onUpdateProgress(updatedProgress);
  }, [isSubmitted, currentQuestion, selectedAnswers, progressMap, onUpdateProgress, exam.recordAnswer]);

  // Advance to next question
  const handleNextQuestion = useCallback(() => {
    pickNextQuestion(activePool);
  }, [activePool, pickNextQuestion]);

  // Global Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) || isSettingsOpen || activeLightboxImage) {
        return;
      }

      const key = e.key.toUpperCase();
      const keyMap: Record<string, string> = {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'E',
      };

      if (!isSubmitted && keyMap[key]) {
        const target = displayOptions[DISPLAY_LETTERS.indexOf(keyMap[key])];
        if (target) {
          e.preventDefault();
          handleToggleOption(target.option.letter);
          return;
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (!isSubmitted) {
          const req = currentQuestion?.requiredAnswersCount || 1;
          if (selectedAnswers.length === req) {
            handleConfirmAnswer();
          }
        } else {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSubmitted,
    selectedAnswers,
    currentQuestion,
    handleToggleOption,
    handleConfirmAnswer,
    handleNextQuestion,
    isSettingsOpen,
    activeLightboxImage,
    displayOptions,
  ]);

  // Copy CLI command
  const handleCopyCli = (blockId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedBlockId(blockId);
    setTimeout(() => setCopiedBlockId(null), 2000);
  };

  // Upload or replace image for block
  const handleUploadBlockImage = async (blockId: string, file: File) => {
    if (!currentQuestion) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const updatedBlocks = currentQuestion.blocks.map((b) =>
          b.id === blockId ? { ...b, url: dataUrl, pending: false } : b
        );
        const updatedQ = { ...currentQuestion, blocks: updatedBlocks };
        setCurrentQuestion(updatedQ);
        await onSaveQuestion(updatedQ);
      }
    };
    reader.readAsDataURL(file);
  };

  // Lightbox upload update
  const handleLightboxImageUploaded = async (newUrl: string) => {
    if (!currentQuestion || !activeLightboxImage?.blockId) return;
    const updatedBlocks = currentQuestion.blocks.map((b) =>
      b.id === activeLightboxImage.blockId ? { ...b, url: newUrl, pending: false } : b
    );
    const updatedQ = { ...currentQuestion, blocks: updatedBlocks };
    setCurrentQuestion(updatedQ);
    setActiveLightboxImage({ ...activeLightboxImage, url: newUrl });
    await onSaveQuestion(updatedQ);
  };

  // Paste image directly on pending exhibit
  const handlePasteOnPendingExhibit = (blockId: string, e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          handleUploadBlockImage(blockId, file);
          break;
        }
      }
    }
  };

  // Parse explanation with bold concept and CircleCheck/CircleX
  const renderExplanation = (explanationText?: string) => {
    if (!explanationText) return null;

    const rawLines = explanationText.split('\n').map((l) => l.trim()).filter(Boolean);
    const conceptLine = rawLines.find(
      (l) => l.toLowerCase().startsWith('**conceito:') || l.toLowerCase().startsWith('conceito:')
    );
    const letterOf = (l: string) =>
      l.replace(/^[-*]\s*/, '').replace(/^[✅❌]\s*/, '').match(/^([A-E]):/)?.[1];
    const otherLines = rawLines
      .filter((l) => l !== conceptLine)
      .map((l, i) => ({ l, i, d: letterOf(l) ? showLetter(letterOf(l)!) : null }))
      .sort((a, b) => (a.d && b.d ? a.d.localeCompare(b.d) : a.i - b.i))
      .map((x) => x.l);

    return (
      <div className="fq-enter relative overflow-hidden bg-surface border border-border rounded-xl p-5 sm:p-6 shadow-card mt-6 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-[#E0479E]">
        <h4 className="font-display text-[13px] font-semibold uppercase tracking-[.12em] text-accent mb-2">Por quê</h4>

        {conceptLine && (
          <div className="text-[15px] font-medium text-text leading-relaxed mb-4">
            {parseInlineMarkdown(conceptLine)}
          </div>
        )}

        {otherLines.length > 0 && (
          <ul className="space-y-2.5 text-[14px] text-muted">
            {otherLines.map((line, idx) => {
              const isCorrectCheck = line.includes('✅');
              const isWrongCross = line.includes('❌');
              const cleanBullet = line.replace(/^[-*]\s*/, '').replace(/^[✅❌]\s*/, '');

              // Check if line starts with alternative letter like "A:" or "B:"
              const matchLetter = cleanBullet.match(/^([A-E]):\s*(.*)$/);

              return (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="shrink-0 mt-0.5 select-none">
                    {isCorrectCheck ? (
                      <CircleCheck className="w-4 h-4 text-success stroke-[1.75]" />
                    ) : isWrongCross ? (
                      <CircleX className="w-4 h-4 text-danger stroke-[1.75]" />
                    ) : (
                      <span className="text-faint">•</span>
                    )}
                  </span>
                  <div>
                    {matchLetter ? (
                      <>
                        <span className="font-semibold text-text mr-1.5">
                          {showLetter(matchLetter[1])}:
                        </span>
                        <span>{parseInlineMarkdown(matchLetter[2])}</span>
                      </>
                    ) : (
                      <span>{parseInlineMarkdown(cleanBullet)}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  const progressPercent = validQuestions.length > 0
    ? Math.round((masteredCount / validQuestions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      {/* 2.1 Header: sticky, surface, border-b, height 56px, max 720px */}
      <header className="h-16 bg-surface/75 backdrop-blur-xl border-b border-border/70 sticky top-0 z-20 shrink-0">
        <div className="max-w-[720px] mx-auto h-full px-4 flex items-center justify-between gap-4">
          {/* Left: FortiQuest 15/600 + progress bar 4px + 34/77 decoradas 12 muted */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-accent to-[#E0479E] text-white flex items-center justify-center shadow-[0_6px_16px_-6px_var(--color-accent)]">
                <ShieldCheck className="w-[18px] h-[18px] stroke-[2]" />
              </span>
              <span className="font-display text-[18px] font-bold text-text tracking-tight hidden sm:inline">
                Forti<span className="text-accent">Quest</span>
              </span>
            </span>

            <div className="flex items-center gap-2">
              <div className="w-16 sm:w-28 h-1.5 bg-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-[#E0479E] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[12px] text-muted whitespace-nowrap tabular-nums">
                {masteredCount}/{validQuestions.length}<span className="hidden sm:inline"> decoradas</span>
              </span>
            </div>
          </div>

          {/* Right: toggle "Só as que errei · N" + IconButton engrenagem */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Chip
              clickable
              active={onlyErrorsMode}
              onClick={() => setOnlyErrorsMode(!onlyErrorsMode)}
              title="Filtrar apenas questões que você já errou e ainda não decorou"
            >
              <span className="hidden sm:inline">Só as que errei</span>
              <span className="sm:hidden">Erros</span>
              <span className="opacity-70">·</span>
              <span className="tabular-nums">{erroredQuestions.length}</span>
            </Chip>

            <IconButton
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo noturno'}
              tooltip={theme === 'dark' ? 'Modo claro' : 'Modo noturno'}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun key="sun" className="fq-spin-in w-4 h-4 stroke-[1.75]" />
              ) : (
                <Moon key="moon" className="fq-spin-in w-4 h-4 stroke-[1.75]" />
              )}
            </IconButton>

            <IconButton
              aria-label="Abrir administração"
              tooltip="Administração (Questões, Gabarito, Progresso)"
              onClick={onOpenSettings}
            >
              <Settings className="w-4 h-4 stroke-[1.75]" />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Main Single Column Container (max 720px) */}
      <main className="flex-1 max-w-[720px] w-full mx-auto px-4 py-6 sm:py-8">
        <TrainingToolbar
          shuffleOn={prefs.shuffleOptions}
          onToggleShuffle={() => setPrefs((p) => ({ ...p, shuffleOptions: !p.shuffleOptions }))}
          session={exam.session}
          elapsed={exam.elapsed}
          onStartExam={exam.start}
          onStopExam={exam.stop}
          onTogglePause={exam.togglePause}
          totalQuestions={validQuestions.length}
        />

        {/* Empty State when "Só as que errei" has no pending questions */}
        {onlyErrorsMode && erroredQuestions.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-8 sm:p-12 shadow-card my-8">
            <EmptyState
              icon={<CheckCircle2 className="w-5 h-5 text-success stroke-[1.75]" />}
              title="Nenhum erro pendente"
              description="Todas as questões com erros anteriores já foram decoradas ou você ainda não errou nenhuma."
              action={
                <Button variant="secondary" onClick={() => setOnlyErrorsMode(false)}>
                  Voltar para todas
                </Button>
              }
            />
          </div>
        ) : !currentQuestion ? (
          <div className="text-center py-16 text-muted text-[14px]">
            Carregando questões...
          </div>
        ) : (
          <div key={currentQuestion.id} className="fq-enter">
            {/* Question Heading: "Questão N" 18/600 + neutral chips */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <h1 className="font-display text-[24px] font-bold text-text leading-tight tracking-tight">
                Questão {currentQuestion.docNumber}
              </h1>

              <div className="flex items-center gap-1.5 flex-wrap">
                {currentQuestion.domain && EXAM_DOMAINS[currentQuestion.domain] && (
                  <Chip variant="neutral">
                    {EXAM_DOMAINS[currentQuestion.domain].namePt}
                  </Chip>
                )}
                {currentQuestion.isMultipleChoice && (
                  <Chip variant="neutral">
                    Escolha {currentQuestion.requiredAnswersCount}
                  </Chip>
                )}
              </div>
            </div>

            {/* Question Blocks & Statement */}
            <div className="space-y-4 mb-6">
              {currentQuestion.blocks.map((block: ContentBlock, index: number) => {
                if (block.type === 'text') {
                  return (
                    <div
                      key={block.id || index}
                      className="text-[16px] font-normal text-text leading-[1.65] whitespace-pre-line"
                    >
                      {block.content}
                    </div>
                  );
                }

                if (block.type === 'terminal') {
                  return (
                    <div
                      key={block.id || index}
                      className="rounded-lg bg-term-bg text-term-text overflow-hidden my-4 shadow-card border border-border"
                    >
                      <div className="h-8 px-3.5 bg-term-head border-b border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[12px] text-muted">CLI</span>
                        <button
                          type="button"
                          onClick={() => handleCopyCli(block.id, block.content || '')}
                          className="flex items-center gap-1 text-[12px] text-muted hover:text-text px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer"
                          title="Copiar texto do terminal"
                        >
                          {copiedBlockId === block.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-success stroke-[1.75]" />
                              <span className="text-success text-[12px]">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 stroke-[1.75]" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-[13px] leading-[1.55] overflow-x-auto whitespace-pre select-text text-term-text">
                        <code>{block.content}</code>
                      </pre>
                    </div>
                  );
                }

                if (block.type === 'image') {
                  const hasImage = Boolean(block.url);

                  return (
                    <div key={block.id || index} className="my-4">
                      {hasImage ? (
                        <div className="relative group inline-block max-w-full bg-surface border border-border rounded-lg p-2 shadow-card">
                          <img
                            src={block.url}
                            alt={block.label || `Exhibit da Questão ${currentQuestion.docNumber}`}
                            className="exhibit-img max-h-[380px] w-auto max-w-full object-contain rounded-[8px] cursor-pointer"
                            onClick={() =>
                              setActiveLightboxImage({
                                url: block.url,
                                label: block.label,
                                blockId: block.id,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setActiveLightboxImage({
                                url: block.url,
                                label: block.label,
                                blockId: block.id,
                              })
                            }
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/90 hover:bg-surface backdrop-blur text-muted hover:text-text border border-border flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                            title="Ampliar imagem"
                            aria-label="Ampliar imagem"
                          >
                            <ZoomIn className="w-4 h-4 stroke-[1.75]" />
                          </button>
                          {block.label && (
                            <p className="mt-2 text-[12px] text-faint text-center">
                              {block.label}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div
                          onPaste={(e) => handlePasteOnPendingExhibit(block.id, e)}
                          tabIndex={0}
                          className="border border-dashed border-border rounded-lg p-6 text-center bg-subtle focus:border-accent focus:outline-none transition-colors"
                        >
                          <ImagePlus className="w-6 h-6 text-faint stroke-[1.75] mx-auto mb-2" />
                          <p className="text-[13px] text-muted mb-1">
                            {block.label || 'Exhibit da questão'}
                          </p>
                          <p className="text-[11px] text-faint mb-3">
                            Cole com Ctrl+V ou selecione um arquivo
                          </p>
                          <label className="inline-block cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleUploadBlockImage(block.id, file);
                              }}
                            />
                            <Button variant="secondary" size="sm" type="button" className="pointer-events-none">
                              Anexar imagem
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Alternatives List */}
            <div className="space-y-2.5 mb-2" role="group" aria-label="Alternativas da questão">
              {displayOptions.map(({ option, displayLetter }) => {
                const letter = option.letter;
                const isSelected = selectedAnswers.includes(letter);
                const isCorrect = (currentQuestion.correctAnswers || []).includes(letter);

                // Styling logic per section 2.1
                let cardClass = 'bg-surface border border-border hover:border-border-strong hover:-translate-y-px hover:shadow-card text-text';
                let badgeClass = 'bg-subtle text-muted border border-border';

                if (!isSubmitted) {
                  if (isSelected) {
                    cardClass = 'bg-accent-soft border-[1.5px] border-accent text-text';
                    badgeClass = 'bg-accent text-on-accent border-accent font-semibold';
                  }
                } else {
                  if (isCorrect) {
                    cardClass = 'bg-success-soft border border-success text-text';
                    badgeClass = 'bg-success text-on-accent border-success font-semibold';
                  } else if (isSelected && !isCorrect) {
                    cardClass = 'bg-danger-soft border border-danger text-text';
                    badgeClass = 'bg-danger text-on-accent border-danger font-semibold';
                  } else {
                    cardClass = 'bg-surface border border-border text-muted opacity-75';
                    badgeClass = 'bg-subtle text-faint border border-border';
                  }
                }

                return (
                  <div
                    key={option.id || letter}
                    onClick={() => handleToggleOption(letter)}
                    className={`w-full p-3.5 sm:px-4 sm:py-3.5 rounded-lg flex items-center justify-between gap-3.5 transition-all duration-200 select-none ${
                      !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                    } ${cardClass}`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {/* Letter badge: 28x28, radius 8 */}
                      <span
                        className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[12px] font-semibold select-none ${badgeClass}`}
                      >
                        {displayLetter}
                      </span>

                      {/* Option Text: 16px, line-height 1.6 */}
                      <span className="text-[16px] leading-[1.6] break-words">
                        {option.text}
                      </span>
                    </div>

                    {/* Result icon after confirmation */}
                    {isSubmitted && (
                      <span className="shrink-0 ml-2">
                        {isCorrect ? (
                          <Check className="w-4 h-4 text-success stroke-[2]" aria-label="Opção correta" />
                        ) : isSelected && !isCorrect ? (
                          <X className="w-4 h-4 text-danger stroke-[2]" aria-label="Opção incorreta" />
                        ) : null}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selection status under options for multi-choice (B4) */}
            {currentQuestion.isMultipleChoice && !isSubmitted && (
              <p className="text-[12px] text-muted mb-4 pl-1">
                {selectedAnswers.length} de {currentQuestion.requiredAnswersCount} selecionadas
              </p>
            )}

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between gap-4 mt-6 pt-2">
              {!isSubmitted ? (
                <>
                  <div className="text-[12px] text-faint hidden sm:flex items-center gap-1.5">
                    <Kbd>A</Kbd>–<Kbd>E</Kbd> marcar · <Kbd>Enter</Kbd> confirmar
                  </div>

                  <div className="ml-auto">
                    <Button
                      variant="primary"
                      disabled={selectedAnswers.length !== (currentQuestion.requiredAnswersCount || 1)}
                      onClick={handleConfirmAnswer}
                    >
                      Confirmar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {isAnswerCorrect ? (
                      <Chip variant="success" className="px-3 py-1 h-auto text-[13px]">
                        Correto
                      </Chip>
                    ) : (
                      <Chip variant="danger" className="px-3 py-1 h-auto text-[13px]">
                        Incorreto · resposta {(currentQuestion.correctAnswers || []).map(showLetter).sort().join(', ')}
                      </Chip>
                    )}
                  </div>

                  <Button variant="primary" onClick={handleNextQuestion}>
                    Próxima
                  </Button>
                </>
              )}
            </div>

            {/* Explanation card (displayed after confirmation) */}
            {isSubmitted && renderExplanation(currentQuestion.explanation)}
          </div>
        )}
      </main>

      {/* Lightbox for zooming/pan */}
      <ImageLightbox
        isOpen={Boolean(activeLightboxImage)}
        imageUrl={activeLightboxImage?.url}
        label={activeLightboxImage?.label}
        onClose={() => setActiveLightboxImage(null)}
        onImageUploaded={handleLightboxImageUploaded}
      />
    </div>
  );
};
