import { Badge } from '@/components/ui/badge';
import { CHIPS, type PluginStatus } from './status';

/** Where a plugin stands for the project's admins; the text carries the meaning, not the colour. */
export function StatusChip({ status }: { status: PluginStatus | undefined }) {
  if (!status) return null;
  const chip = CHIPS[status];
  return (
    <Badge variant={chip.variant} title={chip.hint}>
      {chip.label}
    </Badge>
  );
}
