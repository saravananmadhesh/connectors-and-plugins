/**
 * Named groups of plugins a project keeps, so the host can allow or hand out several plugins by
 * one name. A set holds plugin ids, so renaming a plugin does not change it, and deleting a set
 * changes nothing for a session that already used it.
 */
import { and, asc, eq, inArray, sql } from 'drizzle-orm';
import {
  decodeCursor,
  encodeCursor,
  pluginTable,
  projectPluginSetMemberTable,
  projectPluginSetTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type { PageQuery, Plain, PluginSetResponse } from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { randomUUID } from 'node:crypto';
import { writeAudit, type AuditEntry } from '../audit/write-audit.js';
import { appError, conflict, isUniqueViolation, limitExceeded, notFound } from '../errors.js';
import { lockProjectRow, offeredPlugin } from './allowed-catalog.js';
import type { ProjectCaller } from './project-plugins.js';
import type { ProjectScope } from './project-users.js';

type SetRow = typeof projectPluginSetTable.$inferSelect;
type SetView = Plain<PluginSetResponse>;

function setAudit(
  caller: ProjectCaller,
  action: 'plugin_set.created' | 'plugin_set.updated' | 'plugin_set.deleted',
  setId: string,
  context: Record<string, unknown>,
): AuditEntry {
  return {
    actor: caller.actor,
    action,
    target: { kind: 'plugin_set', id: setId },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    context,
  };
}

async function membersOf(tx: Executor, setIds: string[]): Promise<Map<string, SetView['plugins']>> {
  const members = new Map<string, SetView['plugins']>();
  if (setIds.length === 0) return members;
  const rows = await tx
    .select({
      setId: projectPluginSetMemberTable.setId,
      pluginId: pluginTable.id,
      name: pluginTable.name,
      displayName: pluginTable.displayName,
    })
    .from(projectPluginSetMemberTable)
    .innerJoin(pluginTable, eq(pluginTable.id, projectPluginSetMemberTable.pluginId))
    .where(inArray(projectPluginSetMemberTable.setId, setIds))
    .orderBy(asc(pluginTable.name), asc(pluginTable.id));
  for (const row of rows) {
    const list = members.get(row.setId) ?? [];
    list.push({ pluginId: row.pluginId, name: row.name, displayName: row.displayName });
    members.set(row.setId, list);
  }
  return members;
}

function view(row: SetRow, plugins: SetView['plugins']): SetView {
  return {
    id: row.id,
    name: row.name,
    plugins,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function findSet(tx: Executor, project: ProjectScope, setId: string): Promise<SetRow> {
  const [row] = await tx
    .select()
    .from(projectPluginSetTable)
    .where(
      and(
        eq(projectPluginSetTable.id, setId),
        eq(projectPluginSetTable.projectId, project.projectId),
      ),
    )
    .limit(1);
  if (!row) throw notFound();
  return row;
}

async function viewOf(tx: Executor, row: SetRow): Promise<SetView> {
  const members = await membersOf(tx, [row.id]);
  return view(row, members.get(row.id) ?? []);
}

export async function createPluginSet(
  tx: Executor,
  caller: ProjectCaller,
  body: { name: string; plugins?: string[] | undefined },
): Promise<SetView> {
  const pluginIds = [...new Set(body.plugins ?? [])];
  if (pluginIds.length > PROJECT_LIMITS.pluginsPerSet) throw limitExceeded();
  try {
    return await tx.transaction(async (inner) => {
      await lockProjectRow(inner, caller.projectId);
      const [{ n } = { n: 0 }] = await inner
        .select({ n: sql<number>`count(*)::int` })
        .from(projectPluginSetTable)
        .where(eq(projectPluginSetTable.projectId, caller.projectId));
      if (n >= PROJECT_LIMITS.setsPerProject) throw limitExceeded();
      for (const pluginId of pluginIds) await offeredPlugin(inner, caller.organizationId, pluginId);
      const id = randomUUID();
      const now = new Date();
      const [row] = await inner
        .insert(projectPluginSetTable)
        .values({
          id,
          projectId: caller.projectId,
          name: body.name,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
      if (pluginIds.length > 0) {
        await inner
          .insert(projectPluginSetMemberTable)
          .values(pluginIds.map((pluginId) => ({ setId: id, pluginId })));
      }
      await writeAudit(inner, setAudit(caller, 'plugin_set.created', id, { name: body.name }));
      return viewOf(inner, row!);
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

export async function getPluginSet(
  tx: Executor,
  project: ProjectScope,
  setId: string,
): Promise<SetView> {
  return viewOf(tx, await findSet(tx, project, setId));
}

export async function listPluginSets(
  tx: Executor,
  project: ProjectScope,
  query: PageQuery,
): Promise<{ items: SetView[]; nextCursor: string | null }> {
  const after = query.cursor ? decodeCursor(query.cursor) : null;
  const rows = await tx
    .select()
    .from(projectPluginSetTable)
    .where(
      and(
        eq(projectPluginSetTable.projectId, project.projectId),
        after
          ? sql`(${projectPluginSetTable.createdAt}, ${projectPluginSetTable.id}) > (${new Date(after.createdAt).toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(projectPluginSetTable.createdAt), asc(projectPluginSetTable.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const members = await membersOf(
    tx,
    page.map((row) => row.id),
  );
  const last = page[page.length - 1];
  return {
    items: page.map((row) => view(row, members.get(row.id) ?? [])),
    nextCursor: rows.length > query.limit && last ? encodeCursor(last.createdAt, last.id) : null,
  };
}

export async function renamePluginSet(
  tx: Executor,
  caller: ProjectCaller,
  setId: string,
  name: string,
): Promise<SetView> {
  await findSet(tx, caller, setId);
  try {
    return await tx.transaction(async (inner) => {
      const [row] = await inner
        .update(projectPluginSetTable)
        .set({ name, updatedAt: new Date() })
        .where(eq(projectPluginSetTable.id, setId))
        .returning();
      await writeAudit(inner, setAudit(caller, 'plugin_set.updated', setId, { name }));
      return viewOf(inner, row!);
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

export async function deletePluginSet(
  tx: Executor,
  caller: ProjectCaller,
  setId: string,
): Promise<void> {
  const set = await findSet(tx, caller, setId);
  await tx.transaction(async (inner) => {
    await inner.delete(projectPluginSetTable).where(eq(projectPluginSetTable.id, setId));
    await writeAudit(inner, setAudit(caller, 'plugin_set.deleted', setId, { name: set.name }));
  });
}

/** Adds a plugin to the set. A repeat answers the same set. */
export async function addSetMember(
  tx: Executor,
  caller: ProjectCaller,
  setId: string,
  pluginId: string,
): Promise<SetView> {
  return tx.transaction(async (inner) => {
    const set = await findSet(inner, caller, setId);
    await offeredPlugin(inner, caller.organizationId, pluginId);
    const [present] = await inner
      .select({ pluginId: projectPluginSetMemberTable.pluginId })
      .from(projectPluginSetMemberTable)
      .where(
        and(
          eq(projectPluginSetMemberTable.setId, setId),
          eq(projectPluginSetMemberTable.pluginId, pluginId),
        ),
      )
      .limit(1);
    if (!present) {
      await lockProjectRow(inner, caller.projectId);
      const [{ n } = { n: 0 }] = await inner
        .select({ n: sql<number>`count(*)::int` })
        .from(projectPluginSetMemberTable)
        .where(eq(projectPluginSetMemberTable.setId, setId));
      if (n >= PROJECT_LIMITS.pluginsPerSet) throw limitExceeded();
      await inner.insert(projectPluginSetMemberTable).values({ setId, pluginId });
      await inner
        .update(projectPluginSetTable)
        .set({ updatedAt: new Date() })
        .where(eq(projectPluginSetTable.id, setId));
      await writeAudit(
        inner,
        setAudit(caller, 'plugin_set.updated', setId, { name: set.name, added: pluginId }),
      );
    }
    return viewOf(inner, await findSet(inner, caller, setId));
  });
}

export async function removeSetMember(
  tx: Executor,
  caller: ProjectCaller,
  setId: string,
  pluginId: string,
): Promise<void> {
  const set = await findSet(tx, caller, setId);
  await tx.transaction(async (inner) => {
    const removed = await inner
      .delete(projectPluginSetMemberTable)
      .where(
        and(
          eq(projectPluginSetMemberTable.setId, setId),
          eq(projectPluginSetMemberTable.pluginId, pluginId),
        ),
      )
      .returning({ pluginId: projectPluginSetMemberTable.pluginId });
    if (removed.length === 0) throw notFound();
    await inner
      .update(projectPluginSetTable)
      .set({ updatedAt: new Date() })
      .where(eq(projectPluginSetTable.id, setId));
    await writeAudit(
      inner,
      setAudit(caller, 'plugin_set.updated', setId, { name: set.name, removed: pluginId }),
    );
  });
}

/** The plugins in the set with this name, or `unprocessable` when the project has no such set. */
export async function expandSet(
  tx: Executor,
  project: ProjectScope,
  name: string,
): Promise<{ pluginId: string; name: string }[]> {
  const [set] = await tx
    .select()
    .from(projectPluginSetTable)
    .where(
      and(
        eq(projectPluginSetTable.projectId, project.projectId),
        eq(projectPluginSetTable.name, name),
      ),
    )
    .limit(1);
  if (!set) throw appError('unprocessable');
  const members = await membersOf(tx, [set.id]);
  return (members.get(set.id) ?? []).map((plugin) => ({
    pluginId: plugin.pluginId,
    name: plugin.name,
  }));
}
