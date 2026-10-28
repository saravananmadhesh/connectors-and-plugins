/**
 * Generated local secrets for development and tests.
 *
 * Nothing secret is committed: the first call creates every value with a random source and
 * stores it in `<dir>/secrets.json`; later calls read it back. `pnpm dev` uses `.cache/dev`;
 * the test runner uses a fresh temporary directory per run.
 */
import { createPublicKey, generateKeyPairSync, randomBytes, type KeyObject } from 'node:crypto';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/** Names generated as 32 random bytes in hex (64 characters). */
const HEX_64_NAMES = [
  'WORKLOAD_SECRET',
  'CSRF_SECRET',
  'COOKIE_SECRET',
  'POSTGRES_SUPERUSER_PASSWORD',
  'DB_ROLE_PASSWORD_API',
  'DB_ROLE_PASSWORD_WORKER',
  'DB_ROLE_PASSWORD_ADMIN',
  'DB_ROLE_PASSWORD_GATEWAY',
  'DB_ROLE_PASSWORD_MIGRATOR',
  'OBJECT_STORE_ROOT_PASSWORD',
  'REDIS_PASSWORD',
  'PLATFORM_SEAL_KEY',
  'GATEWAY_CURSOR_SECRET',
  'OIDC_FIXTURE_CLIENT_SECRET',
] as const;

/** Names generated as 8 random bytes in hex (16 characters). */
const HEX_16_NAMES = ['OBJECT_STORE_ROOT_USER', 'MANIFEST_SIGNING_KEY_ID'] as const;

/** Values also written one per file in `<dir>/secrets/`, for the local secrets adapter. */
const SECRET_FILES: Record<string, string> = {
  'manifest-signing-key': 'MANIFEST_SIGNING_KEY',
  'manifest-signing-key-id': 'MANIFEST_SIGNING_KEY_ID',
  'platform-seal-key': 'PLATFORM_SEAL_KEY',
  'gateway-cursor-secret': 'GATEWAY_CURSOR_SECRET',
};

export const DEV_SECRET_NAMES: readonly string[] = [
  ...HEX_64_NAMES,
  ...HEX_16_NAMES,
  'MANIFEST_SIGNING_KEY',
  'MANIFEST_VERIFY_KEYS',
];

function writePrivate(path: string, content: string) {
  writeFileSync(path, content, { mode: 0o600 });
  // The mode argument is ignored for an existing file, and has no effect on Windows
  try {
    chmodSync(path, 0o600);
  } catch {
    // best effort
  }
}

function generate(): Record<string, string> {
  const values: Record<string, string> = {};
  for (const name of HEX_64_NAMES) values[name] = randomBytes(32).toString('hex');
  for (const name of HEX_16_NAMES) values[name] = randomBytes(8).toString('hex');

  const { privateKey } = generateKeyPairSync('ed25519');
  const spki = (key: KeyObject) =>
    createPublicKey(key).export({ type: 'spki', format: 'pem' }).toString();
  values['MANIFEST_SIGNING_KEY'] = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  values['MANIFEST_VERIFY_KEYS'] = JSON.stringify({
    [values['MANIFEST_SIGNING_KEY_ID']!]: spki(privateKey),
  });
  return values;
}

function read(file: string): Record<string, string> {
  const parsed: unknown = JSON.parse(readFileSync(file, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`${file} is not a secrets file; delete it to generate new secrets`);
  }
  const record = parsed as Record<string, unknown>;
  const values: Record<string, string> = {};
  for (const name of DEV_SECRET_NAMES) {
    const value = record[name];
    if (typeof value !== 'string' || value === '') {
      throw new Error(`${file} is missing ${name}; delete it to generate new secrets`);
    }
    values[name] = value;
  }
  return values;
}

/** Adds the local superuser login (`app` and its generated password) to a password-less URL. */
export function withSuperuserLogin(databaseUrl: string, secrets: Record<string, string>): string {
  const url = new URL(databaseUrl);
  if (url.password) return databaseUrl;
  url.username = 'app';
  url.password = secrets['POSTGRES_SUPERUSER_PASSWORD']!;
  return url.toString();
}

/** Returns the generated local secrets in `dir`, creating them on the first call. */
export function ensureDevSecrets(dir: string): Record<string, string> {
  mkdirSync(dir, { recursive: true });
  const file = join(dir, 'secrets.json');
  if (existsSync(file)) return read(file);

  const values = generate();
  const filesDir = join(dir, 'secrets');
  mkdirSync(filesDir, { recursive: true });
  for (const [fileName, name] of Object.entries(SECRET_FILES)) {
    writePrivate(join(filesDir, fileName), values[name]!);
  }
  writePrivate(file, `${JSON.stringify(values, null, 2)}\n`);
  return values;
}
