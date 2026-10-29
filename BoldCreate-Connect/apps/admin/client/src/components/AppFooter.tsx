import { cn } from '../lib/cn';

/** Read once when the page loads, so rendering stays free of the clock. */
const CURRENT_YEAR = new Date().getFullYear();

/** The page footer: the copyright only. The logo already names the product. */
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
        'flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-6 text-center text-xs text-muted-foreground',
        className,
      )}
    >
      <span>© {year} Syncfusion®, Inc. All rights reserved.</span>
    </footer>
  );
}
