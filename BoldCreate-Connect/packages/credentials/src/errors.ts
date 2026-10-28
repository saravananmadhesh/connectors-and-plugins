import { AppError } from '@boldcreate-integrations/contracts';

export type CredentialUnavailableReason =
  | 'kms_unavailable'
  | 'key_unusable'
  | 'key_not_found'
  | 'malformed'
  | 'open_failed';

/**
 * A sealed value cannot be opened right now. Maps to `503 credential_unavailable`; the reason
 * is for logs and metrics only and never reaches a response.
 */
export class CredentialUnavailableError extends AppError {
  readonly reason: CredentialUnavailableReason;

  constructor(reason: CredentialUnavailableReason) {
    super('credential_unavailable');
    this.name = 'CredentialUnavailableError';
    this.reason = reason;
  }
}
