import {
  ConnectAuthError,
  ConnectError,
  ConnectNotFoundError,
  ConnectRateLimitError,
  redact,
} from './errors.js';

/** How reads and idempotent writes (GET, PUT, DELETE) are retried; a POST never is. */
export interface RetryOptions {
  /** Retries after the first attempt. 0 turns retrying off. Default 3. */
  maxRetries?: number | undefined;
  /** Wait before the first retry; it doubles each time. Default 250. */
  backoffMs?: number | undefined;
  /** The longest wait, also the cap on a `Retry-After`. Default 10000. */
  maxWaitMs?: number | undefined;
}

export interface HttpOptions {
  baseUrl: string;
  token: string;
  fetch?: typeof fetch | undefined;
  timeoutMs?: number | undefined;
  retry?: RetryOptions | undefined;
  /** Cancels every call of this client; a cancelled call is never retried. */
  signal?: AbortSignal | undefined;
  /** Allow `http:` for a host that is not loopback. Off by default. */
  allowInsecureHttp?: boolean | undefined;
  /** Waits between attempts; replaced in tests. */
  sleep?: ((ms: number) => Promise<void>) | undefined;
}

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined> | undefined;
  body?: unknown;
  headers?: Record<string, string> | undefined;
  /**
   * Send an `Idempotency-Key` (`true` makes one for this call, a string is used as given). The API
   * answers a repeat with the first answer, so a POST that carries a key may be retried.
   */
  idempotencyKey?: string | true | undefined;
}

const KEY_FORMAT = /^[!-~]{1,255}$/;

/** An idempotency key as the API accepts it: 1 to 255 printable characters without a space. */
export function checkIdempotencyKey(key: string): void {
  if (!KEY_FORMAT.test(key)) {
    throw new ConnectError('An idempotency key has 1 to 255 printable characters, no spaces.', {
      code: 'invalid_idempotency_key',
      status: 0,
    });
  }
}

export interface RawAnswer {
  status: number;
  headers: Headers;
  bytes: Uint8Array;
}

export const DEFAULT_BASE_URL = 'https://api.boldcreate.com';
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;
const BACKOFF_MS = 250;
const MAX_WAIT_MS = 10_000;
const RETRY_STATUSES = new Set([429, 502, 503]);
/** Idempotent in this API: repeating one gives the same state. */
const RETRY_METHODS = new Set(['GET', 'PUT', 'DELETE']);
const LOOPBACK = new Set(['localhost', '127.0.0.1', '[::1]']);

/** A base address must be https, or http on this machine; anything else sends the key in clear text. */
export function checkBaseUrl(baseUrl: string, allowInsecureHttp = false): void {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    throw new ConnectError('The base URL is not a valid address.', {
      code: 'invalid_base_url',
      status: 0,
    });
  }
  const secure =
    url.protocol === 'https:' ||
    (url.protocol === 'http:' && (allowInsecureHttp || LOOPBACK.has(url.hostname)));
  if (!secure || url.username !== '' || url.password !== '') {
    throw new ConnectError('The base URL must use https and carry no credentials.', {
      code: 'invalid_base_url',
      status: 0,
    });
  }
}

/** A user id as Connect accepts it: 1 to 255 characters. */
export function checkUserId(userId: string): void {
  if (typeof userId !== 'string' || userId.length < 1 || userId.length > 255) {
    throw new ConnectError('A user id must have 1 to 255 characters.', {
      code: 'invalid_user_id',
      status: 0,
    });
  }
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Seconds from a `Retry-After` header; a date or nonsense gives undefined. */
export function retryAfterOf(value: string | null): number | undefined {
  if (value === null || !/^\d+$/.test(value.trim())) return undefined;
  return Number(value);
}

function queryString(query: RequestOptions['query']): string {
  if (!query) return '';
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const text = params.toString();
  return text === '' ? '' : `?${text}`;
}

interface ErrorBody {
  error?: { code?: string; message?: string; requestId?: string };
}

/** Turns a failed answer into the error class that fits its status. */
async function failure(answer: RawAnswer): Promise<ConnectError> {
  let parsed: ErrorBody = {};
  try {
    parsed = JSON.parse(new TextDecoder().decode(answer.bytes)) as ErrorBody;
  } catch {
    // an answer without a JSON body still has a status
  }
  const init = {
    code: parsed.error?.code ?? `http_${answer.status}`,
    status: answer.status,
    requestId: parsed.error?.requestId ?? answer.headers.get('x-request-id') ?? undefined,
  };
  const message = parsed.error?.message ?? `The request failed with status ${answer.status}.`;
  if (answer.status === 401 || answer.status === 403) return new ConnectAuthError(message, init);
  if (answer.status === 404) return new ConnectNotFoundError(message, init);
  if (answer.status === 429) {
    return new ConnectRateLimitError(message, {
      ...init,
      retryAfterSeconds: retryAfterOf(answer.headers.get('retry-after')),
    });
  }
  return new ConnectError(message, init);
}

/** The JSON body of an answer; a body that is not JSON is an error of the API, not a crash. */
export function parseJson<T>(answer: RawAnswer): T {
  try {
    return JSON.parse(new TextDecoder().decode(answer.bytes)) as T;
  } catch {
    throw new ConnectError('The answer is not valid JSON.', {
      code: 'invalid_response',
      status: answer.status,
    });
  }
}

/** One place that calls the API: bearer token, timeout, retry of reads, error mapping. */
export class Http {
  readonly #baseUrl: string;
  readonly #token: string;
  readonly #doFetch: typeof fetch;
  readonly #timeoutMs: number;
  readonly #sleep: (ms: number) => Promise<void>;
  readonly #retry: { maxRetries: number; backoffMs: number; maxWaitMs: number };
  readonly #signal: AbortSignal | undefined;

  constructor(options: HttpOptions) {
    checkBaseUrl(options.baseUrl, options.allowInsecureHttp);
    this.#retry = {
      maxRetries: options.retry?.maxRetries ?? MAX_RETRIES,
      backoffMs: options.retry?.backoffMs ?? BACKOFF_MS,
      maxWaitMs: options.retry?.maxWaitMs ?? MAX_WAIT_MS,
    };
    for (const [name, value] of Object.entries({
      ...this.#retry,
      timeoutMs: options.timeoutMs ?? 1,
    })) {
      if (!Number.isFinite(value) || value < 0) {
        throw new ConnectError(`The option ${name} must be a number of 0 or more.`, {
          code: 'invalid_option',
          status: 0,
        });
      }
    }
    this.#signal = options.signal;
    this.#baseUrl = options.baseUrl.replace(/\/+$/, '');
    this.#token = options.token;
    this.#doFetch = options.fetch ?? ((input, init) => fetch(input, init));
    this.#timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.#sleep = options.sleep ?? wait;
  }

  /** A JSON call; an answer of 204 gives undefined. */
  async json<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
    const answer = await this.raw(method, path, options);
    if (answer.bytes.length === 0) return undefined as T;
    return parseJson<T>(answer);
  }

  /** The answer as bytes, with its status; any status of 400 and over throws. */
  async raw(method: string, path: string, options: RequestOptions = {}): Promise<RawAnswer> {
    const key =
      options.idempotencyKey === true ? globalThis.crypto.randomUUID() : options.idempotencyKey;
    if (key !== undefined) checkIdempotencyKey(key);
    const repeatable = RETRY_METHODS.has(method) || key !== undefined;
    const sent: RequestOptions =
      key === undefined
        ? options
        : { ...options, headers: { ...options.headers, 'idempotency-key': key } };
    for (let attempt = 0; ; attempt += 1) {
      this.#throwIfCancelled();
      let answer: RawAnswer | undefined;
      let cause: unknown;
      try {
        answer = await this.#once(method, path, sent);
      } catch (error) {
        cause = error;
      }
      this.#throwIfCancelled();
      const retriable =
        repeatable &&
        attempt < this.#retry.maxRetries &&
        (answer === undefined || RETRY_STATUSES.has(answer.status));
      if (retriable) {
        const asked = answer ? retryAfterOf(answer.headers.get('retry-after')) : undefined;
        const delay =
          asked !== undefined
            ? Math.min(asked * 1000, this.#retry.maxWaitMs)
            : Math.min(this.#retry.backoffMs * 2 ** attempt, this.#retry.maxWaitMs);
        await this.#sleep(delay);
        continue;
      }
      if (answer === undefined) {
        const reason = cause instanceof Error ? cause.message : 'unknown error';
        throw new ConnectError(`The request could not be made: ${redact(reason)}`, {
          code: 'network_error',
          status: 0,
        });
      }
      if (answer.status >= 400) throw await failure(answer);
      return answer;
    }
  }

  #throwIfCancelled(): void {
    if (this.#signal?.aborted) {
      throw new ConnectError('The request was cancelled.', { code: 'aborted', status: 0 });
    }
  }

  async #once(method: string, path: string, options: RequestOptions): Promise<RawAnswer> {
    const headers: Record<string, string> = {
      authorization: `Bearer ${this.#token}`,
      accept: 'application/json',
      ...options.headers,
    };
    let body: string | undefined;
    if (options.body !== undefined) {
      body = JSON.stringify(options.body);
      headers['content-type'] = 'application/json';
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeoutMs);
    const signal = this.#signal
      ? AbortSignal.any([controller.signal, this.#signal])
      : controller.signal;
    try {
      const response = await this.#doFetch(`${this.#baseUrl}${path}${queryString(options.query)}`, {
        method,
        headers,
        ...(body === undefined ? {} : { body }),
        signal,
      });
      return {
        status: response.status,
        headers: response.headers,
        bytes: new Uint8Array(await response.arrayBuffer()),
      };
    } finally {
      clearTimeout(timer);
    }
  }
}

const MAX_PAGES = 200;

/** Every item of a list that pages by cursor, up to a fixed number of pages. */
export async function allPages<T>(
  http: Http,
  path: string,
  query: RequestOptions['query'] = {},
): Promise<T[]> {
  const items: T[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const result = await http.json<{ items: T[]; nextCursor: string | null }>('GET', path, {
      query: { ...query, limit: 100, cursor },
    });
    items.push(...result.items);
    if (!result.nextCursor) break;
    cursor = result.nextCursor;
  }
  return items;
}
