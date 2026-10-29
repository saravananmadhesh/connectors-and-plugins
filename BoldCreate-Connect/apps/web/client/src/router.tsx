/**
 * TanStack Router — code-based route tree.
 * No re-render on navigation: Router uses structural sharing so unchanged
 * query results and component state are preserved across route transitions.
 */
import { createRouter, createRootRoute, createRoute, redirect } from '@tanstack/react-router';
import { queryClient } from './query-client';
import { auth, orgs } from './lib/api';
import { qk } from './lib/query-keys';
import { readActiveOrg, resolveActiveOrg } from './lib/active-org';
import { validateInstalledSearch } from './lib/installed-search';
import { validateMarketplaceSearch } from './lib/marketplace-search';
import { PROJECT_TABS, validateProjectSearch } from './lib/project-search';

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
import { AcceptInvitePage } from './pages/auth/AcceptInvitePage';

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
    // Already signed in: the home address picks the organization
    throw redirect({ to: '/orgs' });
  } catch (err) {
    if (err instanceof Response || (err as { _isRedirect?: boolean })._isRedirect) throw err;
    // Not signed in — allow through
  }
}

/** The organization a bare address opens: the last one used when it is still there, else the first. */
async function homeOrgId(): Promise<string | undefined> {
  const me = await queryClient.fetchQuery({
    queryKey: qk.me(),
    queryFn: () => auth.me(),
    staleTime: 30_000,
  });
  return resolveActiveOrg(
    {},
    readActiveOrg(),
    me.memberships.map((m) => m.organizationId),
  ).orgId;
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

// The invite link works signed in or out, so it sits outside the guest guard.
const inviteLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'invite',
  component: AuthLayout,
});

const acceptInviteRoute = createRoute({
  getParentRoute: () => inviteLayoutRoute,
  path: '/accept-invite',
  validateSearch: (search: Record<string, unknown>): { token?: string } =>
    typeof search.token === 'string' && search.token ? { token: search.token } : {},
  component: AcceptInvitePage,
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

const projectLoader = async (orgId: string) => {
  await Promise.all([
    ensureMe(),
    queryClient.ensureQueryData({
      queryKey: qk.org(orgId),
      queryFn: () => orgs.get(orgId),
    }),
  ]);
};

const projectRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/projects/$projectId',
  validateSearch: validateProjectSearch,
  // An address from before the sections had paths of their own (`?tab=users`) goes to the new one.
  beforeLoad: ({ params, search }) => {
    if (search.tab) {
      throw redirect({
        to: '/orgs/$orgId/projects/$projectId/$tab',
        params: { ...params, tab: search.tab },
        replace: true,
      });
    }
  },
  loader: ({ params }) => projectLoader(params.orgId),
  component: ProjectPage,
});

// A section of a project has a path of its own; the overview is the project's own address.
const projectTabRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/projects/$projectId/$tab',
  beforeLoad: ({ params }) => {
    const known = PROJECT_TABS.some((item) => item.value === params.tab);
    if (!known || params.tab === 'overview') {
      throw redirect({
        to: '/orgs/$orgId/projects/$projectId',
        params: { orgId: params.orgId, projectId: params.projectId },
        replace: true,
      });
    }
  },
  loader: ({ params }) => projectLoader(params.orgId),
  component: ProjectPage,
});

const getStartedRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/get-started',
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
  path: '/orgs/$orgId/api-keys',
  loader: ensureMe,
  component: ApiKeysPage,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/marketplace',
  validateSearch: validateMarketplaceSearch,
  component: MarketplacePage,
});

const pluginDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/marketplace/$pluginId',
  component: PluginDetailPage,
});

const installedRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs/$orgId/installed',
  validateSearch: validateInstalledSearch,
  component: InstalledPage,
});

// The home address: opens an organization, or, for someone in none, says what to do next.
const homeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/orgs',
  beforeLoad: async () => {
    const orgId = await homeOrgId();
    if (orgId) throw redirect({ to: '/orgs/$orgId/marketplace', params: { orgId } });
  },
  component: () => null,
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/orgs' });
  },
});

// The dashboard is gone; old links land on the home address instead of Not Found.
const dashboardRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    throw redirect({ to: '/orgs' });
  },
});

// Addresses from before the organization was part of them (bookmarks, mailed links, history) open
// the same page of the organization the person last used.
async function legacyOrgId(): Promise<string> {
  await requireAuth();
  const orgId = await homeOrgId();
  if (!orgId) throw redirect({ to: '/orgs' });
  return orgId;
}

const legacySearch = (location: { search: unknown }) => (location.search ?? {}) as never;

const legacyMarketplaceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace',
  beforeLoad: async ({ location }) => {
    const orgId = await legacyOrgId();
    throw redirect({
      to: '/orgs/$orgId/marketplace',
      params: { orgId },
      search: legacySearch(location),
    });
  },
});

const legacyPluginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marketplace/$pluginId',
  beforeLoad: async ({ params }) => {
    const orgId = await legacyOrgId();
    throw redirect({
      to: '/orgs/$orgId/marketplace/$pluginId',
      params: { orgId, pluginId: params.pluginId },
    });
  },
});

const legacyInstalledRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/installed',
  beforeLoad: async ({ location }) => {
    const orgId = await legacyOrgId();
    throw redirect({
      to: '/orgs/$orgId/installed',
      params: { orgId },
      search: legacySearch(location),
    });
  },
});

const legacyGetStartedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/get-started',
  beforeLoad: async () => {
    throw redirect({ to: '/orgs/$orgId/get-started', params: { orgId: await legacyOrgId() } });
  },
});

const legacyApiKeysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/api-keys',
  beforeLoad: async () => {
    throw redirect({ to: '/orgs/$orgId/api-keys', params: { orgId: await legacyOrgId() } });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRedirectRoute,
  legacyMarketplaceRoute,
  legacyPluginRoute,
  legacyInstalledRoute,
  legacyGetStartedRoute,
  legacyApiKeysRoute,
  authRoute.addChildren([
    signupRoute,
    signinRoute,
    verifyEmailRoute,
    confirmEmailChangeRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
  ]),
  inviteLayoutRoute.addChildren([acceptInviteRoute]),
  appRoute.addChildren([
    homeRoute,
    orgRoute,
    orgMembersRoute,
    orgSettingsRoute,
    projectsRoute,
    projectRoute,
    projectTabRoute,
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
