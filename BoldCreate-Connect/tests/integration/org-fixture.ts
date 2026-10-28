/**
 * An organization with one member of every kind of access, for tests of who may do what.
 *
 * The admin signs up and gets the starter organization. Everyone else signs up too and is added
 * to that organization by SQL, so the roles are exactly the stored ones.
 */
import { randomUUID } from 'node:crypto';
import pg from 'pg';
import { apiUrl, databaseUrl } from './test-env.js';
import { createSignedInUser, workloadHeaders, type SignedInUser } from './signed-in-user.js';

export type Kind = 'admin' | 'member' | 'viewer' | 'suspended';

export interface OrgFixture {
  /** Wire and row ids of the organization. */
  orgId: string;
  rawOrgId: string;
  users: Record<Kind, SignedInUser>;
  /** An unrelated user with an organization of their own. */
  stranger: SignedInUser;
}

async function addMember(
  client: pg.Client,
  orgId: string,
  user: SignedInUser,
  orgRole: 'ADMIN' | 'MEMBER' | 'VIEWER',
): Promise<void> {
  await client.query(
    `INSERT INTO organization_member (organization_id, user_id, role) VALUES ($1, $2, $3)`,
    [orgId, user.rawUserId, orgRole],
  );
}

export async function createOrgFixture(label: string): Promise<OrgFixture> {
  const [admin, member, viewer, suspended, stranger] = await Promise.all(
    ['admin', 'member', 'viewer', 'suspended', 'stranger'].map((kind) =>
      createSignedInUser(`${label}-${kind}`),
    ),
  );
  if (!admin || !member || !viewer || !suspended || !stranger) {
    throw new Error('fixture users missing');
  }

  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    const org = admin.rawOrgId;
    await addMember(client, org, member, 'MEMBER');
    await addMember(client, org, viewer, 'VIEWER');
    await addMember(client, org, suspended, 'MEMBER');
    await client.query(
      `UPDATE organization_member SET status = 'suspended'
       WHERE organization_id = $1 AND user_id = $2`,
      [org, suspended.rawUserId],
    );
  } finally {
    await client.end();
  }

  return {
    orgId: admin.orgId,
    rawOrgId: admin.rawOrgId,
    users: { admin, member, viewer, suspended },
    stranger,
  };
}

/** Calls the api as the web backend would, with the user's session. */
export function callApi(
  method: string,
  path: string,
  user: Pick<SignedInUser, 'sessionToken'>,
  body?: unknown,
  extraHeaders: Record<string, string> = {},
): Promise<Response> {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      'x-session-token': user.sessionToken,
      ...(method === 'POST' ? { 'idempotency-key': randomUUID() } : {}),
      ...extraHeaders,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

/** Counts audit rows with the given action for an actor, straight from the database. */
export async function countAudit(action: string, actorId: string, orgId?: string): Promise<number> {
  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();
  try {
    const result = await client.query(
      `SELECT count(*)::int AS n FROM audit_log
       WHERE action = $1 AND actor_id = $2 AND ($3::uuid IS NULL OR org_id = $3::uuid)`,
      [action, actorId, orgId ?? null],
    );
    return (result.rows[0] as { n: number }).n;
  } finally {
    await client.end();
  }
}
