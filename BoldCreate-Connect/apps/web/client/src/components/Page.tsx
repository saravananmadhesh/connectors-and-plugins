import { cn } from '@/lib/cn';

/**
 * The padding of a page, shared with the breadcrumb bar so both line up at every width: tight on a
 * phone, roomier from tablet up.
 */
export const PAGE_GUTTER = 'px-4 sm:px-6 lg:px-8';

/** The widest a page grows. Every page and the breadcrumb bar share it, so nothing sprawls on an ultra-wide screen. */
export const PAGE_MAX_WIDTH = 'mx-auto w-full max-w-7xl';

/** Consistent page frame: one gutter, one maximum width, centred. */
export function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(PAGE_MAX_WIDTH, 'py-4 sm:py-6 lg:py-8', PAGE_GUTTER, className)}
      {...props}
    />
  );
}

/** A titled block inside a page. */
export function Section({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
