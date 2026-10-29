import * as z from 'zod/v4';

export const OwnerSchema = z.string().regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/);
export const RepositorySchema = z.string().regex(/^[A-Za-z0-9._-]{1,100}$/);
export const RefSchema = z
  .string()
  .min(1)
  .max(200)
  .regex(/^[A-Za-z0-9._/-]+$/);
const FOLDER_SEGMENT = /^[A-Za-z0-9._-]+$/;
export const FolderSchema = z
  .string()
  .max(200)
  .refine(
    (value) =>
      value === '' ||
      value.split('/').every((part) => FOLDER_SEGMENT.test(part) && part !== '.' && part !== '..'),
  );

/** How the plugins made from a source start out; changeable later on each plugin. */
const PluginOptionFields = {
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  visibility: z.enum(['public', 'private']).default('public'),
};

export const DiscoverPluginsBodySchema = z.strictObject({
  owner: OwnerSchema,
  repository: RepositorySchema,
  ref: RefSchema.default('main'),
  /** Folder to look in; empty for the repository root. */
  path: FolderSchema.default(''),
});
export type DiscoverPluginsBody = z.infer<typeof DiscoverPluginsBodySchema>;

export const DiscoveredPluginSchema = z.object({
  /** Folder of the plugin inside the repository. */
  path: z.string(),
  name: z.string().nullable(),
  /** The plugin's own title; for a folder that cannot be installed, the title it declares. */
  displayName: z.string().nullable(),
  /** The plugin's own logo from the repository at the inspected commit; null when it has none. */
  logoUrl: z.string().nullable(),
  version: z.string().nullable(),
  summary: z.string().nullable(),
  categories: z.array(z.string()),
  /** Number of components by kind, for example `{ mcp: 1, skill: 3 }`. */
  componentCounts: z.record(z.string(), z.number().int()),
  /** How the plugin's MCP servers connect; empty when it has none. */
  mcpTransports: z.array(z.enum(['http', 'stdio'])),
  /** Why this folder cannot be installed; null when it can. */
  problem: z.string().nullable(),
  /** The source already added for this folder, if any, and how it is doing. */
  installed: z
    .object({
      sourceId: z.uuid(),
      /** The plugin made from the source; null until the first sync has created it. */
      pluginId: z.uuid().nullable(),
      pluginStatus: z.enum(['active', 'deprecated', 'suspended']).nullable(),
      syncStatus: z.enum(['queued', 'running', 'succeeded', 'failed']).nullable(),
      lastSyncedAt: z.string().nullable(),
      lastError: z.string().nullable(),
    })
    .nullable(),
});
export type DiscoveredPlugin = z.infer<typeof DiscoveredPluginSchema>;

export const DiscoverPluginsResponseSchema = z.object({
  owner: z.string(),
  repository: z.string(),
  ref: z.string(),
  commitSha: z.string(),
  layout: z.enum(['plugin', 'collection']),
  plugins: z.array(DiscoveredPluginSchema),
  /** Entries a marketplace manifest listed that were left out, each with a reason. */
  notes: z.array(z.string()),
});
export type DiscoverPluginsResponse = z.infer<typeof DiscoverPluginsResponseSchema>;

export const CreatePluginSourceBodySchema = z.strictObject({
  owner: OwnerSchema,
  repository: RepositorySchema,
  ref: RefSchema.default('main'),
  /** Folder of the plugin inside the repository; empty for the repository root. */
  path: FolderSchema.default(''),
  ...PluginOptionFields,
});
export type CreatePluginSourceBody = z.infer<typeof CreatePluginSourceBodySchema>;

export const IngestionStatusSchema = z.enum(['queued', 'running', 'succeeded', 'failed']);

export const PluginSourceResponseSchema = z.object({
  id: z.uuid(),
  owner: z.string(),
  repository: z.string(),
  ref: z.string(),
  path: z.string(),
  lastCommitSha: z.string().nullable(),
  lastSyncedAt: z.string().nullable(),
  lastStatus: IngestionStatusSchema.nullable(),
  lastError: z.string().nullable(),
  /** What the last sync did when it found several plugins instead of one. */
  lastNote: z.string().nullable(),
  createdAt: z.string(),
});
export type PluginSourceResponse = z.infer<typeof PluginSourceResponseSchema>;

/** The most plugin folders one install request can take. */
export const MAX_INSTALL_PATHS = 50;

export const InstallPluginsBodySchema = z.strictObject({
  owner: OwnerSchema,
  repository: RepositorySchema,
  ref: RefSchema.default('main'),
  /** Plugin folders to install, as listed by discovery. */
  paths: z.array(FolderSchema).min(1).max(MAX_INSTALL_PATHS),
  ...PluginOptionFields,
});
export type InstallPluginsBody = z.infer<typeof InstallPluginsBodySchema>;

export const InstallPluginsResponseSchema = z.object({
  items: z.array(
    z.object({
      path: z.string(),
      /** `added` queued a sync; `exists` was already a source and was left alone. */
      outcome: z.enum(['added', 'exists']),
      source: PluginSourceResponseSchema,
    }),
  ),
});
export type InstallPluginsResponse = z.infer<typeof InstallPluginsResponseSchema>;

/** A source with the plugin it produced, for the list of repositories that were added. */
export const InstalledSourceSchema = PluginSourceResponseSchema.extend({
  plugin: z
    .object({
      id: z.uuid(),
      name: z.string(),
      displayName: z.string(),
      status: z.enum(['active', 'deprecated', 'suspended']),
    })
    .nullable(),
});
export type InstalledSource = z.infer<typeof InstalledSourceSchema>;

export const PluginSourceListResponseSchema = z.object({
  items: z.array(InstalledSourceSchema),
});
export type PluginSourceListResponse = z.infer<typeof PluginSourceListResponseSchema>;

export const PluginSourceParamsSchema = z.object({ sourceId: z.uuid() });

export const PluginIngestionResponseSchema = z.object({
  id: z.uuid(),
  sourceId: z.uuid(),
  status: IngestionStatusSchema,
  commitSha: z.string().nullable(),
  pluginVersionId: z.uuid().nullable(),
  error: z.string().nullable(),
  requestedBy: z.string(),
  createdAt: z.string(),
  finishedAt: z.string().nullable(),
});
export type PluginIngestionResponse = z.infer<typeof PluginIngestionResponseSchema>;

export const PluginIngestionListResponseSchema = z.object({
  items: z.array(PluginIngestionResponseSchema),
});
export type PluginIngestionListResponse = z.infer<typeof PluginIngestionListResponseSchema>;

export const BulkSourceSyncResponseSchema = z.object({
  /** Sources a sync was queued for. */
  queued: z.array(z.uuid()),
  /** Sources left alone because a sync was already waiting or running, or they no longer exist. */
  skipped: z.array(z.uuid()),
});
export type BulkSourceSyncResponse = z.infer<typeof BulkSourceSyncResponseSchema>;

export const BulkSourceDeleteResponseSchema = z.object({
  deleted: z.array(z.uuid()),
});
export type BulkSourceDeleteResponse = z.infer<typeof BulkSourceDeleteResponseSchema>;
