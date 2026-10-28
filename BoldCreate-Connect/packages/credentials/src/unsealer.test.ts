import { randomUUID } from 'node:crypto';
import { afterEach, describe, expect, it } from 'vitest';
import { createSealingFixture, type SealingFixture } from './org-key-fixture.js';
import { CredentialUnavailableError } from './errors.js';
import { createOrgKeyCache } from './org-key-cache.js';
import { fromBase64Url, toBase64Url, type SealContext } from './envelope.js';

const orgId = randomUUID();
const otherOrgId = randomUUID();

const ctx = (id: string = randomUUID()): SealContext => ({
  purpose: 'connection_secret',
  orgId,
  subject: { kind: 'connection', id },
});

describe('unsealer', () => {
  let fixture: SealingFixture;
  afterEach(() => fixture.cleanup());

  const setup = async (options?: Parameters<typeof createSealingFixture>[0]) => {
    fixture = createSealingFixture(options);
    await fixture.addKey(orgId);
    await fixture.addKey(otherOrgId);
  };

  const unavailable = (reason?: string) =>
    expect.objectContaining({
      code: 'credential_unavailable',
      ...(reason ? { reason } : {}),
    });

  it('round-trips a value', async () => {
    await setup();
    const context = ctx();
    const envelope = await fixture.sealer.seal({ ...context, plaintext: 'bearer-token-1234' });
    expect(await fixture.unsealer.unseal({ ...context, envelope })).toBe('bearer-token-1234');
  });

  it('rejects a tampered enc or ciphertext', async () => {
    await setup();
    const context = ctx();
    const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
    const [version, key, enc, ciphertext] = envelope.split(':') as [string, string, string, string];
    const flip = (part: string) => {
      const bytes = fromBase64Url(part).slice();
      bytes[0] = bytes[0]! ^ 1;
      return toBase64Url(bytes);
    };
    for (const tampered of [
      `${version}:${key}:${flip(enc)}:${ciphertext}`,
      `${version}:${key}:${enc}:${flip(ciphertext)}`,
    ]) {
      await expect(fixture.unsealer.unseal({ ...context, envelope: tampered })).rejects.toEqual(
        unavailable('open_failed'),
      );
    }
  });

  it('rejects a malformed envelope', async () => {
    await setup();
    await expect(fixture.unsealer.unseal({ ...ctx(), envelope: 'nonsense' })).rejects.toEqual(
      unavailable('malformed'),
    );
  });

  it('rejects a moved ciphertext: other subject, other purpose, other org', async () => {
    await setup();
    const context = ctx();
    const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
    await expect(
      fixture.unsealer.unseal({
        ...context,
        subject: { kind: 'connection', id: randomUUID() },
        envelope,
      }),
    ).rejects.toBeInstanceOf(CredentialUnavailableError);
    await expect(
      fixture.unsealer.unseal({
        purpose: 'user_connection_token',
        orgId,
        subject: { kind: 'user_connection', id: context.subject.id },
        envelope,
      }),
    ).rejects.toBeInstanceOf(CredentialUnavailableError);
    await expect(
      fixture.unsealer.unseal({ ...context, orgId: otherOrgId, envelope }),
    ).rejects.toEqual(unavailable('key_not_found'));
  });

  it('rejects an envelope sealed to another org key', async () => {
    await setup();
    const context = ctx();
    const foreign = await fixture.sealer.seal({
      ...context,
      orgId: otherOrgId,
      plaintext: 'secret',
    });
    await expect(fixture.unsealer.unseal({ ...context, envelope: foreign })).rejects.toBeInstanceOf(
      CredentialUnavailableError,
    );
  });

  it('opens old envelopes after rotation and seals new ones to the new key', async () => {
    await setup();
    const context = ctx();
    const before = await fixture.sealer.seal({ ...context, plaintext: 'old' });
    const newKeyId = await fixture.addKey(orgId);
    const after = await fixture.sealer.seal({ ...context, plaintext: 'new' });
    expect(after).toContain(`okey_${newKeyId.replaceAll('-', '')}`);
    expect(before).not.toContain(newKeyId.replaceAll('-', ''));
    expect(await fixture.unsealer.unseal({ ...context, envelope: before })).toBe('old');
    expect(await fixture.unsealer.unseal({ ...context, envelope: after })).toBe('new');
  });

  describe('key management', () => {
    it('serves a warm cache while the service is down until the ttl passes, then fails closed', async () => {
      await setup({ ttlSeconds: 300 });
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      await fixture.unsealer.unseal({ ...context, envelope });
      fixture.kms.injectFault({ op: 'unwrap', error: 'unavailable', count: 'forever' });

      fixture.clock.advance(299_000);
      expect(await fixture.unsealer.unseal({ ...context, envelope })).toBe('secret');
      fixture.clock.advance(2_000);
      await expect(fixture.unsealer.unseal({ ...context, envelope })).rejects.toEqual(
        unavailable('kms_unavailable'),
      );
    });

    it('fails immediately on a cold cache while the service is down', async () => {
      await setup();
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      fixture.kms.injectFault({ op: 'unwrap', error: 'unavailable', count: 'forever' });
      await expect(fixture.unsealer.unseal({ ...context, envelope })).rejects.toEqual(
        unavailable('kms_unavailable'),
      );
    });

    it('calls the service once for a thousand unseals of one org, also when concurrent', async () => {
      await setup();
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      const results = await Promise.all(
        Array.from({ length: 1000 }, () => fixture.unsealer.unseal({ ...context, envelope })),
      );
      expect(results.every((value) => value === 'secret')).toBe(true);
      expect(fixture.kms.stats().unwrap).toBe(1);
      expect(fixture.storeReads()).toBe(1);
    }, 60_000);

    it('calls the service again after the org is purged from the cache', async () => {
      await setup();
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      await fixture.unsealer.unseal({ ...context, envelope });
      fixture.cache.purgeOrg(orgId);
      await fixture.unsealer.unseal({ ...context, envelope });
      expect(fixture.kms.stats().unwrap).toBe(2);
    });

    it('fails closed when the key version is disabled or destroyed', async () => {
      await setup();
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      await fixture.kms.disableVersion('v1');
      await expect(fixture.unsealer.unseal({ ...context, envelope })).rejects.toEqual(
        unavailable('key_unusable'),
      );
      await fixture.kms.destroyVersion('v1');
      await expect(fixture.unsealer.unseal({ ...context, envelope })).rejects.toEqual(
        unavailable('key_unusable'),
      );
    });

    it('fails closed for a destroyed org key row', async () => {
      await setup();
      const context = ctx();
      const keyId = await fixture.addKey(orgId);
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      fixture.records.get(keyId)!.status = 'destroyed';
      await expect(fixture.unsealer.unseal({ ...context, envelope })).rejects.toEqual(
        unavailable('key_unusable'),
      );
    });

    it('does not open a wrapped key under another org', async () => {
      await setup();
      const context = ctx();
      const envelope = await fixture.sealer.seal({ ...context, plaintext: 'secret' });
      const [record] = [...fixture.records.values()].filter((r) => r.organizationId === orgId);
      // Pointing the row at another organization changes the wrap context.
      record!.organizationId = otherOrgId;
      await expect(
        fixture.unsealer.unseal({ ...context, orgId: otherOrgId, envelope }),
      ).rejects.toBeInstanceOf(CredentialUnavailableError);
    });
  });
});

describe('org key cache', () => {
  const clock = { nowMs: () => now };
  let now = 0;

  it('evicts the least recently used entry and zeroes it', () => {
    now = 0;
    const cache = createOrgKeyCache({ max: 2, ttlSeconds: 10, clock });
    const first = new Uint8Array([1, 1, 1]);
    cache.set('a', 'org', first);
    const second = new Uint8Array([2]);
    cache.set('b', 'org', second);
    cache.get('a', 'org');
    cache.set('c', 'org', new Uint8Array([3]));
    expect(cache.get('b', 'org')).toBeUndefined();
    expect(cache.get('a', 'org')).toBe(first);
    expect(cache.size).toBe(2);
    cache.set('d', 'org', new Uint8Array([4]));
    expect([...second]).toEqual([0]);
  });

  it('expires entries after the time to live and zeroes them', () => {
    now = 0;
    const cache = createOrgKeyCache({ max: 5, ttlSeconds: 10, clock });
    const key = new Uint8Array([9, 9]);
    cache.set('a', 'org', key);
    now = 9_999;
    expect(cache.get('a', 'org')).toBe(key);
    now = 10_000;
    expect(cache.get('a', 'org')).toBeUndefined();
    expect([...key]).toEqual([0, 0]);
  });

  it('purges only the entries of one org', () => {
    now = 0;
    const cache = createOrgKeyCache({ max: 5, ttlSeconds: 10, clock });
    const mine = new Uint8Array([1]);
    cache.set('a', 'mine', mine);
    cache.set('b', 'theirs', new Uint8Array([2]));
    cache.purgeOrg('mine');
    expect(cache.get('a', 'mine')).toBeUndefined();
    expect(cache.get('b', 'theirs')).toBeDefined();
    expect([...mine]).toEqual([0]);
    cache.clear();
    expect(cache.size).toBe(0);
  });
});
