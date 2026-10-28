import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = join(import.meta.dirname, '..', '..', 'apps', 'web', 'client', 'src');
const css = readFileSync(join(source, 'index.css'), 'utf8');

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
])('web %s theme contrast', (_name, selector) => {
  const theme = greys(selector);

  it('reads the grey tokens it checks', () => {
    for (const token of ['foreground', 'muted-foreground', 'card', 'background', 'input', 'ring']) {
      expect([token, theme.has(token)]).toEqual([token, true]);
    }
  });

  it.each([
    ['foreground', 'card'],
    ['foreground', 'background'],
    ['muted-foreground', 'card'],
    ['muted-foreground', 'background'],
    ['muted-foreground', 'muted'],
    ['muted-foreground', 'accent'],
    ['sidebar-muted', 'sidebar'],
    ['sidebar-muted', 'sidebar-accent'],
    ['sidebar-foreground', 'sidebar'],
    ['primary-foreground', 'primary'],
  ])('text %s on %s meets 4.5:1', (foreground, background) => {
    expect(contrast(theme, foreground, background)).toBeGreaterThanOrEqual(4.5);
  });

  it.each([
    ['input', 'card'],
    ['input', 'background'],
    ['ring', 'background'],
    ['ring', 'card'],
    ['ring', 'sidebar'],
  ])('the edge of a control, %s on %s, meets 3:1', (edge, background) => {
    expect(contrast(theme, edge, background)).toBeGreaterThanOrEqual(3);
  });
});

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /\.tsx$/.test(entry.name) && !/\.test\./.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
}

describe('focus ring', () => {
  it('is drawn at full strength, so it keeps its 3:1 contrast', () => {
    const faded: string[] = [];
    for (const file of sourceFiles(source)) {
      const text = readFileSync(file, 'utf8');
      // `ring-ring/30` backs a border that is already the full-strength ring colour.
      for (const match of text.matchAll(/focus(?:-visible|-within)?:ring-ring\/(\d+)/g)) {
        if (match[1] !== '30' || !text.includes('focus-visible:border-ring')) faded.push(file);
      }
    }
    expect(faded).toEqual([]);
  });
});
