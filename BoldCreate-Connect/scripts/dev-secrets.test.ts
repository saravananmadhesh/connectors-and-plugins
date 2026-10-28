import { createPrivateKey, createPublicKey } from 'node:crypto';
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { DEV_SECRET_NAMES, ensureDevSecrets, withSuperuserLogin } from './dev-secrets.js';

const directories: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'dev-secrets-'));
  directories.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of directories.splice(0)) rmSync(dir, { recursive: true, force: true });
});

const HEX_16 = ['OBJECT_STORE_ROOT_USER', 'MANIFEST_SIGNING_KEY_ID'];
const PEM_OR_JSON = ['MANIFEST_SIGNING_KEY', 'MANIFEST_VERIFY_KEYS'];

describe('ensureDevSecrets', () => {
  it('creates every key with the expected shape and writes secrets.json', () => {
    const dir = tempDir();
    const values = ensureDevSecrets(dir);

    expect(Object.keys(values).sort()).toEqual([...DEV_SECRET_NAMES].sort());
    for (const [name, value] of Object.entries(values)) {
      if (PEM_OR_JSON.includes(name)) continue;
      expect(value).toMatch(HEX_16.includes(name) ? /^[0-9a-f]{16}$/ : /^[0-9a-f]{64}$/);
    }
    expect(JSON.parse(readFileSync(join(dir, 'secrets.json'), 'utf8'))).toEqual(values);
  });

  it('creates an Ed25519 signing key and a verify-key map for its id', () => {
    const values = ensureDevSecrets(tempDir());
    const privateKey = createPrivateKey(values['MANIFEST_SIGNING_KEY']!);
    expect(privateKey.asymmetricKeyType).toBe('ed25519');

    const verifyKeys = JSON.parse(values['MANIFEST_VERIFY_KEYS']!) as Record<string, string>;
    expect(Object.keys(verifyKeys)).toEqual([values['MANIFEST_SIGNING_KEY_ID']]);
    const publicKey = createPublicKey(verifyKeys[values['MANIFEST_SIGNING_KEY_ID']!]!);
    expect(publicKey.asymmetricKeyType).toBe('ed25519');
    expect(publicKey.export({ type: 'spki', format: 'pem' })).toEqual(
      createPublicKey(privateKey).export({ type: 'spki', format: 'pem' }),
    );
  });

  it('writes the four named secret files', () => {
    const dir = tempDir();
    const values = ensureDevSecrets(dir);
    const files = join(dir, 'secrets');

    expect(readdirSync(files).sort()).toEqual([
      'gateway-cursor-secret',
      'manifest-signing-key',
      'manifest-signing-key-id',
      'platform-seal-key',
    ]);
    expect(readFileSync(join(files, 'platform-seal-key'), 'utf8')).toBe(
      values['PLATFORM_SEAL_KEY'],
    );
    expect(readFileSync(join(files, 'gateway-cursor-secret'), 'utf8')).toBe(
      values['GATEWAY_CURSOR_SECRET'],
    );
    expect(readFileSync(join(files, 'manifest-signing-key-id'), 'utf8')).toBe(
      values['MANIFEST_SIGNING_KEY_ID'],
    );
    expect(readFileSync(join(files, 'manifest-signing-key'), 'utf8')).toBe(
      values['MANIFEST_SIGNING_KEY'],
    );
  });

  it('returns identical values on a second call', () => {
    const dir = tempDir();
    expect(ensureDevSecrets(dir)).toEqual(ensureDevSecrets(dir));
  });

  it('throws when the file is missing a key', () => {
    const dir = tempDir();
    const values = ensureDevSecrets(dir);
    delete values['CSRF_SECRET'];
    writeFileSync(join(dir, 'secrets.json'), JSON.stringify(values));

    expect(() => ensureDevSecrets(dir)).toThrow(/missing CSRF_SECRET/);
  });

  it('throws when the file is not an object', () => {
    const dir = tempDir();
    ensureDevSecrets(dir);
    writeFileSync(join(dir, 'secrets.json'), '[]');
    expect(() => ensureDevSecrets(dir)).toThrow(/missing/);

    writeFileSync(join(dir, 'secrets.json'), 'null');
    expect(() => ensureDevSecrets(dir)).toThrow(/not a secrets file/);
  });

  it('adds the superuser login to a password-less database URL only', () => {
    const values = ensureDevSecrets(tempDir());
    const url = new URL(withSuperuserLogin('postgresql://localhost:5432/boldcreate', values));
    expect(url.username).toBe('app');
    expect(url.password).toBe(values['POSTGRES_SUPERUSER_PASSWORD']);
    expect(url.pathname).toBe('/boldcreate');

    const explicit = 'postgresql://someone:given@localhost:5432/boldcreate';
    expect(withSuperuserLogin(explicit, values)).toBe(explicit);
  });

  it('yields different secrets for different directories', () => {
    const first = ensureDevSecrets(tempDir());
    const second = ensureDevSecrets(tempDir());
    for (const name of DEV_SECRET_NAMES) expect(first[name]).not.toBe(second[name]);
  });
});

describe('key management secrets', () => {
  it('does not generate a master key for envelope encryption', () => {
    const legacyName = ['KMS', 'MASTER', 'KEY', 'HEX'].join('_');
    const values = ensureDevSecrets(tempDir());
    expect(Object.keys(values)).not.toContain(legacyName);
    expect(DEV_SECRET_NAMES).not.toContain(legacyName);
  });
});
