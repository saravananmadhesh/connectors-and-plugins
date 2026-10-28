import { useId, useMemo, useState } from 'react';
import { Building2, Check, Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

export interface ScopeTarget {
  orgId: string;
}

interface Named {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  organizations: readonly (Named & { role?: string | undefined })[];
  orgId: string;
  onSelect: (target: ScopeTarget) => void;
}

/** Most rows one group shows; the user narrows the search to reach the rest. */
export const PALETTE_GROUP_MAX = 30;

interface Option {
  key: string;
  label: string;
  hint?: string | undefined;
  current: boolean;
  icon: typeof Building2;
  target: ScopeTarget;
}

interface Group {
  title: string;
  options: Option[];
  /** Matches that are not listed. */
  more: number;
}

const matches = (name: string, needle: string) => name.toLowerCase().includes(needle);

/** Search for an organization and go to it, by keyboard or pointer. */
export function ScopePalette(props: Props) {
  // The state lives inside the dialog, so it starts fresh each time the palette opens.
  return (
    <Dialog open={props.open} onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="top-[18%] max-w-lg translate-y-0 gap-0 p-0">
        <PaletteBody {...props} />
      </DialogContent>
    </Dialog>
  );
}

function PaletteBody({ organizations, orgId, onSelect }: Props) {
  const uid = useId();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const needle = query.trim().toLowerCase();

  const groups = useMemo<Group[]>(() => {
    const cut = <T,>(list: T[]) => ({
      shown: list.slice(0, PALETTE_GROUP_MAX),
      more: Math.max(0, list.length - PALETTE_GROUP_MAX),
    });
    const out: Group[] = [];
    const orgMatches = cut(organizations.filter((entry) => matches(entry.name, needle)));
    if (orgMatches.shown.length > 0) {
      out.push({
        title: 'Organizations',
        more: orgMatches.more,
        options: orgMatches.shown.map((entry) => ({
          key: `org-${entry.id}`,
          label: entry.name,
          hint: entry.role,
          current: entry.id === orgId,
          icon: Building2,
          target: { orgId: entry.id },
        })),
      });
    }
    return out;
  }, [needle, organizations, orgId]);

  const flat = groups.flatMap((group) => group.options);
  const active = Math.min(cursor, Math.max(0, flat.length - 1));
  const optionId = (index: number) => `${uid}-option-${index}`;

  const move = (to: number) => {
    const next = flat.length === 0 ? 0 : (to + flat.length) % flat.length;
    setCursor(next);
    const node = document.getElementById(optionId(next));
    if (node && typeof node.scrollIntoView === 'function')
      node.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(active + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        move(0);
        break;
      case 'End':
        event.preventDefault();
        move(flat.length - 1);
        break;
      case 'Enter': {
        const option = flat[active];
        if (option) {
          event.preventDefault();
          onSelect(option.target);
        }
        break;
      }
    }
  };

  let index = -1;
  const total = flat.length;

  return (
    <div>
      <div className="border-b px-4 pt-4 pb-3">
        <DialogTitle>Switch organization</DialogTitle>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Type to search. Use the arrow keys to move and Enter to go.
        </p>
        <div className="relative mt-3">
          <Search
            aria-hidden="true"
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            role="combobox"
            aria-expanded="true"
            aria-controls={`${uid}-list`}
            aria-activedescendant={total > 0 ? optionId(active) : undefined}
            aria-label="Search organizations"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search organizations…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
            className="h-9 w-full rounded-md border border-input bg-card pr-3 pl-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div
        id={`${uid}-list`}
        role="listbox"
        aria-label="Results"
        className="max-h-80 overflow-y-auto p-2"
      >
        {groups.map((group, groupIndex) => (
          <div key={group.title} role="group" aria-labelledby={`${uid}-group-${groupIndex}`}>
            <p
              id={`${uid}-group-${groupIndex}`}
              className="px-2 py-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase"
            >
              {group.title}
            </p>
            {group.options.map((option) => {
              index += 1;
              const position = index;
              const selected = position === active;
              return (
                <div
                  key={option.key}
                  id={optionId(position)}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => selected || setCursor(position)}
                  onClick={() => onSelect(option.target)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm',
                    selected && 'bg-accent text-accent-foreground',
                  )}
                >
                  <option.icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{option.label}</span>
                    {option.hint && (
                      <span className="block truncate text-xs text-muted-foreground">
                        {option.hint}
                      </span>
                    )}
                  </span>
                  {option.current && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Check aria-hidden="true" className="size-3.5" />
                      Current
                    </span>
                  )}
                </div>
              );
            })}
            {group.more > 0 && (
              <p className="px-2 py-1.5 text-xs text-muted-foreground">
                {group.more} more. Keep typing to narrow the list.
              </p>
            )}
          </div>
        ))}
      </div>
      <p role="status" className="border-t px-4 py-2 text-xs text-muted-foreground">
        {total === 0 ? `Nothing matches “${query.trim()}”.` : `${total} shown.`}
      </p>
    </div>
  );
}
