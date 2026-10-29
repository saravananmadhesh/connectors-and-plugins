import { useQueries } from '@tanstack/react-query';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { Compass } from 'lucide-react';
import { FailedSyncs } from '../components/FailedSyncs';
import { PageHeader } from '../components/PageHeader';
import { PluginTable } from '../components/PluginTable';
import { Button } from '../components/ui/button';
import { adminApi } from '../lib/api';
import { REVIEW_COUNT_KEY } from '../lib/plugins';
import { parsePluginsSearch, type PluginStage } from '../lib/search';

/** The review cycle in order: pending, approved, then published; rejected and yanked end it. */
const STAGES: { id: PluginStage; label: string; hint: string; empty: string }[] = [
  {
    id: 'all',
    label: 'All',
    hint: 'Every plugin, whatever state its versions are in.',
    empty:
      'No plugins yet. Use Discover to add a GitHub repository; its plugins appear here for review after the first sync.',
  },
  {
    id: 'needs_review',
    label: 'To review',
    hint: 'Versions waiting to be approved or published.',
    empty: 'Nothing is waiting for review.',
  },
  {
    id: 'pending',
    label: 'Awaiting approval',
    hint: 'New versions that nobody has approved or rejected yet.',
    empty: 'No version is awaiting approval.',
  },
  {
    id: 'approved',
    label: 'Ready to publish',
    hint: 'Approved versions that members cannot install until they are published.',
    empty: 'No approved version is waiting to be published.',
  },
  {
    id: 'published',
    label: 'Published',
    hint: 'Versions members can install.',
    empty: 'No version is published yet.',
  },
  {
    id: 'rejected',
    label: 'Rejected',
    hint: 'Versions that were turned down. They stay on record and are not published.',
    empty: 'No version was rejected.',
  },
  {
    id: 'yanked',
    label: 'Yanked',
    hint: 'Published versions that were withdrawn from new installs.',
    empty: 'No version was yanked.',
  },
];

/** The catalog and its review cycle in one place: a tab per stage, plus the syncs that failed. */
export function PluginsPage() {
  const navigate = useNavigate();
  const stage =
    parsePluginsSearch(useSearch({ strict: false }) as Record<string, unknown>).stage ?? 'all';
  const current = STAGES.find((item) => item.id === stage) ?? STAGES[0]!;
  // A page of one is enough: only the total is read. Row actions already invalidate this key.
  const totals = useQueries({
    queries: STAGES.map((item) => ({
      queryKey: [...REVIEW_COUNT_KEY, item.id],
      queryFn: () =>
        adminApi.listPlugins({
          ...(item.id === 'all' ? {} : { versionStatus: item.id }),
          pageSize: 1,
        }),
      refetchInterval: 60_000,
    })),
  });
  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Plugins"
        description="Every plugin in the catalog. Follow each version through review: approve it, publish it, or reject it. Click a row's checkbox to change many at once."
      >
        <Button asChild>
          <Link to="/discover">
            <Compass />
            Discover plugins
          </Link>
        </Button>
      </PageHeader>
      <FailedSyncs />
      <div role="tablist" aria-label="Review stage" className="mb-2 flex flex-wrap gap-2">
        {STAGES.map((item, index) => (
          <Button
            key={item.id}
            role="tab"
            aria-selected={item.id === stage}
            variant={item.id === stage ? 'secondary' : 'outline'}
            size="sm"
            onClick={() =>
              void navigate({
                to: '/plugins',
                search: item.id === 'all' ? {} : { stage: item.id },
              })
            }
          >
            {item.label}
            {(totals[index]?.data?.total ?? 0) > 0 && (
              <span className="ml-1.5 rounded-full bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
                {totals[index]?.data?.total}
              </span>
            )}
          </Button>
        ))}
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{current.hint}</p>
      <PluginTable
        key={stage}
        fixed={stage === 'all' ? {} : { versionStatus: stage }}
        empty={current.empty}
      />
    </div>
  );
}
