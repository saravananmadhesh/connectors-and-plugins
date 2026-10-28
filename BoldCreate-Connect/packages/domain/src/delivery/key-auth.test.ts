import { describe, expect, it } from 'vitest';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { bearerKey, keyResource } from './key-auth.js';

const KEY = `fyk_0123456789abcdef.${'A'.repeat(32)}`;

describe('bearerKey', () => {
  it('takes the key out of a bearer header', () => {
    expect(bearerKey(`Bearer ${KEY}`)).toBe(KEY);
    expect(bearerKey(`Bearer   ${KEY}  `)).toBe(KEY);
  });

  it.each(['stk_'])('accepts the %s kind', (prefix) => {
    const key = `${prefix}0123456789abcdef.${'A'.repeat(32)}`;
    expect(bearerKey(`Bearer ${key}`)).toBe(key);
  });

  it.each([
    ['no header', undefined],
    ['an empty header', ''],
    ['another scheme', `Basic ${KEY}`],
    ['a lower-case scheme', `bearer ${KEY}`],
    ['no key', 'Bearer '],
    ['a short secret', 'Bearer fyk_0123456789abcdef.short'],
    ['a prefix that is not hex', `Bearer fyk_zzzzzzzzzzzzzzzz.${'A'.repeat(32)}`],
    ['a missing prefix', `Bearer ${'A'.repeat(32)}`],
    ['a secret with a forbidden character', `Bearer fyk_0123456789abcdef.${'A'.repeat(31)}!`],
    ['a secret that is too long', `Bearer fyk_0123456789abcdef.${'A'.repeat(129)}`],
    ['the unmarked old prefix', `Bearer pk_0123456789abcdef.${'A'.repeat(32)}`],
    [
      'a Platform key, which only manages the organization',
      `Bearer plk_0123456789abcdef.${'A'.repeat(32)}`,
    ],
    ['a retired personal key', `Bearer pak_0123456789abcdef.${'A'.repeat(32)}`],
    ['a retired team key', `Bearer tmk_0123456789abcdef.${'A'.repeat(32)}`],
    ['a retired org key', `Bearer ork_0123456789abcdef.${'A'.repeat(32)}`],
    ['a retired partner key', `Bearer ptk_0123456789abcdef.${'A'.repeat(32)}`],
    ['extra parts', `Bearer ${KEY} extra`],
  ])('refuses %s', (_name, header) => {
    expect(bearerKey(header)).toBeNull();
  });
});

describe('keyResource', () => {
  it('names the scope the key lives in', () => {
    const principal = {
      kind: 'api_key',
      keyId: 'k',
      orgId: 'org-1',
      scope: 'user',
      userId: 'user-1',
      permissions: [],
    } as unknown as ApiKeyPrincipal;
    expect(keyResource(principal)).toEqual({
      orgId: 'org-1',
      scope: 'user',
      ownerUserId: 'user-1',
    });
  });
});
