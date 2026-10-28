/**
 * Turns audit events into webhook deliveries and sends them. Both steps run in a worker job, never
 * in a request handler. A webhook remembers the last audit event it picked up, so each event is
 * turned into at most one delivery per project; the unique `(project, event)` pair makes a repeat
 * harmless. Sending is at least once: a host sees the same `webhook-id` again after a retry.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, eq, inArray, lte, or, sql, type SQL } from 'drizzle-orm';
import {
  auditLogTable,
  installationTable,
  projectWebhookDeliveryTable,
  projectWebhookTable,
  userTable,
  withMaintenance,
  type Db,
} from '@boldcreate-integrations/db';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { exactAuditTime } from '../audit/audit-paging.js';
import { signWebhook } from './webhook-signature.js';
import {
  auditActionsOf,
  buildWebhookPayload,
  webhookBackoffSeconds,
  type AuditEventRow,
} from './webhook-events.js';

const SUSPENDED = 'plugin.suspended';
const DAY_MS = 86_400_000;

export interface EnqueueOptions {
  /** Events newer than this many seconds wait, so a row that commits late is not skipped. */
  lagSeconds: number;
  /** Events turned into deliveries per webhook per run. */
  batchSize: number;
}

/** Picks up new audit events for every enabled webhook. Returns how many deliveries were added. */
export async function enqueueWebhookEvents(db: Db, options: EnqueueOptions): Promise<number> {
  return withMaintenance(db, 'webhook', async (tx) => {
    const hooks = await tx
      .select({
        projectId: projectWebhookTable.projectId,
        events: projectWebhookTable.events,
        cursorAt: projectWebhookTable.cursorAt,
        cursorId: projectWebhookTable.cursorId,
      })
      .from(projectWebhookTable)
      .where(eq(projectWebhookTable.enabled, true));
    let added = 0;
    for (const hook of hooks) {
      const actions = auditActionsOf(hook.events);
      const own: SQL[] = [];
      const ownActions = actions.filter((action) => action !== SUSPENDED);
      if (ownActions.length > 0) {
        own.push(
          and(
            eq(auditLogTable.projectId, hook.projectId),
            inArray(auditLogTable.action, ownActions),
          )!,
        );
      }
      if (hook.events.includes('plugin.suspended')) {
        own.push(
          and(
            eq(auditLogTable.action, SUSPENDED),
            eq(auditLogTable.targetKind, 'plugin'),
            inArray(
              auditLogTable.targetId,
              sql`(SELECT ${installationTable.pluginId}::text FROM ${installationTable} WHERE ${installationTable.projectId} = ${hook.projectId})`,
            ),
          )!,
        );
      }
      if (own.length === 0) continue;
      const after = sql`${hook.cursorAt}::timestamptz`;
      const rows = await tx
        .select({
          id: auditLogTable.id,
          eventId: auditLogTable.eventId,
          action: auditLogTable.action,
          createdAt: auditLogTable.createdAt,
          exactAt: exactAuditTime,
          targetKind: auditLogTable.targetKind,
          targetId: auditLogTable.targetId,
          context: auditLogTable.context,
          subjectUserId: auditLogTable.subjectUserId,
        })
        .from(auditLogTable)
        .where(
          and(
            or(...own),
            or(
              sql`${auditLogTable.createdAt} > ${after}`,
              and(
                sql`${auditLogTable.createdAt} = ${after}`,
                sql`${auditLogTable.id} > ${hook.cursorId}`,
              ),
            ),
            sql`${auditLogTable.createdAt} <= clock_timestamp() - make_interval(secs => ${options.lagSeconds})`,
          ),
        )
        .orderBy(asc(auditLogTable.createdAt), asc(auditLogTable.id))
        .limit(options.batchSize);
      if (rows.length === 0) continue;
      const subjects = [...new Set(rows.flatMap((row) => row.subjectUserId ?? []))];
      const refs = new Map<string, string | null>();
      if (subjects.length > 0) {
        const users = await tx
          .select({ id: userTable.id, externalRef: userTable.externalRef })
          .from(userTable)
          .where(inArray(userTable.id, subjects));
        for (const user of users) refs.set(user.id, user.externalRef);
      }
      const values: (typeof projectWebhookDeliveryTable.$inferInsert)[] = [];
      for (const row of rows) {
        const event: AuditEventRow = {
          eventId: row.eventId,
          action: row.action,
          createdAt: row.createdAt,
          targetKind: row.targetKind,
          targetId: row.targetId,
          context: row.context,
        };
        const payload = buildWebhookPayload({
          row: event,
          projectId: hook.projectId,
          userId: row.subjectUserId ? (refs.get(row.subjectUserId) ?? null) : null,
        });
        if (payload === null || !hook.events.includes(payload.type)) continue;
        values.push({
          id: randomUUID(),
          projectId: hook.projectId,
          eventId: row.eventId,
          eventType: payload.type,
          payload: JSON.stringify(payload),
          status: 'pending',
          attempts: 0,
          nextAttemptAt: new Date(),
        });
      }
      if (values.length > 0) {
        const inserted = await tx
          .insert(projectWebhookDeliveryTable)
          .values(values)
          .onConflictDoNothing()
          .returning({ id: projectWebhookDeliveryTable.id });
        added += inserted.length;
      }
      const last = rows.at(-1)!;
      await tx
        .update(projectWebhookTable)
        .set({ cursorAt: last.exactAt, cursorId: last.id })
        .where(eq(projectWebhookTable.projectId, hook.projectId));
    }
    return added;
  });
}

export interface SendOptions {
  /** Deliveries picked per run. */
  limit: number;
  /** Seconds before the second attempt; later waits double. */
  retryBaseSeconds: number;
  /** Sends at once. */
  concurrency: number;
  /** Opens a sealed secret. Throws when it cannot be opened. */
  unseal: (input: { orgId: string; projectId: string; envelope: string }) => Promise<string>;
  /** Posts a body and returns the status code of the answer. Throws when there is none. */
  post: (
    url: string,
    request: { headers: Record<string, string>; body: string },
  ) => Promise<number>;
  now?: () => Date;
}

interface Due {
  id: string;
  projectId: string;
  organizationId: string;
  url: string;
  secretSealed: string;
  payload: string;
  attempts: number;
}

async function attempt(due: Due, options: SendOptions): Promise<number | null> {
  try {
    const secret = await options.unseal({
      orgId: due.organizationId,
      projectId: due.projectId,
      envelope: due.secretSealed,
    });
    const id = (JSON.parse(due.payload) as { id: string }).id;
    const timestamp = Math.floor((options.now?.() ?? new Date()).getTime() / 1000);
    const status = await options.post(due.url, {
      headers: {
        'content-type': 'application/json',
        'user-agent': 'boldcreate-webhooks/1',
        'webhook-id': id,
        'webhook-timestamp': String(timestamp),
        'webhook-signature': signWebhook({ secret, id, timestamp, body: due.payload }),
      },
      body: due.payload,
    });
    return status;
  } catch {
    return null;
  }
}

/** Sends the deliveries that are due and records each result. Returns how many were tried. */
export async function sendDueWebhooks(db: Db, options: SendOptions): Promise<number> {
  const now = options.now ?? (() => new Date());
  const due: Due[] = await withMaintenance(db, 'webhook', (tx) =>
    tx
      .select({
        id: projectWebhookDeliveryTable.id,
        projectId: projectWebhookDeliveryTable.projectId,
        organizationId: projectWebhookTable.organizationId,
        url: projectWebhookTable.url,
        secretSealed: projectWebhookTable.secretSealed,
        payload: projectWebhookDeliveryTable.payload,
        attempts: projectWebhookDeliveryTable.attempts,
      })
      .from(projectWebhookDeliveryTable)
      .innerJoin(
        projectWebhookTable,
        eq(projectWebhookTable.projectId, projectWebhookDeliveryTable.projectId),
      )
      .where(
        and(
          eq(projectWebhookDeliveryTable.status, 'pending'),
          eq(projectWebhookTable.enabled, true),
          lte(projectWebhookDeliveryTable.nextAttemptAt, sql`clock_timestamp()`),
        ),
      )
      .orderBy(asc(projectWebhookDeliveryTable.nextAttemptAt))
      .limit(options.limit),
  );
  for (let start = 0; start < due.length; start += options.concurrency) {
    const chunk = due.slice(start, start + options.concurrency);
    const results = await Promise.all(chunk.map((item) => attempt(item, options)));
    await withMaintenance(db, 'webhook', async (tx) => {
      for (const [index, item] of chunk.entries()) {
        const status = results[index] ?? null;
        const attempts = item.attempts + 1;
        const delivered = status !== null && status >= 200 && status < 300;
        const exhausted = !delivered && attempts >= PROJECT_LIMITS.webhookMaxAttempts;
        await tx
          .update(projectWebhookDeliveryTable)
          .set({
            status: delivered ? 'delivered' : exhausted ? 'failed' : 'pending',
            attempts,
            lastStatusCode: status,
            nextAttemptAt:
              delivered || exhausted
                ? null
                : new Date(
                    now().getTime() +
                      webhookBackoffSeconds(attempts, options.retryBaseSeconds) * 1000,
                  ),
          })
          .where(eq(projectWebhookDeliveryTable.id, item.id));
      }
    });
  }
  return due.length;
}

/** Deletes deliveries older than the retention. Returns how many rows went. */
export async function purgeWebhookDeliveries(db: Db, batchSize = 1000): Promise<number> {
  let total = 0;
  for (;;) {
    const removed = await withMaintenance(db, 'webhook', (tx) =>
      tx
        .delete(projectWebhookDeliveryTable)
        .where(
          inArray(
            projectWebhookDeliveryTable.id,
            sql`(SELECT id FROM ${projectWebhookDeliveryTable} WHERE created_at < now() - ${PROJECT_LIMITS.webhookRetentionDays * DAY_MS} * interval '1 millisecond' LIMIT ${batchSize})`,
          ),
        )
        .returning({ id: projectWebhookDeliveryTable.id }),
    );
    total += removed.length;
    if (removed.length < batchSize) return total;
  }
}
