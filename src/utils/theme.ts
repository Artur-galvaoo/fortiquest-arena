import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const KEY = 'fq-theme';
const META_COLORS: Record<Theme, string> = { light: '#F5F4F1', dark: '#0D0D12' };

function readTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-anim');
    window.setTimeout(() => root.classList.remove('theme-anim'), 320);
  }
  root.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      return next;
    });
  }, []);

  return { theme, toggle };
}
