import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Trash2 } from 'lucide-react';
import { adminApi } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, SOURCES_KEY } from '../lib/plugins';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

/**
 * Repositories whose sync failed and that have no plugin to show it on, for example a link that
 * was wrong. They can be tried again or removed in one go.
 */
export function FailedSyncs() {
  const queryClient = useQueryClient();
  const [notice, setNotice] = useState<string | null>(null);
  const sources = useQuery({
    queryKey: SOURCES_KEY,
    queryFn: adminApi.listSources,
    refetchInterval: (query) =>
      query.state.data?.items?.some(
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
