import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { CircleCheck } from 'lucide-react';
import { adminApi } from '../../lib/api';
import { relativeTime } from '../../lib/format';
import { errorMessage } from '../../lib/messages';
import { formatCount, OVERVIEW_WINDOW_TEXT } from '../../lib/observability';
import { OVERVIEW_WINDOWS, type OverviewWindow } from '../../lib/search';
import { EmptyState } from '../EmptyState';
import { Alert } from '../ui/alert';
import { Select } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

function Stat({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatCount(value)}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

interface Props {
  period: OverviewWindow;
  onPeriodChange: (next: OverviewWindow) => void;
}

/** What needs attention in a window: open problems, what is new, the loudest errors, per service. */
export function OverviewPanel({ period, onPeriodChange }: Props) {
  const query = useQuery({
    queryKey: ['admin', 'observability', 'overview', period],
    queryFn: () => adminApi.observabilityOverview({ window: period }),
  });
  const windowText = OVERVIEW_WINDOW_TEXT[period].toLowerCase();
  return (
    <div className="flex flex-col gap-4">
      <label className="flex w-fit flex-col gap-1 text-xs font-medium text-muted-foreground">
        Period
        <Select
          aria-label="Period"
          value={period}
          onChange={(event) => onPeriodChange(event.target.value as OverviewWindow)}
        >
          {OVERVIEW_WINDOWS.map((value) => (
            <option key={value} value={value}>
              {OVERVIEW_WINDOW_TEXT[value]}
            </option>
          ))}
        </Select>
      </label>
      {query.isPending && <Skeleton className="h-40" aria-label="Loading overview" />}
      {query.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(query.error)}
        </Alert>
      )}
      {query.isSuccess && (
        <>
          <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Stat label="Unresolved errors" value={query.data.unresolvedGroups} hint="Any age" />
            <Stat label="Errors seen" value={query.data.activeGroups} hint={windowText} />
            <Stat label="New errors" value={query.data.newGroups} hint={windowText} />
            <Stat label="Warnings" value={query.data.events.warning} hint={windowText} />
            <Stat label="Failures" value={query.data.events.error} hint={windowText} />
          </section>
          <section aria-label="Most frequent errors">
            <h2 className="mb-2 text-base font-semibold">Most frequent unresolved errors</h2>
            {query.data.topGroups.length === 0 ? (
              <EmptyState
                icon={CircleCheck}
                title="No unresolved errors in this period"
                description="Errors that are seen again show up here, most frequent first."
              />
            ) : (
              <ul className="divide-y rounded-lg border">
                {query.data.topGroups.map((group) => (
                  <li key={group.id} className="flex items-center justify-between gap-3 p-3">
                    <div className="min-w-0">
                      <Link
                        to="/observability/errors/$groupId"
                        params={{ groupId: group.id }}
                        className="block truncate font-medium hover:underline"
                      >
                        {group.title}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {group.service}
                        {group.area ? ` · ${group.area}` : ''} · last seen{' '}
                        {relativeTime(group.lastSeen)}
                      </span>
                    </div>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {formatCount(group.count)}×
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          {query.data.services.length > 0 && (
            <section aria-label="By service">
              <h2 className="mb-2 text-base font-semibold">By service</h2>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Errors seen</TableHead>
                      <TableHead className="text-right">Warnings and failures</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {query.data.services.map((row) => (
                      <TableRow key={row.service}>
                        <TableCell className="font-medium">{row.service}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCount(row.activeGroups)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatCount(row.problemEvents)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
