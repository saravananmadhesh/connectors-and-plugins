/**
 * Marketplace routes: id-keyed plugin, version and component reads.
 *
 * Run: pnpm test -- --only=integration
 */
import { describe, it, expect, beforeAll } from 'vitest';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
import { apiUrl, databaseUrl, mailpitUrl, requireEnv } from './test-env.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';

const WORKLOAD_SECRET = requireEnv('WORKLOAD_SECRET');
const apiHeaders = {
  'x-caller-id': 'web',
  'x-workload-secret': WORKLOAD_SECRET,
};

function get(path: string, session: string) {
  return fetch(`${apiUrl}${path}`, {
    method: 'GET',
    headers: { ...apiHeaders, 'idempotency-key': randomUUID(), 'x-session-token': session },
  });
}

async function signupAndVerify(email: string): Promise<string> {
  const signup = await fetch(`${apiUrl}/v1/auth/signup`, {
    method: 'POST',
    headers: { ...apiHeaders, 'idempotency-key': randomUUID(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'TestPassword123!', displayName: 'Marketplace' }),
  });
  if (signup.status !== 201) throw new Error(`Signup failed: ${signup.status}`);

  for (let i = 0; i < 40; i++) {
    const list = await fetch(`${mailpitUrl}/api/v1/messages`);
    const data = (await list.json()) as {
      messages?: Array<{ ID: string; To: Array<{ Address: string }> }>;
    };
    const msg = data.messages?.find((m) => m.To.some((t) => t.Address === email));
    if (msg) {
      const full = await fetch(`${mailpitUrl}/api/v1/message/${msg.ID}`);
      const text = ((await full.json()) as { Text?: string }).Text ?? '';
      const token = text.match(/token=([a-zA-Z0-9_-]+)/)?.[1];
      if (token) {
        const verify = await fetch(`${apiUrl}/v1/auth/verify-email`, {
          method: 'POST',
          headers: {
            ...apiHeaders,
            'idempotency-key': randomUUID(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        return ((await verify.json()) as { sessionToken: string }).sessionToken;
      }
    }
    await new Promise<void>((r) => setTimeout(r, 300));
  }
  throw new Error('Verification token not found');
}

const ts = Date.now();
const pluginId = randomUUID();
const pluginVersionId = randomUUID();
const componentId = randomUUID();
const pluginName = `marketplace-fixture-${ts}`;
let session = '';

async function seedPlugin() {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    await client.query(
      `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
       VALUES ($1, $2, 'Marketplace Fixture', 'Fixture summary', 'Fixture description', 'active', 'public')`,
      [pluginId, pluginName],
    );
    await client.query(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
         manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', 'sha256-marketplace-fixture', 'published')`,
      [pluginVersionId, pluginId],
    );
    await client.query(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', 'echo_marketplace', 'Echo tool', '{}')`,
      [componentId, pluginVersionId],
    );
  } finally {
    await client.end();
  }
}

describe('marketplace routes', () => {
  beforeAll(async () => {
    session = await signupAndVerify(`marketplace-${ts}@example.com`);
    await seedPlugin();
  }, 60_000);

  it('lists the seeded plugin', async () => {
    const res = await get(`/v1/plugins?q=${pluginName}`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ id: string; name: string }> };
    expect(body.items.map((p) => p.id)).toContain(formatId('plg', pluginId));
  });

  async function found(query: string): Promise<boolean> {
    const res = await get(`/v1/plugins?q=${pluginName}&${query}`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ id: string }> };
    return body.items.some((p) => p.id === formatId('plg', pluginId));
  }

  it('narrows the list by component kind, category and featured', async () => {
    expect(await found('kind=mcp')).toBe(true);
    expect(await found('kind=skill')).toBe(false);
    expect(await found('categories=no-such-category,also-missing')).toBe(false);
    expect(await found('featured=true')).toBe(false);
    expect(await found('featured=false')).toBe(true);
  });

  it('refuses a component kind that does not exist', async () => {
    expect((await get(`/v1/plugins?kind=gadget`, session)).status).toBe(400);
  });

  it('shows the marks and categories on every plugin', async () => {
    const res = await get(`/v1/plugins?q=${pluginName}`, session);
    const body = (await res.json()) as {
      items: Array<{ featured: boolean; verified: boolean; categories: unknown[] }>;
    };
    expect(body.items[0]).toMatchObject({ featured: false, verified: false, categories: [] });
  });

  it('links the logo of the newest published version to the commit it was read from', async () => {
    const logoPluginId = randomUUID();
    const sourceId = randomUUID();
    const commit = 'a'.repeat(40);
    const logoName = `marketplace-logo-${ts}`;
    const client = new pg.Client({ connectionString: databaseUrl });
    await client.connect();
    try {
      await client.query(
        `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by)
         VALUES ($1, 'boldcreate', 'plugins', 'main', 'tools/logo', 'marketplace-test')`,
        [sourceId],
      );
      await client.query(
        `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility, source_id)
         VALUES ($1, $2, 'Logo Fixture', 'Logo summary', 'Logo description', 'active', 'public', $3)`,
        [logoPluginId, logoName, sourceId],
      );
      await client.query(
        `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
           manifest_schema_version, manifest, manifest_sha256, status, commit_sha)
         VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{"logo":"assets/icon.png"}', 'sha256-logo-fixture', 'published', $3)`,
        [randomUUID(), logoPluginId, commit],
      );
    } finally {
      await client.end();
    }

    const res = await get(`/v1/plugins?q=${logoName}`, session);
    const body = (await res.json()) as { items: Array<{ id: string; logoUrl: string | null }> };
    expect(body.items).toEqual([
      {
        ...body.items[0],
        id: formatId('plg', logoPluginId),
        logoUrl: `https://raw.githubusercontent.com/boldcreate/plugins/${commit}/tools/logo/assets/icon.png`,
      },
    ]);
    const seeded = await get(`/v1/plugins?q=${pluginName}`, session);
    const seededBody = (await seeded.json()) as { items: Array<{ logoUrl: string | null }> };
    expect(seededBody.items[0]?.logoUrl).toBeNull();
  });

  it('shows what a card needs: the newest version and the components of each kind', async () => {
    const res = await get(`/v1/plugins?q=${pluginName}`, session);
    const body = (await res.json()) as { items: Array<Record<string, unknown>> };
    expect(body.items[0]).toMatchObject({
      latestVersion: { id: formatId('pv', pluginVersionId), version: '1.0.0' },
      componentCounts: { agent: 0, skill: 0, mcp: 1, hook: 0, rule: 0 },
    });
  });

  it('sorts by name in either direction and pages with a total', async () => {
    type Page = {
      items: Array<{ displayName: string }>;
      total: number;
      page: number;
      pageSize: number;
    };
    const read = async (query: string) =>
      (await (await get(`/v1/plugins?q=-${ts}&${query}`, session)).json()) as Page;
    const ascending = await read('sort=name');
    expect(ascending.items.map((p) => p.displayName)).toEqual([
      'Logo Fixture',
      'Marketplace Fixture',
    ]);
    expect(ascending.total).toBe(2);
    const descending = await read('sort=name&direction=desc');
    expect(descending.items.map((p) => p.displayName)).toEqual([
      'Marketplace Fixture',
      'Logo Fixture',
    ]);
    const second = await read('sort=name&limit=1&page=2');
    expect(second).toMatchObject({ total: 2, page: 2, pageSize: 1 });
    expect(second.items.map((p) => p.displayName)).toEqual(['Marketplace Fixture']);
    expect((await read('sort=name&limit=1&page=3')).items).toEqual([]);
  });

  it('refuses a sort that does not exist and a page below one', async () => {
    expect((await get('/v1/plugins?sort=popular', session)).status).toBe(400);
    expect((await get('/v1/plugins?page=0', session)).status).toBe(400);
  });

  it('gets a plugin by id', async () => {
    const res = await get(`/v1/plugins/${formatId('plg', pluginId)}`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      name: string;
      description: string;
      latestVersion: { id: string; version: string } | null;
      components: unknown[];
    };
    expect(body.id).toBe(formatId('plg', pluginId));
    expect(body.name).toBe(pluginName);
    expect(body.description).toBe('Fixture description');
    expect(body.latestVersion).toMatchObject({
      id: formatId('pv', pluginVersionId),
      version: '1.0.0',
    });
    expect(Array.isArray(body.components)).toBe(true);
  });

  it('returns 404 for an id that is not a prefixed id', async () => {
    const res = await get('/v1/plugins/not-a-uuid', session);
    expect(res.status).toBe(404);
    const body = (await res.json()) as { error: { code: string } };
    expect(body.error.code).toBe('not_found');
  });

  it('returns 404 for an unknown plugin id', async () => {
    const res = await get(`/v1/plugins/${formatId('plg', randomUUID())}`, session);
    expect(res.status).toBe(404);
  });

  it('lists the versions of a plugin', async () => {
    const res = await get(`/v1/plugins/${formatId('plg', pluginId)}/versions`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ id: string; version: string }> };
    expect(body.items).toHaveLength(1);
    expect(body.items[0]).toMatchObject({ id: formatId('pv', pluginVersionId), version: '1.0.0' });
  });

  it('returns a version with its components', async () => {
    const res = await get(`/v1/plugin-versions/${formatId('pv', pluginVersionId)}`, session);
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      id: string;
      pluginId: string;
      components: Array<{ id: string; kind: string; name: string }>;
    };
    expect(body.pluginId).toBe(formatId('plg', pluginId));
    expect(body.components).toEqual([
      expect.objectContaining({
        id: formatId('cmp', componentId),
        kind: 'mcp',
        name: 'echo_marketplace',
      }),
    ]);
  });

  it('returns 404 for an unknown version id', async () => {
    const res = await get(`/v1/plugin-versions/${formatId('pv', randomUUID())}`, session);
    expect(res.status).toBe(404);
  });

  it('removed the name-keyed catalog paths', async () => {
    const res = await get(`/v1/catalog/plugins/${pluginName}`, session);
    expect(res.status).toBe(404);
  });

  it('requires a session', async () => {
    const res = await fetch(`${apiUrl}/v1/plugins`, { headers: apiHeaders });
    expect(res.status).toBe(401);
  });
});
