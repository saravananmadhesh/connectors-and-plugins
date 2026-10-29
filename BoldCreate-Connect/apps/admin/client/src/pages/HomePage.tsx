import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Blocks,
  Building2,
  Download,
  GitBranch,
  Layers,
  Package,
  Tags,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { adminApi, type AdminStatsResponse } from '../lib/api';
import { actionText, actionTone, targetPath, targetText } from '../lib/audit';
import { relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import { KIND_PLURAL, VERSION_LABEL } from '../lib/plugins';
import { Badge } from '../components/ui/badge';

const STATS_KEY = ['admin', 'stats'] as const;
const PERIODS = [7, 30, 90] as const;

function Kpi({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: number;
  hint?: string;
  icon: LucideIcon;
}) {
  return (
    <li>
      <Card className="h-full">
        <CardContent className="flex items-start justify-between gap-3 pt-5">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
            {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
          </div>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground"
          >
            <Icon className="size-4" />
          </span>
        </CardContent>
      </Card>
    </li>
  );
}

/** A plain list of names and counts. Counts are shown as numbers, never as a bar. */
function Breakdown({
  title,
  entries,
}: {
  title: string;
  entries: { label: string; value: number }[];
}) {
  return (
    <Card role="region" aria-label={title}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing to show yet.</p>
        ) : (
          <ul className="flex flex-col divide-y text-sm">
            {entries.map((entry) => (
              <li key={entry.label} className="flex items-center justify-between gap-4 py-2">
                <span className="min-w-0 truncate">{entry.label}</span>
                <span
                  className={
                    entry.value === 0
                      ? 'font-medium text-muted-foreground tabular-nums'
                      : 'font-medium tabular-nums'
                  }
                >
                  {entry.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function Timeline({ stats }: { stats: AdminStatsResponse }) {
  const max = Math.max(
    1,
    ...stats.timeline.map((day) =>
      Math.max(day.versionsIngested, day.syncsSucceeded + day.syncsFailed),
    ),
  );
  const totalVersions = stats.timeline.reduce((sum, day) => sum + day.versionsIngested, 0);
  const totalFailed = stats.timeline.reduce((sum, day) => sum + day.syncsFailed, 0);
  const totalSyncs = stats.timeline.reduce(
    (sum, day) => sum + day.syncsSucceeded + day.syncsFailed,
    0,
  );
  return (
    <Card role="region" aria-label="Sync activity">
      <CardHeader>
        <CardTitle className="text-sm">Sync activity</CardTitle>
        <p className="text-xs text-muted-foreground">
          {totalSyncs} sync{totalSyncs === 1 ? '' : 's'} finished, {totalFailed} failed;{' '}
          {totalVersions} new version{totalVersions === 1 ? '' : 's'} in the last {stats.periodDays}{' '}
          days.
        </p>
      </CardHeader>
      <CardContent>
        <ul className="flex h-28 items-end gap-px" aria-hidden="true">
          {stats.timeline.map((day) => (
            <li
              key={day.date}
              title={`${day.date}: ${day.versionsIngested} new versions, ${day.syncsSucceeded} synced, ${day.syncsFailed} failed`}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <span
                className="block bg-destructive"
                style={{ height: `${(day.syncsFailed / max) * 100}%` }}
              />
              <span
                className="block rounded-t-sm bg-primary"
                style={{ height: `${(day.syncsSucceeded / max) * 100}%` }}
              />
            </li>
          ))}
        </ul>
        <p className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{stats.timeline[0]?.date}</span>
          <span>{stats.timeline[stats.timeline.length - 1]?.date}</span>
        </p>
      </CardContent>
    </Card>
  );
}

/** The latest events from the audit log, with a way through to all of them. */
function RecentActivity() {
  const activity = useQuery({
    queryKey: ['admin', 'audit', 'recent'],
    queryFn: () => adminApi.listAudit({ limit: 8 }),
    placeholderData: keepPreviousData,
  });
  return (
    <Card role="region" aria-label="Recent activity">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-sm">Recent activity</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link to="/audit">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {activity.isPending && <Skeleton className="h-32" />}
        {activity.isError && (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage(activity.error)}
          </p>
        )}
        {activity.data && activity.data.items.length === 0 && (
          <p className="text-sm text-muted-foreground">No activity yet.</p>
        )}
        {activity.data && activity.data.items.length > 0 && (
          <ul className="flex flex-col divide-y text-sm">
            {activity.data.items.map((entry) => {
              const link = targetPath(entry);
              const target = targetText(entry);
              return (
                <li key={entry.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                  <Badge variant={actionTone(entry)}>{actionText(entry.action)}</Badge>
                  {target &&
                    (link ? (
                      <Link {...link} className="font-medium hover:underline">
                        {target}
                      </Link>
                    ) : (
                      <span className="font-medium">{target}</span>
                    ))}
                  <span className="ml-auto text-xs text-muted-foreground">
                    {entry.actorId} ·{' '}
                    <time dateTime={entry.at} title={new Date(entry.at).toLocaleString()}>
                      {relativeTime(entry.at)}
                    </time>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function HomePage() {
  const [days, setDays] = useState<(typeof PERIODS)[number]>(30);
  const stats = useQuery({ queryKey: [...STATS_KEY, days], queryFn: () => adminApi.stats(days) });
  const data = stats.data;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <PageHeader title="Dashboard" description="An overview of the catalog.">
        <section aria-label="Statistics period">
          <div role="group" aria-label="Period" className="flex gap-1">
            {PERIODS.map((period) => (
              <Button
                key={period}
                variant={days === period ? 'default' : 'outline'}
                size="sm"
                aria-pressed={days === period}
                onClick={() => setDays(period)}
              >
                {period} days
              </Button>
            ))}
          </div>
        </section>
      </PageHeader>
      <section aria-label="Statistics" className="flex flex-col gap-4">
        {stats.isPending && (
          <div className="flex flex-col gap-3" aria-label="Loading statistics">
            <Skeleton className="h-24" />
            <Skeleton className="h-48" />
          </div>
        )}
        {stats.isError && (
          <Alert variant="destructive" role="alert">
            {errorMessage(stats.error)}
          </Alert>
        )}
        {data && (
          <>
            {data.needsReview > 0 && (
              <Alert variant="warning">
                {data.needsReview} plugin{data.needsReview === 1 ? ' has' : 's have'} versions
                waiting for review.{' '}
                <Link to="/plugins" search={{ stage: 'needs_review' }} className="underline">
                  Review them
                </Link>
                .
              </Alert>
            )}
            {data.sourcesByStatus.failed > 0 && (
              <Alert variant="destructive" role="status">
                {data.sourcesByStatus.failed} source{data.sourcesByStatus.failed === 1 ? '' : 's'}{' '}
                failed the last sync.{' '}
                <Link to="/plugins" search={{ stage: 'needs_review' }} className="underline">
                  See what failed
                </Link>
                .
              </Alert>
            )}
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi
                label="Plugins"
                value={data.totals.plugins}
                hint={`${data.pluginsByStatus.active} active`}
                icon={Package}
              />
              <Kpi
                label="Versions"
                value={data.totals.versions}
                hint={`${data.versionsByStatus.published} published`}
                icon={Layers}
              />
              <Kpi
                label="Customizations"
                value={data.components.total}
                hint="In published versions"
                icon={Blocks}
              />
              <Kpi label="Installations" value={data.totals.installations} icon={Download} />
              <Kpi label="Sources" value={data.totals.sources} icon={GitBranch} />
              <Kpi label="Categories" value={data.totals.categories} icon={Tags} />
              <Kpi label="Organizations" value={data.totals.organizations} icon={Building2} />
              <Kpi label="Members installing" value={data.totals.users} icon={Users} />
            </ul>
            <Timeline stats={data} />
            <div className="grid gap-4 lg:grid-cols-2">
              <Breakdown
                title="Versions by status"
                entries={(Object.keys(VERSION_LABEL) as (keyof typeof VERSION_LABEL)[]).map(
                  (status) => ({
                    label: VERSION_LABEL[status],
                    value: data.versionsByStatus[status],
                  }),
                )}
              />
              <Breakdown
                title="Plugins by status"
                entries={[
                  { label: 'Active', value: data.pluginsByStatus.active ?? 0 },
                  { label: 'Deprecated', value: data.pluginsByStatus.deprecated ?? 0 },
                  { label: 'Suspended', value: data.pluginsByStatus.suspended ?? 0 },
                ]}
              />
              <Breakdown
                title="Customizations by type"
                entries={(Object.keys(KIND_PLURAL) as (keyof typeof KIND_PLURAL)[]).map((kind) => ({
                  label: KIND_PLURAL[kind],
                  value: data.components.byKind[kind] ?? 0,
                }))}
              />
              <Breakdown
                title="Plugins that include each type"
                entries={(Object.keys(KIND_PLURAL) as (keyof typeof KIND_PLURAL)[]).map((kind) => ({
                  label: KIND_PLURAL[kind],
                  value: data.components.pluginsByKind[kind] ?? 0,
                }))}
              />
              <Breakdown
                title="Plugins per category"
                entries={data.categories.map((category) => ({
                  label: category.name,
                  value: category.plugins,
                }))}
              />
              <Breakdown
                title="Most installed plugins"
                entries={data.topPlugins.map((plugin) => ({
                  label: plugin.displayName,
                  value: plugin.installations,
                }))}
              />
            </div>
            <RecentActivity />
          </>
        )}
      </section>
    </div>
  );
}
