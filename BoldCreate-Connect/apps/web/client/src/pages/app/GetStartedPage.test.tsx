/**
 * GetStartedPage tests.
 * Covers: the steps for the active organization, and the state of someone without one.
 */
import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Id } from '@boldcreate-integrations/contracts';
import { GetStartedPage } from './GetStartedPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const ORG_ID = 'o1' as Id<'org'>;
const NOW = new Date().toISOString();

const ME: apiModule.MeResponse = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: NOW,
    status: 'active',
    createdAt: NOW,
  },
  memberships: [
    {
      organizationId: ORG_ID,
      organizationName: 'Acme',
      organizationSlug: 'acme',
      role: 'ADMIN',
      status: 'active',
    },
  ],
};

function show(me: apiModule.MeResponse) {
  vi.spyOn(apiModule.auth, 'me').mockResolvedValue(me);
  vi.spyOn(apiModule.installations, 'list').mockResolvedValue({ items: [], nextCursor: null });
  vi.spyOn(apiModule.orgApiKeys, 'list').mockResolvedValue({ items: [], nextCursor: null });
  return renderWithRouter(GetStartedPage, '/get-started', {
    queryData: [{ key: ['me'], data: me }],
    url: '/get-started',
  });
}

describe('GetStartedPage', () => {
  afterEach(() => vi.restoreAllMocks());

  it('names the organization and lists the steps', async () => {
    await show(ME);
    expect(screen.getByRole('heading', { level: 1, name: 'Get started' })).toBeInTheDocument();
    expect(screen.getByText(/set up acme in a few steps/i)).toBeInTheDocument();
    expect(await screen.findByText('Install a plugin')).toBeInTheDocument();
    expect(screen.getByText('Create an API key')).toBeInTheDocument();
  });

  it('asks for an organization first when the user has none', async () => {
    await show({ ...ME, memberships: [] });
    expect(screen.getByText('Create an organization first.')).toBeInTheDocument();
    expect(screen.queryByText('Install a plugin')).not.toBeInTheDocument();
  });
});
