/**
 * Local KMS adapter: AES-256-GCM key wrapping with versioned keys in a JSON keyring file.
 *
 * Local and test use only; the deployed-environment guard rejects it. It supports rotation,
 * version states, call counting and fault and latency injection so callers can test their
 * behaviour when key management misbehaves.
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  KmsInvalidCiphertextError,
  KmsKeyDisabledError,
  KmsKeyNotFoundError,
  KmsUnavailableError,
  type ClockPort,
  type KmsKeyRef,
  type KmsPort,
  type KmsVersionState,
} from '@boldcreate-integrations/ports';

export type KmsFaultOp = 'wrap' | 'unwrap' | 'describe' | 'activeKey';

export interface KmsFault {
  op: KmsFaultOp;
  error: 'unavailable';
  count: number | 'forever';
}

export interface LocalKmsOptions {
  keyringPath: string;
  keyId?: string;
  clock?: Pick<ClockPort, 'sleep'>;
  latencyMs?: number;
}

export interface LocalKms extends KmsPort {
  rotate(): Promise<string>;
  disableVersion(version: string): Promise<void>;
  enableVersion(version: string): Promise<void>;
  destroyVersion(version: string): Promise<void>;
  injectFault(fault: KmsFault): void;
  clearFaults(): void;
  setLatency(ms: number): void;
  stats(): { wrap: number; unwrap: number };
}

interface KeyVersion {
  version: string;
  keyMaterialBase64: string;
  state: KmsVersionState;
}

interface KeyEntry {
  primary: string;
  versions: KeyVersion[];
}

type Keyring = Record<string, KeyEntry>;

const IV_BYTES = 12;
const TAG_BYTES = 16;

function newVersion(number: number): KeyVersion {
  return {
    version: `v${number}`,
    keyMaterialBase64: randomBytes(32).toString('base64'),
    state: 'enabled',
  };
}

export function createLocalKms(options: LocalKmsOptions): LocalKms {
  const keyId = options.keyId ?? 'local-master';
  const sleep =
    options.clock?.sleep.bind(options.clock) ??
    ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  let latencyMs = options.latencyMs ?? 0;
  const faults: { fault: KmsFault; remaining: number }[] = [];
  const counts = { wrap: 0, unwrap: 0 };

  function readRing(): Keyring {
    if (!existsSync(options.keyringPath)) return {};
    return JSON.parse(readFileSync(options.keyringPath, 'utf8')) as Keyring;
  }

  function writeRing(ring: Keyring): void {
    mkdirSync(dirname(options.keyringPath), { recursive: true });
    writeFileSync(options.keyringPath, JSON.stringify(ring, null, 2), { mode: 0o600 });
    if (process.platform !== 'win32') chmodSync(options.keyringPath, 0o600);
  }

  /** Loads the entry for this key id, creating version v1 on first use. */
  function entry(): { ring: Keyring; key: KeyEntry } {
    const ring = readRing();
    let key = ring[keyId];
    if (!key) {
      key = { primary: 'v1', versions: [newVersion(1)] };
      ring[keyId] = key;
      writeRing(ring);
    }
    return { ring, key };
  }

  /** Read-only lookup: unwrapping never mints key material, so a lost keyring stays visible. */
  function existingKey(): KeyEntry {
    const key = readRing()[keyId];
    if (!key) throw new KmsKeyNotFoundError();
    return key;
  }

  function versionOf(key: KeyEntry, version: string): KeyVersion {
    const found = key.versions.find((candidate) => candidate.version === version);
    if (!found) throw new KmsKeyNotFoundError();
    return found;
  }

  async function before(op: KmsFaultOp): Promise<void> {
    if (latencyMs > 0) await sleep(latencyMs);
    const index = faults.findIndex((item) => item.fault.op === op && item.remaining !== 0);
    if (index >= 0) {
      const item = faults[index]!;
      if (item.remaining !== Infinity) item.remaining -= 1;
      throw new KmsUnavailableError();
    }
  }

  function setState(version: string, state: KmsVersionState): void {
    const { ring, key } = entry();
    versionOf(key, version).state = state;
    writeRing(ring);
  }

  return {
    async activeKey(): Promise<KmsKeyRef> {
      await before('activeKey');
      return { keyId, keyVersion: entry().key.primary };
    },

    async wrapKey({ plaintext, aad }) {
      counts.wrap += 1;
      await before('wrap');
      const { key } = entry();
      const primary = versionOf(key, key.primary);
      const iv = randomBytes(IV_BYTES);
      const cipher = createCipheriv(
        'aes-256-gcm',
        Buffer.from(primary.keyMaterialBase64, 'base64'),
        iv,
      );
      cipher.setAAD(Buffer.from(aad));
      const body = Buffer.concat([cipher.update(plaintext), cipher.final()]);
      const wrapped = Buffer.concat([iv, cipher.getAuthTag(), body]);
      return { keyId, keyVersion: primary.version, wrapped: new Uint8Array(wrapped) };
    },

    async unwrapKey({ keyId: requestedKeyId, keyVersion, wrapped, aad }) {
      counts.unwrap += 1;
      await before('unwrap');
      if (requestedKeyId !== keyId) throw new KmsKeyNotFoundError();
      const version = versionOf(existingKey(), keyVersion);
      if (version.state === 'disabled') throw new KmsKeyDisabledError();
      if (version.state === 'destroyed') throw new KmsKeyNotFoundError();
      if (wrapped.length < IV_BYTES + TAG_BYTES) throw new KmsInvalidCiphertextError();
      const buffer = Buffer.from(wrapped);
      try {
        const decipher = createDecipheriv(
          'aes-256-gcm',
          Buffer.from(version.keyMaterialBase64, 'base64'),
          buffer.subarray(0, IV_BYTES),
        );
        decipher.setAAD(Buffer.from(aad));
        decipher.setAuthTag(buffer.subarray(IV_BYTES, IV_BYTES + TAG_BYTES));
        const plain = Buffer.concat([
          decipher.update(buffer.subarray(IV_BYTES + TAG_BYTES)),
          decipher.final(),
        ]);
        return new Uint8Array(plain);
      } catch {
        throw new KmsInvalidCiphertextError();
      }
    },

    async describeKey(requestedKeyId) {
      await before('describe');
      if (requestedKeyId !== keyId) throw new KmsKeyNotFoundError();
      const { key } = entry();
      return {
        keyId,
        primaryVersion: key.primary,
        versions: key.versions.map(({ version, state }) => ({ version, state })),
      };
    },

    async rotate() {
      const { ring, key } = entry();
      const created = newVersion(key.versions.length + 1);
      key.versions.push(created);
      key.primary = created.version;
      writeRing(ring);
      return created.version;
    },

    async disableVersion(version) {
      setState(version, 'disabled');
    },

    async enableVersion(version) {
      setState(version, 'enabled');
    },

    async destroyVersion(version) {
      setState(version, 'destroyed');
    },

    injectFault(fault) {
      faults.push({ fault, remaining: fault.count === 'forever' ? Infinity : fault.count });
    },

    clearFaults() {
      faults.length = 0;
    },

    setLatency(ms) {
      latencyMs = ms;
    },

    stats() {
      return { ...counts };
    },
  };
}
