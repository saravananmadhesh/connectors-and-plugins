import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdSchema } from './ids.js';
import { ProjectUserRefSchema } from './project-users.js';
import { ProjectParamsSchema } from './projects.js';

/** Whether the project's users may install plugins for themselves: not at all, from a list, or any. */
export const UserInstallModeSchema = z.enum(['off', 'allowlist', 'any']);
export type UserInstallMode = z.infer<typeof UserInstallModeSchema>;

export const UserInstallModeBodySchema = z.strictObject({ mode: UserInstallModeSchema });
export type UserInstallModeBody = z.infer<typeof UserInstallModeBodySchema>;

export const UserInstallModeResponseSchema = z.object({ mode: UserInstallModeSchema });
export type UserInstallModeResponse = z.infer<typeof UserInstallModeResponseSchema>;

/** A plugin the project's users may install on their own. */
export const AllowedPluginResponseSchema = z.object({
  pluginId: IdSchema('plg'),
  name: z.string(),
  displayName: z.string(),
  allowedAt: IsoDateTimeSchema,
});
export type AllowedPluginResponse = z.infer<typeof AllowedPluginResponseSchema>;
export const AllowedPluginPageSchema = PageSchema(AllowedPluginResponseSchema);

const SetNameSchema = z.string().trim().min(1).max(60);

export const CreatePluginSetBodySchema = z.strictObject({
  name: SetNameSchema,
  plugins: z.array(IdSchema('plg')).max(50).optional(),
});
export type CreatePluginSetBody = z.infer<typeof CreatePluginSetBodySchema>;

export const UpdatePluginSetBodySchema = z.strictObject({ name: SetNameSchema });
export type UpdatePluginSetBody = z.infer<typeof UpdatePluginSetBodySchema>;

export const PluginSetResponseSchema = z.object({
  id: IdSchema('pls'),
  name: z.string(),
  plugins: z.array(
    z.object({ pluginId: IdSchema('plg'), name: z.string(), displayName: z.string() }),
  ),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type PluginSetResponse = z.infer<typeof PluginSetResponseSchema>;
export const PluginSetPageSchema = PageSchema(PluginSetResponseSchema);

/** The plugins one of the host's users installed for themselves. The host names the user. */
export const UserPluginListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  userId: ProjectUserRefSchema,
});
export type UserPluginListQuery = z.infer<typeof UserPluginListQuerySchema>;

export const UserPluginRemoveQuerySchema = z.strictObject({ userId: ProjectUserRefSchema });
export type UserPluginRemoveQuery = z.infer<typeof UserPluginRemoveQuerySchema>;

export const PutUserPluginBodySchema = z.strictObject({
  userId: ProjectUserRefSchema,
  versionId: IdSchema('pv').optional(),
});
export type PutUserPluginBody = z.infer<typeof PutUserPluginBodySchema>;

export const PluginSetParamsSchema = z.object({ setId: IdSchema('pls') });
export const PluginSetMemberParamsSchema = z.object({
  setId: IdSchema('pls'),
  pluginId: IdSchema('plg'),
});

export const ConsolePluginSetParamsSchema = ProjectParamsSchema.extend({
  setId: IdSchema('pls'),
});
export const ConsolePluginSetMemberParamsSchema = ProjectParamsSchema.extend({
  setId: IdSchema('pls'),
  pluginId: IdSchema('plg'),
});
