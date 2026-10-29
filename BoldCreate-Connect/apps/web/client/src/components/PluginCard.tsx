import { Link } from '@tanstack/react-router';
import type { ComponentKind, PluginListItemResponse } from '@/lib/api';
import type { InstallScope } from '@/components/InstallMenu';
import { PluginInstallButton } from '@/components/PluginInstallButton';
import { PluginMarks } from '@/components/PluginMarks';
import { PluginTile } from '@/components/PluginTile';

const COUNT_LABELS: readonly { kind: ComponentKind; label: string }[] = [
  { kind: 'agent', label: 'Agents' },
  { kind: 'skill', label: 'Skills' },
  { kind: 'mcp', label: 'MCP' },
  { kind: 'hook', label: 'Hooks' },
  { kind: 'rule', label: 'Rules' },
];

/** A marketplace card: logo, name and what the plugin customizes, with an install menu by scope. */
export function PluginCard({
  plugin,
  orgId,
  scopes,
  installed,
  onInstall,
}: {
  plugin: PluginListItemResponse;
  /** The organization whose marketplace this is; the plugin's page is under it. */
  orgId: string;
  /** The scopes still open to install into. */
  scopes: readonly InstallScope[];
  /** The plugin is installed in at least one scope. */
  installed: boolean;
  onInstall: (scope: InstallScope) => void;
}) {
  const counts = COUNT_LABELS.filter(({ kind }) => plugin.componentCounts[kind] > 0);

  return (
    <article className="flex min-h-[66px] items-center gap-3 rounded-lg border bg-card p-3 transition-colors focus-within:ring-2 focus-within:ring-ring hover:bg-muted/40">
      <Link
        to="/orgs/$orgId/marketplace/$pluginId"
        params={{ orgId, pluginId: plugin.id }}
        aria-label={`Open ${plugin.displayName} details`}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-md outline-none"
      >
        <PluginTile src={plugin.logoUrl} />
        <span className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-sm leading-5 font-medium">{plugin.displayName}</span>
            <PluginMarks verified={plugin.verified} featured={plugin.featured} />
          </span>
          {counts.length > 0 && (
            <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs leading-4 text-muted-foreground">
              {counts.map(({ kind, label }, index) => (
                <span key={kind}>
                  {index > 0 && <span aria-hidden="true">· </span>}
                  {label}{' '}
                  <strong className="font-medium tabular-nums">
                    {plugin.componentCounts[kind]}
                  </strong>
                </span>
              ))}
            </span>
          )}
        </span>
      </Link>
      {plugin.latestVersion && (
        <PluginInstallButton
          pluginName={plugin.displayName}
          scopes={scopes}
          installed={installed}
          onInstall={onInstall}
        />
      )}
    </article>
  );
}
