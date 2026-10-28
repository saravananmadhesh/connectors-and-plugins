import { randomUUID } from 'node:crypto';
import type { Executor } from './client.js';
import { outboxTable } from './schema/index.js';

/** A database or transaction handle: anything that can insert. */
export type Inserter = Pick<Executor, 'insert'>;

/** Enqueues a job inside the caller's transaction so it commits or rolls back with the change. */
export async function insertOutbox(
  tx: Inserter,
  job: { type: string; payload: unknown; runAt?: Date },
): Promise<{ id: string }> {
  const id = randomUUID();
  await tx.insert(outboxTable).values({
    id,
    eventType: job.type,
    payload: JSON.stringify(job.payload),
    status: 'pending',
    attempts: 0,
    nextAttemptAt: job.runAt ?? new Date(),
  });
  return { id };
}

/** Enqueues many jobs of one type with a single insert. */
export async function insertOutboxBatch(
  tx: Inserter,
  type: string,
  payloads: readonly unknown[],
): Promise<void> {
  if (payloads.length === 0) return;
  const nextAttemptAt = new Date();
  await tx.insert(outboxTable).values(
    payloads.map((payload) => ({
      id: randomUUID(),
      eventType: type,
      payload: JSON.stringify(payload),
      status: 'pending' as const,
      attempts: 0,
      nextAttemptAt,
    })),
  );
}
