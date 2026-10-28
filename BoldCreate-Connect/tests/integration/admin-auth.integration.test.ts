/**
 * Admin sign-in against the live admin app, worker and Mailpit: setup link by mail, password,
 * session, sign-out, lockout and the allow-list. The dev and test stacks allow `admin@example.test`.
 */
import { randomUUID } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { apiGet, createSignedInUser, mailToken, sql } from './signed-in-user.js';
import { createDb } from '../../packages/db/src/index.js';
import {
  authenticateAdminSession,
  completeAdminSetup,
  requestAdminSetup,
  type AdminAuthPolicy,
} from '../../packages/domain/src/index.js';
import { adminUrl, mailpitUrl, roleConnectionString } from './test-env.js';

const EMAIL = 'admin@example.test';
const PASSWORD = 'AdminPassword123!';
const NEW_PASSWORD = 'DifferentPassword456!';
const SETUP_SUBJECT = 'Set up your admin password';

class AdminClient {
  private cookies = new Map<string, string>();

  private store(res: Response): void {
    for (const header of res.headers.getSetCookie()) {
      const [pair = ''] = header.split(';');
      const index = pair.indexOf('=');
      const name = pair.slice(0, index);
      const value = pair.slice(index + 1);
      if (/max-age=0|expires=thu, 01 jan 1970/i.test(header) || value === '') {
        this.cookies.delete(name);
      } else this.cookies.set(name, value);
    }
  }

  private cookieHeader(): string {
    return [...this.cookies].map(([name, value]) => `${name}=${value}`).join('; ');
  }

  async request(method: string, path: string, body?: unknown): Promise<Response> {
    const headers: Record<string, string> = { cookie: this.cookieHeader() };
    if (method !== 'GET') {
      const csrf = await fetch(`${adminUrl}/api/csrf`, {
        headers: { cookie: this.cookieHeader() },
      });
      this.store(csrf);
      headers['x-csrf-token'] = ((await csrf.json()) as { csrfToken: string }).csrfToken;
      headers['cookie'] = this.cookieHeader();
      if (body !== undefined) headers['content-type'] = 'application/json';
    }
    const res = await fetch(`${adminUrl}${path}`, {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    this.store(res);
    return res;
  }

  hasSession(): boolean {
    return this.cookies.has('__Host-admin_sid');
  }
}

async function errorCode(res: Response): Promise<string> {
  return ((await res.json()) as { error: { code: string } }).error.code;
}

async function resetAdmin(): Promise<void> {
  await sql(`DELETE FROM platform_admin_session`, []);
  await sql(`DELETE FROM platform_admin_identity WHERE oid = $1`, [EMAIL]);
  await sql(`DELETE FROM admin_setup_token WHERE email = $1`, [EMAIL]);
}

async function signedInAdmin(): Promise<AdminClient> {
  await resetAdmin();
  // Older setup mails would be picked up first; remove them.
  await fetch(`${mailpitUrl}/api/v1/search?query=${encodeURIComponent(`to:${EMAIL}`)}`, {
    method: 'DELETE',
  });
  const client = new AdminClient();
  await client.request('POST', '/api/v1/admin/auth/setup-request', { email: EMAIL });
  const token = await mailToken(EMAIL, SETUP_SUBJECT);
  const setup = await client.request('POST', '/api/v1/admin/auth/setup', {
    token,
    password: PASSWORD,
  });
  expect(setup.status).toBe(200);
  return client;
}

describe('admin sign-in', () => {
  it('sets up, signs in, signs out and locks after repeated wrong passwords', async () => {
    await resetAdmin();
    const client = new AdminClient();

    // No account yet: the same refusal as a wrong password.
    const early = await client.request('POST', '/api/v1/admin/auth/signin', {
      email: EMAIL,
      password: PASSWORD,
    });
    expect(early.status).toBe(401);
    expect(await errorCode(early)).toBe('invalid_credentials');

    const requested = await client.request('POST', '/api/v1/admin/auth/setup-request', {
      email: EMAIL,
    });
    expect(requested.status).toBe(202);
    const token = await mailToken(EMAIL, SETUP_SUBJECT);

    const weak = await client.request('POST', '/api/v1/admin/auth/setup', {
      token,
      password: 'short',
    });
    expect(weak.status).toBe(422);

    const setup = await client.request('POST', '/api/v1/admin/auth/setup', {
      token,
      password: PASSWORD,
    });
    expect(setup.status).toBe(200);
    expect(await setup.json()).toEqual({ email: EMAIL });
    expect(client.hasSession()).toBe(true);
    expect((await client.request('GET', '/api/v1/admin/auth/session')).status).toBe(200);

    // The link works once.
    const replay = await client.request('POST', '/api/v1/admin/auth/setup', {
      token,
      password: NEW_PASSWORD,
    });
    expect(replay.status).toBe(400);
    expect(await errorCode(replay)).toBe('token_invalid_or_expired');

    const signout = await client.request('POST', '/api/v1/admin/auth/signout');
    expect(signout.status).toBe(204);
    expect((await client.request('GET', '/api/v1/admin/auth/session')).status).toBe(401);

    const signin = await client.request('POST', '/api/v1/admin/auth/signin', {
      email: EMAIL.toUpperCase(),
      password: PASSWORD,
    });
    expect(signin.status).toBe(200);
    expect((await client.request('GET', '/api/v1/admin/auth/session')).status).toBe(200);

    // A wrong password here
    // counts toward the lockout and a right one is then refused.
    const other = new AdminClient();
    for (let attempt = 0; attempt < 5; attempt++) {
      const wrong = await other.request('POST', '/api/v1/admin/auth/signin', {
        email: EMAIL,
        password: `wrong-password-${attempt}`,
      });
      expect(wrong.status).toBe(401);
    }
    const locked = await other.request('POST', '/api/v1/admin/auth/signin', {
      email: EMAIL,
      password: PASSWORD,
    });
    expect(locked.status).toBe(401);

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE actor_kind = 'platform_admin' ORDER BY created_at`,
      [],
    );
    const actions = audit.map((row) => row.action);
    expect(actions).toContain('admin.password_set');
    expect(actions).toContain('admin.signed_in');
    expect(actions).toContain('admin.signed_out');
    expect(actions).toContain('admin.sign_in_failed');
    await resetAdmin();
  });

  it('sends no link and stores no token for an email that is not allowed', async () => {
    const email = 'stranger@example.test';
    const client = new AdminClient();
    const res = await client.request('POST', '/api/v1/admin/auth/setup-request', { email });
    expect(res.status).toBe(202);
    expect(await res.json()).toEqual({});
    const rows = await sql<{ n: string }>(
      `SELECT count(*)::text AS n FROM admin_setup_token WHERE email = $1`,
      [email],
    );
    expect(rows[0]!.n).toBe('0');
    const refused = await client.request('POST', '/api/v1/admin/auth/signin', {
      email,
      password: PASSWORD,
    });
    expect(refused.status).toBe(401);
  });

  it('refuses an unknown setup token', async () => {
    const res = await new AdminClient().request('POST', '/api/v1/admin/auth/setup', {
      token: 'not-a-real-token',
      password: PASSWORD,
    });
    expect(res.status).toBe(400);
    expect(await errorCode(res)).toBe('token_invalid_or_expired');
  });
});

describe('admin session and the allow-list', () => {
  const policy: AdminAuthPolicy = {
    session: { idleSeconds: 600, absoluteSeconds: 3600, slideMinIntervalSeconds: 60 },
    maxFailedLogins: 5,
    lockSeconds: 900,
    passwordMinLength: 12,
    allowedEmails: ['domain-admin@example.test'],
    setupTtlSeconds: 1800,
    setupUrl: 'http://localhost:3004/setup',
  };
  const email = 'domain-admin@example.test';

  it('ends a live session when the email leaves the list or the session expires', async () => {
    const { db, pool } = createDb({ connectionString: roleConnectionString('admin'), max: 2 });
    try {
      await sql(`DELETE FROM platform_admin_identity WHERE oid = $1`, [email]);
      await requestAdminSetup(db, policy, email);
      const token = await mailToken(email, SETUP_SUBJECT);
      const { sessionToken } = await completeAdminSetup(
        db,
        policy,
        { token, password: PASSWORD },
        {},
      );

      expect(await authenticateAdminSession(db, policy, sessionToken)).toMatchObject({ email });
      expect(
        await authenticateAdminSession(db, { ...policy, allowedEmails: [] }, sessionToken),
      ).toBeNull();
      expect(await authenticateAdminSession(db, policy, 'unknown-session-token')).toBeNull();

      // Past the idle limit the session is revoked for good.
      const later = new Date(Date.now() + 700_000);
      expect(await authenticateAdminSession(db, policy, sessionToken, later)).toBeNull();
      expect(await authenticateAdminSession(db, policy, sessionToken)).toBeNull();

      // A second request inside the resend window sends no second link.
      await requestAdminSetup(db, policy, email);
      const count = await sql<{ n: string }>(
        `SELECT count(*)::text AS n FROM admin_setup_token WHERE email = $1`,
        [email],
      );
      expect(count[0]!.n).toBe('1');
    } finally {
      await sql(`DELETE FROM platform_admin_session`, []);
      await sql(`DELETE FROM platform_admin_identity WHERE oid = $1`, [email]);
      await sql(`DELETE FROM admin_setup_token WHERE email = $1`, [email]);
      await pool.end();
    }
  });
});

describe('plugin sources', () => {
  const source = {
    owner: 'fixture-owner',
    repository: 'sample-plugins',
    ref: 'main',
    path: 'plugins/a',
  };

  const signedIn = signedInAdmin;

  async function settled(client: AdminClient, id: string): Promise<Record<string, unknown>> {
    for (let attempt = 0; attempt < 60; attempt++) {
      const list = await client.request('GET', '/api/v1/admin/plugin-sources');
      const items = ((await list.json()) as { items: Record<string, unknown>[] }).items;
      const found = items.find((item) => item['id'] === id);
      if (found && found['lastStatus'] === 'failed') return found;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw new Error('the sync did not settle');
  }

  it('needs an admin session', async () => {
    const res = await new AdminClient().request('GET', '/api/v1/admin/plugin-sources');
    expect(res.status).toBe(401);
  });

  it('adds, syncs and removes a source, and refuses owners off the allow-list', async () => {
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [source.owner]);
    const client = await signedIn();

    const refused = await client.request('POST', '/api/v1/admin/plugin-sources', {
      ...source,
      owner: 'somebody-else',
    });
    expect(refused.status).toBe(400);

    const bad = await client.request('POST', '/api/v1/admin/plugin-sources', {
      ...source,
      path: '../up',
    });
    expect(bad.status).toBe(400);

    const created = await client.request('POST', '/api/v1/admin/plugin-sources', source);
    expect(created.status).toBe(201);
    const body = (await created.json()) as { id: string; lastStatus: string | null };
    expect(['queued', 'running', 'failed']).toContain(body.lastStatus);

    const duplicate = await client.request('POST', '/api/v1/admin/plugin-sources', source);
    expect(duplicate.status).toBe(409);

    // The worker accepts no owner here, so the sync ends as failed with a readable reason.
    const done = await settled(client, body.id);
    expect(done['lastError']).toBe('This repository owner is not on the allow-list.');

    const ingestions = await client.request(
      'GET',
      `/api/v1/admin/plugin-sources/${body.id}/ingestions`,
    );
    expect(ingestions.status).toBe(200);
    const history = ((await ingestions.json()) as { items: { status: string }[] }).items;
    expect(history.map((item) => item.status)).toEqual(['failed']);

    const again = await client.request('POST', `/api/v1/admin/plugin-sources/${body.id}/sync`);
    expect(again.status).toBe(202);
    await settled(client, body.id);

    const unknown = await client.request(
      'POST',
      '/api/v1/admin/plugin-sources/00000000-0000-4000-8000-000000000000/sync',
    );
    expect(unknown.status).toBe(404);

    expect((await client.request('DELETE', `/api/v1/admin/plugin-sources/${body.id}`)).status).toBe(
      204,
    );
    expect((await client.request('DELETE', `/api/v1/admin/plugin-sources/${body.id}`)).status).toBe(
      404,
    );

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE action LIKE 'plugin_%' ORDER BY created_at`,
      [],
    );
    const actions = audit.map((row) => row.action);
    expect(actions).toContain('plugin_source.created');
    expect(actions).toContain('plugin_ingestion.requested');
    expect(actions).toContain('plugin_source.deleted');
    await resetAdmin();
  });
});

describe('discovering and installing plugins', () => {
  const OWNER = 'fixture-owner';
  const BASE = '/api/v1/admin/plugin-sources';
  const install = (paths: string[], owner = OWNER) => ({
    owner,
    repository: 'multi-plugins',
    ref: 'main',
    paths,
  });

  it('needs an admin session', async () => {
    const anonymous = new AdminClient();
    const discover = await anonymous.request('POST', `${BASE}/discover`, {
      owner: OWNER,
      repository: 'multi-plugins',
    });
    expect(discover.status).toBe(401);
    const installed = await anonymous.request('POST', `${BASE}/install`, install(['a']));
    expect(installed.status).toBe(401);
  });

  it('refuses owners off the allow-list and bad input before reaching GitHub', async () => {
    const client = await signedInAdmin();
    const off = await client.request('POST', `${BASE}/discover`, {
      owner: 'somebody-else',
      repository: 'multi-plugins',
    });
    expect(off.status).toBe(400);
    expect((await client.request('POST', `${BASE}/discover`, { owner: OWNER })).status).toBe(400);
    const climbing = await client.request('POST', `${BASE}/discover`, {
      owner: OWNER,
      repository: 'multi-plugins',
      path: '../up',
    });
    expect(climbing.status).toBe(400);
    const offInstall = await client.request(
      'POST',
      `${BASE}/install`,
      install(['a'], 'somebody-else'),
    );
    expect(offInstall.status).toBe(400);
    expect((await client.request('POST', `${BASE}/install`, install([]))).status).toBe(400);
    expect((await client.request('POST', `${BASE}/install`, install(['../up']))).status).toBe(400);
    await resetAdmin();
  });

  it('adds a source for each chosen folder only and leaves known folders alone', async () => {
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
    const client = await signedInAdmin();

    const first = await client.request(
      'POST',
      `${BASE}/install`,
      install(['plugins/a', 'plugins/b', 'plugins/a']),
    );
    expect(first.status).toBe(200);
    const added = (await first.json()) as {
      items: { path: string; outcome: string; source: { id: string; path: string } }[];
    };
    expect(added.items.map((item) => [item.path, item.outcome, item.source.path])).toEqual([
      ['plugins/a', 'added', 'plugins/a'],
      ['plugins/b', 'added', 'plugins/b'],
    ]);

    const again = await client.request(
      'POST',
      `${BASE}/install`,
      install(['plugins/b', 'plugins/c']),
    );
    const second = (await again.json()) as { items: { path: string; outcome: string }[] };
    expect(second.items.map((item) => [item.path, item.outcome])).toEqual([
      ['plugins/b', 'exists'],
      ['plugins/c', 'added'],
    ]);

    const rows = await sql<{ path: string }>(
      `SELECT path FROM plugin_source WHERE owner = $1 ORDER BY path`,
      [OWNER],
    );
    expect(rows.map((row) => row.path)).toEqual(['plugins/a', 'plugins/b', 'plugins/c']);

    const queued = await sql<{ n: string }>(
      `SELECT count(*)::text AS n FROM plugin_ingestion i JOIN plugin_source s ON s.id = i.source_id WHERE s.owner = $1`,
      [OWNER],
    );
    expect(queued[0]!.n).toBe('3');

    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
    await resetAdmin();
  });
});

describe('plugin lifecycle', () => {
  const NAME = 'lifecycle-sample';
  const scan = {
    fileCount: 3,
    totalBytes: 120,
    components: [{ kind: 'rule', name: 'style', description: 'Style' }],
    hookCommands: [{ event: 'stop', command: 'echo done' }],
    mcpServers: [],
    variables: [],
    skipped: [],
    findings: [{ path: 'notes.txt', kind: 'possible secret: GitHub token' }],
  };

  async function version(
    pluginId: string,
    number: string,
    status: string,
    withScan = true,
  ): Promise<string> {
    const id = randomUUID();
    const [major, minor, patch] = number.split('.').map(Number);
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch, manifest_schema_version,
         manifest, manifest_sha256, status, scan)
       VALUES ($1, $2, $3, $4, $5, $6, '1', '{}', $7, $8, $9)`,
      [id, pluginId, number, major, minor, patch, `sha-${id}`, status, withScan ? scan : null],
    );
    return id;
  }

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM installation WHERE plugin_id IN (SELECT id FROM plugin WHERE name = $1)`,
      [NAME],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name = $1)`,
      [NAME],
    );
    await sql(`DELETE FROM plugin WHERE name = $1`, [NAME]);
  }

  async function inCatalog(sessionToken: string): Promise<boolean> {
    const res = await apiGet(`/v1/plugins?q=${NAME}`, sessionToken);
    const body = (await res.json()) as { items: { name: string }[] };
    return body.items.some((item) => item.name === NAME);
  }

  it('needs an admin session', async () => {
    const res = await new AdminClient().request('GET', '/api/v1/admin/plugins');
    expect(res.status).toBe(401);
  });

  it('reviews, publishes, yanks and removes a plugin, asking for force when it is installed', async () => {
    await cleanup();
    const member = await createSignedInUser('lifecycle');
    const client = await signedInAdmin();
    const pluginId = randomUUID();
    await sql(
      `INSERT INTO plugin (id, name, display_name, summary, description)
       VALUES ($1, $2, 'Lifecycle sample', 'Sample for the lifecycle tests.', 'Longer text.')`,
      [pluginId, NAME],
    );
    const pending = await version(pluginId, '1.0.0', 'pending');
    const old = await version(pluginId, '0.9.0', 'pending', false);
    const api = (method: string, path: string, body?: unknown) =>
      client.request(method, `/api/v1/admin${path}`, body);

    // A plugin with nothing published is for the admin only.
    expect(await inCatalog(member.sessionToken)).toBe(false);
    const listed = (await (await api('GET', `/plugins?q=${NAME}`)).json()) as {
      items: {
        name: string;
        versionCounts: Record<string, number>;
        publishedVersion: string | null;
      }[];
    };
    const row = listed.items.find((item) => item.name === NAME);
    expect(row?.versionCounts).toMatchObject({ pending: 2, published: 0 });
    expect(row?.publishedVersion).toBeNull();

    // The version shows what the scan found, and an old one without a scan still opens.
    const shown = (await (await api('GET', `/plugin-versions/${pending}`)).json()) as {
      status: string;
      findings: number;
      scan: { hookCommands: { command: string }[] } | null;
    };
    expect(shown.findings).toBe(1);
    expect(shown.scan?.hookCommands[0]?.command).toBe('echo done');
    const bare = (await (await api('GET', `/plugin-versions/${old}`)).json()) as { scan: unknown };
    expect(bare.scan).toBeNull();

    // Repeating a step is refused, and the version lists the steps that apply to it.
    const open = (await (await api('GET', `/plugin-versions/${pending}`)).json()) as {
      actions: string[];
    };
    expect(open.actions).toEqual(['approve', 'reject']);
    expect((await api('POST', `/plugin-versions/${pending}/approve`)).status).toBe(200);
    expect((await api('POST', `/plugin-versions/${pending}/approve`)).status).toBe(409);
    const published = await api('POST', `/plugin-versions/${pending}/publish`);
    expect(published.status).toBe(200);
    expect(((await published.json()) as { status: string }).status).toBe('published');
    expect((await api('POST', `/plugin-versions/${pending}/publish`)).status).toBe(409);
    expect(await inCatalog(member.sessionToken)).toBe(true);

    // A rejected version stays on record.
    expect((await api('POST', `/plugin-versions/${old}/reject`)).status).toBe(200);
    expect((await api('POST', `/plugin-versions/${old}/reject`)).status).toBe(409);

    // Someone installs it, so changes that reach installed copies need force.
    await sql(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id, plugin_version_id, installed_by)
       VALUES ($1, $2, 'org', $3, $4, $5, $3)`,
      [randomUUID(), member.rawOrgId, member.rawUserId, pluginId, pending],
    );
    const impact = await api('GET', `/plugin-versions/${pending}/impact`);
    expect(await impact.json()).toEqual({ installations: 1, organizations: 1, users: 1 });
    const detail = (await (await api('GET', `/plugins/${pluginId}`)).json()) as {
      installations: number;
      versions: { version: string; status: string; installations: number }[];
    };
    expect(detail.installations).toBe(1);
    expect(detail.versions.map((v) => `${v.version}:${v.status}:${v.installations}`)).toEqual([
      '1.0.0:published:1',
      '0.9.0:rejected:0',
    ]);

    expect((await api('POST', `/plugin-versions/${pending}/yank`, {})).status).toBe(409);
    expect((await api('POST', `/plugins/${pluginId}/status`, { status: 'suspended' })).status).toBe(
      409,
    );
    expect((await api('DELETE', `/plugins/${pluginId}`)).status).toBe(409);

    const suspended = await api('POST', `/plugins/${pluginId}/status`, {
      status: 'suspended',
      force: true,
    });
    expect(suspended.status).toBe(200);
    expect(((await suspended.json()) as { status: string }).status).toBe('suspended');
    expect(await inCatalog(member.sessionToken)).toBe(false);
    const reactivated = await api('POST', `/plugins/${pluginId}/status`, { status: 'active' });
    expect(((await reactivated.json()) as { status: string }).status).toBe('active');
    expect(await inCatalog(member.sessionToken)).toBe(true);
    const deprecated = await api('POST', `/plugins/${pluginId}/status`, {
      status: 'deprecated',
      force: true,
    });
    expect(((await deprecated.json()) as { status: string }).status).toBe('deprecated');

    const yanked = await api('POST', `/plugin-versions/${pending}/yank`, { force: true });
    expect(yanked.status).toBe(200);
    expect(((await yanked.json()) as { status: string }).status).toBe('yanked');
    expect(await inCatalog(member.sessionToken)).toBe(false);

    // Delete works once nothing is installed.
    await sql(`DELETE FROM installation WHERE plugin_id = $1`, [pluginId]);
    expect((await api('DELETE', `/plugins/${pluginId}`)).status).toBe(204);
    expect((await api('GET', `/plugins/${pluginId}`)).status).toBe(404);
    expect((await api('DELETE', `/plugins/${pluginId}`)).status).toBe(404);
    expect((await api('POST', `/plugin-versions/${pending}/approve`)).status).toBe(404);

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE action LIKE 'plugin\\_version.%' OR action LIKE 'plugin.%'`,
      [],
    );
    const actions = audit.map((entry) => entry.action);
    for (const expected of [
      'plugin_version.approved',
      'plugin_version.published',
      'plugin_version.rejected',
      'plugin_version.yanked',
      'plugin.suspended',
      'plugin.reactivated',
      'plugin.deprecated',
      'plugin.deleted',
    ]) {
      expect(actions).toContain(expected);
    }
    await cleanup();
    await resetAdmin();
  });

  it('refuses a malformed status and an unknown plugin', async () => {
    const client = await signedInAdmin();
    const unknown = '00000000-0000-4000-8000-000000000000';
    expect((await client.request('GET', `/api/v1/admin/plugins/${unknown}`)).status).toBe(404);
    expect((await client.request('GET', `/api/v1/admin/plugins/${unknown}/impact`)).status).toBe(
      404,
    );
    expect(
      (await client.request('POST', `/api/v1/admin/plugins/${unknown}/status`, { status: 'gone' }))
        .status,
    ).toBe(400);
    await resetAdmin();
  });
});

describe('categories and plugin flags', () => {
  const NAME = 'categories-sample';
  const SLUGS = ['lifecycle-tools', 'custom-slug'];

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name = $1)`,
      [NAME],
    );
    await sql(`DELETE FROM plugin WHERE name = $1`, [NAME]);
    await sql(`DELETE FROM category WHERE slug = ANY($1)`, [SLUGS]);
  }

  async function publicList(sessionToken: string, query: string): Promise<string[]> {
    const res = await apiGet(`/v1/plugins?${query}`, sessionToken);
    const body = (await res.json()) as { items: { name: string }[] };
    return body.items.map((item) => item.name);
  }

  it('needs an admin session', async () => {
    const res = await new AdminClient().request('GET', '/api/v1/admin/categories');
    expect(res.status).toBe(401);
  });

  it('creates, renames and deletes categories and rejects bad input', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const api = (method: string, path: string, body?: unknown) =>
      client.request(method, `/api/v1/admin${path}`, body);

    const created = await api('POST', '/categories', { name: 'Lifecycle Tools' });
    expect(created.status).toBe(201);
    const category = (await created.json()) as { id: string; slug: string; pluginCount: number };
    expect(category).toMatchObject({ slug: 'lifecycle-tools', pluginCount: 0 });

    expect((await api('POST', '/categories', { name: 'Lifecycle Tools' })).status).toBe(409);
    expect((await api('POST', '/categories', { name: '!!!' })).status).toBe(400);
    expect((await api('POST', '/categories', { name: '' })).status).toBe(400);
    const custom = await api('POST', '/categories', { name: 'Custom', slug: 'custom-slug' });
    expect(((await custom.json()) as { slug: string }).slug).toBe('custom-slug');

    const renamed = await api('PATCH', `/categories/${category.id}`, {
      name: 'Lifecycle Helpers',
      description: 'Helpers for lifecycle work.',
    });
    expect(renamed.status).toBe(200);
    expect(await renamed.json()).toMatchObject({
      slug: 'lifecycle-tools',
      name: 'Lifecycle Helpers',
      description: 'Helpers for lifecycle work.',
    });
    expect((await api('PATCH', `/categories/${category.id}`, {})).status).toBe(400);
    expect(
      (await api('PATCH', '/categories/00000000-0000-4000-8000-000000000000', { name: 'x' }))
        .status,
    ).toBe(404);

    const listed = (await (await api('GET', '/categories')).json()) as {
      items: { slug: string }[];
    };
    expect(listed.items.map((item) => item.slug)).toEqual(
      expect.arrayContaining(['custom-slug', 'lifecycle-tools']),
    );

    expect((await api('DELETE', `/categories/${category.id}`)).status).toBe(204);
    expect((await api('DELETE', `/categories/${category.id}`)).status).toBe(404);
    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE action LIKE 'category.%'`,
      [],
    );
    expect(audit.map((entry) => entry.action)).toEqual(
      expect.arrayContaining(['category.created', 'category.renamed', 'category.deleted']),
    );
    await cleanup();
    await resetAdmin();
  });

  it('assigns categories and flags to a plugin and the catalog filters by them', async () => {
    await cleanup();
    const member = await createSignedInUser('categories');
    const client = await signedInAdmin();
    const api = (method: string, path: string, body?: unknown) =>
      client.request(method, `/api/v1/admin${path}`, body);

    const pluginId = randomUUID();
    await sql(
      `INSERT INTO plugin (id, name, display_name, summary, description)
       VALUES ($1, $2, 'Categories sample', 'Sample for category tests.', 'Longer text.')`,
      [pluginId, NAME],
    );
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch, manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published')`,
      [randomUUID(), pluginId, `sha-${pluginId}`],
    );
    const category = (await (
      await api('POST', '/categories', { name: 'Lifecycle Tools' })
    ).json()) as { id: string };

    // Nothing is linked yet, so the filter finds nothing and the public count is zero.
    expect(await publicList(member.sessionToken, 'categories=lifecycle-tools')).toEqual([]);

    const set = await api('PUT', `/plugins/${pluginId}/categories`, { categoryIds: [category.id] });
    expect(set.status).toBe(200);
    expect(((await set.json()) as { categories: { slug: string }[] }).categories).toEqual([
      expect.objectContaining({ slug: 'lifecycle-tools' }),
    ]);
    expect(await publicList(member.sessionToken, 'categories=lifecycle-tools')).toEqual([NAME]);
    expect(await publicList(member.sessionToken, 'categories=another')).toEqual([]);

    const counts = (await (await apiGet('/v1/categories', member.sessionToken)).json()) as {
      items: { slug: string; pluginCount: number }[];
    };
    expect(counts.items.find((item) => item.slug === 'lifecycle-tools')?.pluginCount).toBe(1);

    expect(
      (
        await api('PUT', `/plugins/${pluginId}/categories`, {
          categoryIds: ['00000000-0000-4000-8000-000000000000'],
        })
      ).status,
    ).toBe(400);

    // Featured and verified show on the plugin and narrow the catalog.
    expect(await publicList(member.sessionToken, `q=${NAME}&featured=true`)).toEqual([]);
    const flagged = await api('PATCH', `/plugins/${pluginId}/flags`, {
      featured: true,
      verified: true,
    });
    expect(await flagged.json()).toMatchObject({ featured: true, verified: true });
    expect(await publicList(member.sessionToken, `q=${NAME}&featured=true`)).toEqual([NAME]);
    expect((await api('PATCH', `/plugins/${pluginId}/flags`, {})).status).toBe(400);

    // Removing every category files the plugin under General; deleting a category keeps the plugin.
    const cleared = await api('PUT', `/plugins/${pluginId}/categories`, { categoryIds: [] });
    expect(((await cleared.json()) as { categories: { slug: string }[] }).categories).toEqual([
      expect.objectContaining({ slug: 'general' }),
    ]);
    await api('PUT', `/plugins/${pluginId}/categories`, { categoryIds: [category.id] });
    expect((await api('DELETE', `/categories/${category.id}`)).status).toBe(204);
    const detail = (await (await api('GET', `/plugins/${pluginId}`)).json()) as {
      categories: unknown[];
    };
    expect(detail.categories).toEqual([]);

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE action IN ('plugin.categories_changed', 'plugin.flags_changed')`,
      [],
    );
    expect(audit).not.toHaveLength(0);
    await cleanup();
    await resetAdmin();
  });
});

describe('editing, bulk changes and statistics', () => {
  const OWNER = 'bulk-owner';
  const PREFIX = 'bulk-sample';
  const unknown = '00000000-0000-4000-8000-000000000000';
  const admin = (client: AdminClient, method: string, path: string, body?: unknown) =>
    client.request(method, `/api/v1/admin${path}`, body);
  const insertVersion = (pluginId: string, status: string): Promise<string> => {
    const id = randomUUID();
    return sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch, manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, $4)`,
      [id, pluginId, `sha-${id}`, status],
    ).then(() => id);
  };
  const install = (
    member: { rawOrgId: string; rawUserId: string },
    pluginId: string,
    versionId: string,
  ) =>
    sql(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id, plugin_version_id, installed_by)
       VALUES ($1, $2, 'org', $3, $4, $5, $3)`,
      [randomUUID(), member.rawOrgId, member.rawUserId, pluginId, versionId],
    );

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM installation WHERE plugin_id IN (SELECT id FROM plugin WHERE name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(`DELETE FROM plugin WHERE name LIKE $1`, [`${PREFIX}-%`]);
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
  }

  async function addSource(path: string, lastStatus: string | null = null): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by, last_status)
       VALUES ($1, $2, 'repo', 'main', $3, 'test', $4)`,
      [id, OWNER, path, lastStatus],
    );
    return id;
  }

  async function addPlugin(name: string, sourceId: string | null = null): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin (id, name, display_name, summary, description, source_id)
       VALUES ($1, $2, $3, 'Summary.', 'Description.', $4)`,
      [id, `${PREFIX}-${name}`, `Bulk ${name}`, sourceId],
    );
    return id;
  }

  it('needs an admin session', async () => {
    const client = new AdminClient();
    const ids = { ids: [unknown] };
    expect((await admin(client, 'POST', '/plugin-sources/bulk-sync', ids)).status).toBe(401);
    expect((await admin(client, 'POST', '/plugin-sources/bulk-delete', ids)).status).toBe(401);
    expect((await admin(client, 'POST', '/plugins/bulk-delete', ids)).status).toBe(401);
    expect((await admin(client, 'PATCH', `/plugins/${unknown}`, { summary: 'x' })).status).toBe(
      401,
    );
    expect((await admin(client, 'GET', '/stats')).status).toBe(401);
  });

  it('edits a plugin, refuses bad details and records the change', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const id = await addPlugin('edit');

    const before = (await (await admin(client, 'GET', `/plugins/${id}`)).json()) as {
      metadataEdited: boolean;
    };
    expect(before.metadataEdited).toBe(false);

    const res = await admin(client, 'PATCH', `/plugins/${id}`, {
      displayName: '  Renamed  ',
      keywords: ['fast', 'fast', 'safe'],
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({
      displayName: 'Renamed',
      summary: 'Summary.',
      description: 'Description.',
      keywords: ['fast', 'safe'],
      metadataEdited: true,
    });

    expect((await admin(client, 'PATCH', `/plugins/${id}`, {})).status).toBe(400);
    expect((await admin(client, 'PATCH', `/plugins/${id}`, { summary: '' })).status).toBe(400);
    expect(
      (await admin(client, 'PATCH', `/plugins/${id}`, { summary: 'x'.repeat(201) })).status,
    ).toBe(400);
    expect((await admin(client, 'PATCH', `/plugins/${id}`, { name: 'other' })).status).toBe(400);
    expect((await admin(client, 'PATCH', `/plugins/${unknown}`, { summary: 'x' })).status).toBe(
      404,
    );

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE action = 'plugin.updated' AND target_id = $1`,
      [id],
    );
    expect(audit).toHaveLength(1);
    await cleanup();
    await resetAdmin();
  });

  it('queues a sync for each source that is idle and skips the rest', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const idle = await addSource('idle');
    const busy = await addSource('busy', 'running');
    const failed = await addSource('failed', 'failed');

    const res = await admin(client, 'POST', '/plugin-sources/bulk-sync', {
      ids: [idle, busy, failed, unknown],
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { queued: string[]; skipped: string[] };
    expect([...body.queued].sort()).toEqual([idle, failed].sort());
    expect([...body.skipped].sort()).toEqual([busy, unknown].sort());

    const ingestions = await sql<{ source_id: string }>(
      `SELECT source_id FROM plugin_ingestion WHERE source_id = ANY($1)`,
      [[idle, busy, failed]],
    );
    expect(ingestions.map((row) => row.source_id).sort()).toEqual([idle, failed].sort());
    const audit = await sql<{ target_id: string }>(
      `SELECT target_id FROM audit_log WHERE action = 'plugin_ingestion.requested' AND target_id = ANY($1)`,
      [[idle, failed]],
    );
    expect(audit).toHaveLength(2);

    for (const ids of [[], [idle, idle]]) {
      expect((await admin(client, 'POST', '/plugin-sources/bulk-sync', { ids })).status).toBe(400);
    }
    const tooMany = Array.from({ length: 101 }, () => randomUUID());
    expect(
      (await admin(client, 'POST', '/plugin-sources/bulk-sync', { ids: tooMany })).status,
    ).toBe(400);
    await cleanup();
    await resetAdmin();
  });

  it('removes many sources at once and ignores ones that are gone', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const first = await addSource('one');
    const second = await addSource('two');
    const keep = await addSource('keep');

    const res = await admin(client, 'POST', '/plugin-sources/bulk-delete', {
      ids: [first, second, unknown],
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { deleted: string[] };
    expect([...body.deleted].sort()).toEqual([first, second].sort());

    const left = await sql<{ id: string }>(`SELECT id FROM plugin_source WHERE owner = $1`, [
      OWNER,
    ]);
    expect(left.map((row) => row.id)).toEqual([keep]);
    const audit = await sql<{ target_id: string }>(
      `SELECT target_id FROM audit_log WHERE action = 'plugin_source.deleted' AND target_id = ANY($1)`,
      [[first, second]],
    );
    expect(audit).toHaveLength(2);
    await cleanup();
    await resetAdmin();
  });

  it('deletes the plugins nothing has installed and reports the others', async () => {
    await cleanup();
    const member = await createSignedInUser('bulk-delete');
    const client = await signedInAdmin();
    const free = await addPlugin('free');
    const alsoFree = await addPlugin('also-free');
    const used = await addPlugin('used');
    await insertVersion(free, 'published');
    await install(member, used, await insertVersion(used, 'published'));

    const res = await admin(client, 'POST', '/plugins/bulk-delete', {
      ids: [free, alsoFree, used, unknown],
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      deleted: string[];
      skipped: { id: string; reason: string }[];
    };
    expect([...body.deleted].sort()).toEqual([free, alsoFree].sort());
    expect(body.skipped).toHaveLength(2);
    expect(body.skipped).toEqual(
      expect.arrayContaining([
        { id: used, reason: 'installed' },
        { id: unknown, reason: 'not_found' },
      ]),
    );

    const left = await sql<{ id: string }>(`SELECT id FROM plugin WHERE name LIKE $1`, [
      `${PREFIX}-%`,
    ]);
    expect(left.map((row) => row.id)).toEqual([used]);
    const versions = await sql<{ id: string }>(
      `SELECT id FROM plugin_version WHERE plugin_id = ANY($1)`,
      [[free, alsoFree]],
    );
    expect(versions).toHaveLength(0);
    const audit = await sql<{ target_id: string }>(
      `SELECT target_id FROM audit_log WHERE action = 'plugin.deleted' AND target_id = ANY($1)`,
      [[free, alsoFree]],
    );
    expect(audit).toHaveLength(2);

    expect((await admin(client, 'POST', '/plugins/bulk-delete', { ids: [] })).status).toBe(400);
    await cleanup();
    await resetAdmin();
  });

  it('reports the catalog statistics for a window of days', async () => {
    await cleanup();
    const member = await createSignedInUser('bulk-stats');
    const client = await signedInAdmin();
    const source = await addSource('stats', 'failed');
    const plugin = await addPlugin('stats', source);
    await install(member, plugin, await insertVersion(plugin, 'pending'));
    await sql(
      `INSERT INTO plugin_ingestion (id, source_id, status, requested_by, finished_at)
       VALUES ($1, $2, 'failed', 'test', now())`,
      [randomUUID(), source],
    );

    const res = await admin(client, 'GET', '/stats?days=7');
    expect(res.status).toBe(200);
    const stats = (await res.json()) as {
      periodDays: number;
      totals: { plugins: number; installations: number; sources: number };
      versionsByStatus: { pending: number };
      pluginsByStatus: { active: number };
      needsReview: number;
      sourcesByStatus: { failed: number };
      timeline: { date: string; versionsIngested: number; syncsFailed: number }[];
      topPlugins: { name: string; installations: number }[];
      components: { total: number; byKind: Record<string, number> };
    };
    expect(stats.periodDays).toBe(7);
    expect(stats.totals.plugins).toBeGreaterThanOrEqual(1);
    expect(stats.totals.installations).toBeGreaterThanOrEqual(1);
    expect(stats.totals.sources).toBeGreaterThanOrEqual(1);
    expect(stats.versionsByStatus.pending).toBeGreaterThanOrEqual(1);
    expect(stats.pluginsByStatus.active).toBeGreaterThanOrEqual(1);
    expect(stats.needsReview).toBeGreaterThanOrEqual(1);
    expect(stats.sourcesByStatus.failed).toBeGreaterThanOrEqual(1);
    expect(stats.timeline).toHaveLength(7);
    const today = stats.timeline[6];
    expect(today?.versionsIngested).toBeGreaterThanOrEqual(1);
    expect(today?.syncsFailed).toBeGreaterThanOrEqual(1);
    expect(stats.topPlugins.length).toBeGreaterThanOrEqual(1);
    expect(stats.topPlugins.length).toBeLessThanOrEqual(5);
    const counts = stats.topPlugins.map((item) => item.installations);
    expect(counts).toEqual([...counts].sort((x, y) => y - x));
    expect(stats.components.total).toBeGreaterThanOrEqual(0);
    expect(Object.keys(stats.components.byKind)).toHaveLength(5);

    const defaulted = (await (await admin(client, 'GET', '/stats')).json()) as {
      periodDays: number;
      timeline: unknown[];
    };
    expect(defaulted.periodDays).toBe(30);
    expect(defaulted.timeline).toHaveLength(30);
    expect((await admin(client, 'GET', '/stats?days=5')).status).toBe(400);
    await cleanup();
    await resetAdmin();
  });
});

describe('plugin list, plugin actions and sources that go with a plugin', () => {
  const OWNER = 'listing-owner';
  const PREFIX = 'listing-sample';
  const unknown = '00000000-0000-4000-8000-000000000000';
  const admin = (client: AdminClient, method: string, path: string, body?: unknown) =>
    client.request(method, `/api/v1/admin${path}`, body);

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM installation WHERE plugin_id IN (SELECT id FROM plugin WHERE name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(
      `DELETE FROM component WHERE plugin_version_id IN (SELECT v.id FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(`DELETE FROM plugin WHERE name LIKE $1`, [`${PREFIX}-%`]);
    await sql(`DELETE FROM plugin_source WHERE owner = $1`, [OWNER]);
    await sql(`DELETE FROM category WHERE slug = 'listing-tools'`, []);
  }

  async function addSource(path: string): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by)
       VALUES ($1, $2, 'repo', 'main', $3, 'test')`,
      [id, OWNER, path],
    );
    return id;
  }

  async function addPlugin(
    name: string,
    options: { sourceId?: string; status?: string; visibility?: string } = {},
  ): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin (id, name, display_name, summary, description, source_id, status, visibility)
       VALUES ($1, $2, $3, 'Summary.', 'Description.', $4, $5, $6)`,
      [
        id,
        `${PREFIX}-${name}`,
        `Listing ${name}`,
        options.sourceId ?? null,
        options.status ?? 'active',
        options.visibility ?? 'public',
      ],
    );
    return id;
  }

  async function addVersion(
    pluginId: string,
    status: string,
    kinds: string[] = [],
  ): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch, manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, $4)`,
      [id, pluginId, `sha-${id}`, status],
    );
    for (const kind of kinds) {
      await sql(
        `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata) VALUES ($1, $2, $3, $3, '', '{}')`,
        [randomUUID(), id, kind],
      );
    }
    return id;
  }

  const names = (body: { items: { name: string }[] }) =>
    body.items.map((item) => item.name.replace(`${PREFIX}-`, ''));
  const list = async (client: AdminClient, query: string) => {
    const res = await admin(client, 'GET', `/plugins?q=${PREFIX}&${query}`);
    expect(res.status).toBe(200);
    return (await res.json()) as {
      items: {
        name: string;
        kinds: string[];
        componentCounts: Record<string, number>;
        visibility: string;
      }[];
      total: number;
      page: number;
      pageSize: number;
    };
  };

  it('pages, sorts and filters the plugin list on the server', async () => {
    await cleanup();
    const member = await createSignedInUser('listing');
    const client = await signedInAdmin();
    const alpha = await addPlugin('alpha');
    const beta = await addPlugin('beta', { status: 'suspended' });
    const gamma = await addPlugin('gamma', { visibility: 'private' });
    const delta = await addPlugin('delta');
    const epsilon = await addPlugin('epsilon');
    const alphaVersion = await addVersion(alpha, 'published', ['mcp', 'skill']);
    await addVersion(beta, 'pending', ['rule']);
    await addVersion(gamma, 'published', ['skill']);
    await addVersion(delta, 'rejected', ['hook']);
    await addVersion(epsilon, 'approved');
    const categoryId = randomUUID();
    await sql(
      `INSERT INTO category (id, slug, name) VALUES ($1, 'listing-tools', 'Listing tools')`,
      [categoryId],
    );
    await sql(`INSERT INTO plugin_category (plugin_id, category_id) VALUES ($1, $2)`, [
      beta,
      categoryId,
    ]);
    await sql(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id, plugin_version_id, installed_by)
       VALUES ($1, $2, 'org', $3, $4, $5, $3)`,
      [randomUUID(), member.rawOrgId, member.rawUserId, alpha, alphaVersion],
    );

    const first = await list(client, 'pageSize=2&page=1');
    expect(first).toMatchObject({ total: 5, page: 1, pageSize: 2 });
    expect(names(first)).toEqual(['alpha', 'beta']);
    expect(names(await list(client, 'pageSize=2&page=3'))).toEqual(['gamma']);
    expect(names(await list(client, 'pageSize=2&page=9'))).toEqual([]);

    expect(names(await list(client, 'sort=name&direction=desc'))).toEqual([
      'gamma',
      'epsilon',
      'delta',
      'beta',
      'alpha',
    ]);
    expect(names(await list(client, 'sort=installations&direction=desc'))[0]).toBe('alpha');
    expect(names(await list(client, 'sort=status&direction=desc'))[0]).toBe('beta');
    expect(names(await list(client, 'sort=updated&direction=asc'))).toHaveLength(5);

    expect(names(await list(client, 'status=suspended'))).toEqual(['beta']);
    expect(names(await list(client, 'visibility=private'))).toEqual(['gamma']);
    expect(names(await list(client, 'kind=skill'))).toEqual(['alpha', 'gamma']);
    // A rejected version no longer counts towards what the plugin contains.
    expect(names(await list(client, 'kind=hook'))).toEqual([]);
    expect(names(await list(client, 'versionStatus=needs_review'))).toEqual(['beta', 'epsilon']);
    expect(names(await list(client, 'versionStatus=rejected'))).toEqual(['delta']);
    expect(names(await list(client, 'category=listing-tools'))).toEqual(['beta']);
    expect(names(await list(client, 'status=active&kind=mcp'))).toEqual(['alpha']);
    const shown = await list(client, 'kind=mcp');
    expect(shown.items[0]?.kinds).toEqual(['mcp', 'skill']);
    // Counts follow the version members get; a plugin whose only version was rejected has none.
    expect(shown.items[0]?.componentCounts).toEqual({ mcp: 1, skill: 1 });
    const unshown = await list(client, 'sort=name&direction=asc');
    expect(unshown.items.find((item) => item.name === `${PREFIX}-delta`)?.componentCounts).toEqual(
      {},
    );

    // A percent sign is text in a search, not a wildcard.
    const percent = await admin(client, 'GET', '/plugins?q=%25');
    expect(((await percent.json()) as { total: number }).total).toBe(0);

    for (const query of ['pageSize=101', 'pageSize=0', 'page=0', 'sort=bogus', 'kind=gadget']) {
      expect((await admin(client, 'GET', `/plugins?${query}`)).status).toBe(400);
    }
    await cleanup();
    await resetAdmin();
  });

  it('keeps private plugins out of the catalog members see', async () => {
    await cleanup();
    const member = await createSignedInUser('private-plugin');
    const client = await signedInAdmin();
    const id = await addPlugin('visible');
    await addVersion(id, 'published');
    const inCatalog = async () => {
      const res = await apiGet(`/v1/plugins?q=${PREFIX}-visible`, member.sessionToken);
      return ((await res.json()) as { items: unknown[] }).items.length === 1;
    };
    expect(await inCatalog()).toBe(true);

    const flagged = await admin(client, 'PATCH', `/plugins/${id}/flags`, { visibility: 'private' });
    expect(flagged.status).toBe(200);
    expect(((await flagged.json()) as { visibility: string }).visibility).toBe('private');
    expect(await inCatalog()).toBe(false);

    await admin(client, 'PATCH', `/plugins/${id}/flags`, { visibility: 'public' });
    expect(await inCatalog()).toBe(true);
    expect(
      (await admin(client, 'PATCH', `/plugins/${id}/flags`, { visibility: 'hidden' })).status,
    ).toBe(400);
    await cleanup();
    await resetAdmin();
  });

  it('changes state, visibility and marks of many plugins and holds back installed ones', async () => {
    await cleanup();
    const member = await createSignedInUser('bulk-update');
    const client = await signedInAdmin();
    const free = await addPlugin('free');
    const used = await addPlugin('used');
    await addVersion(free, 'published');
    await install(member, used, await addVersion(used, 'published'));

    const res = await admin(client, 'POST', '/plugins/bulk-update', {
      ids: [free, used, unknown],
      status: 'suspended',
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      updated: string[];
      skipped: { id: string; reason: string }[];
    };
    expect(body.updated).toEqual([free]);
    expect(body.skipped).toEqual(
      expect.arrayContaining([
        { id: used, reason: 'installed' },
        { id: unknown, reason: 'not_found' },
      ]),
    );
    const states = async () =>
      (
        await sql<{ id: string; status: string }>(
          `SELECT id, status FROM plugin WHERE id = ANY($1)`,
          [[free, used]],
        )
      ).sort((a, b) => a.id.localeCompare(b.id));
    expect((await states()).find((row) => row.id === used)?.status).toBe('active');
    expect((await states()).find((row) => row.id === free)?.status).toBe('suspended');

    const forced = await admin(client, 'POST', '/plugins/bulk-update', {
      ids: [free, used],
      status: 'deprecated',
      force: true,
      visibility: 'private',
      featured: true,
      verified: true,
    });
    expect(((await forced.json()) as { updated: string[] }).updated.sort()).toEqual(
      [free, used].sort(),
    );
    const rows = await sql<{
      status: string;
      visibility: string;
      featured: boolean;
      verified: boolean;
    }>(`SELECT status, visibility, featured, verified FROM plugin WHERE id = ANY($1)`, [
      [free, used],
    ]);
    for (const row of rows) {
      expect(row).toEqual({
        status: 'deprecated',
        visibility: 'private',
        featured: true,
        verified: true,
      });
    }
    // Reactivating never needs force.
    const back = await admin(client, 'POST', '/plugins/bulk-update', {
      ids: [used],
      status: 'active',
    });
    expect(((await back.json()) as { updated: string[] }).updated).toEqual([used]);

    const audit = await sql<{ action: string }>(
      `SELECT action FROM audit_log WHERE target_id = ANY($1) AND action LIKE 'plugin.%'`,
      [[free, used]],
    );
    const actions = audit.map((row) => row.action);
    expect(actions).toContain('plugin.suspended');
    expect(actions).toContain('plugin.deprecated');
    expect(actions).toContain('plugin.flags_changed');

    for (const bad of [
      { ids: [free] },
      { ids: [], status: 'active' },
      { ids: [free], status: 'gone' },
    ]) {
      expect((await admin(client, 'POST', '/plugins/bulk-update', bad)).status).toBe(400);
    }
    await cleanup();
    await resetAdmin();
  });

  const install = (
    member: { rawOrgId: string; rawUserId: string },
    pluginId: string,
    versionId: string,
  ) =>
    sql(
      `INSERT INTO installation (id, organization_id, scope, created_by, plugin_id, plugin_version_id, installed_by)
       VALUES ($1, $2, 'org', $3, $4, $5, $3)`,
      [randomUUID(), member.rawOrgId, member.rawUserId, pluginId, versionId],
    );

  it('syncs the source of one plugin or of many, each source once', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const sharedSource = await addSource('shared');
    const busySource = await addSource('busy');
    await sql(`UPDATE plugin_source SET last_status = 'running' WHERE id = $1`, [busySource]);
    const one = await addPlugin('one', { sourceId: sharedSource });
    const two = await addPlugin('two', { sourceId: sharedSource });
    const busy = await addPlugin('busy', { sourceId: busySource });
    const loose = await addPlugin('loose');

    expect((await admin(client, 'POST', `/plugins/${loose}/sync`)).status).toBe(404);
    expect((await admin(client, 'POST', `/plugins/${unknown}/sync`)).status).toBe(404);
    expect((await admin(client, 'POST', `/plugins/${busy}/sync`)).status).toBe(409);

    const bulk = await admin(client, 'POST', '/plugins/bulk-sync', {
      ids: [one, two, busy, loose, unknown],
    });
    expect(bulk.status).toBe(200);
    const body = (await bulk.json()) as { queued: string[]; skipped: string[] };
    expect([...body.queued].sort()).toEqual([one, two].sort());
    expect([...body.skipped].sort()).toEqual([busy, loose, unknown].sort());
    const queued = await sql<{ source_id: string }>(
      `SELECT source_id FROM plugin_ingestion WHERE source_id = ANY($1)`,
      [[sharedSource, busySource]],
    );
    expect(queued.map((row) => row.source_id)).toEqual([sharedSource]);

    // The first request already queued the shared source, so a single sync is refused now.
    const repeat = await admin(client, 'POST', `/plugins/${one}/sync`);
    expect([202, 409]).toContain(repeat.status);
    await cleanup();
    await resetAdmin();
  });

  it('removes the source of a deleted plugin so nothing is left to sync', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const single = await addSource('single');
    const bulkOne = await addSource('bulk-one');
    const bulkTwo = await addSource('bulk-two');
    const shared = await addSource('shared');
    const alone = await addPlugin('alone', { sourceId: single });
    const first = await addPlugin('first', { sourceId: bulkOne });
    const second = await addPlugin('second', { sourceId: bulkTwo });
    const kept = await addPlugin('kept', { sourceId: shared });
    await addPlugin('sibling', { sourceId: shared });
    const sources = async () =>
      (await sql<{ id: string }>(`SELECT id FROM plugin_source WHERE owner = $1`, [OWNER])).map(
        (row) => row.id,
      );

    expect((await admin(client, 'DELETE', `/plugins/${alone}`)).status).toBe(204);
    expect(await sources()).not.toContain(single);

    const res = await admin(client, 'POST', '/plugins/bulk-delete', { ids: [first, second] });
    expect(((await res.json()) as { deleted: string[] }).deleted.sort()).toEqual(
      [first, second].sort(),
    );
    const left = await sources();
    expect(left).not.toContain(bulkOne);
    expect(left).not.toContain(bulkTwo);

    // A source another plugin still uses stays.
    expect((await admin(client, 'DELETE', `/plugins/${kept}`)).status).toBe(204);
    expect(await sources()).toContain(shared);

    const audit = await sql<{ target_id: string }>(
      `SELECT target_id FROM audit_log WHERE action = 'plugin_source.deleted' AND target_id = ANY($1)`,
      [[single, bulkOne, bulkTwo]],
    );
    expect(audit).toHaveLength(3);
    await cleanup();
    await resetAdmin();
  });
});

describe('version steps, source edits, component totals and the audit log', () => {
  const OWNER = 'step-owner';
  const PREFIX = 'step-sample';
  const unknown = '00000000-0000-4000-8000-000000000000';
  const admin = (client: AdminClient, method: string, path: string, body?: unknown) =>
    client.request(method, `/api/v1/admin${path}`, body);

  async function cleanup(): Promise<void> {
    await sql(
      `DELETE FROM component WHERE plugin_version_id IN (SELECT v.id FROM plugin_version v JOIN plugin p ON p.id = v.plugin_id WHERE p.name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(
      `DELETE FROM plugin_version WHERE plugin_id IN (SELECT id FROM plugin WHERE name LIKE $1)`,
      [`${PREFIX}-%`],
    );
    await sql(`DELETE FROM plugin WHERE name LIKE $1`, [`${PREFIX}-%`]);
    await sql(`DELETE FROM plugin_source WHERE owner IN ($1, 'fixture-owner')`, [OWNER]);
    await sql(`DELETE FROM audit_log WHERE actor_id = 'audit-fixture@example.test'`, []);
  }

  async function addSource(path: string, lastStatus: string | null = null): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by, last_status)
       VALUES ($1, $2, 'repo', 'main', $3, 'test', $4)`,
      [id, OWNER, path, lastStatus],
    );
    return id;
  }

  async function addPlugin(name: string, sourceId: string | null = null): Promise<string> {
    const id = randomUUID();
    await sql(
      `INSERT INTO plugin (id, name, display_name, summary, description, source_id)
       VALUES ($1, $2, $3, 'Summary.', 'Description.', $4)`,
      [id, `${PREFIX}-${name}`, `Step ${name}`, sourceId],
    );
    return id;
  }

  async function addVersion(
    pluginId: string,
    number: string,
    status: string,
    kinds: string[] = [],
  ): Promise<string> {
    const id = randomUUID();
    const [major, minor, patch] = number.split('.').map(Number);
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch, manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, $3, $4, $5, $6, '1', '{}', $7, $8)`,
      [id, pluginId, number, major, minor, patch, `sha-${id}`, status],
    );
    for (const kind of kinds) {
      await sql(
        `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata) VALUES ($1, $2, $3, $4, '', '{}')`,
        [randomUUID(), id, kind, `${kind}-${randomUUID().slice(0, 8)}`],
      );
    }
    return id;
  }

  it('needs an admin session', async () => {
    const client = new AdminClient();
    const body = { owner: 'fixture-owner', repository: 'repo', ref: 'main', path: '' };
    expect((await admin(client, 'PUT', `/plugins/${unknown}/source`, body)).status).toBe(401);
    expect((await admin(client, 'GET', '/audit')).status).toBe(401);
  });

  it('publishes only an approved version and lists the steps that apply', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const pluginId = await addPlugin('steps');
    const versions = {
      pending: await addVersion(pluginId, '1.0.0', 'pending'),
      rejected: await addVersion(pluginId, '1.1.0', 'rejected'),
      yanked: await addVersion(pluginId, '1.2.0', 'yanked'),
      approved: await addVersion(pluginId, '1.3.0', 'approved'),
      published: await addVersion(pluginId, '1.4.0', 'published'),
    };
    const actions = async (id: string) =>
      (
        (await (await admin(client, 'GET', `/plugin-versions/${id}`)).json()) as {
          actions: string[];
        }
      ).actions;

    expect(await actions(versions.pending)).toEqual(['approve', 'reject']);
    expect(await actions(versions.approved)).toEqual(['reject', 'publish']);
    expect(await actions(versions.rejected)).toEqual(['reopen']);
    expect(await actions(versions.yanked)).toEqual([]);
    expect(await actions(versions.published)).toEqual(['yank']);

    // Only an approved version can be published; every other state keeps to its own cycle.
    for (const id of [versions.pending, versions.rejected, versions.yanked, versions.published]) {
      const res = await admin(client, 'POST', `/plugin-versions/${id}/publish`);
      expect(res.status).toBe(409);
    }
    // A rejection made by mistake goes back to pending, and only a rejected version can be reopened.
    for (const id of [versions.pending, versions.approved, versions.yanked, versions.published]) {
      expect((await admin(client, 'POST', `/plugin-versions/${id}/reopen`)).status).toBe(409);
    }
    const reopened = await admin(client, 'POST', `/plugin-versions/${versions.rejected}/reopen`);
    expect(reopened.status).toBe(200);
    expect(await reopened.json()).toMatchObject({
      status: 'pending',
      actions: ['approve', 'reject'],
    });
    const res = await admin(client, 'POST', `/plugin-versions/${versions.approved}/publish`);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ status: 'published', actions: ['yank'] });

    const audit = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE action = 'plugin_version.published' AND target_id = ANY($1)`,
      [Object.values(versions)],
    );
    expect(audit.map((row) => (JSON.parse(row.context) as { from: string }).from)).toEqual([
      'approved',
    ]);
    await cleanup();
    await resetAdmin();
  });

  it('approves and publishes only the newest version of each plugin in bulk', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const fresh = await addPlugin('latest-fresh');
    const freshOld = await addVersion(fresh, '1.9.0', 'pending');
    const freshNew = await addVersion(fresh, '1.10.0', 'pending');
    const staged = await addPlugin('latest-staged');
    const stagedNew = await addVersion(staged, '2.0.0', 'approved');
    const live = await addPlugin('latest-live');
    await addVersion(live, '1.0.0', 'pending');
    await addVersion(live, '1.1.0', 'published');
    const turnedDown = await addPlugin('latest-rejected');
    await addVersion(turnedDown, '1.0.0', 'approved');
    await addVersion(turnedDown, '1.1.0', 'rejected');
    const empty = await addPlugin('latest-empty');

    const res = await admin(client, 'POST', '/plugins/bulk-publish-latest', {
      ids: [fresh, staged, live, turnedDown, empty, unknown],
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      published: { id: string; versionId: string; version: string }[];
      skipped: { id: string; reason: string }[];
    };
    expect(body.published).toEqual([
      { id: fresh, versionId: freshNew, version: '1.10.0' },
      { id: staged, versionId: stagedNew, version: '2.0.0' },
    ]);
    expect(body.skipped).toEqual([
      { id: live, reason: 'already_published' },
      { id: turnedDown, reason: 'not_reviewable' },
      { id: empty, reason: 'not_reviewable' },
      { id: unknown, reason: 'not_found' },
    ]);

    const statusOf = async (id: string) =>
      (await sql<{ status: string }>(`SELECT status FROM plugin_version WHERE id = $1`, [id]))[0]
        ?.status;
    expect(await statusOf(freshNew)).toBe('published');
    expect(await statusOf(stagedNew)).toBe('published');
    // Versions before the newest are left exactly as they were.
    expect(await statusOf(freshOld)).toBe('pending');
    const older = await sql<{ status: string }>(
      `SELECT status FROM plugin_version WHERE plugin_id = ANY($1) AND id <> ALL($2)`,
      [[live, turnedDown], [freshOld]],
    );
    expect(older.map((row) => row.status).sort()).toEqual([
      'approved',
      'pending',
      'published',
      'rejected',
    ]);

    const audit = await sql<{ action: string; target_id: string }>(
      `SELECT action, target_id FROM audit_log WHERE target_id = ANY($1) AND action LIKE 'plugin_version.%'`,
      [[freshNew, stagedNew]],
    );
    const forFresh = audit.filter((row) => row.target_id === freshNew).map((row) => row.action);
    expect(forFresh.sort()).toEqual(['plugin_version.approved', 'plugin_version.published']);
    expect(audit.filter((row) => row.target_id === stagedNew).map((row) => row.action)).toEqual([
      'plugin_version.published',
    ]);

    for (const bad of [{ ids: [] }, { ids: [fresh, fresh] }, { ids: ['nope'] }]) {
      expect((await admin(client, 'POST', '/plugins/bulk-publish-latest', bad)).status).toBe(400);
    }
    expect(
      (await admin(new AdminClient(), 'POST', '/plugins/bulk-publish-latest', { ids: [fresh] }))
        .status,
    ).toBe(401);
    await cleanup();
    await resetAdmin();
  });

  it('moves a plugin to another repository, branch or folder and queues a sync from there', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const sourceId = await addSource('old-folder', 'succeeded');
    const pluginId = await addPlugin('moved', sourceId);
    const target = { owner: 'fixture-owner', repository: 'edited', ref: 'v2', path: 'plugins/x' };

    const res = await admin(client, 'PUT', `/plugins/${pluginId}/source`, target);
    expect(res.status).toBe(200);
    const moved = (await res.json()) as { source: Record<string, unknown> };
    expect(moved.source).toMatchObject({ ...target, id: sourceId });
    expect(['queued', 'running', 'failed']).toContain(moved.source['lastStatus']);
    const queued = await sql<{ n: string }>(
      `SELECT count(*)::text AS n FROM plugin_ingestion WHERE source_id = $1`,
      [sourceId],
    );
    expect(queued[0]!.n).toBe('1');
    const audit = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE action = 'plugin_source.updated' AND target_id = $1`,
      [pluginId],
    );
    expect(JSON.parse(audit[0]!.context)).toMatchObject({
      from: { repository: 'repo', path: 'old-folder' },
      to: target,
    });

    const put = (body: unknown, id = pluginId) =>
      admin(client, 'PUT', `/plugins/${id}/source`, body);
    expect((await put({ ...target, owner: 'somebody-else' })).status).toBe(400);
    expect((await put({ ...target, path: '../up' })).status).toBe(400);
    expect((await put({ ...target, extra: true })).status).toBe(400);
    expect((await put(target, unknown)).status).toBe(404);
    await cleanup();
    await resetAdmin();
  });

  it('edits a source by its own id, with or without a plugin, and queues a sync', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const sourceId = await addSource('listed-folder', 'succeeded');
    const target = { owner: 'fixture-owner', repository: 'edited', ref: 'v3', path: 'lists/a' };
    const put = (body: unknown, id = sourceId) =>
      admin(client, 'PUT', `/plugin-sources/${id}`, body);

    const res = await put(target);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ...target, id: sourceId });
    const audit = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE action = 'plugin_source.updated' AND target_id = $1`,
      [sourceId],
    );
    expect(JSON.parse(audit[0]!.context)).toMatchObject({
      from: { repository: 'repo', path: 'listed-folder' },
      to: target,
    });

    // The sync it queued is still waiting or running, so another edit is refused.
    expect((await put({ ...target, ref: 'v4' })).status).toBe(409);
    expect(
      (await put({ ...target, owner: 'somebody-else' }, await addSource('x', 'succeeded'))).status,
    ).toBe(400);
    expect((await put(target, unknown)).status).toBe(404);
    await cleanup();
    await resetAdmin();
  });

  it('refuses a source edit while a sync runs or when the location is already used', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const target = { owner: 'fixture-owner', repository: 'edited', ref: 'main', path: 'taken' };
    const busy = await addPlugin('busy', await addSource('busy-folder', 'running'));
    expect((await admin(client, 'PUT', `/plugins/${busy}/source`, target)).status).toBe(409);

    await sql(
      `INSERT INTO plugin_source (id, owner, repository, ref, path, created_by)
       VALUES ($1, 'fixture-owner', 'edited', 'main', 'taken', 'test')`,
      [randomUUID()],
    );
    const idle = await addPlugin('idle', await addSource('idle-folder', 'succeeded'));
    expect((await admin(client, 'PUT', `/plugins/${idle}/source`, target)).status).toBe(409);
    await cleanup();
    await resetAdmin();
  });

  it('gives a plugin without a source, or sharing one, a source of its own', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const target = { owner: 'fixture-owner', repository: 'fresh', ref: 'main', path: '' };

    const bare = await addPlugin('bare');
    const created = await admin(client, 'PUT', `/plugins/${bare}/source`, target);
    expect(created.status).toBe(200);
    expect(await created.json()).toMatchObject({ source: target });

    const shared = await addSource('shared-folder', 'succeeded');
    const first = await addPlugin('first', shared);
    const second = await addPlugin('second', shared);
    const own = { ...target, repository: 'other' };
    const moved = await admin(client, 'PUT', `/plugins/${first}/source`, own);
    expect(moved.status).toBe(200);
    const rows = await sql<{ id: string; source_id: string }>(
      `SELECT id, source_id FROM plugin WHERE id = ANY($1)`,
      [[first, second]],
    );
    const sourceOf = (id: string) => rows.find((row) => row.id === id)?.source_id;
    expect(sourceOf(second)).toBe(shared);
    expect(sourceOf(first)).not.toBe(shared);
    const untouched = await sql<{ path: string }>(`SELECT path FROM plugin_source WHERE id = $1`, [
      shared,
    ]);
    expect(untouched[0]?.path).toBe('shared-folder');
    await cleanup();
    await resetAdmin();
  });

  it('lists the added sources with the plugin each produced', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const withPlugin = await addSource('with-plugin', 'succeeded');
    const plugin = await addPlugin('listed', withPlugin);
    const orphan = await addSource('no-plugin', 'failed');

    const res = await admin(client, 'GET', '/plugin-sources');
    const items = (
      (await res.json()) as {
        items: { id: string; plugin: { id: string; displayName: string; status: string } | null }[];
      }
    ).items;
    expect(items.find((item) => item.id === withPlugin)?.plugin).toMatchObject({
      id: plugin,
      displayName: 'Step listed',
      status: 'active',
    });
    expect(items.find((item) => item.id === orphan)?.plugin).toBeNull();
    await cleanup();
    await resetAdmin();
  });

  it('counts the components of every plugin highest published version', async () => {
    await cleanup();
    const client = await signedInAdmin();
    type Totals = {
      components: {
        total: number;
        byKind: Record<string, number>;
        pluginsByKind: Record<string, number>;
      };
    };
    const read = async () =>
      ((await (await admin(client, 'GET', '/stats')).json()) as Totals).components;
    const before = await read();
    expect(Object.keys(before.byKind).sort()).toEqual(['agent', 'hook', 'mcp', 'rule', 'skill']);

    const pluginId = await addPlugin('components');
    await addVersion(pluginId, '1.0.0', 'published', ['hook']);
    await addVersion(pluginId, '2.0.0', 'published', ['skill', 'skill', 'mcp']);
    await addVersion(pluginId, '3.0.0', 'pending', ['rule']);
    const after = await read();
    expect(after.byKind['skill']).toBeGreaterThanOrEqual((before.byKind['skill'] ?? 0) + 2);
    expect(after.byKind['mcp']).toBeGreaterThanOrEqual((before.byKind['mcp'] ?? 0) + 1);
    expect(after.pluginsByKind['skill']).toBeGreaterThanOrEqual(
      (before.pluginsByKind['skill'] ?? 0) + 1,
    );
    expect(after.total).toBeGreaterThanOrEqual(before.total + 3);
    await cleanup();
    await resetAdmin();
  });

  it('reads the audit log newest first, in pages, with filters', async () => {
    await cleanup();
    const client = await signedInAdmin();
    const actor = 'audit-fixture@example.test';
    const target = randomUUID();
    const seed = async (action: string, at: string, result = 'success', targetId = target) =>
      sql(
        `INSERT INTO audit_log (id, actor_id, actor_kind, action, target_kind, target_id, result, context, created_at)
         VALUES ($1, $2, 'platform_admin', $3, 'plugin', $4, $5, $6, $7)`,
        [randomUUID(), actor, action, targetId, result, JSON.stringify({ name: 'x' }), at],
      );
    // Three events share one instant, so a page boundary has to fall between equal times.
    await seed('plugin.updated', '2030-01-01T10:00:00.123456Z');
    await seed('plugin.flags_changed', '2030-01-01T10:00:00.123456Z');
    await seed('plugin.deprecated', '2030-01-01T10:00:00.123456Z');
    await seed('plugin_version.published', '2030-01-01T09:00:00Z', 'failure');
    await seed('plugin_version.rejected', '2030-01-01T08:00:00Z', 'success', randomUUID());

    type Page = {
      items: { id: string; action: string; at: string; context: { name: string } | null }[];
      nextCursor: string | null;
    };
    const page = async (query: string): Promise<{ status: number; body: Page }> => {
      const res = await admin(
        client,
        'GET',
        `/audit?actorId=${encodeURIComponent(actor)}&${query}`,
      );
      return { status: res.status, body: (await res.json()) as Page };
    };

    const seen: string[] = [];
    let cursor: string | null = null;
    for (let step = 0; step < 5; step += 1) {
      const next: { status: number; body: Page } = await page(
        `limit=2${cursor ? `&cursor=${cursor}` : ''}`,
      );
      expect(next.status).toBe(200);
      seen.push(...next.body.items.map((item) => item.id));
      cursor = next.body.nextCursor;
      if (!cursor) break;
    }
    expect(seen).toHaveLength(5);
    expect(new Set(seen).size).toBe(5);

    const all = await page('limit=100');
    const times = all.body.items.map((item) => item.at);
    expect(times).toEqual([...times].sort().reverse());
    expect(all.body.items[0]?.context).toEqual({ name: 'x' });
    expect(all.body.nextCursor).toBeNull();

    expect((await page('action=plugin_version.')).body.items).toHaveLength(2);
    expect((await page('action=plugin.updated')).body.items).toHaveLength(1);
    expect((await page('result=failure')).body.items).toHaveLength(1);
    expect((await page(`targetKind=plugin&targetId=${target}`)).body.items).toHaveLength(4);
    const window = 'since=2030-01-01T09:00:00.000Z&until=2030-01-01T10:00:00.000Z';
    expect((await page(window)).body.items).toHaveLength(1);
    expect((await page('limit=0')).status).toBe(400);
    expect((await page('cursor=not-a-cursor')).status).toBe(400);
    expect((await page('result=maybe')).status).toBe(400);
    await cleanup();
    await resetAdmin();
  });
});
