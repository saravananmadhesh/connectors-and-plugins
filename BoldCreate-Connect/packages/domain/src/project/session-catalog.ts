/**
 * What a session's user may browse and install for themselves. The project's mode decides: `off`
 * shows nothing, `allowlist` shows the allowed plugins and the members of its sets, `any` shows
 * everything the project could offer. Each item says whether the user has it installed.
 */
import { and, eq, inArray, sql, type SQL } from 'drizzle-orm';
import { installationTable, pluginTable, type Executor } from '@boldcreate-integrations/db';
import type {
  PluginListQuery,
  Plain,
  SessionCatalogItem,
} from '@boldcreate-integrations/contracts';
import { listOrgCatalog } from '../marketplace/plugins.js';
import { getUserInstallMode } from './allowed-catalog.js';
import type { ProjectScope } from './project-users.js';

export type SessionCatalogPage = {
  items: Plain<SessionCatalogItem>[];
  total: number;
  page: number;
  pageSize: number;
};

function allowedIds(project: ProjectScope): SQL {
  return sql`${pluginTable.id} IN (
    SELECT a.plugin_id FROM project_allowed_plugin a WHERE a.project_id = ${project.projectId}
    UNION
    SELECT m.plugin_id FROM project_plugin_set_member m
      JOIN project_plugin_set s ON s.id = m.set_id WHERE s.project_id = ${project.projectId}
  )`;
}

export async function listSessionCatalog(
  tx: Executor,
  project: ProjectScope,
  userId: string,
  query: PluginListQuery,
): Promise<SessionCatalogPage> {
  const mode = await getUserInstallMode(tx, project);
  if (mode === 'off') return { items: [], total: 0, page: query.page, pageSize: query.limit };
  const page = await listOrgCatalog(
    tx,
    project.organizationId,
    query,
    mode === 'allowlist' ? [allowedIds(project)] : [],
  );
  const ids = page.items.map((item) => item.id);
  const installed = new Set<string>();
  if (ids.length > 0) {
    const rows = await tx
      .select({ pluginId: installationTable.pluginId })
      .from(installationTable)
      .where(
        and(
          eq(installationTable.organizationId, project.organizationId),
          eq(installationTable.scopeType, 'user'),
          eq(installationTable.projectId, project.projectId),
          eq(installationTable.ownerUserId, userId),
          eq(installationTable.status, 'active'),
          inArray(installationTable.pluginId, ids),
        ),
      );
    for (const row of rows) installed.add(row.pluginId);
  }
  return {
    ...page,
    items: page.items.map((item) => ({ ...item, installed: installed.has(item.id) })),
  };
}
