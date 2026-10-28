import { describe, expect, it } from 'vitest';
import { componentHref, componentPath, parseKinds, parsePlugins } from './sync.js';

describe('parseKinds', () => {
  it('returns nothing when the client names no kinds', () => {
    expect(parseKinds(undefined)).toBeUndefined();
    expect(parseKinds('')).toBeUndefined();
  });

  it('keeps known kinds, sorted and without repeats', () => {
    expect(parseKinds('skill,rule,skill,agent')).toEqual(['agent', 'rule', 'skill']);
  });

  it('ignores names that are not kinds', () => {
    expect(parseKinds('skill,banana,,hook')).toEqual(['hook', 'skill']);
    expect(parseKinds('banana')).toEqual([]);
  });
});

describe('parsePlugins', () => {
  it('returns nothing when the client names no plugins', () => {
    expect(parsePlugins(undefined)).toBeUndefined();
    expect(parsePlugins('')).toBeUndefined();
  });

  it('lists each name once, sorted, without empty parts', () => {
    expect(parsePlugins('b,a,,b')).toEqual(['a', 'b']);
  });
});

describe('component addresses', () => {
  it('builds a generic path and a brokered download address', () => {
    expect(componentPath('skill', 'review')).toBe('skills/review');
    expect(componentPath('agent', 'x')).toBe('agents/x');
    const sha = 'a'.repeat(64);
    expect(componentHref(sha)).toBe(`/v1/sync/components/${sha}`);
  });
});
