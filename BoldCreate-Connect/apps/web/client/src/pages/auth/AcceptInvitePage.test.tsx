/**
 * AcceptInvitePage tests.
 * Covers: signed-out landing, accept when signed in, expired, another address, already a member.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AcceptInvitePage } from './AcceptInvitePage';
import * as apiModule from '@/lib/api';
import { pendingInvite, pendingInviteEmail, pendingInviteOrg } from '@/lib/pending-invite';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ME = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  },
  memberships: [],
};

const EXTRA = [
  { path: '/orgs', component: () => <div>marketplace</div> },
  { path: '/signin', component: () => <div>signin</div> },
  { path: '/signup', component: () => <div>signup</div> },
  { path: '/orgs/$orgId', component: () => <div>org home</div> },
  { path: '/orgs/$orgId/projects', component: () => <div>org projects</div> },
];

const URL = '/accept-invite?token=tok-1';
const render = (url = URL) =>
  renderWithRouter(AcceptInvitePage, '/accept-invite', { extraRoutes: EXTRA, url });

describe('AcceptInvitePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const signedOut = () =>
    vi.spyOn(apiModule.auth, 'me').mockImplementation(() => {
      // The real request signals every 401 this way, and the app answers by clearing its cache.
      window.dispatchEvent(new CustomEvent('auth:unauthenticated'));
      return Promise.reject(new apiModule.ApiError(401, 'unauth', 'no'));
    });

  it('names the organization and keeps the invite for someone signed out', async () => {
    signedOut();
    vi.spyOn(apiModule.orgs, 'previewInvite').mockResolvedValue({
      state: 'valid',
      email: 'ada@example.com',
      organizationName: 'Acme',
      role: 'MEMBER',
      registered: false,
    });
    const accept = vi.spyOn(apiModule.orgs, 'acceptInvite');
    await render();
    expect(await screen.findByText('Join Acme')).toBeInTheDocument();
    expect(screen.getByText(/choose a password for ada@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create password and join' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(pendingInvite()).toBe('tok-1');
    expect(pendingInviteEmail()).toBe('ada@example.com');
    expect(pendingInviteOrg()).toBe('Acme');
    expect(accept).not.toHaveBeenCalled();
  });

  it('leads with sign in when the address is already registered', async () => {
    signedOut();
    vi.spyOn(apiModule.orgs, 'previewInvite').mockResolvedValue({
      state: 'valid',
      email: 'ada@example.com',
      organizationName: 'Acme',
      role: 'VIEWER',
      registered: true,
    });
    await render();
    expect(await screen.findByText(/sign in as ada@example.com/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Create password and join' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
  });

  it.each(['expired', 'unavailable'] as const)(
    'shows the %s message with Sign up and no resend, and drops the invite',
    async (state) => {
      signedOut();
      localStorage.setItem('pending-invite-token', 'tok-1');
      vi.spyOn(apiModule.orgs, 'previewInvite').mockResolvedValue({
        state,
        email: null,
        organizationName: null,
        role: null,
        registered: null,
      });
      await render();
      expect(await screen.findByText('Invitation expired')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
      expect(screen.queryByText(/resend/i)).not.toBeInTheDocument();
      expect(pendingInvite()).toBeNull();
    },
  );

  it('still offers sign in and sign up when the link cannot be looked up', async () => {
    signedOut();
    vi.spyOn(apiModule.orgs, 'previewInvite').mockRejectedValue(new Error('network'));
    await render();
    expect(await screen.findByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(pendingInvite()).toBe('tok-1');
  });

  it('accepts when signed in and opens the organization', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    const accept = vi
      .spyOn(apiModule.orgs, 'acceptInvite')
      .mockResolvedValue({ orgId: 'org_1' as Id<'org'>, role: 'MEMBER' });
    localStorage.setItem('pending-invite-token', 'tok-1');
    await render();
    await waitFor(() => expect(screen.getByText('org home')).toBeInTheDocument());
    expect(accept).toHaveBeenCalledWith('tok-1');
    expect(pendingInvite()).toBeNull();
  });

  it('opens the organization overview for a viewer too', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'acceptInvite').mockResolvedValue({
      orgId: 'org_1' as Id<'org'>,
      role: 'VIEWER',
    });
    await render();
    await waitFor(() => expect(screen.getByText('org home')).toBeInTheDocument());
  });

  it('shows the expired message with a way to the organization when signed in', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'acceptInvite').mockRejectedValue(
      new apiModule.ApiError(400, 'token_invalid_or_expired', 'expired'),
    );
    await render();
    expect(await screen.findByText('Invitation expired')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /your organization/i })).toBeInTheDocument();
  });

  it('asks to sign out when the invite was sent to another address', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'acceptInvite').mockRejectedValue(
      new apiModule.ApiError(403, 'forbidden', 'no'),
    );
    const signout = vi.spyOn(apiModule.auth, 'signout').mockResolvedValue(undefined);
    await render();
    await userEvent.click(await screen.findByRole('button', { name: 'Sign out' }));
    await waitFor(() => expect(signout).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText('signin')).toBeInTheDocument());
    expect(pendingInvite()).toBe('tok-1');
  });

  it('goes to the home address when already a member', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    vi.spyOn(apiModule.orgs, 'acceptInvite').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'member'),
    );
    await render();
    await waitFor(() => expect(screen.getByText('marketplace')).toBeInTheDocument());
  });

  it('reports a link without a token', async () => {
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
    await render('/accept-invite');
    expect(await screen.findByText(/missing its token/i)).toBeInTheDocument();
  });
});
