/**
 * Group B: Keys
 * TypeScript SDK end-to-end cases for which key the SDK accepts where: project, wrong, For You and Platform keys.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/b-keys.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-b.json (this file alone).
 */
import { ConnectAuthError, ConnectClient } from '../../../packages/sdk/dist/index.js';
import { BASE, state, test, ok, rejects, connect } from './lib.mjs';

// Scenario: a made-up prk_ key calls users.list. Expected: ConnectAuthError 401.
await test('B1', 'unknown project key is refused with 401', () =>
  rejects(
    () => new ConnectClient({ apiKey: 'prk_notarealkey000000000000', baseUrl: BASE }).users.list(),
    {
      type: ConnectAuthError,
      status: 401,
    },
  ),
);

// Scenario: the real project key lists users. Expected: a page with items[].
await test('B2', 'project key works on the gateway', async () => {
  const page = await connect.users.list({ limit: 1 });
  ok(Array.isArray(page.items), 'no items');
  return { items: page.items.length, nextCursor: page.nextCursor !== undefined };
});

// Scenario: the For You key (fyk_) used as ConnectClient apiKey. Expected: refused (401/403),
// a personal key must never manage a project.
await test('B3', 'For You key cannot call project routes', () =>
  rejects(() => new ConnectClient({ apiKey: state.forYouKey, baseUrl: BASE }).users.list(), {
    type: ConnectAuthError,
  }),
);

// Scenario: the Platform key (plk_) used as ConnectClient apiKey. Expected: refused (401/403).
await test('B4', 'Platform key cannot call project routes', () =>
  rejects(() => new ConnectClient({ apiKey: state.platformKey, baseUrl: BASE }).plugins.list(), {
    type: ConnectAuthError,
  }),
);

// Scenario: the project key straight on the api port 3001. Expected: refused; hosts use the gateway.
await test('B5', 'project key on the api port is refused', () =>
  rejects(
    () =>
      new ConnectClient({
        apiKey: state.projectKey,
        baseUrl: 'http://localhost:3001',
      }).users.list(),
    {
      type: ConnectAuthError,
    },
  ),
);
