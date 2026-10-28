import { describe, expect, it } from 'vitest';
import { toMcpConfig } from './mcp-config.js';
import type { McpServer } from './types.js';

const SERVERS: McpServer[] = [
  {
    name: 'search',
    url: 'https://gateway.test/search/mcp',
    headers: {
      Authorization: 'Bearer stk_0123456789abcdef.secretsecretsecretsecret',
      'x-extra': '1',
    },
    ready: true,
    setup: { kind: 'none' },
  },
];

describe('toMcpConfig', () => {
  it('writes the standard shape with a placeholder instead of the token', () => {
    const text = toMcpConfig(SERVERS, { format: 'standard' });
    expect(JSON.parse(text)).toEqual({
      mcpServers: {
        search: {
          type: 'http',
          url: 'https://gateway.test/search/mcp',
          headers: { Authorization: 'Bearer ${CONNECT_TOKEN}', 'x-extra': '1' },
        },
      },
    });
    expect(text).not.toContain('secretsecret');
  });

  it('writes the VS Code shape', () => {
    const config = JSON.parse(toMcpConfig(SERVERS, { format: 'vscode' })) as Record<
      string,
      unknown
    >;
    expect(Object.keys(config)).toEqual(['servers']);
  });

  it('keeps the literal token only when asked', () => {
    const text = toMcpConfig(SERVERS, { format: 'standard', literalToken: true });
    expect(text).toContain('Bearer stk_0123456789abcdef.secretsecretsecretsecret');
  });

  it('matches the header name in any case', () => {
    const lower: McpServer[] = [{ ...SERVERS[0]!, headers: { authorization: 'Bearer real' } }];
    expect(toMcpConfig(lower, { format: 'standard' })).not.toContain('real');
  });

  it('writes an empty list of servers', () => {
    expect(JSON.parse(toMcpConfig([], { format: 'standard' }))).toEqual({ mcpServers: {} });
  });

  it('ends with a newline', () => {
    expect(toMcpConfig([], { format: 'vscode' }).endsWith('\n')).toBe(true);
  });
});
