import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Trash2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PluginTable } from '../components/PluginTable';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { adminApi } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, SOURCES_KEY } from '../lib/plugins';

/**
 * Repositories whose sync failed and that have no plugin to show it on, for example a link that
 * was wrong. They can be tried again or removed in one go.
 */
function FailedSyncs() {
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState<string | null>(null);
  const sources = useQuery({
    queryKey: SOURCES_KEY,
    queryFn: adminApi.listSources,
    refetchInterval: (query) =>
      query.state.data?.items.some(
        (item) => item.lastStatus === 'queued' || item.lastStatus === 'running',
      )
        ? 2000
        : false,
  });
  const failed = (sources.data?.items ?? []).filter(
    (source) =>
      source.lastStatus === 'failed' ||
      source.lastStatus === 'queued' ||
      source.lastStatus === 'running',
  );
  const broken = failed.filter((source) => source.lastStatus === 'failed');
  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: SOURCES_KEY }),
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
    ]);
  const retry = useMutation({
    mutationFn: () => adminApi.bulkSyncSources(broken.map((source) => source.id)),
    onSuccess: async (result) => {
      setNotice(`Sync queued for ${result.queued.length} of ${broken.length}.`);
      await refresh();
    },
  });
  const remove = useMutation({
    mutationFn: () => adminApi.bulkDeleteSources(broken.map((source) => source.id)),
    onSuccess: async (result) => {
      setNotice(
        `Removed ${result.deleted.length} failed source${result.deleted.length === 1 ? '' : 's'}.`,
      );
      await refresh();
    },
  });

  if (broken.length === 0) {
    return notice ? (
      <Alert variant="success" role="status" className="mb-6">
        {notice}
      </Alert>
    ) : null;
  }
  return (
    <Card role="region" aria-label="Failed syncs" className="mb-6 border-destructive/30">
      <CardHeader>
        <CardTitle>Failed syncs</CardTitle>
        <CardDescription>
          These repositories could not be read, so they have no plugin yet. Fix the cause, then try
          again, or remove them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 text-sm">
          {broken.map((source) => (
            <li key={source.id} className="rounded-md border p-3">
              <p className="font-medium">
                github.com/{source.owner}/{source.repository}
                {source.path ? `/${source.path}` : ''}
              </p>
              <p className="text-xs text-muted-foreground">{source.ref}</p>
              {source.lastError && <p className="mt-1 text-destructive">{source.lastError}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={retry.isPending}
            onClick={() => retry.mutate()}
          >
            <RefreshCw />
            Retry all failed
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={remove.isPending}
            onClick={() => remove.mutate()}
          >
            <Trash2 />
            Remove all failed
          </Button>
        </div>
        {notice && (
          <p role="status" className="mt-2 text-sm">
            {notice}
          </p>
        )}
        {(retry.isError || remove.isError) && (
          <Alert variant="destructive" role="alert" className="mt-2">
            {errorMessage(retry.error ?? remove.error)}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

type Stage = 'needs_review' | 'pending' | 'approved' | 'published' | 'rejected' | 'yanked' | 'all';

/** The review cycle in order: pending, approved, then published; rejected and yanked end it. */
const STAGES: { id: Stage; label: string; hint: string; empty: string }[] = [
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
  {
    id: 'all',
    label: 'All',
    hint: 'Every plugin, whatever state its versions are in.',
    empty: 'No plugins yet.',
  },
];

/** Every stage of the review cycle, one tab each, plus the syncs that failed. */
export function ReviewPage() {
  const [stage, setStage] = useState<Stage>('needs_review');
  const current = STAGES.find((item) => item.id === stage) ?? STAGES[0]!;
  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Review"
        description="Follow each version through the review cycle: approve it, publish it, or reject it."
      />
      <FailedSyncs />
      <div role="tablist" aria-label="Review stage" className="mb-2 flex flex-wrap gap-2">
        {STAGES.map((item) => (
          <Button
            key={item.id}
            role="tab"
            aria-selected={item.id === stage}
            variant={item.id === stage ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setStage(item.id)}
          >
            {item.label}
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
