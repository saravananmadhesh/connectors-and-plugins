/**
 * Errors and key events as the admin app reads them. The tables hold platform data and no tenant
 * rows, so no maintenance purpose is needed; only the admin role may read or change them. Lists
 * are newest first and paged by a keyset cursor over the exact stored time.
 */
import { and, count, desc, eq, gte, ilike, like, lt, min, or, sql, type SQL } from 'drizzle-orm';
import {
  errorEventTable,
  errorGroupTable,
  opsEventTable,
  purgeObservabilityBefore,
  type Executor,
  type PurgeBeforeOptions,
} from '@boldcreate-integrations/db';
import type {
  AdminErrorGroup,
  AdminErrorGroupDetailResponse,
  AdminErrorGroupsQuery,
  AdminErrorGroupsResponse,
  AdminObservabilityStorageResponse,
  AdminOpsEvent,
  AdminOpsEventsQuery,
  AdminOpsEventsResponse,
  AdminErrorGroupStatusBody,
  AdminObservabilityOverviewQuery,
  AdminObservabilityOverviewResponse,
  AdminObservabilityPurgeBody,
  AdminObservabilityPurgeResponse,
} from '@boldcreate-integrations/contracts';
import { writeAudit } from '../audit/write-audit.js';
import { conflict, notFound, validationFailed } from '../errors.js';
import type { SourceActor } from '../ingestion/sources.js';

const OCCURRENCES_SHOWN = 20;

interface Cursor {
  /** The stored time as text, so the microseconds Postgres keeps survive the round trip. */
  at: string;
  id: string;
}

const encodeCursor = (cursor: Cursor): string =>
  Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64url');

function decodeCursor(raw: string): Cursor | null {
  try {
    const value: unknown = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
    const { at, id } = value as Partial<Cursor>;
    return typeof at === 'string' && typeof id === 'string' && at.length <= 64 && id.length <= 64
      ? { at, id }
      : null;
  } catch {
    return null;
  }
}

/** Rows strictly before the cursor in (time, id) descending order. */
const beforeCursor = (
  time: SQL | ReturnType<typeof sql>,
  idColumn: SQL | ReturnType<typeof sql>,
  raw: string | undefined,
): SQL | undefined => {
  const cursor = raw ? decodeCursor(raw) : null;
  if (!cursor) return undefined;
  return or(
    sql`${time} < ${cursor.at}::timestamptz`,
    and(sql`${time} = ${cursor.at}::timestamptz`, sql`${idColumn} < ${cursor.id}::uuid`),
  );
};

const exactTime = (column: SQL | ReturnType<typeof sql>) => sql<string>`${column}::text`;

const iso = (value: Date | null): string | null => (value ? value.toISOString() : null);

function toGroup(row: typeof errorGroupTable.$inferSelect): AdminErrorGroup {
  return {
    id: row.id,
    service: row.service,
    area: row.area,
    title: row.title,
    status: row.status,
    count: row.count,
    firstSeen: row.firstSeen.toISOString(),
    lastSeen: row.lastSeen.toISOString(),
    appVersion: row.appVersion,
    resolvedAt: iso(row.resolvedAt),
    resolvedBy: row.resolvedBy,
  };
}

export async function listErrorGroups(
  db: Executor,
  query: AdminErrorGroupsQuery,
): Promise<AdminErrorGroupsResponse> {
  const g = errorGroupTable;
  const conditions: (SQL | undefined)[] = [
    query.status ? eq(g.status, query.status) : undefined,
    query.service ? eq(g.service, query.service) : undefined,
    query.area ? eq(g.area, query.area) : undefined,
    query.since ? gte(g.lastSeen, new Date(query.since)) : undefined,
    query.q ? ilike(g.title, `%${escapeLike(query.q)}%`) : undefined,
    beforeCursor(sql`${g.lastSeen}`, sql`${g.id}`, query.cursor),
  ];
  const rows = await db
    .select({ row: g, exactAt: exactTime(sql`${g.lastSeen}`) })
    .from(g)
    .where(and(...conditions))
    .orderBy(desc(g.lastSeen), desc(g.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  return {
    items: page.map(({ row }) => toGroup(row)),
    nextCursor:
      rows.length > query.limit && last
        ? encodeCursor({ at: last.exactAt, id: last.row.id })
        : null,
  };
}

export async function getErrorGroup(
  db: Executor,
  groupId: string,
): Promise<AdminErrorGroupDetailResponse> {
  const [group] = await db
    .select()
    .from(errorGroupTable)
    .where(eq(errorGroupTable.id, groupId))
    .limit(1);
  if (!group) throw notFound();
  const events = await db
    .select()
    .from(errorEventTable)
    .where(eq(errorEventTable.groupId, groupId))
    .orderBy(desc(errorEventTable.occurredAt), desc(errorEventTable.id))
    .limit(OCCURRENCES_SHOWN);
  return {
    group: toGroup(group),
    occurrences: events.map((event) => ({
      id: event.id,
      occurredAt: event.occurredAt.toISOString(),
      environment: event.environment,
      appVersion: event.appVersion,
      instanceId: event.instanceId,
      requestId: event.requestId,
      traceId: event.traceId,
      orgId: event.orgId,
      stack: event.stack,
      context: event.context,
    })),
  };
}

/**
 * Resolves, ignores or reopens a group. These are reversible status changes recorded with the
 * actor in the audit log; the occurrence history stays. Setting the status a group already has
 * changes nothing and writes no audit row.
 *
 * `store` holds the group and `audit` the audit log. They are one database unless errors live
 * in a database of their own, and then no transaction spans both. The audit row is written first,
 * while the group is locked, so a change is never left without a record: if the update then
 * fails, the log shows an attempt that did not take effect, which is the safer mistake.
 */
export async function setErrorGroupStatus(
  store: Executor,
  audit: Executor,
  groupId: string,
  body: AdminErrorGroupStatusBody,
  actor: SourceActor,
): Promise<AdminErrorGroupDetailResponse> {
  await store.transaction(async (tx) => {
    const [group] = await tx
      .select({ status: errorGroupTable.status })
      .from(errorGroupTable)
      .where(eq(errorGroupTable.id, groupId))
      .for('update')
      .limit(1);
    if (!group) throw notFound();
    if (group.status === body.status) return;
    const resolved = body.status === 'resolved';
    await writeAudit(audit === store ? tx : audit, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'admin.error_status_changed',
      target: { kind: 'error_group', id: groupId },
      requestId: actor.requestId,
      ip: actor.ip,
      context: { from: group.status, to: body.status },
    });
    await tx
      .update(errorGroupTable)
      .set({
        status: body.status,
        resolvedAt: resolved ? new Date() : null,
        resolvedBy: resolved ? actor.subject : null,
      })
      .where(eq(errorGroupTable.id, groupId));
  });
  return getErrorGroup(store, groupId);
}

/**
 * Removes a group and its occurrences, for an operator who has dealt with it. A group that is
 * still unresolved is kept, so an open problem cannot be hidden by accident. The audit row is
 * written first, as for a status change.
 */
export async function deleteErrorGroup(
  store: Executor,
  audit: Executor,
  groupId: string,
  actor: SourceActor,
): Promise<void> {
  await store.transaction(async (tx) => {
    const [group] = await tx
      .select({ status: errorGroupTable.status })
      .from(errorGroupTable)
      .where(eq(errorGroupTable.id, groupId))
      .for('update')
      .limit(1);
    if (!group) throw notFound();
    if (group.status === 'unresolved') throw conflict();
    await writeAudit(audit === store ? tx : audit, {
      actor: { kind: 'platform_admin', id: actor.subject },
      action: 'admin.error_group_deleted',
      target: { kind: 'error_group', id: groupId },
      requestId: actor.requestId,
      ip: actor.ip,
      context: { status: group.status },
    });
    await tx.delete(errorGroupTable).where(eq(errorGroupTable.id, groupId));
  });
}

const escapeLike = (value: string): string => value.replace(/[\\%_]/g, (char) => `\\${char}`);

export async function listOpsEvents(
  db: Executor,
  query: AdminOpsEventsQuery,
): Promise<AdminOpsEventsResponse> {
  const o = opsEventTable;
  const conditions: (SQL | undefined)[] = [
    query.service ? eq(o.service, query.service) : undefined,
    query.kind
      ? query.kind.endsWith('.')
        ? like(o.kind, `${escapeLike(query.kind)}%`)
        : eq(o.kind, query.kind)
      : undefined,
    query.severity ? eq(o.severity, query.severity) : undefined,
    query.since ? gte(o.occurredAt, new Date(query.since)) : undefined,
    query.until ? lt(o.occurredAt, new Date(query.until)) : undefined,
    beforeCursor(sql`${o.occurredAt}`, sql`${o.id}`, query.cursor),
  ];
  const rows = await db
    .select({ row: o, exactAt: exactTime(sql`${o.occurredAt}`) })
    .from(o)
    .where(and(...conditions))
    .orderBy(desc(o.occurredAt), desc(o.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  const items: AdminOpsEvent[] = page.map(({ row }) => ({
    id: row.id,
    occurredAt: row.occurredAt.toISOString(),
    service: row.service,
    kind: row.kind,
    severity: row.severity,
    environment: row.environment,
    appVersion: row.appVersion,
    instanceId: row.instanceId,
    orgId: row.orgId,
    detail: row.detail,
  }));
  return {
    items,
    nextCursor:
      rows.length > query.limit && last
        ? encodeCursor({ at: last.exactAt, id: last.row.id })
        : null,
  };
}

/** Below this many rows a table is counted exactly; above it the planner's estimate is used. */
const EXACT_COUNT_LIMIT = 50_000;

/**
 * Rows, size and oldest entry of each table, so the retention settings can be judged. A count of
 * a large table reads all of it, so past a limit the row count is the planner's estimate, kept
 * current by autovacuum; the oldest entry comes from an index.
 */
export async function getObservabilityStorage(
  db: Executor,
  maxTotalBytes: number,
): Promise<AdminObservabilityStorageResponse> {
  const sizes = await db.execute<{ name: string; bytes: string; estimate: string }>(
    sql`SELECT t.name,
               pg_total_relation_size(t.name)::text AS bytes,
               COALESCE((SELECT c.reltuples::bigint FROM pg_class c WHERE c.oid = to_regclass(t.name)), -1)::text AS estimate
        FROM (VALUES ('error_group'), ('error_event'), ('ops_event')) AS t(name)`,
  );
  const bytesOf = new Map(sizes.rows.map((row) => [row.name, Number(row.bytes)]));
  const estimateOf = new Map(sizes.rows.map((row) => [row.name, Number(row.estimate)]));
  const rowsOf = async (name: string, exact: () => Promise<number>): Promise<number> => {
    const estimate = estimateOf.get(name) ?? -1;
    return estimate >= EXACT_COUNT_LIMIT ? estimate : exact();
  };
  const exact = async (
    table: typeof errorGroupTable | typeof errorEventTable | typeof opsEventTable,
  ) => (await db.select({ rows: count() }).from(table))[0]?.rows ?? 0;
  const [groupRows, eventRows, opsRows] = await Promise.all([
    rowsOf('error_group', () => exact(errorGroupTable)),
    rowsOf('error_event', () => exact(errorEventTable)),
    rowsOf('ops_event', () => exact(opsEventTable)),
  ]);
  const [[groups], [events], [ops]] = await Promise.all([
    db.select({ oldest: min(errorGroupTable.lastSeen) }).from(errorGroupTable),
    db.select({ oldest: min(errorEventTable.occurredAt) }).from(errorEventTable),
    db.select({ oldest: min(opsEventTable.occurredAt) }).from(opsEventTable),
  ]);
  const table = (name: string, rows: number, oldest: Date | string | null | undefined) => ({
    table: name,
    rows,
    bytes: bytesOf.get(name) ?? 0,
    oldest: oldest ? new Date(oldest).toISOString() : null,
  });
  const tables = [
    table('error_group', groupRows, groups?.oldest),
    table('error_event', eventRows, events?.oldest),
    table('ops_event', opsRows, ops?.oldest),
  ];
  return {
    tables,
    totalBytes: tables.reduce((sum, row) => sum + row.bytes, 0),
    maxTotalBytes,
  };
}

const WINDOW_MS = { '1h': 3_600_000, '24h': 86_400_000, '7d': 604_800_000 } as const;
const TOP_GROUPS = 5;

/**
 * What needs attention in a window. Every read is bounded by the window or by the small set of
 * unresolved groups, and each uses an index, so the cost follows the window and not the table.
 */
export async function getObservabilityOverview(
  db: Executor,
  query: AdminObservabilityOverviewQuery,
  now: Date = new Date(),
): Promise<AdminObservabilityOverviewResponse> {
  const since = new Date(now.getTime() - WINDOW_MS[query.window]);
  const g = errorGroupTable;
  const o = opsEventTable;
  const [[unresolved], [active], top, groupsByService, eventsByService, eventsBySeverity] =
    await Promise.all([
      db.select({ rows: count() }).from(g).where(eq(g.status, 'unresolved')),
      db
        .select({
          active: count(),
          fresh: sql<number>`count(*) FILTER (WHERE ${g.firstSeen} >= ${since})`.mapWith(Number),
        })
        .from(g)
        .where(gte(g.lastSeen, since)),
      db
        .select()
        .from(g)
        .where(and(gte(g.lastSeen, since), eq(g.status, 'unresolved')))
        .orderBy(desc(g.count), desc(g.lastSeen))
        .limit(TOP_GROUPS),
      db
        .select({ service: g.service, rows: count() })
        .from(g)
        .where(gte(g.lastSeen, since))
        .groupBy(g.service),
      db
        .select({ service: o.service, rows: count() })
        .from(o)
        .where(and(gte(o.occurredAt, since), sql`${o.severity} IN ('warning', 'error')`))
        .groupBy(o.service),
      db
        .select({ severity: o.severity, rows: count() })
        .from(o)
        .where(gte(o.occurredAt, since))
        .groupBy(o.severity),
    ]);
  const services = new Map<string, { activeGroups: number; problemEvents: number }>();
  for (const row of groupsByService) {
    services.set(row.service, { activeGroups: row.rows, problemEvents: 0 });
  }
  for (const row of eventsByService) {
    const entry = services.get(row.service) ?? { activeGroups: 0, problemEvents: 0 };
    entry.problemEvents = row.rows;
    services.set(row.service, entry);
  }
  const events = { info: 0, warning: 0, error: 0 };
  for (const row of eventsBySeverity) events[row.severity] = row.rows;
  return {
    window: query.window,
    since: since.toISOString(),
    unresolvedGroups: unresolved?.rows ?? 0,
    activeGroups: active?.active ?? 0,
    newGroups: active?.fresh ?? 0,
    topGroups: top.map(toGroup),
    services: [...services]
      .map(([service, value]) => ({ service, ...value }))
      .sort((a, b) => b.activeGroups + b.problemEvents - (a.activeGroups + a.problemEvents)),
    events,
  };
}

/** Limits on one dated delete, so it cannot crowd out the services that share the database. */
export const DEFAULT_PURGE_LIMITS: PurgeBeforeOptions = {
  batchSize: 500,
  batchPauseMs: 25,
  maxRunMs: 8_000,
};

/**
 * Removes the rows of one table older than a date. The audit row is written first, so a delete is
 * never left without a record; if the delete then fails, the log shows an attempt that removed
 * nothing, which is the safer mistake. A date in the future is refused, since it would remove
 * everything. The delete is batched and paced; when it stops at its time limit it answers
 * `done: false` and the caller repeats it.
 */
export async function purgeObservabilityData(
  store: Executor,
  audit: Executor,
  body: AdminObservabilityPurgeBody,
  actor: SourceActor,
  limits: PurgeBeforeOptions = DEFAULT_PURGE_LIMITS,
): Promise<AdminObservabilityPurgeResponse> {
  const before = new Date(body.before);
  if (before.getTime() > Date.now()) throw validationFailed();
  await writeAudit(audit, {
    actor: { kind: 'platform_admin', id: actor.subject },
    action: 'admin.observability_purged',
    target: { kind: 'observability_table', id: body.table },
    requestId: actor.requestId,
    ip: actor.ip,
    context: { before: before.toISOString() },
  });
  return purgeObservabilityBefore(store, body.table, before, limits);
}

/**
 * What the admin app needs from wherever errors and events are kept. The Postgres tables are one
 * implementation; a service that moves them to another backend provides this and nothing else in
 * the admin app changes.
 */
export interface ObservabilityReader {
  listErrorGroups(query: AdminErrorGroupsQuery): Promise<AdminErrorGroupsResponse>;
  getErrorGroup(groupId: string): Promise<AdminErrorGroupDetailResponse>;
  setErrorGroupStatus(
    groupId: string,
    body: AdminErrorGroupStatusBody,
    actor: SourceActor,
  ): Promise<AdminErrorGroupDetailResponse>;
  deleteErrorGroup(groupId: string, actor: SourceActor): Promise<void>;
  listOpsEvents(query: AdminOpsEventsQuery): Promise<AdminOpsEventsResponse>;
  getStorage(): Promise<AdminObservabilityStorageResponse>;
  getOverview(query: AdminObservabilityOverviewQuery): Promise<AdminObservabilityOverviewResponse>;
  purge(
    body: AdminObservabilityPurgeBody,
    actor: SourceActor,
  ): Promise<AdminObservabilityPurgeResponse>;
}

export interface PostgresObservabilityReaderOptions {
  /** Where errors and events are stored. */
  store: Executor;
  /** Where the audit log is; the same handle unless the store is a separate database. */
  audit: Executor;
  /** The size limit shown next to the stored size; 0 for none. */
  maxTotalBytes: number;
  /** Batch size, pause and time limit of a dated delete; sensible defaults when omitted. */
  purge?: PurgeBeforeOptions;
}

export function createPostgresObservabilityReader(
  options: PostgresObservabilityReaderOptions,
): ObservabilityReader {
  const { store, audit, maxTotalBytes } = options;
  return {
    listErrorGroups: (query) => listErrorGroups(store, query),
    getErrorGroup: (groupId) => getErrorGroup(store, groupId),
    setErrorGroupStatus: (groupId, body, actor) =>
      setErrorGroupStatus(store, audit, groupId, body, actor),
    deleteErrorGroup: (groupId, actor) => deleteErrorGroup(store, audit, groupId, actor),
    listOpsEvents: (query) => listOpsEvents(store, query),
    getStorage: () => getObservabilityStorage(store, maxTotalBytes),
    getOverview: (query) => getObservabilityOverview(store, query),
    purge: (body, actor) =>
      purgeObservabilityData(store, audit, body, actor, options.purge ?? DEFAULT_PURGE_LIMITS),
  };
}
