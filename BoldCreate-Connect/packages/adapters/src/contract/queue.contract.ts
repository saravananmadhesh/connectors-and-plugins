import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import { randomUUID } from 'node:crypto';
import type { QueuePort } from '@boldcreate-integrations/ports';
import type { FakeClock } from '../system/fake-clock.js';

export interface QueueHarness {
  port: QueuePort;
  /** Clock that stamps retry times in the adapter. */
  clock: FakeClock;
  cleanup(): Promise<void>;
  /** Moves a job's due time into the past so the next claim can pick it up. */
  makeDue(id: string): Promise<void>;
  inspect(id: string): Promise<{
    status: string;
    attempts: number;
    nextAttemptAt: Date;
    leaseOwner: string | null;
    lastError: string | null;
    payload: string | null;
  } | null>;
}

const TYPES = ['invite.created' as const];
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function runQueueContract(label: string, make: () => Promise<QueueHarness>): void {
  describe(`queue contract: ${label}`, () => {
    let harness: QueueHarness;
    let queue: QueuePort;
    beforeAll(async () => {
      harness = await make();
      queue = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    const drain = async () => {
      for (;;) {
        const jobs = await queue.claim({
          types: TYPES,
          limit: 100,
          leaseMs: 60_000,
          owner: 'drain',
        });
        if (jobs.length === 0) return;
        for (const job of jobs) await queue.complete(job.id);
      }
    };

    it('enqueues, claims and completes a job', async () => {
      await drain();
      const { id } = await queue.enqueue({ type: 'invite.created', payload: { n: 1 } });
      const [job] = await queue.claim({ types: TYPES, limit: 10, leaseMs: 60_000, owner: 'a' });
      expect(job).toMatchObject({ id, type: 'invite.created', payload: { n: 1 }, attempts: 0 });
      expect((await harness.inspect(id))?.leaseOwner).toBe('a');
      expect(await queue.claim({ types: TYPES, limit: 10, leaseMs: 60_000, owner: 'b' })).toEqual(
        [],
      );
      await queue.complete(id);
      const row = await harness.inspect(id);
      expect(row).toMatchObject({ status: 'delivered', payload: null, leaseOwner: null });
    });

    it('never gives one job to two concurrent claimers', async () => {
      await drain();
      for (let index = 0; index < 50; index += 1) {
        await queue.enqueue({ type: 'invite.created', payload: { index } });
      }
      const batches = await Promise.all(
        ['a', 'b', 'c', 'd'].map(async (owner) => {
          const seen: string[] = [];
          for (;;) {
            const jobs = await queue.claim({ types: TYPES, limit: 5, leaseMs: 60_000, owner });
            if (jobs.length === 0) return seen;
            seen.push(...jobs.map((job) => job.id));
          }
        }),
      );
      const all = batches.flat();
      expect(all).toHaveLength(50);
      expect(new Set(all).size).toBe(50);
      for (const id of all) await queue.complete(id);
    });

    it('makes a job claimable again after its lease expires', async () => {
      await drain();
      const { id } = await queue.enqueue({ type: 'invite.created', payload: {} });
      expect(await queue.claim({ types: TYPES, limit: 1, leaseMs: 150, owner: 'a' })).toHaveLength(
        1,
      );
      expect(await queue.claim({ types: TYPES, limit: 1, leaseMs: 150, owner: 'b' })).toEqual([]);
      await sleep(300);
      const [again] = await queue.claim({ types: TYPES, limit: 1, leaseMs: 60_000, owner: 'b' });
      expect(again?.id).toBe(id);
      await queue.complete(id);
    });

    it('does not claim a job scheduled in the future', async () => {
      await drain();
      const { id } = await queue.enqueue({
        type: 'invite.created',
        payload: {},
        runAt: new Date(Date.now() + 60_000),
      });
      expect(await queue.claim({ types: TYPES, limit: 10, leaseMs: 1000, owner: 'a' })).toEqual([]);
      await queue.complete(id);
    });

    it('only claims the requested types', async () => {
      await drain();
      const { id } = await queue.enqueue({ type: 'password_reset.requested', payload: {} });
      expect(await queue.claim({ types: TYPES, limit: 10, leaseMs: 1000, owner: 'a' })).toEqual([]);
      const [job] = await queue.claim({
        types: ['password_reset.requested'],
        limit: 10,
        leaseMs: 1000,
        owner: 'a',
      });
      expect(job?.id).toBe(id);
      await queue.complete(id);
    });

    it('retries with the backoff schedule and marks the job failed after six attempts', async () => {
      await drain();
      const { id } = await queue.enqueue({ type: 'invite.created', payload: { x: 1 } });
      const delays = [30_000, 120_000, 480_000, 1_920_000, 7_200_000, 7_200_000];
      for (const [index, delay] of delays.entries()) {
        const claimed = await queue.claim({ types: TYPES, limit: 1, leaseMs: 60_000, owner: 'a' });
        expect(claimed).toHaveLength(1);
        expect(claimed[0]?.attempts).toBe(index);
        const at = harness.clock.nowMs();
        await queue.fail(id, { retryAt: null, error: 'boom' });
        const row = await harness.inspect(id);
        const last = index === delays.length - 1;
        expect({ attempts: row?.attempts, error: row?.lastError, status: row?.status }).toEqual({
          attempts: index + 1,
          error: 'boom',
          status: last ? 'failed' : 'pending',
        });
        expect(last ? at : row?.nextAttemptAt.getTime()).toBe(last ? at : at + delay);
        harness.clock.advance(delay);
        if (!last) await harness.makeDue(id);
      }
      expect(await queue.claim({ types: TYPES, limit: 1, leaseMs: 1000, owner: 'a' })).toEqual([]);
    });

    it('uses an explicit retry time and truncates the stored error', async () => {
      await drain();
      const { id } = await queue.enqueue({ type: 'invite.created', payload: {} });
      await queue.claim({ types: TYPES, limit: 1, leaseMs: 60_000, owner: 'a' });
      const retryAt = new Date('2031-01-01T00:00:00.000Z');
      await queue.fail(id, { retryAt, error: 'x'.repeat(900) });
      const row = await harness.inspect(id);
      expect(row?.nextAttemptAt).toEqual(retryAt);
      expect(row?.lastError).toHaveLength(500);
      expect(row?.status).toBe('pending');
      await queue.complete(id);
    });

    it('returns the existing pending job for a repeated dedupe key', async () => {
      await drain();
      const key = randomUUID();
      const first = await queue.enqueue({
        type: 'invite.created',
        payload: { a: 1 },
        dedupeKey: key,
      });
      const second = await queue.enqueue({
        type: 'invite.created',
        payload: { a: 2 },
        dedupeKey: key,
      });
      expect(second.id).toBe(first.id);
      const other = await queue.enqueue({
        type: 'invite.created',
        payload: {},
        dedupeKey: randomUUID(),
      });
      expect(other.id).not.toBe(first.id);
      await drain();
    });
  });
}
