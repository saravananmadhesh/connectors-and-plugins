/**
 * Group A: Client options and input checks (offline)
 * TypeScript SDK end-to-end cases for client options and input checks. Offline: no server call is needed.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/a-options.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-a.json (this file alone).
 */
import { ConnectClient, ConnectSession } from '../../../packages/sdk/dist/index.js';
import { toMcpConfig, TOKEN_PLACEHOLDER } from '../../../packages/sdk/dist/sync.js';
import { BASE, state, uid, test, ok, rejects, leaks, connect } from './lib.mjs';

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
