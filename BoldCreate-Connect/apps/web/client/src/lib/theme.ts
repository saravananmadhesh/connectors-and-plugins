import { useCallback, useEffect, useState } from 'react';

export type ThemeChoice = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'web-theme';

const CHOICES: readonly ThemeChoice[] = ['system', 'light', 'dark'];

const isChoice = (value: unknown): value is ThemeChoice => CHOICES.includes(value as ThemeChoice);

/** The saved choice; anything missing, unknown or unreadable counts as following the system. */
export function readTheme(): ThemeChoice {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isChoice(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

const prefersDark = (): boolean =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/** Whether the page should be dark for this choice. */
export const isDark = (choice: ThemeChoice): boolean =>
  choice === 'dark' || (choice === 'system' && prefersDark());

/** Puts the choice on the page: the `dark` class and the native color scheme. */
export function applyTheme(choice: ThemeChoice): void {
  const dark = isDark(choice);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

function saveTheme(choice: ThemeChoice): void {
  try {
    if (choice === 'system') window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked; the choice then lasts until the page closes.
  }
}

/** The current choice and a setter; while following the system, the page tracks OS changes. */
export function useTheme(): [ThemeChoice, (choice: ThemeChoice) => void] {
  const [choice, setChoice] = useState<ThemeChoice>(readTheme);

  const update = useCallback((next: ThemeChoice) => {
    saveTheme(next);
    applyTheme(next);
    setChoice(next);
  }, []);

  useEffect(() => {
    applyTheme(choice);
    if (choice !== 'system' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const follow = () => applyTheme('system');
    media.addEventListener('change', follow);
    return () => media.removeEventListener('change', follow);
  }, [choice]);

  return [choice, update];
}
