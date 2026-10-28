/**
 * Database constraints: duplicate rows, cross-organization rows, restrict foreign keys,
 * text-with-check enums and the org key rules, plus concurrent installs.
 *
 * Run: pnpm test -- --only=integration
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
import { apiUrl, databaseUrl, mailpitUrl, requireEnv } from './test-env.js';
import { formatId, parseId } from '../../packages/contracts/src/v1/ids.js';

const WORKLOAD_SECRET = requireEnv('WORKLOAD_SECRET');
const apiHeaders = { 'x-caller-id': 'web', 'x-workload-secret': WORKLOAD_SECRET };

async function signupAndVerify(email: string): Promise<{ session: string; userId: string }> {
  const signup = await fetch(`${apiUrl}/v1/auth/signup`, {
    method: 'POST',
    headers: { ...apiHeaders, 'idempotency-key': randomUUID(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'TestPassword123!', displayName: 'Constraints' }),
  });
  if (signup.status !== 201) throw new Error(`Signup failed: ${signup.status}`);

  for (let i = 0; i < 60; i++) {
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
        const body = (await verify.json()) as { sessionToken: string; user: { id: string } };
        return { session: body.sessionToken, userId: body.user.id };
      }
    }
    await new Promise<void>((r) => setTimeout(r, 300));
  }
  throw new Error('Verification token not found');
}

function post(path: string, session: string, body: unknown) {
  return fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: {
      ...apiHeaders,
      'idempotency-key': randomUUID(),
      'x-session-token': session,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

const ts = Date.now();
const db = new pg.Client({ connectionString: databaseUrl });

let session = '';
let userId = '';
let outsiderId = '';
let orgId = '';
let otherOrgId = '';
let pluginId = '';
let pluginVersionId = '';
let componentId = '';
let installationId = '';

async function sqlState(text: string, values: unknown[] = []): Promise<string | null> {
  try {
    await db.query(text, values);
    return null;
  } catch (err) {
    return (err as { code?: string }).code ?? 'unknown';
  }
}

describe('schema constraints', () => {
  beforeAll(async () => {
    await db.connect();
    const a = await signupAndVerify(`constraints-a-${ts}@example.com`);
    const b = await signupAndVerify(`constraints-b-${ts}@example.com`);
    session = a.session;
    userId = parseId('usr', a.userId);
    outsiderId = parseId('usr', b.userId);

    const org = await db.query(
      `SELECT o.id FROM organization o JOIN organization_member m ON m.organization_id = o.id
       WHERE m.user_id = $1`,
      [userId],
    );
    orgId = (org.rows[0] as { id: string }).id;
    const otherOrg = await db.query(
      `SELECT o.id FROM organization o JOIN organization_member m ON m.organization_id = o.id
       WHERE m.user_id = $1`,
      [outsiderId],
    );
    otherOrgId = (otherOrg.rows[0] as { id: string }).id;

    pluginId = randomUUID();
    pluginVersionId = randomUUID();
    componentId = randomUUID();
    await db.query(
      `INSERT INTO plugin (id, name, display_name, summary, description)
       VALUES ($1, $2, 'Constraints', 'summary', 'description')`,
      [pluginId, `constraints-${ts}`],
    );
    await db.query(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
         manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{"endpoints":{"primary":{}}}', 'sha', 'published')`,
      [pluginVersionId, pluginId],
    );
    await db.query(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', 'echo_constraints', 'Echo', '{}')`,
      [componentId, pluginVersionId],
    );
    installationId = randomUUID();
    await db.query(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id,
         plugin_version_id, installed_by)
       VALUES ($1, $2, 'org', $3, $4, $5, $3)`,
      [installationId, orgId, userId, pluginId, pluginVersionId],
    );
    await db.query(
      `INSERT INTO installation_component (installation_id, organization_id, component_id, plugin_version_id)
       VALUES ($1, $2, $3, $4)`,
      [installationId, orgId, componentId, pluginVersionId],
    );
  }, 90_000);

  afterAll(async () => {
    await db.end();
  });

  it('rejects a duplicate organization_member row', async () => {
    const code = await sqlState(
      `INSERT INTO organization_member (organization_id, user_id, role) VALUES ($1, $2, 'MEMBER')`,
      [orgId, userId],
    );
    expect(code).toBe('23505');
  });

  it('rejects a duplicate installation_component row', async () => {
    const code = await sqlState(
      `INSERT INTO installation_component (installation_id, organization_id, component_id, plugin_version_id)
       VALUES ($1, $2, $3, $4)`,
      [installationId, orgId, componentId, pluginVersionId],
    );
    expect(code).toBe('23505');
  });

  it('rejects an installation_component whose organization differs from its installation', async () => {
    const otherComponent = randomUUID();
    await db.query(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', 'echo_other', 'Echo', '{}')`,
      [otherComponent, pluginVersionId],
    );
    const code = await sqlState(
      `INSERT INTO installation_component (installation_id, organization_id, component_id, plugin_version_id)
       VALUES ($1, $2, $3, $4)`,
      [installationId, otherOrgId, otherComponent, pluginVersionId],
    );
    expect(code).toBe('23503');
  });

  it.each(['org', 'user'] as const)(
    'creates exactly one installation for %s scope under concurrent requests',
    async (scope) => {
      const path =
        scope === 'org'
          ? `/v1/orgs/${formatId('org', orgId)}/installations`
          : `/v1/orgs/${formatId('org', orgId)}/me/installations`;
      if (scope === 'org') {
        await db.query(`DELETE FROM installation WHERE id = $1`, [installationId]);
      }
      const responses = await Promise.all(
        Array.from({ length: 8 }, () =>
          post(path, session, {
            pluginVersionId: formatId('pv', pluginVersionId),
          }),
        ),
      );
      const statuses = responses.map((r) => r.status);
      expect(statuses.filter((s) => s === 201)).toHaveLength(1);
      expect(statuses.filter((s) => s === 409)).toHaveLength(7);
    },
    30_000,
  );

  it('rejects deleting a plugin version or plugin that an installation references', async () => {
    const versionCode = await sqlState(`DELETE FROM plugin_version WHERE id = $1`, [
      pluginVersionId,
    ]);
    expect(['23503', '23001']).toContain(versionCode);
    const pluginCode = await sqlState(`DELETE FROM plugin WHERE id = $1`, [pluginId]);
    expect(['23503', '23001']).toContain(pluginCode);
  });

  it('enforces enum-like values with check constraints', async () => {
    const guest = await sqlState(
      `INSERT INTO organization_member (organization_id, user_id, role) VALUES ($1, $2, 'GUEST')`,
      [otherOrgId, randomUUID()],
    );
    expect(guest).toBe('23514');
    const scope = await sqlState(
      `INSERT INTO api_key (id, key_id, secret_hash, principal_user_id, organization_id, scope,
         created_by, name, last_four, permissions)
       VALUES ($1, $2, 'h', $3, $4, 'project', $3, 'bad scope key', '1234', ARRAY['mcp:list'])`,
      [randomUUID(), `bad-${ts}`, userId, orgId],
    );
    expect(scope).toBe('23514');
    const status = await sqlState(`UPDATE "user" SET status = 'x' WHERE id = $1`, [userId]);
    expect(status).toBe('23514');
    const retiredScope = await sqlState(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id,
         plugin_version_id, installed_by)
       VALUES ($1, $2, 'team', $3, $4, $5, $3)`,
      [randomUUID(), orgId, userId, pluginId, pluginVersionId],
    );
    expect(retiredScope).toBe('23514');
  });

  describe('org keys', () => {
    const insertKey = (organization: string, version: number, status = 'active') =>
      sqlState(
        `INSERT INTO org_key (id, organization_id, version, public_key, wrapped_private_key,
           kms_key_id, kms_key_version, status)
         VALUES ($1, $2, $3, 'pk', 'wrapped', 'kms', 'v1', $4)`,
        [randomUUID(), organization, version, status],
      );

    // Organizations inserted by SQL get no key from the worker, so the tests own their keys.
    const bareOrg = async (): Promise<string> => {
      const id = randomUUID();
      await db.query(
        `INSERT INTO organization (id, name, slug, created_by) VALUES ($1, 'Key constraint org', $2, $3)`,
        [id, `key-constraint-${id.slice(0, 8)}`, userId],
      );
      return id;
    };

    it('allows one active key per organization and one row per version', async () => {
      const keyOrgId = await bareOrg();
      expect(await insertKey(keyOrgId, 1)).toBeNull();
      expect(await insertKey(keyOrgId, 2)).toBe('23505');
      expect(await insertKey(keyOrgId, 1, 'retired')).toBe('23505');
      expect(await insertKey(keyOrgId, 2, 'retired')).toBeNull();
    });

    it('rejects an unknown status and a non-positive version', async () => {
      const keyOrgId = await bareOrg();
      expect(await insertKey(keyOrgId, 99, 'unknown')).toBe('23514');
      expect(await insertKey(keyOrgId, 0, 'retired')).toBe('23514');
    });

    it('starts an organization without a key and accepts only known key states', async () => {
      const keyOrgId = await bareOrg();
      const { rows } = await db.query(`SELECT key_state FROM organization WHERE id = $1`, [
        keyOrgId,
      ]);
      expect(rows[0]?.key_state).toBe('key_pending');
      expect(
        await sqlState(`UPDATE organization SET key_state = 'x' WHERE id = $1`, [keyOrgId]),
      ).toBe('23514');
    });
  });
});
