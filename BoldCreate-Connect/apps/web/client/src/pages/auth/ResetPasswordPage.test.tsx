/**
 * ResetPasswordPage tests.
 * Covers: missing token → invalid link, password too short, success, API error.
 *
 * We navigate the router to the path with search params after rendering,
 * then wait for the component to re-render with the token.
 */
import { act } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import { ResetPasswordPage } from './ResetPasswordPage';

describe('ResetPasswordPage', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('shows invalid link message when token is missing', async () => {
    await renderWithRouter(ResetPasswordPage, '/reset-password');
    expect(screen.getByText(/invalid link/i)).toBeInTheDocument();
  });

  it('renders password field when token is present', async () => {
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument());
  });

  it('submit button is disabled when password is too short', async () => {
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'short');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'short');
    expect(screen.getByRole('button', { name: /set new password/i })).toBeDisabled();
  });

  it('shows "password updated" after successful reset', async () => {
    vi.spyOn(apiModule.auth, 'resetPassword').mockResolvedValue(undefined);
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'newpassword123');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /set new password/i }));
    await waitFor(() => expect(screen.getByText(/password updated/i)).toBeInTheDocument());
  });

  it('shows error message on API failure', async () => {
    vi.spyOn(apiModule.auth, 'resetPassword').mockRejectedValue(
      new apiModule.ApiError(401, 'unauthenticated', 'Token expired'),
    );
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'newpassword123');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /set new password/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Token expired'));
  });

  it('shows generic fallback message on non-ApiError failure', async () => {
    vi.spyOn(apiModule.auth, 'resetPassword').mockRejectedValue(new Error('Network error'));
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'newpassword123');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /set new password/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/link may have expired/i),
    );
  });

  it('shows spinner while reset is pending', async () => {
    vi.spyOn(apiModule.auth, 'resetPassword').mockReturnValue(new Promise(() => {}));
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password');
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'newpassword123');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /set new password/i }));
    expect(screen.getByRole('button', { name: /set new password/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('navigates to /signin when Sign in button is clicked after reset', async () => {
    vi.spyOn(apiModule.auth, 'resetPassword').mockResolvedValue(undefined);
    const { router } = await renderWithRouter(ResetPasswordPage, '/reset-password', {
      extraRoutes: [{ path: '/signin', component: () => <div>signin</div> }],
    });
    await act(async () => {
      await router.navigate({ to: '/reset-password', search: { token: 'abc123' } });
    });
    await waitFor(() => screen.getByLabelText(/^new password$/i));
    await userEvent.type(screen.getByLabelText(/^new password$/i), 'newpassword123');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /set new password/i }));
    await waitFor(() => screen.getByText(/password updated/i));
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => expect(screen.getByText('signin')).toBeInTheDocument());
  });
});
