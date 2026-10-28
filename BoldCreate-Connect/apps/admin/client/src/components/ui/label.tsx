import { cn } from '../../lib/cn';

export function Label({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn('flex flex-col gap-1.5 text-sm leading-none font-medium', className)}
      {...props}
    />
  );
}
