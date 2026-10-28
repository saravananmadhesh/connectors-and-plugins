import { Link } from '@tanstack/react-router';
import { FileQuestion, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/EmptyState';
import { Page } from '@/components/Page';

/** Shown for an address that matches no page. */
export function RouteNotFound() {
  return (
    <Page>
      <EmptyState
        icon={FileQuestion}
        title="Page not found"
        description="This address does not match a page."
      >
        <Button asChild className="mt-2">
          <Link to="/">Go to the start page</Link>
        </Button>
      </EmptyState>
    </Page>
  );
}

/** Shown when a page fails while rendering, instead of a blank screen. */
export function RouteError() {
  return (
    <Page>
      <EmptyState
        icon={TriangleAlert}
        title="Something went wrong"
        description="This page could not be shown. Reload it, or go back to the start page."
      >
        <div className="mt-2 flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button asChild>
            <Link to="/">Start page</Link>
          </Button>
        </div>
      </EmptyState>
    </Page>
  );
}
