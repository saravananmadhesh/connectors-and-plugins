import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '@boldcreate-integrations/contracts';
import { Puzzle, Search } from 'lucide-react';
import { marketplace, projects } from '@/lib/api';
import type { ProjectPluginResponse } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Select } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { EmptyState } from '@/components/EmptyState';
import { Section } from '@/components/Page';
import { CatalogBrowser } from '../CatalogPicker';
import { CursorPager, QueryFrame, type TabProps } from '../shared';
import { messageOf, useCursorPaging } from '../paging';
import { AddPluginDialog } from './AddPluginDialog';
import { ConfigureDialog } from './ConfigureDialog';
import { StatusChip } from './StatusChip';
import { STATUS_LABELS, type PluginStatus } from './status';

function VersionDialog({
  orgId,
  projectId,
  plugin,
  onClose,
}: {
  orgId: string;
  projectId: string;
  plugin: ProjectPluginResponse;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [versionId, setVersionId] = useState<string>(plugin.versionId);
  const [error, setError] = useState('');
  const versions = useQuery({
    queryKey: ['marketplace', 'plugin', plugin.pluginId, 'versions'],
    queryFn: () => marketplace.listVersions(plugin.pluginId),
  });
  const save = useMutation({
    mutationFn: () =>
      projects.putPlugin(orgId, projectId, plugin.pluginId, { versionId: versionId as Id<'pv'> }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'plugins') });
      onClose();
    },
    onError: (err) => setError(messageOf(err)),
  });
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogTitle>{`Version of ${plugin.displayName}`}</DialogTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError('');
            save.mutate();
          }}
        >
          {error && <Alert variant="destructive">{error}</Alert>}
          <div className="space-y-1.5">
            <Label htmlFor="plugin-version">Version</Label>
            <Select
              id="plugin-version"
              value={versionId}
              onChange={(e) => setVersionId(e.target.value)}
            >
              {(versions.data?.items ?? []).map((version) => (
                <option key={version.id} value={version.id}>
                  {version.version}
                </option>
              ))}
              {!(versions.data?.items ?? []).some((version) => version.id === plugin.versionId) && (
                <option value={plugin.versionId}>{plugin.version}</option>
              )}
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending || versionId === plugin.versionId}>
              Change version
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type Mode = 'installed' | 'browse';

/** The plugins every user of the project gets, how each is set up, and the catalog to add from. */
export function PluginsView({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [mode, setMode] = useState<Mode>('installed');
  const [typed, setTyped] = useState('');
  const [status, setStatus] = useState<PluginStatus | ''>('');
  const [setup, setSetup] = useState<{ pluginId: string; displayName: string } | null>(null);
  const [configuring, setConfiguring] = useState<ProjectPluginResponse | null>(null);
  const [changing, setChanging] = useState<ProjectPluginResponse | null>(null);
  const [removing, setRemoving] = useState<ProjectPluginResponse | null>(null);
  const [error, setError] = useState('');
  const plugins = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'plugins', { cursor: paging.cursor }),
    queryFn: () => projects.plugins(orgId, projectId, { cursor: paging.cursor }),
  });
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'plugins') });
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'auth-configs') });
  };
  const remove = useMutation({
    mutationFn: (pluginId: string) => projects.removePlugin(orgId, projectId, pluginId),
    onSuccess: () => {
      setRemoving(null);
      refresh();
    },
    onError: (err) => {
      setRemoving(null);
      setError(messageOf(err));
    },
  });
  const all = plugins.data?.items ?? [];
  const term = typed.trim().toLowerCase();
  const items = all.filter(
    (plugin) =>
      (status === '' || plugin.setup?.status === status) &&
      (term === '' ||
        plugin.displayName.toLowerCase().includes(term) ||
        plugin.name.toLowerCase().includes(term)),
  );

  return (
    <div className="space-y-8">
      {error && <Alert variant="destructive">{error}</Alert>}
      <Section
        title="Plugins"
        description="Every user of the project gets the plugins added here."
        action={
          <div className="inline-flex rounded-md border p-0.5" role="group" aria-label="Show">
            {(['installed', 'browse'] as const).map((entry) => (
              <Button
                key={entry}
                size="sm"
                variant={mode === entry ? 'secondary' : 'ghost'}
                aria-pressed={mode === entry}
                onClick={() => setMode(entry)}
              >
                {entry === 'installed' ? 'Installed' : 'Browse'}
              </Button>
            ))}
          </div>
        }
      >
        {mode === 'browse' ? (
          canWrite ? (
            <CatalogBrowser
              orgId={orgId}
              projectId={projectId}
              actionLabel="Add"
              taken={new Set(all.map((plugin) => plugin.pluginId))}
              onPick={async (pluginId, displayName) => setSetup({ pluginId, displayName })}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              You can read the plugins of this project but not add to them.
            </p>
          )
        ) : (
          <QueryFrame
            label="plugins"
            isPending={plugins.isPending}
            error={plugins.error}
            onRetry={() => void plugins.refetch()}
          >
            {all.length === 0 && !paging.hasPrevious ? (
              <EmptyState
                icon={Puzzle}
                title="No plugins yet"
                description="Browse the catalog to give your users its tools."
              >
                {canWrite && (
                  <Button size="sm" onClick={() => setMode('browse')}>
                    Browse plugins
                  </Button>
                )}
              </EmptyState>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Search added plugins…"
                      aria-label="Search added plugins"
                      value={typed}
                      onChange={(e) => setTyped(e.target.value)}
                    />
                  </div>
                  <Select
                    aria-label="Status"
                    className="w-44"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PluginStatus | '')}
                  >
                    <option value="">All statuses</option>
                    {(Object.keys(STATUS_LABELS) as PluginStatus[]).map((entry) => (
                      <option key={entry} value={entry}>
                        {STATUS_LABELS[entry]}
                      </option>
                    ))}
                  </Select>
                </div>
                {items.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No plugin matches these filters.
                  </p>
                ) : (
                  <Card className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plugin</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="w-0" />
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((plugin) => (
                          <TableRow key={plugin.pluginId}>
                            <TableCell className="font-medium">{plugin.displayName}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap items-center gap-2">
                                <StatusChip status={plugin.setup?.status} />
                                {plugin.setup && plugin.setup.missing.length > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    {plugin.setup.missing.join(', ')}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{plugin.version}</TableCell>
                            <TableCell>{relativeTime(plugin.updatedAt)}</TableCell>
                            <TableCell>
                              {canWrite && (
                                <div className="flex gap-2">
                                  {(plugin.servers ?? []).length > 0 && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      aria-label={`Edit sign-in of ${plugin.displayName}`}
                                      onClick={() => setConfiguring(plugin)}
                                    >
                                      Edit
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    aria-label={`Change version of ${plugin.displayName}`}
                                    onClick={() => setChanging(plugin)}
                                  >
                                    Version
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    aria-label={`Remove ${plugin.displayName}`}
                                    onClick={() => setRemoving(plugin)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )}
                <CursorPager
                  hasPrevious={paging.hasPrevious}
                  nextCursor={plugins.data?.nextCursor}
                  onBack={paging.back}
                  onForward={paging.forward}
                />
              </div>
            )}
          </QueryFrame>
        )}
      </Section>
      {setup && (
        <AddPluginDialog
          orgId={orgId}
          projectId={projectId}
          pluginId={setup.pluginId}
          displayName={setup.displayName}
          onAdded={() => {
            setSetup(null);
            setMode('installed');
            refresh();
          }}
          onClose={() => setSetup(null)}
        />
      )}
      {configuring && (
        <ConfigureDialog
          orgId={orgId}
          projectId={projectId}
          plugin={configuring}
          onSaved={() => {
            setConfiguring(null);
            refresh();
          }}
          onClose={() => setConfiguring(null)}
        />
      )}
      {changing && (
        <VersionDialog
          orgId={orgId}
          projectId={projectId}
          plugin={changing}
          onClose={() => setChanging(null)}
        />
      )}
      {removing && (
        <ConfirmDialog
          open
          title={`Remove ${removing.displayName}?`}
          description="Users of the project lose the plugin the next time they sync."
          confirmLabel="Remove"
          pending={remove.isPending}
          onConfirm={() => remove.mutate(removing.pluginId)}
          onClose={() => setRemoving(null)}
        />
      )}
    </div>
  );
}
