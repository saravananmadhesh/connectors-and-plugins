import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ConnectIntegrityError, ConnectNotFoundError } from './errors.js';
import { syncPlugins, toMcpConfig } from './sync.js';
import { ConnectSession } from './session.js';
import { readLock, stateDir } from './sync-files.js';
import {
  archiveOf,
  bytes,
  empty,
  failure,
  fakeFetch,
  json,
  sha256,
  tarGz,
  text,
} from './test-support.js';

const TOKEN = 'stk_fedcba9876543210.' + 'zyxwvutsrqponmlkjihgfedcba012345';

interface Spec {
  id: string;
  kind: 'skill' | 'rule' | 'hook' | 'agent';
  files: Record<string, string>;
  plugin?: string;
  enabled?: boolean;
}

/** A manifest and the archive routes for a list of components. */
function world(specs: Spec[], revision = 'rev1') {
  const archives = new Map<string, ReturnType<typeof archiveOf>>();
  const components = specs.map((spec) => {
    const archive = archiveOf(spec.files);
    archives.set(archive.sha256, archive);
    return {
      spec,
      archive,
      component: {
        id: spec.id,
        kind: spec.kind,
        name: spec.id,
        enabled: spec.enabled ?? true,
        sha256: archive.sha256,
        sizeBytes: archive.data.length,
        href: '',
        path: '',
      },
    };
  });
  const plugins = [...new Set(specs.map((spec) => spec.plugin ?? 'alpha'))];
  const manifest = {
    revision,
    pollAfterSeconds: 60,
    skipped: [],
    entries: plugins.map((plugin) => ({
      installationId: 'ins',
      pluginId: `plg_${plugin}`,
      pluginName: plugin,
      versionId: 'pv',
      version: '1',
      scope: 'user',
      yanked: false,
      sha256: '',
      sizeBytes: 0,
      href: '',
      components: components
        .filter((item) => (item.spec.plugin ?? 'alpha') === plugin)
        .map((item) => item.component),
      mcp: [],
      setup: { kind: 'none' },
    })),
  };
  const routes: Record<string, ReturnType<typeof bytes>> = {};
  for (const [hash, archive] of archives) {
    routes[`GET /v1/sync/components/${hash}`] = bytes(archive.data);
  }
  return { manifest, routes, archives, components };
}

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'connect-sync-'));
});
afterEach(() => rm(dir, { recursive: true, force: true }));

function open(
  routes: Parameters<typeof fakeFetch>[0],
  info = { id: 'pjs_1', userId: 'u1', expiresAt: '2026-11-16T00:00:00.000Z' },
) {
  const fake = fakeFetch({ 'POST /v1/sync/reports': empty(), ...routes });
  const session = new ConnectSession(TOKEN, info, {
    baseUrl: 'https://api.test',
    fetch: fake.fetch,
    sleep: async () => {},
  });
  return { session, ...fake };
}

const read = (...parts: string[]) => readFile(join(dir, ...parts), 'utf8');
const names = (list: { componentId: string }[]) => list.map((item) => item.componentId).sort();
const downloads = (calls: { url: URL }[]) =>
  calls.filter((call) => call.url.pathname.startsWith('/v1/sync/components/')).length;

describe('syncPlugins', () => {
  describe('a first sync', () => {
    it('places files under the plugin folder and writes the lock last', async () => {
      const w = world([
        { id: 'cmp_1', kind: 'skill', files: { 'skills/a/SKILL.md': 'skill text' } },
        { id: 'cmp_2', kind: 'rule', files: { 'rules/r.md': 'rule text' } },
      ]);
      const { session } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      const result = await syncPlugins(session, { dir });
      expect(names(result.added)).toEqual(['cmp_1', 'cmp_2']);
      expect(result.stale).toBe(false);
      expect(await read('alpha', 'skills', 'a', 'SKILL.md')).toBe('skill text');
      expect(await read('alpha', 'rules', 'r.md')).toBe('rule text');
      const lock = await readLock(dir);
      expect(lock).toMatchObject({ version: 1, revision: 'rev1', userId: 'u1' });
      expect(Object.keys(lock?.components ?? {}).sort()).toEqual(['cmp_1', 'cmp_2']);
      expect(lock?.components['cmp_1']?.files['skills/a/SKILL.md']).toHaveLength(64);
    });

    it('never writes the token to disk', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const { session } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(session, { dir });
      const all: string[] = [];
      const walk = async (folder: string) => {
        for (const entry of await readdir(folder, { withFileTypes: true })) {
          const path = join(folder, entry.name);
          if (entry.isDirectory()) await walk(path);
          else all.push(await readFile(path, 'utf8'));
        }
      };
      await walk(dir);
      expect(all.join('\n')).not.toContain('zyxwvuts');
    });

    it('reports what was placed', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const { session, calls } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(session, { dir });
      const report = calls.find((call) => call.url.pathname === '/v1/sync/reports');
      expect(report?.body).toMatchObject({
        applied: [{ componentId: 'cmp_1', sha256: w.components[0]?.archive.sha256 }],
      });
    });

    it('is not undone by a report that cannot be sent', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const { session } = open({
        'GET /v1/sync': json(w.manifest),
        'POST /v1/sync/reports': failure(500, 'internal_error'),
        ...w.routes,
      });
      const result = await syncPlugins(session, { dir });
      expect(names(result.added)).toEqual(['cmp_1']);
    });

    it('downloads a shared archive once', async () => {
      const w = world([
        { id: 'cmp_h1', kind: 'hook', files: { 'hooks/hooks.json': '{}' } },
        { id: 'cmp_h2', kind: 'hook', files: { 'hooks/hooks.json': '{}' } },
      ]);
      const { session, calls } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(session, { dir, allowHooks: true });
      expect(downloads(calls)).toBe(1);
    });
  });

  describe('a later sync', () => {
    it('does nothing when the manifest has not changed', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const first = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(first.session, { dir });
      const second = open({ 'GET /v1/sync': empty(304) });
      const result = await syncPlugins(second.session, { dir });
      expect(names(result.unchanged)).toEqual(['cmp_1']);
      expect(result.added).toEqual([]);
      expect(second.calls[0]?.headers['if-none-match']).toBe('"rev1"');
      expect(downloads(second.calls)).toBe(0);
    });

    it('downloads only the components whose hash differs', async () => {
      const before = world([
        { id: 'cmp_1', kind: 'skill', files: { 'a.md': 'one' } },
        { id: 'cmp_2', kind: 'rule', files: { 'b.md': 'two' } },
      ]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      const after = world(
        [
          { id: 'cmp_1', kind: 'skill', files: { 'a.md': 'one' } },
          { id: 'cmp_2', kind: 'rule', files: { 'b.md': 'two changed' } },
        ],
        'rev2',
      );
      const { session, calls } = open({ 'GET /v1/sync': json(after.manifest), ...after.routes });
      const result = await syncPlugins(session, { dir });
      expect(names(result.updated)).toEqual(['cmp_2']);
      expect(names(result.unchanged)).toEqual(['cmp_1']);
      expect(downloads(calls)).toBe(1);
      expect(await read('alpha', 'b.md')).toBe('two changed');
      expect((await readLock(dir))?.revision).toBe('rev2');
    });

    it('removes files of a component that left the manifest', async () => {
      const before = world([
        { id: 'cmp_1', kind: 'skill', files: { 'skills/a/SKILL.md': 'one' } },
        { id: 'cmp_2', kind: 'rule', files: { 'b.md': 'two' } },
      ]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      const after = world([{ id: 'cmp_2', kind: 'rule', files: { 'b.md': 'two' } }], 'rev2');
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(after.manifest), ...after.routes }).session,
        { dir },
      );
      expect(names(result.removed)).toEqual(['cmp_1']);
      await expect(stat(join(dir, 'alpha', 'skills'))).rejects.toThrow(/ENOENT/);
      expect(await read('alpha', 'b.md')).toBe('two');
      expect(Object.keys((await readLock(dir))?.components ?? {})).toEqual(['cmp_2']);
    });

    it('removes a component that was disabled', async () => {
      const before = world([{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'two' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      const after = world(
        [{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'two' }, enabled: false }],
        'rev2',
      );
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(after.manifest), ...after.routes }).session,
        { dir },
      );
      expect(names(result.removed)).toEqual(['cmp_1']);
    });
  });

  describe('files changed by hand', () => {
    async function placed() {
      const before = world([{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'original' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      await writeFile(join(dir, 'alpha', 'b.md'), 'edited by hand');
    }

    it('keeps a modified file on update and lists it, leaving the lock at the old hash', async () => {
      await placed();
      const after = world(
        [{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'new upstream' } }],
        'rev2',
      );
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(after.manifest), ...after.routes }).session,
        { dir },
      );
      expect(result.modified).toEqual([join(dir, 'alpha', 'b.md')]);
      expect(result.updated).toEqual([]);
      expect(await read('alpha', 'b.md')).toBe('edited by hand');
      const old = world([{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'original' } }]);
      expect((await readLock(dir))?.components['cmp_1']?.sha256).toBe(
        old.components[0]?.archive.sha256,
      );
    });

    it('replaces it when asked to overwrite', async () => {
      await placed();
      const after = world(
        [{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'new upstream' } }],
        'rev2',
      );
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(after.manifest), ...after.routes }).session,
        { dir, onConflict: 'overwrite' },
      );
      expect(names(result.updated)).toEqual(['cmp_1']);
      expect(await read('alpha', 'b.md')).toBe('new upstream');
    });

    it('keeps a modified file when its component leaves, and lists it', async () => {
      await placed();
      const after = world([], 'rev2');
      const result = await syncPlugins(open({ 'GET /v1/sync': json(after.manifest) }).session, {
        dir,
      });
      expect(result.modified).toEqual([join(dir, 'alpha', 'b.md')]);
      expect(result.removed).toEqual([]);
      expect(await read('alpha', 'b.md')).toBe('edited by hand');
    });

    it('removes it when asked to overwrite', async () => {
      await placed();
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(world([], 'rev2').manifest) }).session,
        { dir, onConflict: 'overwrite' },
      );
      expect(names(result.removed)).toEqual(['cmp_1']);
      await expect(stat(join(dir, 'alpha', 'b.md'))).rejects.toThrow(/ENOENT/);
    });

    it('treats a file that was already there, and not placed by a sync, as a conflict', async () => {
      const w = world([{ id: 'cmp_1', kind: 'rule', files: { 'b.md': 'upstream' } }]);
      await mkdir(join(dir, 'alpha'), { recursive: true });
      await writeFile(join(dir, 'alpha', 'b.md'), 'mine');
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session,
        { dir },
      );
      expect(result.modified).toEqual([join(dir, 'alpha', 'b.md')]);
      expect(await read('alpha', 'b.md')).toBe('mine');
    });

    it('does not remove a shared file while another component still owns it', async () => {
      const before = world([
        { id: 'cmp_h1', kind: 'hook', files: { 'hooks/hooks.json': '{}' } },
        { id: 'cmp_h2', kind: 'hook', files: { 'hooks/hooks.json': '{}' } },
      ]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
        allowHooks: true,
      });
      const after = world(
        [{ id: 'cmp_h2', kind: 'hook', files: { 'hooks/hooks.json': '{}' } }],
        'rev2',
      );
      const result = await syncPlugins(
        open({ 'GET /v1/sync': json(after.manifest), ...after.routes }).session,
        { dir, allowHooks: true },
      );
      expect(names(result.removed)).toEqual(['cmp_h1']);
      expect(await read('alpha', 'hooks', 'hooks.json')).toBe('{}');
    });
  });

  describe('what is asked for', () => {
    it('leaves kinds that were not requested alone', async () => {
      const before = world([
        { id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } },
        { id: 'cmp_2', kind: 'rule', files: { 'b.md': 'y' } },
      ]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      const after = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }], 'rev2');
      const { session, calls } = open({ 'GET /v1/sync': json(after.manifest), ...after.routes });
      const result = await syncPlugins(session, { dir, kinds: ['skill'] });
      expect(result.removed).toEqual([]);
      expect(await read('alpha', 'b.md')).toBe('y');
      expect(calls[0]?.url.searchParams.get('kinds')).toBe('skill');
    });

    it('places hooks only when allowed, and without an execute bit', async () => {
      const w = world([{ id: 'cmp_h', kind: 'hook', files: { 'hooks/hooks.json': '{}' } }]);
      const closed = await syncPlugins(
        open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session,
        { dir },
      );
      expect(closed.skipped).toEqual([expect.objectContaining({ componentId: 'cmp_h' })]);
      await expect(stat(join(dir, 'alpha'))).rejects.toThrow(/ENOENT/);

      const allowed = await syncPlugins(
        open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session,
        {
          dir,
          allowHooks: true,
        },
      );
      expect(names(allowed.added)).toEqual(['cmp_h']);
      expect((await stat(join(dir, 'alpha', 'hooks', 'hooks.json'))).mode & 0o111).toBe(0);
    });

    it.skipIf(process.platform === 'win32')(
      "makes a hook's scripts runnable, and nothing else",
      async () => {
        const w = world([
          {
            id: 'cmp_h',
            kind: 'hook',
            files: { 'hooks/hooks.json': '{}', 'hooks/stop.sh': '#!/bin/sh\nexit 0\n' },
          },
          { id: 'cmp_s', kind: 'skill', files: { 'skills/a/run.sh': '#!/bin/sh\n' } },
        ]);
        await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, {
          dir,
          allowHooks: true,
        });
        expect((await stat(join(dir, 'alpha', 'hooks', 'stop.sh'))).mode & 0o777).toBe(0o755);
        expect((await stat(join(dir, 'alpha', 'hooks', 'hooks.json'))).mode & 0o111).toBe(0);
        expect((await stat(join(dir, 'alpha', 'skills', 'a', 'run.sh'))).mode & 0o111).toBe(0);
      },
    );

    it('keeps asking for the whole manifest while something was left out', async () => {
      const w = world([{ id: 'cmp_h', kind: 'hook', files: { 'hooks/hooks.json': '{}' } }], 'rev9');
      await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, { dir });
      expect((await readLock(dir))?.revision).toBe('');

      const { session, calls } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(session, { dir, allowHooks: true });
      expect(calls[0]?.headers['if-none-match']).toBeUndefined();
      expect((await readLock(dir))?.revision).toBe('rev9');
    });

    it('drops an older revision once something is left out', async () => {
      // A plugin added (its hook skipped) and then removed brings the server back to the first
      // revision; the folder must still be compared with the whole manifest.
      const first = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'one' } }], 'rev1');
      await syncPlugins(open({ 'GET /v1/sync': json(first.manifest), ...first.routes }).session, {
        dir,
      });
      expect((await readLock(dir))?.revision).toBe('rev1');

      const added = world(
        [
          { id: 'cmp_1', kind: 'skill', files: { 'a.md': 'one' } },
          { id: 'cmp_2', kind: 'skill', plugin: 'beta', files: { 'b.md': 'two' } },
          { id: 'cmp_h', kind: 'hook', plugin: 'beta', files: { 'hooks/hooks.json': '{}' } },
        ],
        'rev2',
      );
      await syncPlugins(open({ 'GET /v1/sync': json(added.manifest), ...added.routes }).session, {
        dir,
      });
      expect((await readLock(dir))?.revision).toBe('');

      const { session, calls } = open({ 'GET /v1/sync': json(first.manifest), ...first.routes });
      const result = await syncPlugins(session, { dir });
      expect(calls[0]?.headers['if-none-match']).toBeUndefined();
      expect(names(result.removed)).toEqual(['cmp_2']);
      expect(await readdir(dir)).not.toContain('beta');
    });

    it('passes the plugin filter on', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const { session, calls } = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      await syncPlugins(session, { dir, plugins: ['alpha'] });
      expect(calls[0]?.url.searchParams.get('plugins')).toBe('alpha');
    });
  });

  describe('safety', () => {
    it('refuses a folder that belongs to another user', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, { dir });
      const other = open(
        { 'GET /v1/sync': json(w.manifest), ...w.routes },
        { id: 'pjs_2', userId: 'u2', expiresAt: '2026-11-16T00:00:00.000Z' },
      );
      await expect(syncPlugins(other.session, { dir })).rejects.toMatchObject({
        code: 'lock_owner_mismatch',
      });
    });

    it('rejects an unsafe archive and places nothing', async () => {
      const evil = tarGz([{ path: '../escape.md', body: text('x') }]);
      const real = sha256(evil);
      const manifest = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]).manifest;
      manifest.entries[0]!.components[0]!.sha256 = real;
      const { session } = open({
        'GET /v1/sync': json(manifest),
        [`GET /v1/sync/components/${real}`]: bytes(evil),
      });
      await expect(syncPlugins(session, { dir })).rejects.toMatchObject({ code: 'archive_unsafe' });
      expect(await readLock(dir)).toBeUndefined();
      expect(await readdir(dir)).not.toContain('alpha');
    });

    it('fails on a hash mismatch without retrying and without writing a lock', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const hash = w.components[0]!.archive.sha256;
      const { session, calls } = open({
        'GET /v1/sync': json(w.manifest),
        [`GET /v1/sync/components/${hash}`]: bytes(new Uint8Array([9, 9, 9])),
      });
      await expect(syncPlugins(session, { dir })).rejects.toBeInstanceOf(ConnectIntegrityError);
      expect(downloads(calls)).toBe(1);
      expect(await readLock(dir)).toBeUndefined();
    });

    it('serializes two calls in one folder', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const a = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      const b = open({ 'GET /v1/sync': json(w.manifest), ...w.routes });
      const results = await Promise.all([
        syncPlugins(a.session, { dir }),
        syncPlugins(b.session, { dir }),
      ]);
      const added = results.map((result) => result.added.length).sort();
      expect(added).toEqual([0, 1]);
      expect(await readdir(stateDir(dir))).not.toContain('lock.pid');
    });
  });

  describe('when the server fails', () => {
    it('refetches the manifest once after a 404 and retries', async () => {
      const stale = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'old' } }]);
      const fresh = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'new' } }], 'rev2');
      const staleHash = stale.components[0]!.archive.sha256;
      const { session, calls } = open({
        'GET /v1/sync': [json(stale.manifest), json(fresh.manifest)],
        [`GET /v1/sync/components/${staleHash}`]: failure(404, 'not_found'),
        ...fresh.routes,
      });
      const result = await syncPlugins(session, { dir });
      expect(names(result.added)).toEqual(['cmp_1']);
      expect(calls.filter((call) => call.url.pathname === '/v1/sync')).toHaveLength(2);
      expect(await read('alpha', 'a.md')).toBe('new');
    });

    it('fails when the second attempt is a 404 as well', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      const hash = w.components[0]!.archive.sha256;
      const { session } = open({
        'GET /v1/sync': json(w.manifest),
        [`GET /v1/sync/components/${hash}`]: failure(404, 'not_found'),
      });
      await expect(syncPlugins(session, { dir })).rejects.toBeInstanceOf(ConnectNotFoundError);
      expect(await readLock(dir)).toBeUndefined();
    });

    it('returns the last good state as stale when the server cannot be reached', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, { dir });
      const down = open({ 'GET /v1/sync': new Error('offline') });
      const result = await syncPlugins(down.session, { dir });
      expect(result.stale).toBe(true);
      expect(names(result.unchanged)).toEqual(['cmp_1']);
      expect(await read('alpha', 'a.md')).toBe('x');
    });

    it('returns the last good state as stale after a server error', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, { dir });
      const broken = open({ 'GET /v1/sync': failure(500, 'internal_error') });
      expect((await syncPlugins(broken.session, { dir })).stale).toBe(true);
    });

    it('stays stale when a download fails after a good manifest', async () => {
      const before = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(before.manifest), ...before.routes }).session, {
        dir,
      });
      const after = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'y' } }], 'rev2');
      const hash = after.components[0]!.archive.sha256;
      const { session } = open({
        'GET /v1/sync': json(after.manifest),
        [`GET /v1/sync/components/${hash}`]: failure(503, 'service_unavailable'),
      });
      const result = await syncPlugins(session, { dir });
      expect(result.stale).toBe(true);
      expect(await read('alpha', 'a.md')).toBe('x');
    });

    it('throws on a first sync with nothing to fall back on', async () => {
      const { session } = open({ 'GET /v1/sync': new Error('offline') });
      await expect(syncPlugins(session, { dir })).rejects.toMatchObject({ code: 'network_error' });
    });

    it('does not hide a refusal as stale', async () => {
      const w = world([{ id: 'cmp_1', kind: 'skill', files: { 'a.md': 'x' } }]);
      await syncPlugins(open({ 'GET /v1/sync': json(w.manifest), ...w.routes }).session, { dir });
      const refused = open({ 'GET /v1/sync': failure(401, 'unauthorized') });
      await expect(syncPlugins(refused.session, { dir })).rejects.toMatchObject({ status: 401 });
    });
  });
});

describe('node entry', () => {
  it('exports the config writer', () => {
    expect(toMcpConfig([], { format: 'standard' })).toContain('mcpServers');
  });
});
