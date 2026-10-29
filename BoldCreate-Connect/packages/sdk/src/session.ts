import {
  ConnectError,
  ConnectIntegrityError,
  ConnectNotFoundError,
  ConnectSetupRequiredError,
} from './errors.js';
import { allPages, DEFAULT_BASE_URL, Http, parseJson, type HttpOptions } from './http.js';
import { catalogQuery } from './plugins.js';
import type {
  CatalogPage,
  CatalogQuery,
  Connection,
  Manifest,
  ManifestQuery,
  McpServer,
  ProjectPlugin,
  SyncReport,
  UserPlugin,
} from './types.js';

export interface SessionInfoInput {
  id: string;
  userId: string;
  expiresAt: string | Date;
}

export interface SessionOptions {
  baseUrl?: string | undefined;
  fetch?: typeof fetch | undefined;
  timeoutMs?: number | undefined;
  retry?: HttpOptions['retry'];
  signal?: AbortSignal | undefined;
  allowInsecureHttp?: boolean | undefined;
  /** Waits between attempts and polls; replaced in tests. */
  sleep?: HttpOptions['sleep'];
}

/** An MCP server of a plugin with what the user still has to do before it works. */
export interface SessionAuthConfig {
  pluginId: string;
  componentId: string;
  serverName: string;
  authConfigId: string | null;
  authMode: 'none' | 'api_key' | 'oauth_dcr' | 'oauth_client';
  setup: McpServer['setup'];
  ready: boolean;
}

/** A sign-in that was started; send the user to `redirectUrl`, then wait for it to finish. */
export interface ConnectRequest {
  redirectUrl: string;
  waitForConnection(options?: { timeoutMs?: number; pollIntervalMs?: number }): Promise<Connection>;
}

const DEFAULT_WAIT_MS = 120_000;
const DEFAULT_POLL_MS = 2_000;
const COMPONENT_ID = /^cmp_/;
const pluginPath = (pluginId: string) => `/v1/session/plugins/${encodeURIComponent(pluginId)}`;

async function sha256Of(bytes: Uint8Array): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes as Uint8Array<ArrayBuffer>);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * One user's session: the token an agent or the host's browser code uses for that user only. The
 * token is held privately; `toJSON` and inspection never show it.
 */
export class ConnectSession {
  readonly id: string;
  readonly userId: string;
  readonly expiresAt: Date;
  readonly #token: string;
  readonly #http: Http;
  readonly #sleep: (ms: number) => Promise<void>;
  readonly #renew: (() => Promise<ConnectSession>) | undefined;
  readonly #options: SessionOptions;

  constructor(
    token: string,
    info: SessionInfoInput,
    options: SessionOptions = {},
    renew?: () => Promise<ConnectSession>,
  ) {
    this.#token = token;
    this.id = info.id;
    this.userId = info.userId;
    this.expiresAt = new Date(info.expiresAt);
    this.#http = new Http({
      baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
      token,
      fetch: options.fetch,
      timeoutMs: options.timeoutMs,
      retry: options.retry,
      signal: options.signal,
      allowInsecureHttp: options.allowInsecureHttp,
      sleep: options.sleep,
    });
    this.#options = options;
    this.#sleep =
      options.sleep ?? ((ms) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    this.#renew = renew;
  }

  /** Rebuilds a session from a stored token and what `toJSON` gave. */
  static fromToken(
    token: string,
    info: SessionInfoInput,
    options: SessionOptions = {},
  ): ConnectSession {
    if (!token.startsWith('stk_')) {
      throw new ConnectError('A session token starts with stk_.', {
        code: 'invalid_token',
        status: 0,
      });
    }
    return new ConnectSession(token, info, options);
  }

  /** The same session, with every call cancelled by `signal`. */
  withSignal(signal: AbortSignal): ConnectSession {
    return new ConnectSession(
      this.#token,
      { id: this.id, userId: this.userId, expiresAt: this.expiresAt },
      { ...this.#options, signal },
      this.#renew,
    );
  }

  /** The servers an agent can be pointed at; each carries the session token in its headers. */
  async mcp(options: { plugin?: string; requireReady?: boolean } = {}): Promise<McpServer[]> {
    const manifest = await this.#fetchManifest({});
    if ('notModified' in manifest) return [];
    const servers: McpServer[] = [];
    for (const entry of manifest.entries) {
      if (
        options.plugin &&
        entry.pluginName !== options.plugin &&
        entry.pluginId !== options.plugin
      ) {
        continue;
      }
      for (const server of entry.mcp) {
        if (options.requireReady && !server.ready) {
          throw new ConnectSetupRequiredError(`${server.serverName} is not ready to use.`, {
            code: 'setup_required',
            status: 0,
            setup: server.setup,
          });
        }
        servers.push({
          name: server.serverName,
          url: server.url,
          headers: { Authorization: `Bearer ${this.#token}` },
          ready: server.ready,
          setup: server.setup,
        });
      }
    }
    return servers;
  }

  /** Starts the user's sign-in to a server, named by its component id or its server name. */
  async authorize(
    componentOrServer: string,
    options: { callbackUrl: string },
  ): Promise<ConnectRequest> {
    const componentId = COMPONENT_ID.test(componentOrServer)
      ? componentOrServer
      : await this.#componentOf(componentOrServer);
    const started = await this.#http.json<{ redirectUrl: string }>(
      'POST',
      '/v1/session/connections',
      { body: { componentId, callbackUrl: options.callbackUrl } },
    );
    return {
      redirectUrl: started.redirectUrl,
      waitForConnection: (wait = {}) => this.#waitFor(componentId, wait),
    };
  }

  /** What each server of the user's plugins needs: the auth setup and whether it is ready. */
  async authConfigs(): Promise<SessionAuthConfig[]> {
    const plugins = await this.#plugins();
    return plugins.flatMap((plugin) =>
      plugin.mcp.map((server) => ({
        pluginId: plugin.pluginId,
        componentId: server.componentId,
        serverName: server.serverName,
        authConfigId: server.authConfigId,
        authMode: server.authMode,
        setup: server.setup,
        ready: server.ready,
      })),
    );
  }

  /** The plugins this user may install. */
  catalog(options: CatalogQuery = {}): Promise<CatalogPage> {
    return this.#http.json<CatalogPage>('GET', '/v1/session/catalog', {
      query: catalogQuery(options),
    });
  }

  readonly plugins = {
    list: (): Promise<UserPlugin[]> => this.#plugins(),

    install: (pluginId: string, options: { versionId?: string } = {}) =>
      this.#http.json<ProjectPlugin>('PUT', pluginPath(pluginId), { body: options }),

    update: (pluginId: string, options: { versionId: string }) =>
      this.#http.json<ProjectPlugin>('PUT', pluginPath(pluginId), { body: options }),

    remove: async (pluginId: string): Promise<void> => {
      await this.#http.json('DELETE', pluginPath(pluginId));
    },

    /** Sets the values a plugin asks for; a value is sent and never read back. */
    setVariables: (pluginId: string, values: Record<string, string | null>) =>
      this.#http.json<UserPlugin>('PUT', `${pluginPath(pluginId)}/variables`, { body: { values } }),

    /**
     * Turns one component on or off for the user. On the user's own install it changes the
     * install; on a plugin the project provides it stores the user's own preference.
     */
    setComponentEnabled: (
      pluginId: string,
      componentId: string,
      enabled: boolean,
    ): Promise<UserPlugin> =>
      this.#http.json<UserPlugin>(
        'PUT',
        `${pluginPath(pluginId)}/components/${encodeURIComponent(componentId)}`,
        { body: { enabled } },
      ),

    /** Drops the user's own preference for one component, following the install again. */
    clearComponentEnabled: (pluginId: string, componentId: string): Promise<UserPlugin> =>
      this.#http.json<UserPlugin>(
        'DELETE',
        `${pluginPath(pluginId)}/components/${encodeURIComponent(componentId)}`,
      ),
  };

  /** The plugin files to place. Pass the last revision to get `{ notModified: true }` when equal. */
  manifest(options: ManifestQuery = {}): Promise<Manifest | { notModified: true }> {
    return this.#fetchManifest(options);
  }

  /** One component archive, checked against its hash and size before it is returned. */
  async component(sha256: string): Promise<Uint8Array> {
    const answer = await this.#http.raw(
      'GET',
      `/v1/sync/components/${encodeURIComponent(sha256)}`,
      {
        headers: { accept: 'application/gzip' },
      },
    );
    const declared = answer.headers.get('content-length');
    if (declared !== null && Number(declared) !== answer.bytes.length) {
      throw new ConnectIntegrityError('The component has a different size than announced.', {
        code: 'integrity_size',
        status: answer.status,
      });
    }
    if ((await sha256Of(answer.bytes)) !== sha256) {
      throw new ConnectIntegrityError('The component does not match its hash.', {
        code: 'integrity_hash',
        status: answer.status,
      });
    }
    return answer.bytes;
  }

  /** Tells the API which components were placed. */
  async report(report: SyncReport): Promise<void> {
    await this.#http.json('POST', '/v1/sync/reports', {
      body: { target: report.target, applied: report.applied, skipped: report.skipped ?? [] },
    });
  }

  /** A fresh session for the same user; only a session made by `ConnectClient.create` can do this. */
  refresh(): Promise<ConnectSession> {
    if (!this.#renew) {
      throw new ConnectError('This session was not created here, so it cannot be renewed.', {
        code: 'refresh_unavailable',
        status: 0,
      });
    }
    return this.#renew();
  }

  /** What may be stored or logged; never the token. */
  toJSON(): { id: string; userId: string; expiresAt: string } {
    return { id: this.id, userId: this.userId, expiresAt: this.expiresAt.toISOString() };
  }

  /** The token, for the one place that hands it to an agent. Not part of `toJSON`. */
  get token(): string {
    return this.#token;
  }

  async #plugins(): Promise<UserPlugin[]> {
    return allPages<UserPlugin>(this.#http, '/v1/session/plugins');
  }

  async #fetchManifest(options: ManifestQuery): Promise<Manifest | { notModified: true }> {
    const answer = await this.#http.raw('GET', '/v1/sync', {
      query: {
        kinds: options.kinds?.join(','),
        plugins: options.plugins?.join(','),
      },
      headers: options.revision ? { 'if-none-match': `"${options.revision}"` } : undefined,
    });
    if (answer.status === 304) return { notModified: true };
    return parseJson<Manifest>(answer);
  }

  async #componentOf(serverName: string): Promise<string> {
    const manifest = await this.#fetchManifest({});
    if (!('notModified' in manifest)) {
      for (const entry of manifest.entries) {
        const found = entry.mcp.find((server) => server.serverName === serverName);
        if (found) return found.componentId;
      }
    }
    throw new ConnectNotFoundError(`No server named ${serverName} was found for this user.`, {
      code: 'not_found',
      status: 404,
    });
  }

  async #waitFor(
    componentId: string,
    options: { timeoutMs?: number; pollIntervalMs?: number },
  ): Promise<Connection> {
    const deadline = Date.now() + (options.timeoutMs ?? DEFAULT_WAIT_MS);
    const every = options.pollIntervalMs ?? DEFAULT_POLL_MS;
    for (;;) {
      const connections = await allPages<Connection>(this.#http, '/v1/session/connections');
      const found = connections.find(
        (connection) => connection.componentId === componentId && connection.status === 'active',
      );
      if (found) return found;
      if (Date.now() + every > deadline) {
        throw new ConnectError('The sign-in did not finish in time.', {
          code: 'connection_timeout',
          status: 0,
        });
      }
      await this.#sleep(every);
    }
  }
}
