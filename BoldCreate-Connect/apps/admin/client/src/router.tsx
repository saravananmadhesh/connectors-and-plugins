import type { QueryClient } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  type RouterHistory,
} from '@tanstack/react-router';
import { AppLayout } from './layouts/AppLayout';
import { adminApi } from './lib/api';
import {
  parseAuditSearch,
  parseDiscoverSearch,
  parseObservabilitySearch,
  parsePluginSearch,
  parsePluginsSearch,
  parseVersionSearch,
} from './lib/search';
import { SESSION_KEY } from './lib/session';
import { AuditPage } from './pages/AuditPage';
import { AllowedEmailsPage } from './pages/AllowedEmailsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ErrorDetailPage } from './pages/ErrorDetailPage';
import { HomePage } from './pages/HomePage';
import { ObservabilityPage } from './pages/ObservabilityPage';
import { PluginDetailPage } from './pages/PluginDetailPage';
import { PluginsPage } from './pages/PluginsPage';
import { SetupPage } from './pages/SetupPage';
import { SignInPage } from './pages/SignInPage';
import { VersionPage } from './pages/VersionPage';

export function createAdminRouter(queryClient: QueryClient, history?: RouterHistory) {
  const root = createRootRoute({ component: Outlet });

  // Pages behind sign-in need a session; anything else goes to the sign-in page.
  const requireSession = async () => {
    try {
      await queryClient.fetchQuery({
        queryKey: SESSION_KEY,
        queryFn: adminApi.session,
        staleTime: 30_000,
      });
    } catch {
      // oxlint-disable-next-line only-throw-error
      throw redirect({ to: '/signin' });
    }
  };

  // Everything behind sign-in shares one frame with the sidebar.
  const app = createRoute({
    getParentRoute: () => root,
    id: 'app',
    component: AppLayout,
    beforeLoad: requireSession,
  });
  const home = createRoute({
    getParentRoute: () => app,
    path: '/',
    component: HomePage,
  });
  const discover = createRoute({
    getParentRoute: () => app,
    path: '/discover',
    component: DiscoverPage,
    validateSearch: parseDiscoverSearch,
  });
  const review = createRoute({
    getParentRoute: () => app,
    path: '/review',
    beforeLoad: () => {
      // oxlint-disable-next-line only-throw-error
      throw redirect({ to: '/plugins', search: { stage: 'needs_review' } });
    },
  });
  const plugins = createRoute({
    getParentRoute: () => app,
    path: '/plugins',
    component: PluginsPage,
    validateSearch: parsePluginsSearch,
  });
  const pluginDetail = createRoute({
    getParentRoute: () => app,
    path: '/plugins/$pluginId',
    component: PluginDetailPage,
    validateSearch: parsePluginSearch,
  });
  const versionDetail = createRoute({
    getParentRoute: () => app,
    path: '/plugins/$pluginId/versions/$versionId',
    component: VersionPage,
    validateSearch: parseVersionSearch,
  });
  const categories = createRoute({
    getParentRoute: () => app,
    path: '/categories',
    component: CategoriesPage,
  });
  const allowedEmails = createRoute({
    getParentRoute: () => app,
    path: '/allowed-users',
    component: AllowedEmailsPage,
  });
  const audit = createRoute({
    getParentRoute: () => app,
    path: '/audit',
    component: AuditPage,
    validateSearch: parseAuditSearch,
  });
  const observability = createRoute({
    getParentRoute: () => app,
    path: '/observability',
    component: ObservabilityPage,
    validateSearch: parseObservabilitySearch,
  });
  const errorDetail = createRoute({
    getParentRoute: () => app,
    path: '/observability/errors/$groupId',
    component: ErrorDetailPage,
  });
  const signin = createRoute({
    getParentRoute: () => root,
    path: '/signin',
    component: SignInPage,
  });
  const setup = createRoute({
    getParentRoute: () => root,
    path: '/setup',
    component: SetupPage,
    validateSearch: (search: Record<string, unknown>): { token?: string } =>
      typeof search['token'] === 'string' ? { token: search['token'] } : {},
  });

  return createRouter({
    defaultPreload: 'intent',
    routeTree: root.addChildren([
      app.addChildren([
        home,
        discover,
        review,
        plugins,
        pluginDetail,
        versionDetail,
        categories,
        allowedEmails,
        observability,
        errorDetail,
        audit,
      ]),
      signin,
      setup,
    ]),
    ...(history ? { history } : {}),
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAdminRouter>;
  }
}
