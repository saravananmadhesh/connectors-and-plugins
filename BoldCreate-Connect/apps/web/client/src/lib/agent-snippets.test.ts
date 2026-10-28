import { describe, expect, it } from 'vitest';
import { AGENT_TARGETS, buildSnippet, mcpEndpoint } from './agent-snippets';

describe('agent snippets', () => {
  it('joins the endpoint without doubled slashes or stray spaces', () => {
    expect(mcpEndpoint(' https://gw.example.com// ')).toBe('https://gw.example.com/mcp');
  });

  it('builds every target with the endpoint and the key', () => {
    for (const target of AGENT_TARGETS) {
      const { text, where } = buildSnippet(target.value, 'https://gw.example.com', 'bc_key');
      expect(text).toContain('https://gw.example.com/mcp');
      expect(text).toContain('Bearer bc_key');
      expect(where.length).toBeGreaterThan(0);
    }
  });

  it('writes valid JSON for the file-based targets', () => {
    const cursor = JSON.parse(buildSnippet('cursor', 'http://x', 'k').text) as {
      mcpServers: Record<string, { url: string }>;
    };
    expect(cursor.mcpServers.boldcreate?.url).toBe('http://x/mcp');
    const vscode = JSON.parse(buildSnippet('vscode', 'http://x', 'k').text) as {
      servers: Record<string, { type: string }>;
    };
    expect(vscode.servers.boldcreate?.type).toBe('http');
  });
});
