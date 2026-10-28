import * as z from 'zod/v4';
import { PluginLifecycleStatusSchema, VersionCountsSchema } from './admin-plugins.js';
import { ComponentKindSchema } from './common.js';

export const ADMIN_STATS_PERIODS = ['7', '30', '90'] as const;

export const AdminStatsQuerySchema = z.object({
  /** Length of the activity window in days. */
  days: z.enum(ADMIN_STATS_PERIODS).default('30'),
});
export type AdminStatsQuery = z.infer<typeof AdminStatsQuerySchema>;

export const AdminStatsResponseSchema = z.object({
  periodDays: z.number().int(),
  generatedAt: z.string(),
  totals: z.object({
    plugins: z.number().int(),
    versions: z.number().int(),
    sources: z.number().int(),
    categories: z.number().int(),
    installations: z.number().int(),
    organizations: z.number().int(),
    users: z.number().int(),
  }),
  pluginsByStatus: z.record(PluginLifecycleStatusSchema, z.number().int()),
  versionsByStatus: VersionCountsSchema,
  /** Plugins with a pending or approved version. */
  needsReview: z.number().int(),
  sourcesByStatus: z.object({
    succeeded: z.number().int(),
    failed: z.number().int(),
    queued: z.number().int(),
    running: z.number().int(),
    neverSynced: z.number().int(),
  }),
  /** One entry per day in the window, oldest first, empty days included. */
  timeline: z.array(
    z.object({
      date: z.string(),
      versionsIngested: z.number().int(),
      syncsSucceeded: z.number().int(),
      syncsFailed: z.number().int(),
    }),
  ),
  categories: z.array(z.object({ name: z.string(), plugins: z.number().int() })),
  topPlugins: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      displayName: z.string(),
      installations: z.number().int(),
    }),
  ),
  /** What members can get: the components in each plugin's highest published version. */
  components: z.object({
    total: z.number().int(),
    byKind: z.record(ComponentKindSchema, z.number().int()),
    /** Plugins that contain at least one component of the kind. */
    pluginsByKind: z.record(ComponentKindSchema, z.number().int()),
  }),
});
export type AdminStatsResponse = z.infer<typeof AdminStatsResponseSchema>;
