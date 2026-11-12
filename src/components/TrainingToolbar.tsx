import React from 'react';
import { Shuffle, ListOrdered, Timer, Pause, Play, Square, Flag, Hourglass } from 'lucide-react';
import { EXAM_LIMIT_MINUTES, EXAM_LIMIT_MS, ExamSession, formatClock } from '../utils/exam';

interface Props {
  shuffleOn: boolean;
  onToggleShuffle: () => void;
  session: ExamSession;
  elapsed: number;
  onStartExam: () => void;
  onStopExam: () => void;
  onTogglePause: () => void;
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
}) => {
  const overLimit = elapsed >= EXAM_LIMIT_MS;
  const pct = Math.min(100, (elapsed / EXAM_LIMIT_MS) * 100);
  const paused = session.active && !session.runningSince;
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
        <div
          className={`fq-enter rounded-xl border p-4 sm:p-5 shadow-card transition-colors ${
            overLimit ? 'bg-danger-soft border-danger/40' : 'bg-surface border-border'
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
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
