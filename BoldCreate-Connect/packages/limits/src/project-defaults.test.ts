import { describe, expect, it } from 'vitest';
import { CreateSessionBodySchema, UserInstallModeSchema } from '@boldcreate-integrations/contracts';
import { PROJECT_LIMITS } from './numbers.js';
import { DEFAULT_PROJECT_SETTINGS } from './project-defaults.js';

describe('DEFAULT_PROJECT_SETTINGS', () => {
  it('keeps user installs off by default, with a mode the contract accepts', () => {
    expect(DEFAULT_PROJECT_SETTINGS.userInstallMode).toBe('off');
    expect(UserInstallModeSchema.safeParse(DEFAULT_PROJECT_SETTINGS.userInstallMode).success).toBe(
      true,
    );
  });
});

describe('the session lifetime', () => {
  it('has the same ceiling in the request contract and in the limits', () => {
    const accepts = (expiresInSeconds: number) =>
      CreateSessionBodySchema.safeParse({ userId: 'user-1', expiresInSeconds }).success;
    expect(accepts(PROJECT_LIMITS.sessionLifetimeSecondsMax)).toBe(true);
    expect(accepts(PROJECT_LIMITS.sessionLifetimeSecondsMax + 1)).toBe(false);
  });

  it('defaults to 30 days and never above the ceiling', () => {
    expect(PROJECT_LIMITS.sessionLifetimeSecondsDefault).toBe(30 * 86_400);
    expect(PROJECT_LIMITS.sessionLifetimeSecondsDefault).toBeLessThanOrEqual(
      PROJECT_LIMITS.sessionLifetimeSecondsMax,
    );
  });
});
