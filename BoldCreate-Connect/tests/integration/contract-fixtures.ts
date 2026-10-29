/**
 * One seeded happy-path call for every api route of the registry. The contract test runs each
 * call and parses the answer with the schema the registry names for its status, so a route
 * without a fixture here fails the test.
 */
import { randomUUID } from 'node:crypto';
import { formatId, parseId } from '../../packages/contracts/src/v1/ids.js';
import { callApi } from './org-fixture.js';
import { apiUrl } from './test-env.js';
import { FIXTURE_ORIGIN } from './support/fixture-port.js';
import {
  TEST_PASSWORD,
  apiGet,
  apiPost,
  createSignedInUser,
  mailToken,
  sql,
  workloadHeaders,
  verificationToken,
  waitForOrgKey,
  type SignedInUser,
} from './signed-in-user.js';

export interface Seed {
  /** Owner of the organization; every route is called as this user unless it says otherwise. */
  owner: SignedInUser;
}

export type Fixture = (seed: Seed) => Promise<Response>;

type Scope = 'org' | 'user';
const SCOPES: Scope[] = ['org', 'user'];

const unique = (label: string) => `${label}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
const address = (label: string) => `${unique(label)}@example.com`;

function base(seed: Seed, scope: Scope): string {
  const { orgId } = seed.owner;
  if (scope === 'org') return `/v1/orgs/${orgId}`;
  return `/v1/orgs/${orgId}/me`;
}

async function json<T>(res: Response, expected: number, what: string): Promise<T> {
  if (res.status !== expected) {
    throw new Error(`${what} answered ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/** A published plugin with one endpoint and one component, and optionally a newer version. */
/** The scan stored with a fixture version: one required variable the variable routes can set. */
const SCAN = JSON.stringify({
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  variables: [{ name: 'API_TOKEN', description: 'Token', required: true, secret: true }],
  skipped: [],
  findings: [],
});

async function newPlugin(withNextVersion = false): Promise<{
  pluginId: string;
  versionId: string;
  nextVersionId: string | null;
}> {
  const pluginId = randomUUID();
  const versionId = randomUUID();
  const nextVersionId = withNextVersion ? randomUUID() : null;
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Contract Fixture', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, `contract-fixture-${pluginId.slice(0, 8)}`],
  );
  const manifest = JSON.stringify({
    endpoints: { primary: { url: 'http://localhost:19999/mcp' } },
  });
  for (const [id, version, minor] of [
    [versionId, '1.0.0', 0],
    ...(nextVersionId ? [[nextVersionId, '1.1.0', 1]] : []),
  ] as [string, string, number][]) {
    await sql(
      `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
         manifest_schema_version, manifest, manifest_sha256, status)
       VALUES ($1, $2, $3, 1, $4, 0, '1', $5, $6, 'published')`,
      [id, pluginId, version, minor, manifest, `sha256-contract-${id}`],
    );
    await sql(`UPDATE plugin_version SET scan = $2 WHERE id = $1`, [id, SCAN]);
    await sql(
      `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
       VALUES ($1, $2, 'mcp', $3, 'fixture tool', $4)`,
      [
        randomUUID(),
        id,
        `contract_tool_${id.slice(0, 8)}`,
        JSON.stringify({
          transport: 'http',
          url: 'http://localhost:19999/mcp',
        }),
      ],
    );
  }
  return {
    pluginId: formatId('plg', pluginId),
    versionId: formatId('pv', versionId),
    nextVersionId: nextVersionId ? formatId('pv', nextVersionId) : null,
  };
}

async function newInstallation(
  seed: Seed,
  scope: Scope,
): Promise<{ id: string; versionId: string }> {
  const plugin = await newPlugin();
  const created = await json<{ id: string }>(
    await callApi('POST', `${base(seed, scope)}/installations`, seed.owner, {
      pluginVersionId: plugin.versionId,
    }),
    201,
    'create installation',
  );
  return { id: created.id, versionId: plugin.versionId };
}

/** An installation of a fresh plugin and the id of its one MCP component. */
async function newMcpInstallation(
  seed: Seed,
  scope: Scope,
): Promise<{ installationId: string; componentId: string }> {
  const installation = await newInstallation(seed, scope);
  const list = await json<{ items: { componentId: string }[] }>(
    await callApi(
      'GET',
      `${base(seed, scope)}/installations/${installation.id}/components`,
      seed.owner,
    ),
    200,
    'list components',
  );
  return {
    installationId: installation.id,
    componentId: list.items[0]?.componentId as string,
  };
}

/** A key that may sync and download, and the bearer headers a client sends with it. */
async function newDeliveryKey(seed: Seed): Promise<Record<string, string>> {
  const created = await json<{ rawKey: string }>(
    await callApi('POST', `${base(seed, 'org')}/api-keys`, seed.owner, {
      name: `Delivery ${randomUUID().slice(0, 8)}`,
      permissions: ['artifact:sync', 'artifact:download', 'mcp:list'],
    }),
    201,
    'create delivery key',
  );
  const headers: Record<string, string> = { ...workloadHeaders };
  delete headers['Content-Type'];
  return { ...headers, authorization: `Bearer ${created.rawKey}` };
}

async function newKey(seed: Seed): Promise<string> {
  const created = await json<{ id: string }>(
    await callApi('POST', `${base(seed, 'org')}/api-keys`, seed.owner, {
      name: `Contract key ${randomUUID().slice(0, 8)}`,
      permissions: ['mcp:list'],
    }),
    201,
    'create api key',
  );
  return created.id;
}

/** A second verified user who is a plain member of the owner's organization. */
async function newMember(seed: Seed, role: 'ADMIN' | 'MEMBER' = 'MEMBER'): Promise<SignedInUser> {
  const user = await createSignedInUser('contract-member');
  await sql(
    `INSERT INTO organization_member (organization_id, user_id, role) VALUES ($1, $2, $3)`,
    [seed.owner.rawOrgId, user.rawUserId, role],
  );
  return user;
}

/** A new organization of the owner, for routes that delete or leave it. */
async function newOrg(seed: Seed): Promise<{ orgId: string; slug: string; rawOrgId: string }> {
  const slug = `contract-${randomUUID().slice(0, 12)}`;
  const created = await json<{ id: string }>(
    await callApi('POST', '/v1/orgs', seed.owner, {
      name: `Contract ${slug}`,
      slug,
    }),
    201,
    'create org',
  );
  const rawOrgId = parseId('org', created.id);
  await waitForOrgKey(rawOrgId);
  return { orgId: created.id, slug, rawOrgId };
}

async function newProject(seed: Seed): Promise<{ id: string }> {
  const created = await json<{ id: string }>(
    await callApi('POST', `/v1/orgs/${seed.owner.orgId}/projects`, seed.owner, {
      name: `Project ${randomUUID().slice(0, 10)}`,
    }),
    201,
    'create project',
  );
  return { id: created.id };
}

async function newProjectKey(seed: Seed, projectId: string): Promise<{ id: string }> {
  const created = await json<{ id: string }>(
    await callApi('POST', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/keys`, seed.owner, {
      scopes: ['sessions:read'],
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    }),
    201,
    'create project key',
  );
  return { id: created.id };
}

/** A project with a key that reads and writes its users, for the calls a host's server makes. */
const HOST_SCOPES = ['sessions:read', 'sessions:write'];
const OBSERVER_SCOPES = ['observability:read'];

async function putWebhook(seed: Seed, projectId: string): Promise<void> {
  const res = await callApi(
    'PUT',
    `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook`,
    seed.owner,
    { url: `${FIXTURE_ORIGIN}/hook`, events: ['user.created'] },
  );
  if (res.status !== 200 && res.status !== 201) throw new Error('The webhook was not set');
}

/** One project for the webhook routes that only read or change its webhook, so the quota holds. */
const webhookHosts = new Map<string, Promise<{ projectId: string; key: string }>>();
function sharedWebhookHost(seed: Seed): Promise<{ projectId: string; key: string }> {
  let host = webhookHosts.get(seed.owner.orgId);
  if (!host) {
    host = newHost(seed, OBSERVER_SCOPES);
    webhookHosts.set(seed.owner.orgId, host);
  }
  return host;
}
const DELIVERY_SCOPES = [
  'plugins:read',
  'plugins:write',
  'auth-configs:read',
  'auth-configs:write',
  'tools:read',
  'sessions:read',
  'sessions:write',
  'connections:read',
  'connections:write',
];

async function newHost(
  seed: Seed,
  scopes: string[] = HOST_SCOPES,
): Promise<{ projectId: string; key: string }> {
  const project = await newProject(seed);
  const created = await json<{ rawKey: string }>(
    await callApi('POST', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}/keys`, seed.owner, {
      scopes,
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    }),
    201,
    'create project key',
  );
  return { projectId: project.id, key: created.rawKey };
}

interface Delivery {
  projectId: string;
  key: string;
  componentId: string;
}

/**
 * One project per seed with a key for plugins and settings and one plugin added. The registry test
 * runs a fixture for every route in one organization, and an organization holds a limited number of
 * projects, so every route here shares this one.
 */
const deliveries = new WeakMap<Seed, Promise<Delivery>>();

function sharedDelivery(seed: Seed): Promise<Delivery> {
  let found = deliveries.get(seed);
  if (!found) {
    found = (async () => {
      const host = await newHost(seed, DELIVERY_SCOPES);
      const plugin = await newPlugin();
      await json(
        await asProject(host.key, 'PUT', `/v1/project/plugins/${plugin.pluginId}`, {
          versionId: plugin.versionId,
        }),
        201,
        'add project plugin',
      );
      const [component] = await sql<{ id: string }>(
        `SELECT id FROM component WHERE plugin_version_id = $1 AND kind = 'mcp'`,
        [parseId('pv', plugin.versionId)],
      );
      return { ...host, componentId: formatId('cmp', component!.id) };
    })();
    deliveries.set(seed, found);
  }
  return found;
}

/** An auth config for the shared project's server, with a name no other has. */
async function newAuthConfig(seed: Seed): Promise<string> {
  const { key, componentId } = await sharedDelivery(seed);
  const created = await json<{ id: string }>(
    await asProject(key, 'POST', '/v1/project/auth-configs', {
      componentId,
      name: `config-${randomUUID().slice(0, 8)}`,
      authMode: 'shared_secret',
      secret: 'fixture-secret',
    }),
    201,
    'create auth config',
  );
  return created.id;
}

/** A plugin that is not yet in the shared project, or one that is, for the routes that remove it. */
async function freshPlugin(delivery: Delivery, added: boolean): Promise<string> {
  const plugin = await newPlugin();
  if (added) {
    await json(
      await asProject(delivery.key, 'PUT', `/v1/project/plugins/${plugin.pluginId}`, {}),
      201,
      'add project plugin',
    );
  }
  return plugin.pluginId;
}

function asProject(key: string, method: string, path: string, body?: unknown): Promise<Response> {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      ...identity,
      authorization: `Bearer ${key}`,
      ...(body === undefined ? {} : { 'Content-Type': contentType }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

async function newProjectUser(key: string): Promise<{ id: string }> {
  return json<{ id: string }>(
    await asProject(key, 'PUT', '/v1/project/users', {
      userId: `user-${randomUUID().slice(0, 10)}`,
    }),
    201,
    'create project user',
  );
}

async function newInvite(
  seed: Seed,
  email = address('contract-invitee'),
): Promise<{ id: string; email: string }> {
  const created = await json<{ results: { invite: { id: string } }[] }>(
    await callApi('POST', `/v1/orgs/${seed.owner.orgId}/invites`, seed.owner, {
      emails: [email],
      role: 'ADMIN',
    }),
    201,
    'create invite',
  );
  return { id: created.results[0]!.invite.id, email };
}

/** A user who has signed up but not verified yet. */
async function unverifiedUser(): Promise<{ email: string }> {
  const email = address('contract-unverified');
  await json(
    await apiPost('/v1/auth/signup', {
      email,
      password: TEST_PASSWORD,
      displayName: 'Contract unverified',
    }),
    201,
    'signup',
  );
  return { email };
}

const wireUser = (user: SignedInUser) => formatId('usr', user.rawUserId);

async function newGatewayKey(seed: Seed): Promise<string> {
  const created = await json<{ rawKey: string }>(
    await callApi('POST', `${base(seed, 'org')}/api-keys`, seed.owner, {
      name: `Gateway ${randomUUID().slice(0, 8)}`,
      permissions: ['mcp:list', 'mcp:call'],
    }),
    201,
    'create gateway key',
  );
  return created.rawKey;
}

function gatewayCall(path: string, body: unknown): Promise<Response> {
  return fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: { ...workloadHeaders, 'x-caller-id': 'gateway' },
    body: JSON.stringify(body),
  });
}

const FIXED: Record<string, Fixture> = {
  'sync.get': async (seed) => fetch(`${apiUrl}/v1/sync`, { headers: await newDeliveryKey(seed) }),
  'sync.report': async (seed) =>
    fetch(`${apiUrl}/v1/sync/reports`, {
      method: 'POST',
      headers: {
        ...(await newDeliveryKey(seed)),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ applied: [], skipped: [] }),
    }),
  'health.get': () => apiGet('/healthz'),
  'ready.get': () => apiGet('/readyz'),
  'metrics.get': () => apiGet('/metrics'),

  'auth.signup': () =>
    apiPost('/v1/auth/signup', {
      email: address('contract-signup'),
      password: TEST_PASSWORD,
      displayName: 'Contract signup',
    }),
  'auth.verifyEmail': async () => {
    const { email } = await unverifiedUser();
    return apiPost('/v1/auth/verify-email', {
      token: await verificationToken(email),
    });
  },
  'auth.resendVerification': async () => {
    const { email } = await unverifiedUser();
    return apiPost('/v1/auth/resend-verification', { email });
  },
  'auth.signin': async () => {
    const user = await createSignedInUser('contract-signin');
    return apiPost('/v1/auth/signin', {
      email: user.email,
      password: TEST_PASSWORD,
    });
  },
  'auth.signout': async () => {
    const user = await createSignedInUser('contract-signout');
    return callApi('POST', '/v1/auth/signout', user);
  },
  'auth.signoutAll': async () => {
    const user = await createSignedInUser('contract-signout-all');
    return callApi('POST', '/v1/auth/signout-all', user);
  },
  'auth.forgotPassword': async () => {
    const user = await createSignedInUser('contract-forgot');
    return apiPost('/v1/auth/forgot-password', { email: user.email });
  },
  'auth.resetPassword': async () => {
    const user = await createSignedInUser('contract-reset');
    await json(await apiPost('/v1/auth/forgot-password', { email: user.email }), 202, 'forgot');
    const token = await mailToken(user.email, 'Reset your password');
    return apiPost('/v1/auth/reset-password', {
      token,
      newPassword: 'AnotherPassword456!',
    });
  },
  'auth.changePassword': async () => {
    const user = await createSignedInUser('contract-change-password');
    return callApi('POST', '/v1/auth/change-password', user, {
      currentPassword: TEST_PASSWORD,
      newPassword: 'AnotherPassword456!',
    });
  },
  'auth.changeEmail': async () => {
    const user = await createSignedInUser('contract-change-email');
    return callApi('POST', '/v1/auth/change-email', user, {
      newEmail: address('contract-new-address'),
      currentPassword: TEST_PASSWORD,
    });
  },
  'auth.confirmEmailChange': async () => {
    const user = await createSignedInUser('contract-confirm-email');
    const next = address('contract-confirmed-address');
    await json(
      await callApi('POST', '/v1/auth/change-email', user, {
        newEmail: next,
        currentPassword: TEST_PASSWORD,
      }),
      202,
      'change email',
    );
    const token = await mailToken(next, 'Confirm your new email address');
    return apiPost('/v1/auth/confirm-email-change', { token });
  },
  'auth.me': (seed) => callApi('GET', '/v1/auth/me', seed.owner),
  'auth.deleteMe': async () => {
    const user = await createSignedInUser('contract-delete-me');
    return callApi('DELETE', `/v1/auth/me?confirmEmail=${encodeURIComponent(user.email)}`, user);
  },
  'auth.session': (seed) => {
    const { 'Content-Type': _contentType, ...identity } = workloadHeaders;
    return fetch(`${apiUrl}/v1/auth/session`, {
      method: 'POST',
      headers: { ...identity, 'x-session-token': seed.owner.sessionToken },
    });
  },

  'gateway.authenticate': () =>
    fetch(`${apiUrl}/v1/gateway/authenticate`, {
      method: 'POST',
      headers: { ...workloadHeaders, 'x-caller-id': 'gateway' },
      body: JSON.stringify({ key: 'nope' }),
    }),
  'gateway.servers': async (seed) =>
    gatewayCall('/v1/gateway/servers', { key: await newGatewayKey(seed) }),
  'gateway.access': async (seed) =>
    gatewayCall('/v1/gateway/access', {
      key: await newGatewayKey(seed),
      installationId: 'fixture-installation',
      componentId: 'fixture-component',
    }),
  'gateway.usage': async (seed) =>
    gatewayCall('/v1/gateway/usage', {
      key: await newGatewayKey(seed),
      server: 'fixture-server',
      tool: 'fixture-tool',
      outcome: 'ok',
      durationMs: 1,
      requestId: 'fixture-request',
    }),

  'orgs.list': (seed) => callApi('GET', '/v1/orgs', seed.owner),
  'orgs.create': (seed) => {
    const slug = `contract-${randomUUID().slice(0, 12)}`;
    return callApi('POST', '/v1/orgs', seed.owner, {
      name: `Contract ${slug}`,
      slug,
    });
  },
  'orgs.get': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}`, seed.owner),
  'orgs.update': (seed) =>
    callApi('PATCH', `/v1/orgs/${seed.owner.orgId}`, seed.owner, {
      name: 'Contract renamed',
    }),
  'orgs.delete': async (seed) => {
    const org = await newOrg(seed);
    return callApi('DELETE', `/v1/orgs/${org.orgId}?confirmSlug=${org.slug}`, seed.owner);
  },
  'orgs.me': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}/me`, seed.owner),
  'orgPolicy.get': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}/policy`, seed.owner),
  'orgPolicy.update': (seed) =>
    callApi('PATCH', `/v1/orgs/${seed.owner.orgId}/policy`, seed.owner, {
      allowPersonalInstalls: true,
    }),

  'members.list': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}/members`, seed.owner),
  'members.update': async (seed) => {
    const member = await newMember(seed);
    return callApi(
      'PATCH',
      `/v1/orgs/${seed.owner.orgId}/members/${wireUser(member)}`,
      seed.owner,
      {
        role: 'ADMIN',
      },
    );
  },
  'members.remove': async (seed) => {
    const member = await newMember(seed);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/members/${wireUser(member)}`,
      seed.owner,
    );
  },
  'invites.list': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}/invites`, seed.owner),
  'invites.create': (seed) =>
    callApi('POST', `/v1/orgs/${seed.owner.orgId}/invites`, seed.owner, {
      emails: [address('contract-invitee')],
      role: 'ADMIN',
    }),
  'invites.revoke': async (seed) => {
    const invite = await newInvite(seed);
    return callApi('DELETE', `/v1/orgs/${seed.owner.orgId}/invites/${invite.id}`, seed.owner);
  },
  'invites.resend': async (seed) => {
    const invite = await newInvite(seed);
    return callApi('POST', `/v1/orgs/${seed.owner.orgId}/invites/${invite.id}/resend`, seed.owner);
  },
  'invites.preview': async (seed) => {
    const invitee = address('contract-preview');
    await newInvite(seed, invitee);
    return apiPost('/v1/invites/preview', { token: await mailToken(invitee, 'invited') });
  },
  'invites.accept': async (seed) => {
    const invitee = await createSignedInUser('contract-accept');
    await newInvite(seed, invitee.email);
    const token = await mailToken(invitee.email, 'invited');
    return callApi('POST', '/v1/invites/accept', invitee, { token });
  },

  'projects.list': (seed) => callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects`, seed.owner),
  'projects.create': (seed) =>
    callApi('POST', `/v1/orgs/${seed.owner.orgId}/projects`, seed.owner, {
      name: `Project ${randomUUID().slice(0, 10)}`,
    }),
  'projects.get': async (seed) => {
    const project = await newProject(seed);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}`, seed.owner);
  },
  'projects.update': async (seed) => {
    const project = await newProject(seed);
    return callApi('PATCH', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}`, seed.owner, {
      returnOrigins: ['https://app.example.com'],
    });
  },
  'projects.delete': async (seed) => {
    const project = await newProject(seed);
    return callApi('DELETE', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}`, seed.owner);
  },
  'projectKeys.list': async (seed) => {
    const project = await newProject(seed);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}/keys`, seed.owner);
  },
  'projectKeys.create': async (seed) => {
    const project = await newProject(seed);
    return callApi('POST', `/v1/orgs/${seed.owner.orgId}/projects/${project.id}/keys`, seed.owner, {
      scopes: ['sessions:read', 'observability:read'],
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    });
  },
  'projectMe.get': async (seed) => asProject((await newHost(seed)).key, 'GET', '/v1/project/me'),
  'projectUsers.put': async (seed) =>
    asProject((await newHost(seed)).key, 'PUT', '/v1/project/users', {
      userId: `user-${randomUUID().slice(0, 10)}`,
      displayName: 'Contract user',
    }),
  'projectUsers.list': async (seed) => {
    const { key } = await newHost(seed);
    await newProjectUser(key);
    return asProject(key, 'GET', '/v1/project/users');
  },
  'projectUsersConsole.delete': async (seed) => {
    const { key, projectId } = await newHost(seed);
    const user = await newProjectUser(key);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/users/${user.id}`,
      seed.owner,
    );
  },
  'projectUsersConsole.list': async (seed) => {
    const { key, projectId } = await newHost(seed);
    await newProjectUser(key);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/users`, seed.owner);
  },
  'projectLogs.list': async (seed) =>
    asProject((await newHost(seed, OBSERVER_SCOPES)).key, 'GET', '/v1/project/logs'),
  'projectUsage.get': async (seed) =>
    asProject((await newHost(seed, OBSERVER_SCOPES)).key, 'GET', '/v1/project/usage'),
  'projectLogsConsole.list': async (seed) => {
    const { projectId } = await newHost(seed);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/logs`, seed.owner);
  },
  'projectUsageConsole.get': async (seed) => {
    const { projectId } = await newHost(seed);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/usage`, seed.owner);
  },
  'projectWebhookConsole.put': async (seed) => {
    const { projectId } = await sharedWebhookHost(seed);
    return callApi(
      'PUT',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook`,
      seed.owner,
      {
        url: `${FIXTURE_ORIGIN}/hook`,
        events: ['user.created'],
      },
    );
  },
  'projectWebhookConsole.get': async (seed) => {
    const { projectId } = await sharedWebhookHost(seed);
    await putWebhook(seed, projectId);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook`, seed.owner);
  },
  'projectWebhookConsole.delete': async (seed) => {
    const { projectId } = await newHost(seed);
    await putWebhook(seed, projectId);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook`,
      seed.owner,
    );
  },
  'projectWebhookConsole.rotateSecret': async (seed) => {
    const { projectId } = await sharedWebhookHost(seed);
    await putWebhook(seed, projectId);
    return callApi(
      'POST',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook/rotate-secret`,
      seed.owner,
    );
  },
  'projectWebhookConsole.deliveries': async (seed) => {
    const { projectId } = await sharedWebhookHost(seed);
    return callApi(
      'GET',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/webhook/deliveries`,
      seed.owner,
    );
  },
  'projectWebhookDeliveries.list': async (seed) =>
    asProject((await sharedWebhookHost(seed)).key, 'GET', '/v1/project/webhook/deliveries'),
  'projectUserPluginsConsole.state': async (seed) => {
    const { key, projectId } = await newHost(seed);
    const user = await newProjectUser(key);
    return callApi(
      'GET',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/users/${user.id}/plugins`,
      seed.owner,
    );
  },
  'projectUsersConsole.get': async (seed) => {
    const { key, projectId } = await newHost(seed);
    const user = await newProjectUser(key);
    return callApi(
      'GET',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/users/${user.id}`,
      seed.owner,
    );
  },
  'projectPlugins.list': async (seed) =>
    asProject((await sharedDelivery(seed)).key, 'GET', '/v1/project/plugins'),
  'projectPlugins.put': async (seed) => {
    const delivery = await sharedDelivery(seed);
    const pluginId = await freshPlugin(delivery, false);
    return asProject(delivery.key, 'PUT', `/v1/project/plugins/${pluginId}`, {});
  },
  'projectPlugins.delete': async (seed) => {
    const delivery = await sharedDelivery(seed);
    const pluginId = await freshPlugin(delivery, true);
    return asProject(delivery.key, 'DELETE', `/v1/project/plugins/${pluginId}`);
  },
  'projectAuthConfigs.list': async (seed) =>
    asProject((await sharedDelivery(seed)).key, 'GET', '/v1/project/auth-configs'),
  'projectAuthConfigs.create': async (seed) => {
    const { key, componentId } = await sharedDelivery(seed);
    return asProject(key, 'POST', '/v1/project/auth-configs', {
      componentId,
      name: `config-${randomUUID().slice(0, 8)}`,
      authMode: 'shared_secret',
      secret: 'fixture-secret',
    });
  },
  'projectAuthConfigs.get': async (seed) =>
    asProject(
      (await sharedDelivery(seed)).key,
      'GET',
      `/v1/project/auth-configs/${await newAuthConfig(seed)}`,
    ),
  'projectAuthConfigs.update': async (seed) =>
    asProject(
      (await sharedDelivery(seed)).key,
      'PUT',
      `/v1/project/auth-configs/${await newAuthConfig(seed)}`,
      { name: `renamed-${randomUUID().slice(0, 8)}` },
    ),
  'projectAuthConfigs.delete': async (seed) =>
    asProject(
      (await sharedDelivery(seed)).key,
      'DELETE',
      `/v1/project/auth-configs/${await newAuthConfig(seed)}`,
    ),
  'projectAuthConfigs.putVariables': async (seed) => {
    const { key, componentId } = await sharedDelivery(seed);
    return asProject(key, 'PUT', `/v1/project/auth-configs/${componentId}/variables`, {
      values: { API_TOKEN: 'fixture-value' },
    });
  },
  'projectPluginsConsole.list': async (seed) => {
    const { projectId } = await sharedDelivery(seed);
    return callApi('GET', `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/plugins`, seed.owner);
  },
  'projectPluginsConsole.put': async (seed) => {
    const delivery = await sharedDelivery(seed);
    const pluginId = await freshPlugin(delivery, false);
    return callApi(
      'PUT',
      `/v1/orgs/${seed.owner.orgId}/projects/${delivery.projectId}/plugins/${pluginId}`,
      seed.owner,
      {},
    );
  },
  'projectPluginsConsole.delete': async (seed) => {
    const delivery = await sharedDelivery(seed);
    const pluginId = await freshPlugin(delivery, true);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/projects/${delivery.projectId}/plugins/${pluginId}`,
      seed.owner,
    );
  },
  'projectAuthConfigsConsole.list': async (seed) => {
    const { projectId } = await sharedDelivery(seed);
    return callApi(
      'GET',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs`,
      seed.owner,
    );
  },
  'projectAuthConfigsConsole.create': async (seed) => {
    const { projectId, componentId } = await sharedDelivery(seed);
    return callApi(
      'POST',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs`,
      seed.owner,
      {
        componentId,
        name: `config-${randomUUID().slice(0, 8)}`,
        authMode: 'shared_secret',
        secret: 'fixture-secret',
      },
    );
  },
  'projectAuthConfigsConsole.get': async (seed) => {
    const { projectId } = await sharedDelivery(seed);
    return callApi(
      'GET',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs/${await newAuthConfig(seed)}`,
      seed.owner,
    );
  },
  'projectAuthConfigsConsole.update': async (seed) => {
    const { projectId } = await sharedDelivery(seed);
    return callApi(
      'PUT',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs/${await newAuthConfig(seed)}`,
      seed.owner,
      { name: `renamed-${randomUUID().slice(0, 8)}` },
    );
  },
  'projectAuthConfigsConsole.delete': async (seed) => {
    const { projectId } = await sharedDelivery(seed);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs/${await newAuthConfig(seed)}`,
      seed.owner,
    );
  },
  'projectAuthConfigsConsole.putVariables': async (seed) => {
    const { projectId, componentId } = await sharedDelivery(seed);
    return callApi(
      'PUT',
      `/v1/orgs/${seed.owner.orgId}/projects/${projectId}/auth-configs/${componentId}/variables`,
      seed.owner,
      { values: { API_TOKEN: 'fixture-value' } },
    );
  },
  'projectKeys.rotate': async (seed) => {
    const project = await newProject(seed);
    const key = await newProjectKey(seed, project.id);
    return callApi(
      'POST',
      `/v1/orgs/${seed.owner.orgId}/projects/${project.id}/keys/${key.id}/rotate`,
      seed.owner,
    );
  },
  'projectKeys.revoke': async (seed) => {
    const project = await newProject(seed);
    const key = await newProjectKey(seed, project.id);
    return callApi(
      'DELETE',
      `/v1/orgs/${seed.owner.orgId}/projects/${project.id}/keys/${key.id}`,
      seed.owner,
    );
  },
  'plugins.list': (seed) => callApi('GET', '/v1/plugins', seed.owner),
  'categories.list': (seed) => callApi('GET', '/v1/categories', seed.owner),
  'plugins.get': async (seed) => {
    const plugin = await newPlugin();
    return callApi('GET', `/v1/plugins/${plugin.pluginId}`, seed.owner);
  },
  'plugins.versions': async (seed) => {
    const plugin = await newPlugin();
    return callApi('GET', `/v1/plugins/${plugin.pluginId}/versions`, seed.owner);
  },
  'pluginVersions.get': async (seed) => {
    const plugin = await newPlugin();
    return callApi('GET', `/v1/plugin-versions/${plugin.versionId}`, seed.owner);
  },
  'pluginVersions.review': async (seed) => {
    const plugin = await newPlugin();
    return callApi('GET', `/v1/plugin-versions/${plugin.versionId}/review`, seed.owner);
  },
};

/** The catalog, install mode, allowed list, sets and user installs, as the host and as the console. */
function catalogFixtures(): Record<string, Fixture> {
  type Call = (method: string, suffix: string, body?: unknown) => Promise<Response>;
  const fixtures: Record<string, Fixture> = {};
  const sides: { group: string; open: (seed: Seed) => Promise<Call> }[] = [
    {
      group: '',
      open: async (seed) => {
        const { key } = await sharedDelivery(seed);
        return (method, suffix, body) => asProject(key, method, `/v1/project${suffix}`, body);
      },
    },
    {
      group: 'Console',
      open: async (seed) => {
        const { projectId } = await sharedDelivery(seed);
        return (method, suffix, body) =>
          callApi(
            method,
            `/v1/orgs/${seed.owner.orgId}/projects/${projectId}${suffix}`,
            seed.owner,
            body,
          );
      },
    },
  ];
  const newSet = async (call: Call, plugins: string[] = []): Promise<{ id: string }> =>
    json<{ id: string }>(
      await call('POST', '/plugin-sets', {
        name: `Set ${randomUUID().slice(0, 10)}`,
        plugins,
      }),
      201,
      'create plugin set',
    );
  for (const { group, open } of sides) {
    const on =
      (run: (call: Call) => Promise<Response>): Fixture =>
      async (seed) =>
        run(await open(seed));
    const put = (id: string, run: (call: Call) => Promise<Response>) => {
      fixtures[`${id.split('.')[0]}${group}.${id.split('.')[1]}`] = on(run);
    };
    put('projectCatalog.list', (call) => call('GET', '/catalog'));
    put('projectCatalog.get', async (call) => {
      const plugin = await newPlugin();
      return call('GET', `/catalog/${plugin.pluginId}`);
    });
    put('projectUserInstallMode.get', (call) => call('GET', '/user-install-mode'));
    put('projectUserInstallMode.put', (call) => call('PUT', '/user-install-mode', { mode: 'off' }));
    put('projectAllowedPlugins.list', (call) => call('GET', '/allowed-plugins'));
    put('projectAllowedPlugins.put', async (call) => {
      const plugin = await newPlugin();
      return call('PUT', `/allowed-plugins/${plugin.pluginId}`);
    });
    put('projectAllowedPlugins.delete', async (call) => {
      const plugin = await newPlugin();
      await json(await call('PUT', `/allowed-plugins/${plugin.pluginId}`), 201, 'allow plugin');
      return call('DELETE', `/allowed-plugins/${plugin.pluginId}`);
    });
    put('projectPluginSets.list', (call) => call('GET', '/plugin-sets'));
    put('projectPluginSets.create', (call) =>
      call('POST', '/plugin-sets', {
        name: `Set ${randomUUID().slice(0, 10)}`,
      }),
    );
    put('projectPluginSets.get', async (call) =>
      call('GET', `/plugin-sets/${(await newSet(call)).id}`),
    );
    put('projectPluginSets.update', async (call) =>
      call('PATCH', `/plugin-sets/${(await newSet(call)).id}`, {
        name: `Renamed ${randomUUID().slice(0, 10)}`,
      }),
    );
    put('projectPluginSets.delete', async (call) =>
      call('DELETE', `/plugin-sets/${(await newSet(call)).id}`),
    );
    put('projectPluginSetMembers.put', async (call) => {
      const plugin = await newPlugin();
      return call('PUT', `/plugin-sets/${(await newSet(call)).id}/plugins/${plugin.pluginId}`);
    });
    put('projectPluginSetMembers.delete', async (call) => {
      const plugin = await newPlugin();
      const set = await newSet(call, [plugin.pluginId]);
      return call('DELETE', `/plugin-sets/${set.id}/plugins/${plugin.pluginId}`);
    });
    put('projectUserPlugins.list', (call) => call('GET', '/user-plugins?userId=contract-user'));
    put('projectUserPlugins.put', async (call) => {
      const plugin = await newPlugin();
      return call('PUT', `/user-plugins/${plugin.pluginId}`, {
        userId: `user-${randomUUID().slice(0, 10)}`,
      });
    });
    const installed = async (call: Call) => {
      const plugin = await newPlugin();
      const userId = `user-${randomUUID().slice(0, 10)}`;
      await json(
        await call('PUT', `/user-plugins/${plugin.pluginId}`, { userId }),
        201,
        'install for user',
      );
      const page = await json<{
        items: { pluginId: string; components: { componentId: string }[] }[];
      }>(await call('GET', `/user-plugins?userId=${userId}`), 200, 'read user plugins');
      const item = page.items.find((entry) => entry.pluginId === plugin.pluginId);
      return {
        pluginId: plugin.pluginId,
        userId,
        componentId: item!.components[0]!.componentId,
      };
    };
    put('projectUserPluginVariables.put', async (call) => {
      const { pluginId, userId } = await installed(call);
      return call('PUT', `/user-plugins/${pluginId}/variables`, {
        userId,
        values: { API_TOKEN: 'fixture-value' },
      });
    });
    put('projectUserPluginComponents.put', async (call) => {
      const { pluginId, userId, componentId } = await installed(call);
      return call('PUT', `/user-plugins/${pluginId}/components/${componentId}`, {
        userId,
        enabled: false,
      });
    });
    put('projectUserPluginComponents.delete', async (call) => {
      const shared = await newPlugin();
      await json(await call('PUT', `/plugins/${shared.pluginId}`, {}), 201, 'install for project');
      const { userId } = await installed(call);
      const page = await json<{
        items: { pluginId: string; components: { componentId: string }[] }[];
      }>(await call('GET', `/user-plugins?userId=${userId}`), 200, 'read user plugins');
      const item = page.items.find((entry) => entry.pluginId === shared.pluginId);
      return call(
        'DELETE',
        `/user-plugins/${shared.pluginId}/components/${item!.components[0]!.componentId}?userId=${userId}`,
      );
    });
    put('projectUserPlugins.delete', async (call) => {
      const plugin = await newPlugin();
      const userId = `user-${randomUUID().slice(0, 10)}`;
      await json(
        await call('PUT', `/user-plugins/${plugin.pluginId}`, { userId }),
        201,
        'install for user',
      );
      return call('DELETE', `/user-plugins/${plugin.pluginId}?userId=${userId}`);
    });
  }
  return fixtures;
}

function scopedFixtures(): Record<string, Fixture> {
  const fixtures: Record<string, Fixture> = {};
  for (const scope of SCOPES) {
    const at = (seed: Seed, suffix: string) => `${base(seed, scope)}${suffix}`;
    Object.assign(fixtures, {
      [`installations.list.${scope}`]: (seed: Seed) =>
        callApi('GET', at(seed, '/installations'), seed.owner),
      [`installations.create.${scope}`]: async (seed: Seed) => {
        const plugin = await newPlugin();
        return callApi('POST', at(seed, '/installations'), seed.owner, {
          pluginVersionId: plugin.versionId,
        });
      },
      [`installations.get.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('GET', at(seed, `/installations/${installation.id}`), seed.owner);
      },
      [`installations.update.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('PATCH', at(seed, `/installations/${installation.id}`), seed.owner, {
          active: false,
        });
      },
      [`installations.delete.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('DELETE', at(seed, `/installations/${installation.id}`), seed.owner);
      },
      [`installations.upgrade.${scope}`]: async (seed: Seed) => {
        const plugin = await newPlugin(true);
        const created = await json<{ id: string }>(
          await callApi('POST', at(seed, '/installations'), seed.owner, {
            pluginVersionId: plugin.versionId,
          }),
          201,
          'create installation',
        );
        return callApi('POST', at(seed, `/installations/${created.id}/upgrade`), seed.owner, {
          pluginVersionId: plugin.nextVersionId,
        });
      },
      [`components.list.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('GET', at(seed, `/installations/${installation.id}/components`), seed.owner);
      },
      [`components.update.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        const path = at(seed, `/installations/${installation.id}/components`);
        const list = await json<{ items: { componentId: string }[] }>(
          await callApi('GET', path, seed.owner),
          200,
          'list components',
        );
        return callApi('PATCH', `${path}/${list.items[0]?.componentId}`, seed.owner, {
          enabled: true,
        });
      },
      [`variables.list.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('GET', at(seed, `/installations/${installation.id}/variables`), seed.owner);
      },
      [`variables.put.${scope}`]: async (seed: Seed) => {
        const installation = await newInstallation(seed, scope);
        return callApi('PUT', at(seed, `/installations/${installation.id}/variables`), seed.owner, {
          values: { API_TOKEN: `contract-value-${randomUUID()}` },
        });
      },
      [`mcpServers.list.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'GET',
          at(seed, `/installations/${target.installationId}/mcp-servers`),
          seed.owner,
        );
      },
      [`mcpServers.get.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'GET',
          at(seed, `/installations/${target.installationId}/mcp-servers/${target.componentId}`),
          seed.owner,
        );
      },
      [`mcpServers.putAuth.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'PUT',
          at(
            seed,
            `/installations/${target.installationId}/mcp-servers/${target.componentId}/auth`,
          ),
          seed.owner,
          { authType: 'api_key', apiKey: `contract-key-${randomUUID()}` },
        );
      },
      [`mcpServers.test.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'POST',
          at(
            seed,
            `/installations/${target.installationId}/mcp-servers/${target.componentId}/test`,
          ),
          seed.owner,
        );
      },
      [`mcpServers.oauthDiscover.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'POST',
          at(
            seed,
            `/installations/${target.installationId}/mcp-servers/${target.componentId}/oauth/discover`,
          ),
          seed.owner,
        );
      },
      [`mcpServers.oauthDisconnect.${scope}`]: async (seed: Seed) => {
        const target = await newMcpInstallation(seed, scope);
        return callApi(
          'DELETE',
          at(
            seed,
            `/installations/${target.installationId}/mcp-servers/${target.componentId}/oauth`,
          ),
          seed.owner,
        );
      },
    });
  }
  const orgKeys = (seed: Seed, suffix = '') => `${base(seed, 'org')}/api-keys${suffix}`;
  Object.assign(fixtures, {
    'apiKeys.list.org': (seed: Seed) => callApi('GET', orgKeys(seed), seed.owner),
    'apiKeys.list.user': (seed: Seed) =>
      callApi('GET', `${base(seed, 'user')}/api-keys`, seed.owner),
    'apiKeys.create.org': (seed: Seed) =>
      callApi('POST', orgKeys(seed), seed.owner, {
        name: `Contract key ${randomUUID().slice(0, 8)}`,
        permissions: ['mcp:list', 'mcp:call'],
      }),
    'apiKeys.revoke.org': async (seed: Seed) => {
      const keyId = await newKey(seed);
      return callApi('DELETE', orgKeys(seed, `/${keyId}`), seed.owner);
    },
  });
  return fixtures;
}

async function newSession(seed: Seed, body: Record<string, unknown> = {}) {
  const { key } = await sharedDelivery(seed);
  return json<{ id: string; token: string }>(
    await asProject(key, 'POST', '/v1/project/sessions', {
      userId: `user-${randomUUID().slice(0, 10)}`,
      ...body,
    }),
    201,
    'create session',
  );
}

/** A connection of a fresh project user to the shared project's server, written straight in. */
async function newConnection(seed: Seed): Promise<string> {
  const delivery = await sharedDelivery(seed);
  const user = await newProjectUser(delivery.key);
  const rawComponent = parseId('cmp', delivery.componentId);
  const [installation] = await sql<{ installation_id: string }>(
    `SELECT c.installation_id FROM installation_component c
       JOIN installation i ON i.id = c.installation_id
      WHERE c.component_id = $1 AND i.project_id = $2`,
    [rawComponent, parseId('prj', delivery.projectId)],
  );
  const orgId = parseId('org', seed.owner.orgId);
  await sql(
    `INSERT INTO mcp_server (installation_id, component_id, organization_id, auth_type)
     VALUES ($1, $2, $3, 'oauth_dcr') ON CONFLICT DO NOTHING`,
    [installation!.installation_id, rawComponent, orgId],
  );
  const [row] = await sql<{ id: string }>(
    `INSERT INTO mcp_oauth_token (installation_id, component_id, user_id, organization_id, access_sealed)
     VALUES ($1, $2, $3, $4, 'sealed') RETURNING id`,
    [installation!.installation_id, rawComponent, parseId('usr', user.id), orgId],
  );
  return formatId('ucn', row!.id);
}

/** Sessions, as the host and as the console, and what a session's own user does. */
function sessionFixtures(): Record<string, Fixture> {
  const asSession = (token: string, method: string, path: string, body?: unknown) =>
    asProject(token, method, path, body);
  const openInstall = async (seed: Seed) => {
    const { key } = await sharedDelivery(seed);
    await json(
      await asProject(key, 'PUT', '/v1/project/user-install-mode', {
        mode: 'any',
      }),
      200,
      'open user installs',
    );
  };
  const projectPath = (seed: Seed, suffix: string) =>
    sharedDelivery(seed).then(
      ({ projectId }) => `/v1/orgs/${seed.owner.orgId}/projects/${projectId}${suffix}`,
    );
  return {
    'projectSessions.create': async (seed) =>
      asProject((await sharedDelivery(seed)).key, 'POST', '/v1/project/sessions', {
        userId: `user-${randomUUID().slice(0, 10)}`,
      }),
    'projectSessions.list': async (seed) =>
      asProject((await sharedDelivery(seed)).key, 'GET', '/v1/project/sessions'),
    'projectSessions.get': async (seed) =>
      asProject(
        (await sharedDelivery(seed)).key,
        'GET',
        `/v1/project/sessions/${(await newSession(seed)).id}`,
      ),
    'projectSessions.revoke': async (seed) =>
      asProject(
        (await sharedDelivery(seed)).key,
        'DELETE',
        `/v1/project/sessions/${(await newSession(seed)).id}`,
      ),
    'projectSessionsConsole.list': async (seed) =>
      callApi('GET', await projectPath(seed, '/sessions'), seed.owner),
    'projectSessionsConsole.get': async (seed) =>
      callApi(
        'GET',
        await projectPath(seed, `/sessions/${(await newSession(seed)).id}`),
        seed.owner,
      ),
    'projectSessionsConsole.revoke': async (seed) =>
      callApi(
        'DELETE',
        await projectPath(seed, `/sessions/${(await newSession(seed)).id}`),
        seed.owner,
      ),
    'projectConnections.put': async (seed) => {
      const delivery = await sharedDelivery(seed);
      return asProject(delivery.key, 'PUT', '/v1/project/connections', {
        userId: `user-${randomUUID().slice(0, 10)}`,
        componentId: delivery.componentId,
        apiKey: 'fixture-key',
      });
    },
    'projectConnections.list': async (seed) =>
      asProject((await sharedDelivery(seed)).key, 'GET', '/v1/project/connections'),
    'projectConnections.delete': async (seed) =>
      asProject(
        (await sharedDelivery(seed)).key,
        'DELETE',
        `/v1/project/connections/${await newConnection(seed)}`,
      ),
    'projectConnectionsConsole.list': async (seed) =>
      callApi('GET', await projectPath(seed, '/connections'), seed.owner),
    'projectConnectionsConsole.delete': async (seed) =>
      callApi(
        'DELETE',
        await projectPath(seed, `/connections/${await newConnection(seed)}`),
        seed.owner,
      ),
    'sessionConnections.list': async (seed) =>
      asSession((await newSession(seed)).token, 'GET', '/v1/session/connections'),
    'sessionCatalog.list': async (seed) => {
      await openInstall(seed);
      return asSession((await newSession(seed)).token, 'GET', '/v1/session/catalog');
    },
    'sessionPlugins.list': async (seed) =>
      asSession((await newSession(seed)).token, 'GET', '/v1/session/plugins'),
    'sessionPluginVariables.put': async (seed) => {
      await openInstall(seed);
      const plugin = await newPlugin();
      const { token } = await newSession(seed);
      await json(
        await asSession(token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {}),
        201,
        'install for session user',
      );
      return asSession(token, 'PUT', `/v1/session/plugins/${plugin.pluginId}/variables`, {
        values: { API_TOKEN: 'fixture-value' },
      });
    },
    'sessionPluginComponents.put': async (seed) => {
      const delivery = await sharedDelivery(seed);
      const pluginId = await freshPlugin(delivery, false);
      const { token } = await newSession(seed);
      const page = await json<{
        items: { pluginId: string; components: { componentId: string }[] }[];
      }>(await asSession(token, 'GET', '/v1/session/plugins'), 200, 'read session plugins');
      const item = page.items.find((entry) => entry.pluginId === pluginId);
      return asSession(
        token,
        'PUT',
        `/v1/session/plugins/${pluginId}/components/${item!.components[0]!.componentId}`,
        { enabled: false },
      );
    },
    'sessionPluginComponents.delete': async (seed) => {
      const delivery = await sharedDelivery(seed);
      const pluginId = await freshPlugin(delivery, false);
      const { token } = await newSession(seed);
      const page = await json<{
        items: { pluginId: string; components: { componentId: string }[] }[];
      }>(await asSession(token, 'GET', '/v1/session/plugins'), 200, 'read session plugins');
      const item = page.items.find((entry) => entry.pluginId === pluginId);
      return asSession(
        token,
        'DELETE',
        `/v1/session/plugins/${pluginId}/components/${item!.components[0]!.componentId}`,
      );
    },
    'sessionPlugins.put': async (seed) => {
      await openInstall(seed);
      const plugin = await newPlugin();
      return asSession(
        (await newSession(seed)).token,
        'PUT',
        `/v1/session/plugins/${plugin.pluginId}`,
        {},
      );
    },
    'sessionPlugins.delete': async (seed) => {
      await openInstall(seed);
      const plugin = await newPlugin();
      const { token } = await newSession(seed);
      await json(
        await asSession(token, 'PUT', `/v1/session/plugins/${plugin.pluginId}`, {}),
        201,
        'install for session user',
      );
      return asSession(token, 'DELETE', `/v1/session/plugins/${plugin.pluginId}`);
    },
  };
}

export const FIXTURES: Record<string, Fixture> = {
  ...FIXED,
  ...catalogFixtures(),
  ...sessionFixtures(),
  ...scopedFixtures(),
};
