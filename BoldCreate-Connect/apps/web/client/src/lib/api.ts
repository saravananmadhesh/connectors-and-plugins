/**
 * Typed API client.
 * All mutations first fetch a CSRF token; reads use the session cookie.
 * On 401 the query cache is cleared and the user is redirected to /signin.
 */

import { forgetActionKey, keyForAction, isRetryableFailure } from './idempotency';

let csrfToken: string | null = null;

async function fetchCsrf(): Promise<string> {
  const res = await fetch('/api/csrf', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch CSRF token');
  const data = (await res.json()) as { csrfToken: string };
  csrfToken = data.csrfToken;
  return csrfToken;
}

async function getCsrf(): Promise<string> {
  return csrfToken ?? fetchCsrf();
}

import type {
  SafeUser,
  MeResponse,
  OrgResponse,
  OrgMemberResponse,
  OrgMeResponse,
  OrgPolicyResponse,
  UpdateOrgPolicyBody,
  UpdateOrgMemberBody,
  AcceptInviteResponse,
  CreateInviteResponse,
  InviteResponse,
  UiRole,
  OrgRole,
  PluginSummaryResponse,
  PluginListItemResponse,
  PluginPageResponse,
  PluginSort,
  PluginDetailResponse,
  PluginVersionSummaryResponse,
  ComponentSummary,
  ComponentKind,
  CategoryListResponse,
  CategoryResponse,
  PluginVersionDetailResponse,
  PluginVersionReviewResponse,
  InstallationResponse,
  UpdatePolicy,
  VariableStatus,
  ComponentResponse,
  UpgradeResult,
  McpServerResponse,
  McpProbeResponse,
  McpOAuthDiscoverResponse,
  PutMcpAuthBody,
  McpAuthTypeValue,
  ApiKeyResponse,
  ApiKeyCreatedResponse,
  DeletionAccepted,
  ProjectResponse,
  CreateProjectBody,
  UpdateProjectBody,
  ProjectKeyResponse,
  ProjectKeyCreatedResponse,
  ProjectKeyScope,
  CreateProjectKeyBody,
  ProjectUserResponse,
  UserPluginState,
  SessionResponse,
  ConnectionResponse,
  ProjectLogResponse,
  ProjectUsageResponse,
  ProjectWebhookResponse,
  ProjectWebhookSecretResponse,
  PutProjectWebhookBody,
  WebhookDeliveryResponse,
  ProjectPluginResponse,
  PutProjectPluginBody,
  AuthConfigResponse,
  CreateAuthConfigBody,
  UpdateAuthConfigBody,
  ProjectServerResponse,
  UserInstallModeResponse,
  UserInstallMode,
  AllowedPluginResponse,
  PluginSetResponse,
  CreatePluginSetBody,
  WebhookEvent,
} from '@boldcreate-integrations/contracts';

export type {
  CreateInviteResponse,
  UiRole,
  OrgRole,
  SafeUser,
  MeResponse,
  OrgResponse,
  OrgMemberResponse,
  OrgPolicyResponse,
  InviteResponse,
  PluginSummaryResponse,
  PluginListItemResponse,
  PluginPageResponse,
  PluginSort,
  PluginDetailResponse,
  PluginVersionSummaryResponse,
  ComponentSummary,
  ComponentKind,
  CategoryResponse,
  PluginVersionDetailResponse,
  PluginVersionReviewResponse,
  InstallationResponse,
  UpdatePolicy,
  VariableStatus,
  ComponentResponse,
  UpgradeResult,
  McpServerResponse,
  McpProbeResponse,
  McpOAuthDiscoverResponse,
  PutMcpAuthBody,
  McpAuthTypeValue,
  ApiKeyResponse,
  ApiKeyCreatedResponse,
  ProjectResponse,
  CreateProjectBody,
  UpdateProjectBody,
  ProjectKeyResponse,
  ProjectKeyCreatedResponse,
  ProjectKeyScope,
  CreateProjectKeyBody,
  ProjectUserResponse,
  UserPluginState,
  SessionResponse,
  ConnectionResponse,
  ProjectLogResponse,
  ProjectUsageResponse,
  ProjectWebhookResponse,
  ProjectWebhookSecretResponse,
  PutProjectWebhookBody,
  WebhookDeliveryResponse,
  ProjectPluginResponse,
  PutProjectPluginBody,
  AuthConfigResponse,
  CreateAuthConfigBody,
  UpdateAuthConfigBody,
  ProjectServerResponse,
  UserInstallModeResponse,
  UserInstallMode,
  AllowedPluginResponse,
  PluginSetResponse,
  CreatePluginSetBody,
  WebhookEvent,
};
export type DeletionPendingResponse = DeletionAccepted;

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const ORG_KEY_PENDING_MESSAGE = 'Preparing your organization, try again in a moment';

/** Longest wait before the single retry of a request that met an organization still being set up. */
const MAX_RETRY_AFTER_MS = 10_000;

function retryDelayMs(res: Response): number {
  const seconds = Number(res.headers?.get('retry-after') ?? 1);
  return Number.isFinite(seconds) && seconds >= 0
    ? Math.min(seconds * 1000, MAX_RETRY_AFTER_MS)
    : 1000;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  requireCsrf = false,
  retried = false,
  idemKey?: string,
): Promise<T> {
  const headers: Record<string, string> = {};
  if (idemKey !== undefined) headers['Idempotency-Key'] = idemKey;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (requireCsrf) {
    headers['x-csrf-token'] = await getCsrf();
  }

  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (res.status === 401) {
    csrfToken = null;
    // Signal to the router to redirect
    window.dispatchEvent(new CustomEvent('auth:unauthenticated'));
  }

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = (data as { error?: { code?: string; message?: string } }).error;
    if (err?.code === 'org_key_pending') {
      if (retried) throw new ApiError(res.status, 'org_key_pending', ORG_KEY_PENDING_MESSAGE);
      await new Promise<void>((resolve) => setTimeout(resolve, retryDelayMs(res)));
      return request<T>(method, path, body, requireCsrf, true, idemKey);
    }
    throw new ApiError(res.status, err?.code ?? 'internal_error', err?.message ?? 'Request failed');
  }

  return data as T;
}

/** A write that needs an `Idempotency-Key`; see `idempotency.ts` for when a key is reused. */
async function idempotentRequest<T>(method: string, path: string, body: unknown): Promise<T> {
  const fingerprint = `${method} ${path} ${JSON.stringify(body)}`;
  try {
    const result = await request<T>(method, path, body, true, false, keyForAction(fingerprint));
    forgetActionKey(fingerprint);
    return result;
  } catch (error) {
    if (!isRetryableFailure(error)) forgetActionKey(fingerprint);
    throw error;
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const auth = {
  me: () => request<MeResponse>('GET', '/api/v1/auth/me'),
  signup: (body: { email: string; password: string; displayName: string }) =>
    idempotentRequest<{ userId: string }>('POST', '/api/v1/auth/signup', body),
  signin: (body: { email: string; password: string }) =>
    request<{ user: SafeUser }>('POST', '/api/v1/auth/signin', body, true),
  verifyEmail: (token: string) =>
    request<{ user: SafeUser }>('POST', '/api/v1/auth/verify-email', { token }, true),
  resendVerification: (email: string) =>
    request<void>('POST', '/api/v1/auth/resend-verification', { email }, true),
  forgotPassword: (email: string) =>
    request<void>('POST', '/api/v1/auth/forgot-password', { email }, true),
  resetPassword: (token: string, newPassword: string) =>
    request<void>('POST', '/api/v1/auth/reset-password', { token, newPassword }, true),
  changePassword: (currentPassword: string, newPassword: string) =>
    request<void>('POST', '/api/v1/auth/change-password', { currentPassword, newPassword }, true),
  changeEmail: (newEmail: string, currentPassword: string) =>
    request<void>('POST', '/api/v1/auth/change-email', { newEmail, currentPassword }, true),
  confirmEmailChange: (token: string) =>
    request<void>('POST', '/api/v1/auth/confirm-email-change', { token }, true),
  signout: async () => {
    try {
      return await request<void>('POST', '/api/v1/auth/signout', undefined, true);
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 403) throw error;
      csrfToken = null;
      return request<void>('POST', '/api/v1/auth/signout', undefined, true);
    }
  },
  signoutAll: () => request<void>('POST', '/api/v1/auth/signout-all', undefined, true),
  /** Deletes the signed-in user; `confirmEmail` is the address typed back as confirmation. */
  deleteMe: (confirmEmail: string) =>
    request<DeletionPendingResponse>(
      'DELETE',
      `/api/v1/auth/me?confirmEmail=${encodeURIComponent(confirmEmail)}`,
      undefined,
      true,
    ),
};

// ── Organizations ─────────────────────────────────────────────────────────────

export const orgs = {
  create: (body: { name: string; slug: string }) =>
    idempotentRequest<OrgResponse>('POST', '/api/v1/orgs', body),
  get: (orgId: string) => request<OrgResponse>('GET', `/api/v1/orgs/${orgId}`),
  me: (orgId: string) => request<OrgMeResponse>('GET', `/api/v1/orgs/${orgId}/me`),
  update: (orgId: string, body: { name?: string }) =>
    request<OrgResponse>('PATCH', `/api/v1/orgs/${orgId}`, body, true),
  delete: (orgId: string, confirmSlug: string) =>
    request<DeletionPendingResponse>(
      'DELETE',
      `/api/v1/orgs/${orgId}?confirmSlug=${encodeURIComponent(confirmSlug)}`,
      undefined,
      true,
    ),
  listMembers: (orgId: string) =>
    request<{ items: OrgMemberResponse[] }>('GET', `/api/v1/orgs/${orgId}/members`),
  updateMember: (orgId: string, userId: string, body: UpdateOrgMemberBody) =>
    request<OrgMemberResponse>('PATCH', `/api/v1/orgs/${orgId}/members/${userId}`, body, true),
  getPolicy: (orgId: string) => request<OrgPolicyResponse>('GET', `/api/v1/orgs/${orgId}/policy`),
  updatePolicy: (orgId: string, body: UpdateOrgPolicyBody) =>
    request<OrgPolicyResponse>('PATCH', `/api/v1/orgs/${orgId}/policy`, body, true),
  removeMember: (orgId: string, userId: string) =>
    request<void>('DELETE', `/api/v1/orgs/${orgId}/members/${userId}`, undefined, true),
  createInvite: (orgId: string, body: { emails: string[]; role: UiRole }) =>
    idempotentRequest<CreateInviteResponse>('POST', `/api/v1/orgs/${orgId}/invites`, body),
  revokeInvite: (orgId: string, inviteId: string) =>
    request<void>('DELETE', `/api/v1/orgs/${orgId}/invites/${inviteId}`, undefined, true),
  resendInvite: (orgId: string, inviteId: string) =>
    request<void>('POST', `/api/v1/orgs/${orgId}/invites/${inviteId}/resend`, undefined, true),
  acceptInvite: (token: string) =>
    request<AcceptInviteResponse>('POST', '/api/v1/invites/accept', { token }, true),
};

// ── Marketplace ───────────────────────────────────────────────────────────────

export const marketplace = {
  listCategories: () => request<CategoryListResponse>('GET', '/api/v1/categories'),
  listPlugins: (params?: {
    q?: string;
    categories?: string;
    sort?: PluginSort;
    page?: number;
    limit?: number;
  }) => {
    const qs = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [k, String(v)]),
        ).toString()}`
      : '';
    return request<PluginPageResponse>('GET', `/api/v1/plugins${qs}`);
  },
  getPlugin: (pluginId: string) =>
    request<PluginDetailResponse>('GET', `/api/v1/plugins/${pluginId}`),
  listVersions: (pluginId: string) =>
    request<{
      items: PluginVersionSummaryResponse[];
      nextCursor: string | null;
    }>('GET', `/api/v1/plugins/${pluginId}/versions`),
  getVersion: (versionId: string) =>
    request<PluginVersionDetailResponse>('GET', `/api/v1/plugin-versions/${versionId}`),
  getVersionReview: (versionId: string) =>
    request<PluginVersionReviewResponse>('GET', `/api/v1/plugin-versions/${versionId}/review`),
};

// ── Installations ─────────────────────────────────────────────────────────────

/**
 * The route prefix of a scope: `org` (the whole organization) or `me` (the caller alone).
 */
export type ScopeKey = 'org' | 'me';

export function scopeBase(orgId: string, scopeKey: ScopeKey): string {
  return scopeKey === 'org' ? `/api/v1/orgs/${orgId}` : `/api/v1/orgs/${orgId}/me`;
}

export const installations = {
  list: (orgId: string, scopeKey: ScopeKey) =>
    request<{ items: InstallationResponse[]; nextCursor: string | null }>(
      'GET',
      `${scopeBase(orgId, scopeKey)}/installations`,
    ),
  create: (
    orgId: string,
    scopeKey: ScopeKey,
    body: { pluginVersionId: string; updatePolicy?: UpdatePolicy },
  ) =>
    idempotentRequest<InstallationResponse>(
      'POST',
      `${scopeBase(orgId, scopeKey)}/installations`,
      body,
    ),
  /** Installs for the whole organization (`org`) or for the caller alone (`user`). */
  createFor: (
    orgId: string,
    scope: 'org' | 'user',
    body: { pluginVersionId: string; updatePolicy?: UpdatePolicy; required?: boolean },
  ) =>
    idempotentRequest<InstallationResponse>(
      'POST',
      scope === 'org'
        ? `/api/v1/orgs/${orgId}/installations`
        : `/api/v1/orgs/${orgId}/me/installations`,
      body,
    ),
  get: (orgId: string, scopeKey: ScopeKey, id: string) =>
    request<InstallationResponse>('GET', `${scopeBase(orgId, scopeKey)}/installations/${id}`),
  update: (
    orgId: string,
    scopeKey: ScopeKey,
    id: string,
    body: { active?: boolean; updatePolicy?: UpdatePolicy; required?: boolean },
  ) =>
    request<InstallationResponse>(
      'PATCH',
      `${scopeBase(orgId, scopeKey)}/installations/${id}`,
      body,
      true,
    ),
  delete: (orgId: string, scopeKey: ScopeKey, id: string) =>
    request<void>('DELETE', `${scopeBase(orgId, scopeKey)}/installations/${id}`, undefined, true),
  listComponents: (orgId: string, scopeKey: ScopeKey, id: string) =>
    request<{ items: ComponentResponse[]; nextCursor: string | null }>(
      'GET',
      `${scopeBase(orgId, scopeKey)}/installations/${id}/components`,
    ),
  updateComponent: (
    orgId: string,
    scopeKey: ScopeKey,
    id: string,
    componentId: string,
    body: { enabled: boolean },
  ) =>
    request<ComponentResponse>(
      'PATCH',
      `${scopeBase(orgId, scopeKey)}/installations/${id}/components/${componentId}`,
      body,
      true,
    ),
  listVariables: (orgId: string, scopeKey: ScopeKey, id: string) =>
    request<{ items: VariableStatus[]; nextCursor: string | null }>(
      'GET',
      `${scopeBase(orgId, scopeKey)}/installations/${id}/variables`,
    ),
  putVariables: (
    orgId: string,
    scopeKey: ScopeKey,
    id: string,
    body: { values: Record<string, string | null> },
  ) =>
    request<{ items: VariableStatus[]; nextCursor: string | null }>(
      'PUT',
      `${scopeBase(orgId, scopeKey)}/installations/${id}/variables`,
      body,
      true,
    ),
  upgrade: (orgId: string, scopeKey: ScopeKey, id: string, body: { pluginVersionId: string }) =>
    idempotentRequest<UpgradeResult>(
      'POST',
      `${scopeBase(orgId, scopeKey)}/installations/${id}/upgrade`,
      body,
    ),
};

// ── MCP servers ───────────────────────────────────────────────────────────────

function mcpPath(
  orgId: string,
  scopeKey: ScopeKey,
  installationId: string,
  componentId?: string,
): string {
  const base = `${scopeBase(orgId, scopeKey)}/installations/${installationId}/mcp-servers`;
  return componentId ? `${base}/${componentId}` : base;
}

export const mcpServers = {
  list: (orgId: string, scopeKey: ScopeKey, installationId: string) =>
    request<{ items: McpServerResponse[]; nextCursor: string | null }>(
      'GET',
      mcpPath(orgId, scopeKey, installationId),
    ),
  putAuth: (
    orgId: string,
    scopeKey: ScopeKey,
    installationId: string,
    componentId: string,
    body: PutMcpAuthBody,
  ) =>
    idempotentRequest<McpServerResponse>(
      'PUT',
      `${mcpPath(orgId, scopeKey, installationId, componentId)}/auth`,
      body,
    ),
  test: (orgId: string, scopeKey: ScopeKey, installationId: string, componentId: string) =>
    request<McpProbeResponse>(
      'POST',
      `${mcpPath(orgId, scopeKey, installationId, componentId)}/test`,
      undefined,
      true,
    ),
  /** What the server's published sign-in details say; fills in the form. */
  oauthDiscover: (orgId: string, scopeKey: ScopeKey, installationId: string, componentId: string) =>
    request<McpOAuthDiscoverResponse>(
      'POST',
      `${mcpPath(orgId, scopeKey, installationId, componentId)}/oauth/discover`,
      undefined,
      true,
    ),
  /** The address of the provider's sign-in page; the caller sends the browser there. */
  oauthStart: (orgId: string, scopeKey: ScopeKey, installationId: string, componentId: string) =>
    request<{ authorizeUrl: string }>(
      'POST',
      `${mcpPath(orgId, scopeKey, installationId, componentId)}/oauth/start`,
      undefined,
      true,
    ),
  oauthDisconnect: (
    orgId: string,
    scopeKey: ScopeKey,
    installationId: string,
    componentId: string,
  ) =>
    request<void>(
      'DELETE',
      `${mcpPath(orgId, scopeKey, installationId, componentId)}/oauth`,
      undefined,
      true,
    ),
};

// ── API Keys ──────────────────────────────────────────────────────────────────

export interface CreateApiKeyInput {
  name: string;
  permissions: Array<'mcp:list' | 'mcp:call'>;
  expiresAt?: string;
  rateLimitPerMinute?: number;
}

/** The For You keys of one organization; only its admins manage them. */
export const orgApiKeys = {
  list: (orgId: string) =>
    request<{ items: ApiKeyResponse[]; nextCursor: string | null }>(
      'GET',
      `/api/v1/orgs/${orgId}/api-keys`,
    ),
  create: (orgId: string, body: CreateApiKeyInput) =>
    idempotentRequest<ApiKeyCreatedResponse>('POST', `/api/v1/orgs/${orgId}/api-keys`, body),
  revoke: (orgId: string, keyId: string) =>
    request<void>('DELETE', `/api/v1/orgs/${orgId}/api-keys/${keyId}`, undefined, true),
};

function query(params: object): string {
  const entries = Object.entries(params).filter(
    (entry): entry is [string, string | number] => entry[1] !== undefined && entry[1] !== '',
  );
  return entries.length > 0
    ? `?${new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()}`
    : '';
}

// ── Projects ──────────────────────────────────────────────────────────────────

export interface CursorQuery {
  cursor?: string | undefined;
  limit?: number | undefined;
}

export interface Page<T> {
  items: T[];
  nextCursor: string | null;
}

/** The filters of the catalog a project offers; an unset filter is left out of the address. */
export interface CatalogQuery {
  q?: string | undefined;
  kind?: ComponentKind | undefined;
  categories?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

const projectBase = (orgId: string, projectId: string) =>
  `/api/v1/orgs/${orgId}/projects/${projectId}`;

/** The pages of an organization's projects; every call is the console's, never the host's. */
export const projects = {
  list: (orgId: string, params: CursorQuery = {}) =>
    request<Page<ProjectResponse>>('GET', `/api/v1/orgs/${orgId}/projects${query(params)}`),
  get: (orgId: string, projectId: string) =>
    request<ProjectResponse>('GET', projectBase(orgId, projectId)),
  create: (orgId: string, body: CreateProjectBody) =>
    idempotentRequest<ProjectResponse>('POST', `/api/v1/orgs/${orgId}/projects`, body),
  update: (orgId: string, projectId: string, body: UpdateProjectBody) =>
    request<ProjectResponse>('PATCH', projectBase(orgId, projectId), body, true),
  delete: (orgId: string, projectId: string) =>
    request<void>('DELETE', projectBase(orgId, projectId), undefined, true),

  keys: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<ProjectKeyResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/keys${query(params)}`,
    ),
  createKey: (orgId: string, projectId: string, body: CreateProjectKeyBody) =>
    idempotentRequest<ProjectKeyCreatedResponse>(
      'POST',
      `${projectBase(orgId, projectId)}/keys`,
      body,
    ),
  rotateKey: (orgId: string, projectId: string, keyId: string) =>
    idempotentRequest<ProjectKeyCreatedResponse>(
      'POST',
      `${projectBase(orgId, projectId)}/keys/${keyId}/rotate`,
      undefined,
    ),
  revokeKey: (orgId: string, projectId: string, keyId: string) =>
    request<void>('DELETE', `${projectBase(orgId, projectId)}/keys/${keyId}`, undefined, true),

  users: (
    orgId: string,
    projectId: string,
    params: CursorQuery & { search?: string | undefined } = {},
  ) =>
    request<Page<ProjectUserResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/users${query(params)}`,
    ),
  deleteUser: (orgId: string, projectId: string, userId: string) =>
    request<void>('DELETE', `${projectBase(orgId, projectId)}/users/${userId}`, undefined, true),
  userPlugins: (orgId: string, projectId: string, userId: string) =>
    request<Page<UserPluginState>>(
      'GET',
      `${projectBase(orgId, projectId)}/users/${userId}/plugins`,
    ),

  /** Removes a plugin a user installed for themselves; `userId` is the host's own id for them. */
  removeUserPlugin: (orgId: string, projectId: string, pluginId: string, userId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/user-plugins/${pluginId}${query({ userId })}`,
      undefined,
      true,
    ),

  sessions: (
    orgId: string,
    projectId: string,
    params: CursorQuery & { userId?: string | undefined } = {},
  ) =>
    request<Page<SessionResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/sessions${query(params)}`,
    ),
  revokeSession: (orgId: string, projectId: string, sessionId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/sessions/${sessionId}`,
      undefined,
      true,
    ),

  connections: (
    orgId: string,
    projectId: string,
    params: CursorQuery & { userId?: string | undefined } = {},
  ) =>
    request<Page<ConnectionResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/connections${query(params)}`,
    ),
  disconnect: (orgId: string, projectId: string, connectionId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/connections/${connectionId}`,
      undefined,
      true,
    ),

  logs: (
    orgId: string,
    projectId: string,
    params: CursorQuery & { userId?: string | undefined; action?: string | undefined } = {},
  ) =>
    request<Page<ProjectLogResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/logs${query(params)}`,
    ),
  usage: (orgId: string, projectId: string) =>
    request<ProjectUsageResponse>('GET', `${projectBase(orgId, projectId)}/usage`),

  webhook: (orgId: string, projectId: string) =>
    request<ProjectWebhookResponse>('GET', `${projectBase(orgId, projectId)}/webhook`),
  putWebhook: (orgId: string, projectId: string, body: PutProjectWebhookBody) =>
    request<ProjectWebhookResponse | ProjectWebhookSecretResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/webhook`,
      body,
      true,
    ),
  deleteWebhook: (orgId: string, projectId: string) =>
    request<void>('DELETE', `${projectBase(orgId, projectId)}/webhook`, undefined, true),
  rotateWebhookSecret: (orgId: string, projectId: string) =>
    request<ProjectWebhookSecretResponse>(
      'POST',
      `${projectBase(orgId, projectId)}/webhook/rotate-secret`,
      undefined,
      true,
    ),
  webhookDeliveries: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<WebhookDeliveryResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/webhook/deliveries${query(params)}`,
    ),

  plugins: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<ProjectPluginResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/plugins${query(params)}`,
    ),
  putPlugin: (
    orgId: string,
    projectId: string,
    pluginId: string,
    body: PutProjectPluginBody = {},
  ) =>
    request<ProjectPluginResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/plugins/${pluginId}`,
      body,
      true,
    ),
  removePlugin: (orgId: string, projectId: string, pluginId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/plugins/${pluginId}`,
      undefined,
      true,
    ),

  authConfigs: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<AuthConfigResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/auth-configs${query(params)}`,
    ),
  /** Every MCP server of the project's plugins, with what it needs, configured or not. */
  servers: (orgId: string, projectId: string) =>
    request<Page<ProjectServerResponse>>('GET', `${projectBase(orgId, projectId)}/servers`),
  createAuthConfig: (orgId: string, projectId: string, body: CreateAuthConfigBody) =>
    request<AuthConfigResponse>(
      'POST',
      `${projectBase(orgId, projectId)}/auth-configs`,
      body,
      true,
    ),
  updateAuthConfig: (
    orgId: string,
    projectId: string,
    authConfigId: string,
    body: UpdateAuthConfigBody,
  ) =>
    request<AuthConfigResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/auth-configs/${authConfigId}`,
      body,
      true,
    ),
  deleteAuthConfig: (orgId: string, projectId: string, authConfigId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/auth-configs/${authConfigId}`,
      undefined,
      true,
    ),
  /** Sets the variables of one MCP component; a value is sent and never read back. */
  putAuthConfigVariables: (
    orgId: string,
    projectId: string,
    componentId: string,
    values: Record<string, string | null>,
  ) =>
    request<Page<VariableStatus>>(
      'PUT',
      `${projectBase(orgId, projectId)}/auth-configs/${componentId}/variables`,
      { values },
      true,
    ),

  catalog: (orgId: string, projectId: string, params: CatalogQuery = {}) =>
    request<PluginPageResponse>('GET', `${projectBase(orgId, projectId)}/catalog${query(params)}`),
  installMode: (orgId: string, projectId: string) =>
    request<UserInstallModeResponse>('GET', `${projectBase(orgId, projectId)}/user-install-mode`),
  setInstallMode: (orgId: string, projectId: string, mode: UserInstallMode) =>
    request<UserInstallModeResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/user-install-mode`,
      { mode },
      true,
    ),
  allowedPlugins: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<AllowedPluginResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/allowed-plugins${query(params)}`,
    ),
  allowPlugin: (orgId: string, projectId: string, pluginId: string) =>
    request<AllowedPluginResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/allowed-plugins/${pluginId}`,
      undefined,
      true,
    ),
  disallowPlugin: (orgId: string, projectId: string, pluginId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/allowed-plugins/${pluginId}`,
      undefined,
      true,
    ),
  pluginSets: (orgId: string, projectId: string, params: CursorQuery = {}) =>
    request<Page<PluginSetResponse>>(
      'GET',
      `${projectBase(orgId, projectId)}/plugin-sets${query(params)}`,
    ),
  createPluginSet: (orgId: string, projectId: string, body: CreatePluginSetBody) =>
    request<PluginSetResponse>('POST', `${projectBase(orgId, projectId)}/plugin-sets`, body, true),
  renamePluginSet: (orgId: string, projectId: string, setId: string, name: string) =>
    request<PluginSetResponse>(
      'PATCH',
      `${projectBase(orgId, projectId)}/plugin-sets/${setId}`,
      { name },
      true,
    ),
  deletePluginSet: (orgId: string, projectId: string, setId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/plugin-sets/${setId}`,
      undefined,
      true,
    ),
  addToPluginSet: (orgId: string, projectId: string, setId: string, pluginId: string) =>
    request<PluginSetResponse>(
      'PUT',
      `${projectBase(orgId, projectId)}/plugin-sets/${setId}/plugins/${pluginId}`,
      undefined,
      true,
    ),
  removeFromPluginSet: (orgId: string, projectId: string, setId: string, pluginId: string) =>
    request<void>(
      'DELETE',
      `${projectBase(orgId, projectId)}/plugin-sets/${setId}/plugins/${pluginId}`,
      undefined,
      true,
    ),
};
