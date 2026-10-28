import * as Primitive from '@radix-ui/react-dropdown-menu';
import { Check } from 'lucide-react';
import { cn } from '../../lib/cn';

export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Separator>) => (
  <Primitive.Separator className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
);

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-48 rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg',
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  destructive,
  ...props
}: React.ComponentProps<typeof Primitive.Item> & { destructive?: boolean }) {
  return (
    <Primitive.Item
      className={cn(
        'flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0',
        destructive && 'text-destructive data-[highlighted]:text-destructive',
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Primitive.CheckboxItem>) {
  return (
    <Primitive.CheckboxItem
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <Primitive.ItemIndicator>
          <Check className="size-4" />
        </Primitive.ItemIndicator>
      </span>
      {children}
    </Primitive.CheckboxItem>
  );
}
