import * as Primitive from '@radix-ui/react-popover';
import { cn } from '@/lib/cn';

export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;
export const PopoverAnchor = Primitive.Anchor;

export function PopoverContent({
  className,
  sideOffset = 4,
  align = 'start',
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-[60] w-(--radix-popover-trigger-width) rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg outline-none',
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}
