/**
 * A recurring job is a single waiting outbox row that enqueues its own successor when it runs,
 * so the chain never holds more than one pending job.
 */
import { and, eq } from 'drizzle-orm';
import { insertOutbox, outboxTable, type Db } from '@boldcreate-integrations/db';

/** Enqueues the first job of a chain unless one is already waiting; true when it enqueued. */
export async function ensureRecurringJobScheduled(db: Db, type: string): Promise<boolean> {
  const [waiting] = await db
    .select({ id: outboxTable.id })
    .from(outboxTable)
    .where(and(eq(outboxTable.eventType, type), eq(outboxTable.status, 'pending')))
    .limit(1);
  if (waiting) return false;
  await insertOutbox(db, { type, payload: {} });
  return true;
}

/** Enqueues the next job of a chain, to run `intervalSeconds` after `now`. */
export async function scheduleNextRecurringRun(
  db: Db,
  type: string,
  now: Date,
  intervalSeconds: number,
): Promise<void> {
  await insertOutbox(db, {
    type,
    payload: {},
    runAt: new Date(now.getTime() + intervalSeconds * 1000),
  });
}
