/**
 * The admin dashboard's numbers: how many plugins and versions are in each state, what is waiting
 * for review, how syncs have gone over a window of days, and what members have installed. Every
 * figure is one grouped query, run together, so the page loads without walking the catalog.
 */
import { desc, eq, gte, inArray, sql, type AnyColumn } from 'drizzle-orm';
import {
  categoryTable,
  componentTable,
  installationTable,
  pluginCategoryTable,
  pluginIngestionTable,
  pluginSourceTable,
  pluginTable,
  pluginVersionTable,
  withMaintenance,
  type Db,
} from '@boldcreate-integrations/db';
import type {
  AdminStatsResponse,
  ComponentKind,
  PluginLifecycleStatus,
  VersionCounts,
} from '@boldcreate-integrations/contracts';

const DAY_MS = 86_400_000;
const count = sql<number>`count(*)::int`;

const dayKey = (date: Date): string => date.toISOString().slice(0, 10);
const dayOf = (column: AnyColumn) =>
  sql<string>`to_char(date_trunc('day', ${column} at time zone 'UTC'), 'YYYY-MM-DD')`;

const COMPONENT_KINDS: readonly ComponentKind[] = ['skill', 'agent', 'mcp', 'hook', 'rule'];

/** Components, and the plugin each belongs to, in every plugin's highest published version. */
function publishedComponents(db: Db) {
  const latest = db
    .selectDistinctOn([pluginVersionTable.pluginId], {
      id: pluginVersionTable.id,
      pluginId: pluginVersionTable.pluginId,
    })
    .from(pluginVersionTable)
    .where(eq(pluginVersionTable.status, 'published'))
    .orderBy(
      pluginVersionTable.pluginId,
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
    )
    .as('latest');
  return db
    .select({
      kind: componentTable.kind,
      components: count,
      plugins: sql<number>`count(distinct ${latest.pluginId})::int`,
    })
    .from(componentTable)
    .innerJoin(latest, eq(latest.id, componentTable.pluginVersionId))
    .groupBy(componentTable.kind);
}

function componentTotals(
  rows: { kind: ComponentKind; components: number; plugins: number }[],
): AdminStatsResponse['components'] {
  const zero = () =>
    Object.fromEntries(COMPONENT_KINDS.map((kind) => [kind, 0])) as Record<ComponentKind, number>;
  const byKind = zero();
  const pluginsByKind = zero();
  for (const row of rows) {
    byKind[row.kind] = row.components;
    pluginsByKind[row.kind] = row.plugins;
  }
  return {
    total: Object.values(byKind).reduce((sum, n) => sum + n, 0),
    byKind,
    pluginsByKind,
  };
}

export async function getAdminStats(
  db: Db,
  days: number,
  now: Date = new Date(),
): Promise<AdminStatsResponse> {
  const startOfToday = new Date(`${dayKey(now)}T00:00:00.000Z`);
  const since = new Date(startOfToday.getTime() - (days - 1) * DAY_MS);

  const [
    pluginRows,
    versionRows,
    reviewRows,
    sourceRows,
    categoryTotals,
    categoryRows,
    installTotals,
    topRows,
    ingestedRows,
    syncRows,
    componentRows,
  ] = await Promise.all([
    db.select({ key: pluginTable.status, n: count }).from(pluginTable).groupBy(pluginTable.status),
    db
      .select({ key: pluginVersionTable.status, n: count })
      .from(pluginVersionTable)
      .groupBy(pluginVersionTable.status),
    db
      .select({ n: sql<number>`count(distinct ${pluginVersionTable.pluginId})::int` })
      .from(pluginVersionTable)
      .where(inArray(pluginVersionTable.status, ['pending', 'approved'])),
    db
      .select({ key: pluginSourceTable.lastStatus, n: count })
      .from(pluginSourceTable)
      .groupBy(pluginSourceTable.lastStatus),
    db.select({ n: count }).from(categoryTable),
    db
      .select({
        name: categoryTable.name,
        plugins: sql<number>`count(${pluginCategoryTable.pluginId})::int`,
      })
      .from(categoryTable)
      .leftJoin(pluginCategoryTable, eq(pluginCategoryTable.categoryId, categoryTable.id))
      .groupBy(categoryTable.id, categoryTable.name)
      .orderBy(desc(sql`count(${pluginCategoryTable.pluginId})`), categoryTable.name)
      .limit(8),
    withMaintenance(db, 'admin_read', (tx) =>
      tx
        .select({
          installations: count,
          organizations: sql<number>`count(distinct ${installationTable.organizationId})::int`,
          users: sql<number>`count(distinct ${installationTable.createdBy})::int`,
        })
        .from(installationTable),
    ),
    withMaintenance(db, 'admin_read', (tx) =>
      tx
        .select({ id: installationTable.pluginId, installations: count })
        .from(installationTable)
        .groupBy(installationTable.pluginId)
        .orderBy(desc(count))
        .limit(5),
    ),
    db
      .select({ day: dayOf(pluginVersionTable.publishedAt), n: count })
      .from(pluginVersionTable)
      .where(gte(pluginVersionTable.publishedAt, since))
      .groupBy(dayOf(pluginVersionTable.publishedAt)),
    db
      .select({
        day: dayOf(pluginIngestionTable.finishedAt),
        status: pluginIngestionTable.status,
        n: count,
      })
      .from(pluginIngestionTable)
      .where(gte(pluginIngestionTable.finishedAt, since))
      .groupBy(dayOf(pluginIngestionTable.finishedAt), pluginIngestionTable.status),
    publishedComponents(db),
  ]);

  const pluginsByStatus: Record<PluginLifecycleStatus, number> = {
    active: 0,
    deprecated: 0,
    suspended: 0,
  };
  for (const row of pluginRows) pluginsByStatus[row.key] = row.n;

  const versionsByStatus: VersionCounts = {
    pending: 0,
    approved: 0,
    published: 0,
    rejected: 0,
    yanked: 0,
  };
  for (const row of versionRows) versionsByStatus[row.key] = row.n;

  const sourcesByStatus = { succeeded: 0, failed: 0, queued: 0, running: 0, neverSynced: 0 };
  for (const row of sourceRows) {
    if (row.key === null) sourcesByStatus.neverSynced += row.n;
    else sourcesByStatus[row.key] += row.n;
  }

  const ingested = new Map(ingestedRows.map((row) => [row.day, row.n]));
  const timeline = Array.from({ length: days }, (_, index) => {
    const date = dayKey(new Date(since.getTime() + index * DAY_MS));
    const syncs = (status: string) =>
      syncRows.find((row) => row.day === date && row.status === status)?.n ?? 0;
    return {
      date,
      versionsIngested: ingested.get(date) ?? 0,
      syncsSucceeded: syncs('succeeded'),
      syncsFailed: syncs('failed'),
    };
  });

  const topIds = topRows.map((row) => row.id);
  const names =
    topIds.length === 0
      ? []
      : await db
          .select({
            id: pluginTable.id,
            name: pluginTable.name,
            displayName: pluginTable.displayName,
          })
          .from(pluginTable)
          .where(inArray(pluginTable.id, topIds));
  const topPlugins = topRows.flatMap((row) => {
    const plugin = names.find((candidate) => candidate.id === row.id);
    return plugin ? [{ ...plugin, installations: row.installations }] : [];
  });

  const installs = installTotals[0] ?? { installations: 0, organizations: 0, users: 0 };
  return {
    periodDays: days,
    generatedAt: now.toISOString(),
    totals: {
      plugins: pluginRows.reduce((sum, row) => sum + row.n, 0),
      versions: versionRows.reduce((sum, row) => sum + row.n, 0),
      sources: sourceRows.reduce((sum, row) => sum + row.n, 0),
      categories: categoryTotals[0]?.n ?? 0,
      ...installs,
    },
    pluginsByStatus,
    versionsByStatus,
    needsReview: reviewRows[0]?.n ?? 0,
    sourcesByStatus,
    timeline,
    categories: categoryRows,
    topPlugins,
    components: componentTotals(componentRows),
  };
}
