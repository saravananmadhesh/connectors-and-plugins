/**
 * The webhook of a project: one address, the events it wants and a signing secret. The secret is
 * sealed under the organization key and shown once, when it is created or rotated. The dispatcher
 * (a worker job) fills the delivery rows from the audit trail; this module only manages the
 * webhook and lists what was delivered.
 */
import { randomBytes } from 'node:crypto';
import { and, desc, eq, lt, or, sql } from 'drizzle-orm';
import {
  projectTable,
  projectWebhookDeliveryTable,
  projectWebhookTable,
  type Executor,
} from '@boldcreate-integrations/db';
import { SsrfError, type SsrfGuard } from '@boldcreate-integrations/security';
import type { Sealer } from '@boldcreate-integrations/credentials';
import {
  formatId,
  type Plain,
  type ProjectWebhookResponse,
  type PutProjectWebhookBody,
  type UserSessionPrincipal,
  type WebhookDeliveryQuery,
  type WebhookDeliveryResponse,
  type WebhookEvent,
} from '@boldcreate-integrations/contracts';
import { requireAction } from '../permissions/authorize.js';
import { writeAudit } from '../audit/write-audit.js';
import { decodeAuditCursor, encodeAuditCursor } from '../audit/audit-paging.js';
import { notFound, validationFailed } from '../errors.js';

/** Where a new webhook starts reading the audit trail: the first event it may see is later. */
const NIL_UUID = '00000000-0000-0000-0000-000000000000';
const EXACT_TIME = (column: unknown) =>
  sql<string>`to_char(${column} at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`;
const EXACT_NOW = sql<string>`to_char(clock_timestamp() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"')`;

export interface WebhookDeps {
  sealer: Sealer;
  guard: SsrfGuard;
}

export type ProjectWebhookView = Plain<ProjectWebhookResponse>;
export type WebhookDeliveryView = Plain<WebhookDeliveryResponse>;

export const newWebhookSecret = (): string => `whsec_${randomBytes(32).toString('base64url')}`;

type WebhookRow = typeof projectWebhookTable.$inferSelect;

function view(row: WebhookRow): ProjectWebhookView {
  return {
    url: row.url,
    events: row.events as WebhookEvent[],
    enabled: row.enabled,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function audit(
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  action: 'project_webhook.updated' | 'project_webhook.deleted' | 'project_webhook.secret_rotated',
  extra: Record<string, unknown> = {},
) {
  return {
    actor: { kind: 'user_session' as const, id: principal.userId },
    action,
    target: { kind: 'project', id: projectId },
    orgId,
    projectId,
    context: { origin: 'website_session', ...extra },
  };
}

async function requireSafeUrl(guard: SsrfGuard, url: string): Promise<void> {
  try {
    await guard.checkUrl(url, { purpose: 'webhook' });
  } catch (error) {
    if (error instanceof SsrfError) {
      throw validationFailed([{ field: 'url', message: 'This address cannot be called.' }]);
    }
    throw error;
  }
}

/** Locks the project row so two writers of its webhook run one after the other. */
async function lockProject(tx: Executor, orgId: string, projectId: string): Promise<void> {
  const [project] = await tx
    .select({ status: projectTable.status })
    .from(projectTable)
    .where(and(eq(projectTable.id, projectId), eq(projectTable.organizationId, orgId)))
    .for('update');
  if (!project || project.status === 'revoked') throw notFound();
}

const sealSecret = (sealer: Sealer, orgId: string, projectId: string, secret: string) =>
  sealer.seal({
    purpose: 'webhook_secret',
    orgId,
    subject: { kind: 'project', id: projectId },
    plaintext: secret,
  });

async function currentWebhook(tx: Executor, projectId: string): Promise<WebhookRow | undefined> {
  const [row] = await tx
    .select()
    .from(projectWebhookTable)
    .where(eq(projectWebhookTable.projectId, projectId));
  return row;
}

/**
 * Sets the webhook. The first call creates it and returns its secret; later calls change the
 * address, the events or the switch and return no secret. Turning a webhook back on starts it at
 * the present, so events from the time it was off are not sent.
 */
export async function putProjectWebhook(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  body: PutProjectWebhookBody,
  deps: WebhookDeps,
): Promise<{ webhook: ProjectWebhookView; secret: string | null }> {
  requireAction(principal, 'project-webhook:write', { orgId });
  await requireSafeUrl(deps.guard, body.url);
  const events = [...new Set(body.events)];
  return tx.transaction(async (inner) => {
    await lockProject(inner, orgId, projectId);
    const existing = await currentWebhook(inner, projectId);
    const now = new Date();
    if (!existing) {
      const secret = newWebhookSecret();
      const [row] = await inner
        .insert(projectWebhookTable)
        .values({
          projectId,
          organizationId: orgId,
          url: body.url,
          secretSealed: await sealSecret(deps.sealer, orgId, projectId, secret),
          events,
          enabled: body.enabled,
          cursorAt: EXACT_NOW,
          cursorId: NIL_UUID,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      await writeAudit(
        inner,
        audit(principal, orgId, projectId, 'project_webhook.updated', { created: true }),
      );
      return { webhook: view(row!), secret };
    }
    const turnedOn = body.enabled && !existing.enabled;
    const [row] = await inner
      .update(projectWebhookTable)
      .set({
        url: body.url,
        events,
        enabled: body.enabled,
        updatedAt: now,
        ...(turnedOn ? { cursorAt: EXACT_NOW, cursorId: NIL_UUID } : {}),
      })
      .where(eq(projectWebhookTable.projectId, projectId))
      .returning();
    await writeAudit(
      inner,
      audit(principal, orgId, projectId, 'project_webhook.updated', { created: false }),
    );
    return { webhook: view(row!), secret: null };
  });
}

export async function getProjectWebhook(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
): Promise<ProjectWebhookView> {
  requireAction(principal, 'project-webhook:read', { orgId });
  const [row] = await tx
    .select({ webhook: projectWebhookTable })
    .from(projectWebhookTable)
    .innerJoin(projectTable, eq(projectTable.id, projectWebhookTable.projectId))
    .where(
      and(eq(projectWebhookTable.projectId, projectId), eq(projectTable.organizationId, orgId)),
    );
  if (!row) throw notFound();
  return view(row.webhook);
}

export async function deleteProjectWebhook(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
): Promise<void> {
  requireAction(principal, 'project-webhook:write', { orgId });
  await tx.transaction(async (inner) => {
    await lockProject(inner, orgId, projectId);
    const removed = await inner
      .delete(projectWebhookTable)
      .where(eq(projectWebhookTable.projectId, projectId))
      .returning({ projectId: projectWebhookTable.projectId });
    if (removed.length === 0) throw notFound();
    // What was still waiting has nowhere to go any more.
    await inner
      .update(projectWebhookDeliveryTable)
      .set({ status: 'failed', nextAttemptAt: null })
      .where(
        and(
          eq(projectWebhookDeliveryTable.projectId, projectId),
          eq(projectWebhookDeliveryTable.status, 'pending'),
        ),
      );
    await writeAudit(inner, audit(principal, orgId, projectId, 'project_webhook.deleted'));
  });
}

/** Replaces the secret. The old one stops signing at once; deliveries not yet sent use the new one. */
export async function rotateProjectWebhookSecret(
  tx: Executor,
  principal: UserSessionPrincipal,
  orgId: string,
  projectId: string,
  deps: WebhookDeps,
): Promise<{ webhook: ProjectWebhookView; secret: string }> {
  requireAction(principal, 'project-webhook:write', { orgId });
  return tx.transaction(async (inner) => {
    await lockProject(inner, orgId, projectId);
    const secret = newWebhookSecret();
    const [row] = await inner
      .update(projectWebhookTable)
      .set({
        secretSealed: await sealSecret(deps.sealer, orgId, projectId, secret),
        updatedAt: new Date(),
      })
      .where(eq(projectWebhookTable.projectId, projectId))
      .returning();
    if (!row) throw notFound();
    await writeAudit(inner, audit(principal, orgId, projectId, 'project_webhook.secret_rotated'));
    return { webhook: view(row), secret };
  });
}

/** Deliveries of a project, newest first, with the same cursor the audit readers use. */
export async function listWebhookDeliveries(
  tx: Executor,
  scope: { projectId: string },
  query: WebhookDeliveryQuery,
): Promise<{ items: WebhookDeliveryView[]; nextCursor: string | null }> {
  const table = projectWebhookDeliveryTable;
  const at = EXACT_TIME(table.createdAt);
  const conditions = [eq(table.projectId, scope.projectId)];
  if (query.status) conditions.push(eq(table.status, query.status));
  if (query.cursor) {
    const cursor = decodeAuditCursor(query.cursor);
    const when = sql`${cursor.at}::timestamptz`;
    conditions.push(
      or(lt(table.createdAt, when), and(eq(table.createdAt, when), lt(table.id, cursor.id)))!,
    );
  }
  const rows = await tx
    .select({
      id: table.id,
      eventId: table.eventId,
      type: table.eventType,
      status: table.status,
      attempts: table.attempts,
      nextAttemptAt: table.nextAttemptAt,
      lastStatusCode: table.lastStatusCode,
      createdAt: table.createdAt,
      exactAt: at,
    })
    .from(table)
    .where(and(...conditions))
    .orderBy(desc(table.createdAt), desc(table.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page.at(-1);
  return {
    items: page.map((row) => ({
      id: row.id,
      eventId: formatId('evt', row.eventId),
      type: row.type as WebhookEvent,
      status: row.status as WebhookDeliveryView['status'],
      attempts: row.attempts,
      nextAttemptAt: row.status === 'pending' ? (row.nextAttemptAt?.toISOString() ?? null) : null,
      lastStatusCode: row.lastStatusCode,
      createdAt: row.createdAt.toISOString(),
    })),
    nextCursor:
      rows.length > query.limit && last
        ? encodeAuditCursor({ at: rows[page.length - 1]!.exactAt, id: last.id })
        : null,
  };
}
