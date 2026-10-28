import { describe, expect, it, vi } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { discoverRepository, type DiscoverDeps } from './discover.js';
import { packTarGz, IngestionError } from './tar.js';

const archive = (entries: Record<string, string>): Buffer =>
  packTarGz(new Map(Object.entries(entries).map(([p, b]) => [`repo-1/${p}`, Buffer.from(b)])));

const SHA = 'a'.repeat(40);
const BODY = { owner: 'acme', repository: 'plugins', ref: 'main', path: '' };

interface KnownSource {
  sourceId: string;
  path: string;
  syncStatus: 'queued' | 'running' | 'succeeded' | 'failed' | null;
  lastSyncedAt: Date | null;
  lastError: string | null;
  pluginId: string | null;
  pluginStatus: 'active' | 'deprecated' | 'suspended' | null;
}

function deps(overrides: Partial<DiscoverDeps> = {}, known: KnownSource[] = []) {
  const db = {
    select: () => ({ from: () => ({ leftJoin: () => ({ where: async () => known }) }) }),
  } as unknown as Executor;
  return {
    db,
    allowedOwners: ['acme'],
    fetchArchive: vi.fn<DiscoverDeps['fetchArchive']>(async () => ({
      commitSha: SHA,
      tarball: archive({
        'marketplace.json': JSON.stringify({
          plugins: [
            { name: 'a', source: './a' },
            { name: 'b', source: './b' },
          ],
        }),
        'a/plugin.json': JSON.stringify({ name: 'plugin-a', version: '1.0.0', description: 'A' }),
        'b/plugin.json': JSON.stringify({ name: 'plugin-b', version: '2.0.0', description: 'B' }),
      }),
    })),
    ...overrides,
  } satisfies DiscoverDeps;
}

describe('discoverRepository', () => {
  it('lists the plugins and says how each folder that already has a source is doing', async () => {
    const result = await discoverRepository(
      deps({}, [
        {
          sourceId: '00000000-0000-4000-8000-000000000001',
          path: 'a',
          syncStatus: 'failed',
          lastSyncedAt: null,
          lastError: 'Ref not found.',
          pluginId: null,
          pluginStatus: null,
        },
      ]),
      BODY,
    );
    expect(result).toMatchObject({ layout: 'collection', commitSha: SHA });
    expect(result.plugins.map((p) => [p.path, p.name, p.version, p.installed])).toEqual([
      [
        'a',
        'plugin-a',
        '1.0.0',
        {
          sourceId: '00000000-0000-4000-8000-000000000001',
          pluginId: null,
          pluginStatus: null,
          syncStatus: 'failed',
          lastSyncedAt: null,
          lastError: 'Ref not found.',
        },
      ],
      ['b', 'plugin-b', '2.0.0', null],
    ]);
  });

  describe('logos and titles', () => {
    const collection = (files: Record<string, string>, folders: string[]) =>
      deps({
        fetchArchive: vi.fn<DiscoverDeps['fetchArchive']>(async () => ({
          commitSha: SHA,
          tarball: archive({
            'marketplace.json': JSON.stringify({
              plugins: folders.map((folder) => ({ name: folder, source: folder })),
            }),
            ...files,
          }),
        })),
      });
    const manifest = (extra: Record<string, unknown>) =>
      JSON.stringify({ name: 'tool-a', version: '1.0.0', description: 'A', ...extra });

    it("links each plugin's own logo in the repository at the inspected commit", async () => {
      const result = await discoverRepository(
        collection(
          {
            'third_party/a/plugin.json': manifest({ logo: 'assets/logo.png' }),
            'third_party/a/assets/logo.png': 'png',
            'b/.cursor-plugin/plugin.json': manifest({ name: 'tool-b', logo: './logo.svg' }),
            'b/logo.svg': '<svg/>',
          },
          ['third_party/a', 'b'],
        ),
        BODY,
      );
      expect(result.plugins.map((p) => p.logoUrl)).toEqual([
        `https://raw.githubusercontent.com/acme/plugins/${SHA}/third_party/a/assets/logo.png`,
        `https://raw.githubusercontent.com/acme/plugins/${SHA}/b/logo.svg`,
      ]);
    });

    it('gives no logo when the manifest names none, the file is missing or the path is unsafe', async () => {
      const result = await discoverRepository(
        collection(
          {
            'a/plugin.json': manifest({}),
            'b/plugin.json': manifest({ name: 'tool-b', logo: 'assets/missing.png' }),
            'c/plugin.json': manifest({ name: 'tool-c', logo: '../a/plugin.json.png' }),
            'd/plugin.json': manifest({ name: 'tool-d', logo: 'https://evil.example/x.png' }),
            'e/plugin.json': manifest({ name: 'tool-e', logo: 'notes.txt' }),
            'e/notes.txt': 'text',
          },
          ['a', 'b', 'c', 'd', 'e'],
        ),
        BODY,
      );
      expect(result.plugins.map((p) => p.logoUrl)).toEqual([null, null, null, null, null]);
    });

    it('never falls back to the picture of the repository owner', async () => {
      const result = await discoverRepository(deps(), BODY);
      for (const plugin of result.plugins) {
        expect(plugin.logoUrl).toBeNull();
        expect(JSON.stringify(plugin)).not.toContain('avatars');
      }
    });

    it('accepts a one character name, such as the X plugin, with its own logo', async () => {
      const result = await discoverRepository(
        collection(
          {
            'third_party/x/.cursor-plugin/plugin.json': JSON.stringify({
              name: 'x',
              displayName: 'X',
              version: '2.6.1',
              logo: 'assets/logo.svg',
            }),
            'third_party/x/assets/logo.svg': '<svg/>',
          },
          ['third_party/x'],
        ),
        BODY,
      );
      expect(result.plugins).toHaveLength(1);
      expect(result.plugins[0]).toMatchObject({
        path: 'third_party/x',
        name: 'x',
        displayName: 'X',
        logoUrl: `https://raw.githubusercontent.com/acme/plugins/${SHA}/third_party/x/assets/logo.svg`,
        problem: null,
      });
    });

    it('lists a folder that cannot be installed under the title it declares, not its path', async () => {
      const result = await discoverRepository(
        collection(
          {
            'third_party/odd/plugin.json': JSON.stringify({
              name: 'Bad_Name',
              displayName: 'Odd Tool',
              version: '1.0.0',
            }),
          },
          ['third_party/odd'],
        ),
        BODY,
      );
      expect(result.plugins[0]).toMatchObject({
        path: 'third_party/odd',
        name: null,
        displayName: 'Odd Tool',
        logoUrl: null,
        problem: expect.stringContaining('1 to 40 characters'),
      });
    });

    it('uses the declared name when there is no display name, and nothing for unreadable manifests', async () => {
      const result = await discoverRepository(
        collection(
          {
            'a/plugin.json': JSON.stringify({ name: 'Q!', version: '1.0.0' }),
            'b/plugin.json': '{ not json',
            'c/plugin.json': JSON.stringify(['array']),
            'd/plugin.json': JSON.stringify({ name: '  ', version: '1.0.0' }),
          },
          ['a', 'b', 'c', 'd'],
        ),
        BODY,
      );
      expect(result.plugins.map((p) => p.displayName)).toEqual(['Q!', null, null, null]);
    });
  });

  it('refuses an owner that is not on the allow-list without fetching', async () => {
    const injected = deps();
    await expect(
      discoverRepository(injected, { ...BODY, owner: 'stranger' }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    expect(injected.fetchArchive).not.toHaveBeenCalled();
  });

  it('turns a fetch problem into a message the admin can read', async () => {
    const injected = deps({
      fetchArchive: async () => {
        throw new IngestionError('The ref could not be resolved to a commit.');
      },
    });
    await expect(discoverRepository(injected, BODY)).rejects.toMatchObject({
      code: 'validation_failed',
      details: [{ field: 'repository', message: 'The ref could not be resolved to a commit.' }],
    });
  });

  it('does not leak unexpected errors', async () => {
    const injected = deps({
      fetchArchive: async () => {
        throw new Error('socket hang up at 10.0.0.1');
      },
    });
    await expect(discoverRepository(injected, BODY)).rejects.toMatchObject({
      details: [{ message: 'The repository could not be inspected.' }],
    });
  });
});
