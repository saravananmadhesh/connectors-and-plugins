import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  BadgeCheck,
  ExternalLink,
  Eye,
  EyeOff,
  MoreHorizontal,
  PauseCircle,
  Play,
  RefreshCw,
  Star,
  Trash2,
  TriangleAlert,
} from 'lucide-react';
import { adminApi, type AdminPluginSummary, type PluginFlagsBody } from '../lib/api';
import { errorMessage } from '../lib/messages';
import {
  ACTION_COPY,
  PLUGINS_KEY,
  REVIEW_COUNT_KEY,
  isSyncing,
  type PluginAction,
} from '../lib/plugins';
import { ImpactConfirm } from './ImpactConfirm';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Props {
  plugin: AdminPluginSummary;
  /** Reports a failed action so the row can show it; null clears it. */
  onError: (message: string | null) => void;
  /** On the plugin's own page there is no "Open", and deleting leaves for the list. */
  onPage?: boolean;
}

/** Everything an operator can do to one plugin, behind a single menu. */
export function PluginRowMenu({ plugin, onError, onPage = false }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [action, setAction] = useState<PluginAction | null>(null);
  const syncing = isSyncing(plugin.source);
  const reviewing = plugin.versionCounts.pending + plugin.versionCounts.approved;

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      queryClient.invalidateQueries({ queryKey: REVIEW_COUNT_KEY }),
    ]);
  const settle = {
    onMutate: () => onError(null),
    onError: (error: unknown) => onError(errorMessage(error)),
    onSuccess: refresh,
  };
  const sync = useMutation({ mutationFn: () => adminApi.syncPlugin(plugin.id), ...settle });
  const flags = useMutation({
    mutationFn: (body: PluginFlagsBody) => adminApi.setPluginFlags(plugin.id, body),
    ...settle,
  });
  const reactivate = useMutation({
    mutationFn: () => adminApi.setPluginStatus(plugin.id, { status: 'active', force: false }),
    ...settle,
  });
  const change = useMutation({
    mutationFn: (input: { status: 'deprecated' | 'suspended'; force: boolean }) =>
      adminApi.setPluginStatus(plugin.id, input),
    onSuccess: async () => {
      setAction(null);
      await refresh();
    },
  });
  const remove = useMutation({
    mutationFn: () => adminApi.deletePlugin(plugin.id),
    onSuccess: async () => {
      setAction(null);
      await refresh();
      if (onPage) await navigate({ to: '/plugins' });
    },
  });

  const copy = action ? ACTION_COPY[action] : null;
  const close = () => {
    setAction(null);
    change.reset();
    remove.reset();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`Actions for ${plugin.displayName}`}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!onPage && (
            <DropdownMenuItem
              onSelect={() =>
                void navigate({ to: '/plugins/$pluginId', params: { pluginId: plugin.id } })
              }
            >
              <ExternalLink />
              {reviewing > 0 ? 'Open and review versions' : 'Open'}
            </DropdownMenuItem>
          )}
          <DropdownMenuItem disabled={!plugin.source || syncing} onSelect={() => sync.mutate()}>
            <RefreshCw />
            {plugin.source?.lastStatus === 'failed' ? 'Retry sync' : 'Sync now'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() =>
              flags.mutate({ visibility: plugin.visibility === 'private' ? 'public' : 'private' })
            }
          >
            {plugin.visibility === 'private' ? <Eye /> : <EyeOff />}
            {plugin.visibility === 'private' ? 'Make public' : 'Make private'}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => flags.mutate({ featured: !plugin.featured })}>
            <Star />
            {plugin.featured ? 'Remove from featured' : 'Mark as featured'}
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => flags.mutate({ verified: !plugin.verified })}>
            <BadgeCheck />
            {plugin.verified ? 'Remove verified' : 'Mark as verified'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {plugin.status !== 'active' && (
            <DropdownMenuItem onSelect={() => reactivate.mutate()}>
              <Play />
              Reactivate
            </DropdownMenuItem>
          )}
          {plugin.status === 'active' && (
            <DropdownMenuItem onSelect={() => setAction('deprecate')}>
              <TriangleAlert />
              Deprecate…
            </DropdownMenuItem>
          )}
          {plugin.status !== 'suspended' && (
            <DropdownMenuItem onSelect={() => setAction('suspend')}>
              <PauseCircle />
              Suspend…
            </DropdownMenuItem>
          )}
          <DropdownMenuItem destructive onSelect={() => setAction('delete')}>
            <Trash2 />
            Delete…
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={action !== null} onOpenChange={(open) => !open && close()}>
        {action && copy && (
          <DialogContent>
            <DialogTitle>{copy.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">{plugin.displayName}</p>
            <ImpactConfirm
              embedded
              title={copy.title}
              effect={copy.effect}
              confirmLabel={copy.confirm}
              impactKey={['admin', 'plugin', plugin.id, 'impact']}
              loadImpact={() => adminApi.pluginImpact(plugin.id)}
              onConfirm={(force) => {
                if (copy.status === 'deprecated' || copy.status === 'suspended') {
                  change.mutate({ status: copy.status, force });
                } else remove.mutate();
              }}
              onCancel={close}
              pending={change.isPending || remove.isPending}
              blockedByInstalls={action === 'delete'}
              error={change.error ?? remove.error}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
