import { describe, expect, it } from 'vitest';
import { redactApiKeys } from '@boldcreate-integrations/observability';
import { isKeyId, KEY_PREFIX, type ApiKeyKind } from '@boldcreate-integrations/security';
import { bearerKey } from '../delivery/key-auth.js';

const KINDS = Object.keys(KEY_PREFIX) as ApiKeyKind[];
const ID = '0123456789abcdef';
const SECRET = 'a'.repeat(43);

describe('key shapes written as literals agree with the prefix table', () => {
  it.each(KINDS)('redaction keeps the %s key id and drops the secret', (kind) => {
    const keyId = `${KEY_PREFIX[kind]}${ID}`;
    expect(redactApiKeys(`bad ${keyId}.${SECRET}`)).not.toContain(SECRET);
    expect(redactApiKeys(`bad ${keyId}.${SECRET}`)).toContain(keyId);
  });

  it.each(KINDS)(
    'the gateway shape accepts a key of kind %s only when it is a bearer kind',
    (kind) => {
      const accepted = ['foryou', 'session'].includes(kind);
      expect(bearerKey(`Bearer ${KEY_PREFIX[kind]}${ID}.${SECRET}`) !== null).toBe(accepted);
    },
  );

  it('knows every prefix of the table', () => {
    for (const kind of KINDS) expect(isKeyId(`${KEY_PREFIX[kind]}${ID}`, KINDS)).toBe(true);
  });
});
