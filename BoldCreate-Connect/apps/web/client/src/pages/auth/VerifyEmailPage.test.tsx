/**
 * VerifyEmailPage tests.
 * Covers: renders form, auto-verify from URL token, manual token submit,
 * resend flow, error display.
 */
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VerifyEmailPage } from './VerifyEmailPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const VERIFIED_USER = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active' as const,
    createdAt: new Date().toISOString(),
  },
};

const EXTRA = [
  { path: '/marketplace', component: () => <div>marketplace</div> },
  { path: '/signin', component: () => <div>signin</div> },
];

describe('VerifyEmailPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue({
      ...VERIFIED_USER,
      memberships: [],
    });
  });

  it('renders the verification form', async () => {
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    expect(screen.getByLabelText(/verification token/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^verify$/i })).toBeInTheDocument();
  });

  it('renders the resend form', async () => {
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resend verification email/i })).toBeInTheDocument();
  });

  it('auto-verifies when token is in URL and navigates to the marketplace', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockResolvedValue(VERIFIED_USER);
    await renderWithRouter(VerifyEmailPage, '/verify-email', {
      extraRoutes: EXTRA,
      url: '/verify-email?token=abc123',
    });
    await waitFor(() => expect(screen.getByText('marketplace')).toBeInTheDocument());
  });

  it('shows error when auto-verify fails', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockRejectedValue(
      new apiModule.ApiError(400, 'invalid_token', 'Token expired'),
    );
    await renderWithRouter(VerifyEmailPage, '/verify-email', {
      extraRoutes: EXTRA,
      url: '/verify-email?token=bad-token',
    });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Token expired'));
  });

  it('submits manual token and navigates to the marketplace', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockResolvedValue(VERIFIED_USER);
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/verification token/i), 'my-token-123');
    await userEvent.click(screen.getByRole('button', { name: /^verify$/i }));
    await waitFor(() => expect(screen.getByText('marketplace')).toBeInTheDocument());
  });

  it('shows error on manual token failure', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockRejectedValue(
      new apiModule.ApiError(400, 'invalid_token', 'Invalid or expired token'),
    );
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/verification token/i), 'bad-token');
    await userEvent.click(screen.getByRole('button', { name: /^verify$/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid or expired token'),
    );
  });

  it('shows success after resend', async () => {
    vi.spyOn(apiModule.auth, 'resendVerification').mockResolvedValue(undefined);
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/your email/i), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: /resend verification email/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/new verification email has been sent/i),
    );
    await act(async () => {});
  });

  it('has a back to sign in link', async () => {
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    expect(screen.getByRole('link', { name: /back to sign in/i })).toBeInTheDocument();
  });

  it('shows generic fallback error on non-ApiError verify failure', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(VerifyEmailPage, '/verify-email', {
      extraRoutes: EXTRA,
      url: '/verify-email?token=bad',
    });
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/link may have expired/i),
    );
  });

  it('shows verifying spinner while auto-verify is in flight', async () => {
    vi.spyOn(apiModule.auth, 'verifyEmail').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(VerifyEmailPage, '/verify-email', {
      extraRoutes: EXTRA,
      url: '/verify-email?token=abc123',
    });
    await waitFor(() => expect(screen.getByText(/verifying your email/i)).toBeInTheDocument());
  });

  it('shows spinner while resend is pending', async () => {
    vi.spyOn(apiModule.auth, 'resendVerification').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(VerifyEmailPage, '/verify-email', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/your email/i), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: /resend verification email/i }));
    expect(screen.getByRole('button', { name: /resend verification email/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
