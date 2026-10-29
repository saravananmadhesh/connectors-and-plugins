import { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi } from './api';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, SOURCES_KEY } from './plugins';

const POLL_MS = 2000;

const isBusy = (item: { lastStatus: string | null }): boolean =>
  item.lastStatus === 'queued' || item.lastStatus === 'running';

/**
 * Keeps the added sources fresh while any sync is queued or running, from any page, and reloads
 * the plugin list, the review count and the audit log once those syncs finish.
 */
export function useSourceSyncWatcher(): void {
  const queryClient = useQueryClient();
  const sources = useQuery({
    queryKey: SOURCES_KEY,
    queryFn: adminApi.listSources,
    refetchInterval: (query) => ((query.state.data?.items ?? []).some(isBusy) ? POLL_MS : false),
  });
  const busy = (sources.data?.items ?? []).filter(isBusy).length;
  const previous = useRef(busy);
  useEffect(() => {
    if (busy < previous.current) {
      void queryClient.invalidateQueries({ queryKey: PLUGINS_KEY });
      void queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'plugin'] });
    }
    previous.current = busy;
  }, [busy, queryClient]);
}
