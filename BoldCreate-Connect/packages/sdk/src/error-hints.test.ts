import { describe, expect, it } from 'vitest';
import { ConnectError } from './errors.js';

describe('advice on an OAuth failure', () => {
  it.each([
    ['oauth_client_not_configured', 'client ID and secret'],
    ['oauth_registration_failed', 'pre-registered client ID'],
    ['oauth_discovery_failed', 'PKCE'],
  ])('adds what to do for %s', (code, advice) => {
    const error = new ConnectError('The API message.', { code, status: 502 });
    expect(error.message.startsWith('The API message. ')).toBe(true);
    expect(error.message).toContain(advice);
    expect(error.hint).toContain(advice);
  });

  it('adds it once', () => {
    const first = new ConnectError('m', { code: 'oauth_registration_failed', status: 502 });
    const again = new ConnectError(first.message, {
      code: 'oauth_registration_failed',
      status: 502,
    });
    expect(again.message).toBe(first.message);
  });

  it('leaves other codes as they are', () => {
    const error = new ConnectError('Nope.', { code: 'forbidden', status: 403 });
    expect(error.message).toBe('Nope.');
    expect(error.hint).toBeUndefined();
  });
});
