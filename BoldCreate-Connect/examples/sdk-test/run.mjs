/**
 * End-to-end test of the TypeScript SDK (`packages/sdk`) against a running Connect stack.
 *
 * How to run
 *   1. pnpm install && pnpm build && pnpm dev            (from the repo root)
 *   2. node examples/sdk-test/setup-local.mjs            (once; publishes plugins, makes keys)
 *   3. node examples/sdk-test/run.mjs                    (this file)
 *   Options: SDK_TEST_BASE_URL (default http://localhost:3002, the gateway), SDK_TEST_STATE
 *   (default examples/sdk-test/.local/state.json), SDK_TEST_ONLY=A,K (run some groups only; K, L and M also need D).
 *   Results: one line per case on stdout, and examples/sdk-test/.local/ts-results.json.
 *
 * What it covers (every case below has its own scenario and expected result next to it)
 *   A  client options and input checks            offline, no server needed
 *   B  keys: project, wrong, For You, Platform    which key the SDK accepts where
 *   C  users                                      list, filters, paging, setName, per-user installs
 *   D  sessions                                   create options, idempotency, list, get, delete
 *   E  project plugins ("platform" for everyone)  list, catalog queries, add, update, remove
 *   F  user install policy                        mode, allow-list, plugin sets
 *   G  auth configs                               list, setVariables (Context7 key)
 *   H  connections                                list, start on a no-auth server, delete
 *   I  logs and usage
 *   J  webhooks                                   verify (good, tampered, old), deliveries, real delivery
 *   K  session ("For you" self-service)           catalog, install, update, remove, variables, mcp, manifest
 *   L  MCP through the session                    initialize, tools/list, tools/call on DeepWiki / MS Learn
 *   M  file sync                                  syncPlugins add/unchanged/hooks/kinds/plugins/conflicts/remove/stale
 *   N  For You (fyk_) and Platform (plk_) keys    against the SDK session API and the gateway
 *   O  cancellation, timeout, retry
 *   Q  one component on/off per user               users and session setComponentEnabled / clear
 *
 * Plugins used: boldcreate-toolkit (skills, agents, rules, hook), cursor-team-kit, ralph-loop
 * and continual-learning (hooks), teaching, create-plugin, and the HTTP MCP plugins deepwiki and
 * microsoft-learn (no auth) and context7 (needs CONTEXT7_API_KEY).
 *
 * The keys and the session tokens are never printed.
 */
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { createHmac } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  ConnectAuthError,
  ConnectClient,
  ConnectError,
  ConnectIntegrityError,
  ConnectNotFoundError,
  ConnectSession,
  ConnectSetupRequiredError,
} from '../../packages/sdk/dist/index.js';
import { syncPlugins, toMcpConfig, TOKEN_PLACEHOLDER } from '../../packages/sdk/dist/sync.js';

const BASE = process.env.SDK_TEST_BASE_URL ?? 'http://localhost:3002';
const STATE = process.env.SDK_TEST_STATE ?? join(import.meta.dirname, '.local', 'state.json');
const ONLY = process.env.SDK_TEST_ONLY?.split(',');
const STANDIN_WEBHOOKS = process.env.SDK_TEST_WEBHOOK_LOG; // optional file the receiver writes
const state = JSON.parse(await readFile(STATE, 'utf8'));
const RUN = Date.now().toString(36);
const uid = (name) => `ts-${RUN}-${name}`;
const P = (name) => state.plugins[name];

const results = [];
const line = (text) => process.stdout.write(`${text}\n`);

/** Runs one case. `fn` returns evidence; throwing fails the case. */
async function test(id, title, fn) {
  if (ONLY && !ONLY.includes(id.match(/^[A-Z]+/)[0])) return;
  const started = Date.now();
  try {
    const evidence = await fn();
    results.push({
      id,
      title,
      result: 'pass',
      evidence: short(evidence),
      ms: Date.now() - started,
    });
    line(`PASS ${id} ${title}: ${short(evidence)}`);
  } catch (error) {
    const evidence = error instanceof Expected ? error.message : describe(error);
    results.push({ id, title, result: 'fail', evidence, ms: Date.now() - started });
    line(`FAIL ${id} ${title}: ${evidence}`);
  }
}

class Expected extends Error {}
const describe = (e) =>
  e instanceof ConnectError
    ? `${e.constructor.name} code=${e.code} status=${e.status} ${e.message}`
    : `${e?.constructor?.name ?? 'Error'} ${e?.message ?? e}`;
const short = (v) => {
  const text = typeof v === 'string' ? v : JSON.stringify(v);
  return (text ?? 'undefined').slice(0, 400);
};
function ok(condition, message) {
  if (!condition) throw new Expected(message);
}
/** Expects `fn` to reject with the given class and, when set, the code or status. */
async function rejects(fn, { type = ConnectError, code, status } = {}) {
  try {
    await fn();
  } catch (error) {
    ok(error instanceof type, `expected ${type.name}, got ${describe(error)}`);
    if (code) ok(error.code === code, `expected code ${code}, got ${describe(error)}`);
    if (status !== undefined)
      ok(error.status === status, `expected status ${status}, got ${describe(error)}`);
    return `${error.constructor.name} ${error.code} ${error.status}`;
  }
  throw new Expected('expected an error, the call succeeded');
}
const leaks = (text, secret) => typeof text === 'string' && secret && text.includes(secret);

const connect = new ConnectClient({ apiKey: state.projectKey, baseUrl: BASE });

async function rawGateway(method, path, token, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json, text/event-stream',
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    const data = text.split('\n').find((l) => l.startsWith('data:'));
    json = data ? JSON.parse(data.slice(5)) : text;
  }
  return { status: res.status, json, headers: res.headers };
}

/** One JSON-RPC call on an MCP server the way an agent would make it. */
async function mcpCall(server, method, params, sessionId) {
  const res = await fetch(server.url, {
    method: 'POST',
    headers: {
      ...server.headers,
      'content-type': 'application/json',
      accept: 'application/json, text/event-stream',
      'mcp-protocol-version': '2025-06-18',
      ...(sessionId ? { 'mcp-session-id': sessionId } : {}),
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: Math.floor(Math.random() * 1e6), method, params }),
  });
  const text = await res.text();
  const data = text.trim().startsWith('{')
    ? JSON.parse(text)
    : JSON.parse((text.split('\n').find((l) => l.startsWith('data:')) ?? 'data:null').slice(5));
  return { status: res.status, data, sessionId: res.headers.get('mcp-session-id') ?? sessionId };
}

// ─── A. Client options and input checks (offline) ─────────────────────────────────────────────

// Scenario: new ConnectClient({ apiKey: '' }). Expected: throws ConnectError code invalid_key.
await test('A1', 'constructor refuses an empty key', () =>
  rejects(async () => new ConnectClient({ apiKey: '' }), { code: 'invalid_key' }),
);

// Scenario: baseUrl http://example.com. Expected: invalid_base_url (key would go in clear text).
await test('A2', 'http base URL on a remote host is refused', () =>
  rejects(async () => new ConnectClient({ apiKey: 'prk_x', baseUrl: 'http://example.com' }), {
    code: 'invalid_base_url',
  }),
);

// Scenario: same with allowInsecureHttp: true. Expected: the client is made.
await test('A3', 'allowInsecureHttp lets an http host through', async () => {
  const c = new ConnectClient({
    apiKey: 'prk_x',
    baseUrl: 'http://example.com',
    allowInsecureHttp: true,
  });
  return c.toJSON();
});

// Scenario: base URL with user:password@. Expected: invalid_base_url.
await test('A4', 'base URL with credentials is refused', () =>
  rejects(
    async () => new ConnectClient({ apiKey: 'prk_x', baseUrl: 'https://u:p@api.example.com' }),
    {
      code: 'invalid_base_url',
    },
  ),
);

// Scenario: JSON.stringify and String() of a client. Expected: neither shows the key.
await test('A5', 'client toJSON / toString never show the key', () => {
  const text = `${JSON.stringify(connect)} ${String(connect)}`;
  ok(!leaks(text, state.projectKey), 'the key appears');
  return text;
});

// Scenario: connect.create(user, { plugins: [] }). Expected: invalid_plugins, no call made.
await test('A6', 'create refuses an empty plugin list', () =>
  rejects(() => connect.create(uid('a6'), { plugins: [] }), { code: 'invalid_plugins' }),
);

// Scenario: user id '' and a 256 character id. Expected: invalid_user_id for both.
await test('A7', 'create refuses a user id of 0 or 256 characters', async () => {
  await rejects(() => connect.create(''), { code: 'invalid_user_id' });
  return rejects(() => connect.create('x'.repeat(256)), { code: 'invalid_user_id' });
});

// Scenario: idempotencyKey 'has space'. Expected: invalid_idempotency_key.
await test('A8', 'idempotency key with a space is refused', () =>
  rejects(() => connect.create(uid('a8'), { idempotencyKey: 'has space' }), {
    code: 'invalid_idempotency_key',
  }),
);

// Scenario: timeoutMs -1 and retry.maxRetries NaN. Expected: invalid_option.
await test('A9', 'negative timeout and NaN retry are refused', async () => {
  await rejects(async () => new ConnectClient({ apiKey: 'prk_x', baseUrl: BASE, timeoutMs: -1 }), {
    code: 'invalid_option',
  });
  return rejects(
    async () =>
      new ConnectClient({ apiKey: 'prk_x', baseUrl: BASE, retry: { maxRetries: Number.NaN } }),
    { code: 'invalid_option' },
  );
});

// Scenario: ConnectSession.fromToken('prk_...'). Expected: invalid_token (only stk_ is a session).
await test('A10', 'fromToken refuses a token that is not stk_', () =>
  rejects(
    async () =>
      ConnectSession.fromToken('prk_abc', { id: 'x', userId: 'u', expiresAt: new Date() }),
    {
      code: 'invalid_token',
    },
  ),
);

// Scenario: toMcpConfig for two servers, standard / vscode / literalToken.
// Expected: mcpServers vs servers shape; placeholder ${CONNECT_TOKEN} unless literalToken.
await test('A11', 'toMcpConfig standard, vscode and literal token', () => {
  const servers = [
    {
      name: 'a',
      url: 'https://g/a/mcp',
      headers: { Authorization: 'Bearer stk_secret' },
      ready: true,
      setup: { kind: 'none' },
    },
  ];
  const std = JSON.parse(toMcpConfig(servers, { format: 'standard' }));
  const vs = JSON.parse(toMcpConfig(servers, { format: 'vscode' }));
  const lit = JSON.parse(toMcpConfig(servers, { format: 'standard', literalToken: true }));
  ok(
    std.mcpServers.a.headers.Authorization === `Bearer ${TOKEN_PLACEHOLDER}`,
    'standard keeps the token',
  );
  ok(vs.servers.a.type === 'http', 'vscode shape wrong');
  ok(lit.mcpServers.a.headers.Authorization === 'Bearer stk_secret', 'literal token missing');
  return { std: std.mcpServers.a.headers, vscodeKeys: Object.keys(vs) };
});

// ─── B. Keys ──────────────────────────────────────────────────────────────────────────────────

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

// ─── D. Sessions (made first; later groups use them) ──────────────────────────────────────────

const userA = uid('alice');
const userB = uid('bob');
let sessionA;

// Scenario: connect.create(userA). Expected: session with stk_ token, userId, expiresAt ~30 days.
await test('D1', 'create a session for a new user', async () => {
  sessionA = await connect.create(userA);
  const days = (sessionA.expiresAt - Date.now()) / 86400_000;
  ok(sessionA.token.startsWith('stk_'), 'token is not stk_');
  ok(days > 29 && days < 31, `expires in ${days} days, expected 30`);
  ok(!leaks(JSON.stringify(sessionA), sessionA.token), 'toJSON shows the token');
  return { ...sessionA.toJSON(), days: Math.round(days) };
});

// Scenario: create with the same idempotencyKey twice. Expected: the same session id both times.
await test('D2', 'same idempotency key gives back the first session', async () => {
  const key = `idem-${RUN}`;
  const one = await connect.create(userB, { idempotencyKey: key });
  const two = await connect.create(userB, { idempotencyKey: key });
  ok(one.id === two.id, `ids differ: ${one.id} ${two.id}`);
  return { id: one.id };
});

// Scenario: create with plugins: ['ralph-loop'] (a project plugin). Expected: session.plugins has it,
// and the session's manifest holds only ralph-loop.
await test('D3', 'plugin allow-list narrows the session', async () => {
  const s = await connect.create(uid('d3'), { plugins: ['ralph-loop'] });
  const info = await connect.sessions.get(s.id);
  const m = await s.manifest();
  const names = m.entries.map((e) => e.pluginName);
  ok(names.length === 1 && names[0] === 'ralph-loop', `manifest has ${names}`);
  return { plugins: info.plugins, manifest: names };
});

// Scenario: create with plugins: ['teaching'] (published but not in the project).
// Expected: refused with a clear code (not a session that silently has nothing).
await test('D4', 'allow-list naming a plugin outside the project is refused', () =>
  rejects(() => connect.create(uid('d4'), { plugins: ['teaching'] })),
);

// Scenario: expiresInSeconds 3600. Expected: expiresAt about one hour away.
await test('D5', 'expiresInSeconds sets the lifetime', async () => {
  const s = await connect.create(uid('d5'), { expiresInSeconds: 3600 });
  const minutes = (s.expiresAt - Date.now()) / 60000;
  ok(minutes > 55 && minutes < 65, `expires in ${minutes} minutes`);
  return { minutes: Math.round(minutes) };
});

// Scenario: expiresInSeconds of 366 days. Expected: refused (365 days is the most).
await test('D6', 'lifetime over 365 days is refused', () =>
  rejects(() => connect.create(uid('d6'), { expiresInSeconds: 366 * 86400 })),
);

// Scenario: tools: { disable: ['deepwiki.ask_question'], disableDestructive: true } (a tool is
// named <server>.<tool>). Expected: stored on the session (sessions.get shows it).
// Scenario: tools: { disable: ['ask_question'] } (no server part). Expected: refused 400; the
// SDK type only says string[], so a host learns the format from this error.
await test('D7b', 'a tool name without its server is refused', () =>
  rejects(() => connect.create(uid('d7b'), { tools: { disable: ['ask_question'] } }), {
    code: 'validation_failed',
  }),
);

await test('D7', 'tool policy is stored on the session', async () => {
  const s = await connect.create(uid('d7'), {
    tools: { disable: ['deepwiki.ask_question'], disableDestructive: true },
  });
  const info = await connect.sessions.get(s.id);
  ok(
    info.tools?.disable?.includes('deepwiki.ask_question'),
    `tools: ${JSON.stringify(info.tools)}`,
  );
  return info.tools;
});

// Scenario: sessions.list({ userId }). Expected: only that user's sessions.
await test('D8', 'sessions.list filters by user', async () => {
  const page = await connect.sessions.list({ userId: userB });
  ok(
    page.items.length >= 1 && page.items.every((s) => s.userId === userB),
    'other users in the list',
  );
  return page.items.map((s) => `${s.userId}:${s.status}`);
});

// Scenario: sessions.list({ limit: 1 }) then the next page by cursor. Expected: two different ids.
await test('D9', 'sessions.list pages by cursor', async () => {
  const one = await connect.sessions.list({ limit: 1 });
  ok(one.nextCursor, 'no nextCursor with limit 1');
  const two = await connect.sessions.list({ limit: 1, cursor: one.nextCursor });
  ok(one.items[0].id !== two.items[0].id, 'same item on both pages');
  return [one.items[0].id, two.items[0].id];
});

// Scenario: sessions.get('pjs_doesnotexist'). Expected: ConnectNotFoundError 404.
await test('D10', 'sessions.get of an unknown id is 404', () =>
  rejects(() => connect.sessions.get('pjs_00000000000000000000000000000000'), {
    type: ConnectNotFoundError,
  }),
);

// Scenario: sessions.delete(id), then use its token. Expected: status revoked, token refused 401.
await test('D11', 'deleting a session ends it at once', async () => {
  const s = await connect.create(uid('d11'));
  await connect.sessions.delete(s.id);
  const info = await connect.sessions.get(s.id);
  const refused = await rejects(() => s.manifest(), { type: ConnectAuthError });
  ok(info.status === 'revoked', `status ${info.status}`);
  return { status: info.status, refused };
});

// Scenario: session.refresh() on a session made by create. Expected: a new id, same user.
await test('D12', 'refresh gives a new session for the same user', async () => {
  const fresh = await sessionA.refresh();
  ok(fresh.id !== sessionA.id && fresh.userId === sessionA.userId, 'not a fresh session');
  return { old: sessionA.id, new: fresh.id };
});

// Scenario: refresh() on a session rebuilt with fromToken. Expected: refresh_unavailable.
await test('D13', 'refresh on a fromToken session is refused', () =>
  rejects(
    async () =>
      ConnectSession.fromToken(sessionA.token, sessionA.toJSON(), { baseUrl: BASE }).refresh(),
    {
      code: 'refresh_unavailable',
    },
  ),
);

// Scenario: 21 live sessions for one user (README: at most 20). Expected: the 21st is refused.
await test('D14', 'a user can hold at most 20 live sessions', async () => {
  const who = uid('d14');
  let made = 0;
  try {
    for (; made < 21; made += 1) await connect.create(who);
  } catch (error) {
    ok(made === 20, `refused after ${made} sessions: ${describe(error)}`);
    return `refused at #${made + 1}: ${describe(error)}`;
  }
  throw new Expected('21 sessions were made');
});

// ─── C. Users ─────────────────────────────────────────────────────────────────────────────────

// Scenario: users.list({ userId: userA }). Expected: exactly that user, sessionCount >= 1.
await test('C1', 'users.list by userId', async () => {
  const page = await connect.users.list({ userId: userA });
  ok(page.items.length === 1 && page.items[0].userId === userA, `got ${page.items.length}`);
  return page.items[0];
});

// Scenario: users.setName(userA, 'Alice Host'), then users.list({ search: <prefix of userA> }).
// Expected: displayName updated; search (a prefix of the host's user id) finds the user.
await test('C2', 'users.setName and search', async () => {
  const u = await connect.users.setName(userA, 'Alice Host');
  const found = await connect.users.list({ search: `ts-${RUN}-al` });
  ok(u.displayName === 'Alice Host', 'name not set');
  ok(
    found.items.some((x) => x.userId === userA),
    'search did not find the user',
  );
  return { displayName: u.displayName, searchHits: found.items.length };
});

// Scenario: users.list({ search: 'Alice Host' }) (the display name). Expected (as the API is
// written): nothing, because search reads the user id only. Recorded so the docs can say so.
await test('C2b', 'users.list search does not match display names', async () => {
  const found = await connect.users.list({ search: 'Alice Host' });
  ok(found.items.length === 0, `found ${found.items.length}`);
  return 0;
});

// Scenario: users.setName for a user id the project has never seen. Expected: the user is added
// (the SDK docs say "a user appears the first time a session or a name is set").
await test('C3', 'users.setName adds a new user', async () => {
  const u = await connect.users.setName(uid('c3'), 'Named First');
  return { userId: u.userId, sessionCount: u.sessionCount };
});

// Scenario: users.list({ limit: 2 }) and follow nextCursor. Expected: no repeats across pages.
await test('C4', 'users.list pages by cursor', async () => {
  const seen = new Set();
  let cursor;
  for (let i = 0; i < 5; i += 1) {
    const page = await connect.users.list({ limit: 2, cursor });
    for (const u of page.items) {
      ok(!seen.has(u.id), `repeat ${u.id}`);
      seen.add(u.id);
    }
    if (!page.nextCursor) break;
    cursor = page.nextCursor;
  }
  return { users: seen.size };
});

// Scenario: users.plugins(userA). Expected: the project plugins, each source 'project', not removable.
await test('C5', 'users.plugins lists project plugins for a user', async () => {
  const list = await connect.users.plugins(userA);
  ok(list.length >= 4, `only ${list.length}`);
  ok(
    list.every((p) => p.source === 'project'),
    'a plugin is not from the project',
  );
  return list.map((p) => `${p.name}:${p.source}:${p.removable}`);
});

// Scenario: users.install(userA, teaching) — a per-user ("For you") install by the host.
// Expected: teaching shows in users.plugins with source 'user'.
await test('C6', 'users.install adds a plugin for one user', async () => {
  await connect.users.install(userA, P('teaching').id);
  const list = await connect.users.plugins(userA);
  const t = list.find((p) => p.name === 'teaching');
  ok(t?.source === 'user' && t.removable, `teaching: ${JSON.stringify(t)}`);
  return `${t.name}:${t.source}:${t.version}`;
});

// Scenario: users.install with an explicit versionId (create-plugin latest). Expected: that version.
await test('C7', 'users.install with a versionId', async () => {
  const p = await connect.users.install(userA, P('create-plugin').id, {
    versionId: P('create-plugin').versionId,
  });
  ok(p.versionId === P('create-plugin').versionId, `version ${p.versionId}`);
  return `${p.name}@${p.version}`;
});

// Scenario: users.uninstall(userA, create-plugin). Expected: gone from users.plugins.
await test('C8', 'users.uninstall removes a user plugin', async () => {
  await connect.users.uninstall(userA, P('create-plugin').id);
  const list = await connect.users.plugins(userA);
  ok(!list.some((p) => p.name === 'create-plugin'), 'still installed');
  return list.map((p) => p.name);
});

// Scenario: users.uninstall of a project plugin (cursor-team-kit). Expected: refused; a project
// plugin is not the user's to remove.
await test('C9', 'users.uninstall of a project plugin is refused', () =>
  rejects(() => connect.users.uninstall(userA, P('cursor-team-kit').id)),
);

// Scenario: users.install of an unknown plugin id. Expected: 404.
await test('C10', 'users.install of an unknown plugin is 404', () =>
  rejects(() => connect.users.install(userA, 'plg_00000000000000000000000000000000'), {
    type: ConnectNotFoundError,
  }),
);

// ─── E. Project plugins (what every user gets) ───────────────────────────────────────────────

// Scenario: plugins.list(). Expected: the project plugins from setup with version and ids.
await test('E1', 'plugins.list', async () => {
  const list = await connect.plugins.list();
  ok(list.length >= 5, `only ${list.length}`);
  return list.map((p) => `${p.name}@${p.version}`);
});

// Scenario: plugins.catalog() with no query. Expected: every published plugin, total matches items.
await test('E2', 'plugins.catalog lists published plugins', async () => {
  const page = await connect.plugins.catalog({ limit: 100 });
  ok(page.items.length === page.total, `items ${page.items.length} total ${page.total}`);
  return page.items.map((p) => p.name);
});

// Scenario: catalog({ q: 'ralph' }), ({ kind: 'mcp' }), ({ sort: 'name', direction: 'asc' }),
// ({ limit: 2, page: 2 }), ({ featured: false }). Expected: each filter applies.
await test('E3', 'plugins.catalog filters, sort and paging', async () => {
  const q = await connect.plugins.catalog({ q: 'ralph' });
  const mcp = await connect.plugins.catalog({ kind: 'mcp' });
  const sorted = await connect.plugins.catalog({ sort: 'name', direction: 'asc', limit: 100 });
  const page2 = await connect.plugins.catalog({ limit: 2, page: 2 });
  const featured = await connect.plugins.catalog({ featured: false });
  const names = sorted.items.map((p) => p.name);
  ok(
    q.items.some((p) => p.name === 'ralph-loop'),
    'q did not find ralph-loop',
  );
  ok(
    mcp.items.every((p) => p.componentCounts.mcp > 0),
    'kind=mcp returned a non-MCP plugin',
  );
  ok(names.join() === [...names].sort().join(), 'not sorted by name');
  ok(page2.page === 2 && page2.items.length <= 2, 'paging');
  return {
    q: q.items.map((p) => p.name),
    mcp: mcp.items.map((p) => p.name),
    page2: page2.items.map((p) => p.name),
    featuredFalse: featured.total,
  };
});

// Scenario: plugins.add(context7) (MCP plugin that needs a key). Expected: added, listed.
await test('E4', 'plugins.add an MCP plugin', async () => {
  const p = await connect.plugins.add(P('context7').id);
  const list = await connect.plugins.list();
  ok(
    list.some((x) => x.name === 'context7'),
    'not listed',
  );
  return `${p.name}@${p.version}`;
});

// Scenario: plugins.update(context7, { versionId }) to the same latest version. Expected: OK.
await test('E5', 'plugins.update to a version', async () => {
  const p = await connect.plugins.update(P('context7').id, { versionId: P('context7').versionId });
  ok(p.versionId === P('context7').versionId, 'version not set');
  return `${p.name}@${p.version}`;
});

// Scenario: plugins.add with a versionId of another plugin. Expected: refused (400 or 404).
await test('E6', 'plugins.add with a foreign versionId is refused', () =>
  rejects(() =>
    connect.plugins.add(P('microsoft-learn').id, { versionId: P('ralph-loop').versionId }),
  ),
);

// Scenario: plugins.add(microsoft-learn) then plugins.remove. Expected: gone from the list.
await test('E7', 'plugins.remove', async () => {
  await connect.plugins.add(P('microsoft-learn').id);
  await connect.plugins.remove(P('microsoft-learn').id);
  const list = await connect.plugins.list();
  ok(!list.some((x) => x.name === 'microsoft-learn'), 'still listed');
  return list.map((p) => p.name);
});

// Scenario: plugins.remove of a plugin not in the project. Expected: 404.
await test('E8', 'plugins.remove of a plugin not in the project is 404', () =>
  rejects(() => connect.plugins.remove(P('teaching').id), { type: ConnectNotFoundError }),
);

// ─── F. User install policy ───────────────────────────────────────────────────────────────────

// Scenario: catalog.mode(); setMode('allowlist'); mode(). Expected: allowlist; restored to 'any'.
await test('F1', 'catalog.mode and setMode', async () => {
  const before = await connect.catalog.mode();
  await connect.catalog.setMode('allowlist');
  const during = await connect.catalog.mode();
  await connect.catalog.setMode(before);
  ok(during === 'allowlist', `mode ${during}`);
  return { before, during };
});

// Scenario: catalog.allow(teaching), allowed(), disallow(teaching). Expected: listed then gone.
await test('F2', 'catalog allow, allowed, disallow', async () => {
  await connect.catalog.allow(P('teaching').id);
  const listed = (await connect.catalog.allowed()).map((a) => a.name);
  await connect.catalog.disallow(P('teaching').id);
  const after = (await connect.catalog.allowed()).map((a) => a.name);
  ok(listed.includes('teaching') && !after.includes('teaching'), `${listed} / ${after}`);
  return { listed, after };
});

// Scenario: sets.create('Starter', [ralph-loop]), add cursor-team-kit, rename, list, remove,
// delete. Expected: every change reflected in sets.list().
let setId;
let setName;
await test('F3', 'plugin sets: create, add, rename, remove, list', async () => {
  const made = await connect.catalog.sets.create(`Starter ${RUN}`, [P('ralph-loop').id]);
  setId = made.id;
  await connect.catalog.sets.add(setId, P('cursor-team-kit').id);
  setName = `Starter ${RUN} v2`;
  await connect.catalog.sets.update(setId, { name: setName });
  await connect.catalog.sets.remove(setId, P('ralph-loop').id);
  const found = (await connect.catalog.sets.list()).find((s) => s.id === setId);
  ok(found?.name === `Starter ${RUN} v2`, `name ${found?.name}`);
  ok(
    found.plugins.map((p) => p.name).join() === 'cursor-team-kit',
    `plugins ${found.plugins.map((p) => p.name)}`,
  );
  return { id: setId, name: found.name, plugins: found.plugins.map((p) => p.name) };
});

// Scenario: connect.create(user, { set: <set name> }). Expected: the session holds only the set's
// plugins. (`set` is the set's name, not its id; the SDK type does not say which.)
await test('F4', 'session made from a plugin set (by name)', async () => {
  const s = await connect.create(uid('f4'), { set: setName });
  const names = (await s.manifest()).entries.map((e) => e.pluginName);
  ok(names.join() === 'cursor-team-kit', `manifest ${names}`);
  return names;
});

// Scenario: create(user, { set: <set id> }). Expected: refused 422 (the API wants the name).
await test('F4b', 'a set passed by id is refused', () =>
  rejects(() => connect.create(uid('f4b'), { set: setId }), { status: 422 }),
);

// Scenario: sets.create with no plugins, then sets.delete. Expected: gone from list.
await test('F5', 'plugin set delete', async () => {
  const empty = await connect.catalog.sets.create(`Empty ${RUN}`);
  await connect.catalog.sets.delete(empty.id);
  await connect.catalog.sets.delete(setId);
  const ids = (await connect.catalog.sets.list()).map((s) => s.id);
  ok(!ids.includes(empty.id) && !ids.includes(setId), 'still listed');
  return { remaining: ids.length };
});

// ─── G. Auth configs ──────────────────────────────────────────────────────────────────────────

let context7Component;
let deepwikiComponent;
const mcpOf = async (userId, name) =>
  (await connect.users.plugins(userId)).find((p) => p.name === name)?.mcp[0]?.componentId;

// Scenario: authConfigs.list() before the console made any. Expected: an array (empty here;
// a server with no auth, or one that reads variables, has no auth config of its own).
await test('G1', 'authConfigs.list', async () => {
  const g = (await connect.create(uid('g'))).userId;
  context7Component = await mcpOf(g, 'context7');
  deepwikiComponent = await mcpOf(g, 'deepwiki');
  const list = await connect.authConfigs.list();
  ok(Array.isArray(list), 'not an array');
  return {
    configs: list.map((a) => `${a.pluginName}:${a.authMode}`),
    context7Component,
    deepwikiComponent,
  };
});

// Scenario: POST /v1/project/auth-configs (shared_secret for Context7) with the project key -
// the SDK has no create call - then authConfigs.list(). Expected: the SDK lists the new config,
// secretSet true, the secret never returned. The config is deleted afterwards.
await test('G1b', 'an auth config made through the API shows in authConfigs.list', async () => {
  const made = await rawGateway('POST', '/v1/project/auth-configs', state.projectKey, {
    componentId: context7Component,
    name: `c7-${RUN}`,
    authMode: 'shared_secret',
    secret: 'ctx7-shared-secret-0001',
  });
  ok(
    made.status === 200 || made.status === 201,
    `create ${made.status} ${JSON.stringify(made.json).slice(0, 200)}`,
  );
  const listed = (await connect.authConfigs.list()).find((a) => a.id === made.json.id);
  const del = await rawGateway(
    'DELETE',
    `/v1/project/auth-configs/${made.json.id}`,
    state.projectKey,
  );
  ok(listed?.secretSet === true, `listed ${JSON.stringify(listed)}`);
  ok(!JSON.stringify(listed).includes('ctx7-shared-secret'), 'secret read back');
  return {
    id: made.json.id,
    authMode: listed.authMode,
    secretSet: listed.secretSet,
    deleted: del.status,
  };
});

// Scenario: authConfigs.setVariables(context7 component, { CONTEXT7_API_KEY }). Expected: the
// server becomes ready for users (session.authConfigs shows ready); the value is never returned.
await test('G2', 'authConfigs.setVariables sets a project value', async () => {
  ok(context7Component, 'no context7 component id');
  await connect.authConfigs.setVariables(context7Component, {
    CONTEXT7_API_KEY: 'ctx7-test-value-123456',
  });
  const s = await connect.create(uid('g2'));
  const c7 = (await s.authConfigs()).find((a) => a.componentId === context7Component);
  ok(c7?.ready === true, `context7 ${JSON.stringify(c7)}`);
  return { ready: c7.ready, setup: c7.setup };
});

// Scenario: setVariables with a name the plugin does not declare (EXTRA_HEADER_VALUE). Expected:
// accepted, as a custom variable (the API allows custom names in upper case).
await test('G3', 'authConfigs.setVariables accepts a custom variable name', async () => {
  await connect.authConfigs.setVariables(context7Component, { EXTRA_HEADER_VALUE: 'x' });
  await connect.authConfigs.setVariables(context7Component, { EXTRA_HEADER_VALUE: null });
  return 'accepted and cleared';
});

// Scenario: setVariables with a name that is not a variable name ('bad name!'). Expected: 400.
await test('G3b', 'authConfigs.setVariables refuses an invalid name', () =>
  rejects(() => connect.authConfigs.setVariables(context7Component, { 'bad name!': 'x' }), {
    status: 400,
  }),
);

// ─── H. Connections ───────────────────────────────────────────────────────────────────────────

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

// ─── I. Logs and usage ────────────────────────────────────────────────────────────────────────

// Scenario: logs.list(). Expected: entries such as session.created, project_user.created.
await test('I1', 'logs.list', async () => {
  const page = await connect.logs.list({ limit: 50 });
  const actions = [...new Set(page.items.map((e) => e.action))];
  ok(actions.includes('session.created'), `actions ${actions}`);
  return actions;
});

// Scenario: logs.list({ userId: userA, action: 'session.created' }). Expected: only those rows.
await test('I2', 'logs.list filters by user and action', async () => {
  const page = await connect.logs.list({ userId: userA, action: 'session.created' });
  ok(page.items.length >= 1, 'nothing found');
  ok(
    page.items.every((e) => e.action === 'session.created' && e.user?.userId === userA),
    'filter not applied',
  );
  return page.items.length;
});

// Scenario: logs.list({ from: tomorrow }). Expected: empty.
await test('I3', 'logs.list from/to window', async () => {
  const page = await connect.logs.list({ from: new Date(Date.now() + 86400_000) });
  ok(page.items.length === 0, `${page.items.length} rows in the future`);
  return 0;
});

// Scenario: usage() and usage({ from, to }). Expected: from/to echoed, days[] and topUsers[].
await test('I4', 'usage with and without a window', async () => {
  const u = await connect.usage();
  const from = new Date(Date.now() - 7 * 86400_000);
  const w = await connect.usage({ from, to: new Date() });
  ok(Array.isArray(u.days) && Array.isArray(w.topUsers), 'shape');
  return { default: `${u.from}..${u.to}`, window: `${w.from}..${w.to}`, days: w.days.length };
});

// ─── J. Webhooks ──────────────────────────────────────────────────────────────────────────────

const sign = (secret, id, ts, body) =>
  `v1,${createHmac('sha256', secret).update(`${id}.${ts}.${body}`).digest('base64')}`;
const nowTs = () => Math.floor(Date.now() / 1000).toString();
const sample = JSON.stringify({
  id: 'evt_1',
  type: 'user.created',
  createdAt: new Date().toISOString(),
  projectId: state.projectId,
  data: {},
});

// Scenario: verify a body signed with the project secret. Expected: the parsed event.
await test('J1', 'webhooks.verify accepts a good signature', () => {
  ok(state.webhookSecret, 'setup did not store a webhook secret');
  const ts = nowTs();
  const event = connect.webhooks.verify({
    rawBody: sample,
    headers: {
      'webhook-id': 'msg_1',
      'webhook-timestamp': ts,
      'webhook-signature': sign(state.webhookSecret, 'msg_1', ts, sample),
    },
    secret: state.webhookSecret,
  });
  return event.type;
});

// Scenario: same headers, body changed by one character. Expected: webhook_invalid.
await test('J2', 'webhooks.verify refuses a tampered body', async () => {
  const ts = nowTs();
  return rejects(
    async () =>
      connect.webhooks.verify({
        rawBody: sample.replace('user.created', 'user.createe'),
        headers: {
          'webhook-id': 'msg_1',
          'webhook-timestamp': ts,
          'webhook-signature': sign(state.webhookSecret, 'msg_1', ts, sample),
        },
        secret: state.webhookSecret,
      }),
    { code: 'webhook_invalid' },
  );
});

// Scenario: a timestamp 301 seconds old. Expected: webhook_invalid (tolerance is 300 s).
await test('J3', 'webhooks.verify refuses an old timestamp', async () => {
  const ts = (Math.floor(Date.now() / 1000) - 301).toString();
  return rejects(
    async () =>
      connect.webhooks.verify({
        rawBody: sample,
        headers: {
          'webhook-id': 'm',
          'webhook-timestamp': ts,
          'webhook-signature': sign(state.webhookSecret, 'm', ts, sample),
        },
        secret: state.webhookSecret,
      }),
    { code: 'webhook_invalid' },
  );
});

// Scenario: two signatures in the header (old secret first), Uint8Array body, upper-case header
// names. Expected: accepted (any one may match).
await test('J4', 'webhooks.verify with several signatures and a byte body', () => {
  const ts = nowTs();
  const event = connect.webhooks.verify({
    rawBody: new TextEncoder().encode(sample),
    headers: {
      'Webhook-Id': 'm2',
      'Webhook-Timestamp': ts,
      'Webhook-Signature': `${sign('old-secret', 'm2', ts, sample)} ${sign(state.webhookSecret, 'm2', ts, sample)}`,
    },
    secret: state.webhookSecret,
  });
  return event.id;
});

// Scenario: missing headers. Expected: webhook_invalid.
await test('J5', 'webhooks.verify refuses missing headers', () =>
  rejects(async () => connect.webhooks.verify({ rawBody: sample, headers: {}, secret: 'x' }), {
    code: 'webhook_invalid',
  }),
);

// Scenario: webhooks.deliveries() after this run made users and installs.
// Expected: deliveries for user.created / user_plugin.installed; status filter works.
await test('J6', 'webhooks.deliveries lists deliveries and filters by status', async () => {
  await new Promise((r) => setTimeout(r, 3000));
  const page = await connect.webhooks.deliveries({ limit: 50 });
  const delivered = await connect.webhooks.deliveries({ status: 'delivered' });
  ok(page.items.length > 0, 'no deliveries');
  ok(
    delivered.items.every((d) => d.status === 'delivered'),
    'status filter not applied',
  );
  return {
    types: [...new Set(page.items.map((d) => d.type))],
    statuses: [...new Set(page.items.map((d) => d.status))],
  };
});

// Scenario: a real delivery received by the stand-in receiver (SDK_TEST_WEBHOOK_LOG), checked
// with webhooks.verify exactly as it arrived. Expected: every received delivery verifies.
await test('J7', 'a real delivery passes webhooks.verify', async () => {
  ok(STANDIN_WEBHOOKS, 'SDK_TEST_WEBHOOK_LOG not set (no receiver); skipped');
  const lines = (await readFile(STANDIN_WEBHOOKS, 'utf8'))
    .trim()
    .split('\n')
    .map((l) => JSON.parse(l));
  ok(lines.length > 0, 'nothing received');
  const types = lines.map(
    (d) =>
      connect.webhooks.verify({
        rawBody: d.rawBody,
        headers: d.headers,
        secret: state.webhookSecret,
        toleranceSeconds: 86400,
      }).type,
  );
  return { received: lines.length, types: [...new Set(types)] };
});

// ─── K. Session self-service ("For you") ─────────────────────────────────────────────────────

const sessionK = await connect.create(uid('kate'));

// Scenario: session.catalog(). Expected: the plugins this user may install (mode 'any'), with
// installed true for the project plugins.
await test('K1', 'session.catalog', async () => {
  const page = await sessionK.catalog({ limit: 100 });
  const installed = page.items.filter((p) => p.installed).map((p) => p.name);
  ok(page.items.length > 0, 'empty catalog');
  return { total: page.total, installed };
});

// Scenario: session.catalog({ q: 'teach' }). Expected: teaching only.
await test('K2', 'session.catalog with a query', async () => {
  const page = await sessionK.catalog({ q: 'teach' });
  ok(
    page.items.some((p) => p.name === 'teaching'),
    page.items.map((p) => p.name).join(),
  );
  return page.items.map((p) => p.name);
});

// Scenario: session.plugins.list(). Expected: project plugins with source 'project'.
await test('K3', 'session.plugins.list', async () => {
  const list = await sessionK.plugins.list();
  ok(list.length >= 4, `only ${list.length}`);
  return list.map((p) => `${p.name}:${p.source}`);
});

// Scenario: session.plugins.install(teaching). Expected: listed with source 'user'.
await test('K4', 'session.plugins.install', async () => {
  const p = await sessionK.plugins.install(P('teaching').id);
  const list = await sessionK.plugins.list();
  ok(list.find((x) => x.name === 'teaching')?.source === 'user', 'not a user plugin');
  return `${p.name}@${p.version}`;
});

// Scenario: session.plugins.update(teaching, { versionId: latest }). Expected: OK.
await test('K5', 'session.plugins.update', async () => {
  const p = await sessionK.plugins.update(P('teaching').id, { versionId: P('teaching').versionId });
  return `${p.name}@${p.version}`;
});

// Scenario: session.plugins.install(microsoft-learn) — an MCP plugin not in the project.
// Expected: installed for this user; session.mcp() then lists its server.
await test('K6', 'session installs a no-auth MCP plugin and mcp() lists it', async () => {
  await sessionK.plugins.install(P('microsoft-learn').id);
  const servers = await sessionK.mcp();
  ok(
    servers.some((s) => s.name === 'microsoft-learn'),
    servers.map((s) => s.name).join(),
  );
  return servers.map((s) => `${s.name}:${s.ready}`);
});

// Scenario: session.plugins.remove(microsoft-learn). Expected: gone from list and mcp().
await test('K7', 'session.plugins.remove', async () => {
  await sessionK.plugins.remove(P('microsoft-learn').id);
  const names = (await sessionK.plugins.list()).map((p) => p.name);
  ok(!names.includes('microsoft-learn'), 'still there');
  return names;
});

// Scenario: session.plugins.remove(cursor-team-kit) — a project plugin. Expected: refused.
await test('K8', 'session cannot remove a project plugin', () =>
  rejects(() => sessionK.plugins.remove(P('cursor-team-kit').id)),
);

// Scenario: setMode('off') then session.plugins.install(create-plugin). Expected: refused;
// then setMode('allowlist') with create-plugin allowed: install works.
await test('K9', 'install mode off / allowlist is enforced on the session', async () => {
  await connect.catalog.setMode('off');
  const off = await rejects(() => sessionK.plugins.install(P('create-plugin').id));
  await connect.catalog.setMode('allowlist');
  await connect.catalog.allow(P('create-plugin').id);
  const notAllowed = await rejects(() => sessionK.plugins.install(P('microsoft-learn').id));
  const p = await sessionK.plugins.install(P('create-plugin').id);
  await connect.catalog.disallow(P('create-plugin').id);
  await connect.catalog.setMode('any');
  return { off, notAllowed, allowed: p.name };
});

// Scenario: context7 taken out of the project, the user installs it, then
// session.plugins.setVariables({ CONTEXT7_API_KEY }). Expected: isSet true, value not returned.
// Then context7 goes back into the project.
await test('K10', 'session.plugins.setVariables on a plugin the user installed', async () => {
  await connect.plugins.remove(P('context7').id);
  try {
    const s = await connect.create(uid('k10'));
    await s.plugins.install(P('context7').id);
    const p = await s.plugins.setVariables(P('context7').id, {
      CONTEXT7_API_KEY: 'ctx7-user-value-987654',
    });
    const v = p.variables.find((x) => x.name === 'CONTEXT7_API_KEY');
    ok(v?.isSet, `variables ${JSON.stringify(p.variables)}`);
    ok(!JSON.stringify(p).includes('ctx7-user-value'), 'value read back');
    const ready = (await s.mcp({ plugin: 'context7' }))[0]?.ready;
    return { variables: p.variables, ready };
  } finally {
    await connect.plugins.add(P('context7').id);
  }
});

// Scenario: setVariables on a project plugin from the session. Expected: 404 (a project plugin's
// values belong to the project; see authConfigs.setVariables).
await test('K10b', 'session.plugins.setVariables on a project plugin is 404', () =>
  rejects(() => sessionK.plugins.setVariables(P('deepwiki').id, { X: 'y' }), {
    type: ConnectNotFoundError,
  }),
);

// Scenario: session.authConfigs(). Expected: one row per MCP server with authMode and ready.
await test('K11', 'session.authConfigs', async () => {
  const list = await sessionK.authConfigs();
  ok(
    list.some((a) => a.serverName === 'deepwiki'),
    list.map((a) => a.serverName).join(),
  );
  return list.map((a) => `${a.serverName}:${a.authMode}:${a.ready}:${a.setup.kind}`);
});

// Scenario: session.mcp() and mcp({ plugin: 'deepwiki' }). Expected: servers with the session token
// in the Authorization header; the filter keeps only deepwiki.
await test('K12', 'session.mcp and the plugin filter', async () => {
  const all = await sessionK.mcp();
  const one = await sessionK.mcp({ plugin: 'deepwiki' });
  ok(
    all.every((s) => s.headers.Authorization === `Bearer ${sessionK.token}`),
    'token not in headers',
  );
  ok(one.length === 1 && one[0].name === 'deepwiki', one.map((s) => s.name).join());
  return { all: all.map((s) => `${s.name}:${s.ready}`), filtered: one.map((s) => s.url) };
});

// Scenario: a user who removed the project's Context7 key... simpler: a fresh session where
// context7 has its project key set; mcp({ requireReady: true }) must not throw. Then a fresh project
// value removed (setVariables null) -> requireReady throws ConnectSetupRequiredError.
await test('K13', 'mcp({ requireReady }) throws when a server needs setup', async () => {
  await connect.authConfigs.setVariables(context7Component, { CONTEXT7_API_KEY: null });
  const s = await connect.create(uid('k13'));
  const servers = await s.mcp();
  const c7 = servers.find((x) => x.name === 'context7');
  const err = await rejects(() => s.mcp({ requireReady: true }), {
    type: ConnectSetupRequiredError,
  });
  await connect.authConfigs.setVariables(context7Component, {
    CONTEXT7_API_KEY: 'ctx7-test-value-123456',
  });
  return { context7: c7 && `${c7.ready}:${c7.setup.kind}`, err };
});

// Scenario: session.authorize('deepwiki', { callbackUrl }) on a no-auth server. Expected: refused.
await test('K14', 'authorize on a no-auth server is refused', () =>
  rejects(() => sessionK.authorize('deepwiki', { callbackUrl: 'https://host.example/back' })),
);

// Scenario: session.authorize('no-such-server'). Expected: ConnectNotFoundError before any call.
await test('K15', 'authorize on an unknown server name is 404', () =>
  rejects(
    () => sessionK.authorize('no-such-server', { callbackUrl: 'https://host.example/back' }),
    {
      type: ConnectNotFoundError,
    },
  ),
);

// Scenario: manifest(); manifest({ revision }) with the same revision.
// Expected: entries with components; the second call answers { notModified: true }.
let manifestK;
await test('K16', 'manifest and notModified by revision', async () => {
  manifestK = await sessionK.manifest();
  const again = await sessionK.manifest({ revision: manifestK.revision });
  ok(again.notModified === true, `second call: ${JSON.stringify(again).slice(0, 80)}`);
  return {
    revision: manifestK.revision.slice(0, 12),
    entries: manifestK.entries.map((e) => `${e.pluginName}:${e.scope}:${e.components.length}`),
  };
});

// Scenario: manifest({ kinds: ['skill'] }) and ({ plugins: ['ralph-loop'] }).
// Expected: only skills; only ralph-loop.
await test('K17', 'manifest kinds and plugins filters', async () => {
  const skills = await sessionK.manifest({ kinds: ['skill'] });
  const ralph = await sessionK.manifest({ plugins: ['ralph-loop'] });
  const kinds = [...new Set(skills.entries.flatMap((e) => e.components.map((c) => c.kind)))];
  ok(
    kinds.every((k) => k === 'skill'),
    `kinds ${kinds}`,
  );
  ok(
    ralph.entries.every((e) => e.pluginName === 'ralph-loop'),
    ralph.entries.map((e) => e.pluginName).join(),
  );
  return { kinds, ralph: ralph.entries.map((e) => e.pluginName) };
});

// Scenario: component(sha256) of the first component. Expected: bytes whose SHA-256 matches.
await test('K18', 'component download is checked by hash', async () => {
  const c = manifestK.entries.flatMap((e) => e.components)[0];
  const bytes = await sessionK.component(c.sha256);
  ok(bytes.length === c.sizeBytes, `size ${bytes.length} != ${c.sizeBytes}`);
  return { sha256: c.sha256.slice(0, 12), bytes: bytes.length };
});

// Scenario: component('00…') (unknown hash). Expected: ConnectNotFoundError.
await test('K19', 'component of an unknown hash is 404', () =>
  rejects(() => sessionK.component('0'.repeat(64)), { type: ConnectNotFoundError }),
);

// Scenario: a fetch that flips one byte of the archive. Expected: ConnectIntegrityError.
await test('K20', 'a changed archive is refused by its hash', async () => {
  const c = manifestK.entries.flatMap((e) => e.components)[0];
  const evil = async (url, init) => {
    const res = await fetch(url, init);
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (url.includes('/v1/sync/components/')) bytes[bytes.length - 1] ^= 1;
    return new Response(bytes, { status: res.status, headers: res.headers });
  };
  const s = ConnectSession.fromToken(sessionK.token, sessionK.toJSON(), {
    baseUrl: BASE,
    fetch: evil,
  });
  return rejects(() => s.component(c.sha256), { type: ConnectIntegrityError });
});

// Scenario: report({ applied: [one component] }). Expected: accepted; logs show sync.reported.
await test('K21', 'report applied components', async () => {
  const c = manifestK.entries.flatMap((e) => e.components)[0];
  await sessionK.report({ target: 'sdk-test', applied: [{ componentId: c.id, sha256: c.sha256 }] });
  return 'accepted';
});

// Scenario: fromToken(token, info) rebuilds a session. Expected: manifest works with it.
await test('K22', 'fromToken session works', async () => {
  const s = ConnectSession.fromToken(sessionK.token, sessionK.toJSON(), { baseUrl: BASE });
  const m = await s.manifest();
  return { entries: m.entries.length };
});

// ─── L. MCP through the session (no-auth HTTP servers) ───────────────────────────────────────

const upstreamLog = process.env.SDK_TEST_MCP_LOG;
// Scenario: initialize, tools/list and tools/call on DeepWiki through the URL and headers that
// session.mcp() gives. Expected: 200s, the server's tools, a text answer.
await test('L1', 'DeepWiki: initialize, tools/list, tools/call', async () => {
  const [dw] = await sessionK.mcp({ plugin: 'deepwiki' });
  const init = await mcpCall(dw, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'sdk-test', version: '1' },
  });
  ok(
    init.status === 200 && init.data?.result,
    `initialize ${init.status} ${JSON.stringify(init.data).slice(0, 200)}`,
  );
  const list = await mcpCall(dw, 'tools/list', {}, init.sessionId);
  const tools = list.data?.result?.tools?.map((t) => t.name) ?? [];
  ok(tools.length > 0, `tools/list ${list.status} ${JSON.stringify(list.data).slice(0, 200)}`);
  const call = await mcpCall(
    dw,
    'tools/call',
    { name: tools[0], arguments: { repoName: 'syncfusion/BoldCreate-Plugins' } },
    init.sessionId,
  );
  ok(
    call.data?.result?.content?.[0]?.text,
    `tools/call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`,
  );
  return { url: dw.url, tools, answer: call.data.result.content[0].text.slice(0, 80) };
});

// Scenario: a session that disables 'deepwiki.ask_question'. Expected: tools/list hides it and a
// call to it is refused.
await test('L2', 'session tool policy hides a disabled tool', async () => {
  const s = await connect.create(uid('l2'), { tools: { disable: ['deepwiki.ask_question'] } });
  const [dw] = await s.mcp({ plugin: 'deepwiki' });
  const init = await mcpCall(dw, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const list = await mcpCall(dw, 'tools/list', {}, init.sessionId);
  const tools = list.data?.result?.tools?.map((t) => t.name) ?? [];
  const call = await mcpCall(
    dw,
    'tools/call',
    { name: 'ask_question', arguments: { repoName: 'a/b', question: 'q' } },
    init.sessionId,
  );
  ok(!tools.includes('ask_question'), `tools ${tools}`);
  ok(
    call.data?.error || call.data?.result?.isError || call.status >= 400,
    `call ${JSON.stringify(call.data).slice(0, 200)}`,
  );
  return { tools, call: JSON.stringify(call.data?.error ?? call.data?.result).slice(0, 120) };
});

// Scenario: the user installs microsoft-learn on their own and calls microsoft_docs_search.
// Expected: works the same way as a project plugin.
await test('L3', 'Microsoft Learn installed by the user: tools/call', async () => {
  const s = await connect.create(uid('l3'));
  await s.plugins.install(P('microsoft-learn').id);
  const [ml] = await s.mcp({ plugin: 'microsoft-learn' });
  ok(ml, 'no microsoft-learn server');
  const init = await mcpCall(ml, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const call = await mcpCall(
    ml,
    'tools/call',
    { name: 'microsoft_docs_search', arguments: { query: '.NET MAUI' } },
    init.sessionId,
  );
  ok(call.data?.result?.content, `call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`);
  return call.data.result.content[0].text.slice(0, 80);
});

// Scenario: Context7 with the project key value set; call resolve-library-id. Expected: works,
// and the upstream receives the Context7 key, never the stk_ session token.
await test('L4', 'Context7 gets its own key, not the session token', async () => {
  const [c7] = await sessionK.mcp({ plugin: 'context7' });
  ok(c7, 'no context7 server in the session');
  const init = await mcpCall(c7, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const call = await mcpCall(
    c7,
    'tools/call',
    { name: 'resolve-library-id', arguments: { libraryName: 'react' } },
    init.sessionId,
  );
  ok(call.data?.result?.content, `call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`);
  if (upstreamLog) {
    const seen = (await readFile(upstreamLog, 'utf8'))
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l));
    ok(
      !seen.some((r) => r.authorization?.startsWith('Bearer stk_')),
      'a session token reached an upstream server',
    );
    const c7auth = seen.filter((r) => r.host === 'mcp.context7.com').map((r) => r.authorization);
    return {
      answer: call.data.result.content[0].text.slice(0, 60),
      upstreamAuth: [...new Set(c7auth)],
    };
  }
  return call.data.result.content[0].text.slice(0, 60);
});

// Scenario: the MCP URL called without a token, and with a deleted session's token.
// Expected: 401 both times.
await test('L5', 'MCP endpoint refuses no token and an ended session', async () => {
  const s = await connect.create(uid('l5'));
  const [dw] = await s.mcp({ plugin: 'deepwiki' });
  const none = await mcpCall({ url: dw.url, headers: {} }, 'tools/list', {});
  await connect.sessions.delete(s.id);
  const ended = await mcpCall(dw, 'tools/list', {});
  ok(none.status === 401 && ended.status === 401, `no token ${none.status}, ended ${ended.status}`);
  return { none: none.status, ended: ended.status };
});

// ─── M. File sync ─────────────────────────────────────────────────────────────────────────────

const syncRoot = await mkdtemp(join(tmpdir(), 'sdk-sync-'));
const userM = uid('mia');
const sessionM = await connect.create(userM);
const dirM = join(syncRoot, userM);
const exists = (p) =>
  stat(p).then(
    () => true,
    () => false,
  );
async function tree(dir, base = dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await tree(p, base)));
    else out.push(p.slice(base.length + 1));
  }
  return out;
}

// Scenario: syncPlugins(session, { dir }) on an empty folder. Expected: components added, hooks
// skipped with hooks_not_allowed, a lock file, no token anywhere on disk.
await test('M1', 'first sync places files, skips hooks', async () => {
  const r = await syncPlugins(sessionM, { dir: dirM });
  const files = await tree(dirM);
  let leaked = false;
  for (const f of files)
    if ((await readFile(join(dirM, f), 'utf8')).includes(sessionM.token)) leaked = true;
  ok(r.added.length > 0, 'nothing added');
  ok(
    r.skipped.every((s) => s.reason === 'hooks_not_allowed') && r.skipped.length > 0,
    `skipped ${JSON.stringify(r.skipped)}`,
  );
  ok(!leaked, 'the token was written to disk');
  return {
    added: r.added.length,
    skipped: r.skipped.map((s) => `${s.pluginName}/${s.name}`),
    files: files.length,
  };
});

// Scenario: sync again with nothing changed. Expected: added/updated/removed empty.
// Note: hooks were skipped, so the revision is kept and the full manifest is read again.
await test('M2', 'second sync changes nothing', async () => {
  const r = await syncPlugins(sessionM, { dir: dirM });
  ok(r.added.length + r.updated.length + r.removed.length === 0, JSON.stringify(r).slice(0, 200));
  return { unchanged: r.unchanged.length, skipped: r.skipped.length };
});

// Scenario: sync with allowHooks: true. Expected: hooks placed (ralph-loop, continual-learning,
// toolkit), and the scripts the hooks run are on disk too.
await test('M3', 'allowHooks places hooks and their scripts', async () => {
  const r = await syncPlugins(sessionM, { dir: dirM, allowHooks: true });
  const files = await tree(dirM);
  const hookFiles = files.filter((f) => f.includes('hooks'));
  ok(
    r.added.some((c) => c.kind === 'hook'),
    `added ${JSON.stringify(r.added)}`,
  );
  const ralph = hookFiles.filter((f) => f.startsWith('ralph-loop'));
  ok(
    ralph.some((f) => f.endsWith('.sh')),
    `ralph-loop hook scripts missing: ${ralph}`,
  );
  return { hooks: r.added.filter((c) => c.kind === 'hook').map((c) => c.pluginName), hookFiles };
});

// Scenario: the Toolkit 0.6.0 layout on disk. Expected: every skill folder keeps its templates
// (self-contained), agents and rules present, no plugin-level files required.
await test('M4', 'boldcreate-toolkit files are complete on disk', async () => {
  const kit = join(dirM, 'boldcreate-toolkit');
  const files = await tree(kit);
  const skills = new Set(files.filter((f) => f.startsWith('skills/')).map((f) => f.split('/')[1]));
  const templates = files.filter((f) => /template/.test(f));
  const broken = [];
  for (const f of files.filter((x) => x.endsWith('SKILL.md'))) {
    const text = await readFile(join(kit, f), 'utf8');
    for (const m of text.matchAll(/\(\.\/([\w./-]+)\)|`\.\/([\w./-]+)`/g)) {
      const ref = m[1] ?? m[2];
      if (!(await exists(join(kit, f, '..', ref)))) broken.push(`${f} -> ${ref}`);
    }
  }
  ok(skills.size >= 10, `skills ${skills.size}`);
  ok(broken.length === 0, `missing files: ${broken.slice(0, 5)}`);
  return {
    skills: skills.size,
    agents: files.filter((f) => f.startsWith('agents/')).length,
    rules: files.filter((f) => f.startsWith('rules/')).length,
    templates: templates.length,
  };
});

// Scenario: in a fresh folder: the user installs teaching, sync, edit one teaching file by hand,
// the user removes teaching, sync. Expected: the edited file is kept and listed in `modified`,
// the unedited file of teaching is removed.
const dirC = join(syncRoot, 'conflict');
const sessionC = await connect.create(uid('cara'));
let editedC;
await test('M5', 'a hand-edited file is kept on conflict (skip)', async () => {
  await sessionC.plugins.install(P('teaching').id);
  await syncPlugins(sessionC, { dir: dirC });
  const target = (await tree(join(dirC, 'teaching')))[0];
  editedC = join(dirC, 'teaching', target);
  await writeFile(editedC, 'edited by hand\n');
  await sessionC.plugins.remove(P('teaching').id);
  const r = await syncPlugins(sessionC, { dir: dirC });
  const kept = await readFile(editedC, 'utf8').catch(() => null);
  ok(kept === 'edited by hand\n', 'the edited file was deleted');
  ok(
    r.modified.some((m) => m.endsWith(target)),
    `result ${JSON.stringify({ removed: r.removed.length, modified: r.modified })}`,
  );
  return {
    removed: r.removed.map((c) => c.name),
    modified: r.modified.map((m) => m.slice(dirC.length + 1)),
  };
});

// Scenario: the same folder synced with onConflict: 'overwrite'. Expected: the edited file is
// removed with its plugin.
await test('M6', "onConflict 'overwrite' removes the edited file", async () => {
  const r = await syncPlugins(sessionC, { dir: dirC, onConflict: 'overwrite' });
  const left = await tree(join(dirC, 'teaching')).catch(() => []);
  ok(
    left.length === 0,
    `left ${left} result ${JSON.stringify({ removed: r.removed.length, modified: r.modified })}`,
  );
  return { removed: r.removed.length, modified: r.modified.length };
});

// Scenario (bug repro): fresh folder. 1) sync with allowHooks: true; 2) the user installs teaching;
// 3) sync without allowHooks (hooks are skipped, so the lock keeps the revision of sync 1);
// 4) the user removes teaching, so the server revision is again the one of sync 1; 5) sync.
// Expected: teaching's files are removed. The server answers 304 to the kept revision, so the
// SDK reports everything unchanged and teaching's files stay.
await test('M13', 'a removed plugin is removed after a hook-skipping sync', async () => {
  const d = join(syncRoot, 'revision');
  const s = await connect.create(uid('m13'));
  await syncPlugins(s, { dir: d, allowHooks: true });
  await s.plugins.install(P('teaching').id);
  const placed = await syncPlugins(s, { dir: d });
  await s.plugins.remove(P('teaching').id);
  const r = await syncPlugins(s, { dir: d });
  const left = await tree(join(d, 'teaching')).catch(() => []);
  ok(
    left.length === 0,
    `teaching files left: ${left.length}; the second sync skipped ${placed.skipped.length} hooks; the last sync removed ${r.removed.length}, unchanged ${r.unchanged.length}`,
  );
  return { removed: r.removed.length };
});

// Scenario: syncPlugins({ kinds: ['rule'] }) into a new folder. Expected: only rules placed.
await test('M7', 'sync kinds filter', async () => {
  const d = join(syncRoot, 'rules-only');
  const s = await connect.create(uid('m7'));
  const r = await syncPlugins(s, { dir: d, kinds: ['rule'] });
  ok(
    r.added.length > 0 && r.added.every((c) => c.kind === 'rule'),
    JSON.stringify(r.added.map((c) => c.kind)),
  );
  return r.added.map((c) => `${c.pluginName}/${c.name}`);
});

// Scenario: syncPlugins({ plugins: ['cursor-team-kit'] }). Expected: only that plugin's files.
await test('M8', 'sync plugins filter', async () => {
  const d = join(syncRoot, 'ctk-only');
  const s = await connect.create(uid('m8'));
  const r = await syncPlugins(s, { dir: d, plugins: ['cursor-team-kit'] });
  ok(
    r.added.length > 0 && r.added.every((c) => c.pluginName === 'cursor-team-kit'),
    JSON.stringify(r.added.map((c) => c.pluginName)),
  );
  return { added: r.added.length, top: await readdir(d) };
});

// Scenario: a folder synced for userM, then synced with another user's session.
// Expected: lock_owner_mismatch, nothing changed.
await test('M9', 'a folder of another user is refused', async () => {
  const other = await connect.create(uid('m9'));
  return rejects(() => syncPlugins(other, { dir: dirM }), { code: 'lock_owner_mismatch' });
});

// Scenario: the server can't be reached (session pointed at a closed port) and the folder has a
// lock. Expected: stale true, folder left as it was.
await test('M10', 'unreachable server gives stale and leaves files', async () => {
  const before = (await tree(dirM)).length;
  const dead = ConnectSession.fromToken(sessionM.token, sessionM.toJSON(), {
    baseUrl: 'http://127.0.0.1:9',
    retry: { maxRetries: 0 },
    timeoutMs: 2000,
  });
  const r = await syncPlugins(dead, { dir: dirM });
  const after = (await tree(dirM)).length;
  ok(r.stale === true && before === after, `stale ${r.stale}, files ${before} -> ${after}`);
  return { stale: r.stale, files: after };
});

// Scenario: two syncs of the same folder at the same time. Expected: both finish; files consistent
// (the folder guard serialises them or refuses one with a clear code).
await test('M11', 'two syncs at once on one folder', async () => {
  const d = join(syncRoot, 'parallel');
  const s = await connect.create(uid('m11'));
  const both = await Promise.allSettled([syncPlugins(s, { dir: d }), syncPlugins(s, { dir: d })]);
  const summary = both.map((b) =>
    b.status === 'fulfilled' ? `ok added=${b.value.added.length}` : describe(b.reason),
  );
  ok(
    both.some((b) => b.status === 'fulfilled'),
    summary.join(' | '),
  );
  return summary;
});

// Scenario: the sync.reported event after a sync. Expected: logs hold sync.reported for userM.
await test('M12', 'sync is reported to Connect', async () => {
  const page = await connect.logs.list({ userId: userM, limit: 100 });
  const actions = page.items.map((e) => e.action);
  ok(
    actions.some((a) => a.startsWith('sync')),
    `actions ${[...new Set(actions)]}`,
  );
  const user = (await connect.users.list({ userId: userM })).items[0];
  return { actions: [...new Set(actions)], lastSyncedAt: user?.lastSyncedAt };
});

await rm(syncRoot, { recursive: true, force: true });

// ─── N. For You (fyk_) and Platform (plk_) keys ──────────────────────────────────────────────

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

// ─── O. Cancellation, timeout, retry ──────────────────────────────────────────────────────────

// Scenario: connect.withSignal(aborted signal).users.list(). Expected: aborted, no request.
await test('O1', 'withSignal: an aborted signal cancels the call', () =>
  rejects(() => connect.withSignal(AbortSignal.abort()).users.list(), { code: 'aborted' }),
);

// Scenario: session.withSignal(aborted).manifest(). Expected: aborted.
await test('O2', 'session.withSignal cancels too', () =>
  rejects(() => sessionK.withSignal(AbortSignal.abort()).manifest(), { code: 'aborted' }),
);

// Scenario: a fetch that answers 503 twice then passes through; users.list with backoffMs 10.
// Expected: success after 3 attempts.
await test('O3', 'GET is retried on 503', async () => {
  let calls = 0;
  const flaky = (url, init) =>
    ++calls <= 2 ? Promise.resolve(new Response('{}', { status: 503 })) : fetch(url, init);
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    fetch: flaky,
    retry: { backoffMs: 10 },
  });
  await c.users.list({ limit: 1 });
  ok(calls === 3, `calls ${calls}`);
  return { calls };
});

// Scenario: 429 with Retry-After: 1 then pass. Expected: waits about 1 s, then succeeds.
await test('O4', '429 honours Retry-After', async () => {
  let calls = 0;
  const limited = (url, init) =>
    ++calls === 1
      ? Promise.resolve(new Response('{}', { status: 429, headers: { 'retry-after': '1' } }))
      : fetch(url, init);
  const c = new ConnectClient({ apiKey: state.projectKey, baseUrl: BASE, fetch: limited });
  const t = Date.now();
  await c.plugins.list();
  const waited = Date.now() - t;
  ok(waited >= 900, `waited ${waited} ms`);
  return { calls, waited };
});

// Scenario: POST create with a fetch that fails once with a network error. Expected: retried with
// the same Idempotency-Key, one session made.
await test('O5', 'session create is retried with the same idempotency key', async () => {
  const keys = [];
  let calls = 0;
  const once = (url, init) => {
    keys.push(init.headers['idempotency-key']);
    return ++calls === 1 ? Promise.reject(new TypeError('fetch failed')) : fetch(url, init);
  };
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    fetch: once,
    retry: { backoffMs: 10 },
  });
  const s = await c.create(uid('o5'));
  ok(keys.length === 2 && keys[0] === keys[1], `keys ${keys}`);
  return { calls, id: s.id };
});

// Scenario: timeoutMs 1 with maxRetries 0. Expected: network_error (timed out), key not in message.
await test('O6', 'timeout gives network_error without the key', async () => {
  const c = new ConnectClient({
    apiKey: state.projectKey,
    baseUrl: BASE,
    timeoutMs: 1,
    retry: { maxRetries: 0 },
  });
  try {
    await c.usage();
  } catch (error) {
    ok(error.code === 'network_error', describe(error));
    ok(!leaks(error.message, state.projectKey), 'key in message');
    return describe(error);
  }
  throw new Expected('no timeout');
});

// Scenario: plugins:write removed... (a key without a scope) is covered by the console; here:
// a 403 maps to ConnectAuthError with code insufficient_scope — checked with the For You key on a
// project route in B3. Error objects carry requestId:
await test('O7', 'errors carry a requestId', async () => {
  try {
    await connect.sessions.get('pjs_00000000000000000000000000000000');
  } catch (error) {
    ok(
      typeof error.requestId === 'string' && error.requestId.length > 0,
      `requestId ${error.requestId}`,
    );
    return error.requestId;
  }
  throw new Expected('no error');
});

// ─── Q. One component on or off for one user ─────────────────────────────────────────────────

const userQ = uid('quinn');
const userQ2 = uid('quentin');
const sessionQ = await connect.create(userQ);
const sessionQ2 = await connect.create(userQ2);
const pluginOf = async (userId, name) =>
  (await connect.users.plugins(userId)).find((p) => p.name === name);
const firstSkill = (plugin) => plugin.components.find((c) => c.kind === 'skill');

// Scenario: users.setComponentEnabled(userQ, deepwiki, <its MCP component>, false) on a plugin the
// project provides. Expected: users.plugins shows that component off for userQ only; userQ's
// session.mcp() no longer lists deepwiki, userQ2's still does.
await test(
  'Q1',
  'users.setComponentEnabled turns a project MCP server off for one user',
  async () => {
    const dw = await pluginOf(userQ, 'deepwiki');
    const componentId = dw.mcp[0].componentId;
    const after = await connect.users.setComponentEnabled(userQ, dw.pluginId, componentId, false);
    const row = after.components.find((c) => c.componentId === componentId);
    ok(row && row.enabled === false, `returned ${JSON.stringify(row)}`);
    const mine = (await sessionQ.mcp()).map((x) => x.name);
    const theirs = (await sessionQ2.mcp()).map((x) => x.name);
    ok(!mine.includes('deepwiki'), `userQ still sees deepwiki: ${mine}`);
    ok(theirs.includes('deepwiki'), `userQ2 lost deepwiki: ${theirs}`);
    return { userQ: mine, userQ2: theirs };
  },
);

// Scenario: with deepwiki off for userQ, an MCP call on the gateway's deepwiki URL with userQ's
// session token. Expected: no tools for userQ (refused, or an empty list); userQ2 still gets tools.
await test('Q2', 'the gateway shows no tools for an MCP server the user turned off', async () => {
  const [dw2] = await sessionQ2.mcp({ plugin: 'deepwiki' });
  const asQ = { ...dw2, headers: { ...dw2.headers, Authorization: `Bearer ${sessionQ.token}` } };
  const mine = await mcpCall(asQ, 'tools/list', {});
  const theirs = await mcpCall(dw2, 'tools/list', {});
  ok(
    mine.status !== 200 || !mine.data?.result?.tools?.length,
    `userQ got ${mine.status} with tools`,
  );
  ok(theirs.data?.result?.tools?.length > 0, `userQ2 got ${theirs.status}`);
  const said = (r) =>
    `${r.status} tools=${r.data?.result?.tools?.length ?? 0} ${r.data?.error?.message ?? ''}`.trim();
  return { userQ: said(mine), userQ2: said(theirs) };
});

// Scenario: users.clearComponentEnabled(userQ, deepwiki, component), then the same again.
// Expected: the user follows the install again (deepwiki back in mcp()); repeating it is safe.
await test('Q3', 'users.clearComponentEnabled returns to the install default', async () => {
  const dw = await pluginOf(userQ, 'deepwiki');
  const componentId = dw.mcp[0].componentId;
  const after = await connect.users.clearComponentEnabled(userQ, dw.pluginId, componentId);
  ok(after.components.find((c) => c.componentId === componentId)?.enabled === true, 'still off');
  await connect.users.clearComponentEnabled(userQ, dw.pluginId, componentId);
  const mine = (await sessionQ.mcp()).map((x) => x.name);
  ok(mine.includes('deepwiki'), `deepwiki not back: ${mine}`);
  return mine;
});

// Scenario: users.install(userQ, teaching), then setComponentEnabled off one of its skills (the
// user's own install), then clearComponentEnabled on it. Expected: the off is stored on the install
// (enabled false); clear answers 404 because a user's own install has no preference to clear.
await test('Q4', "setComponentEnabled on the user's own install; clear is 404 there", async () => {
  await connect.users.install(userQ, P('teaching').id);
  const t = await pluginOf(userQ, 'teaching');
  const skill = firstSkill(t);
  const after = await connect.users.setComponentEnabled(
    userQ,
    t.pluginId,
    skill.componentId,
    false,
  );
  ok(
    after.components.find((c) => c.componentId === skill.componentId)?.enabled === false,
    'not off',
  );
  const err = await rejects(
    () => connect.users.clearComponentEnabled(userQ, t.pluginId, skill.componentId),
    { type: ConnectNotFoundError },
  );
  await connect.users.setComponentEnabled(userQ, t.pluginId, skill.componentId, true);
  return { skill: skill.name, clear: err };
});

// Scenario: session.plugins.setComponentEnabled(toolkit, <one skill>, false) on a project plugin.
// Expected: the manifest keeps the skill with enabled false, its archive download is refused, and
// syncPlugins removes its files from a folder that had them.
const dirQ = join(syncRoot, userQ);
let qSkill;
await test(
  'Q5',
  'session.plugins.setComponentEnabled off: manifest, download and sync drop it',
  async () => {
    const kit = (await sessionQ.plugins.list()).find((p) => p.name === 'boldcreate-toolkit');
    qSkill = firstSkill(kit);
    const before = await sessionQ.manifest({ plugins: ['boldcreate-toolkit'] });
    const comp = before.entries
      .flatMap((e) => e.components)
      .find((c) => c.id === qSkill.componentId);
    ok(comp, 'skill not in the manifest before');
    await syncPlugins(sessionQ, { dir: dirQ, plugins: ['boldcreate-toolkit'] });
    const off = await sessionQ.plugins.setComponentEnabled(kit.pluginId, qSkill.componentId, false);
    ok(
      off.components.find((c) => c.componentId === qSkill.componentId)?.enabled === false,
      'not off',
    );
    const after = await sessionQ.manifest({ plugins: ['boldcreate-toolkit'] });
    const row = after.entries.flatMap((e) => e.components).find((c) => c.id === qSkill.componentId);
    ok(row?.enabled === false, `manifest row ${JSON.stringify(row)?.slice(0, 120)}`);
    const download = await rejects(() => sessionQ.component(comp.sha256));
    const r = await syncPlugins(sessionQ, { dir: dirQ, plugins: ['boldcreate-toolkit'] });
    const removed = r.removed.map((x) => x.name);
    ok(removed.includes(qSkill.name), `sync removed ${JSON.stringify(removed)}`);
    return { skill: qSkill.name, download, removed };
  },
);

// Scenario: session.plugins.clearComponentEnabled(toolkit, skill), then sync. Expected: the skill is
// enabled again in the manifest and sync adds it again.
await test(
  'Q6',
  'session.plugins.clearComponentEnabled brings it back on the next sync',
  async () => {
    const kit = (await sessionQ.plugins.list()).find((p) => p.name === 'boldcreate-toolkit');
    await sessionQ.plugins.clearComponentEnabled(kit.pluginId, qSkill.componentId);
    const m = await sessionQ.manifest({ plugins: ['boldcreate-toolkit'] });
    const row = m.entries.flatMap((e) => e.components).find((c) => c.id === qSkill.componentId);
    ok(row?.enabled === true, `manifest row ${JSON.stringify(row)?.slice(0, 120)}`);
    const r = await syncPlugins(sessionQ, { dir: dirQ, plugins: ['boldcreate-toolkit'] });
    const added = r.added.map((x) => x.name);
    ok(added.includes(qSkill.name), `sync added ${JSON.stringify(added)}`);
    return { added };
  },
);

// Scenario: setComponentEnabled with an unknown component id, with a plugin that is neither in the
// project nor installed (create-plugin), and with an empty user id. Expected: 404, 404, and the
// SDK refusing the empty user id before any call.
await test(
  'Q7',
  'setComponentEnabled refuses unknown components, plugins and user ids',
  async () => {
    const dw = await pluginOf(userQ, 'deepwiki');
    const unknownComponent = await rejects(
      () =>
        connect.users.setComponentEnabled(
          userQ,
          dw.pluginId,
          'cmp_00000000000000000000000000000000',
          false,
        ),
      { type: ConnectNotFoundError },
    );
    const notInstalled = await rejects(
      () =>
        sessionQ.plugins.setComponentEnabled(
          P('create-plugin').id,
          'cmp_00000000000000000000000000000000',
          false,
        ),
      { type: ConnectNotFoundError },
    );
    const emptyUser = await rejects(() =>
      connect.users.setComponentEnabled('', dw.pluginId, 'x', false),
    );
    return { unknownComponent, notInstalled, emptyUser };
  },
);

// Scenario: the For You key's /v1/sync after the visibility change. Expected: only For team ('org')
// and For me ('user') installs; plugins only a project provides (continual-learning) are not there.
await test('Q8', 'For You key sync leaves out project-only installs', async () => {
  const r = await rawGateway('GET', '/v1/sync', state.forYouKey);
  const entries = (r.json.entries ?? []).map((e) => `${e.pluginName}:${e.scope}`);
  ok(r.status === 200, `status ${r.status}`);
  ok(
    entries.every((e) => !e.endsWith(':project')),
    `project entries: ${entries}`,
  );
  ok(!entries.some((e) => e.startsWith('continual-learning')), `continual-learning: ${entries}`);
  return entries;
});

// ─── Summary ──────────────────────────────────────────────────────────────────────────────────

const passed = results.filter((r) => r.result === 'pass').length;
line(`\n${passed}/${results.length} passed`);
await writeFile(
  join(import.meta.dirname, '.local', 'ts-results.json'),
  `${JSON.stringify({ run: RUN, base: BASE, results }, null, 2)}\n`,
);
process.exitCode = passed === results.length ? 0 : 1;
