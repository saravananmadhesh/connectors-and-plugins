/** A whole key (`prk_` or `stk_`, key id, dot, secret) inside any text. */
const KEY_PATTERN = /\b((?:fyk|plk|ptk|prk|stk)_[a-f0-9]{16})\.[A-Za-z0-9_-]{20,}/g;

/** Replaces the secret part of every key in a text; the key id stays so a line can be traced. */
export function redact(text: string): string {
  return text.replace(KEY_PATTERN, '$1.[redacted]');
}

export interface ConnectErrorInit {
  code: string;
  status: number;
  requestId?: string | undefined;
}

/** Every failure the client raises for an answer of the API or for a call it could not make. */
export class ConnectError extends Error {
  readonly code: string;
  readonly status: number;
  readonly requestId: string | undefined;

  constructor(message: string, init: ConnectErrorInit) {
    super(redact(message));
    this.name = new.target.name;
    this.code = init.code;
    this.status = init.status;
    this.requestId = init.requestId;
  }
}

/** The key or token is missing, wrong, expired or not allowed to do this. */
export class ConnectAuthError extends ConnectError {}

/** The thing asked for does not exist, or is not visible to this key. */
export class ConnectNotFoundError extends ConnectError {}

/** Too many calls; wait `retryAfterSeconds` before the next one. */
export class ConnectRateLimitError extends ConnectError {
  readonly retryAfterSeconds: number | undefined;

  constructor(
    message: string,
    init: ConnectErrorInit & { retryAfterSeconds?: number | undefined },
  ) {
    super(message, init);
    this.retryAfterSeconds = init.retryAfterSeconds;
  }
}

/** Downloaded bytes do not match the hash or size the manifest promised. */
export class ConnectIntegrityError extends ConnectError {}

/** What a user still has to do before a server can be used (see `ConnectSetup`). */
export class ConnectSetupRequiredError extends ConnectError {
  readonly setup: unknown;

  constructor(message: string, init: ConnectErrorInit & { setup: unknown }) {
    super(message, init);
    this.setup = init.setup;
  }
}
