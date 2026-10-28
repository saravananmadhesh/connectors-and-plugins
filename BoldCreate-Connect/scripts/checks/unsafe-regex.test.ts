import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './unsafe-regex.js';

const root = resolve(import.meta.dirname, '../..');

describe('unsafe regex', () => {
  it('flags a regex literal that can backtrack catastrophically', () => {
    const findings = checkSource('packages/x/src/a.ts', 'const r = /(a+)+$/;\n');
    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule).toBe('regex/unsafe');
    expect(findings[0]?.line).toBe(1);
  });

  it('flags new RegExp with an unsafe literal pattern', () => {
    expect(checkSource('packages/x/src/a.ts', "new RegExp('(a+)+$');")).toHaveLength(1);
  });

  it('bans new RegExp with a non-literal pattern', () => {
    expect(checkSource('packages/x/src/a.ts', 'new RegExp(userInput);')).toHaveLength(1);
    expect(checkSource('packages/x/src/a.ts', 'RegExp(`^${prefix}$`);')).toHaveLength(1);
  });

  it('accepts a safe literal and a safe string pattern', () => {
    expect(checkSource('packages/x/src/a.ts', 'const r = /^[a-z]+$/u;')).toEqual([]);
    expect(checkSource('packages/x/src/a.ts', "new RegExp('^[a-z]+$');")).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
