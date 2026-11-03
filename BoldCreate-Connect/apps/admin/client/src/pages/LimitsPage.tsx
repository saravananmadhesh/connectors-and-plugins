import { useState, type FormEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '../components/PageHeader';
import { Alert } from '../components/ui/alert';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { adminApi, type AdminLimitResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { LIMITS_KEY } from '../lib/plugins';

const number = new Intl.NumberFormat('en-US');

/** What the field accepts, or the sentence that says why not. */
function checkValue(text: string, limit: AdminLimitResponse): string | null {
  const value = Number(text);
  if (text.trim() === '' || !Number.isInteger(value)) return 'Enter a whole number.';
  if (value < limit.min || value > limit.max) {
    return `Use a value from ${number.format(limit.min)} to ${number.format(limit.max)}.`;
  }
  return null;
}

const unitOf = (limit: AdminLimitResponse): string => {
  switch (limit.unit) {
    case 'concurrent':
      return 'at once';
    case 'callers':
      return 'waiting';
    case 'seconds':
      return 'seconds';
    case 'milliseconds':
      return 'ms';
    case 'bytes':
      return 'bytes';
    case 'percent':
      return 'percent';
    default:
      return `per ${limit.windowSeconds} seconds`;
  }
};

const groupOf = (limit: AdminLimitResponse): string => limit.group ?? 'Requests';

function EditDialog({
  limit,
  onClose,
  onSaved,
}: {
  limit: AdminLimitResponse;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(String(limit.effectiveValue));
  const [reason, setReason] = useState('');
  const done = async () => {
    await queryClient.invalidateQueries({ queryKey: LIMITS_KEY });
    onSaved(`Saved. ${limit.label} for Global is recorded in the audit log.`);
    onClose();
  };
  const save = useMutation({
    mutationFn: () =>
      adminApi.setGlobalLimit(limit.key, { value: Number(value), reason: reason.trim() }),
    onSuccess: done,
  });
  const reset = useMutation({
    mutationFn: () => adminApi.resetGlobalLimit(limit.key, reason.trim()),
    onSuccess: done,
  });

  const problem = checkValue(value, limit);
  const hasReason = reason.trim() !== '';
  const busy = save.isPending || reset.isPending;
  const unchanged = Number(value) === limit.effectiveValue;
  const error = save.error ?? reset.error;
  const id = `limit-${limit.key}`;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (problem === null && hasReason && !unchanged && !busy) save.mutate();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={submit}>
          <DialogTitle>{limit.label}</DialogTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Global: the default for every organization and project.
          </p>
          <div className="mt-3 grid gap-3">
            <Label htmlFor={`${id}-value`}>
              Value
              <Input
                id={`${id}-value`}
                inputMode="numeric"
                autoComplete="off"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-invalid={problem !== null}
                aria-describedby={`${id}-help`}
              />
            </Label>
            <p
              id={`${id}-help`}
              className={problem ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'}
            >
              {problem ?? `Allowed: ${number.format(limit.min)} to ${number.format(limit.max)}.`}
            </p>
            <Label htmlFor={`${id}-reason`}>
              Reason
              <Input
                id={`${id}-reason`}
                autoComplete="off"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                maxLength={500}
              />
            </Label>
            <p className="text-xs text-muted-foreground">
              The reason is kept in the audit log. A change takes effect within about 30 seconds.
            </p>
          </div>
          {error && (
            <Alert variant="destructive" role="alert" className="mt-3">
              {errorMessage(error)}
            </Alert>
          )}
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {limit.globalValue !== null && (
              <Button
                type="button"
                variant="outline"
                className="text-destructive"
                disabled={!hasReason || busy}
                onClick={() => reset.mutate()}
              >
                Remove override
              </Button>
            )}
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={problem !== null || !hasReason || unchanged || busy}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Group({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: AdminLimitResponse[];
  onEdit: (limit: AdminLimitResponse) => void;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="overflow-x-auto rounded-lg border">
        <Table className="w-full table-fixed">
          <colgroup>
            {['w-[34%]', 'w-[16%]', 'w-[12%]', 'w-[12%]', 'w-[14%]', 'w-[12%]'].map(
              (width, column) => (
                <col key={column} className={width} />
              ),
            )}
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead className="truncate" title="Limit">
                Limit
              </TableHead>
              <TableHead className="truncate" title="In force">
                In force
              </TableHead>
              <TableHead className="truncate" title="Built-in">
                Built-in
              </TableHead>
              <TableHead className="truncate" title="Source">
                Source
              </TableHead>
              <TableHead className="truncate" title="Scope">
                Scope
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((limit) => (
              <TableRow key={limit.key}>
                <TableCell title={`${limit.label} (${limit.key})`}>
                  <div className="truncate">{limit.label}</div>
                  <div className="truncate text-xs text-muted-foreground">{limit.key}</div>
                </TableCell>
                <TableCell
                  className="truncate tabular-nums"
                  title={`${number.format(limit.effectiveValue)} ${unitOf(limit)}`}
                >
                  <strong>{number.format(limit.effectiveValue)}</strong>{' '}
                  <span className="text-muted-foreground">{unitOf(limit)}</span>
                </TableCell>
                <TableCell
                  className="truncate text-muted-foreground tabular-nums"
                  title={number.format(limit.defaultValue)}
                >
                  {number.format(limit.defaultValue)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {limit.editable === false
                      ? 'Environment'
                      : limit.globalValue === null
                        ? 'Built-in'
                        : 'Global'}
                  </Badge>
                </TableCell>
                <TableCell
                  className="truncate text-sm text-muted-foreground"
                  title={limit.editable === false ? 'Set in deployment config' : 'Global only'}
                >
                  {limit.editable === false ? 'Set in deployment config' : 'Global only'}
                </TableCell>
                <TableCell className="text-right">
                  {limit.editable === false ? null : (
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label={`Edit ${limit.label}`}
                      onClick={() => onEdit(limit)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export function LimitsPage() {
  const limits = useQuery({ queryKey: LIMITS_KEY, queryFn: adminApi.listLimits });
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const items = limits.data?.items ?? [];
  const current = items.find((limit) => limit.key === editing);
  const groups = [...new Set(items.map(groupOf))];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <PageHeader
        title="Limits"
        description="Request and capacity limits. Every change is recorded in the audit log."
      />
      <p role="status" className="mb-2 min-h-5 text-xs text-muted-foreground">
        {status}
      </p>
      <div className="mb-4 flex items-center gap-2 border-b" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className="border-b-2 border-foreground px-3 py-2 text-sm"
        >
          Defaults
        </button>
        <span className="flex-1" />
        <Link to="/audit" className="text-xs text-muted-foreground underline">
          Limit changes in the audit log
        </Link>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Defaults apply to every organization and project without its own override. A change reaches
        all api instances within about 30 seconds.
      </p>
      {limits.isPending && <Skeleton className="h-48" aria-label="Loading limits" />}
      {limits.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(limits.error)}
        </Alert>
      )}
      {groups.map((group) => (
        <Group
          key={group}
          title={group}
          items={items.filter((limit) => groupOf(limit) === group)}
          onEdit={(limit) => setEditing(limit.key)}
        />
      ))}
      {current && (
        <EditDialog
          key={current.key}
          limit={current}
          onClose={() => setEditing(null)}
          onSaved={setStatus}
        />
      )}
    </div>
  );
}
