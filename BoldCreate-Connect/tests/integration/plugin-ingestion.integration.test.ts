/**
 * Ingestion against the real database with the worker's role: a fetched archive becomes a pending
 * version with components and a stored archive; failures are recorded on the source.
 */
import { randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sql } from './signed-in-user.js';
import { createDb } from '../../packages/db/src/index.js';
import {
  packTarGz,
  runIngestion,
  type FetchedArchive,
  type IngestionDeps,
} from '../../packages/domain/src/index.js';
import type { BlobPort } from '../../packages/ports/src/index.js';
import { roleConnectionString } from './test-env.js';

const OWNER = 'ingest-owner';
const NAME = 'ingest-sample';

function memoryBlob(): BlobPort & { keys: () => string[] } {
  const store = new Map<string, Buffer>();
  return {
    keys: () => [...store.keys()],
    getStream: async (sha) => {
      const body = store.get(sha) as Buffer;
      return { stream: Readable.from(body), sizeBytes: body.length };
    },
    head: async (sha) => {
      const body = store.get(sha);
      return body ? { sizeBytes: body.length } : null;
    },
    put: async (sha, body) => {
      store.set(sha, Buffer.from(body as Uint8Array));
    },
    exists: async (sha) => store.has(sha),
    delete: async (sha) => {
      store.delete(sha);
    },
  };
}

function tarball(entries: Record<string, string>): Buffer {
  return packTarGz(
    new Map(Object.entries(entries).map(([path, body]) => [`repo-1/${path}`, Buffer.from(body)])),
  );
}

const pluginFiles = (version: string): Record<string, string> => ({
  'plugin.json': JSON.stringify({
    name: NAME,
    version,
    description: 'Sample for ingestion tests.',
    keywords: ['sample'],
  }),
  'rules/style.md': '---\ndescription: Style\n---\nUse tabs.',
  'hooks/hooks.json': JSON.stringify({ hooks: { stop: [{ command: 'echo done' }] } }),
  'mcp.json': JSON.stringify({ mcpServers: { remote: { url: 'https://mcp.example.test' } } }),
});

describe('plugin ingestion', () => {
  const { db, pool } = createDb({ connectionString: roleConnectionString('worker'), max: 2 });
  const blob = memoryBlob();
  const sourceId = randomUUID();
  let fetched: FetchedArchive | Error;
  const deps: IngestionDeps = {
    db,
    blob,
    allowedOwners: [OWNER],
    fetchArchive: async () => {
      if (fetched instanceof Error) throw fetched;
      return fetched;
    },
  };

  async function queue(): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_ingestion (id, source_id, requested_by) VALUES ($1, $2, 'test')`,
      [id, sourceId],
    );
    return id;
  }

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM component WHERE plugin_version_id IN (SELECT v.id FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1)`,
      [NAME],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name = $1)`,
      [NAME],
    );
    await sql(`DELETE FROM plugin WHERE name = $1`, [NAME]);
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
  }

  beforeAll(async () => {
    await cleanup();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by) VALUES ($1, $2, 'repo', 'main', '', 'test')`,
      [sourceId, OWNER],
    );
  });
  afterAll(async () => {
    await cleanup();
    await pool.end();
  });

  const state = async () =>
    (
      await sql<{ last_status: string; last_error: string | null; last_commit_sha: string | null }>(
        `SELECT last_status, last_error, last_commit_sha FROM plugin_source WHERE id = $1`,
        [sourceId],
      )
    )[0]!;

  it('stores a pending version with components, scan and archive', async () => {
    fetched = { commitSha: 'a'.repeat(40), tarball: tarball(pluginFiles('1.0.0')) };
    const id = await queue();
    await runIngestion(deps, id);

    expect(await state()).toEqual({
      last_status: 'succeeded',
      last_error: null,
      last_commit_sha: 'a'.repeat(40),
    });
    const versions = await sql<{
      status: string;
      commit_sha: string;
      archive_sha256: string;
      scan: { hookCommands: { command: string }[]; mcpServers: { name: string }[] };
    }>(
      `SELECT v.status, v.commit_sha, v.archive_sha256, v.scan FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
      [NAME],
    );
    expect(versions).toHaveLength(1);
    const version = versions[0]!;
    expect(version.status).toBe('pending');
    expect(version.commit_sha).toBe('a'.repeat(40));
    expect(blob.keys()).toContain(version.archive_sha256);
    expect(version.scan.hookCommands).toEqual([{ event: 'stop', command: 'echo done' }]);
    expect(version.scan.mcpServers.map((server) => server.name)).toEqual(['remote']);

    const kinds = await sql<{ kind: string }>(
      `SELECT c.kind FROM component c JOIN plugin_version v ON v.id = c.plugin_version_id JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1 ORDER BY c.kind`,
      [NAME],
    );
    expect(kinds.map((row) => row.kind)).toEqual(['hook', 'mcp', 'rule']);

    const ingestion = await sql<{ status: string; plugin_version_id: string | null }>(
      `SELECT status, plugin_version_id FROM plugin_ingestion WHERE id = $1`,
      [id],
    );
    expect(ingestion[0]!.status).toBe('succeeded');
    expect(ingestion[0]!.plugin_version_id).not.toBeNull();
  });

  it('is idempotent for the same commit and refuses the same version from another', async () => {
    fetched = { commitSha: 'a'.repeat(40), tarball: tarball(pluginFiles('1.0.0')) };
    await runIngestion(deps, await queue());
    expect(await state()).toMatchObject({ last_status: 'succeeded' });
    const count = await sql<{ n: string }>(
      `SELECT count(*)::text AS n FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
      [NAME],
    );
    expect(count[0]!.n).toBe('1');

    fetched = { commitSha: 'b'.repeat(40), tarball: tarball(pluginFiles('1.0.0')) };
    await runIngestion(deps, await queue());
    expect(await state()).toMatchObject({ last_status: 'failed' });
    expect((await state()).last_error).toContain('Raise the version');

    fetched = { commitSha: 'b'.repeat(40), tarball: tarball(pluginFiles('1.1.0')) };
    await runIngestion(deps, await queue());
    expect(await state()).toMatchObject({ last_status: 'succeeded' });
  });

  it('keeps the details an operator edited and refreshes the ones nobody touched', async () => {
    const shown = async () =>
      (
        await sql<{ display_name: string; versions: string }>(
          `SELECT p.display_name, (SELECT count(*)::text FROM plugin_version v WHERE v.plugin_id = p.id) AS versions FROM plugin p WHERE p.name = $1`,
          [NAME],
        )
      )[0]!;

    await sql(
      `UPDATE plugin SET display_name = 'Edited name', metadata_edited = true WHERE name = $1`,
      [NAME],
    );
    fetched = { commitSha: 'f'.repeat(40), tarball: tarball(pluginFiles('1.2.0')) };
    await runIngestion(deps, await queue());
    expect(await state()).toMatchObject({ last_status: 'succeeded' });
    expect(await shown()).toEqual({ display_name: 'Edited name', versions: '3' });

    await sql(`UPDATE plugin SET metadata_edited = false WHERE name = $1`, [NAME]);
    fetched = { commitSha: '1'.repeat(40), tarball: tarball(pluginFiles('1.3.0')) };
    await runIngestion(deps, await queue());
    expect(await shown()).toEqual({ display_name: NAME, versions: '4' });
  });

  it('records readable failures and never leaks fetch errors', async () => {
    fetched = {
      commitSha: 'c'.repeat(40),
      tarball: packTarGz(new Map([['repo-1/../evil.txt', Buffer.from('x')]])),
    };
    await runIngestion(deps, await queue());
    expect((await state()).last_error).toBe('The archive contains an unsafe path.');

    fetched = {
      commitSha: 'c'.repeat(40),
      tarball: tarball({ 'plugin.json': JSON.stringify({ name: 'Bad Name', version: '1.0.0' }) }),
    };
    await runIngestion(deps, await queue());
    expect((await state()).last_error).toContain('manifest name');

    fetched = new Error('connect ECONNREFUSED 10.0.0.1:443 secret-token');
    await runIngestion(deps, await queue());
    expect((await state()).last_error).toBe('Fetching or reading the repository failed.');
  });

  it('refuses owners that are not on the allow-list and ignores finished ingestions', async () => {
    fetched = { commitSha: 'd'.repeat(40), tarball: tarball(pluginFiles('2.0.0')) };
    const id = await queue();
    await runIngestion({ ...deps, allowedOwners: [] }, id);
    expect((await state()).last_error).toBe('This repository owner is not on the allow-list.');

    await runIngestion(deps, id);
    const rows = await sql<{ status: string }>(
      `SELECT status FROM plugin_ingestion WHERE id = $1`,
      [id],
    );
    expect(rows[0]!.status).toBe('failed');
  });

  it('refuses a plugin name that another source owns', async () => {
    await sql(`UPDATE plugin SET source_id = NULL WHERE name = $1`, [NAME]);
    fetched = { commitSha: 'e'.repeat(40), tarball: tarball(pluginFiles('3.0.0')) };
    await runIngestion(deps, await queue());
    expect((await state()).last_error).toBe(
      'A plugin with this name already exists from another source.',
    );
  });
});

describe('plugin ingestion of categories and collections', () => {
  const { db, pool } = createDb({ connectionString: roleConnectionString('worker'), max: 2 });
  const blob = memoryBlob();
  const COLLECTION_OWNER = 'collection-owner';
  const CATEGORY = 'ingest-dev-tools';
  const OTHER_CATEGORY = 'ingest-other';
  const CREATED_CATEGORY = 'nowhere-land';
  const OPTIONED_PLUGIN = 'ingest-optioned';
  const PLUGIN = 'ingest-categorised';
  const GENERAL_PLUGIN = 'ingest-uncategorised';
  let fetched: FetchedArchive;
  const deps: IngestionDeps = {
    db,
    blob,
    allowedOwners: [COLLECTION_OWNER],
    fetchArchive: async () => fetched,
  };

  async function addSource(repository: string, path: string, createdBy = 'test'): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by) VALUES ($1, $2, $3, 'main', $4, $5)`,
      [id, COLLECTION_OWNER, repository, path, createdBy],
    );
    return id;
  }

  async function run(sourceId: string): Promise<void> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_ingestion (id, source_id, requested_by) VALUES ($1, $2, 'test')`,
      [id, sourceId],
    );
    await runIngestion(deps, id);
  }

  async function cleanup(): Promise<void> {
    const names = [PLUGIN, GENERAL_PLUGIN, OPTIONED_PLUGIN];
    await sql(
      `DELETE FROM component WHERE plugin_version_id IN (SELECT v.id FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = ANY($1))`,
      [names],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name = ANY($1))`,
      [names],
    );
    await sql(`DELETE FROM plugin WHERE name = ANY($1)`, [names]);
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [COLLECTION_OWNER]);
    await sql(`DELETE FROM category WHERE slug IN ($1, $2, $3)`, [
      CATEGORY,
      OTHER_CATEGORY,
      CREATED_CATEGORY,
    ]);
  }

  beforeAll(cleanup);
  afterAll(async () => {
    await cleanup();
    await pool.end();
  });

  it('links the manifest categories, creating the ones that do not exist yet', async () => {
    await sql(`INSERT INTO category (id, slug, name) VALUES ($1, $2, 'Ingest Dev Tools')`, [
      randomUUID(),
      CATEGORY,
    ]);
    const sourceId = await addSource('single', '');
    fetched = {
      commitSha: '1'.repeat(40),
      tarball: tarball({
        'plugin.json': JSON.stringify({
          name: PLUGIN,
          version: '1.0.0',
          description: 'Categorised.',
          categories: ['Ingest Dev Tools', 'Nowhere Land', '!!!'],
        }),
        'rules/style.md': '---\ndescription: Style\n---\nUse tabs.',
      }),
    };
    await run(sourceId);

    const linked = await sql<{ slug: string }>(
      `SELECT c.slug FROM plugin_category pc JOIN category c ON c.id = pc.category_id JOIN plugin p ON p.id = pc.plugin_id WHERE p.name = $1`,
      [PLUGIN],
    );
    expect(linked.map((row) => row.slug).sort()).toEqual([CATEGORY, CREATED_CATEGORY].sort());
    const [created] = await sql<{ name: string }>(`SELECT name FROM category WHERE slug = $1`, [
      CREATED_CATEGORY,
    ]);
    expect(created?.name).toBe('Nowhere Land');
    const [version] = await sql<{ scan: { skipped: { path: string; reason: string }[] } }>(
      `SELECT v.scan FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
      [PLUGIN],
    );
    expect(version?.scan.skipped).toEqual([
      {
        path: 'manifest',
        reason: 'Category "!!!" cannot be used as a category name.',
      },
    ]);

    // A link an operator added survives a later sync whose manifest names no categories.
    await sql(`INSERT INTO category (id, slug, name) VALUES ($1, $2, 'Ingest Other')`, [
      randomUUID(),
      OTHER_CATEGORY,
    ]);
    await sql(
      `INSERT INTO plugin_category (plugin_id, category_id) SELECT p.id, c.id FROM plugin p, category c WHERE p.name = $1 AND c.slug = $2`,
      [PLUGIN, OTHER_CATEGORY],
    );
    fetched = {
      commitSha: '2'.repeat(40),
      tarball: tarball({
        'plugin.json': JSON.stringify({
          name: PLUGIN,
          version: '1.0.1',
          description: 'Categorised.',
        }),
      }),
    };
    await run(sourceId);
    const kept = await sql<{ slug: string }>(
      `SELECT c.slug FROM plugin_category pc JOIN category c ON c.id = pc.category_id JOIN plugin p ON p.id = pc.plugin_id WHERE p.name = $1 ORDER BY c.slug`,
      [PLUGIN],
    );
    expect(kept.map((row) => row.slug)).toEqual([CATEGORY, OTHER_CATEGORY, CREATED_CATEGORY]);
  });

  it('starts a plugin with the options chosen for its source and keeps later changes', async () => {
    const sourceId = randomUUID();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by, featured, verified, visibility)
       VALUES ($1, $2, 'optioned', 'main', '', 'test', true, true, 'private')`,
      [sourceId, COLLECTION_OWNER],
    );
    const files = (version: string) => ({
      'plugin.json': JSON.stringify({ name: OPTIONED_PLUGIN, version, description: 'Optioned.' }),
    });
    const shown = async () =>
      (
        await sql<{ featured: boolean; verified: boolean; visibility: string }>(
          `SELECT featured, verified, visibility FROM plugin WHERE name = $1`,
          [OPTIONED_PLUGIN],
        )
      )[0];
    fetched = { commitSha: '5'.repeat(40), tarball: tarball(files('1.0.0')) };
    await run(sourceId);
    expect(await shown()).toEqual({ featured: true, verified: true, visibility: 'private' });

    await sql(`UPDATE plugin SET featured = false, visibility = 'public' WHERE name = $1`, [
      OPTIONED_PLUGIN,
    ]);
    fetched = { commitSha: '6'.repeat(40), tarball: tarball(files('1.0.1')) };
    await run(sourceId);
    expect(await shown()).toEqual({ featured: false, verified: true, visibility: 'public' });
  });

  it('files a plugin that names no category under General and keeps it there', async () => {
    const sourceId = await addSource('uncategorised', '');
    const files = (version: string) => ({
      'plugin.json': JSON.stringify({
        name: GENERAL_PLUGIN,
        version,
        description: 'Uncategorised.',
      }),
    });
    const slugs = async () =>
      (
        await sql<{ slug: string }>(
          `SELECT c.slug FROM plugin_category pc JOIN category c ON c.id = pc.category_id JOIN plugin p ON p.id = pc.plugin_id WHERE p.name = $1 ORDER BY c.slug`,
          [GENERAL_PLUGIN],
        )
      ).map((row) => row.slug);

    fetched = { commitSha: '3'.repeat(40), tarball: tarball(files('1.0.0')) };
    await run(sourceId);
    expect(await slugs()).toEqual(['general']);

    // A later sync does not add a second link.
    fetched = { commitSha: '4'.repeat(40), tarball: tarball(files('1.0.1')) };
    await run(sourceId);
    expect(await slugs()).toEqual(['general']);
  });

  it('turns a marketplace manifest into a source per plugin folder', async () => {
    const parent = await addSource('collection', '');
    fetched = {
      commitSha: '3'.repeat(40),
      tarball: tarball({
        '.cursor-plugin/marketplace.json': JSON.stringify({
          plugins: [
            { name: 'one', source: './plugins/one' },
            { name: 'two', source: './plugins/two' },
            { name: 'empty', source: './plugins/empty' },
            { name: 'remote', source: { source: 'github', repo: 'a/b' } },
          ],
        }),
        'plugins/one/plugin.json': JSON.stringify({ name: 'collection-one', version: '1.0.0' }),
        'plugins/two/plugin.json': JSON.stringify({ name: 'collection-two', version: '1.0.0' }),
      }),
    };
    await run(parent);

    const [state] = await sql<{ last_status: string; last_note: string | null }>(
      `SELECT last_status, last_note FROM plugin_source WHERE id = $1`,
      [parent],
    );
    expect(state?.last_status).toBe('succeeded');
    expect(state?.last_note).toContain(
      'Found 2 plugins: 2 new sources added and syncing, 0 already known.',
    );
    expect(state?.last_note).toContain('plugins/empty: no plugin manifest in this folder');
    expect(state?.last_note).toContain('remote: only plugins inside this repository are supported');

    const children = await sql<{ id: string; path: string; created_by: string }>(
      `SELECT id, path, created_by FROM plugin_source WHERE owner = $1 AND repository = 'collection' AND path <> '' ORDER BY path`,
      [COLLECTION_OWNER],
    );
    expect(children.map((row) => row.path)).toEqual(['plugins/one', 'plugins/two']);
    expect(children[0]?.created_by).toBe(`discovery:${COLLECTION_OWNER}/collection`);
    for (const child of children) {
      const queued = await sql<{ n: string }>(
        `SELECT count(*)::text AS n FROM plugin_ingestion WHERE source_id = $1`,
        [child.id],
      );
      expect(queued[0]?.n).toBe('1');
    }

    // Syncing the parent again adds nothing new.
    await sql(`UPDATE plugin_source SET last_status = 'succeeded' WHERE id = $1`, [parent]);
    await run(parent);
    const [again] = await sql<{ last_note: string | null }>(
      `SELECT last_note FROM plugin_source WHERE id = $1`,
      [parent],
    );
    expect(again?.last_note).toContain('0 new sources added and syncing, 2 already known.');
    const count = await sql<{ n: string }>(
      `SELECT count(*)::text AS n FROM plugin_source WHERE owner = $1 AND repository = 'collection'`,
      [COLLECTION_OWNER],
    );
    expect(count[0]?.n).toBe('3');
  });

  it('does not expand a source that was itself found inside a repository', async () => {
    const found = await addSource('nested', 'plugins', `discovery:${COLLECTION_OWNER}/nested`);
    fetched = {
      commitSha: '4'.repeat(40),
      tarball: tarball({
        'plugins/marketplace.json': JSON.stringify({
          plugins: [{ name: 'x', source: './x' }],
        }),
        'plugins/x/plugin.json': JSON.stringify({ name: 'nested-x', version: '1.0.0' }),
      }),
    };
    await run(found);
    const [state] = await sql<{ last_status: string; last_error: string | null }>(
      `SELECT last_status, last_error FROM plugin_source WHERE id = $1`,
      [found],
    );
    expect(state).toEqual({
      last_status: 'failed',
      last_error: 'This folder lists other plugins. Add each plugin folder directly.',
    });
  });
});
