import { Outlet, Link } from '@tanstack/react-router';
import { Brand } from '@/components/Brand';

/** Centered card layout for auth pages. */
export function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <Link to="/signin" aria-label="BoldCreate" className="mb-8">
        <Brand layout="stacked" />
      </Link>
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
