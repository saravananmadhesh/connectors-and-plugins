/**
 * OrgSettingsPage tests.
 * Covers: the policy toggles reflect the stored policy, owners and admins change them, members
 * only read them, failures show a message.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrgSettingsPage } from './OrgSettingsPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { orgMeFor } from '@/test/org-me';
import type { Id } from '@boldcreate-integrations/contracts';

const ORG_ID = 'o1' as Id<'org'>;
const ROUTE_PATH = '/orgs/$orgId/settings' as const;

const ME: apiModule.MeResponse = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active',
    createdAt: new Date().toISOString(),
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

const POLICY: apiModule.OrgPolicyResponse = {
  allowPersonalInstalls: true,
  allowPersonalApiKeys: false,
  allowedKeyPresets: ['agent', 'read_only'],
  maxPersonalKeyExpiryDays: null,
  updatedAt: null,
};

const BACK_ROUTE = [{ path: '/orgs/$orgId', component: () => <div>org</div> }];

function options(role: 'ADMIN' | 'VIEWER' = 'ADMIN') {
  return {
    extraRoutes: BACK_ROUTE,
    url: `/orgs/${ORG_ID}/settings`,
    queryData: [
      { key: ['me'], data: ME },
      { key: ['org', ORG_ID, 'policy'], data: POLICY },
      { key: ['org', ORG_ID, 'me'], data: orgMeFor('u1', role) },
    ],
  };
}

describe('OrgSettingsPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'getPolicy').mockResolvedValue(POLICY);
  });

  it('shows the stored policy in two toggles', async () => {
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options());
    expect(screen.getByLabelText(/install plugins for themselves/i)).toBeChecked();
    expect(screen.getByLabelText(/create personal api keys/i)).not.toBeChecked();
  });

  it('saves a changed toggle and keeps the answer', async () => {
    const update = vi.spyOn(apiModule.orgs, 'updatePolicy').mockResolvedValue({
      ...POLICY,
      allowPersonalApiKeys: true,
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options());
    await userEvent.click(screen.getByLabelText(/create personal api keys/i));
    await waitFor(() =>
      expect(update).toHaveBeenCalledWith(ORG_ID, { allowPersonalApiKeys: true }),
    );
    await waitFor(() => expect(screen.getByLabelText(/create personal api keys/i)).toBeChecked());
  });

  it('turns personal installs off', async () => {
    const update = vi
      .spyOn(apiModule.orgs, 'updatePolicy')
      .mockResolvedValue({ ...POLICY, allowPersonalInstalls: false });
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options());
    await userEvent.click(screen.getByLabelText(/install plugins for themselves/i));
    await waitFor(() =>
      expect(update).toHaveBeenCalledWith(ORG_ID, { allowPersonalInstalls: false }),
    );
  });

  it('only lets a viewer read the policy', async () => {
    const update = vi.spyOn(apiModule.orgs, 'updatePolicy');
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options('VIEWER'));
    expect(screen.getByLabelText(/install plugins for themselves/i)).toBeDisabled();
    expect(screen.getByLabelText(/create personal api keys/i)).toBeDisabled();
    expect(screen.getByText(/admins and members can change these settings/i)).toBeInTheDocument();
    expect(update).not.toHaveBeenCalled();
  });

  it('shows the server message when saving is refused', async () => {
    vi.spyOn(apiModule.orgs, 'updatePolicy').mockRejectedValue(
      new apiModule.ApiError(403, 'forbidden', 'You do not have permission to do that.'),
    );
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options());
    await userEvent.click(screen.getByLabelText(/create personal api keys/i));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('You do not have permission to do that.'),
    );
  });

  it('shows a generic message when saving fails without an api error', async () => {
    vi.spyOn(apiModule.orgs, 'updatePolicy').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, options());
    await userEvent.click(screen.getByLabelText(/create personal api keys/i));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to save the policy'),
    );
  });

  it('shows a placeholder while the policy loads', async () => {
    vi.spyOn(apiModule.orgs, 'getPolicy').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(OrgSettingsPage, ROUTE_PATH, {
      ...options(),
      queryData: [{ key: ['me'], data: ME }],
    });
    expect(screen.getByRole('status', { name: 'Loading settings' })).toBeInTheDocument();
    expect(screen.queryByLabelText(/install plugins for themselves/i)).not.toBeInTheDocument();
  });
});
