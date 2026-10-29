import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { PageLoader } from './components/PageLoader';
import { queryClient } from './query-client';
import { createAdminRouter } from './router';
import './index.css';

const router = createAdminRouter(queryClient);
const root = createRoot(document.getElementById('root')!);

// The first route resolves behind the full-page loader, so the page never flashes a skeleton
// between the loader and the first screen.
root.render(<PageLoader />);
// Hold the loader for a full turn so the animation reads clearly.
const MIN_LOADER_MS = 1000;
void Promise.allSettled([
  router.load(),
  new Promise((resolve) => setTimeout(resolve, MIN_LOADER_MS)),
]).then(() => {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
