import { describe, it, expect } from 'vitest';
import {
  canChangeMembers,
  grantsOrgManagement,
  invalidKeyPermissions,
  isActiveAdmin,
  isAdminRole,
  isMemberRole,
  isOrgManagerRole,
  leavesNoActiveAdmin,
} from './member-rules.js';

describe('canChangeMembers', () => {
  it('lets an admin hand out, change and remove any role', () => {
    expect(canChangeMembers('ADMIN')).toBe(true);
  });

  it('gives members and viewers nothing to grant or remove', () => {
    expect(canChangeMembers('MEMBER')).toBe(false);
    expect(canChangeMembers('VIEWER')).toBe(false);
  });
});

describe('role predicates', () => {
  it('names admins and members apart', () => {
    expect(isAdminRole('ADMIN')).toBe(true);
    expect(isAdminRole('MEMBER')).toBe(false);
    expect(isAdminRole('VIEWER')).toBe(false);
    expect(isMemberRole('MEMBER')).toBe(true);
    expect(isMemberRole('ADMIN')).toBe(false);
  });

  it('names the roles that manage the organization', () => {
    expect(isOrgManagerRole('ADMIN')).toBe(true);
    expect(isOrgManagerRole('MEMBER')).toBe(true);
    expect(isOrgManagerRole('VIEWER')).toBe(false);
  });
});

describe('grantsOrgManagement', () => {
  it('is true for the Member role only, not for the other roles', () => {
    expect(grantsOrgManagement('MEMBER')).toBe(true);
    for (const role of ['ADMIN', 'VIEWER'] as const) {
      expect(grantsOrgManagement(role)).toBe(false);
    }
  });
});

describe('invalidKeyPermissions', () => {
  it('returns nothing when every permission can be delegated', () => {
    expect(invalidKeyPermissions(['mcp:list', 'mcp:call'], ['mcp:list'])).toEqual([]);
  });

  it('returns the permissions that cannot be delegated', () => {
    expect(invalidKeyPermissions(['mcp:list'], ['mcp:list', 'mcp:call'])).toEqual(['mcp:call']);
  });

  it('returns everything when nothing can be delegated', () => {
    expect(invalidKeyPermissions([], ['mcp:list'])).toEqual(['mcp:list']);
  });
});

describe('leavesNoActiveAdmin', () => {
  it('allows a change that keeps another active admin', () => {
    expect(leavesNoActiveAdmin(['a', 'b'], 'a', { role: 'MEMBER', status: 'active' })).toBe(false);
    expect(leavesNoActiveAdmin(['a', 'b'], 'a', { role: 'ADMIN', status: 'suspended' })).toBe(
      false,
    );
  });

  it('refuses to demote or suspend the only active admin', () => {
    expect(leavesNoActiveAdmin(['a'], 'a', { role: 'MEMBER', status: 'active' })).toBe(true);
    expect(leavesNoActiveAdmin(['a'], 'a', { role: 'VIEWER', status: 'active' })).toBe(true);
    expect(leavesNoActiveAdmin(['a'], 'a', { role: 'ADMIN', status: 'suspended' })).toBe(true);
  });

  it('allows a change that leaves the only admin an active admin', () => {
    expect(leavesNoActiveAdmin(['a'], 'a', { role: 'ADMIN', status: 'active' })).toBe(false);
  });

  it('ignores a target that is not an active admin', () => {
    expect(leavesNoActiveAdmin(['a'], 'b', { role: 'VIEWER', status: 'suspended' })).toBe(false);
    expect(leavesNoActiveAdmin([], 'b', { role: 'MEMBER', status: 'active' })).toBe(false);
  });
});

describe('active admin', () => {
  it('counts only an active admin as an admin', () => {
    expect(isActiveAdmin({ role: 'ADMIN', status: 'active' })).toBe(true);
    expect(isActiveAdmin({ role: 'ADMIN', status: 'suspended' })).toBe(false);
    expect(isActiveAdmin({ role: 'MEMBER', status: 'active' })).toBe(false);
  });
});
