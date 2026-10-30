import type { McpAuthTypeValue, McpServerResponse, PutMcpAuthBody } from './api';

export const AUTH_OPTIONS: readonly { value: McpAuthTypeValue; label: string; hint: string }[] = [
  { value: 'none', label: 'None', hint: 'The server needs no credentials.' },
  {
    value: 'api_key',
    label: 'API key',
    hint: 'One key is shared by everyone who uses the server.',
  },
  {
    value: 'oauth_dcr',
    label: 'OAuth (automatic registration)',
    hint: 'Each member signs in; the gateway registers itself with the sign-in service on first use.',
  },
  {
    value: 'oauth_client',
    label: 'OAuth (client ID)',
    hint: 'Each member signs in through a client you registered with the sign-in service.',
  },
];

/** What the server publishes about its sign-in, as the discovery call returns it. */
export interface Discovery {
  discovered: boolean;
  dynamicRegistration: boolean;
  scopes: string[];
  callbackUrl: string;
}

/**
 * The sign-in types a server can take: the one already chosen, none and an API key always, and
 * the OAuth types only when the server publishes sign-in details (automatic registration only
 * when it lets a client register itself). While the details are still being read, all are shown.
 */
export function authChoices(
  current: McpAuthTypeValue,
  discovery: Discovery | undefined,
  failed: boolean,
) {
  return AUTH_OPTIONS.filter((entry) => {
    if (entry.value === current || entry.value === 'none' || entry.value === 'api_key') return true;
    if (!discovery) return !failed;
    if (!discovery.discovered) return false;
    return entry.value === 'oauth_client' || discovery.dynamicRegistration;
  });
}

export const MIN_TIMEOUT_SECONDS = 1;
export const MAX_TIMEOUT_SECONDS = 120;

/** What the form holds. Secrets start empty: a stored one is never sent back to the browser. */
export interface AuthDraft {
  authType: McpAuthTypeValue;
  apiKey: string;
  clientId: string;
  clientSecret: string;
  /** Space-separated as typed; empty means the scopes the server advertises. */
  scopes: string;
  /** Whole seconds as typed; empty means the gateway default. */
  timeoutSeconds: string;
}

export type AuthField = 'apiKey' | 'clientId' | 'timeout';

export function draftOf(server: McpServerResponse): AuthDraft {
  return {
    authType: server.authType,
    apiKey: '',
    clientId: server.oauthClientId ?? '',
    clientSecret: '',
    scopes: server.oauthScopes ?? '',
    timeoutSeconds: server.callTimeoutMs === null ? '' : String(server.callTimeoutMs / 1000),
  };
}

/** Scopes split on any whitespace and joined by single spaces, as the api expects them. */
const normalizeScopes = (text: string): string =>
  text.trim().split(/\s+/).filter(Boolean).join(' ');

const usesScopes = (authType: McpAuthTypeValue): boolean =>
  authType === 'oauth_dcr' || authType === 'oauth_client';

/** The timeout in milliseconds: `null` for the default, `undefined` when the text is not valid. */
function timeoutMs(text: string): number | null | undefined {
  const trimmed = text.trim();
  if (trimmed === '') return null;
  if (!/^\d{1,3}$/.test(trimmed)) return undefined;
  const seconds = Number(trimmed);
  if (seconds < MIN_TIMEOUT_SECONDS || seconds > MAX_TIMEOUT_SECONDS) return undefined;
  return seconds * 1000;
}

export function authProblems(
  draft: AuthDraft,
  server: McpServerResponse,
): Partial<Record<AuthField, string>> {
  const problems: Partial<Record<AuthField, string>> = {};
  if (draft.authType === 'api_key') {
    const hasStoredKey = server.authType === 'api_key' && server.apiKeyLastFour !== null;
    if (!hasStoredKey && draft.apiKey.trim() === '') problems.apiKey = 'Enter the API key';
  }
  if (draft.authType === 'oauth_client' && draft.clientId.trim() === '') {
    problems.clientId = 'Enter the client ID';
  }
  if (timeoutMs(draft.timeoutSeconds) === undefined) {
    problems.timeout = `Use a whole number from ${MIN_TIMEOUT_SECONDS} to ${MAX_TIMEOUT_SECONDS}`;
  }
  return problems;
}

/** The request for a draft, or `null` when nothing differs from what is stored. */
export function authBody(draft: AuthDraft, server: McpServerResponse): PutMcpAuthBody | null {
  const timeout = timeoutMs(draft.timeoutSeconds);
  if (timeout === undefined) return null;

  const stored = draftOf(server);
  const changed =
    draft.authType !== stored.authType ||
    timeout !== server.callTimeoutMs ||
    (usesScopes(draft.authType) && normalizeScopes(draft.scopes) !== stored.scopes) ||
    (draft.authType === 'api_key' && draft.apiKey !== '') ||
    (draft.authType === 'oauth_client' &&
      (draft.clientId.trim() !== stored.clientId || draft.clientSecret !== ''));
  if (!changed) return null;

  const body: PutMcpAuthBody = { authType: draft.authType, callTimeoutMs: timeout };
  if (draft.authType === 'api_key' && draft.apiKey !== '') body.apiKey = draft.apiKey;
  if (usesScopes(draft.authType)) body.scopes = normalizeScopes(draft.scopes);
  if (draft.authType === 'oauth_client') {
    body.clientId = draft.clientId.trim();
    if (draft.clientSecret !== '') body.clientSecret = draft.clientSecret;
  }
  return body;
}

/** Sign-in applies to the OAuth types only. */
export const needsSignIn = (server: McpServerResponse): boolean =>
  server.connection !== 'not_required';

const HEALTH_LABEL: Record<McpServerResponse['health'], string> = {
  unknown: 'Not checked',
  healthy: 'Healthy',
  degraded: 'Degraded',
  unreachable: 'Unreachable',
};

export const healthLabel = (health: McpServerResponse['health']): string => HEALTH_LABEL[health];

const CONNECTION_LABEL: Record<McpServerResponse['connection'], string> = {
  not_required: 'No sign-in needed',
  not_connected: 'Not signed in',
  connected: 'Signed in',
  needs_reauth: 'Sign-in expired',
};

export const connectionLabel = (connection: McpServerResponse['connection']): string =>
  CONNECTION_LABEL[connection];

/** Messages for the classified codes the api reports; never upstream text. */
const ERROR_TEXT: Record<string, string> = {
  upstream_unauthorized: 'The server rejected the credentials.',
  upstream_timeout: 'The server did not answer in time.',
  upstream_unavailable: 'The server could not be reached.',
  upstream_protocol: 'The server answered in a way that could not be understood.',
  url_not_allowed: 'The address of this server is not allowed.',
  not_connected: 'Nobody has signed in to this server yet.',
  needs_reauth: 'The sign-in to this server expired.',
  credential_unavailable: 'The stored credentials cannot be used right now.',
  refresh_failed: 'The sign-in could not be renewed.',
  mcp_transport_unsupported: 'Only servers reached over HTTP can be used through the gateway.',
};

export const errorText = (code: string | null): string | null =>
  code === null ? null : (ERROR_TEXT[code] ?? 'The last check failed.');

export const healthVariant = (health: McpServerResponse['health']) =>
  health === 'healthy'
    ? ('success' as const)
    : health === 'degraded'
      ? ('warning' as const)
      : health === 'unreachable'
        ? ('destructive' as const)
        : ('outline' as const);
