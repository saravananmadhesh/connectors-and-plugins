/**
 * Unit tests for scope, credential and key domain use-cases.
 * Uses in-memory stubs — no real DB required.
 */
import { describe, it, expect } from 'vitest';
import { notFound, conflict, forbidden, limitExceeded } from './errors.js';
import { assertValidScope } from '@boldcreate-integrations/db';
import { generateApiKeyParts, hashToken } from '@boldcreate-integrations/security';

describe('domain error helpers', () => {
  it('notFound produces correct code', () => {
    const err = notFound();
    expect(err.code).toBe('not_found');
    expect(err.message).toBe('Not found.');
  });

  it('conflict produces correct code', () => {
    const err = conflict();
    expect(err.code).toBe('conflict');
  });

  it('forbidden produces correct code', () => {
    const err = forbidden();
    expect(err.code).toBe('forbidden');
  });

  it('limitExceeded produces correct code', () => {
    const err = limitExceeded();
    expect(err.code).toBe('limit_exceeded');
  });
});

// ─── Scope validation ─────────────────────────────────────────────────────────

describe('assertValidScope', () => {
  it('accepts valid org scope', () => {
    expect(() => assertValidScope({ organizationId: 'o1', scopeType: 'org' })).not.toThrow();
  });

  it('rejects org scope with an owner', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'org', ownerUserId: 'u1' }),
    ).toThrow('org scope requires no ownerUserId');
  });

  it('accepts valid user scope', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'user', ownerUserId: 'u1' }),
    ).not.toThrow();
  });

  it('rejects user scope without ownerUserId', () => {
    expect(() => assertValidScope({ organizationId: 'o1', scopeType: 'user' })).toThrow(
      'user scope requires ownerUserId',
    );
  });
});

// ─── API key generation ───────────────────────────────────────────────────────

describe('generateApiKeyParts', () => {
  it('generates a key with correct prefix and parts', () => {
    const { keyId, secret, lastFour } = generateApiKeyParts('foryou');
    expect(keyId).toMatch(/^fyk_[0-9a-f]{16}$/);
    expect(secret.length).toBeGreaterThan(20);
    expect(lastFour).toBe(secret.slice(-4));
    // Hash is deterministic
    expect(hashToken(secret)).toBe(hashToken(secret));
    expect(hashToken(secret)).not.toBe(secret);
  });
});
