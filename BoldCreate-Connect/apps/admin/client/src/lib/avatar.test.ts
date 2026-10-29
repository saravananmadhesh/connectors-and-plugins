import { describe, expect, it } from 'vitest';
import { avatarColor, avatarInitials } from './avatar';

describe('user avatar', () => {
  it('gives the same colour to the same person, whatever the case or spaces', () => {
    expect(avatarColor(' Ada@Example.com ')).toBe(avatarColor('ada@example.com'));
    expect(avatarColor('ada@example.com')).toMatch(/^hsl\(\d+ 55% 38%\)$/);
  });

  it('gives different people different colours', () => {
    expect(avatarColor('ada@example.com')).not.toBe(avatarColor('grace@example.com'));
  });

  it('takes the initials from a name or an email', () => {
    expect(avatarInitials('Ada Lovelace')).toBe('AL');
    expect(avatarInitials('ada.lovelace@example.com')).toBe('AL');
    expect(avatarInitials('ada@example.com')).toBe('AD');
    expect(avatarInitials('Ada')).toBe('AD');
    expect(avatarInitials('')).toBe('?');
  });
});
