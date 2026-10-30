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

  /** Which sealed value could not be opened: its purpose, subject kind and key. For logs only. */
  readonly detail: Readonly<Record<string, string>> | undefined;

  constructor(
    reason: CredentialUnavailableReason,
    cause?: unknown,
    detail?: Readonly<Record<string, string>>,
  ) {
    super('credential_unavailable');
    this.name = 'CredentialUnavailableError';
    this.reason = reason;
    this.detail = detail;
    // What the key management service or the envelope reader said; for logs, never a response.
    if (cause !== undefined) this.cause = cause;
  }
}

/**
 * Whether a failure to seal or open a value is a fault worth recording. Expected answers (a key
 * not yet created, a caller error) are not, and an unreachable key management service is already
 * recorded where that service is called.
 */
export function isCredentialFault(error: unknown): boolean {
  if (error instanceof CredentialUnavailableError) return error.reason !== 'kms_unavailable';
  return !(error instanceof AppError);
}
