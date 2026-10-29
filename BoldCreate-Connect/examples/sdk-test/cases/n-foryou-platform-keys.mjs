/**
 * Group N: For You (fyk_) and Platform (plk_) keys
 * TypeScript SDK end-to-end cases for For You (fyk_) and Platform (plk_) keys against the SDK and the gateway, including gateway sync.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/n-foryou-platform-keys.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-n.json (this file alone).
 */
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ConnectSession } from '../../../packages/sdk/dist/index.js';
import { syncPlugins } from '../../../packages/sdk/dist/sync.js';
import { BASE, state, test, ok, rejects, rawGateway } from './lib.mjs';

// Scenario: ConnectSession.fromToken(fyk_...). Expected (as the SDK is written): invalid_token.
// This means the SDK has no way to sync a person's own For You installs.
await test('N1', 'SDK session refuses a For You key', () =>
  rejects(
    async () =>
      ConnectSession.fromToken(state.forYouKey, {
        id: 'fy',
        userId: 'me',
        expiresAt: new Date(Date.now() + 1e9),
      }),
    {
      code: 'invalid_token',
    },
  ),
);

// Scenario: GET /v1/sync on the gateway with the For You key (what the SDK would call).
// Expected: the For team installs (cursor-team-kit, deepwiki) and the owner's For me installs
// (boldcreate-toolkit, ralph-loop, microsoft-learn).
await test('N2', 'For You key: gateway sync shows For team and For me installs', async () => {
  const r = await rawGateway('GET', '/v1/sync', state.forYouKey);
  ok(r.status === 200, `status ${r.status} ${JSON.stringify(r.json).slice(0, 200)}`);
  const entries = r.json.entries.map((e) => `${e.pluginName}:${e.scope}`);
  const names = r.json.entries.map((e) => e.pluginName);
  ok(
    ['cursor-team-kit', 'boldcreate-toolkit', 'ralph-loop'].every((n) => names.includes(n)),
    `entries ${entries}`,
  );
  return entries;
});

// Scenario: the For You key's manifest used with the SDK's own sync code, by wrapping fetch so the
// SDK session sends the fyk_ key. Expected: files of the For You installs are placed.
await test('N3', 'For You key works with syncPlugins when wrapped', async () => {
  const fakeToken = 'stk_wrapped';
  const swap = (url, init) =>
    fetch(url, {
      ...init,
      headers: { ...init.headers, authorization: `Bearer ${state.forYouKey}` },
    });
  const s = ConnectSession.fromToken(
    fakeToken,
    { id: 'fy', userId: 'owner@sdk.test', expiresAt: new Date(Date.now() + 1e9) },
    { baseUrl: BASE, fetch: swap },
  );
  const d = await mkdtemp(join(tmpdir(), 'sdk-fy-'));
  const r = await syncPlugins(s, { dir: d });
  const top = await readdir(d);
  await rm(d, { recursive: true, force: true });
  ok(r.added.length > 0, 'nothing placed');
  return { added: r.added.length, plugins: top.filter((t) => !t.startsWith('.')) };
});

// Scenario: MCP tools/list with the For You key on the gateway /mcp. Expected: tools of deepwiki
// (For team) and microsoft-learn (For me).
await test('N4', 'For You key: MCP tools/list on the gateway', async () => {
  const init = await rawGateway('POST', '/mcp', state.forYouKey, {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 't', version: '1' },
    },
  });
  const list = await rawGateway('POST', '/mcp', state.forYouKey, {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {},
  });
  const tools = list.json?.result?.tools?.map((t) => t.name) ?? [];
  ok(
    tools.length > 0,
    `init ${init.status}, list ${list.status} ${JSON.stringify(list.json).slice(0, 200)}`,
  );
  return tools;
});

// Scenario: the For You key on session routes (/v1/session/plugins). Expected: refused; those
// routes are for stk_ tokens only.
await test('N5', 'For You key on session routes is refused', async () => {
  const r = await rawGateway('GET', '/v1/session/plugins', state.forYouKey);
  ok(r.status === 401 || r.status === 403 || r.status === 404, `status ${r.status}`);
  return r.status;
});

// Scenario: the Platform key (org:manage) on /v1/sync and /mcp. Expected: refused; a platform key
// manages the org, it does not deliver plugins.
await test('N6', 'Platform key cannot sync or call MCP', async () => {
  const sync = await rawGateway('GET', '/v1/sync', state.platformKey);
  const mcp = await rawGateway('POST', '/mcp', state.platformKey, {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {},
  });
  ok(sync.status >= 400 && mcp.status >= 400, `sync ${sync.status}, mcp ${mcp.status}`);
  return { sync: sync.status, mcp: mcp.status };
});
