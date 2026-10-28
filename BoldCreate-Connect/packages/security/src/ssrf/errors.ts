export type SsrfErrorCode =
  | 'url_not_allowed'
  | 'redirect'
  | 'too_large'
  | 'timeout'
  | 'configuration';

/** Internal reason; goes to logs only, never to a client. */
export type SsrfReason =
  | 'scheme'
  | 'userinfo'
  | 'port'
  | 'host'
  | 'dns'
  | 'blocked_address'
  | 'redirect'
  | 'syntax';

/**
 * Outbound-call refusal. `message` is the fixed code so it is safe to return to a client; the
 * rule that fired is in `reason` and must only be logged.
 */
export class SsrfError extends Error {
  readonly code: SsrfErrorCode;
  readonly reason: SsrfReason | undefined;

  constructor(code: SsrfErrorCode, reason?: SsrfReason) {
    super(code);
    this.name = 'SsrfError';
    this.code = code;
    this.reason = reason;
  }
}
