/**
 * Test fixtures for what the server says a member may do. Pages gate on these ability names, so
 * a test states the role of the member and gets the abilities the server would list for it.
 */
import type { Id, MeResponse, OrgMeResponse } from '@boldcreate-integrations/contracts';

type Role = 'ADMIN' | 'MEMBER' | 'VIEWER';

/** What every role reads: the organization itself and the Platform projects. */
const VIEWER_READ = [
  'org:read',
  'member:leave',
  'project:read',
  'project-plugin:read',
  'project-session:read',
  'project-connection:read',
];
/** What an admin and a member read on top: the settings and the For You data. */
const MANAGER_READ = [
  'org-policy:read',
  'member:list',
  'installation:list',
  'project-key:read',
  'project-webhook:read',
];
/** What an admin and a member change. */
const MANAGE = [
  'org:update',
  'org-policy:update',
  'installation:create',
  'api-key:create',
  'project:create',
  'project:update',
  'project:delete',
  'project-key:create',
  'project-key:revoke',
  'project-user:delete',
  'project-webhook:write',
  'project-plugin:write',
  'project-session:write',
  'project-connection:write',
];
/** What only an admin does: members, invites and deleting the organization. */
const ADMIN_ONLY = [
  'org:delete',
  'member:update',
  'member:remove',
  'invite:list',
  'invite:create',
  'invite:revoke',
  'invite:resend',
];
export function orgMeFor(userId: string, role: Role): OrgMeResponse {
  const manager = role !== 'VIEWER';
  return {
    userId: userId as Id<'usr'>,
    role,
    abilities: [
      ...VIEWER_READ,
      ...(manager ? [...MANAGER_READ, ...MANAGE] : []),
      ...(role === 'ADMIN' ? ADMIN_ONLY : []),
    ],
    policy: {
      allowPersonalInstalls: true,
      allowPersonalApiKeys: true,
      allowedKeyPresets: ['agent', 'read_only'],
      maxPersonalKeyExpiryDays: null,
      updatedAt: null,
    },
  };
}

type Seed = { key: unknown[]; data: unknown };

/**
 * For every membership of a seeded `['me']` entry that has no `['org', id, 'me']` entry yet,
 * derives one from the member's role.
 */
export function withDerivedOrgMe(queryData: Seed[]): Seed[] {
  const me = queryData.find((seed) => seed.key.length === 1 && seed.key[0] === 'me')?.data as
    | MeResponse
    | undefined;
  if (!me || !Array.isArray(me.memberships)) return queryData;
  const derived: Seed[] = [];
  for (const membership of me.memberships) {
    const key = ['org', membership.organizationId, 'me'];
    const present = queryData.some((seed) => JSON.stringify(seed.key) === JSON.stringify(key));
    if (!present) {
      derived.push({ key, data: orgMeFor(me.user.id, membership.role) });
    }
  }
  return [...queryData, ...derived];
}
