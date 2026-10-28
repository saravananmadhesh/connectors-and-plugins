/**
 * Plugin management as the admin app does it: every plugin with every version and status, the
 * review of a pending version, and the changes that take a plugin out of use. Changes that reach
 * installed copies need `force` once the impact count has been seen; deleting is refused while a
 * plugin is installed anywhere, so the operator suspends it first and waits for uninstalls.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, desc, eq, inArray, ne, sql, type SQL } from 'drizzle-orm';
import {
  categoryTable,
  componentTable,
  installationTable,
  pluginCategoryTable,
  pluginSourceTable,
  pluginTable,
  pluginVersionTable,
  withMaintenance,
  type Db,
  type Tx,
} from '@boldcreate-integrations/db';
import {
  ScanReportSchema,
  type AdminImpactResponse,
  type AdminPluginDetailResponse,
  type AdminPluginBulkPublishResponse,
  type AdminPluginBulkSyncResponse,
  type AdminPluginBulkUpdateBody,
  type AdminPluginBulkUpdateResponse,
  type AdminPluginListQuery,
  type AdminPluginListResponse,
  type AdminPluginStatusBody,
  type AdminPluginSourceBody,
  type AdminPluginUpdateBody,
  type BulkPluginDeleteResponse,
  type PluginFlagsBody,
  type AdminPluginSummary,
  type AdminVersionDetailResponse,
  type AdminVersionSummary,
  type AuditAction,
  type ComponentKind,
  type PluginIngestionResponse,
  type PluginLifecycleStatus,
  type VersionChange,
  type VersionCounts,
  type VersionStatus,
  VERSION_CHANGES,
} from '@boldcreate-integrations/contracts';
import { linkDefaultCategory } from './categories.js';
import { writeAudit } from '../audit/write-audit.js';
import { conflict, isUniqueViolation, notFound, validationFailed } from '../errors.js';
import {
  isOwnerAllowed,
  queueIngestion,
  requestBulkSync,
  requestSync,
  type SourceActor,
} from '../ingestion/sources.js';
import { logoUrl } from '../ingestion/logo.js';
import { manifestVariables } from '../ingestion/manifest.js';
import { archiveHashesOf, requestArchivePurge } from '../ingestion/archive-purge.js';

type PluginRow = typeof pluginTable.$inferSelect;
type VersionRow = typeof pluginVersionTable.$inferSelect;
type SourceRow = typeof pluginSourceTable.$inferSelect;
/** The columns the list needs; the manifest and scan stay in the database. */
type VersionLite = Pick<
  VersionRow,
  'id' | 'pluginId' | 'version' | 'status' | 'major' | 'minor' | 'patch'
>;
type ComponentCounts = AdminPluginSummary['componentCounts'];
type CategoryTag = AdminPluginSummary['categories'][number];
type CategoryTags = Map<string, CategoryTag[]>;

const EMPTY_COUNTS: VersionCounts = {
  pending: 0,
  approved: 0,
  published: 0,
  rejected: 0,
  yanked: 0,
};

const auditActor = (actor: SourceActor) => ({
  kind: 'platform_admin' as const,
  id: actor.subject,
});

// ─── Impact ───────────────────────────────────────────────────────────────────

const impactColumns = {
  installations: sql<number>`count(*)::int`,
  organizations: sql<number>`count(distinct ${installationTable.organizationId})::int`,
  users: sql<number>`count(distinct ${installationTable.createdBy})::int`,
};

async function impactWhere(db: Db, condition: ReturnType<typeof eq>): Promise<AdminImpactResponse> {
  const [row] = await withMaintenance(db, 'admin_read', (tx) =>
    tx.select(impactColumns).from(installationTable).where(condition),
  );
  return row ?? { installations: 0, organizations: 0, users: 0 };
}

export async function pluginImpact(db: Db, pluginId: string): Promise<AdminImpactResponse> {
  await loadPlugin(db, pluginId);
  return impactWhere(db, eq(installationTable.pluginId, pluginId));
}

export async function versionImpact(db: Db, versionId: string): Promise<AdminImpactResponse> {
  await loadVersion(db, versionId);
  return impactWhere(db, eq(installationTable.pluginVersionId, versionId));
}

/** Installations per plugin or per version, for the lists. */
async function installationCounts(
  db: Db,
  by: 'plugin' | 'version',
  ids?: readonly string[],
): Promise<Map<string, number>> {
  if (ids?.length === 0) return new Map();
  const column = by === 'plugin' ? installationTable.pluginId : installationTable.pluginVersionId;
  const rows = await withMaintenance(db, 'admin_read', (tx) =>
    tx
      .select({ id: column, n: sql<number>`count(*)::int` })
      .from(installationTable)
      .where(ids ? inArray(column, [...ids]) : undefined)
      .groupBy(column),
  );
  return new Map(rows.map((row) => [row.id, row.n]));
}

// ─── Loading ──────────────────────────────────────────────────────────────────

async function loadPlugin(db: Db, pluginId: string): Promise<PluginRow> {
  const [row] = await db.select().from(pluginTable).where(eq(pluginTable.id, pluginId));
  if (!row) throw notFound();
  return row;
}

async function loadVersion(db: Db, versionId: string): Promise<VersionRow> {
  const [row] = await db
    .select()
    .from(pluginVersionTable)
    .where(eq(pluginVersionTable.id, versionId));
  if (!row) throw notFound();
  return row;
}

const compareDescending = (a: VersionLite, b: VersionLite): number =>
  b.major - a.major || b.minor - a.minor || b.patch - a.patch;

/** The file that defines a component, relative to the plugin folder. */
function componentPath(component: { kind?: unknown; metadata?: { path?: unknown } }): string {
  const path = component.metadata?.path;
  if (typeof path === 'string') return component.kind === 'skill' ? `${path}/SKILL.md` : path;
  if (component.kind === 'hook') return 'hooks/hooks.json';
  if (component.kind === 'mcp') return 'mcp.json';
  return '';
}

export function scanOf(row: VersionRow) {
  const raw = row.scan as { components?: unknown } | null;
  // Scans stored before paths were recorded get theirs from what the scan kept per component.
  const withPaths =
    raw && Array.isArray(raw.components)
      ? {
          ...raw,
          components: raw.components.map((component: object) => ({
            ...component,
            path: componentPath(component),
          })),
        }
      : raw;
  const parsed = ScanReportSchema.safeParse(withPaths);
  if (!parsed.success) return null;
  // The variables come from the stored manifest, so a scan made before schema-style variables were
  // understood still lists the real ones.
  const variables = manifestVariables(row.manifest);
  return variables ? { ...parsed.data, variables } : parsed.data;
}

function toVersionSummary(row: VersionRow, installations: number): AdminVersionSummary {
  return {
    id: row.id,
    version: row.version,
    status: row.status,
    commitSha: row.commitSha,
    archiveSizeBytes: row.archiveSizeBytes,
    executionBlockedAt: row.executionBlockedAt?.toISOString() ?? null,
    ingestedAt: row.publishedAt.toISOString(),
    installations,
    findings: scanOf(row)?.findings.length ?? 0,
    actions: VERSION_CHANGES.filter((change) => transitionOf(change).from.includes(row.status)),
  };
}

function toSummary(
  plugin: PluginRow,
  source: SourceRow | null,
  versions: VersionLite[],
  installations: number,
  tags: CategoryTags,
  kinds: readonly ComponentKind[],
  componentCounts: ComponentCounts,
  logo: string | null,
): AdminPluginSummary {
  const counts: VersionCounts = { ...EMPTY_COUNTS };
  for (const version of versions) counts[version.status] += 1;
  const published = versions
    .filter((version) => version.status === 'published')
    .sort(compareDescending);
  return {
    id: plugin.id,
    name: plugin.name,
    displayName: plugin.displayName,
    summary: plugin.summary,
    status: plugin.status,
    visibility: plugin.visibility,
    kinds: [...kinds],
    componentCounts,
    featured: plugin.featured,
    verified: plugin.verified,
    categories: tags.get(plugin.id) ?? [],
    source: source
      ? {
          id: source.id,
          owner: source.owner,
          repository: source.repository,
          ref: source.ref,
          path: source.path,
          lastStatus: source.lastStatus,
          lastSyncedAt: source.lastSyncedAt?.toISOString() ?? null,
          lastError: source.lastError,
        }
      : null,
    logoUrl: logo,
    versionCounts: counts,
    publishedVersion: published[0]?.version ?? null,
    installations,
    updatedAt: plugin.updatedAt.toISOString(),
  };
}

async function categoryTags(db: Db, pluginIds: string[]): Promise<CategoryTags> {
  const tags: CategoryTags = new Map();
  if (pluginIds.length === 0) return tags;
  const rows = await db
    .select({
      pluginId: pluginCategoryTable.pluginId,
      id: categoryTable.id,
      slug: categoryTable.slug,
      name: categoryTable.name,
    })
    .from(pluginCategoryTable)
    .innerJoin(categoryTable, eq(categoryTable.id, pluginCategoryTable.categoryId))
    .where(inArray(pluginCategoryTable.pluginId, pluginIds))
    .orderBy(asc(categoryTable.name));
  for (const { pluginId, ...tag } of rows) {
    tags.set(pluginId, [...(tags.get(pluginId) ?? []), tag]);
  }
  return tags;
}

// ─── Reads ────────────────────────────────────────────────────────────────────

/** Component kinds of each plugin, across its versions that were not rejected. */
async function pluginKinds(db: Db, pluginIds: string[]): Promise<Map<string, ComponentKind[]>> {
  const kinds = new Map<string, ComponentKind[]>();
  if (pluginIds.length === 0) return kinds;
  const rows = await db
    .selectDistinct({ pluginId: pluginVersionTable.pluginId, kind: componentTable.kind })
    .from(componentTable)
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, componentTable.pluginVersionId))
    .where(
      and(
        inArray(pluginVersionTable.pluginId, pluginIds),
        sql`${pluginVersionTable.status} <> 'rejected'`,
      ),
    );
  for (const { pluginId, kind } of rows) {
    kinds.set(pluginId, [...(kinds.get(pluginId) ?? []), kind].sort());
  }
  return kinds;
}

/** The version a plugin shows: the highest published one, else the newest that was not rejected. */
function shownVersionId(versions: VersionLite[]): string | null {
  const byNewest = [...versions].sort(compareDescending);
  const shown =
    byNewest.find((version) => version.status === 'published') ??
    byNewest.find((version) => version.status !== 'rejected');
  return shown?.id ?? null;
}

/** Components per kind in the version each plugin shows, keyed by plugin. */
async function componentCountsByPlugin(
  db: Db,
  byPlugin: Map<string, VersionLite[]>,
): Promise<Map<string, ComponentCounts>> {
  const shown = new Map<string, string>();
  for (const [pluginId, versions] of byPlugin) {
    const id = shownVersionId(versions);
    if (id) shown.set(id, pluginId);
  }
  const result = new Map<string, ComponentCounts>();
  if (shown.size === 0) return result;
  const rows = await db
    .select({
      versionId: componentTable.pluginVersionId,
      kind: componentTable.kind,
      n: sql<number>`count(*)::int`,
    })
    .from(componentTable)
    .where(inArray(componentTable.pluginVersionId, [...shown.keys()]))
    .groupBy(componentTable.pluginVersionId, componentTable.kind);
  for (const { versionId, kind, n } of rows) {
    const pluginId = shown.get(versionId);
    if (pluginId) result.set(pluginId, { ...result.get(pluginId), [kind]: n });
  }
  return result;
}

/** Link to each plugin's own logo: the one its manifest names, in the version the plugin shows. */
async function logosByPlugin(
  db: Db,
  byPlugin: Map<string, VersionLite[]>,
  sources: Map<string, SourceRow | null>,
): Promise<Map<string, string>> {
  const shown = new Map<string, string>();
  for (const [pluginId, versions] of byPlugin) {
    const id = shownVersionId(versions);
    if (id) shown.set(id, pluginId);
  }
  const result = new Map<string, string>();
  if (shown.size === 0) return result;
  const rows = await db
    .select({
      id: pluginVersionTable.id,
      commitSha: pluginVersionTable.commitSha,
      logo: sql<string | null>`${pluginVersionTable.manifest}->>'logo'`,
    })
    .from(pluginVersionTable)
    .where(inArray(pluginVersionTable.id, [...shown.keys()]));
  for (const row of rows) {
    const pluginId = shown.get(row.id);
    const source = pluginId ? sources.get(pluginId) : null;
    const url = source ? logoUrl(source, row.commitSha, source.path, row.logo) : null;
    if (pluginId && url) result.set(pluginId, url);
  }
  return result;
}

const escapeLike = (text: string): string => text.replace(/[\\%_]/g, (char) => `\\${char}`);

function listFilters(query: AdminPluginListQuery): SQL | undefined {
  const conditions: SQL[] = [];
  if (query.q) {
    const term = `%${escapeLike(query.q.toLowerCase())}%`;
    conditions.push(
      sql`(lower(${pluginTable.name}) LIKE ${term} OR lower(${pluginTable.displayName}) LIKE ${term})`,
    );
  }
  if (query.status) conditions.push(eq(pluginTable.status, query.status));
  if (query.visibility) conditions.push(eq(pluginTable.visibility, query.visibility));
  if (query.kind) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM component c JOIN plugin_version v ON v.id = c.plugin_version_id WHERE v.plugin_id = ${pluginTable.id} AND v.status <> 'rejected' AND c.kind = ${query.kind})`,
    );
  }
  if (query.versionStatus) {
    const states =
      query.versionStatus === 'needs_review' ? ['pending', 'approved'] : [query.versionStatus];
    conditions.push(
      sql`EXISTS (SELECT 1 FROM plugin_version v WHERE v.plugin_id = ${pluginTable.id} AND v.status IN (${sql.join(
        states.map((state) => sql`${state}`),
        sql`, `,
      )}))`,
    );
  }
  if (query.category) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM plugin_category pc JOIN category cat ON cat.id = pc.category_id WHERE pc.plugin_id = ${pluginTable.id} AND cat.slug = ${query.category})`,
    );
  }
  return and(...conditions);
}

/** The ids of one page, in the order asked for. */
async function pageOfIds(db: Db, query: AdminPluginListQuery, where: SQL | undefined) {
  const direction = query.direction === 'asc' ? asc : desc;
  const offset = (query.page - 1) * query.pageSize;
  if (query.sort === 'installations') {
    // Installations live behind a separate read, so this order is applied here.
    const matching = await db
      .select({ id: pluginTable.id, name: pluginTable.name })
      .from(pluginTable)
      .where(where)
      .orderBy(asc(pluginTable.name));
    const counts = await installationCounts(db, 'plugin');
    const sign = query.direction === 'asc' ? 1 : -1;
    matching.sort(
      (a, b) =>
        sign * ((counts.get(a.id) ?? 0) - (counts.get(b.id) ?? 0)) || a.name.localeCompare(b.name),
    );
    return matching.slice(offset, offset + query.pageSize).map((row) => row.id);
  }
  const column =
    query.sort === 'updated'
      ? pluginTable.updatedAt
      : query.sort === 'status'
        ? pluginTable.status
        : pluginTable.name;
  const rows = await db
    .select({ id: pluginTable.id })
    .from(pluginTable)
    .where(where)
    .orderBy(direction(column), asc(pluginTable.name))
    .limit(query.pageSize)
    .offset(offset);
  return rows.map((row) => row.id);
}

export async function listAdminPlugins(
  db: Db,
  query: AdminPluginListQuery,
): Promise<AdminPluginListResponse> {
  const where = listFilters(query);
  const [counted] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(pluginTable)
    .where(where);
  const total = counted?.n ?? 0;
  const ids = await pageOfIds(db, query, where);
  const page = { total, page: query.page, pageSize: query.pageSize };
  if (ids.length === 0) return { items: [], ...page };

  const plugins = await db
    .select({ plugin: pluginTable, source: pluginSourceTable })
    .from(pluginTable)
    .leftJoin(pluginSourceTable, eq(pluginSourceTable.id, pluginTable.sourceId))
    .where(inArray(pluginTable.id, ids));
  const versions = await db
    .select({
      id: pluginVersionTable.id,
      pluginId: pluginVersionTable.pluginId,
      version: pluginVersionTable.version,
      status: pluginVersionTable.status,
      major: pluginVersionTable.major,
      minor: pluginVersionTable.minor,
      patch: pluginVersionTable.patch,
    })
    .from(pluginVersionTable)
    .where(inArray(pluginVersionTable.pluginId, ids));
  const byPlugin = new Map<string, VersionLite[]>();
  for (const version of versions) {
    byPlugin.set(version.pluginId, [...(byPlugin.get(version.pluginId) ?? []), version]);
  }
  const [installed, tags, kinds, counts, logos] = await Promise.all([
    installationCounts(db, 'plugin', ids),
    categoryTags(db, ids),
    pluginKinds(db, ids),
    componentCountsByPlugin(db, byPlugin),
    logosByPlugin(db, byPlugin, new Map(plugins.map((row) => [row.plugin.id, row.source]))),
  ]);
  const found = new Map(plugins.map((row) => [row.plugin.id, row]));
  const items = ids.flatMap((id) => {
    const row = found.get(id);
    if (!row) return [];
    return [
      toSummary(
        row.plugin,
        row.source,
        byPlugin.get(id) ?? [],
        installed.get(id) ?? 0,
        tags,
        kinds.get(id) ?? [],
        counts.get(id) ?? {},
        logos.get(id) ?? null,
      ),
    ];
  });
  return { items, ...page };
}

export async function getAdminPlugin(db: Db, pluginId: string): Promise<AdminPluginDetailResponse> {
  const [found] = await db
    .select({ plugin: pluginTable, source: pluginSourceTable })
    .from(pluginTable)
    .leftJoin(pluginSourceTable, eq(pluginSourceTable.id, pluginTable.sourceId))
    .where(eq(pluginTable.id, pluginId));
  if (!found) throw notFound();
  const versions = await db
    .select()
    .from(pluginVersionTable)
    .where(eq(pluginVersionTable.pluginId, pluginId));
  const installed = await installationCounts(
    db,
    'version',
    versions.map((version) => version.id),
  );
  const sorted = [...versions].sort(compareDescending);
  const total = sorted.reduce((sum, version) => sum + (installed.get(version.id) ?? 0), 0);
  return {
    ...toSummary(
      found.plugin,
      found.source,
      versions,
      total,
      await categoryTags(db, [pluginId]),
      (await pluginKinds(db, [pluginId])).get(pluginId) ?? [],
      (await componentCountsByPlugin(db, new Map([[pluginId, versions]]))).get(pluginId) ?? {},
      (
        await logosByPlugin(
          db,
          new Map([[pluginId, versions]]),
          new Map([[pluginId, found.source]]),
        )
      ).get(pluginId) ?? null,
    ),
    description: found.plugin.description,
    keywords: found.plugin.keywords,
    metadataEdited: found.plugin.metadataEdited,
    createdAt: found.plugin.createdAt.toISOString(),
    versions: sorted.map((version) => toVersionSummary(version, installed.get(version.id) ?? 0)),
  };
}

export async function getAdminVersion(
  db: Db,
  versionId: string,
): Promise<AdminVersionDetailResponse> {
  const version = await loadVersion(db, versionId);
  const plugin = await loadPlugin(db, version.pluginId);
  const impact = await impactWhere(db, eq(installationTable.pluginVersionId, versionId));
  return {
    ...toVersionSummary(version, impact.installations),
    pluginId: plugin.id,
    pluginName: plugin.name,
    scan: scanOf(version),
  };
}

// ─── Version changes ──────────────────────────────────────────────────────────

interface Transition {
  from: readonly VersionStatus[];
  to: VersionStatus;
  action: AuditAction;
  /** Changes that reach installed copies need `force` when something is installed. */
  affectsInstalled: boolean;
}

const TRANSITIONS = {
  approve: {
    from: ['pending'],
    to: 'approved',
    action: 'plugin_version.approved',
    affectsInstalled: false,
  },
  reject: {
    from: ['pending', 'approved'],
    to: 'rejected',
    action: 'plugin_version.rejected',
    affectsInstalled: false,
  },
  // A rejection made by mistake goes back to the start of the cycle.
  reopen: {
    from: ['rejected'],
    to: 'pending',
    action: 'plugin_version.reopened',
    affectsInstalled: false,
  },
  // Only an approved version can be published: pending, rejected and yanked ones do not skip a step.
  publish: {
    from: ['approved'],
    to: 'published',
    action: 'plugin_version.published',
    affectsInstalled: false,
  },
  yank: {
    from: ['published'],
    to: 'yanked',
    action: 'plugin_version.yanked',
    affectsInstalled: true,
  },
} as const satisfies Record<VersionChange, Transition>;

const transitionOf = (change: VersionChange): Transition => TRANSITIONS[change];

export async function changeVersion(
  db: Db,
  versionId: string,
  change: VersionChange,
  options: { force: boolean },
  actor: SourceActor,
): Promise<AdminVersionDetailResponse> {
  const transition = transitionOf(change);
  if (transition.affectsInstalled && !options.force) {
    const impact = await versionImpact(db, versionId);
    if (impact.installations > 0) throw conflict();
  }
  await db.transaction(async (tx) => {
    const [row] = await tx
      .select()
      .from(pluginVersionTable)
      .where(eq(pluginVersionTable.id, versionId))
      .for('update');
    if (!row) throw notFound();
    if (!transition.from.includes(row.status)) throw conflict();
    await tx
      .update(pluginVersionTable)
      .set({
        status: transition.to,
        ...(transition.to === 'published' ? { publishedAt: new Date() } : {}),
      })
      .where(eq(pluginVersionTable.id, versionId));
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: transition.action,
      target: { kind: 'plugin_version', id: versionId },
      context: { pluginId: row.pluginId, version: row.version, from: row.status },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
  return getAdminVersion(db, versionId);
}

// ─── Plugin changes ───────────────────────────────────────────────────────────

const STATUS_ACTIONS: Record<PluginLifecycleStatus, AuditAction> = {
  active: 'plugin.reactivated',
  deprecated: 'plugin.deprecated',
  suspended: 'plugin.suspended',
};

export async function setPluginStatus(
  db: Db,
  pluginId: string,
  body: AdminPluginStatusBody,
  actor: SourceActor,
): Promise<AdminPluginDetailResponse> {
  const plugin = await loadPlugin(db, pluginId);
  if (body.status !== 'active' && plugin.status !== body.status && !body.force) {
    const impact = await impactWhere(db, eq(installationTable.pluginId, pluginId));
    if (impact.installations > 0) throw conflict();
  }
  await db.transaction(async (tx) => {
    const [row] = await tx
      .select()
      .from(pluginTable)
      .where(eq(pluginTable.id, pluginId))
      .for('update');
    if (!row) throw notFound();
    if (row.status === body.status) return;
    await tx
      .update(pluginTable)
      .set({ status: body.status, updatedAt: new Date() })
      .where(eq(pluginTable.id, pluginId));
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: STATUS_ACTIONS[body.status],
      target: { kind: 'plugin', id: pluginId },
      context: { name: row.name, from: row.status },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
  return getAdminPlugin(db, pluginId);
}

/** True when the error (or its cause chain) is a PostgreSQL foreign key violation (23503). */
function isForeignKeyViolation(err: unknown): boolean {
  let current: unknown = err;
  for (let depth = 0; depth < 4 && current && typeof current === 'object'; depth += 1) {
    if ((current as { code?: unknown }).code === '23503') return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

/**
 * Removes the sources no plugin points to any more, so a deleted plugin has nothing left to sync.
 */
async function removeOrphanedSources(
  tx: Tx,
  sourceIds: readonly string[],
  actor: SourceActor,
): Promise<void> {
  if (sourceIds.length === 0) return;
  const removed = await tx
    .delete(pluginSourceTable)
    .where(
      and(
        inArray(pluginSourceTable.id, [...new Set(sourceIds)]),
        sql`NOT EXISTS (SELECT 1 FROM plugin p WHERE p.source_id = ${pluginSourceTable.id})`,
      ),
    )
    .returning({ id: pluginSourceTable.id });
  for (const { id } of removed) {
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'plugin_source.deleted',
      target: { kind: 'plugin_source', id },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  }
}

/** Removes a plugin with all of its versions and its source; refused while anything uses it. */
export async function deletePlugin(db: Db, pluginId: string, actor: SourceActor): Promise<void> {
  const plugin = await loadPlugin(db, pluginId);
  const impact = await impactWhere(db, eq(installationTable.pluginId, pluginId));
  if (impact.installations > 0) throw conflict();
  try {
    await db.transaction(async (tx) => {
      const archives = await archiveHashesOf(tx, [pluginId]);
      await tx.delete(pluginVersionTable).where(eq(pluginVersionTable.pluginId, pluginId));
      const removed = await tx
        .delete(pluginTable)
        .where(eq(pluginTable.id, pluginId))
        .returning({ id: pluginTable.id });
      if (removed.length === 0) throw notFound();
      // Nothing installed it, so nothing depends on its archives; the worker removes them.
      await requestArchivePurge(tx, archives);
      await removeOrphanedSources(tx, plugin.sourceId ? [plugin.sourceId] : [], actor);
      await writeAudit(tx, {
        actor: auditActor(actor),
        action: 'plugin.deleted',
        target: { kind: 'plugin', id: pluginId },
        context: { name: plugin.name },
        requestId: actor.requestId,
        ip: actor.ip,
      });
    });
  } catch (error) {
    // A connection or installation created after the check still points at a version.
    if (isForeignKeyViolation(error)) throw conflict();
    throw error;
  }
}

/** Replaces the plugin's categories with exactly the given ones. */
export async function setPluginCategories(
  db: Db,
  pluginId: string,
  categoryIds: readonly string[],
  actor: SourceActor,
): Promise<AdminPluginDetailResponse> {
  const unique = [...new Set(categoryIds)];
  await db.transaction(async (tx) => {
    const [plugin] = await tx
      .select()
      .from(pluginTable)
      .where(eq(pluginTable.id, pluginId))
      .for('update');
    if (!plugin) throw notFound();
    if (unique.length > 0) {
      const known = await tx
        .select({ id: categoryTable.id })
        .from(categoryTable)
        .where(inArray(categoryTable.id, unique));
      if (known.length !== unique.length) {
        throw validationFailed([{ field: 'categoryIds', message: 'A category does not exist.' }]);
      }
    }
    await tx.delete(pluginCategoryTable).where(eq(pluginCategoryTable.pluginId, pluginId));
    if (unique.length > 0) {
      await tx
        .insert(pluginCategoryTable)
        .values(unique.map((categoryId) => ({ pluginId, categoryId })));
    } else {
      await linkDefaultCategory(tx, pluginId);
    }
    await tx.update(pluginTable).set({ updatedAt: new Date() }).where(eq(pluginTable.id, pluginId));
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'plugin.categories_changed',
      target: { kind: 'plugin', id: pluginId },
      context: { name: plugin.name, count: unique.length },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
  return getAdminPlugin(db, pluginId);
}

export async function setPluginFlags(
  db: Db,
  pluginId: string,
  body: PluginFlagsBody,
  actor: SourceActor,
): Promise<AdminPluginDetailResponse> {
  await db.transaction(async (tx) => {
    const [plugin] = await tx
      .update(pluginTable)
      .set({
        ...(body.featured === undefined ? {} : { featured: body.featured }),
        ...(body.verified === undefined ? {} : { verified: body.verified }),
        ...(body.visibility === undefined ? {} : { visibility: body.visibility }),
        updatedAt: new Date(),
      })
      .where(eq(pluginTable.id, pluginId))
      .returning();
    if (!plugin) throw notFound();
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'plugin.flags_changed',
      target: { kind: 'plugin', id: pluginId },
      context: {
        name: plugin.name,
        featured: plugin.featured,
        verified: plugin.verified,
        visibility: plugin.visibility,
      },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
  return getAdminPlugin(db, pluginId);
}

/**
 * Changes the details shown in the catalog. The same plugin has the same details whichever
 * repository layout it came from, so there is one form. A later sync keeps the edit.
 */
export async function updatePlugin(
  db: Db,
  pluginId: string,
  body: AdminPluginUpdateBody,
  actor: SourceActor,
): Promise<AdminPluginDetailResponse> {
  await db.transaction(async (tx) => {
    const [plugin] = await tx
      .update(pluginTable)
      .set({
        ...(body.displayName === undefined ? {} : { displayName: body.displayName }),
        ...(body.summary === undefined ? {} : { summary: body.summary }),
        ...(body.description === undefined ? {} : { description: body.description }),
        ...(body.keywords === undefined ? {} : { keywords: [...new Set(body.keywords)] }),
        metadataEdited: true,
        updatedAt: new Date(),
      })
      .where(eq(pluginTable.id, pluginId))
      .returning();
    if (!plugin) throw notFound();
    await writeAudit(tx, {
      actor: auditActor(actor),
      action: 'plugin.updated',
      target: { kind: 'plugin', id: pluginId },
      context: { name: plugin.name, fields: Object.keys(body) },
      requestId: actor.requestId,
      ip: actor.ip,
    });
  });
  return getAdminPlugin(db, pluginId);
}

/**
 * Points the plugin at another repository, branch or folder and queues a sync from there. A plugin
 * that has no source, or shares its source with other plugins, gets a source of its own. Refused
 * while a sync of the current source is waiting or running.
 */
export async function updatePluginSource(
  db: Db,
  allowedOwners: readonly string[],
  pluginId: string,
  body: AdminPluginSourceBody,
  actor: SourceActor,
): Promise<AdminPluginDetailResponse> {
  if (!isOwnerAllowed(allowedOwners, body.owner)) {
    throw validationFailed([{ field: 'owner', message: 'This owner is not on the allow-list.' }]);
  }
  try {
    await db.transaction(async (tx) => {
      const [plugin] = await tx
        .select()
        .from(pluginTable)
        .where(eq(pluginTable.id, pluginId))
        .for('update');
      if (!plugin) throw notFound();
      const [current] = plugin.sourceId
        ? await tx
            .select()
            .from(pluginSourceTable)
            .where(eq(pluginSourceTable.id, plugin.sourceId))
            .for('update')
        : [];
      if (current?.lastStatus === 'queued' || current?.lastStatus === 'running') throw conflict();
      // A source other plugins also use is left as it is; this plugin gets one of its own.
      const [sharing] = current
        ? await tx
            .select({ n: sql<number>`count(*)::int` })
            .from(pluginTable)
            .where(and(eq(pluginTable.sourceId, current.id), ne(pluginTable.id, pluginId)))
        : [];
      let sourceId: string;
      if (current && (sharing?.n ?? 0) === 0) {
        sourceId = current.id;
        await tx
          .update(pluginSourceTable)
          .set({
            ...body,
            lastCommitSha: null,
            lastError: null,
            lastNote: null,
            lastStatus: null,
          })
          .where(eq(pluginSourceTable.id, sourceId));
      } else {
        sourceId = randomUUID();
        await tx.insert(pluginSourceTable).values({
          id: sourceId,
          ...body,
          featured: plugin.featured,
          verified: plugin.verified,
          visibility: plugin.visibility,
          createdBy: actor.subject,
        });
        await tx
          .update(pluginTable)
          .set({ sourceId, updatedAt: new Date() })
          .where(eq(pluginTable.id, pluginId));
      }
      await queueIngestion(tx, sourceId, actor);
      await writeAudit(tx, {
        actor: auditActor(actor),
        action: 'plugin_source.updated',
        target: { kind: 'plugin', id: pluginId },
        context: {
          name: plugin.name,
          from: current
            ? {
                owner: current.owner,
                repository: current.repository,
                ref: current.ref,
                path: current.path,
              }
            : null,
          to: body,
        },
        requestId: actor.requestId,
        ip: actor.ip,
      });
    });
  } catch (error) {
    // Another source already uses this repository, branch and folder.
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
  return getAdminPlugin(db, pluginId);
}

/**
 * Deletes every listed plugin that nothing has installed, and says which were left alone.
 * Installation counts, versions and plugins are each handled in one statement.
 */
export async function bulkDeletePlugins(
  db: Db,
  ids: readonly string[],
  actor: SourceActor,
): Promise<BulkPluginDeleteResponse> {
  const wanted = [...ids];
  try {
    return await db.transaction(async (tx) => {
      const found = await tx
        .select({ id: pluginTable.id, name: pluginTable.name, sourceId: pluginTable.sourceId })
        .from(pluginTable)
        .where(inArray(pluginTable.id, wanted))
        .for('update');
      const names = new Map(found.map((row) => [row.id, row.name]));
      const used = await withMaintenance(db, 'admin_read', (reader) =>
        reader
          .select({ id: installationTable.pluginId })
          .from(installationTable)
          .where(inArray(installationTable.pluginId, wanted))
          .groupBy(installationTable.pluginId),
      );
      const usedIds = new Set(used.map((row) => row.id));
      const deletable = found.map((row) => row.id).filter((id) => !usedIds.has(id));
      if (deletable.length > 0) {
        const archives = await archiveHashesOf(tx, deletable);
        await tx.delete(pluginVersionTable).where(inArray(pluginVersionTable.pluginId, deletable));
        await tx.delete(pluginTable).where(inArray(pluginTable.id, deletable));
        await requestArchivePurge(tx, archives);
        const gone = new Set(deletable);
        await removeOrphanedSources(
          tx,
          found.flatMap((row) => (gone.has(row.id) && row.sourceId ? [row.sourceId] : [])),
          actor,
        );
        for (const id of deletable) {
          await writeAudit(tx, {
            actor: auditActor(actor),
            action: 'plugin.deleted',
            target: { kind: 'plugin', id },
            context: { name: names.get(id) },
            requestId: actor.requestId,
            ip: actor.ip,
          });
        }
      }
      const deletedSet = new Set(deletable);
      return {
        deleted: deletable,
        skipped: wanted
          .filter((id) => !deletedSet.has(id))
          .map((id) => ({
            id,
            reason: names.has(id) ? ('installed' as const) : ('not_found' as const),
          })),
      };
    });
  } catch (error) {
    // An installation created after the check still points at a version: nothing was removed.
    if (isForeignKeyViolation(error)) throw conflict();
    throw error;
  }
}

/** Queues a sync of the plugin's own source. A plugin without a source has nothing to sync. */
export async function syncPlugin(
  db: Db,
  pluginId: string,
  actor: SourceActor,
): Promise<PluginIngestionResponse> {
  const plugin = await loadPlugin(db, pluginId);
  if (!plugin.sourceId) throw notFound();
  return requestSync(db, plugin.sourceId, actor);
}

/**
 * Approves (when pending) and publishes the newest version of each listed plugin. Older versions
 * are never touched, and a newest version that was rejected or yanked is not brought back.
 */
export async function bulkPublishLatest(
  db: Db,
  ids: readonly string[],
  actor: SourceActor,
): Promise<AdminPluginBulkPublishResponse> {
  const wanted = [...ids];
  return db.transaction(async (tx) => {
    const plugins = await tx
      .select({ id: pluginTable.id })
      .from(pluginTable)
      .where(inArray(pluginTable.id, wanted))
      .for('update');
    const known = new Set(plugins.map((row) => row.id));
    const versions =
      known.size === 0
        ? []
        : await tx
            .select()
            .from(pluginVersionTable)
            .where(inArray(pluginVersionTable.pluginId, [...known]))
            .orderBy(
              desc(pluginVersionTable.major),
              desc(pluginVersionTable.minor),
              desc(pluginVersionTable.patch),
            )
            .for('update');
    const newest = new Map<string, (typeof versions)[number]>();
    for (const row of versions) if (!newest.has(row.pluginId)) newest.set(row.pluginId, row);

    const published: AdminPluginBulkPublishResponse['published'] = [];
    const skipped: AdminPluginBulkPublishResponse['skipped'] = [];
    for (const id of wanted) {
      const row = newest.get(id);
      if (!row) {
        skipped.push({ id, reason: known.has(id) ? 'not_reviewable' : 'not_found' });
        continue;
      }
      if (row.status === 'published') {
        skipped.push({ id, reason: 'already_published' });
        continue;
      }
      if (row.status !== 'pending' && row.status !== 'approved') {
        skipped.push({ id, reason: 'not_reviewable' });
        continue;
      }
      await tx
        .update(pluginVersionTable)
        .set({ status: 'published', publishedAt: new Date() })
        .where(eq(pluginVersionTable.id, row.id));
      const steps: [AuditAction, VersionStatus][] =
        row.status === 'pending'
          ? [
              ['plugin_version.approved', 'pending'],
              ['plugin_version.published', 'approved'],
            ]
          : [['plugin_version.published', 'approved']];
      for (const [action, from] of steps) {
        await writeAudit(tx, {
          actor: auditActor(actor),
          action,
          target: { kind: 'plugin_version', id: row.id },
          context: { pluginId: id, version: row.version, from },
          requestId: actor.requestId,
          ip: actor.ip,
        });
      }
      published.push({ id, versionId: row.id, version: row.version });
    }
    return { published, skipped };
  });
}

/** Queues a sync for the sources of the listed plugins, once per source. */
export async function bulkSyncPlugins(
  db: Db,
  ids: readonly string[],
  actor: SourceActor,
): Promise<AdminPluginBulkSyncResponse> {
  const rows = await db
    .select({ id: pluginTable.id, sourceId: pluginTable.sourceId })
    .from(pluginTable)
    .where(inArray(pluginTable.id, [...ids]));
  const sourceIds = [...new Set(rows.flatMap((row) => (row.sourceId ? [row.sourceId] : [])))];
  const result =
    sourceIds.length === 0
      ? { queued: [], skipped: [] }
      : await requestBulkSync(db, sourceIds, actor);
  const queuedSources = new Set(result.queued);
  const queued = rows
    .filter((row) => row.sourceId && queuedSources.has(row.sourceId))
    .map((row) => row.id);
  const queuedSet = new Set(queued);
  return { queued, skipped: ids.filter((id) => !queuedSet.has(id)) };
}

/**
 * Applies one change to many plugins in a single transaction. A state change that reaches
 * installed copies is left out unless `force` says the impact was seen.
 */
export async function bulkUpdatePlugins(
  db: Db,
  body: AdminPluginBulkUpdateBody,
  actor: SourceActor,
): Promise<AdminPluginBulkUpdateResponse> {
  const wanted = [...body.ids];
  const takesOutOfUse = body.status !== undefined && body.status !== 'active' && !body.force;
  const used = takesOutOfUse
    ? new Set((await installationCounts(db, 'plugin', wanted)).keys())
    : new Set<string>();
  return db.transaction(async (tx) => {
    const found = await tx
      .select()
      .from(pluginTable)
      .where(inArray(pluginTable.id, wanted))
      .for('update');
    const known = new Map(found.map((row) => [row.id, row]));
    const blocked = found.filter(
      (row) => used.has(row.id) && body.status !== undefined && row.status !== body.status,
    );
    const blockedIds = new Set(blocked.map((row) => row.id));
    const targets = found.filter((row) => !blockedIds.has(row.id));
    if (targets.length > 0) {
      await tx
        .update(pluginTable)
        .set({
          ...(body.status === undefined ? {} : { status: body.status }),
          ...(body.visibility === undefined ? {} : { visibility: body.visibility }),
          ...(body.featured === undefined ? {} : { featured: body.featured }),
          ...(body.verified === undefined ? {} : { verified: body.verified }),
          updatedAt: new Date(),
        })
        .where(
          inArray(
            pluginTable.id,
            targets.map((row) => row.id),
          ),
        );
      const flagsChanged =
        body.visibility !== undefined || body.featured !== undefined || body.verified !== undefined;
      for (const row of targets) {
        if (body.status !== undefined && row.status !== body.status) {
          await writeAudit(tx, {
            actor: auditActor(actor),
            action: STATUS_ACTIONS[body.status],
            target: { kind: 'plugin', id: row.id },
            context: { name: row.name, from: row.status },
            requestId: actor.requestId,
            ip: actor.ip,
          });
        }
        if (flagsChanged) {
          await writeAudit(tx, {
            actor: auditActor(actor),
            action: 'plugin.flags_changed',
            target: { kind: 'plugin', id: row.id },
            context: {
              name: row.name,
              ...(body.featured === undefined ? {} : { featured: body.featured }),
              ...(body.verified === undefined ? {} : { verified: body.verified }),
              ...(body.visibility === undefined ? {} : { visibility: body.visibility }),
            },
            requestId: actor.requestId,
            ip: actor.ip,
          });
        }
      }
    }
    const updated = targets.map((row) => row.id);
    const updatedSet = new Set(updated);
    return {
      updated,
      skipped: wanted
        .filter((id) => !updatedSet.has(id))
        .map((id) => ({
          id,
          reason: known.has(id) ? ('installed' as const) : ('not_found' as const),
        })),
    };
  });
}
