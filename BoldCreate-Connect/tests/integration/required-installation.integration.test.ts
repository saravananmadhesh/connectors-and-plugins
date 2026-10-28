/**
 * Organization installs are enforced on the people below them. With three organization roles
 * every person who can install is an admin or a member, and each keeps an install of their own
 * next to the enforced one; a viewer cannot install or see installs at all.
 *
 * Run: pnpm test -- --only=integration
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { callApi, createOrgFixture, type OrgFixture } from './org-fixture.js';
import { seedPluginVersion } from './plugin-fixture.js';

let fx: OrgFixture;

const orgPath = () => `/v1/orgs/${fx.orgId}/installations`;
const mePath = () => `/v1/orgs/${fx.orgId}/me/installations`;

async function mine(user: OrgFixture['users']['member'], pluginVersionId: string) {
  const res = await callApi('POST', mePath(), user, { pluginVersionId });
  return { status: res.status, body: (await res.json()) as { id: string; active: boolean } };
}

async function isActive(user: OrgFixture['users']['member'], id: string): Promise<boolean> {
  const res = await callApi('GET', `${mePath()}/${id}`, user);
  return ((await res.json()) as { active: boolean }).active;
}

beforeAll(async () => {
  fx = await createOrgFixture('enforced-install');
});

describe('enforced installs', () => {
  it('rejects a requirement flag in the request', async () => {
    const { pluginVersionId } = await seedPluginVersion();
    const res = await callApi('POST', orgPath(), fx.users.admin, {
      pluginVersionId,
      required: true,
    });
    expect(res.status).toBe(400);
  });

  it('keeps the installs of admins and members when the organization enforces a plugin', async () => {
    const { pluginVersionId } = await seedPluginVersion();
    const member = await mine(fx.users.member, pluginVersionId);
    const lead = await mine(fx.users.admin, pluginVersionId);
    expect(member.status).toBe(201);
    expect(lead.status).toBe(201);

    const created = await callApi('POST', orgPath(), fx.users.admin, { pluginVersionId });
    expect(created.status).toBe(201);
    expect(((await created.json()) as { required: boolean }).required).toBe(true);

    expect(await isActive(fx.users.member, member.body.id)).toBe(true);
    expect(await isActive(fx.users.admin, lead.body.id)).toBe(true);
  });

  it('lets admins and members install for themselves after an enforce', async () => {
    const { pluginVersionId } = await seedPluginVersion();
    await callApi('POST', orgPath(), fx.users.admin, { pluginVersionId });
    for (const user of [fx.users.admin, fx.users.member]) {
      expect((await mine(user, pluginVersionId)).status).toBe(201);
    }
  });

  it('lets a member install for the organization', async () => {
    const { pluginVersionId } = await seedPluginVersion();
    expect((await callApi('POST', orgPath(), fx.users.member, { pluginVersionId })).status).toBe(
      201,
    );
  });

  it('gives a viewer no install at any scope, and does not show them the installs', async () => {
    const { pluginVersionId } = await seedPluginVersion();
    for (const path of [orgPath(), mePath()]) {
      expect((await callApi('POST', path, fx.users.viewer, { pluginVersionId })).status).toBe(404);
      expect((await callApi('GET', path, fx.users.viewer)).status).toBe(404);
    }
  });
});
