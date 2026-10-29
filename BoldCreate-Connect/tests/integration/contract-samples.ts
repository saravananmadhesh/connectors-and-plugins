/**
 * Request input that passes schema validation for each registry route that has a body or a
 * required query, so a call can get past parsing and be refused for something else. The values
 * do not exist in the database.
 */
import { randomUUID } from 'node:crypto';
import { formatId, type RouteDef } from '../../packages/contracts/src/index.js';

const id = (prefix: Parameters<typeof formatId>[0]) => formatId(prefix, randomUUID());

export interface Sample {
  body?: unknown;
  /** Query string without the leading `?`. */
  query?: string;
}

/** The route id without its scope suffix: `installations.create.user` is `installations.create`. */
export const baseId = (route: Pick<RouteDef, 'id'>): string =>
  route.id.replace(/\.(org|user)$/, '');

const SAMPLES: Record<string, () => Sample> = {
  'auth.changePassword': () => ({
    body: { currentPassword: 'a', newPassword: 'b' },
  }),
  'auth.changeEmail': () => ({
    body: { newEmail: 'sample@example.com', currentPassword: 'a' },
  }),
  'auth.deleteMe': () => ({ query: 'confirmEmail=sample@example.com' }),
  'orgs.create': () => ({ body: { name: 'Sample org', slug: 'sample-org' } }),
  'orgs.update': () => ({ body: { name: 'Sample org' } }),
  'orgs.delete': () => ({ query: 'confirmSlug=sample-org' }),
  'orgPolicy.update': () => ({ body: { allowPersonalInstalls: true } }),
  'members.update': () => ({ body: { role: 'ADMIN' } }),
  'invites.create': () => ({
    body: { emails: ['sample@example.com'], role: 'ADMIN' },
  }),
  'invites.preview': () => ({ body: { token: 'sample' } }),
  'invites.accept': () => ({ body: { token: 'sample' } }),
  'installations.create': () => ({ body: { pluginVersionId: id('pv') } }),
  'installations.update': () => ({ body: { active: false } }),
  'installations.upgrade': () => ({ body: { pluginVersionId: id('pv') } }),
  'components.update': () => ({ body: { enabled: true } }),
  'variables.put': () => ({ body: { values: { API_TOKEN: 'sample-value' } } }),
  'mcpServers.putAuth': () => ({
    body: { authType: 'api_key', apiKey: 'sample-key' },
  }),
  'mcpServers.oauthStart': () => ({ body: {} }),
  'projects.create': () => ({ body: { name: 'Sample host' } }),
  'projects.update': () => ({ body: { name: 'Sample host' } }),
  'projectKeys.create': () => ({
    body: {
      scopes: ['sessions:read'],
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    },
  }),
  'projectPluginsConsole.put': () => ({ body: {} }),
  'projectAuthConfigs.putVariables': () => ({
    body: { values: { API_TOKEN: 'sample-value' } },
  }),
  'projectAuthConfigsConsole.putVariables': () => ({
    body: { values: { API_TOKEN: 'sample-value' } },
  }),
  'projectUserInstallMode.put': () => ({ body: { mode: 'any' } }),
  'projectPluginSets.create': () => ({ body: { name: 'Sample set' } }),
  'projectPluginSets.update': () => ({ body: { name: 'Sample set' } }),
  'projectUserPlugins.put': () => ({ body: { userId: 'sample-user' } }),
  'projectUserPluginVariables.put': () => ({
    body: { userId: 'sample-user', values: { API_TOKEN: 'sample-value' } },
  }),
  'projectUserPluginComponents.put': () => ({
    body: { userId: 'sample-user', enabled: true },
  }),
  'projectUserPluginVariablesConsole.put': () => ({
    body: { userId: 'sample-user', values: { API_TOKEN: 'sample-value' } },
  }),
  'projectUserPluginComponentsConsole.put': () => ({
    body: { userId: 'sample-user', enabled: true },
  }),
  'projectWebhookConsole.put': () => ({
    body: { url: 'https://hooks.example.com/hook', events: ['user.created'] },
  }),
  'sessionPluginVariables.put': () => ({
    body: { values: { API_TOKEN: 'sample-value' } },
  }),
  'sessionPluginComponents.put': () => ({ body: { enabled: true } }),
  'projectUserPlugins.list': () => ({ query: 'userId=sample-user' }),
  'projectUserPlugins.delete': () => ({ query: 'userId=sample-user' }),
  'projectUserInstallModeConsole.put': () => ({ body: { mode: 'any' } }),
  'projectPluginSetsConsole.create': () => ({ body: { name: 'Sample set' } }),
  'projectPluginSetsConsole.update': () => ({ body: { name: 'Sample set' } }),
  'projectUserPluginsConsole.put': () => ({ body: { userId: 'sample-user' } }),
  'projectUserPluginsConsole.list': () => ({ query: 'userId=sample-user' }),
  'projectUserPluginsConsole.delete': () => ({ query: 'userId=sample-user' }),
  'projectUserPluginComponents.delete': () => ({ query: 'userId=sample-user' }),
  'projectUserPluginComponentsConsole.delete': () => ({
    query: 'userId=sample-user',
  }),
  'projectSessions.create': () => ({ body: { userId: 'sample-user' } }),
  'sessionPlugins.put': () => ({ body: {} }),
  'projectConnections.start': () => ({
    body: {
      userId: 'sample-user',
      componentId: id('cmp'),
      callbackUrl: 'https://app.example.test/cb',
    },
  }),
  'projectConnections.put': () => ({
    body: {
      userId: 'sample-user',
      componentId: id('cmp'),
      apiKey: 'sample-key',
    },
  }),
  'projectAuthConfigs.create': () => ({
    body: { componentId: id('cmp'), name: 'Sample', authMode: 'dcr' },
  }),
  'projectAuthConfigs.update': () => ({ body: { name: 'Sample' } }),
  'projectAuthConfigsConsole.create': () => ({
    body: { componentId: id('cmp'), name: 'Sample', authMode: 'dcr' },
  }),
  'projectAuthConfigsConsole.update': () => ({ body: { name: 'Sample' } }),
  'sessionConnections.start': () => ({
    body: {
      componentId: id('cmp'),
      callbackUrl: 'https://app.example.test/cb',
    },
  }),
  'apiKeys.create': () => ({
    body: { name: 'Sample key', permissions: ['mcp:list'] },
  }),
};

/** Input that passes validation, or null when the route needs none. */
export function validSample(route: Pick<RouteDef, 'id'>): Sample | null {
  return SAMPLES[baseId(route)]?.() ?? null;
}

/** A query string the route's schema refuses, or null when none of the usual ones is refused. */
export function invalidQuery(route: Pick<RouteDef, 'query'>): string | null {
  if (!route.query) return null;
  for (const candidate of ['limit=0', '', 'unknown-parameter=1']) {
    const parsed = route.query.safeParse(Object.fromEntries(new URLSearchParams(candidate)));
    if (!parsed.success) return candidate;
  }
  return null;
}

const PARAM_PREFIX: Record<string, Parameters<typeof formatId>[0]> = {
  orgId: 'org',
  userId: 'usr',
  inviteId: 'inv',
  pluginId: 'plg',
  pluginVersionId: 'pv',
  installationId: 'ins',
  componentId: 'cmp',
  keyId: 'key',
  projectId: 'prj',
  projectKeyId: 'pjk',
  setId: 'pls',
  sessionId: 'pjs',
  connectionId: 'ucn',
  authConfigId: 'acf',
  projectUserId: 'usr',
};

/**
 * The path with every placeholder replaced by a well-formed id that does not exist, except the
 * ones given in `known`.
 */
export function concretePath(pathTemplate: string, known: Record<string, string> = {}): string {
  return pathTemplate.replace(/\{([A-Za-z]+)\}/g, (_match, name: string) => {
    const given = known[name];
    if (given) return given;
    const prefix = PARAM_PREFIX[name];
    if (!prefix) throw new Error(`no id prefix known for path parameter "${name}"`);
    return id(prefix);
  });
}
