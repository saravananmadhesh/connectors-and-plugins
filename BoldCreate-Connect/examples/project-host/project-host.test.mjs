import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { ConnectClient } from '../../packages/sdk/dist/index.js';
import * as node from '../../packages/sdk/dist/sync.js';
import { createHost } from './host.mjs';

const KEY = 'prk_0123456789abcdef.' + 'PROJECT-KEY-PROJECT-KEY-PROJECT';
const TOKEN = 'stk_fedcba9876543210.' + 'zyxwvutsrqponmlkjihgfedcba012345';
const sdk = { ConnectClient, node };

const session = (id, expiresAt) => ({
  id,
  userId: 'user-42',
  token: TOKEN,
  plugins: [],
  tools: {},
  authConfigs: [],
  status: 'active',
  createdAt: '2026-10-17T00:00:00.000Z',
  expiresAt,
});

const server = (over = {}) => ({
  componentId: 'cmp_1',
  name: 'search',
  serverName: 'alpha-search',
  url: 'https://gateway.test/alpha-search/mcp',
  transport: 'http',
  description: '',
  ready: true,
  setup: { kind: 'none' },
  ...over,
});

const manifest = (servers) => ({
  revision: 'rev1',
  pollAfterSeconds: 60,
  entries: [
    {
      installationId: 'ins_1',
      pluginId: 'plg_alpha',
      pluginName: 'alpha',
      versionId: 'pv_1',
      version: '1.0.0',
      scope: 'user',
      yanked: false,
      sha256: '',
      sizeBytes: 0,
      href: '',
      components: [],
      mcp: servers,
      setup: { kind: 'none' },
    },
  ],
  skipped: [],
});

const reply = (body, status = 200) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/** A fetch that answers by `METHOD /path` and records the calls. */
function fakeFetch(routes) {
  const calls = [];
  const impl = async (input, init = {}) => {
    const url = new URL(String(input));
    const key = `${init.method ?? 'GET'} ${url.pathname}`;
    calls.push({ key, headers: init.headers, body: init.body ? JSON.parse(init.body) : undefined });
    const answer = routes[key];
    if (!answer) throw new Error(`No reply set for ${key}`);
    return typeof answer === 'function' ? answer() : answer.clone();
  };
  return { impl, calls };
}

async function withFolder(run) {
  const dir = await mkdtemp(join(tmpdir(), 'project-host-'));
  try {
    await run(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

const FAR = '2099-01-01T00:00:00.000Z';

test('reuses one session for a user instead of making one per call', async () => {
  const { impl, calls } = fakeFetch({
    'POST /v1/project/sessions': reply(session('pjs_1', FAR), 201),
  });
  const host = createHost({ sdk, apiKey: KEY, baseUrl: 'https://api.test', dir: '.', fetch: impl });
  const first = await host.sessionFor('user-42');
  const second = await host.sessionFor('user-42');
  assert.equal(first, second);
  assert.equal(calls.filter((call) => call.key === 'POST /v1/project/sessions').length, 1);
});

test('makes a new session shortly before the old one ends', async () => {
  const soon = new Date(Date.now() + 3_600_000).toISOString();
  const { impl, calls } = fakeFetch({
    'POST /v1/project/sessions': reply(session('pjs_1', soon), 201),
  });
  const host = createHost({ sdk, apiKey: KEY, baseUrl: 'https://api.test', dir: '.', fetch: impl });
  await host.sessionFor('user-42');
  await host.sessionFor('user-42');
  assert.equal(calls.filter((call) => call.key === 'POST /v1/project/sessions').length, 2);
});

test('writes the MCP file with a placeholder and never the token', async () => {
  await withFolder(async (dir) => {
    const { impl } = fakeFetch({
      'POST /v1/project/sessions': reply(session('pjs_1', FAR), 201),
      'GET /v1/sync': reply(manifest([server()])),
      'POST /v1/sync/reports': reply(undefined, 204),
    });
    const host = createHost({ sdk, apiKey: KEY, baseUrl: 'https://api.test', dir, fetch: impl });
    const result = await host.prepareUser('user-42', { callbackUrl: 'https://app.example/back' });
    const text = await readFile(join(dir, 'user-42', 'mcp.json'), 'utf8');
    assert.deepEqual(result.servers, ['alpha-search']);
    assert.deepEqual(result.signIn, []);
    assert.match(text, /\$\{CONNECT_TOKEN\}/);
    assert.ok(!text.includes('zyxwvuts'));
    assert.ok(!text.includes(KEY));
  });
});

test('lists a sign-in link for a server that needs one, and none for a ready server', async () => {
  await withFolder(async (dir) => {
    const { impl, calls } = fakeFetch({
      'POST /v1/project/sessions': reply(session('pjs_1', FAR), 201),
      'GET /v1/sync': reply(
        manifest([
          server(),
          server({
            componentId: 'cmp_2',
            serverName: 'alpha-github',
            ready: false,
            setup: { kind: 'connect' },
          }),
        ]),
      ),
      'POST /v1/sync/reports': reply(undefined, 204),
      'POST /v1/session/connections': reply(
        { redirectUrl: 'https://provider.example/auth?s=1' },
        201,
      ),
    });
    const host = createHost({ sdk, apiKey: KEY, baseUrl: 'https://api.test', dir, fetch: impl });
    const result = await host.prepareUser('user-42', { callbackUrl: 'https://app.example/back' });
    assert.deepEqual(result.signIn, [
      { server: 'alpha-github', redirectUrl: 'https://provider.example/auth?s=1' },
    ]);
    const start = calls.find((call) => call.key === 'POST /v1/session/connections');
    assert.deepEqual(start.body, { componentId: 'cmp_2', callbackUrl: 'https://app.example/back' });
  });
});

test('sends the project key only to create the session; the session token does the rest', async () => {
  await withFolder(async (dir) => {
    const { impl, calls } = fakeFetch({
      'POST /v1/project/sessions': reply(session('pjs_1', FAR), 201),
      'GET /v1/sync': reply(manifest([server()])),
      'POST /v1/sync/reports': reply(undefined, 204),
    });
    const host = createHost({ sdk, apiKey: KEY, baseUrl: 'https://api.test', dir, fetch: impl });
    await host.prepareUser('user-42', { callbackUrl: 'https://app.example/back' });
    const bearer = (call) => new Headers(call.headers).get('authorization');
    for (const call of calls) {
      const expected = call.key.startsWith('POST /v1/project/')
        ? `Bearer ${KEY}`
        : `Bearer ${TOKEN}`;
      assert.equal(bearer(call), expected, call.key);
    }
  });
});
