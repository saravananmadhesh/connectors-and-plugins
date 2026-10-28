import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '../components/ThemeToggle';
import { THEME_STORAGE_KEY, applyTheme, readTheme } from './theme';

type Listener = () => void;

/** Replaces `matchMedia`; the returned function flips the system preference and notifies. */
function stubSystem(initialDark: boolean) {
  let dark = initialDark;
  const listeners = new Set<Listener>();
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return dark;
      },
      addEventListener: (_: string, listener: Listener) => listeners.add(listener),
      removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    })),
  );
  return (next: boolean) => {
    dark = next;
    listeners.forEach((listener) => listener());
  };
}

const isDarkPage = () => document.documentElement.classList.contains('dark');

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.className = '';
  document.documentElement.removeAttribute('style');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('theme choice', () => {
  it('follows the system when nothing valid is saved', () => {
    expect(readTheme()).toBe('system');
    window.localStorage.setItem(THEME_STORAGE_KEY, 'purple');
    expect(readTheme()).toBe('system');
  });

  it('reads a saved light or dark choice', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(readTheme()).toBe('dark');
  });

  it('falls back to the system when storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readTheme()).toBe('system');
  });

  it('applies the dark class and color scheme, and stays light without matchMedia', () => {
    applyTheme('dark');
    expect(isDarkPage()).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
    applyTheme('system');
    expect(isDarkPage()).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe('light');
  });
});

describe('theme toggle', () => {
  it('switches the page and remembers the choice', async () => {
    stubSystem(false);
    render(<ThemeToggle />);
    const user = userEvent.setup();
    expect(screen.getByRole('button', { name: 'System' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Dark' }));
    expect(isDarkPage()).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Dark' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Light' }));
    expect(isDarkPage()).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  it('forgets the saved choice when set back to system', async () => {
    stubSystem(false);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    render(<ThemeToggle />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'System' }));
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('tracks the system while following it, and ignores it once a choice is made', async () => {
    const setSystemDark = stubSystem(false);
    render(<ThemeToggle />);
    expect(isDarkPage()).toBe(false);
    act(() => setSystemDark(true));
    expect(isDarkPage()).toBe(true);

    await userEvent.setup().click(screen.getByRole('button', { name: 'Light' }));
    act(() => setSystemDark(true));
    expect(isDarkPage()).toBe(false);
  });

  it('still switches when storage is blocked', async () => {
    stubSystem(false);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    render(<ThemeToggle />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Dark' }));
    expect(isDarkPage()).toBe(true);
  });
});
