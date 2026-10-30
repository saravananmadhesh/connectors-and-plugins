import type { ReactNode } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { adminApi, type AdminErrorGroup, type AdminErrorGroupsQuery } from '../../lib/api';
import { formatDateTime, relativeTime } from '../../lib/format';
import { errorMessage } from '../../lib/messages';
import { ERROR_STATUS_TEXT, ERROR_STATUS_TONE, formatCount } from '../../lib/observability';
import { Alert } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ListSkeleton, LoadMore } from './LoadMore';

const PAGE = 25;

function Row({ group }: { group: AdminErrorGroup }) {
  const navigate = useNavigate();
  const open = () =>
    void navigate({ to: '/observability/errors/$groupId', params: { groupId: group.id } });
  return (
    <TableRow className="cursor-pointer" onClick={open}>
      <TableCell className="w-28">
        <Badge variant={ERROR_STATUS_TONE[group.status]}>{ERROR_STATUS_TEXT[group.status]}</Badge>
      </TableCell>
      <TableCell className="max-w-[28rem]">
        <Link
          to="/observability/errors/$groupId"
          params={{ groupId: group.id }}
          className="block truncate font-medium hover:underline"
          onClick={(event) => event.stopPropagation()}
        >
          {group.title}
        </Link>
        <span className="text-xs text-muted-foreground">
          {group.service}
          {group.area ? ` · ${group.area}` : ''}
        </span>
      </TableCell>
      <TableCell className="text-right tabular-nums">{formatCount(group.count)}</TableCell>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        <time dateTime={group.lastSeen} title={formatDateTime(group.lastSeen)}>
          {relativeTime(group.lastSeen)}
        </time>
      </TableCell>
      <TableCell className="max-w-40 truncate font-mono text-xs text-muted-foreground">
        {group.appVersion ?? '—'}
      </TableCell>
    </TableRow>
  );
}

interface Props {
  filters?: Partial<AdminErrorGroupsQuery>;
  /** Shown when nothing matches. */
  empty: ReactNode;
}

/** Error groups, most recently seen first, a page at a time with the server's cursor. */
export function ErrorList({ filters = {}, empty }: Props) {
  const query = useInfiniteQuery({
    queryKey: ['admin', 'observability', 'errors', filters],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      adminApi.listErrors({ ...filters, limit: PAGE, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  if (query.isPending) return <ListSkeleton label="Loading errors" />;
  if (query.isError) {
    return (
      <Alert variant="destructive" role="alert">
        {errorMessage(query.error)}
      </Alert>
    );
  }
  if (items.length === 0) return <>{empty}</>;
  return (
    <div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>State</TableHead>
              <TableHead>Error</TableHead>
              <TableHead className="text-right">Times</TableHead>
              <TableHead>Last seen</TableHead>
              <TableHead>Release</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((group) => (
              <Row key={group.id} group={group} />
            ))}
          </TableBody>
        </Table>
      </div>
      <LoadMore
        shown={items.length}
        noun="error"
        hasMore={query.hasNextPage}
        loading={query.isFetchingNextPage}
        onMore={() => void query.fetchNextPage()}
      />
    </div>
  );
}
