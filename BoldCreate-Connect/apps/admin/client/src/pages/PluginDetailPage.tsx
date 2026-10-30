import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { RefreshButton } from '../components/RefreshButton';
import { ArrowLeft, ChevronDown, History } from 'lucide-react';
import { AuditList } from '../components/AuditList';
import { ComponentCounts } from '../components/ComponentCounts';
import { PluginCustomizations } from '../components/PluginCustomizations';
import { EmptyState } from '../components/EmptyState';
import { PluginClassification } from '../components/PluginClassification';
import { PluginEditForm } from '../components/PluginEditForm';
import { PluginLogo } from '../components/PluginLogo';
import { PluginRowMenu } from '../components/PluginRowMenu';
import { PluginSourcePanel } from '../components/PluginSourcePanel';
import { PluginVersions } from '../components/PluginVersions';
import { PluginStatusBadge } from '../components/StatusBadge';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Tabs } from '../components/ui/tabs';
import { adminApi, type AdminPluginDetailResponse } from '../lib/api';
import { formatDateTime, relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import { isSyncing, pluginKey } from '../lib/plugins';
import { parsePluginSearch, type PluginTab } from '../lib/search';

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3">
      <dt className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{children}</dd>
    </div>
  );
}

/** The longer text about the plugin, kept out of the first view until asked for. */
function About({ plugin }: { plugin: AdminPluginDetailResponse }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <Button
        variant="ghost"
        size="sm"
        className="-ml-2"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <ChevronDown
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
        {open ? 'Hide details' : 'Show details'}
      </Button>
      {open && (
        <div className="mt-2 max-w-3xl rounded-lg border bg-muted/30 p-4 text-sm">
          <p className="whitespace-pre-line">{plugin.description || plugin.summary}</p>
          <dl className="mt-3 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5">
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-mono text-xs">{plugin.name}</dd>
            <dt className="text-muted-foreground">Categories</dt>
            <dd>
              {plugin.categories.length === 0
                ? '—'
                : plugin.categories.map((category) => category.name).join(', ')}
            </dd>
            <dt className="text-muted-foreground">Keywords</dt>
            <dd>{plugin.keywords.length === 0 ? '—' : plugin.keywords.join(', ')}</dd>
            <dt className="text-muted-foreground">Added</dt>
            <dd>{formatDateTime(plugin.createdAt)}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}

export function PluginDetailPage() {
  const { pluginId } = useParams({ strict: false }) as { pluginId: string };
  const navigate = useNavigate();
  const tab =
    parsePluginSearch(useSearch({ strict: false }) as Record<string, unknown>).tab ?? 'versions';
  const [error, setError] = useState<string | null>(null);
  const plugin = useQuery({
    queryKey: pluginKey(pluginId),
    queryFn: () => adminApi.getPlugin(pluginId),
    // Keep checking while a sync is in flight so a new version appears by itself.
    refetchInterval: (query) => (isSyncing(query.state.data?.source ?? null) ? 2000 : false),
  });
  const data = plugin.data;
  const toTab = (next: PluginTab) =>
    void navigate({
      to: '/plugins/$pluginId',
      params: { pluginId },
      search: next === 'versions' ? {} : { tab: next },
      replace: true,
    });
  const review = data ? data.versionCounts.pending + data.versionCounts.approved : 0;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          to="/plugins"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to plugins
        </Link>
        <RefreshButton />
      </div>
      {plugin.isPending && (
        <div className="flex flex-col gap-3" aria-label="Loading plugin">
          <Skeleton className="h-16" />
          <Skeleton className="h-20" />
          <Skeleton className="h-40" />
        </div>
      )}
      {plugin.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(plugin.error)}
        </Alert>
      )}
      {data && (
        <>
          <header className="flex flex-wrap items-start gap-4">
            <PluginLogo src={data.logoUrl} size="lg" />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold tracking-tight">{data.displayName}</h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <PluginStatusBadge status={data.status} />
                <Badge variant="outline">
                  {data.visibility === 'private' ? 'Private' : 'Public'}
                </Badge>
                {data.featured && <Badge variant="outline">Featured</Badge>}
                {data.verified && <Badge variant="info">Verified</Badge>}
                {review > 0 && <Badge variant="warning">{review} to review</Badge>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{data.summary}</p>
            </div>
            <PluginRowMenu plugin={data} onError={setError} onPage />
          </header>
          {error && (
            <Alert variant="destructive" role="alert" className="mt-3">
              {error}
            </Alert>
          )}
          <About plugin={data} />
          <dl className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Stat label="Published">
              {data.publishedVersion ? `v${data.publishedVersion}` : 'Nothing yet'}
            </Stat>
            <Stat label="Customizations">
              <ComponentCounts plugin={data} />
            </Stat>
            <Stat label="Installations">{data.installations}</Stat>
            <Stat label="Updated">
              <time dateTime={data.updatedAt} title={formatDateTime(data.updatedAt)}>
                {relativeTime(data.updatedAt)}
              </time>
            </Stat>
          </dl>
          {isSyncing(data.source) && (
            <Alert variant="info" role="status" className="mt-4">
              Checking the source for new versions…
            </Alert>
          )}
          {data.source?.lastStatus === 'failed' && (
            <Alert variant="destructive" role="alert" className="mt-4">
              <p className="font-medium">The last sync failed.</p>
              {data.source.lastError && <p className="mt-0.5">{data.source.lastError}</p>}
              <Button variant="outline" size="sm" className="mt-2" onClick={() => toTab('source')}>
                Open source
              </Button>
            </Alert>
          )}
          <Tabs
            className="mt-6"
            label="Plugin"
            value={tab}
            onChange={toTab}
            tabs={[
              { value: 'versions', label: 'Versions', count: data.versions.length },
              { value: 'customizations', label: 'Customizations' },
              { value: 'edit', label: 'Edit' },
              { value: 'source', label: 'Source' },
              { value: 'history', label: 'History' },
            ]}
          >
            {tab === 'versions' && <PluginVersions pluginId={pluginId} versions={data.versions} />}
            {tab === 'customizations' && <PluginCustomizations plugin={data} />}
            {tab === 'edit' && (
              <div className="flex max-w-3xl flex-col gap-6">
                <PluginEditForm key={data.updatedAt} plugin={data} />
                <PluginClassification
                  key={data.categories.map((category) => category.id).join(',')}
                  plugin={data}
                />
              </div>
            )}
            {tab === 'source' && <PluginSourcePanel plugin={data} />}
            {tab === 'history' && (
              <AuditList
                filters={{ targetKind: 'plugin', targetId: pluginId }}
                empty={
                  <EmptyState
                    icon={History}
                    title="Nothing recorded for this plugin yet"
                    description="Edits, status changes and source changes show up here. Version steps are on each version."
                  />
                }
              />
            )}
          </Tabs>
        </>
      )}
    </div>
  );
}
