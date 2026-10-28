/**
 * Unit tests for profile use-cases using an in-memory fake DB.
 * These tests do not require a real database connection.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateEmailToken, hashEmailToken, isEmailTokenValid } from './email-token.js';
import { generateSessionToken, isSessionActive, sessionExpiryDates } from './session.js';
import type * as Security from '@boldcreate-integrations/security';
import { verifyIdentitySecret } from './profile.js';

const verifyPassword = vi.hoisted(() =>
  vi.fn<(hash: string, plaintext: string) => Promise<boolean>>(),
);
const hashPassword = vi.hoisted(() => vi.fn<(plaintext: string) => Promise<string>>());
vi.mock('@boldcreate-integrations/security', async (importOriginal) => ({
  ...(await importOriginal<typeof Security>()),
  verifyPassword,
  hashPassword,
}));

const LIFETIME = { idleSeconds: 1800, absoluteSeconds: 43_200 };

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('email-token helpers', () => {
  it('generates a valid token pair', () => {
    const pair = generateEmailToken();
    expect(pair.raw).toBeTruthy();
    expect(pair.hash).toBeTruthy();
    expect(pair.raw).not.toBe(pair.hash);
    expect(isEmailTokenValid({ expiresAt: pair.expiresAt, consumedAt: null })).toBe(true);
  });

  it('rejects a consumed token', () => {
    const pair = generateEmailToken();
    expect(isEmailTokenValid({ expiresAt: pair.expiresAt, consumedAt: new Date() })).toBe(false);
  });

  it('rejects an expired token', () => {
    const past = new Date(Date.now() - 1000);
    const pair = generateEmailToken(1, past);
    expect(isEmailTokenValid({ expiresAt: pair.expiresAt, consumedAt: null })).toBe(false);
  });

  it('hashes consistently', () => {
    const pair = generateEmailToken();
    expect(hashEmailToken(pair.raw)).toBe(pair.hash);
  });
});

describe('session helpers', () => {
  it('generates a unique session token pair', () => {
    const a = generateSessionToken();
    const b = generateSessionToken();
    expect(a.raw).not.toBe(b.raw);
    expect(a.hash).not.toBe(b.hash);
  });

  it('marks an active session as active', () => {
    const now = new Date();
    const expiry = sessionExpiryDates(now, LIFETIME);
    expect(isSessionActive({ revokedAt: null, ...expiry }, now)).toBe(true);
  });

  it('marks a revoked session as inactive', () => {
    const now = new Date();
    const expiry = sessionExpiryDates(now, LIFETIME);
    expect(isSessionActive({ revokedAt: new Date(), ...expiry }, now)).toBe(false);
  });

  it('marks an idle-expired session as inactive', () => {
    const past = new Date(Date.now() - 1000);
    expect(
      isSessionActive(
        {
          revokedAt: null,
          idleExpiresAt: past,
          absoluteExpiresAt: new Date(Date.now() + 1000),
        },
        new Date(),
      ),
    ).toBe(false);
  });
});

describe('verifyIdentitySecret', () => {
  beforeEach(() => {
    verifyPassword.mockReset();
    hashPassword.mockReset();
    hashPassword.mockResolvedValue('fixed-valid-hash');
    verifyPassword.mockResolvedValue(false);
  });

  it('verifies against the stored hash when there is one', async () => {
    verifyPassword.mockResolvedValue(true);
    await expect(verifyIdentitySecret('stored-hash', 'pw')).resolves.toBe(true);
    expect(verifyPassword).toHaveBeenCalledTimes(1);
    expect(verifyPassword).toHaveBeenCalledWith('stored-hash', 'pw');
  });

  it('performs exactly one hash verification for an unknown identity and never succeeds', async () => {
    verifyPassword.mockResolvedValue(true);
    await expect(verifyIdentitySecret(null, 'pw')).resolves.toBe(false);
    expect(verifyPassword).toHaveBeenCalledTimes(1);
    expect(verifyPassword).toHaveBeenCalledWith(expect.any(String), 'pw');
  });

  it('treats an empty stored hash like a missing identity', async () => {
    await expect(verifyIdentitySecret('', 'pw')).resolves.toBe(false);
    expect(verifyPassword).toHaveBeenCalledTimes(1);
  });
});
