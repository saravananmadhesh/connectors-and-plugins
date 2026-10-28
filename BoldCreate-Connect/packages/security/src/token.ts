/**
 * Secure random token generation and constant-time comparison.
 * Used for session tokens, email tokens and API key secrets.
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

/** Generate a cryptographically random URL-safe token of `byteLength` bytes. */
export function generateToken(byteLength = 32): string {
  return randomBytes(byteLength).toString('base64url');
}

/** SHA-256 hash of a token for storage. Never store the raw token. */
export function hashToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

/** Constant-time comparison of two token hashes. */
export function safeCompareHash(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** What a key belongs to. The prefix of the key id names it. */
export type ApiKeyKind = 'foryou' | 'platform' | 'project' | 'session';

export const KEY_PREFIX: Readonly<Record<ApiKeyKind, string>> = {
  foryou: 'fyk_',
  platform: 'plk_',
  project: 'prk_',
  session: 'stk_',
};

const KEY_ID_BODY = /^[a-f0-9]{16}$/;
const KEY_SECRET = /^[A-Za-z0-9_-]{20,128}$/;

/** Whether the value is a key id of one of the kinds: its prefix and 16 lowercase hex characters. */
export function isKeyId(value: string, kinds: readonly ApiKeyKind[]): boolean {
  const kind = apiKeyKindOf(value);
  return (
    kind !== null && kinds.includes(kind) && KEY_ID_BODY.test(value.slice(KEY_PREFIX[kind].length))
  );
}

/** The key id and secret of a whole key `<keyId>.<secret>` of one of the kinds, or null. */
export function splitApiKey(
  rawKey: string,
  kinds: readonly ApiKeyKind[],
): { keyId: string; secret: string } | null {
  const dot = rawKey.indexOf('.');
  if (dot < 0) return null;
  const keyId = rawKey.slice(0, dot);
  const secret = rawKey.slice(dot + 1);
  return isKeyId(keyId, kinds) && KEY_SECRET.test(secret) ? { keyId, secret } : null;
}

/** The kind named by a key id's prefix, or null when the prefix is not one of the five. */
export function apiKeyKindOf(keyId: string): ApiKeyKind | null {
  for (const kind of Object.keys(KEY_PREFIX) as ApiKeyKind[]) {
    if (keyId.startsWith(KEY_PREFIX[kind])) return kind;
  }
  return null;
}

/** Generate a key ID (public, shown to user, prefix names the kind) and a secret. */
export function generateApiKeyParts(kind: ApiKeyKind): {
  keyId: string;
  secret: string;
  lastFour: string;
} {
  const keyId = `${KEY_PREFIX[kind]}${randomBytes(8).toString('hex')}`;
  const secret = randomBytes(32).toString('base64url');
  const lastFour = secret.slice(-4);
  return { keyId, secret, lastFour };
}
