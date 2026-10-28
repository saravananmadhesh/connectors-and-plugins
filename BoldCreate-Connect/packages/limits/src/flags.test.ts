import { describe, expect, it } from 'vitest';
import { FLAG_DEFAULTS, FLAG_KEYS, isFlagKey } from './flags.js';

describe('flag defaults', () => {
  it('keeps every risky or optional behaviour off', () => {
    expect(FLAG_DEFAULTS).toEqual({
      public_plugin_sources: false,
      follow_latest_updates: false,
      oauth_dcr: false,
      archive_prefetch: false,
    });
  });

  it('recognizes only the declared keys', () => {
    for (const key of FLAG_KEYS) expect(isFlagKey(key)).toBe(true);
    expect(isFlagKey('unknown_flag')).toBe(false);
    expect(isFlagKey('toString')).toBe(false);
  });

  it('uses keys the database accepts', () => {
    for (const key of FLAG_KEYS) expect(key).toMatch(/^[a-z][a-z0-9_]{1,63}$/);
  });
});
