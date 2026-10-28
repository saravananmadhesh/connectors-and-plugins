import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExternalLink, Pencil, RefreshCw } from 'lucide-react';
import { adminApi, type AdminPluginDetailResponse } from '../lib/api';
import { errorMessage } from '../lib/messages';
import { PLUGINS_KEY, isSyncing, pluginKey } from '../lib/plugins';
import { SourceLocationForm } from './SourceLocationForm';
import { Alert } from './ui/alert';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type Source = NonNullable<AdminPluginDetailResponse['source']>;

const githubUrl = (source: Source): string =>
  `https://github.com/${source.owner}/${source.repository}/tree/${source.ref}${source.path ? `/${source.path}` : ''}`;

function SyncState({ source }: { source: Source }) {
  if (source.lastStatus === 'queued') return <Badge variant="info">Waiting to sync</Badge>;
  if (source.lastStatus === 'running') return <Badge variant="info">Syncing</Badge>;
  if (source.lastStatus === 'failed') return <Badge variant="destructive">Last sync failed</Badge>;
  if (source.lastStatus === 'succeeded') return <Badge variant="success">Synced</Badge>;
  return <Badge variant="secondary">Never synced</Badge>;
}

/** Where the plugin comes from, whether it is being read, and the way to change either. */
export function PluginSourcePanel({ plugin }: { plugin: AdminPluginDetailResponse }) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const source = plugin.source;
  const sync = useMutation({
    mutationFn: () => adminApi.syncPlugin(plugin.id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: pluginKey(plugin.id) }),
        queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
      ]);
    },
  });
  const busy = isSyncing(source);

  return (
    <Card role="region" aria-label="Source" className="max-w-3xl">
      <CardHeader>
        <CardTitle>Source</CardTitle>
        <CardDescription>
          The GitHub folder this plugin is read from. New versions found there arrive as pending.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!source ? (
          <Alert variant="info">
            This plugin has no source, so there is nothing to sync. Set one to get new versions.
          </Alert>
        ) : (
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono break-all">
                  {source.owner}/{source.repository}
                  {source.path ? `/${source.path}` : ''}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span>Branch or tag {source.ref}</span>
                  <SyncState source={source} />
                  {source.lastSyncedAt && (
                    <span title={source.lastSyncedAt}>
                      Last synced {new Date(source.lastSyncedAt).toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={githubUrl(source)} target="_blank" rel="noreferrer noopener">
                    <ExternalLink />
                    Open on GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={busy || sync.isPending}
                  onClick={() => sync.mutate()}
                >
                  <RefreshCw className={busy ? 'animate-spin' : ''} />
                  {busy ? 'Sync in progress' : 'Check for new versions'}
                </Button>
              </div>
            </div>
            {source.lastStatus === 'failed' && source.lastError && (
              <Alert variant="destructive" role="alert" className="mt-3">
                {source.lastError}
              </Alert>
            )}
            {sync.isError && (
              <Alert variant="destructive" role="alert" className="mt-3">
                {errorMessage(sync.error)}
              </Alert>
            )}
          </div>
        )}
        {!editing && (
          <div>
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Pencil />
              {source ? 'Edit source' : 'Set source'}
            </Button>
          </div>
        )}
        {editing && (
          <SourceLocationForm
            key={source?.id ?? 'none'}
            initial={
              source
                ? {
                    owner: source.owner,
                    repository: source.repository,
                    ref: source.ref,
                    path: source.path,
                  }
                : null
            }
            save={(body) => adminApi.updatePluginSource(plugin.id, body)}
            onSaved={() =>
              Promise.all([
                queryClient.invalidateQueries({ queryKey: pluginKey(plugin.id) }),
                queryClient.invalidateQueries({ queryKey: PLUGINS_KEY }),
                queryClient.invalidateQueries({ queryKey: ['admin', 'audit'] }),
              ])
            }
            onDone={() => setEditing(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}
