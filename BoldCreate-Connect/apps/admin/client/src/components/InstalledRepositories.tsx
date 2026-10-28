import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ChevronDown, ChevronRight, Library, Pencil, RefreshCw } from 'lucide-react';
import { adminApi, type InstalledSource } from '../lib/api';
import { sourceHealth, needsAttention } from '../lib/discover';
import { cn } from '../lib/cn';
import { relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, SOURCES_KEY } from '../lib/plugins';
import { EmptyState } from './EmptyState';
import { PluginLogo } from './PluginLogo';
import { SourceLocationForm } from './SourceLocationForm';
import { PluginStatusBadge } from './StatusBadge';
import { Alert } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const isBusy = (source: InstalledSource): boolean =>
  source.lastStatus === 'queued' || source.lastStatus === 'running';

function SourceRow({
  source,
  onSync,
  onEdited,
  pending,
}: {
  source: InstalledSource;
  onSync: () => void;
  onEdited: () => Promise<unknown>;
  pending: boolean;
}) {
  const health = sourceHealth(source);
  const [editing, setEditing] = useState(false);
  const name = source.plugin?.displayName ?? (source.path || 'source');
  return (
    <li className="flex flex-wrap items-start gap-x-4 gap-y-2 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {source.plugin ? (
            <Link
              to="/plugins/$pluginId"
              params={{ pluginId: source.plugin.id }}
              className="font-medium hover:underline"
            >
              {source.plugin.displayName}
            </Link>
          ) : (
            <span className="font-medium text-muted-foreground">No plugin yet</span>
          )}
          {source.plugin && <PluginStatusBadge status={source.plugin.status} />}
          <Badge variant={health.tone}>{health.label}</Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          <code className="font-mono">{source.path === '' ? 'repository root' : source.path}</code>
          {' · '}
          {source.ref}
          {source.lastSyncedAt && (
            <>
              {' · synced '}
              <time
                dateTime={source.lastSyncedAt}
                title={new Date(source.lastSyncedAt).toLocaleString()}
              >
                {relativeTime(source.lastSyncedAt)}
              </time>
            </>
          )}
        </p>
        {health.reason && (
          <p
            className={
              health.tone === 'destructive'
                ? 'mt-1 text-sm text-destructive'
                : 'mt-1 text-sm text-muted-foreground'
            }
          >
            {health.reason}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isBusy(source) || editing}
          aria-label={`Edit ${name} source`}
          onClick={() => setEditing(true)}
        >
          <Pencil />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isBusy(source) || pending}
          aria-label={`Sync ${source.plugin?.displayName ?? source.path ?? 'source'} again`}
          onClick={onSync}
        >
          <RefreshCw className={isBusy(source) ? 'animate-spin' : ''} />
          {source.lastStatus === 'failed' ? 'Retry' : 'Sync'}
        </Button>
      </div>
      {editing && (
        <div className="basis-full rounded-lg border bg-muted/30 p-4">
          <SourceLocationForm
            initial={{
              owner: source.owner,
              repository: source.repository,
              ref: source.ref,
              path: source.path,
            }}
            save={(body) => adminApi.updateSource(source.id, body)}
            onSaved={onEdited}
            onDone={() => setEditing(false)}
          />
        </div>
      )}
    </li>
  );
}

/**
 * Every repository folder that was added, grouped by repository, with how its last sync went
 * and the plugin that came out of it. Problems come first so they are not missed.
 */
export function InstalledRepositories() {
  const queryClient = useQueryClient();
  const [onlyProblems, setOnlyProblems] = useState(false);
  // Repositories start collapsed; the ones opened are remembered by name.
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const sources = useQuery({
    queryKey: SOURCES_KEY,
    queryFn: adminApi.listSources,
    refetchInterval: (query) => (query.state.data?.items.some(isBusy) ? 2000 : false),
  });
  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: SOURCES_KEY }),
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
    ]);
  const sync = useMutation({
    mutationFn: (ids: string[]) => adminApi.bulkSyncSources(ids),
    onSuccess: refresh,
  });

  if (sources.isPending) {
    return (
      <div className="flex flex-col gap-3" aria-label="Loading repositories">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }
  if (sources.isError) {
    return (
      <Alert variant="destructive" role="alert">
        {errorMessage(sources.error)}
      </Alert>
    );
  }
  const all = sources.data.items;
  if (all.length === 0) {
    return (
      <EmptyState
        icon={Library}
        title="No repositories added yet"
        description="Find plugins in a GitHub repository and install the ones you need. They are listed here with how each one is doing."
      />
    );
  }

  const problems = all.filter(needsAttention);
  const visible = onlyProblems ? problems : all;
  const groups = new Map<string, InstalledSource[]>();
  for (const source of visible) {
    const key = `${source.owner}/${source.repository}`;
    groups.set(key, [...(groups.get(key) ?? []), source]);
  }
  // Repositories with a problem first, then by name.
  const ordered = [...groups.entries()].sort(
    ([nameA, a], [nameB, b]) =>
      Number(b.some(needsAttention)) - Number(a.some(needsAttention)) || nameA.localeCompare(nameB),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Button
          variant={onlyProblems ? 'outline' : 'secondary'}
          size="sm"
          aria-pressed={!onlyProblems}
          onClick={() => setOnlyProblems(false)}
        >
          All ({all.length})
        </Button>
        <Button
          variant={onlyProblems ? 'secondary' : 'outline'}
          size="sm"
          aria-pressed={onlyProblems}
          onClick={() => setOnlyProblems(true)}
        >
          Needs attention ({problems.length})
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() =>
            setExpanded(expanded.size === 0 ? new Set(ordered.map(([name]) => name)) : new Set())
          }
        >
          {expanded.size === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>
      {sync.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(sync.error)}
        </Alert>
      )}
      {visible.length === 0 && (
        <p className="text-sm text-muted-foreground">Everything is healthy.</p>
      )}
      {ordered.map(([name, items]) => {
        const failing = items.filter(needsAttention).length;
        const idle = items.filter((source) => !isBusy(source)).map((source) => source.id);
        const open = expanded.has(name);
        const toggle = () =>
          setExpanded((current) => {
            const next = new Set(current);
            if (open) next.delete(name);
            else next.add(name);
            return next;
          });
        return (
          <section key={name} aria-label={name} className="rounded-lg border bg-card">
            <header
              className={cn('flex flex-wrap items-center gap-3 px-4 py-3', open && 'border-b')}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={open}
                aria-label={`${open ? 'Collapse' : 'Expand'} ${name}`}
                onClick={toggle}
              >
                {open ? <ChevronDown /> : <ChevronRight />}
              </Button>
              <PluginLogo />
              <div className="min-w-0 flex-1">
                <h3 className="font-mono text-sm font-medium">{name}</h3>
                <p className="text-xs text-muted-foreground">
                  {items.length} folder{items.length === 1 ? '' : 's'}
                  {failing > 0 && ` · ${failing} need${failing === 1 ? 's' : ''} attention`}
                </p>
              </div>
              {open && items.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={idle.length === 0 || sync.isPending}
                  onClick={() => sync.mutate(idle)}
                >
                  <RefreshCw />
                  Sync all
                </Button>
              )}
            </header>
            {open && (
              <ul className="divide-y">
                {items.map((source) => (
                  <SourceRow
                    key={source.id}
                    source={source}
                    pending={sync.isPending}
                    onEdited={refresh}
                    onSync={() => sync.mutate([source.id])}
                  />
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
