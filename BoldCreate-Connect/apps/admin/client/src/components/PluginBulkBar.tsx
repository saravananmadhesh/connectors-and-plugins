import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi, type AdminPluginBulkUpdateBody, type PluginLifecycleStatus } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY } from '../lib/plugins';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Select } from './ui/input';

interface Props {
  /** Ids of every selected plugin, across pages. */
  ids: string[];
  onClear: () => void;
  /** Called with the ids that no longer exist. */
  onRemoved: (ids: string[]) => void;
}

const STATES: { value: PluginLifecycleStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'deprecated', label: 'Deprecated' },
  { value: 'suspended', label: 'Suspended' },
];

/** What can be done to the selected plugins at once. */
export function PluginBulkBar({ ids, onClear, onRemoved }: Props) {
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [state, setState] = useState<PluginLifecycleStatus | ''>('');
  const [notice, setNotice] = useState<string | null>(null);
  const [heldBack, setHeldBack] = useState<{
    ids: string[];
    body: Omit<AdminPluginBulkUpdateBody, 'ids' | 'force'>;
  } | null>(null);

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
    ]);
  };
  const plural = (n: number) => `${n} plugin${n === 1 ? '' : 's'}`;

  const sync = useMutation({
    mutationFn: () => adminApi.bulkSyncPlugins(ids),
    onSuccess: async (result) => {
      setHeldBack(null);
      setNotice(
        `Sync queued for ${plural(result.queued.length)}` +
          (result.skipped.length > 0
            ? `; ${result.skipped.length} left out (already syncing or no source).`
            : '.'),
      );
      await refresh();
    },
  });

  const publish = useMutation({
    mutationFn: () => adminApi.bulkPublishLatest(ids),
    onSuccess: async (result) => {
      setHeldBack(null);
      setNotice(
        `Published the latest version of ${plural(result.published.length)}` +
          (result.skipped.length > 0
            ? `; ${result.skipped.length} left out (already published, rejected or yanked).`
            : '.'),
      );
      await refresh();
    },
  });

  const update = useMutation({
    mutationFn: (input: {
      ids: string[];
      body: Omit<AdminPluginBulkUpdateBody, 'ids' | 'force'>;
      force: boolean;
    }) => adminApi.bulkUpdatePlugins({ ...input.body, ids: input.ids, force: input.force }),
    onSuccess: async (result, input) => {
      const installed = result.skipped.filter((item) => item.reason === 'installed');
      setNotice(`Updated ${plural(result.updated.length)}.`);
      setHeldBack(
        installed.length > 0 ? { ids: installed.map((item) => item.id), body: input.body } : null,
      );
      await refresh();
    },
  });

  const remove = useMutation({
    mutationFn: () => adminApi.bulkDeletePlugins(ids),
    onSuccess: async (result) => {
      setConfirming(false);
      const kept = result.skipped.filter((item) => item.reason === 'installed').length;
      setNotice(
        `Deleted ${plural(result.deleted.length)}` +
          (kept > 0 ? `; ${kept} kept because members have them installed.` : '.'),
      );
      onRemoved(result.deleted);
      await refresh();
    },
  });

  const error = sync.error ?? publish.error ?? update.error ?? remove.error;
  const busy = sync.isPending || publish.isPending || update.isPending || remove.isPending;
  const apply = (body: Omit<AdminPluginBulkUpdateBody, 'ids' | 'force'>) =>
    update.mutate({ ids, body, force: false });

  return (
    <div
      role="region"
      aria-label="Bulk actions"
      className="sticky top-0 z-10 mb-4 rounded-lg border bg-card p-3 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{ids.length} selected</span>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" />
        <Button variant="outline" size="sm" disabled={busy} onClick={() => sync.mutate()}>
          {sync.isPending ? 'Queuing…' : 'Sync selected'}
        </Button>
        <Button variant="outline" size="sm" disabled={busy} onClick={() => publish.mutate()}>
          {publish.isPending ? 'Publishing…' : 'Publish latest'}
        </Button>
        <Select
          aria-label="New state"
          className="h-8 w-36 text-xs"
          value={state}
          onChange={(event) => setState(event.target.value as PluginLifecycleStatus | '')}
        >
          <option value="">Set state…</option>
          {STATES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
        <Button
          variant="outline"
          size="sm"
          disabled={busy || state === ''}
          onClick={() => state !== '' && apply({ status: state })}
        >
          Apply state
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={busy}
          onClick={() => apply({ visibility: 'public' })}
        >
          Make public
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={busy}
          onClick={() => apply({ visibility: 'private' })}
        >
          Make private
        </Button>
        {confirming ? (
          <>
            <span>Delete {plural(ids.length)} and their versions?</span>
            <Button
              variant="destructive"
              size="sm"
              disabled={remove.isPending}
              onClick={() => remove.mutate()}
            >
              {remove.isPending ? 'Deleting…' : 'Yes, delete'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => setConfirming(true)}>
            Delete selected
          </Button>
        )}
      </div>
      {notice && (
        <p role="status" className="mt-2 text-sm">
          {notice}
        </p>
      )}
      {heldBack && (
        <Alert variant="warning" className="mt-2 flex flex-wrap items-center gap-3">
          <span>
            {plural(heldBack.ids.length)} {heldBack.ids.length === 1 ? 'is' : 'are'} installed by
            members and {heldBack.ids.length === 1 ? 'was' : 'were'} left unchanged.
          </span>
          <Button
            size="sm"
            variant="destructive"
            disabled={update.isPending}
            onClick={() => update.mutate({ ids: heldBack.ids, body: heldBack.body, force: true })}
          >
            Apply anyway
          </Button>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" role="alert" className="mt-2">
          {errorMessage(error)}
        </Alert>
      )}
    </div>
  );
}
