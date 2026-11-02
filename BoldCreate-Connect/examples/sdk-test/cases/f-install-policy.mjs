/**
 * Group F: User install policy
 * TypeScript SDK end-to-end cases for user install policy: install mode, allow-list, plugin sets.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/f-install-policy.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-f.json (this file alone).
 */
import { RUN, uid, P, test, ok, rejects, connect } from './lib.mjs';

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
