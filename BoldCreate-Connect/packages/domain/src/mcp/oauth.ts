/**
 * The OAuth steps a member's connection to an MCP server needs: discovery of the authorization
 * server (RFC 9728, RFC 8414), dynamic client registration (RFC 7591), PKCE (S256), the
 * authorization URL with a `resource` (RFC 8707), and the code and refresh token requests.
 * Requests go through the same injected fetch as the MCP traffic.
 */
import { createHash, randomBytes } from 'node:crypto';
import type { McpOAuthMetadata } from '@boldcreate-integrations/db';
import type { UpstreamFetch, UpstreamResponse } from './upstream.js';

export type OAuthFailureCode =
  | 'oauth_discovery_failed'
  | 'oauth_registration_failed'
  | 'oauth_token_failed'
  /** The refresh token or code is no longer accepted; the member must connect again. */
  | 'oauth_invalid_grant'
  | 'oauth_issuer_mismatch';

export class OAuthError extends Error {
  /**
   * What the other side said, when it said something: its OAuth `error` code, or `http_<status>`,
   * `unreachable` or `no_access_token`. Never a description or token text.
   */
  readonly detail: string | undefined;

  constructor(
    readonly code: OAuthFailureCode,
    detail?: string,
  ) {
    super(code);
    this.name = 'OAuthError';
    this.detail = detail;
  }
}

const DETAIL = /^[A-Za-z0-9_.-]{1,64}$/;

/** A provider's error code, when it is short and plain enough to repeat. */
export function oauthErrorDetail(value: unknown): string | undefined {
  return typeof value === 'string' && DETAIL.test(value) ? value : undefined;
}

const TIMEOUT_MS = 10_000;

function json(response: UpstreamResponse): Record<string, unknown> | null {
  try {
    const value: unknown = JSON.parse(response.body.toString('utf8'));
    return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

async function getJson(
  fetcher: UpstreamFetch,
  url: string,
): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetcher(
      url,
      { method: 'GET', headers: { accept: 'application/json' } },
      { timeoutMs: TIMEOUT_MS },
    );
    return response.status === 200 ? json(response) : null;
  } catch {
    return null;
  }
}

const text = (value: unknown): string | undefined =>
  typeof value === 'string' && value !== '' ? value : undefined;

/** `/.well-known/<suffix>` placed before the path of the URL, as RFC 8414 and RFC 9728 describe. */
function wellKnown(base: string, suffix: string): string {
  const url = new URL(base);
  const path = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
  return `${url.origin}/.well-known/${suffix}${path}`;
}

/** Finds the authorization server of an MCP server and what it supports. */
export async function discoverOAuth(
  fetcher: UpstreamFetch,
  mcpUrl: string,
): Promise<McpOAuthMetadata> {
  let issuerBase = new URL(mcpUrl).origin;
  let resource = mcpUrl;
  const protectedResource =
    (await getJson(fetcher, wellKnown(mcpUrl, 'oauth-protected-resource'))) ??
    (await getJson(fetcher, `${new URL(mcpUrl).origin}/.well-known/oauth-protected-resource`));
  if (protectedResource) {
    const servers = protectedResource['authorization_servers'];
    const first = Array.isArray(servers) ? text(servers[0]) : undefined;
    if (first) issuerBase = first;
    resource = text(protectedResource['resource']) ?? resource;
  }
  const meta =
    (await getJson(fetcher, wellKnown(issuerBase, 'oauth-authorization-server'))) ??
    (await getJson(fetcher, wellKnown(issuerBase, 'openid-configuration')));
  const authorizationEndpoint = text(meta?.['authorization_endpoint']);
  const tokenEndpoint = text(meta?.['token_endpoint']);
  const issuer = text(meta?.['issuer']);
  if (!meta || !authorizationEndpoint || !tokenEndpoint || !issuer) {
    throw new OAuthError('oauth_discovery_failed');
  }
  const methods = meta['code_challenge_methods_supported'];
  if (Array.isArray(methods) && !methods.includes('S256')) {
    throw new OAuthError('oauth_discovery_failed');
  }
  const registrationEndpoint = text(meta['registration_endpoint']);
  // What the resource itself asks for wins; the authorization server's list is the fallback.
  const listed = (doc: Record<string, unknown> | null | undefined): string[] | undefined => {
    const value = doc?.['scopes_supported'];
    if (!Array.isArray(value)) return undefined;
    const found = value.filter((scope): scope is string => typeof scope === 'string');
    return found.length > 0 ? found : undefined;
  };
  const scopes = listed(protectedResource) ?? listed(meta);
  return {
    issuer,
    authorizationEndpoint,
    tokenEndpoint,
    ...(registrationEndpoint ? { registrationEndpoint } : {}),
    resource,
    ...(scopes ? { scopes } : {}),
  };
}

export interface RegisteredClient {
  clientId: string;
  clientSecret?: string;
}

/** What a registration endpoint answered when it refused; for the server log only. */
export interface RegistrationRejection {
  status: number;
  /** The `error` code of the answer, such as `invalid_redirect_uri`. */
  error?: string;
  /** The `error_description` of the answer, cut short. */
  description?: string;
  /** The client type that was asked for. */
  authMethod: string;
}

/**
 * The client types to ask for, in order. Most servers accept a public client; some only issue
 * clients that hold a secret and refuse the first request.
 */
const REGISTRATION_ATTEMPTS: readonly Record<string, string>[] = [
  { token_endpoint_auth_method: 'none' },
  { token_endpoint_auth_method: 'client_secret_post', application_type: 'web' },
];

/** A refusal that another client type could fix; a busy or failing server would not be helped. */
const retryable = (status: number): boolean => status >= 400 && status < 500 && status !== 429;

/**
 * Registers this application as a client of the authorization server. A refusal is retried with
 * the next client type; `onRejected` hears each refusal so the cause can be logged.
 */
export async function registerClient(
  fetcher: UpstreamFetch,
  metadata: McpOAuthMetadata,
  redirectUri: string,
  clientName: string,
  onRejected?: (rejection: RegistrationRejection) => void,
): Promise<RegisteredClient> {
  if (!metadata.registrationEndpoint) throw new OAuthError('oauth_registration_failed');
  for (const attempt of REGISTRATION_ATTEMPTS) {
    let response: UpstreamResponse;
    try {
      response = await fetcher(
        metadata.registrationEndpoint,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            client_name: clientName,
            redirect_uris: [redirectUri],
            grant_types: ['authorization_code', 'refresh_token'],
            response_types: ['code'],
            ...attempt,
          }),
        },
        { timeoutMs: TIMEOUT_MS },
      );
    } catch {
      throw new OAuthError('oauth_registration_failed');
    }
    const body = json(response);
    const clientId = text(body?.['client_id']);
    if (response.status >= 200 && response.status < 300 && clientId) {
      const clientSecret = text(body?.['client_secret']);
      return { clientId, ...(clientSecret ? { clientSecret } : {}) };
    }
    const error = text(body?.['error']);
    const description = text(body?.['error_description']);
    onRejected?.({
      status: response.status,
      ...(error ? { error } : {}),
      ...(description ? { description: description.slice(0, 200) } : {}),
      authMethod: attempt['token_endpoint_auth_method'] ?? '',
    });
    if (!retryable(response.status)) break;
  }
  throw new OAuthError('oauth_registration_failed');
}

const base64Url = (bytes: Buffer): string => bytes.toString('base64url');

export function newPkce(): { verifier: string; challenge: string } {
  const verifier = base64Url(randomBytes(48));
  return { verifier, challenge: base64Url(createHash('sha256').update(verifier).digest()) };
}

export const newState = (): string => base64Url(randomBytes(32));

export const hashState = (state: string): string =>
  createHash('sha256').update(state).digest('hex');

export function authorizationUrl(input: {
  metadata: McpOAuthMetadata;
  clientId: string;
  redirectUri: string;
  state: string;
  challenge: string;
}): string {
  const url = new URL(input.metadata.authorizationEndpoint);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', input.clientId);
  url.searchParams.set('redirect_uri', input.redirectUri);
  url.searchParams.set('state', input.state);
  url.searchParams.set('code_challenge', input.challenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('resource', input.metadata.resource);
  if (input.metadata.scopes && input.metadata.scopes.length > 0) {
    url.searchParams.set('scope', input.metadata.scopes.join(' '));
  }
  return url.toString();
}

export interface TokenSet {
  accessToken: string;
  refreshToken?: string;
  /** Seconds the access token lives, when the server said. */
  expiresIn?: number;
  scope?: string;
}

async function tokenRequest(
  fetcher: UpstreamFetch,
  metadata: McpOAuthMetadata,
  form: Record<string, string>,
  client: { clientId: string; clientSecret?: string | undefined },
): Promise<TokenSet> {
  const params = new URLSearchParams({
    ...form,
    client_id: client.clientId,
    resource: metadata.resource,
  });
  if (client.clientSecret) params.set('client_secret', client.clientSecret);
  let response: UpstreamResponse;
  try {
    response = await fetcher(
      metadata.tokenEndpoint,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
        body: params.toString(),
      },
      { timeoutMs: TIMEOUT_MS },
    );
  } catch {
    throw new OAuthError('oauth_token_failed', 'unreachable');
  }
  const body = json(response);
  const serverError = oauthErrorDetail(body?.['error']);
  if (response.status < 200 || response.status >= 300) {
    throw new OAuthError(
      body?.['error'] === 'invalid_grant' ? 'oauth_invalid_grant' : 'oauth_token_failed',
      serverError ?? `http_${response.status}`,
    );
  }
  const accessToken = text(body?.['access_token']);
  // Some servers (GitHub) answer a refusal with 200 and an `error` field.
  if (!accessToken) throw new OAuthError('oauth_token_failed', serverError ?? 'no_access_token');
  const refreshToken = text(body?.['refresh_token']);
  const scope = text(body?.['scope']);
  const expiresIn = typeof body?.['expires_in'] === 'number' ? body['expires_in'] : undefined;
  return {
    accessToken,
    ...(refreshToken ? { refreshToken } : {}),
    ...(expiresIn !== undefined ? { expiresIn } : {}),
    ...(scope ? { scope } : {}),
  };
}

export function exchangeCode(
  fetcher: UpstreamFetch,
  metadata: McpOAuthMetadata,
  client: { clientId: string; clientSecret?: string | undefined },
  input: { code: string; verifier: string; redirectUri: string },
): Promise<TokenSet> {
  return tokenRequest(
    fetcher,
    metadata,
    {
      grant_type: 'authorization_code',
      code: input.code,
      redirect_uri: input.redirectUri,
      code_verifier: input.verifier,
    },
    client,
  );
}

export function refreshToken(
  fetcher: UpstreamFetch,
  metadata: McpOAuthMetadata,
  client: { clientId: string; clientSecret?: string | undefined },
  token: string,
): Promise<TokenSet> {
  return tokenRequest(
    fetcher,
    metadata,
    { grant_type: 'refresh_token', refresh_token: token },
    client,
  );
}

/** RFC 9207: when the redirect names an issuer it must be the one that was discovered. */
export function checkIssuer(metadata: McpOAuthMetadata, iss: string | undefined): void {
  if (iss !== undefined && iss !== metadata.issuer) throw new OAuthError('oauth_issuer_mismatch');
}
