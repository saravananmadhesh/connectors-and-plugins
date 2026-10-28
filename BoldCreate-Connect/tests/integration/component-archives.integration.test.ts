/**
 * Ingesting a plugin that holds every kind of component against the real database: each file
 * component gets its own archive, a second identical ingest changes no hash and adds no blob, and a
 * change to one skill moves only that skill's hash.
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

const OWNER = 'component-archive-owner';
const NAME = 'component-archive-sample';

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

const tarball = (entries: Record<string, string>): Buffer =>
  packTarGz(
    new Map(Object.entries(entries).map(([path, body]) => [`repo-1/${path}`, Buffer.from(body)])),
  );

const files = (version: string, reviewBody = 'review'): Record<string, string> => ({
  'plugin.json': JSON.stringify({ name: NAME, version }),
  'skills/review/SKILL.md': `---\nname: review\ndescription: Review\n---\n${reviewBody}`,
  'skills/review/notes.md': 'notes',
  'skills/deploy/SKILL.md': '---\nname: deploy\ndescription: Deploy\n---\ndeploy',
  'rules/style.mdc': '---\ndescription: Style\nalwaysApply: true\n---\nbody',
  'agents/helper.md': '---\nname: helper\ndescription: Helper\n---\nhelp',
  'hooks/hooks.json': JSON.stringify({ hooks: { stop: [{ command: 'echo done' }] } }),
  'mcp.json': JSON.stringify({
    mcpServers: { docs: { type: 'http', url: 'https://docs.example/mcp' } },
  }),
});

describe('component archives at ingest', () => {
  const worker = createDb({ connectionString: roleConnectionString('worker'), max: 2 });
  const blob = memoryBlob();
  const sourceId = randomUUID();
  let fetched: FetchedArchive;
  const deps: IngestionDeps = {
    db: worker.db,
    blob,
    allowedOwners: [OWNER],
    fetchArchive: async () => fetched,
  };

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

  async function ingest(commit: string, entries: Record<string, string>): Promise<void> {
    fetched = { commitSha: commit.repeat(40), tarball: tarball(entries) };
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_ingestion (id, source_id, requested_by) VALUES ($1, $2, 'test')`,
      [id, sourceId],
    );
    await runIngestion(deps, id);
  }

  const hashes = async (): Promise<Record<string, string | null>> =>
    Object.fromEntries(
      (
        await sql<{ key: string; sha: string | null }>(
          `SELECT c.kind || ':' || c.name AS key, c.archive_sha256 AS sha
           FROM component c JOIN plugin_version v ON v.id = c.plugin_version_id
           JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1 ORDER BY 1`,
          [NAME],
        )
      ).map((row) => [row.key, row.sha]),
    );
  const versionCount = async (): Promise<number> =>
    (
      await sql<{ n: string }>(
        `SELECT count(*) AS n FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
        [NAME],
      )
    ).map((row) => Number(row.n))[0]!;

  beforeAll(async () => {
    await cleanup();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by) VALUES ($1, $2, 'repo', 'main', '', 'test')`,
      [sourceId, OWNER],
    );
  });
  afterAll(async () => {
    await cleanup();
    await worker.pool.end();
  });

  it('gives every file component an archive in the store and the server none', async () => {
    await ingest('a', files('1.0.0'));
    const stored = await hashes();
    expect(Object.keys(stored).sort()).toEqual([
      'agent:helper',
      'hook:stop',
      'mcp:docs',
      'rule:style',
      'skill:deploy',
      'skill:review',
    ]);
    expect(stored['mcp:docs']).toBeNull();
    for (const [key, sha] of Object.entries(stored)) {
      if (key.startsWith('mcp:')) continue;
      expect(sha).toMatch(/^[0-9a-f]{64}$/);
      expect(blob.keys()).toContain(sha);
    }
  });

  it('changes nothing when the same files are ingested again', async () => {
    const before = await hashes();
    const blobs = blob.keys().sort();
    const versions = await versionCount();
    await ingest('b', files('1.0.0'));
    expect(await hashes()).toEqual(before);
    expect(blob.keys().sort()).toEqual(blobs);
    expect(await versionCount()).toBe(versions);
  });

  it('moves only the hash of the skill whose files changed', async () => {
    const before = await hashes();
    await ingest('c', files('1.0.1', 'review again'));
    const after = await hashes();
    expect(after['skill:review']).not.toBe(before['skill:review']);
    for (const key of ['skill:deploy', 'rule:style', 'agent:helper', 'hook:stop']) {
      expect(after[key]).toBe(before[key]);
    }
  });
});
