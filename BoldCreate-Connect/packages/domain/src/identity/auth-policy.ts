import { checkPasswordPolicy } from '@boldcreate-integrations/security';
import { appError } from '../errors.js';
import type { SessionPolicy } from './session.js';

/** Everything the sign-in, session and password rules take from configuration. */
export interface AuthPolicy {
  session: SessionPolicy;
  /** Consecutive wrong passwords that lock the account. */
  maxFailedLogins: number;
  lockSeconds: number;
  passwordMinLength: number;
}

/** Who and what a request came from, for audit rows. */
export interface AuthContext {
  ip?: string | undefined;
  userAgent?: string | undefined;
  requestId?: string | undefined;
}

/** Throws `password_policy_violation` when the password breaks the policy. */
export function assertPasswordPolicy(
  password: string,
  email: string,
  policy: Pick<AuthPolicy, 'passwordMinLength'>,
): void {
  if (checkPasswordPolicy(password, { minLength: policy.passwordMinLength, email }) !== null) {
    throw appError('password_policy_violation');
  }
}
