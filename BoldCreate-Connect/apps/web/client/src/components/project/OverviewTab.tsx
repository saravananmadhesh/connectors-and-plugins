import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  ArrowRight,
  CalendarDays,
  KeyRound,
  Settings,
  TriangleAlert,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import { qk } from '@/lib/query-keys';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Section } from '@/components/Page';
import { PageHeader } from '@/components/PageHeader';
import { EditProjectButton } from './ProjectManageSection';
import { ProjectStatusBadge } from './status';
import { QueryFrame, RefreshButton, type TabProps } from './shared';

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

interface StatProps {
  label: string;
  value: string;
  hint?: string | undefined;
  icon: LucideIcon;
  /** The tab this tile opens; a tile without one is only a figure. */
  tab?: string;
  orgId: string;
  projectId: string;
}

/** A figure with an icon, shaped like the tiles of the organization overview. */
function Stat({ label, value, hint, icon: Icon, tab, orgId, projectId }: StatProps) {
  const tile = (
    <Card
      className={
        tab
          ? 'flex h-full items-center gap-3 p-4 transition-colors hover:bg-muted/50'
          : 'flex h-full items-center gap-3 p-4'
      }
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-2xl leading-none font-semibold tabular-nums">{value}</span>
        <span className="mt-1 block truncate text-sm font-medium">{label}</span>
        {hint && <span className="block truncate text-xs text-muted-foreground">{hint}</span>}
      </span>
      {tab && <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
    </Card>
  );
  return tab ? (
    <Link
      to="/orgs/$orgId/projects/$projectId/$tab"
      params={{ orgId, projectId, tab }}
      className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {tile}
    </Link>
  ) : (
    tile
  );
}

/** A one-line prompt for a step still to do; its link is the action. */
function Nudge({
  text,
  hint,
  children,
}: {
  text: string;
  hint: string;
  children: React.ReactElement;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg border bg-card px-3 py-2">
      <p className="min-w-0 text-sm">
        <span className="font-medium">{text}</span>
        <span className="text-muted-foreground"> · {hint}</span>
      </p>
      <Button asChild size="sm" variant="outline" className="h-7">
        {children}
      </Button>
    </div>
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
  const needsKey = can('project-key:create') && activeKeyCount === 0;
  const needsReturn =
    can('project:update') && project.data !== undefined && project.data.returnOrigins.length === 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title={project.data?.name ?? 'Project'}
        description="The project at a glance: how much it is used and by whom."
      >
        {project.data && project.data.status !== 'active' && (
          <ProjectStatusBadge status={project.data.status} />
        )}
        {project.data && <EditProjectButton orgId={orgId} project={project.data} />}
        {can('project-webhook:read') && (
          <Button asChild variant="outline" size="sm">
            <Link
              to="/orgs/$orgId/projects/$projectId/$tab"
              params={{ orgId, projectId, tab: 'settings' }}
            >
              <Settings />
              Settings
            </Link>
          </Button>
        )}
        <RefreshButton orgId={orgId} projectId={projectId} />
      </PageHeader>

      {(needsKey || needsReturn) && (
        <div className="space-y-2">
          {needsKey && (
            <Nudge text="Connect your product" hint="Create an API key for your backend.">
              <Link
                to="/orgs/$orgId/projects/$projectId"
                params={{ orgId, projectId }}
                search={{ tab: 'keys' }}
              >
                Create key
              </Link>
            </Nudge>
          )}
          {needsReturn && (
            <Nudge text="Add a return address" hint="Where users return after signing in.">
              <Link
                to="/orgs/$orgId/projects/$projectId/$tab"
                params={{ orgId, projectId, tab: 'settings' }}
              >
                Add in Settings
              </Link>
            </Nudge>
          )}
        </div>
      )}

      <QueryFrame
        label="usage"
        isPending={usage.isPending}
        error={usage.error}
        onRetry={() => void usage.refetch()}
      >
        <div className="space-y-8">
          <section aria-label="Totals" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              orgId={orgId}
              projectId={projectId}
              icon={Zap}
              label="Calls"
              value={number(calls)}
              hint={
                days.length > 0
                  ? `Last ${number(days.length)} ${days.length === 1 ? 'day' : 'days'}`
                  : 'No activity in this period yet'
              }
            />
            <Stat
              orgId={orgId}
              projectId={projectId}
              icon={TriangleAlert}
              label="Errors"
              value={number(errors)}
              hint={calls > 0 ? `${percent(errors, calls)} of calls` : undefined}
            />
            <Stat
              orgId={orgId}
              projectId={projectId}
              icon={Users}
              label="Top users"
              value={number(data?.topUsers.length ?? 0)}
              hint="Who made calls"
              tab="users"
            />
            <Stat
              orgId={orgId}
              projectId={projectId}
              icon={KeyRound}
              label="Active API keys"
              value={number(project.data?.activeKeyCount ?? activeKeyCount)}
              hint="Used by your server"
              tab={can('project-key:read') ? 'keys' : undefined}
            />
          </section>

          <div className="grid gap-8 lg:grid-cols-2">
            <Section title="Top users" description="Who made the most calls.">
              {(data?.topUsers.length ?? 0) === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No top users yet"
                  description="Users appear here once they make calls through this project."
                  className="min-h-40 py-8"
                />
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

            <Section title="Per day" description="Activity by day, newest first.">
              {recent.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title="No activity yet"
                  description="Daily calls, errors and active users show here once your users start using this project."
                  className="py-8"
                />
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
          </div>
        </div>
      </QueryFrame>
    </div>
  );
}
