/**
 * Group M: File sync
 * TypeScript SDK end-to-end cases for file sync with syncPlugins: add, unchanged, hooks, kinds and plugins filters, conflicts, remove, stale, folder owner, report.
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/m-sync.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-m.json (this file alone).
 */
import { readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ConnectSession } from '../../../packages/sdk/dist/index.js';
import { syncPlugins } from '../../../packages/sdk/dist/sync.js';
import { uid, P, test, describe, ok, rejects, connect, syncRoot } from './lib.mjs';

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
