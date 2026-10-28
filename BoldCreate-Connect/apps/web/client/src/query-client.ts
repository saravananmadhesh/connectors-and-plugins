import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) => {
        // Don't retry on 401/403/404
        if (
          error instanceof Error &&
          'status' in error &&
          [401, 403, 404].includes((error as { status: number }).status)
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

// Clear cache on unauthenticated event (fired by api.ts on 401)
window.addEventListener('auth:unauthenticated', () => {
  queryClient.clear();
});
