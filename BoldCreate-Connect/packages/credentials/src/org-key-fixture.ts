/**
 * An in-memory org key directory and store over the local key management adapter, for tests of
 * sealing and unsealing. Not used by production code.
 */
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLocalKms, type LocalKms } from '@boldcreate-integrations/adapters/kms';
import { FakeClock } from '@boldcreate-integrations/adapters/system';
import { buildOrgKeyAad, toBase64Url } from './envelope.js';
import { createOrgKeyCache, type OrgKeyCache } from './org-key-cache.js';
import { generateOrgKeyPair } from './org-key-pair.js';
import { createSealer, type ActiveOrgKey, type OrgKeyDirectory, type Sealer } from './sealer.js';
import { createUnsealer, type OrgKeyRecord, type OrgKeyStore, type Unsealer } from './unsealer.js';

export interface SealingFixture {
  kms: LocalKms;
  clock: FakeClock;
  cache: OrgKeyCache;
  sealer: Sealer;
  unsealer: Unsealer;
  records: Map<string, OrgKeyRecord>;
  /** Creates a new active key for the org and retires the previous one; returns its row id. */
  addKey(orgId: string): Promise<string>;
  /** Number of times the store was asked for a key row. */
  storeReads(): number;
  cleanup(): void;
}

export function createSealingFixture(
  options: { cacheMax?: number; ttlSeconds?: number } = {},
): SealingFixture {
  const dir = mkdtempSync(join(tmpdir(), 'sealing-'));
  const kms = createLocalKms({ keyringPath: join(dir, 'keyring.json') });
  const clock = new FakeClock();
  const cache = createOrgKeyCache({
    max: options.cacheMax ?? 1000,
    ttlSeconds: options.ttlSeconds ?? 300,
    clock,
  });
  const records = new Map<string, OrgKeyRecord>();
  const publicKeys = new Map<string, string>();
  let reads = 0;

  const orgKeys: OrgKeyDirectory = {
    async getActivePublicKey(orgId): Promise<ActiveOrgKey | null> {
      for (const record of records.values()) {
        if (record.organizationId === orgId && record.status === 'active') {
          return { orgKeyId: record.id, publicKey: publicKeys.get(record.id)! };
        }
      }
      return null;
    },
  };
  const orgKeyStore: OrgKeyStore = {
    async getKey(id) {
      reads += 1;
      return records.get(id) ?? null;
    },
  };

  return {
    kms,
    clock,
    cache,
    sealer: createSealer({ orgKeys }),
    unsealer: createUnsealer({ kms, orgKeyStore, keyCache: cache }),
    records,
    async addKey(orgId) {
      for (const record of records.values()) {
        if (record.organizationId === orgId && record.status === 'active') {
          record.status = 'retired';
        }
      }
      const id = randomUUID();
      const pair = await generateOrgKeyPair();
      const wrapped = await kms.wrapKey({
        plaintext: pair.privateKey,
        aad: buildOrgKeyAad(orgId, id),
      });
      records.set(id, {
        id,
        organizationId: orgId,
        wrappedPrivateKey: toBase64Url(wrapped.wrapped),
        kmsKeyId: wrapped.keyId,
        kmsKeyVersion: wrapped.keyVersion,
        status: 'active',
      });
      publicKeys.set(id, pair.publicKey);
      return id;
    },
    storeReads: () => reads,
    cleanup: () => rmSync(dir, { recursive: true, force: true }),
  };
}
