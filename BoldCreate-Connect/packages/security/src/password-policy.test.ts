import { describe, expect, it } from 'vitest';
import { COMMON_PASSWORDS } from './common-passwords.js';
import { checkPasswordPolicy } from './password-policy.js';

const policy = { minLength: 12 };

describe('checkPasswordPolicy', () => {
  it('refuses 11 characters and accepts 12', () => {
    expect(checkPasswordPolicy('a1b2c3d4e5f', policy)).toBe('too_short');
    expect(checkPasswordPolicy('a1b2c3d4e5f6', policy)).toBeNull();
  });

  it('accepts 256 characters and refuses 257', () => {
    expect(checkPasswordPolicy('x'.repeat(255) + 'y', policy)).toBeNull();
    expect(checkPasswordPolicy('x'.repeat(257), policy)).toBe('too_long');
  });

  it('counts characters, not UTF-16 units', () => {
    expect(checkPasswordPolicy('😀'.repeat(12), policy)).toBeNull();
    expect(checkPasswordPolicy('😀'.repeat(11), policy)).toBe('too_short');
  });

  it('refuses common passwords whatever their case', () => {
    expect(checkPasswordPolicy('password', { minLength: 1 })).toBe('common');
    expect(checkPasswordPolicy('PassWord', { minLength: 1 })).toBe('common');
    expect(checkPasswordPolicy('Password1234', policy)).toBe('common');
    expect(checkPasswordPolicy('correcthorsebatterystaple', policy)).toBe('common');
  });

  it('holds a thousand corpus entries plus long common ones', () => {
    expect(COMMON_PASSWORDS.size).toBeGreaterThanOrEqual(1000);
    expect([...COMMON_PASSWORDS].every((entry) => entry === entry.toLowerCase())).toBe(true);
  });

  it('refuses the email address and its local part', () => {
    const email = 'ada.lovelace@example.com';
    expect(checkPasswordPolicy('Ada.Lovelace@Example.com', { ...policy, email })).toBe(
      'matches_email',
    );
    expect(checkPasswordPolicy('ada.lovelace', { ...policy, email })).toBe('matches_email');
    expect(checkPasswordPolicy('ada.lovelace-2024!', { ...policy, email })).toBeNull();
  });

  it('uses the configured minimum length', () => {
    expect(checkPasswordPolicy('abcdefgh1!', { minLength: 8 })).toBeNull();
    expect(checkPasswordPolicy('abcdefg', { minLength: 8 })).toBe('too_short');
  });
});
