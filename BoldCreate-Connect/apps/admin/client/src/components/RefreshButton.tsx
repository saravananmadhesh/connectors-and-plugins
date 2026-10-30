import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { cn } from '../lib/cn';
import { Button } from './ui/button';

/**
 * Reads again what the page shows. It refetches only the queries the page is using right now, so
 * nothing in the background is touched, and it waits while a read is already under way so a
 * double click does not send two.
 */
export function RefreshButton({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const fetching = useIsFetching() > 0;
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      disabled={fetching}
      onClick={() => void queryClient.refetchQueries({ type: 'active' })}
    >
      <RefreshCw className={cn(fetching && 'animate-spin')} aria-hidden="true" />
      {fetching ? 'Refreshing…' : 'Refresh'}
    </Button>
  );
}
