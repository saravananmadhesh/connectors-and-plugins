/**
 * What a host does with the client package against the running stack: it adds a plugin with a
 * project key, makes a session for one of its users, reads the servers an agent can use, puts the
 * plugin files in a folder, keeps them current, and reads its own logs and users.
 *
 * Run: pnpm test "--only=integration"
 */
import { createHash, randomUUID } from 'node:crypto';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  ConnectClient,
  ConnectAuthError,
  ConnectNotFoundError,
} from '../../packages/sdk/src/index.js';
import { syncPlugins } from '../../packages/sdk/src/sync.js';
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { packTarGz } from '../../packages/domain/src/index.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { apiUrl, requireEnv } from './test-env.js';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';

const DAY = 86_400_000;
const SCOPES = [
  'plugins:read',
  'plugins:write',
  'sessions:read',
  'sessions:write',
  'tools:read',
  'observability:read',
];
const SKILL_BODY = `---\nname: review\ndescription: Review\n---\nbody-${randomUUID()}`;

let fx: OrgFixture;
let hostKey = '';
let pluginId = '';
let pluginRaw = '';
let folder = '';

const skillArchive = packTarGz(new Map([['SKILL.md', Buffer.from(SKILL_BODY)]]));
const skillSha = createHash('sha256').update(skillArchive).digest('hex');

beforeAll(async () => {
  fx = await createOrgFixture('sdk-host-flow');
  const base = `/v1/orgs/${fx.orgId}/projects`;
  const created = await callApi('POST', base, fx.users.admin, {
    name: `Host ${randomUUID().slice(0, 8)}`,
  });
  if (created.status !== 201) throw new Error(`project: ${created.status}`);
  const projectId = ((await created.json()) as { id: string }).id;
  const key = await callApi('POST', `${base}/${projectId}/keys`, fx.users.admin, {
    scopes: SCOPES,
    expiresAt: new Date(Date.now() + 30 * DAY).toISOString(),
  });
  if (key.status !== 201) throw new Error(`key: ${key.status}`);
  hostKey = ((await key.json()) as { rawKey: string }).rawKey;

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
  await blob.put(skillSha, skillArchive, { sizeBytes: skillArchive.byteLength });

  pluginRaw = randomUUID();
  const versionRaw = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Host Flow', 'fixture', 'fixture', 'active', 'public')`,
    [pluginRaw, `host-flow-${pluginRaw.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5)`,
    [versionRaw, pluginRaw, `sha256-host-flow-${versionRaw}`, skillSha, skillArchive.byteLength],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata,
       archive_sha256, archive_size_bytes)
     VALUES ($1, $2, 'skill', 'review', 'a skill', '{}', $3, $4),
            ($5, $2, 'mcp', 'tool', 'a server', $6, NULL, NULL)`,
    [
      randomUUID(),
      versionRaw,
      skillSha,
      skillArchive.byteLength,
      randomUUID(),
      JSON.stringify({ transport: 'http', url: 'http://localhost:19999/mcp' }),
    ],
  );
  pluginId = formatId('plg', pluginRaw);
  folder = await mkdtemp(join(tmpdir(), 'sdk-host-flow-'));
}, 120_000);

afterAll(async () => {
  if (folder) await rm(folder, { recursive: true, force: true });
});

// The test API expects the caller identity a host's proxy would add.
const { 'Content-Type': _type, ...identity } = workloadHeaders;
const viaProxy: typeof fetch = (input, init) =>
  fetch(input, { ...init, headers: { ...identity, ...(init?.headers as Record<string, string>) } });

const connect = () => new ConnectClient({ apiKey: hostKey, baseUrl: apiUrl, fetch: viaProxy });

describe('a host using the client package', () => {
  it('adds a plugin and lists it back', async () => {
    const added = await connect().plugins.add(pluginId);
    expect(added.pluginId).toBe(pluginId);
    const listed = await connect().plugins.list();
    expect(listed.map((item) => item.pluginId)).toContain(pluginId);
  });

  it('makes a session for a user, and the user shows in the project', async () => {
    const userId = `host-user-${randomUUID().slice(0, 8)}`;
    const session = await connect().create(userId);
    expect(session.userId).toBe(userId);
    expect(session.token.startsWith('stk_')).toBe(true);

    const users = await connect().users.list({ userId });
    expect(users.items.map((item) => item.userId)).toContain(userId);
  });

  it('lists the servers of the plugin with the session token in their headers', async () => {
    const session = await connect().create(`host-user-${randomUUID().slice(0, 8)}`);
    const servers = await session.mcp();
    expect(servers.length).toBeGreaterThan(0);
    for (const server of servers) {
      expect(server.headers['Authorization']).toBe(`Bearer ${session.token}`);
    }
  });

  it('puts the plugin files in a folder, checks them, and changes nothing on a second run', async () => {
    const session = await connect().create(`host-user-${randomUUID().slice(0, 8)}`);
    const first = await syncPlugins(session, { dir: folder });
    expect(first.added.length).toBeGreaterThan(0);
    expect(first.stale).toBe(false);

    const files = await readdir(folder, { recursive: true });
    const skill = files.find((name) => name.endsWith('SKILL.md'));
    expect(skill).toBeDefined();
    expect(await readFile(join(folder, skill as string), 'utf8')).toBe(SKILL_BODY);

    const second = await syncPlugins(session, { dir: folder });
    expect(second.added).toHaveLength(0);
    expect(second.updated).toHaveLength(0);
    expect(second.unchanged.length).toBe(first.added.length);
  });

  it('shows the host what happened in its own logs', async () => {
    const logs = await connect().logs.list({ limit: 20 });
    expect(logs.items.length).toBeGreaterThan(0);
  });

  it('refuses a made-up key with an auth error and an unknown plugin with a not-found error', async () => {
    const wrong = new ConnectClient({
      apiKey: `prk_${'0'.repeat(16)}.${'a'.repeat(32)}`,
      baseUrl: apiUrl,
      fetch: viaProxy,
    });
    await expect(wrong.plugins.list()).rejects.toBeInstanceOf(ConnectAuthError);
    await expect(connect().plugins.add(formatId('plg', randomUUID()))).rejects.toBeInstanceOf(
      ConnectNotFoundError,
    );
  });

  it('ends a session at once when the host deletes it', async () => {
    const session = await connect().create(`host-user-${randomUUID().slice(0, 8)}`);
    await connect().sessions.delete(session.id);
    await expect(session.mcp()).rejects.toBeInstanceOf(ConnectAuthError);
  });
});
