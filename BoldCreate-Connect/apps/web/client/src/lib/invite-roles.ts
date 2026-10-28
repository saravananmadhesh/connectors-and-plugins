import type { UiRole } from '@/lib/api';

export interface InviteRoleOption {
  value: UiRole;
  label: string;
  hint: string;
}

/**
 * The roles an invite offers: the three organization roles.
 */
export const INVITE_ROLES: readonly InviteRoleOption[] = [
  {
    value: 'MEMBER',
    label: 'Member (Developer)',
    hint: 'Manages the organization settings, For You installs and the Platform projects. Cannot invite, change roles or delete the organization.',
  },
  {
    value: 'VIEWER',
    label: 'Viewer',
    hint: 'Reads the Platform apps only. Cannot see For You and cannot change anything.',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    hint: 'Everything a member does, plus inviting people, changing roles and deleting the organization.',
  },
];

/** Most addresses one invite may carry; the server enforces the same limit. */
export const INVITE_EMAILS_MAX = 50;

const EMAIL = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;

/**
 * Splits pasted text into addresses at commas, semicolons, spaces and line breaks. Addresses are
 * lower-cased and listed once; whatever does not look like an address is returned separately.
 */
export function parseEmails(text: string): { valid: string[]; invalid: string[] } {
  const seen = new Set<string>();
  const valid: string[] = [];
  const invalid: string[] = [];
  for (const piece of text.split(/[\s,;]+/)) {
    const email = piece.trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    (EMAIL.test(email) && email.length <= 254 ? valid : invalid).push(email);
  }
  return { valid, invalid };
}
