/**
 * The name an MCP server is reached under: in `/{server}/mcp` and in tool names. The gateway and
 * the sync manifest both name servers here, so the address a manifest lists is the one the gateway
 * serves.
 */

/** Canonical server name: lower case, letters, digits and `-`, never the tool separator. */
export function canonicalServerName(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface NamedServerInput {
  pluginName: string;
  /** The component's own name. */
  name: string;
  /** The installation's alias for the component, when one was set. */
  alias: string | null;
}

/**
 * Names a list of servers. Two servers that would share a name keep the first, ordered by plugin
 * and then component name, so a name always means one server. A server whose name is empty is left
 * out. Returns the kept inputs with their names, in that order.
 */
export function assignServerNames<T extends NamedServerInput>(
  servers: readonly T[],
): { name: string; server: T }[] {
  const taken = new Set<string>();
  const named: { name: string; server: T }[] = [];
  const ordered = [...servers].sort((a, b) =>
    a.pluginName === b.pluginName
      ? a.name.localeCompare(b.name)
      : a.pluginName.localeCompare(b.pluginName),
  );
  for (const server of ordered) {
    const name = canonicalServerName(server.alias ?? server.name);
    if (name === '' || taken.has(name)) continue;
    taken.add(name);
    named.push({ name, server });
  }
  return named;
}
