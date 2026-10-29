import * as z from 'zod/v4';
import { EmailSchema } from './auth.js';

/**
 * One address that may sign in to the admin app. `config` entries come from the deployment and
 * cannot be removed here; `added` entries were added by an admin.
 */
export const AdminAllowedEmailResponseSchema = z.object({
  email: z.string(),
  source: z.enum(['config', 'added']),
  /** `invited` until the person has opened the mailed link and chosen a password. */
  status: z.enum(['invited', 'verified']),
  addedBy: z.string().nullable(),
  createdAt: z.string().nullable(),
});
export type AdminAllowedEmailResponse = z.infer<typeof AdminAllowedEmailResponseSchema>;

export const AdminAllowedEmailListResponseSchema = z.object({
  items: z.array(AdminAllowedEmailResponseSchema),
});
export type AdminAllowedEmailListResponse = z.infer<typeof AdminAllowedEmailListResponseSchema>;

export const AdminAllowedEmailParamsSchema = z.object({ email: EmailSchema });

export const AddAdminAllowedEmailBodySchema = z.strictObject({ email: EmailSchema });
export type AddAdminAllowedEmailBody = z.infer<typeof AddAdminAllowedEmailBodySchema>;
