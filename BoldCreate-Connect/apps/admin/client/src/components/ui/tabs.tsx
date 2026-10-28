import { useId, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TabItem<T extends string> {
  value: T;
  label: string;
  /** Small number or hint after the label. */
  count?: number | undefined;
}

interface Props<T extends string> {
  label: string;
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
  className?: string;
}

/** Line tabs: one panel at a time, arrow keys move between tabs. */
export function Tabs<T extends string>({
  label,
  tabs,
  value,
  onChange,
  children,
  className,
}: Props<T>) {
  const id = useId();
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = tabs[(index + step + tabs.length) % tabs.length];
    if (next) {
      onChange(next.value);
      document.getElementById(`${id}-${next.value}`)?.focus();
    }
  };
  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className="flex gap-1 border-b">
        {tabs.map((tab, index) => {
          const selected = tab.value === value;
          return (
            <button
              key={tab.value}
              id={`${id}-${tab.value}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.value)}
              onKeyDown={(event) => move(event, index)}
              className={cn(
                '-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                selected
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className="rounded-full bg-muted px-1.5 text-xs tabular-nums">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${value}`} className="pt-5">
        {children}
      </div>
    </div>
  );
}
