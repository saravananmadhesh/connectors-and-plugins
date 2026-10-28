export const AGENT_TARGETS = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'vscode', label: 'VS Code' },
  { value: 'curl', label: 'curl' },
  { value: 'custom', label: 'Custom agent' },
] as const;

export type AgentTarget = (typeof AGENT_TARGETS)[number]['value'];

export interface Snippet {
  /** Where the text goes, for example a file path. */
  where: string;
  text: string;
}

/** The address an agent calls: the gateway root with one trailing path and no extra slash. */
export function mcpEndpoint(gatewayUrl: string): string {
  return `${gatewayUrl.trim().replace(/\/+$/, '')}/mcp`;
}

/** Ready-to-paste setup text for one agent. The key stays a placeholder unless one is passed. */
export function buildSnippet(target: AgentTarget, gatewayUrl: string, apiKey: string): Snippet {
  const url = mcpEndpoint(gatewayUrl);
  const header = `Bearer ${apiKey}`;
  switch (target) {
    case 'cursor':
      return {
        where: 'Save as .cursor/mcp.json in your project, or ~/.cursor/mcp.json for every project.',
        text: JSON.stringify(
          { mcpServers: { boldcreate: { url, headers: { Authorization: header } } } },
          null,
          2,
        ),
      };
    case 'claude-code':
      return {
        where: 'Run once in a terminal.',
        text: `claude mcp add --transport http boldcreate ${url} --header "Authorization: ${header}"`,
      };
    case 'vscode':
      return {
        where: 'Save as .vscode/mcp.json in your workspace.',
        text: JSON.stringify(
          { servers: { boldcreate: { type: 'http', url, headers: { Authorization: header } } } },
          null,
          2,
        ),
      };
    case 'curl':
      return {
        where: 'Lists the tools your key can reach.',
        text: [
          `curl -X POST ${url} \\`,
          `  -H "Authorization: ${header}" \\`,
          `  -H "Content-Type: application/json" \\`,
          `  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
        ].join('\n'),
      };
    case 'custom':
      return {
        where: 'Point any MCP client that speaks streamable HTTP at this server.',
        text: `URL:     ${url}\nHeader:  Authorization: ${header}`,
      };
  }
}
