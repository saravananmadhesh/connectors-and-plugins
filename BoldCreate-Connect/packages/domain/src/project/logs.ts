/**
 * What happened in one project, read from the audit trail: who called which tool, when, and what
 * came of it, and a count per day. Every read filters by the project as well as by the
 * organization the row level policy already applies, so another project's rows never appear.
 * Only a few keys of an event's context are returned, and never the address of the caller.
 */
import { and, count, countDistinct, desc, eq, gte, inArray, lte, sql, type SQL } from 'drizzle-orm';
import { auditLogTable, userTable, type Executor } from '@boldcreate-integrations/db';
import type {
  Plain,
  ProjectLogQuery,
  ProjectLogResponse,
  ProjectUsageQuery,
  ProjectUsageResponse,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import {
  afterAuditCursor,
  encodeAuditCursor,
  exactAuditTime,
  parseAuditContext,
} from '../audit/audit-paging.js';
import { validationFailed } from '../errors.js';

const DAY_MS = 86_400_000;
const DEFAULT_USAGE_DAYS = 30;
const TOP_USERS = 10;

export type ProjectLogView = Plain<ProjectLogResponse>;
export type ProjectUsageView = Plain<ProjectUsageResponse>;

function nonNegativeInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : undefined;
}

/** The keys of an event's context that a host may see. */
export function safeContext(
  text: string | null,
): Pick<ProjectLogView, 'tool' | 'outcome' | 'durationMs' | 'appliedCount'> {
  const context = parseAuditContext(text);
  if (!context) return {};
  const tool = context['tool'];
  const outcome = context['outcome'];
  const durationMs = nonNegativeInteger(context['durationMs']);
  const appliedCount = nonNegativeInteger(context['appliedCount']);
  return {
    ...(typeof tool === 'string' ? { tool } : {}),
    ...(typeof outcome === 'string' ? { outcome } : {}),
    ...(durationMs !== undefined ? { durationMs } : {}),
    ...(appliedCount !== undefined ? { appliedCount } : {}),
  };
}

async function userIdOf(tx: Executor, projectId: string, ref: string): Promise<string | null> {
  const [user] = await tx
    .select({ id: userTable.id })
    .from(userTable)
    .where(
      and(
        eq(userTable.projectId, projectId),
        eq(userTable.kind, 'external'),
        eq(userTable.externalRef, ref),
      ),
    )
    .limit(1);
  return user?.id ?? null;
}

async function refsOf(
  tx: Executor,
  projectId: string,
  ids: string[],
): Promise<Map<string, string | null>> {
  const refs = new Map<string, string | null>();
  if (ids.length === 0) return refs;
  const found = await tx
    .select({ id: userTable.id, externalRef: userTable.externalRef })
    .from(userTable)
    .where(and(inArray(userTable.id, ids), eq(userTable.projectId, projectId)));
  for (const user of found) refs.set(user.id, user.externalRef);
  return refs;
}

/** One page of the project's events, newest first. */
export async function listLogs(
  tx: Executor,
  scope: { projectId: string },
  query: ProjectLogQuery,
): Promise<{ items: ProjectLogView[]; nextCursor: string | null }> {
  const conditions: (SQL | undefined)[] = [eq(auditLogTable.projectId, scope.projectId)];
  if (query.cursor !== undefined) conditions.push(afterAuditCursor(query.cursor));
  if (query.userId !== undefined) {
    const id = await userIdOf(tx, scope.projectId, query.userId);
    if (id === null) return { items: [], nextCursor: null };
    conditions.push(eq(auditLogTable.subjectUserId, id));
  }
  if (query.action !== undefined) conditions.push(eq(auditLogTable.action, query.action));
  if (query.from !== undefined) conditions.push(gte(auditLogTable.createdAt, new Date(query.from)));
  if (query.to !== undefined) conditions.push(lte(auditLogTable.createdAt, new Date(query.to)));

  const rows = await tx
    .select({ row: auditLogTable, exactAt: exactAuditTime })
    .from(auditLogTable)
    .where(and(...conditions))
    .orderBy(desc(auditLogTable.createdAt), desc(auditLogTable.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];

  const refs = await refsOf(tx, scope.projectId, [
    ...new Set(page.map(({ row }) => row.subjectUserId).filter((id): id is string => !!id)),
  ]);

  return {
    items: page.map(({ row }) => ({
      id: row.id,
      action: row.action,
      result: row.result as ProjectLogView['result'],
      createdAt: row.createdAt.toISOString(),
      user: row.subjectUserId
        ? { id: row.subjectUserId, userId: refs.get(row.subjectUserId) ?? null }
        : null,
      target: row.targetKind && row.targetId ? { kind: row.targetKind, id: row.targetId } : null,
      ...safeContext(row.context),
    })),
    nextCursor:
      rows.length > query.limit && last
        ? encodeAuditCursor({ at: last.exactAt, id: last.row.id })
        : null,
  };
}

/** Per day: users who made a call, calls and failed calls; and the users with most calls. */
export async function projectUsage(
  tx: Executor,
  scope: { projectId: string },
  query: ProjectUsageQuery,
  now: Date = new Date(),
): Promise<ProjectUsageView> {
  const to = query.to === undefined ? now : new Date(query.to);
  const from =
    query.from === undefined
      ? new Date(to.getTime() - DEFAULT_USAGE_DAYS * DAY_MS)
      : new Date(query.from);
  if (from.getTime() > to.getTime()) {
    throw validationFailed([{ field: 'from', message: 'must not be after to' }]);
  }
  if (to.getTime() - from.getTime() > PROJECT_LIMITS.usageRangeDays * DAY_MS) {
    throw validationFailed([
      { field: 'from', message: `the range is at most ${PROJECT_LIMITS.usageRangeDays} days` },
    ]);
  }
  const where = and(
    eq(auditLogTable.projectId, scope.projectId),
    eq(auditLogTable.action, 'mcp_tool.called'),
    gte(auditLogTable.createdAt, from),
    lte(auditLogTable.createdAt, to),
  );
  const day = sql<string>`to_char(date_trunc('day', ${auditLogTable.createdAt} at time zone 'UTC'), 'YYYY-MM-DD')`;
  const days = await tx
    .select({
      date: day,
      activeUsers: countDistinct(auditLogTable.subjectUserId),
      toolCalls: count(),
      errors: sql<number>`count(*) filter (where ${auditLogTable.result} <> 'success')`.mapWith(
        Number,
      ),
    })
    .from(auditLogTable)
    .where(where)
    .groupBy(day)
    .orderBy(day);
  const top = await tx
    .select({ userId: auditLogTable.subjectUserId, toolCalls: count() })
    .from(auditLogTable)
    .where(and(where, sql`${auditLogTable.subjectUserId} is not null`))
    .groupBy(auditLogTable.subjectUserId)
    .orderBy(desc(count()), auditLogTable.subjectUserId)
    .limit(TOP_USERS);
  const refs = await refsOf(
    tx,
    scope.projectId,
    top.map((row) => row.userId as string),
  );
  return {
    from: from.toISOString(),
    to: to.toISOString(),
    days,
    topUsers: top.map((row) => ({
      id: row.userId as string,
      userId: refs.get(row.userId as string) ?? null,
      toolCalls: row.toolCalls,
    })),
  };
}
