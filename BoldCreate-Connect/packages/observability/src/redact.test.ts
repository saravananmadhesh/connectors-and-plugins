import { describe, it, expect } from 'vitest';
import {
  neutralizeControlChars,
  redactApiKeys,
  redactSecrets,
  redactUrlSecrets,
  summarizeUpstreamBody,
} from './redact.js';

describe('redactSecrets', () => {
  it('redacts known secret keys', () => {
    const input = { password: 'hunter2', email: 'user@example.com' };
    const result = redactSecrets(input) as Record<string, unknown>;
    expect(result['password']).toBe('[REDACTED]');
    expect(result['email']).toBe('user@example.com');
  });

  it('redacts nested secrets', () => {
    const input = { user: { passwordHash: 'abc123', name: 'Alice' } };
    const result = redactSecrets(input) as { user: Record<string, unknown> };
    expect(result.user['passwordHash']).toBe('[REDACTED]');
    expect(result.user['name']).toBe('Alice');
  });

  it('redacts secrets in arrays', () => {
    const input = [{ token: 'tok', id: 1 }];
    const result = redactSecrets(input) as Array<Record<string, unknown>>;
    expect(result[0]?.['token']).toBe('[REDACTED]');
    expect(result[0]?.['id']).toBe(1);
  });

  it('does not mutate the original object', () => {
    const input = { password: 'secret' };
    redactSecrets(input);
    expect(input.password).toBe('secret');
  });

  it('handles null and primitives', () => {
    expect(redactSecrets(null)).toBeNull();
    expect(redactSecrets('string')).toBe('string');
    expect(redactSecrets(42)).toBe(42);
  });

  it('redacts authorization header (case-insensitive key)', () => {
    const input = { authorization: 'Bearer tok' };
    const result = redactSecrets(input) as Record<string, unknown>;
    expect(result['authorization']).toBe('[REDACTED]');
  });

  it('returns [DEPTH_LIMIT] when nesting exceeds 10 levels', () => {
    // Build an object nested 12 levels deep
    let deep: Record<string, unknown> = { value: 'leaf' };
    for (let i = 0; i < 12; i++) {
      deep = { nested: deep };
    }
    const result = redactSecrets(deep) as Record<string, unknown>;
    // At depth 11, the recursion hits the limit
    let current = result;
    for (let i = 0; i < 10; i++) {
      current = current['nested'] as Record<string, unknown>;
    }
    expect(current['nested']).toBe('[DEPTH_LIMIT]');
  });
});

describe('redactSecrets extensions', () => {
  it('redacts the workload and session headers and sealed* fields', () => {
    const result = redactSecrets({
      'X-Workload-Token': 'a',
      'x-workload-secret': 'b',
      'x-session-token': 'c',
      accessToken: 'd',
      refreshToken: 'e',
      sessionToken: 'f',
      clientSecret: 'g',
      privateKey: 'h',
      wrappedPrivateKey: 'i',
      sealedValue: 'j',
      SealedBlob: 'k',
      keep: 'visible',
    }) as Record<string, string>;
    expect(Object.values(result).filter((value) => value === '[REDACTED]')).toHaveLength(11);
    expect(result['keep']).toBe('visible');
  });

  it('replaces secret query parameters inside logged URLs', () => {
    expect(redactUrlSecrets('https://x/cb?code=abc&state=s&keep=1')).toBe(
      'https://x/cb?code=[redacted]&state=[redacted]&keep=1',
    );
    const result = redactSecrets({ url: 'https://x/?a=1&API_KEY=zzz#f' }) as { url: string };
    expect(result.url).toBe('https://x/?a=1&API_KEY=[redacted]#f');
  });

  it('drops the secret of an API key in any text and keeps the key id', () => {
    const secret = 'A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v';
    for (const prefix of ['fyk_', 'plk_', 'ptk_']) {
      const keyId = `${prefix}0123456789abcdef`;
      expect(redactApiKeys(`failed for ${keyId}.${secret} at 10:00`)).toBe(
        `failed for ${keyId}.[redacted] at 10:00`,
      );
    }
    const result = redactSecrets({ message: `bad ptk_0123456789abcdef.${secret}` }) as {
      message: string;
    };
    expect(result.message).toBe('bad ptk_0123456789abcdef.[redacted]');
    expect(redactApiKeys('ptk_0123456789abcdef is only a key id')).toBe(
      'ptk_0123456789abcdef is only a key id',
    );
  });

  it('redacts URLs inside nested objects and arrays', () => {
    const result = redactSecrets({ list: [{ u: 'https://x/?token=t' }] }) as {
      list: { u: string }[];
    };
    expect(result.list[0]?.u).toBe('https://x/?token=[redacted]');
  });

  it('neutralises control characters in values', () => {
    expect(redactSecrets({ m: 'a\r\nINFO forged\u0007' })).toEqual({
      m: 'a\\r\\nINFO forged\\u0007',
    });
    expect(neutralizeControlChars('plain')).toBe('plain');
  });

  it('summarises an upstream body without logging it', () => {
    const body = 'x'.repeat(10 * 1024);
    const summary = summarizeUpstreamBody(502, body);
    expect(summary.upstreamStatus).toBe(502);
    expect(summary.upstreamBodyHash).toHaveLength(64);
    expect(JSON.stringify(summary)).not.toContain('xxxx');
  });
});
