import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Code2, Sparkles, type LucideIcon } from 'lucide-react';
import {
  AREA_HINTS,
  AREA_LABELS,
  areaDestination,
  pathArea,
  saveArea,
  type AreaKind,
} from '@/lib/area';
import { cn } from '@/lib/cn';

const ICONS: Record<AreaKind, LucideIcon> = {
  'for-you': Sparkles,
  platform: Code2,
};

/**
 * Chooses between the two parts of the website as a two-segment control. With one area on offer
 * there is nothing to choose, so a viewer sees no control and the sidebar simply is Platform.
 */
export function AreaSwitcher({
  areas,
  area,
  orgId,
}: {
  areas: readonly AreaKind[];
  area: AreaKind;
  orgId: string | undefined;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (areas.length < 2) return null;

  const go = (next: AreaKind) => {
    // A page of neither area (the organization overview, its members and settings) shows the last
    // area only as a highlight, so a click on it must still open that area's pages.
    if (next === area && pathArea(pathname) === next) return;
    saveArea(next);
    void navigate({ to: areaDestination(pathname, next, orgId) });
  };

  return (
    <div
      role="group"
      aria-label="Area"
      className="flex gap-0.5 rounded-md bg-sidebar-accent p-0.5 group-data-[collapsed=true]/sb:md:flex-col"
    >
      {areas.map((entry) => {
        const Icon = ICONS[entry];
        const current = entry === area;
        return (
          <button
            key={entry}
            type="button"
            aria-pressed={current}
            aria-label={AREA_LABELS[entry]}
            title={AREA_HINTS[entry]}
            onClick={() => go(entry)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1 group-data-[collapsed=true]/sb:md:py-2 text-sm text-sidebar-muted outline-none transition-colors hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-ring',
              current && 'bg-card font-medium text-sidebar-foreground shadow-sm',
            )}
          >
            <Icon
              aria-hidden="true"
              className="size-4 shrink-0 group-data-[collapsed=true]/sb:md:size-5"
            />
            <span className="truncate group-data-[collapsed=true]/sb:md:hidden">
              {AREA_LABELS[entry]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
