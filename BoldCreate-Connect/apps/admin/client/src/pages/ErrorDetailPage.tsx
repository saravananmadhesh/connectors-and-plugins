import { Fragment, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  Trash2,
} from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { RefreshButton } from '../components/RefreshButton';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Skeleton } from '../components/ui/skeleton';
import { adminApi, type AdminErrorGroup, type AdminErrorOccurrence } from '../lib/api';
import { cn } from '../lib/cn';
import { formatDateTime, relativeTime } from '../lib/format';
import { errorMessage } from '../lib/messages';
import {
  ERROR_STATUS_TEXT,
  ERROR_STATUS_TONE,
  formatCount,
  occurrenceText,
  recordRows,
  errorJson,
  statusActions,
} from '../lib/observability';
import { CopyJsonButton } from '../components/observability/CopyJsonButton';
import { Bug } from 'lucide-react';

const errorKey = (id: string) => ['admin', 'observability', 'error', id] as const;

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

function CopyTrace({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mr-1.5 h-7 shrink-0 gap-1 px-2 text-xs"
      aria-label="Copy trace"
      onClick={() => void copy()}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? 'Copied' : 'Copy trace'}
    </Button>
  );
}

function Occurrence({
  item,
  group,
  open,
  onToggle,
}: {
  item: AdminErrorOccurrence;
  group: Pick<AdminErrorGroup, 'title' | 'service' | 'area'>;
  open: boolean;
  onToggle: () => void;
}) {
  const context = recordRows(item.context);
  const facts: [string, string | null][] = [
    ['Time', formatDateTime(item.occurredAt)],
    ['Environment', item.environment],
    ['Release', item.appVersion],
    ['Instance', item.instanceId],
    ['Request', item.requestId],
    ['Trace', item.traceId],
    ['Organization', item.orgId],
  ];
  return (
    <li className="rounded-lg border">
      <div className="flex items-center">
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? 'Hide' : 'Show'} occurrence from ${formatDateTime(item.occurredAt)}`}
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm outline-none hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ChevronRight className={cn('size-4 transition-transform', open && 'rotate-90')} />
          <time dateTime={item.occurredAt} title={formatDateTime(item.occurredAt)}>
            {relativeTime(item.occurredAt)}
          </time>
          <span className="text-muted-foreground">{item.environment}</span>
          {item.requestId && (
            <span className="ml-auto truncate font-mono text-xs text-muted-foreground">
              {item.requestId}
            </span>
          )}
        </button>
        <CopyTrace text={occurrenceText(group, item)} />
        <CopyJsonButton
          json={() => JSON.stringify({ ...group, occurrence: item }, null, 2)}
          label="occurrence"
          withText
          className="mr-1.5 h-7 shrink-0 gap-1 px-2 text-xs"
        />
      </div>
      {open && (
        <div className="grid gap-6 border-t p-4 text-sm lg:grid-cols-2">
          <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5 self-start">
            {facts.map(([term, value]) =>
              value ? (
                <Fragment key={term}>
                  <dt className="text-muted-foreground">{term}</dt>
                  <dd className="min-w-0">
                    <Copyable value={value} label={term.toLowerCase()} />
                  </dd>
                </Fragment>
              ) : null,
            )}
            {context.map(([key, value]) => (
              <Fragment key={key}>
                <dt className="text-muted-foreground">{key}</dt>
                <dd className="font-mono text-xs break-words">{value}</dd>
              </Fragment>
            ))}
          </dl>
          <div className="min-w-0">
            <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Stack
            </p>
            {item.stack ? (
              <pre className="max-h-96 overflow-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
                {item.stack}
              </pre>
            ) : (
              <p className="text-muted-foreground">
                No stack was kept for this occurrence. Only some repeats keep one.
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/** One error group: what it is, how often, its state, and the latest stored occurrences. */
export function ErrorDetailPage() {
  const { groupId } = useParams({ strict: false }) as { groupId: string };
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [opened, setOpened] = useState<ReadonlySet<string>>(new Set());
  const query = useQuery({
    queryKey: errorKey(groupId),
    queryFn: () => adminApi.getError(groupId),
  });
  const change = useMutation({
    mutationFn: (status: 'unresolved' | 'resolved' | 'ignored') =>
      adminApi.setErrorStatus(groupId, { status }),
    onSuccess: (data) => {
      queryClient.setQueryData(errorKey(groupId), data);
      void queryClient.invalidateQueries({ queryKey: ['admin', 'observability', 'errors'] });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] });
    },
  });
  const remove = useMutation({
    mutationFn: () => adminApi.deleteError(groupId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'observability'] });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] });
      void navigate({ to: '/observability', search: { tab: 'errors' } });
    },
  });

  const back = (
    <div className="mb-4 flex items-center justify-between gap-3">
      <Link
        to="/observability"
        search={{ tab: 'errors' }}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All errors
      </Link>
      <RefreshButton />
    </div>
  );
  if (query.isPending) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        {back}
        <Skeleton className="mb-4 h-16" aria-label="Loading error" />
        <Skeleton className="h-48" />
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="mx-auto max-w-7xl p-6">
        {back}
        <Alert variant="destructive" role="alert">
          {errorMessage(query.error)}
        </Alert>
      </div>
    );
  }
  const { group, occurrences } = query.data;
  return (
    <div className="mx-auto max-w-7xl p-6">
      {back}
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant={ERROR_STATUS_TONE[group.status]}>
              {ERROR_STATUS_TEXT[group.status]}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {group.service}
              {group.area ? ` · ${group.area}` : ''}
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight break-words">{group.title}</h1>
          <p className="text-sm text-muted-foreground">
            Seen {formatCount(group.count)} time{group.count === 1 ? '' : 's'}, first{' '}
            <time dateTime={group.firstSeen} title={formatDateTime(group.firstSeen)}>
              {relativeTime(group.firstSeen)}
            </time>
            , last{' '}
            <time dateTime={group.lastSeen} title={formatDateTime(group.lastSeen)}>
              {relativeTime(group.lastSeen)}
            </time>
            {group.appVersion ? `, in release ${group.appVersion}` : ''}.
            {group.resolvedAt
              ? ` ${ERROR_STATUS_TEXT[group.status]} ${relativeTime(group.resolvedAt)}${group.resolvedBy ? ` by ${group.resolvedBy}` : ''}.`
              : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <CopyJsonButton
            json={() => errorJson(group, occurrences)}
            label="error with occurrences"
            withText
            className="h-9 gap-1.5 px-3"
          />
          {statusActions(group.status).map((action, index) => (
            <Button
              key={action.to}
              variant={index === 0 ? 'default' : 'outline'}
              disabled={change.isPending}
              onClick={() => change.mutate(action.to)}
            >
              {action.label}
            </Button>
          ))}
          {group.status !== 'unresolved' && (
            <Button variant="outline" onClick={() => setConfirmingDelete(true)}>
              <Trash2 className="size-4" /> Delete
            </Button>
          )}
        </div>
      </header>
      <Dialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <DialogContent>
          <DialogTitle>Delete this error?</DialogTitle>
          <p className="text-sm text-muted-foreground">
            The group and its stored occurrences are removed for good. If it happens again, a new
            group starts. The deletion is recorded in the audit log.
          </p>
          {remove.isError && (
            <Alert variant="destructive" role="alert">
              {errorMessage(remove.error)}
            </Alert>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmingDelete(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={remove.isPending}
              onClick={() => remove.mutate()}
            >
              {remove.isPending ? 'Deleting…' : 'Delete error'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {change.isError && (
        <Alert variant="destructive" role="alert" className="mb-4">
          {errorMessage(change.error)}
        </Alert>
      )}
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Latest occurrences</h2>
        {occurrences.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={opened.size === occurrences.length}
              onClick={() => setOpened(new Set(occurrences.map((item) => item.id)))}
            >
              <ChevronsUpDown className="size-4" /> Expand all
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={opened.size === 0}
              onClick={() => setOpened(new Set())}
            >
              <ChevronsDownUp className="size-4" /> Collapse all
            </Button>
          </div>
        )}
      </div>
      {occurrences.length === 0 ? (
        <EmptyState
          icon={Bug}
          title="No occurrences are stored"
          description="Older occurrences are removed on a schedule. The group keeps its count."
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {occurrences.map((item) => (
            <Occurrence
              key={item.id}
              item={item}
              group={group}
              open={opened.has(item.id)}
              onToggle={() =>
                setOpened((current) => {
                  const next = new Set(current);
                  if (!next.delete(item.id)) next.add(item.id);
                  return next;
                })
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
