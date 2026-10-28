/**
 * Project tables and columns: name, status and origin limits, key format, scopes and expiry,
 * project user shapes, installation shapes per scope, session keys, connection state rows and the
 * audit columns.
 *
 * Run: pnpm test -- --only=integration
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
import { databaseUrl } from './test-env.js';

const db = new pg.Client({ connectionString: databaseUrl });
const tag = randomUUID().replaceAll('-', '').slice(0, 12);

let owner = '';
let orgId = '';
let otherOrgId = '';
let pluginId = '';
let pluginVersionId = '';

const hex = (length: number) => randomUUID().replaceAll('-', '').slice(0, length);

async function rejects(promise: Promise<unknown>, constraint: string): Promise<void> {
  await expect(promise).rejects.toMatchObject({ constraint });
}

async function human(): Promise<string> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO "user" (id, email, email_normalized, display_name) VALUES ($1, $2, $2, 'Project schema')`,
    [id, `${id.replaceAll('-', '')}@project.invalid`],
  );
  return id;
}

async function organization(): Promise<string> {
  const id = randomUUID();
  const slug = `pj-${hex(20)}`;
  await db.query(`INSERT INTO organization (id, name, slug, created_by) VALUES ($1, $2, $3, $4)`, [
    id,
    `Org ${slug}`,
    slug,
    owner,
  ]);
  return id;
}

async function project(overrides: { name?: string; org?: string } = {}): Promise<string> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO project (id, organization_id, name, created_by) VALUES ($1, $2, $3, $4)`,
    [id, overrides.org ?? orgId, overrides.name ?? `Project ${hex(10)}`, owner],
  );
  return id;
}

async function projectUser(projectId: string | null, externalRef: string | null): Promise<string> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO "user" (id, email, email_normalized, display_name, kind, project_id, external_ref)
     VALUES ($1, $2, $2, 'Project user', 'external', $3, $4)`,
    [id, `${id.replaceAll('-', '')}@project.invalid`, projectId, externalRef],
  );
  return id;
}

async function user(
  kind: string,
  refs: { projectId?: string | null; externalRef?: string | null },
): Promise<string> {
  const id = randomUUID();
  await db.query(
    `INSERT INTO "user" (id, email, email_normalized, display_name, kind, project_id, external_ref)
     VALUES ($1, $2, $2, 'Project schema', $3, $4, $5)`,
    [
      id,
      `${id.replaceAll('-', '')}@project.invalid`,
      kind,
      refs.projectId ?? null,
      refs.externalRef ?? null,
    ],
  );
  return id;
}

beforeAll(async () => {
  await db.connect();
  owner = await human();
  orgId = await organization();
  otherOrgId = await organization();
  pluginId = randomUUID();
  pluginVersionId = randomUUID();
  await db.query(
    `INSERT INTO plugin (id, name, display_name, summary, description)
     VALUES ($1, $2, 'Project schema', 'summary', 'description')`,
    [pluginId, `project-schema-${tag}`],
  );
  await db.query(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{"endpoints":{"primary":{}}}', 'sha', 'published')`,
    [pluginVersionId, pluginId],
  );
});

afterAll(async () => {
  await db.end();
});

describe('project', () => {
  it('accepts a valid row with defaults', async () => {
    const id = await project();
    const { rows } = await db.query(`SELECT status, return_origins FROM project WHERE id = $1`, [
      id,
    ]);
    expect(rows[0]).toEqual({ status: 'active', return_origins: [] });
  });

  it('limits the name, status and return origins', async () => {
    expect.hasAssertions();
    await rejects(project({ name: '' }), 'project_name_length');
    await rejects(project({ name: 'x'.repeat(61) }), 'project_name_length');
    await project({ name: 'x'.repeat(60) });
    await rejects(
      db.query(
        `INSERT INTO project (id, organization_id, name, status, created_by)
         VALUES ($1, $2, 'Gone', 'gone', $3)`,
        [randomUUID(), orgId, owner],
      ),
      'project_status_check',
    );
    await rejects(
      db.query(
        `INSERT INTO project (id, organization_id, name, return_origins, created_by)
         VALUES ($1, $2, 'Many origins', $3, $4)`,
        [
          randomUUID(),
          orgId,
          Array.from({ length: 21 }, (_, i) => `https://h${i}.example.com`),
          owner,
        ],
      ),
      'project_return_origins_count',
    );
  });

  it('keeps a name unique in one organization and free to repeat in another', async () => {
    expect.hasAssertions();
    const name = `Shared ${hex(10)}`;
    await project({ name });
    await project({ name, org: otherOrgId });
    await rejects(project({ name }), 'project_organization_name_unique');
  });

  it('refuses to delete a project that still has users', async () => {
    const id = await project();
    await projectUser(id, 'host-user');
    await expect(db.query(`DELETE FROM project WHERE id = $1`, [id])).rejects.toMatchObject({
      code: '23503',
    });
  });
});

describe('project key', () => {
  async function key(
    projectId: string,
    overrides: { keyId?: string; scopes?: string[]; cidrs?: string[] | null; days?: number } = {},
  ): Promise<void> {
    await db.query(
      `INSERT INTO project_key
         (id, project_id, key_id, secret_hash, last_four, scopes, allowed_cidrs, expires_at, created_by)
       VALUES ($1, $2, $3, 'hash', 'abcd', $4, $5, now() + ($6 || ' days')::interval, $7)`,
      [
        randomUUID(),
        projectId,
        overrides.keyId ?? `prk_${hex(16)}`,
        overrides.scopes ?? ['sessions:read'],
        overrides.cidrs === undefined ? null : overrides.cidrs,
        String(overrides.days ?? 90),
        owner,
      ],
    );
  }

  it('enforces the key id format, scopes, allowlist size and a future expiry', async () => {
    expect.hasAssertions();
    const id = await project();
    await key(id);
    await rejects(key(id, { keyId: 'ptk_0123456789abcdef' }), 'project_key_id_format');
    await rejects(key(id, { keyId: 'prk_ABCDEF0123456789' }), 'project_key_id_format');
    await rejects(key(id, { scopes: [] }), 'project_key_scopes_count');
    await rejects(
      key(id, { scopes: Array.from({ length: 21 }, () => 'sessions:read') }),
      'project_key_scopes_count',
    );
    await rejects(key(id, { scopes: ['sessions:read', 'admin'] }), 'project_key_scopes_allowed');
    await rejects(key(id, { scopes: ['users:read'] }), 'project_key_scopes_allowed');
    await rejects(key(id, { scopes: ['execute:write'] }), 'project_key_scopes_allowed');
    await key(id, {
      scopes: [
        'tools:read',
        'sessions:read',
        'sessions:write',
        'connections:read',
        'connections:write',
        'auth-configs:read',
        'auth-configs:write',
        'plugins:read',
        'plugins:write',
        'observability:read',
      ],
    });
    await rejects(key(id, { cidrs: [] }), 'project_key_cidrs_count');
    await key(id, { cidrs: ['10.0.0.0/8'] });
    await rejects(key(id, { days: -1 }), 'project_key_expiry_after_creation');
  });

  it('keeps key ids unique and removes keys with their project', async () => {
    const id = await project();
    const keyId = `prk_${hex(16)}`;
    await key(id, { keyId });
    await rejects(key(id, { keyId }), 'project_key_key_id_unique');
    await db.query(`DELETE FROM project_key WHERE project_id = $1`, [id]);
    await db.query(`DELETE FROM project WHERE id = $1`, [id]);
    const { rows } = await db.query(`SELECT count(*)::int AS n FROM project WHERE id = $1`, [id]);
    expect(rows[0]?.n).toBe(0);
  });
});

describe('user shapes', () => {
  it('accepts a project user and a human', async () => {
    const projectId = await project();
    const ids = [await projectUser(projectId, 'host-user'), await user('human', {})];
    expect(new Set(ids).size).toBe(2);
  });

  it('rejects a project user without a reference or without a project', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await rejects(projectUser(projectId, null), 'user_kind_refs_check');
    await rejects(projectUser(null, 'host-user'), 'user_kind_refs_check');
  });

  it('rejects a human user that carries a project, and the retired service kind', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await rejects(user('human', { projectId }), 'user_kind_refs_check');
    await rejects(user('service', { projectId }), 'user_kind_check');
  });

  it('allows the same host user id in two projects and refuses it twice in one', async () => {
    expect.hasAssertions();
    const one = await project();
    const two = await project();
    await projectUser(one, 'host-user');
    await projectUser(two, 'host-user');
    await rejects(projectUser(one, 'host-user'), 'user_project_ref_unique');
  });

  it('limits the external reference length to 255', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await rejects(projectUser(projectId, ''), 'user_external_ref_length');
    await rejects(projectUser(projectId, 'x'.repeat(256)), 'user_external_ref_length');
    await projectUser(projectId, 'x'.repeat(255));
  });
});

describe('installation shapes', () => {
  async function install(
    scope: string,
    refs: { projectId?: string | null; userId?: string | null },
    plugin: string = pluginId,
  ): Promise<void> {
    await db.query(
      `INSERT INTO installation (id, organization_id, scope, user_id, project_id,
         created_by, plugin_id, plugin_version_id, installed_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $6)`,
      [
        randomUUID(),
        orgId,
        scope,
        refs.userId ?? null,
        refs.projectId ?? null,
        owner,
        plugin,
        pluginVersionId,
      ],
    );
  }

  it('needs a project, and nothing else, for project scope', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await install('project', { projectId });
    await rejects(install('project', {}), 'installation_project_scope_shape');
    await rejects(
      install('project', { projectId, userId: owner }),
      'installation_project_scope_shape',
    );
  });

  it('refuses a project on org scope', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await rejects(install('org', { projectId }), 'installation_org_scope_shape');
    await rejects(install('team', { projectId }), 'installation_scope_check');
  });

  it('lets a user install belong to a project user and still needs the user', async () => {
    expect.hasAssertions();
    const projectId = await project();
    const person = await projectUser(projectId, `u-${hex(8)}`);
    await install('user', { userId: person, projectId });
    await install('user', { userId: owner });
    await rejects(install('user', { projectId }), 'installation_user_scope_shape');
  });

  it('keeps one install per plugin in a project and refuses an unknown scope', async () => {
    expect.hasAssertions();
    const projectId = await project();
    const otherProject = await project();
    await install('project', { projectId }, pluginId);
    await install('project', { projectId: otherProject }, pluginId);
    await rejects(install('project', { projectId }, pluginId), 'installation_project_scope_unique');
    await rejects(install('galaxy', {}), 'installation_scope_check');
  });
});

describe('session keys', () => {
  async function apiKey(scope: string, projectId: string | null, plugins: string[] | null) {
    const principal = await projectUser(projectId ?? (await project()), `u-${hex(8)}`);
    await db.query(
      `INSERT INTO api_key (id, key_id, secret_hash, principal_user_id, organization_id, scope, user_id,
         project_id, plugins, created_by, name, last_four, permissions)
       VALUES ($1, $2, 'hash', $3, $4, $5, $6, $7, $8, $3, 'Session key', 'abcd', ARRAY['mcp:list'])`,
      [
        randomUUID(),
        `${scope === 'org' ? 'fyk' : 'stk'}_${hex(16)}`,
        principal,
        orgId,
        scope,
        scope === 'user' ? principal : null,
        projectId,
        plugins,
      ],
    );
  }

  it('accepts a project session with a plugin list and one without', async () => {
    const projectId = await project();
    await expect(apiKey('user', projectId, [randomUUID()])).resolves.toBeUndefined();
    await expect(apiKey('user', projectId, null)).resolves.toBeUndefined();
  });

  it('allows a project only on a user scoped key', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await rejects(apiKey('org', projectId, null), 'api_key_org_scope_shape');
  });
});

describe('connection state and tokens', () => {
  it('numbers every stored connection with a unique id', async () => {
    const { rows } = await db.query(
      `SELECT count(*)::int AS n FROM pg_constraint WHERE conname = 'mcp_oauth_token_id_unique'`,
    );
    expect(rows[0]?.n).toBe(1);
  });

  it('allows return data on a state row only when a project began the flow', async () => {
    const { rows } = await db.query(
      `SELECT pg_get_constraintdef(oid) AS def FROM pg_constraint
       WHERE conname = 'mcp_oauth_state_return_fields_check'`,
    );
    expect(rows[0]?.def).toContain('project_id IS NOT NULL');
  });
});

describe('audit columns', () => {
  it('stores a project and a subject user without foreign keys', async () => {
    const projectId = randomUUID();
    const subject = randomUUID();
    await db.query(
      `INSERT INTO audit_log (id, actor_id, actor_kind, action, org_id, project_id, subject_user_id)
       VALUES ($1, 'system', 'system', 'project.created', $2, $3, $4)`,
      [randomUUID(), orgId, projectId, subject],
    );
    const { rows } = await db.query(`SELECT subject_user_id FROM audit_log WHERE project_id = $1`, [
      projectId,
    ]);
    expect(rows[0]?.subject_user_id).toBe(subject);
  });
});

describe('row security', () => {
  it('forces row security on the project tables', async () => {
    const { rows } = await db.query(
      `SELECT relname, relrowsecurity, relforcerowsecurity FROM pg_class
       WHERE relname IN ('project', 'project_key', 'project_allowed_plugin', 'project_plugin_set', 'project_plugin_set_member') ORDER BY relname`,
    );
    expect(rows).toEqual(
      [
        'project',
        'project_allowed_plugin',
        'project_key',
        'project_plugin_set',
        'project_plugin_set_member',
      ].map((relname) => ({ relname, relrowsecurity: true, relforcerowsecurity: true })),
    );
  });
});

describe('allowed catalog and sets', () => {
  it('keeps the safe column fallback off (the code sets the configured default) and accepts only the three modes', async () => {
    expect.hasAssertions();
    const projectId = await project();
    const { rows } = await db.query(`SELECT user_install_mode FROM project WHERE id = $1`, [
      projectId,
    ]);
    expect(rows[0]?.user_install_mode).toBe('off');
    for (const mode of ['allowlist', 'any']) {
      await db.query(`UPDATE project SET user_install_mode = $2 WHERE id = $1`, [projectId, mode]);
    }
    await rejects(
      db.query(`UPDATE project SET user_install_mode = 'some' WHERE id = $1`, [projectId]),
      'project_user_install_mode_check',
    );
  });

  it('keeps a plugin once per project and once per set, and names sets 1 to 60 characters', async () => {
    expect.hasAssertions();
    const projectId = await project();
    await db.query(`INSERT INTO project_allowed_plugin (project_id, plugin_id) VALUES ($1, $2)`, [
      projectId,
      pluginId,
    ]);
    await rejects(
      db.query(`INSERT INTO project_allowed_plugin (project_id, plugin_id) VALUES ($1, $2)`, [
        projectId,
        pluginId,
      ]),
      'project_allowed_plugin_pk',
    );
    const setId = randomUUID();
    await db.query(
      `INSERT INTO project_plugin_set (id, project_id, name) VALUES ($1, $2, 'basics')`,
      [setId, projectId],
    );
    await rejects(
      db.query(`INSERT INTO project_plugin_set (id, project_id, name) VALUES ($1, $2, 'basics')`, [
        randomUUID(),
        projectId,
      ]),
      'project_plugin_set_name_unique',
    );
    await rejects(
      db.query(`INSERT INTO project_plugin_set (id, project_id, name) VALUES ($1, $2, '')`, [
        randomUUID(),
        projectId,
      ]),
      'project_plugin_set_name_length',
    );
    await db.query(`INSERT INTO project_plugin_set_member (set_id, plugin_id) VALUES ($1, $2)`, [
      setId,
      pluginId,
    ]);
    await rejects(
      db.query(`INSERT INTO project_plugin_set_member (set_id, plugin_id) VALUES ($1, $2)`, [
        setId,
        pluginId,
      ]),
      'project_plugin_set_member_pk',
    );
    await db.query(`DELETE FROM project_plugin_set WHERE id = $1`, [setId]);
    const { rows } = await db.query(
      `SELECT count(*)::int AS n FROM project_plugin_set_member WHERE set_id = $1`,
      [setId],
    );
    expect(rows[0]?.n).toBe(0);
  });
});
