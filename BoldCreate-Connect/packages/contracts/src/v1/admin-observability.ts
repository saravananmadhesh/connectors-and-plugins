import * as z from 'zod/v4';

export const ERROR_GROUP_STATUSES = ['unresolved', 'resolved', 'ignored'] as const;
export const OPS_EVENT_SEVERITIES = ['info', 'warning', 'error'] as const;

const PagingSchema = {
  limit: z.coerce.number().int().min(1).max(100).default(50),
  /** Opaque value from the previous page's `nextCursor`. */
  cursor: z.string().max(200).optional(),
};

/** Filters and paging for the error list; most recently seen first. */
export const AdminErrorGroupsQuerySchema = z.object({
  ...PagingSchema,
  status: z.enum(ERROR_GROUP_STATUSES).optional(),
  service: z.string().trim().max(60).optional(),
  area: z.string().trim().max(60).optional(),
  /** Only groups seen at or after this time. */
  since: z.iso.datetime().optional(),
  /** Words to find in the title; case does not matter. */
  q: z.string().trim().min(1).max(100).optional(),
});
export type AdminErrorGroupsQuery = z.infer<typeof AdminErrorGroupsQuerySchema>;

export const AdminErrorGroupSchema = z.object({
  id: z.uuid(),
  service: z.string(),
  area: z.string().nullable(),
  title: z.string(),
  status: z.enum(ERROR_GROUP_STATUSES),
  count: z.number().int(),
  firstSeen: z.string(),
  lastSeen: z.string(),
  appVersion: z.string().nullable(),
  resolvedAt: z.string().nullable(),
  resolvedBy: z.string().nullable(),
});
export type AdminErrorGroup = z.infer<typeof AdminErrorGroupSchema>;

export const AdminErrorGroupsResponseSchema = z.object({
  items: z.array(AdminErrorGroupSchema),
  nextCursor: z.string().nullable(),
});
export type AdminErrorGroupsResponse = z.infer<typeof AdminErrorGroupsResponseSchema>;

export const AdminErrorGroupParamsSchema = z.object({ groupId: z.uuid() });

export const AdminErrorOccurrenceSchema = z.object({
  id: z.uuid(),
  occurredAt: z.string(),
  environment: z.string(),
  appVersion: z.string().nullable(),
  instanceId: z.string().nullable(),
  requestId: z.string().nullable(),
  traceId: z.string().nullable(),
  orgId: z.uuid().nullable(),
  /** Redacted when it was stored; present for sampled occurrences only. */
  stack: z.string().nullable(),
  context: z.record(z.string(), z.unknown()).nullable(),
});
export type AdminErrorOccurrence = z.infer<typeof AdminErrorOccurrenceSchema>;

export const AdminErrorGroupDetailResponseSchema = z.object({
  group: AdminErrorGroupSchema,
  /** The most recent stored occurrences, newest first. */
  occurrences: z.array(AdminErrorOccurrenceSchema),
});
export type AdminErrorGroupDetailResponse = z.infer<typeof AdminErrorGroupDetailResponseSchema>;

export const AdminErrorGroupStatusBodySchema = z.object({
  status: z.enum(ERROR_GROUP_STATUSES),
});
export type AdminErrorGroupStatusBody = z.infer<typeof AdminErrorGroupStatusBodySchema>;

/** Filters and paging for key events; newest first. */
export const AdminOpsEventsQuerySchema = z.object({
  ...PagingSchema,
  service: z.string().trim().max(60).optional(),
  /** An event kind, or a prefix ending in a dot. */
  kind: z.string().trim().max(80).optional(),
  severity: z.enum(OPS_EVENT_SEVERITIES).optional(),
  since: z.iso.datetime().optional(),
  until: z.iso.datetime().optional(),
});
export type AdminOpsEventsQuery = z.infer<typeof AdminOpsEventsQuerySchema>;

export const AdminOpsEventSchema = z.object({
  id: z.uuid(),
  occurredAt: z.string(),
  service: z.string(),
  kind: z.string(),
  severity: z.enum(OPS_EVENT_SEVERITIES),
  environment: z.string().nullable(),
  appVersion: z.string().nullable(),
  instanceId: z.string().nullable(),
  orgId: z.uuid().nullable(),
  detail: z.record(z.string(), z.unknown()).nullable(),
});
export type AdminOpsEvent = z.infer<typeof AdminOpsEventSchema>;

export const AdminOpsEventsResponseSchema = z.object({
  items: z.array(AdminOpsEventSchema),
  nextCursor: z.string().nullable(),
});
export type AdminOpsEventsResponse = z.infer<typeof AdminOpsEventsResponseSchema>;

const StorageTableSchema = z.object({
  table: z.string(),
  rows: z.number().int(),
  bytes: z.number().int(),
  oldest: z.string().nullable(),
});

/** How much room errors and events take, so retention can be judged. */
export const AdminObservabilityStorageResponseSchema = z.object({
  tables: z.array(StorageTableSchema),
  totalBytes: z.number().int(),
  /** The size above which the oldest occurrences are removed early; 0 when there is no limit. */
  maxTotalBytes: z.number().int(),
});
export type AdminObservabilityStorageResponse = z.infer<
  typeof AdminObservabilityStorageResponseSchema
>;

export const OVERVIEW_WINDOWS = ['1h', '24h', '7d'] as const;

export const AdminObservabilityOverviewQuerySchema = z.object({
  window: z.enum(OVERVIEW_WINDOWS).default('24h'),
});
export type AdminObservabilityOverviewQuery = z.infer<typeof AdminObservabilityOverviewQuerySchema>;

/** What needs attention in a time window, from one cheap read. */
export const AdminObservabilityOverviewResponseSchema = z.object({
  window: z.enum(OVERVIEW_WINDOWS),
  /** The start of the window. */
  since: z.string(),
  /** Groups still unresolved, whenever they were last seen. */
  unresolvedGroups: z.number().int(),
  /** Groups seen at least once in the window. */
  activeGroups: z.number().int(),
  /** Groups first seen in the window. */
  newGroups: z.number().int(),
  /** The most frequent unresolved groups of the window. */
  topGroups: z.array(AdminErrorGroupSchema),
  /** Active groups and warning or error events per service. */
  services: z.array(
    z.object({
      service: z.string(),
      activeGroups: z.number().int(),
      problemEvents: z.number().int(),
    }),
  ),
  events: z.object({
    info: z.number().int(),
    warning: z.number().int(),
    error: z.number().int(),
  }),
});
export type AdminObservabilityOverviewResponse = z.infer<
  typeof AdminObservabilityOverviewResponseSchema
>;

export const OBSERVABILITY_TABLES = ['error_event', 'error_group', 'ops_event'] as const;
export type ObservabilityTable = (typeof OBSERVABILITY_TABLES)[number];

/**
 * Removes the rows of one table older than a date. Error groups are judged by when they were last
 * seen, and an unresolved group is always kept. A large delete stops at a time limit and answers
 * `done: false`; repeat the request to continue.
 */
export const AdminObservabilityPurgeBodySchema = z.object({
  table: z.enum(OBSERVABILITY_TABLES),
  before: z.iso.datetime(),
});
export type AdminObservabilityPurgeBody = z.infer<typeof AdminObservabilityPurgeBodySchema>;

export const AdminObservabilityPurgeResponseSchema = z.object({
  removed: z.number().int(),
  /** False when the time limit stopped the delete with matching rows left. */
  done: z.boolean(),
});
export type AdminObservabilityPurgeResponse = z.infer<typeof AdminObservabilityPurgeResponseSchema>;
