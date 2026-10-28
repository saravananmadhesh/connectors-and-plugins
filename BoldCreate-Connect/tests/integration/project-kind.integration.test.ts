/**
 * The two projects every organization starts with: the For You project is never listed, read,
 * changed or deleted through the Platform routes and has no project key.
 *
 * Run: pnpm test -- --only=integration
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { sql } from './signed-in-user.js';

let fx: OrgFixture;
let forYouId = '';
let kinds: string[] = [];
const admin = () => fx.users.admin;
const base = () => `/v1/orgs/${fx.orgId}/projects`;
const wire = (raw: string) => `prj_${raw.replaceAll('-', '')}`;

beforeAll(async () => {
  fx = await createOrgFixture('project-kind');
  const rawOrg = fx.orgId
    .replace(/^org_/, '')
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  const rows = await sql<{ id: string; kind: string }>(
    `SELECT id, kind FROM project WHERE organization_id = $1 ORDER BY kind`,
    [rawOrg],
  );
  kinds = rows.map((row) => row.kind);
  forYouId = wire(rows.find((row) => row.kind === 'for_you')?.id ?? '');
}, 120_000);

describe('the For You project', () => {
  it('exists beside the default Platform project from the start', () => {
    expect(kinds).toEqual(['for_you', 'platform']);
  });

  it('is not in the project list, which holds the default Platform project', async () => {
    const res = await callApi('GET', base(), admin());
    const names = ((await res.json()) as { items?: { name: string }[] }).items?.map((p) => p.name);
    expect(names).toEqual(['Default']);
  });

  it.each([
    ['GET', ''],
    ['PATCH', ''],
    ['DELETE', ''],
    ['GET', '/keys'],
    ['POST', '/keys'],
  ])('answers %s %s as not found', async (method, suffix) => {
    const body =
      method === 'PATCH'
        ? { name: 'Renamed' }
        : method === 'POST'
          ? {
              scopes: ['sessions:read'],
              expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
            }
          : undefined;
    const res = await callApi(method, `${base()}/${forYouId}${suffix}`, admin(), body);
    expect(res.status).toBe(404);
  });
});
