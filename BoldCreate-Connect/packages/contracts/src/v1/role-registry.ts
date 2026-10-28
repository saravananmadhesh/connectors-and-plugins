import * as z from 'zod/v4';

/**
 * The roles a person sees and sends: Admin, Member (shown as Developer in the Platform screens) and
 * Viewer.
 */
export const PUBLIC_ROLES = ['ADMIN', 'MEMBER', 'VIEWER'] as const;
export const PublicRoleSchema = z.enum(PUBLIC_ROLES);
export type PublicRole = z.infer<typeof PublicRoleSchema>;

/** The name people read for each role, in screens and in email. */
export const ROLE_LABELS: Record<PublicRole, string> = {
  ADMIN: 'Admin',
  MEMBER: 'Member',
  VIEWER: 'Viewer',
};

/** Roles an invite or a member change from the web app may name. */
export const UiRoleSchema = PublicRoleSchema;
export type UiRole = z.infer<typeof UiRoleSchema>;
