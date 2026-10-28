import { describe, expect, it } from 'vitest';
import { AppError } from '../errors.js';
import { assertPasswordPolicy } from './auth-policy.js';

describe('assertPasswordPolicy', () => {
  it('accepts a password that meets the policy', () => {
    expect(() =>
      assertPasswordPolicy('correct-battery-staple', 'ada@example.com', { passwordMinLength: 12 }),
    ).not.toThrow();
  });

  it.each([
    ['too short', 'Short1!'],
    ['common', 'password1234'],
    ['the email address', 'ADA@example.com'],
  ])('throws password_policy_violation for a password that is %s', (_name, password) => {
    const attempt = () =>
      assertPasswordPolicy(password, 'ada@example.com', { passwordMinLength: 12 });
    expect(attempt).toThrow(AppError);
    expect(attempt).toThrow('The password does not meet the policy.');
  });
});
