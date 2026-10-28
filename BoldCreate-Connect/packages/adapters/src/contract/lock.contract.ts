import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { tenantKey, type LockPort } from '@boldcreate-integrations/ports';
import type { ContractFactory, ContractHarness } from './harness.js';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const key = () => tenantKey('contract', randomUUID(), 'lock');

export function runLockContract(label: string, make: ContractFactory<LockPort>): void {
  describe(`lock contract: ${label}`, () => {
    let harness: ContractHarness<LockPort>;
    let lock: LockPort;
    beforeAll(async () => {
      harness = await make();
      lock = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('refuses a second acquire of a held key', async () => {
      const k = key();
      const first = await lock.acquire(k, { ttlMs: 5000 });
      expect(first).not.toBeNull();
      expect(await lock.acquire(k, { ttlMs: 5000 })).toBeNull();
      await first!.release();
    });

    it('frees the key when the holder releases it', async () => {
      const k = key();
      const first = await lock.acquire(k, { ttlMs: 5000 });
      expect(await first!.release()).toBe(true);
      const second = await lock.acquire(k, { ttlMs: 5000 });
      expect(second).not.toBeNull();
      await second!.release();
    });

    it('does not let a stale holder release a newer holder', async () => {
      const k = key();
      const stale = await lock.acquire(k, { ttlMs: 200 });
      await sleep(350);
      const current = await lock.acquire(k, { ttlMs: 5000 });
      expect(current).not.toBeNull();
      expect(await stale!.release()).toBe(false);
      expect(await lock.acquire(k, { ttlMs: 5000 })).toBeNull();
      await current!.release();
    });

    it('extends only for the holder', async () => {
      const k = key();
      const holder = await lock.acquire(k, { ttlMs: 300 });
      expect(await holder!.extend(5000)).toBe(true);
      await sleep(500);
      expect(await lock.acquire(k, { ttlMs: 5000 })).toBeNull();
      await holder!.release();
      expect(await holder!.extend(5000)).toBe(false);
    });

    it('lets an expired lock be taken', async () => {
      const k = key();
      await lock.acquire(k, { ttlMs: 200 });
      await sleep(350);
      const next = await lock.acquire(k, { ttlMs: 5000 });
      expect(next).not.toBeNull();
      await next!.release();
    });

    it('gives exactly one holder among 20 concurrent acquires', async () => {
      const k = key();
      const results = await Promise.all(
        Array.from({ length: 20 }, () => lock.acquire(k, { ttlMs: 5000 })),
      );
      const holders = results.filter((handle) => handle !== null);
      expect(holders).toHaveLength(1);
      await holders[0]!.release();
    });
  });
}
