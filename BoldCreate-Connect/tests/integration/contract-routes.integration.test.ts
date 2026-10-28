/**
 * Every route of the registry against the live stack: unauthenticated calls, invalid input, a
 * seeded happy path that must match the registered response schema exactly, and the statuses
 * the generated documentation promises.
 */
import { isDeepStrictEqual } from 'node:util';
import { beforeAll, describe, expect, it } from 'vitest';
import { ApiErrorSchema, ROUTES, type RouteDef } from '../../packages/contracts/src/index.js';
import { standardErrorStatuses } from '../../packages/contracts/src/openapi/generate.js';
import { FIXTURES, type Seed } from './contract-fixtures.js';
import { baseId, concretePath, invalidQuery, validSample } from './contract-samples.js';
import { callApi } from './org-fixture.js';
import { createSignedInUser, workloadHeaders } from './signed-in-user.js';
import { apiUrl, webUrl } from './test-env.js';

const SESSION_COOKIE = '__Host-sid';
const CSRF_COOKIE = '__Host-csrf';

/** Routes that need a live OAuth provider or a stored archive, covered by their own suites. */
const COVERED_ELSEWHERE = new Set([
  'mcpServers.oauthStart.org',
  'mcpServers.oauthStart.user',
  'mcpServers.oauthCallback',
  'projectConnections.start',
  'sessionConnections.start',
  'pluginVersions.archive',
  'sync.component',
]);

const apiRoutes = ROUTES.filter((route) => route.app === 'api' || route.app === 'all');
const sessionRoutes = apiRoutes.filter(
  (route) => route.principals.includes('session') && !route.principals.includes('none'),
);
const bffRoutes = ROUTES.filter((route) => route.exposure === 'bff');

function documentedStatuses(route: RouteDef): Set<number> {
  return new Set([...Object.keys(route.responses).map(Number), ...standardErrorStatuses(route)]);
}

function directHeaders(withBody: boolean): Record<string, string> {
  const { 'Content-Type': contentType, ...identity } = workloadHeaders;
  return { ...identity, ...(withBody ? { 'Content-Type': contentType } : {}) };
}

async function expectApiError(res: Response, status: number) {
  expect(res.status).toBe(status);
  const body: unknown = await res.json();
  const parsed = ApiErrorSchema.parse(body);
  expect(res.headers.get('x-request-id')).toBe(parsed.error.requestId);
  return parsed.error;
}

let seed: Seed;
let csrfToken = '';
let csrfCookie = '';

beforeAll(async () => {
  seed = { owner: await createSignedInUser('contract-owner') };
  const res = await fetch(`${webUrl}/api/csrf`);
  csrfToken = ((await res.json()) as { csrfToken: string }).csrfToken;
  csrfCookie =
    res.headers
      .getSetCookie()
      .map((line) => line.split(';')[0])
      .find((pair) => pair?.startsWith(`${CSRF_COOKIE}=`)) ?? '';
}, 120_000);

function bff(
  route: RouteDef,
  options: { body?: unknown; query?: string; session?: boolean } = {},
): Promise<Response> {
  const method = route.method;
  const headers: Record<string, string> = {
    cookie: [options.session ? `${SESSION_COOKIE}=contract-session` : '', csrfCookie]
      .filter(Boolean)
      .join('; '),
    'x-csrf-token': csrfToken,
  };
  if (options.body !== undefined) headers['content-type'] = 'application/json';
  const query = options.query ? `?${options.query}` : '';
  return fetch(`${webUrl}/api${concretePath(route.pathTemplate)}${query}`, {
    method,
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });
}

describe('route registry against the live stack', () => {
  it('has a fixture for every api route and none for a route that does not exist', () => {
    const ids = new Set(apiRoutes.map((route) => route.id));
    const missing = [...ids].filter((id) => !(id in FIXTURES) && !COVERED_ELSEWHERE.has(id));
    expect(missing, 'routes without a happy-path fixture').toEqual([]);
    const stale = Object.keys(FIXTURES).filter((id) => !ids.has(id));
    expect(stale, 'fixtures for routes that are not in the registry').toEqual([]);
  });

  it('has a valid sample for every session route with a body or a required query', () => {
    const problems: string[] = [];
    for (const route of sessionRoutes) {
      const sample = validSample(route);
      if (route.body && sample?.body === undefined) problems.push(`${route.id}: no sample body`);
      if (route.body && sample?.body !== undefined && !route.body.safeParse(sample.body).success) {
        problems.push(`${route.id}: sample body does not validate`);
      }
      if (route.query) {
        const query = Object.fromEntries(new URLSearchParams(sample?.query ?? ''));
        const parsed = route.query.safeParse(query);
        const required = route.query.safeParse({}).success === false;
        if (required && !parsed.success)
          problems.push(`${route.id}: sample query does not validate`);
        if (invalidQuery(route) === null) problems.push(`${route.id}: no invalid query known`);
      }
    }
    expect(problems).toEqual([]);
  });

  describe('a call without a session', () => {
    it('answers 401 with the error envelope on every session route of the api', async () => {
      const problems: string[] = [];
      for (const route of sessionRoutes) {
        const sample = validSample(route);
        const query = sample?.query ? `?${sample.query}` : '';
        const res = await fetch(`${apiUrl}${concretePath(route.pathTemplate)}${query}`, {
          method: route.method,
          headers: {
            ...directHeaders(sample?.body !== undefined),
            'idempotency-key': 'contract-no-session',
          },
          ...(sample?.body !== undefined ? { body: JSON.stringify(sample.body) } : {}),
        });
        try {
          if (route.id === 'auth.signout') {
            // Signing out without a session is not an error: there is nothing to end.
            if (res.status !== 204) problems.push(`${route.id}: answered ${res.status}`);
            continue;
          }
          const error = await expectApiError(res, 401);
          expect(error.code).toBe('unauthenticated');
          expect(documentedStatuses(route).has(401)).toBe(true);
        } catch (err) {
          problems.push(`${route.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      expect(problems).toEqual([]);
    }, 120_000);

    it('answers 401 through the web backend on every browser-facing session route', async () => {
      const problems: string[] = [];
      for (const route of bffRoutes.filter(
        (entry) => entry.principals.includes('session') && !entry.principals.includes('none'),
      )) {
        try {
          await expectApiError(await bff(route), 401);
        } catch (err) {
          problems.push(`${route.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      expect(problems).toEqual([]);
    }, 120_000);
  });

  describe('a call with invalid input', () => {
    const withInput = bffRoutes.filter((route) => route.body || route.query);

    it('is refused by the web backend with validation_failed and details', async () => {
      const problems: string[] = [];
      for (const route of withInput) {
        const options = route.body
          ? { body: [] as unknown, session: true }
          : { query: invalidQuery(route) ?? '', session: true };
        try {
          const res = await bff(route, options);
          const error = await expectApiError(res, 400);
          expect(error.code).toBe('validation_failed');
          expect(error.details?.length ?? 0).toBeGreaterThan(0);
          expect(documentedStatuses(route).has(400)).toBe(true);
        } catch (err) {
          problems.push(`${route.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      expect(problems).toEqual([]);
    }, 120_000);

    it('is refused by the api with validation_failed and details', async () => {
      const problems: string[] = [];
      for (const route of withInput.filter((entry) => entry.app === 'api')) {
        const hasBody = Boolean(route.body);
        const query = hasBody ? '' : `?${invalidQuery(route) ?? ''}`;
        const known = { orgId: seed.owner.orgId };
        try {
          const res = await fetch(`${apiUrl}${concretePath(route.pathTemplate, known)}${query}`, {
            method: route.method,
            headers: {
              ...directHeaders(hasBody),
              'x-session-token': seed.owner.sessionToken,
              'idempotency-key': 'contract-invalid-input',
            },
            ...(hasBody ? { body: '[]' } : {}),
          });
          const error = await expectApiError(res, 400);
          expect(error.code).toBe('validation_failed');
        } catch (err) {
          problems.push(`${route.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      expect(problems).toEqual([]);
    }, 120_000);
  });

  describe('a seeded happy path', () => {
    it('answers with a registered status and exactly the registered response shape', async () => {
      const problems: string[] = [];
      const queue = apiRoutes.filter((route) => route.id in FIXTURES);
      const run = async (route: RouteDef): Promise<void> => {
        const fixture = FIXTURES[route.id];
        if (!fixture) return;
        try {
          const res = await fixture(seed);
          const text = await res.text();
          const schema = route.responses[res.status];
          if (!schema || res.status >= 400) {
            problems.push(`${route.id}: answered ${res.status} ${text.slice(0, 200)}`);
            return;
          }
          if (!res.headers.get('x-request-id')) problems.push(`${route.id}: no X-Request-Id`);
          const value: unknown = text.length > 0 ? safeJson(text) : undefined;
          const parsed = schema.safeParse(value);
          if (!parsed.success) {
            problems.push(`${route.id}: ${parsed.error.message.slice(0, 300)}`);
          } else if (!isDeepStrictEqual(parsed.data, value)) {
            problems.push(`${route.id}: the response has fields the schema does not describe`);
          }
        } catch (err) {
          problems.push(`${route.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      };
      // A few at a time: each fixture signs users up and waits for mail.
      const workers = Array.from({ length: 6 }, async () => {
        for (let route = queue.shift(); route; route = queue.shift()) await run(route);
      });
      await Promise.all(workers);
      expect(problems).toEqual([]);
    }, 600_000);

    it('serves the CSRF token route with its registered shape', async () => {
      const route = ROUTES.find((entry) => entry.id === 'csrf.get') as RouteDef;
      const res = await fetch(`${webUrl}/api/csrf`);
      expect(res.status).toBe(200);
      const value: unknown = await res.json();
      expect(route.responses[200]?.parse(value)).toEqual(value);
    });
  });

  describe('the documented statuses', () => {
    it('cover the error a refused call answered', async () => {
      // A call for an id that does not exist is the usual 404; it must be documented.
      const route = ROUTES.find((entry) => entry.id === 'orgs.get') as RouteDef;
      const res = await callApi('GET', concretePath(route.pathTemplate), seed.owner);
      const error = await expectApiError(res, 404);
      expect(error.code).toBe('not_found');
      expect(documentedStatuses(route).has(404)).toBe(true);
    });

    it('list an error status for every route that can fail on its input', () => {
      const without = ROUTES.filter(
        (entry) =>
          (entry.body || entry.query || entry.params) && !documentedStatuses(entry).has(400),
      ).map(baseId);
      expect(without).toEqual([]);
    });
  });
});

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
