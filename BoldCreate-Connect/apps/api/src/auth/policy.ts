import type { AuthPolicy } from '@boldcreate-integrations/domain';
import type { ApiConfig } from '../config.js';

/** The sign-in, session and password rules the domain takes, read from configuration. */
export function authPolicyFromConfig(config: ApiConfig): AuthPolicy {
  return {
    session: {
      idleSeconds: config.SESSION_IDLE_SECONDS,
      absoluteSeconds: config.SESSION_ABSOLUTE_SECONDS,
      slideMinIntervalSeconds: config.SESSION_SLIDE_MIN_INTERVAL_SECONDS,
    },
    maxFailedLogins: config.LOGIN_MAX_FAILED,
    lockSeconds: config.LOGIN_LOCK_SECONDS,
    passwordMinLength: config.PASSWORD_MIN_LENGTH,
  };
}
