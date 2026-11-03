import { Fragment, useState, type ReactNode } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { adminApi, type AdminOpsEvent, type AdminOpsEventsQuery } from '../../lib/api';
import { cn } from '../../lib/cn';
import { formatDateTime, relativeTime } from '../../lib/format';
import { errorMessage } from '../../lib/messages';
import {
  SEVERITY_TEXT,
  SEVERITY_TONE,
  eventJson,
  eventKindText,
  recordRows,
} from '../../lib/observability';
import { Alert } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CopyJsonButton } from './CopyJsonButton';
import { ListSkeleton, LoadMore } from './LoadMore';

const PAGE = 25;

function Detail({ event }: { event: AdminOpsEvent }) {
  const facts: [string, string | null][] = [
    ['Time', formatDateTime(event.occurredAt)],
    ['Kind', event.kind],
    ['Environment', event.environment],
    ['Release', event.appVersion],
    ['Instance', event.instanceId],
    ['Organization', event.orgId],
  ];
  const detail = recordRows(event.detail);
  return (
    <div className="grid gap-6 text-sm md:grid-cols-2">
      <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5">
        {facts.map(([term, value]) =>
          value ? (
            <Fragment key={term}>
              <dt className="text-muted-foreground">{term}</dt>
              <dd className="min-w-0 font-mono text-xs break-words">{value}</dd>
            </Fragment>
          ) : null,
        )}
      </dl>
      <div>
        <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Recorded details
        </p>
        {detail.length === 0 ? (
          <p className="text-muted-foreground">Nothing else was recorded.</p>
        ) : (
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-1.5">
            {detail.map(([key, value]) => (
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

function Row({ event }: { event: AdminOpsEvent }) {
  const [open, setOpen] = useState(false);
  const summary = eventKindText(event.kind);
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
          <time dateTime={event.occurredAt} title={formatDateTime(event.occurredAt)}>
            {relativeTime(event.occurredAt)}
          </time>
        </TableCell>
        <TableCell>
          <Badge variant={SEVERITY_TONE[event.severity]}>{SEVERITY_TEXT[event.severity]}</Badge>
        </TableCell>
        <TableCell className="font-medium">{summary}</TableCell>
        <TableCell className="text-muted-foreground">{event.service}</TableCell>
        <TableCell className="w-10 pr-2">
          <CopyJsonButton json={() => eventJson(event)} label={`event ${summary}`} />
        </TableCell>
      </TableRow>
      {open && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell />
          <TableCell colSpan={5} className="pt-1 pb-4">
            <Detail event={event} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

interface Props {
  filters?: Partial<AdminOpsEventsQuery>;
  empty: ReactNode;
}

/** Key events, newest first, a page at a time with the server's cursor. */
export function EventList({ filters = {}, empty }: Props) {
  const query = useInfiniteQuery({
    queryKey: ['admin', 'observability', 'events', filters],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) =>
      adminApi.listEvents({ ...filters, limit: PAGE, ...(pageParam ? { cursor: pageParam } : {}) }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
  });
  const items = query.data?.pages.flatMap((page) => page.items) ?? [];

  if (query.isPending) return <ListSkeleton label="Loading events" />;
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
              <TableHead>Severity</TableHead>
              <TableHead>What happened</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="w-10">
                <span className="sr-only">Copy</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((event) => (
              <Row key={event.id} event={event} />
            ))}
          </TableBody>
        </Table>
      </div>
      <LoadMore
        shown={items.length}
        noun="event"
        hasMore={query.hasNextPage}
        loading={query.isFetchingNextPage}
        onMore={() => void query.fetchNextPage()}
      />
    </div>
  );
}
