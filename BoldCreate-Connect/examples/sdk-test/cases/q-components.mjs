/**
 * Group Q: One component on or off for one user
 * TypeScript SDK end-to-end cases for one component on or off for one user: users and session setComponentEnabled / clearComponentEnabled, and how the MCP list, gateway, manifest, download and sync follow it.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/q-components.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-q.json (this file alone).
 */
import { join } from 'node:path';
import { ConnectNotFoundError } from '../../../packages/sdk/dist/index.js';
import { syncPlugins } from '../../../packages/sdk/dist/sync.js';
import {
  state,
  uid,
  P,
  test,
  ok,
  rejects,
  connect,
  rawGateway,
  mcpCall,
  syncRoot,
} from './lib.mjs';

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
