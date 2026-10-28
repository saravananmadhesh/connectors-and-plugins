import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  KmsInvalidCiphertextError,
  KmsKeyDisabledError,
  KmsKeyNotFoundError,
  KmsUnavailableError,
} from '@boldcreate-integrations/ports';
import { createLocalKms } from './index.js';
import { runKmsContract } from '../contract/kms.contract.js';

const bytes = (text: string) => new TextEncoder().encode(text);

runKmsContract('local', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'kms-contract-'));
  return {
    port: createLocalKms({ keyringPath: join(dir, 'keyring.json') }),
    cleanup: async () => rmSync(dir, { recursive: true, force: true }),
  };
});

describe('local kms', () => {
  let dir: string;
  let path: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'kms-local-'));
    path = join(dir, 'keyring.json');
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('keeps old versions usable after rotation and wraps with the new one', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const before = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    const version = await kms.rotate();
    const after = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    expect(after.keyVersion).toBe(version);
    expect(after.keyVersion).not.toBe(before.keyVersion);
    await expect(kms.unwrapKey({ ...before, aad: bytes('a') })).resolves.toHaveLength(32);
  });

  it('rejects a disabled version, accepts it again once enabled, and the new version keeps working', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const old = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    await kms.rotate();
    const fresh = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    await kms.disableVersion(old.keyVersion);
    await expect(kms.unwrapKey({ ...old, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsKeyDisabledError,
    );
    await expect(kms.unwrapKey({ ...fresh, aad: bytes('a') })).resolves.toHaveLength(32);
    await kms.enableVersion(old.keyVersion);
    await expect(kms.unwrapKey({ ...old, aad: bytes('a') })).resolves.toHaveLength(32);
  });

  it('rejects a destroyed version as not found', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const old = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    await kms.rotate();
    await kms.destroyVersion(old.keyVersion);
    await expect(kms.unwrapKey({ ...old, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsKeyNotFoundError,
    );
    const description = await kms.describeKey('local-master');
    expect(description.versions).toEqual([
      { version: 'v1', state: 'destroyed' },
      { version: 'v2', state: 'enabled' },
    ]);
  });

  it('does not mint a keyring when unwrapping with a lost keyring file', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    rmSync(path);
    await expect(kms.unwrapKey({ ...wrapped, aad: bytes('a') })).rejects.toBeInstanceOf(
      KmsKeyNotFoundError,
    );
    expect(existsSync(path)).toBe(false);
  });

  it('rejects truncated ciphertext', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    await expect(
      kms.unwrapKey({ ...wrapped, wrapped: new Uint8Array(5), aad: bytes('a') }),
    ).rejects.toBeInstanceOf(KmsInvalidCiphertextError);
  });

  it('fails the injected number of times then succeeds, and counts calls', async () => {
    const kms = createLocalKms({ keyringPath: path });
    const wrapped = await kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    kms.injectFault({ op: 'unwrap', error: 'unavailable', count: 2 });
    const input = { ...wrapped, aad: bytes('a') };
    await expect(kms.unwrapKey(input)).rejects.toBeInstanceOf(KmsUnavailableError);
    await expect(kms.unwrapKey(input)).rejects.toBeInstanceOf(KmsUnavailableError);
    await expect(kms.unwrapKey(input)).resolves.toHaveLength(32);
    expect(kms.stats()).toEqual({ wrap: 1, unwrap: 3 });
  });

  it('fails forever until faults are cleared', async () => {
    const kms = createLocalKms({ keyringPath: path });
    kms.injectFault({ op: 'activeKey', error: 'unavailable', count: 'forever' });
    await expect(kms.activeKey()).rejects.toBeInstanceOf(KmsUnavailableError);
    await expect(kms.activeKey()).rejects.toBeInstanceOf(KmsUnavailableError);
    kms.clearFaults();
    await expect(kms.activeKey()).resolves.toEqual({ keyId: 'local-master', keyVersion: 'v1' });
  });

  it('only faults the requested operation', async () => {
    const kms = createLocalKms({ keyringPath: path });
    kms.injectFault({ op: 'describe', error: 'unavailable', count: 1 });
    await expect(
      kms.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') }),
    ).resolves.toBeDefined();
    await expect(kms.describeKey('local-master')).rejects.toBeInstanceOf(KmsUnavailableError);
  });

  it('adds latency', async () => {
    const kms = createLocalKms({ keyringPath: path });
    kms.setLatency(50);
    const started = Date.now();
    await kms.activeKey();
    expect(Date.now() - started).toBeGreaterThanOrEqual(45);
  });

  it('persists the keyring across instances', async () => {
    const first = createLocalKms({ keyringPath: path });
    const wrapped = await first.wrapKey({ plaintext: new Uint8Array(32), aad: bytes('a') });
    const second = createLocalKms({ keyringPath: path });
    await expect(second.unwrapKey({ ...wrapped, aad: bytes('a') })).resolves.toHaveLength(32);
  });

  it.skipIf(process.platform === 'win32')('writes the keyring with mode 0600', async () => {
    const kms = createLocalKms({ keyringPath: path });
    await kms.activeKey();
    expect(statSync(path).mode & 0o777).toBe(0o600);
  });
});
