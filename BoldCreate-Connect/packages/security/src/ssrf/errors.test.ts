import { describe, expect, it } from 'vitest';
import { SsrfError, isUpstreamFault } from './errors.js';

describe('isUpstreamFault', () => {
  it('counts a network failure and leaves out a refusal by the guard', () => {
    expect(isUpstreamFault(new Error('ECONNRESET'))).toBe(true);
    expect(isUpstreamFault(new SsrfError('url_not_allowed', 'dns'))).toBe(false);
  });
});
