/**
 * Deletes expired idempotency records in batches, then schedules the next run, so one job is
 * always waiting. A run that fails part-way is repeated whole; deleting expired rows twice is
 * harmless.
 */
import { and, eq } from 'drizzle-orm';
import {
  insertOutbox,
  outboxTable,
  type Db,
  type IdempotencyStore,
} from '@boldcreate-integrations/db';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

const JOB_TYPE = 'idempotency_key.purge_due';

export interface IdempotencyPurgeDeps {
  db: Db;
  store: Pick<IdempotencyStore, 'purgeExpired'>;
  /** Removes expired project idempotency rows. */
  purgeProject?: (limit: number) => Promise<number>;
  /** Seconds between runs (`IDEMPOTENCY_PURGE_INTERVAL_SECONDS`). */
  intervalSeconds: number;
  /** Rows deleted per statement. */
  batchSize: number;
  now?: () => Date;
}

export async function handleIdempotencyPurgeDue(
  _job: ClaimedJob,
  deps: IdempotencyPurgeDeps,
): Promise<number> {
  let total = 0;
  const purgers = [
    (limit: number) => deps.store.purgeExpired(limit),
    ...(deps.purgeProject ? [deps.purgeProject] : []),
  ];
  for (const purge of purgers) {
    for (;;) {
      const removed = await purge(deps.batchSize);
      total += removed;
      if (removed < deps.batchSize) break;
    }
  }
  const now = (deps.now ?? (() => new Date()))();
  await insertOutbox(deps.db, {
    type: JOB_TYPE,
    payload: {},
    runAt: new Date(now.getTime() + deps.intervalSeconds * 1000),
  });
  return total;
}

/** Enqueues the first purge job unless one is already waiting; called when the worker starts. */
export async function ensureIdempotencyPurgeScheduled(db: Db): Promise<boolean> {
  const [waiting] = await db
    .select({ id: outboxTable.id })
    .from(outboxTable)
    .where(and(eq(outboxTable.eventType, JOB_TYPE), eq(outboxTable.status, 'pending')))
    .limit(1);
  if (waiting) return false;
  await insertOutbox(db, { type: JOB_TYPE, payload: {} });
  return true;
}
