import { describe, expect, it } from 'vitest';
import { CreateInviteBodySchema } from './organizations.js';
import { PUBLIC_ROLES, PublicRoleSchema, ROLE_LABELS, UiRoleSchema } from './role-registry.js';

describe('the role list', () => {
  it('has three roles and a label for each', () => {
    expect([...PUBLIC_ROLES]).toEqual(['ADMIN', 'MEMBER', 'VIEWER']);
    expect(Object.keys(ROLE_LABELS).sort()).toEqual([...PUBLIC_ROLES].sort());
  });

  it('parses only those roles, for the web app too', () => {
    for (const role of PUBLIC_ROLES) {
      expect(PublicRoleSchema.safeParse(role).success).toBe(true);
      expect(UiRoleSchema.safeParse(role).success).toBe(true);
    }
    for (const retired of ['TEAM_ADMIN', 'TEAM_MEMBER', 'TEAM_VIEWER', 'OWNER']) {
      expect(PublicRoleSchema.safeParse(retired).success).toBe(false);
    }
  });
});

describe('an invite body', () => {
  it('takes emails and a role, and no team', () => {
    expect(
      CreateInviteBodySchema.safeParse({ emails: ['a@example.com'], role: 'MEMBER' }).success,
    ).toBe(true);
    expect(
      CreateInviteBodySchema.safeParse({
        emails: ['a@example.com'],
        role: 'MEMBER',
        teamId: 'team_0123456789abcdef0123456789abcdef',
      }).success,
    ).toBe(false);
    expect(
      CreateInviteBodySchema.safeParse({ emails: ['a@example.com'], role: 'TEAM_ADMIN' }).success,
    ).toBe(false);
  });
});
