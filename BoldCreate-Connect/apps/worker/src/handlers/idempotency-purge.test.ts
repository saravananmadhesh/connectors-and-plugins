import { describe, expect, it, vi } from 'vitest';
import type { Db, IdempotencyStore } from '@boldcreate-integrations/db';
import type { ClaimedJob } from '@boldcreate-integrations/ports';
import { handleIdempotencyPurgeDue } from './idempotency-purge.js';

const job: ClaimedJob = {
  id: 'job-1',
  type: 'idempotency_key.purge_due',
  payload: {},
  attempts: 0,
};

function setup(removals: number[]) {
  const values = vi.fn<(row: Record<string, unknown>) => Promise<void>>(async () => undefined);
  const db = { insert: () => ({ values }) } as unknown as Db;
  const purgeExpired = vi.fn<IdempotencyStore['purgeExpired']>();
  for (const count of removals) purgeExpired.mockResolvedValueOnce(count);
  return { db, values, purgeExpired };
}

describe('idempotency purge job', () => {
  it('deletes in batches until a short batch and counts the rows', async () => {
    const { db, purgeExpired } = setup([1000, 1000, 40]);
    const total = await handleIdempotencyPurgeDue(job, {
      db,
      store: { purgeExpired },
      intervalSeconds: 900,
      batchSize: 1000,
    });
    expect(total).toBe(2040);
    expect(purgeExpired).toHaveBeenCalledTimes(3);
    expect(purgeExpired).toHaveBeenCalledWith(1000);
  });

  it('schedules the next run one interval ahead', async () => {
    const { db, values, purgeExpired } = setup([0]);
    const now = new Date('2030-01-01T00:00:00Z');
    await handleIdempotencyPurgeDue(job, {
      db,
      store: { purgeExpired },
      intervalSeconds: 900,
      batchSize: 1000,
      now: () => now,
    });
    expect(values).toHaveBeenCalledTimes(1);
    const row = values.mock.calls[0]![0];
    expect(row['eventType']).toBe('idempotency_key.purge_due');
    expect(row['nextAttemptAt']).toEqual(new Date('2030-01-01T00:15:00Z'));
  });

  it('does not schedule again when the purge fails, so the job is retried whole', async () => {
    const { db, values, purgeExpired } = setup([]);
    purgeExpired.mockRejectedValueOnce(new Error('db down'));
    await expect(
      handleIdempotencyPurgeDue(job, {
        db,
        store: { purgeExpired },
        intervalSeconds: 900,
        batchSize: 1000,
      }),
    ).rejects.toThrow('db down');
    expect(values).not.toHaveBeenCalled();
  });

  it('also clears expired project records and counts them', async () => {
    const { db, purgeExpired } = setup([3]);
    const purgeProject = vi.fn<(limit: number) => Promise<number>>();
    purgeProject.mockResolvedValueOnce(1000).mockResolvedValueOnce(7);
    const total = await handleIdempotencyPurgeDue(job, {
      db,
      store: { purgeExpired },
      purgeProject,
      intervalSeconds: 900,
      batchSize: 1000,
    });
    expect(total).toBe(1010);
    expect(purgeProject).toHaveBeenCalledTimes(2);
  });
});
