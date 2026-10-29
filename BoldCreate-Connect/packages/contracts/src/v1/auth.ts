import * as z from 'zod/v4';
import { SafeUserSchema } from './profile.js';

// ─── Shared field constraints ─────────────────────────────────────────────────

export const EmailSchema = z.string().trim().toLowerCase().max(254).email();
/** Length and content rules are the password policy in the domain (`password_policy_violation`). */
export const PasswordSchema = z.string().min(1).max(256);
export const DisplayNameSchema = z.string().min(1).max(80).trim();

// ─── Signup / auth ────────────────────────────────────────────────────────────

export const SignupBodySchema = z.strictObject({
  email: EmailSchema,
  password: PasswordSchema,
  displayName: DisplayNameSchema,
  /**
   * The token of an open invite sent to `email`. It proves the person reads that mailbox, so the
   * address is verified at once and no verification mail is sent.
   */
  inviteToken: z.string().min(1).max(512).optional(),
});
export type SignupBody = z.infer<typeof SignupBodySchema>;

export const SigninBodySchema = z.strictObject({
  email: EmailSchema,
  password: z.string().min(1).max(256),
});
export type SigninBody = z.infer<typeof SigninBodySchema>;

export const VerifyEmailBodySchema = z.strictObject({
  token: z.string().min(1).max(512),
});
export type VerifyEmailBody = z.infer<typeof VerifyEmailBodySchema>;

export const ResendVerificationBodySchema = z.strictObject({
  email: EmailSchema,
});
export type ResendVerificationBody = z.infer<typeof ResendVerificationBodySchema>;

export const ForgotPasswordBodySchema = z.strictObject({
  email: EmailSchema,
});
export type ForgotPasswordBody = z.infer<typeof ForgotPasswordBodySchema>;

export const ResetPasswordBodySchema = z.strictObject({
  token: z.string().min(1).max(512),
  newPassword: PasswordSchema,
});
export type ResetPasswordBody = z.infer<typeof ResetPasswordBodySchema>;

export const ChangePasswordBodySchema = z.strictObject({
  currentPassword: z.string().min(1).max(256),
  newPassword: PasswordSchema,
});
export type ChangePasswordBody = z.infer<typeof ChangePasswordBodySchema>;

export const ChangeEmailBodySchema = z.strictObject({
  newEmail: EmailSchema,
  currentPassword: z.string().min(1).max(256),
});
export type ChangeEmailBody = z.infer<typeof ChangeEmailBodySchema>;

export const ConfirmEmailChangeBodySchema = z.strictObject({
  token: z.string().min(1).max(512),
});
export type ConfirmEmailChangeBody = z.infer<typeof ConfirmEmailChangeBodySchema>;

export const SessionIssuedSchema = z.object({
  /** Present on the internal leg only; the web BFF turns it into a cookie. */
  sessionToken: z.string(),
  user: SafeUserSchema,
});
export type SessionIssued = z.infer<typeof SessionIssuedSchema>;

/** What the browser receives: the same without the token, which the BFF keeps in a cookie. */
export const SessionIssuedBrowserSchema = SessionIssuedSchema.omit({ sessionToken: true });
export type SessionIssuedBrowser = z.infer<typeof SessionIssuedBrowserSchema>;

/** The address typed back to confirm an account deletion; compared in the domain. */
export const DeleteUserQuerySchema = z.strictObject({
  confirmEmail: z.string().max(254),
});
export type DeleteUserQuery = z.infer<typeof DeleteUserQuerySchema>;
