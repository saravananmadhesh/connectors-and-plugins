import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import {
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ScrollText,
  Tags,
  type LucideIcon,
} from 'lucide-react';
import { AppFooter } from '../components/AppFooter';
import { Brand } from '../components/Brand';
import { Alert } from '../components/ui/alert';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/ui/button';
import { adminApi } from '../lib/api';
import { cn } from '../lib/cn';
import { errorMessage } from '../lib/messages';
import { PRODUCT } from '../lib/product';
import { REVIEW_COUNT_KEY } from '../lib/plugins';
import { useSession } from '../lib/session';

interface Section {
  to: '/' | '/plugins' | '/discover' | '/review' | '/categories' | '/audit';
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
      { to: '/review', label: 'Review', icon: ClipboardCheck },
      { to: '/categories', label: 'Categories', icon: Tags },
    ],
  },
  { label: 'System', sections: [{ to: '/audit', label: 'Audit', icon: ScrollText }] },
];

/** Frame for every page behind sign-in: sidebar navigation, the account and sign out. */
export function AppLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const session = useSession();
  const [open, setOpen] = useState(false);
  const waiting = useQuery({
    queryKey: REVIEW_COUNT_KEY,
    queryFn: () => adminApi.listPlugins({ versionStatus: 'needs_review', pageSize: 1 }),
    refetchInterval: 60_000,
  });
  const signOut = useMutation({
    mutationFn: adminApi.signOut,
    onSuccess: async () => {
      queryClient.clear();
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
          'w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:sticky md:top-0 md:flex md:h-screen',
          open ? 'flex' : 'hidden',
        )}
      >
        <Link
          to="/"
          aria-label={`${PRODUCT.name} by ${PRODUCT.maker}, ${PRODUCT.console}`}
          className="px-5 pt-5 pb-4"
        >
          <Brand />
        </Link>
        <nav aria-label="Admin sections" className="flex flex-1 flex-col overflow-y-auto px-3">
          {GROUPS.map((group, index) => (
            <div
              key={group.label ?? 'main'}
              className={cn('flex flex-col gap-0.5', index > 0 && 'mt-3')}
            >
              {group.label && (
                <p className="px-2.5 pb-1 text-[11px] font-medium tracking-wide text-sidebar-muted uppercase">
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
                  activeProps={{
                    className: cn(link, 'bg-sidebar-accent font-medium text-sidebar-foreground'),
                  }}
                >
                  <section.icon className="size-4" />
                  <span className="flex-1">{section.label}</span>
                  {section.to === '/review' && count > 0 && (
                    <span
                      aria-label={`${count} waiting`}
                      className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground"
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
          <ThemeToggle />
          <section aria-label="Account" className="flex items-center gap-2.5 px-1 py-1">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-sidebar-accent text-sm font-medium uppercase"
            >
              {email.slice(0, 1)}
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-sm font-medium">Signed in as</span>
              <span className="block truncate text-xs text-sidebar-muted">{email}</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              title="Sign out"
              onClick={() => signOut.mutate()}
              disabled={signOut.isPending}
              className="text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut />
            </Button>
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
          <span className="font-semibold">{PRODUCT.name}</span>
          <span className="text-xs text-muted-foreground">{PRODUCT.console}</span>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
