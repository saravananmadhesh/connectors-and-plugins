import { cn } from '../lib/cn';
import { PRODUCT } from '../lib/product';

/** Read once when the page loads, so rendering stays free of the clock. */
const CURRENT_YEAR = new Date().getFullYear();

/** The page footer: the product line and the copyright, nothing else. */
export function AppFooter({
  year = CURRENT_YEAR,
  className,
}: {
  year?: number;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        'flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t px-6 py-4 text-xs text-muted-foreground',
        className,
      )}
    >
      <span>
        {PRODUCT.name} by {PRODUCT.maker} · {PRODUCT.console}
      </span>
      <span>© {year} Syncfusion, Inc. All rights reserved.</span>
    </footer>
  );
}
