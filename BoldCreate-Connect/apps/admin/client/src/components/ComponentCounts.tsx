import { Layers } from 'lucide-react';
import type { AdminPluginSummary } from '../lib/api';
import { customizationCounts } from '../lib/plugins';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

/** Total number of customizations in a plugin; hovering or focusing it lists the count per type. */
export function ComponentCounts({ plugin }: { plugin: AdminPluginSummary }) {
  const { rows, total } = customizationCounts(plugin);
  if (total === 0) return <span className="text-muted-foreground">—</span>;
  return (
    <HoverCard openDelay={100} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 tabular-nums"
          aria-label={`${total} customizations in ${plugin.displayName}`}
        >
          <Layers className="text-muted-foreground" />
          {total}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="mb-2 text-xs font-medium text-muted-foreground">In this plugin</p>
        <ul className="flex flex-col gap-1">
          {rows.map((row) => (
            <li key={row.kind} className="flex justify-between">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.count}</span>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
