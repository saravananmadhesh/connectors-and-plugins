/** Fixtures for the project console pages: one signed-in member and the shapes the console lists. */
import type { Id } from '@boldcreate-integrations/contracts';
import type {
  MeResponse,
  ProjectKeyResponse,
  ProjectPluginResponse,
  ProjectResponse,
  ProjectUserResponse,
  SessionResponse,
} from '@/lib/api';

export const ORG_ID = 'org_1' as Id<'org'>;
export const PROJECT_ID = 'prj_1' as Id<'prj'>;
const NOW = new Date().toISOString();
const LATER = new Date(Date.now() + 30 * 86_400_000).toISOString();

export type TestRole = 'ADMIN' | 'MEMBER' | 'VIEWER';

export const meAs = (role: TestRole): MeResponse => ({
  user: {
    id: 'usr_me' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: NOW,
    status: 'active',
    createdAt: NOW,
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme',
      organizationSlug: 'acme',
      role,
      status: 'active',
    },
  ],
});

export const project = (over: Partial<ProjectResponse> = {}): ProjectResponse => ({
  id: PROJECT_ID,
  organizationId: ORG_ID,
  name: 'Storefront',
  status: 'active',
  returnOrigins: ['https://shop.example.com'],
  activeKeyCount: 1,
  createdAt: NOW,
  updatedAt: NOW,
  ...over,
});

export const key = (over: Partial<ProjectKeyResponse> = {}): ProjectKeyResponse => ({
  id: 'pjk_1' as Id<'pjk'>,
  prefix: 'prk_0123456789abcdef',
  lastFour: 'wxyz',
  scopes: ['tools:read', 'sessions:read'],
  allowedCidrs: null,
  expiresAt: LATER,
  revokedAt: null,
  lastUsedAt: null,
  lastUsedIp: null,
  createdAt: NOW,
  ...over,
});

export const projectUser = (over: Partial<ProjectUserResponse> = {}): ProjectUserResponse => ({
  id: 'usr_p1' as Id<'usr'>,
  userId: 'host-user-1',
  displayName: 'Grace',
  status: 'active',
  createdAt: NOW,
  lastSeenAt: NOW,
  sessionCount: 2,
  connectionCount: 1,
  lastSyncedAt: null,
  connectionsMissing: 0,
  ...over,
});

export const session = (over: Partial<SessionResponse> = {}): SessionResponse => ({
  id: 'pjs_1' as Id<'pjs'>,
  userId: 'host-user-1',
  plugins: ['alpha'],
  tools: { disableDestructive: true },
  authConfigs: [],
  status: 'active',
  createdAt: NOW,
  expiresAt: LATER,
  lastUsedAt: null,
  ...over,
});

export const projectPlugin = (
  over: Partial<ProjectPluginResponse> = {},
): ProjectPluginResponse => ({
  pluginId: 'plg_1' as Id<'plg'>,
  name: 'alpha',
  displayName: 'Alpha',
  versionId: 'pv_1' as Id<'pv'>,
  version: '1.0.0',
  createdAt: NOW,
  updatedAt: NOW,
  ...over,
});

export const page = <T>(items: T[], nextCursor: string | null = null) => ({ items, nextCursor });

/** The cache entries every project page starts from: who is signed in, and the project itself. */
export const baseData = (role: TestRole = 'ADMIN') => [
  { key: ['me'], data: meAs(role) },
  { key: ['org', ORG_ID, 'projects', PROJECT_ID], data: project() },
];
