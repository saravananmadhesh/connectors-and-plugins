import { Outlet } from '@tanstack/react-router';

/** Root layout — just renders children; no chrome here. */
export function RootLayout() {
  return <Outlet />;
}
