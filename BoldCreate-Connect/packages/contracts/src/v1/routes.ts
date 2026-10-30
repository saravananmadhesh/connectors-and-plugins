import * as z from 'zod/v4';
import {
  AdminSessionResponseSchema,
  AdminSetupBodySchema,
  AdminSetupRequestBodySchema,
  AdminSigninBodySchema,
} from './admin-auth.js';
import {
  AddAdminAllowedEmailBodySchema,
  AdminAllowedEmailListResponseSchema,
  AdminAllowedEmailParamsSchema,
  AdminAllowedEmailResponseSchema,
} from './admin-allowed-emails.js';
import {
  AdminCategoryListResponseSchema,
  AdminCategoryParamsSchema,
  AdminCategoryResponseSchema,
  CategoryListResponseSchema,
  CreateCategoryBodySchema,
  PluginFlagsBodySchema,
  SetPluginCategoriesBodySchema,
  UpdateCategoryBodySchema,
} from './categories.js';
import { AdminAuditListResponseSchema, AdminAuditQuerySchema } from './admin-audit.js';
import {
  AdminErrorGroupDetailResponseSchema,
  AdminErrorGroupParamsSchema,
  AdminErrorGroupStatusBodySchema,
  AdminErrorGroupsQuerySchema,
  AdminErrorGroupsResponseSchema,
  AdminObservabilityOverviewQuerySchema,
  AdminObservabilityOverviewResponseSchema,
  AdminObservabilityPurgeBodySchema,
  AdminObservabilityPurgeResponseSchema,
  AdminObservabilityStorageResponseSchema,
  AdminOpsEventsQuerySchema,
  AdminOpsEventsResponseSchema,
} from './admin-observability.js';
import {
  AdminActionBodySchema,
  AdminImpactResponseSchema,
  AdminPluginDetailResponseSchema,
  AdminPluginListResponseSchema,
  AdminPluginParamsSchema,
  AdminPluginBulkSyncResponseSchema,
  AdminPluginBulkUpdateBodySchema,
  AdminPluginBulkPublishResponseSchema,
  AdminPluginBulkUpdateResponseSchema,
  AdminPluginListQuerySchema,
  AdminPluginSourceBodySchema,
  AdminPluginStatusBodySchema,
  AdminPluginUpdateBodySchema,
  AdminPluginVersionParamsSchema,
  AdminVersionDetailResponseSchema,
  BulkIdsBodySchema,
  BulkPluginDeleteResponseSchema,
} from './admin-plugins.js';
import { AdminStatsQuerySchema, AdminStatsResponseSchema } from './admin-stats.js';
import {
  BulkSourceDeleteResponseSchema,
  BulkSourceSyncResponseSchema,
  DiscoverPluginsBodySchema,
  DiscoverPluginsResponseSchema,
  InstallPluginsBodySchema,
  InstallPluginsResponseSchema,
  CreatePluginSourceBodySchema,
  PluginIngestionListResponseSchema,
  PluginIngestionResponseSchema,
  PluginSourceListResponseSchema,
  PluginSourceParamsSchema,
  PluginSourceResponseSchema,
} from './plugin-sources.js';
import {
  ApiKeyCreatedResponseSchema,
  ApiKeyResponseSchema,
  CreateApiKeyBodySchema,
} from './api-keys.js';
import {
  ChangeEmailBodySchema,
  ChangePasswordBodySchema,
  ConfirmEmailChangeBodySchema,
  DeleteUserQuerySchema,
  ForgotPasswordBodySchema,
  ResendVerificationBodySchema,
  ResetPasswordBodySchema,
  SessionIssuedSchema,
  SigninBodySchema,
  SignupBodySchema,
  VerifyEmailBodySchema,
} from './auth.js';
import { DeletionAcceptedSchema, PageQuerySchema, PageSchema } from './common.js';
import { ReadySchema, HealthSchema } from './health.js';
import { IdSchema } from './ids.js';
import {
  ComponentResponseSchema,
  CreateInstallationBodySchema,
  InstallationResponseSchema,
  UpdateComponentBodySchema,
  UpdateInstallationBodySchema,
  UpgradeInstallationBodySchema,
  UpgradeResultSchema,
} from './installations.js';
import {
  ConsoleSessionParamsSchema,
  CreateSessionBodySchema,
  PutSessionPluginBodySchema,
  SessionCatalogPageSchema,
  SessionCreatedResponseSchema,
  SessionListQuerySchema,
  SessionPageSchema,
  SessionParamsSchema,
  SessionResponseSchema,
} from './project-sessions.js';
import {
  ConnectionListQuerySchema,
  ConnectionPageSchema,
  ConnectionParamsSchema,
  ConnectionResponseSchema,
  ConsoleConnectionParamsSchema,
  PutProjectConnectionBodySchema,
  SessionConnectionListQuerySchema,
  StartProjectConnectionBodySchema,
  StartProjectConnectionResponseSchema,
  StartSessionConnectionBodySchema,
  StartSessionConnectionResponseSchema,
} from './project-connections.js';
import { PutVariablesBodySchema, VariableStatusSchema } from './variables.js';
import {
  AuthConfigListQuerySchema,
  AuthConfigPageSchema,
  AuthConfigResponseSchema,
  ConsoleProjectAuthConfigParamsSchema,
  ConsoleProjectAuthConfigVariablesParamsSchema,
  CreateAuthConfigBodySchema,
  UpdateAuthConfigBodySchema,
  ConsoleProjectPluginParamsSchema,
  ConsoleProjectPluginServerParamsSchema,
  ProjectAuthConfigParamsSchema,
  ProjectAuthConfigVariablesParamsSchema,
  ProjectPluginPageSchema,
  ProjectPluginParamsSchema,
  ProjectPluginResponseSchema,
  PutProjectPluginBodySchema,
} from './project-plugins.js';
import {
  AllowedPluginPageSchema,
  AllowedPluginResponseSchema,
  ConsolePluginSetMemberParamsSchema,
  ConsolePluginSetParamsSchema,
  CreatePluginSetBodySchema,
  PluginSetMemberParamsSchema,
  PluginSetPageSchema,
  PluginSetParamsSchema,
  PluginSetResponseSchema,
  PutUserPluginBodySchema,
  UpdatePluginSetBodySchema,
  UserInstallModeBodySchema,
  UserInstallModeResponseSchema,
  UserPluginListQuerySchema,
  UserPluginRemoveQuerySchema,
} from './project-catalog.js';
import {
  ConsoleUserPluginsParamsSchema,
  PutSessionPluginComponentBodySchema,
  PutUserPluginComponentBodySchema,
  PutUserPluginVariablesBodySchema,
  UserPluginComponentParamsSchema,
  UserPluginStatePageSchema,
  UserPluginStateResponseSchema,
  UserPluginVariablesParamsSchema,
} from './user-plugin-state.js';
import {
  McpOAuthCallbackQuerySchema,
  McpOAuthDiscoverResponseSchema,
  McpOAuthStartBodySchema,
  McpOAuthStartResponseSchema,
  McpProbeResponseSchema,
  McpServerResponseSchema,
  PutMcpAuthBodySchema,
} from './mcp-servers.js';
import {
  PluginDetailResponseSchema,
  PluginListQuerySchema,
  PluginPageResponseSchema,
  PluginVersionDetailResponseSchema,
  PluginVersionReviewResponseSchema,
  PluginVersionSummaryResponseSchema,
} from './marketplace.js';
import {
  AcceptInviteBodySchema,
  AcceptInviteResponseSchema,
  InvitePreviewResponseSchema,
  PreviewInviteBodySchema,
  CreateInviteResponseSchema,
  CreateInviteBodySchema,
  CreateOrgBodySchema,
  DeleteOrgQuerySchema,
  InviteResponseSchema,
  OrgMeResponseSchema,
  OrgMemberResponseSchema,
  OrgResponseSchema,
  UpdateOrgBodySchema,
  UpdateOrgMemberBodySchema,
} from './organizations.js';
import { OrgPolicyResponseSchema, UpdateOrgPolicyBodySchema } from './org-policy.js';
import { MeResponseSchema } from './profile.js';
import {
  CreateProjectBodySchema,
  CreateProjectKeyBodySchema,
  OrgProjectsParamsSchema,
  ProjectKeyCreatedResponseSchema,
  ProjectKeyParamsSchema,
  ProjectKeyResponseSchema,
  ProjectParamsSchema,
  ProjectResponseSchema,
  UpdateProjectBodySchema,
} from './projects.js';
import { platformRouteOpen } from './platform-route-access.js';
import {
  ConsoleProjectLogsParamsSchema,
  ProjectLogPageSchema,
  ProjectLogQuerySchema,
  ProjectUsageQuerySchema,
  ProjectUsageResponseSchema,
} from './project-logs.js';
import {
  ProjectWebhookResponseSchema,
  ProjectWebhookSecretResponseSchema,
  PutProjectWebhookBodySchema,
  WebhookDeliveryPageSchema,
  WebhookDeliveryQuerySchema,
} from './project-webhook.js';
import {
  ConsoleProjectUserParamsSchema,
  ConsoleProjectUsersParamsSchema,
  ProjectMeResponseSchema,
  ProjectUserListQuerySchema,
  ProjectUserPageSchema,
  ProjectUserResponseSchema,
  PutProjectUserBodySchema,
} from './project-users.js';
import {
  GatewayAuthenticateBodySchema,
  GatewayAuthenticateResponseSchema,
  GatewayAccessBodySchema,
  GatewayAccessResponseSchema,
  GatewayServersBodySchema,
  GatewayServersResponseSchema,
  GatewayUsageBodySchema,
  GatewayUsageResponseSchema,
} from './gateway.js';
import {
  ArchiveParamsSchema,
  ComponentArchiveParamsSchema,
  SyncQuerySchema,
  SyncReportBodySchema,
  SyncResponseSchema,
} from './sync.js';

export type RouteApp = 'web' | 'admin' | 'api' | 'gateway' | 'worker' | 'all';
export type RoutePrincipal = 'none' | 'session' | 'key' | 'wl' | 'pa' | 'project' | 'platform';
export type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RouteDef {
  /** Descriptive dotted id: `<resource>.<action>`, camelCase action. */
  id: string;
  method: RouteMethod;
  /** Path with `{param}` placeholders, as served by `app`. */
  pathTemplate: string;
  app: RouteApp;
  principals: RoutePrincipal[];
  /** Permission action checked by the domain (`noun:verb`), or null when none applies. */
  action: string | null;
  params?: z.ZodType;
  query?: z.ZodType;
  body?: z.ZodType;
  headers?: z.ZodType;
  responses: Record<number, z.ZodType>;
  idempotency: 'required' | 'optional' | 'none';
  /** The response carries a secret that is not stored for replay. */
  secretResponse?: boolean;
  transitional?: boolean;
  /** Registry id of the replacing route, or null while none exists. */
  replacedBy?: string | null;
  /** `bff`: reached through the web BFF; `internal`: service to service; `public`: direct. */
  exposure: 'bff' | 'internal' | 'public';
}

const NoContent = z.undefined();
const EmptyObject = z.object({});
const Page = PageSchema;

const orgParams = z.object({ orgId: IdSchema('org') });
const memberParams = orgParams.extend({ userId: IdSchema('usr') });
const inviteParams = orgParams.extend({ inviteId: IdSchema('inv') });

type Fields = Omit<RouteDef, 'id' | 'method' | 'pathTemplate' | 'app' | 'exposure'>;

const route = (
  id: string,
  method: RouteMethod,
  pathTemplate: string,
  fields: Partial<Fields> & Pick<Fields, 'responses'>,
  overrides: Partial<Pick<RouteDef, 'app' | 'exposure'>> = {},
): RouteDef => ({
  id,
  method,
  pathTemplate,
  app: 'api',
  exposure: 'bff',
  principals: ['session'],
  action: null,
  idempotency: 'none',
  ...fields,
  ...overrides,
});

const health: RouteDef[] = [
  route(
    'health.get',
    'GET',
    '/healthz',
    { principals: ['none'], responses: { 200: HealthSchema } },
    { app: 'all', exposure: 'internal' },
  ),
  route(
    'ready.get',
    'GET',
    '/readyz',
    { principals: ['none'], responses: { 200: ReadySchema, 503: ReadySchema } },
    { app: 'all', exposure: 'internal' },
  ),
  route(
    'metrics.get',
    'GET',
    '/metrics',
    { principals: ['none'], responses: { 200: z.string() } },
    { app: 'all', exposure: 'internal' },
  ),
];

const auth: RouteDef[] = [
  route('auth.signup', 'POST', '/v1/auth/signup', {
    principals: ['none'],
    body: SignupBodySchema,
    responses: { 201: z.object({ userId: IdSchema('usr') }) },
    idempotency: 'required',
  }),
  route('auth.verifyEmail', 'POST', '/v1/auth/verify-email', {
    principals: ['none'],
    body: VerifyEmailBodySchema,
    responses: { 200: SessionIssuedSchema },
    idempotency: 'optional',
    secretResponse: true,
  }),
  route('auth.resendVerification', 'POST', '/v1/auth/resend-verification', {
    principals: ['none'],
    body: ResendVerificationBodySchema,
    responses: { 202: EmptyObject },
    idempotency: 'optional',
  }),
  route('auth.signin', 'POST', '/v1/auth/signin', {
    principals: ['none'],
    body: SigninBodySchema,
    responses: { 200: SessionIssuedSchema },
  }),
  route('auth.signout', 'POST', '/v1/auth/signout', { responses: { 204: NoContent } }),
  route('auth.signoutAll', 'POST', '/v1/auth/signout-all', { responses: { 204: NoContent } }),
  route('auth.forgotPassword', 'POST', '/v1/auth/forgot-password', {
    principals: ['none'],
    body: ForgotPasswordBodySchema,
    responses: { 202: EmptyObject },
    idempotency: 'optional',
  }),
  route('auth.resetPassword', 'POST', '/v1/auth/reset-password', {
    principals: ['none'],
    body: ResetPasswordBodySchema,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('auth.changePassword', 'POST', '/v1/auth/change-password', {
    body: ChangePasswordBodySchema,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('auth.changeEmail', 'POST', '/v1/auth/change-email', {
    body: ChangeEmailBodySchema,
    responses: { 202: EmptyObject },
    idempotency: 'optional',
  }),
  route('auth.confirmEmailChange', 'POST', '/v1/auth/confirm-email-change', {
    principals: ['none'],
    body: ConfirmEmailChangeBodySchema,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('auth.me', 'GET', '/v1/auth/me', { responses: { 200: MeResponseSchema } }),
  route('auth.deleteMe', 'DELETE', '/v1/auth/me', {
    query: DeleteUserQuerySchema,
    responses: { 202: DeletionAcceptedSchema },
    idempotency: 'optional',
  }),
  route(
    'auth.session',
    'POST',
    '/v1/auth/session',
    {
      principals: ['wl'],
      responses: { 200: z.object({ userId: IdSchema('usr'), sessionId: IdSchema('ses') }) },
    },
    { exposure: 'internal' },
  ),
  route(
    'csrf.get',
    'GET',
    '/api/csrf',
    { principals: ['none'], responses: { 200: z.object({ csrfToken: z.string() }) } },
    { app: 'web', exposure: 'public' },
  ),
  route(
    'runtimeConfig.get',
    'GET',
    '/api/runtime-config',
    {
      principals: ['none'],
      responses: { 200: z.object({ gatewayUrl: z.string() }) },
    },
    { app: 'web', exposure: 'public' },
  ),
];

/** What the gateway asks of the api so it does not need the database itself. */
const gatewayInternal: RouteDef[] = [
  route(
    'gateway.authenticate',
    'POST',
    '/v1/gateway/authenticate',
    {
      principals: ['wl'],
      action: 'workload:gateway-resolve',
      body: GatewayAuthenticateBodySchema,
      responses: { 200: GatewayAuthenticateResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'gateway.servers',
    'POST',
    '/v1/gateway/servers',
    {
      principals: ['wl'],
      action: 'workload:gateway-resolve',
      body: GatewayServersBodySchema,
      responses: { 200: GatewayServersResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'gateway.access',
    'POST',
    '/v1/gateway/access',
    {
      principals: ['wl'],
      action: 'workload:gateway-resolve',
      body: GatewayAccessBodySchema,
      responses: { 200: GatewayAccessResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'gateway.usage',
    'POST',
    '/v1/gateway/usage',
    {
      principals: ['wl'],
      action: 'workload:gateway-write',
      body: GatewayUsageBodySchema,
      responses: { 200: GatewayUsageResponseSchema },
    },
    { exposure: 'internal' },
  ),
];

const organizations: RouteDef[] = [
  route('orgs.list', 'GET', '/v1/orgs', {
    action: 'org:read',
    query: PageQuerySchema,
    responses: { 200: Page(OrgResponseSchema) },
  }),
  route('orgs.create', 'POST', '/v1/orgs', {
    body: CreateOrgBodySchema,
    responses: { 201: OrgResponseSchema },
    idempotency: 'required',
  }),
  route('orgs.get', 'GET', '/v1/orgs/{orgId}', {
    action: 'org:read',
    params: orgParams,
    responses: { 200: OrgResponseSchema },
  }),
  route('orgs.update', 'PATCH', '/v1/orgs/{orgId}', {
    action: 'org:update',
    params: orgParams,
    body: UpdateOrgBodySchema,
    responses: { 200: OrgResponseSchema },
    idempotency: 'optional',
  }),
  route('orgs.delete', 'DELETE', '/v1/orgs/{orgId}', {
    action: 'org:delete',
    params: orgParams,
    query: DeleteOrgQuerySchema,
    responses: { 202: DeletionAcceptedSchema },
    idempotency: 'optional',
  }),
  route('orgs.me', 'GET', '/v1/orgs/{orgId}/me', {
    action: 'org:read',
    params: orgParams,
    responses: { 200: OrgMeResponseSchema },
  }),
  route('orgPolicy.get', 'GET', '/v1/orgs/{orgId}/policy', {
    action: 'org-policy:read',
    params: orgParams,
    responses: { 200: OrgPolicyResponseSchema },
  }),
  route('orgPolicy.update', 'PATCH', '/v1/orgs/{orgId}/policy', {
    action: 'org-policy:update',
    params: orgParams,
    body: UpdateOrgPolicyBodySchema,
    responses: { 200: OrgPolicyResponseSchema },
    idempotency: 'optional',
  }),
  route('members.list', 'GET', '/v1/orgs/{orgId}/members', {
    action: 'member:list',
    params: orgParams,
    query: PageQuerySchema,
    responses: { 200: Page(OrgMemberResponseSchema) },
  }),
  route('members.update', 'PATCH', '/v1/orgs/{orgId}/members/{userId}', {
    action: 'member:update',
    params: memberParams,
    body: UpdateOrgMemberBodySchema,
    responses: { 200: OrgMemberResponseSchema },
    idempotency: 'optional',
  }),
  route('members.remove', 'DELETE', '/v1/orgs/{orgId}/members/{userId}', {
    action: 'member:remove',
    params: memberParams,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('invites.list', 'GET', '/v1/orgs/{orgId}/invites', {
    action: 'invite:list',
    params: orgParams,
    query: PageQuerySchema,
    responses: { 200: Page(InviteResponseSchema) },
  }),
  route('invites.create', 'POST', '/v1/orgs/{orgId}/invites', {
    action: 'invite:create',
    params: orgParams,
    body: CreateInviteBodySchema,
    responses: { 201: CreateInviteResponseSchema },
    idempotency: 'required',
  }),
  route('invites.revoke', 'DELETE', '/v1/orgs/{orgId}/invites/{inviteId}', {
    action: 'invite:revoke',
    params: inviteParams,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('invites.resend', 'POST', '/v1/orgs/{orgId}/invites/{inviteId}/resend', {
    action: 'invite:resend',
    params: inviteParams,
    responses: { 202: EmptyObject },
    idempotency: 'optional',
  }),
  route('invites.preview', 'POST', '/v1/invites/preview', {
    principals: ['none'],
    body: PreviewInviteBodySchema,
    responses: { 200: InvitePreviewResponseSchema },
  }),
  route('invites.accept', 'POST', '/v1/invites/accept', {
    action: 'invite:accept',
    body: AcceptInviteBodySchema,
    responses: { 200: AcceptInviteResponseSchema },
  }),
];

const marketplace: RouteDef[] = [
  route('plugins.list', 'GET', '/v1/plugins', {
    action: 'plugin:read',
    query: PluginListQuerySchema,
    responses: { 200: PluginPageResponseSchema },
  }),
  route('categories.list', 'GET', '/v1/categories', {
    action: 'plugin:read',
    responses: { 200: CategoryListResponseSchema },
  }),
  route('plugins.get', 'GET', '/v1/plugins/{pluginId}', {
    action: 'plugin:read',
    params: z.object({ pluginId: IdSchema('plg') }),
    responses: { 200: PluginDetailResponseSchema },
  }),
  route('plugins.versions', 'GET', '/v1/plugins/{pluginId}/versions', {
    params: z.object({ pluginId: IdSchema('plg') }),
    query: PageQuerySchema,
    responses: { 200: Page(PluginVersionSummaryResponseSchema) },
  }),
  route('pluginVersions.get', 'GET', '/v1/plugin-versions/{pluginVersionId}', {
    params: z.object({ pluginVersionId: IdSchema('pv') }),
    responses: { 200: PluginVersionDetailResponseSchema },
  }),
  route('pluginVersions.review', 'GET', '/v1/plugin-versions/{pluginVersionId}/review', {
    params: z.object({ pluginVersionId: IdSchema('pv') }),
    responses: { 200: PluginVersionReviewResponseSchema },
  }),
];

type Scope = 'org' | 'user';
const SCOPE_PREFIX: Record<Scope, string> = {
  org: '/v1/orgs/{orgId}',
  user: '/v1/orgs/{orgId}/me',
};
const scopeParams = (_scope: Scope) => orgParams;

/** One route per scope: `<id>.org`, `<id>.user`. */
function scoped(
  id: string,
  method: RouteMethod,
  suffix: string,
  fields: Partial<Fields> & Pick<Fields, 'responses'> & { pathParams?: z.ZodRawShape },
  extra: { transitional?: boolean; replacedBy?: string | null } = {},
): RouteDef[] {
  return (['org', 'user'] as const).map((scope) => {
    const { pathParams, ...rest } = fields;
    const params = pathParams ? scopeParams(scope).extend(pathParams) : scopeParams(scope);
    return route(`${id}.${scope}`, method, `${SCOPE_PREFIX[scope]}${suffix}`, {
      ...rest,
      params,
      ...(extra.transitional ? { transitional: true, replacedBy: extra.replacedBy ?? null } : {}),
    });
  });
}

const installationParam = { installationId: IdSchema('ins') };

const installations: RouteDef[] = [
  ...scoped('installations.list', 'GET', '/installations', {
    action: 'installation:list',
    query: PageQuerySchema,
    responses: { 200: Page(InstallationResponseSchema) },
  }),
  ...scoped('installations.create', 'POST', '/installations', {
    action: 'installation:create',
    body: CreateInstallationBodySchema,
    responses: { 201: InstallationResponseSchema },
    idempotency: 'required',
  }),
  ...scoped('installations.get', 'GET', '/installations/{installationId}', {
    action: 'installation:read',
    pathParams: installationParam,
    responses: { 200: InstallationResponseSchema },
  }),
  ...scoped('installations.update', 'PATCH', '/installations/{installationId}', {
    action: 'installation:update',
    pathParams: installationParam,
    body: UpdateInstallationBodySchema,
    responses: { 200: InstallationResponseSchema },
    idempotency: 'optional',
  }),
  ...scoped('installations.delete', 'DELETE', '/installations/{installationId}', {
    action: 'installation:delete',
    pathParams: installationParam,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  ...scoped('installations.upgrade', 'POST', '/installations/{installationId}/upgrade', {
    action: 'installation:upgrade',
    pathParams: installationParam,
    body: UpgradeInstallationBodySchema,
    responses: { 200: UpgradeResultSchema },
    idempotency: 'required',
  }),
  ...scoped('components.list', 'GET', '/installations/{installationId}/components', {
    action: 'installation:read',
    pathParams: installationParam,
    responses: { 200: Page(ComponentResponseSchema) },
  }),
  ...scoped(
    'components.update',
    'PATCH',
    '/installations/{installationId}/components/{componentId}',
    {
      action: 'component:update',
      pathParams: { ...installationParam, componentId: IdSchema('cmp') },
      body: UpdateComponentBodySchema,
      responses: { 200: ComponentResponseSchema },
      idempotency: 'optional',
    },
  ),
  ...scoped('variables.list', 'GET', '/installations/{installationId}/variables', {
    action: 'variable:read',
    pathParams: installationParam,
    responses: { 200: Page(VariableStatusSchema) },
  }),
  ...scoped('variables.put', 'PUT', '/installations/{installationId}/variables', {
    action: 'variable:write',
    pathParams: installationParam,
    body: PutVariablesBodySchema,
    responses: { 200: Page(VariableStatusSchema) },
    idempotency: 'optional',
  }),
];

const mcpParams = { ...installationParam, componentId: IdSchema('cmp') };
const mcpBase = '/installations/{installationId}/mcp-servers';

const mcpServers: RouteDef[] = [
  ...scoped('mcpServers.list', 'GET', mcpBase, {
    action: 'mcp-server:list',
    pathParams: installationParam,
    responses: { 200: Page(McpServerResponseSchema) },
  }),
  ...scoped('mcpServers.get', 'GET', `${mcpBase}/{componentId}`, {
    action: 'mcp-server:read',
    pathParams: mcpParams,
    responses: { 200: McpServerResponseSchema },
  }),
  ...scoped('mcpServers.putAuth', 'PUT', `${mcpBase}/{componentId}/auth`, {
    action: 'mcp-server:update',
    pathParams: mcpParams,
    body: PutMcpAuthBodySchema,
    responses: { 200: McpServerResponseSchema },
    idempotency: 'optional',
  }),
  ...scoped('mcpServers.test', 'POST', `${mcpBase}/{componentId}/test`, {
    action: 'mcp-server:test',
    pathParams: mcpParams,
    responses: { 200: McpProbeResponseSchema },
  }),
  ...scoped('mcpServers.oauthDiscover', 'POST', `${mcpBase}/{componentId}/oauth/discover`, {
    action: 'mcp-server:test',
    pathParams: mcpParams,
    responses: { 200: McpOAuthDiscoverResponseSchema },
  }),
  ...scoped('mcpServers.oauthStart', 'POST', `${mcpBase}/{componentId}/oauth/start`, {
    action: 'user-connection:authorize',
    pathParams: mcpParams,
    body: McpOAuthStartBodySchema,
    responses: { 200: McpOAuthStartResponseSchema },
  }),
  ...scoped('mcpServers.oauthDisconnect', 'DELETE', `${mcpBase}/{componentId}/oauth`, {
    action: 'user-connection:delete',
    pathParams: mcpParams,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  // The provider sends the browser here without the session cookie; the state binds the member.
  route('mcpServers.oauthCallback', 'GET', '/v1/oauth/callback', {
    principals: ['none'],
    query: McpOAuthCallbackQuerySchema,
    responses: { 302: NoContent },
  }),
];

/** Delivery to agents, CLIs and IDEs: reached by key, through the gateway host. */
const delivery: RouteDef[] = [
  route(
    'sync.get',
    'GET',
    '/v1/sync',
    {
      principals: ['key'],
      action: 'artifact:sync',
      query: SyncQuerySchema,
      responses: { 200: SyncResponseSchema, 304: NoContent },
    },
    { exposure: 'public' },
  ),
  route(
    'sync.report',
    'POST',
    '/v1/sync/reports',
    {
      principals: ['key'],
      action: 'artifact:sync',
      body: SyncReportBodySchema,
      responses: { 204: NoContent },
    },
    { exposure: 'public' },
  ),
  route(
    'sync.component',
    'GET',
    '/v1/sync/components/{sha256}',
    {
      principals: ['key'],
      action: 'artifact:download',
      params: ComponentArchiveParamsSchema,
      responses: { 200: z.string(), 206: z.string(), 304: NoContent },
    },
    { exposure: 'public' },
  ),
  route(
    'pluginVersions.archive',
    'GET',
    '/v1/plugin-versions/{pluginVersionId}/archive',
    {
      principals: ['key'],
      action: 'artifact:download',
      params: ArchiveParamsSchema,
      responses: { 200: z.string(), 206: z.string(), 304: NoContent },
    },
    { exposure: 'public' },
  ),
];

/** API keys: managed by the organization's admins; the member's own view lists them too. */
const apiKeys: RouteDef[] = [
  ...scoped('apiKeys.list', 'GET', '/api-keys', {
    action: 'api-key:list',
    query: PageQuerySchema,
    responses: { 200: Page(ApiKeyResponseSchema) },
  }),
  route('apiKeys.create.org', 'POST', '/v1/orgs/{orgId}/api-keys', {
    action: 'api-key:create',
    params: orgParams,
    body: CreateApiKeyBodySchema,
    responses: { 201: ApiKeyCreatedResponseSchema },
    idempotency: 'required',
    secretResponse: true,
  }),
  route('apiKeys.revoke.org', 'DELETE', '/v1/orgs/{orgId}/api-keys/{keyId}', {
    action: 'api-key:revoke',
    params: orgParams.extend({ keyId: IdSchema('key') }),
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
];

/** Website routes for the people who manage the projects of an organization. */
const projects: RouteDef[] = [
  route('projects.list', 'GET', '/v1/orgs/{orgId}/projects', {
    action: 'project:read',
    params: OrgProjectsParamsSchema,
    query: PageQuerySchema,
    responses: { 200: Page(ProjectResponseSchema) },
  }),
  route('projects.create', 'POST', '/v1/orgs/{orgId}/projects', {
    action: 'project:create',
    params: OrgProjectsParamsSchema,
    body: CreateProjectBodySchema,
    responses: { 201: ProjectResponseSchema },
    idempotency: 'required',
  }),
  route('projects.get', 'GET', '/v1/orgs/{orgId}/projects/{projectId}', {
    action: 'project:read',
    params: ProjectParamsSchema,
    responses: { 200: ProjectResponseSchema },
  }),
  route('projects.update', 'PATCH', '/v1/orgs/{orgId}/projects/{projectId}', {
    action: 'project:update',
    params: ProjectParamsSchema,
    body: UpdateProjectBodySchema,
    responses: { 200: ProjectResponseSchema },
    idempotency: 'optional',
  }),
  route('projects.delete', 'DELETE', '/v1/orgs/{orgId}/projects/{projectId}', {
    action: 'project:delete',
    params: ProjectParamsSchema,
    responses: { 204: NoContent },
    idempotency: 'optional',
  }),
  route('projectKeys.list', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/keys', {
    action: 'project-key:read',
    params: ProjectParamsSchema,
    query: PageQuerySchema,
    responses: { 200: Page(ProjectKeyResponseSchema) },
  }),
  route('projectKeys.create', 'POST', '/v1/orgs/{orgId}/projects/{projectId}/keys', {
    action: 'project-key:create',
    params: ProjectParamsSchema,
    body: CreateProjectKeyBodySchema,
    responses: { 201: ProjectKeyCreatedResponseSchema },
    idempotency: 'required',
    secretResponse: true,
  }),
  route(
    'projectKeys.rotate',
    'POST',
    '/v1/orgs/{orgId}/projects/{projectId}/keys/{projectKeyId}/rotate',
    {
      action: 'project-key:create',
      params: ProjectKeyParamsSchema,
      responses: { 201: ProjectKeyCreatedResponseSchema },
      idempotency: 'required',
      secretResponse: true,
    },
  ),
  route(
    'projectKeys.revoke',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/keys/{projectKeyId}',
    {
      action: 'project-key:revoke',
      params: ProjectKeyParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
  route('projectUsersConsole.list', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/users', {
    action: 'project:read',
    params: ConsoleProjectUsersParamsSchema,
    query: ProjectUserListQuerySchema,
    responses: { 200: ProjectUserPageSchema },
  }),
  route(
    'projectUsersConsole.get',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/users/{projectUserId}',
    {
      action: 'project:read',
      params: ConsoleProjectUserParamsSchema,
      responses: { 200: ProjectUserResponseSchema },
    },
  ),
  route(
    'projectUsersConsole.delete',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/users/{projectUserId}',
    {
      action: 'project-user:delete',
      params: ConsoleProjectUserParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
  route('projectLogsConsole.list', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/logs', {
    action: 'project:read',
    params: ConsoleProjectLogsParamsSchema,
    query: ProjectLogQuerySchema,
    responses: { 200: ProjectLogPageSchema },
  }),
  route('projectUsageConsole.get', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/usage', {
    action: 'project:read',
    params: ConsoleProjectLogsParamsSchema,
    query: ProjectUsageQuerySchema,
    responses: { 200: ProjectUsageResponseSchema },
  }),
  route('projectWebhookConsole.get', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/webhook', {
    action: 'project-webhook:read',
    params: ProjectParamsSchema,
    responses: { 200: ProjectWebhookResponseSchema },
  }),
  route('projectWebhookConsole.put', 'PUT', '/v1/orgs/{orgId}/projects/{projectId}/webhook', {
    action: 'project-webhook:write',
    params: ProjectParamsSchema,
    body: PutProjectWebhookBodySchema,
    // 201 with the secret the first time, 200 without it after that.
    responses: { 200: ProjectWebhookResponseSchema, 201: ProjectWebhookSecretResponseSchema },
  }),
  route('projectWebhookConsole.delete', 'DELETE', '/v1/orgs/{orgId}/projects/{projectId}/webhook', {
    action: 'project-webhook:write',
    params: ProjectParamsSchema,
    responses: { 204: NoContent },
  }),
  route(
    'projectWebhookConsole.rotateSecret',
    'POST',
    '/v1/orgs/{orgId}/projects/{projectId}/webhook/rotate-secret',
    {
      action: 'project-webhook:write',
      params: ProjectParamsSchema,
      responses: { 200: ProjectWebhookSecretResponseSchema },
    },
  ),
  route(
    'projectWebhookConsole.deliveries',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/webhook/deliveries',
    {
      action: 'project-webhook:read',
      params: ProjectParamsSchema,
      query: WebhookDeliveryQuerySchema,
      responses: { 200: WebhookDeliveryPageSchema },
    },
  ),
  route('projectPluginsConsole.list', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/plugins', {
    action: 'project-plugin:read',
    params: ProjectParamsSchema,
    query: PageQuerySchema,
    responses: { 200: ProjectPluginPageSchema },
  }),
  route(
    'projectPluginsConsole.put',
    'PUT',
    '/v1/orgs/{orgId}/projects/{projectId}/plugins/{pluginId}',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectPluginParamsSchema,
      body: PutProjectPluginBodySchema,
      responses: { 200: ProjectPluginResponseSchema, 201: ProjectPluginResponseSchema },
      idempotency: 'optional',
    },
  ),
  route(
    'projectPluginsConsole.oauthDiscover',
    'POST',
    '/v1/orgs/{orgId}/projects/{projectId}/plugins/{pluginId}/mcp-servers/{serverName}/oauth/discover',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectPluginServerParamsSchema,
      responses: { 200: McpOAuthDiscoverResponseSchema },
    },
  ),
  route(
    'projectPluginsConsole.delete',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/plugins/{pluginId}',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectPluginParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
  route(
    'projectAuthConfigsConsole.list',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs',
    {
      action: 'project-plugin:read',
      params: ProjectParamsSchema,
      query: AuthConfigListQuerySchema,
      responses: { 200: AuthConfigPageSchema },
    },
  ),
  route(
    'projectAuthConfigsConsole.create',
    'POST',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs',
    {
      action: 'project-plugin:write',
      params: ProjectParamsSchema,
      body: CreateAuthConfigBodySchema,
      responses: { 201: AuthConfigResponseSchema },
      idempotency: 'optional',
    },
  ),
  route(
    'projectAuthConfigsConsole.get',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs/{authConfigId}',
    {
      action: 'project-plugin:read',
      params: ConsoleProjectAuthConfigParamsSchema,
      responses: { 200: AuthConfigResponseSchema },
    },
  ),
  route(
    'projectAuthConfigsConsole.update',
    'PUT',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs/{authConfigId}',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectAuthConfigParamsSchema,
      body: UpdateAuthConfigBodySchema,
      responses: { 200: AuthConfigResponseSchema },
      idempotency: 'optional',
    },
  ),
  route(
    'projectAuthConfigsConsole.delete',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs/{authConfigId}',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectAuthConfigParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
  route(
    'projectAuthConfigsConsole.putVariables',
    'PUT',
    '/v1/orgs/{orgId}/projects/{projectId}/auth-configs/{componentId}/variables',
    {
      action: 'project-plugin:write',
      params: ConsoleProjectAuthConfigVariablesParamsSchema,
      body: PutVariablesBodySchema,
      responses: { 200: Page(VariableStatusSchema) },
      idempotency: 'optional',
    },
  ),
];

interface CatalogSpec {
  group: string;
  verb: string;
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
  suffix: string;
  access: 'read' | 'write';
  params?: { host: z.ZodType; console: z.ZodType };
  query?: z.ZodType;
  body?: z.ZodType;
  responses: Record<number, z.ZodType>;
}

const pluginParams = { host: ProjectPluginParamsSchema, console: ConsoleProjectPluginParamsSchema };
const userPluginVariablesParams = {
  host: UserPluginVariablesParamsSchema,
  console: ProjectParamsSchema.extend(UserPluginVariablesParamsSchema.shape),
};
const userPluginComponentParams = {
  host: UserPluginComponentParamsSchema,
  console: ProjectParamsSchema.extend(UserPluginComponentParamsSchema.shape),
};
const setParams = { host: PluginSetParamsSchema, console: ConsolePluginSetParamsSchema };
const setMemberParams = {
  host: PluginSetMemberParamsSchema,
  console: ConsolePluginSetMemberParamsSchema,
};

/**
 * What a project offers its users to install, and what they have installed. Each entry becomes a
 * call the host's key can make and a console call with the same shape under the project's path.
 */
const CATALOG_SPECS: CatalogSpec[] = [
  {
    group: 'projectCatalog',
    verb: 'list',
    method: 'GET',
    suffix: '/catalog',
    access: 'read',
    query: PluginListQuerySchema,
    responses: { 200: PluginPageResponseSchema },
  },
  {
    group: 'projectCatalog',
    verb: 'get',
    method: 'GET',
    suffix: '/catalog/{pluginId}',
    access: 'read',
    params: pluginParams,
    responses: { 200: PluginDetailResponseSchema },
  },
  {
    group: 'projectUserInstallMode',
    verb: 'get',
    method: 'GET',
    suffix: '/user-install-mode',
    access: 'read',
    responses: { 200: UserInstallModeResponseSchema },
  },
  {
    group: 'projectUserInstallMode',
    verb: 'put',
    method: 'PUT',
    suffix: '/user-install-mode',
    access: 'write',
    body: UserInstallModeBodySchema,
    responses: { 200: UserInstallModeResponseSchema },
  },
  {
    group: 'projectAllowedPlugins',
    verb: 'list',
    method: 'GET',
    suffix: '/allowed-plugins',
    access: 'read',
    query: PageQuerySchema,
    responses: { 200: AllowedPluginPageSchema },
  },
  {
    group: 'projectAllowedPlugins',
    verb: 'put',
    method: 'PUT',
    suffix: '/allowed-plugins/{pluginId}',
    access: 'write',
    params: pluginParams,
    responses: { 200: AllowedPluginResponseSchema, 201: AllowedPluginResponseSchema },
  },
  {
    group: 'projectAllowedPlugins',
    verb: 'delete',
    method: 'DELETE',
    suffix: '/allowed-plugins/{pluginId}',
    access: 'write',
    params: pluginParams,
    responses: { 204: NoContent },
  },
  {
    group: 'projectPluginSets',
    verb: 'list',
    method: 'GET',
    suffix: '/plugin-sets',
    access: 'read',
    query: PageQuerySchema,
    responses: { 200: PluginSetPageSchema },
  },
  {
    group: 'projectPluginSets',
    verb: 'create',
    method: 'POST',
    suffix: '/plugin-sets',
    access: 'write',
    body: CreatePluginSetBodySchema,
    responses: { 201: PluginSetResponseSchema },
  },
  {
    group: 'projectPluginSets',
    verb: 'get',
    method: 'GET',
    suffix: '/plugin-sets/{setId}',
    access: 'read',
    params: setParams,
    responses: { 200: PluginSetResponseSchema },
  },
  {
    group: 'projectPluginSets',
    verb: 'update',
    method: 'PATCH',
    suffix: '/plugin-sets/{setId}',
    access: 'write',
    params: setParams,
    body: UpdatePluginSetBodySchema,
    responses: { 200: PluginSetResponseSchema },
  },
  {
    group: 'projectPluginSets',
    verb: 'delete',
    method: 'DELETE',
    suffix: '/plugin-sets/{setId}',
    access: 'write',
    params: setParams,
    responses: { 204: NoContent },
  },
  {
    group: 'projectPluginSetMembers',
    verb: 'put',
    method: 'PUT',
    suffix: '/plugin-sets/{setId}/plugins/{pluginId}',
    access: 'write',
    params: setMemberParams,
    responses: { 200: PluginSetResponseSchema },
  },
  {
    group: 'projectPluginSetMembers',
    verb: 'delete',
    method: 'DELETE',
    suffix: '/plugin-sets/{setId}/plugins/{pluginId}',
    access: 'write',
    params: setMemberParams,
    responses: { 204: NoContent },
  },
  {
    group: 'projectUserPlugins',
    verb: 'list',
    method: 'GET',
    suffix: '/user-plugins',
    access: 'read',
    query: UserPluginListQuerySchema,
    responses: { 200: UserPluginStatePageSchema },
  },
  {
    group: 'projectUserPluginVariables',
    verb: 'put',
    method: 'PUT',
    suffix: '/user-plugins/{pluginId}/variables',
    access: 'write',
    params: userPluginVariablesParams,
    body: PutUserPluginVariablesBodySchema,
    responses: { 200: UserPluginStateResponseSchema },
  },
  {
    group: 'projectUserPluginComponents',
    verb: 'put',
    method: 'PUT',
    suffix: '/user-plugins/{pluginId}/components/{componentId}',
    access: 'write',
    params: userPluginComponentParams,
    body: PutUserPluginComponentBodySchema,
    responses: { 200: UserPluginStateResponseSchema },
  },
  {
    group: 'projectUserPluginComponents',
    verb: 'delete',
    method: 'DELETE',
    suffix: '/user-plugins/{pluginId}/components/{componentId}',
    access: 'write',
    params: userPluginComponentParams,
    query: UserPluginRemoveQuerySchema,
    responses: { 200: UserPluginStateResponseSchema },
  },
  {
    group: 'projectUserPlugins',
    verb: 'put',
    method: 'PUT',
    suffix: '/user-plugins/{pluginId}',
    access: 'write',
    params: pluginParams,
    body: PutUserPluginBodySchema,
    responses: { 200: ProjectPluginResponseSchema, 201: ProjectPluginResponseSchema },
  },
  {
    group: 'projectUserPlugins',
    verb: 'delete',
    method: 'DELETE',
    suffix: '/user-plugins/{pluginId}',
    access: 'write',
    params: pluginParams,
    query: UserPluginRemoveQuerySchema,
    responses: { 204: NoContent },
  },
];

const projectCatalogConsole: RouteDef[] = CATALOG_SPECS.map((spec) =>
  route(
    `${spec.group}Console.${spec.verb}`,
    spec.method,
    `/v1/orgs/{orgId}/projects/{projectId}${spec.suffix}`,
    {
      action: spec.access === 'read' ? 'project-plugin:read' : 'project-plugin:write',
      params: spec.params?.console ?? ProjectParamsSchema,
      ...(spec.query ? { query: spec.query } : {}),
      ...(spec.body ? { body: spec.body } : {}),
      responses: spec.responses,
      ...(spec.access === 'write' ? { idempotency: 'optional' as const } : {}),
    },
  ),
);

const projectCatalogHost: RouteDef[] = CATALOG_SPECS.map((spec) =>
  route(
    `${spec.group}.${spec.verb}`,
    spec.method,
    `/v1/project${spec.suffix}`,
    {
      principals: ['project'],
      ...(spec.params ? { params: spec.params.host } : {}),
      ...(spec.query ? { query: spec.query } : {}),
      ...(spec.body ? { body: spec.body } : {}),
      responses: spec.responses,
    },
    { exposure: 'internal' },
  ),
);

/**
 * Sessions: short-lived tokens the host mints for one of its users. The host's calls and the
 * console's share one meaning; the console cannot mint, because the token is for the host's server.
 * A plugin installed after a session was created is hidden from it when the session has a
 * non-empty plugin list.
 */
const projectSessionsConsole: RouteDef[] = [
  route(
    'projectUserPluginsConsole.state',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/users/{projectUserId}/plugins',
    {
      action: 'project-plugin:read',
      params: ConsoleUserPluginsParamsSchema,
      query: PageQuerySchema,
      responses: { 200: UserPluginStatePageSchema },
    },
  ),
  route('projectSessionsConsole.list', 'GET', '/v1/orgs/{orgId}/projects/{projectId}/sessions', {
    action: 'project-session:read',
    params: ProjectParamsSchema,
    query: SessionListQuerySchema,
    responses: { 200: SessionPageSchema },
  }),
  route(
    'projectSessionsConsole.get',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/sessions/{sessionId}',
    {
      action: 'project-session:read',
      params: ConsoleSessionParamsSchema,
      responses: { 200: SessionResponseSchema },
    },
  ),
  route(
    'projectSessionsConsole.revoke',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/sessions/{sessionId}',
    {
      action: 'project-session:write',
      params: ConsoleSessionParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
];

const projectSessionsHost: RouteDef[] = [
  route(
    'projectSessions.create',
    'POST',
    '/v1/project/sessions',
    {
      principals: ['project'],
      body: CreateSessionBodySchema,
      responses: { 201: SessionCreatedResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectSessions.list',
    'GET',
    '/v1/project/sessions',
    {
      principals: ['project'],
      query: SessionListQuerySchema,
      responses: { 200: SessionPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectSessions.get',
    'GET',
    '/v1/project/sessions/{sessionId}',
    {
      principals: ['project'],
      params: SessionParamsSchema,
      responses: { 200: SessionResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectSessions.revoke',
    'DELETE',
    '/v1/project/sessions/{sessionId}',
    { principals: ['project'], params: SessionParamsSchema, responses: { 204: NoContent } },
    { exposure: 'internal' },
  ),
];

/** What a session's own user can browse and install, called with the session token. */
const sessionSelf: RouteDef[] = [
  route(
    'sessionCatalog.list',
    'GET',
    '/v1/session/catalog',
    {
      principals: ['key'],
      action: 'artifact:sync',
      query: PluginListQuerySchema,
      responses: { 200: SessionCatalogPageSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPlugins.list',
    'GET',
    '/v1/session/plugins',
    {
      principals: ['key'],
      action: 'artifact:sync',
      query: PageQuerySchema,
      responses: { 200: UserPluginStatePageSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPluginVariables.put',
    'PUT',
    '/v1/session/plugins/{pluginId}/variables',
    {
      principals: ['key'],
      action: 'plugin:install',
      params: UserPluginVariablesParamsSchema,
      body: PutVariablesBodySchema,
      responses: { 200: UserPluginStateResponseSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPluginComponents.put',
    'PUT',
    '/v1/session/plugins/{pluginId}/components/{componentId}',
    {
      principals: ['key'],
      action: 'plugin:install',
      params: UserPluginComponentParamsSchema,
      body: PutSessionPluginComponentBodySchema,
      responses: { 200: UserPluginStateResponseSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPluginComponents.delete',
    'DELETE',
    '/v1/session/plugins/{pluginId}/components/{componentId}',
    {
      principals: ['key'],
      action: 'plugin:install',
      params: UserPluginComponentParamsSchema,
      responses: { 200: UserPluginStateResponseSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPlugins.put',
    'PUT',
    '/v1/session/plugins/{pluginId}',
    {
      principals: ['key'],
      action: 'plugin:install',
      params: ProjectPluginParamsSchema,
      body: PutSessionPluginBodySchema,
      responses: { 200: ProjectPluginResponseSchema, 201: ProjectPluginResponseSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionPlugins.delete',
    'DELETE',
    '/v1/session/plugins/{pluginId}',
    {
      principals: ['key'],
      action: 'plugin:install',
      params: ProjectPluginParamsSchema,
      responses: { 204: NoContent },
    },
    { exposure: 'public' },
  ),
];

/**
 * Connections: the sign-in a project user made to an MCP server. The host starts one for a user
 * (and sends the user's browser to `connectUrl`), reads them and removes them; the console reads
 * and removes them; a session's user starts and reads their own. The browser comes back through
 * the shared OAuth callback, which sends it on to the project's registered origin.
 */
const projectConnectionsConsole: RouteDef[] = [
  route(
    'projectConnectionsConsole.list',
    'GET',
    '/v1/orgs/{orgId}/projects/{projectId}/connections',
    {
      action: 'project-connection:read',
      params: ProjectParamsSchema,
      query: ConnectionListQuerySchema,
      responses: { 200: ConnectionPageSchema },
    },
  ),
  route(
    'projectConnectionsConsole.delete',
    'DELETE',
    '/v1/orgs/{orgId}/projects/{projectId}/connections/{connectionId}',
    {
      action: 'project-connection:write',
      params: ConsoleConnectionParamsSchema,
      responses: { 204: NoContent },
      idempotency: 'optional',
    },
  ),
];

const projectConnectionsHost: RouteDef[] = [
  route(
    'projectConnections.start',
    'POST',
    '/v1/project/connections',
    {
      principals: ['project'],
      body: StartProjectConnectionBodySchema,
      responses: { 200: StartProjectConnectionResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectConnections.put',
    'PUT',
    '/v1/project/connections',
    {
      principals: ['project'],
      body: PutProjectConnectionBodySchema,
      responses: { 200: ConnectionResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectConnections.list',
    'GET',
    '/v1/project/connections',
    {
      principals: ['project'],
      query: ConnectionListQuerySchema,
      responses: { 200: ConnectionPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectConnections.delete',
    'DELETE',
    '/v1/project/connections/{connectionId}',
    { principals: ['project'], params: ConnectionParamsSchema, responses: { 204: NoContent } },
    { exposure: 'internal' },
  ),
];

/** What a session's own user does about their sign-ins, called with the session token. */
const sessionConnections: RouteDef[] = [
  route(
    'sessionConnections.start',
    'POST',
    '/v1/session/connections',
    {
      principals: ['key'],
      action: 'mcp:call',
      body: StartSessionConnectionBodySchema,
      responses: { 200: StartSessionConnectionResponseSchema },
    },
    { exposure: 'public' },
  ),
  route(
    'sessionConnections.list',
    'GET',
    '/v1/session/connections',
    {
      principals: ['key'],
      action: 'mcp:call',
      query: SessionConnectionListQuerySchema,
      responses: { 200: ConnectionPageSchema },
    },
    { exposure: 'public' },
  ),
];

/** Calls the host's own server makes with a project key. */
const projectSelf: RouteDef[] = [
  route(
    'projectMe.get',
    'GET',
    '/v1/project/me',
    { principals: ['project'], responses: { 200: ProjectMeResponseSchema } },
    { exposure: 'internal' },
  ),
  route(
    'projectUsers.put',
    'PUT',
    '/v1/project/users',
    {
      principals: ['project'],
      body: PutProjectUserBodySchema,
      responses: { 200: ProjectUserResponseSchema, 201: ProjectUserResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectUsers.list',
    'GET',
    '/v1/project/users',
    {
      principals: ['project'],
      query: ProjectUserListQuerySchema,
      responses: { 200: ProjectUserPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectLogs.list',
    'GET',
    '/v1/project/logs',
    {
      principals: ['project'],
      query: ProjectLogQuerySchema,
      responses: { 200: ProjectLogPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectUsage.get',
    'GET',
    '/v1/project/usage',
    {
      principals: ['project'],
      query: ProjectUsageQuerySchema,
      responses: { 200: ProjectUsageResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectWebhookDeliveries.list',
    'GET',
    '/v1/project/webhook/deliveries',
    {
      principals: ['project'],
      query: WebhookDeliveryQuerySchema,
      responses: { 200: WebhookDeliveryPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectPlugins.list',
    'GET',
    '/v1/project/plugins',
    {
      principals: ['project'],
      query: PageQuerySchema,
      responses: { 200: ProjectPluginPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectPlugins.put',
    'PUT',
    '/v1/project/plugins/{pluginId}',
    {
      principals: ['project'],
      params: ProjectPluginParamsSchema,
      body: PutProjectPluginBodySchema,
      responses: { 200: ProjectPluginResponseSchema, 201: ProjectPluginResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectPlugins.delete',
    'DELETE',
    '/v1/project/plugins/{pluginId}',
    { principals: ['project'], params: ProjectPluginParamsSchema, responses: { 204: NoContent } },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.list',
    'GET',
    '/v1/project/auth-configs',
    {
      principals: ['project'],
      query: AuthConfigListQuerySchema,
      responses: { 200: AuthConfigPageSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.create',
    'POST',
    '/v1/project/auth-configs',
    {
      principals: ['project'],
      body: CreateAuthConfigBodySchema,
      responses: { 201: AuthConfigResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.get',
    'GET',
    '/v1/project/auth-configs/{authConfigId}',
    {
      principals: ['project'],
      params: ProjectAuthConfigParamsSchema,
      responses: { 200: AuthConfigResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.update',
    'PUT',
    '/v1/project/auth-configs/{authConfigId}',
    {
      principals: ['project'],
      params: ProjectAuthConfigParamsSchema,
      body: UpdateAuthConfigBodySchema,
      responses: { 200: AuthConfigResponseSchema },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.delete',
    'DELETE',
    '/v1/project/auth-configs/{authConfigId}',
    {
      principals: ['project'],
      params: ProjectAuthConfigParamsSchema,
      responses: { 204: NoContent },
    },
    { exposure: 'internal' },
  ),
  route(
    'projectAuthConfigs.putVariables',
    'PUT',
    '/v1/project/auth-configs/{componentId}/variables',
    {
      principals: ['project'],
      params: ProjectAuthConfigVariablesParamsSchema,
      body: PutVariablesBodySchema,
      responses: { 200: Page(VariableStatusSchema) },
    },
    { exposure: 'internal' },
  ),
];

/** Opens a route to Platform organization keys when the access list names it. */
const withPlatformAccess = (entry: RouteDef): RouteDef =>
  platformRouteOpen(entry.id) && !entry.principals.includes('platform')
    ? { ...entry, principals: [...entry.principals, 'platform'] }
    : entry;

const adminRoute = (
  id: string,
  method: RouteMethod,
  pathTemplate: string,
  fields: Partial<Fields> & Pick<Fields, 'responses'>,
): RouteDef =>
  route(
    id,
    method,
    pathTemplate,
    { principals: ['pa'], ...fields },
    {
      app: 'admin',
      exposure: 'public',
    },
  );

const adminAuth: RouteDef[] = [
  adminRoute('adminCsrf.get', 'GET', '/api/csrf', {
    principals: ['none'],
    responses: { 200: z.object({ csrfToken: z.string() }) },
  }),
  adminRoute('adminAuth.requestSetup', 'POST', '/api/v1/admin/auth/setup-request', {
    principals: ['none'],
    body: AdminSetupRequestBodySchema,
    responses: { 202: EmptyObject },
  }),
  adminRoute('adminAuth.completeSetup', 'POST', '/api/v1/admin/auth/setup', {
    principals: ['none'],
    body: AdminSetupBodySchema,
    responses: { 200: AdminSessionResponseSchema },
  }),
  adminRoute('adminAuth.signin', 'POST', '/api/v1/admin/auth/signin', {
    principals: ['none'],
    body: AdminSigninBodySchema,
    responses: { 200: AdminSessionResponseSchema },
  }),
  adminRoute('adminAuth.signout', 'POST', '/api/v1/admin/auth/signout', {
    responses: { 204: NoContent },
  }),
  adminRoute('adminAuth.session', 'GET', '/api/v1/admin/auth/session', {
    responses: { 200: AdminSessionResponseSchema },
  }),
];

const adminPluginSources: RouteDef[] = [
  adminRoute('adminPluginSources.list', 'GET', '/api/v1/admin/plugin-sources', {
    responses: { 200: PluginSourceListResponseSchema },
  }),
  adminRoute('adminPluginSources.create', 'POST', '/api/v1/admin/plugin-sources', {
    body: CreatePluginSourceBodySchema,
    responses: { 201: PluginSourceResponseSchema },
  }),
  adminRoute('adminPluginSources.discover', 'POST', '/api/v1/admin/plugin-sources/discover', {
    body: DiscoverPluginsBodySchema,
    responses: { 200: DiscoverPluginsResponseSchema },
  }),
  adminRoute('adminPluginSources.install', 'POST', '/api/v1/admin/plugin-sources/install', {
    body: InstallPluginsBodySchema,
    responses: { 200: InstallPluginsResponseSchema },
  }),
  adminRoute('adminPluginSources.bulkSync', 'POST', '/api/v1/admin/plugin-sources/bulk-sync', {
    body: BulkIdsBodySchema,
    responses: { 200: BulkSourceSyncResponseSchema },
  }),
  adminRoute('adminPluginSources.bulkDelete', 'POST', '/api/v1/admin/plugin-sources/bulk-delete', {
    body: BulkIdsBodySchema,
    responses: { 200: BulkSourceDeleteResponseSchema },
  }),
  adminRoute('adminPluginSources.sync', 'POST', '/api/v1/admin/plugin-sources/{sourceId}/sync', {
    params: PluginSourceParamsSchema,
    responses: { 202: PluginIngestionResponseSchema },
  }),
  adminRoute(
    'adminPluginSources.ingestions',
    'GET',
    '/api/v1/admin/plugin-sources/{sourceId}/ingestions',
    { params: PluginSourceParamsSchema, responses: { 200: PluginIngestionListResponseSchema } },
  ),
  adminRoute('adminPluginSources.update', 'PUT', '/api/v1/admin/plugin-sources/{sourceId}', {
    params: PluginSourceParamsSchema,
    body: AdminPluginSourceBodySchema,
    responses: { 200: PluginSourceResponseSchema },
  }),
  adminRoute('adminPluginSources.delete', 'DELETE', '/api/v1/admin/plugin-sources/{sourceId}', {
    params: PluginSourceParamsSchema,
    responses: { 204: NoContent },
  }),
];

const adminPlugins: RouteDef[] = [
  adminRoute('adminPlugins.list', 'GET', '/api/v1/admin/plugins', {
    query: AdminPluginListQuerySchema,
    responses: { 200: AdminPluginListResponseSchema },
  }),
  adminRoute('adminPlugins.get', 'GET', '/api/v1/admin/plugins/{pluginId}', {
    params: AdminPluginParamsSchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminPlugins.update', 'PATCH', '/api/v1/admin/plugins/{pluginId}', {
    params: AdminPluginParamsSchema,
    body: AdminPluginUpdateBodySchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminPlugins.updateSource', 'PUT', '/api/v1/admin/plugins/{pluginId}/source', {
    params: AdminPluginParamsSchema,
    body: AdminPluginSourceBodySchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminAudit.list', 'GET', '/api/v1/admin/audit', {
    query: AdminAuditQuerySchema,
    responses: { 200: AdminAuditListResponseSchema },
  }),
  adminRoute('adminObservability.listErrors', 'GET', '/api/v1/admin/observability/errors', {
    query: AdminErrorGroupsQuerySchema,
    responses: { 200: AdminErrorGroupsResponseSchema },
  }),
  adminRoute('adminObservability.getError', 'GET', '/api/v1/admin/observability/errors/{groupId}', {
    params: AdminErrorGroupParamsSchema,
    responses: { 200: AdminErrorGroupDetailResponseSchema },
  }),
  adminRoute(
    'adminObservability.setErrorStatus',
    'POST',
    '/api/v1/admin/observability/errors/{groupId}/status',
    {
      params: AdminErrorGroupParamsSchema,
      body: AdminErrorGroupStatusBodySchema,
      responses: { 200: AdminErrorGroupDetailResponseSchema },
    },
  ),
  adminRoute(
    'adminObservability.deleteError',
    'DELETE',
    '/api/v1/admin/observability/errors/{groupId}',
    {
      params: AdminErrorGroupParamsSchema,
      responses: { 204: NoContent },
    },
  ),
  adminRoute('adminObservability.listEvents', 'GET', '/api/v1/admin/observability/events', {
    query: AdminOpsEventsQuerySchema,
    responses: { 200: AdminOpsEventsResponseSchema },
  }),
  adminRoute('adminObservability.storage', 'GET', '/api/v1/admin/observability/storage', {
    responses: { 200: AdminObservabilityStorageResponseSchema },
  }),
  adminRoute('adminObservability.overview', 'GET', '/api/v1/admin/observability/overview', {
    query: AdminObservabilityOverviewQuerySchema,
    responses: { 200: AdminObservabilityOverviewResponseSchema },
  }),
  adminRoute('adminObservability.purge', 'POST', '/api/v1/admin/observability/purge', {
    body: AdminObservabilityPurgeBodySchema,
    responses: { 200: AdminObservabilityPurgeResponseSchema },
  }),
  adminRoute('adminPlugins.bulkDelete', 'POST', '/api/v1/admin/plugins/bulk-delete', {
    body: BulkIdsBodySchema,
    responses: { 200: BulkPluginDeleteResponseSchema },
  }),
  adminRoute('adminPlugins.bulkUpdate', 'POST', '/api/v1/admin/plugins/bulk-update', {
    body: AdminPluginBulkUpdateBodySchema,
    responses: { 200: AdminPluginBulkUpdateResponseSchema },
  }),
  adminRoute(
    'adminPlugins.bulkPublishLatest',
    'POST',
    '/api/v1/admin/plugins/bulk-publish-latest',
    {
      body: BulkIdsBodySchema,
      responses: { 200: AdminPluginBulkPublishResponseSchema },
    },
  ),
  adminRoute('adminPlugins.bulkSync', 'POST', '/api/v1/admin/plugins/bulk-sync', {
    body: BulkIdsBodySchema,
    responses: { 200: AdminPluginBulkSyncResponseSchema },
  }),
  adminRoute('adminPlugins.sync', 'POST', '/api/v1/admin/plugins/{pluginId}/sync', {
    params: AdminPluginParamsSchema,
    responses: { 202: PluginIngestionResponseSchema },
  }),
  adminRoute('adminStats.get', 'GET', '/api/v1/admin/stats', {
    query: AdminStatsQuerySchema,
    responses: { 200: AdminStatsResponseSchema },
  }),
  adminRoute('adminPlugins.impact', 'GET', '/api/v1/admin/plugins/{pluginId}/impact', {
    params: AdminPluginParamsSchema,
    responses: { 200: AdminImpactResponseSchema },
  }),
  adminRoute('adminPlugins.setStatus', 'POST', '/api/v1/admin/plugins/{pluginId}/status', {
    params: AdminPluginParamsSchema,
    body: AdminPluginStatusBodySchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminPlugins.delete', 'DELETE', '/api/v1/admin/plugins/{pluginId}', {
    params: AdminPluginParamsSchema,
    responses: { 204: NoContent },
  }),
  adminRoute('adminPlugins.setCategories', 'PUT', '/api/v1/admin/plugins/{pluginId}/categories', {
    params: AdminPluginParamsSchema,
    body: SetPluginCategoriesBodySchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminPlugins.setFlags', 'PATCH', '/api/v1/admin/plugins/{pluginId}/flags', {
    params: AdminPluginParamsSchema,
    body: PluginFlagsBodySchema,
    responses: { 200: AdminPluginDetailResponseSchema },
  }),
  adminRoute('adminCategories.list', 'GET', '/api/v1/admin/categories', {
    responses: { 200: AdminCategoryListResponseSchema },
  }),
  adminRoute('adminCategories.create', 'POST', '/api/v1/admin/categories', {
    body: CreateCategoryBodySchema,
    responses: { 201: AdminCategoryResponseSchema },
  }),
  adminRoute('adminCategories.update', 'PATCH', '/api/v1/admin/categories/{categoryId}', {
    params: AdminCategoryParamsSchema,
    body: UpdateCategoryBodySchema,
    responses: { 200: AdminCategoryResponseSchema },
  }),
  adminRoute('adminCategories.delete', 'DELETE', '/api/v1/admin/categories/{categoryId}', {
    params: AdminCategoryParamsSchema,
    responses: { 204: NoContent },
  }),
  adminRoute('adminAllowedEmails.list', 'GET', '/api/v1/admin/allowed-emails', {
    responses: { 200: AdminAllowedEmailListResponseSchema },
  }),
  adminRoute('adminAllowedEmails.add', 'POST', '/api/v1/admin/allowed-emails', {
    body: AddAdminAllowedEmailBodySchema,
    responses: { 201: AdminAllowedEmailResponseSchema },
  }),
  adminRoute('adminAllowedEmails.invite', 'POST', '/api/v1/admin/allowed-emails/{email}/invite', {
    params: AdminAllowedEmailParamsSchema,
    responses: { 204: NoContent },
  }),
  adminRoute('adminAllowedEmails.remove', 'DELETE', '/api/v1/admin/allowed-emails/{email}', {
    params: AdminAllowedEmailParamsSchema,
    responses: { 204: NoContent },
  }),
  adminRoute('adminPluginVersions.get', 'GET', '/api/v1/admin/plugin-versions/{versionId}', {
    params: AdminPluginVersionParamsSchema,
    responses: { 200: AdminVersionDetailResponseSchema },
  }),
  adminRoute(
    'adminPluginVersions.impact',
    'GET',
    '/api/v1/admin/plugin-versions/{versionId}/impact',
    { params: AdminPluginVersionParamsSchema, responses: { 200: AdminImpactResponseSchema } },
  ),
  adminRoute(
    'adminPluginVersions.approve',
    'POST',
    '/api/v1/admin/plugin-versions/{versionId}/approve',
    {
      params: AdminPluginVersionParamsSchema,
      responses: { 200: AdminVersionDetailResponseSchema },
    },
  ),
  adminRoute(
    'adminPluginVersions.reject',
    'POST',
    '/api/v1/admin/plugin-versions/{versionId}/reject',
    {
      params: AdminPluginVersionParamsSchema,
      responses: { 200: AdminVersionDetailResponseSchema },
    },
  ),
  adminRoute(
    'adminPluginVersions.reopen',
    'POST',
    '/api/v1/admin/plugin-versions/{versionId}/reopen',
    {
      params: AdminPluginVersionParamsSchema,
      responses: { 200: AdminVersionDetailResponseSchema },
    },
  ),
  adminRoute(
    'adminPluginVersions.publish',
    'POST',
    '/api/v1/admin/plugin-versions/{versionId}/publish',
    {
      params: AdminPluginVersionParamsSchema,
      responses: { 200: AdminVersionDetailResponseSchema },
    },
  ),
  adminRoute('adminPluginVersions.yank', 'POST', '/api/v1/admin/plugin-versions/{versionId}/yank', {
    params: AdminPluginVersionParamsSchema,
    body: AdminActionBodySchema,
    responses: { 200: AdminVersionDetailResponseSchema },
  }),
];

export const ROUTES: readonly RouteDef[] = [
  ...health,
  ...auth,
  ...gatewayInternal,
  ...organizations,
  ...marketplace,
  ...installations,
  ...mcpServers,
  ...delivery,
  ...projects,
  ...projectCatalogConsole,
  ...projectSessionsConsole,
  ...projectConnectionsConsole,
  ...projectSelf,
  ...projectCatalogHost,
  ...projectSessionsHost,
  ...sessionSelf,
  ...projectConnectionsHost,
  ...sessionConnections,
  ...apiKeys,
  ...adminAuth,
  ...adminPluginSources,
  ...adminPlugins,
].map(withPlatformAccess);
