import type { McpServer } from './types.js';

export interface McpConfigOptions {
  format: 'standard' | 'vscode';
  /** Keep the real token in the text. Off by default, so the text can be saved or shown. */
  literalToken?: boolean;
}

/** The name an agent should read the token from when the text carries no literal one. */
export const TOKEN_PLACEHOLDER = '${CONNECT_TOKEN}';

function headersOf(server: McpServer, literal: boolean): Record<string, string> {
  if (literal) return { ...server.headers };
  const headers: Record<string, string> = {};
  for (const [name, value] of Object.entries(server.headers)) {
    headers[name] = name.toLowerCase() === 'authorization' ? `Bearer ${TOKEN_PLACEHOLDER}` : value;
  }
  return headers;
}

/**
 * The text of an MCP configuration file for the servers of a session. `standard` is the
 * `mcpServers` shape most agents read; `vscode` is the `servers` shape VS Code reads.
 */
export function toMcpConfig(servers: readonly McpServer[], options: McpConfigOptions): string {
  const literal = options.literalToken === true;
  const entries = Object.fromEntries(
    servers.map((server) => [
      server.name,
      { type: 'http', url: server.url, headers: headersOf(server, literal) },
    ]),
  );
  const config = options.format === 'vscode' ? { servers: entries } : { mcpServers: entries };
  return `${JSON.stringify(config, null, 2)}\n`;
}
