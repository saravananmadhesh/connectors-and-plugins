import { Skeleton } from '@/components/ui/skeleton';

export function RoutePending() {
  return (
    <div className="space-y-4 p-8" role="status" aria-label="Loading page">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
