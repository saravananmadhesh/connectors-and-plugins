import { COMMON_PASSWORDS } from './common-passwords.js';

export const PASSWORD_MAX_LENGTH = 256;

export type PasswordViolation = 'too_short' | 'too_long' | 'common' | 'matches_email';

export interface PasswordPolicyOptions {
  /** Minimum length in characters; from configuration. */
  minLength: number;
  /** The account's email address; a password equal to it or to its local part is refused. */
  email?: string | undefined;
}

/** Returns the first rule the password breaks, or null when it is acceptable. */
export function checkPasswordPolicy(
  password: string,
  options: PasswordPolicyOptions,
): PasswordViolation | null {
  const length = [...password].length;
  if (length < options.minLength) return 'too_short';
  if (length > PASSWORD_MAX_LENGTH) return 'too_long';
  const lower = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) return 'common';
  if (options.email) {
    const email = options.email.trim().toLowerCase();
    const local = email.split('@')[0] ?? '';
    if (lower === email || (local.length > 0 && lower === local)) return 'matches_email';
  }
  return null;
}
