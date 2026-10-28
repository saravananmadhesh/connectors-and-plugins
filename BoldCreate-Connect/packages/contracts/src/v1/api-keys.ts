import * as z from 'zod/v4';
import { IsoDateTimeSchema } from './common.js';
import { IdSchema } from './ids.js';
import { KeyPermissionSchema, ScopeKindSchema } from './scope.js';

// ─── API Key ──────────────────────────────────────────────────────────────────

/** `foryou` is the For You key; `platform` manages the organization and holds only `org:manage`. */
export const ApiKeyKindSchema = z.enum(['foryou', 'platform']);
export type ApiKeyKind = z.infer<typeof ApiKeyKindSchema>;

export const CreateApiKeyBodySchema = z.strictObject({
  kind: ApiKeyKindSchema.default('foryou'),
  name: z.string().min(3).max(60).trim(),
  permissions: z
    .array(KeyPermissionSchema)
    .min(1)
    .refine((p) => new Set(p).size === p.length, { message: 'duplicate permissions' }),
  expiresAt: IsoDateTimeSchema.optional(),
  rateLimitPerMinute: z.number().int().min(1).max(1000).optional(),
});
export type CreateApiKeyBody = z.infer<typeof CreateApiKeyBodySchema>;

export const ApiKeyResponseSchema = z.object({
  id: IdSchema('key'),
  /** The 16 character public part of the token. */
  prefix: z.string(),
  name: z.string(),
  scope: ScopeKindSchema,
  permissions: z.array(KeyPermissionSchema),
  lastFour: z.string(),
  expiresAt: IsoDateTimeSchema.nullable(),
  revokedAt: IsoDateTimeSchema.nullable(),
  createdAt: IsoDateTimeSchema,
});
export type ApiKeyResponse = z.infer<typeof ApiKeyResponseSchema>;

/** Shown once at creation — never in replay */
export const ApiKeyCreatedResponseSchema = ApiKeyResponseSchema.extend({
  rawKey: z.string(),
});
export type ApiKeyCreatedResponse = z.infer<typeof ApiKeyCreatedResponseSchema>;
