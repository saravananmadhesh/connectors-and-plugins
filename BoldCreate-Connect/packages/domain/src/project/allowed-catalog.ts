/**
 * Which plugins a project's users may install for themselves. The project sets a mode: `off` (no
 * one installs), `allowlist` (only plugins listed directly or through a set) or `any` (anything the
 * project could offer). Plugins already installed stay when the list shrinks; the host removes them.
 */
import { and, asc, eq, sql } from 'drizzle-orm';
import {
  decodeCursor,
  encodeCursor,
  pluginTable,
  projectAllowedPluginTable,
  projectPluginSetMemberTable,
  projectPluginSetTable,
  projectTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  AllowedPluginResponse,
  PageQuery,
  Plain,
  UserInstallMode,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { writeAudit } from '../audit/write-audit.js';
import { appError, limitExceeded, notFound } from '../errors.js';
import { inOrgCatalog } from '../marketplace/plugins.js';
import type { ProjectCaller } from './project-plugins.js';
import type { ProjectScope } from './project-users.js';

export async function getUserInstallMode(
  tx: Executor,
  project: ProjectScope,
): Promise<UserInstallMode> {
  const [row] = await tx
    .select({ mode: projectTable.userInstallMode })
    .from(projectTable)
    .where(eq(projectTable.id, project.projectId))
    .limit(1);
  if (!row) throw notFound();
  return row.mode;
}

export async function setUserInstallMode(
  tx: Executor,
  caller: ProjectCaller,
  mode: UserInstallMode,
): Promise<UserInstallMode> {
  const updated = await tx
    .update(projectTable)
    .set({ userInstallMode: mode, updatedAt: new Date() })
    .where(eq(projectTable.id, caller.projectId))
    .returning({ id: projectTable.id });
  if (updated.length === 0) throw notFound();
  await writeAudit(tx, {
    actor: caller.actor,
    action: 'project.updated',
    target: { kind: 'project', id: caller.projectId },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    context: { userInstallMode: mode },
  });
  return mode;
}

/** A plugin the project's own catalog offers, or `unprocessable` for one it cannot offer. */
export async function offeredPlugin(
  tx: Executor,
  organizationId: string,
  pluginId: string,
): Promise<typeof pluginTable.$inferSelect> {
  const [plugin] = await tx
    .select()
    .from(pluginTable)
    .where(and(eq(pluginTable.id, pluginId), inOrgCatalog(organizationId)))
    .limit(1);
  if (!plugin) throw appError('unprocessable');
  return plugin;
}

/** Locks the project row so counts and inserts of its lists happen one caller at a time. */
export async function lockProjectRow(tx: Executor, projectId: string): Promise<void> {
  const rows = await tx
    .select({ id: projectTable.id })
    .from(projectTable)
    .where(eq(projectTable.id, projectId))
    .for('update');
  if (rows.length === 0) throw notFound();
}

function allowedView(
  allowedAt: Date,
  plugin: { id: string; name: string; displayName: string },
): Plain<AllowedPluginResponse> {
  return {
    pluginId: plugin.id,
    name: plugin.name,
    displayName: plugin.displayName,
    allowedAt: allowedAt.toISOString(),
  };
}

export async function addAllowedPlugin(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
): Promise<{ created: boolean; allowed: Plain<AllowedPluginResponse> }> {
  return tx.transaction(async (inner) => {
    await lockProjectRow(inner, caller.projectId);
    const plugin = await offeredPlugin(inner, caller.organizationId, pluginId);
    const [existing] = await inner
      .select()
      .from(projectAllowedPluginTable)
      .where(
        and(
          eq(projectAllowedPluginTable.projectId, caller.projectId),
          eq(projectAllowedPluginTable.pluginId, plugin.id),
        ),
      )
      .limit(1);
    if (existing) {
      return { created: false, allowed: allowedView(existing.createdAt, plugin) };
    }
    const [{ n } = { n: 0 }] = await inner
      .select({ n: sql<number>`count(*)::int` })
      .from(projectAllowedPluginTable)
      .where(eq(projectAllowedPluginTable.projectId, caller.projectId));
    if (n >= PROJECT_LIMITS.allowedPluginsPerProject) throw limitExceeded();
    const now = new Date();
    await inner
      .insert(projectAllowedPluginTable)
      .values({ projectId: caller.projectId, pluginId: plugin.id, createdAt: now });
    await writeAudit(inner, {
      actor: caller.actor,
      action: 'project_plugin.allowed',
      target: { kind: 'plugin', id: plugin.id },
      orgId: caller.organizationId,
      projectId: caller.projectId,
      context: { pluginId: plugin.id },
    });
    return { created: true, allowed: allowedView(now, plugin) };
  });
}

export async function removeAllowedPlugin(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
): Promise<void> {
  const removed = await tx
    .delete(projectAllowedPluginTable)
    .where(
      and(
        eq(projectAllowedPluginTable.projectId, caller.projectId),
        eq(projectAllowedPluginTable.pluginId, pluginId),
      ),
    )
    .returning({ pluginId: projectAllowedPluginTable.pluginId });
  if (removed.length === 0) throw notFound();
  await writeAudit(tx, {
    actor: caller.actor,
    action: 'project_plugin.disallowed',
    target: { kind: 'plugin', id: pluginId },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    context: { pluginId },
  });
}

export async function listAllowed(
  tx: Executor,
  project: ProjectScope,
  query: PageQuery,
): Promise<{ items: Plain<AllowedPluginResponse>[]; nextCursor: string | null }> {
  const after = query.cursor ? decodeCursor(query.cursor) : null;
  const rows = await tx
    .select({ allowedAt: projectAllowedPluginTable.createdAt, plugin: pluginTable })
    .from(projectAllowedPluginTable)
    .innerJoin(pluginTable, eq(pluginTable.id, projectAllowedPluginTable.pluginId))
    .where(
      and(
        eq(projectAllowedPluginTable.projectId, project.projectId),
        after
          ? sql`(${projectAllowedPluginTable.createdAt}, ${projectAllowedPluginTable.pluginId}) > (${new Date(after.createdAt).toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(projectAllowedPluginTable.createdAt), asc(projectAllowedPluginTable.pluginId))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  return {
    items: page.map((row) => allowedView(row.allowedAt, row.plugin)),
    nextCursor:
      rows.length > query.limit && last ? encodeCursor(last.allowedAt, last.plugin.id) : null,
  };
}

/**
 * Whether the project's users may install this plugin for themselves: the mode is `any` and the
 * project can offer it, or the mode is `allowlist` and it is listed directly or in a set.
 */
export async function canUserInstall(
  tx: Executor,
  project: ProjectScope,
  pluginId: string,
): Promise<boolean> {
  const mode = await getUserInstallMode(tx, project);
  if (mode === 'off') return false;
  const [offered] = await tx
    .select({ id: pluginTable.id })
    .from(pluginTable)
    .where(and(eq(pluginTable.id, pluginId), inOrgCatalog(project.organizationId)))
    .limit(1);
  if (!offered) return false;
  if (mode === 'any') return true;
  const [direct] = await tx
    .select({ pluginId: projectAllowedPluginTable.pluginId })
    .from(projectAllowedPluginTable)
    .where(
      and(
        eq(projectAllowedPluginTable.projectId, project.projectId),
        eq(projectAllowedPluginTable.pluginId, pluginId),
      ),
    )
    .limit(1);
  if (direct) return true;
  const [viaSet] = await tx
    .select({ pluginId: projectPluginSetMemberTable.pluginId })
    .from(projectPluginSetMemberTable)
    .innerJoin(
      projectPluginSetTable,
      eq(projectPluginSetTable.id, projectPluginSetMemberTable.setId),
    )
    .where(
      and(
        eq(projectPluginSetTable.projectId, project.projectId),
        eq(projectPluginSetMemberTable.pluginId, pluginId),
      ),
    )
    .limit(1);
  return viaSet !== undefined;
}
