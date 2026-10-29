import { describe, expect, it } from 'vitest';
import { validateInstalledSearch } from './installed-search';

describe('validateInstalledSearch', () => {
  it('keeps a component tab', () => {
    expect(validateInstalledSearch({ tab: 'skill' })).toEqual({ tab: 'skill' });
  });

  it('leaves the plugins tab and unknown values out of the address', () => {
    expect(validateInstalledSearch({ tab: 'plugins' })).toEqual({ tab: undefined });
    expect(validateInstalledSearch({ tab: 'nope' })).toEqual({ tab: undefined });
    expect(validateInstalledSearch({})).toEqual({ tab: undefined });
  });
});

describe('sign-in outcome', () => {
  it('keeps a completed sign-in', () => {
    expect(validateInstalledSearch({ oauth: 'connected' })).toMatchObject({ oauth: 'connected' });
  });

  it('reads the web server failure and its reason', () => {
    expect(
      validateInstalledSearch({ oauth: 'failed', reason: 'oauth_state_invalid' }),
    ).toMatchObject({ oauth: 'failed', reason: 'oauth_state_invalid' });
  });

  it('treats an api error code as the outcome as a failure with that reason', () => {
    expect(validateInstalledSearch({ oauth: 'oauth_exchange_failed' })).toMatchObject({
      oauth: 'failed',
      reason: 'oauth_exchange_failed',
    });
    expect(validateInstalledSearch({ oauth: 'denied' })).toMatchObject({
      oauth: 'failed',
      reason: 'denied',
    });
  });

  it('drops a reason that is not an error code', () => {
    const search = validateInstalledSearch({ oauth: 'failed', reason: '<b>hi</b>' });
    expect(search.oauth).toBe('failed');
    expect(search.reason).toBeUndefined();
  });
});

describe('sign-in detail', () => {
  it('keeps what the sign-in service said, when it is a plain code', () => {
    expect(
      validateInstalledSearch({ oauth: 'oauth_exchange_failed', detail: 'invalid_grant' }),
    ).toMatchObject({ oauth: 'failed', reason: 'oauth_exchange_failed', detail: 'invalid_grant' });
    expect(
      validateInstalledSearch({ oauth: 'oauth_exchange_failed', detail: 'a b <c>' }).detail,
    ).toBeUndefined();
  });
});
