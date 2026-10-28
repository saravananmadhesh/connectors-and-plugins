import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Ban, Check, Rocket, Undo2, X } from 'lucide-react';
import { adminApi, type AdminVersionSummary } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, REVIEW_COUNT_KEY, pluginKey, versionKey } from '../lib/plugins';
import { ImpactConfirm } from './ImpactConfirm';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

interface Props {
  version: AdminVersionSummary;
  pluginId: string;
}

/** Why a reviewer should look twice before publishing this version. */
function publishWarnings(version: AdminVersionSummary): string[] {
  const warnings: string[] = [];
  if (version.findings > 0) {
    warnings.push(
      `${version.findings} possible secret${version.findings === 1 ? ' was' : 's were'} found in it.`,
    );
  }
  return warnings;
}

/** The steps that apply to a version, as the server lists them; risky ones ask first. */
export function VersionActions({ version, pluginId }: Props) {
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState<'publish' | 'yank' | null>(null);
  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: versionKey(version.id) }),
      queryClient.invalidateQueries({ queryKey: pluginKey(pluginId) }),
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
      queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] }),
    ]);
  const change = useMutation({
    mutationFn: (step: 'approve' | 'reject' | 'reopen' | 'publish') =>
      adminApi.changeVersion(version.id, step),
    onSuccess: async () => {
      setDialog(null);
      await refresh();
    },
  });
  const yank = useMutation({
    mutationFn: (force: boolean) => adminApi.yankVersion(version.id, force),
    onSuccess: async () => {
      setDialog(null);
      await refresh();
    },
  });
  const can = (step: AdminVersionSummary['actions'][number]) => version.actions.includes(step);
  const close = () => {
    setDialog(null);
    change.reset();
    yank.reset();
  };
  const warnings = publishWarnings(version);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {can('approve') && (
          <Button
            variant="outline"
            disabled={change.isPending}
            onClick={() => change.mutate('approve')}
          >
            <Check />
            Approve
          </Button>
        )}
        {can('publish') && (
          <Button disabled={change.isPending} onClick={() => setDialog('publish')}>
            <Rocket />
            Publish
          </Button>
        )}
        {can('reject') && (
          <Button
            variant="outline"
            disabled={change.isPending}
            onClick={() => change.mutate('reject')}
          >
            <X />
            Reject
          </Button>
        )}
        {can('reopen') && (
          <Button
            variant="outline"
            disabled={change.isPending}
            onClick={() => change.mutate('reopen')}
          >
            <Undo2 />
            Reopen
          </Button>
        )}
        {can('yank') && (
          <Button variant="outline" onClick={() => setDialog('yank')}>
            <Ban />
            Yank
          </Button>
        )}
      </div>
      {change.isError && dialog === null && (
        <Alert variant="destructive" role="alert" className="mt-3">
          {errorMessage(change.error)}
        </Alert>
      )}

      <Dialog open={dialog === 'publish'} onOpenChange={(open) => !open && close()}>
        <DialogContent>
          <DialogTitle>Publish version {version.version}?</DialogTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Members can install it right away, and it becomes the version new installs get when it
            is the highest published one.
          </p>
          {warnings.length > 0 && (
            <Alert variant="warning" className="mt-3">
              <ul className="list-disc pl-5">
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </Alert>
          )}
          {change.isError && (
            <Alert variant="destructive" role="alert" className="mt-3">
              {errorMessage(change.error)}
            </Alert>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button disabled={change.isPending} onClick={() => change.mutate('publish')}>
              {change.isPending ? 'Publishing…' : 'Publish version'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dialog === 'yank'} onOpenChange={(open) => !open && close()}>
        {dialog === 'yank' && (
          <DialogContent>
            <DialogTitle>Yank version {version.version}?</DialogTitle>
            <ImpactConfirm
              embedded
              title={`Yank version ${version.version}?`}
              effect="Members can no longer install it. Copies that are already installed keep working."
              confirmLabel="Yank version"
              impactKey={[...versionKey(version.id), 'impact']}
              loadImpact={() => adminApi.versionImpact(version.id)}
              onConfirm={(force) => yank.mutate(force)}
              onCancel={close}
              pending={yank.isPending}
              error={yank.error}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
