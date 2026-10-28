import { Link } from '@tanstack/react-router';
import { MAX_INSTALL_PATHS, candidateState, describeCounts } from '../lib/discover';
import { cn } from '../lib/cn';
import { PluginLogo } from './PluginLogo';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import type { DiscoveredPlugin } from '../lib/api';

interface Props {
  plugin: DiscoveredPlugin;
  checked: boolean;
  /** The selection is full, so an unchecked plugin cannot be added. */
  limitReached?: boolean;
  onToggle: () => void;
}

/** One plugin folder found in a repository, as a card: what it is, what it holds and where it stands. */
export function DiscoverCandidate({ plugin, checked, limitReached = false, onToggle }: Props) {
  const state = candidateState(plugin);
  const title = plugin.displayName ?? plugin.name ?? (plugin.path || 'Repository root');
  const contents = describeCounts(plugin.componentCounts);
  return (
    <li
      className={cn(
        'flex min-w-0 flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs transition-[border-color,box-shadow] hover:border-foreground/25 hover:shadow-sm',
        checked && 'border-ring ring-1 ring-ring/40 hover:border-ring',
      )}
    >
      <div className="flex items-start gap-3">
        <PluginLogo src={plugin.logoUrl} size="md" />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium" title={title}>
            {title}
          </h3>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            {plugin.version && <span className="font-mono">v{plugin.version}</span>}
            <Badge variant={state.tone}>{state.label}</Badge>
          </p>
        </div>
        <Checkbox
          checked={checked}
          disabled={state.key !== 'available' || (limitReached && !checked)}
          onChange={onToggle}
          aria-label={`Select ${title}`}
        />
      </div>
      {plugin.summary ? (
        <p className="line-clamp-3 text-sm text-muted-foreground">{plugin.summary}</p>
      ) : (
        <p className="text-sm text-muted-foreground">No description.</p>
      )}
      <div className="mt-auto flex flex-col gap-1.5 text-xs text-muted-foreground">
        {contents && <span className="text-foreground">{contents}</span>}
        <code className="truncate font-mono" title={plugin.path}>
          {plugin.path === '' ? 'repository root' : plugin.path}
        </code>
        {plugin.categories.length > 0 && (
          <span className="truncate">{plugin.categories.join(', ')}</span>
        )}
      </div>
      {state.key === 'available' && limitReached && !checked && (
        <p className="text-sm text-muted-foreground">
          Cannot be selected: one install takes at most {MAX_INSTALL_PATHS} plugins.
        </p>
      )}
      {state.reason && (
        <p
          className={
            state.tone === 'destructive'
              ? 'text-sm text-destructive'
              : 'text-sm text-muted-foreground'
          }
        >
          {state.reason}
        </p>
      )}
      {plugin.installed?.pluginId && (
        <Link
          to="/plugins/$pluginId"
          params={{ pluginId: plugin.installed.pluginId }}
          className="text-sm underline"
        >
          Open plugin
        </Link>
      )}
    </li>
  );
}
