import { describe, expect, it } from 'vitest';
import { signWebhook, verifyWebhook } from './webhook-signature.js';

const input = {
  secret: 'whsec_test_secret',
  id: 'evt_0123456789abcdef0123456789abcdef',
  body: '{"a":1}',
};
const timestamp = 1_760_000_000;
const now = new Date(timestamp * 1000 + 10_000);
const signature = signWebhook({ ...input, timestamp });

describe('signWebhook', () => {
  it('matches a known vector', () => {
    expect(signature).toBe('v1,XSeDKn0YJqb0rI3qVxc77dR3ASAZNOvGgHK5wg8KJCE=');
  });
});

describe('verifyWebhook', () => {
  const check = (changes: Partial<Parameters<typeof verifyWebhook>[0]> = {}) =>
    verifyWebhook({ ...input, timestamp: String(timestamp), signature, now, ...changes });

  it('accepts the signature it made', () => {
    expect(check()).toBe(true);
  });

  it('refuses a changed body, id, secret or signature', () => {
    expect(check({ body: '{"a":2}' })).toBe(false);
    expect(check({ id: 'evt_other' })).toBe(false);
    expect(check({ secret: 'whsec_other' })).toBe(false);
    expect(check({ signature: 'v1,AAAA' })).toBe(false);
    expect(check({ signature: '' })).toBe(false);
  });

  it('refuses an old or future timestamp and a malformed one', () => {
    expect(check({ now: new Date(timestamp * 1000 + 301_000) })).toBe(false);
    expect(check({ now: new Date(timestamp * 1000 - 301_000) })).toBe(false);
    expect(check({ timestamp: 'abc' })).toBe(false);
    expect(check({ timestamp: '' })).toBe(false);
  });

  it('accepts any one of several signatures, as during a rotation', () => {
    expect(check({ signature: `v1,AAAA ${signature}` })).toBe(true);
  });
});
