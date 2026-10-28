/**
 * Deleting a plugin against the real database: the admin role removes the rows and queues the
 * removal of the archive in the same transaction; the worker role removes the archive unless a
 * version still points at it. Ingestion keeps the header templates of an MCP server so the gateway
 * can fill in the variables, and drops a credential written into the plugin.
 */
import { randomUUID } from 'node:crypto';
import { Readable } from 'node:stream';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { sql } from './signed-in-user.js';
import { createDb } from '../../packages/db/src/index.js';
import {
  deletePlugin,
  packTarGz,
  parseArchivePurgePayload,
  purgeArchives,
  runIngestion,
  type FetchedArchive,
  type IngestionDeps,
} from '../../packages/domain/src/index.js';
import type { BlobPort } from '../../packages/ports/src/index.js';
import { roleConnectionString } from './test-env.js';

const OWNER = 'delete-owner';
const NAME = 'delete-sample';
const TOKEN = 'ghp_' + 'z'.repeat(36);

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

const files = (version: string): Record<string, string> => ({
  'plugin.json': JSON.stringify({
    name: NAME,
    version,
    variables: {
      type: 'object',
      properties: { GITHUB_PERSONAL_ACCESS_TOKEN: { type: 'string', title: 'Token' } },
      required: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
    },
  }),
  'mcp.json': JSON.stringify({
    mcpServers: {
      github: {
        type: 'http',
        url: 'https://api.githubcopilot.com/mcp/',
        headers: {
          Authorization: 'Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}',
          'X-Api-Key': TOKEN,
        },
      },
    },
  }),
});

describe('deleting a plugin', () => {
  const worker = createDb({ connectionString: roleConnectionString('worker'), max: 2 });
  const admin = createDb({ connectionString: roleConnectionString('admin'), max: 2 });
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
    await sql(`DELETE FROM outbox WHERE event_type = 'plugin_archive.purge_requested'`);
  }

  async function ingest(version: string, commit: string): Promise<void> {
    fetched = { commitSha: commit.repeat(40), tarball: tarball(files(version)) };
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_ingestion (id, source_id, requested_by) VALUES ($1, $2, 'test')`,
      [id, sourceId],
    );
    await runIngestion(deps, id);
  }

  const pluginId = async () =>
    (await sql<{ id: string }>(`SELECT id FROM plugin WHERE name = $1`, [NAME]))[0]!.id;
  const archives = async () =>
    (
      await sql<{ archive_sha256: string }>(
        `SELECT v.archive_sha256 FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
        [NAME],
      )
    ).map((row) => row.archive_sha256);
  // The live worker may already have handled the job and erased its payload; that is `null` here.
  const purgeJobs = async (): Promise<(string[] | null)[]> =>
    (
      await sql<{ payload: string | null }>(
        `SELECT payload FROM outbox WHERE event_type = 'plugin_archive.purge_requested'`,
      )
    ).map((row) =>
      row.payload === null ? null : parseArchivePurgePayload(JSON.parse(row.payload)),
    );

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
    await admin.pool.end();
  });

  it('keeps the header templates of an MCP server and drops a credential written into the plugin', async () => {
    await ingest('1.0.0', 'a');
    const [component] = await sql<{ metadata: Record<string, unknown> }>(
      `SELECT c.metadata FROM component c JOIN plugin_version v ON v.id = c.plugin_version_id JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1 AND c.kind = 'mcp'`,
      [NAME],
    );
    expect(component!.metadata).toMatchObject({
      headerNames: ['Authorization', 'X-Api-Key'],
      headers: { Authorization: 'Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}' },
    });
    expect(JSON.stringify(component!.metadata)).not.toContain(TOKEN);
    const [version] = await sql<{ scan: { variables: { name: string; required: boolean }[] } }>(
      `SELECT v.scan FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1`,
      [NAME],
    );
    expect(version!.scan.variables).toMatchObject([
      { name: 'GITHUB_PERSONAL_ACCESS_TOKEN', required: true },
    ]);
  });

  it('removes the rows and queues the archive in one step, and the worker then removes it', async () => {
    const [archive] = await archives();
    expect(blob.keys()).toContain(archive);
    const componentArchives = (
      await sql<{ archive_sha256: string }>(
        `SELECT c.archive_sha256 FROM component c JOIN plugin_version v ON v.id = c.plugin_version_id
         JOIN plugin p ON p.id = v.plugin_id WHERE p.name = $1 AND c.archive_sha256 IS NOT NULL`,
        [NAME],
      )
    ).map((row) => row.archive_sha256);
    await sql(`DELETE FROM outbox WHERE event_type = 'plugin_archive.purge_requested'`);

    await deletePlugin(admin.db, await pluginId(), { subject: 'admin@example.test' });

    expect(await sql(`SELECT id FROM plugin WHERE name = $1`, [NAME])).toEqual([]);
    expect(await archives()).toEqual([]);
    const jobs = await purgeJobs();
    expect(jobs).toHaveLength(1);
    const wanted = [...new Set([archive!, ...componentArchives])].sort();
    expect([...(jobs[0] ?? wanted)].sort()).toEqual(wanted);
    // The admin step only recorded it; the archives are still there until the worker runs.
    for (const sha of wanted) expect(blob.keys()).toContain(sha);

    const result = await purgeArchives(worker.db, blob, wanted);
    expect([...result.removed].sort()).toEqual(wanted);
    expect(result.kept).toEqual([]);
    for (const sha of wanted) expect(blob.keys()).not.toContain(sha);

    // Running the same job again is harmless.
    const again = await purgeArchives(worker.db, blob, wanted);
    expect([...again.removed].sort()).toEqual(wanted);
    expect(again.kept).toEqual([]);
  });

  it('keeps an archive that a version still points at', async () => {
    await sql(`DELETE FROM outbox WHERE event_type = 'plugin_archive.purge_requested'`);
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by) VALUES ($1, $2, 'repo', 'main', '', 'test')`,
      [sourceId, OWNER],
    );
    await ingest('1.0.0', 'b');
    const [archive] = await archives();
    const result = await purgeArchives(worker.db, blob, [archive!]);
    expect(result).toEqual({ removed: [], kept: [archive] });
    expect(blob.keys()).toContain(archive);
  });
});
