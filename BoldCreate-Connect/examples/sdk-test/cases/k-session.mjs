/**
 * Group K: Session self-service ("For you")
 * TypeScript SDK end-to-end cases for session self-service ("For you"): catalog, install, update, remove, variables, mcp, manifest (GET /v1/sync), component download (GET /v1/sync/components/{sha256}), report. It shares the session "kate" with L and O.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/k-session.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-k.json (this file alone).
 */
import {
  ConnectIntegrityError,
  ConnectNotFoundError,
  ConnectSession,
  ConnectSetupRequiredError,
} from '../../../packages/sdk/dist/index.js';
import { BASE, uid, P, test, ok, rejects, connect, mcpComponents, sharedSession } from './lib.mjs';

const { context7Component } = await mcpComponents();

const sessionK = await sharedSession('kate');

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
