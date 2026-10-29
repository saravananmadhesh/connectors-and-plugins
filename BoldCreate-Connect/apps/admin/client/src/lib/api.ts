/**
 * Typed client for the admin api. Writes first fetch a CSRF token; the session is a cookie.
 * A 401 from a read or write clears the token and tells the app the session is gone.
 */
import type {
  AddAdminAllowedEmailBody,
  AdminAllowedEmailListResponse,
  AdminAllowedEmailResponse,
  AdminAuditListResponse,
  AdminAuditQuery,
  AdminCategoryListResponse,
  AdminCategoryResponse,
  AdminImpactResponse,
  AdminPluginBulkPublishResponse,
  AdminPluginBulkSyncResponse,
  AdminPluginBulkUpdateBody,
  AdminPluginBulkUpdateResponse,
  AdminPluginDetailResponse,
  AdminPluginListQuery,
  AdminPluginListResponse,
  AdminPluginSourceBody,
  AdminPluginStatusBody,
  AdminPluginUpdateBody,
  AdminSessionResponse,
  AdminStatsResponse,
  AdminVersionDetailResponse,
  BulkPluginDeleteResponse,
  BulkSourceDeleteResponse,
  BulkSourceSyncResponse,
  CreateCategoryBody,
  CreatePluginSourceBody,
  DiscoverPluginsBody,
  DiscoverPluginsResponse,
  InstallPluginsBody,
  InstallPluginsResponse,
  PluginFlagsBody,
  PluginIngestionListResponse,
  PluginIngestionResponse,
  PluginSourceListResponse,
  PluginSourceResponse,
  VersionChange,
} from '@boldcreate-integrations/contracts';

export type {
  AdminAllowedEmailResponse,
  AdminAuditEntry,
  AdminAuditListResponse,
  AdminAuditQuery,
  AdminPluginSourceBody,
  InstalledSource,
  VersionChange,
  AdminCategoryResponse,
  AdminPluginBulkSyncResponse,
  AdminPluginBulkUpdateBody,
  AdminPluginBulkUpdateResponse,
  AdminPluginListQuery,
  AdminPluginListResponse,
  AdminPluginVisibility,
  ComponentKind,
  PluginFlagsBody,
  AdminImpactResponse,
  AdminPluginDetailResponse,
  AdminPluginSummary,
  AdminPluginUpdateBody,
  AdminSessionResponse,
  AdminStatsResponse,
  AdminVersionDetailResponse,
  AdminVersionSummary,
  BulkPluginDeleteResponse,
  BulkSourceDeleteResponse,
  BulkSourceSyncResponse,
  CreatePluginSourceBody,
  DiscoveredPlugin,
  DiscoverPluginsResponse,
  InstallPluginsResponse,
  PluginIngestionResponse,
  PluginLifecycleStatus,
  PluginSourceResponse,
  VersionStatus,
} from '@boldcreate-integrations/contracts';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  /** Field messages the server sent with a validation error. */
  readonly details: string[];

  constructor(status: number, code: string, message: string, details: string[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

let csrfToken: string | null = null;

async function getCsrf(): Promise<string> {
  if (csrfToken !== null) return csrfToken;
  const res = await fetch('/api/csrf', { credentials: 'include' });
  if (!res.ok)
    throw new ApiError(res.status, 'csrf_unavailable', 'Could not start a secure request.');
  csrfToken = ((await res.json()) as { csrfToken: string }).csrfToken;
  return csrfToken;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  if (method !== 'GET') headers['x-csrf-token'] = await getCsrf();
  if (body !== undefined) headers['content-type'] = 'application/json';
  const res = await fetch(path, {
    method,
    credentials: 'include',
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (res.status === 401) {
    csrfToken = null;
    window.dispatchEvent(new Event('admin:unauthenticated'));
  }
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as {
      error?: {
        code?: string;
        message?: string;
        details?: { message?: string }[];
      };
    };
    if (res.status === 403) csrfToken = null;
    throw new ApiError(
      res.status,
      data.error?.code ?? 'unknown',
      data.error?.message ?? 'Something went wrong.',
      (data.error?.details ?? []).flatMap((detail) =>
        typeof detail.message === 'string' ? [detail.message] : [],
      ),
    );
  }
  if (res.status === 204 || res.status === 202) return undefined as T;
  return (await res.json()) as T;
}

export const adminApi = {
  session: () => request<AdminSessionResponse>('GET', '/api/v1/admin/auth/session'),
  signIn: (body: { email: string; password: string }) =>
    request<AdminSessionResponse>('POST', '/api/v1/admin/auth/signin', body),
  requestSetup: (body: { email: string }) =>
    request<void>('POST', '/api/v1/admin/auth/setup-request', body),
  completeSetup: (body: { token: string; password: string }) =>
    request<AdminSessionResponse>('POST', '/api/v1/admin/auth/setup', body),
  signOut: () => request<void>('POST', '/api/v1/admin/auth/signout'),
  listSources: () => request<PluginSourceListResponse>('GET', '/api/v1/admin/plugin-sources'),
  createSource: (body: CreatePluginSourceBody) =>
    request<PluginSourceResponse>('POST', '/api/v1/admin/plugin-sources', body),
  discoverPlugins: (body: DiscoverPluginsBody) =>
    request<DiscoverPluginsResponse>('POST', '/api/v1/admin/plugin-sources/discover', body),
  installPlugins: (body: InstallPluginsBody) =>
    request<InstallPluginsResponse>('POST', '/api/v1/admin/plugin-sources/install', body),
  syncSource: (id: string) =>
    request<PluginIngestionResponse>('POST', `/api/v1/admin/plugin-sources/${id}/sync`),
  listIngestions: (id: string) =>
    request<PluginIngestionListResponse>('GET', `/api/v1/admin/plugin-sources/${id}/ingestions`),
  bulkSyncSources: (ids: string[]) =>
    request<BulkSourceSyncResponse>('POST', '/api/v1/admin/plugin-sources/bulk-sync', { ids }),
  bulkDeleteSources: (ids: string[]) =>
    request<BulkSourceDeleteResponse>('POST', '/api/v1/admin/plugin-sources/bulk-delete', { ids }),
  updateSource: (id: string, body: AdminPluginSourceBody) =>
    request<PluginSourceResponse>('PUT', `/api/v1/admin/plugin-sources/${id}`, body),
  deleteSource: (id: string) => request<void>('DELETE', `/api/v1/admin/plugin-sources/${id}`),
  listPlugins: (query: Partial<AdminPluginListQuery> = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') params.set(key, String(value));
    }
    const text = params.toString();
    return request<AdminPluginListResponse>(
      'GET',
      `/api/v1/admin/plugins${text ? `?${text}` : ''}`,
    );
  },
  syncPlugin: (id: string) =>
    request<PluginIngestionResponse>('POST', `/api/v1/admin/plugins/${id}/sync`),
  bulkSyncPlugins: (ids: string[]) =>
    request<AdminPluginBulkSyncResponse>('POST', '/api/v1/admin/plugins/bulk-sync', { ids }),
  bulkPublishLatest: (ids: string[]) =>
    request<AdminPluginBulkPublishResponse>('POST', '/api/v1/admin/plugins/bulk-publish-latest', {
      ids,
    }),
  bulkUpdatePlugins: (body: AdminPluginBulkUpdateBody) =>
    request<AdminPluginBulkUpdateResponse>('POST', '/api/v1/admin/plugins/bulk-update', body),
  getPlugin: (id: string) =>
    request<AdminPluginDetailResponse>('GET', `/api/v1/admin/plugins/${id}`),
  pluginImpact: (id: string) =>
    request<AdminImpactResponse>('GET', `/api/v1/admin/plugins/${id}/impact`),
  setPluginStatus: (id: string, body: AdminPluginStatusBody) =>
    request<AdminPluginDetailResponse>('POST', `/api/v1/admin/plugins/${id}/status`, body),
  updatePluginSource: (id: string, body: AdminPluginSourceBody) =>
    request<AdminPluginDetailResponse>('PUT', `/api/v1/admin/plugins/${id}/source`, body),
  listAudit: (query: Partial<AdminAuditQuery> = {}) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') params.set(key, String(value));
    }
    const text = params.toString();
    return request<AdminAuditListResponse>('GET', `/api/v1/admin/audit${text ? `?${text}` : ''}`);
  },
  updatePlugin: (id: string, body: AdminPluginUpdateBody) =>
    request<AdminPluginDetailResponse>('PATCH', `/api/v1/admin/plugins/${id}`, body),
  bulkDeletePlugins: (ids: string[]) =>
    request<BulkPluginDeleteResponse>('POST', '/api/v1/admin/plugins/bulk-delete', { ids }),
  stats: (days: number) => request<AdminStatsResponse>('GET', `/api/v1/admin/stats?days=${days}`),
  deletePlugin: (id: string) => request<void>('DELETE', `/api/v1/admin/plugins/${id}`),
  getVersion: (id: string) =>
    request<AdminVersionDetailResponse>('GET', `/api/v1/admin/plugin-versions/${id}`),
  versionImpact: (id: string) =>
    request<AdminImpactResponse>('GET', `/api/v1/admin/plugin-versions/${id}/impact`),
  changeVersion: (id: string, change: Exclude<VersionChange, 'yank'>) =>
    request<AdminVersionDetailResponse>('POST', `/api/v1/admin/plugin-versions/${id}/${change}`),
  setPluginCategories: (id: string, categoryIds: string[]) =>
    request<AdminPluginDetailResponse>('PUT', `/api/v1/admin/plugins/${id}/categories`, {
      categoryIds,
    }),
  setPluginFlags: (id: string, body: PluginFlagsBody) =>
    request<AdminPluginDetailResponse>('PATCH', `/api/v1/admin/plugins/${id}/flags`, body),
  listCategories: () => request<AdminCategoryListResponse>('GET', '/api/v1/admin/categories'),
  createCategory: (body: Pick<CreateCategoryBody, 'name' | 'description'>) =>
    request<AdminCategoryResponse>('POST', '/api/v1/admin/categories', body),
  updateCategory: (id: string, body: { name?: string; description?: string }) =>
    request<AdminCategoryResponse>('PATCH', `/api/v1/admin/categories/${id}`, body),
  deleteCategory: (id: string) => request<void>('DELETE', `/api/v1/admin/categories/${id}`),
  listAllowedEmails: () =>
    request<AdminAllowedEmailListResponse>('GET', '/api/v1/admin/allowed-emails'),
  addAllowedEmail: (body: AddAdminAllowedEmailBody) =>
    request<AdminAllowedEmailResponse>('POST', '/api/v1/admin/allowed-emails', body),
  inviteAllowedEmail: (email: string) =>
    request<void>('POST', `/api/v1/admin/allowed-emails/${encodeURIComponent(email)}/invite`),
  removeAllowedEmail: (email: string) =>
    request<void>('DELETE', `/api/v1/admin/allowed-emails/${encodeURIComponent(email)}`),
  yankVersion: (id: string, force: boolean) =>
    request<AdminVersionDetailResponse>('POST', `/api/v1/admin/plugin-versions/${id}/yank`, {
      force,
    }),
};
