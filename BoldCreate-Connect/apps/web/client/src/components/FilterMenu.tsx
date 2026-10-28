import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
  /** Shown after the label, for example how many plugins match. */
  count?: number;
}

/** The one trigger every filter menu shares, so search, categories and sort line up. */
function FilterTrigger({
  label,
  summary,
  active,
}: {
  label: string;
  summary?: string | undefined;
  active: boolean;
}) {
  return (
    <DropdownMenuTrigger
      aria-label={label}
      className={cn(
        'flex h-9 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm shadow-xs outline-none transition-colors hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
        active ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      <span className="truncate">{summary ?? label}</span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </DropdownMenuTrigger>
  );
}

/** Several choices at once; the menu stays open while you tick. */
export function MultiSelectMenu<T extends string>({
  label,
  allLabel,
  options,
  selected,
  onChange,
}: {
  label: string;
  /** What the trigger says when nothing is ticked. */
  allLabel: string;
  options: readonly FilterOption<T>[];
  selected: readonly T[];
  onChange: (next: T[]) => void;
}) {
  const names = options.filter((option) => selected.includes(option.value));
  const summary =
    names.length === 0
      ? allLabel
      : names.length === 1
        ? (names[0]?.label ?? allLabel)
        : `${names.length} ${label.toLowerCase()}`;
  const toggle = (value: T, on: boolean) =>
    onChange(on ? [...selected, value] : selected.filter((item) => item !== value));

  return (
    <DropdownMenu>
      <FilterTrigger label={label} summary={summary} active={names.length > 0} />
      <DropdownMenuContent align="start" className="max-h-80 w-60 overflow-y-auto">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.length === 0 && (
          <p className="px-2 py-1.5 text-xs text-muted-foreground">Nothing to filter by yet.</p>
        )}
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={(on) => toggle(option.value, on === true)}
            onSelect={(event) => event.preventDefault()}
          >
            <span className="flex-1 truncate">{option.label}</span>
            {option.count !== undefined && (
              <span className="text-xs text-muted-foreground tabular-nums">{option.count}</span>
            )}
          </DropdownMenuCheckboxItem>
        ))}
        {selected.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => onChange([])}>Clear selection</DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** One choice out of a few, in the same menu style as the multi select. */
export function SingleSelectMenu<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly FilterOption<T>[];
  value: T;
  onChange: (next: T) => void;
}) {
  const current = options.find((option) => option.value === value);
  return (
    <DropdownMenu>
      <FilterTrigger label={label} summary={current?.label} active />
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onSelect={() => onChange(option.value)}>
            <span className="flex-1 truncate">{option.label}</span>
            {option.value === value && <Check aria-label="Selected" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
