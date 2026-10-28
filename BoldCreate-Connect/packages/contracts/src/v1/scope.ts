import * as z from 'zod/v4';
import { IdSchema } from './ids.js';

export const OrgRoleSchema = z.enum(['ADMIN', 'MEMBER', 'VIEWER']);
export type OrgRole = z.infer<typeof OrgRoleSchema>;

export const ScopeKindSchema = z.enum(['org', 'user', 'project']);
export type ScopeKind = z.infer<typeof ScopeKindSchema>;

export const KeyPermissionSchema = z.enum([
  'mcp:list',
  'mcp:call',
  'artifact:sync',
  'artifact:download',
  'plugin:install',
  /** A Platform organization key: acts with the role of the member who made it. */
  'org:manage',
]);
export type KeyPermission = z.infer<typeof KeyPermissionSchema>;

/** Path parameters of a scope: `/orgs/{orgId}`, `/orgs/{orgId}/me`. */
export const ScopePathParamsSchema = z.object({
  orgId: IdSchema('org'),
});
export type ScopePathParams = z.infer<typeof ScopePathParamsSchema>;

export const ScopeRefSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('org'), orgId: IdSchema('org') }),
  z.object({ kind: z.literal('user'), orgId: IdSchema('org'), userId: IdSchema('usr') }),
]);
export type ScopeRef = z.infer<typeof ScopeRefSchema>;
