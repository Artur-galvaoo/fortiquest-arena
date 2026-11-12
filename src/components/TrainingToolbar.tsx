import React, { useEffect, useState } from 'react';
import { Shuffle, ListOrdered, Timer, Pause, Play, Square, Flag, Hourglass, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { EXAM_LIMIT_MINUTES, EXAM_LIMIT_MS, ExamSession, formatClock } from '../utils/exam';

interface Props {
  shuffleOn: boolean;
  onToggleShuffle: () => void;
  session: ExamSession;
  elapsed: number;
  onStartExam: () => void;
  onStopExam: () => void;
  onTogglePause: () => void;
  totalQuestions: number;
}

const Segment: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  title: string;
}> = ({ active, onClick, icon, label, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    aria-pressed={active}
    className={`h-8 px-3 inline-flex items-center gap-1.5 rounded-full text-[12.5px] font-semibold transition-all cursor-pointer select-none ${
      active ? 'bg-surface text-text shadow-card' : 'text-muted hover:text-text'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const TrainingToolbar: React.FC<Props> = ({
  shuffleOn,
  onToggleShuffle,
  session,
  elapsed,
  onStartExam,
  onStopExam,
  onTogglePause,
  totalQuestions,
}) => {
  const overLimit = elapsed >= EXAM_LIMIT_MS;
  const pct = Math.min(100, (elapsed / EXAM_LIMIT_MS) * 100);
  const paused = session.active && !session.runningSince;
  const [hidden, setHidden] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fq-exam-hidden') === '1';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('fq-exam-hidden', hidden ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [hidden]);

  const covered = Math.min(totalQuestions, (session.seenIds || []).length);
  const coveragePct = totalQuestions > 0 ? Math.round((covered / totalQuestions) * 100) : 0;

  const avgMs = session.answered > 0 ? elapsed / session.answered : null;
  const accuracy = session.answered > 0 ? Math.round((session.correct / session.answered) * 100) : null;

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Order mode */}
        <div className="inline-flex p-1 rounded-full bg-subtle border border-border" role="group" aria-label="Ordem das alternativas">
          <Segment
            active={!shuffleOn}
            onClick={() => shuffleOn && onToggleShuffle()}
            icon={<ListOrdered className="w-3.5 h-3.5 stroke-[2]" />}
            label="Ordem original"
            title="Alternativas na ordem do dump"
          />
          <Segment
            active={shuffleOn}
            onClick={() => !shuffleOn && onToggleShuffle()}
            icon={<Shuffle className="w-3.5 h-3.5 stroke-[2]" />}
            label="Embaralhar"
            title="Alternativas em ordem aleatória a cada questão (letras renomeadas)"
          />
        </div>

        {/* Exam mode */}
        {!session.active ? (
          <button
            type="button"
            onClick={onStartExam}
            className="h-10 px-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface text-[13px] font-semibold text-text hover:border-accent hover:text-accent transition-colors cursor-pointer"
            title="Inicia contador de questões e cronômetro"
          >
            <Timer className="w-4 h-4 stroke-[2]" />
            Modo prova
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setHidden((h) => !h)}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full text-muted hover:text-text hover:bg-subtle transition-colors cursor-pointer"
              aria-label={hidden ? 'Mostrar tempo e estatísticas' : 'Esconder tempo e estatísticas'}
              aria-expanded={!hidden}
              title={hidden ? 'Mostrar tempo' : 'Esconder tempo'}
            >
              <span key={hidden ? 'eye' : 'eyeoff'} className="fq-spin-in inline-flex">
                {hidden ? <Eye className="w-4 h-4 stroke-[2]" /> : <EyeOff className="w-4 h-4 stroke-[2]" />}
              </span>
            </button>
            <button
              type="button"
              onClick={onTogglePause}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full text-muted hover:text-text hover:bg-subtle transition-colors cursor-pointer"
              aria-label={paused ? 'Retomar cronômetro' : 'Pausar cronômetro'}
              title={paused ? 'Retomar' : 'Pausar'}
            >
              {paused ? <Play className="w-4 h-4 stroke-[2]" /> : <Pause className="w-4 h-4 stroke-[2]" />}
            </button>
            <button
              type="button"
              onClick={onStopExam}
              className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full text-[12.5px] font-semibold text-muted hover:text-danger hover:bg-danger-soft transition-colors cursor-pointer"
              title="Encerrar simulado e zerar contadores"
            >
              <Square className="w-3.5 h-3.5 stroke-[2]" />
              Encerrar
            </button>
          </div>
        )}
      </div>

      {session.active && (
        <div className="fq-enter">
        {/* Collapsed pill */}
        <div className={`fq-collapse ${hidden ? '' : 'is-collapsed'}`} aria-hidden={!hidden}>
          <div className="fq-collapse-inner">
            <div className="fq-collapse-content pb-1">
              <button
                type="button"
                onClick={() => setHidden(false)}
                tabIndex={hidden ? 0 : -1}
                className="group w-full h-11 px-4 flex items-center justify-between rounded-full border border-border bg-surface/80 backdrop-blur shadow-card text-[13px] text-muted hover:text-text hover:border-border-strong transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <span className="relative flex w-2 h-2">
                    {!paused && (
                      <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${overLimit ? 'bg-danger' : 'bg-accent'}`} />
                    )}
                    <span className={`relative w-2 h-2 rounded-full ${overLimit ? 'bg-danger' : paused ? 'bg-faint' : 'bg-accent'}`} />
                  </span>
                  <span className="font-semibold text-text">Simulado {paused ? 'pausado' : 'em andamento'}</span>
                  <span className="hidden sm:inline">· tempo oculto</span>
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  Mostrar
                  <ChevronDown className="w-4 h-4 stroke-[2] transition-transform group-hover:translate-y-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Full panel */}
        <div className={`fq-collapse ${hidden ? 'is-collapsed' : ''}`} aria-hidden={hidden}>
          <div className="fq-collapse-inner">
        <div
          className={`fq-collapse-content rounded-xl border p-4 sm:p-5 shadow-card transition-colors ${
            overLimit ? 'bg-danger-soft border-danger/40' : 'bg-surface border-border'
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
            <CoverageRing pct={coveragePct} covered={covered} total={totalQuestions} />
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-muted flex items-center gap-1.5">
                <Hourglass className="w-3.5 h-3.5 stroke-[2]" />
                Simulado {paused && <span className="text-accent normal-case tracking-normal">· pausado</span>}
              </p>
              <p
                className={`font-display text-[36px] leading-none font-bold tabular-nums mt-1.5 ${
                  overLimit ? 'text-danger' : 'text-text'
                } ${paused ? 'opacity-50' : ''}`}
                aria-live="off"
              >
                {formatClock(elapsed)}
              </p>
            </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:text-right">
              <Stat label="Respondidas" value={session.answered} />
              <Stat label="Acertos" value={session.correct} tone="success" />
              <Stat label="Erros" value={session.answered - session.correct} tone="danger" />
              <Stat label="Aproveit." value={accuracy === null ? '–' : `${accuracy}%`} />
              <Stat label="Média/questão" value={avgMs === null ? '–' : formatClock(avgMs)} tone="accent" />
            </div>
          </div>

          {/* Time bar with exam-limit marker */}
          <div className="relative mt-4 h-2 rounded-full bg-subtle overflow-hidden">
            <div
              className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
                overLimit ? 'bg-danger' : 'bg-gradient-to-r from-accent to-[#E0479E]'
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[12.5px]">
            <span className="text-muted">
              A prova acontece em <strong className="text-text font-semibold">{EXAM_LIMIT_MINUTES} minutos</strong>
            </span>
            {overLimit ? (
              <span className="inline-flex items-center gap-1.5 font-semibold text-danger">
                <Flag className="w-3.5 h-3.5 stroke-[2.25]" />
                Limite de tempo da prova atingido · +{formatClock(elapsed - EXAM_LIMIT_MS)}
              </span>
            ) : (
              <span className="text-muted tabular-nums">
                faltam {formatClock(EXAM_LIMIT_MS - elapsed)}
              </span>
            )}
          </div>
        </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

const Stat: React.FC<{ label: string; value: React.ReactNode; tone?: 'success' | 'danger' | 'accent' }> = ({
  label,
  value,
  tone,
}) => (
  <div>
    <p
      className={`font-display text-[20px] font-bold leading-none tabular-nums ${
        tone === 'success' ? 'text-success' : tone === 'danger' ? 'text-danger' : tone === 'accent' ? 'text-accent' : 'text-text'
      }`}
    >
      {value}
    </p>
    <p className="text-[11px] text-muted mt-1">{label}</p>
  </div>
);

/** Circular progress showing how much of the question bank this session has covered. */
const CoverageRing: React.FC<{ pct: number; covered: number; total: number }> = ({ pct, covered, total }) => {
  const r = 26;
  const c = 2 * Math.PI * r;
  const complete = covered >= total && total > 0;
  return (
    <div
      className="relative w-[68px] h-[68px] shrink-0"
      role="img"
      aria-label={`Cobertura: ${covered} de ${total} questões (${pct}%)`}
      title={`${covered} de ${total} questões diferentes respondidas neste simulado`}
    >
      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="fq-ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="#E0479E" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-subtle)" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={complete ? 'var(--color-success)' : 'url(#fq-ring-grad)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.32,.72,0,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className={`font-display text-[15px] font-bold tabular-nums ${complete ? 'text-success' : 'text-text'}`}>
          {pct}%
        </span>
        <span className="text-[9.5px] text-muted tabular-nums mt-0.5">
          {covered}/{total}
        </span>
      </div>
    </div>
  );
};
