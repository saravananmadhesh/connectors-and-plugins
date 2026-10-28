import * as Primitive from '@radix-ui/react-hover-card';
import { cn } from '../../lib/cn';

export const HoverCard = Primitive.Root;
export const HoverCardTrigger = Primitive.Trigger;

export function HoverCardContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-48 rounded-xl border bg-popover p-3 text-sm text-popover-foreground shadow-lg',
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}
