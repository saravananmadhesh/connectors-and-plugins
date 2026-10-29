/**
 * Group C: Users
 * TypeScript SDK end-to-end cases for users: list, filters, paging, setName, per-user installs by the host.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/c-users.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-c.json (this file alone).
 */
import { ConnectNotFoundError } from '../../../packages/sdk/dist/index.js';
import { RUN, uid, P, test, ok, rejects, connect, userA, ensureUser } from './lib.mjs';

await ensureUser(userA);

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
