import { randomUUID } from 'node:crypto';
import { auditLogTable, type Executor } from '@boldcreate-integrations/db';
import type { AuditAction } from '@boldcreate-integrations/contracts';
import { redactSecrets } from '@boldcreate-integrations/observability';
import { isUniqueViolation } from '../errors.js';

/** The part of a transaction or database handle that can insert rows, inside a savepoint. */
export type AuditWriter = Pick<Executor, 'insert' | 'transaction'>;

export type AuditActorKind = 'user_session' | 'api_key' | 'workload' | 'platform_admin' | 'system';

export interface AuditEntry {
  actor: { kind: AuditActorKind; id: string };
  action: AuditAction;
  target?: { kind: string; id: string } | undefined;
  orgId?: string | undefined;
  /** The project the event belongs to, when it has one. */
  projectId?: string | undefined;
  /** The project user the event is about, when there is one. */
  subjectUserId?: string | undefined;
  result?: 'success' | 'denied' | 'failure' | undefined;
  reason?: string | undefined;
  requestId?: string | undefined;
  ip?: string | undefined;
  /** Bounded context snapshot; secrets are redacted and the whole object stays under 2 KB. */
  context?: Record<string, unknown> | undefined;
  /** A writer that retries sends the same event id and time, so the row lands once. */
  eventId?: string | undefined;
  occurredAt?: Date | undefined;
}

export const AUDIT_CONTEXT_MAX_BYTES = 2048;

function serializeContext(entry: AuditEntry): string | null {
  const source: Record<string, unknown> = { ...entry.context };
  if (entry.reason !== undefined) source['reason'] = entry.reason;
  if (Object.keys(source).length === 0) return null;
  const json = JSON.stringify(redactSecrets(source));
  if (Buffer.byteLength(json, 'utf8') <= AUDIT_CONTEXT_MAX_BYTES) return json;
  return JSON.stringify({ truncated: true, reason: entry.reason ?? null });
}

/**
 * Writes one audit row. Callers pass their transaction so the row commits with the change; a
 * repeated event id with the same time inserts nothing. The repeat is detected by the unique
 * constraint in a savepoint rather than `ON CONFLICT`, which would need read access to the table
 * and, under row-level security, a row the writer is allowed to read back.
 */
export async function writeAudit(tx: AuditWriter, entry: AuditEntry): Promise<void> {
  const row = {
    id: randomUUID(),
    eventId: entry.eventId ?? randomUUID(),
    actorId: entry.actor.id,
    actorKind: entry.actor.kind,
    action: entry.action,
    targetKind: entry.target?.kind ?? null,
    targetId: entry.target?.id ?? null,
    orgId: entry.orgId ?? null,
    projectId: entry.projectId ?? null,
    subjectUserId: entry.subjectUserId ?? null,
    result: entry.result ?? 'success',
    context: serializeContext(entry),
    requestId: entry.requestId ?? null,
    ip: entry.ip ?? null,
    ...(entry.occurredAt ? { createdAt: entry.occurredAt } : {}),
  };
  try {
    await tx.transaction(async (inner) => {
      await inner.insert(auditLogTable).values(row);
    });
  } catch (error) {
    if (!isUniqueViolation(error)) throw error;
  }
}
