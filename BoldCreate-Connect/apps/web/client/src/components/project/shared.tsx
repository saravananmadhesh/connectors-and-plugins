/** Small pieces every project tab uses: paging by cursor, a loading and error frame, messages. */
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { messageOf } from './paging';

/** What every tab is given: the project it shows and whether the caller may change it. */
export interface TabProps {
  orgId: string;
  projectId: string;
  canWrite: boolean;
}

/** Previous and next for a list that pages by cursor; nothing shows when there is a single page. */
export function CursorPager({
  hasPrevious,
  nextCursor,
  onBack,
  onForward,
}: {
  hasPrevious: boolean;
  nextCursor: string | null | undefined;
  onBack: () => void;
  onForward: (cursor: string) => void;
}) {
  if (!hasPrevious && !nextCursor) return null;
  return (
    <nav aria-label="Pages" className="flex justify-end gap-2">
      <Button size="sm" variant="outline" disabled={!hasPrevious} onClick={onBack}>
        <ChevronLeft aria-hidden="true" />
        Previous
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={!nextCursor}
        onClick={() => nextCursor && onForward(nextCursor)}
      >
        Next
        <ChevronRight aria-hidden="true" />
      </Button>
    </nav>
  );
}

/** Loading rows, an error with a retry, or the content. */
export function QueryFrame({
  label,
  isPending,
  error,
  onRetry,
  children,
}: {
  label: string;
  isPending: boolean;
  error: unknown;
  onRetry: () => void;
  children: ReactNode;
}) {
  if (error) {
    return (
      <Alert variant="destructive" className="flex flex-wrap items-center justify-between gap-3">
        <span>{`Could not load ${label}. ${messageOf(error)}`}</span>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      </Alert>
    );
  }
  if (isPending) {
    return (
      <div role="status" aria-label={`Loading ${label}`} className="space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }
  return <>{children}</>;
}
