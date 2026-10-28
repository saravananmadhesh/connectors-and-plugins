import { cn } from '@/lib/cn';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('text-sm leading-none font-medium', className)} {...props} />;
}
