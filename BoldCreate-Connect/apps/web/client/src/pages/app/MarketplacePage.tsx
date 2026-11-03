import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Package, RefreshCw, Search, SearchX } from 'lucide-react';
import { marketplace, type PluginListItemResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { useInstallOptions } from '@/lib/install-options';
import { cn } from '@/lib/cn';
import { Tooltip } from '@/components/ui/tooltip';
import { DEFAULT_SORT, SORTS, type MarketplaceSearch } from '@/lib/marketplace-search';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/EmptyState';
import { MultiSelectMenu, SingleSelectMenu } from '@/components/FilterMenu';
import { InstallDialog } from '@/components/InstallDialog';
import type { InstallScope } from '@/components/InstallMenu';
import { Page } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { Pagination } from '@/components/Pagination';
import { PluginCard } from '@/components/PluginCard';

const PAGE_SIZE = 24;

// As many columns as fit: a card never gets narrower than 18rem, so the grid follows the width.
const CARD_GRID = 'grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4';

function CardSkeletons() {
  return (
    <div className={CARD_GRID} role="status" aria-label="Loading plugins">
      {Array.from({ length: 9 }, (_, index) => (
        <Skeleton key={index} className="h-[66px]" />
      ))}
    </div>
  );
}

export function MarketplacePage() {
  const navigate = useNavigate();
  const { orgId } = useParams({ strict: false }) as { orgId: string };
  const {
    q = '',
    categories: picked = [],
    sort = DEFAULT_SORT,
    page = 1,
  } = useSearch({ strict: false }) as MarketplaceSearch;
  const [typed, setTyped] = useState(q);
  const [installing, setInstalling] = useState<
    { plugin: PluginListItemResponse; scope: InstallScope } | undefined
  >();

  // Any filter change goes back to the first page; only the page buttons keep the page.
  const setFilters = (patch: MarketplaceSearch) =>
    void navigate({
      to: '/orgs/$orgId/marketplace',
      params: { orgId },
      search: (previous: MarketplaceSearch) => ({ ...previous, page: undefined, ...patch }),
      replace: true,
    });

  // Typing waits a moment before it reaches the address and the server.
  useEffect(() => {
    if (typed === q) return;
    const timer = setTimeout(() => {
      void navigate({
        to: '/orgs/$orgId/marketplace',
        params: { orgId },
        search: (previous: MarketplaceSearch) => ({
          ...previous,
          q: typed || undefined,
          page: undefined,
        }),
        replace: true,
      });
    }, 250);
    return () => clearTimeout(timer);
  }, [typed, q, navigate, orgId]);

  const categories = useQuery({
    queryKey: qk.marketplaceCategories(),
    queryFn: marketplace.listCategories,
  });

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: [...qk.marketplacePlugins(), { q, picked, sort, page }],
    queryFn: () =>
      marketplace.listPlugins({
        q: q || undefined,
        categories: picked.length > 0 ? picked.join(',') : undefined,
        sort,
        page,
        limit: PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
  });

  // Each card offers only the scopes the user may install into and has not installed yet.
  const installOptions = useInstallOptions();

  const plugins = data?.items ?? [];
  const total = data?.total ?? 0;
  const lastPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const filtered = Boolean(q || picked.length > 0);

  const goToPage = (next: number) =>
    void navigate({
      to: '/orgs/$orgId/marketplace',
      params: { orgId },
      search: (previous: MarketplaceSearch) => ({ ...previous, page: next > 1 ? next : undefined }),
      replace: true,
    });

  // A page that no longer exists (the list shrank, or an old link) lands on the last one.
  useEffect(() => {
    if (!data || page <= lastPage) return;
    void navigate({
      to: '/orgs/$orgId/marketplace',
      params: { orgId },
      search: (previous: MarketplaceSearch) => ({
        ...previous,
        page: lastPage > 1 ? lastPage : undefined,
      }),
      replace: true,
    });
  }, [data, page, lastPage, navigate, orgId]);

  return (
    <Page className="space-y-6">
      <PageHeader
        title="Marketplace"
        description="A plugin packs agents, skills, MCP servers, hooks and rules together. Install one for yourself or for your team."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search plugins…"
            aria-label="Search plugins"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          <MultiSelectMenu
            label="Categories"
            allLabel="All categories"
            options={(categories.data?.items ?? []).map((item) => ({
              value: item.slug,
              label: item.name,
            }))}
            selected={picked}
            onChange={(next) => setFilters({ categories: next.length > 0 ? next : undefined })}
          />
          <SingleSelectMenu
            label="Sort by"
            options={SORTS}
            value={sort}
            onChange={(next) => setFilters({ sort: next === DEFAULT_SORT ? undefined : next })}
          />
          <Tooltip label="Check for new and updated plugins">
            <Button
              variant="outline"
              size="icon"
              aria-label="Refresh"
              disabled={isFetching}
              onClick={() => void refetch()}
            >
              <RefreshCw className={cn(isFetching && 'animate-spin')} aria-hidden="true" />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && <CardSkeletons />}

        {error && (
          <Alert variant="destructive" className="flex items-center justify-between gap-3">
            <span>Could not load the marketplace. Check your connection and try again.</span>
            <Button size="sm" variant="outline" onClick={() => void refetch()}>
              Retry
            </Button>
          </Alert>
        )}

        {data && plugins.length === 0 && (
          <EmptyState
            icon={filtered ? SearchX : Package}
            title={filtered ? 'Nothing matches' : 'Nothing here yet'}
            description={
              filtered
                ? 'No plugins match these filters. Clear the search or pick other categories.'
                : 'No plugins are published yet. Ask your administrator to add one.'
            }
          >
            {filtered && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTyped('');
                  void navigate({
                    to: '/orgs/$orgId/marketplace',
                    params: { orgId },
                    search: {},
                    replace: true,
                  });
                }}
              >
                Clear filters
              </Button>
            )}
          </EmptyState>
        )}

        {plugins.length > 0 && (
          <div className={CARD_GRID}>
            {plugins.map((plugin) => (
              <PluginCard
                key={plugin.id}
                plugin={plugin}
                orgId={orgId}
                scopes={installOptions.available(plugin.name)}
                installed={installOptions.installedIn(plugin.name).length > 0}
                onInstall={(scope) => setInstalling({ plugin, scope })}
              />
            ))}
          </div>
        )}

        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onPage={goToPage} />
      </div>

      {installing?.plugin.latestVersion && (
        <InstallDialog
          pluginName={installing.plugin.displayName}
          version={installing.plugin.latestVersion}
          scope={installing.scope}
          onClose={() => setInstalling(undefined)}
        />
      )}
    </Page>
  );
}
