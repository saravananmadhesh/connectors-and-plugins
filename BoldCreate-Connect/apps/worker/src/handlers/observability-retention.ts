/**
 * Deletes expired errors and key events in batches, then schedules the next run, so one job is
 * always waiting. A run that fails part-way is repeated whole; deleting expired rows twice is
 * harmless.
 */
import {
  purgeObservability,
  type Db,
  type RetentionPolicy,
  type RetentionResult,
} from '@boldcreate-integrations/db';
import type { ErrorReporter } from '@boldcreate-integrations/observability';
import type { ClaimedJob } from '@boldcreate-integrations/ports';
import { ensureRecurringJobScheduled, scheduleNextRecurringRun } from './recurring-job.js';

const JOB_TYPE = 'observability.purge_due';

export interface ObservabilityRetentionDeps {
  /** The service's own database, where the next run is scheduled. */
  db: Db;
  /** Where errors and events are stored; `db` when they share one database. */
  store?: Db;
  policy: RetentionPolicy;
  /** Seconds between runs (`OBSERVABILITY_RETENTION_INTERVAL_SECONDS`). */
  intervalSeconds: number;
  /** Seconds before the next run when this one stopped at its time limit. Defaults to the interval. */
  catchUpSeconds?: number;
  errors?: ErrorReporter;
  purge?: (db: Db, policy: RetentionPolicy, now: Date) => Promise<RetentionResult>;
  now?: () => Date;
}

export async function handleObservabilityPurgeDue(
  _job: ClaimedJob,
  deps: ObservabilityRetentionDeps,
): Promise<RetentionResult> {
  const now = (deps.now ?? (() => new Date()))();
  const result = await (deps.purge ?? purgeObservability)(deps.store ?? deps.db, deps.policy, now);
  if (result.sizeGuardRemoved > 0) {
    deps.errors?.recordOpsEvent('retention_size_guard_triggered', 'warning', {
      area: 'worker',
      operation: JOB_TYPE,
      extra: {
        removed: result.sizeGuardRemoved,
        totalBytes: result.totalBytesBefore,
        maxTotalBytes: deps.policy.maxTotalBytes,
      },
    });
  }
  const next = result.truncated
    ? Math.min(deps.intervalSeconds, deps.catchUpSeconds ?? deps.intervalSeconds)
    : deps.intervalSeconds;
  await scheduleNextRecurringRun(deps.db, JOB_TYPE, now, next);
  return result;
}

/** Enqueues the first retention job unless one is already waiting; called when the worker starts. */
export const ensureObservabilityRetentionScheduled = (db: Db): Promise<boolean> =>
  ensureRecurringJobScheduled(db, JOB_TYPE);
