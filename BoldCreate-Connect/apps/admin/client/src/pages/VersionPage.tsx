import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { RefreshButton } from '../components/RefreshButton';
import { ArrowLeft } from 'lucide-react';
import { AuditList } from '../components/AuditList';
import { EmptyState } from '../components/EmptyState';
import { PluginLogo } from '../components/PluginLogo';
import { VersionStatusBadge } from '../components/StatusBadge';
import { VersionActions } from '../components/VersionActions';
import { VersionContents } from '../components/VersionContents';
import { VersionSafety } from '../components/VersionSafety';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Tabs } from '../components/ui/tabs';
import { History } from 'lucide-react';
import { adminApi, type VersionStatus } from '../lib/api';
import { formatBytes, formatDateTime, relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import { pluginKey, versionKey } from '../lib/plugins';
import { parseVersionSearch } from '../lib/search';

/** The steps a version goes through; rejected and yanked are ways out of it, noted below. */
const STEPS: { status: VersionStatus; label: string }[] = [
  { status: 'pending', label: 'Pending review' },
  { status: 'approved', label: 'Approved' },
  { status: 'published', label: 'Published' },
];

const OUTCOME: Partial<Record<VersionStatus, string>> = {
  rejected: 'Rejected. It stays on record. If that was a mistake, reopen it to review it again.',
  yanked: 'Yanked. New installs are blocked; installed copies keep working.',
};

function Steps({ status }: { status: VersionStatus }) {
  const current = STEPS.findIndex((step) => step.status === status);
  return (
    <div>
      <ol aria-label="Progress" className="flex flex-wrap items-center gap-2 text-xs">
        {STEPS.map((step, index) => (
          <li key={step.status} className="flex items-center gap-2">
            <span
              aria-current={index === current ? 'step' : undefined}
              className={
                index === current
                  ? 'rounded-full bg-foreground px-2.5 py-1 font-medium text-background'
                  : index < current
                    ? 'rounded-full border px-2.5 py-1 text-foreground'
                    : 'rounded-full border border-dashed px-2.5 py-1 text-muted-foreground'
              }
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && <span className="text-muted-foreground">→</span>}
          </li>
        ))}
      </ol>
      {OUTCOME[status] && <p className="mt-2 text-sm text-muted-foreground">{OUTCOME[status]}</p>}
    </div>
  );
}

export function VersionPage() {
  const { pluginId, versionId } = useParams({ strict: false }) as {
    pluginId: string;
    versionId: string;
  };
  const navigate = useNavigate();
  const tab =
    parseVersionSearch(useSearch({ strict: false }) as Record<string, unknown>).tab ?? 'contents';
  const plugin = useQuery({
    queryKey: pluginKey(pluginId),
    queryFn: () => adminApi.getPlugin(pluginId),
  });
  const version = useQuery({
    queryKey: versionKey(versionId),
    queryFn: () => adminApi.getVersion(versionId),
  });
  const data = version.data;
  // A version opened under the wrong plugin is not shown as that plugin's.
  const mismatch = data !== undefined && data.pluginId !== pluginId;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link
          to="/plugins/$pluginId"
          params={{ pluginId }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to {plugin.data?.displayName ?? 'the plugin'}
        </Link>
        <RefreshButton />
      </div>
      {version.isPending && (
        <div className="flex flex-col gap-3" aria-label="Loading version">
          <Skeleton className="h-16" />
          <Skeleton className="h-40" />
        </div>
      )}
      {version.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(version.error)}
        </Alert>
      )}
      {mismatch && (
        <Alert variant="destructive" role="alert">
          This version belongs to another plugin.
        </Alert>
      )}
      {data && !mismatch && (
        <>
          <header className="flex flex-wrap items-start gap-4">
            <PluginLogo src={plugin.data?.logoUrl} size="lg" />
            <div className="min-w-0 flex-1">
              <h1 className="flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-tight">
                <span>{plugin.data?.displayName ?? data.pluginName}</span>
                <span className="font-mono text-xl text-muted-foreground">v{data.version}</span>
                <VersionStatusBadge status={data.status} />
                {data.executionBlockedAt && <Badge variant="destructive">Execution blocked</Badge>}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Ingested{' '}
                <time dateTime={data.ingestedAt} title={formatDateTime(data.ingestedAt)}>
                  {relativeTime(data.ingestedAt)}
                </time>
                {' · '}commit{' '}
                <code className="font-mono text-xs">
                  {data.commitSha ? data.commitSha.slice(0, 12) : 'unknown'}
                </code>
                {' · '}
                {formatBytes(data.archiveSizeBytes)}
                {' · '}
                {data.installations} installation{data.installations === 1 ? '' : 's'}
              </p>
            </div>
            <VersionActions version={data} pluginId={pluginId} />
          </header>
          <div className="mt-5">
            <Steps status={data.status} />
          </div>
          <Tabs
            className="mt-6"
            label="Version"
            value={tab}
            onChange={(next) =>
              void navigate({
                to: '/plugins/$pluginId/versions/$versionId',
                params: { pluginId, versionId },
                search: next === 'contents' ? {} : { tab: next },
                replace: true,
              })
            }
            tabs={[
              { value: 'contents', label: 'Contents', count: data.scan?.components.length },
              { value: 'safety', label: 'Safety review', count: data.findings || undefined },
              { value: 'history', label: 'History' },
            ]}
          >
            {tab === 'contents' && <VersionContents version={data} />}
            {tab === 'safety' && <VersionSafety version={data} />}
            {tab === 'history' && (
              <AuditList
                filters={{ targetKind: 'plugin_version', targetId: versionId }}
                empty={
                  <EmptyState
                    icon={History}
                    title="Nothing recorded for this version yet"
                    description="Approving, publishing, rejecting and yanking it show up here."
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
