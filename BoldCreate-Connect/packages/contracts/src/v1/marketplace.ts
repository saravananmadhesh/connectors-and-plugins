import * as z from 'zod/v4';
import { PluginCategorySchema } from './categories.js';
import { ComponentSummarySchema } from './components.js';
import { IsoDateTimeSchema } from './common.js';
import { IdSchema } from './ids.js';

// ─── Plugin / marketplace ─────────────────────────────────────────────────────

export const PluginStatusSchema = z.enum(['active', 'deprecated', 'suspended']);
export type PluginStatus = z.infer<typeof PluginStatusSchema>;

export const PluginVisibilitySchema = z.enum(['public']);
export type PluginVisibility = z.infer<typeof PluginVisibilitySchema>;

export const PluginVersionStatusSchema = z.enum([
  'pending',
  'approved',
  'published',
  'rejected',
  'yanked',
]);
export type PluginVersionStatus = z.infer<typeof PluginVersionStatusSchema>;

export const PluginSummaryResponseSchema = z.object({
  id: IdSchema('plg'),
  name: z.string(),
  displayName: z.string(),
  summary: z.string(),
  keywords: z.array(z.string()),
  status: PluginStatusSchema,
  visibility: PluginVisibilitySchema,
  publisherOrganizationId: IdSchema('org').nullable(),
  featured: z.boolean(),
  verified: z.boolean(),
  categories: z.array(PluginCategorySchema),
  /** The newest published version's logo, linked to the commit it was read from; null when there is none. */
  logoUrl: z.string().nullable(),
  updatedAt: IsoDateTimeSchema,
});
export type PluginSummaryResponse = z.infer<typeof PluginSummaryResponseSchema>;

export const PluginVersionSummaryResponseSchema = z.object({
  id: IdSchema('pv'),
  pluginId: IdSchema('plg'),
  version: z.string(),
  publishedAt: IsoDateTimeSchema,
  status: PluginVersionStatusSchema,
});
export type PluginVersionSummaryResponse = z.infer<typeof PluginVersionSummaryResponseSchema>;

/** `latestVersion` and its `components` are the newest published version; the list is grouped by kind in the UI. */
export const PluginDetailResponseSchema = PluginSummaryResponseSchema.extend({
  description: z.string(),
  /** The plugin folder on GitHub at the newest published version's commit; null without a source. */
  repositoryUrl: z.string().nullable(),
  createdAt: IsoDateTimeSchema,
  latestVersion: PluginVersionSummaryResponseSchema.nullable(),
  components: z.array(ComponentSummarySchema),
});
export type PluginDetailResponse = z.infer<typeof PluginDetailResponseSchema>;

export const PluginVersionDetailResponseSchema = PluginVersionSummaryResponseSchema.extend({
  manifestSchemaVersion: z.string(),
  changelog: z.string().nullable(),
  executionBlockedAt: IsoDateTimeSchema.nullable(),
  components: z.array(ComponentSummarySchema),
});
export type PluginVersionDetailResponse = z.infer<typeof PluginVersionDetailResponseSchema>;

/**
 * What installing a version brings in, for the review before install. Built from the scan taken at
 * ingestion; `scanned` is false for versions ingested before scanning existed.
 */
export const PluginVersionReviewResponseSchema = z.object({
  id: IdSchema('pv'),
  pluginId: IdSchema('plg'),
  pluginName: z.string(),
  version: z.string(),
  scanned: z.boolean(),
  fileCount: z.number().int(),
  totalBytes: z.number().int(),
  components: z.array(
    z.object({
      kind: z.enum(['mcp', 'skill', 'rule', 'hook', 'agent']),
      name: z.string(),
      description: z.string(),
    }),
  ),
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
  findingCount: z.number().int(),
});
export type PluginVersionReviewResponse = z.infer<typeof PluginVersionReviewResponseSchema>;

export const PluginSortSchema = z.enum(['recent', 'updated', 'name']);
export type PluginSort = z.infer<typeof PluginSortSchema>;

/**
 * `categories` is a comma separated list of category slugs (a plugin matches any of them), `kind` a
 * component kind and `featured` is `true` to narrow. `page` counts from 1 and `limit` is the page size.
 * `direction` defaults to the natural order of the sort: newest or last changed first, A to Z.
 */
export const PluginListQuerySchema = z.strictObject({
  q: z.string().max(200).optional(),
  keyword: z.string().max(100).optional(),
  kind: z.enum(['mcp', 'skill', 'rule', 'hook', 'agent']).optional(),
  categories: z.string().max(400).optional(),
  featured: z.enum(['true', 'false']).optional(),
  sort: PluginSortSchema.default('recent'),
  direction: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().int().min(1).max(10000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});
export type PluginListQuery = z.infer<typeof PluginListQuerySchema>;

/** How many components of each kind the newest published version ships. */
export const ComponentCountsSchema = z.object({
  agent: z.number().int(),
  skill: z.number().int(),
  mcp: z.number().int(),
  hook: z.number().int(),
  rule: z.number().int(),
});
export type ComponentCounts = z.infer<typeof ComponentCountsSchema>;

/** A plugin as the marketplace grid shows it: the summary plus what a card needs to install it. */
export const PluginListItemResponseSchema = PluginSummaryResponseSchema.extend({
  latestVersion: z.object({ id: IdSchema('pv'), version: z.string() }).nullable(),
  componentCounts: ComponentCountsSchema,
});
export type PluginListItemResponse = z.infer<typeof PluginListItemResponseSchema>;

/** One numbered page of the marketplace; `total` counts every match, not just this page. */
export const PluginPageResponseSchema = z.object({
  items: z.array(PluginListItemResponseSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});
export type PluginPageResponse = z.infer<typeof PluginPageResponseSchema>;
