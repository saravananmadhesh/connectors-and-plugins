import * as Primitive from '@radix-ui/react-dialog';
import { cn } from '../../lib/cn';

export const Dialog = Primitive.Root;
export const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Title>) => (
  <Primitive.Title className={cn('text-base font-semibold tracking-tight', className)} {...props} />
);

export function DialogContent({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <Primitive.Content
        // The title names the dialog; a separate description would only repeat it.
        aria-describedby={undefined}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-popover p-6 text-popover-foreground shadow-lg outline-none',
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
}
