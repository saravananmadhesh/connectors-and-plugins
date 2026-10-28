import { cn } from '../lib/cn';
import { PRODUCT } from '../lib/product';

function Mark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground',
        className,
      )}
    >
      <svg viewBox="0 0 64 64" className="size-[70%]" fill="none">
        <path
          d="M20 12v40M20 12h14a9 9 0 0 1 0 20H20m0 0h17a10 10 0 0 1 0 20H20"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="14" r="4" fill="currentColor" />
      </svg>
    </span>
  );
}

/**
 * The product lockup: mark, "BoldCreate" and "by Syncfusion", with the name of this console
 * under it. Swap the mark for the official artwork here and every screen follows.
 */
export function Brand({
  layout = 'row',
  className,
}: {
  layout?: 'row' | 'stacked';
  className?: string;
}) {
  if (layout === 'stacked') {
    return (
      <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
        <Mark className="size-11 text-xl" />
        <div>
          <p className="text-lg leading-tight font-semibold tracking-tight">
            {PRODUCT.name} <span className="font-light">{PRODUCT.edition}</span>{' '}
            <span className="text-sm font-normal text-muted-foreground">by {PRODUCT.maker}</span>
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">{PRODUCT.console}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center gap-2.5">
        <Mark className="size-9 text-base" />
        <p className="leading-tight">
          <span className="block text-base font-semibold tracking-tight">
            {PRODUCT.name} <span className="font-light">{PRODUCT.edition}</span>
          </span>
          <span className="block text-[11px] text-sidebar-muted">by {PRODUCT.maker}</span>
        </p>
      </div>
      <p className="text-[11px] font-medium tracking-wide text-sidebar-muted uppercase">
        {PRODUCT.console}
      </p>
    </div>
  );
}
