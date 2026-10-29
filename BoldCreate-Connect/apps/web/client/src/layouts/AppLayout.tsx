import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams, useRouterState } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Cable,
  KeyRound,
  LayoutList,
  Plug,
  ShieldCheck,
  ScrollText,
  Timer,
  Layers,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Package,
  PackageCheck,
  Rocket,
  Settings,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { auth, projects } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { cn } from '@/lib/cn';
import { useAbilities } from '@/lib/abilities';
import { useActiveOrg } from '@/lib/active-org';
import { PROJECT_TABS, type ProjectTab } from '@/lib/project-search';
import { NoOrganization } from '@/components/NoOrganization';
import { areaDestination, availableAreas, inProject, pathArea, useArea } from '@/lib/area';
import { PERSONAL_GROUP, buildTrail, trailTitle } from '@/lib/scope';
import { PRODUCT } from '@/lib/product';
import { writeSetupFlag } from '@/lib/setup-progress';
import { Brand, BrandMark } from '@/components/Brand';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PAGE_GUTTER, PAGE_MAX_WIDTH } from '@/components/Page';
import { useSidebarCollapsed } from '@/lib/sidebar';
import { UserMenu } from '@/components/UserMenu';
import { AreaSwitcher } from '@/components/AreaSwitcher';
import { RouteNotFound } from '@/components/RouteFallbacks';
import { ScopeSwitcher } from '@/components/ScopeSwitcher';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/PageLoader';
import { Alert } from '@/components/ui/alert';

interface NavEntry {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Active only on this exact path, not on the pages beneath it. */
  exact?: boolean;
  /** A section of the open project, which has its own path. */
  tab?: ProjectTab;
}

const PROJECT_ICONS: Record<ProjectTab, LucideIcon> = {
  overview: LayoutDashboard,
  users: Users,
  sessions: Timer,
  plugins: Plug,
  'auth-configs': ShieldCheck,
  connections: Cable,
  catalog: LayoutList,
  logs: ScrollText,
  keys: KeyRound,
  settings: Settings,
};

function NavLink({
  entry,
  onNavigate,
  collapsed,
}: {
  entry: NavEntry;
  onNavigate: () => void;
  collapsed: boolean;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const active = entry.exact
    ? pathname === entry.to
    : pathname === entry.to || pathname.startsWith(`${entry.to}/`);
  return (
    <Link
      to={entry.to}
      activeOptions={{ exact: Boolean(entry.exact) }}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      aria-label={entry.label}
      title={collapsed ? entry.label : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 group-data-[collapsed=true]/sb:md:justify-center rounded-md px-2.5 py-1.5 text-sm text-sidebar-muted transition-colors outline-none hover:bg-sidebar-accent hover:text-sidebar-foreground',
        active && 'bg-sidebar-accent font-medium text-sidebar-foreground',
      )}
    >
      <entry.icon aria-hidden="true" className="size-4 group-data-[collapsed=true]/sb:md:size-5" />
      <span className="truncate group-data-[collapsed=true]/sb:md:hidden">{entry.label}</span>
    </Link>
  );
}

function NavGroup({
  label,
  entries,
  onNavigate,
  collapsed,
}: {
  label?: string | undefined;
  entries: NavEntry[];
  onNavigate: () => void;
  collapsed: boolean;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="mt-3 flex flex-col gap-0.5 first:mt-0">
      {label && (
        <p className="truncate px-2.5 pb-1 group-data-[collapsed=true]/sb:md:hidden text-[11px] font-medium tracking-wide text-sidebar-muted uppercase">
          {label}
        </p>
      )}
      {entries.map((entry) => (
        <NavLink
          key={entry.tab ?? entry.to}
          entry={entry}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
      ))}
    </div>
  );
}

/**
 * Frame for every page behind sign-in: one switcher for the organization, the pages that
 * follow that choice, the breadcrumb, and the signed-in user.
 */
export function AppLayout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [collapsed, toggleCollapsed] = useSidebarCollapsed();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const routeParams = useParams({ strict: false }) as { projectId?: string };
  const routeProjectId = routeParams.projectId;
  const { data, isPending, error, refetch } = useQuery({
    queryKey: qk.me(),
    queryFn: auth.me,
    refetchOnMount: (query) => (Array.isArray(query.state.data?.memberships) ? true : 'always'),
  });
  const memberships = Array.isArray(data?.memberships) ? data.memberships : [];
  const orgIds = memberships.map((m) => m.organizationId);

  // The organization comes from the address or the saved choice.
  const { orgId } = useActiveOrg(orgIds);
  const { me: orgMe, can } = useAbilities(orgId ?? '');
  // A viewer has no For You data and no settings: the server lists no ability for them, so the
  // entries are left out. Until the abilities have loaded nothing is hidden.
  const allowed = (action: string): boolean => orgMe === undefined || can(action);
  const canUseForYou = allowed('installation:list');
  const areas = availableAreas(canUseForYou);
  const area = useArea(areas);

  // Sign-in, verification and the home link all lead to For You pages. A viewer has none, so they
  // are taken to the Platform side of their organization instead of a dead end.
  const forYouClosed = pathArea(pathname) === 'for-you' && !canUseForYou && Boolean(orgId);
  useEffect(() => {
    if (forYouClosed) {
      void navigate({ to: areaDestination(pathname, 'platform', orgId), replace: true });
    }
  }, [forYouClosed, pathname, orgId, navigate]);

  const signoutMutation = useMutation({
    mutationFn: auth.signout,
    onSettled: async () => {
      // Leave the signed-in pages before the cache is cleared, or they refetch with a dead session.
      qc.removeQueries({ queryKey: qk.me() });
      await navigate({ to: '/signin' });
      qc.clear();
    },
  });

  const orgName = memberships.find((m) => m.organizationId === orgId)?.organizationName;
  // The project the address names shares its query with the page, so the name costs no request.
  const routeProject = useQuery({
    queryKey: qk.project(orgId ?? '', routeProjectId ?? ''),
    queryFn: () => projects.get(orgId ?? '', routeProjectId ?? ''),
    enabled: Boolean(orgId && routeProjectId),
  });
  const trail = buildTrail(pathname, {
    org: orgName,
    orgId,
    project: routeProject.data?.name,
  });
  const title = trailTitle(trail, PRODUCT.name);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Browsing the marketplace is a step of the Get started page that only a visit can confirm.
  useEffect(() => {
    if (orgId && pathname.startsWith(`/orgs/${orgId}/marketplace`))
      writeSetupFlag('browsed-marketplace', orgId, true);
  }, [orgId, pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (error) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6">
        <Alert variant="destructive" className="max-w-sm">
          Could not load your profile. Check your connection and try again.
        </Alert>
        <Button onClick={() => void refetch()}>Try again</Button>
      </div>
    );
  }

  if (isPending || !Array.isArray(data?.memberships)) {
    return <PageLoader label="Loading profile" />;
  }

  const orgBase = orgId ? `/orgs/${orgId}` : undefined;
  const close = () => setOpen(false);

  // Nothing in the sidebar leads anywhere without an organization; the page says what to do.
  const noOrganization = memberships.length === 0;
  const main: NavEntry[] =
    area === 'for-you' && canUseForYou && !noOrganization && orgBase
      ? [
          { to: `${orgBase}/get-started`, label: 'Get started', icon: Rocket },
          { to: `${orgBase}/marketplace`, label: 'Marketplace', icon: Package },
          { to: `${orgBase}/installed`, label: 'Installed', icon: PackageCheck },
          { to: `${orgBase}/api-keys`, label: 'API keys', icon: KeyRound },
        ]
      : [];
  // Inside a project its own tabs are the sections; the organization pages are one step up, so the
  // sidebar offers the way back instead of a third level of navigation, and nothing personal.
  const projectPage = inProject(pathname);
  const personalEntries: NavEntry[] = projectPage
    ? []
    : [{ to: '/profile', label: 'Profile', icon: UserRound }];
  const backEntries: NavEntry[] =
    orgBase && projectPage
      ? [{ to: `${orgBase}/projects`, label: 'All projects', icon: ArrowLeft, exact: true }]
      : [];
  const sectionEntries: NavEntry[] =
    orgBase && projectPage && routeProjectId
      ? PROJECT_TABS.filter(
          (item) =>
            (item.value !== 'keys' || allowed('project-key:read')) &&
            (item.value !== 'settings' || allowed('project-webhook:read')),
        ).map((item) => ({
          to: `${orgBase}/projects/${routeProjectId}${item.value === 'overview' ? '' : `/${item.value}`}`,
          exact: true,
          label: item.label,
          icon: PROJECT_ICONS[item.value],
          tab: item.value,
        }))
      : [];
  const orgEntries: NavEntry[] =
    orgBase && !projectPage
      ? [
          // The overview is about running the organization; For You is about using plugins.
          ...(area === 'platform'
            ? [{ to: orgBase, label: 'Overview', icon: LayoutDashboard, exact: true }]
            : []),
          ...(allowed('project:read') && area === 'platform'
            ? [
                {
                  to: `${orgBase}/projects`,
                  label: 'Projects',
                  icon: Layers,
                },
              ]
            : []),
          ...(allowed('member:list')
            ? [
                {
                  to: `${orgBase}/members`,
                  label: 'Members',
                  icon: Users,
                },
              ]
            : []),
          ...(can('org-policy:update')
            ? [
                {
                  to: `${orgBase}/settings`,
                  label: 'Settings',
                  icon: Settings,
                },
              ]
            : []),
        ]
      : [];

  return (
    <div className="flex min-h-dvh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <aside
        data-collapsed={collapsed}
        className={cn(
          'group/sb w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:flex md:h-dvh',
          collapsed && 'md:w-16',
          open
            ? 'fixed inset-y-0 left-0 z-40 flex w-[min(16rem,85vw)] shadow-lg md:static md:w-64 md:shadow-none'
            : 'hidden',
        )}
      >
        <div className="flex items-start">
          <Link
            to="/orgs"
            onClick={close}
            aria-label={`${PRODUCT.name} by ${PRODUCT.maker}`}
            className={cn(
              'block min-w-0 flex-1',
              collapsed && 'md:hidden',
              'px-5 pt-5 pb-4 outline-none focus-visible:ring-2 focus-visible:ring-ring',
            )}
          >
            <Brand />
          </Link>
          {collapsed ? (
            <button
              type="button"
              aria-label="Expand sidebar"
              title="Expand sidebar"
              aria-expanded={false}
              onClick={toggleCollapsed}
              className="group/expand mx-auto my-3 hidden size-10 place-items-center rounded-md text-sidebar-foreground outline-none hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring md:grid"
            >
              <BrandMark className="size-8 group-hover/expand:hidden group-focus-visible/expand:hidden" />
              <PanelLeftOpen
                aria-hidden="true"
                className="hidden size-4 group-hover/expand:block group-focus-visible/expand:block"
              />
            </button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              aria-expanded
              onClick={toggleCollapsed}
              className="mt-[22px] mr-3 hidden size-8 shrink-0 text-sidebar-muted md:inline-flex"
            >
              <PanelLeftClose className="size-4" />
            </Button>
          )}
        </div>
        {areas.length > 1 && (
          <div className="px-3 pb-3">
            <AreaSwitcher areas={areas} area={area} orgId={orgId} />
          </div>
        )}
        <nav
          aria-label="Main"
          className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto px-3 pb-3"
        >
          <NavGroup entries={main} onNavigate={close} collapsed={collapsed} />
          <NavGroup entries={backEntries} onNavigate={close} collapsed={collapsed} />
          <NavGroup
            label="Project"
            entries={sectionEntries}
            onNavigate={close}
            collapsed={collapsed}
          />
          <NavGroup
            label="Organization"
            entries={orgEntries}
            onNavigate={close}
            collapsed={collapsed}
          />
          <NavGroup
            label={PERSONAL_GROUP}
            entries={personalEntries}
            onNavigate={close}
            collapsed={collapsed}
          />
        </nav>
        <div className="flex flex-col gap-2 border-t border-sidebar-border p-3">
          <ScopeSwitcher
            memberships={memberships}
            orgId={orgId}
            paletteOpen={paletteOpen}
            onPaletteOpenChange={setPaletteOpen}
          />
          <UserMenu
            displayName={data.user.displayName}
            email={data.user.email}
            signingOut={signoutMutation.isPending}
            collapsed={collapsed}
            onSignOut={() => signoutMutation.mutate()}
          />
        </div>
      </aside>
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex items-center gap-2 border-b bg-card px-4 py-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            <Menu />
          </Button>
          <Link
            to="/orgs"
            aria-label={`${PRODUCT.name} by ${PRODUCT.maker}`}
            className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BrandMark className="size-7" />
            <span className="brand-name">{PRODUCT.name}</span>
          </Link>
        </div>
        {/* One step is the page title again, so a breadcrumb starts at two. */}
        {trail.length > 1 && (
          <div className={cn('pt-4', PAGE_GUTTER)}>
            <div className={PAGE_MAX_WIDTH}>
              <Breadcrumbs trail={trail} />
            </div>
          </div>
        )}
        {/* Says what the pages are about, so a screen reader hears a switch of organization. */}
        <p role="status" className="sr-only">
          {orgName ? `Showing ${orgName}` : ''}
        </p>
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {noOrganization && pathname !== '/profile' ? (
            <NoOrganization />
          ) : pathArea(pathname) === 'for-you' && !canUseForYou ? (
            // Mid-redirect there is nothing to show; without an organization there is nowhere to go.
            forYouClosed ? null : (
              <RouteNotFound />
            )
          ) : (
            <div key={pathname} className="animate-page-in">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
