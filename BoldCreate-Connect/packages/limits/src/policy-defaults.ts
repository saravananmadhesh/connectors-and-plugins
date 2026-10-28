import type { KeyPreset } from '@boldcreate-integrations/contracts';

/** The organization policy as the rest of the system reads it: every field has a value. */
export interface OrgPolicy {
  allowPersonalInstalls: boolean;
  allowPersonalApiKeys: boolean;
  /** Longest lifetime, in days, an organization requires for a personal key; null for no limit. */
  maxPersonalKeyExpiryDays: number | null;
  allowedKeyPresets: readonly KeyPreset[];
}

/** The stored row: a null column means the default below. */
export interface OrgPolicyRow {
  allowPersonalInstalls: boolean | null;
  allowPersonalApiKeys: boolean | null;
  maxPersonalKeyExpiryDays: number | null;
  allowedKeyPresets: readonly KeyPreset[] | null;
}

export const DEFAULT_ORG_POLICY: OrgPolicy = {
  allowPersonalInstalls: true,
  allowPersonalApiKeys: true,
  maxPersonalKeyExpiryDays: null,
  allowedKeyPresets: ['agent', 'read_only'],
};

/** Fills the unset columns of a stored policy (or a missing row) with the defaults. */
export function resolveOrgPolicy(row: OrgPolicyRow | null | undefined): OrgPolicy {
  return {
    allowPersonalInstalls: row?.allowPersonalInstalls ?? DEFAULT_ORG_POLICY.allowPersonalInstalls,
    allowPersonalApiKeys: row?.allowPersonalApiKeys ?? DEFAULT_ORG_POLICY.allowPersonalApiKeys,
    maxPersonalKeyExpiryDays:
      row?.maxPersonalKeyExpiryDays ?? DEFAULT_ORG_POLICY.maxPersonalKeyExpiryDays,
    allowedKeyPresets: [...(row?.allowedKeyPresets ?? DEFAULT_ORG_POLICY.allowedKeyPresets)],
  };
}
