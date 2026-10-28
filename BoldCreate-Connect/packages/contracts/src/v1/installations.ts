import * as z from 'zod/v4';
import { ComponentKindSchema, IsoDateTimeSchema } from './common.js';
import { IdInputSchema, IdSchema } from './ids.js';
import { ScopeKindSchema } from './scope.js';

// ─── Installation ─────────────────────────────────────────────────────────────

export const UpdatePolicySchema = z.enum(['pinned', 'follow_latest']);
export type UpdatePolicy = z.infer<typeof UpdatePolicySchema>;

export const CreateInstallationBodySchema = z.strictObject({
  pluginVersionId: IdInputSchema('pv'),
  updatePolicy: UpdatePolicySchema.optional(),
});
export type CreateInstallationBody = z.infer<typeof CreateInstallationBodySchema>;

export const UpdateInstallationBodySchema = z.strictObject({
  active: z.boolean().optional(),
  updatePolicy: UpdatePolicySchema.optional(),
});
export type UpdateInstallationBody = z.infer<typeof UpdateInstallationBodySchema>;

export const UpdateComponentBodySchema = z.strictObject({
  enabled: z.boolean(),
});
export type UpdateComponentBody = z.infer<typeof UpdateComponentBodySchema>;

export const UpgradeInstallationBodySchema = z.strictObject({
  pluginVersionId: IdInputSchema('pv'),
});
export type UpgradeInstallationBody = z.infer<typeof UpgradeInstallationBodySchema>;

export const InstallationResponseSchema = z.object({
  id: IdSchema('ins'),
  scope: ScopeKindSchema,
  pluginName: z.string(),
  pluginLogoUrl: z.string().nullable(),
  pluginVersion: z.string(),
  pluginVersionId: IdSchema('pv'),
  active: z.boolean(),
  updatePolicy: UpdatePolicySchema,
  /** True for every organization install: plain members cannot replace it with their own. */
  required: z.boolean(),
  /** Scope of the enforced install that disabled this one; null when nothing replaced it. */
  replacedBy: ScopeKindSchema.nullable(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type InstallationResponse = z.infer<typeof InstallationResponseSchema>;

export const ComponentResponseSchema = z.object({
  componentId: IdSchema('cmp'),
  kind: ComponentKindSchema,
  name: z.string(),
  enabled: z.boolean(),
  /** Enabled and not held back; an `mcp` component with a required variable unset is inactive. */
  active: z.boolean(),
  inactiveReason: z.enum(['variables_missing']).nullable(),
});
export type ComponentResponse = z.infer<typeof ComponentResponseSchema>;

export const UpgradeResultSchema = z.object({
  installationId: IdSchema('ins'),
  newVersion: z.string(),
  droppedComponents: z.array(z.string()),
  newDisabledComponents: z.array(z.string()),
});
export type UpgradeResult = z.infer<typeof UpgradeResultSchema>;
