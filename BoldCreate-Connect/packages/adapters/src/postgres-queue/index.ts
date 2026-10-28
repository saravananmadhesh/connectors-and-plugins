/**
 * Queue over the `outbox` table: transactional enqueue (see `insertOutbox` in the db package),
 * `FOR UPDATE SKIP LOCKED` claims with a lease, and a retry schedule with a failure cap.
 *
 * Deduplication is best effort: `dedupeKey` is stored in the payload as `_dedupe` and an existing
 * pending job with the same type and key is returned instead of inserting another. There is no
 * unique index, so two concurrent enqueues of one key can both insert.
 */
import { randomUUID } from 'node:crypto';
import { and, eq, gt, inArray, isNull, lt, lte, or, sql } from 'drizzle-orm';
import type { Db } from '@boldcreate-integrations/db';
import { outboxTable } from '@boldcreate-integrations/db';
import type { ClaimedJob, ClockPort, QueuePort } from '@boldcreate-integrations/ports';

export const DEFAULT_LEASE_MS = 60_000;
export const DEFAULT_BATCH_SIZE = 10;
export const MAX_ATTEMPTS = 6;
const BASE_BACKOFF_MS = 30_000;
const MAX_BACKOFF_MS = 2 * 60 * 60 * 1000;
const MAX_ERROR_LENGTH = 500;

/** Delay before the next attempt once `attempts` attempts have been made (1-based). */
export function retryDelayMs(attempts: number): number {
  return Math.min(BASE_BACKOFF_MS * 4 ** (Math.max(attempts, 1) - 1), MAX_BACKOFF_MS);
}

/** Row changes after a failed attempt. */
export function retryUpdate(
  attempts: number,
  now: Date,
  retryAt: Date | null = null,
): {
  attempts: number;
  lastAttemptAt: Date;
  nextAttemptAt: Date;
  status: 'pending' | 'failed';
  leaseOwner: null;
  leaseExpiresAt: null;
} {
  const nextAttempts = Math.min(attempts + 1, MAX_ATTEMPTS);
  return {
    attempts: nextAttempts,
    lastAttemptAt: now,
    nextAttemptAt: retryAt ?? new Date(now.getTime() + retryDelayMs(nextAttempts)),
    status: nextAttempts >= MAX_ATTEMPTS ? 'failed' : 'pending',
    leaseOwner: null,
    leaseExpiresAt: null,
  };
}

export interface PostgresQueueOptions {
  clock?: Pick<ClockPort, 'now'>;
}

export interface PostgresQueue extends QueuePort {
  /** Extends the lease of a job this queue claimed; false when the lease was lost. */
  renew(id: string, leaseMs?: number): Promise<boolean>;
}

function parsePayload(raw: string | null): unknown {
  if (raw === null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function createPostgresQueue(db: Db, options: PostgresQueueOptions = {}): PostgresQueue {
  const now = () => options.clock?.now() ?? new Date();
  // Job ids this instance claimed, and the owner token they were claimed with.
  const owners = new Map<string, string>();

  function ownedPending(id: string) {
    const owner = owners.get(id);
    return and(
      eq(outboxTable.id, id),
      eq(outboxTable.status, 'pending'),
      owner === undefined ? undefined : eq(outboxTable.leaseOwner, owner),
      owner === undefined ? undefined : gt(outboxTable.leaseExpiresAt, sql`clock_timestamp()`),
    );
  }

  return {
    async enqueue(job) {
      let payload = job.payload;
      if (job.dedupeKey !== undefined) {
        const [existing] = await db
          .select({ id: outboxTable.id })
          .from(outboxTable)
          .where(
            and(
              eq(outboxTable.eventType, job.type),
              eq(outboxTable.status, 'pending'),
              sql`${outboxTable.payload} IS NOT NULL AND (${outboxTable.payload})::jsonb ->> '_dedupe' = ${job.dedupeKey}`,
            ),
          )
          .limit(1);
        if (existing) return { id: existing.id };
        payload = {
          ...(typeof payload === 'object' && payload !== null ? payload : {}),
          _dedupe: job.dedupeKey,
        };
      }
      const id = randomUUID();
      await db.insert(outboxTable).values({
        id,
        eventType: job.type,
        payload: JSON.stringify(payload),
        status: 'pending',
        attempts: 0,
        nextAttemptAt: job.runAt ?? now(),
      });
      return { id };
    },

    async claim({ types, limit = DEFAULT_BATCH_SIZE, leaseMs = DEFAULT_LEASE_MS, owner }) {
      if (types.length === 0) return [];
      // Commit the row locks before the caller dispatches; cleanup takes tenant locks first.
      const rows = await db.transaction(async (tx) => {
        const candidates = await tx
          .select()
          .from(outboxTable)
          .where(
            and(
              inArray(outboxTable.eventType, types),
              eq(outboxTable.status, 'pending'),
              lt(outboxTable.attempts, MAX_ATTEMPTS),
              lte(outboxTable.nextAttemptAt, sql`clock_timestamp()`),
              or(
                isNull(outboxTable.leaseExpiresAt),
                lte(outboxTable.leaseExpiresAt, sql`clock_timestamp()`),
              ),
            ),
          )
          .orderBy(outboxTable.nextAttemptAt, outboxTable.id)
          .limit(limit)
          .for('update', { skipLocked: true });
        if (candidates.length === 0) return [];
        return tx
          .update(outboxTable)
          .set({
            leaseOwner: owner,
            leaseExpiresAt: sql`clock_timestamp() + ${leaseMs} * interval '1 millisecond'`,
          })
          .where(
            inArray(
              outboxTable.id,
              candidates.map((row) => row.id),
            ),
          )
          .returning();
      });
      return rows.map((row): ClaimedJob => {
        owners.set(row.id, owner);
        return {
          id: row.id,
          type: row.eventType,
          payload: parsePayload(row.payload),
          attempts: row.attempts,
        };
      });
    },

    async renew(id, leaseMs = DEFAULT_LEASE_MS) {
      const rows = await db
        .update(outboxTable)
        .set({
          leaseExpiresAt: sql`clock_timestamp() + ${leaseMs} * interval '1 millisecond'`,
        })
        .where(ownedPending(id))
        .returning({ id: outboxTable.id });
      return rows.length > 0;
    },

    async complete(id) {
      await db
        .update(outboxTable)
        .set({
          status: 'delivered',
          deliveredAt: now(),
          payload: null,
          leaseOwner: null,
          leaseExpiresAt: null,
        })
        .where(ownedPending(id));
      owners.delete(id);
    },

    async fail(id, { retryAt, error }) {
      const [row] = await db
        .select({ attempts: outboxTable.attempts })
        .from(outboxTable)
        .where(eq(outboxTable.id, id))
        .limit(1);
      if (!row) return;
      await db
        .update(outboxTable)
        .set({
          ...retryUpdate(row.attempts, now(), retryAt),
          lastError: error.slice(0, MAX_ERROR_LENGTH),
        })
        .where(ownedPending(id));
      owners.delete(id);
    },
  };
}
