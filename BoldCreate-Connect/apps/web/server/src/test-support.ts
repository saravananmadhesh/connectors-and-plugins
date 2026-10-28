import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { createWorkloadHeaders, type HttpServer } from '@boldcreate-integrations/http-server';
import { buildApp } from './app.js';
import { loadWebConfig, type WebConfig } from './config.js';

export const USER = {
  id: 'usr_11111111111141118111111111111111',
  email: 'a@example.com',
  displayName: 'Ada',
  emailVerifiedAt: '2026-01-01T00:00:00.000Z',
  status: 'active',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export interface UpstreamCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | undefined;
}

export type UpstreamReply =
  | { status: number; body?: unknown; raw?: string; headers?: Record<string, string> }
  | 'throw';

export interface TestWeb {
  server: HttpServer;
  calls: UpstreamCall[];
  /** The next upstream answers; stays in force until replaced. */
  reply: (value: UpstreamReply | ((call: UpstreamCall) => UpstreamReply)) => void;
  config: WebConfig;
}

export const BASE_ENV = {
  NODE_ENV: 'test',
  DEPLOY_ENV: 'test',
  COOKIE_SECRET: 'cookie-secret-value-for-tests-0001',
  CSRF_SECRET: 'csrf-secret-value-for-tests-00001',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests-1',
  API_BASE_URL: 'http://api.test',
};

export async function buildTestWeb(env: Record<string, string> = {}): Promise<TestWeb> {
  const config = loadWebConfig({ ...BASE_ENV, ...env });
  const calls: UpstreamCall[] = [];
  let current: UpstreamReply | ((call: UpstreamCall) => UpstreamReply) = { status: 200, body: {} };
  const fakeFetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const call: UpstreamCall = {
      url: String(url),
      method: init?.method ?? 'GET',
      headers: Object.fromEntries(Object.entries((init?.headers ?? {}) as Record<string, string>)),
      body: typeof init?.body === 'string' ? init.body : undefined,
    };
    calls.push(call);
    const answer = typeof current === 'function' ? current(call) : current;
    if (answer === 'throw') throw new Error('connection refused');
    return new Response(
      answer.raw ?? (answer.body === undefined ? null : JSON.stringify(answer.body)),
      {
        status: answer.status,
        headers: { 'content-type': 'application/json', ...answer.headers },
      },
    );
  }) as typeof fetch;
  const server = await buildApp(config, {
    logger: createLogger({ service: 'web', level: 'silent' }),
    metrics: createMetrics({ service: 'web' }),
    workloadHeaders: createWorkloadHeaders({
      callerId: 'web',
      audience: 'api',
      mode: 'shared_secret',
      secret: config.WORKLOAD_SECRET,
    }),
    fetch: fakeFetch,
  });
  return {
    server,
    calls,
    config,
    reply: (value) => {
      current = value;
    },
  };
}

/** A cookie header value from the `set-cookie` headers of earlier responses. */
export function cookieHeader(setCookie: string | string[] | undefined): string {
  const list = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : [];
  return list.map((entry) => entry.split(';')[0]).join('; ');
}

/** Gets a CSRF token and returns the headers a browser would send with a write. */
export async function csrfHeaders(
  web: TestWeb,
  extraCookies = '',
): Promise<Record<string, string>> {
  const res = await web.server.app.inject({ method: 'GET', url: '/api/csrf' });
  const { csrfToken } = res.json() as { csrfToken: string };
  const cookies = [cookieHeader(res.headers['set-cookie']), extraCookies]
    .filter((part) => part.length > 0)
    .join('; ');
  return { 'x-csrf-token': csrfToken, cookie: cookies };
}
