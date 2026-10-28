import { describe, it, expect } from 'vitest';
import {
  evaluateSession,
  generateSessionToken,
  hashSessionToken,
  isSessionActive,
  sessionExpiryDates,
  type SessionPolicy,
} from './session.js';

const POLICY: SessionPolicy = {
  idleSeconds: 1800,
  absoluteSeconds: 43_200,
  slideMinIntervalSeconds: 60,
};
const T0 = new Date('2026-03-01T10:00:00Z');
const at = (seconds: number): Date => new Date(T0.getTime() + seconds * 1000);

function created() {
  return { revokedAt: null, ...sessionExpiryDates(T0, POLICY) };
}

describe('generateSessionToken', () => {
  it('returns a raw token and its hash', () => {
    const { raw, hash } = generateSessionToken();
    expect(raw.length).toBeGreaterThan(0);
    expect(hash).toHaveLength(64);
  });

  it('hash matches hashSessionToken(raw)', () => {
    const { raw, hash } = generateSessionToken();
    expect(hashSessionToken(raw)).toBe(hash);
  });

  it('generates unique tokens', () => {
    const a = generateSessionToken();
    const b = generateSessionToken();
    expect(a.raw).not.toBe(b.raw);
    expect(a.hash).not.toBe(b.hash);
  });
});

describe('sessionExpiryDates', () => {
  it('adds the configured lifetimes', () => {
    const { idleExpiresAt, absoluteExpiresAt } = sessionExpiryDates(T0, {
      idleSeconds: 60,
      absoluteSeconds: 3600,
    });
    expect(idleExpiresAt.getTime() - T0.getTime()).toBe(60_000);
    expect(absoluteExpiresAt.getTime() - T0.getTime()).toBe(3_600_000);
  });
});

describe('isSessionActive', () => {
  it('is true before both expiries', () => {
    expect(isSessionActive(created(), at(10))).toBe(true);
  });

  it('is false when revoked', () => {
    expect(isSessionActive({ ...created(), revokedAt: T0 }, at(10))).toBe(false);
  });

  it('is false at the idle expiry and after', () => {
    expect(isSessionActive(created(), at(1799))).toBe(true);
    expect(isSessionActive(created(), at(1800))).toBe(false);
  });

  it('is false after the absolute expiry', () => {
    const session = { revokedAt: null, idleExpiresAt: at(50_000), absoluteExpiresAt: at(43_200) };
    expect(isSessionActive(session, at(43_199))).toBe(true);
    expect(isSessionActive(session, at(43_200))).toBe(false);
  });
});

describe('evaluateSession', () => {
  it('expires after 1800 seconds without activity', () => {
    expect(evaluateSession(created(), at(1799), POLICY).state).toBe('active');
    expect(evaluateSession(created(), at(1800), POLICY).state).toBe('expired');
  });

  it('expires at 43200 seconds even when the session was active all along', () => {
    let session = created();
    for (let t = 60; t < 43_200; t += 600) {
      const decision = evaluateSession(session, at(t), POLICY);
      expect(decision.state).toBe('active');
      if (decision.state === 'active' && decision.slideTo) {
        session = Object.assign({}, session, { idleExpiresAt: decision.slideTo });
      }
    }
    expect(evaluateSession(session, at(43_200), POLICY).state).toBe('expired');
  });

  it('does not slide within the minimum interval and slides after it', () => {
    const session = created();
    const early = evaluateSession(session, at(59), POLICY);
    expect(early).toEqual({ state: 'active', slideTo: null });
    const late = evaluateSession(session, at(61), POLICY);
    expect(late).toEqual({ state: 'active', slideTo: at(61 + 1800) });
  });

  it('never slides beyond the absolute expiry', () => {
    const session = { revokedAt: null, idleExpiresAt: at(43_000), absoluteExpiresAt: at(43_200) };
    const decision = evaluateSession(session, at(42_900), POLICY);
    expect(decision).toEqual({ state: 'active', slideTo: at(43_200) });
    const capped = { ...session, idleExpiresAt: at(43_200) };
    expect(evaluateSession(capped, at(43_100), POLICY)).toEqual({ state: 'active', slideTo: null });
  });

  it('reports a revoked session as revoked even when it has not expired', () => {
    expect(evaluateSession({ ...created(), revokedAt: at(5) }, at(10), POLICY).state).toBe(
      'revoked',
    );
  });
});
