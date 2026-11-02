/**
 * Group H: Connections
 * TypeScript SDK end-to-end cases for connections: list, start on a no-auth server, delete.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/h-connections.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-h.json (this file alone).
 */
import { ConnectNotFoundError } from '../../../packages/sdk/dist/index.js';
import { test, rejects, connect, userA, ensureUser, mcpComponents } from './lib.mjs';

await ensureUser(userA);
const { deepwikiComponent } = await mcpComponents();

// Scenario: connections.list(). Expected: an array (empty: no sign-ins in this run).
await test('H1', 'connections.list', async () => {
  const list = await connect.connections.list();
  const mine = await connect.connections.list({ userId: userA });
  return { all: list.length, userA: mine.length };
});

// Scenario: connections.start(userA, deepwiki component, { callbackUrl }) for a no-auth server.
// Expected: refused; there is nothing to sign in to.
await test('H2', 'connections.start on a no-auth server is refused', async () => {
  return rejects(() =>
    connect.connections.start(userA, deepwikiComponent, {
      callbackUrl: 'https://host.example/back',
    }),
  );
});

// Scenario: connections.delete('con_unknown'). Expected: 404.
await test('H3', 'connections.delete of an unknown id is 404', () =>
  rejects(() => connect.connections.delete('con_00000000000000000000000000000000'), {
    type: ConnectNotFoundError,
  }),
);
