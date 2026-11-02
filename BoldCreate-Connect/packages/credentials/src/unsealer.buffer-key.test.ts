import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { FakeClock } from '@boldcreate-integrations/adapters/system';
import { createOrgKeyCache } from './org-key-cache.js';
import { generateOrgKeyPair } from './org-key-pair.js';
import { createSealer } from './sealer.js';
import { createUnsealer } from './unsealer.js';

/**
 * The Cloud KMS SDK hands back a Node `Buffer`, whose `slice()` is a view, not a copy. Zeroing
 * the per-call key must never reach the cached key, or every unseal after the first fails.
 */
describe('unsealer with a key management service that returns a Buffer', () => {
  it('opens values again and again from the cached key', async () => {
    const orgId = randomUUID();
    const orgKeyId = randomUUID();
    const pair = await generateOrgKeyPair();
    // Pooled like the SDK's: the key sits at an offset inside a larger buffer.
    const pool = Buffer.alloc(64, 7);
    const privateKey = Buffer.from(pair.privateKey);
    const sealer = createSealer({
      orgKeys: { getActivePublicKey: async () => ({ orgKeyId, publicKey: pair.publicKey }) },
    });
    const unsealer = createUnsealer({
      kms: {
        unwrapKey: async () => {
          privateKey.copy(pool, 16);
          return pool.subarray(16, 48);
        },
      },
      orgKeyStore: {
        getKey: async () => ({
          id: orgKeyId,
          organizationId: orgId,
          wrappedPrivateKey: 'AA',
          kmsKeyId: 'k',
          kmsKeyVersion: '1',
          status: 'active',
        }),
      },
      keyCache: createOrgKeyCache({ max: 10, ttlSeconds: 300, clock: new FakeClock() }),
    });
    const context = {
      purpose: 'connection_secret' as const,
      orgId,
      subject: { kind: 'connection' as const, id: randomUUID() },
    };
    for (const value of ['first', 'second', 'third']) {
      const envelope = await sealer.seal({ ...context, plaintext: value });
      expect(await unsealer.unseal({ ...context, envelope })).toBe(value);
    }
  });
});
