/**
 * renderWithRouter — renders a component inside a minimal TanStack Router + QueryClient.
 * Awaits router.load() so the initial route is resolved before assertions run.
 *
 * All extra routes share the same root as the main route, so links between
 * them work correctly.
 */
import { act } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  createMemoryHistory,
} from '@tanstack/react-router';

import { withDerivedOrgMe } from './org-me';

export interface ExtraRoute {
  path: string;
  component: React.FC;
}

export interface RenderRouterOptions {
  /** Extra sibling routes (e.g. redirect targets like /signin, /dashboard) */
  extraRoutes?: ExtraRoute[];
  /** Pre-populated query cache entries */
  queryData?: Array<{ key: unknown[]; data: unknown }>;
  /**
   * Override the initial navigation URL when the route path contains
   * dynamic segments (e.g. path='/orgs/$orgId/members', url='/orgs/o1/members').
   * Defaults to `path` when omitted.
   */
  url?: string;
}

export async function renderWithRouter(
  component: React.FC,
  path: string,
  opts: RenderRouterOptions = {},
) {
  const root = createRootRoute();
  const mainRoute = createRoute({ getParentRoute: () => root, path, component });
  const siblings = (opts.extraRoutes ?? []).map((r) =>
    createRoute({ getParentRoute: () => root, path: r.path, component: r.component }),
  );
  const tree = root.addChildren([mainRoute, ...siblings]);
  const navPath = opts.url ?? path;
  const pathname = navPath.split('?')[0]!;
  const history = createMemoryHistory({ initialEntries: [pathname] });
  const router = createRouter({ routeTree: tree, history });

  const qc = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity, gcTime: Infinity },
      mutations: { retry: false },
    },
  });
  // Pre-populate cache. Use prefetchQuery with staleTime: Infinity so the
  // query is marked as fresh and won't trigger a background refetch on render.
  for (const { key, data } of withDerivedOrgMe(opts.queryData ?? [])) {
    await qc.prefetchQuery({
      queryKey: key as readonly unknown[],
      queryFn: () => Promise.resolve(data),
      staleTime: Infinity,
    });
  }

  // Navigate to the full path (including search) after load
  await router.load();
  if (navPath.includes('?')) {
    await router.navigate({
      to: navPath.split('?')[0]!,
      search: Object.fromEntries(new URLSearchParams(navPath.split('?')[1])),
    });
  }

  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(
      <QueryClientProvider client={qc}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    );
  });

  return { ...result, router, qc };
}
