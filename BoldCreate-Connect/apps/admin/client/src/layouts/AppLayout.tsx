import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import {
  Activity,
  Compass,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Package,
  ScrollText,
  Tags,
  UserCheck,
  type LucideIcon,
} from 'lucide-react';
import { Brand, Mark } from '../components/Brand';
import { Alert } from '../components/ui/alert';
import { ThemeCycleButton, ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { adminApi } from '../lib/api';
import { cn } from '../lib/cn';
import { errorMessage } from '../lib/messages';
import { clearDiscoverSession } from '../lib/discover-session';
import { PRODUCT } from '../lib/product';
import { UserAvatar } from '../components/UserAvatar';
import { SignOutAvatar, SignOutButton } from '../components/SignOutAvatar';
import { useSidebarCollapsed } from '../lib/sidebar';
import { REVIEW_COUNT_KEY } from '../lib/plugins';
import { useSession } from '../lib/session';
import { useSourceSyncWatcher } from '../lib/source-sync';

interface Section {
  to:
    | '/'
    | '/plugins'
    | '/discover'
    | '/categories'
    | '/allowed-users'
    | '/observability'
    | '/audit';
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

/** Groups of sidebar links; the audit log is last, apart from the rest. */
const GROUPS: { label?: string; sections: Section[] }[] = [
  { sections: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true }] },
  {
    label: 'Catalog',
    sections: [
      { to: '/plugins', label: 'Plugins', icon: Package },
      { to: '/discover', label: 'Discover', icon: Compass },
      { to: '/categories', label: 'Categories', icon: Tags },
    ],
  },
  {
    label: 'System',
    sections: [
      { to: '/allowed-users', label: 'Allowed users', icon: UserCheck },
      { to: '/observability', label: 'Observability', icon: Activity },
      { to: '/audit', label: 'Audit', icon: ScrollText },
    ],
  },
];

/** Frame for every page behind sign-in: sidebar navigation, the account and sign out. */
export function AppLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const session = useSession();
  useSourceSyncWatcher();
  const [open, setOpen] = useState(false);
  const [collapsed, toggleCollapsed] = useSidebarCollapsed();
  const waiting = useQuery({
    queryKey: REVIEW_COUNT_KEY,
    queryFn: () => adminApi.listPlugins({ versionStatus: 'needs_review', pageSize: 1 }),
    refetchInterval: 60_000,
  });
  const signOut = useMutation({
    mutationFn: adminApi.signOut,
    onSuccess: async () => {
      queryClient.clear();
      clearDiscoverSession();
      await navigate({ to: '/signin' });
    },
  });
  const email = session.data?.email ?? '';
  const count = waiting.data?.total ?? 0;
  const link =
    'flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground';

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'group/sb w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:flex md:h-screen',
          collapsed && 'md:w-16',
          open ? 'flex' : 'hidden',
        )}
        data-collapsed={collapsed}
      >
        <div className="flex items-start">
          <Link
            to="/"
            aria-label={`${PRODUCT.name} by ${PRODUCT.maker}, ${PRODUCT.console}`}
            className={cn('block min-w-0 flex-1', collapsed && 'md:hidden', 'px-5 pt-5 pb-4')}
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
              <Mark className="size-8 group-hover/expand:hidden group-focus-visible/expand:hidden" />
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
        <nav aria-label="Admin sections" className="flex flex-1 flex-col overflow-y-auto px-3">
          {GROUPS.map((group, index) => (
            <div
              key={group.label ?? 'main'}
              className={cn('flex flex-col gap-0.5', index > 0 && 'mt-3')}
            >
              {group.label && (
                <p className="px-2.5 pb-1 group-data-[collapsed=true]/sb:md:hidden text-[11px] font-medium tracking-wide text-sidebar-muted uppercase">
                  {group.label}
                </p>
              )}
              {group.sections.map((section) => (
                <Link
                  key={section.to}
                  to={section.to}
                  {...(section.exact ? { activeOptions: { exact: true } } : {})}
                  onClick={() => setOpen(false)}
                  className={link}
                  title={collapsed ? section.label : undefined}
                  aria-label={section.label}
                  activeProps={{
                    className: cn(link, 'bg-sidebar-accent font-medium text-sidebar-foreground'),
                  }}
                >
                  <section.icon className="size-4 group-data-[collapsed=true]/sb:md:size-5" />
                  <span className="flex-1 group-data-[collapsed=true]/sb:md:hidden">
                    {section.label}
                  </span>
                  {section.to === '/plugins' && count > 0 && (
                    <span
                      aria-label={`${count} waiting`}
                      className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground group-data-[collapsed=true]/sb:md:hidden"
                    >
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t border-sidebar-border p-3">
          <div className="group-data-[collapsed=true]/sb:md:hidden">
            <ThemeToggle />
          </div>
          <ThemeCycleButton className="hidden self-center group-data-[collapsed=true]/sb:md:inline-flex" />
          <section
            aria-label="Account"
            className="flex items-center gap-2.5 px-1 py-1 group-data-[collapsed=true]/sb:md:flex-col"
          >
            {collapsed ? (
              <SignOutAvatar
                name={email}
                disabled={signOut.isPending}
                onSignOut={() => signOut.mutate()}
              />
            ) : (
              <UserAvatar name={email} />
            )}
            <span className="min-w-0 flex-1 leading-tight group-data-[collapsed=true]/sb:md:hidden">
              <span className="block text-sm font-medium">Signed in as</span>
              <span className="block truncate text-xs text-sidebar-muted">{email}</span>
            </span>
            {!collapsed && (
              <SignOutButton disabled={signOut.isPending} onSignOut={() => signOut.mutate()} />
            )}
          </section>
          {signOut.isError && (
            <Alert variant="destructive" role="alert" className="mt-2">
              {errorMessage(signOut.error)}
            </Alert>
          )}
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b bg-card px-4 py-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((value) => !value)}
          >
            <Menu />
          </Button>
          <Mark className="size-7" />
          <span className="brand-name">{PRODUCT.name}</span>
          <span className="text-xs text-muted-foreground">{PRODUCT.console}</span>
        </div>
        <main className="flex-1">
          <div key={pathname} className="animate-page-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
