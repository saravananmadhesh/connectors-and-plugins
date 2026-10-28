import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import { tenantKey, type LimiterPort } from '@boldcreate-integrations/ports';
import type { ContractFactory, ContractHarness } from './harness.js';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const key = () => tenantKey('contract', randomUUID(), 'limit');

export function runLimiterContract(label: string, make: ContractFactory<LimiterPort>): void {
  describe(`limiter contract: ${label}`, () => {
    let harness: ContractHarness<LimiterPort>;
    let limiter: LimiterPort;
    beforeAll(async () => {
      harness = await make();
      limiter = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('denies the call after the limit and counts remaining down', async () => {
      const k = key();
      const opts = { limit: 3, windowSeconds: 30 };
      const results = [];
      for (let i = 0; i < 4; i += 1) results.push(await limiter.check(k, opts));
      expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
      expect(results.map((r) => r.remaining)).toEqual([2, 1, 0, 0]);
      expect(results[0]!.resetAt.getTime()).toBeGreaterThan(Date.now());
    });

    it('clears the window on reset', async () => {
      const k = key();
      const opts = { limit: 1, windowSeconds: 30 };
      expect((await limiter.check(k, opts)).allowed).toBe(true);
      expect((await limiter.check(k, opts)).allowed).toBe(false);
      await limiter.reset(k);
      expect((await limiter.check(k, opts)).allowed).toBe(true);
    });

    it('allows again after the window rolls over', async () => {
      const k = key();
      const opts = { limit: 1, windowSeconds: 1 };
      expect((await limiter.check(k, opts)).allowed).toBe(true);
      expect((await limiter.check(k, opts)).allowed).toBe(false);
      await sleep(1300);
      expect((await limiter.check(k, opts)).allowed).toBe(true);
    });

    it('allows exactly the limit among 50 concurrent calls', async () => {
      const k = key();
      const results = await Promise.all(
        Array.from({ length: 50 }, () => limiter.check(k, { limit: 10, windowSeconds: 30 })),
      );
      expect(results.filter((r) => r.allowed)).toHaveLength(10);
    });
  });
}
