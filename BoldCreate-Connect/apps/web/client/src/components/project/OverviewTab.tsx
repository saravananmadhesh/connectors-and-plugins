import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { formatDate } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Section } from '@/components/Page';
import { ProjectStatusBadge } from './status';
import { QueryFrame, type TabProps } from './shared';

const number = (value: number) => value.toLocaleString();
const percent = (part: number, whole: number) =>
  whole === 0
    ? '–'
    : `${((part / whole) * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}%`;

/** A day as the API names it (`2026-01-05`), shown in the reader's format without shifting it. */
const day = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, {
    timeZone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

/** The project at a glance: what it is, then its activity over the last days and its busiest users. */
export function OverviewTab({
  orgId,
  projectId,
  activeKeyCount,
}: TabProps & { activeKeyCount: number }) {
  const { can } = useAbilities(orgId);
  const project = useQuery({
    queryKey: qk.project(orgId, projectId),
    queryFn: () => projects.get(orgId, projectId),
  });
  const usage = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'usage'),
    queryFn: () => projects.usage(orgId, projectId),
  });
  const data = usage.data;
  const total = (pick: 'toolCalls' | 'errors') =>
    (data?.days ?? []).reduce((sum, entry) => sum + entry[pick], 0);
  const calls = total('toolCalls');
  const errors = total('errors');
  const days = data?.days ?? [];
  // Newest first: what happened lately is what a reader looks for.
  const recent = [...days].sort((a, b) => b.date.localeCompare(a.date));
  const topCalls = (data?.topUsers ?? []).reduce((sum, user) => sum + user.toolCalls, 0);

  const details: { label: string; value: React.ReactNode }[] = project.data
    ? [
        { label: 'Status', value: <ProjectStatusBadge status={project.data.status} /> },
        { label: 'Active keys', value: number(project.data.activeKeyCount) },
        {
          label: 'Return addresses',
          value:
            project.data.returnOrigins.length === 0 ? (
              'None'
            ) : (
              <span className="flex flex-col items-end gap-0.5 font-mono text-xs break-all">
                {project.data.returnOrigins.map((origin) => (
                  <span key={origin}>{origin}</span>
                ))}
              </span>
            ),
        },
        { label: 'Created', value: formatDate(project.data.createdAt) },
        { label: 'Updated', value: formatDate(project.data.updatedAt) },
      ]
    : [];

  return (
    <div className="space-y-8">
      {can('project-key:create') && activeKeyCount === 0 && (
        <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <p className="text-sm font-medium">Connect your product</p>
            <p className="text-xs text-muted-foreground">
              Create a key for this project to call it from your backend.
            </p>
          </div>
          <Button asChild size="sm">
            <Link
              to="/orgs/$orgId/projects/$projectId"
              params={{ orgId, projectId }}
              search={{ tab: 'keys' }}
            >
              Create key
            </Link>
          </Button>
        </Card>
      )}
      <Section title="Details" description="What this project is and how it is set up.">
        {project.data ? (
          <Card>
            <dl className="divide-y text-sm">
              {details.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 px-4 py-3">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ) : (
          <Skeleton className="h-40 w-full" role="status" aria-label="Loading details" />
        )}
      </Section>

      <QueryFrame
        label="usage"
        isPending={usage.isPending}
        error={usage.error}
        onRetry={() => void usage.refetch()}
      >
        <div className="space-y-8">
          <Section
            title="Activity"
            description={
              days.length > 0
                ? `The last ${number(days.length)} ${days.length === 1 ? 'day' : 'days'}.`
                : 'No activity in this period yet.'
            }
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Calls" value={number(calls)} />
              <Stat
                label="Errors"
                value={number(errors)}
                hint={calls > 0 ? `${percent(errors, calls)} of calls` : undefined}
              />
              <Stat
                label="Busiest day"
                value={number(Math.max(0, ...days.map((entry) => entry.toolCalls)))}
                hint="calls in one day"
              />
              <Stat label="Top users" value={number(data?.topUsers.length ?? 0)} />
            </div>
          </Section>

          <div className="grid gap-8 lg:grid-cols-2">
            <Section title="Per day" description="Newest first.">
              {recent.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity in this period yet.</p>
              ) : (
                <Card className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead className="text-right">Active users</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                        <TableHead className="text-right">Errors</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recent.map((entry) => (
                        <TableRow key={entry.date}>
                          <TableCell>{day(entry.date)}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {number(entry.activeUsers)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {number(entry.toolCalls)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {number(entry.errors)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </Section>

            <Section title="Top users" description="Who made the most calls.">
              {(data?.topUsers.length ?? 0) === 0 ? (
                <p className="text-sm text-muted-foreground">No users have made calls yet.</p>
              ) : (
                <Card className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10">#</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="text-right">Calls</TableHead>
                        <TableHead className="text-right">Share</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.topUsers.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell className="text-muted-foreground tabular-nums">
                            {index + 1}
                          </TableCell>
                          <TableCell className="max-w-48 truncate">
                            {user.userId ?? user.id}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {number(user.toolCalls)}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground tabular-nums">
                            {percent(user.toolCalls, topCalls)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </Section>
          </div>
        </div>
      </QueryFrame>
    </div>
  );
}
