/**
 * The invite link a person opened before they were signed in, and the address it was sent to.
 * It is kept in the browser, so signing in or verifying an address (possibly from another tab)
 * carries on to the invite instead of dropping it.
 */
const KEY = 'pending-invite-token';
const EMAIL_KEY = 'pending-invite-email';
const ORG_KEY = 'pending-invite-org';

export function rememberInvite(
  token: string,
  details: { email?: string | null; organizationName?: string | null } = {},
): void {
  try {
    localStorage.setItem(KEY, token);
    if (details.email) localStorage.setItem(EMAIL_KEY, details.email);
    else localStorage.removeItem(EMAIL_KEY);
    if (details.organizationName) localStorage.setItem(ORG_KEY, details.organizationName);
    else localStorage.removeItem(ORG_KEY);
  } catch {
    // Storage can be blocked; the person can open the link again.
  }
}

export function pendingInvite(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** The address the pending invite was sent to, when the link was looked up. */
export function pendingInviteEmail(): string | null {
  try {
    return pendingInvite() ? localStorage.getItem(EMAIL_KEY) : null;
  } catch {
    return null;
  }
}

/** The organization the pending invite is for, when the link was looked up. */
export function pendingInviteOrg(): string | null {
  try {
    return pendingInvite() ? localStorage.getItem(ORG_KEY) : null;
  } catch {
    return null;
  }
}

export function forgetInvite(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(ORG_KEY);
  } catch {
    // Nothing to clear.
  }
}
