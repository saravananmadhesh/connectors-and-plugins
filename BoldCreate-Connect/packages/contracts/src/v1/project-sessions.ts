import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdInputSchema, IdSchema } from './ids.js';
import { PluginListItemResponseSchema } from './marketplace.js';
import { ProjectUserRefSchema } from './project-users.js';
import { ProjectParamsSchema } from './projects.js';

/** A tool as `<server>.<tool>`, the server name as the gateway shows it. */
export const ToolRefSchema = z
  .string()
  .min(3)
  .max(130)
  .regex(/^[a-z0-9-]+\.[A-Za-z0-9_-]+$/, 'must be <server>.<tool>');

/** What a session may not do with the tools of the servers it reaches. */
export const ToolPolicySchema = z.strictObject({
  disable: z.array(ToolRefSchema).max(50).optional(),
  /** Hides every tool whose server marks it destructive. */
  disableDestructive: z.boolean().optional(),
});
export type ToolPolicy = z.infer<typeof ToolPolicySchema>;

export const CreateSessionBodySchema = z.strictObject({
  userId: ProjectUserRefSchema,
  /** Plugin names or ids the session is limited to; absent means everything the user can see. */
  plugins: z.array(z.string().min(1).max(100)).max(100).optional(),
  /** A plugin set of the project, named; its plugins are added to `plugins`. */
  set: z.string().trim().min(1).max(60).optional(),
  expiresInSeconds: z.number().int().min(60).max(31_536_000).optional(),
  tools: ToolPolicySchema.optional(),
  /** Component id to auth config id; a server without an entry uses the project default. */
  authConfigs: z.record(IdInputSchema('cmp'), IdInputSchema('acf')).optional(),
});
export type CreateSessionBody = z.infer<typeof CreateSessionBodySchema>;

export const SessionStatusSchema = z.enum(['active', 'expired', 'revoked']);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

export const SessionResponseSchema = z.object({
  id: IdSchema('pjs'),
  userId: z.string(),
  plugins: z.array(z.string()),
  tools: ToolPolicySchema,
  /** The auth configs this session names; a server not listed uses the project default. */
  authConfigs: z.array(
    z.object({ pluginId: IdSchema('plg'), serverName: z.string(), authConfigId: IdSchema('acf') }),
  ),
  status: SessionStatusSchema,
  createdAt: IsoDateTimeSchema,
  expiresAt: IsoDateTimeSchema,
  lastUsedAt: IsoDateTimeSchema.nullable(),
});
export type SessionResponse = z.infer<typeof SessionResponseSchema>;

/** The token is shown once, here and in a replay of the same request. */
export const SessionCreatedResponseSchema = SessionResponseSchema.extend({ token: z.string() });
export type SessionCreatedResponse = z.infer<typeof SessionCreatedResponseSchema>;

export const SessionPageSchema = PageSchema(SessionResponseSchema);

export const SessionListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  userId: ProjectUserRefSchema.optional(),
});
export type SessionListQuery = z.infer<typeof SessionListQuerySchema>;

export const SessionParamsSchema = z.object({ sessionId: IdSchema('pjs') });
export const ConsoleSessionParamsSchema = ProjectParamsSchema.extend({
  sessionId: IdSchema('pjs'),
});

export const PutSessionPluginBodySchema = z.strictObject({ versionId: IdSchema('pv').optional() });
export type PutSessionPluginBody = z.infer<typeof PutSessionPluginBodySchema>;

/** A catalog entry for a session's user; `installed` says whether the user has it. */
export const SessionCatalogItemSchema = PluginListItemResponseSchema.extend({
  installed: z.boolean(),
});
export type SessionCatalogItem = z.infer<typeof SessionCatalogItemSchema>;
export const SessionCatalogPageSchema = z.object({
  items: z.array(SessionCatalogItemSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});
export type SessionCatalogPage = z.infer<typeof SessionCatalogPageSchema>;
