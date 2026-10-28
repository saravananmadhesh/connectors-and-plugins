import { useQuery } from '@tanstack/react-query';
import { adminApi } from './api';

export const SESSION_KEY = ['admin', 'session'] as const;

/** The signed-in admin, or an error with status 401 when there is none. */
export function useSession() {
  return useQuery({ queryKey: SESSION_KEY, queryFn: adminApi.session, retry: false });
}
