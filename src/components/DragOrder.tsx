import React, { useRef, useState } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { GripVertical, Check, X } from 'lucide-react';
import { DisplayOption } from '../utils/shuffle';

interface Props {
  items: DisplayOption[];
  /** One entry per slot: original option letter or '' when empty */
  slots: string[];
  onChange: (slots: string[]) => void;
  submitted: boolean;
  correct: string[];
}

const SPRING = { type: 'spring', stiffness: 520, damping: 38, mass: 0.8 } as const;

export const DragOrder: React.FC<Props> = ({ items, slots, onChange, submitted, correct }) => {
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const poolRef = useRef<HTMLDivElement | null>(null);
  const [hoverSlot, setHoverSlot] = useState<number | null>(null);
  const [hoverPool, setHoverPool] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const justDragged = useRef(false);

  const byLetter = Object.fromEntries(items.map((d) => [d.option.letter, d]));
  const pool = items.filter((d) => !slots.includes(d.option.letter));

  const hit = (x: number, y: number): number | 'pool' | null => {
    for (let i = 0; i < slotRefs.current.length; i++) {
      const r = slotRefs.current[i]?.getBoundingClientRect();
      if (r && x >= r.left && x <= r.right && y >= r.top - 6 && y <= r.bottom + 6) return i;
    }
    const pr = poolRef.current?.getBoundingClientRect();
    if (pr && x >= pr.left && x <= pr.right && y >= pr.top && y <= pr.bottom) return 'pool';
    return null;
  };

  const place = (letter: string, target: number | 'pool') => {
    const next = slots.slice();
    const from = next.indexOf(letter);
    if (target === 'pool') {
      if (from >= 0) next[from] = '';
    } else {
      const occupant = next[target];
      if (from >= 0) next[from] = occupant || ''; // swap when moving between slots
      else if (occupant) {
        /* occupant goes back to the pool */
      }
      next[target] = letter;
    }
    onChange(next);
  };

  const clickPlace = (letter: string) => {
    if (submitted || justDragged.current) return;
    const from = slots.indexOf(letter);
    if (from >= 0) return place(letter, 'pool');
    const empty = slots.indexOf('');
    if (empty >= 0) place(letter, empty);
  };

  const pointOf = (e: MouseEvent | TouchEvent | PointerEvent) => {
    if ('changedTouches' in e && e.changedTouches.length) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    const p = e as PointerEvent;
    return { x: p.clientX, y: p.clientY };
  };

  // Plain render function (not a component) so tiles are not remounted mid-drag
  const renderTile = (d: DisplayOption, inSlot: boolean, slotIndex?: number) => {
    const letter = d.option.letter;
    const isRight = submitted && inSlot && slotIndex !== undefined && correct[slotIndex] === letter;
    const isWrong = submitted && inSlot && !isRight;
    const isLeftover = submitted && !inSlot;
    return (
      <motion.div
        key={letter}
        layoutId={`dd-${letter}`}
        layout
        transition={SPRING}
        drag={!submitted}
        dragSnapToOrigin
        dragElastic={0.18}
        dragMomentum={false}
        whileDrag={{ scale: 1.05, rotate: -1.2, zIndex: 60, boxShadow: '0 22px 44px -14px rgba(0,0,0,.35)' }}
        whileHover={!submitted ? { y: -2 } : undefined}
        whileTap={!submitted ? { scale: 0.98 } : undefined}
        onDragStart={() => {
          setDragging(letter);
          justDragged.current = true;
        }}
        onDrag={(e) => {
          const { x, y } = pointOf(e as PointerEvent);
          const h = hit(x, y);
          setHoverSlot(typeof h === 'number' ? h : null);
          setHoverPool(h === 'pool' && inSlot);
        }}
        onDragEnd={(e) => {
          const { x, y } = pointOf(e as PointerEvent);
          const h = hit(x, y);
          setDragging(null);
          setHoverSlot(null);
          setHoverPool(false);
          if (h !== null) place(letter, h);
          window.setTimeout(() => (justDragged.current = false), 60);
        }}
        onClick={() => clickPlace(letter)}
        style={{ touchAction: 'none', position: 'relative', zIndex: dragging === letter ? 60 : 1 }}
        className={`group flex items-center gap-2.5 w-full min-h-[48px] px-3 py-2.5 rounded-lg border select-none text-[14.5px] font-medium leading-snug ${
          submitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        } ${
          isRight
            ? 'bg-success-soft border-success text-text'
            : isWrong
              ? 'bg-danger-soft border-danger text-text'
              : isLeftover
                ? 'bg-surface border-border text-muted opacity-60'
                : 'bg-surface border-border text-text shadow-card hover:border-border-strong'
        }`}
      >
        <span
          className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[12px] font-semibold ${
            isRight
              ? 'bg-success text-on-accent'
              : isWrong
                ? 'bg-danger text-on-accent'
                : 'bg-subtle text-muted border border-border'
          }`}
        >
          {d.displayLetter}
        </span>
        <span className="flex-1">{d.option.text}</span>
        {!submitted && <GripVertical className="w-4 h-4 text-faint shrink-0 stroke-[1.75]" />}
        {isRight && <Check className="w-4 h-4 text-success shrink-0 stroke-[2.25]" />}
        {isWrong && <X className="w-4 h-4 text-danger shrink-0 stroke-[2.25]" />}
      </motion.div>
    );
  };

  return (
    <LayoutGroup id="drag-order">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 mb-2">
        {/* Source pool */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-muted mb-2">Critérios</p>
          <div
            ref={poolRef}
            className={`min-h-[120px] p-2.5 rounded-xl border border-dashed space-y-2 transition-colors ${
              hoverPool ? 'border-accent bg-accent-soft' : 'border-border bg-subtle/60'
            }`}
          >
            {pool.map((d) => (
              renderTile(d, false)
            ))}
            {pool.length === 0 && (
              <p className="text-[12.5px] text-faint text-center py-8">Todas as caixas foram posicionadas</p>
            )}
          </div>
        </div>

        {/* Target slots */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-muted mb-2">
            Ordem de eleição do primário
          </p>
          <div className="space-y-2.5">
            {slots.map((letter, i) => {
              const d = letter ? byLetter[letter] : null;
              const wrongHere = submitted && correct[i] !== letter;
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="font-display text-[15px] font-bold text-faint w-5 pt-3 text-right tabular-nums">{i + 1}</span>
                  <div className="flex-1">
                    <div
                      ref={(el) => {
                        slotRefs.current[i] = el;
                      }}
                      className={`min-h-[52px] rounded-lg transition-all duration-200 ${
                        d
                          ? ''
                          : `border-[1.5px] border-dashed flex items-center justify-center text-[12.5px] ${
                              hoverSlot === i
                                ? 'border-accent bg-accent-soft text-accent scale-[1.02]'
                                : 'border-border-strong text-faint'
                            }`
                      } ${d && hoverSlot === i ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg' : ''}`}
                    >
                      {d ? renderTile(d, true, i) : dragging ? 'Solte aqui' : 'Arraste para cá'}
                    </div>
                    {wrongHere && byLetter[correct[i]] && (
                      <p className="text-[12px] text-success mt-1 pl-1">
                        Correto: <span className="font-semibold">{byLetter[correct[i]].option.text}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!submitted && (
        <p className="text-[12px] text-faint mt-2 pl-1">
          Arraste as caixas ou toque nelas para preencher a próxima posição. Toque numa caixa posicionada para devolver.
        </p>
      )}
    </LayoutGroup>
  );
};
