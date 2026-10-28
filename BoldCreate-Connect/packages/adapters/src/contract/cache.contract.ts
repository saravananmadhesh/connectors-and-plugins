import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { tenantKey, type CachePort } from '@boldcreate-integrations/ports';
import type { ContractFactory, ContractHarness } from './harness.js';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const key = (...parts: string[]) => tenantKey('contract', randomUUID(), ...parts);

export function runCacheContract(label: string, make: ContractFactory<CachePort>): void {
  describe(`cache contract: ${label}`, () => {
    let harness: ContractHarness<CachePort>;
    let cache: CachePort;
    beforeAll(async () => {
      harness = await make();
      cache = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('returns null for a missing key', async () => {
      expect(await cache.get(key('missing'))).toBeNull();
    });

    it('sets and gets a value', async () => {
      const k = key('value');
      await cache.set(k, 'hello');
      expect(await cache.get(k)).toBe('hello');
    });

    it('expires a value after its ttl', async () => {
      const k = key('ttl');
      await cache.set(k, 'soon gone', { ttlSeconds: 1 });
      expect(await cache.get(k)).toBe('soon gone');
      await sleep(1500);
      expect(await cache.get(k)).toBeNull();
    });

    it('keeps the same logical key of two organizations apart', async () => {
      const suffix = randomUUID();
      const orgA = tenantKey(randomUUID(), 'shared', suffix);
      const orgB = tenantKey(randomUUID(), 'shared', suffix);
      await cache.set(orgA, 'a');
      expect(await cache.get(orgB)).toBeNull();
      await cache.set(orgB, 'b');
      await cache.delete(orgA);
      expect(await cache.get(orgA)).toBeNull();
      expect(await cache.get(orgB)).toBe('b');
    });

    it('keeps the counters of two organizations apart', async () => {
      const suffix = randomUUID();
      const orgA = tenantKey(randomUUID(), 'counter', suffix);
      const orgB = tenantKey(randomUUID(), 'counter', suffix);
      expect(await cache.increment(orgA)).toBe(1);
      expect(await cache.increment(orgA)).toBe(2);
      expect(await cache.increment(orgB)).toBe(1);
    });

    it('deletes a value', async () => {
      const k = key('delete');
      await cache.set(k, 'x');
      await cache.delete(k);
      expect(await cache.get(k)).toBeNull();
    });

    it('increments from 1 and honours the ttl', async () => {
      const k = key('counter');
      expect(await cache.increment(k, { ttlSeconds: 1 })).toBe(1);
      expect(await cache.increment(k, { ttlSeconds: 1 })).toBe(2);
      expect(await cache.increment(k, { ttlSeconds: 1 })).toBe(3);
      await sleep(1500);
      expect(await cache.increment(k, { ttlSeconds: 1 })).toBe(1);
    });

    it('delivers a published message once to each subscriber and stops after unsubscribe', async () => {
      const channel = `contract-${randomUUID()}`;
      const first: string[] = [];
      const second: string[] = [];
      const stopFirst = await cache.subscribe(channel, (m) => first.push(m));
      const stopSecond = await cache.subscribe(channel, (m) => second.push(m));
      await cache.publish(channel, 'one');
      await sleep(300);
      expect(first).toEqual(['one']);
      expect(second).toEqual(['one']);
      await stopFirst();
      await cache.publish(channel, 'two');
      await sleep(300);
      expect(first).toEqual(['one']);
      expect(second).toEqual(['one', 'two']);
      await stopSecond();
    });

    it('answers ping', async () => {
      await expect(cache.ping()).resolves.toBeUndefined();
    });
  });
}
