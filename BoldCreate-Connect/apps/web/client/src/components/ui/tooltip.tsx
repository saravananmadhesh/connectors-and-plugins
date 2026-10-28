import { useId, useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';

interface Props {
  /** The short text the tooltip shows; it also describes the control for screen readers. */
  label: string;
  /** Where the tip sits relative to the control. */
  side?: 'top' | 'bottom' | 'right';
  className?: string;
  /** The single control the tip belongs to. It keeps its own accessible name. */
  children: React.ReactElement;
}

const SIDE = {
  top: 'bottom-full left-1/2 mb-1.5 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-1.5 -translate-x-1/2',
  right: 'top-1/2 left-full ml-1.5 -translate-y-1/2',
} as const;

/**
 * A hint for a control: it opens on hover and on keyboard focus, stays open while the pointer is
 * over it, and Escape closes it. The control keeps its own name; the tip only adds to it.
 */
export function Tooltip({ label, side = 'top', className, children }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) setOpen(false);
      }}
    >
      <Slot aria-describedby={id}>{children}</Slot>
      <span
        id={id}
        role="tooltip"
        hidden={!open}
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-56 rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md',
          SIDE[side],
        )}
      >
        {label}
      </span>
    </span>
  );
}
