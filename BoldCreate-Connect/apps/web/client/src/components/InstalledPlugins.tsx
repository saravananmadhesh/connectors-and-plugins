import { useState } from 'react';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  ArrowUpCircle,
  KeyRound,
  MoreHorizontal,
  Plug,
  Power,
  PowerOff,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import {
  installations,
  mcpServers,
  ApiError,
  type InstallationResponse,
  type ScopeKey,
} from '@/lib/api';
import { INSTALL_STATE_LABEL, installState, type InstallState } from '@/lib/install-setup';
import { qk } from '@/lib/query-keys';
import { relativeTime, formatDateTime } from '@/lib/format';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ActiveBadge } from '@/components/StatusBadge';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { InstallSetupDialog } from '@/components/InstallSetup';
import { PluginTile } from '@/components/PluginTile';
import { UpgradeDialog } from '@/components/UpgradeDialog';
import { VariablesDialog } from '@/components/VariablesDialog';

const REPLACER = {
  org: 'organization',
  project: 'project',
  user: 'personal',
} as const;

const STATE_VARIANT = {
  installed: 'secondary',
  'needs-setup': 'warning',
  connected: 'success',
} as const satisfies Record<InstallState, string>;

interface Props {
  orgId: string;
  scopeKey: ScopeKey;
  items: readonly InstallationResponse[];
  canUpdate: boolean;
  canDelete: boolean;
}

/** The plugins installed in one scope, with enable, disable and remove. */
export function InstalledPlugins({ orgId, scopeKey, items, canUpdate, canDelete }: Props) {
  const qc = useQueryClient();
  const [error, setError] = useState('');
  const [removing, setRemoving] = useState<InstallationResponse | undefined>();
  const [upgrading, setUpgrading] = useState<InstallationResponse | undefined>();
  const [configuring, setConfiguring] = useState<InstallationResponse | undefined>();
  const [settingUp, setSettingUp] = useState<InstallationResponse | undefined>();

  // What each plugin still needs, from the same queries the setup dialog uses.
  const setupQueries = useQueries({
    queries: items.flatMap((item) => [
      {
        queryKey: qk.variables(scopeKey, item.id),
        queryFn: () => installations.listVariables(orgId, scopeKey, item.id),
      },
      {
        queryKey: qk.mcpServers(scopeKey, item.id),
        queryFn: () => mcpServers.list(orgId, scopeKey, item.id),
      },
    ]),
  });
  const stateOf = (index: number): InstallState | undefined => {
    const variables = setupQueries[index * 2]?.data as
      | Awaited<ReturnType<typeof installations.listVariables>>
      | undefined;
    const servers = setupQueries[index * 2 + 1]?.data as
      | Awaited<ReturnType<typeof mcpServers.list>>
      | undefined;
    if (!variables || !servers) return undefined;
    return installState(
      variables.items.filter((variable) => !variable.custom),
      servers.items,
    );
  };

  const refresh = () => qc.invalidateQueries({ queryKey: qk.installations(scopeKey) });
  const fail = (err: unknown) => setError(err instanceof ApiError ? err.message : 'Failed');

  const toggle = useMutation({
    mutationFn: (item: InstallationResponse) =>
      installations.update(orgId, scopeKey, item.id, { active: !item.active }),
    onSuccess: () => {
      setError('');
      return refresh();
    },
    onError: fail,
  });

  const changePolicy = useMutation({
    mutationFn: (item: InstallationResponse) =>
      installations.update(orgId, scopeKey, item.id, {
        updatePolicy: item.updatePolicy === 'pinned' ? 'follow_latest' : 'pinned',
      }),
    onSuccess: () => {
      setError('');
      return refresh();
    },
    onError: fail,
  });

  const remove = useMutation({
    mutationFn: (item: InstallationResponse) => installations.delete(orgId, scopeKey, item.id),
    onSuccess: async () => {
      setError('');
      setRemoving(undefined);
      await refresh();
    },
    onError: (err) => {
      setRemoving(undefined);
      fail(err);
    },
  });

  return (
    <div className="space-y-3">
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Plugin</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Updates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Setup</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const state = stateOf(index);
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <PluginTile src={item.pluginLogoUrl} />
                      <span className="font-medium">{item.pluginName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">v{item.pluginVersion}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.updatePolicy === 'follow_latest' ? 'Follows latest' : 'Pinned'}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1">
                      {item.replacedBy ? (
                        <Badge
                          variant="secondary"
                          title={`Replaced by ${REPLACER[item.replacedBy]} install`}
                        >
                          Disabled
                        </Badge>
                      ) : (
                        <ActiveBadge active={item.active} />
                      )}
                      {item.required && <Badge variant="info">Enforced</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {state === undefined ? (
                      <span className="text-xs text-muted-foreground">…</span>
                    ) : state === 'needs-setup' && canUpdate ? (
                      <button
                        type="button"
                        aria-label={`Set up ${item.pluginName}`}
                        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => setSettingUp(item)}
                      >
                        <Badge variant={STATE_VARIANT[state]}>{INSTALL_STATE_LABEL[state]}</Badge>
                      </button>
                    ) : (
                      <Badge variant={STATE_VARIANT[state]}>{INSTALL_STATE_LABEL[state]}</Badge>
                    )}
                  </TableCell>
                  <TableCell
                    className="text-muted-foreground"
                    title={formatDateTime(item.updatedAt)}
                  >
                    {relativeTime(item.updatedAt)}
                  </TableCell>
                  <TableCell>
                    {(canUpdate || canDelete) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${item.pluginName}`}
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {canUpdate && (
                            <DropdownMenuItem
                              disabled={toggle.isPending || Boolean(item.replacedBy)}
                              onSelect={() => toggle.mutate(item)}
                            >
                              {item.active ? <PowerOff /> : <Power />}
                              {item.active ? 'Disable' : 'Enable'}
                            </DropdownMenuItem>
                          )}
                          {canUpdate && (
                            <DropdownMenuItem onSelect={() => setSettingUp(item)}>
                              <Plug />
                              {state === 'needs-setup' ? 'Set up' : 'Connection'}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onSelect={() => setConfiguring(item)}>
                            <KeyRound />
                            Variables
                          </DropdownMenuItem>
                          {canUpdate && (
                            <DropdownMenuItem onSelect={() => setUpgrading(item)}>
                              <ArrowUpCircle />
                              Change version
                            </DropdownMenuItem>
                          )}
                          {canUpdate && (
                            <DropdownMenuItem
                              disabled={changePolicy.isPending}
                              onSelect={() => changePolicy.mutate(item)}
                            >
                              <RefreshCw />
                              {item.updatePolicy === 'pinned'
                                ? 'Follow latest'
                                : 'Pin this version'}
                            </DropdownMenuItem>
                          )}
                          {canUpdate && canDelete && <DropdownMenuSeparator />}
                          {canDelete && (
                            <DropdownMenuItem destructive onSelect={() => setRemoving(item)}>
                              <Trash2 />
                              Remove
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {settingUp && (
        <InstallSetupDialog
          orgId={orgId}
          scopeKey={scopeKey}
          installationId={settingUp.id}
          pluginName={settingUp.pluginName}
          onClose={() => setSettingUp(undefined)}
        />
      )}

      {configuring && (
        <VariablesDialog
          orgId={orgId}
          scopeKey={scopeKey}
          installationId={configuring.id}
          pluginName={configuring.pluginName}
          canWrite={canUpdate}
          onClose={() => setConfiguring(undefined)}
        />
      )}

      {upgrading && (
        <UpgradeDialog
          orgId={orgId}
          scopeKey={scopeKey}
          installation={upgrading}
          onClose={() => setUpgrading(undefined)}
        />
      )}

      <ConfirmDialog
        open={Boolean(removing)}
        title={`Remove ${removing?.pluginName ?? 'plugin'}?`}
        description="Its agents, skills and servers stop being available to the people it was installed for."
        confirmLabel="Remove"
        pending={remove.isPending}
        onConfirm={() => removing && remove.mutate(removing)}
        onClose={() => setRemoving(undefined)}
      />
    </div>
  );
}
