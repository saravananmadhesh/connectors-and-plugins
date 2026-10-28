import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Search,
} from 'lucide-react';
import {
  adminApi,
  type AdminPluginListQuery,
  type ComponentKind,
  type PluginLifecycleStatus,
} from '../lib/api';
import { errorMessage } from '../lib/messages';
import {
  CATEGORIES_KEY,
  COLUMN_LABEL,
  DEFAULT_COLUMNS,
  KIND_LABEL,
  PLUGINS_KEY,
  isSyncing,
  type PluginColumn,
} from '../lib/plugins';
import { PluginBulkBar } from './PluginBulkBar';
import { PluginRow } from './PluginRow';
import { Alert } from './ui/alert';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input, Select } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table';

const SORTS: { value: AdminPluginListQuery['sort']; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'updated', label: 'Last updated' },
  { value: 'status', label: 'State' },
  { value: 'installations', label: 'Installations' },
];

const PAGE_SIZES = [25, 50, 100];

type VersionFilter = NonNullable<AdminPluginListQuery['versionStatus']> | '';

interface Filters {
  search: string;
  status: PluginLifecycleStatus | '';
  visibility: 'public' | 'private' | '';
  kind: ComponentKind | '';
  versionStatus: VersionFilter;
  category: string;
  sort: AdminPluginListQuery['sort'];
  direction: AdminPluginListQuery['direction'];
  pageSize: number;
  page: number;
}

const INITIAL: Filters = {
  search: '',
  status: '',
  visibility: '',
  kind: '',
  versionStatus: '',
  category: '',
  sort: 'name',
  direction: 'asc',
  pageSize: 25,
  page: 1,
};

interface Props {
  /** Filters fixed by the page, for example the versions waiting for review. */
  fixed?: Partial<AdminPluginListQuery>;
  /** Shown when the whole catalog is empty. */
  empty: string;
}

/**
 * Plugins one page at a time: the server filters, sorts and counts, so a catalog of hundreds
 * stays quick. Selection is kept across pages for the bulk actions.
 */
export function PluginTable({ fixed = {}, empty }: Props) {
  const [filters, setFilters] = useState<Filters>(INITIAL);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [selecting, setSelecting] = useState(false);
  const [columns, setColumns] = useState<ReadonlySet<PluginColumn>>(new Set(DEFAULT_COLUMNS));

  // Typing waits a moment before it asks the server.
  useEffect(() => {
    const timer = setTimeout(() => setQuery(filters.search.trim()), 250);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const change = (next: Partial<Filters>) =>
    setFilters((current) => ({ ...current, page: 1, ...next }));
  const request: Partial<AdminPluginListQuery> = {
    page: filters.page,
    pageSize: filters.pageSize,
    sort: filters.sort,
    direction: filters.direction,
    ...(query ? { q: query } : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.visibility ? { visibility: filters.visibility } : {}),
    ...(filters.kind ? { kind: filters.kind } : {}),
    ...(filters.versionStatus ? { versionStatus: filters.versionStatus } : {}),
    ...(filters.category ? { category: filters.category } : {}),
    ...fixed,
  };
  const plugins = useQuery({
    queryKey: [...PLUGINS_KEY, request],
    queryFn: () => adminApi.listPlugins(request),
    placeholderData: keepPreviousData,
    // Keep checking while a sync is running so the row updates by itself.
    refetchInterval: (current) =>
      current.state.data?.items.some((plugin) => isSyncing(plugin.source)) ? 2000 : false,
  });
  const categories = useQuery({ queryKey: CATEGORIES_KEY, queryFn: adminApi.listCategories });

  const items = plugins.data?.items ?? [];
  const total = plugins.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / filters.pageSize));
  const first = total === 0 ? 0 : (filters.page - 1) * filters.pageSize + 1;
  const last = total === 0 ? 0 : first + items.length - 1;
  const pageIds = items.map((plugin) => plugin.id);
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.includes(id));
  const filtered =
    query !== '' ||
    filters.status !== '' ||
    filters.visibility !== '' ||
    filters.kind !== '' ||
    filters.versionStatus !== '' ||
    filters.category !== '';
  const toggle = (id: string) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-3 text-sm">
        <label className="relative flex min-w-56 flex-1 flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">Search</span>
          <Search className="absolute bottom-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8"
            value={filters.search}
            placeholder="Name or display name"
            onChange={(event) => change({ search: event.target.value })}
          />
        </label>
        <FilterSelect
          label="State"
          value={filters.status}
          onChange={(value) => change({ status: value as Filters['status'] })}
          options={[
            ['', 'Any state'],
            ['active', 'Active'],
            ['deprecated', 'Deprecated'],
            ['suspended', 'Suspended'],
          ]}
        />
        <FilterSelect
          label="Visibility"
          value={filters.visibility}
          onChange={(value) => change({ visibility: value as Filters['visibility'] })}
          options={[
            ['', 'Public and private'],
            ['public', 'Public'],
            ['private', 'Private'],
          ]}
        />
        <FilterSelect
          label="Type"
          value={filters.kind}
          onChange={(value) => change({ kind: value as Filters['kind'] })}
          options={[['', 'Any type'], ...(Object.entries(KIND_LABEL) as [ComponentKind, string][])]}
        />
        {fixed.versionStatus === undefined && (
          <FilterSelect
            label="Version"
            value={filters.versionStatus}
            onChange={(value) => change({ versionStatus: value as VersionFilter })}
            options={[
              ['', 'Any version'],
              ['needs_review', 'Needs review'],
              ['pending', 'Pending review'],
              ['approved', 'Approved'],
              ['published', 'Published'],
              ['rejected', 'Rejected'],
              ['yanked', 'Yanked'],
            ]}
          />
        )}
        <FilterSelect
          label="Category"
          value={filters.category}
          onChange={(value) => change({ category: value })}
          options={[
            ['', 'Any category'],
            ...(categories.data?.items ?? []).map(
              (category) => [category.slug, category.name] as [string, string],
            ),
          ]}
        />
        <div className="flex items-end gap-1">
          <FilterSelect
            label="Sort by"
            value={filters.sort}
            onChange={(value) => change({ sort: value as Filters['sort'] })}
            options={SORTS.map((item) => [item.value, item.label] as [string, string])}
          />
          <Button
            variant="outline"
            size="icon"
            aria-label={filters.direction === 'asc' ? 'Sorted ascending' : 'Sorted descending'}
            onClick={() => change({ direction: filters.direction === 'asc' ? 'desc' : 'asc' })}
          >
            {filters.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>
        <Button
          variant={selecting ? 'secondary' : 'outline'}
          aria-pressed={selecting}
          onClick={() => {
            setSelecting((current) => !current);
            setSelected([]);
          }}
        >
          <CheckSquare />
          Select
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3 />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(Object.keys(COLUMN_LABEL) as PluginColumn[]).map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={columns.has(column)}
                onSelect={(event) => event.preventDefault()}
                onCheckedChange={(checked) =>
                  setColumns((current) => {
                    const next = new Set(current);
                    if (checked) next.add(column);
                    else next.delete(column);
                    return next;
                  })
                }
              >
                {COLUMN_LABEL[column]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selecting && selected.length > 0 && (
        <PluginBulkBar
          ids={selected}
          onClear={() => setSelected([])}
          onRemoved={(removed) =>
            setSelected((current) => current.filter((id) => !removed.includes(id)))
          }
        />
      )}

      {plugins.isPending && (
        <div className="flex flex-col gap-2" aria-label="Loading plugins">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      )}
      {plugins.isError && (
        <Alert variant="destructive" role="alert">
          {errorMessage(plugins.error)}
        </Alert>
      )}
      {plugins.data && total === 0 && !filtered && (
        <p className="py-8 text-center text-sm text-muted-foreground">{empty}</p>
      )}
      {plugins.data && total === 0 && filtered && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No plugin matches these filters.
        </p>
      )}
      {items.length > 0 && (
        <div className="rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {selecting && (
                  <TableHead className="w-8">
                    <Checkbox
                      checked={allOnPage}
                      onChange={() =>
                        setSelected((current) =>
                          allOnPage
                            ? current.filter((id) => !pageIds.includes(id))
                            : [...new Set([...current, ...pageIds])],
                        )
                      }
                      aria-label="Select all shown"
                    />
                  </TableHead>
                )}
                <TableHead>Plugin</TableHead>
                {columns.has('category') && <TableHead>Category</TableHead>}
                {columns.has('source') && <TableHead>Source</TableHead>}
                {columns.has('customizations') && <TableHead>Customizations</TableHead>}
                {columns.has('version') && <TableHead>Version</TableHead>}
                {columns.has('state') && <TableHead>State</TableHead>}
                {columns.has('installs') && <TableHead className="text-right">Installs</TableHead>}
                <TableHead className="w-12">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((plugin) => (
                <PluginRow
                  key={plugin.id}
                  plugin={plugin}
                  columns={columns}
                  {...(selecting
                    ? {
                        selection: {
                          selected: selected.includes(plugin.id),
                          onToggle: () => toggle(plugin.id),
                        },
                      }
                    : {})}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {total > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            Showing {first}–{last} of {total}
          </p>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Per page
              <Select
                aria-label="Per page"
                className="h-8 w-20 text-xs"
                value={String(filters.pageSize)}
                onChange={(event) => change({ pageSize: Number(event.target.value) })}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </label>
            <Button
              variant="outline"
              size="sm"
              disabled={filters.page <= 1}
              onClick={() => setFilters((current) => ({ ...current, page: current.page - 1 }))}
            >
              <ChevronLeft />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {filters.page} of {pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={filters.page >= pages}
              onClick={() => setFilters((current) => ({ ...current, page: current.page + 1 }))}
            >
              Next
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <Select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </Select>
    </label>
  );
}
