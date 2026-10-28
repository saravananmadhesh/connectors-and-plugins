/**
 * What the api lets each kind of member do: abilities per role, denials and their audit rows,
 * and the audit row of every mutation that leaves one.
 *
 * Run: pnpm test -- --only=integration
 */
import pg from 'pg';
import { beforeAll, describe, expect, it } from 'vitest';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { callApi, countAudit, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { databaseUrl } from './test-env.js';

interface OrgMe {
  role: string;
  abilities: string[];
}

let fx: OrgFixture;

async function me(kind: keyof OrgFixture['users']): Promise<OrgMe> {
  const res = await callApi('GET', `/v1/orgs/${fx.orgId}/me`, fx.users[kind]);
  expect(res.status).toBe(200);
  return (await res.json()) as OrgMe;
}

async function auditContexts(action: string): Promise<(string | null)[]> {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    const result = await client.query(`SELECT context FROM audit_log WHERE action = $1`, [action]);
    return result.rows.map((row: { context: string | null }) => row.context);
  } finally {
    await client.end();
  }
}

beforeAll(async () => {
  fx = await createOrgFixture('authz');
}, 120_000);

describe('abilities of the caller', () => {
  it('lists the admin-only actions for the admin and not for anyone else', async () => {
    const admin = await me('admin');
    expect(admin.role).toBe('ADMIN');
    expect(admin.abilities).toContain('org:delete');
    expect(admin.abilities).toContain('invite:create');
    expect(admin.abilities).toContain('member:update');

    const member = await me('member');
    expect(member.role).toBe('MEMBER');
    expect(member.abilities).toContain('org:update');
    expect(member.abilities).toContain('org-policy:update');
    expect(member.abilities).toContain('installation:list');
    expect(member.abilities).not.toContain('org:delete');
    expect(member.abilities).not.toContain('invite:create');
    expect(member.abilities).not.toContain('member:update');

    const viewer = await me('viewer');
    expect(viewer.role).toBe('VIEWER');
    expect(viewer.abilities).toContain('org:read');
    expect(viewer.abilities).toContain('project:read');
    for (const action of [
      'org-policy:read',
      'member:list',
      'installation:list',
      'project-key:read',
      'org:update',
      'invite:create',
    ]) {
      expect(viewer.abilities).not.toContain(action);
    }
  });

  it('never lists admin, workload or key-permission actions', async () => {
    const admin = await me('admin');
    const forbidden = admin.abilities.filter((a) => /^(admin|workload):|^(mcp|artifact):/.test(a));
    expect(forbidden).toEqual([]);
  });
});

describe('denials', () => {
  it('answers 403 for a visible action the viewer lacks and writes a permission.denied row', async () => {
    const viewer = fx.users.viewer;
    const before = await countAudit('permission.denied', viewer.rawUserId, fx.rawOrgId);
    const res = await callApi('PATCH', `/v1/orgs/${fx.orgId}`, viewer, { name: 'Renamed Org' });
    expect(res.status).toBe(403);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe('forbidden');
    expect(await countAudit('permission.denied', viewer.rawUserId, fx.rawOrgId)).toBe(before + 1);
  });

  it('answers 404 for another organization and records that as well', async () => {
    const stranger = fx.stranger;
    const before = await countAudit('permission.denied', stranger.rawUserId, fx.rawOrgId);
    const res = await callApi('GET', `/v1/orgs/${fx.orgId}`, stranger);
    expect(res.status).toBe(404);
    expect(await countAudit('permission.denied', stranger.rawUserId, fx.rawOrgId)).toBe(before + 1);
  });

  it('answers 404 without an audit row for an id that does not exist', async () => {
    const owner = fx.users.admin;
    const before = await countAudit('permission.denied', owner.rawUserId);
    const missing = formatId('ins', '00000000-0000-4000-8000-000000000000');
    const res = await callApi('GET', `/v1/orgs/${fx.orgId}/installations/${missing}`, owner);
    expect(res.status).toBe(404);
    expect(await countAudit('permission.denied', owner.rawUserId)).toBe(before);
  });

  it('does not write a denial row for a request that is allowed', async () => {
    const owner = fx.users.admin;
    const before = await countAudit('permission.denied', owner.rawUserId);
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}`, owner)).status).toBe(200);
    expect(await countAudit('permission.denied', owner.rawUserId)).toBe(before);
  });

  it('decides before the body is read: a viewer with an invalid body still gets 403', async () => {
    const res = await callApi('POST', `/v1/orgs/${fx.orgId}/projects`, fx.users.viewer, {
      nope: 1,
    });
    expect(res.status).toBe(403);
  });

  it('hides the organization settings and the For You data from a viewer', async () => {
    const viewer = fx.users.viewer;
    for (const path of [
      `/v1/orgs/${fx.orgId}/members`,
      `/v1/orgs/${fx.orgId}/installations`,
      `/v1/orgs/${fx.orgId}/api-keys`,
      `/v1/orgs/${fx.orgId}/me/installations`,
    ]) {
      expect((await callApi('GET', path, viewer)).status).toBe(404);
    }
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}`, viewer)).status).toBe(200);
  });

  it('lets a member manage the organization settings but not invite or change roles', async () => {
    const member = fx.users.member;
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}/policy`, member)).status).toBe(200);
    const target = formatId('usr', fx.users.viewer.rawUserId);
    const role = await callApi('PATCH', `/v1/orgs/${fx.orgId}/members/${target}`, member, {
      role: 'ADMIN',
    });
    expect(role.status).toBe(403);
    const invite = await callApi('POST', `/v1/orgs/${fx.orgId}/invites`, member, {
      emails: ['nobody@example.com'],
      role: 'VIEWER',
    });
    expect(invite.status).toBe(403);
    const remove = await callApi('DELETE', `/v1/orgs/${fx.orgId}/members/${target}`, member);
    expect(remove.status).toBe(403);
  });

  it('keeps deleting the organization to an admin', async () => {
    for (const user of [fx.users.member, fx.users.viewer]) {
      const res = await callApi('DELETE', `/v1/orgs/${fx.orgId}?confirmSlug=any`, user);
      expect(res.status).toBe(403);
    }
  });
});

describe('audit rows of mutations', () => {
  it('writes member.role_changed when an admin changes a role', async () => {
    const owner = fx.users.admin;
    const target = formatId('usr', fx.users.viewer.rawUserId);
    const changed = await callApi('PATCH', `/v1/orgs/${fx.orgId}/members/${target}`, owner, {
      role: 'ADMIN',
    });
    expect(changed.status).toBe(200);
    expect(await countAudit('member.role_changed', owner.rawUserId, fx.rawOrgId)).toBe(1);
  });

  it('lets an admin make another admin and refuses a role the contract does not know', async () => {
    const target = formatId('usr', fx.users.member.rawUserId);
    const owner = await callApi('PATCH', `/v1/orgs/${fx.orgId}/members/${target}`, fx.users.admin, {
      role: 'OWNER',
    });
    expect(owner.status).toBe(400);
    const promoted = await callApi(
      'PATCH',
      `/v1/orgs/${fx.orgId}/members/${target}`,
      fx.users.admin,
      {
        role: 'ADMIN',
      },
    );
    expect(promoted.status).toBe(200);
    const demoted = await callApi(
      'PATCH',
      `/v1/orgs/${fx.orgId}/members/${target}`,
      fx.users.admin,
      {
        role: 'MEMBER',
      },
    );
    expect(demoted.status).toBe(200);
  });

  it('writes invite.created and invite.revoked', async () => {
    const owner = fx.users.admin;
    const created = await callApi('POST', `/v1/orgs/${fx.orgId}/invites`, owner, {
      emails: [`authz-invitee-${Date.now()}@example.com`],
      role: 'ADMIN',
    });
    expect(created.status).toBe(201);
    const { results } = (await created.json()) as { results: { invite: { id: string } }[] };
    const invite = results[0]!.invite;
    expect(await countAudit('invite.created', owner.rawUserId, fx.rawOrgId)).toBe(1);
    const revoked = await callApi('DELETE', `/v1/orgs/${fx.orgId}/invites/${invite.id}`, owner);
    expect(revoked.status).toBe(204);
    expect(await countAudit('invite.revoked', owner.rawUserId, fx.rawOrgId)).toBe(1);
  });

  it('writes org.created for a new organization', async () => {
    const owner = fx.users.admin;
    const res = await callApi('POST', '/v1/orgs', owner, {
      name: 'Audit Org',
      slug: `authz-org-${Date.now()}`,
    });
    expect(res.status).toBe(201);
    expect(await countAudit('org.created', owner.rawUserId)).toBeGreaterThanOrEqual(1);
  });

  it('writes api_key.created and api_key.revoked at org scope and never the key', async () => {
    const owner = fx.users.admin;
    const created = await callApi('POST', `/v1/orgs/${fx.orgId}/api-keys`, owner, {
      name: 'Audit Key',
      permissions: ['mcp:list'],
    });
    expect(created.status).toBe(201);
    const key = (await created.json()) as { id: string; rawKey: string };
    expect(await countAudit('api_key.created', owner.rawUserId, fx.rawOrgId)).toBe(1);
    expect(JSON.stringify(await auditContexts('api_key.created'))).not.toContain(key.rawKey);
    const revoked = await callApi('DELETE', `/v1/orgs/${fx.orgId}/api-keys/${key.id}`, owner);
    expect(revoked.status).toBe(204);
    expect(await countAudit('api_key.revoked', owner.rawUserId, fx.rawOrgId)).toBe(1);
  });
});
