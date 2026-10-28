import * as z from 'zod/v4';
import { ComponentKindSchema } from './common.js';
import { FolderSchema, OwnerSchema, RefSchema, RepositorySchema } from './plugin-sources.js';

export const VersionStatusSchema = z.enum([
  'pending',
  'approved',
  'published',
  'rejected',
  'yanked',
]);
export type VersionStatus = z.infer<typeof VersionStatusSchema>;

export const PluginLifecycleStatusSchema = z.enum(['active', 'deprecated', 'suspended']);
export type PluginLifecycleStatus = z.infer<typeof PluginLifecycleStatusSchema>;

export const AdminPluginVisibilitySchema = z.enum(['public', 'private']);
export type AdminPluginVisibility = z.infer<typeof AdminPluginVisibilitySchema>;

export const AdminPluginParamsSchema = z.object({ pluginId: z.uuid() });
export const AdminPluginVersionParamsSchema = z.object({ versionId: z.uuid() });

/** What a change would touch: installations across every organization. */
export const AdminImpactResponseSchema = z.object({
  installations: z.number().int(),
  organizations: z.number().int(),
  users: z.number().int(),
});
export type AdminImpactResponse = z.infer<typeof AdminImpactResponseSchema>;

export const VersionCountsSchema = z.object({
  pending: z.number().int(),
  approved: z.number().int(),
  published: z.number().int(),
  rejected: z.number().int(),
  yanked: z.number().int(),
});
export type VersionCounts = z.infer<typeof VersionCountsSchema>;

const SourceRefSchema = z.object({
  id: z.uuid(),
  owner: z.string(),
  repository: z.string(),
  ref: z.string(),
  path: z.string(),
  /** Outcome of the latest sync; null before the first one. */
  lastStatus: z.enum(['queued', 'running', 'succeeded', 'failed']).nullable(),
  lastSyncedAt: z.string().nullable(),
  lastError: z.string().nullable(),
});

export const AdminPluginSummarySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  displayName: z.string(),
  summary: z.string(),
  status: PluginLifecycleStatusSchema,
  /** Private plugins are kept out of the catalog members see. */
  visibility: AdminPluginVisibilitySchema,
  /** What the plugin contains, across its versions that are not rejected. */
  kinds: z.array(ComponentKindSchema),
  /** Components per kind in the version members get: the highest published one, else the newest not rejected. */
  componentCounts: z.partialRecord(ComponentKindSchema, z.number().int()),
  featured: z.boolean(),
  verified: z.boolean(),
  categories: z.array(z.object({ id: z.uuid(), slug: z.string(), name: z.string() })),
  source: SourceRefSchema.nullable(),
  /** The plugin's own logo in the repository at the commit shown; null when it has none. */
  logoUrl: z.string().nullable(),
  versionCounts: VersionCountsSchema,
  /** Highest published version, when there is one. */
  publishedVersion: z.string().nullable(),
  installations: z.number().int(),
  updatedAt: z.string(),
});
export type AdminPluginSummary = z.infer<typeof AdminPluginSummarySchema>;

export const AdminPluginListResponseSchema = z.object({
  items: z.array(AdminPluginSummarySchema),
  /** Plugins matching the filters, over all pages. */
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});
export type AdminPluginListResponse = z.infer<typeof AdminPluginListResponseSchema>;

/** The steps an operator can take on a version. */
export const VERSION_CHANGES = ['approve', 'reject', 'reopen', 'publish', 'yank'] as const;
export const VersionChangeSchema = z.enum(VERSION_CHANGES);
export type VersionChange = z.infer<typeof VersionChangeSchema>;

export const AdminVersionSummarySchema = z.object({
  id: z.uuid(),
  version: z.string(),
  status: VersionStatusSchema,
  commitSha: z.string().nullable(),
  archiveSizeBytes: z.number().int().nullable(),
  executionBlockedAt: z.string().nullable(),
  /** When the version was ingested. */
  ingestedAt: z.string(),
  installations: z.number().int(),
  findings: z.number().int(),
  /** The steps that apply to the version in its current state. */
  actions: z.array(VersionChangeSchema),
});
export type AdminVersionSummary = z.infer<typeof AdminVersionSummarySchema>;

export const AdminPluginDetailResponseSchema = AdminPluginSummarySchema.extend({
  description: z.string(),
  keywords: z.array(z.string()),
  /** True once an operator edited the details; a sync then keeps them. */
  metadataEdited: z.boolean(),
  createdAt: z.string(),
  versions: z.array(AdminVersionSummarySchema),
});
export type AdminPluginDetailResponse = z.infer<typeof AdminPluginDetailResponseSchema>;

const ScanComponentSchema = z.object({
  kind: z.enum(['mcp', 'skill', 'rule', 'hook', 'agent']),
  name: z.string(),
  description: z.string(),
  /** File that defines it, relative to the plugin folder; empty when it is not known. */
  path: z.string(),
});

export const ScanReportSchema = z.object({
  fileCount: z.number().int(),
  totalBytes: z.number().int(),
  components: z.array(ScanComponentSchema),
  hookCommands: z.array(z.object({ event: z.string(), command: z.string() })),
  mcpServers: z.array(
    z.object({
      name: z.string(),
      transport: z.enum(['http', 'stdio']),
      url: z.string().optional(),
      command: z.string().optional(),
    }),
  ),
  variables: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      required: z.boolean(),
      secret: z.boolean(),
    }),
  ),
  skipped: z.array(z.object({ path: z.string(), reason: z.string() })),
  findings: z.array(z.object({ path: z.string(), kind: z.string() })),
});
export type ScanReportResponse = z.infer<typeof ScanReportSchema>;

export const AdminVersionDetailResponseSchema = AdminVersionSummarySchema.extend({
  pluginId: z.uuid(),
  pluginName: z.string(),
  /** Absent for versions ingested before scanning existed. */
  scan: ScanReportSchema.nullable(),
});
export type AdminVersionDetailResponse = z.infer<typeof AdminVersionDetailResponseSchema>;

/** `force` confirms a change that affects installations the impact count showed. */
export const AdminActionBodySchema = z.strictObject({
  force: z.boolean().default(false),
});
export type AdminActionBody = z.infer<typeof AdminActionBodySchema>;

export const AdminPluginStatusBodySchema = z.strictObject({
  status: PluginLifecycleStatusSchema,
  force: z.boolean().default(false),
});
export type AdminPluginStatusBody = z.infer<typeof AdminPluginStatusBodySchema>;

/** The details an operator may change; at least one must be sent. */
export const AdminPluginUpdateBodySchema = z
  .strictObject({
    displayName: z.string().trim().min(1).max(100).optional(),
    summary: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(10_000).optional(),
    keywords: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  })
  .refine((body) => Object.values(body).some((value) => value !== undefined));
export type AdminPluginUpdateBody = z.infer<typeof AdminPluginUpdateBodySchema>;

/** Where the plugin is ingested from; a sync is queued once it is saved. */
export const AdminPluginSourceBodySchema = z.strictObject({
  owner: OwnerSchema,
  repository: RepositorySchema,
  ref: RefSchema,
  /** Folder of the plugin inside the repository; empty for the repository root. */
  path: FolderSchema,
});
export type AdminPluginSourceBody = z.infer<typeof AdminPluginSourceBodySchema>;

/** One call for many rows, so a clean-up is a single request. */
export const BulkIdsBodySchema = z.strictObject({
  ids: z
    .array(z.uuid())
    .min(1)
    .max(100)
    .refine((ids) => new Set(ids).size === ids.length),
});
export type BulkIdsBody = z.infer<typeof BulkIdsBodySchema>;

export const BulkPluginDeleteResponseSchema = z.object({
  deleted: z.array(z.uuid()),
  /** Plugins left alone because members still have them installed, or they no longer exist. */
  skipped: z.array(
    z.object({
      id: z.uuid(),
      reason: z.enum(['installed', 'not_found']),
    }),
  ),
});
export type BulkPluginDeleteResponse = z.infer<typeof BulkPluginDeleteResponseSchema>;

export const ADMIN_PLUGIN_SORTS = ['name', 'updated', 'status', 'installations'] as const;

export const AdminPluginListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  sort: z.enum(ADMIN_PLUGIN_SORTS).default('name'),
  direction: z.enum(['asc', 'desc']).default('asc'),
  /** Matches the name or display name. */
  q: z.string().trim().max(100).optional(),
  status: PluginLifecycleStatusSchema.optional(),
  visibility: AdminPluginVisibilitySchema.optional(),
  /** Plugins that contain this kind of component. */
  kind: ComponentKindSchema.optional(),
  /** Plugins with a version in this state; `needs_review` is pending or approved. */
  versionStatus: z.enum([...VersionStatusSchema.options, 'needs_review']).optional(),
  /** Category identifier. */
  category: z.string().max(60).optional(),
});
export type AdminPluginListQuery = z.infer<typeof AdminPluginListQuerySchema>;

export const AdminPluginBulkUpdateBodySchema = z
  .strictObject({
    ids: BulkIdsBodySchema.shape.ids,
    status: PluginLifecycleStatusSchema.optional(),
    visibility: AdminPluginVisibilitySchema.optional(),
    featured: z.boolean().optional(),
    verified: z.boolean().optional(),
    /** Confirms a state change that reaches installed copies. */
    force: z.boolean().default(false),
  })
  .refine(
    (body) =>
      body.status !== undefined ||
      body.visibility !== undefined ||
      body.featured !== undefined ||
      body.verified !== undefined,
  );
export type AdminPluginBulkUpdateBody = z.infer<typeof AdminPluginBulkUpdateBodySchema>;

export const AdminPluginBulkUpdateResponseSchema = z.object({
  updated: z.array(z.uuid()),
  skipped: z.array(z.object({ id: z.uuid(), reason: z.enum(['installed', 'not_found']) })),
});
export type AdminPluginBulkUpdateResponse = z.infer<typeof AdminPluginBulkUpdateResponseSchema>;

export const AdminPluginBulkPublishResponseSchema = z.object({
  /** The newest version of each plugin that was approved if needed and published. */
  published: z.array(z.object({ id: z.uuid(), versionId: z.uuid(), version: z.string() })),
  /**
   * Plugins left alone: `already_published` when the newest version is live, `not_reviewable`
   * when it was rejected or yanked, `not_found` when the plugin is gone.
   */
  skipped: z.array(
    z.object({
      id: z.uuid(),
      reason: z.enum(['already_published', 'not_reviewable', 'not_found']),
    }),
  ),
});
export type AdminPluginBulkPublishResponse = z.infer<typeof AdminPluginBulkPublishResponseSchema>;

export const AdminPluginBulkSyncResponseSchema = z.object({
  /** Plugins whose source now has a sync queued. */
  queued: z.array(z.uuid()),
  /** Plugins with no source, or whose source was already syncing, or that are gone. */
  skipped: z.array(z.uuid()),
});
export type AdminPluginBulkSyncResponse = z.infer<typeof AdminPluginBulkSyncResponseSchema>;
