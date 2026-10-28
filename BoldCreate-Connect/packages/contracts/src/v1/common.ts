import * as z from 'zod/v4';

export const IsoDateTimeSchema = z.string().datetime();

/** A page of results. `nextCursor` is null on the last page. */
export const PageSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable(),
  });

export const PageQuerySchema = z.strictObject({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type PageQuery = z.infer<typeof PageQuerySchema>;

/** Idempotency key header value: printable ASCII, 1 to 255 characters. */
export const IdempotencyKeyHeaderSchema = z.string().regex(/^[\x21-\x7E]{1,255}$/);

export const RequestIdSchema = z.string().min(1).max(128);

export const DeletionAcceptedSchema = z.object({
  status: z.literal('deletion_pending'),
  purgeAfter: IsoDateTimeSchema,
});
export type DeletionAccepted = z.infer<typeof DeletionAcceptedSchema>;

export const JobQueuedSchema = z.object({
  status: z.literal('queued'),
  jobId: z.string(),
});
export type JobQueued = z.infer<typeof JobQueuedSchema>;

export const DeleteWithForceQuerySchema = z.strictObject({
  force: z.enum(['true', 'false']).optional(),
  confirmSlug: z.string().optional(),
});
export type DeleteWithForceQuery = z.infer<typeof DeleteWithForceQuerySchema>;

const RESERVED_SLUGS = new Set([
  'admin',
  'api',
  'app',
  'www',
  'settings',
  'new',
  'login',
  'signup',
  'health',
]);

export const SlugSchema = z
  .string()
  .min(3)
  .max(40)
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, 'slug must be lowercase alphanumeric with hyphens')
  .refine((s) => !RESERVED_SLUGS.has(s), { message: 'slug is reserved' });

export const NameSchema = z.string().min(3).max(60).trim();
export const DescriptionSchema = z.string().max(500).optional();

export const ComponentKindSchema = z.enum(['mcp', 'skill', 'rule', 'hook', 'agent']);
export type ComponentKind = z.infer<typeof ComponentKindSchema>;
