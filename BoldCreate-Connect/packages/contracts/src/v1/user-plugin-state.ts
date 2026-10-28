import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdSchema } from './ids.js';
import { ConnectionStatusSchema } from './project-connections.js';
import { ProjectUserRefSchema } from './project-users.js';
import { ProjectParamsSchema } from './projects.js';
import { PutVariablesBodySchema } from './variables.js';

/** What a user still has to do before one MCP server of a plugin can be used. */
export const UserPluginSetupSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('none') }),
  /** The server asks for a sign-in and the user has no active one. */
  z.object({ kind: z.literal('connect') }),
  /** Required variables that have no stored value. */
  z.object({ kind: z.literal('variables'), names: z.array(z.string()) }),
  /** The project has no auth config for the component; only the host can fix it. */
  z.object({ kind: z.literal('auth_config_missing') }),
]);
export type UserPluginSetup = z.infer<typeof UserPluginSetupSchema>;

/** The user's sign-in to one server. The tokens never appear. */
export const UserPluginConnectionSchema = z.object({
  id: IdSchema('ucn'),
  status: ConnectionStatusSchema,
  expiresAt: IsoDateTimeSchema.nullable(),
  connectedAt: IsoDateTimeSchema,
});
export type UserPluginConnection = z.infer<typeof UserPluginConnectionSchema>;

export const UserPluginComponentSchema = z.object({
  componentId: IdSchema('cmp'),
  kind: z.string(),
  name: z.string(),
  enabled: z.boolean(),
});

/** A variable of the install: whether a value is stored, never the value. */
export const UserPluginVariableSchema = z.object({
  name: z.string(),
  secret: z.boolean(),
  isSet: z.boolean(),
});

export const UserPluginMcpSchema = z.object({
  componentId: IdSchema('cmp'),
  serverName: z.string(),
  /** The auth config the server uses; null until the project has configs of its own. */
  authConfigId: z.string().nullable(),
  authMode: z.enum(['none', 'api_key', 'oauth_dcr', 'oauth_client']),
  setup: UserPluginSetupSchema,
  /** True only when `setup` is `none`. */
  ready: z.boolean(),
  /** Left out for a key without `connections:read`; null when the user has not signed in. */
  connection: UserPluginConnectionSchema.nullable().optional(),
});

/**
 * One plugin a project user has, whether the project provides it or the user installed it, with
 * everything a marketplace page needs to draw it. Values never appear.
 */
export const UserPluginStateSchema = z.object({
  pluginId: IdSchema('plg'),
  name: z.string(),
  displayName: z.string(),
  source: z.enum(['user', 'project']),
  /** True only for an install the user made; a project plugin is removed by the host. */
  removable: z.boolean(),
  versionId: IdSchema('pv'),
  version: z.string(),
  /** The newest published, unblocked version of the same major; equal to `versionId` when none. */
  latestVersionId: IdSchema('pv'),
  updateAvailable: z.boolean(),
  installedAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
  components: z.array(UserPluginComponentSchema),
  variables: z.array(UserPluginVariableSchema),
  mcp: z.array(UserPluginMcpSchema),
});
export type UserPluginState = z.infer<typeof UserPluginStateSchema>;

export const UserPluginStateResponseSchema = UserPluginStateSchema;
export const UserPluginStatePageSchema = PageSchema(UserPluginStateSchema);

/** The host gives a user their own values for a plugin the user installed. */
export const PutUserPluginVariablesBodySchema = PutVariablesBodySchema.extend({
  userId: ProjectUserRefSchema,
});
export type PutUserPluginVariablesBody = z.infer<typeof PutUserPluginVariablesBodySchema>;

export const PutUserPluginComponentBodySchema = z.strictObject({
  userId: ProjectUserRefSchema,
  enabled: z.boolean(),
});
export type PutUserPluginComponentBody = z.infer<typeof PutUserPluginComponentBodySchema>;

/** The same two writes by a session's own user; the token names the user. */
export const PutSessionPluginComponentBodySchema = z.strictObject({ enabled: z.boolean() });
export type PutSessionPluginComponentBody = z.infer<typeof PutSessionPluginComponentBodySchema>;

export const UserPluginComponentParamsSchema = z.object({
  pluginId: IdSchema('plg'),
  componentId: IdSchema('cmp'),
});
export const UserPluginVariablesParamsSchema = z.object({ pluginId: IdSchema('plg') });

/** Console: one project user's plugins, addressed by the platform's id for the user. */
export const ConsoleUserPluginsParamsSchema = ProjectParamsSchema.extend({
  projectUserId: IdSchema('usr'),
});
