import * as z from 'zod/v4';
import { IsoDateTimeSchema } from './common.js';
import { IdSchema } from './ids.js';

/**
 * The areas a scope names. `execute` is held only by session tokens, so no project key carries it.
 * `triggers` and `webhooks` are reserved names with no routes yet.
 */
export const PROJECT_SCOPE_AREAS = [
  'tools',
  'sessions',
  'execute',
  'connections',
  'auth-configs',
  'plugins',
  'observability',
] as const;
export type ProjectScopeArea = (typeof PROJECT_SCOPE_AREAS)[number];

/** What a project key may do. Each project route needs one of these. */
export const PROJECT_KEY_SCOPES = [
  'tools:read',
  'sessions:read',
  'sessions:write',
  'connections:read',
  'connections:write',
  'auth-configs:read',
  'auth-configs:write',
  'plugins:read',
  'plugins:write',
  'observability:read',
] as const;

/** What each scope allows, for the console's key form and the docs. */
export const PROJECT_KEY_SCOPE_INFO: Readonly<
  Record<
    (typeof PROJECT_KEY_SCOPES)[number],
    { label: string; description: string; destructive: boolean; preset: boolean }
  >
> = {
  'tools:read': {
    label: 'Read tools',
    description: 'List the tools of the project’s plugins',
    destructive: false,
    preset: true,
  },
  'sessions:read': {
    label: 'Read sessions and users',
    description: 'List users and sessions',
    destructive: false,
    preset: true,
  },
  'sessions:write': {
    label: 'Manage sessions and users',
    description: 'Create and end sessions, set a user’s display name',
    destructive: false,
    preset: true,
  },
  'connections:read': {
    label: 'Read connections',
    description: 'List the connections of users',
    destructive: false,
    preset: true,
  },
  'connections:write': {
    label: 'Manage connections',
    description: 'Disconnect a user’s connection',
    destructive: true,
    preset: true,
  },
  'auth-configs:read': {
    label: 'Read plugin settings',
    description: 'See which variables a plugin needs and whether they are set',
    destructive: false,
    preset: false,
  },
  'auth-configs:write': {
    label: 'Manage plugin settings',
    description: 'Set the variables a plugin needs',
    destructive: false,
    preset: false,
  },
  'plugins:read': {
    label: 'Read plugins',
    description: 'List the project’s plugins and the catalog',
    destructive: false,
    preset: true,
  },
  'plugins:write': {
    label: 'Manage plugins',
    description: 'Add, update and remove the project’s plugins',
    destructive: true,
    preset: false,
  },
  'observability:read': {
    label: 'Read logs',
    description: 'Read the project’s activity log',
    destructive: false,
    preset: true,
  },
};

/** The scopes the console offers by default for a host's server. */
export const PROJECT_KEY_SCOPE_PRESET = PROJECT_KEY_SCOPES.filter(
  (scope) => PROJECT_KEY_SCOPE_INFO[scope].preset,
);

export const ProjectKeyScopeSchema = z.enum(PROJECT_KEY_SCOPES);
export type ProjectKeyScope = z.infer<typeof ProjectKeyScopeSchema>;

export const ProjectStatusSchema = z.enum(['active', 'suspended', 'revoked']);

const ProjectNameSchema = z.string().trim().min(1).max(60);
const ReturnOriginsSchema = z.array(z.string().trim().min(1).max(200)).max(20);

export const CreateProjectBodySchema = z.strictObject({
  name: ProjectNameSchema,
  returnOrigins: ReturnOriginsSchema.optional(),
});
export type CreateProjectBody = z.infer<typeof CreateProjectBodySchema>;

export const UpdateProjectBodySchema = z
  .strictObject({
    name: ProjectNameSchema.optional(),
    returnOrigins: ReturnOriginsSchema.optional(),
    /** A manager can pause and resume a project; revoking one is deleting it. */
    status: z.enum(['active', 'suspended']).optional(),
  })
  .refine((body) => Object.keys(body).length > 0, { message: 'nothing to change' });
export type UpdateProjectBody = z.infer<typeof UpdateProjectBodySchema>;

export const CreateProjectKeyBodySchema = z.strictObject({
  scopes: z
    .array(ProjectKeyScopeSchema)
    .min(1)
    .max(PROJECT_KEY_SCOPES.length)
    .refine((scopes) => new Set(scopes).size === scopes.length, { message: 'duplicate scopes' }),
  /** Addresses the key may be used from, as CIDR blocks. Absent means any address. */
  allowedCidrs: z.array(z.string().trim().min(1).max(64)).min(1).max(20).optional(),
  /** Absent means the default lifetime (90 days); `null` means the key never expires. */
  expiresAt: IsoDateTimeSchema.nullable().optional(),
});
export type CreateProjectKeyBody = z.infer<typeof CreateProjectKeyBodySchema>;

export const ProjectParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
});
export const ProjectKeyParamsSchema = ProjectParamsSchema.extend({
  projectKeyId: IdSchema('pjk'),
});
export const OrgProjectsParamsSchema = z.object({ orgId: IdSchema('org') });

export const ProjectResponseSchema = z.object({
  id: IdSchema('prj'),
  organizationId: IdSchema('org'),
  name: z.string(),
  status: ProjectStatusSchema,
  returnOrigins: z.array(z.string()),
  activeKeyCount: z.number().int(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>;

export const ProjectKeyResponseSchema = z.object({
  id: IdSchema('pjk'),
  /** The public part of the key, `prk_` and 16 hex characters. */
  prefix: z.string(),
  lastFour: z.string(),
  scopes: z.array(ProjectKeyScopeSchema),
  allowedCidrs: z.array(z.string()).nullable(),
  /** Null for a key that never expires. */
  expiresAt: IsoDateTimeSchema.nullable(),
  revokedAt: IsoDateTimeSchema.nullable(),
  lastUsedAt: IsoDateTimeSchema.nullable(),
  lastUsedIp: z.string().nullable(),
  createdAt: IsoDateTimeSchema,
});
export type ProjectKeyResponse = z.infer<typeof ProjectKeyResponseSchema>;

/** Shown once, at creation; never stored for replay. */
export const ProjectKeyCreatedResponseSchema = ProjectKeyResponseSchema.extend({
  rawKey: z.string(),
});
export type ProjectKeyCreatedResponse = z.infer<typeof ProjectKeyCreatedResponseSchema>;

// ─── Return origins ───────────────────────────────────────────────────────────

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

/**
 * The origin (`https://host[:port]`) of a return address, or null when it is not acceptable: only
 * `https` origins, and `http` to a local host when `allowLocal`. No path, query, fragment or
 * credentials.
 */
export function normalizeReturnOrigin(raw: string, allowLocal: boolean): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.username !== '' || url.password !== '') return null;
  if (url.search !== '' || url.hash !== '') return null;
  if (url.pathname !== '/' && url.pathname !== '') return null;
  const local = LOCAL_HOSTS.has(url.hostname);
  if (url.protocol === 'https:') {
    // `https://localhost` is as local as `http://localhost`.
    if (local && !allowLocal) return null;
  } else if (url.protocol === 'http:') {
    if (!local || !allowLocal) return null;
  } else {
    return null;
  }
  return url.origin;
}
