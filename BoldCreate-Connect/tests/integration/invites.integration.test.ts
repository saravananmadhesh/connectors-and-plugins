/**
 * Invites with an organization role, several addresses at once, and what accepting them creates.
 *
 * Requires the live stack (api, worker, Postgres, Mailpit).
 * Run: pnpm test -- --only=integration
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi } from './org-fixture.js';
import {
  apiPost,
  createSignedInUser,
  mailToken,
  sql,
  type SignedInUser,
} from './signed-in-user.js';

interface Outcome {
  email: string;
  status: 'invited' | 'already_member';
  invite: { id: string; role: string } | null;
}

let owner: SignedInUser;
let outsider: SignedInUser;
let invitee: SignedInUser;
let second: SignedInUser;
let adminInvitee: SignedInUser;
let memberInvitee: SignedInUser;
let viewerInvitee: SignedInUser;

const invitesPath = () => `/v1/orgs/${owner.orgId}/invites`;

async function invite(body: unknown, as: SignedInUser = owner) {
  return callApi('POST', `/v1/orgs/${owner.orgId}/invites`, as, body);
}

async function results(res: Response): Promise<Outcome[]> {
  expect(res.status).toBe(201);
  return ((await res.json()) as { results: Outcome[] }).results;
}

async function acceptFor(user: SignedInUser) {
  const token = await mailToken(user.email, 'invited');
  return callApi('POST', '/v1/invites/accept', user, { token });
}

const orgRole = async (user: SignedInUser) =>
  sql<{ role: string }>(
    `SELECT role FROM organization_member WHERE organization_id = $1 AND user_id = $2`,
    [owner.rawOrgId, user.rawUserId],
  );

beforeAll(async () => {
  [owner, outsider, invitee, second, adminInvitee, memberInvitee, viewerInvitee] =
    await Promise.all([
      createSignedInUser('invite-owner'),
      createSignedInUser('invite-outsider'),
      createSignedInUser('invite-invitee'),
      createSignedInUser('invite-second'),
      createSignedInUser('invite-admin'),
      createSignedInUser('invite-member'),
      createSignedInUser('invite-viewer'),
    ]);
}, 120_000);

describe('invite with an organization role', () => {
  it('invites several addresses at once and answers each one', async () => {
    const stranger = `nobody-${Date.now()}@example.com`;
    const out = await results(
      await invite({
        emails: [invitee.email, second.email.toUpperCase(), stranger, invitee.email],
        role: 'MEMBER',
      }),
    );
    expect(out.map((entry) => entry.email)).toEqual([invitee.email, second.email, stranger]);
    for (const entry of out) {
      expect(entry.status).toBe('invited');
      expect(entry.invite).toMatchObject({ role: 'MEMBER' });
    }
  });

  it('lists the pending invites with the role', async () => {
    const res = await callApi('GET', invitesPath(), owner);
    expect(res.status).toBe(200);
    const { items } = (await res.json()) as { items: { email: string; role: string }[] };
    const mine = items.find((item) => item.email === invitee.email);
    expect(mine).toMatchObject({ role: 'MEMBER' });
    expect(mine).not.toHaveProperty('teamId');
  });

  it('puts the person in the org when they accept', async () => {
    const res = await acceptFor(invitee);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ orgId: owner.orgId, role: 'MEMBER' });
    expect(await orgRole(invitee)).toEqual([{ role: 'MEMBER' }]);
  });

  it('answers already_member for someone who is in the org, whatever the role', async () => {
    for (const role of ['ADMIN', 'MEMBER', 'VIEWER']) {
      const out = await results(await invite({ emails: [invitee.email], role }));
      expect(out).toEqual([{ email: invitee.email, status: 'already_member', invite: null }]);
    }
    expect(await orgRole(invitee)).toEqual([{ role: 'MEMBER' }]);
  });

  it('makes an Admin of someone invited with the Admin role', async () => {
    const out = await results(await invite({ emails: [adminInvitee.email], role: 'ADMIN' }));
    expect(out[0]).toMatchObject({ status: 'invited' });
    expect(out[0]?.invite).toMatchObject({ role: 'ADMIN' });
    const res = await acceptFor(adminInvitee);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ orgId: owner.orgId, role: 'ADMIN' });
    expect(await orgRole(adminInvitee)).toEqual([{ role: 'ADMIN' }]);
  });

  it.each([
    ['Member', () => memberInvitee],
    ['Viewer', () => viewerInvitee],
  ] as const)('makes a %s of someone invited with that role', async (label, who) => {
    const person = who();
    const role = label.toUpperCase();
    const out = await results(await invite({ emails: [person.email], role }));
    expect(out[0]).toMatchObject({ status: 'invited' });
    expect(out[0]?.invite).toMatchObject({ role });
    const res = await acceptFor(person);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ orgId: owner.orgId, role });
    expect(await orgRole(person)).toEqual([{ role }]);
  });

  it('writes an audit event for each invite', async () => {
    const [count] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log
        WHERE org_id = $1 AND action = 'invite.created'`,
      [owner.rawOrgId],
    );
    expect(count!.n).toBeGreaterThanOrEqual(4);
  });
});

describe('resending an invite', () => {
  it('mails a new link, retires the old one and writes an audit event', async () => {
    const person = await createSignedInUser('invite-resend');
    const out = await results(await invite({ emails: [person.email], role: 'VIEWER' }));
    const inviteId = out[0]!.invite!.id;
    const first = await mailToken(person.email, 'invited');

    const resend = await callApi('POST', `${invitesPath()}/${inviteId}/resend`, owner);
    expect(resend.status).toBe(202);

    let second = first;
    for (let attempt = 0; attempt < 40 && second === first; attempt++) {
      await new Promise<void>((done) => setTimeout(done, 500));
      second = await mailToken(person.email, 'invited');
    }
    expect(second).not.toBe(first);

    expect((await callApi('POST', '/v1/invites/accept', person, { token: first })).status).toBe(
      400,
    );
    expect((await callApi('POST', '/v1/invites/accept', person, { token: second })).status).toBe(
      200,
    );
    const [audit] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM audit_log WHERE org_id = $1 AND action = 'invite.resent'`,
      [owner.rawOrgId],
    );
    expect(audit!.n).toBe(1);
  });
});

describe('invite lifecycle', () => {
  const expire = (inviteId: string) =>
    sql(`UPDATE email_token SET expires_at = now() - interval '1 minute' WHERE id = $1`, [
      inviteId.replace(/^inv_/, ''),
    ]);

  it('keeps an expired invite listed, refuses its link, and lets the sender resend it', async () => {
    const person = await createSignedInUser('invite-expired');
    const out = await results(await invite({ emails: [person.email], role: 'MEMBER' }));
    const inviteId = out[0]!.invite!.id;
    const link = await mailToken(person.email, 'invited');
    await expire(out[0]!.invite!.id);

    const listed = (await (await callApi('GET', invitesPath(), owner)).json()) as {
      items: { id: string; expiresAt: string }[];
    };
    const row = listed.items.find((item) => item.id === inviteId);
    expect(row).toBeDefined();
    expect(new Date(row!.expiresAt).getTime()).toBeLessThan(Date.now());

    expect((await callApi('POST', '/v1/invites/accept', person, { token: link })).status).toBe(400);
    expect((await callApi('POST', `${invitesPath()}/${inviteId}/resend`, owner)).status).toBe(202);
  });

  it('replaces the earlier link when the same address is invited again', async () => {
    const person = await createSignedInUser('invite-twice');
    await results(await invite({ emails: [person.email], role: 'VIEWER' }));
    await results(await invite({ emails: [person.email], role: 'VIEWER' }));
    const listed = (await (await callApi('GET', invitesPath(), owner)).json()) as {
      items: { email: string }[];
    };
    expect(listed.items.filter((item) => item.email === person.email)).toHaveLength(1);
  });

  it('closes an invite once it is revoked or accepted', async () => {
    const person = await createSignedInUser('invite-closed');
    const out = await results(await invite({ emails: [person.email], role: 'VIEWER' }));
    const inviteId = out[0]!.invite!.id;
    expect((await callApi('DELETE', `${invitesPath()}/${inviteId}`, owner)).status).toBe(204);
    expect((await callApi('DELETE', `${invitesPath()}/${inviteId}`, owner)).status).toBe(404);
    expect((await callApi('POST', `${invitesPath()}/${inviteId}/resend`, owner)).status).toBe(404);
  });
});

describe('looking an invite up before sign-in', () => {
  const preview = async (token: string) =>
    (await (await apiPost('/v1/invites/preview', { token })).json()) as {
      state: string;
      email: string | null;
      registered: boolean | null;
    };

  it('says whether the invited address is already registered', async () => {
    const stranger = `preview-new-${Date.now()}@example.com`;
    const known = await createSignedInUser('invite-preview-known');
    await results(await invite({ emails: [stranger, known.email], role: 'VIEWER' }));
    expect(await preview(await mailToken(stranger, 'invited'))).toMatchObject({
      state: 'valid',
      email: stranger,
      registered: false,
    });
    expect(await preview(await mailToken(known.email, 'invited'))).toMatchObject({
      state: 'valid',
      registered: true,
    });
  });

  it('answers the same for a link that never existed and for one that was revoked', async () => {
    const nothing = { state: 'unavailable', email: null, registered: null };
    expect(await preview('no-such-token')).toMatchObject(nothing);
    const email = `preview-revoked-${Date.now()}@example.com`;
    const out = await results(await invite({ emails: [email], role: 'VIEWER' }));
    const token = await mailToken(email, 'invited');
    await callApi('DELETE', `${invitesPath()}/${out[0]!.invite!.id}`, owner);
    expect(await preview(token)).toMatchObject(nothing);
  });
});

describe('signing up from an invite', () => {
  const PASSWORD = 'a-long-test-password-1';
  const signup = (email: string, extra: Record<string, unknown> = {}) =>
    apiPost('/v1/auth/signup', {
      email,
      password: PASSWORD,
      displayName: 'Invited Person',
      ...extra,
    });
  const signin = (email: string) => apiPost('/v1/auth/signin', { email, password: PASSWORD });

  it('verifies the address at sign-up, sends no verification mail, and lets the person sign in', async () => {
    const email = `from-invite-${Date.now()}@example.com`;
    await results(await invite({ emails: [email], role: 'MEMBER' }));
    const token = await mailToken(email, 'invited');

    expect((await signup(email, { inviteToken: token })).status).toBe(201);
    const [user] = await sql<{ verified: boolean }>(
      `SELECT email_verified_at IS NOT NULL AS verified FROM "user" WHERE email_normalized = $1`,
      [email],
    );
    expect(user?.verified).toBe(true);
    const [tokens] = await sql<{ n: number }>(
      `SELECT count(*)::int AS n FROM email_token t JOIN "user" u ON u.id = t.target_user_id
        WHERE u.email_normalized = $1 AND t.purpose = 'verification'`,
      [email],
    );
    expect(tokens!.n).toBe(0);

    const res = await signin(email);
    expect(res.status).toBe(200);
    const { sessionToken } = (await res.json()) as { sessionToken: string };
    // No organization of their own: signing in does not create a starter one.
    const memberships = () =>
      sql<{ n: number }>(
        `SELECT count(*)::int AS n FROM organization_member m JOIN "user" u ON u.id = m.user_id
          WHERE u.email_normalized = $1`,
        [email],
      );
    expect((await memberships())[0]!.n).toBe(0);
    const accepted = await apiPost('/v1/invites/accept', { token }, sessionToken);
    expect(accepted.status).toBe(200);
    expect((await memberships())[0]!.n).toBe(1);
  });

  it('does not verify an address the invite was not sent to', async () => {
    const sentTo = `sent-to-${Date.now()}@example.com`;
    const email = `other-${Date.now()}@example.com`;
    await results(await invite({ emails: [sentTo], role: 'VIEWER' }));
    const token = await mailToken(sentTo, 'invited');
    expect((await signup(email, { inviteToken: token })).status).toBe(201);
    expect((await signin(email)).status).toBe(401);
  });

  it('takes over an address someone registered without verifying', async () => {
    const email = `pre-registered-${Date.now()}@example.com`;
    expect((await signup(email)).status).toBe(201);
    expect((await signin(email)).status).toBe(401);
    await results(await invite({ emails: [email], role: 'VIEWER' }));
    const token = await mailToken(email, 'invited');

    const mine = 'the-real-owners-password-9';
    const res = await apiPost('/v1/auth/signup', {
      email,
      password: mine,
      displayName: 'Real Owner',
      inviteToken: token,
    });
    expect(res.status).toBe(201);
    expect((await signin(email)).status).toBe(401);
    expect((await apiPost('/v1/auth/signin', { email, password: mine })).status).toBe(200);
  });

  it('answers a verified address with a conflict and leaves it alone', async () => {
    const res = await signup(second.email, { inviteToken: 'whatever' });
    expect(res.status).toBe(409);
    expect(
      (await apiPost('/v1/auth/signin', { email: second.email, password: PASSWORD })).status,
    ).toBe(401);
  });
});

describe('what an invite refuses', () => {
  it.each([
    ['a team in the body', { emails: ['a@example.com'], role: 'MEMBER', teamId: 'team_x' }],
    ['Team Admin', { emails: ['a@example.com'], role: 'TEAM_ADMIN' }],
    ['Team Member', { emails: ['a@example.com'], role: 'TEAM_MEMBER' }],
    ['Team Viewer', { emails: ['a@example.com'], role: 'TEAM_VIEWER' }],
    ['Org Member', { emails: ['a@example.com'], role: 'ORG_MEMBER' }],
    ['Owner', { emails: ['a@example.com'], role: 'OWNER' }],
    ['no address', { emails: [], role: 'ADMIN' }],
    ['a bad address', { emails: ['nope'], role: 'ADMIN' }],
    ['the old single address', { email: 'a@example.com', role: 'ADMIN' }],
  ])('answers 400 for %s', async (_label, body) => {
    const res = await invite(body);
    expect(res.status).toBe(400);
  });

  it('answers 400 for more than fifty addresses', async () => {
    const emails = Array.from({ length: 51 }, (_, i) => `bulk-${i}-${Date.now()}@example.com`);
    expect((await invite({ emails, role: 'ADMIN' })).status).toBe(400);
  });

  it('is for admins only', async () => {
    const res = await invite({ emails: ['x@example.com'], role: 'MEMBER' }, invitee);
    expect(res.status).toBe(403);
    const member = await invite({ emails: ['x@example.com'], role: 'VIEWER' }, memberInvitee);
    expect(member.status).toBe(403);
    const viewer = await invite({ emails: ['x@example.com'], role: 'VIEWER' }, viewerInvitee);
    expect(viewer.status).toBe(403);
    const stranger = await invite({ emails: ['x@example.com'], role: 'MEMBER' }, outsider);
    expect(stranger.status).toBe(404);
  });
});
