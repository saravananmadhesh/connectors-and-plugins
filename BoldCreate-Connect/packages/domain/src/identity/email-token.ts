/**
 * Email token helpers.
 * Generates and hashes one-time tokens for verification, reset and invite flows.
 */
import { generateToken, hashToken } from '@boldcreate-integrations/security';

export const EMAIL_TOKEN_TTL_SECONDS = 24 * 60 * 60; // 24 hours
export const INVITE_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface EmailTokenPair {
  raw: string;
  hash: string;
  expiresAt: Date;
}

export function generateEmailToken(
  ttlSeconds = EMAIL_TOKEN_TTL_SECONDS,
  now = new Date(),
): EmailTokenPair {
  const raw = generateToken(32);
  const hash = hashToken(raw);
  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000);
  return { raw, hash, expiresAt };
}

export function hashEmailToken(raw: string): string {
  return hashToken(raw);
}

export function isEmailTokenValid(token: { expiresAt: Date; consumedAt: Date | null }): boolean {
  if (token.consumedAt !== null) return false;
  return new Date() < token.expiresAt;
}
