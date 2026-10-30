/**
 * Marketplace use-cases: list/get plugins, versions and components.
 *
 * Rules:
 * - Public plugins are visible to all authenticated users.
 * - Organization plugins are visible only to members of the publisher org.
 * - Yanked versions are visible only to callers with an existing authorized
 *   installation, and only when requested explicitly.
 * - Emergency-blocked versions may be listed but execution is denied elsewhere.
 */
import {
  eq,
  and,
  or,
  isNull,
  lt,
  lte,
  asc,
  count,
  desc,
  ilike,
  inArray,
  sql,
  type SQL,
} from 'drizzle-orm';
import type { Db, Executor } from '@boldcreate-integrations/db';
import {
  pluginTable,
  pluginVersionTable,
  categoryTable,
  componentTable,
  organizationMemberTable,
  pluginCategoryTable,
  organizationTable,
  installationTable,
  pluginSourceTable,
  encodeCursor,
  decodeCursor,
} from '@boldcreate-integrations/db';
import type {
  ComponentSummary,
  PageQuery,
  PluginDetailResponse,
  PluginListQuery,
  PluginSummaryResponse,
  PluginVersionDetailResponse,
  PluginVersionReviewResponse,
  PluginVersionSummaryResponse,
  Plain,
  ComponentCounts,
  PluginListItemResponse,
} from '@boldcreate-integrations/contracts';
import { scanOf } from './admin-plugins.js';
import { conflict, notFound } from '../errors.js';
import { logoUrl } from '../ingestion/logo.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type CategoryTags = Map<string, { slug: string; name: string }[]>;

/** Categories of the given plugins, by plugin id. */
async function categoriesOf(db: Executor, pluginIds: string[]): Promise<CategoryTags> {
  const tags: CategoryTags = new Map();
  if (pluginIds.length === 0) return tags;
  const rows = await db
    .select({
      pluginId: pluginCategoryTable.pluginId,
      slug: categoryTable.slug,
      name: categoryTable.name,
    })
    .from(pluginCategoryTable)
    .innerJoin(categoryTable, eq(categoryTable.id, pluginCategoryTable.categoryId))
    .where(inArray(pluginCategoryTable.pluginId, pluginIds))
    .orderBy(categoryTable.name);
  for (const row of rows) {
    const list = tags.get(row.pluginId) ?? [];
    list.push({ slug: row.slug, name: row.name });
    tags.set(row.pluginId, list);
  }
  return tags;
}

/** The logo of each plugin's newest published version, pinned to the commit that version was read from. */
export async function logosOf(
  db: Executor,
  plugins: { id: string; sourceId: string | null }[],
): Promise<Map<string, string>> {
  const logos = new Map<string, string>();
  if (plugins.length === 0) return logos;
  const versions = await db
    .select({
      pluginId: pluginVersionTable.pluginId,
      commitSha: pluginVersionTable.commitSha,
      logo: sql<string | null>`${pluginVersionTable.manifest}->>'logo'`,
    })
    .from(pluginVersionTable)
    .where(
      and(
        inArray(
          pluginVersionTable.pluginId,
          plugins.map((plugin) => plugin.id),
        ),
        eq(pluginVersionTable.status, 'published'),
      ),
    )
    .orderBy(
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
    );
  const newest = new Map<string, (typeof versions)[number]>();
  for (const version of versions) {
    if (!newest.has(version.pluginId)) newest.set(version.pluginId, version);
  }
  const sourceIds = plugins.flatMap((plugin) => (plugin.sourceId ? [plugin.sourceId] : []));
  const sources =
    sourceIds.length === 0
      ? []
      : await db
          .select({
            id: pluginSourceTable.id,
            owner: pluginSourceTable.owner,
            repository: pluginSourceTable.repository,
            path: pluginSourceTable.path,
          })
          .from(pluginSourceTable)
          .where(inArray(pluginSourceTable.id, sourceIds));
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  for (const plugin of plugins) {
    const version = newest.get(plugin.id);
    const source = plugin.sourceId ? sourceById.get(plugin.sourceId) : undefined;
    const url =
      version && source ? logoUrl(source, version.commitSha, source.path, version.logo) : null;
    if (url) logos.set(plugin.id, url);
  }
  return logos;
}

function toPluginSummary(
  row: typeof pluginTable.$inferSelect,
  tags: CategoryTags,
  logos: Map<string, string>,
): Plain<PluginSummaryResponse> {
  return {
    id: row.id,
    name: row.name,
    displayName: row.displayName,
    summary: row.summary,
    keywords: row.keywords,
    status: row.status,
    // Only public plugins reach members.
    visibility: 'public',
    publisherOrganizationId: row.publisherOrganizationId ?? null,
    featured: row.featured,
    verified: row.verified,
    categories: tags.get(row.id) ?? [],
    logoUrl: logos.get(row.id) ?? null,
    updatedAt: row.updatedAt.toISOString(),
  };
}

function toVersionSummary(
  row: typeof pluginVersionTable.$inferSelect,
): Plain<PluginVersionSummaryResponse> {
  return {
    id: row.id,
    pluginId: row.pluginId,
    version: row.version,
    publishedAt: row.publishedAt.toISOString(),
    status: row.status,
  };
}

const COMMIT_SHA = /^[0-9a-f]{40}$/;

/** A GitHub address for a path inside the plugin's repository, pinned to the commit that was read. */
function githubUrl(
  source: { owner: string; repository: string; path: string },
  commitSha: string | null,
  extra: string,
  mode: 'tree' | 'blob' = 'tree',
): string {
  const segments = [...source.path.split('/'), ...extra.split('/')].filter(
    (part) => part !== '' && part !== '.' && part !== '..',
  );
  const ref = commitSha !== null && COMMIT_SHA.test(commitSha) ? commitSha : 'HEAD';
  return `https://github.com/${[source.owner, source.repository].map(encodeURIComponent).join('/')}/${mode}/${encodeURIComponent(ref)}${segments.map((part) => `/${encodeURIComponent(part)}`).join('')}`;
}

function toComponentSummary(
  row: typeof componentTable.$inferSelect,
  link?: (path: string, mode: 'tree' | 'blob') => string,
): Plain<ComponentSummary> {
  const metadata = row.metadata as Record<string, unknown> | null;
  const path = typeof metadata?.['path'] === 'string' ? metadata['path'] : '';
  const sourceUrl = link ? link(path, row.kind === 'skill' || path === '' ? 'tree' : 'blob') : null;
  const text = (key: string) => (typeof metadata?.[key] === 'string' ? metadata[key] : null);
  return {
    id: row.id,
    kind: row.kind,
    name: row.name,
    description: row.description,
    transport: row.kind === 'mcp' ? text('transport') : null,
    url: row.kind === 'mcp' ? text('url') : null,
    sourceUrl,
  };
}

/** Plugin rows the caller may see: public, or published by an org the caller belongs to. */
function visiblePluginQuery(db: Db, userId: string) {
  return db
    .selectDistinctOn([pluginTable.createdAt, pluginTable.id], { plugin: pluginTable })
    .from(pluginTable)
    .leftJoin(
      organizationTable,
      and(
        eq(organizationTable.id, pluginTable.publisherOrganizationId),
        isNull(organizationTable.deletionRequestedAt),
      ),
    )
    .leftJoin(
      organizationMemberTable,
      and(
        eq(organizationMemberTable.organizationId, organizationTable.id),
        eq(organizationMemberTable.userId, userId),
      ),
    );
}

/** A plugin is in the catalog once a version is published, and only while it is not suspended. */
export const inCatalog: SQL = sql`${pluginTable.status} <> 'suspended' AND ${pluginTable.visibility} = 'public' AND EXISTS (SELECT 1 FROM plugin_version v WHERE v.plugin_id = ${pluginTable.id} AND v.status = 'published')`;

function visibilityClause(userId: string): SQL | undefined {
  return and(
    inCatalog,
    or(isNull(pluginTable.publisherOrganizationId), eq(organizationMemberTable.userId, userId)),
  );
}

// ─── Use-cases ────────────────────────────────────────────────────────────────

/** The newest published version of each plugin and how many components of each kind it ships. */
async function listingExtrasOf(
  db: Executor,
  pluginIds: string[],
): Promise<
  Map<string, { latestVersion: { id: string; version: string }; counts: ComponentCounts }>
> {
  const extras = new Map<
    string,
    { latestVersion: { id: string; version: string }; counts: ComponentCounts }
  >();
  if (pluginIds.length === 0) return extras;
  const versions = await db
    .select({
      id: pluginVersionTable.id,
      pluginId: pluginVersionTable.pluginId,
      version: pluginVersionTable.version,
    })
    .from(pluginVersionTable)
    .where(
      and(
        inArray(pluginVersionTable.pluginId, pluginIds),
        eq(pluginVersionTable.status, 'published'),
      ),
    )
    .orderBy(
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
    );
  for (const version of versions) {
    if (extras.has(version.pluginId)) continue;
    extras.set(version.pluginId, {
      latestVersion: { id: version.id, version: version.version },
      counts: { agent: 0, skill: 0, mcp: 0, hook: 0, rule: 0 },
    });
  }
  const newestIds = [...extras.values()].map((extra) => extra.latestVersion.id);
  if (newestIds.length === 0) return extras;
  const byVersion = new Map([...extras.values()].map((extra) => [extra.latestVersion.id, extra]));
  const rows = await db
    .select({
      versionId: componentTable.pluginVersionId,
      kind: componentTable.kind,
      total: sql<number>`count(*)::int`,
    })
    .from(componentTable)
    .where(inArray(componentTable.pluginVersionId, newestIds))
    .groupBy(componentTable.pluginVersionId, componentTable.kind);
  for (const row of rows) {
    const extra = byVersion.get(row.versionId);
    if (extra) extra.counts[row.kind] = row.total;
  }
  return extras;
}

const NO_COMPONENTS: ComponentCounts = { agent: 0, skill: 0, mcp: 0, hook: 0, rule: 0 };

/** Public plugins, or plugins published by an organization the caller belongs to. */
function visibleToUser(userId: string): SQL {
  return sql`(${pluginTable.publisherOrganizationId} IS NULL OR EXISTS (SELECT 1 FROM organization_member m JOIN organization o ON o.id = m.organization_id WHERE m.organization_id = ${pluginTable.publisherOrganizationId} AND m.user_id = ${userId} AND o.deletion_requested_at IS NULL))`;
}

/**
 * What an organization's projects may offer: published, not suspended, and either a platform plugin
 * (no publisher organization) or one the organization published itself.
 */
export function inOrgCatalog(orgId: string): SQL {
  return sql`${pluginTable.status} <> 'suspended' AND ((${pluginTable.publisherOrganizationId} IS NULL AND ${pluginTable.visibility} = 'public') OR ${pluginTable.publisherOrganizationId} = ${orgId}) AND EXISTS (SELECT 1 FROM plugin_version v WHERE v.plugin_id = ${pluginTable.id} AND v.status = 'published')`;
}

export type PluginListPage = {
  items: Plain<PluginListItemResponse>[];
  total: number;
  page: number;
  pageSize: number;
};

export async function listPlugins(
  db: Db,
  userId: string,
  query: PluginListQuery,
): Promise<PluginListPage> {
  return listPluginsWhere(db, [inCatalog, visibleToUser(userId)], query);
}

/** The catalog a project offers its users, with the same filters and paging as the marketplace. */
export async function listOrgCatalog(
  tx: Executor,
  orgId: string,
  query: PluginListQuery,
  narrowedBy: SQL[] = [],
): Promise<PluginListPage> {
  return listPluginsWhere(tx, [inOrgCatalog(orgId), ...narrowedBy], query);
}

async function listPluginsWhere(
  db: Executor,
  base: SQL[],
  query: PluginListQuery,
): Promise<PluginListPage> {
  const conditions: SQL[] = [...base];

  if (query.q) {
    const term = `%${query.q}%`;
    const clause = or(
      ilike(pluginTable.name, term),
      ilike(pluginTable.displayName, term),
      ilike(pluginTable.summary, term),
    );
    if (clause) conditions.push(clause);
  }

  const slugs = (query.categories ?? '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
  if (slugs.length > 0) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM plugin_category pc JOIN category c ON c.id = pc.category_id WHERE pc.plugin_id = ${pluginTable.id} AND c.slug IN (${sql.join(
        slugs.map((slug) => sql`${slug}`),
        sql`, `,
      )}))`,
    );
  }

  if (query.kind) {
    conditions.push(
      sql`EXISTS (SELECT 1 FROM component k JOIN plugin_version v ON v.id = k.plugin_version_id WHERE v.plugin_id = ${pluginTable.id} AND v.status = 'published' AND k.kind = ${query.kind})`,
    );
  }

  if (query.featured) {
    conditions.push(eq(pluginTable.featured, query.featured === 'true'));
  }

  if (query.keyword) {
    conditions.push(sql`${pluginTable.keywords} @> ARRAY[${query.keyword}]::text[]`);
  }

  const where = and(...conditions);
  const direction = query.direction ?? (query.sort === 'name' ? 'asc' : 'desc');
  const order = direction === 'asc' ? asc : desc;
  const sortKey =
    query.sort === 'name'
      ? sql`lower(${pluginTable.displayName})`
      : query.sort === 'updated'
        ? pluginTable.updatedAt
        : pluginTable.createdAt;

  const totalRows = await db.select({ total: count() }).from(pluginTable).where(where);
  const total = totalRows[0]?.total ?? 0;
  const rows = await db
    .select()
    .from(pluginTable)
    .where(where)
    .orderBy(order(sortKey), order(pluginTable.id))
    .limit(query.limit)
    .offset((query.page - 1) * query.limit);

  const tags = await categoriesOf(
    db,
    rows.map((plugin) => plugin.id),
  );
  const logos = await logosOf(db, rows);
  const extras = await listingExtrasOf(
    db,
    rows.map((plugin) => plugin.id),
  );
  const items = rows.map((plugin) => {
    const extra = extras.get(plugin.id);
    return {
      ...toPluginSummary(plugin, tags, logos),
      latestVersion: extra?.latestVersion ?? null,
      componentCounts: extra?.counts ?? NO_COMPONENTS,
    };
  });

  return { items, total, page: query.page, pageSize: query.limit };
}

async function findVisiblePlugin(
  db: Db,
  userId: string,
  pluginId: string,
): Promise<typeof pluginTable.$inferSelect> {
  const rows = await visiblePluginQuery(db, userId)
    .where(and(eq(pluginTable.id, pluginId), visibilityClause(userId)))
    .limit(1);
  const row = rows[0];
  if (!row) throw notFound();
  return row.plugin;
}

export async function getPlugin(
  db: Db,
  userId: string,
  pluginId: string,
): Promise<Plain<PluginDetailResponse>> {
  return pluginDetail(db, await findVisiblePlugin(db, userId, pluginId));
}

/** One plugin of an organization's catalog, or `not_found`. */
export async function getOrgCatalogPlugin(
  tx: Executor,
  orgId: string,
  pluginId: string,
): Promise<Plain<PluginDetailResponse>> {
  const [plugin] = await tx
    .select()
    .from(pluginTable)
    .where(and(eq(pluginTable.id, pluginId), inOrgCatalog(orgId)))
    .limit(1);
  if (!plugin) throw notFound();
  return pluginDetail(tx, plugin);
}

async function pluginDetail(
  db: Executor,
  plugin: typeof pluginTable.$inferSelect,
): Promise<Plain<PluginDetailResponse>> {
  const tags = await categoriesOf(db, [plugin.id]);
  const logos = await logosOf(db, [plugin]);
  const latest = await db
    .select()
    .from(pluginVersionTable)
    .where(
      and(eq(pluginVersionTable.pluginId, plugin.id), eq(pluginVersionTable.status, 'published')),
    )
    .orderBy(
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
    )
    .limit(1);
  const latestVersion = latest[0];
  const source = plugin.sourceId
    ? (
        await db
          .select({
            owner: pluginSourceTable.owner,
            repository: pluginSourceTable.repository,
            path: pluginSourceTable.path,
          })
          .from(pluginSourceTable)
          .where(eq(pluginSourceTable.id, plugin.sourceId))
          .limit(1)
      )[0]
    : undefined;
  const link = source
    ? (path: string, mode: 'tree' | 'blob') =>
        githubUrl(source, latestVersion?.commitSha ?? null, path, mode)
    : undefined;
  return {
    ...toPluginSummary(plugin, tags, logos),
    description: plugin.description,
    repositoryUrl: link ? link('', 'tree') : null,
    createdAt: plugin.createdAt.toISOString(),
    latestVersion: latestVersion ? toVersionSummary(latestVersion) : null,
    components: latestVersion ? await listComponents(db, latestVersion.id, link) : [],
    variables: (latestVersion ? (scanOf(latestVersion)?.variables ?? []) : []).map((variable) => ({
      name: variable.name,
      description: variable.description,
      required: variable.required,
      secret: variable.secret,
    })),
  };
}

export async function listPluginVersions(
  db: Db,
  userId: string,
  pluginId: string,
  query: PageQuery,
): Promise<{
  items: Plain<PluginVersionSummaryResponse>[];
  nextCursor: string | null;
  hasMore: boolean;
}> {
  const plugin = await findVisiblePlugin(db, userId, pluginId);
  const limit = query.limit;

  const conditions: SQL[] = [eq(pluginVersionTable.pluginId, plugin.id)];

  if (query.cursor) {
    const { createdAt, id } = decodeCursor(query.cursor);
    const clause = or(
      lt(pluginVersionTable.publishedAt, new Date(createdAt)),
      and(lte(pluginVersionTable.publishedAt, new Date(createdAt)), lt(pluginVersionTable.id, id)),
    );
    if (clause) conditions.push(clause);
  }

  const rows = await db
    .select()
    .from(pluginVersionTable)
    .where(
      and(
        ...conditions,
        // Exclude yanked unless caller has an installation (handled at explicit get)
        eq(pluginVersionTable.status, 'published'),
      ),
    )
    .orderBy(
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
    )
    .limit(limit + 1);

  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit);
  const items = page.map(toVersionSummary);
  const lastRow = page[page.length - 1];
  const nextCursor = hasMore && lastRow ? encodeCursor(lastRow.publishedAt, lastRow.id) : null;

  return { items, nextCursor, hasMore };
}

/**
 * Loads a version the caller is allowed to see. Yanked versions are visible
 * only to callers with an existing installation of that version.
 */
async function findVisibleVersion(
  db: Db,
  userId: string,
  pluginVersionId: string,
): Promise<typeof pluginVersionTable.$inferSelect> {
  const rows = await db
    .select()
    .from(pluginVersionTable)
    .where(eq(pluginVersionTable.id, pluginVersionId))
    .limit(1);
  const row = rows[0];
  if (!row) throw notFound();

  // Visibility of the parent plugin
  await findVisiblePlugin(db, userId, row.pluginId).catch(() => {
    throw notFound();
  });

  if (row.status === 'yanked') {
    const instRows = await db
      .select({ id: installationTable.id })
      .from(installationTable)
      .innerJoin(organizationTable, eq(organizationTable.id, installationTable.organizationId))
      .where(
        and(
          eq(installationTable.pluginVersionId, row.id),
          eq(installationTable.createdBy, userId),
          isNull(organizationTable.deletionRequestedAt),
        ),
      )
      .limit(1);
    if (!instRows[0]) throw notFound();
  }

  return row;
}

export async function listComponents(
  db: Executor,
  pluginVersionId: string,
  link?: (path: string, mode: 'tree' | 'blob') => string,
): Promise<Plain<ComponentSummary>[]> {
  const rows = await db
    .select()
    .from(componentTable)
    .where(eq(componentTable.pluginVersionId, pluginVersionId));
  return rows.map((row) => toComponentSummary(row, link));
}

export async function getPluginVersion(
  db: Db,
  userId: string,
  pluginVersionId: string,
): Promise<Plain<PluginVersionDetailResponse>> {
  const row = await findVisibleVersion(db, userId, pluginVersionId);
  const components = await listComponents(db, row.id);
  return {
    ...toVersionSummary(row),
    manifestSchemaVersion: row.manifestSchemaVersion,
    changelog: row.changelog ?? null,
    executionBlockedAt: row.executionBlockedAt?.toISOString() ?? null,
    components,
  };
}

/** What a version contains, from the scan taken at ingestion, for the review before install. */
export async function getPluginVersionReview(
  db: Db,
  userId: string,
  pluginVersionId: string,
): Promise<Plain<PluginVersionReviewResponse>> {
  const row = await findVisibleVersion(db, userId, pluginVersionId);
  const plugin = await findVisiblePlugin(db, userId, row.pluginId);
  const scan = scanOf(row);
  return {
    id: row.id,
    pluginId: row.pluginId,
    pluginName: plugin.name,
    version: row.version,
    scanned: scan !== null,
    fileCount: scan?.fileCount ?? 0,
    totalBytes: scan?.totalBytes ?? 0,
    components: (scan?.components ?? []).map(({ kind, name, description }) => ({
      kind,
      name,
      description,
    })),
    hookCommands: scan?.hookCommands ?? [],
    mcpServers: scan?.mcpServers ?? [],
    variables: scan?.variables ?? [],
    skipped: scan?.skipped ?? [],
    findingCount: scan?.findings.length ?? 0,
  };
}

/**
 * Resolves a published, non-blocked version for installation or connection
 * setup, together with its plugin.
 */
export async function resolvePluginVersion(
  db: Db,
  pluginVersionId: string,
): Promise<{
  plugin: typeof pluginTable.$inferSelect;
  version: typeof pluginVersionTable.$inferSelect;
}> {
  const versions = await db
    .select()
    .from(pluginVersionTable)
    .where(
      and(eq(pluginVersionTable.id, pluginVersionId), eq(pluginVersionTable.status, 'published')),
    )
    .limit(1);
  const version = versions[0];
  if (!version) throw notFound();
  if (version.executionBlockedAt) throw conflict();

  const plugins = await db
    .select()
    .from(pluginTable)
    .where(eq(pluginTable.id, version.pluginId))
    .limit(1);
  const plugin = plugins[0];
  if (!plugin || plugin.status === 'suspended') throw notFound();
  return { plugin, version };
}
