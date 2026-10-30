import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { marketplace, projects } from '@/lib/api';
import type { ComponentKind } from '@/lib/api';
import { qk } from '@/lib/query-keys';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input, Select } from '@/components/ui/input';
import { Pagination } from '@/components/Pagination';
import { MultiSelectMenu } from '@/components/FilterMenu';
import { QueryFrame } from './shared';
import { messageOf } from './paging';

const PAGE_SIZE = 8;
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
  taken,
  onPick,
}: {
  orgId: string;
  projectId: string;
  actionLabel: string;
  taken: ReadonlySet<string>;
  onPick: (pluginId: string, displayName: string) => Promise<unknown>;
}) {
  const [typed, setTyped] = useState('');
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<ComponentKind | ''>('');
  const [picked, setPicked] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typed === q) return;
    const timer = setTimeout(() => {
      setQ(typed);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [typed, q]);

  const categories = useQuery({
    queryKey: qk.marketplaceCategories(),
    queryFn: marketplace.listCategories,
  });
  const filters = {
    q: q || undefined,
    kind: kind || undefined,
    categories: picked.length > 0 ? picked.join(',') : undefined,
    page,
    limit: PAGE_SIZE,
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
            setPage(1);
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
            setPage(1);
          }}
        />
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
          <ul className="divide-y rounded-md border">
            {items.map((plugin) => (
              <li key={plugin.id} className="flex items-center justify-between gap-3 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{plugin.displayName}</p>
                  <p className="truncate text-xs text-muted-foreground">{plugin.summary}</p>
                </div>
                <Button
                  className="w-20 shrink-0"
                  size="sm"
                  variant="outline"
                  disabled={taken.has(plugin.id) || busy !== null}
                  aria-label={`${actionLabel} ${plugin.displayName}`}
                  onClick={() => void choose(plugin.id, plugin.displayName)}
                >
                  {taken.has(plugin.id) ? 'Added' : actionLabel}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </QueryFrame>
      <Pagination
        page={catalog.data?.page ?? page}
        pageSize={PAGE_SIZE}
        total={catalog.data?.total ?? 0}
        onPage={setPage}
      />
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
