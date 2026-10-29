/**
 * Prepares a local `pnpm dev` stack for the SDK tests (run.mjs and ../sdk-test-dotnet).
 *
 * How to run
 *   1. From the repo root: `pnpm build` and `pnpm dev` (web 3000, api 3001, gateway 3002,
 *      admin 3004, Mailpit 8025). GitHub must be reachable by the worker.
 *   2. node examples/sdk-test/setup-local.mjs
 *      Optional: SDK_TEST_REF (default main) and SDK_TEST_OWNER (default syncfusion) pick the
 *      BoldCreate-Plugins repo, SDK_TEST_STATE (default examples/sdk-test/.local/state.json).
 *
 * What it does (anything already done is skipped, so it can be run again)
 *   Admin: sets the admin password through the Mailpit setup link, discovers
 *   <owner>/BoldCreate-Plugins and cursor/plugins, installs the picked plugin folders, waits for
 *   ingestion, then approves and publishes every pending version.
 *   Web: signs up and verifies owner@sdk.test, finds the org, installs plugins For team and
 *   For me, creates a For You key (fyk_, all For You permissions) and a Platform key (plk_),
 *   creates the project "SDK Test", adds the project plugins, sets the install mode to "any",
 *   and creates a project key (prk_) with every scope.
 *
 * Expected result
 *   Prints the ids it made and writes the state file with the three keys. The keys are secrets:
 *   the file sits in .local/, which git ignores. Nothing is printed with a key in it.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ADMIN = process.env.SDK_TEST_ADMIN_URL ?? 'http://localhost:3004';
const WEB = process.env.SDK_TEST_WEB_URL ?? 'http://localhost:3000';
const MAILPIT = process.env.SDK_TEST_MAILPIT_URL ?? 'http://localhost:8025';
const OWNER = process.env.SDK_TEST_OWNER ?? 'syncfusion';
const REF = process.env.SDK_TEST_REF ?? 'main';
const STATE = process.env.SDK_TEST_STATE ?? join(import.meta.dirname, '.local', 'state.json');
const ADMIN_EMAIL = 'admin@example.test';
const USER_EMAIL = 'owner@sdk.test';
const PASSWORD = 'Sdk-Test-Password-2026!';

// Plugin folders used by the tests: non-MCP plugins (skills, rules, agents, hooks) and no-auth
// HTTP MCP servers (DeepWiki, Microsoft Learn, Context7).
const SOURCES = [
  {
    owner: OWNER,
    repository: 'BoldCreate-Plugins',
    ref: REF,
    want: ['boldcreate-toolkit', 'deepwiki', 'microsoft-learn', 'context7'],
  },
  {
    owner: 'cursor',
    repository: 'plugins',
    ref: 'main',
    want: ['cursor-team-kit', 'ralph-loop', 'continual-learning', 'create-plugin', 'teaching'],
  },
];

const log = (line) => process.stdout.write(`${line}\n`);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** A tiny cookie-keeping client for the admin and web apps (both need a CSRF header on writes). */
function browser(origin) {
  const jar = new Map();
  let csrf = null;
  const cookieHeader = () => [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
  const keep = (res) => {
    for (const line of res.headers.getSetCookie()) {
      const [pair] = line.split(';');
      const at = pair.indexOf('=');
      jar.set(pair.slice(0, at), pair.slice(at + 1));
    }
  };
  async function call(method, path, body) {
    if (method !== 'GET' && csrf === null) {
      const res = await fetch(`${origin}/api/csrf`, { headers: { cookie: cookieHeader() } });
      keep(res);
      csrf = (await res.json()).csrfToken;
    }
    const headers = { cookie: cookieHeader(), origin };
    if (method !== 'GET') headers['x-csrf-token'] = csrf;
    if (method === 'POST') headers['idempotency-key'] = crypto.randomUUID();
    if (body !== undefined) headers['content-type'] = 'application/json';
    const res = await fetch(`${origin}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    keep(res);
    const text = await res.text();
    const data = text ? JSON.parse(text) : undefined;
    if (!res.ok) {
      const error = new Error(`${method} ${path} -> ${res.status} ${text.slice(0, 300)}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  }
  return { call, resetCsrf: () => (csrf = null) };
}

async function latestMail(to, subjectHint, since) {
  for (let i = 0; i < 60; i += 1) {
    const list = await (
      await fetch(`${MAILPIT}/api/v1/search?query=to:${encodeURIComponent(to)}`)
    ).json();
    const found = list.messages.find(
      (m) =>
        new Date(m.Created) >= since &&
        (!subjectHint || m.Subject.toLowerCase().includes(subjectHint)),
    );
    if (found) {
      const full = await (await fetch(`${MAILPIT}/api/v1/message/${found.ID}`)).json();
      return full.Text ?? full.HTML;
    }
    await sleep(500);
  }
  throw new Error(`No mail for ${to}`);
}

const tokenIn = (text) => {
  const match = text.match(/[?&]token=([A-Za-z0-9_\-.~%]+)/);
  if (!match) throw new Error('No token link in the mail');
  return decodeURIComponent(match[1]);
};

async function readState() {
  try {
    return JSON.parse(await readFile(STATE, 'utf8'));
  } catch {
    return {};
  }
}

async function admin() {
  const a = browser(ADMIN);
  try {
    await a.call('POST', '/v1/admin/auth/signin', { email: ADMIN_EMAIL, password: PASSWORD });
  } catch {
    const since = new Date(Date.now() - 1000);
    await a.call('POST', '/v1/admin/auth/setup-request', { email: ADMIN_EMAIL });
    const token = tokenIn(await latestMail(ADMIN_EMAIL, '', since));
    await a.call('POST', '/v1/admin/auth/setup', { token, password: PASSWORD });
  }
  a.resetCsrf();
  log('admin: signed in');

  for (const source of SOURCES) {
    const { owner, repository, ref } = source;
    const found = await a.call('POST', '/v1/admin/plugin-sources/discover', {
      owner,
      repository,
      ref,
    });
    const paths = found.plugins
      .filter((p) => source.want.includes(p.name) && !p.installed && !p.problem)
      .map((p) => p.path);
    log(
      `admin: ${owner}/${repository}@${ref} has ${found.plugins.length} plugins; installing ${paths.length}`,
    );
    if (paths.length > 0) {
      await a.call('POST', '/v1/admin/plugin-sources/install', { owner, repository, ref, paths });
    }
  }

  for (let i = 0; i < 120; i += 1) {
    const { items: sources } = await a.call('GET', '/v1/admin/plugin-sources');
    const busy = sources.filter((s) => s.lastStatus === 'queued' || s.lastStatus === 'running');
    if (busy.length === 0) {
      // A source from an earlier run (another ref or owner) can fail on a name clash with the
      // plugin it already installed; that is a leftover, not a problem with this run.
      const current = (s) =>
        SOURCES.some(
          (x) => x.owner === s.owner && x.repository === s.repository && x.ref === s.ref,
        );
      for (const s of sources.filter((x) => x.lastStatus === 'failed')) {
        const where = `${s.owner}/${s.repository}@${s.ref} ${s.path}`;
        log(`admin: ${current(s) ? '' : '(earlier run) '}source ${where} failed: ${s.lastError}`);
      }
      break;
    }
    await sleep(1000);
  }

  const { items: plugins } = await a.call('GET', '/v1/admin/plugins?pageSize=100');
  for (const plugin of plugins) {
    const detail = await a.call('GET', `/v1/admin/plugins/${plugin.id}`);
    const statuses = [];
    for (const version of detail.versions ?? []) {
      if (version.actions.includes('approve')) {
        await a.call('POST', `/v1/admin/plugin-versions/${version.id}/approve`);
      }
      let now = await a.call('GET', `/v1/admin/plugin-versions/${version.id}`);
      if (now.actions.includes('publish')) {
        await a.call('POST', `/v1/admin/plugin-versions/${version.id}/publish`);
        now = await a.call('GET', `/v1/admin/plugin-versions/${version.id}`);
      }
      statuses.push(`${now.version} ${now.status}`);
    }
    const live = statuses.some((s) => s.endsWith(' published'));
    log(
      `admin: ${plugin.name} ${live ? 'published' : 'NOT published'} (${statuses.join(', ') || 'no versions'})`,
    );
  }
}

async function web(state) {
  const w = browser(WEB);
  try {
    await w.call('POST', '/v1/auth/signin', { email: USER_EMAIL, password: PASSWORD });
  } catch {
    const since = new Date(Date.now() - 1000);
    await w.call('POST', '/v1/auth/signup', {
      email: USER_EMAIL,
      password: PASSWORD,
      displayName: 'SDK Owner',
    });
    const token = tokenIn(await latestMail(USER_EMAIL, '', since));
    await w.call('POST', '/v1/auth/verify-email', { token });
    w.resetCsrf();
    await w
      .call('POST', '/v1/auth/signin', { email: USER_EMAIL, password: PASSWORD })
      .catch(() => undefined);
  }
  w.resetCsrf();
  const orgs = await w.call('GET', '/v1/orgs');
  const org = (orgs.organizations ?? orgs.orgs ?? orgs.items ?? orgs)[0];
  state.orgId = org.id;
  log(`web: signed in, org ${org.id}`);

  const market = await w.call('GET', '/v1/plugins?limit=100');
  const byName = Object.fromEntries((market.plugins ?? market.items).map((p) => [p.name, p]));
  state.plugins = Object.fromEntries(
    Object.values(byName).map((p) => [p.name, { id: p.id, versionId: p.latestVersion?.id }]),
  );

  const install = async (scopePath, name) => {
    const plugin = byName[name];
    if (!plugin?.latestVersion) return log(`web: ${name} is not published`);
    await w
      .call('POST', `/v1/orgs/${org.id}${scopePath}/installations`, {
        pluginVersionId: plugin.latestVersion.id,
      })
      .catch((e) => (e.status === 409 ? undefined : Promise.reject(e)));
  };
  for (const name of ['cursor-team-kit', 'deepwiki']) await install('', name);
  for (const name of ['boldcreate-toolkit', 'ralph-loop', 'microsoft-learn'])
    await install('/me', name);
  log(
    'web: installed For team (cursor-team-kit, deepwiki) and For me (boldcreate-toolkit, ralph-loop, microsoft-learn)',
  );

  const year = new Date(Date.now() + 90 * 86400_000).toISOString();
  if (!state.forYouKey) {
    const made = await w.call('POST', `/v1/orgs/${org.id}/api-keys`, {
      kind: 'foryou',
      name: 'sdk-test-foryou',
      permissions: ['mcp:list', 'mcp:call', 'artifact:sync', 'artifact:download'],
      expiresAt: year,
    });
    state.forYouKey = made.rawKey;
    state.forYouKeyInfo = { id: made.id, permissions: made.permissions };
  }
  if (!state.platformKey) {
    const made = await w.call('POST', `/v1/orgs/${org.id}/api-keys`, {
      kind: 'platform',
      name: 'sdk-test-platform',
      permissions: ['org:manage'],
      expiresAt: year,
    });
    state.platformKey = made.rawKey;
  }
  log('web: For You key and Platform key ready');

  if (!state.projectId) {
    const project = await w.call('POST', `/v1/orgs/${org.id}/projects`, { name: 'SDK Test' });
    state.projectId = project.id;
  }
  const base = `/v1/orgs/${org.id}/projects/${state.projectId}`;
  for (const name of [
    'boldcreate-toolkit',
    'cursor-team-kit',
    'ralph-loop',
    'continual-learning',
    'deepwiki',
  ]) {
    if (byName[name]) await w.call('PUT', `${base}/plugins/${byName[name].id}`, {});
  }
  await w.call('PUT', `${base}/user-install-mode`, { mode: 'any' });
  if (!state.projectKey) {
    const made = await w.call('POST', `${base}/keys`, {
      scopes: [
        'tools:read',
        'sessions:read',
        'sessions:write',
        'connections:read',
        'connections:write',
        'auth-configs:read',
        'auth-configs:write',
        'plugins:read',
        'plugins:write',
        'observability:read',
      ],
      expiresAt: year,
    });
    state.projectKey = made.rawKey;
  }
  if (!state.webhookSecret) {
    // example.com (reserved for examples) takes no webhooks, so deliveries fail; that is enough for
    // webhooks.deliveries(); the signature check is tested offline with this secret.
    const hook = await w
      .call('PUT', `${base}/webhook`, {
        url: 'https://example.com/boldcreate-sdk-test',
        events: ['user.created', 'user_plugin.installed', 'user_plugin.removed', 'sync.reported'],
      })
      .catch((e) => ({ error: e.message }));
    if (hook.secret) state.webhookSecret = hook.secret;
    else log(`web: webhook not set: ${hook.error ?? 'no secret returned'}`);
  }
  log(`web: project ${state.projectId} ready with a full-scope project key`);
  return state;
}

const state = await readState();
await admin();
await web(state);
await mkdir(dirname(STATE), { recursive: true });
await writeFile(STATE, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
log(`state written to ${STATE}`);
