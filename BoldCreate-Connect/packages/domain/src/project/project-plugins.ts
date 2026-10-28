/**
 * The plugins a project delivers to its users, and the settings those plugins need. A project
 * plugin is an installation of the `project` scope: every user of the project receives it, and a
 * person's own install of the same plugin comes next to it. The host calls these with a project
 * key; people managing the organization call the same functions from the console, after the route
 * has checked their role.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, desc, eq, isNull, ne, or, sql, type SQL } from 'drizzle-orm';
import {
  componentTable,
  decodeCursor,
  encodeCursor,
  installationComponentTable,
  installationTable,
  mcpServerTable,
  pluginTable,
  pluginVersionTable,
  projectTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  PageQuery,
  Plain,
  ProjectPluginResponse,
  PutVariablesBody,
  VariableStatus,
} from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { writeAudit, type AuditEntry } from '../audit/write-audit.js';
import { conflict, isUniqueViolation, limitExceeded, notFound } from '../errors.js';
import { writeVariables } from '../installation/variables.js';
import type { ProjectScope } from './project-users.js';
import { revokeSessionsForPlugin } from './sessions.js';

/** The project a call changes and who is calling, for the audit trail and the install rows. */
export interface ProjectCaller extends ProjectScope {
  actor: AuditEntry['actor'];
}

type InstallationRow = typeof installationTable.$inferSelect;
type PluginView = Plain<ProjectPluginResponse>;

export const projectInstalls = (project: ProjectScope) =>
  and(
    eq(installationTable.organizationId, project.organizationId),
    eq(installationTable.scopeType, 'project'),
    eq(installationTable.projectId, project.projectId),
    eq(installationTable.status, 'active'),
  );

export function pluginView(
  installation: Pick<InstallationRow, 'createdAt' | 'updatedAt' | 'pluginVersionId'>,
  plugin: { id: string; name: string; displayName: string },
  version: string,
): PluginView {
  return {
    pluginId: plugin.id,
    name: plugin.name,
    displayName: plugin.displayName,
    versionId: installation.pluginVersionId,
    version,
    createdAt: installation.createdAt.toISOString(),
    updatedAt: installation.updatedAt.toISOString(),
  };
}

export async function listProjectPlugins(
  tx: Executor,
  project: ProjectScope,
  query: PageQuery,
): Promise<{ items: PluginView[]; nextCursor: string | null }> {
  return installPage(tx, projectInstalls(project), query);
}

/** One page of installations, oldest first, shown as the plugins they install. */
export async function installPage(
  tx: Executor,
  scope: SQL | undefined,
  query: PageQuery,
): Promise<{ items: PluginView[]; nextCursor: string | null }> {
  const after = query.cursor ? decodeCursor(query.cursor) : null;
  const rows = await tx
    .select({
      installation: installationTable,
      plugin: pluginTable,
      version: pluginVersionTable.version,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(pluginVersionTable, eq(pluginVersionTable.id, installationTable.pluginVersionId))
    .where(
      and(
        scope,
        after
          ? sql`(${installationTable.createdAt}, ${installationTable.id}) > (${new Date(after.createdAt).toISOString()}::timestamptz, ${after.id}::uuid)`
          : undefined,
      ),
    )
    .orderBy(asc(installationTable.createdAt), asc(installationTable.id))
    .limit(query.limit + 1);
  const page = rows.slice(0, query.limit);
  const last = page[page.length - 1];
  return {
    items: page.map((row) => pluginView(row.installation, row.plugin, row.version)),
    nextCursor:
      rows.length > query.limit && last
        ? encodeCursor(last.installation.createdAt, last.installation.id)
        : null,
  };
}

/** A plugin the project may use: not suspended, and public or published by the same organization. */
export async function usablePlugin(
  tx: Executor,
  project: ProjectScope,
  pluginId: string,
): Promise<typeof pluginTable.$inferSelect> {
  const [plugin] = await tx
    .select()
    .from(pluginTable)
    .where(
      and(
        eq(pluginTable.id, pluginId),
        ne(pluginTable.status, 'suspended'),
        or(
          eq(pluginTable.visibility, 'public'),
          eq(pluginTable.publisherOrganizationId, project.organizationId),
        ),
      ),
    )
    .limit(1);
  if (!plugin) throw notFound();
  return plugin;
}

/** The version named, or the newest published one that is not blocked. */
export async function chooseVersion(
  tx: Executor,
  plugin: { id: string },
  versionId: string | undefined,
): Promise<typeof pluginVersionTable.$inferSelect> {
  if (versionId !== undefined) {
    const [named] = await tx
      .select()
      .from(pluginVersionTable)
      .where(
        and(
          eq(pluginVersionTable.id, versionId),
          eq(pluginVersionTable.pluginId, plugin.id),
          eq(pluginVersionTable.status, 'published'),
        ),
      )
      .limit(1);
    if (!named) throw notFound();
    if (named.executionBlockedAt) throw conflict();
    return named;
  }
  const [latest] = await tx
    .select()
    .from(pluginVersionTable)
    .where(
      and(
        eq(pluginVersionTable.pluginId, plugin.id),
        eq(pluginVersionTable.status, 'published'),
        isNull(pluginVersionTable.executionBlockedAt),
      ),
    )
    .orderBy(
      desc(pluginVersionTable.major),
      desc(pluginVersionTable.minor),
      desc(pluginVersionTable.patch),
      desc(pluginVersionTable.publishedAt),
    )
    .limit(1);
  if (!latest) throw notFound();
  return latest;
}

/** The person the install rows name: the one calling from the console, else the project's creator. */
async function attributedUser(tx: Executor, caller: ProjectCaller): Promise<string> {
  if (caller.actor.kind === 'user_session') return caller.actor.id;
  const [project] = await tx
    .select({ createdBy: projectTable.createdBy })
    .from(projectTable)
    .where(eq(projectTable.id, caller.projectId))
    .limit(1);
  if (!project) throw notFound();
  return project.createdBy;
}

function installAudit(
  caller: ProjectCaller,
  action: 'installation.created' | 'installation.upgraded' | 'installation.deleted',
  installationId: string,
  context: Record<string, string>,
): AuditEntry {
  return {
    actor: caller.actor,
    action,
    target: { kind: 'installation', id: installationId },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    context: { scope: 'project', ...context },
  };
}

/** Components of the new version, with the on/off choice kept for the ones that keep their name. */
export async function replaceComponents(
  tx: Executor,
  caller: ProjectScope,
  installationId: string,
  versionId: string,
  now: Date,
): Promise<void> {
  const previous = await tx
    .select({ name: componentTable.name, enabled: installationComponentTable.enabled })
    .from(installationComponentTable)
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(eq(installationComponentTable.installationId, installationId));
  const enabledBefore = new Map(previous.map((row) => [row.name, row.enabled]));
  await tx
    .delete(installationComponentTable)
    .where(eq(installationComponentTable.installationId, installationId));
  const components = await tx
    .select()
    .from(componentTable)
    .where(eq(componentTable.pluginVersionId, versionId));
  if (components.length === 0) return;
  await tx.insert(installationComponentTable).values(
    components.map((component) => ({
      installationId,
      organizationId: caller.organizationId,
      componentId: component.id,
      pluginVersionId: versionId,
      enabled: enabledBefore.get(component.name) ?? true,
      alias: null,
      createdAt: now,
      updatedAt: now,
    })),
  );
}

/**
 * Adds a plugin to the project, or moves it to another version. A repeat with nothing to change
 * answers the same state, so a host can call it on every deploy. `created` tells a new install
 * from an existing one.
 */
export async function putProjectPlugin(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
  versionId: string | undefined,
): Promise<{ created: boolean; plugin: PluginView }> {
  const plugin = await usablePlugin(tx, caller, pluginId);
  const [existing] = await tx
    .select()
    .from(installationTable)
    .where(and(projectInstalls(caller), eq(installationTable.pluginId, plugin.id)))
    .limit(1)
    .for('update');

  if (existing) {
    if (versionId === undefined || versionId === existing.pluginVersionId) {
      const [current] = await tx
        .select({ version: pluginVersionTable.version })
        .from(pluginVersionTable)
        .where(eq(pluginVersionTable.id, existing.pluginVersionId))
        .limit(1);
      return { created: false, plugin: pluginView(existing, plugin, current?.version ?? '') };
    }
    const target = await chooseVersion(tx, plugin, versionId);
    const now = new Date();
    await tx.transaction(async (inner) => {
      await inner
        .update(installationTable)
        .set({ pluginVersionId: target.id, updatedAt: now })
        .where(eq(installationTable.id, existing.id));
      await replaceComponents(inner, caller, existing.id, target.id, now);
      await writeAudit(
        inner,
        installAudit(caller, 'installation.upgraded', existing.id, { pluginVersionId: target.id }),
      );
    });
    return {
      created: false,
      plugin: pluginView(
        { ...existing, pluginVersionId: target.id, updatedAt: now },
        plugin,
        target.version,
      ),
    };
  }

  const [{ n } = { n: 0 }] = await tx
    .select({ n: sql<number>`count(*)::int` })
    .from(installationTable)
    .where(projectInstalls(caller));
  if (n >= PROJECT_LIMITS.pluginsPerProject) throw limitExceeded();

  const target = await chooseVersion(tx, plugin, versionId);
  const person = await attributedUser(tx, caller);
  const id = randomUUID();
  const now = new Date();
  try {
    await tx.transaction(async (inner) => {
      await inner.insert(installationTable).values({
        id,
        organizationId: caller.organizationId,
        scopeType: 'project',
        projectId: caller.projectId,
        createdBy: person,
        installedBy: person,
        pluginId: plugin.id,
        pluginVersionId: target.id,
        status: 'active',
        updatePolicy: 'pinned',
        required: false,
        createdAt: now,
        updatedAt: now,
      });
      await replaceComponents(inner, caller, id, target.id, now);
      await writeAudit(
        inner,
        installAudit(caller, 'installation.created', id, { pluginId: plugin.id }),
      );
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
  return {
    created: true,
    plugin: pluginView(
      { createdAt: now, updatedAt: now, pluginVersionId: target.id },
      plugin,
      target.version,
    ),
  };
}

/** Removes the plugin and its settings from the project. A plugin the project does not have is `not_found`. */
export async function removeProjectPlugin(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
): Promise<void> {
  const [existing] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(and(projectInstalls(caller), eq(installationTable.pluginId, pluginId)))
    .limit(1)
    .for('update');
  if (!existing) throw notFound();
  await tx.transaction(async (inner) => {
    await inner.delete(installationTable).where(eq(installationTable.id, existing.id));
    await writeAudit(
      inner,
      installAudit(caller, 'installation.deleted', existing.id, { pluginId }),
    );
    await revokeSessionsForPlugin(inner, caller, pluginId);
  });
}

async function authConfigRows(tx: Executor, project: ProjectScope, componentId?: string) {
  return tx
    .select({
      installationId: installationTable.id,
      pluginVersionId: installationTable.pluginVersionId,
      pluginId: pluginTable.id,
      pluginName: pluginTable.name,
      componentId: componentTable.id,
      componentName: componentTable.name,
      server: mcpServerTable,
    })
    .from(installationTable)
    .innerJoin(pluginTable, eq(pluginTable.id, installationTable.pluginId))
    .innerJoin(
      installationComponentTable,
      eq(installationComponentTable.installationId, installationTable.id),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .leftJoin(
      mcpServerTable,
      and(
        eq(mcpServerTable.installationId, installationComponentTable.installationId),
        eq(mcpServerTable.componentId, installationComponentTable.componentId),
      ),
    )
    .where(
      and(
        projectInstalls(project),
        eq(componentTable.kind, 'mcp'),
        componentId !== undefined ? eq(componentTable.id, componentId) : undefined,
      ),
    )
    .orderBy(asc(pluginTable.name), asc(componentTable.name), asc(componentTable.id));
}

/**
 * Sets, keeps or removes the variables of the plugin a component belongs to. A component that is
 * not an MCP component of this project's plugins is `not_found`.
 */
export async function putProjectAuthConfigVariables(
  tx: Executor,
  caller: ProjectCaller,
  componentId: string,
  body: PutVariablesBody,
  sealer: Sealer,
): Promise<Plain<VariableStatus>[]> {
  const [row] = await authConfigRows(tx, caller, componentId);
  if (!row) throw notFound();
  return writeVariables(
    tx,
    { id: row.installationId, pluginVersionId: row.pluginVersionId },
    { organizationId: caller.organizationId, scopeType: 'project' },
    {
      actor: caller.actor,
      updatedBy: caller.actor.kind === 'user_session' ? caller.actor.id : null,
      projectId: caller.projectId,
    },
    body,
    sealer,
  );
}
