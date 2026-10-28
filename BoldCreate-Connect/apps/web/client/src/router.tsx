/**
 * TanStack Router — code-based route tree.
 * No re-render on navigation: Router uses structural sharing so unchanged
 * query results and component state are preserved across route transitions.
 */
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router';
import { queryClient } from './query-client';
import { auth, orgs } from './lib/api';
import { qk } from './lib/query-keys';
import { validateInstalledSearch } from './lib/installed-search';
import { validateMarketplaceSearch } from './lib/marketplace-search';
import { validateProjectSearch } from './lib/project-search';

// ── Layouts ───────────────────────────────────────────────────────────────────
import { RootLayout } from './layouts/RootLayout';
import { RoutePending } from './components/route-pending';
import { RouteError, RouteNotFound } from './components/RouteFallbacks';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

// ── Auth pages ────────────────────────────────────────────────────────────────
import { SignupPage } from './pages/auth/SignupPage';
import { SigninPage } from './pages/auth/SigninPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { ConfirmEmailChangePage } from './pages/auth/ConfirmEmailChangePage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// ── App pages ─────────────────────────────────────────────────────────────────
import { OrgPage } from './pages/app/OrgPage';
import { OrgMembersPage } from './pages/app/OrgMembersPage';
import { OrgSettingsPage } from './pages/app/OrgSettingsPage';
import { GetStartedPage } from './pages/app/GetStartedPage';
import { ProjectPage } from './pages/app/ProjectPage';
import { ProjectsPage } from './pages/app/ProjectsPage';
import { ProfilePage } from './pages/app/ProfilePage';
import { MarketplacePage } from './pages/app/MarketplacePage';
import { PluginDetailPage } from './pages/app/PluginDetailPage';
import { InstalledPage } from './pages/app/InstalledPage';
import { ApiKeysPage } from './pages/app/ApiKeysPage';

// ── Helper: ensure authenticated ─────────────────────────────────────────────

async function requireAuth() {
  try {
    await queryClient.fetchQuery({
      queryKey: qk.me(),
      queryFn: () => auth.me(),
      staleTime: 30_000,
    });
  } catch {
    throw redirect({ to: '/signin' });
  }
}

async function requireGuest() {
  try {
    await queryClient.fetchQuery({
      queryKey: qk.me(),
      queryFn: () => auth.me(),
      staleTime: 30_000,
    });
    // Already signed in — go to the marketplace, the home screen
    throw redirect({ to: '/marketplace' });
  } catch (err) {
    if (err instanceof Response || (err as { _isRedirect?: boolean })._isRedirect) throw err;
    // Not signed in — allow through
  }
}

const ensureMe = () => queryClient.ensureQueryData({ queryKey: qk.me(), queryFn: auth.me });

// ── Route tree ────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootLayout });

// Auth group
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
  beforeLoad: requireGuest,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  component: SignupPage,
});

const signinRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signin',
  component: SigninPage,
});

const verifyEmailRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/verify-email',
  component: VerifyEmailPage,
});

const confirmEmailChangeRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/confirm-email-change',
  component: ConfirmEmailChangePage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/forgot-password',
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/reset-password',
  component: ResetPasswordPage,
});

// App group (requires auth)
const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
  beforeLoad: requireAuth,
});

const orgRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId',
  loader: async ({ params }) => {
    await Promise.all([
      ensureMe(),
      queryClient.ensureQueryData({
        queryKey: qk.org(params.orgId),
        queryFn: () => orgs.get(params.orgId),
      }),
    ]);
  },
  component: OrgPage,
});

const orgMembersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/members',
  loader: async ({ params }) => {
    await Promise.all([
      ensureMe(),
      queryClient.ensureQueryData({
        queryKey: qk.orgMembers(params.orgId),
        queryFn: () => orgs.listMembers(params.orgId),
      }),
    ]);
  },
  component: OrgMembersPage,
});

const orgSettingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/settings',
  loader: async ({ params }) => {
    await Promise.all([
      ensureMe(),
      queryClient.ensureQueryData({
        queryKey: qk.orgPolicy(params.orgId),
        queryFn: () => orgs.getPolicy(params.orgId),
      }),
    ]);
  },
  component: OrgSettingsPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/projects',
  loader: async ({ params }) => {
    await Promise.all([
      ensureMe(),
      queryClient.ensureQueryData({
        queryKey: qk.org(params.orgId),
        queryFn: () => orgs.get(params.orgId),
      }),
    ]);
  },
  component: ProjectsPage,
});

const projectRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/projects/$projectId',
  validateSearch: validateProjectSearch,
  loader: async ({ params }) => {
    await Promise.all([
      ensureMe(),
      queryClient.ensureQueryData({
        queryKey: qk.org(params.orgId),
        queryFn: () => orgs.get(params.orgId),
      }),
    ]);
  },
  component: ProjectPage,
});

const getStartedRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/get-started',
  loader: ensureMe,
  component: GetStartedPage,
});

const profileRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/profile',
  loader: ensureMe,
  component: ProfilePage,
});

const apiKeysRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/api-keys',
  loader: ensureMe,
  component: ApiKeysPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/marketplace',
  validateSearch: validateMarketplaceSearch,
  component: MarketplacePage,
});

const pluginDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/marketplace/$pluginId',
  component: PluginDetailPage,
});

const installedRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/installed',
  validateSearch: validateInstalledSearch,
  component: InstalledPage,
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/marketplace' });
  },
});

// The dashboard is gone; old links land on the marketplace instead of Not Found.
const dashboardRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    throw redirect({ to: '/marketplace' });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRedirectRoute,
  authRoute.addChildren([
    signupRoute,
    signinRoute,
    verifyEmailRoute,
    confirmEmailChangeRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
  ]),
  appRoute.addChildren([
    orgRoute,
    orgMembersRoute,
    orgSettingsRoute,
    projectsRoute,
    projectRoute,
    getStartedRoute,
    profileRoute,
    apiKeysRoute,
    marketplaceRoute,
    pluginDetailRoute,
    installedRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: RoutePending,
  defaultPendingMinMs: 150,
  defaultNotFoundComponent: RouteNotFound,
  defaultErrorComponent: RouteError,
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
