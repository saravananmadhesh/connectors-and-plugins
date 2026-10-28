/** Test helper: renders the whole admin app on an in-memory URL against a fake `fetch`. */
import { act } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router';
import { vi } from 'vitest';
import type { AdminAuditListResponse, AdminStatsResponse } from '../lib/api';
import { createAdminRouter } from '../router';
import { EMPTY_STATS } from './stats';

const EMPTY_AUDIT: AdminAuditListResponse = { items: [], nextCursor: null };

export type FakeReply = { status: number; body?: unknown };
export type FakeApi = (method: string, path: string, body: unknown) => FakeReply;

/**
 * Replaces `fetch`; `/api/csrf` and the dashboard statistics are answered here (an empty catalog
 * unless `stats` is given; `null` hands them to `api` too) and every other call goes to `api`.
 * The audit log is answered here too, empty unless `audit` is given (`null` hands it to `api`),
 * since the dashboard asks for it on the way.
 */
export function stubApi(
  api: FakeApi,
  stats: AdminStatsResponse | null = EMPTY_STATS,
  audit: AdminAuditListResponse | null = EMPTY_AUDIT,
) {
  const calls: { method: string; path: string; body: unknown }[] = [];
  vi.stubGlobal(
    'fetch',
    vi.fn((path: string, init?: RequestInit) => {
      const method = init?.method ?? 'GET';
      if (path === '/api/csrf') {
        return Promise.resolve(Response.json({ csrfToken: 'csrf-token' }));
      }
      const body = typeof init?.body === 'string' ? (JSON.parse(init.body) as unknown) : undefined;
      calls.push({ method, path, body });
      const reply: FakeReply =
        stats && path.startsWith('/api/v1/admin/stats')
          ? { status: 200, body: stats }
          : audit && path.startsWith('/api/v1/admin/audit')
            ? { status: 200, body: audit }
            : api(method, path, body);
      if (reply.body === undefined)
        return Promise.resolve(new Response(null, { status: reply.status }));
      return Promise.resolve(Response.json(reply.body, { status: reply.status }));
    }),
  );
  return calls;
}

export const ERROR = (code: string, status: number): FakeReply => ({
  status,
  body: { error: { code, message: code, requestId: 'r' } },
});

export async function renderApp(url: string) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const router = createAdminRouter(queryClient, createMemoryHistory({ initialEntries: [url] }));
  await router.load();
  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
  });
  return { ...result, router, queryClient };
}
