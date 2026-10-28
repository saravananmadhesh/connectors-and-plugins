/**
 * Flows that start before a tenant is known, running against the real app roles with row-level
 * security enforced: starter organizations that collide on a name, a slug another tenant holds,
 * and organization lists that show only the caller's own.
 *
 * Run: pnpm test -- --only=integration
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { apiGet, apiPost, createSignedInUser, sql, type SignedInUser } from './signed-in-user.js';

let first: SignedInUser;
let second: SignedInUser;
let outsider: SignedInUser;

beforeAll(async () => {
  // The same label gives both users the same display name, so their starter slugs collide.
  first = await createSignedInUser('tenant-flow');
  second = await createSignedInUser('tenant-flow');
  outsider = await createSignedInUser('tenant-flow-outsider');
}, 120_000);

describe('starter organizations', () => {
  it('gets a free slug when another tenant already holds the first choice', async () => {
    const slugs = await sql<{ slug: string }>(
      `SELECT slug FROM organization WHERE id = ANY($1::uuid[])`,
      [[first.rawOrgId, second.rawOrgId]],
    );
    expect(slugs).toHaveLength(2);
    expect(new Set(slugs.map((row) => row.slug)).size).toBe(2);
  });
});

describe('organization creation and listing', () => {
  it('answers 409 conflict for a slug that a tenant the caller cannot see holds', async () => {
    const taken = await sql<{ slug: string }>(`SELECT slug FROM organization WHERE id = $1`, [
      first.rawOrgId,
    ]);
    const res = await apiPost(
      '/v1/orgs',
      { name: 'Slug Thief', slug: taken[0]!.slug },
      outsider.sessionToken,
    );
    expect(res.status).toBe(409);
    expect(((await res.json()) as { error: { code: string } }).error.code).toBe('conflict');
  });

  it('lists only the organizations the caller belongs to', async () => {
    const res = await apiGet('/v1/orgs', outsider.sessionToken);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { items: Array<{ id: string }> };
    expect(body.items.map((org) => org.id)).toEqual([outsider.orgId]);
  });

  it('shows a caller no other organization by id', async () => {
    const res = await apiGet(`/v1/orgs/${first.orgId}`, outsider.sessionToken);
    expect(res.status).toBe(404);
  });
});
