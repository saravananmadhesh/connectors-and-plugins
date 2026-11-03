/**
 * What a load run needs before it starts: an organization admin and a project with a project key.
 * It uses the same helpers as the integration tests, so it only works against the isolated stack
 * the test runner starts (it needs that stack's database and workload secret).
 */
import { apiGet, apiPost, createSignedInUser, sql } from '../integration/signed-in-user.js';

export interface LoadProject {
  /** The project key (`prk_`) a host's server calls with. */
  projectKey: string;
  /** The project's id as the database stores it. */
  rawProjectId: string;
}

const SCOPES = ['sessions:read', 'sessions:write'];
const DAY_MS = 86_400_000;

/** Creates one project in a new organization and a project key that reads and writes sessions. */
export async function bootstrapLoadProject(): Promise<LoadProject> {
  const admin = await createSignedInUser('load-admin');
  const base = `/v1/orgs/${admin.orgId}/projects`;
  const created = await apiPost(base, { name: 'Load Host' }, admin.sessionToken);
  if (created.status !== 201) throw new Error(`creating the project answered ${created.status}`);
  const projectId = ((await created.json()) as { id: string }).id;
  const key = await apiPost(
    `${base}/${projectId}/keys`,
    { scopes: SCOPES, expiresAt: new Date(Date.now() + 30 * DAY_MS).toISOString() },
    admin.sessionToken,
  );
  if (key.status !== 201) throw new Error(`creating the key answered ${key.status}`);
  const projectKey = ((await key.json()) as { rawKey: string }).rawKey;
  const check = await apiGet(`${base}/${projectId}`, admin.sessionToken);
  if (check.status !== 200) throw new Error(`reading the project answered ${check.status}`);
  const rawProjectId = projectId
    .replace(/^[a-z]+_/, '')
    .replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
  return { projectKey, rawProjectId };
}

/**
 * Lets this project call as often as the platform allows, so a run measures the services and not the
 * per-project request budget (5,000 a minute by default), which a real host raises the same way.
 */
export async function liftRequestBudget(rawProjectId: string): Promise<void> {
  await sql(
    `INSERT INTO limit_setting (key, scope, scope_id, value, reason) VALUES ('project_requests_per_minute', 'project', $1, 100000, 'load run')`,
    [rawProjectId],
  );
}
