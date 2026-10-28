import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ApiError,
  installations,
  marketplace,
  type InstallationResponse,
  type ScopeKey,
} from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/format';

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  installation: InstallationResponse;
  onClose: () => void;
}

/** Moves an installation to another published version and says what changed. */
export function UpgradeDialog({ orgId, scopeKey, installation, onClose }: Props) {
  const qc = useQueryClient();
  const [picked, setPicked] = useState('');

  const current = useQuery({
    queryKey: ['plugin-version', installation.pluginVersionId],
    queryFn: () => marketplace.getVersion(installation.pluginVersionId),
  });
  const pluginId = current.data?.pluginId;
  const versions = useQuery({
    queryKey: ['plugin-versions', pluginId],
    queryFn: () => marketplace.listVersions(pluginId ?? ''),
    enabled: Boolean(pluginId),
  });

  const options = (versions.data?.items ?? []).filter(
    (item) => item.status === 'published' && item.id !== installation.pluginVersionId,
  );
  const target = picked || options[0]?.id || '';

  const upgrade = useMutation({
    mutationFn: () =>
      installations.upgrade(orgId, scopeKey, installation.id, { pluginVersionId: target }),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.installations(scopeKey) }),
  });
  const loading = current.isPending || (Boolean(pluginId) && versions.isPending);
  const failed = current.isError || versions.isError;
  const result = upgrade.data;

  return (
    <Dialog open onOpenChange={(open) => !open && !upgrade.isPending && onClose()}>
      <DialogContent className="max-w-md">
        <DialogTitle>Change version of {installation.pluginName}</DialogTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Installed: v{installation.pluginVersion}
        </p>

        <div className="mt-4 space-y-3">
          {loading && <Skeleton className="h-16 w-full" />}
          {failed && <Alert variant="destructive">Could not load the versions. Try again.</Alert>}
          {upgrade.isError && (
            <Alert variant="destructive">
              {upgrade.error instanceof ApiError
                ? upgrade.error.message
                : 'Could not change the version'}
            </Alert>
          )}

          {!loading && !failed && options.length === 0 && !result && (
            <Alert>There is no other published version to move to.</Alert>
          )}

          {!result && options.length > 0 && (
            <fieldset className="grid gap-1.5" disabled={upgrade.isPending}>
              <legend className="mb-1.5 text-sm font-medium">Move to</legend>
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm"
                >
                  <input
                    type="radio"
                    name="upgrade-version"
                    value={option.id}
                    checked={target === option.id}
                    onChange={() => setPicked(option.id)}
                  />
                  <span className="font-mono">v{option.version}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDate(option.publishedAt)}
                  </span>
                </label>
              ))}
            </fieldset>
          )}

          {result && (
            <div className="space-y-2">
              <Alert variant="success">Now on v{result.newVersion}.</Alert>
              {result.droppedComponents.length > 0 && (
                <Alert variant="warning">
                  Removed in this version: {result.droppedComponents.join(', ')}.
                </Alert>
              )}
              {result.newDisabledComponents.length > 0 && (
                <Alert>New and switched off: {result.newDisabledComponents.join(', ')}.</Alert>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {result ? (
            <Button onClick={onClose}>Done</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose} disabled={upgrade.isPending}>
                Cancel
              </Button>
              <Button onClick={() => upgrade.mutate()} disabled={!target || upgrade.isPending}>
                {upgrade.isPending && <Spinner />}
                Change version
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
