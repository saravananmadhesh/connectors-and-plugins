import { and, inArray, lt, ne, notInArray, sql } from 'drizzle-orm';
import type { Executor } from './client.js';
import { errorEventTable, errorGroupTable, opsEventTable } from './schema/index.js';

/** How long each kind of observability data is kept; every value comes from configuration. */
export interface RetentionPolicy {
  errorEventDays: number;
  /** Groups not seen for this long are removed together with their events. */
  errorGroupDays: number;
  opsEventDays: number;
  /** Event kinds kept longer than `opsEventDays`, for example key and auth events. */
  longLivedOpsKinds: readonly string[];
  longLivedOpsEventDays: number;
  /** Rows deleted per statement. */
  batchSize: number;
  /** When the three tables together exceed this size the oldest events go early. 0 disables. */
  maxTotalBytes: number;
  /** Pause between batches, so deletes leave room for request traffic. 0 or unset: none. */
  batchPauseMs?: number;
  /** Longest a run may last; it stops there and the next run continues. 0 or unset: no limit. */
  maxRunMs?: number;
}

export interface RetentionResult {
  errorEvents: number;
  errorGroups: number;
  opsEvents: number;
  /** Rows removed early because the tables were over their size limit. */
  sizeGuardRemoved: number;
  totalBytesBefore: number;
  /** The run stopped at its time limit with expired rows left. */
  truncated: boolean;
}

const DAY_MS = 86_400_000;
const SIZE_GUARD_MAX_BATCHES = 50;

const cutoff = (now: Date, days: number) => new Date(now.getTime() - days * DAY_MS);

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Repeats a bounded delete until a batch comes back short, so no statement locks a huge range.
 * Waits between batches and stops at the run's deadline; `truncated` then tells the caller that
 * rows are left.
 */
async function inBatches(
  policy: Pick<RetentionPolicy, 'batchSize' | 'batchPauseMs'>,
  deadline: number,
  deleteBatch: () => Promise<number>,
): Promise<{ removed: number; truncated: boolean }> {
  let removed = 0;
  for (;;) {
    const batch = await deleteBatch();
    removed += batch;
    if (batch < policy.batchSize) return { removed, truncated: false };
    if (Date.now() >= deadline) return { removed, truncated: true };
    if (policy.batchPauseMs) await sleep(policy.batchPauseMs);
  }
}

export async function observabilityTotalBytes(db: Executor): Promise<number> {
  const result = await db.execute<{ bytes: string }>(
    sql`SELECT (pg_total_relation_size('error_group') + pg_total_relation_size('error_event') + pg_total_relation_size('ops_event'))::text AS bytes`,
  );
  return Number(result.rows[0]?.bytes ?? 0);
}

/**
 * Removes expired observability rows in batches. Safe to repeat: a run that stops part-way is
 * finished by the next one, since each statement only removes rows already past their cutoff.
 */
export async function purgeObservability(
  db: Executor,
  policy: RetentionPolicy,
  now: Date = new Date(),
): Promise<RetentionResult> {
  const { batchSize } = policy;
  const deadline = policy.maxRunMs ? Date.now() + policy.maxRunMs : Number.POSITIVE_INFINITY;
  let truncated = false;
  const e = errorEventTable;
  const g = errorGroupTable;
  const o = opsEventTable;
  const longLived = [...policy.longLivedOpsKinds];

  const errorEventRun = await inBatches(policy, deadline, async () => {
    const due = db
      .select({ id: e.id })
      .from(e)
      .where(lt(e.occurredAt, cutoff(now, policy.errorEventDays)))
      .limit(batchSize);
    return (await db.delete(e).where(inArray(e.id, due)).returning({ id: e.id })).length;
  });

  const errorGroupRun = await inBatches(policy, deadline, async () => {
    const due = db
      .select({ id: g.id })
      .from(g)
      .where(lt(g.lastSeen, cutoff(now, policy.errorGroupDays)))
      .limit(batchSize);
    return (await db.delete(g).where(inArray(g.id, due)).returning({ id: g.id })).length;
  });

  const opsEventRun = await inBatches(policy, deadline, async () => {
    const shortLived = and(
      lt(o.occurredAt, cutoff(now, policy.opsEventDays)),
      longLived.length > 0 ? notInArray(o.kind, longLived) : undefined,
    );
    const kept =
      longLived.length > 0
        ? and(
            inArray(o.kind, longLived),
            lt(o.occurredAt, cutoff(now, policy.longLivedOpsEventDays)),
          )
        : undefined;
    const due = db
      .select({ id: o.id })
      .from(o)
      .where(kept ? sql`(${shortLived}) OR (${kept})` : shortLived)
      .limit(batchSize);
    return (await db.delete(o).where(inArray(o.id, due)).returning({ id: o.id })).length;
  });

  truncated = errorEventRun.truncated || errorGroupRun.truncated || opsEventRun.truncated;

  const totalBytesBefore = await observabilityTotalBytes(db);
  let sizeGuardRemoved = 0;
  if (policy.maxTotalBytes > 0 && totalBytesBefore > policy.maxTotalBytes) {
    // Occurrence rows are the bulk and the least valuable; groups keep their counts.
    for (let i = 0; i < SIZE_GUARD_MAX_BATCHES; i += 1) {
      const oldest = db.select({ id: e.id }).from(e).orderBy(e.occurredAt).limit(batchSize);
      const removed = (await db.delete(e).where(inArray(e.id, oldest)).returning({ id: e.id }))
        .length;
      sizeGuardRemoved += removed;
      if (removed < batchSize) break;
      if (Date.now() >= deadline) {
        truncated = true;
        break;
      }
      if (policy.batchPauseMs) await sleep(policy.batchPauseMs);
    }
  }

  return {
    errorEvents: errorEventRun.removed,
    errorGroups: errorGroupRun.removed,
    opsEvents: opsEventRun.removed,
    sizeGuardRemoved,
    totalBytesBefore,
    truncated,
  };
}

export type PurgeTable = 'error_event' | 'error_group' | 'ops_event';

export interface PurgeBeforeOptions {
  /** Rows deleted per statement. */
  batchSize: number;
  /** Pause between batches, so the delete leaves room for request traffic. */
  batchPauseMs?: number;
  /** Longest the call may run; it stops there and says rows are left. */
  maxRunMs?: number;
}

/**
 * Deletes the rows of one table older than `before`, in bounded batches with pauses, so a large
 * delete never holds a lock for long or crowds out request traffic. Error groups are judged by
 * when they were last seen and an unresolved group is never removed. Stops at the time limit;
 * `done` is false then, and calling again continues, since each statement only removes rows
 * already past the date.
 */
export async function purgeObservabilityBefore(
  db: Executor,
  table: PurgeTable,
  before: Date,
  options: PurgeBeforeOptions,
): Promise<{ removed: number; done: boolean }> {
  const { batchSize } = options;
  const deadline = options.maxRunMs ? Date.now() + options.maxRunMs : Number.POSITIVE_INFINITY;
  const e = errorEventTable;
  const g = errorGroupTable;
  const o = opsEventTable;
  const run = await inBatches(options, deadline, async () => {
    switch (table) {
      case 'error_event': {
        const due = db
          .select({ id: e.id })
          .from(e)
          .where(lt(e.occurredAt, before))
          .limit(batchSize);
        return (await db.delete(e).where(inArray(e.id, due)).returning({ id: e.id })).length;
      }
      case 'error_group': {
        const due = db
          .select({ id: g.id })
          .from(g)
          .where(and(lt(g.lastSeen, before), ne(g.status, 'unresolved')))
          .limit(batchSize);
        return (await db.delete(g).where(inArray(g.id, due)).returning({ id: g.id })).length;
      }
      case 'ops_event': {
        const due = db
          .select({ id: o.id })
          .from(o)
          .where(lt(o.occurredAt, before))
          .limit(batchSize);
        return (await db.delete(o).where(inArray(o.id, due)).returning({ id: o.id })).length;
      }
    }
  });
  return { removed: run.removed, done: !run.truncated };
}
