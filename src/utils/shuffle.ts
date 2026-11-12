import { OptionItem } from '../types/quiz';

export const DISPLAY_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export interface DisplayOption {
  option: OptionItem;
  /** Letter shown on screen (positional) */
  displayLetter: string;
}

/** Fisher–Yates shuffle that never returns the original order when more than one item exists. */
export function shuffleOptions(options: OptionItem[], rand: () => number = Math.random): OptionItem[] {
  const arr = options.slice();
  if (arr.length < 2) return arr;
  for (let attempt = 0; attempt < 6; attempt++) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.some((o, i) => o.letter !== options[i].letter)) return arr;
  }
  // Fallback: rotate by one
  return [...options.slice(1), options[0]];
}

/** Builds the on-screen list. With shuffle off, letters stay as in the exam dump. */
export function buildDisplayOptions(options: OptionItem[], shuffled: boolean, rand?: () => number): DisplayOption[] {
  const ordered = shuffled ? shuffleOptions(options, rand) : options;
  return ordered.map((option, idx) => ({
    option,
    displayLetter: shuffled ? DISPLAY_LETTERS[idx] : option.letter,
  }));
}

/** Maps original letter -> letter shown on screen. */
export function originalToDisplayMap(display: DisplayOption[]): Record<string, string> {
  return Object.fromEntries(display.map((d) => [d.option.letter, d.displayLetter]));
}
