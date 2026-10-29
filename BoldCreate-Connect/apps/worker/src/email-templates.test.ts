import { describe, expect, it } from 'vitest';
import {
  adminSetupEmail,
  deletionEmail,
  emailChangeEmail,
  escapeHtml,
  inviteEmail,
  passwordResetEmail,
  verificationEmail,
} from './email-templates.js';

const BASE = 'https://app.example.test';
const LINK = 'https://app.example.test/accept-invite?token=abc%26def';

describe('inviteEmail', () => {
  const mail = inviteEmail(
    {
      link: LINK,
      role: 'Member',
      organizationName: 'Acme Corp',
      inviterName: 'Ada Lovelace',
      inviterEmail: 'ada@example.test',
    },
    BASE,
  );

  it('names who invited, to what, and as which role in the subject', () => {
    expect(mail.subject).toBe('Ada Lovelace has invited you to join Acme Corp on BoldConnect');
  });

  it('is a full HTML document with the button, the link and the expiry', () => {
    expect(mail.html).toMatch(/^<!DOCTYPE html>/);
    expect(mail.html).toContain('Accept invitation');
    expect(mail.html).toContain('Ada Lovelace (ada@example.test)');
    expect(mail.html).toContain('<strong>Member</strong>');
    expect(mail.html).toContain('expires in 7 days');
    expect(mail.html).toContain('href="https://app.example.test/accept-invite?token=abc%26def"');
    expect(mail.html).toContain('src="https://app.example.test/apple-touch-icon.png"');
  });

  it('carries the same message and the link as plain text', () => {
    expect(mail.text).toContain('Ada Lovelace (ada@example.test) has invited you');
    expect(mail.text).toContain('Accept invitation:\n' + LINK);
    expect(mail.text).toContain('expires in 7 days');
    expect(mail.text).not.toContain('<');
  });

  it('words around names it was not given', () => {
    const generic = inviteEmail({ link: LINK, role: 'Viewer' }, BASE);
    expect(generic.subject).toBe("You've been invited to join an organization on BoldConnect");
    expect(generic.text).toContain('Someone has invited you to join an organization');
  });

  it('cannot be made to carry markup from a name', () => {
    const hostile = inviteEmail(
      {
        link: LINK,
        role: 'Member',
        organizationName: '<script>alert(1)</script>',
        inviterName: '"><img src=x onerror=alert(1)>',
      },
      BASE,
    );
    expect(hostile.html).not.toContain('<script>');
    expect(hostile.html).not.toContain('<img src=x');
    expect(hostile.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
  });
});

describe('the other mails', () => {
  it.each([
    ['verification', verificationEmail(LINK, BASE), 'Verify email address', '24 hours'],
    ['password reset', passwordResetEmail(LINK, BASE), 'Choose a new password', '1 hour'],
    ['email change', emailChangeEmail(LINK, BASE), 'Confirm new address', '24 hours'],
    [
      'admin setup',
      adminSetupEmail('https://admin.example.test/setup?token=t', BASE),
      'Set up password',
      '30 minutes',
    ],
  ])('%s has a button, a fallback link and a plain text part', (_name, mail, label, ttl) => {
    expect(mail.html).toContain(label);
    expect(mail.html).toContain('If the button does not work');
    expect(mail.html).toContain(ttl);
    expect(mail.text).toContain(label);
    expect(mail.text).toContain(ttl);
    expect(mail.text).toMatch(/https:\/\/\S+/);
  });

  it('an admin added by another admin gets an invitation naming them', () => {
    const mail = adminSetupEmail(
      'https://admin.example.test/setup?token=t',
      BASE,
      'lead@example.test',
    );
    expect(mail.subject).toBe('lead@example.test has invited you to be an admin of BoldConnect');
    expect(mail.html).toContain('<strong>lead@example.test</strong>');
    expect(mail.html).toContain('Accept invitation');
    expect(mail.text).toContain('lead@example.test has invited you to manage BoldConnect');
  });

  it('the deletion notice has no button and names the organization', () => {
    const mail = deletionEmail(
      { displayName: 'Alice', resourceName: 'Acme Corp', resourceSlug: 'acme-corp' },
      BASE,
    );
    expect(mail.subject).toBe('Your organization "Acme Corp" has been deleted');
    expect(mail.html).not.toContain('<a href');
    expect(mail.html).toContain('Hi Alice,');
    expect(mail.text).toContain('(acme-corp) has been permanently deleted');
  });
});

describe('escapeHtml', () => {
  it('escapes the five characters that matter', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;',
    );
  });
});
