import * as z from 'zod/v4';

export const AUDIT_RESULTS = ['success', 'denied', 'failure'] as const;

/** Filters and paging for the audit log; newest first, a page at a time. */
export const AdminAuditQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  /** Opaque value from the previous page's `nextCursor`. */
  cursor: z.string().max(200).optional(),
  /** An action name, or a prefix ending in a dot such as `plugin_version.`. */
  action: z.string().trim().max(80).optional(),
  actorId: z.string().trim().max(200).optional(),
  targetKind: z.string().trim().max(60).optional(),
  targetId: z.string().trim().max(100).optional(),
  result: z.enum(AUDIT_RESULTS).optional(),
  /** Only events at or after this time. */
  since: z.iso.datetime().optional(),
  /** Only events before this time. */
  until: z.iso.datetime().optional(),
});
export type AdminAuditQuery = z.infer<typeof AdminAuditQuerySchema>;

export const AdminAuditEntrySchema = z.object({
  id: z.uuid(),
  at: z.string(),
  actorId: z.string(),
  actorKind: z.string(),
  action: z.string(),
  targetKind: z.string().nullable(),
  targetId: z.string().nullable(),
  result: z.enum(AUDIT_RESULTS),
  /** What was recorded with the event; secrets were removed when it was written. */
  context: z.record(z.string(), z.unknown()).nullable(),
  orgId: z.uuid().nullable(),
  requestId: z.string().nullable(),
  ip: z.string().nullable(),
});
export type AdminAuditEntry = z.infer<typeof AdminAuditEntrySchema>;

export const AdminAuditListResponseSchema = z.object({
  items: z.array(AdminAuditEntrySchema),
  /** Pass as `cursor` for the next page; null on the last page. */
  nextCursor: z.string().nullable(),
});
export type AdminAuditListResponse = z.infer<typeof AdminAuditListResponseSchema>;
