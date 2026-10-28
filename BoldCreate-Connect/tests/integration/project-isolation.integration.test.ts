/**
 * Database isolation between For You data, projects and project users, proven with the real
 * `api` login role and the transaction settings the apps set. Every case asserts zero rows,
 * never an error.
 *
 * Run: pnpm test -- --only=integration
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
import { databaseUrl, roleConnectionString } from './test-env.js';

const admin = new pg.Client({ connectionString: databaseUrl });
const app = new pg.Client({ connectionString: roleConnectionString('api') });
const hex = () => randomUUID().replaceAll('-', '').slice(0, 12);

let orgId = '';
let creator = '';
let projectA = '';
let projectB = '';
let userA1 = '';
let userA2 = '';
let userB1 = '';
let pluginId = '';
let versionId = '';
const installs: Record<string, string> = {};

interface Context {
  project?: string;
  subject?: string;
  viewer?: boolean;
}

/** Runs the query as the api role with the settings the apps set, then rolls back. */
async function seen(context: Context, sql: string, params: unknown[] = []): Promise<unknown[]> {
  await app.query('BEGIN');
  try {
    await app.query(
      `SELECT set_config('app.tenant', $1, true), set_config('app.project', $2, true),
              set_config('app.subject', $3, true), set_config('app.viewer', $4, true)`,
      [orgId, context.project ?? '', context.subject ?? '', context.viewer ? '1' : ''],
    );
    return (await app.query(sql, params)).rows;
  } finally {
    await app.query('ROLLBACK');
  }
}

async function externalUser(projectId: string): Promise<string> {
  const id = randomUUID();
  await admin.query(
    `INSERT INTO "user" (id, email, email_normalized, display_name, kind, project_id, external_ref)
     VALUES ($1, $2, $2, 'Isolation', 'external', $3, $4)`,
    [id, `${id.replaceAll('-', '')}@project.invalid`, projectId, `ref-${hex()}`],
  );
  return id;
}

async function project(): Promise<string> {
  const id = randomUUID();
  await admin.query(
    `INSERT INTO project (id, organization_id, name, created_by) VALUES ($1, $2, $3, $4)`,
    [id, orgId, `Iso ${hex()}`, creator],
  );
  return id;
}

async function install(
  key: string,
  scope: 'org' | 'user' | 'project',
  refs: { project?: string; user?: string },
): Promise<void> {
  const id = randomUUID();
  installs[key] = id;
  await admin.query(
    `INSERT INTO installation (id, organization_id, scope, user_id, project_id, created_by,
       installed_by, plugin_id, plugin_version_id, status, update_policy, required)
     VALUES ($1, $2, $3, $4, $5, $6, $6, $7, $8, 'active', 'pinned', false)`,
    [id, orgId, scope, refs.user ?? null, refs.project ?? null, creator, pluginId, versionId],
  );
}

const ids = (rows: unknown[]) => (rows as { id: string }[]).map((row) => row.id).sort();

beforeAll(async () => {
  await admin.connect();
  await app.connect();
  creator = randomUUID();
  await admin.query(
    `INSERT INTO "user" (id, email, email_normalized, display_name) VALUES ($1, $2, $2, 'Iso')`,
    [creator, `${creator.replaceAll('-', '')}@project.invalid`],
  );
  orgId = randomUUID();
  await admin.query(
    `INSERT INTO organization (id, name, slug, created_by) VALUES ($1, $2, $3, $4)`,
    [orgId, `Iso ${hex()}`, `iso-${hex()}`, creator],
  );
  pluginId = randomUUID();
  versionId = randomUUID();
  await admin.query(
    `INSERT INTO plugin (id, name, display_name, summary, description)
     VALUES ($1, $2, 'Isolation', 'summary', 'description')`,
    [pluginId, `isolation-${hex()}`],
  );
  await admin.query(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{"endpoints":{"primary":{}}}', 'sha', 'published')`,
    [versionId, pluginId],
  );
  projectA = await project();
  projectB = await project();
  userA1 = await externalUser(projectA);
  userA2 = await externalUser(projectA);
  userB1 = await externalUser(projectB);
  await install('org', 'org', {});
  await install('projectA', 'project', { project: projectA });
  await install('projectB', 'project', { project: projectB });
  await install('userA1', 'user', { project: projectA, user: userA1 });
  await install('userA2', 'user', { project: projectA, user: userA2 });
  await install('userB1', 'user', { project: projectB, user: userB1 });
  await install('personal', 'user', { user: creator });
});

afterAll(async () => {
  await app.end();
  await admin.end();
});

const installRows = `SELECT id FROM installation WHERE organization_id = $1`;

describe('installation rows', () => {
  it('shows an organization caller every row it could see before', async () => {
    const rows = ids(await seen({}, installRows, [orgId]));
    expect(rows).toEqual(Object.values(installs).sort());
  });

  it('limits a project key to its own project', async () => {
    const rows = await seen({ project: projectA }, installRows, [orgId]);
    expect(ids(rows)).toEqual(
      [installs['projectA']!, installs['userA1']!, installs['userA2']!].sort(),
    );
  });

  it('hides For You rows and the organization row from a project key', async () => {
    const rows = ids(await seen({ project: projectB }, installRows, [orgId]));
    expect(rows).not.toContain(installs['org']);
    expect(rows).not.toContain(installs['personal']);
    expect(rows).not.toContain(installs['projectA']);
  });

  it('shows a session only its own user installs and the project install', async () => {
    const rows = await seen({ project: projectA, subject: userA1 }, installRows, [orgId]);
    expect(ids(rows)).toEqual([installs['projectA']!, installs['userA1']!].sort());
  });

  it('shows nothing of another user, even with the other id in the query', async () => {
    const rows = await seen(
      { project: projectA, subject: userA1 },
      `SELECT id FROM installation WHERE user_id = $1`,
      [userA2],
    );
    expect(rows).toEqual([]);
  });

  it('keeps the same user id in another project invisible', async () => {
    const rows = await seen(
      { project: projectB, subject: userA1 },
      `SELECT id FROM installation WHERE user_id = $1`,
      [userA1],
    );
    expect(rows).toEqual([]);
  });

  it('shows a viewer the project installs only', async () => {
    const rows = ids(await seen({ viewer: true }, installRows, [orgId]));
    expect(rows).toEqual([installs['projectA']!, installs['projectB']!].sort());
  });
});

describe('connections', () => {
  let tokenA1 = '';
  let tokenA2 = '';

  async function token(installId: string, userId: string): Promise<string> {
    const componentId = randomUUID();
    await admin.query(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', $3, 'Isolation', '{}')`,
      [componentId, versionId, `c_${hex()}`],
    );
    await admin.query(
      `INSERT INTO installation_component (installation_id, organization_id, component_id, plugin_version_id)
       VALUES ($1, $2, $3, $4)`,
      [installId, orgId, componentId, versionId],
    );
    await admin.query(
      `INSERT INTO mcp_server (installation_id, component_id, organization_id, auth_type)
       VALUES ($1, $2, $3, 'oauth_dcr')`,
      [installId, componentId, orgId],
    );
    const { rows } = await admin.query(
      `INSERT INTO mcp_oauth_token (installation_id, component_id, user_id, organization_id, access_sealed)
       VALUES ($1, $2, $3, $4, 'sealed') RETURNING id`,
      [installId, componentId, userId, orgId],
    );
    return rows[0].id as string;
  }

  beforeAll(async () => {
    tokenA1 = await token(installs['userA1']!, userA1);
    tokenA2 = await token(installs['userA2']!, userA2);
  });

  it('shows a session only its own connection', async () => {
    const rows = ids(
      await seen({ project: projectA, subject: userA1 }, `SELECT id FROM mcp_oauth_token`),
    );
    expect(rows).toEqual([tokenA1]);
  });

  it('shows another project nothing of this one', async () => {
    const rows = ids(await seen({ project: projectB }, `SELECT id FROM mcp_oauth_token`));
    expect(rows).not.toContain(tokenA1);
    expect(rows).not.toContain(tokenA2);
  });
});

describe('api keys', () => {
  it('hides rows of another project from a project key', async () => {
    const rows = await seen({ project: projectB }, `SELECT id FROM api_key WHERE project_id = $1`, [
      projectA,
    ]);
    expect(rows).toEqual([]);
  });
});
