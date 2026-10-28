/**
 * One user-scoped API key drives everything an external agent needs: the tools of an installed
 * MCP server through the gateway, and the plugin files through sync and archive download. This
 * is the flow a cloud agent, a CLI or an IDE follows.
 *
 * Run: pnpm test -- --only=integration
 */
import { createHash, randomUUID } from 'node:crypto';
import { createServer, type Server } from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createS3Blob } from '../../packages/adapters/src/s3/blob.js';
import { callApi } from './org-fixture.js';
import { createSignedInUser, sql, type SignedInUser } from './signed-in-user.js';
import { FIXTURE_PORT, listenOnFixturePort } from './support/fixture-port.js';
import { gatewayUrl, requireEnv } from './test-env.js';

const UPSTREAM_SECRET = `upstream-${randomUUID()}`;
const SERVER_NAME = 'fixture-echo';

const ARCHIVE = new TextEncoder().encode(`archive-${randomUUID()}-${'x'.repeat(2048)}`);
const ARCHIVE_SHA = createHash('sha256').update(ARCHIVE).digest('hex');

const SKILL_ARCHIVE = new TextEncoder().encode(`skill-${randomUUID()}-${'y'.repeat(512)}`);
const SKILL_SHA = createHash('sha256').update(SKILL_ARCHIVE).digest('hex');

interface JsonRpc {
  id?: number | string;
  method: string;
  params?: { name?: string; arguments?: { text?: string } };
}

/** A minimal MCP server over HTTP that wants the shared key and echoes its one tool. */
function startUpstream(): Promise<Server> {
  const server = createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      if (req.headers.authorization !== `Bearer ${UPSTREAM_SECRET}`) {
        res.writeHead(401).end();
        return;
      }
      const message = JSON.parse(Buffer.concat(chunks).toString('utf8')) as JsonRpc;
      const reply = (result: unknown) => {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ jsonrpc: '2.0', id: message.id, result }));
      };
      if (message.method === 'initialize') {
        reply({
          protocolVersion: '2025-06-18',
          capabilities: { tools: {} },
          serverInfo: { name: 'fixture', version: '1' },
        });
      } else if (message.method === 'tools/list') {
        reply({
          tools: [
            {
              name: 'echo',
              description: 'Echoes the text back',
              inputSchema: { type: 'object', properties: { text: { type: 'string' } } },
            },
          ],
        });
      } else if (message.method === 'tools/call') {
        reply({
          content: [{ type: 'text', text: `echo:${message.params?.arguments?.text ?? ''}` }],
        });
      } else {
        res.writeHead(202).end();
      }
    });
  });
  return listenOnFixturePort(server);
}

function must(res: Response, status: number, what: string): Response {
  if (res.status !== status) throw new Error(`${what} answered ${res.status}`);
  return res;
}

const rpc = (method: string, params?: unknown) => ({ jsonrpc: '2.0', id: 1, method, params });

function gateway(path: string, key: string | null, init: RequestInit = {}) {
  return fetch(`${gatewayUrl}${path}`, {
    ...init,
    headers: {
      ...(key ? { authorization: `Bearer ${key}` } : {}),
      ...(init.body ? { 'content-type': 'application/json' } : {}),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
}

async function createKey(user: SignedInUser, permissions: string[]): Promise<string> {
  const res = await callApi('POST', `/v1/orgs/${user.orgId}/api-keys`, user, {
    name: `Journey ${randomUUID().slice(0, 8)}`,
    permissions,
  });
  must(res, 201, 'create key');
  return ((await res.json()) as { rawKey: string }).rawKey;
}

let upstream: Server;
let user: SignedInUser;
let installationId = '';
let mcpComponentId = '';
let versionWire = '';
let fullKey = '';

beforeAll(async () => {
  upstream = await startUpstream();
  user = await createSignedInUser('delivery-journey');

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
  await blob.put(ARCHIVE_SHA, ARCHIVE, { sizeBytes: ARCHIVE.byteLength });
  await blob.put(SKILL_SHA, SKILL_ARCHIVE, { sizeBytes: SKILL_ARCHIVE.byteLength });

  const pluginId = randomUUID();
  const versionId = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Delivery Journey', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, `delivery-journey-${pluginId.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, archive_sha256, archive_size_bytes)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4, $5)`,
    [versionId, pluginId, `sha256-journey-${versionId}`, ARCHIVE_SHA, ARCHIVE.byteLength],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata,
       archive_sha256, archive_size_bytes)
     VALUES ($1, $2, 'mcp', $3, 'echo server', $4, NULL, NULL),
            ($5, $2, 'skill', 'journey-skill', 'a skill', '{}', $6, $7)`,
    [
      randomUUID(),
      versionId,
      SERVER_NAME,
      JSON.stringify({ transport: 'http', url: `http://127.0.0.1:${FIXTURE_PORT}/mcp` }),
      randomUUID(),
      SKILL_SHA,
      SKILL_ARCHIVE.byteLength,
    ],
  );
  versionWire = `pv_${versionId.replaceAll('-', '')}`;

  const installed = await callApi('POST', `/v1/orgs/${user.orgId}/installations`, user, {
    pluginVersionId: versionWire,
  });
  must(installed, 201, 'install');
  installationId = ((await installed.json()) as { id: string }).id;

  const components = await callApi(
    'GET',
    `/v1/orgs/${user.orgId}/installations/${installationId}/components`,
    user,
  );
  const list = (await components.json()) as { items: { componentId: string; kind: string }[] };
  mcpComponentId = list.items.find((item) => item.kind === 'mcp')?.componentId as string;

  const auth = await callApi(
    'PUT',
    `/v1/orgs/${user.orgId}/installations/${installationId}/mcp-servers/${mcpComponentId}/auth`,
    user,
    { authType: 'api_key', apiKey: UPSTREAM_SECRET },
  );
  must(auth, 200, 'put auth');
  const probe = await callApi(
    'POST',
    `/v1/orgs/${user.orgId}/installations/${installationId}/mcp-servers/${mcpComponentId}/test`,
    user,
  );
  must(probe, 200, 'probe');
  const probed = (await probe.json()) as { health: string; toolCount: number };
  if (probed.health !== 'healthy' || probed.toolCount !== 1) {
    throw new Error(`fixture server not healthy: ${JSON.stringify(probed)}`);
  }

  fullKey = await createKey(user, ['mcp:list', 'mcp:call', 'artifact:sync', 'artifact:download']);
}, 120_000);

afterAll(async () => {
  await new Promise<void>((resolve) => upstream?.close(() => resolve()));
});

describe('tools through the gateway', () => {
  it('lists the installed server tools under {server}__{tool}', async () => {
    const res = await gateway('/mcp', fullKey, {
      method: 'POST',
      body: JSON.stringify(rpc('tools/list')),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { result: { tools: { name: string }[] } };
    expect(body.result.tools.map((tool) => tool.name)).toContain(`${SERVER_NAME}__echo`);
  });

  it('calls the tool and returns what the upstream answered', async () => {
    const res = await gateway('/mcp', fullKey, {
      method: 'POST',
      body: JSON.stringify(
        rpc('tools/call', { name: `${SERVER_NAME}__echo`, arguments: { text: 'hi' } }),
      ),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { result: { content: { text: string }[] } };
    expect(body.result.content[0]?.text).toBe('echo:hi');
  });

  it('answers 401 without a key and for a made-up one', async () => {
    const none = await gateway('/mcp', null, {
      method: 'POST',
      body: JSON.stringify(rpc('tools/list')),
    });
    expect(none.status).toBe(401);
    const wrong = await gateway('/mcp', 'fyk_0000000000000000.not-a-real-secret-value-000000', {
      method: 'POST',
      body: JSON.stringify(rpc('tools/list')),
    });
    expect(wrong.status).toBe(401);
  });

  it('refuses a call when the key has no call permission', async () => {
    const listOnly = await createKey(user, ['mcp:list']);
    const res = await gateway('/mcp', listOnly, {
      method: 'POST',
      body: JSON.stringify(rpc('tools/call', { name: `${SERVER_NAME}__echo`, arguments: {} })),
    });
    const body = (await res.json()) as { error?: { code: number } };
    expect(body.error).toBeDefined();
  });

  it('lists nothing for another member and hides the server from their key', async () => {
    const other = await createSignedInUser('delivery-journey-other');
    const otherKey = await createKey(other, ['mcp:list', 'mcp:call']);
    const res = await gateway('/mcp', otherKey, {
      method: 'POST',
      body: JSON.stringify(rpc('tools/list')),
    });
    const body = (await res.json()) as { result: { tools: unknown[] } };
    expect(body.result.tools).toEqual([]);
  });
});

describe('sync and archive download', () => {
  it('lists the installed plugin with a download link and its components', async () => {
    const res = await gateway('/v1/sync', fullKey);
    expect(res.status).toBe(200);
    const etag = res.headers.get('etag');
    expect(etag).toBeTruthy();
    const body = (await res.json()) as {
      entries: {
        versionId: string;
        sha256: string;
        sizeBytes: number;
        href: string;
        components: { kind: string; sha256: string; path: string }[];
        mcp: { serverName: string; url: string; ready: boolean }[];
      }[];
    };
    const entry = body.entries.find((item) => item.versionId === versionWire);
    expect(entry).toMatchObject({ sha256: ARCHIVE_SHA, sizeBytes: ARCHIVE.byteLength });
    expect(entry?.components).toMatchObject([
      { kind: 'skill', sha256: SKILL_SHA, path: 'skills/journey-skill' },
    ]);
    expect(entry?.mcp).toMatchObject([
      { serverName: SERVER_NAME, url: expect.stringMatching(/\/fixture-echo\/mcp$/), ready: true },
    ]);
  });

  it('still lists the servers when the client can place only some file kinds', async () => {
    const res = await gateway('/v1/sync?kinds=rule', fullKey);
    const body = (await res.json()) as {
      entries: { versionId: string; components: unknown[]; mcp: unknown[] }[];
    };
    const entry = body.entries.find((item) => item.versionId === versionWire);
    expect(entry?.components).toEqual([]);
    expect(entry?.mcp).toHaveLength(1);
  });

  it('downloads one component by its hash and refuses a hash the key cannot see', async () => {
    const res = await gateway(`/v1/sync/components/${SKILL_SHA}`, fullKey);
    expect(res.status).toBe(200);
    const bytes = new Uint8Array(await res.arrayBuffer());
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(SKILL_SHA);

    const other = await createSignedInUser('delivery-journey-component');
    const otherKey = await createKey(other, ['artifact:sync', 'artifact:download']);
    expect((await gateway(`/v1/sync/components/${SKILL_SHA}`, otherKey)).status).toBe(404);

    const syncOnly = await createKey(user, ['artifact:sync']);
    expect((await gateway(`/v1/sync/components/${SKILL_SHA}`, syncOnly)).status).toBe(403);
  });

  it('stops serving a component that is switched off and serves it again when switched on', async () => {
    const setEnabled = (enabled: boolean) =>
      sql(
        `UPDATE installation_component ic SET enabled = $1 FROM component c
         WHERE c.id = ic.component_id AND c.archive_sha256 = $2`,
        [enabled, SKILL_SHA],
      );
    try {
      await setEnabled(false);
      expect((await gateway(`/v1/sync/components/${SKILL_SHA}`, fullKey)).status).toBe(404);
    } finally {
      await setEnabled(true);
    }
    expect((await gateway(`/v1/sync/components/${SKILL_SHA}`, fullKey)).status).toBe(200);
  });

  it('answers 304 when the revision has not changed', async () => {
    const first = await gateway('/v1/sync', fullKey);
    const etag = first.headers.get('etag') as string;
    const again = await gateway('/v1/sync', fullKey, { headers: { 'if-none-match': etag } });
    expect(again.status).toBe(304);
  });

  it('downloads exactly the stored bytes, whole and by range', async () => {
    const sync = (await (await gateway('/v1/sync', fullKey)).json()) as {
      entries: { href: string; versionId: string }[];
    };
    const href = sync.entries.find((item) => item.versionId === versionWire)?.href as string;
    const path = new URL(href, gatewayUrl).pathname;

    const whole = await gateway(path, fullKey);
    expect(whole.status).toBe(200);
    const bytes = new Uint8Array(await whole.arrayBuffer());
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(ARCHIVE_SHA);

    const part = await gateway(path, fullKey, { headers: { range: 'bytes=0-9' } });
    expect(part.status).toBe(206);
    expect((await part.arrayBuffer()).byteLength).toBe(10);
  });

  it('keeps the archive from a key without the download permission and from other members', async () => {
    const path = `/v1/plugin-versions/${versionWire}/archive`;
    const syncOnly = await createKey(user, ['artifact:sync']);
    expect((await gateway(path, syncOnly)).status).toBeGreaterThanOrEqual(403);

    const other = await createSignedInUser('delivery-journey-stranger');
    const otherKey = await createKey(other, ['artifact:sync', 'artifact:download']);
    expect((await gateway(path, otherKey)).status).toBe(404);
    const otherSync = (await (await gateway('/v1/sync', otherKey)).json()) as {
      entries: unknown[];
    };
    expect(otherSync.entries).toEqual([]);
  });

  it('records the download in the audit log and accepts an apply report', async () => {
    const audits = await sql<{ n: string }>(
      `SELECT count(*) AS n FROM audit_log WHERE action = 'artifact.downloaded' AND org_id = $1`,
      [user.rawOrgId],
    );
    expect(Number(audits[0]?.n)).toBeGreaterThan(0);

    const report = await gateway('/v1/sync/reports', fullKey, {
      method: 'POST',
      body: JSON.stringify({
        target: 'journey',
        applied: [{ versionId: versionWire, sha256: ARCHIVE_SHA }],
        skipped: [],
      }),
    });
    expect(report.status).toBe(204);
  });

  it('stops serving a revoked key at once', async () => {
    const doomed = await createKey(user, ['mcp:list', 'artifact:sync']);
    expect((await gateway('/v1/sync', doomed)).status).toBe(200);
    const keyId = doomed.split('.')[0] as string;
    await sql(`UPDATE api_key SET revoked_at = now() WHERE key_id = $1`, [keyId]);
    expect((await gateway('/v1/sync', doomed)).status).toBe(401);
  });
});
