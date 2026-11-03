import { useEffect, useState, type ReactNode } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Download, Search, Trash2 } from 'lucide-react';
import { marketplace, projects } from '@/lib/api';
import type { ComponentKind } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Select } from '@/components/ui/input';
import { PluginCounts } from '@/components/PluginCard';
import { PluginMarks } from '@/components/PluginMarks';
import { cn } from '@/lib/cn';
import { useRemembered } from '@/lib/remembered-state';
import { PluginTile } from '@/components/PluginTile';
import { MultiSelectMenu } from '@/components/FilterMenu';
import { QueryFrame } from './shared';
import { messageOf } from './paging';

/** Everything the catalog holds for a project fits in one list, so there is no paging. */
const LIST_LIMIT = 100;
const KINDS: readonly { value: ComponentKind; label: string }[] = [
  { value: 'mcp', label: 'MCP' },
  { value: 'skill', label: 'Skills' },
  { value: 'rule', label: 'Rules' },
  { value: 'hook', label: 'Hooks' },
  { value: 'agent', label: 'Agents' },
];

/**
 * A dialog that lists what the project may offer, with search, kind and category filters, and
 * hands back the plugin the person chose. `taken` plugins show as already added.
 */
export function CatalogBrowser({
  orgId,
  projectId,
  actionLabel,
  takenLabel = 'Added',
  taken,
  onPick,
  onView,
  onRemove,
  iconActions = false,
  toolbarStart,
  toolbarEnd,
  memoryKey,
}: {
  orgId: string;
  projectId: string;
  /** Controls at the start of the search row, such as a view switch. */
  /** Keeps the search and filter when the browser is left and opened again; omitted, nothing is kept. */
  memoryKey?: string;
  toolbarStart?: ReactNode;
  /** Controls at the right end of the search row, such as a refresh. */
  toolbarEnd?: ReactNode;
  actionLabel: string;
  /** What the button says for a plugin that is already taken. */
  takenLabel?: string;
  taken: ReadonlySet<string>;
  onPick: (pluginId: string, displayName: string) => Promise<unknown>;
  /** Opens the plugin's details; the title is plain text without it. */
  onView?: (pluginId: string) => void;
  /** Offers a remove button, in place of the disabled one, for a plugin that is already taken. */
  onRemove?: (pluginId: string, displayName: string) => void;
  /** Shows the card actions as icons rather than words. */
  iconActions?: boolean;
}) {
  const key = memoryKey === undefined ? null : `catalog:${memoryKey}`;
  const [typed, setTyped] = useRemembered(key && `${key}:typed`, '');
  const [q, setQ] = useRemembered(key && `${key}:q`, '');
  const [kind, setKind] = useRemembered<ComponentKind | ''>(key && `${key}:kind`, '');
  const [picked, setPicked] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typed === q) return;
    const timer = setTimeout(() => {
      setQ(typed);
    }, 250);
    return () => clearTimeout(timer);
  }, [typed, q, setQ]);

  const categories = useQuery({
    queryKey: qk.marketplaceCategories(),
    queryFn: marketplace.listCategories,
  });
  const filters = {
    q: q || undefined,
    kind: kind || undefined,
    categories: picked.length > 0 ? picked.join(',') : undefined,
    limit: LIST_LIMIT,
  };
  const catalog = useQuery({
    queryKey: qk.projectPart(orgId, projectId, 'catalog', filters),
    queryFn: () => projects.catalog(orgId, projectId, filters),
    placeholderData: keepPreviousData,
  });

  const choose = async (pluginId: string, displayName: string) => {
    setError('');
    setBusy(pluginId);
    try {
      await onPick(pluginId, displayName);
    } catch (err) {
      setError(messageOf(err));
    } finally {
      setBusy(null);
    }
  };

  const items = catalog.data?.items ?? [];

  return (
    <div className="space-y-3">
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="flex flex-wrap items-center gap-2">
        {toolbarStart}
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search plugins…"
            aria-label="Search the catalog"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
          />
        </div>
        <Select
          aria-label="Kind"
          className="w-36"
          value={kind}
          onChange={(e) => {
            setKind(e.target.value as ComponentKind | '');
          }}
        >
          <option value="">All kinds</option>
          {KINDS.map((entry) => (
            <option key={entry.value} value={entry.value}>
              {entry.label}
            </option>
          ))}
        </Select>
        <MultiSelectMenu
          label="Categories"
          allLabel="All categories"
          options={(categories.data?.items ?? []).map((item) => ({
            value: item.slug,
            label: item.name,
          }))}
          selected={picked}
          onChange={(next) => {
            setPicked(next);
          }}
        />
        {toolbarEnd && <div className="flex items-center gap-2 sm:ml-auto">{toolbarEnd}</div>}
      </div>
      <QueryFrame
        label="the catalog"
        isPending={catalog.isPending}
        error={catalog.error}
        onRetry={() => void catalog.refetch()}
      >
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No plugins match these filters.
          </p>
        ) : (
          <div className="@container">
            <ul className="grid gap-3 @xl:grid-cols-2 @4xl:grid-cols-3">
              {items.map((plugin) => (
                <li
                  key={plugin.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border bg-card p-3',
                    onView && 'cursor-pointer hover:bg-muted/50',
                  )}
                  onClick={
                    onView
                      ? (event) => {
                          if (!(event.target as HTMLElement).closest('button, a'))
                            onView(plugin.id);
                        }
                      : undefined
                  }
                >
                  <PluginTile src={plugin.logoUrl} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="flex items-center gap-1.5">
                      {onView ? (
                        <button
                          type="button"
                          className="truncate text-sm font-medium hover:underline focus-visible:underline focus-visible:outline-none"
                          aria-label={`Open ${plugin.displayName} details`}
                          onClick={() => onView(plugin.id)}
                        >
                          {plugin.displayName}
                        </button>
                      ) : (
                        <span className="truncate text-sm font-medium">{plugin.displayName}</span>
                      )}
                      <PluginMarks verified={plugin.verified} featured={plugin.featured} />
                    </p>
                    <PluginCounts counts={plugin.componentCounts} />
                  </div>
                  {taken.has(plugin.id) && onRemove ? (
                    <Button
                      className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      size="icon"
                      variant="outline"
                      title="Remove"
                      aria-label={`Remove ${plugin.displayName}`}
                      onClick={() => onRemove(plugin.id, plugin.displayName)}
                    >
                      <Trash2 />
                    </Button>
                  ) : (
                    <Button
                      className="shrink-0"
                      size={iconActions ? 'icon' : 'sm'}
                      variant={iconActions ? 'default' : 'outline'}
                      disabled={taken.has(plugin.id) || busy !== null}
                      title={iconActions ? actionLabel : undefined}
                      aria-label={`${actionLabel} ${plugin.displayName}`}
                      onClick={() => void choose(plugin.id, plugin.displayName)}
                    >
                      {iconActions ? <Download /> : taken.has(plugin.id) ? takenLabel : actionLabel}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </QueryFrame>
      {(catalog.data?.total ?? 0) > items.length && (
        <p className="text-center text-xs text-muted-foreground">
          Showing the first {items.length} of {catalog.data?.total}. Search or filter to narrow it.
        </p>
      )}
    </div>
  );
}

/** The catalog in a dialog, for the places that pick a plugin for something else. */
export function CatalogPicker({
  title,
  onClose,
  ...browser
}: {
  orgId: string;
  projectId: string;
  title: string;
  actionLabel: string;
  taken: ReadonlySet<string>;
  onPick: (pluginId: string, displayName: string) => Promise<unknown>;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogTitle>{title}</DialogTitle>
        <div className="mt-4 space-y-3">
          <CatalogBrowser {...browser} />
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
