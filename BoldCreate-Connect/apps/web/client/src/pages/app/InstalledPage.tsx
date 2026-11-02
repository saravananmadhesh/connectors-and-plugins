/**
 * Installed plugins and the agents, skills, MCPs, hooks and rules they ship, for the whole
 * organization or the caller alone.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { PackageOpen, Search, Store } from 'lucide-react';
import { auth, installations } from '@/lib/api';
import { hasAbility, useAbilities } from '@/lib/abilities';
import { useActiveOrg } from '@/lib/active-org';
import { qk } from '@/lib/query-keys';
import {
  INSTALLED_TABS,
  recalledSignInScope,
  type InstalledScope,
  type InstalledSearch,
  type InstalledTab,
} from '@/lib/installed-search';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs } from '@/components/ui/tabs';
import { EmptyState } from '@/components/EmptyState';
import { InstalledMcpServers } from '@/components/InstalledMcpServers';
import { InstalledComponents } from '@/components/InstalledComponents';
import { InstalledPlugins } from '@/components/InstalledPlugins';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { ScopePills } from '@/components/ScopePills';

export function InstalledPage() {
  const navigate = useNavigate();
  const {
    tab = 'plugins',
    scope: named,
    q = '',
    oauth,
    reason,
    detail,
  } = useSearch({
    strict: false,
  }) as InstalledSearch;
  const [typed, setTyped] = useState(q);
  // A failed sign-in comes back without the scope; open the list it started from.
  const [recalled] = useState(() => (oauth ? recalledSignInScope() : undefined));
  const wanted = named ?? recalled;

  const me = useQuery({ queryKey: qk.me(), queryFn: auth.me });
  const orgIds = me.data?.memberships.map((m) => m.organizationId) ?? [];
  const { orgId = '' } = useActiveOrg(orgIds);
  const { me: orgMe, isLoading: abilitiesLoading } = useAbilities(orgId);
  const personalOpen = orgMe?.policy?.allowPersonalInstalls !== false;
  // For me and For team.
  const scopes: InstalledScope[] = [...(personalOpen ? (['me'] as const) : []), 'org'];
  const scope: InstalledScope = wanted && scopes.includes(wanted) ? wanted : (scopes[0] ?? 'org');
  const scopeKey = scope;

  const setSearch = (patch: InstalledSearch) =>
    void navigate({
      to: '/orgs/$orgId/installed',
      params: { orgId },
      search: (previous) => ({ ...previous, ...patch }) as InstalledSearch,
      replace: true,
    });

  useEffect(() => {
    if (typed === q) return;
    const timer = setTimeout(() => setSearch({ q: typed || undefined }), 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, q]);

  const { data, isLoading, error, refetch } = useQuery({
    // The scope key leads so the list components' refreshes reach this query by prefix.
    queryKey: [...qk.installations(scopeKey), orgId],
    queryFn: () => installations.list(orgId, scopeKey),
    enabled: Boolean(orgId),
  });

  const needle = q.trim().toLowerCase();
  const items = (data?.items ?? []).filter(
    (item) => !needle || item.pluginName.toLowerCase().includes(needle),
  );

  const canWrite =
    scope === 'me'
      ? orgMe?.policy?.allowPersonalInstalls !== false
      : hasAbility(orgMe, 'installation:update');

  const setTab = (next: InstalledTab) => setSearch({ tab: next === 'plugins' ? undefined : next });

  const emptyText =
    scope === 'org'
      ? 'Nothing is installed for your team.'
      : 'You have not installed anything for yourself.';

  return (
    <Page className="space-y-6">
      <PageHeader title="Installed" description="Plugins and components that are active for you.">
        <Button asChild>
          <Link to="/orgs/$orgId/marketplace" params={{ orgId }}>
            <Store />
            Browse marketplace
          </Link>
        </Button>
      </PageHeader>

      {oauth && (
        <Alert
          variant={oauth === 'connected' ? 'success' : 'destructive'}
          className="flex items-center justify-between gap-3"
        >
          <span>
            {oauth === 'connected'
              ? 'You are signed in to the server.'
              : `The sign-in did not complete${reason ? ` (${reason}${detail ? `: ${detail}` : ''})` : ''}. Try again from the server details.`}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSearch({ oauth: undefined, reason: undefined, detail: undefined })}
          >
            Dismiss
          </Button>
        </Alert>
      )}

      <div className="space-y-3">
        <ScopePills scopes={scopes} value={scope} onChange={(next) => setSearch({ scope: next })} />
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search installed…"
              aria-label="Search installed"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
            />
          </div>
        </div>
      </div>

      {(isLoading || abilitiesLoading) && (
        <Skeleton className="h-40 w-full" role="status" aria-label="Loading installed" />
      )}

      {error && (
        <Alert variant="destructive" className="flex items-center justify-between gap-3">
          <span>Could not load the installed plugins. Check your connection and try again.</span>
          <Button size="sm" variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        </Alert>
      )}

      {data && items.length === 0 && (
        <EmptyState
          icon={PackageOpen}
          title={needle ? 'Nothing matches' : 'Nothing installed yet'}
          description={
            needle
              ? 'No installed plugin matches this search.'
              : `${emptyText} Install one from the marketplace.`
          }
        />
      )}

      {orgId && items.length > 0 && (
        <Tabs label="Installed kind" tabs={INSTALLED_TABS} value={tab} onChange={setTab}>
          {tab === 'mcp' ? (
            <InstalledMcpServers
              orgId={orgId}
              scopeKey={scopeKey}
              items={items}
              canUpdate={canWrite}
            />
          ) : tab === 'plugins' ? (
            <InstalledPlugins
              orgId={orgId}
              scopeKey={scopeKey}
              items={items}
              canUpdate={canWrite}
              canDelete={canWrite}
            />
          ) : (
            <InstalledComponents
              orgId={orgId}
              scopeKey={scopeKey}
              kind={tab}
              kindLabel={INSTALLED_TABS.find((entry) => entry.value === tab)?.label ?? tab}
              items={items}
              canUpdate={canWrite}
            />
          )}
        </Tabs>
      )}
    </Page>
  );
}
