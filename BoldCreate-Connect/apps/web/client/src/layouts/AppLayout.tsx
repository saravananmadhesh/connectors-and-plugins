import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
  useRouterState,
  useSearch,
} from '@tanstack/react-router';
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
import { PROJECT_TABS, type ProjectSearch, type ProjectTab } from '@/lib/project-search';
import { availableAreas, inProject, pathArea, useArea } from '@/lib/area';
import { PERSONAL_GROUP, buildTrail, trailTitle } from '@/lib/scope';
import { PRODUCT } from '@/lib/product';
import { writeSetupFlag } from '@/lib/setup-progress';
import { Brand } from '@/components/Brand';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PAGE_GUTTER, PAGE_MAX_WIDTH } from '@/components/Page';
import { UserMenu } from '@/components/UserMenu';
import { AreaSwitcher } from '@/components/AreaSwitcher';
import { RouteNotFound } from '@/components/RouteFallbacks';
import { ScopeSwitcher } from '@/components/ScopeSwitcher';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';

interface NavEntry {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Active only on this exact path, not on the pages beneath it. */
  exact?: boolean;
  /** A section of the open project: the address keeps the page and sets the tab. */
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

function NavLink({ entry, onNavigate }: { entry: NavEntry; onNavigate: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const current = useSearch({ strict: false }) as ProjectSearch;
  const active = entry.tab
    ? pathname === entry.to && (current.tab ?? 'overview') === entry.tab
    : entry.exact
      ? pathname === entry.to
      : pathname === entry.to || pathname.startsWith(`${entry.to}/`);
  return (
    <Link
      to={entry.to}
      search={
        entry.tab ? ({ tab: entry.tab === 'overview' ? undefined : entry.tab } as never) : undefined
      }
      activeOptions={{ exact: Boolean(entry.exact) }}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-sidebar-muted transition-colors outline-none hover:bg-sidebar-accent hover:text-sidebar-foreground',
        active && 'bg-sidebar-accent font-medium text-sidebar-foreground',
      )}
    >
      <entry.icon aria-hidden="true" className="size-4" />
      <span className="truncate">{entry.label}</span>
    </Link>
  );
}

function NavGroup({
  label,
  entries,
  onNavigate,
}: {
  label?: string | undefined;
  entries: NavEntry[];
  onNavigate: () => void;
}) {
  if (entries.length === 0) return null;
  return (
    <div className="mt-3 flex flex-col gap-0.5 first:mt-0">
      {label && (
        <p className="truncate px-2.5 pb-1 text-[11px] font-medium tracking-wide text-sidebar-muted uppercase">
          {label}
        </p>
      )}
      {entries.map((entry) => (
        <NavLink key={entry.tab ?? entry.to} entry={entry} onNavigate={onNavigate} />
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
    if (orgId && pathname.startsWith('/marketplace'))
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
    return (
      <div className="flex min-h-dvh" role="status" aria-label="Loading profile">
        <aside className="hidden w-64 shrink-0 flex-col gap-4 border-r bg-sidebar p-4 md:flex">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </aside>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <Skeleton className="h-8 w-56" />
        </div>
      </div>
    );
  }

  const orgBase = orgId ? `/orgs/${orgId}` : undefined;
  const close = () => setOpen(false);

  const main: NavEntry[] =
    area === 'for-you' && canUseForYou
      ? [
          { to: '/get-started', label: 'Get started', icon: Rocket },
          { to: '/marketplace', label: 'Marketplace', icon: Package },
          { to: '/installed', label: 'Installed', icon: PackageCheck },
          { to: '/api-keys', label: 'API keys', icon: KeyRound },
        ]
      : [];
  const personalEntries: NavEntry[] = [{ to: '/profile', label: 'Profile', icon: UserRound }];
  // Inside a project its own tabs are the sections; the organization pages are one step up, so the
  // sidebar offers the way back instead of a third level of navigation.
  const projectPage = inProject(pathname);
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
          to: `${orgBase}/projects/${routeProjectId}`,
          label: item.label,
          icon: PROJECT_ICONS[item.value],
          tab: item.value,
        }))
      : [];
  const orgEntries: NavEntry[] =
    orgBase && !projectPage
      ? [
          {
            to: orgBase,
            label: 'Overview',
            icon: LayoutDashboard,
            exact: true,
          },
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
        className={cn(
          'w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:flex md:h-dvh',
          open
            ? 'fixed inset-y-0 left-0 z-40 flex w-[min(16rem,85vw)] shadow-lg md:static md:w-64 md:shadow-none'
            : 'hidden',
        )}
      >
        <Link
          to="/marketplace"
          onClick={close}
          aria-label={`${PRODUCT.name} by ${PRODUCT.maker}`}
          className="px-5 pt-5 pb-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Brand />
        </Link>
        {areas.length > 1 && (
          <div className="px-3 pb-3">
            <AreaSwitcher areas={areas} area={area} orgId={orgId} />
          </div>
        )}
        <nav
          aria-label="Main"
          className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto px-3 pb-3"
        >
          <NavGroup entries={main} onNavigate={close} />
          <NavGroup entries={backEntries} onNavigate={close} />
          <NavGroup label="Project" entries={sectionEntries} onNavigate={close} />
          <NavGroup label="Organization" entries={orgEntries} onNavigate={close} />
          <NavGroup label={PERSONAL_GROUP} entries={personalEntries} onNavigate={close} />
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
          <span className="font-semibold">{PRODUCT.name}</span>
        </div>
        {/* One step is the page title again, so a breadcrumb starts at two. */}
        {trail.length > 1 && (
          <div className={cn('border-b py-2.5', PAGE_GUTTER)}>
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
          {pathArea(pathname) === 'for-you' && !canUseForYou ? <RouteNotFound /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
