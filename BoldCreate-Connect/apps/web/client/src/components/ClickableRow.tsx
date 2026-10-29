import { TableRow } from '@/components/ui/table';
import { cn } from '@/lib/cn';

/** What inside a row does its own thing when clicked, so the row must not also open. */
const OWN_CLICK = 'a, button, input, select, textarea, label, [role="button"], [role="menuitem"]';

/**
 * A table row that opens its details wherever it is clicked: on the name, on any other column, on
 * the empty space. The name keeps its link or button, so the keyboard and a middle click still
 * work. A link or button inside the row, a click with a modifier key, and selecting text to copy
 * it are left alone.
 */
export function ClickableRow({
  onActivate,
  className,
  ...props
}: React.ComponentProps<typeof TableRow> & { onActivate: () => void }) {
  return (
    <TableRow
      className={cn('cursor-pointer', className)}
      onClick={(event) => {
        const inner = (event.target as HTMLElement).closest(OWN_CLICK);
        if (inner && inner !== event.currentTarget && event.currentTarget.contains(inner)) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (window.getSelection()?.toString()) return;
        onActivate();
      }}
      {...props}
    />
  );
}
