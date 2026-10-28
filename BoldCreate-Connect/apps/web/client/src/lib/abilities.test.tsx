import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { hasAbility, useAbilities } from './abilities';
import * as apiModule from './api';
import { orgMeFor } from '../test/org-me';

const USER = 'u1';
const ORG = 'o1';

function wrapper({ children }: { children: ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('hasAbility', () => {
  it('is false before the membership has loaded', () => {
    expect(hasAbility(undefined, 'org:read')).toBe(false);
  });

  it('reads the abilities the server lists', () => {
    const me = orgMeFor(USER, 'MEMBER');
    expect(hasAbility(me, 'org:read')).toBe(true);
    expect(hasAbility(me, 'org:delete')).toBe(false);
    expect(hasAbility(me, 'team:read')).toBe(false);
  });
});

describe('useAbilities', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('loads the membership of the org and answers by ability name', async () => {
    const me = orgMeFor(USER, 'ADMIN');
    const spy = vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(me);
    const { result } = renderHook(() => useAbilities(ORG), { wrapper });
    expect(result.current.can('org:delete')).toBe(false);
    await waitFor(() => expect(result.current.can('org:delete')).toBe(true));
    expect(result.current.can('member:update')).toBe(true);
    expect(result.current.me?.role).toBe('ADMIN');
    expect(spy).toHaveBeenCalledWith(ORG);
  });

  it('denies a viewer the settings and the For You data', async () => {
    vi.spyOn(apiModule.orgs, 'me').mockResolvedValue(orgMeFor(USER, 'VIEWER'));
    const { result } = renderHook(() => useAbilities(ORG), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.can('invite:create')).toBe(false);
    expect(result.current.can('member:list')).toBe(false);
    expect(result.current.can('installation:list')).toBe(false);
    expect(result.current.can('project:read')).toBe(true);
  });

  it('keeps denying when the request fails', async () => {
    vi.spyOn(apiModule.orgs, 'me').mockRejectedValue(new Error('x'));
    const { result } = renderHook(() => useAbilities(ORG), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.can('org:read')).toBe(false);
  });
});
