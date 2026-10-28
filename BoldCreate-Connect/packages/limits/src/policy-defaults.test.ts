import { describe, expect, it } from 'vitest';
import { DEFAULT_ORG_POLICY, resolveOrgPolicy } from './policy-defaults.js';

const UNSET = {
  allowPersonalInstalls: null,
  allowPersonalApiKeys: null,
  maxPersonalKeyExpiryDays: null,
  allowedKeyPresets: null,
};

describe('resolveOrgPolicy', () => {
  it('returns the defaults when there is no row', () => {
    expect(resolveOrgPolicy(null)).toEqual(DEFAULT_ORG_POLICY);
    expect(resolveOrgPolicy(undefined)).toEqual(DEFAULT_ORG_POLICY);
  });

  it('falls back to the defaults for every null column', () => {
    expect(resolveOrgPolicy(UNSET)).toEqual(DEFAULT_ORG_POLICY);
  });

  it('keeps an explicit false', () => {
    const policy = resolveOrgPolicy({
      ...UNSET,
      allowPersonalInstalls: false,
      allowPersonalApiKeys: false,
    });
    expect(policy.allowPersonalInstalls).toBe(false);
    expect(policy.allowPersonalApiKeys).toBe(false);
  });

  it('keeps a null expiry limit as no limit and an explicit limit as set', () => {
    expect(resolveOrgPolicy(UNSET).maxPersonalKeyExpiryDays).toBeNull();
    expect(
      resolveOrgPolicy({ ...UNSET, maxPersonalKeyExpiryDays: 30 }).maxPersonalKeyExpiryDays,
    ).toBe(30);
  });

  it('keeps an explicit preset list, including an empty one', () => {
    expect(
      resolveOrgPolicy({ ...UNSET, allowedKeyPresets: ['read_only'] }).allowedKeyPresets,
    ).toEqual(['read_only']);
    expect(resolveOrgPolicy({ ...UNSET, allowedKeyPresets: [] }).allowedKeyPresets).toEqual([]);
  });

  it('does not share the default preset list with the caller', () => {
    const policy = resolveOrgPolicy(null);
    expect(policy.allowedKeyPresets).not.toBe(DEFAULT_ORG_POLICY.allowedKeyPresets);
  });
});
