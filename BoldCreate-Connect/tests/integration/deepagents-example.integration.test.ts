/**
 * The external-agent example, run for real: one user-scoped API key, the Python and Node.js sync helpers of
 * `examples/deepagents` against the live gateway, and the same key listing tools on `/mcp`.
 *
 * The Node.js helper runs with the current Node; the Python one needs Python 3 on the machine (`python3`, `python` or `py`).
 * Run: pnpm test -- --only=integration
 */
import { spawn, spawnSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { packTarGz } from '../../packages/domain/src/ingestion/tar.js';
import { callApi } from './org-fixture.js';
import { createSignedInUser, sql, type SignedInUser } from './signed-in-user.js';
import { gatewayUrl, requireEnv } from './test-env.js';

const EXAMPLES = resolve(import.meta.dirname, '..', '..', 'examples', 'deepagents');
const RUNNERS = [
  { label: 'Python', script: join(EXAMPLES, 'python', 'boldcreate_integrations_sync.py') },
  { label: 'Node.js', script: join(EXAMPLES, 'nodejs', 'boldcreate-integrations-sync.mjs') },
] as const;
let SCRIPT: string = RUNNERS[0].script;
const SKILL = `# Review\n\nUse when reviewing ${randomUUID()}.\n`;

function findPython(): string[] {
  for (const candidate of ['python3', 'python', 'py']) {
    const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
    if (probe.status === 0 && /^Python 3/.test(probe.stdout || probe.stderr)) return [candidate];
  }
  throw new Error('Python 3 was not found; the deepagents example test needs it');
}

function command(script: string): string[] {
  if (script.endsWith('.mjs')) return [process.execPath, script];
  const [python] = findPython() as [string];
  return [python, '-I', script];
}

interface Run {
  code: number | null;
  out: string;
  err: string;
}

function runSync(folder: string, key: string, extra: string[] = []): Promise<Run> {
  const [program, ...lead] = command(SCRIPT) as [string, ...string[]];
  return new Promise((done) => {
    const child = spawn(program, [...lead, '--url', gatewayUrl, '--dir', folder, ...extra], {
      env: { ...process.env, BOLDCREATE_INTEGRATIONS_API_KEY: key },
    });
    let out = '';
    let err = '';
    child.stdout.on('data', (chunk: Buffer) => (out += chunk.toString()));
    child.stderr.on('data', (chunk: Buffer) => (err += chunk.toString()));
    child.on('close', (code) => done({ code, out, err }));
  });
}

async function createKey(user: SignedInUser, permissions: string[]): Promise<string> {
  const res = await callApi('POST', `/v1/orgs/${user.orgId}/api-keys`, user, {
    name: `Example ${randomUUID().slice(0, 8)}`,
    permissions,
  });
  expect(res.status).toBe(201);
  return ((await res.json()) as { rawKey: string }).rawKey;
}

let user: SignedInUser;
let key = '';
let folder = '';
let versionId = '';
let pluginName = '';

beforeAll(async () => {
  user = await createSignedInUser('deepagents-example');

  const archive = packTarGz(
    new Map([
      ['skills/review/SKILL.md', Buffer.from(SKILL)],
      ['README.md', Buffer.from('fixture plugin')],
    ]),
  );
  const sha = createHash('sha256').update(archive).digest('hex');
  const blob = createS3Blob({
    region: 'us-east-1',
    bucket: requireEnv('TEST_S3_BUCKET'),
    endpoint: requireEnv('TEST_S3_ENDPOINT'),
    forcePathStyle: true,
    credentials: {
      accessKeyId: requireEnv('TEST_S3_ACCESS_KEY_ID'),
      secretAccessKey: requireEnv('TEST_S3_SECRET_ACCESS_KEY'),
    },
  });
  await blob.put(sha, archive, { sizeBytes: archive.byteLength });

  const pluginId = randomUUID();
  versionId = randomUUID();
  pluginName = `example-${pluginId.slice(0, 8)}`;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Example', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, pluginName],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5)`,
    [versionId, pluginId, `sha256-example-${versionId}`, sha, archive.byteLength],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, 'skill', 'review', 'a skill', '{}', $3, $4)`,
    [randomUUID(), versionId, sha, archive.byteLength],
  );
  const installed = await callApi('POST', `/v1/orgs/${user.orgId}/installations`, user, {
    pluginVersionId: `pv_${versionId.replaceAll('-', '')}`,
  });
  if (installed.status !== 201) throw new Error(`install answered ${installed.status}`);

  key = await createKey(user, ['mcp:list', 'mcp:call', 'artifact:sync', 'artifact:download']);
});

describe.each(RUNNERS)('the $label deepagents example against the live gateway', ({ script }) => {
  beforeAll(() => {
    SCRIPT = script;
    folder = mkdtempSync(join(tmpdir(), 'bc-example-'));
  });
  afterAll(() => {
    rmSync(folder, { recursive: true, force: true });
  });

  it('places the plugin files with one user-scoped key', async () => {
    const run = await runSync(folder, key, ['--target', 'deepagents', '--kinds', 'skill,rule']);
    expect(run.err).toBe('');
    expect(run.code).toBe(0);
    expect(run.out).toContain('1 updated');
    expect(readFileSync(join(folder, pluginName, 'skills', 'review', 'SKILL.md'), 'utf8')).toBe(
      SKILL,
    );
  });

  it('answers 304 on the next run and leaves the files alone', async () => {
    const run = await runSync(folder, key, ['--target', 'deepagents', '--kinds', 'skill,rule']);
    expect(run.code).toBe(0);
    expect(run.out).toContain('unchanged');
  });

  it('reports what it placed when asked', async () => {
    const fresh = mkdtempSync(join(tmpdir(), 'bc-example-report-'));
    try {
      const run = await runSync(fresh, key, ['--target', 'deepagents', '--report']);
      expect(run.code).toBe(0);
      const rows = await sql<{ n: string }>(
        `SELECT count(*) AS n FROM audit_log WHERE org_id = $1 AND action = 'sync.reported'`,
        [user.rawOrgId],
      );
      expect(Number(rows[0]?.n)).toBeGreaterThan(0);
    } finally {
      rmSync(fresh, { recursive: true, force: true });
    }
  });

  it('warns about a withdrawn version that is still installed and keeps it', async () => {
    await sql(`UPDATE plugin_version SET status = 'yanked' WHERE id = $1`, [versionId]);
    const fresh = mkdtempSync(join(tmpdir(), 'bc-example-yanked-'));
    try {
      const run = await runSync(fresh, key);
      expect(run.code).toBe(0);
      expect(run.err).toContain('withdrawn');
      expect(existsSync(join(fresh, pluginName, 'skills', 'review', 'SKILL.md'))).toBe(true);
    } finally {
      await sql(`UPDATE plugin_version SET status = 'published' WHERE id = $1`, [versionId]);
      rmSync(fresh, { recursive: true, force: true });
    }
  });

  it('lists tools on /mcp with the same key', async () => {
    const res = await fetch(`${gatewayUrl}/mcp`, {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { result?: { tools: unknown[] } };
    expect(Array.isArray(body.result?.tools)).toBe(true);
  });

  it('stops at once with a plain message when the key lacks the permission', async () => {
    const narrow = await createKey(user, ['mcp:list']);
    const fresh = mkdtempSync(join(tmpdir(), 'bc-example-narrow-'));
    try {
      const run = await runSync(fresh, narrow);
      expect(run.code).toBe(1);
      expect(run.err).toContain('403');
      expect(run.err).not.toContain(narrow);
      expect(readdirSync(fresh)).toEqual([]);
    } finally {
      rmSync(fresh, { recursive: true, force: true });
    }
  });

  it('stops with a plain message when the key is revoked, without printing it', async () => {
    const doomed = await createKey(user, ['artifact:sync', 'artifact:download']);
    await sql(`UPDATE api_key SET revoked_at = now() WHERE key_id = $1`, [doomed.split('.')[0]]);
    const fresh = mkdtempSync(join(tmpdir(), 'bc-example-revoked-'));
    try {
      const run = await runSync(fresh, doomed);
      expect(run.code).toBe(1);
      expect(run.err).toContain('401');
      expect(run.out + run.err).not.toContain(doomed.split('.')[1] as string);
    } finally {
      rmSync(fresh, { recursive: true, force: true });
    }
  });
});
