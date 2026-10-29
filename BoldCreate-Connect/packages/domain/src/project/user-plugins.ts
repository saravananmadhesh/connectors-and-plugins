/**
 * The plugins one project user installs for themselves. A user install is an installation of the
 * `user` scope that also names the project, so it is delivered to that user in that project only
 * and wins over the project's own install of the same plugin. The host calls these for a user with
 * a project key; a session calls them for its own user, with the allowed catalog applied.
 */
import { randomUUID } from 'node:crypto';
import { and, eq, ne, sql } from 'drizzle-orm';
import {
  installationComponentTable,
  installationTable,
  pluginVersionTable,
  userComponentPreferenceTable,
  userTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  PageQuery,
  Plain,
  ProjectPluginResponse,
  PutVariablesBody,
} from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { PROJECT_LIMITS } from '@boldcreate-integrations/limits';
import { writeAudit, type AuditEntry } from '../audit/write-audit.js';
import { writeVariables } from '../installation/variables.js';
import { appError, conflict, isUniqueViolation, limitExceeded, notFound } from '../errors.js';
import { canUserInstall } from './allowed-catalog.js';
import {
  chooseVersion,
  installPage,
  pluginView,
  replaceComponents,
  usablePlugin,
  type ProjectCaller,
} from './project-plugins.js';
import { ensureProjectUser } from './project-users.js';

type PluginView = Plain<ProjectPluginResponse>;

const userInstalls = (caller: ProjectCaller, userId: string) =>
  and(
    eq(installationTable.organizationId, caller.organizationId),
    eq(installationTable.scopeType, 'user'),
    eq(installationTable.projectId, caller.projectId),
    eq(installationTable.ownerUserId, userId),
    eq(installationTable.status, 'active'),
  );

function userAudit(
  caller: ProjectCaller,
  action:
    | 'user_plugin.installed'
    | 'user_plugin.updated'
    | 'user_plugin.removed'
    | 'user_plugin.component_updated',
  userId: string,
  installationId: string,
  context: Record<string, string>,
): AuditEntry {
  return {
    actor: caller.actor,
    action,
    target: { kind: 'installation', id: installationId },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    subjectUserId: userId,
    context: { scope: 'user', ...context },
  };
}

/** A live user of this project, or `not_found` for anyone else, including users of other projects. */
export async function requireProjectUser(tx: Executor, caller: ProjectCaller, userId: string) {
  const [user] = await tx
    .select({ id: userTable.id, status: userTable.status })
    .from(userTable)
    .where(
      and(
        eq(userTable.id, userId),
        eq(userTable.projectId, caller.projectId),
        eq(userTable.kind, 'external'),
        ne(userTable.status, 'deleted'),
      ),
    )
    .limit(1);
  if (!user) throw notFound();
  return user;
}

/** The platform id of the project user the host names, or null when the project has no such user. */
export async function findUserByRef(
  tx: Executor,
  caller: ProjectCaller,
  externalRef: string,
): Promise<string | null> {
  const [user] = await tx
    .select({ id: userTable.id })
    .from(userTable)
    .where(
      and(
        eq(userTable.projectId, caller.projectId),
        eq(userTable.externalRef, externalRef),
        eq(userTable.kind, 'external'),
        ne(userTable.status, 'deleted'),
      ),
    )
    .limit(1);
  return user?.id ?? null;
}

/** The platform id of the user the host names, made on first use. */
export async function ensureUserByRef(
  tx: Executor,
  caller: ProjectCaller,
  externalRef: string,
): Promise<string> {
  const { user } = await ensureProjectUser(
    tx,
    {
      projectId: caller.projectId,
      organizationId: caller.organizationId,
      keyRowId: caller.actor.kind === 'api_key' ? caller.actor.id : '',
      ...(caller.actor.kind === 'user_session' ? { consoleUserId: caller.actor.id } : {}),
    },
    externalRef,
  );
  return user.id;
}

/**
 * Installs a plugin for the user, or moves their install to another version. With `checkAllowed`
 * the project's allowed catalog applies and a plugin outside it is `install_not_allowed`; the
 * host's own calls skip that rule. `created` tells a new install from an existing one.
 */
export async function installForUser(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
  versionId: string | undefined,
  options: { checkAllowed: boolean },
): Promise<{ created: boolean; plugin: PluginView }> {
  await requireProjectUser(tx, caller, userId);
  if (options.checkAllowed && !(await canUserInstall(tx, caller, pluginId))) {
    throw appError('install_not_allowed');
  }
  const plugin = await usablePlugin(tx, caller, pluginId);
  const [existing] = await tx
    .select()
    .from(installationTable)
    .where(and(userInstalls(caller, userId), eq(installationTable.pluginId, plugin.id)))
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
        userAudit(caller, 'user_plugin.updated', userId, existing.id, {
          pluginVersionId: target.id,
        }),
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
    .where(userInstalls(caller, userId));
  if (n >= PROJECT_LIMITS.installsPerProjectUser) throw limitExceeded();

  const target = await chooseVersion(tx, plugin, versionId);
  const id = randomUUID();
  const now = new Date();
  try {
    await tx.transaction(async (inner) => {
      await inner.insert(installationTable).values({
        id,
        organizationId: caller.organizationId,
        scopeType: 'user',
        projectId: caller.projectId,
        ownerUserId: userId,
        createdBy: userId,
        installedBy: userId,
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
        userAudit(caller, 'user_plugin.installed', userId, id, { pluginId: plugin.id }),
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

/** Removes the user's own install. A plugin the user did not install themselves is `not_found`. */
export async function uninstallForUser(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
): Promise<void> {
  await requireProjectUser(tx, caller, userId);
  const [existing] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(and(userInstalls(caller, userId), eq(installationTable.pluginId, pluginId)))
    .limit(1)
    .for('update');
  if (!existing) throw notFound();
  await tx.transaction(async (inner) => {
    await inner.delete(installationTable).where(eq(installationTable.id, existing.id));
    await writeAudit(
      inner,
      userAudit(caller, 'user_plugin.removed', userId, existing.id, { pluginId }),
    );
  });
}

export async function listUserPlugins(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  query: PageQuery,
): Promise<{ items: PluginView[]; nextCursor: string | null }> {
  return installPage(tx, userInstalls(caller, userId), query);
}

/** The install the user made themselves; a project plugin, or none, is `not_found`. */
async function ownInstall(tx: Executor, caller: ProjectCaller, userId: string, pluginId: string) {
  await requireProjectUser(tx, caller, userId);
  const [row] = await tx
    .select({ id: installationTable.id, pluginVersionId: installationTable.pluginVersionId })
    .from(installationTable)
    .where(and(userInstalls(caller, userId), eq(installationTable.pluginId, pluginId)))
    .limit(1);
  if (!row) throw notFound();
  return row;
}

/**
 * Sets, keeps or removes the user's own values for a plugin they installed. A project plugin's
 * values belong to the project and are set through its auth config, so they are `not_found` here.
 * `byUser` is true when the user makes the change themselves.
 */
export async function setUserPluginVariables(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
  body: PutVariablesBody,
  sealer: Sealer,
  byUser: boolean,
): Promise<void> {
  const install = await ownInstall(tx, caller, userId, pluginId);
  await writeVariables(
    tx,
    install,
    { organizationId: caller.organizationId, scopeType: 'user' },
    {
      actor: caller.actor,
      updatedBy: byUser ? userId : null,
      projectId: caller.projectId,
      subjectUserId: userId,
      action: 'user_plugin.variables_updated',
    },
    body,
    sealer,
  );
}

async function setProjectComponentPreference(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
  componentId: string,
  enabled: boolean,
): Promise<void> {
  const [shared] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.organizationId, caller.organizationId),
        eq(installationTable.scopeType, 'project'),
        eq(installationTable.projectId, caller.projectId),
        eq(installationTable.pluginId, pluginId),
        eq(installationTable.status, 'active'),
      ),
    )
    .limit(1);
  if (!shared) throw notFound();
  await tx.transaction(async (inner) => {
    const [component] = await inner
      .select({ componentId: installationComponentTable.componentId })
      .from(installationComponentTable)
      .where(
        and(
          eq(installationComponentTable.installationId, shared.id),
          eq(installationComponentTable.componentId, componentId),
        ),
      )
      .limit(1);
    if (!component) throw notFound();
    await inner
      .insert(userComponentPreferenceTable)
      .values({
        installationId: shared.id,
        organizationId: caller.organizationId,
        componentId,
        userId,
        enabled,
      })
      .onConflictDoUpdate({
        target: [
          userComponentPreferenceTable.installationId,
          userComponentPreferenceTable.componentId,
          userComponentPreferenceTable.userId,
        ],
        set: { enabled, updatedAt: new Date() },
      });
    await writeAudit(
      inner,
      userAudit(caller, 'user_plugin.component_updated', userId, shared.id, {
        scope: 'project',
        componentId,
        enabled: String(enabled),
      }),
    );
  });
}

/**
 * Removes the user's own preference for one component of a plugin the project provides, so the
 * user follows the install again. Repeating it is safe. A plugin the user installed has no
 * preference to clear and is not found here.
 */
export async function clearUserPluginComponent(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
  componentId: string,
): Promise<void> {
  await requireProjectUser(tx, caller, userId);
  const [shared] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.organizationId, caller.organizationId),
        eq(installationTable.scopeType, 'project'),
        eq(installationTable.projectId, caller.projectId),
        eq(installationTable.pluginId, pluginId),
        eq(installationTable.status, 'active'),
      ),
    )
    .limit(1);
  if (!shared) throw notFound();
  await tx.transaction(async (inner) => {
    const [component] = await inner
      .select({ componentId: installationComponentTable.componentId })
      .from(installationComponentTable)
      .where(
        and(
          eq(installationComponentTable.installationId, shared.id),
          eq(installationComponentTable.componentId, componentId),
        ),
      )
      .limit(1);
    if (!component) throw notFound();
    const removed = await inner
      .delete(userComponentPreferenceTable)
      .where(
        and(
          eq(userComponentPreferenceTable.installationId, shared.id),
          eq(userComponentPreferenceTable.componentId, componentId),
          eq(userComponentPreferenceTable.userId, userId),
        ),
      )
      .returning({ componentId: userComponentPreferenceTable.componentId });
    if (!removed[0]) return;
    await writeAudit(
      inner,
      userAudit(caller, 'user_plugin.component_updated', userId, shared.id, {
        scope: 'project',
        componentId,
        enabled: 'default',
      }),
    );
  });
}

/**
 * Turns one component on or off for the user. On the user's own install it changes the install. On
 * a plugin the project provides, the install is shared, so it stores the user's own preference
 * instead; the install's value stays the default and an administrator's off still wins.
 */
export async function setUserPluginComponent(
  tx: Executor,
  caller: ProjectCaller,
  userId: string,
  pluginId: string,
  componentId: string,
  enabled: boolean,
): Promise<void> {
  await requireProjectUser(tx, caller, userId);
  const [own] = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(and(userInstalls(caller, userId), eq(installationTable.pluginId, pluginId)))
    .limit(1);
  if (!own) {
    await setProjectComponentPreference(tx, caller, userId, pluginId, componentId, enabled);
    return;
  }
  const install = own;
  await tx.transaction(async (inner) => {
    const updated = await inner
      .update(installationComponentTable)
      .set({ enabled, updatedAt: new Date() })
      .where(
        and(
          eq(installationComponentTable.installationId, install.id),
          eq(installationComponentTable.componentId, componentId),
        ),
      )
      .returning({ componentId: installationComponentTable.componentId });
    if (!updated[0]) throw notFound();
    await writeAudit(
      inner,
      userAudit(caller, 'user_plugin.component_updated', userId, install.id, {
        componentId,
        enabled: String(enabled),
      }),
    );
  });
}
