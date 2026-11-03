import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Layers, Plus } from 'lucide-react';
import { projects } from '@/lib/api';
import { useAbilities } from '@/lib/abilities';
import type { PluginSetResponse } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import { Section } from '@/components/Page';
import { CatalogPicker } from './CatalogPicker';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

function SetNameDialog({
  title,
  initial,
  confirmLabel,
  onSubmit,
  onClose,
}: {
  title: string;
  initial: string;
  confirmLabel: string;
  onSubmit: (name: string) => Promise<unknown>;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  return (
    <Dialog open onOpenChange={(open) => !open && !pending && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogTitle>{title}</DialogTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            setPending(true);
            try {
              await onSubmit(name.trim());
              onClose();
            } catch (err) {
              setError(messageOf(err));
              setPending(false);
            }
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="set-name">Name</Label>
            <Input
              id="set-name"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending || name.trim() === ''}>
              {confirmLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function PluginSets({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [naming, setNaming] = useState<PluginSetResponse | 'new' | null>(null);
  const [deleting, setDeleting] = useState<PluginSetResponse | null>(null);
  const [filling, setFilling] = useState<PluginSetResponse | null>(null);
  const [error, setError] = useState('');
  const sets = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'plugin-sets', { cursor: paging.cursor }),
    queryFn: () => projects.pluginSets(orgId, projectId, { cursor: paging.cursor }),
  });
  const refresh = () =>
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'plugin-sets') });
  const remove = useMutation({
    mutationFn: (setId: string) => projects.deletePluginSet(orgId, projectId, setId),
    onSuccess: () => {
      setDeleting(null);
      refresh();
    },
    onError: (err) => {
      setDeleting(null);
      setError(messageOf(err));
    },
  });
  const removeMember = useMutation({
    mutationFn: ({ setId, pluginId }: { setId: string; pluginId: string }) =>
      projects.removeFromPluginSet(orgId, projectId, setId, pluginId),
    onSuccess: refresh,
    onError: (err) => setError(messageOf(err)),
  });
  const items = sets.data?.items ?? [];
  // The set being filled follows the list, so a member just added shows without reopening.
  const fillingNow = filling ? (items.find((entry) => entry.id === filling.id) ?? filling) : null;

  return (
    <Section
      title="Plugin sets"
      description="Named groups of plugins. When your server opens a session it can name a set to give that user only those plugins."
      action={
        canWrite ? (
          <Button size="sm" onClick={() => setNaming('new')}>
            <Plus aria-hidden="true" />
            Create set
          </Button>
        ) : undefined
      }
    >
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="plugin sets"
        isPending={sets.isPending}
        error={sets.error}
        onRetry={() => void sets.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <EmptyState
            icon={Layers}
            title="No plugin sets yet"
            description="A set is a named group of plugins. Create one to give some users only those plugins."
          />
        ) : (
          <div className="space-y-3">
            {items.map((set) => (
              <Card key={set.id} className="space-y-2 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{set.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {set.plugins.length === 1 ? '1 plugin' : `${set.plugins.length} plugins`}
                    </p>
                  </div>
                  {canWrite && (
                    <div className="flex shrink-0 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Add to ${set.name}`}
                        onClick={() => setFilling(set)}
                      >
                        Add plugins
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Rename ${set.name}`}
                        onClick={() => setNaming(set)}
                      >
                        Rename
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label={`Delete ${set.name}`}
                        onClick={() => setDeleting(set)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
                {set.plugins.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No plugins in this set.</p>
                ) : (
                  <ul className="divide-y rounded-md border">
                    {set.plugins.map((plugin) => (
                      <li
                        key={plugin.pluginId}
                        className="flex items-center justify-between gap-3 px-3 py-1.5"
                      >
                        <span className="min-w-0 truncate text-sm">{plugin.displayName}</span>
                        {canWrite && (
                          <Button
                            className="shrink-0"
                            size="sm"
                            variant="outline"
                            aria-label={`Remove ${plugin.displayName} from ${set.name}`}
                            onClick={() =>
                              removeMember.mutate({ setId: set.id, pluginId: plugin.pluginId })
                            }
                          >
                            Remove
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={sets.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </div>
        )}
      </QueryFrame>
      {naming && (
        <SetNameDialog
          title={naming === 'new' ? 'Create a set' : 'Rename the set'}
          initial={naming === 'new' ? '' : naming.name}
          confirmLabel={naming === 'new' ? 'Create' : 'Rename'}
          onSubmit={async (name) => {
            if (naming === 'new') await projects.createPluginSet(orgId, projectId, { name });
            else await projects.renamePluginSet(orgId, projectId, naming.id, name);
            refresh();
          }}
          onClose={() => setNaming(null)}
        />
      )}
      {fillingNow && (
        <CatalogPicker
          orgId={orgId}
          projectId={projectId}
          title={`Add to ${fillingNow.name}`}
          actionLabel="Add"
          taken={new Set(fillingNow.plugins.map((plugin) => plugin.pluginId))}
          onPick={async (pluginId) => {
            await projects.addToPluginSet(orgId, projectId, fillingNow.id, pluginId);
            refresh();
          }}
          onClose={() => setFilling(null)}
        />
      )}
      {deleting && (
        <ConfirmDialog
          open
          title={`Delete ${deleting.name}?`}
          description="Sessions that name this set stop resolving it."
          confirmLabel="Delete"
          pending={remove.isPending}
          onConfirm={() => remove.mutate(deleting.id)}
          onClose={() => setDeleting(null)}
        />
      )}
    </Section>
  );
}

/** Plugin sets for the Settings tab, whose own write right belongs to the webhook. */
export function PluginSetsPanel({ orgId, projectId }: Pick<TabProps, 'orgId' | 'projectId'>) {
  const { can } = useAbilities(orgId);
  return <PluginSets orgId={orgId} projectId={projectId} canWrite={can('project-plugin:write')} />;
}
