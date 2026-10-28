import { describe, expect, it } from 'vitest';
import { INVITE_EMAILS_MAX, INVITE_ROLES, parseEmails } from './invite-roles';
import { PUBLIC_ROLE_LABELS } from './role-labels';

describe('INVITE_ROLES', () => {
  it('offers exactly the roles the web app may send', () => {
    expect(INVITE_ROLES.map((role) => role.value).sort()).toEqual(['ADMIN', 'MEMBER', 'VIEWER']);
  });

  it('allows fifty addresses, as the contract does', () => {
    expect(INVITE_EMAILS_MAX).toBe(50);
  });
});

describe('PUBLIC_ROLE_LABELS', () => {
  it('names the public roles', () => {
    expect(PUBLIC_ROLE_LABELS).toMatchObject({
      ADMIN: 'Admin',
      MEMBER: 'Member',
      VIEWER: 'Viewer',
    });
  });
});

describe('parseEmails', () => {
  it('splits at commas, semicolons, spaces and new lines', () => {
    expect(parseEmails('a@x.io, b@x.io;c@x.io d@x.io\ne@x.io').valid).toEqual([
      'a@x.io',
      'b@x.io',
      'c@x.io',
      'd@x.io',
      'e@x.io',
    ]);
  });

  it('lower-cases and lists each address once', () => {
    expect(parseEmails('A@x.io a@X.io').valid).toEqual(['a@x.io']);
  });

  it('returns what is not an address separately', () => {
    expect(parseEmails('a@x.io nope @x.io a@ a@x').invalid).toEqual(['nope', '@x.io', 'a@', 'a@x']);
  });

  it('refuses an address longer than the contract allows', () => {
    const long = `${'a'.repeat(250)}@x.io`;
    expect(parseEmails(long)).toEqual({ valid: [], invalid: [long] });
  });

  it('answers empty text with nothing', () => {
    expect(parseEmails('  \n ,; ')).toEqual({ valid: [], invalid: [] });
  });
});
