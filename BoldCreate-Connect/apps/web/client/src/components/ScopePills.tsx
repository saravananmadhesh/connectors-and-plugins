import { Building2, User } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { InstalledScope } from '@/lib/installed-search';

const META: Record<InstalledScope, { label: string; icon: typeof User }> = {
  org: { label: 'For team', icon: Building2 },
  me: { label: 'For me', icon: User },
};

/** Filter pills for the scope of an installed list; the caller passes only the scopes it may see. */
export function ScopePills({
  scopes,
  value,
  onChange,
}: {
  scopes: readonly InstalledScope[];
  value: InstalledScope;
  onChange: (scope: InstalledScope) => void;
}) {
  return (
    <div role="group" aria-label="Scope" className="flex flex-wrap gap-2">
      {scopes.map((scope) => {
        const { label, icon: Icon } = META[scope];
        const active = scope === value;
        return (
          <button
            key={scope}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(scope)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors',
              active
                ? 'border-primary bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
