import { Fragment, useState, type ReactNode } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ChevronRight, Copy } from 'lucide-react';
import { adminApi, type AdminAuditEntry, type AdminAuditQuery } from '../lib/api';
import { actionText, actionTone, contextRows, targetPath, targetText } from '../lib/audit';
import { formatDateTime, relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import { cn } from '../lib/cn';
import { Alert } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const PAGE = 25;

function Copyable({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <code className="font-mono text-xs break-all">{value}</code>
      <Button
        variant="ghost"
        size="icon"
        className="size-6"
        aria-label={`Copy ${label}`}
        onClick={() => void navigator.clipboard?.writeText(value)}
      >
        <Copy className="size-3.5" />
      </Button>
    </span>
  );
}

function Detail({ entry }: { entry: AdminAuditEntry }) {
  const rows: [string, ReactNode][] = [
    ['Time', formatDateTime(entry.at)],
    ['Who', `${entry.actorId} (${entry.actorKind.replace(/_/g, ' ')})`],
    ['Result', entry.result],
    ...(entry.targetKind
      ? ([
          [
            'Target',
            <span key="target">
              {entry.targetKind.replace(/_/g, ' ')}
              {entry.targetId && (
                <>
                  {' '}
                  <Copyable value={entry.targetId} label="target id" />
                </>
              )}
            </span>,
          ],
        ] as [string, ReactNode][])
      : []),
    ...(entry.orgId
      ? ([['Organization', <Copyable key="org" value={entry.orgId} label="organization id" />]] as [
          string,
          ReactNode,
        ][])
      : []),
    ['Event', <Copyable key="event" value={entry.id} label="event id" />],
    ...(entry.requestId
      ? ([['Request', <Copyable key="req" value={entry.requestId} label="request id" />]] as [
          string,
          ReactNode,
        ][])
      : []),
    ...(entry.ip ? ([['IP address', entry.ip]] as [string, ReactNode][]) : []),
  ];
  const context = contextRows(entry.context);
  return (
    <div className="grid gap-6 text-sm md:grid-cols-2">
      <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5">
        {rows.map(([term, description]) => (
          <Fragment key={term}>
            <dt className="text-muted-foreground">{term}</dt>
            <dd className="min-w-0 break-words">{description}</dd>
          </Fragment>
        ))}
      </dl>
      <div>
        <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Recorded details
        </p>
        {context.length === 0 ? (
          <p className="text-muted-foreground">Nothing else was recorded.</p>
        ) : (
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-1.5">
            {context.map(([key, value]) => (
              <Fragment key={key}>
                <dt className="text-muted-foreground">{key}</dt>
                <dd className="font-mono text-xs break-words">{value}</dd>
              </Fragment>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function Row({ entry }: { entry: AdminAuditEntry }) {
  const [open, setOpen] = useState(false);
  const target = targetText(entry);
  const link = targetPath(entry);
  const summary = actionText(entry.action);
  return (
    <>
      <TableRow className={cn(open && 'border-b-0 bg-muted/30')}>
        <TableCell className="w-8 pr-0">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            aria-expanded={open}
            aria-label={`${open ? 'Hide' : 'Show'} details of ${summary}`}
            onClick={() => setOpen((current) => !current)}
          >
            <ChevronRight className={cn('transition-transform', open && 'rotate-90')} />
          </Button>
        </TableCell>
        <TableCell className="whitespace-nowrap text-muted-foreground">
          <time dateTime={entry.at} title={formatDateTime(entry.at)}>
            {relativeTime(entry.at)}
          </time>
        </TableCell>
        <TableCell>
          <Badge variant={actionTone(entry)}>{summary}</Badge>
          {entry.result !== 'success' && (
            <Badge variant="destructive" className="ml-1">
              {entry.result === 'denied' ? 'Denied' : 'Failed'}
            </Badge>
          )}
        </TableCell>
        <TableCell className="max-w-64 truncate">
          {link ? (
            <Link {...link} className="hover:underline">
              {target}
            </Link>
          ) : (
            (target ?? <span className="text-muted-foreground">—</span>)
          )}
        </TableCell>
        <TableCell className="max-w-56 truncate text-muted-foreground" title={entry.actorId}>
          {entry.actorId}
        </TableCell>
      </TableRow>
      {open && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell />
          <TableCell colSpan={4} className="pt-1 pb-4">
            <Detail entry={entry} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

interface Props {
  /** Filters the page chooses; they change the list. */
  filters?: Partial<AdminAuditQuery>;
  /** Shown when nothing matches. */
  empty: ReactNode;
}

/**
 * Audit events newest first, each row opening to the full record. More are fetched a page at a
 * time with the server's cursor, so a long history never loads at once.
 */
export function AuditList({ filters = {}, empty }: Props) {
  const query = useInfiniteQuery({
    queryKey: ['admin', 'audit', filters],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      adminApi.listAudit({ ...filters, limit: PAGE, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  if (query.isPending) {
    return (
      <div className="flex flex-col gap-2" aria-label="Loading events">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-11" />
        ))}
      </div>
    );
  }
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
              <TableHead className="w-8" />
              <TableHead>When</TableHead>
              <TableHead>What happened</TableHead>
              <TableHead>About</TableHead>
              <TableHead>Who</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((entry) => (
              <Row key={entry.id} entry={entry} />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {items.length} event{items.length === 1 ? '' : 's'} shown
        </span>
        {query.hasNextPage && (
          <Button
            variant="outline"
            size="sm"
            disabled={query.isFetchingNextPage}
            onClick={() => void query.fetchNextPage()}
          >
            {query.isFetchingNextPage ? 'Loading…' : 'Load older events'}
          </Button>
        )}
      </div>
    </div>
  );
}
