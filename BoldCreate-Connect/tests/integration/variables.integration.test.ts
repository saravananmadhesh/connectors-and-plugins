/**
 * Installation variables: the schema comes from the plugin version, values are sealed and
 * write-only, a merge patch keeps, sets and deletes, an undeclared name writes nothing, and a
 * required variable left unset keeps the server component inactive.
 *
 * Run: pnpm test -- --only=integration
 */
import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { formatId, parseId } from '../../packages/contracts/src/v1/ids.js';
import { apiGet, apiPost, createSignedInUser, sql, workloadHeaders } from './signed-in-user.js';
import { apiUrl } from './test-env.js';
import type { SignedInUser } from './signed-in-user.js';

const SCAN = JSON.stringify({
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  variables: [
    { name: 'API_TOKEN', description: 'Token', required: true, secret: true },
    { name: 'REGION', description: 'Region', required: false, secret: false },
  ],
  skipped: [],
  findings: [],
});

let user: SignedInUser;
let installationId: string;
let path: string;
const canary = `canary-${randomUUID()}`;

function apiPut(url: string, body: unknown, sessionToken: string): Promise<Response> {
  return fetch(`${apiUrl}${url}`, {
    method: 'PUT',
    headers: {
      ...workloadHeaders,
      'idempotency-key': randomUUID(),
      'x-session-token': sessionToken,
    },
    body: JSON.stringify(body),
  });
}

interface Status {
  name: string;
  isSet: boolean;
}

async function statuses(): Promise<Status[]> {
  const res = await apiGet(path, user.sessionToken);
  expect(res.status).toBe(200);
  return ((await res.json()) as { items: Status[] }).items;
}

beforeAll(async () => {
  user = await createSignedInUser('variables');
  const pluginId = randomUUID();
  const versionId = randomUUID();
  await sql(
    `INSERT INTO plugin (id, name, display_name, summary, description, status, visibility)
     VALUES ($1, $2, 'Variables Fixture', 'fixture', 'fixture', 'active', 'public')`,
    [pluginId, `variables-fixture-${pluginId.slice(0, 8)}`],
  );
  await sql(
    `INSERT INTO plugin_version (id, plugin_id, version, major, minor, patch,
       manifest_schema_version, manifest, manifest_sha256, status, scan)
     VALUES ($1, $2, '1.0.0', 1, 0, 0, '1', '{}', $3, 'published', $4)`,
    [versionId, pluginId, `sha256-variables-${versionId}`, SCAN],
  );
  await sql(
    `INSERT INTO component (id, plugin_version_id, kind, name, description, metadata)
     VALUES ($1, $2, 'mcp', 'server', 'fixture server', '{}')`,
    [randomUUID(), versionId],
  );
  const created = await apiPost(
    `/v1/orgs/${user.orgId}/installations`,
    { pluginVersionId: formatId('pv', versionId) },
    user.sessionToken,
  );
  if (created.status !== 201) throw new Error(`Install failed: ${created.status}`);
  installationId = ((await created.json()) as { id: string }).id;
  path = `/v1/orgs/${user.orgId}/installations/${installationId}/variables`;
}, 60_000);

describe('installation variables', () => {
  it('lists what the version declares, none of it set', async () => {
    expect(await statuses()).toEqual([
      expect.objectContaining({ name: 'API_TOKEN', isSet: false }),
      expect.objectContaining({ name: 'REGION', isSet: false }),
    ]);
  });

  it('keeps the server component inactive while a required variable is unset', async () => {
    const res = await apiGet(
      `/v1/orgs/${user.orgId}/installations/${installationId}/components`,
      user.sessionToken,
    );
    const items = ((await res.json()) as { items: Record<string, unknown>[] }).items;
    expect(items[0]).toMatchObject({
      enabled: true,
      active: false,
      inactiveReason: 'variables_missing',
    });
  });

  it('seals a value, returns only isSet, and activates the component', async () => {
    const res = await apiPut(path, { values: { API_TOKEN: canary } }, user.sessionToken);
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).not.toContain(canary);
    expect(JSON.parse(text).items).toEqual([
      expect.objectContaining({ name: 'API_TOKEN', isSet: true }),
      expect.objectContaining({ name: 'REGION', isSet: false }),
    ]);

    const [row] = await sql<{ value_sealed: string }>(
      `SELECT value_sealed FROM installation_variable WHERE installation_id = $1`,
      [parseId('ins', installationId)],
    );
    expect(row!.value_sealed).toMatch(/^v1:okey_[0-9a-f]{32}:/);
    expect(row!.value_sealed).not.toContain(canary);

    const components = await apiGet(
      `/v1/orgs/${user.orgId}/installations/${installationId}/components`,
      user.sessionToken,
    );
    const items = ((await components.json()) as { items: Record<string, unknown>[] }).items;
    expect(items[0]).toMatchObject({ active: true, inactiveReason: null });
  });

  it('keeps on an empty string, sets another, and deletes on null', async () => {
    const kept = await apiPut(path, { values: { API_TOKEN: '', REGION: 'eu' } }, user.sessionToken);
    expect(kept.status).toBe(200);
    expect((await statuses()).map((s) => s.isSet)).toEqual([true, true]);

    const removed = await apiPut(path, { values: { REGION: null } }, user.sessionToken);
    expect(removed.status).toBe(200);
    expect((await statuses()).map((s) => s.isSet)).toEqual([true, false]);
  });

  it('stores a name the plugin does not declare as a custom variable, listed after the declared', async () => {
    const res = await apiPut(
      path,
      { values: { 'my-custom_1': 'x', REGION: 'us' } },
      user.sessionToken,
    );
    expect(res.status).toBe(200);
    const items = ((await res.json()) as { items: (Status & { custom: boolean })[] }).items;
    expect(items.map((s) => [s.name, s.isSet, s.custom])).toEqual([
      ['API_TOKEN', true, false],
      ['REGION', true, false],
      ['my-custom_1', true, true],
    ]);
    const removed = await apiPut(
      path,
      { values: { 'my-custom_1': null, REGION: null } },
      user.sessionToken,
    );
    expect(removed.status).toBe(200);
    expect((await statuses()).map((s) => s.name)).toEqual(['API_TOKEN', 'REGION']);
  });

  it('allows ten custom variables and refuses the eleventh, writing nothing', async () => {
    const ten = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`CUSTOM_${i}`, 'v']));
    expect((await apiPut(path, { values: ten }, user.sessionToken)).status).toBe(200);
    const over = await apiPut(path, { values: { CUSTOM_10: 'v' } }, user.sessionToken);
    expect(over.status).toBe(422);
    expect(((await over.json()) as { error: { code: string } }).error.code).toBe(
      'too_many_custom_variables',
    );
    expect((await statuses()).filter((s) => s.name.startsWith('CUSTOM_'))).toHaveLength(10);
    // Replacing one in the same request stays within the limit.
    const swap = await apiPut(
      path,
      { values: { CUSTOM_0: null, CUSTOM_10: 'v' } },
      user.sessionToken,
    );
    expect(swap.status).toBe(200);
    const cleanup = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [`CUSTOM_${i}`, null]));
    expect((await apiPut(path, { values: cleanup }, user.sessionToken)).status).toBe(200);
    expect((await statuses()).map((s) => s.name)).toEqual(['API_TOKEN', 'REGION']);
  });

  it('rejects a malformed name and an empty request', async () => {
    expect((await apiPut(path, { values: { 'bad name!': 'x' } }, user.sessionToken)).status).toBe(
      400,
    );
    expect((await apiPut(path, { values: {} }, user.sessionToken)).status).toBe(400);
  });

  it('records the names but never the value in the audit log', async () => {
    const rows = await sql<{ context: unknown }>(
      `SELECT context FROM audit_log WHERE action = 'variable.updated' AND org_id = $1`,
      [user.rawOrgId],
    );
    expect(rows.length).toBeGreaterThan(0);
    expect(JSON.stringify(rows)).not.toContain(canary);
    expect(JSON.stringify(rows)).toContain('API_TOKEN');
  });

  it('answers 404 for an installation that is not there', async () => {
    const res = await apiGet(
      `/v1/orgs/${user.orgId}/installations/${formatId('ins', randomUUID())}/variables`,
      user.sessionToken,
    );
    expect(res.status).toBe(404);
  });
});
