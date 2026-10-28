import assert from 'node:assert/strict';
import type { IncomingMessage } from 'node:http';
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client';
import { createMcpFastifyApp } from '@modelcontextprotocol/fastify';
import { toNodeHandler } from '@modelcontextprotocol/node';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';

// Loopback-only fixed fixture. Do not mount this unauthenticated tool on a public gateway.
// legacy: 'reject' forces modern 2026-07-28 era; legacy clients receive 400.
const handler = createMcpHandler(
  () => {
    const server = new McpServer({ name: 'protocol-fixture', version: '0.0.0' });
    server.registerTool(
      'echo_fixture',
      {
        description: 'Return a bounded fixture value',
        inputSchema: z.object({ text: z.string().max(80) }),
      },
      async ({ text }) => ({ content: [{ type: 'text', text }] }),
    );
    return server;
  },
  { legacy: 'reject' },
);

const app = createMcpFastifyApp();
const node = toNodeHandler(handler);
app.all('/mcp', (request, reply) =>
  node(request.raw as IncomingMessage & { method: string; url: string }, reply.raw, request.body),
);

await app.listen({ host: '127.0.0.1', port: 0 });
try {
  const address = app.server.address();
  assert(address && typeof address !== 'string');
  const client = new Client({ name: 'protocol-probe', version: '0.0.0' });
  const transport = new StreamableHTTPClientTransport(
    new URL(`http://127.0.0.1:${address.port}/mcp`),
  );
  try {
    // Pin to the modern 2026-07-28 era; rejects legacy 2025-11-25 servers.
    client.setVersionNegotiation({ mode: { pin: '2026-07-28' } });
    await client.connect(transport);
    const discovery = await client.discover();
    assert(discovery, 'Modern discovery did not complete');
    assert(
      Array.isArray(discovery.supportedVersions) && discovery.supportedVersions.length > 0,
      `Expected at least one supported version, got: ${JSON.stringify(discovery.supportedVersions)}`,
    );
    const { tools } = await client.listTools();
    assert.deepEqual(
      tools.map((tool) => tool.name),
      ['echo_fixture'],
    );
    const result = await client.callTool({
      name: 'echo_fixture',
      arguments: { text: 'protocol-ok' },
    });
    assert.deepEqual(result.content, [{ type: 'text', text: 'protocol-ok' }]);
    process.stdout.write('Modern MCP discover/list/call fixture passed (2026-07-28).\n');
  } finally {
    await client.close();
  }
} finally {
  await app.close();
}
