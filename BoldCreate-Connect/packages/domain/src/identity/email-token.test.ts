import { describe, it, expect } from 'vitest';
import {
  generateEmailToken,
  hashEmailToken,
  isEmailTokenValid,
  EMAIL_TOKEN_TTL_SECONDS,
  INVITE_TOKEN_TTL_SECONDS,
} from './email-token.js';

describe('generateEmailToken', () => {
  it('returns raw token, hash, and expiresAt', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const { raw, hash, expiresAt } = generateEmailToken(EMAIL_TOKEN_TTL_SECONDS, now);
    expect(raw.length).toBeGreaterThan(0);
    expect(hash).toHaveLength(64);
    expect(expiresAt.getTime()).toBe(now.getTime() + EMAIL_TOKEN_TTL_SECONDS * 1000);
  });

  it('uses default TTL when not provided', () => {
    const before = Date.now();
    const { expiresAt } = generateEmailToken();
    const after = Date.now();
    const expectedMin = before + EMAIL_TOKEN_TTL_SECONDS * 1000;
    const expectedMax = after + EMAIL_TOKEN_TTL_SECONDS * 1000;
    expect(expiresAt.getTime()).toBeGreaterThanOrEqual(expectedMin);
    expect(expiresAt.getTime()).toBeLessThanOrEqual(expectedMax);
  });

  it('uses invite TTL correctly', () => {
    const now = new Date('2026-01-01T00:00:00Z');
    const { expiresAt } = generateEmailToken(INVITE_TOKEN_TTL_SECONDS, now);
    expect(expiresAt.getTime()).toBe(now.getTime() + INVITE_TOKEN_TTL_SECONDS * 1000);
  });

  it('generates unique tokens', () => {
    const a = generateEmailToken();
    const b = generateEmailToken();
    expect(a.raw).not.toBe(b.raw);
    expect(a.hash).not.toBe(b.hash);
  });

  it('hash matches hashEmailToken(raw)', () => {
    const { raw, hash } = generateEmailToken();
    expect(hashEmailToken(raw)).toBe(hash);
  });
});

describe('hashEmailToken', () => {
  it('returns a 64-char hex string', () => {
    const hash = hashEmailToken('some-token');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]+$/);
  });

  it('is deterministic', () => {
    expect(hashEmailToken('abc')).toBe(hashEmailToken('abc'));
  });
});

describe('isEmailTokenValid', () => {
  it('returns true for a fresh, unconsumed token', () => {
    const expiresAt = new Date(Date.now() + 60_000);
    expect(isEmailTokenValid({ expiresAt, consumedAt: null })).toBe(true);
  });

  it('returns false for a consumed token', () => {
    const expiresAt = new Date(Date.now() + 60_000);
    expect(isEmailTokenValid({ expiresAt, consumedAt: new Date() })).toBe(false);
  });

  it('returns false for an expired token', () => {
    const expiresAt = new Date(Date.now() - 1000);
    expect(isEmailTokenValid({ expiresAt, consumedAt: null })).toBe(false);
  });

  it('returns false for a consumed and expired token', () => {
    const expiresAt = new Date(Date.now() - 1000);
    expect(isEmailTokenValid({ expiresAt, consumedAt: new Date() })).toBe(false);
  });
});
