import type { ProjectKeyScope } from './projects.js';

/**
 * The scope a project key needs for each route it may call, keyed by route id. A route that is not
 * listed here is closed to project keys, so a new route stays closed until someone adds a line.
 * The coverage test next to this file keeps the table, the route list and the scope list in step.
 */
export const PROJECT_ROUTE_SCOPES: Readonly<Record<string, ProjectKeyScope>> = {
  'projectMe.get': 'sessions:read',
  'projectUsers.put': 'sessions:write',
  'projectUsers.list': 'sessions:read',
  'projectLogs.list': 'observability:read',
  'projectUsage.get': 'observability:read',
  'projectWebhookDeliveries.list': 'observability:read',
  'projectPlugins.list': 'plugins:read',
  'projectPlugins.put': 'plugins:write',
  'projectPlugins.delete': 'plugins:write',
  'projectCatalog.list': 'plugins:read',
  'projectCatalog.get': 'plugins:read',
  'projectUserInstallMode.get': 'plugins:read',
  'projectUserInstallMode.put': 'plugins:write',
  'projectAllowedPlugins.list': 'plugins:read',
  'projectAllowedPlugins.put': 'plugins:write',
  'projectAllowedPlugins.delete': 'plugins:write',
  'projectPluginSets.list': 'plugins:read',
  'projectPluginSets.create': 'plugins:write',
  'projectPluginSets.get': 'plugins:read',
  'projectPluginSets.update': 'plugins:write',
  'projectPluginSets.delete': 'plugins:write',
  'projectPluginSetMembers.put': 'plugins:write',
  'projectPluginSetMembers.delete': 'plugins:write',
  'projectUserPlugins.list': 'plugins:read',
  'projectUserPlugins.put': 'plugins:write',
  'projectUserPlugins.delete': 'plugins:write',
  'projectUserPluginVariables.put': 'plugins:write',
  'projectUserPluginComponents.put': 'plugins:write',
  'projectUserPluginComponents.delete': 'plugins:write',
  'projectSessions.create': 'sessions:write',
  'projectSessions.list': 'sessions:read',
  'projectSessions.get': 'sessions:read',
  'projectSessions.revoke': 'sessions:write',
  'projectConnections.start': 'connections:write',
  'projectConnections.put': 'connections:write',
  'projectConnections.list': 'connections:read',
  'projectConnections.delete': 'connections:write',
  'projectAuthConfigs.list': 'auth-configs:read',
  'projectAuthConfigs.get': 'auth-configs:read',
  'projectAuthConfigs.create': 'auth-configs:write',
  'projectAuthConfigs.update': 'auth-configs:write',
  'projectAuthConfigs.delete': 'auth-configs:write',
  'projectAuthConfigs.putVariables': 'auth-configs:write',
};

/** The scope a project key needs for this route, or null when the route is closed to project keys. */
export function projectScopeOf(routeId: string): ProjectKeyScope | null {
  return Object.hasOwn(PROJECT_ROUTE_SCOPES, routeId) ? PROJECT_ROUTE_SCOPES[routeId]! : null;
}
