import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Id } from '@boldcreate-integrations/contracts';
import { Plus, Puzzle } from 'lucide-react';
import { marketplace, projects } from '@/lib/api';
import type { ProjectPluginResponse } from '@/lib/api';
import { relativeTime } from '@/lib/format';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Select } from '@/components/ui/input';
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
import { CatalogPicker } from './CatalogPicker';
import { configsOf, serverState, useServerSetup } from '@/lib/server-setup';
import { ServerSetup } from './ServerSetup';
import { CursorPager, QueryFrame, type TabProps } from './shared';
import { messageOf, useCursorPaging } from './paging';

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

/**
 * The step right after a plugin is added when one of its MCP servers still needs values or a
 * sign-in: the same setup as the Auth configs tab, for that plugin only.
 */
function PluginSetupDialog({
  orgId,
  projectId,
  pluginId,
  onClose,
}: {
  orgId: string;
  projectId: string;
  pluginId: string;
  onClose: () => void;
}) {
  const setup = useServerSetup(orgId, projectId);
  const servers = setup.servers.filter((server) => server.pluginId === pluginId);
  const name = servers[0]?.pluginDisplayName ?? 'the plugin';
  const ready = servers.every((server) => serverState(server) === 'ready');
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogTitle>Set up {name}</DialogTitle>
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted-foreground">
            Your users can call {name} once its servers have what they need. You can change this
            later under Auth configs.
          </p>
          <QueryFrame
            label="the setup"
            isPending={setup.isPending}
            error={setup.error}
            onRetry={setup.refetch}
          >
            <div className="space-y-6">
              {servers.map((server) => (
                <ServerSetup
                  key={server.componentId}
                  orgId={orgId}
                  projectId={projectId}
                  server={server}
                  configs={configsOf(setup.configs, server)}
                  canWrite
                />
              ))}
            </div>
          </QueryFrame>
          <div className="flex justify-end">
            <Button variant={ready ? 'default' : 'outline'} onClick={onClose}>
              {ready ? 'Done' : 'Later'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** The plugins every user of the project gets, and the values they need. */
export function PluginsTab({ orgId, projectId, canWrite }: TabProps) {
  const qc = useQueryClient();
  const paging = useCursorPaging();
  const [adding, setAdding] = useState(false);
  const [changing, setChanging] = useState<ProjectPluginResponse | null>(null);
  const [removing, setRemoving] = useState<ProjectPluginResponse | null>(null);
  const [settingUp, setSettingUp] = useState<string | null>(null);
  const [error, setError] = useState('');
  const plugins = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'plugins', { cursor: paging.cursor }),
    queryFn: () => projects.plugins(orgId, projectId, { cursor: paging.cursor }),
  });
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'plugins') });
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'auth-configs') });
    void qc.invalidateQueries({ queryKey: qk.projectPart(orgId, projectId, 'servers') });
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
  const items = plugins.data?.items ?? [];

  return (
    <div className="space-y-8">
      {error && <Alert variant="destructive">{error}</Alert>}
      <Section
        title="Plugins"
        description="Every user of the project gets these."
        action={
          canWrite ? (
            <Button size="sm" onClick={() => setAdding(true)}>
              <Plus aria-hidden="true" />
              Add plugin
            </Button>
          ) : undefined
        }
      >
        <QueryFrame
          label="plugins"
          isPending={plugins.isPending}
          error={plugins.error}
          onRetry={() => void plugins.refetch()}
        >
          {items.length === 0 && !paging.hasPrevious ? (
            <EmptyState
              icon={Puzzle}
              title="No plugins yet"
              description="Add a plugin from the catalog to give your users its tools."
            />
          ) : (
            <div className="space-y-3">
              <Card className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plugin</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-0" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((plugin) => (
                      <TableRow key={plugin.pluginId}>
                        <TableCell className="font-medium">{plugin.displayName}</TableCell>
                        <TableCell>{plugin.version}</TableCell>
                        <TableCell>{relativeTime(plugin.updatedAt)}</TableCell>
                        <TableCell>
                          {canWrite && (
                            <div className="flex gap-2">
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
              <CursorPager
                hasPrevious={paging.hasPrevious}
                nextCursor={plugins.data?.nextCursor}
                onBack={paging.back}
                onForward={paging.forward}
              />
            </div>
          )}
        </QueryFrame>
      </Section>
      {adding && (
        <CatalogPicker
          orgId={orgId}
          projectId={projectId}
          title="Add a plugin"
          actionLabel="Add"
          taken={new Set(items.map((plugin) => plugin.pluginId))}
          onPick={async (pluginId) => {
            await projects.putPlugin(orgId, projectId, pluginId);
            refresh();
            const servers = await qc.fetchQuery({
              queryKey: qk.projectPart(orgId, projectId, 'servers'),
              queryFn: () => projects.servers(orgId, projectId),
            });
            const needsSetup = servers.items.some(
              (server) => server.pluginId === pluginId && serverState(server) !== 'ready',
            );
            if (needsSetup) {
              setAdding(false);
              setSettingUp(pluginId);
            }
          }}
          onClose={() => setAdding(false)}
        />
      )}
      {settingUp && (
        <PluginSetupDialog
          orgId={orgId}
          projectId={projectId}
          pluginId={settingUp}
          onClose={() => setSettingUp(null)}
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
