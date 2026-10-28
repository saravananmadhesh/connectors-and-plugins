import * as z from 'zod/v4';
import { IsoDateTimeSchema } from './common.js';
import { KeyPresetSchema } from './principal.js';

/** Longest lifetime an organization can require for a personal key, in days. */
export const MAX_PERSONAL_KEY_EXPIRY_DAYS = 90;

const KeyPresetsSchema = z.array(KeyPresetSchema).max(KeyPresetSchema.options.length);

export const OrgPolicyResponseSchema = z.object({
  allowPersonalInstalls: z.boolean(),
  allowPersonalApiKeys: z.boolean(),
  allowedKeyPresets: KeyPresetsSchema,
  maxPersonalKeyExpiryDays: z.number().int().min(1).max(MAX_PERSONAL_KEY_EXPIRY_DAYS).nullable(),
  /** Null until an admin or member changes the policy for the first time. */
  updatedAt: IsoDateTimeSchema.nullable(),
});
export type OrgPolicyResponse = z.infer<typeof OrgPolicyResponseSchema>;

export const UpdateOrgPolicyBodySchema = z
  .strictObject({
    allowPersonalInstalls: z.boolean().optional(),
    allowPersonalApiKeys: z.boolean().optional(),
    allowedKeyPresets: KeyPresetsSchema.optional(),
    maxPersonalKeyExpiryDays: z
      .number()
      .int()
      .min(1)
      .max(MAX_PERSONAL_KEY_EXPIRY_DAYS)
      .nullable()
      .optional(),
  })
  .refine((body) => Object.values(body).some((value) => value !== undefined), {
    message: 'at least one field is required',
  });
export type UpdateOrgPolicyBody = z.infer<typeof UpdateOrgPolicyBodySchema>;
