import { describe, it, expect } from 'vitest';
import { assertValidScope } from './scope.js';

describe('assertValidScope', () => {
  it('accepts valid user scope', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'user', ownerUserId: 'u1' }),
    ).not.toThrow();
  });

  it('rejects user scope without ownerUserId', () => {
    expect(() => assertValidScope({ organizationId: 'o1', scopeType: 'user' })).toThrow(
      'user scope requires ownerUserId',
    );
  });

  it('rejects user scope with projectId', () => {
    expect(() =>
      assertValidScope({
        organizationId: 'o1',
        scopeType: 'user',
        ownerUserId: 'u1',
        projectId: 'p1',
      }),
    ).toThrow('user scope requires ownerUserId and no projectId');
  });

  it('accepts valid org scope', () => {
    expect(() => assertValidScope({ organizationId: 'o1', scopeType: 'org' })).not.toThrow();
  });

  it('rejects org scope with ownerUserId', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'org', ownerUserId: 'u1' }),
    ).toThrow('org scope requires no ownerUserId');
  });

  it('rejects org scope with projectId', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'org', projectId: 'p1' }),
    ).toThrow('org scope requires no ownerUserId or projectId');
  });

  it('accepts valid project scope', () => {
    expect(() =>
      assertValidScope({ organizationId: 'o1', scopeType: 'project', projectId: 'p1' }),
    ).not.toThrow();
  });

  it('rejects project scope without projectId or with ownerUserId', () => {
    expect(() => assertValidScope({ organizationId: 'o1', scopeType: 'project' })).toThrow(
      'project scope requires projectId',
    );
    expect(() =>
      assertValidScope({
        organizationId: 'o1',
        scopeType: 'project',
        projectId: 'p1',
        ownerUserId: 'u1',
      }),
    ).toThrow('project scope requires projectId and no ownerUserId');
  });

  it('rejects the retired team scope', () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assertValidScope({ organizationId: 'o1', scopeType: 'team' as any }),
    ).toThrow('Unknown scope type');
  });

  it('throws on unknown scope type (exhaustive check)', () => {
    expect(() =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assertValidScope({ organizationId: 'o1', scopeType: 'unknown' as any }),
    ).toThrow('Unknown scope type');
  });
});
