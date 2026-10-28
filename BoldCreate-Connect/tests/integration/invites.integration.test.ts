/**
 * Invites with an organization role, several addresses at once, and what accepting them creates.
 *
 * Requires the live stack (api, worker, Postgres, Mailpit).
 * Run: pnpm test -- --only=integration
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi } from './org-fixture.js';
import { createSignedInUser, mailToken, sql, type SignedInUser } from './signed-in-user.js';

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
