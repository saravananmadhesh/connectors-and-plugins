import { Outlet, Link, useRouterState } from '@tanstack/react-router';
import { AppFooter } from '@/components/AppFooter';
import { Brand } from '@/components/Brand';

/** Centered card layout for auth pages. */
export function AuthLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <Link to="/signin" aria-label="BoldConnect" className="mb-8">
          <Brand layout="stacked" />
        </Link>
        <div className="w-full max-w-sm">
          <div key={pathname} className="animate-page-in">
            <Outlet />
          </div>
        </div>
      </main>
      <AppFooter className="justify-center border-t-0 text-center" />
    </div>
  );
}
