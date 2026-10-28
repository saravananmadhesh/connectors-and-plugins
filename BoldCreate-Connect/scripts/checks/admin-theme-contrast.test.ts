import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(
  join(import.meta.dirname, '..', '..', 'apps', 'admin', 'client', 'src', 'index.css'),
  'utf8',
);

/** The tokens of one theme block, as lightness values; only plain grey tokens (no chroma, no alpha). */
function greys(selector: string): Map<string, number> {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf('}', start));
  const tokens = new Map<string, number>();
  for (const [, name, lightness, chroma, alpha] of block.matchAll(
    /--([a-z-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+[\d.]+(?:\s*\/\s*([\d.]+%))?\)/g,
  )) {
    if (Number(chroma) === 0 && alpha === undefined) tokens.set(name!, Number(lightness));
  }
  return tokens;
}

/** Relative luminance of a grey: for oklch with no chroma it is the lightness cubed. */
const luminance = (lightness: number) => lightness ** 3;

function contrast(theme: Map<string, number>, foreground: string, background: string): number {
  const a = luminance(theme.get(foreground) ?? Number.NaN);
  const b = luminance(theme.get(background) ?? Number.NaN);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe.each([
  ['light', ':root'],
  ['dark', '.dark'],
])('%s theme contrast', (_name, selector) => {
  const theme = greys(selector);

  it('reads the grey tokens it checks', () => {
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
