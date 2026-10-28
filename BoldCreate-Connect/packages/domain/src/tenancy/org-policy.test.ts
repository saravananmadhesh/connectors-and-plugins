import { describe, expect, it, vi } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { getOrgPolicy, policyChanges, readOrgPolicy } from './org-policy.js';

const orgId = 'policy-org';

function dbReturning(rows: Record<string, unknown>[]): Executor {
  const query = { from: () => query, where: () => query, limit: async () => rows };
  return { select: vi.fn<() => unknown>(() => query) } as unknown as Executor;
}

const row = {
  organizationId: orgId,
  allowPersonalInstalls: false,
  allowPersonalApiKeys: null,
  maxPersonalKeyExpiryDays: 30,
  allowedKeyPresets: ['read_only'],
  updatedBy: null,
  updatedAt: new Date('2026-01-02T03:04:05.000Z'),
};

const member: UserSessionPrincipal = {
  kind: 'user_session',
  userId: 'policy-user',
  sessionId: 'policy-session',
  orgId,
  orgRole: 'MEMBER',
  orgStatus: 'active',
};

describe('getOrgPolicy', () => {
  it('returns the defaults when the organization stored nothing', async () => {
    await expect(getOrgPolicy(dbReturning([]), orgId)).resolves.toEqual({
      allowPersonalInstalls: true,
      allowPersonalApiKeys: true,
      maxPersonalKeyExpiryDays: null,
      allowedKeyPresets: ['agent', 'read_only'],
    });
  });

  it('merges stored values over the defaults', async () => {
    await expect(getOrgPolicy(dbReturning([row]), orgId)).resolves.toEqual({
      allowPersonalInstalls: false,
      allowPersonalApiKeys: true,
      maxPersonalKeyExpiryDays: 30,
      allowedKeyPresets: ['read_only'],
    });
  });
});

describe('readOrgPolicy', () => {
  it('lets any member read it and reports the time of the last change', async () => {
    await expect(readOrgPolicy(dbReturning([row]), member, orgId)).resolves.toMatchObject({
      allowPersonalInstalls: false,
      updatedAt: '2026-01-02T03:04:05.000Z',
    });
  });

  it('has no change time before the first change', async () => {
    await expect(readOrgPolicy(dbReturning([]), member, orgId)).resolves.toMatchObject({
      updatedAt: null,
    });
  });

  it('answers not found to a caller outside the organization', async () => {
    const outsider: UserSessionPrincipal = { ...member, orgId: 'another-org' };
    await expect(readOrgPolicy(dbReturning([row]), outsider, orgId)).rejects.toMatchObject({
      code: 'not_found',
    });
  });
});

describe('policyChanges', () => {
  it('maps only the fields the body carries', () => {
    expect(policyChanges({ allowPersonalInstalls: false })).toEqual({
      allowPersonalInstalls: false,
    });
  });

  it('keeps an explicit false, null and empty list as changes', () => {
    expect(
      policyChanges({
        allowPersonalApiKeys: false,
        maxPersonalKeyExpiryDays: null,
        allowedKeyPresets: [],
      }),
    ).toEqual({
      allowPersonalApiKeys: false,
      maxPersonalKeyExpiryDays: null,
      allowedKeyPresets: [],
    });
  });

  it('maps an empty body to no changes', () => {
    expect(policyChanges({})).toEqual({});
  });
});
