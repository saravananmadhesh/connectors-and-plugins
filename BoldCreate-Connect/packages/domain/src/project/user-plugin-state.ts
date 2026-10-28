/**
 * Everything a project user has, in one read: the plugins the project provides and the ones the
 * user installed, their components, which variables hold a value, and what is left to do before
 * each MCP server can be used. A host draws its marketplace page from this and keeps no copy.
 * Values and tokens never appear.
 */
import { and, asc, eq, inArray, isNull, or } from 'drizzle-orm';
import {
  authConfigTable,
  componentTable,
  installationComponentTable,
  installationTable,
  installationVariableTable,
  mcpOAuthTokenTable,
  mcpServerTable,
  pluginTable,
  pluginVersionTable,
  type Executor,
} from '@boldcreate-integrations/db';
import {
  KEY_PRESET_PERMISSIONS,
  type ApiKeyPrincipal,
  type PageQuery,
  type Plain,
  type UserPluginState,
} from '@boldcreate-integrations/contracts';
import { resolveDelivery } from '../delivery/resolve-delivery.js';
import { notFound, validationFailed } from '../errors.js';
import { scanOf } from '../marketplace/admin-plugins.js';
import { serverKey } from './auth-configs.js';
import type { ProjectCaller } from './project-plugins.js';

export type UserPluginStateView = Plain<UserPluginState>;

/** What a user is served, as the keys of that user are: the project's installs and their own. */
export function projectUserPrincipal(caller: ProjectCaller, userId: string): ApiKeyPrincipal {
  return {
    kind: 'api_key',
    keyId: caller.actor.id,
    orgId: caller.organizationId,
    scope: 'user',
    userId,
    projectId: caller.projectId,
    preset: 'agent',
    permissions: [...KEY_PRESET_PERMISSIONS.agent],
  };
}

export interface UserPluginStateOptions {
  /** Whether the sign-in of the user to each server is part of the answer. */
  connections: boolean;
}

type Mcp = UserPluginStateView['mcp'][number];

const OAUTH_TYPES = new Set(['oauth_dcr', 'oauth_client']);

/** The auth type a config's mode stands for, as the state shows it. */
const TYPE_OF_MODE = {
  dcr: 'oauth_dcr',
  oauth_client: 'oauth_client',
  shared_secret: 'api_key',
  user_form: 'none',
} as const;

function decodePluginCursor(cursor: string): string {
  const id = Buffer.from(cursor, 'base64url').toString('utf8');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)) {
    throw validationFailed([{ field: 'cursor', message: 'The cursor is not valid' }]);
  }
  return id;
}

/** Groups rows under one key. */
function groupBy<T>(rows: readonly T[], key: (row: T) => string): Map<string, T[]> {
  const out = new Map<string, T[]>();
  for (const row of rows) {
    const list = out.get(key(row));
    if (list) list.push(row);
    else out.set(key(row), [row]);
  }
  return out;
}

/**
 * Every plugin the user has, by name. The principal's allow list narrows what an agent is served,
 * not what the user sees, so it is left out here. `after` is the plugin id the page follows.
 */
export async function allStates(
  tx: Executor,
  principal: ApiKeyPrincipal,
  options: UserPluginStateOptions,
): Promise<UserPluginStateView[]> {
  const { plugins: _narrowed, ...everything } = principal;
  const { installations } = await resolveDelivery(tx, everything);
  if (installations.length === 0) return [];

  const installationIds = installations.map((item) => item.installationId);
  const pluginIds = installations.map((item) => item.pluginId);
  const versionIds = installations.map((item) => item.versionId);

  const [plugins, installed, versions, components, variables, servers, tokens, configs] =
    await Promise.all([
      tx
        .select({ id: pluginTable.id, displayName: pluginTable.displayName })
        .from(pluginTable)
        .where(inArray(pluginTable.id, pluginIds)),
      tx
        .select({ id: installationTable.id, createdAt: installationTable.createdAt })
        .from(installationTable)
        .where(inArray(installationTable.id, installationIds)),
      tx
        .select()
        .from(pluginVersionTable)
        .where(
          and(
            inArray(pluginVersionTable.pluginId, pluginIds),
            or(
              inArray(pluginVersionTable.id, versionIds),
              and(
                eq(pluginVersionTable.status, 'published'),
                isNull(pluginVersionTable.executionBlockedAt),
              ),
            ),
          ),
        ),
      tx
        .select({
          installationId: installationComponentTable.installationId,
          componentId: componentTable.id,
          kind: componentTable.kind,
          name: componentTable.name,
          enabled: installationComponentTable.enabled,
        })
        .from(installationComponentTable)
        .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
        .where(inArray(installationComponentTable.installationId, installationIds))
        .orderBy(asc(componentTable.kind), asc(componentTable.name)),
      tx
        .select({
          installationId: installationVariableTable.installationId,
          name: installationVariableTable.name,
        })
        .from(installationVariableTable)
        .where(inArray(installationVariableTable.installationId, installationIds)),
      tx
        .select({
          installationId: mcpServerTable.installationId,
          componentId: mcpServerTable.componentId,
          authType: mcpServerTable.authType,
        })
        .from(mcpServerTable)
        .where(inArray(mcpServerTable.installationId, installationIds)),
      principal.userId
        ? tx
            .select({
              id: mcpOAuthTokenTable.id,
              installationId: mcpOAuthTokenTable.installationId,
              componentId: mcpOAuthTokenTable.componentId,
              status: mcpOAuthTokenTable.status,
              kind: mcpOAuthTokenTable.kind,
              authConfigId: mcpOAuthTokenTable.authConfigId,
              expiresAt: mcpOAuthTokenTable.expiresAt,
              createdAt: mcpOAuthTokenTable.createdAt,
            })
            .from(mcpOAuthTokenTable)
            .where(
              and(
                inArray(mcpOAuthTokenTable.installationId, installationIds),
                eq(mcpOAuthTokenTable.userId, principal.userId),
              ),
            )
        : Promise.resolve([]),
      principal.projectId
        ? tx
            .select()
            .from(authConfigTable)
            .where(
              and(
                eq(authConfigTable.projectId, principal.projectId),
                inArray(authConfigTable.pluginId, pluginIds),
                eq(authConfigTable.status, 'active'),
              ),
            )
        : Promise.resolve([]),
    ]);

  const displayName = new Map(plugins.map((row) => [row.id, row.displayName]));
  const createdAt = new Map(installed.map((row) => [row.id, row.createdAt]));
  const versionById = new Map(versions.map((row) => [row.id, row]));
  const componentsOf = groupBy(components, (row) => row.installationId);
  const storedOf = groupBy(variables, (row) => row.installationId);
  const serverOf = new Map(servers.map((row) => [`${row.installationId}/${row.componentId}`, row]));
  const tokenOf = new Map(tokens.map((row) => [`${row.installationId}/${row.componentId}`, row]));
  const configById = new Map(configs.map((row) => [row.id, row]));
  const defaultOf = new Map(
    configs
      .filter((row) => row.isDefault)
      .map((row) => [serverKey(row.pluginId, row.serverName), row]),
  );
  const publishedOf = groupBy(
    versions.filter((row) => row.status === 'published' && !row.executionBlockedAt),
    (row) => row.pluginId,
  );

  return installations.map((item) => {
    const version = versionById.get(item.versionId);
    const declared = version ? (scanOf(version)?.variables ?? []) : [];
    const stored = new Set((storedOf.get(item.installationId) ?? []).map((row) => row.name));
    const declaredNames = new Set(declared.map((variable) => variable.name));
    const missing = declared
      .filter((variable) => variable.required && !stored.has(variable.name))
      .map((variable) => variable.name);

    const newer = (publishedOf.get(item.pluginId) ?? [])
      .filter(
        (row) =>
          version !== undefined &&
          row.major === version.major &&
          (row.minor > version.minor || (row.minor === version.minor && row.patch > version.patch)),
      )
      .sort((a, b) => b.minor - a.minor || b.patch - a.patch)[0];

    const rows = componentsOf.get(item.installationId) ?? [];
    const mcp = rows
      .filter((row) => row.kind === 'mcp')
      .map((row): Mcp => {
        const slot = `${item.installationId}/${row.componentId}`;
        const server = serverOf.get(slot);
        const token = tokenOf.get(slot);
        // The config a session names, else the project's default, decides how the user signs in.
        const key = serverKey(item.pluginId, row.name);
        const named = principal.authConfigs?.[key];
        const config = named !== undefined ? configById.get(named) : defaultOf.get(key);
        const authMode = config ? TYPE_OF_MODE[config.authMode] : (server?.authType ?? 'none');
        const own = token && (!config || token.authConfigId === config.id) ? token : undefined;
        const active = own !== undefined && (own.kind !== 'oauth' || own.status === 'active');
        const setup: Mcp['setup'] =
          missing.length > 0
            ? { kind: 'variables', names: missing }
            : named !== undefined && !config
              ? { kind: 'auth_config_missing' }
              : OAUTH_TYPES.has(authMode) && !active
                ? { kind: 'connect' }
                : { kind: 'none' };
        return {
          componentId: row.componentId,
          serverName: row.name,
          authConfigId: config?.id ?? null,
          authMode,
          setup,
          ready: setup.kind === 'none',
          ...(options.connections
            ? {
                connection: own
                  ? {
                      id: own.id,
                      status: own.status,
                      expiresAt: own.expiresAt?.toISOString() ?? null,
                      connectedAt: own.createdAt.toISOString(),
                    }
                  : null,
              }
            : {}),
        };
      });

    const own = item.scope === 'user';
    return {
      pluginId: item.pluginId,
      name: item.pluginName,
      displayName: displayName.get(item.pluginId) ?? item.pluginName,
      source: own ? 'user' : 'project',
      removable: own,
      versionId: item.versionId,
      version: item.version,
      latestVersionId: newer?.id ?? item.versionId,
      updateAvailable: newer !== undefined,
      installedAt: (createdAt.get(item.installationId) ?? item.updatedAt).toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      components: rows.map((row) => ({
        componentId: row.componentId,
        kind: row.kind,
        name: row.name,
        enabled: row.enabled,
      })),
      variables: [
        ...declared.map((variable) => ({
          name: variable.name,
          secret: variable.secret,
          isSet: stored.has(variable.name),
        })),
        ...[...stored]
          .filter((name) => !declaredNames.has(name))
          .sort()
          .map((name) => ({ name, secret: true, isSet: true })),
      ],
      mcp,
    };
  });
}

/** One page of the user's plugins, by name, with the state of each. */
export async function userPluginState(
  tx: Executor,
  principal: ApiKeyPrincipal,
  query: PageQuery,
  options: UserPluginStateOptions,
): Promise<{ items: UserPluginStateView[]; nextCursor: string | null }> {
  const after = query.cursor === undefined ? null : decodePluginCursor(query.cursor);
  const all = await allStates(tx, principal, options);
  const start = after === null ? 0 : all.findIndex((item) => item.pluginId === after) + 1;
  const page = all.slice(start, start + query.limit);
  const last = page[page.length - 1];
  const more = start + query.limit < all.length;
  return {
    items: page,
    nextCursor: more && last ? Buffer.from(last.pluginId, 'utf8').toString('base64url') : null,
  };
}

/** The state of one plugin of the user; a plugin the user does not have is `not_found`. */
export async function userPluginStateOf(
  tx: Executor,
  principal: ApiKeyPrincipal,
  pluginId: string,
  options: UserPluginStateOptions,
): Promise<UserPluginStateView> {
  const item = (await allStates(tx, principal, options)).find((row) => row.pluginId === pluginId);
  if (!item) throw notFound();
  return item;
}
