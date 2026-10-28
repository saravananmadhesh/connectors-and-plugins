/**
 * Log redaction helpers.
 * Strip secrets, tokens and credential values from objects before logging, neutralise log
 * injection in string values, and keep upstream error bodies out of the log.
 */
import { createHash } from 'node:crypto';

const REDACTED = '[REDACTED]';
const URL_REDACTED = '[redacted]';

// All entries are lowercase — keys are compared after .toLowerCase()
const SECRET_KEYS = new Set([
  'password',
  'passwordhash',
  'password_hash',
  'token',
  'tokenhash',
  'token_hash',
  'accesstoken',
  'refreshtoken',
  'sessiontoken',
  'secret',
  'secrethash',
  'secret_hash',
  'clientsecret',
  'privatekey',
  'wrappedprivatekey',
  'credential',
  'ciphertext',
  'wrappeddek',
  'wrapped_dek',
  'iv',
  'authtag',
  'auth_tag',
  'pkceverifier',
  'pkce_verifier',
  'nonce',
  'statehash',
  'state_hash',
  'rawkey',
  'raw_key',
  'authorization',
  'cookie',
  'set-cookie',
  'x-csrf-token',
  'x-workload-secret',
  'x-workload-token',
  'x-session-token',
]);

/**
 * Query parameters whose values are replaced inside any logged URL string: code, state, token,
 * access_token, refresh_token, client_secret, key, api_key, signature.
 */
const URL_SECRET_PATTERN =
  /([?&](?:code|state|token|access_token|refresh_token|client_secret|key|api_key|signature)=)[^&#\s"']*/gi;

/** A whole API key (`fyk_`, `plk_`, `ptk_`, `prk_` or `stk_`, key id, dot, secret) inside any text. */
const API_KEY_PATTERN = /\b((?:fyk|plk|ptk|prk|stk)_[a-f0-9]{16})\.[A-Za-z0-9_-]{20,}/g;

/** Keeps the public key id of any API key in the text and drops its secret. */
export function redactApiKeys(value: string): string {
  return value.replace(API_KEY_PATTERN, `$1.${URL_REDACTED}`);
}

function isSecretKey(key: string): boolean {
  const lower = key.toLowerCase();
  return SECRET_KEYS.has(lower) || lower.startsWith('sealed');
}

/** Replaces control characters so a logged value cannot forge or split log lines. */
export function neutralizeControlChars(value: string): string {
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/g, (char) => {
    if (char === '\r') return '\\r';
    if (char === '\n') return '\\n';
    return '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0');
  });
}

/** Replaces secret query parameter values inside a URL (or any text containing one). */
export function redactUrlSecrets(value: string): string {
  return value.replace(URL_SECRET_PATTERN, `$1${URL_REDACTED}`);
}

/** Summary of an upstream error body that is safe to log: status and a short hash prefix. */
export function summarizeUpstreamBody(
  status: number,
  body: string | Uint8Array,
): { upstreamStatus: number; upstreamBodyHash: string } {
  const digest = createHash('sha256').update(body).digest('hex');
  return { upstreamStatus: status, upstreamBodyHash: digest.slice(0, 200) };
}

function redactString(value: string): string {
  return neutralizeControlChars(redactApiKeys(redactUrlSecrets(value)));
}

/**
 * Recursively redact known secret keys from a plain object.
 * Returns a new object — does not mutate the input.
 */
export function redactSecrets(obj: unknown, depth = 0): unknown {
  if (depth > 10) return '[DEPTH_LIMIT]';
  if (typeof obj === 'string') return redactString(obj);
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map((item) => redactSecrets(item, depth + 1));

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    result[key] = isSecretKey(key) ? REDACTED : redactSecrets(value, depth + 1);
  }
  return result;
}
