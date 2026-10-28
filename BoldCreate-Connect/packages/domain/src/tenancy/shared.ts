import type { Executor } from '@boldcreate-integrations/db';
import { insertOutbox } from '@boldcreate-integrations/db';

export async function enqueueEmail(
  db: Executor,
  eventType: string,
  payload: Record<string, unknown>,
): Promise<void> {
  await insertOutbox(db, { type: eventType, payload });
}
