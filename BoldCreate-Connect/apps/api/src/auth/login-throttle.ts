import { createHash } from 'node:crypto';
import { AppError } from '@boldcreate-integrations/contracts';
import { globalKey, type CacheKey, type LimiterPort } from '@boldcreate-integrations/ports';

export interface LoginThrottleConfig {
  /** Attempts per window for one address and one email. */
  ipEmailLimit: number;
  /** Attempts per window for one address, whatever the email. */
  ipLimit: number;
  windowSeconds: number;
}

export type LoginThrottleResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

const sha256 = (value: string): string => createHash('sha256').update(value).digest('hex');

/**
 * Counts every sign-in attempt, right or wrong, per address and email and per address, before
 * any password is checked. When the limiter store is unreachable the attempt is refused with
 * `service_unavailable`: the account lockout stays as the second line.
 */
export function createLoginThrottle(limiter: LimiterPort, config: LoginThrottleConfig) {
  return async function check(ip: string, normalizedEmail: string): Promise<LoginThrottleResult> {
    const ipHash = sha256(ip);
    const attempt = async (key: CacheKey, limit: number): Promise<LoginThrottleResult> => {
      let result;
      try {
        result = await limiter.check(key, { limit, windowSeconds: config.windowSeconds });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stderr.write(`[LOGIN_THROTTLE] Rate limiter check failed: ${message}\n`);
        throw new AppError('service_unavailable');
      }
      if (result.allowed) return { allowed: true };
      const seconds = Math.ceil((result.resetAt.getTime() - Date.now()) / 1000);
      return { allowed: false, retryAfterSeconds: Math.max(1, seconds) };
    };
    const perEmail = await attempt(
      globalKey('ratelimit', 'login', ipHash, sha256(normalizedEmail)),
      config.ipEmailLimit,
    );
    if (!perEmail.allowed) return perEmail;
    return attempt(globalKey('ratelimit', 'login-ip', ipHash), config.ipLimit);
  };
}

export type LoginThrottle = ReturnType<typeof createLoginThrottle>;
