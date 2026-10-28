/**
 * Platform organization keys (`plk_`): who may make one, what it reaches, and that it acts with
 * the role of the member who made it.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql, workloadHeaders } from './signed-in-user.js';
import { apiUrl } from './test-env.js';

let fx: OrgFixture;

beforeAll(async () => {
  fx = await createOrgFixture('platform-keys');
});

async function makeKey(
  user: { sessionToken: string },
  kind: 'platform' | 'foryou',
  permissions: string[] = kind === 'platform' ? ['org:manage'] : ['mcp:list'],
): Promise<{ status: number; rawKey?: string; id?: string }> {
  const res = await callApi('POST', `/v1/orgs/${fx.orgId}/api-keys`, user, {
    kind,
    name: `${kind} key ${randomUUID().slice(0, 6)}`,
    permissions,
  });
  if (res.status !== 201) return { status: res.status };
  const body = (await res.json()) as { rawKey: string; id: string };
  return { status: res.status, rawKey: body.rawKey, id: body.id };
}

function withKey(key: string, method: string, path: string, body?: unknown): Promise<Response> {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      authorization: `Bearer ${key}`,
      ...(method === 'POST' ? { 'idempotency-key': randomUUID() } : {}),
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

describe('who makes a Platform key', () => {
  it('lets an admin and a member make one, and refuses a viewer', async () => {
    const admin = await makeKey(fx.users.admin, 'platform');
    expect(admin.status).toBe(201);
    expect(admin.rawKey).toMatch(/^plk_/);
    expect((await makeKey(fx.users.member, 'platform')).status).toBe(201);
    expect([403, 404]).toContain((await makeKey(fx.users.viewer, 'platform')).status);
    expect((await makeKey(fx.stranger, 'platform')).status).toBeGreaterThanOrEqual(403);
  });

  it('keeps the For You key to admins and refuses the wrong permission list', async () => {
    expect((await makeKey(fx.users.member, 'foryou')).status).toBe(403);
    expect((await makeKey(fx.users.admin, 'platform', ['mcp:list'])).status).toBe(400);
    expect((await makeKey(fx.users.admin, 'foryou', ['org:manage'])).status).toBe(400);
  });
});

describe('what a Platform key reaches', () => {
  it('manages the organization with an admin key', async () => {
    const { rawKey } = await makeKey(fx.users.admin, 'platform');
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(200);
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}/members`)).status).toBe(200);
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}/projects`)).status).toBe(200);
  });

  it('answers 401 on routes that are not listed, and for a For You key', async () => {
    const { rawKey } = await makeKey(fx.users.admin, 'platform');
    expect((await withKey(rawKey!, 'GET', '/v1/orgs')).status).toBe(401);
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}/api-keys`)).status).toBe(401);
    const forYou = await makeKey(fx.users.admin, 'foryou');
    expect((await withKey(forYou.rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(401);
  });

  it('does not reach another organization', async () => {
    const { rawKey } = await makeKey(fx.users.admin, 'platform');
    const [other] = await sql<{ id: string }>(
      `SELECT id FROM organization WHERE id <> $1 LIMIT 1`,
      [fx.rawOrgId],
    );
    const { formatId } = await import('../../packages/contracts/src/v1/ids.js');
    const res = await withKey(rawKey!, 'GET', `/v1/orgs/${formatId('org', other!.id)}`);
    expect(res.status).toBe(404);
  });
});

describe('the role a Platform key acts with', () => {
  it('stops a member key at admin-only actions', async () => {
    const { rawKey } = await makeKey(fx.users.member, 'platform');
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(200);
    expect((await withKey(rawKey!, 'DELETE', `/v1/orgs/${fx.orgId}?confirmSlug=x`)).status).toBe(
      403,
    );
    const { formatId } = await import('../../packages/contracts/src/v1/ids.js');
    const target = formatId('usr', fx.users.viewer.rawUserId);
    const change = await withKey(rawKey!, 'PATCH', `/v1/orgs/${fx.orgId}/members/${target}`, {
      role: 'ADMIN',
    });
    expect(change.status).toBe(403);
  });

  it('follows the maker: a maker who becomes a viewer or leaves loses the key', async () => {
    const { rawKey } = await makeKey(fx.users.member, 'platform');
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(200);
    await sql(
      `UPDATE organization_member SET role = 'VIEWER' WHERE organization_id = $1 AND user_id = $2`,
      [fx.rawOrgId, fx.users.member.rawUserId],
    );
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(401);
    await sql(
      `UPDATE organization_member SET role = 'MEMBER' WHERE organization_id = $1 AND user_id = $2`,
      [fx.rawOrgId, fx.users.member.rawUserId],
    );
  });

  it('stops working once revoked', async () => {
    const { rawKey, id } = await makeKey(fx.users.admin, 'platform');
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(200);
    const res = await callApi('DELETE', `/v1/orgs/${fx.orgId}/api-keys/${id}`, fx.users.admin);
    expect(res.status).toBe(204);
    expect((await withKey(rawKey!, 'GET', `/v1/orgs/${fx.orgId}`)).status).toBe(401);
  });
});
