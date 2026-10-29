import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contrastRatio as contrast, themeLuminances } from './theme-tokens.js';

const css = readFileSync(
  join(import.meta.dirname, '..', '..', 'apps', 'admin', 'client', 'src', 'index.css'),
  'utf8',
);

describe.each([
  ['light', ':root'],
  ['dark', '.dark'],
])('%s theme contrast', (_name, selector) => {
  const theme = themeLuminances(css, selector);

  it('reads the colour tokens it checks', () => {
    for (const token of ['foreground', 'muted-foreground', 'card', 'background', 'muted']) {
      expect(theme.has(token)).toBe(true);
    }
  });

  it.each([
    ['foreground', 'card'],
    ['foreground', 'background'],
    ['muted-foreground', 'card'],
    ['muted-foreground', 'background'],
    ['muted-foreground', 'muted'],
    ['sidebar-muted', 'sidebar'],
    ['sidebar-foreground', 'sidebar'],
  ])('%s on %s meets the 4.5:1 text contrast', (foreground, background) => {
    expect(contrast(theme, foreground, background)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps a typed value clearly stronger than its placeholder', () => {
    expect(contrast(theme, 'foreground', 'card')).toBeGreaterThan(
      contrast(theme, 'muted-foreground', 'card'),
    );
  });
});

describe('autofill', () => {
  it('is drawn with the theme colours so dark mode is not overridden by the browser', () => {
    expect(css).toMatch(
      /input:-webkit-autofill[\s\S]*?-webkit-text-fill-color: var\(--foreground\)/,
    );
    expect(css).toMatch(/box-shadow: 0 0 0 1000px var\(--card\) inset/);
  });
});
