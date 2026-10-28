import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdInputSchema, IdSchema } from './ids.js';
import { VariableStatusSchema } from './variables.js';

/** Which version a project plugin runs: the one named, or the latest published one when absent. */
export const PutProjectPluginBodySchema = z.strictObject({
  versionId: IdSchema('pv').optional(),
});
export type PutProjectPluginBody = z.infer<typeof PutProjectPluginBodySchema>;

export const ProjectPluginResponseSchema = z.object({
  pluginId: IdSchema('plg'),
  name: z.string(),
  displayName: z.string(),
  versionId: IdSchema('pv'),
  version: z.string(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type ProjectPluginResponse = z.infer<typeof ProjectPluginResponseSchema>;

export const ProjectPluginPageSchema = PageSchema(ProjectPluginResponseSchema);

/** A tool an MCP server offers, as the gateway lists it. */
export const ProjectAuthConfigToolSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const AuthConfigModeSchema = z.enum(['dcr', 'oauth_client', 'shared_secret', 'user_form']);
export type AuthConfigMode = z.infer<typeof AuthConfigModeSchema>;
/** The modes a request may ask for; `user_form` waits for the hosted form. */
export const AuthConfigInputModeSchema = z.enum(['dcr', 'oauth_client', 'shared_secret']);
export const AuthConfigStatusSchema = z.enum(['active', 'disabled']);

/**
 * How the project's users sign in to one MCP server of a plugin. Values never appear: a secret
 * shows only whether it is set, and a variable only whether it has a value. `tools` is present only
 * for a key that may read tools. `callbackUrl` is the address to register at the provider.
 */
export const AuthConfigResponseSchema = z.object({
  id: IdSchema('acf'),
  componentId: IdSchema('cmp').nullable(),
  pluginId: IdSchema('plg'),
  pluginName: z.string(),
  serverName: z.string(),
  name: z.string(),
  authMode: AuthConfigModeSchema,
  isDefault: z.boolean(),
  status: AuthConfigStatusSchema,
  clientId: z.string().nullable(),
  clientSecretSet: z.boolean(),
  secretSet: z.boolean(),
  secretLastFour: z.string().nullable(),
  scopes: z.string().nullable(),
  callbackUrl: z.string(),
  variables: z.array(VariableStatusSchema),
  tools: z.array(ProjectAuthConfigToolSchema).optional(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type AuthConfigResponse = z.infer<typeof AuthConfigResponseSchema>;

export const AuthConfigPageSchema = PageSchema(AuthConfigResponseSchema);

/**
 * One MCP server of a plugin the project has added, whether or not it has an auth config yet, so
 * the console can ask for what the server needs. `variables` are the plugin's values for the
 * project (set or not, never shown); the config counts say how users sign in today.
 */
export const ProjectServerResponseSchema = z.object({
  componentId: IdSchema('cmp'),
  pluginId: IdSchema('plg'),
  pluginName: z.string(),
  pluginDisplayName: z.string(),
  serverName: z.string(),
  url: z.string().nullable(),
  variables: z.array(VariableStatusSchema),
  authConfigCount: z.number().int().min(0),
  defaultAuthConfigId: IdSchema('acf').nullable(),
});
export type ProjectServerResponse = z.infer<typeof ProjectServerResponseSchema>;

export const ProjectServerPageSchema = PageSchema(ProjectServerResponseSchema);

const AuthConfigNameSchema = z.string().trim().min(1).max(60);
const ClientIdSchema = z.string().trim().min(1).max(512);
const SecretValueSchema = z.string().min(1).max(8192);
const ScopesSchema = z.string().trim().max(1000);

/**
 * Makes an auth config for the MCP server a component stands for. The mode decides what it
 * carries: `oauth_client` a client id (and secret), `shared_secret` one secret every user shares,
 * `dcr` nothing, since the server registers a client itself.
 */
export const CreateAuthConfigBodySchema = z
  .strictObject({
    componentId: IdInputSchema('cmp'),
    name: AuthConfigNameSchema,
    authMode: AuthConfigInputModeSchema,
    isDefault: z.boolean().optional(),
    clientId: ClientIdSchema.optional(),
    clientSecret: SecretValueSchema.optional(),
    scopes: ScopesSchema.optional(),
    secret: SecretValueSchema.optional(),
  })
  .superRefine((body, ctx) => {
    const fail = (path: string, message: string) =>
      ctx.addIssue({ code: 'custom', path: [path], message });
    const oauth = body.authMode === 'oauth_client';
    if (oauth && body.clientId === undefined) fail('clientId', 'is required');
    if (!oauth && body.clientId !== undefined) fail('clientId', 'applies to oauth_client only');
    if (!oauth && body.clientSecret !== undefined) {
      fail('clientSecret', 'applies to oauth_client only');
    }
    if (body.authMode === 'shared_secret' && body.secret === undefined) {
      fail('secret', 'is required');
    }
    if (body.authMode !== 'shared_secret' && body.secret !== undefined) {
      fail('secret', 'applies to shared_secret only');
    }
    if (body.authMode === 'shared_secret' && body.scopes !== undefined) {
      fail('scopes', 'applies to OAuth modes only');
    }
  });
export type CreateAuthConfigBody = z.infer<typeof CreateAuthConfigBodySchema>;

/**
 * Changes an auth config; the mode and the component stay. A secret or client secret is write
 * only, and an empty `scopes` clears them. Changing the client or scopes of an OAuth config
 * leaves existing connections as they are: they keep the settings they were made with.
 */
export const UpdateAuthConfigBodySchema = z
  .strictObject({
    name: AuthConfigNameSchema.optional(),
    isDefault: z.boolean().optional(),
    status: AuthConfigStatusSchema.optional(),
    clientId: ClientIdSchema.optional(),
    clientSecret: SecretValueSchema.optional(),
    scopes: ScopesSchema.optional(),
    secret: SecretValueSchema.optional(),
  })
  .refine((body) => Object.keys(body).length > 0, { message: 'at least one field' });
export type UpdateAuthConfigBody = z.infer<typeof UpdateAuthConfigBodySchema>;

export const ProjectPluginParamsSchema = z.object({ pluginId: IdSchema('plg') });
export const ProjectAuthConfigParamsSchema = z.object({ authConfigId: IdSchema('acf') });
export const ProjectAuthConfigVariablesParamsSchema = z.object({ componentId: IdSchema('cmp') });

export const ConsoleProjectPluginParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
  pluginId: IdSchema('plg'),
});
export const ConsoleProjectAuthConfigParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
  authConfigId: IdSchema('acf'),
});
export const ConsoleProjectAuthConfigVariablesParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
  componentId: IdSchema('cmp'),
});

export const AuthConfigListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  componentId: IdInputSchema('cmp').optional(),
});
export type AuthConfigListQuery = z.infer<typeof AuthConfigListQuerySchema>;
