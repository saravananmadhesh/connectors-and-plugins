import { describe, expect, it } from 'vitest';
import { OrgPolicyResponseSchema, UpdateOrgPolicyBodySchema } from './org-policy.js';

describe('UpdateOrgPolicyBodySchema', () => {
  it('accepts any single field', () => {
    expect(UpdateOrgPolicyBodySchema.safeParse({ allowPersonalInstalls: false }).success).toBe(
      true,
    );
    expect(UpdateOrgPolicyBodySchema.safeParse({ maxPersonalKeyExpiryDays: null }).success).toBe(
      true,
    );
    expect(UpdateOrgPolicyBodySchema.safeParse({ allowedKeyPresets: [] }).success).toBe(true);
  });

  it('rejects an empty body, unknown fields and out-of-range values', () => {
    expect(UpdateOrgPolicyBodySchema.safeParse({}).success).toBe(false);
    expect(UpdateOrgPolicyBodySchema.safeParse({ other: true }).success).toBe(false);
    expect(UpdateOrgPolicyBodySchema.safeParse({ maxPersonalKeyExpiryDays: 0 }).success).toBe(
      false,
    );
    expect(UpdateOrgPolicyBodySchema.safeParse({ maxPersonalKeyExpiryDays: 91 }).success).toBe(
      false,
    );
    expect(UpdateOrgPolicyBodySchema.safeParse({ allowedKeyPresets: ['admin'] }).success).toBe(
      false,
    );
  });

  it('accepts the 1 and 90 day boundaries', () => {
    expect(UpdateOrgPolicyBodySchema.safeParse({ maxPersonalKeyExpiryDays: 1 }).success).toBe(true);
    expect(UpdateOrgPolicyBodySchema.safeParse({ maxPersonalKeyExpiryDays: 90 }).success).toBe(
      true,
    );
  });
});

describe('OrgPolicyResponseSchema', () => {
  it('describes a policy that never changed', () => {
    expect(
      OrgPolicyResponseSchema.safeParse({
        allowPersonalInstalls: true,
        allowPersonalApiKeys: true,
        allowedKeyPresets: ['agent', 'read_only'],
        maxPersonalKeyExpiryDays: null,
        updatedAt: null,
      }).success,
    ).toBe(true);
  });
});
