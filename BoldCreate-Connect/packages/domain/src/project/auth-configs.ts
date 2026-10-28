/**
 * How a project's users sign in to the MCP servers of its plugins. A project keeps several configs
 * per server and one of them is the default; a session may name another. The host calls these with
 * a project key; people managing the organization call them from the console, after the route has
 * checked their role. Secrets are sealed and never read back.
 */
import { randomUUID } from 'node:crypto';
import { and, asc, eq, inArray, ne, sql } from 'drizzle-orm';
import {
  authConfigTable,
  componentTable,
  installationComponentTable,
  installationTable,
  mcpOAuthTokenTable,
  mcpServerTable,
  pluginTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  AuthConfigListQuery,
  AuthConfigResponse,
  CreateAuthConfigBody,
  Plain,
  UpdateAuthConfigBody,
} from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { writeAudit } from '../audit/write-audit.js';
import { appError, conflict, isUniqueViolation, notFound, validationFailed } from '../errors.js';
import { variableStatuses } from '../installation/variables.js';
import type { ProjectCaller } from './project-plugins.js';
import type { ProjectScope } from './project-users.js';

type ConfigRow = typeof authConfigTable.$inferSelect;
type ConfigView = Plain<AuthConfigResponse>;

/** The key a session uses to name the server of a plugin: the plugin and the server's name. */
export const serverKey = (pluginId: string, serverName: string): string =>
  `${pluginId}/${serverName}`;

/** The subject an auth config's sealed values are bound to. */
const configSubject = (id: string) => ({ kind: 'auth_config' as const, id });

/**
 * The MCP server a component stands for, as the plugin and name that hold across versions. The
 * component has to belong to a plugin the project has added.
 */
export async function serverOfComponent(
  tx: Executor,
  project: ProjectScope,
  componentId: string,
): Promise<{ pluginId: string; serverName: string }> {
  const [row] = await tx
    .select({ pluginId: installationTable.pluginId, serverName: componentTable.name })
    .from(installationComponentTable)
    .innerJoin(
      installationTable,
      eq(installationTable.id, installationComponentTable.installationId),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(
      and(
        eq(installationComponentTable.componentId, componentId),
        eq(componentTable.kind, 'mcp'),
        eq(installationTable.projectId, project.projectId),
      ),
    )
    .limit(1);
  if (!row) throw notFound();
  return row;
}

const inProject = (project: ProjectScope) => eq(authConfigTable.projectId, project.projectId);

async function loadConfig(
  tx: Executor,
  project: ProjectScope,
  id: string,
  lock = false,
): Promise<ConfigRow> {
  const query = tx
    .select()
    .from(authConfigTable)
    .where(and(inProject(project), eq(authConfigTable.id, id)))
    .limit(1);
  const [row] = await (lock ? query.for('update') : query);
  if (!row) throw notFound();
  return row;
}

interface InstalledServer {
  componentId: string;
  installationId: string;
  pluginVersionId: string;
  pluginName: string;
  tools: { name: string; description: string }[];
}

/** The project's install of each plugin, by server key, for the configs that have one. */
async function installedServers(
  tx: Executor,
  project: ProjectScope,
  rows: ConfigRow[],
): Promise<Map<string, InstalledServer>> {
  const found = new Map<string, InstalledServer>();
  if (rows.length === 0) return found;
  const installed = await tx
    .select({
      pluginId: installationTable.pluginId,
      pluginName: pluginTable.name,
      installationId: installationTable.id,
      pluginVersionId: installationTable.pluginVersionId,
      componentId: componentTable.id,
      serverName: componentTable.name,
      tools: mcpServerTable.tools,
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
        eq(installationTable.organizationId, project.organizationId),
        eq(installationTable.scopeType, 'project'),
        eq(installationTable.projectId, project.projectId),
        eq(installationTable.status, 'active'),
        eq(componentTable.kind, 'mcp'),
        inArray(installationTable.pluginId, [...new Set(rows.map((row) => row.pluginId))]),
      ),
    );
  for (const item of installed) {
    found.set(serverKey(item.pluginId, item.serverName), {
      componentId: item.componentId,
      installationId: item.installationId,
      pluginVersionId: item.pluginVersionId,
      pluginName: item.pluginName,
      tools: (item.tools ?? []).map((tool) => ({ name: tool.name, description: tool.description })),
    });
  }
  return found;
}

async function views(
  tx: Executor,
  project: ProjectScope,
  rows: ConfigRow[],
  callbackUrl: string,
  includeTools: boolean,
): Promise<ConfigView[]> {
  const installed = await installedServers(tx, project, rows);
  const names = new Map<string, string>();
  const missing = rows.filter((row) => !installed.has(serverKey(row.pluginId, row.serverName)));
  if (missing.length > 0) {
    const found = await tx
      .select({ id: pluginTable.id, name: pluginTable.name })
      .from(pluginTable)
      .where(inArray(pluginTable.id, [...new Set(missing.map((row) => row.pluginId))]));
    for (const plugin of found) names.set(plugin.id, plugin.name);
  }
  const items: ConfigView[] = [];
  for (const row of rows) {
    const server = installed.get(serverKey(row.pluginId, row.serverName));
    items.push({
      id: row.id,
      componentId: server?.componentId ?? null,
      pluginId: row.pluginId,
      pluginName: server?.pluginName ?? names.get(row.pluginId) ?? '',
      serverName: row.serverName,
      name: row.name,
      authMode: row.authMode,
      isDefault: row.isDefault,
      status: row.status,
      clientId: row.oauthClientId,
      clientSecretSet: row.oauthClientSecretSealed !== null,
      secretSet: row.secretSealed !== null,
      secretLastFour: row.secretLastFour,
      scopes: row.oauthScopes,
      callbackUrl,
      variables: server
        ? await variableStatuses(tx, {
            id: server.installationId,
            pluginVersionId: server.pluginVersionId,
          })
        : [],
      ...(includeTools ? { tools: server?.tools ?? [] } : {}),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    });
  }
  return items;
}

const lastFour = (secret: string): string => secret.slice(-4);

function auditOf(
  caller: ProjectCaller,
  action: 'auth_config.created' | 'auth_config.updated' | 'auth_config.deleted',
  id: string,
  context: Record<string, string>,
) {
  return {
    actor: caller.actor,
    action,
    target: { kind: 'auth_config', id },
    orgId: caller.organizationId,
    projectId: caller.projectId,
    context,
  };
}

/** One page of the project's configs, oldest first. */
export async function listAuthConfigs(
  tx: Executor,
  project: ProjectScope,
  query: Pick<AuthConfigListQuery, 'cursor' | 'limit'> & { componentId?: string | undefined },
  options: { callbackUrl: string; includeTools: boolean },
): Promise<{ items: ConfigView[]; nextCursor: string | null }> {
  let server: { pluginId: string; serverName: string } | undefined;
  if (query.componentId !== undefined)
    server = await serverOfComponent(tx, project, query.componentId);
  const rows = await tx
    .select()
    .from(authConfigTable)
    .where(
      and(
        inProject(project),
        server
          ? and(
              eq(authConfigTable.pluginId, server.pluginId),
              eq(authConfigTable.serverName, server.serverName),
            )
          : undefined,
      ),
    )
    .orderBy(asc(authConfigTable.createdAt), asc(authConfigTable.id));
  // The set is small (a handful per server), so the page is cut after the fact; the cursor is the
  // id of the last config served.
  const start = query.cursor ? rows.findIndex((row) => row.id === query.cursor) + 1 : 0;
  const page = rows.slice(start, start + query.limit);
  const last = page[page.length - 1];
  return {
    items: await views(tx, project, page, options.callbackUrl, options.includeTools),
    nextCursor: start + query.limit < rows.length && last ? last.id : null,
  };
}

export async function getAuthConfig(
  tx: Executor,
  project: ProjectScope,
  id: string,
  options: { callbackUrl: string; includeTools: boolean },
): Promise<ConfigView> {
  const row = await loadConfig(tx, project, id);
  const [view] = await views(tx, project, [row], options.callbackUrl, options.includeTools);
  return view as ConfigView;
}

/** Holds back other writers of the configs of one server until the transaction ends. */
async function lockServer(
  tx: Executor,
  row: Pick<ConfigRow, 'projectId' | 'pluginId' | 'serverName'>,
) {
  const key = `auth_config/${row.projectId}/${serverKey(row.pluginId, row.serverName)}`;
  await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtextextended(${key}, 0))`);
}

/** Makes `id` the only default of its server, in the caller's transaction. */
async function makeDefault(
  tx: Executor,
  row: Pick<ConfigRow, 'id' | 'projectId' | 'pluginId' | 'serverName'>,
) {
  await tx
    .update(authConfigTable)
    .set({ isDefault: false })
    .where(
      and(
        eq(authConfigTable.projectId, row.projectId),
        eq(authConfigTable.pluginId, row.pluginId),
        eq(authConfigTable.serverName, row.serverName),
        eq(authConfigTable.isDefault, true),
        ne(authConfigTable.id, row.id),
      ),
    );
}

export async function createAuthConfig(
  tx: Executor,
  caller: ProjectCaller,
  body: Omit<CreateAuthConfigBody, 'componentId'> & { componentId: string },
  sealer: Sealer,
  options: { callbackUrl: string; includeTools: boolean },
): Promise<ConfigView> {
  const server = await serverOfComponent(tx, caller, body.componentId);
  const id = randomUUID();
  const now = new Date();
  const orgId = caller.organizationId;
  const seal = (purpose: 'auth_config_secret' | 'auth_config_client_secret', plaintext: string) =>
    sealer.seal({ purpose, orgId, subject: configSubject(id), plaintext });
  try {
    const row = await tx.transaction(async (inner) => {
      await lockServer(inner, {
        projectId: caller.projectId,
        pluginId: server.pluginId,
        serverName: server.serverName,
      });
      const [existing] = await inner
        .select({ n: sql<number>`count(*)::int` })
        .from(authConfigTable)
        .where(
          and(
            inProject(caller),
            eq(authConfigTable.pluginId, server.pluginId),
            eq(authConfigTable.serverName, server.serverName),
          ),
        );
      // The first config of a server is its default, so users can connect without another step.
      const isDefault = body.isDefault ?? (existing?.n ?? 0) === 0;
      const values: typeof authConfigTable.$inferInsert = {
        id,
        projectId: caller.projectId,
        pluginId: server.pluginId,
        serverName: server.serverName,
        name: body.name,
        authMode: body.authMode,
        secretSealed:
          body.secret !== undefined ? await seal('auth_config_secret', body.secret) : null,
        secretLastFour: body.secret !== undefined ? lastFour(body.secret) : null,
        oauthClientId: body.clientId ?? null,
        oauthClientSecretSealed:
          body.clientSecret !== undefined
            ? await seal('auth_config_client_secret', body.clientSecret)
            : null,
        oauthScopes: body.scopes ? body.scopes : null,
        isDefault,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      };
      if (isDefault) {
        await makeDefault(inner, {
          id,
          projectId: caller.projectId,
          pluginId: server.pluginId,
          serverName: server.serverName,
        });
      }
      const [inserted] = await inner.insert(authConfigTable).values(values).returning();
      await writeAudit(
        inner,
        auditOf(caller, 'auth_config.created', id, {
          plugin: server.pluginId,
          server: server.serverName,
          mode: body.authMode,
        }),
      );
      return inserted as ConfigRow;
    });
    const [view] = await views(tx, caller, [row], options.callbackUrl, options.includeTools);
    return view as ConfigView;
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

export async function updateAuthConfig(
  tx: Executor,
  caller: ProjectCaller,
  id: string,
  body: UpdateAuthConfigBody,
  sealer: Sealer,
  options: { callbackUrl: string; includeTools: boolean },
): Promise<ConfigView> {
  const orgId = caller.organizationId;
  const seal = (purpose: 'auth_config_secret' | 'auth_config_client_secret', plaintext: string) =>
    sealer.seal({ purpose, orgId, subject: configSubject(id), plaintext });
  try {
    const row = await tx.transaction(async (inner) => {
      const current = await loadConfig(inner, caller, id, true);
      await lockServer(inner, current);
      const oauth = current.authMode === 'dcr' || current.authMode === 'oauth_client';
      const fields: { field: string; message: string }[] = [];
      if (body.secret !== undefined && current.authMode !== 'shared_secret') {
        fields.push({ field: 'secret', message: 'applies to shared_secret only' });
      }
      if (body.clientId !== undefined && current.authMode !== 'oauth_client') {
        fields.push({ field: 'clientId', message: 'applies to oauth_client only' });
      }
      if (body.clientSecret !== undefined && current.authMode !== 'oauth_client') {
        fields.push({ field: 'clientSecret', message: 'applies to oauth_client only' });
      }
      if (body.scopes !== undefined && !oauth) {
        fields.push({ field: 'scopes', message: 'applies to OAuth modes only' });
      }
      if (fields.length > 0) throw validationFailed(fields);

      const status = body.status ?? current.status;
      // A disabled config cannot be the default.
      const wantsDefault = status === 'disabled' ? false : (body.isDefault ?? current.isDefault);
      if (wantsDefault && !current.isDefault) await makeDefault(inner, current);
      const patch: Partial<typeof authConfigTable.$inferInsert> = {
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.status !== undefined ? { status } : {}),
        isDefault: wantsDefault,
        ...(body.clientId !== undefined ? { oauthClientId: body.clientId } : {}),
        ...(body.clientSecret !== undefined
          ? { oauthClientSecretSealed: await seal('auth_config_client_secret', body.clientSecret) }
          : {}),
        ...(body.scopes !== undefined
          ? { oauthScopes: body.scopes === '' ? null : body.scopes }
          : {}),
        ...(body.secret !== undefined
          ? {
              secretSealed: await seal('auth_config_secret', body.secret),
              secretLastFour: lastFour(body.secret),
            }
          : {}),
        updatedAt: new Date(),
      };
      // A new client makes the stored registration and discovery stale.
      if (body.clientId !== undefined && body.clientId !== current.oauthClientId) {
        patch.oauthMetadata = null;
      }
      const [updated] = await inner
        .update(authConfigTable)
        .set(patch)
        .where(eq(authConfigTable.id, id))
        .returning();
      await writeAudit(
        inner,
        auditOf(caller, 'auth_config.updated', id, {
          fields: Object.keys(body).sort().join(','),
        }),
      );
      return updated as ConfigRow;
    });
    const [view] = await views(tx, caller, [row], options.callbackUrl, options.includeTools);
    return view as ConfigView;
  } catch (error) {
    if (isUniqueViolation(error)) throw conflict();
    throw error;
  }
}

/** Removes a config. One that connections were made with stays until they are removed. */
export async function deleteAuthConfig(
  tx: Executor,
  caller: ProjectCaller,
  id: string,
): Promise<void> {
  await tx.transaction(async (inner) => {
    const current = await loadConfig(inner, caller, id, true);
    const [used] = await inner
      .select({ n: sql<number>`count(*)::int` })
      .from(mcpOAuthTokenTable)
      .where(eq(mcpOAuthTokenTable.authConfigId, id));
    if ((used?.n ?? 0) > 0) throw conflict();
    await inner.delete(authConfigTable).where(eq(authConfigTable.id, id));
    await writeAudit(
      inner,
      auditOf(caller, 'auth_config.deleted', id, {
        plugin: current.pluginId,
        server: current.serverName,
      }),
    );
  });
}

/**
 * The config in force for a server: the one a session names, else the project's default. A named
 * config that is gone or disabled is not replaced by the default, so a call never signs in the
 * wrong way; the caller sees no config. A server without any config returns null.
 */
export async function resolveAuthConfig(
  tx: Executor,
  input: {
    projectId: string;
    pluginId: string;
    serverName: string;
    sessionConfigs?: Record<string, string> | undefined;
  },
): Promise<ConfigRow | null> {
  const named = input.sessionConfigs?.[serverKey(input.pluginId, input.serverName)];
  const [row] = await tx
    .select()
    .from(authConfigTable)
    .where(
      and(
        eq(authConfigTable.projectId, input.projectId),
        eq(authConfigTable.pluginId, input.pluginId),
        eq(authConfigTable.serverName, input.serverName),
        named !== undefined ? eq(authConfigTable.id, named) : eq(authConfigTable.isDefault, true),
        eq(authConfigTable.status, 'active'),
      ),
    )
    .limit(1);
  return row ?? null;
}

/**
 * A config the caller names for one server: it must belong to the project, to that plugin and
 * server, and be switched on. Anything else is `unprocessable`, so the caller learns the request
 * itself is wrong rather than that something is missing.
 */
export async function namedAuthConfig(
  tx: Executor,
  project: ProjectScope,
  id: string,
  server: { pluginId: string; serverName: string },
): Promise<ConfigRow> {
  const [row] = await tx
    .select()
    .from(authConfigTable)
    .where(
      and(
        inProject(project),
        eq(authConfigTable.id, id),
        eq(authConfigTable.pluginId, server.pluginId),
        eq(authConfigTable.serverName, server.serverName),
        eq(authConfigTable.status, 'active'),
      ),
    )
    .limit(1);
  if (!row) throw appError('unprocessable');
  return row;
}
