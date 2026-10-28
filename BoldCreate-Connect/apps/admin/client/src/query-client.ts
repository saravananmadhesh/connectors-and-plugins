import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: (failureCount, error) =>
        !(error instanceof Error && 'status' in error && error.status === 401) && failureCount < 2,
    },
  },
});

// Drop cached data when the api says the session is gone.
window.addEventListener('admin:unauthenticated', () => {
  queryClient.clear();
});
