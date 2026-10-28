import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const alertVariants = cva('relative w-full rounded-lg border px-4 py-3 text-sm', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      destructive: 'border-destructive/30 bg-destructive/5 text-destructive',
      warning: 'border-warning-border bg-warning-soft text-warning',
      info: 'border-info-border bg-info-soft text-info',
      success: 'border-success-border bg-success-soft text-success',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div className={cn(alertVariants({ variant }), className)} {...props} />;
}
