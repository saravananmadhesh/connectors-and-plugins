/**
 * The routes a Platform organization key (`plk_`) may call: the ones that manage the organization
 * itself. Nothing else is open to it, so a new route stays closed until it is listed here. The
 * route's own permission check still runs, against the role of the member who made the key.
 */
export const PLATFORM_ROUTE_IDS: ReadonlySet<string> = new Set([
  'orgs.get',
  'orgs.update',
  'orgs.delete',
  'orgs.me',
  'orgPolicy.get',
  'orgPolicy.update',
  'members.list',
  'members.update',
  'members.remove',
  'invites.list',
  'invites.create',
  'invites.revoke',
  'invites.resend',
  'projects.list',
  'projects.create',
  'projects.get',
  'projects.update',
  'projects.delete',
  'projectKeys.list',
  'projectKeys.create',
  'projectUsersConsole.list',
  'projectPluginsConsole.list',
]);

export const platformRouteOpen = (routeId: string): boolean => PLATFORM_ROUTE_IDS.has(routeId);
