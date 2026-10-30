import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { adminApi } from '../../lib/api';
import { errorMessage } from '../../lib/messages';
import { formatCount } from '../../lib/observability';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

/** Most requests one delete may take; each removes rows for up to a few seconds. */
const MAX_REQUESTS = 200;

type Table = 'error_event' | 'error_group' | 'ops_event';

const NOTE: Record<Table, string> = {
  error_group:
    'Errors last seen before this day are removed with their occurrences. Unresolved errors are always kept.',
  error_event:
    'Stored occurrences from before this day are removed. Their errors keep their counts.',
  ops_event: 'Events from before this day are removed.',
};

const dayStart = (value: string): Date => new Date(`${value}T00:00:00`);
const today = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

interface Props {
  table: Table;
  /** The table in plain words, as shown in the list. */
  label: string;
}

/**
 * Deletes one table's rows older than a chosen day. The server removes them in small paused
 * batches and stops at a time limit, so the delete is repeated here until nothing is left;
 * other services keep their share of the database meanwhile.
 */
export function PurgeControl({ table, label }: Props) {
  const queryClient = useQueryClient();
  const [day, setDay] = useState('');
  const [confirming, setConfirming] = useState(false);
  const purge = useMutation({
    mutationFn: async () => {
      const before = dayStart(day).toISOString();
      let removed = 0;
      for (let request = 0; request < MAX_REQUESTS; request += 1) {
        const step = await adminApi.purgeObservability({ table, before });
        removed += step.removed;
        if (step.done) return { removed, done: true };
      }
      return { removed, done: false };
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['admin', 'observability'] });
      void queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] });
    },
    onSuccess: () => setConfirming(false),
  });

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Input
          type="date"
          aria-label={`Delete ${label.toLowerCase()} older than`}
          className="h-8 w-40"
          max={today()}
          value={day}
          onChange={(event) => {
            setDay(event.target.value);
            purge.reset();
          }}
        />
        <Button
          variant="outline"
          size="sm"
          disabled={day === '' || purge.isPending}
          onClick={() => setConfirming(true)}
        >
          <Trash2 aria-hidden="true" /> Delete older
        </Button>
      </div>
      {purge.isSuccess && (
        <p role="status" className="text-xs text-muted-foreground">
          {purge.data.done
            ? `Removed ${formatCount(purge.data.removed)} rows.`
            : `Removed ${formatCount(purge.data.removed)} rows so far; run it again to continue.`}
        </p>
      )}
      <Dialog open={confirming} onOpenChange={(open) => !purge.isPending && setConfirming(open)}>
        <DialogContent>
          <DialogTitle>
            Delete {label.toLowerCase()} older than {day}?
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {NOTE[table]} This cannot be undone and is recorded in the audit log. The delete runs in
            small steps, so the services keep working while it runs.
          </p>
          {purge.isError && (
            <Alert variant="destructive" role="alert">
              {errorMessage(purge.error)}
            </Alert>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              disabled={purge.isPending}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" disabled={purge.isPending} onClick={() => purge.mutate()}>
              {purge.isPending ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
