/**
 * Session rules: opaque token generation and hashing, expiry arithmetic and the decision of what
 * to do with a stored session. Lifetimes come from configuration; nothing here has a default.
 * The database reads and writes live in `sessions.ts`.
 */
import { generateToken, hashToken } from '@boldcreate-integrations/security';

export interface SessionLifetime {
  idleSeconds: number;
  absoluteSeconds: number;
}

export interface SessionPolicy extends SessionLifetime {
  /** The idle expiry is written at most once per this interval. */
  slideMinIntervalSeconds: number;
}

export interface SessionTokenPair {
  /** Raw token — set in cookie, never stored */
  raw: string;
  /** SHA-256 hash — stored in DB */
  hash: string;
}

export function generateSessionToken(): SessionTokenPair {
  const raw = generateToken(32);
  const hash = hashToken(raw);
  return { raw, hash };
}

export function hashSessionToken(raw: string): string {
  return hashToken(raw);
}

export function sessionExpiryDates(
  now: Date,
  lifetime: SessionLifetime,
): {
  idleExpiresAt: Date;
  absoluteExpiresAt: Date;
} {
  return {
    idleExpiresAt: new Date(now.getTime() + lifetime.idleSeconds * 1000),
    absoluteExpiresAt: new Date(now.getTime() + lifetime.absoluteSeconds * 1000),
  };
}

export interface StoredSession {
  revokedAt: Date | null;
  idleExpiresAt: Date;
  absoluteExpiresAt: Date;
}

/** Returns true if the session is still valid (not revoked, not expired). */
export function isSessionActive(session: StoredSession, now: Date): boolean {
  if (session.revokedAt !== null) return false;
  return now < session.idleExpiresAt && now < session.absoluteExpiresAt;
}

export type SessionDecision =
  | { state: 'active'; slideTo: Date | null }
  | { state: 'revoked' }
  | { state: 'expired' };

/**
 * What to do with a stored session at `now`. An active session slides to
 * `min(now + idle, absolute)`, but only when the stored idle expiry is older than
 * `now + idle - slideMinInterval`, so a burst of requests writes once.
 */
export function evaluateSession(
  session: StoredSession,
  now: Date,
  policy: SessionPolicy,
): SessionDecision {
  if (session.revokedAt !== null) return { state: 'revoked' };
  if (!isSessionActive(session, now)) return { state: 'expired' };
  const target = Math.min(
    now.getTime() + policy.idleSeconds * 1000,
    session.absoluteExpiresAt.getTime(),
  );
  const staleBefore =
    now.getTime() + policy.idleSeconds * 1000 - policy.slideMinIntervalSeconds * 1000;
  const slides =
    session.idleExpiresAt.getTime() < staleBefore && target > session.idleExpiresAt.getTime();
  return { state: 'active', slideTo: slides ? new Date(target) : null };
}
