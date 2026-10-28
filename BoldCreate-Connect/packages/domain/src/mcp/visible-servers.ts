/**
 * The MCP servers a key can reach: an enabled `mcp` component of an installation the key sees.
 * Shared by the gateway and by the api route that answers the gateway.
 */
import { and, eq, inArray } from 'drizzle-orm';
import {
  componentTable,
  installationComponentTable,
  mcpServerTable,
  type Executor,
  type McpAuthType,
  type McpToolRecord,
} from '@boldcreate-integrations/db';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { resolveDelivery } from '../delivery/resolve-delivery.js';
import { assignServerNames } from './server-name.js';

export interface VisibleServer {
  /** Canonical, lower-case name used in tool names and in `/{server}/mcp`. */
  name: string;
  installationId: string;
  componentId: string;
  pluginName: string;
  authType: McpAuthType;
  /** Tools as last discovered; empty until someone has tested the server. */
  tools: McpToolRecord[];
  discovered: boolean;
}

/**
 * Runs inside a transaction that carries the key's organization. Two servers that would share a
 * name keep the first (ordered by plugin, then component) so a name always means one server.
 */
export async function loadVisibleServers(
  tx: Executor,
  principal: ApiKeyPrincipal,
  only?: string,
): Promise<VisibleServer[]> {
  const { installations: installs } = await resolveDelivery(tx, principal);
  if (installs.length === 0) return [];
  const byInstall = new Map(installs.map((install) => [install.installationId, install]));
  const rows = await tx
    .select({
      installationId: installationComponentTable.installationId,
      componentId: componentTable.id,
      name: componentTable.name,
      alias: installationComponentTable.alias,
      metadata: componentTable.metadata,
      authType: mcpServerTable.authType,
      tools: mcpServerTable.tools,
      toolsRefreshedAt: mcpServerTable.toolsRefreshedAt,
    })
    .from(installationComponentTable)
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
        eq(installationComponentTable.organizationId, principal.orgId),
        inArray(
          installationComponentTable.installationId,
          installs.map((install) => install.installationId),
        ),
        eq(installationComponentTable.enabled, true),
        eq(componentTable.kind, 'mcp'),
      ),
    );

  const servers: VisibleServer[] = [];
  const candidates = rows
    .filter((row) => (row.metadata as { transport?: string }).transport === 'http')
    .map((row) => ({ ...row, pluginName: byInstall.get(row.installationId)?.pluginName ?? '' }));
  for (const { name, server: row } of assignServerNames(candidates)) {
    if (only !== undefined && name !== only) continue;
    servers.push({
      name,
      installationId: row.installationId,
      componentId: row.componentId,
      pluginName: row.pluginName,
      authType: row.authType ?? 'none',
      tools: row.tools ?? [],
      discovered: row.toolsRefreshedAt !== null && row.toolsRefreshedAt !== undefined,
    });
  }
  return servers;
}
