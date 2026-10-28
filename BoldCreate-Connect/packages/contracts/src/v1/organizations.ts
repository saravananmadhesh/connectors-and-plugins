import * as z from 'zod/v4';
import { IsoDateTimeSchema, NameSchema, SlugSchema } from './common.js';
import { IdSchema } from './ids.js';
import { OrgPolicyResponseSchema } from './org-policy.js';
import { PublicRoleSchema, UiRoleSchema } from './role-registry.js';
import { OrgRoleSchema } from './scope.js';

// ─── Organization ─────────────────────────────────────────────────────────────

export const CreateOrgBodySchema = z.strictObject({
  name: NameSchema,
  slug: SlugSchema,
});
export type CreateOrgBody = z.infer<typeof CreateOrgBodySchema>;

export const UpdateOrgBodySchema = z.strictObject({
  name: NameSchema.optional(),
});
export type UpdateOrgBody = z.infer<typeof UpdateOrgBodySchema>;

export const DeleteOrgQuerySchema = z.strictObject({
  confirmSlug: z.string(),
});
export type DeleteOrgQuery = z.infer<typeof DeleteOrgQuerySchema>;

export const OrgResponseSchema = z.object({
  id: IdSchema('org'),
  name: z.string(),
  slug: z.string(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type OrgResponse = z.infer<typeof OrgResponseSchema>;

// ─── Members ──────────────────────────────────────────────────────────────────

/** A suspended member behaves as a non-member until reinstated. */
export const OrgMemberStatusSchema = z.enum(['active', 'suspended']);
export type OrgMemberStatus = z.infer<typeof OrgMemberStatusSchema>;

export const OrgMemberResponseSchema = z.object({
  userId: IdSchema('usr'),
  displayName: z.string(),
  email: z.string(),
  role: OrgRoleSchema,
  status: OrgMemberStatusSchema,
  createdAt: IsoDateTimeSchema,
});
export type OrgMemberResponse = z.infer<typeof OrgMemberResponseSchema>;

export const UpdateOrgMemberBodySchema = z
  .strictObject({
    role: OrgRoleSchema.optional(),
    status: OrgMemberStatusSchema.optional(),
  })
  .refine((body) => body.role !== undefined || body.status !== undefined, {
    message: 'role or status is required',
  });
export type UpdateOrgMemberBody = z.infer<typeof UpdateOrgMemberBodySchema>;

// ─── Invites ──────────────────────────────────────────────────────────────────

/** Most people one invite request may name. */
export const INVITE_EMAILS_MAX = 50;

/** Invites people with one role. */
export const CreateInviteBodySchema = z.strictObject({
  emails: z.array(z.string().trim().toLowerCase().max(254).email()).min(1).max(INVITE_EMAILS_MAX),
  role: UiRoleSchema,
});
export type CreateInviteBody = z.infer<typeof CreateInviteBodySchema>;

export const AcceptInviteBodySchema = z.strictObject({
  token: z.string().min(1).max(512),
});
export type AcceptInviteBody = z.infer<typeof AcceptInviteBodySchema>;

export const InviteResponseSchema = z.object({
  id: IdSchema('inv'),
  organizationId: IdSchema('org'),
  email: z.string(),
  role: PublicRoleSchema,
  expiresAt: IsoDateTimeSchema,
  createdAt: IsoDateTimeSchema,
});
export type InviteResponse = z.infer<typeof InviteResponseSchema>;

/** What happened to one address: a new `invited`, or someone who is already a member. */
export const InviteOutcomeSchema = z.enum(['invited', 'already_member']);
export type InviteOutcome = z.infer<typeof InviteOutcomeSchema>;

export const CreateInviteResponseSchema = z.object({
  results: z.array(
    z.object({
      email: z.string(),
      status: InviteOutcomeSchema,
      invite: InviteResponseSchema.nullable(),
    }),
  ),
});
export type CreateInviteResponse = z.infer<typeof CreateInviteResponseSchema>;

// ─── Caller membership ────────────────────────────────────────────────────────

export const OrgMeResponseSchema = z.object({
  userId: IdSchema('usr'),
  role: OrgRoleSchema,
  /** Actions the caller may take at org scope. */
  abilities: z.array(z.string()),
  /** The organization policy in effect, defaults filled in. */
  policy: OrgPolicyResponseSchema,
});
export type OrgMeResponse = z.infer<typeof OrgMeResponseSchema>;

export const AcceptInviteResponseSchema = z.object({
  orgId: IdSchema('org'),
  role: PublicRoleSchema,
});
export type AcceptInviteResponse = z.infer<typeof AcceptInviteResponseSchema>;
