import { describe, it, expect, expectTypeOf } from 'vitest';
import { GLOBAL_KEY_NAMES, globalKey, tenantKey, type CacheKey } from './cache.js';

describe('tenantKey', () => {
  it('formats t:<orgId>:<parts>', () => {
    expect(tenantKey('org_x', 'a', 'b')).toBe('t:org_x:a:b');
    expect(tenantKey('org_x')).toBe('t:org_x');
  });

  it('requires an organization id', () => {
    expect(() => tenantKey('')).toThrow('tenantKey requires an organization id');
  });

  it('rejects parts with a colon or a space', () => {
    expect(() => tenantKey('org_x', 'a:b')).toThrow('Invalid cache key part');
    expect(() => tenantKey('org_x', 'a b')).toThrow('Invalid cache key part');
    expect(() => tenantKey('org_x', '')).toThrow('Invalid cache key part');
  });
});

describe('globalKey', () => {
  it('formats g:<name>:<parts>', () => {
    expect(globalKey('flag', 'x')).toBe('g:flag:x');
    expect(globalKey('epoch')).toBe('g:epoch');
  });

  it('refuses a name that is not in the list', () => {
    // @ts-expect-error not a global key name
    expect(() => globalKey('nope')).toThrow('Unknown global cache name');
  });

  it('keeps the list of global names visible in one snapshot', () => {
    expect([...GLOBAL_KEY_NAMES]).toMatchInlineSnapshot(`
      [
        "flag",
        "kill",
        "rev",
        "epoch",
        "neg",
        "active-keys",
        "scheduler",
        "ratelimit",
        "keyauth",
      ]
    `);
  });
});

describe('CacheKey', () => {
  it('is not satisfied by a plain string', () => {
    expectTypeOf<string>().not.toExtend<CacheKey>();
    expectTypeOf(tenantKey('o')).toEqualTypeOf<CacheKey>();
  });
});
