/**
 * The audit log as the admin app reads it: every organization's events, newest first, filtered and
 * paged by a keyset cursor. Rows belong to tenants, so the read runs under the admin's
 * maintenance purpose.
 */
import { and, desc, eq, gte, like, lt, type SQL } from 'drizzle-orm';
import { auditLogTable, withMaintenance, type Db } from '@boldcreate-integrations/db';
import type {
  AdminAuditEntry,
  AdminAuditListResponse,
  AdminAuditQuery,
} from '@boldcreate-integrations/contracts';
import {
  afterAuditCursor,
  encodeAuditCursor,
  escapeLike,
  exactAuditTime,
  parseAuditContext,
} from './audit-paging.js';

function filters(query: AdminAuditQuery): SQL[] {
  const conditions: SQL[] = [];
  if (query.action) {
    conditions.push(
      query.action.endsWith('.')
        ? like(auditLogTable.action, `${escapeLike(query.action)}%`)
        : eq(auditLogTable.action, query.action),
    );
  }
  if (query.actorId) conditions.push(eq(auditLogTable.actorId, query.actorId));
  if (query.targetKind) conditions.push(eq(auditLogTable.targetKind, query.targetKind));
  if (query.targetId) conditions.push(eq(auditLogTable.targetId, query.targetId));
  if (query.result) conditions.push(eq(auditLogTable.result, query.result));
  if (query.since) conditions.push(gte(auditLogTable.createdAt, new Date(query.since)));
  if (query.until) conditions.push(lt(auditLogTable.createdAt, new Date(query.until)));
  return conditions;
}

export async function listAuditLog(
  db: Db,
  query: AdminAuditQuery,
): Promise<AdminAuditListResponse> {
  const conditions = filters(query);
  if (query.cursor) {
    const after = afterAuditCursor(query.cursor);
    if (after) conditions.push(after);
  }
  const rows = await withMaintenance(db, 'admin_read', (tx) =>
    tx
      .select({ row: auditLogTable, exactAt: exactAuditTime })
      .from(auditLogTable)
      .where(and(...conditions))
      .orderBy(desc(auditLogTable.createdAt), desc(auditLogTable.id))
      .limit(query.limit + 1),
  );
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  const items: AdminAuditEntry[] = page.map(({ row }) => ({
    id: row.id,
    at: row.createdAt.toISOString(),
    actorId: row.actorId,
    actorKind: row.actorKind,
    action: row.action,
    targetKind: row.targetKind,
    targetId: row.targetId,
    result: row.result as AdminAuditEntry['result'],
    context: parseAuditContext(row.context),
    orgId: row.orgId,
    requestId: row.requestId,
    ip: row.ip,
  }));
  return {
    items,
    nextCursor:
      rows.length > query.limit && last
        ? encodeAuditCursor({ at: last.exactAt, id: last.row.id })
        : null,
  };
}
