import * as z from 'zod/v4';
import { KeyPermissionSchema, OrgRoleSchema, ScopeKindSchema } from './scope.js';
import type { KeyPermission } from './scope.js';

/** Customer actions, in `noun:verb` form. */
export const CUSTOMER_ACTIONS = [
  'org:read',
  'org:update',
  'org:delete',
  'org-policy:read',
  'org-policy:update',
  'member:list',
  'member:update',
  'member:remove',
  'member:leave',
  'invite:list',
  'invite:create',
  'invite:revoke',
  'invite:resend',
  'invite:accept',
  'plugin:read',
  'installation:list',
  'installation:read',
  'installation:create',
  'installation:update',
  'installation:delete',
  'installation:upgrade',
  'variable:read',
  'variable:write',
  'component:update',
  'mcp-server:list',
  'mcp-server:read',
  'mcp-server:create',
  'mcp-server:update',
  'mcp-server:delete',
  'mcp-server:test',
  'mcp-server:refresh-tools',
  'mcp-server:review-tools',
  'oauth-client:read',
  'oauth-client:write',
  'user-connection:read',
  'user-connection:write',
  'user-connection:delete',
  'user-connection:authorize',
  'api-key:list',
  'api-key:create',
  'api-key:rotate',
  'api-key:revoke',
  'api-key:update',
  'api-key:list-all',
  'api-key:revoke-any',
  'audit:read',
  'sync-status:read',
  'mcp:list',
  'mcp:call',
  'artifact:sync',
  'artifact:download',
  'project:read',
  'project:create',
  'project:update',
  'project:delete',
  'project-key:read',
  'project-key:create',
  'project-key:revoke',
  'project-user:delete',
  'project-webhook:read',
  'project-webhook:write',
  'project-plugin:read',
  'project-plugin:write',
  'project-session:read',
  'project-session:write',
  'project-connection:read',
  'project-connection:write',
  'plugin:install',
] as const;

export const ADMIN_ACTIONS = [
  'admin:source:read',
  'admin:source:write',
  'admin:ingestion:read',
  'admin:ingestion:retry',
  'admin:version:read',
  'admin:version:review',
  'admin:plugin:update',
  'admin:category:write',
  'admin:kill-switch:read',
  'admin:kill-switch:write',
  'admin:audit:read',
  'admin:org:read',
  'admin:impact:read',
] as const;

export const WORKLOAD_ACTIONS = ['workload:gateway-resolve', 'workload:gateway-write'] as const;

export const ActionSchema = z.enum([...CUSTOMER_ACTIONS, ...ADMIN_ACTIONS, ...WORKLOAD_ACTIONS]);
export type Action = z.infer<typeof ActionSchema>;

export const KeyPresetSchema = z.enum(['agent', 'read_only']);
export type KeyPreset = z.infer<typeof KeyPresetSchema>;

export const KEY_PRESET_PERMISSIONS: Record<KeyPreset, readonly KeyPermission[]> = {
  agent: ['mcp:list', 'mcp:call', 'artifact:sync', 'artifact:download'],
  read_only: ['mcp:list', 'artifact:sync'],
};

export const OrgStatusSchema = z.enum(['active', 'suspended']);
export type OrgStatus = z.infer<typeof OrgStatusSchema>;

/** A verified API key: what the gateway and the api act on. */
export const ApiKeyPrincipalSchema = z.object({
  kind: z.literal('api_key'),
  keyId: z.string(),
  orgId: z.string(),
  scope: ScopeKindSchema,
  userId: z.string().optional(),
  projectId: z.string().optional(),
  /** Plugin names a project user's session is limited to; absent or empty means no limit. */
  plugins: z.array(z.string()).optional(),
  /** The tool policy of a session: tools it may not see or call. */
  toolPolicy: z
    .object({
      disable: z.array(z.string()).optional(),
      disableDestructive: z.boolean().optional(),
    })
    .optional(),
  /** Auth configs a session names, keyed `<plugin uuid>/<server name>`; the rest use the project default. */
  authConfigs: z.record(z.string(), z.string()).optional(),
  preset: KeyPresetSchema,
  permissions: z.array(KeyPermissionSchema),
});

/**
 * Who is acting. Domain code works with plain uuids, so these are plain shapes and not wire
 * schemas. Every use case receives one of these and asks `authorize` before it acts.
 */
export const PrincipalSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('user_session'),
    userId: z.string(),
    sessionId: z.string(),
    orgId: z.string().optional(),
    orgRole: OrgRoleSchema.optional(),
    orgStatus: OrgStatusSchema.optional(),
  }),
  ApiKeyPrincipalSchema,
  z.object({ kind: z.literal('workload'), callerId: z.string() }),
  z.object({ kind: z.literal('platform_admin'), subject: z.string() }),
]);
export type Principal = z.infer<typeof PrincipalSchema>;
export type UserSessionPrincipal = Extract<Principal, { kind: 'user_session' }>;
export type ApiKeyPrincipal = Extract<Principal, { kind: 'api_key' }>;
