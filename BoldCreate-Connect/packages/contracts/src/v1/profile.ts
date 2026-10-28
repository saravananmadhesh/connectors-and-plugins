import * as z from 'zod/v4';
import { IsoDateTimeSchema } from './common.js';
import { IdSchema } from './ids.js';
import { OrgRoleSchema } from './scope.js';

export const SafeUserSchema = z.object({
  id: IdSchema('usr'),
  email: z.string(),
  displayName: z.string(),
  emailVerifiedAt: IsoDateTimeSchema.nullable(),
  status: z.enum(['active', 'suspended', 'deleted']),
  createdAt: IsoDateTimeSchema,
});
export type SafeUser = z.infer<typeof SafeUserSchema>;

export const MeResponseSchema = z.object({
  user: SafeUserSchema,
  memberships: z.array(
    z.object({
      organizationId: IdSchema('org'),
      organizationName: z.string(),
      organizationSlug: z.string(),
      role: OrgRoleSchema,
      /** `suspended` when an admin has suspended the caller in this organization. */
      status: z.enum(['active', 'suspended']),
    }),
  ),
});
export type MeResponse = z.infer<typeof MeResponseSchema>;
