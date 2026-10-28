/** Centralised TanStack Query key factory — prevents stale-cache bugs. */
export const qk = {
  me: () => ['me'] as const,
  org: (orgId: string) => ['org', orgId] as const,
  orgMe: (orgId: string) => ['org', orgId, 'me'] as const,
  orgMembers: (orgId: string) => ['org', orgId, 'members'] as const,
  orgPolicy: (orgId: string) => ['org', orgId, 'policy'] as const,
  // Marketplace
  marketplacePlugins: () => ['marketplace', 'plugins'] as const,
  marketplaceCategories: () => ['marketplace', 'categories'] as const,
  marketplacePlugin: (pluginId: string) => ['marketplace', 'plugin', pluginId] as const,
  marketplaceVersions: (pluginId: string) =>
    ['marketplace', 'plugin', pluginId, 'versions'] as const,
  marketplaceVersion: (versionId: string) => ['marketplace', 'plugin-version', versionId] as const,
  marketplaceVersionReview: (versionId: string) =>
    ['marketplace', 'plugin-version', versionId, 'review'] as const,
  // Installations
  installations: (scopeKey: string) => ['scope', scopeKey, 'installations'] as const,
  installation: (scopeKey: string, id: string) => ['scope', scopeKey, 'installations', id] as const,
  components: (scopeKey: string, id: string) =>
    ['scope', scopeKey, 'installations', id, 'components'] as const,
  mcpServers: (scopeKey: string, id: string) =>
    ['scope', scopeKey, 'installations', id, 'mcp-servers'] as const,
  mcpOAuthDiscovery: (scopeKey: string, id: string, componentId: string) =>
    [
      'scope',
      scopeKey,
      'installations',
      id,
      'mcp-servers',
      componentId,
      'oauth-discovery',
    ] as const,
  variables: (scopeKey: string, id: string) =>
    ['scope', scopeKey, 'installations', id, 'variables'] as const,
  // Projects
  projects: (orgId: string) => ['org', orgId, 'projects'] as const,
  project: (orgId: string, projectId: string) => ['org', orgId, 'projects', projectId] as const,
  projectPart: (orgId: string, projectId: string, part: string, filters: object = {}) =>
    ['org', orgId, 'projects', projectId, part, filters] as const,
  orgApiKeys: (orgId: string) => ['org', orgId, 'api-keys'] as const,
};
