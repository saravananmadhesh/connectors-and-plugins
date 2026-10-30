import { describe, expect, it, vi } from 'vitest';
import type { Db, RetentionPolicy, RetentionResult } from '@boldcreate-integrations/db';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

const insertOutbox = vi.hoisted(() => vi.fn<(db: unknown, row: unknown) => Promise<void>>());
vi.mock('@boldcreate-integrations/db', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  insertOutbox,
}));

const { handleObservabilityPurgeDue } = await import('./observability-retention.js');

const job: ClaimedJob = { id: 'j', type: 'observability.purge_due', payload: {}, attempts: 0 };
const policy: RetentionPolicy = {
  errorEventDays: 14,
  errorGroupDays: 30,
  opsEventDays: 30,
  longLivedOpsKinds: ['key_created'],
  longLivedOpsEventDays: 90,
  batchSize: 100,
  maxTotalBytes: 1000,
};
const result = (overrides: Partial<RetentionResult> = {}): RetentionResult => ({
  errorEvents: 1,
  errorGroups: 0,
  opsEvents: 0,
  sizeGuardRemoved: 0,
  totalBytesBefore: 10,
  truncated: false,
  ...overrides,
});

function setup(purged: RetentionResult) {
  insertOutbox.mockReset().mockResolvedValue(undefined);
  const purge = vi.fn<() => Promise<RetentionResult>>().mockResolvedValue(purged);
  const recordOpsEvent = vi.fn<(kind: string, severity: string, detail?: object) => void>();
  const deps = {
    db: {} as Db,
    policy,
    intervalSeconds: 3600,
    purge,
    errors: {
      reportError: vi.fn<() => void>(),
      recordOpsEvent,
      flush: vi.fn<() => void>(),
      stop: vi.fn<() => void>(),
    },
    now: () => new Date('2026-01-01T00:00:00Z'),
  };
  return { deps, purge, recordOpsEvent };
}

describe('observability retention job', () => {
  it('purges with the configured policy and schedules the next run', async () => {
    const { deps, purge } = setup(result());
    await handleObservabilityPurgeDue(job, deps as never);
    expect(purge).toHaveBeenCalledWith(deps.db, policy, new Date('2026-01-01T00:00:00Z'));
    expect(insertOutbox).toHaveBeenCalledWith(
      deps.db,
      expect.objectContaining({
        type: 'observability.purge_due',
        runAt: new Date('2026-01-01T01:00:00Z'),
      }),
    );
  });

  it('comes back sooner after a run that stopped at its time limit', async () => {
    const { deps } = setup(result({ truncated: true }));
    await handleObservabilityPurgeDue(job, { ...deps, catchUpSeconds: 300 } as never);
    expect(insertOutbox).toHaveBeenCalledWith(
      deps.db,
      expect.objectContaining({ runAt: new Date('2026-01-01T00:05:00Z') }),
    );

    const complete = setup(result());
    await handleObservabilityPurgeDue(job, { ...complete.deps, catchUpSeconds: 300 } as never);
    expect(insertOutbox).toHaveBeenLastCalledWith(
      complete.deps.db,
      expect.objectContaining({ runAt: new Date('2026-01-01T01:00:00Z') }),
    );
  });

  it('records a warning only when the size guard had to remove rows', async () => {
    const quiet = setup(result());
    await handleObservabilityPurgeDue(job, quiet.deps as never);
    expect(quiet.recordOpsEvent).not.toHaveBeenCalled();

    const guarded = setup(result({ sizeGuardRemoved: 500, totalBytesBefore: 5000 }));
    await handleObservabilityPurgeDue(job, guarded.deps as never);
    expect(guarded.recordOpsEvent).toHaveBeenCalledWith(
      'retention_size_guard_triggered',
      'warning',
      expect.objectContaining({ extra: expect.objectContaining({ removed: 500 }) }),
    );
  });

  it('does not schedule another run when the purge fails, so the job is retried', async () => {
    const { deps, purge } = setup(result());
    purge.mockRejectedValue(new Error('db down'));
    await expect(handleObservabilityPurgeDue(job, deps as never)).rejects.toThrow('db down');
    expect(insertOutbox).not.toHaveBeenCalled();
  });
});
