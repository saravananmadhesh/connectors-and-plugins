import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ScrollText } from 'lucide-react';
import { projects } from '@/lib/api';
import { formatDateTime, relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import { CursorPager, QueryFrame, RefreshButton, type TabProps } from './shared';
import { useCursorPaging } from './paging';

/** The activity log of a project, filtered by the host's user id and by action. */
export function LogsTab({ orgId, projectId, userId }: TabProps & { userId?: string }) {
  const paging = useCursorPaging();
  const [user, setUser] = useState(userId ?? '');
  const [action, setAction] = useState('');
  const [filters, setFilters] = useState({ user: userId ?? '', action: '' });

  useEffect(() => {
    if (user === filters.user && action === filters.action) return;
    const timer = setTimeout(() => {
      setFilters({ user, action });
      paging.reset();
    }, 250);
    return () => clearTimeout(timer);
    // `paging.reset` changes every render; the filters are what the effect follows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, action, filters]);

  const params = {
    cursor: paging.cursor,
    userId: filters.user || undefined,
    action: filters.action || undefined,
  };
  const logs = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'logs', params),
    queryFn: () => projects.logs(orgId, projectId, params),
  });
  const items = logs.data?.items ?? [];
  const filtered = Boolean(filters.user || filters.action);

  return (
    <div className="space-y-3">
      {!userId && (
        <PageHeader
          title="Logs"
          description="Everything that happened in this project: tool calls, sign-ins and changes."
        >
          <RefreshButton orgId={orgId} projectId={projectId} />
        </PageHeader>
      )}
      {!userId && (
        <div className="flex flex-wrap gap-2">
          <Input
            className="w-full sm:w-56"
            placeholder="User id"
            aria-label="Filter by user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            className="w-full sm:w-56"
            placeholder="Action, e.g. tool.call"
            aria-label="Filter by action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>
      )}
      <QueryFrame
        label="logs"
        isPending={logs.isPending}
        error={logs.error}
        onRetry={() => void logs.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={ScrollText}
            title={filtered ? 'No matching entries' : 'No activity yet'}
            description={
              filtered
                ? 'Try another user or action.'
                : 'Calls, sign-ins and changes show up here as they happen.'
            }
          />
        ) : (
          <>
            <Card className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell title={formatDateTime(entry.createdAt)}>
                        {relativeTime(entry.createdAt)}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{entry.action}</TableCell>
                      <TableCell>{entry.user?.userId ?? entry.user?.id ?? '—'}</TableCell>
                      <TableCell>
                        <Badge variant={entry.result === 'success' ? 'secondary' : 'destructive'}>
                          {entry.result}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {[
                          entry.tool,
                          entry.target ? `${entry.target.kind} ${entry.target.id}` : undefined,
                          entry.durationMs !== undefined ? `${entry.durationMs} ms` : undefined,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={logs.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </>
        )}
      </QueryFrame>
    </div>
  );
}
