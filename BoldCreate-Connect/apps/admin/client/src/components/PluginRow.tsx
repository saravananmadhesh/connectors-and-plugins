import { useState, type MouseEvent } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { RefreshCw } from 'lucide-react';
import type { AdminPluginSummary } from '../lib/api';
import { isSyncing, type PluginColumn } from '../lib/plugins';
import { ComponentCounts } from './ComponentCounts';
import { PluginLogo } from './PluginLogo';
import { PluginRowMenu } from './PluginRowMenu';
import { PluginStatusBadge } from './StatusBadge';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { TableCell, TableRow } from './ui/table';

interface Props {
  plugin: AdminPluginSummary;
  /** Present while rows can be picked for a bulk action. */
  selection?: { selected: boolean; onToggle: () => void };
  /** The optional columns that are shown. */
  columns: ReadonlySet<PluginColumn>;
}

function SourceCell({ source }: { source: AdminPluginSummary['source'] }) {
  if (!source) return <span className="text-muted-foreground">No source</span>;
  const failed = source.lastStatus === 'failed';
  return (
    <>
      <p className="font-mono text-xs">
        {source.owner}/{source.repository}
        <span className="text-muted-foreground">@{source.ref}</span>
      </p>
      {isSyncing(source) ? (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <RefreshCw className="size-3 animate-spin" />
          Syncing
        </p>
      ) : failed ? (
        <p className="text-xs text-destructive" title={source.lastError ?? 'The last sync failed'}>
          Sync failed
        </p>
      ) : source.lastSyncedAt ? (
        <p className="text-xs text-muted-foreground" title={source.lastSyncedAt}>
          Synced {new Date(source.lastSyncedAt).toLocaleDateString()}
        </p>
      ) : null}
    </>
  );
}

/** One plugin: the row opens it, the last cell holds everything else you can do to it. */
export function PluginRow({ plugin, selection, columns }: Props) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Clicks inside the menu or dialog bubble through their portals; only the row itself opens the plugin.
  const open = (event: MouseEvent<HTMLTableRowElement>) => {
    const target = event.target as HTMLElement;
    if (!event.currentTarget.contains(target) || target.closest('a,button,input,[role="switch"]')) {
      return;
    }
    void navigate({ to: '/plugins/$pluginId', params: { pluginId: plugin.id } });
  };

  return (
    <TableRow
      data-state={selection?.selected ? 'selected' : undefined}
      onClick={open}
      className="cursor-pointer"
    >
      {selection && (
        <TableCell className="w-8">
          <Checkbox
            checked={selection.selected}
            onChange={selection.onToggle}
            aria-label={`Select ${plugin.displayName}`}
          />
        </TableCell>
      )}
      <TableCell className="max-w-80">
        <div className="flex items-center gap-3">
          <PluginLogo src={plugin.logoUrl} />
          <div className="min-w-0">
            <Link
              to="/plugins/$pluginId"
              params={{ pluginId: plugin.id }}
              className="font-medium hover:underline"
            >
              {plugin.displayName}
            </Link>
            <p className="truncate text-xs text-muted-foreground">{plugin.name}</p>
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </TableCell>
      {columns.has('category') && (
        <TableCell>
          {plugin.categories.length === 0 ? (
            <span className="text-muted-foreground">None</span>
          ) : (
            <ul className="flex flex-wrap gap-1">
              {plugin.categories.map((category) => (
                <li key={category.id}>
                  <Badge variant="outline">{category.name}</Badge>
                </li>
              ))}
            </ul>
          )}
        </TableCell>
      )}
      {columns.has('source') && (
        <TableCell>
          <SourceCell source={plugin.source} />
        </TableCell>
      )}
      {columns.has('customizations') && (
        <TableCell>
          <ComponentCounts plugin={plugin} />
        </TableCell>
      )}
      {columns.has('version') && (
        <TableCell>
          <p>{plugin.publishedVersion ? `v${plugin.publishedVersion}` : 'None published'}</p>
        </TableCell>
      )}
      {columns.has('state') && (
        <TableCell>
          <div className="flex flex-wrap items-center gap-1">
            <PluginStatusBadge status={plugin.status} />
            <Badge variant="outline">
              {plugin.visibility === 'private' ? 'Private' : 'Public'}
            </Badge>
            {plugin.featured && <Badge variant="outline">Featured</Badge>}
            {plugin.verified && <Badge variant="info">Verified</Badge>}
          </div>
        </TableCell>
      )}
      {columns.has('installs') && (
        <TableCell className="text-right tabular-nums">{plugin.installations}</TableCell>
      )}
      <TableCell className="w-12 text-right">
        <PluginRowMenu plugin={plugin} onError={setError} />
      </TableCell>
    </TableRow>
  );
}
