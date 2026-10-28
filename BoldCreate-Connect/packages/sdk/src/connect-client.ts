import { authConfigsApi } from './auth-configs.js';
import { connectionsApi } from './connections.js';
import { ConnectError, redact } from './errors.js';
import { checkUserId, DEFAULT_BASE_URL, Http, type RetryOptions } from './http.js';
import { logsApi, usageRequest, type UsageOptions } from './logs.js';
import { catalogApi, pluginsApi } from './plugins.js';
import { ConnectSession } from './session.js';
import { createSessionRequest, sessionsApi, type CreateSessionOptions } from './sessions.js';
import { usersApi } from './users.js';
import { webhooksApi } from './webhooks.js';
import type { Usage } from './types.js';

export interface ConnectClientOptions {
  /** A project key (`prk_`). Keep it on your server. */
  apiKey: string;
  baseUrl?: string;
  fetch?: typeof fetch;
  timeoutMs?: number;
  /** Retry policy for GET, PUT and DELETE. Default: 3 retries, 250 ms doubling, 10 s at most. */
  retry?: RetryOptions;
  /** Cancels every call of the client and of the sessions it makes. */
  signal?: AbortSignal;
  /** Allow `http:` for a host that is not loopback. Off by default. */
  allowInsecureHttp?: boolean;
}

const inBrowser = () =>
  typeof (globalThis as { window?: unknown }).window !== 'undefined' &&
  typeof (globalThis as { document?: unknown }).document !== 'undefined';

/**
 * The client of a host: manage the project's users, plugins, sessions, connections and logs with
 * a project key, and mint a `ConnectSession` for one user at a time.
 */
export class ConnectClient {
  readonly users;
  readonly sessions;
  readonly plugins;
  readonly catalog;
  readonly authConfigs;
  readonly connections;
  readonly logs;
  readonly webhooks;
  readonly #http: Http;
  readonly #options: ConnectClientOptions;

  constructor(options: ConnectClientOptions) {
    if (!options.apiKey) {
      throw new ConnectError('An API key is required.', { code: 'invalid_key', status: 0 });
    }
    if (inBrowser() && !options.apiKey.startsWith('stk_')) {
      throw new ConnectError(
        'A project key must stay on your server. Use a session token in the browser.',
        { code: 'browser_key_refused', status: 0 },
      );
    }
    this.#options = { ...options, apiKey: options.apiKey };
    this.#http = new Http({
      baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
      token: options.apiKey,
      fetch: options.fetch,
      timeoutMs: options.timeoutMs,
      retry: options.retry,
      signal: options.signal,
      allowInsecureHttp: options.allowInsecureHttp,
    });
    this.users = usersApi(this.#http);
    this.sessions = sessionsApi(this.#http);
    this.plugins = pluginsApi(this.#http);
    this.catalog = catalogApi(this.#http);
    this.authConfigs = authConfigsApi(this.#http);
    this.connections = connectionsApi(this.#http);
    this.logs = logsApi(this.#http);
    this.webhooks = webhooksApi(this.#http);
  }

  /** A session for one user of the host, who is added to the project if new. */
  async create(userId: string, options: CreateSessionOptions = {}): Promise<ConnectSession> {
    checkUserId(userId);
    if (options.plugins?.length === 0) {
      throw new ConnectError(
        'An empty plugin list means "everything the user can see". Leave plugins out for no allow list, or name the plugins.',
        { code: 'invalid_plugins', status: 0 },
      );
    }
    const created = await createSessionRequest(this.#http, userId, options);
    // A renewed session is a new creation, so it must not reuse the key of the first one.
    const { idempotencyKey: _first, ...again } = options;
    const renew = () => this.create(userId, again);
    return new ConnectSession(
      created.token,
      created,
      {
        baseUrl: this.#options.baseUrl,
        fetch: this.#options.fetch,
        timeoutMs: this.#options.timeoutMs,
        retry: this.#options.retry,
        signal: this.#options.signal,
        allowInsecureHttp: this.#options.allowInsecureHttp,
      },
      renew,
    );
  }

  /** The same client, with every call cancelled by `signal` (for example `AbortSignal.timeout(5000)`). */
  withSignal(signal: AbortSignal): ConnectClient {
    return new ConnectClient({ ...this.#options, signal });
  }

  usage(options: UsageOptions = {}): Promise<Usage> {
    return usageRequest(this.#http, options);
  }

  /** The key never shows in what is printed or stored. */
  toJSON(): { baseUrl: string } {
    return { baseUrl: this.#options.baseUrl ?? DEFAULT_BASE_URL };
  }

  toString(): string {
    return redact(`ConnectClient(${this.#options.baseUrl ?? DEFAULT_BASE_URL})`);
  }
}
