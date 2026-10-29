/**
 * The addresses from before the organization was part of them, and the home address, open the
 * right page of the right organization.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as apiModule from '@/lib/api';
import { ACTIVE_ORG_STORAGE_KEY } from '@/lib/active-org';
import { queryClient } from './query-client';
import { router } from './router';

const member = (organizationId: string) => ({ organizationId, organizationName: organizationId });
const me = (...orgs: string[]) =>
  ({
    user: { id: 'usr_1', email: 'a@example.com', displayName: 'Ada' },
    memberships: orgs.map(member),
  }) as unknown as apiModule.MeResponse;

async function open(to: string) {
  await router.navigate({ to } as never);
  return router.state.location;
}

describe('addresses without an organization', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    queryClient.clear();
    vi.spyOn(apiModule.orgs, 'get').mockResolvedValue({} as never);
  });

  it('open the same page of the organization used last', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me('org_1', 'org_2'));
    window.localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, JSON.stringify({ orgId: 'org_2' }));
    expect((await open('/marketplace')).pathname).toBe('/orgs/org_2/marketplace');
    expect((await open('/installed')).pathname).toBe('/orgs/org_2/installed');
    expect((await open('/get-started')).pathname).toBe('/orgs/org_2/get-started');
    expect((await open('/api-keys')).pathname).toBe('/orgs/org_2/api-keys');
    expect((await open('/marketplace/plg_1')).pathname).toBe('/orgs/org_2/marketplace/plg_1');
  });

  it('keep the filters of the address they came with', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me('org_1'));
    const location = await open('/marketplace?q=search&page=2');
    expect(location.pathname).toBe('/orgs/org_1/marketplace');
    expect(location.search).toMatchObject({ q: 'search', page: 2 });
  });

  it('fall back to the first organization when the one used last is gone', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me('org_1', 'org_2'));
    window.localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, JSON.stringify({ orgId: 'org_9' }));
    expect((await open('/installed')).pathname).toBe('/orgs/org_1/installed');
  });

  it('send the home address to the marketplace of an organization', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me('org_1'));
    expect((await open('/')).pathname).toBe('/orgs/org_1/marketplace');
    expect((await open('/orgs')).pathname).toBe('/orgs/org_1/marketplace');
  });

  it('leave someone in no organization on the home address, which says what to do', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me());
    expect((await open('/orgs')).pathname).toBe('/orgs');
    expect((await open('/marketplace')).pathname).toBe('/orgs');
  });

  it('send someone who is signed out to sign in', async () => {
    vi.spyOn(apiModule.auth, 'me').mockRejectedValue(new apiModule.ApiError(401, 'unauth', 'no'));
    expect((await open('/marketplace')).pathname).toBe('/signin');
    expect((await open('/orgs')).pathname).toBe('/signin');
  });
});
