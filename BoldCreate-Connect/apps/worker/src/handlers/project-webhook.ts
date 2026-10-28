/**
 * Picks up new audit events for project webhooks, sends the deliveries that are due, purges old
 * rows, then schedules the next run, so one job is always waiting. Every step is guarded so that a
 * failure never ends the chain: the next run repeats whatever did not finish.
 */
import { and, eq } from 'drizzle-orm';
import { insertOutbox, outboxTable, type Db } from '@boldcreate-integrations/db';
import {
  enqueueWebhookEvents,
  purgeWebhookDeliveries,
  sendDueWebhooks,
  type SendOptions,
} from '@boldcreate-integrations/domain';
import type { ClaimedJob } from '@boldcreate-integrations/ports';

const JOB_TYPE = 'project_webhook.dispatch_due';

export interface ProjectWebhookDeps {
  db: Db;
  unseal: SendOptions['unseal'];
  post: SendOptions['post'];
  /** Seconds between runs (`WEBHOOK_DISPATCH_INTERVAL_SECONDS`). */
  intervalSeconds: number;
  /** Seconds an audit event waits before it is picked up (`WEBHOOK_EVENT_LAG_SECONDS`). */
  lagSeconds: number;
  /** Seconds before the second attempt (`WEBHOOK_RETRY_BASE_SECONDS`). */
  retryBaseSeconds: number;
  onError: (step: string) => void;
  now?: () => Date;
}

const BATCH = 100;
const SEND_LIMIT = 50;
const CONCURRENCY = 10;
/** The purge runs about once an hour however short the interval is. */
const PURGE_EVERY_MS = 3_600_000;
let lastPurge = 0;

export async function handleProjectWebhookDispatch(
  _job: ClaimedJob,
  deps: ProjectWebhookDeps,
): Promise<void> {
  const now = deps.now ?? (() => new Date());
  try {
    await enqueueWebhookEvents(deps.db, { lagSeconds: deps.lagSeconds, batchSize: BATCH });
  } catch {
    deps.onError('enqueue');
  }
  try {
    await sendDueWebhooks(deps.db, {
      limit: SEND_LIMIT,
      concurrency: CONCURRENCY,
      retryBaseSeconds: deps.retryBaseSeconds,
      unseal: deps.unseal,
      post: deps.post,
      now,
    });
  } catch {
    deps.onError('send');
  }
  if (now().getTime() - lastPurge >= PURGE_EVERY_MS) {
    try {
      await purgeWebhookDeliveries(deps.db);
      lastPurge = now().getTime();
    } catch {
      deps.onError('purge');
    }
  }
  await insertOutbox(deps.db, {
    type: JOB_TYPE,
    payload: {},
    runAt: new Date(now().getTime() + deps.intervalSeconds * 1000),
  });
}

/** Enqueues the first job unless one is already waiting; called when the worker starts. */
export async function ensureProjectWebhookScheduled(db: Db): Promise<boolean> {
  const [waiting] = await db
    .select({ id: outboxTable.id })
    .from(outboxTable)
    .where(and(eq(outboxTable.eventType, JOB_TYPE), eq(outboxTable.status, 'pending')))
    .limit(1);
  if (waiting) return false;
  await insertOutbox(db, { type: JOB_TYPE, payload: {} });
  return true;
}
