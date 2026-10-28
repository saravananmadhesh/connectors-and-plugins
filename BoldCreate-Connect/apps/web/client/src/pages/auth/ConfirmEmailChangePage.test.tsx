/**
 * ConfirmEmailChangePage tests.
 * Covers: confirms from the URL token, success message, failure message, missing token.
 */
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmEmailChangePage } from './ConfirmEmailChangePage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const EXTRA = [{ path: '/signin', component: () => <div>signin</div> }];

describe('ConfirmEmailChangePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('confirms the token from the link and reports success', async () => {
    const confirm = vi.spyOn(apiModule.auth, 'confirmEmailChange').mockResolvedValue(undefined);
    await renderWithRouter(ConfirmEmailChangePage, '/confirm-email-change', {
      extraRoutes: EXTRA,
      url: '/confirm-email-change?token=abc123',
    });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/was changed/i));
    expect(confirm).toHaveBeenCalledWith('abc123');
  });

  it('shows the server message when the token is rejected', async () => {
    vi.spyOn(apiModule.auth, 'confirmEmailChange').mockRejectedValue(
      new apiModule.ApiError(400, 'token_invalid_or_expired', 'The link is invalid or expired.'),
    );
    await renderWithRouter(ConfirmEmailChangePage, '/confirm-email-change', {
      extraRoutes: EXTRA,
      url: '/confirm-email-change?token=old',
    });
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('The link is invalid or expired.'),
    );
  });

  it('shows a generic message on a network failure', async () => {
    vi.spyOn(apiModule.auth, 'confirmEmailChange').mockRejectedValue(new Error('offline'));
    await renderWithRouter(ConfirmEmailChangePage, '/confirm-email-change', {
      extraRoutes: EXTRA,
      url: '/confirm-email-change?token=abc',
    });
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/Confirmation failed/));
  });

  it('does not call the api without a token', async () => {
    const confirm = vi.spyOn(apiModule.auth, 'confirmEmailChange').mockResolvedValue(undefined);
    await renderWithRouter(ConfirmEmailChangePage, '/confirm-email-change', {
      extraRoutes: EXTRA,
    });
    expect(screen.getByRole('alert')).toHaveTextContent(/missing its token/i);
    expect(confirm).not.toHaveBeenCalled();
  });
});
