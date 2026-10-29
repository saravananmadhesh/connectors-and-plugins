import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { projects } from '@/lib/api';
import type { PluginSetResponse, UserInstallMode } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Select } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Section } from '@/components/Page';
import { CatalogPicker } from './CatalogPicker';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

const MODES: readonly { value: UserInstallMode; label: string; help: string }[] = [
  { value: 'off', label: 'Off', help: 'Users cannot install plugins themselves.' },
  {
    value: 'allowlist',
    label: 'Allowed list',
    help: 'Users may install the plugins listed below.',
  },
  { value: 'any', label: 'Any plugin', help: 'Users may install anything in the catalog.' },
];

function InstallMode({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const [error, setError] = useState('');
  const mode = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'install-mode'),
    queryFn: () => projects.installMode(orgId, projectId),
  });
  const save = useMutation({
    mutationFn: (next: UserInstallMode) => projects.setInstallMode(orgId, projectId, next),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'install-mode') }),
    onError: (err) => setError(messageOf(err)),
  });
  const current = mode.data?.mode;
  return (
    <Section
      title="Who may install"
      description="What the people of this project may add for themselves."
    >
      <QueryFrame
        label="the install mode"
        isPending={mode.isPending}
        error={mode.error}
        onRetry={() => void mode.refetch()}
      >
        <Card className="space-y-2 p-4">
          {error && <Alert variant="destructive">{error}</Alert>}
          <Select
            id="install-mode"
            aria-label="Who may install"
            className="max-w-xs"
            value={current}
            disabled={!canWrite || save.isPending}
            onChange={(e) => {
              setError('');
              save.mutate(e.target.value as UserInstallMode);
            }}
          >
            {MODES.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </Select>
          <p className="text-xs text-muted-foreground">
            {MODES.find((entry) => entry.value === current)?.help}
          </p>
        </Card>
      </QueryFrame>
    </Section>
  );
}

function AllowedPlugins({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const allowed = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'allowed-plugins', { cursor: paging.cursor }),
    queryFn: () => projects.allowedPlugins(orgId, projectId, { cursor: paging.cursor }),
  });
  const refresh = () =>
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'allowed-plugins') });
  const remove = useMutation({
    mutationFn: (pluginId: string) => projects.disallowPlugin(orgId, projectId, pluginId),
    onSuccess: refresh,
    onError: (err) => setError(messageOf(err)),
  });
  const items = allowed.data?.items ?? [];
  return (
    <Section
      title="Allowed plugins"
      description="What users may install when the mode is the allowed list."
      action={
        canWrite ? (
          <Button size="sm" onClick={() => setAdding(true)}>
            <Plus aria-hidden="true" />
            Allow a plugin
          </Button>
        ) : undefined
      }
    >
      {error && <Alert variant="destructive">{error}</Alert>}
      <QueryFrame
        label="allowed plugins"
        isPending={allowed.isPending}
        error={allowed.error}
        onRetry={() => void allowed.refetch()}
      >
        {items.length === 0 && !paging.hasPrevious ? (
          <p className="text-sm text-muted-foreground">No plugin is allowed yet.</p>
        ) : (
          <div className="space-y-3">
            <Card>
              <ul className="divide-y">
                {items.map((plugin) => (
                  <li
                    key={plugin.pluginId}
                    className="flex items-center justify-between gap-3 px-4 py-2.5"
                  >
                    <span className="min-w-0 truncate text-sm">{plugin.displayName}</span>
                    {canWrite && (
                      <Button
                        className="shrink-0"
                        size="sm"
                        variant="outline"
                        aria-label={`Disallow ${plugin.displayName}`}
                        disabled={remove.isPending}
                        onClick={() => remove.mutate(plugin.pluginId)}
                      >
                        Remove
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
            <CursorPager
              hasPrevious={paging.hasPrevious}
              nextCursor={allowed.data?.nextCursor}
              onBack={paging.back}
              onForward={paging.forward}
            />
          </div>
        )}
      </QueryFrame>
      {adding && (
        <CatalogPicker
          orgId={orgId}
          projectId={projectId}
          title="Allow a plugin"
          actionLabel="Allow"
          taken={new Set(items.map((plugin) => plugin.pluginId))}
          onPick={async (pluginId) => {
            await projects.allowPlugin(orgId, projectId, pluginId);
            refresh();
          }}
          onClose={() => setAdding(false)}
        />
      )}
    </Section>
  );
}

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

function PluginSets({ orgId, projectId, canWrite }: TabProps) {
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
      description="Named groups of plugins your server can hand to a session."
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
          <p className="text-sm text-muted-foreground">No sets yet.</p>
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

/** What the project's users may install on their own, and the sets a session can name. */
export function CatalogTab(props: TabProps) {
  return (
    <div className="space-y-8">
      <InstallMode {...props} />
      <AllowedPlugins {...props} />
      <PluginSets {...props} />
    </div>
  );
}
