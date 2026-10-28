/**
 * Membership, policy and deletion rules against the live api and a real Postgres: concurrent
 * changes that must keep an admin, the key cap, suspension, the organization
 * policy, role changes, user deletion and the starter organization under concurrency.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { formatId } from '../../packages/contracts/src/v1/ids.js';
import { seedPluginVersion } from './plugin-fixture.js';
import { callApi, countAudit } from './org-fixture.js';
import {
  TEST_PASSWORD,
  apiPost,
  createSignedInUser,
  sql,
  verificationToken,
  type SignedInUser,
} from './signed-in-user.js';
import { apiUrl } from './test-env.js';
import { workloadHeaders } from './signed-in-user.js';

type Role = 'ADMIN' | 'MEMBER' | 'VIEWER';

interface SeededOrg {
  rawOrgId: string;
  orgId: string;
}

/** An organization with the given members, created by SQL so the roles are exactly as stated. */
async function seedOrg(
  members: { user: SignedInUser; role: Role; since?: string }[],
): Promise<SeededOrg> {
  const rawOrgId = randomUUID();
  const creator = members[0]!.user.rawUserId;
  await sql(
    `INSERT INTO organization (id, name, slug, created_by, key_state)
     VALUES ($1, $2, $3, $4, 'ready')`,
    [rawOrgId, `Lifecycle ${rawOrgId.slice(0, 8)}`, `lc-${rawOrgId.slice(0, 18)}`, creator],
  );
  for (const [index, member] of members.entries()) {
    await sql(
      `INSERT INTO organization_member (organization_id, user_id, role, created_at)
       VALUES ($1, $2, $3, $4)`,
      [rawOrgId, member.user.rawUserId, member.role, member.since ?? `2025-01-0${index + 1}`],
    );
  }
  return { rawOrgId, orgId: formatId('org', rawOrgId) };
}

const wireUser = (user: SignedInUser) => formatId('usr', user.rawUserId);

async function errorCode(res: Response): Promise<string | undefined> {
  const body = (await res.json().catch(() => ({}))) as { error?: { code?: string } };
  return body.error?.code;
}

async function activeAdmins(rawOrgId: string): Promise<number> {
  const rows = await sql<{ n: number }>(
    `SELECT count(*)::int AS n FROM organization_member
     WHERE organization_id = $1 AND role = 'ADMIN' AND status = 'active'`,
    [rawOrgId],
  );
  return rows[0]!.n;
}

let alice: SignedInUser;
let bob: SignedInUser;
let carol: SignedInUser;
let dave: SignedInUser;
let erin: SignedInUser;

beforeAll(async () => {
  [alice, bob, carol, dave, erin] = (await Promise.all(
    ['alice', 'bob', 'carol', 'dave', 'erin'].map((name) => createSignedInUser(`life-${name}`)),
  )) as [SignedInUser, SignedInUser, SignedInUser, SignedInUser, SignedInUser];
}, 180_000);

describe('admins', () => {
  it('keeps an admin through concurrent role changes and leave requests', async () => {
    for (let round = 0; round < 20; round++) {
      const org = await seedOrg([
        { user: alice, role: 'ADMIN' },
        { user: bob, role: 'ADMIN' },
        { user: carol, role: 'MEMBER' },
      ]);
      const results = await Promise.all([
        callApi('PATCH', `/v1/orgs/${org.orgId}/members/${wireUser(carol)}`, alice, {
          role: 'VIEWER',
        }),
        callApi('DELETE', `/v1/orgs/${org.orgId}/members/${wireUser(bob)}`, bob),
        callApi('DELETE', `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`, alice),
      ]);
      for (const res of results) expect(res.status, `round ${round}`).toBeLessThan(500);
      expect(await activeAdmins(org.rawOrgId), `round ${round}`).toBeGreaterThanOrEqual(1);
    }
  }, 180_000);

  it('lets exactly one of two admins demote the other', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: bob, role: 'ADMIN' },
    ]);
    const results = await Promise.all([
      callApi('PATCH', `/v1/orgs/${org.orgId}/members/${wireUser(bob)}`, alice, {
        role: 'MEMBER',
      }),
      callApi('PATCH', `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`, bob, {
        role: 'MEMBER',
      }),
    ]);
    const statuses = results.map((res) => res.status).sort();
    // The second request either sees the demotion already (403) or meets the last admin (409).
    expect(statuses[0]).toBe(200);
    expect([403, 409]).toContain(statuses[1]);
    expect(await activeAdmins(org.rawOrgId)).toBe(1);
  });

  it('refuses to let the last admin leave', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: bob, role: 'ADMIN' },
    ]);
    const leave = await callApi(
      'DELETE',
      `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`,
      alice,
    );
    expect(leave.status).toBe(204);
    const sole = await callApi('DELETE', `/v1/orgs/${org.orgId}/members/${wireUser(bob)}`, bob);
    expect(sole.status).toBe(409);
    expect(await errorCode(sole)).toBe('last_admin_required');
  });

  it('lets an admin make another active member an admin, and nobody else change a role', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: carol, role: 'MEMBER' },
      { user: dave, role: 'VIEWER' },
    ]);
    const stranger = await callApi(
      'PATCH',
      `/v1/orgs/${org.orgId}/members/${wireUser(erin)}`,
      alice,
      { role: 'ADMIN' },
    );
    expect(stranger.status).toBe(404);

    for (const actor of [carol, dave]) {
      const denied = await callApi(
        'PATCH',
        `/v1/orgs/${org.orgId}/members/${wireUser(actor === carol ? dave : carol)}`,
        actor,
        { role: 'ADMIN' },
      );
      expect(denied.status).toBe(403);
    }

    const ok = await callApi('PATCH', `/v1/orgs/${org.orgId}/members/${wireUser(carol)}`, alice, {
      role: 'ADMIN',
    });
    expect(ok.status).toBe(200);
    const roles = await sql<{ user_id: string; role: string }>(
      `SELECT user_id, role FROM organization_member WHERE organization_id = $1`,
      [org.rawOrgId],
    );
    expect(roles.find((r) => r.user_id === alice.rawUserId)?.role).toBe('ADMIN');
    expect(roles.find((r) => r.user_id === carol.rawUserId)?.role).toBe('ADMIN');
    expect(await countAudit('member.role_changed', alice.rawUserId, org.rawOrgId)).toBe(1);
    expect(await activeAdmins(org.rawOrgId)).toBe(2);
  });
});

describe('organization key cap', () => {
  it('lets 12 concurrent creates through exactly 10 times', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: dave, role: 'MEMBER' },
    ]);
    const results = await Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        callApi('POST', `/v1/orgs/${org.orgId}/api-keys`, alice, {
          name: `Cap key ${i}`,
          permissions: ['mcp:list'],
        }),
      ),
    );
    const statuses = results.map((res) => res.status);
    expect(statuses.filter((status) => status === 201)).toHaveLength(10);
    const refused = results.filter((res) => res.status === 409);
    expect(refused).toHaveLength(2);
    for (const res of refused) expect(await errorCode(res)).toBe('api_key_quota_exceeded');
    const rows = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM api_key WHERE organization_id = $1 AND principal_user_id = $2`,
      [org.rawOrgId, alice.rawUserId],
    );
    expect(rows[0]!.n).toBe(10);
  }, 60_000);
});

describe('suspension', () => {
  it('makes a suspended member a non-member until reinstated', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: dave, role: 'MEMBER' },
    ]);
    const member = `/v1/orgs/${org.orgId}/members/${wireUser(dave)}`;

    const suspend = await callApi('PATCH', member, alice, { status: 'suspended' });
    expect(suspend.status).toBe(200);
    expect(((await suspend.json()) as { status: string }).status).toBe('suspended');

    const orgRead = await callApi('GET', `/v1/orgs/${org.orgId}`, dave);
    expect(orgRead.status).toBe(404);
    const me = await callApi('GET', '/v1/auth/me', dave);
    expect(me.status).toBe(200);
    const { memberships } = (await me.json()) as {
      memberships: { organizationId: string; status: string }[];
    };
    expect(memberships.find((m) => m.organizationId === org.orgId)?.status).toBe('suspended');
    expect(await countAudit('member.suspended', alice.rawUserId, org.rawOrgId)).toBe(1);

    const reinstate = await callApi('PATCH', member, alice, { status: 'active' });
    expect(reinstate.status).toBe(200);
    expect((await callApi('GET', `/v1/orgs/${org.orgId}`, dave)).status).toBe(200);
    expect(await countAudit('member.reinstated', alice.rawUserId, org.rawOrgId)).toBe(1);
  });

  it('refuses to suspend yourself or the last active admin', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: bob, role: 'ADMIN' },
    ]);
    const self = await callApi('PATCH', `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`, alice, {
      status: 'suspended',
    });
    expect(self.status).toBe(403);

    const suspendBob = await callApi(
      'PATCH',
      `/v1/orgs/${org.orgId}/members/${wireUser(bob)}`,
      alice,
      { status: 'suspended' },
    );
    expect(suspendBob.status).toBe(200);
    const demote = await callApi(
      'PATCH',
      `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`,
      alice,
      { role: 'MEMBER' },
    );
    expect(demote.status).toBe(409);
    expect(await errorCode(demote)).toBe('last_admin_required');
  });

  it('needs a role or a status', async () => {
    const org = await seedOrg([{ user: alice, role: 'ADMIN' }]);
    const res = await callApi(
      'PATCH',
      `/v1/orgs/${org.orgId}/members/${wireUser(alice)}`,
      alice,
      {},
    );
    expect(res.status).toBe(400);
  });
});

describe('organization policy', () => {
  it('is read and changed by admins and members, and closed to a viewer', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: dave, role: 'MEMBER' },
      { user: carol, role: 'VIEWER' },
    ]);
    const hidden = await callApi('GET', `/v1/orgs/${org.orgId}/policy`, carol);
    expect(hidden.status).toBe(404);
    const read = await callApi('GET', `/v1/orgs/${org.orgId}/policy`, dave);
    expect(read.status).toBe(200);
    expect(await read.json()).toEqual({
      allowPersonalInstalls: true,
      allowPersonalApiKeys: true,
      allowedKeyPresets: ['agent', 'read_only'],
      maxPersonalKeyExpiryDays: null,
      updatedAt: null,
    });

    const denied = await callApi('PATCH', `/v1/orgs/${org.orgId}/policy`, carol, {
      allowPersonalInstalls: false,
    });
    expect(denied.status).toBe(403);

    const changed = await callApi('PATCH', `/v1/orgs/${org.orgId}/policy`, alice, {
      allowPersonalInstalls: false,
      maxPersonalKeyExpiryDays: 30,
    });
    expect(changed.status).toBe(200);
    expect(await changed.json()).toMatchObject({
      allowPersonalInstalls: false,
      allowPersonalApiKeys: true,
      maxPersonalKeyExpiryDays: 30,
    });
    const audit = await sql<{ context: string }>(
      `SELECT context FROM audit_log WHERE action = 'org.updated' AND org_id = $1`,
      [org.rawOrgId],
    );
    expect(audit).toHaveLength(1);
    expect(JSON.parse(audit[0]!.context)).toEqual({
      changed: ['allowPersonalInstalls', 'maxPersonalKeyExpiryDays'],
    });

    const me = await callApi('GET', `/v1/orgs/${org.orgId}/me`, dave);
    expect(
      ((await me.json()) as { policy: { allowPersonalInstalls: boolean } }).policy,
    ).toMatchObject({ allowPersonalInstalls: false });

    const empty = await callApi('PATCH', `/v1/orgs/${org.orgId}/policy`, alice, {});
    expect(empty.status).toBe(400);
  });

  it('switches personal installs off and on', async () => {
    const org = await seedOrg([
      { user: alice, role: 'ADMIN' },
      { user: dave, role: 'MEMBER' },
    ]);
    const { pluginVersionId } = await seedPluginVersion();
    const install = () =>
      callApi('POST', `/v1/orgs/${org.orgId}/me/installations`, dave, { pluginVersionId });

    await callApi('PATCH', `/v1/orgs/${org.orgId}/policy`, alice, {
      allowPersonalInstalls: false,
      allowPersonalApiKeys: false,
    });
    const noInstall = await install();
    expect(noInstall.status).toBe(403);
    expect(await errorCode(noInstall)).toBe('personal_installs_disabled');

    await callApi('PATCH', `/v1/orgs/${org.orgId}/policy`, alice, {
      allowPersonalInstalls: true,
      allowPersonalApiKeys: true,
    });
    expect((await install()).status).toBe(201);
  });
});

describe('user deletion', () => {
  it('leaves, purges and tombstones, and refuses a sole admin with other members', async () => {
    const solo = await createSignedInUser('life-solo');
    const { pluginVersionId } = await seedPluginVersion();
    const shared = await seedOrg([
      { user: alice, role: 'ADMIN', since: '2024-01-01' },
      { user: bob, role: 'ADMIN', since: '2024-06-01' },
      { user: solo, role: 'MEMBER', since: '2025-01-01' },
      { user: erin, role: 'MEMBER', since: '2025-02-01' },
    ]);

    await sql(
      `INSERT INTO api_key (id, key_id, secret_hash, principal_user_id, organization_id, scope,
         created_by, name, last_four, permissions)
       VALUES ($1, $2, 'hash', $3, $4, 'org', $3, 'Leaving key', 'abcd', ARRAY['mcp:list'])`,
      [
        randomUUID(),
        `fyk_${randomUUID().replaceAll('-', '').slice(0, 16)}`,
        solo.rawUserId,
        shared.rawOrgId,
      ],
    );
    expect(
      (
        await callApi('POST', `/v1/orgs/${shared.orgId}/me/installations`, solo, {
          pluginVersionId,
        })
      ).status,
    ).toBe(201);

    const wrong = await callApi('DELETE', '/v1/auth/me?confirmEmail=nobody@example.com', solo);
    expect(wrong.status).toBe(422);
    expect(await errorCode(wrong)).toBe('confirmation_mismatch');

    const res = await callApi(
      'DELETE',
      `/v1/auth/me?confirmEmail=${encodeURIComponent(solo.email.toUpperCase())}`,
      solo,
    );
    expect(res.status).toBe(202);
    expect(await res.json()).toMatchObject({ status: 'deletion_pending' });

    const keys = await sql<{ revoked_at: string | null }>(
      `SELECT revoked_at FROM api_key WHERE principal_user_id = $1`,
      [solo.rawUserId],
    );
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) expect(key.revoked_at).not.toBeNull();
    const installs = await sql(`SELECT 1 FROM installation WHERE user_id = $1`, [solo.rawUserId]);
    expect(installs).toHaveLength(0);
    const starter = await sql(`SELECT 1 FROM organization WHERE id = $1`, [solo.rawOrgId]);
    expect(starter).toHaveLength(0);
    const memberships = await sql(`SELECT 1 FROM organization_member WHERE user_id = $1`, [
      solo.rawUserId,
    ]);
    expect(memberships).toHaveLength(0);

    const [user] = await sql<{
      status: string;
      email: string;
      email_normalized: string;
      display_name: string;
      deleted_at: string | null;
    }>(
      `SELECT status, email, email_normalized, display_name, deleted_at FROM "user" WHERE id = $1`,
      [solo.rawUserId],
    );
    const tombstone = `deleted-${solo.rawUserId.replaceAll('-', '')}@deleted.invalid`;
    expect(user).toMatchObject({
      status: 'deleted',
      email: tombstone,
      email_normalized: tombstone,
      display_name: 'Deleted user',
    });
    expect(user!.deleted_at).not.toBeNull();
    expect(await sql(`SELECT 1 FROM auth_identity WHERE user_id = $1`, [solo.rawUserId])).toEqual(
      [],
    );
    expect(await countAudit('user.deleted', solo.rawUserId)).toBe(1);
    expect(await countAudit('org.deleted', solo.rawUserId, solo.rawOrgId)).toBe(1);

    const signIn = await apiPost('/v1/auth/signin', { email: solo.email, password: TEST_PASSWORD });
    expect(signIn.status).toBe(401);
    expect(await errorCode(signIn)).toBe('invalid_credentials');
    expect((await callApi('GET', '/v1/auth/me', solo)).status).toBe(401);
  }, 90_000);

  it('refuses while the user is the only admin of an organization with other members', async () => {
    const org = await seedOrg([
      { user: erin, role: 'ADMIN' },
      { user: dave, role: 'MEMBER' },
    ]);
    const res = await callApi(
      'DELETE',
      `/v1/auth/me?confirmEmail=${encodeURIComponent(erin.email)}`,
      erin,
    );
    expect(res.status).toBe(409);
    expect(await errorCode(res)).toBe('last_admin_required');
    expect((await callApi('GET', `/v1/orgs/${org.orgId}`, erin)).status).toBe(200);
  });
});

describe('starter organization', () => {
  it('is created once when the same verification token is used twice at the same time', async () => {
    const email = `life-verify-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const signup = await apiPost('/v1/auth/signup', {
      email,
      password: TEST_PASSWORD,
      displayName: 'Verify Twice',
    });
    expect(signup.status).toBe(201);
    const token = await verificationToken(email);

    const verify = () =>
      fetch(`${apiUrl}/v1/auth/verify-email`, {
        method: 'POST',
        headers: workloadHeaders,
        body: JSON.stringify({ token }),
      });
    const results = await Promise.all([verify(), verify()]);
    expect(results.map((res) => res.status).sort()).toEqual([200, 400]);
    const failed = results.find((res) => res.status === 400)!;
    expect(await errorCode(failed)).toBe('token_invalid_or_expired');

    const orgs = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM organization o
       JOIN "user" u ON u.id = o.created_by WHERE u.email_normalized = $1`,
      [email],
    );
    expect(orgs[0]!.n).toBe(1);
  }, 60_000);

  it('is created at sign-in for a verified user who never got one, with both projects', async () => {
    const email = `life-signin-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const signup = await apiPost('/v1/auth/signup', {
      email,
      password: TEST_PASSWORD,
      displayName: 'Late Starter',
    });
    expect(signup.status).toBe(201);
    await sql(`UPDATE "user" SET email_verified_at = now() WHERE email_normalized = $1`, [email]);

    const signin = () => apiPost('/v1/auth/signin', { email, password: TEST_PASSWORD });
    const results = await Promise.all([signin(), signin()]);
    expect(results.map((res) => res.status)).toEqual([200, 200]);

    const orgs = await sql<{ id: string }>(
      `SELECT o.id FROM organization o JOIN "user" u ON u.id = o.created_by
       WHERE u.email_normalized = $1`,
      [email],
    );
    expect(orgs).toHaveLength(1);
    const members = await sql<{ role: string }>(
      `SELECT m.role FROM organization_member m WHERE m.organization_id = $1`,
      [orgs[0]!.id],
    );
    expect(members).toEqual([{ role: 'ADMIN' }]);
    const projects = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM project WHERE organization_id = $1`,
      [orgs[0]!.id],
    );
    expect(projects[0]!.n).toBe(2);
  }, 60_000);
});
