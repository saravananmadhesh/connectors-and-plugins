/**
 * Adds a plugin to a project together with how its MCP servers sign in and the values its
 * variables need, in one save: when any part fails nothing is stored.
 */
import { and, desc, eq } from 'drizzle-orm';
import {
  authConfigTable,
  componentTable,
  installationComponentTable,
  installationTable,
  pluginTable,
  pluginVersionTable,
  type Executor,
} from '@boldcreate-integrations/db';
import type {
  PluginAuthConfig,
  Plain,
  ProjectPluginResponse,
  PutVariablesBody,
} from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { appError, notFound, validationFailed } from '../errors.js';
import { inOrgCatalog } from '../marketplace/plugins.js';
import { writeVariables } from '../installation/variables.js';
import { createAuthConfig } from './auth-configs.js';
import { projectInstalls, putProjectPlugin, type ProjectCaller } from './project-plugins.js';

export interface PluginSetup {
  versionId?: string | undefined;
  /** By MCP server name. */
  authConfigs?: Record<string, PluginAuthConfig> | undefined;
  variables?: PutVariablesBody['values'] | undefined;
}

export async function putProjectPluginWithConfig(
  tx: Executor,
  caller: ProjectCaller,
  pluginId: string,
  setup: PluginSetup,
  sealer: Sealer,
  options: { callbackUrl: string },
): Promise<{
  created: boolean;
  plugin: Plain<ProjectPluginResponse>;
}> {
  const configs = Object.entries(setup.authConfigs ?? {}).sort(([a], [b]) => a.localeCompare(b));
  const hasVariables = setup.variables !== undefined && Object.keys(setup.variables).length > 0;
  if (configs.length === 0 && !hasVariables) {
    return putProjectPlugin(tx, caller, pluginId, setup.versionId);
  }
  return tx.transaction(async (inner) => {
    const result = await putProjectPlugin(inner, caller, pluginId, setup.versionId);
    const [installation] = await inner
      .select({ id: installationTable.id, pluginVersionId: installationTable.pluginVersionId })
      .from(installationTable)
      .where(and(projectInstalls(caller), eq(installationTable.pluginId, result.plugin.pluginId)))
      .limit(1);
    if (!installation) throw validationFailed();
    const servers = await inner
      .select({ componentId: componentTable.id, name: componentTable.name })
      .from(installationComponentTable)
      .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
      .where(
        and(
          eq(installationComponentTable.installationId, installation.id),
          eq(componentTable.kind, 'mcp'),
        ),
      );
    const byName = new Map(servers.map((server) => [server.name, server.componentId]));
    const unknown = configs.filter(([name]) => !byName.has(name));
    if (unknown.length > 0) {
      throw validationFailed(
        unknown.map(([name]) => ({ field: `authConfigs.${name}`, message: 'unknown server' })),
      );
    }
    const existing: string[] = [];
    for (const [serverName, config] of configs) {
      const [found] = await inner
        .select({ id: authConfigTable.id })
        .from(authConfigTable)
        .where(
          and(
            eq(authConfigTable.projectId, caller.projectId),
            eq(authConfigTable.pluginId, result.plugin.pluginId),
            eq(authConfigTable.serverName, serverName),
            eq(authConfigTable.name, config.name),
          ),
        )
        .limit(1);
      if (found) {
        existing.push(serverName);
        continue;
      }
      await createAuthConfig(
        inner,
        caller,
        { ...config, componentId: byName.get(serverName) as string },
        sealer,
        { callbackUrl: options.callbackUrl, includeTools: false },
      );
    }
    if (hasVariables && setup.variables) {
      await writeVariables(
        inner,
        { id: installation.id, pluginVersionId: installation.pluginVersionId },
        { organizationId: caller.organizationId, scopeType: 'project' },
        {
          actor: caller.actor,
          updatedBy: caller.actor.kind === 'user_session' ? caller.actor.id : null,
          projectId: caller.projectId,
        },
        { values: setup.variables },
        sealer,
      );
    }
    return {
      created: result.created,
      plugin:
        existing.length > 0 ? { ...result.plugin, existingAuthConfigs: existing } : result.plugin,
    };
  });
}

/**
 * The address of one MCP server of a plugin in the organization's catalog, read from its latest
 * published version, so the sign-in details it publishes can be looked up before it is added.
 */
export async function planProjectOAuthDiscovery(
  tx: Executor,
  orgId: string,
  pluginId: string,
  serverName: string,
): Promise<string> {
  const [plugin] = await tx
    .select({ id: pluginTable.id })
    .from(pluginTable)
    .where(and(eq(pluginTable.id, pluginId), inOrgCatalog(orgId)))
    .limit(1);
  if (!plugin) throw notFound();
  const [version] = await tx
    .select({ id: pluginVersionTable.id })
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
  if (!version) throw notFound();
  const [server] = await tx
    .select({ metadata: componentTable.metadata })
    .from(componentTable)
    .where(
      and(
        eq(componentTable.pluginVersionId, version.id),
        eq(componentTable.kind, 'mcp'),
        eq(componentTable.name, serverName),
      ),
    )
    .limit(1);
  if (!server) throw notFound();
  const metadata = server.metadata as { transport?: unknown; url?: unknown } | null;
  if (metadata?.transport !== 'http' || typeof metadata.url !== 'string') {
    throw appError('mcp_transport_unsupported');
  }
  return metadata.url;
}
