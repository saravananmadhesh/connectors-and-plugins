/**
 * SigninPage tests.
 * Covers: renders fields, successful signin → redirect, 401 → generic message,
 * other API error, forgot-password link.
 */
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SigninPage } from './SigninPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const EXTRA = [
  { path: '/marketplace', component: () => <div>marketplace</div> },
  { path: '/forgot-password', component: () => <div>forgot</div> },
  { path: '/signup', component: () => <div>signup</div> },
];

describe('SigninPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue({
      user: {
        id: 'u1' as Id<'usr'>,
        email: 'ada@example.com',
        displayName: 'Ada',
        emailVerifiedAt: null,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
      memberships: [],
    });
  });

  it('renders email, password fields and sign-in button', async () => {
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('validates email locally but submits a nonempty short password for authentication', async () => {
    const signin = vi
      .spyOn(apiModule.auth, 'signin')
      .mockRejectedValue(new apiModule.ApiError(401, 'unauthenticated', 'Unauthenticated'));
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'short');
    expect(screen.queryByText('Password must be at least 12 characters')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(signin).toHaveBeenCalledOnce());
    expect(signin.mock.calls[0]?.[0]).toEqual({ email: 'ada@example.com', password: 'short' });
    expect(await screen.findByRole('alert')).toHaveTextContent('Incorrect email or password');
  });

  it('loads complete profile data before navigating after successful signin', async () => {
    vi.spyOn(apiModule.auth, 'signin').mockResolvedValue({
      user: {
        id: 'u1' as Id<'usr'>,
        email: 'ada@example.com',
        displayName: 'Ada',
        emailVerifiedAt: null,
        status: 'active',
        createdAt: new Date().toISOString(),
      },
    });
    let resolveMe: ((value: apiModule.MeResponse) => void) | undefined;
    const me = vi.spyOn(apiModule.auth, 'me').mockReturnValue(
      new Promise((resolve) => {
        resolveMe = resolve;
      }),
    );
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(me).toHaveBeenCalledOnce());
    expect(screen.queryByText('marketplace')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    await act(async () => {
      resolveMe?.({
        user: {
          id: 'u1' as Id<'usr'>,
          email: 'ada@example.com',
          displayName: 'Ada',
          emailVerifiedAt: null,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        memberships: [
          {
            organizationId: 'org1' as Id<'org'>,
            organizationName: 'Ada Labs',
            organizationSlug: 'ada-labs',
            role: 'ADMIN',
            status: 'active',
          },
        ],
      });
    });
    await waitFor(() => expect(screen.getByText('marketplace')).toBeInTheDocument());
  });

  it('shows generic message on 401', async () => {
    vi.spyOn(apiModule.auth, 'signin').mockRejectedValue(
      new apiModule.ApiError(401, 'unauthenticated', 'Unauthenticated'),
    );
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword1');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/incorrect email or password/i),
    );
  });

  it('shows server error message on non-401 failure', async () => {
    vi.spyOn(apiModule.auth, 'signin').mockRejectedValue(
      new apiModule.ApiError(503, 'service_unavailable', 'Service unavailable'),
    );
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Service unavailable'));
  });

  it('has a forgot-password link', async () => {
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });

  it('has a sign up link', async () => {
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    expect(screen.getByRole('link', { name: /create one/i })).toBeInTheDocument();
  });

  it('shows spinner while sign-in is pending', async () => {
    vi.spyOn(apiModule.auth, 'signin').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('shows generic fallback message on non-ApiError failure', async () => {
    vi.spyOn(apiModule.auth, 'signin').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(SigninPage, '/signin', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong'),
    );
  });
});
