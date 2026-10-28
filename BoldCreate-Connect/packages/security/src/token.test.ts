import { describe, it, expect } from 'vitest';
import {
  generateToken,
  hashToken,
  safeCompareHash,
  generateApiKeyParts,
  apiKeyKindOf,
  isKeyId,
  splitApiKey,
  KEY_PREFIX,
} from './token.js';

describe('generateToken', () => {
  it('returns a non-empty base64url string', () => {
    const token = generateToken();
    expect(token.length).toBeGreaterThan(0);
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('generates unique tokens', () => {
    const a = generateToken();
    const b = generateToken();
    expect(a).not.toBe(b);
  });
});

describe('hashToken', () => {
  it('produces a 64-char hex string', () => {
    const hash = hashToken('test-token');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]+$/);
  });

  it('is deterministic', () => {
    expect(hashToken('abc')).toBe(hashToken('abc'));
  });

  it('differs for different inputs', () => {
    expect(hashToken('abc')).not.toBe(hashToken('def'));
  });
});

describe('safeCompareHash', () => {
  it('returns true for equal hashes', () => {
    const h = hashToken('token');
    expect(safeCompareHash(h, h)).toBe(true);
  });

  it('returns false for different hashes', () => {
    expect(safeCompareHash(hashToken('a'), hashToken('b'))).toBe(false);
  });

  it('returns false for different lengths', () => {
    expect(safeCompareHash('abc', 'abcd')).toBe(false);
  });
});

describe('generateApiKeyParts', () => {
  it.each([
    ['foryou', 'fyk_'],
    ['platform', 'plk_'],
    ['project', 'prk_'],
    ['session', 'stk_'],
  ] as const)('names the %s kind in the prefix', (kind, prefix) => {
    const { keyId, secret, lastFour } = generateApiKeyParts(kind);
    expect(keyId).toMatch(new RegExp(`^${prefix}[0-9a-f]{16}$`));
    expect(apiKeyKindOf(keyId)).toBe(kind);
    expect(secret.length).toBeGreaterThan(0);
    expect(lastFour).toHaveLength(4);
    expect(secret.endsWith(lastFour)).toBe(true);
  });
});

describe('apiKeyKindOf', () => {
  it.each([
    'pk_0123456789abcdef',
    'zzk_0123456789abcdef',
    '',
    'fyk',
    'xfyk_0123456789abcdef',
    'pak_0123456789abcdef',
    'tmk_0123456789abcdef',
    'ptk_0123456789abcdef',
    'ork_0123456789abcdef',
  ])('returns null for %j', (keyId) => {
    expect(apiKeyKindOf(keyId)).toBeNull();
  });
});

describe('key prefixes', () => {
  it('are pinned', () => {
    expect(KEY_PREFIX).toEqual({
      foryou: 'fyk_',
      platform: 'plk_',
      project: 'prk_',
      session: 'stk_',
    });
  });

  it('are three lowercase letters and an underscore, and carry no product name', () => {
    const prefixes = Object.values(KEY_PREFIX);
    expect(new Set(prefixes).size).toBe(prefixes.length);
    for (const prefix of prefixes) {
      expect(prefix).toMatch(/^[a-z]{3}_$/);
      expect(prefix).not.toMatch(/bci|bold|create|connect/);
    }
  });
});

describe('isKeyId and splitApiKey', () => {
  it('match only the listed kinds', () => {
    const kinds = ['foryou', 'session'] as const;
    expect(isKeyId('fyk_0123456789abcdef', kinds)).toBe(true);
    expect(isKeyId('stk_0123456789abcdef', kinds)).toBe(true);
    expect(isKeyId('ptk_0123456789abcdef', kinds)).toBe(false);
    expect(isKeyId('plk_0123456789abcdef', kinds)).toBe(false);
    expect(isKeyId('fyk_0123456789ABCDEF', kinds)).toBe(false);
    expect(isKeyId('fyk_0123456789abcde', kinds)).toBe(false);
  });

  it('splits a whole key and refuses a malformed one', () => {
    const secret = 'a'.repeat(43);
    expect(splitApiKey(`fyk_0123456789abcdef.${secret}`, ['foryou'])).toEqual({
      keyId: 'fyk_0123456789abcdef',
      secret,
    });
    expect(splitApiKey(`ptk_0123456789abcdef.${secret}`, ['foryou'])).toBeNull();
    expect(splitApiKey(`plk_0123456789abcdef.${secret}`, ['foryou'])).toBeNull();
    expect(splitApiKey('fyk_0123456789abcdef', ['foryou'])).toBeNull();
    expect(splitApiKey('fyk_0123456789abcdef.short', ['foryou'])).toBeNull();
    expect(splitApiKey(`fyk_0123456789abcdef.${secret}.x`, ['foryou'])).toBeNull();
  });
});
