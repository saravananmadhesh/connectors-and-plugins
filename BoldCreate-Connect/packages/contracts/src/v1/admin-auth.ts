import * as z from 'zod/v4';
import { EmailSchema, PasswordSchema } from './auth.js';

/** Asks for a one-time setup link. The answer never says whether the email is allowed. */
export const AdminSetupRequestBodySchema = z.strictObject({ email: EmailSchema });
export type AdminSetupRequestBody = z.infer<typeof AdminSetupRequestBodySchema>;

/** Finishes setup or reset: the link token and the new password. */
export const AdminSetupBodySchema = z.strictObject({
  token: z.string().min(1).max(512),
  password: PasswordSchema,
});
export type AdminSetupBody = z.infer<typeof AdminSetupBodySchema>;

export const AdminSigninBodySchema = z.strictObject({
  email: EmailSchema,
  password: z.string().min(1).max(256),
});
export type AdminSigninBody = z.infer<typeof AdminSigninBodySchema>;

export const AdminSessionResponseSchema = z.object({ email: z.string() });
export type AdminSessionResponse = z.infer<typeof AdminSessionResponseSchema>;
