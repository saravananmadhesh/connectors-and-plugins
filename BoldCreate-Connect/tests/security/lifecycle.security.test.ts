/**
 * Who may suspend, demote, remove, invite or delete: those changes stay with admins, the policy
 * stays with admins and members, a viewer sees neither, and a user can only delete themselves.
 *
 * Run: pnpm test -- --only=security
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { ROUTES } from '../../packages/contracts/src/v1/routes.js';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { callApi, createOrgFixture, type OrgFixture } from '../integration/org-fixture.js';
import { sql, type SignedInUser } from '../integration/signed-in-user.js';

let fx: OrgFixture;
const wire = (user: SignedInUser) => formatId('usr', user.rawUserId);
const memberPath = (user: SignedInUser) => `/v1/orgs/${fx.orgId}/members/${wire(user)}`;

beforeAll(async () => {
  fx = await createOrgFixture('lifecycle');
}, 120_000);

describe('an organization admin', () => {
  it('can change the policy', async () => {
    const res = await callApi('PATCH', `/v1/orgs/${fx.orgId}/policy`, fx.users.admin, {
      allowPersonalApiKeys: true,
    });
    expect(res.status).toBe(200);
  });

  it('cannot name a role that does not exist, such as an owner', async () => {
    const { admin, member } = fx.users;
    expect((await callApi('PATCH', memberPath(member), admin, { role: 'OWNER' })).status).toBe(400);
    expect((await callApi('PATCH', memberPath(admin), admin, { role: 'OWNER' })).status).toBe(400);
  });

  it('has no route that hands the organization over: an admin makes another admin instead', () => {
    expect(ROUTES.some((route) => route.pathTemplate.includes('transfer-ownership'))).toBe(false);
  });
});

describe('an organization member', () => {
  it('cannot invite, change a role, suspend, remove or delete the organization', async () => {
    const { member, admin, viewer } = fx.users;
    const attempts: [string, string, unknown][] = [
      ['POST', `/v1/orgs/${fx.orgId}/invites`, { emails: ['x@example.com'], role: 'VIEWER' }],
      ['GET', `/v1/orgs/${fx.orgId}/invites`, undefined],
      ['PATCH', memberPath(viewer), { role: 'ADMIN' }],
      ['PATCH', memberPath(admin), { status: 'suspended' }],
      ['DELETE', memberPath(viewer), undefined],
      ['DELETE', `/v1/orgs/${fx.orgId}?confirmSlug=any`, undefined],
    ];
    for (const [method, path, body] of attempts) {
      const res = await callApi(method, path, member, body);
      expect(res.status, `${method} ${path}`).toBe(403);
    }
  });

  it('can read and change the policy and the organization', async () => {
    const read = await callApi('GET', `/v1/orgs/${fx.orgId}/policy`, fx.users.member);
    expect(read.status).toBe(200);
    const change = await callApi('PATCH', `/v1/orgs/${fx.orgId}/policy`, fx.users.member, {
      allowPersonalApiKeys: true,
    });
    expect(change.status).toBe(200);
  });
});

describe('an organization viewer', () => {
  it('cannot read the policy or the members, and cannot change anything', async () => {
    const { viewer, member } = fx.users;
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}/policy`, viewer)).status).toBe(404);
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}/members`, viewer)).status).toBe(404);
    const attempts: [string, string, unknown][] = [
      ['PATCH', `/v1/orgs/${fx.orgId}/policy`, { allowPersonalInstalls: false }],
      ['PATCH', `/v1/orgs/${fx.orgId}`, { name: 'Renamed' }],
      ['PATCH', memberPath(member), { role: 'ADMIN' }],
      ['POST', `/v1/orgs/${fx.orgId}/invites`, { emails: ['x@example.com'], role: 'VIEWER' }],
    ];
    for (const [method, path, body] of attempts) {
      const res = await callApi(method, path, viewer, body);
      expect(res.status, `${method} ${path}`).toBe(403);
    }
  });

  it('can read the organization itself', async () => {
    const res = await callApi('GET', `/v1/orgs/${fx.orgId}`, fx.users.viewer);
    expect(res.status).toBe(200);
  });
});

describe('a suspended member', () => {
  it('does not see the policy or the members', async () => {
    const { suspended } = fx.users;
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}/policy`, suspended)).status).toBe(404);
    expect((await callApi('GET', `/v1/orgs/${fx.orgId}/members`, suspended)).status).toBe(404);
  });
});

describe('user deletion', () => {
  it('has no way to name another user', () => {
    const route = ROUTES.find((r) => r.id === 'auth.deleteMe')!;
    expect(route.pathTemplate).toBe('/v1/auth/me');
    expect(route.params).toBeUndefined();
  });

  it('cannot delete another user by typing their address', async () => {
    const { member, admin } = fx.users;
    const res = await callApi(
      'DELETE',
      `/v1/auth/me?confirmEmail=${encodeURIComponent(admin.email)}`,
      member,
    );
    expect(res.status).toBe(422);
    const rows = await sql<{ status: string }>(`SELECT status FROM "user" WHERE id = $1`, [
      admin.rawUserId,
    ]);
    expect(rows[0]!.status).toBe('active');
    const own = await sql<{ status: string }>(`SELECT status FROM "user" WHERE id = $1`, [
      member.rawUserId,
    ]);
    expect(own[0]!.status).toBe('active');
  });
});
