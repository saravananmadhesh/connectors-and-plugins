/**
 * API boundary mapping: domain objects carry plain uuids; responses carry prefixed ids.
 * One pure function per resource; each lists its output fields explicitly, so a column that is
 * added to a domain object never reaches the wire by accident.
 */
import {
  formatId,
  type ProjectMeResponse,
  type AuthConfigResponse,
  type ProjectPluginResponse,
  type AllowedPluginResponse,
  type PluginSetResponse,
  type ProjectLogResponse,
  type ProjectUsageResponse,
  type ProjectUserResponse,
  type AcceptInviteResponse,
  type CreateInviteResponse,
  type ApiKeyCreatedResponse,
  type SessionCatalogItem,
  type SessionCatalogPage,
  type SessionCreatedResponse,
  type SessionResponse,
  type ApiKeyResponse,
  type ComponentResponse,
  type McpServerResponse,
  type ComponentSummary,
  type ConnectionResponse,
  type InstallationResponse,
  type InviteResponse,
  type MeResponse,
  type OrgMeResponse,
  type OrgMemberResponse,
  type OrgResponse,
  type ProjectKeyCreatedResponse,
  type ProjectKeyResponse,
  type ProjectResponse,
  type Plain,
  type PluginDetailResponse,
  type PluginListItemResponse,
  type PluginPageResponse,
  type PluginSummaryResponse,
  type PluginVersionDetailResponse,
  type PluginVersionReviewResponse,
  type PluginVersionSummaryResponse,
  type SafeUser,
  type UpgradeResult,
  type VariableStatus,
  type UserPluginState,
  type WebhookDeliveryResponse,
} from '@boldcreate-integrations/contracts';

export function serializePage<A, B>(
  page: { items: A[]; nextCursor: string | null },
  serialize: (item: A) => B,
): { items: B[]; nextCursor: string | null } {
  return { items: page.items.map(serialize), nextCursor: page.nextCursor };
}

/** A list without paging: one page that is also the last. */
export function serializeList<A, B>(
  items: A[],
  serialize: (item: A) => B,
): { items: B[]; nextCursor: null } {
  return { items: items.map(serialize), nextCursor: null };
}

export function serializeUser(user: Plain<SafeUser>): SafeUser {
  return {
    id: formatId('usr', user.id),
    email: user.email,
    displayName: user.displayName,
    emailVerifiedAt: user.emailVerifiedAt,
    status: user.status,
    createdAt: user.createdAt,
  };
}

export function serializeMe(me: Plain<MeResponse>): MeResponse {
  return {
    user: serializeUser(me.user),
    memberships: me.memberships.map((m) => ({
      organizationId: formatId('org', m.organizationId),
      organizationName: m.organizationName,
      organizationSlug: m.organizationSlug,
      role: m.role,
      status: m.status,
    })),
  };
}

export function serializeOrg(org: Plain<OrgResponse>): OrgResponse {
  return {
    id: formatId('org', org.id),
    name: org.name,
    slug: org.slug,
    createdAt: org.createdAt,
    updatedAt: org.updatedAt,
  };
}

export function serializeOrgMe(me: Plain<OrgMeResponse>): OrgMeResponse {
  return {
    userId: formatId('usr', me.userId),
    role: me.role,
    abilities: me.abilities,
    policy: me.policy,
  };
}

export function serializeMember(member: Plain<OrgMemberResponse>): OrgMemberResponse {
  return {
    userId: formatId('usr', member.userId),
    displayName: member.displayName,
    email: member.email,
    role: member.role,
    status: member.status,
    createdAt: member.createdAt,
  };
}

export function serializeInvite(invite: Plain<InviteResponse>): InviteResponse {
  return {
    id: formatId('inv', invite.id),
    organizationId: formatId('org', invite.organizationId),
    email: invite.email,
    role: invite.role,
    expiresAt: invite.expiresAt,
    createdAt: invite.createdAt,
  };
}

export function serializeInviteResults(created: Plain<CreateInviteResponse>): CreateInviteResponse {
  return {
    results: created.results.map((entry) => ({
      email: entry.email,
      status: entry.status,
      invite: entry.invite === null ? null : serializeInvite(entry.invite),
    })),
  };
}

export function serializeAcceptedInvite(result: {
  orgId: string;
  role: AcceptInviteResponse['role'];
}): AcceptInviteResponse {
  return {
    orgId: formatId('org', result.orgId),
    role: result.role,
  };
}

export function serializePlugin(plugin: Plain<PluginSummaryResponse>): PluginSummaryResponse {
  return {
    id: formatId('plg', plugin.id),
    name: plugin.name,
    displayName: plugin.displayName,
    summary: plugin.summary,
    keywords: plugin.keywords,
    status: plugin.status,
    visibility: plugin.visibility,
    publisherOrganizationId: plugin.publisherOrganizationId
      ? formatId('org', plugin.publisherOrganizationId)
      : null,
    featured: plugin.featured,
    verified: plugin.verified,
    categories: plugin.categories,
    logoUrl: plugin.logoUrl,
    updatedAt: plugin.updatedAt,
  };
}

export function serializePluginListItem(
  plugin: Plain<PluginListItemResponse>,
): PluginListItemResponse {
  return {
    ...serializePlugin(plugin),
    latestVersion: plugin.latestVersion
      ? { id: formatId('pv', plugin.latestVersion.id), version: plugin.latestVersion.version }
      : null,
    componentCounts: plugin.componentCounts,
  };
}

export function serializePluginPage(page: {
  items: Plain<PluginListItemResponse>[];
  total: number;
  page: number;
  pageSize: number;
}): PluginPageResponse {
  return {
    items: page.items.map(serializePluginListItem),
    total: page.total,
    page: page.page,
    pageSize: page.pageSize,
  };
}

export function serializePluginDetail(plugin: Plain<PluginDetailResponse>): PluginDetailResponse {
  return {
    ...serializePlugin(plugin),
    description: plugin.description,
    repositoryUrl: plugin.repositoryUrl,
    createdAt: plugin.createdAt,
    latestVersion: plugin.latestVersion ? serializePluginVersion(plugin.latestVersion) : null,
    components: plugin.components.map(serializeComponentSummary),
  };
}

export function serializePluginVersion(
  version: Plain<PluginVersionSummaryResponse>,
): PluginVersionSummaryResponse {
  return {
    id: formatId('pv', version.id),
    pluginId: formatId('plg', version.pluginId),
    version: version.version,
    publishedAt: version.publishedAt,
    status: version.status,
  };
}

export function serializeComponentSummary(component: Plain<ComponentSummary>): ComponentSummary {
  return {
    id: formatId('cmp', component.id),
    kind: component.kind,
    name: component.name,
    description: component.description,
    transport: component.transport,
    url: component.url,
    sourceUrl: component.sourceUrl,
  };
}

export function serializePluginVersionDetail(
  version: Plain<PluginVersionDetailResponse>,
): PluginVersionDetailResponse {
  return {
    ...serializePluginVersion(version),
    manifestSchemaVersion: version.manifestSchemaVersion,
    changelog: version.changelog,
    executionBlockedAt: version.executionBlockedAt,
    components: version.components.map(serializeComponentSummary),
  };
}

export function serializePluginVersionReview(
  review: Plain<PluginVersionReviewResponse>,
): PluginVersionReviewResponse {
  return {
    ...review,
    id: formatId('pv', review.id),
    pluginId: formatId('plg', review.pluginId),
  };
}

export function serializeInstallation(
  installation: Plain<InstallationResponse>,
): InstallationResponse {
  return {
    id: formatId('ins', installation.id),
    scope: installation.scope,
    pluginName: installation.pluginName,
    pluginLogoUrl: installation.pluginLogoUrl,
    pluginVersion: installation.pluginVersion,
    pluginVersionId: formatId('pv', installation.pluginVersionId),
    active: installation.active,
    updatePolicy: installation.updatePolicy,
    required: installation.required,
    replacedBy: installation.replacedBy,
    createdAt: installation.createdAt,
    updatedAt: installation.updatedAt,
  };
}

export function serializeInstallationComponent(
  component: Plain<ComponentResponse>,
): ComponentResponse {
  return {
    componentId: formatId('cmp', component.componentId),
    kind: component.kind,
    name: component.name,
    enabled: component.enabled,
    active: component.active,
    inactiveReason: component.inactiveReason,
  };
}

export function serializeVariable(variable: Plain<VariableStatus>): VariableStatus {
  return {
    name: variable.name,
    description: variable.description,
    required: variable.required,
    secret: variable.secret,
    isSet: variable.isSet,
    custom: variable.custom,
  };
}

export function serializeUpgradeResult(result: Plain<UpgradeResult>): UpgradeResult {
  return {
    installationId: formatId('ins', result.installationId),
    newVersion: result.newVersion,
    droppedComponents: result.droppedComponents,
    newDisabledComponents: result.newDisabledComponents,
  };
}

export function serializeApiKey(key: Plain<ApiKeyResponse>): ApiKeyResponse {
  return {
    id: formatId('key', key.id),
    prefix: key.prefix,
    name: key.name,
    scope: key.scope,
    permissions: key.permissions,
    lastFour: key.lastFour,
    expiresAt: key.expiresAt,
    revokedAt: key.revokedAt,
    createdAt: key.createdAt,
  };
}

export function serializeApiKeyCreated(key: Plain<ApiKeyCreatedResponse>): ApiKeyCreatedResponse {
  return { ...serializeApiKey(key), rawKey: key.rawKey };
}

export function serializeMcpServer(server: Plain<McpServerResponse>): McpServerResponse {
  return {
    ...server,
    installationId: formatId('ins', server.installationId),
    componentId: formatId('cmp', server.componentId),
  };
}

export function serializeProject(project: Plain<ProjectResponse>): ProjectResponse {
  return {
    ...project,
    id: formatId('prj', project.id),
    organizationId: formatId('org', project.organizationId),
  };
}

export function serializeProjectKey(key: Plain<ProjectKeyResponse>): ProjectKeyResponse {
  return { ...key, id: formatId('pjk', key.id) };
}

export function serializeProjectKeyCreated(
  key: Plain<ProjectKeyCreatedResponse>,
): ProjectKeyCreatedResponse {
  return { ...serializeProjectKey(key), rawKey: key.rawKey };
}

export function serializeProjectMe(me: Plain<ProjectMeResponse>): ProjectMeResponse {
  return { ...me, project: { ...me.project, id: formatId('prj', me.project.id) } };
}

export function serializeProjectUser(user: Plain<ProjectUserResponse>): ProjectUserResponse {
  return { ...user, id: formatId('usr', user.id) };
}

export function serializeWebhookDelivery(
  delivery: Plain<WebhookDeliveryResponse>,
): WebhookDeliveryResponse {
  return { ...delivery, id: formatId('whd', delivery.id) };
}

export function serializeProjectLog(log: Plain<ProjectLogResponse>): ProjectLogResponse {
  return { ...log, user: log.user ? { ...log.user, id: formatId('usr', log.user.id) } : null };
}

export function serializeProjectUsage(usage: Plain<ProjectUsageResponse>): ProjectUsageResponse {
  return {
    ...usage,
    topUsers: usage.topUsers.map((user) => ({ ...user, id: formatId('usr', user.id) })),
  };
}

export function serializeProjectPlugin(
  plugin: Plain<ProjectPluginResponse>,
): ProjectPluginResponse {
  return {
    ...plugin,
    pluginId: formatId('plg', plugin.pluginId),
    versionId: formatId('pv', plugin.versionId),
  };
}

export function serializeAllowedPlugin(
  allowed: Plain<AllowedPluginResponse>,
): AllowedPluginResponse {
  return { ...allowed, pluginId: formatId('plg', allowed.pluginId) };
}

export function serializePluginSet(set: Plain<PluginSetResponse>): PluginSetResponse {
  return {
    ...set,
    id: formatId('pls', set.id),
    plugins: set.plugins.map((plugin) => ({
      ...plugin,
      pluginId: formatId('plg', plugin.pluginId),
    })),
  };
}

export function serializeAuthConfig(config: Plain<AuthConfigResponse>): AuthConfigResponse {
  return {
    ...config,
    id: formatId('acf', config.id),
    componentId: config.componentId === null ? null : formatId('cmp', config.componentId),
    pluginId: formatId('plg', config.pluginId),
    variables: config.variables.map(serializeVariable),
  };
}

export function serializeSession(session: Plain<SessionResponse>): SessionResponse {
  return {
    ...session,
    id: formatId('pjs', session.id),
    authConfigs: session.authConfigs.map((entry) => ({
      ...entry,
      pluginId: formatId('plg', entry.pluginId),
      authConfigId: formatId('acf', entry.authConfigId),
    })),
  };
}

export function serializeConnection(connection: Plain<ConnectionResponse>): ConnectionResponse {
  return {
    ...connection,
    id: formatId('ucn', connection.id),
    componentId: formatId('cmp', connection.componentId),
    authConfigId:
      connection.authConfigId === null ? null : formatId('acf', connection.authConfigId),
  };
}

export function serializeSessionCreated(
  session: Plain<SessionResponse> & { token: string },
): SessionCreatedResponse {
  return { ...serializeSession(session), token: session.token };
}

export function serializeSessionCatalogPage(page: {
  items: Plain<SessionCatalogItem>[];
  total: number;
  page: number;
  pageSize: number;
}): SessionCatalogPage {
  return {
    items: page.items.map((item) => ({
      ...serializePluginListItem(item),
      installed: item.installed,
    })),
    total: page.total,
    page: page.page,
    pageSize: page.pageSize,
  };
}

export function serializeUserPluginState(item: Plain<UserPluginState>): UserPluginState {
  return {
    ...item,
    pluginId: formatId('plg', item.pluginId),
    versionId: formatId('pv', item.versionId),
    latestVersionId: formatId('pv', item.latestVersionId),
    components: item.components.map((component) => ({
      ...component,
      componentId: formatId('cmp', component.componentId),
    })),
    mcp: item.mcp.map(({ connection, ...server }) => ({
      ...server,
      componentId: formatId('cmp', server.componentId),
      ...(connection === undefined
        ? {}
        : { connection: connection && { ...connection, id: formatId('ucn', connection.id) } }),
    })),
  };
}
