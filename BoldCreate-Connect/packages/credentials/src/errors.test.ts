import { AppError } from '@boldcreate-integrations/contracts';
import { describe, expect, it } from 'vitest';
import { CredentialUnavailableError, isCredentialFault } from './errors.js';

describe('isCredentialFault', () => {
  it('records an unexpected failure and a value that cannot be opened', () => {
    expect(isCredentialFault(new Error('boom'))).toBe(true);
    expect(isCredentialFault(new CredentialUnavailableError('open_failed'))).toBe(true);
    expect(isCredentialFault(new CredentialUnavailableError('key_unusable'))).toBe(true);
  });

  it('leaves out an unreachable key service, which is recorded where it is called', () => {
    expect(isCredentialFault(new CredentialUnavailableError('kms_unavailable'))).toBe(false);
  });

  it('leaves out an expected answer', () => {
    expect(isCredentialFault(new AppError('org_key_pending'))).toBe(false);
  });
});
