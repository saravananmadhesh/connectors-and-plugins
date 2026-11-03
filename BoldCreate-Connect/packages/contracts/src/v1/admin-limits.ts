import * as z from 'zod/v4';

/** Names an adjustable limit. Which keys exist is decided by `@boldcreate-integrations/limits`. */
export const LimitKeySchema = z.string().regex(/^[a-z][a-z0-9_]{1,63}$/);

/** One adjustable limit with its bounds, what is stored globally and what applies. */
export const AdminLimitResponseSchema = z.object({
  key: z.string(),
  label: z.string(),
  description: z.string(),
  windowSeconds: z.number().int(),
  /** Heading the limit is listed under. */
  group: z.string().optional(),
  /** How the value is counted; a count per window when absent. */
  unit: z
    .enum(['per_window', 'concurrent', 'callers', 'seconds', 'milliseconds', 'bytes', 'percent'])
    .optional(),
  /** The built-in value that applies when nothing is stored. */
  defaultValue: z.number().int(),
  min: z.number().int(),
  max: z.number().int(),
  /** The stored global value, or null when the built-in value applies. */
  globalValue: z.number().int().nullable(),
  /** The value in force at the global level. */
  effectiveValue: z.number().int(),
  reason: z.string().nullable(),
  updatedAt: z.string().nullable(),
  /** False for a value set in the service's own configuration; it cannot be changed here. */
  editable: z.boolean().optional(),
});
export type AdminLimitResponse = z.infer<typeof AdminLimitResponseSchema>;

export const AdminLimitListResponseSchema = z.object({
  items: z.array(AdminLimitResponseSchema),
});
export type AdminLimitListResponse = z.infer<typeof AdminLimitListResponseSchema>;

export const AdminLimitParamsSchema = z.object({ key: LimitKeySchema });

const ReasonSchema = z.string().trim().min(1).max(500);

/** The server checks the value against the bounds of the key; the schema checks the shape. */
export const SetGlobalLimitBodySchema = z.strictObject({
  value: z.number().int().positive(),
  reason: ReasonSchema,
});
export type SetGlobalLimitBody = z.infer<typeof SetGlobalLimitBodySchema>;

export const ResetGlobalLimitQuerySchema = z.object({ reason: ReasonSchema });
export type ResetGlobalLimitQuery = z.infer<typeof ResetGlobalLimitQuerySchema>;
