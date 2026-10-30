import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

interface Props {
  shown: number;
  noun: string;
  hasMore: boolean;
  loading: boolean;
  onMore: () => void;
}

/** Footer of a keyset-paged table: how many are shown and a button for the next page. */
export function LoadMore({ shown, noun, hasMore, loading, onMore }: Props) {
  return (
    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
      <span>
        {shown} {noun}
        {shown === 1 ? '' : 's'} shown
      </span>
      {hasMore && (
        <Button variant="outline" size="sm" disabled={loading} onClick={onMore}>
          {loading ? 'Loading…' : `Load older ${noun}s`}
        </Button>
      )}
    </div>
  );
}

/** Skeleton rows shaped like a table while the first page loads. */
export function ListSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2" aria-label={label}>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-11" />
      ))}
    </div>
  );
}
