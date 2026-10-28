/**
 * ProfilePage tests.
 * Covers: profile info displayed, change-password success/error,
 * password too short disables submit, sign-out-all.
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProfilePage } from './ProfilePage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';
import type { Id } from '@boldcreate-integrations/contracts';

const ME: apiModule.MeResponse = {
  user: {
    id: 'u1' as Id<'usr'>,
    email: 'ada@example.com',
    displayName: 'Ada Lovelace',
    emailVerifiedAt: new Date().toISOString(),
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  memberships: [],
};

const SIGNIN_EXTRA = [{ path: '/signin', component: () => <div>signin</div> }];

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue(ME);
  });

  it('displays user name and email', async () => {
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
  });

  it('shows email verified status', async () => {
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    expect(screen.getByText('Email verified')).toBeInTheDocument();
  });

  it('update password button is disabled when new password is too short', async () => {
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/current password/i), 'oldpassword1');
    await userEvent.type(screen.getByLabelText(/new password/i), 'short');
    expect(screen.getByRole('button', { name: /update password/i })).toBeDisabled();
  });

  it('signs the user out and goes to /signin after a password change', async () => {
    const change = vi.spyOn(apiModule.auth, 'changePassword').mockResolvedValue(undefined);
    await renderWithRouter(ProfilePage, '/profile', {
      extraRoutes: SIGNIN_EXTRA,
      queryData: [{ key: ['me'], data: ME }],
    });
    await userEvent.type(screen.getByLabelText(/current password/i), 'oldpassword1');
    await userEvent.type(screen.getByLabelText(/new password/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /update password/i }));
    await waitFor(() => expect(screen.getByText('signin')).toBeInTheDocument());
    expect(change).toHaveBeenCalledWith('oldpassword1', 'newpassword123');
  });

  it('requests an email change and says a link is on its way', async () => {
    const change = vi.spyOn(apiModule.auth, 'changeEmail').mockResolvedValue(undefined);
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/new email/i), 'ada.new@example.com');
    await userEvent.type(screen.getByLabelText(/confirm with your password/i), 'oldpassword1');
    await userEvent.click(screen.getByRole('button', { name: /send confirmation/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/on its way/i));
    expect(change).toHaveBeenCalledWith('ada.new@example.com', 'oldpassword1');
  });

  it('shows the server message when the email change is refused', async () => {
    vi.spyOn(apiModule.auth, 'changeEmail').mockRejectedValue(
      new apiModule.ApiError(401, 'invalid_credentials', 'The email or password is not correct.'),
    );
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/new email/i), 'ada.new@example.com');
    await userEvent.type(screen.getByLabelText(/confirm with your password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /send confirmation/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('The email or password is not correct.'),
    );
  });

  it('shows a generic message when the email change fails without an api error', async () => {
    vi.spyOn(apiModule.auth, 'changeEmail').mockRejectedValue(new Error('offline'));
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/new email/i), 'ada.new@example.com');
    await userEvent.type(screen.getByLabelText(/confirm with your password/i), 'pw');
    await userEvent.click(screen.getByRole('button', { name: /send confirmation/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to change email'),
    );
  });

  it('shows error alert when password change fails', async () => {
    vi.spyOn(apiModule.auth, 'changePassword').mockRejectedValue(
      new apiModule.ApiError(401, 'unauthenticated', 'Current password is incorrect'),
    );
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/current password/i), 'wrongpassword1');
    await userEvent.type(screen.getByLabelText(/new password/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /update password/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Current password is incorrect'),
    );
  });

  it('calls signoutAll and navigates to /signin', async () => {
    vi.spyOn(apiModule.auth, 'signoutAll').mockResolvedValue(undefined);
    await renderWithRouter(ProfilePage, '/profile', {
      extraRoutes: SIGNIN_EXTRA,
      queryData: [{ key: ['me'], data: ME }],
    });
    await userEvent.click(screen.getByRole('button', { name: /sign out all/i }));
    await waitFor(() => expect(screen.getByText('signin')).toBeInTheDocument());
  });

  describe('deleting the user', () => {
    beforeEach(() => {
      HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute('open', '');
      });
      HTMLDialogElement.prototype.close = vi.fn();
    });

    async function openDialog(extra = SIGNIN_EXTRA) {
      await renderWithRouter(ProfilePage, '/profile', {
        extraRoutes: extra,
        queryData: [{ key: ['me'], data: ME }],
      });
      await userEvent.click(screen.getAllByRole('button', { name: /delete profile/i })[0]!);
    }

    it('requires the email address to be typed before deleting', async () => {
      const deleteMe = vi.spyOn(apiModule.auth, 'deleteMe').mockResolvedValue({
        status: 'deletion_pending',
        purgeAfter: '2026-01-01T00:00:00.000Z',
      });
      await openDialog();
      const submit = within(screen.getByRole('dialog', { hidden: true })).getByRole('button', {
        name: /delete profile/i,
      });
      expect(submit).toBeDisabled();
      await userEvent.type(screen.getByLabelText(/to confirm/i), 'someone@example.com');
      expect(submit).toBeDisabled();
      expect(deleteMe).not.toHaveBeenCalled();
    });

    it('deletes with the typed address and goes to /signin', async () => {
      const deleteMe = vi.spyOn(apiModule.auth, 'deleteMe').mockResolvedValue({
        status: 'deletion_pending',
        purgeAfter: '2026-01-01T00:00:00.000Z',
      });
      await openDialog();
      await userEvent.type(screen.getByLabelText(/to confirm/i), 'ADA@example.com');
      await userEvent.click(
        within(screen.getByRole('dialog', { hidden: true })).getByRole('button', {
          name: /delete profile/i,
        }),
      );
      await waitFor(() => expect(screen.getByText('signin')).toBeInTheDocument());
      expect(deleteMe).toHaveBeenCalledWith('ADA@example.com');
    });

    it('shows the server message when deletion is refused', async () => {
      vi.spyOn(apiModule.auth, 'deleteMe').mockRejectedValue(
        new apiModule.ApiError(
          409,
          'last_owner_required',
          'An organization needs at least one owner.',
        ),
      );
      await openDialog();
      await userEvent.type(screen.getByLabelText(/to confirm/i), 'ada@example.com');
      await userEvent.click(
        within(screen.getByRole('dialog', { hidden: true })).getByRole('button', {
          name: /delete profile/i,
        }),
      );
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveTextContent(
          'An organization needs at least one owner.',
        ),
      );
      expect(screen.queryByText('signin')).not.toBeInTheDocument();
    });

    it('shows a generic message when deletion fails without an api error', async () => {
      vi.spyOn(apiModule.auth, 'deleteMe').mockRejectedValue(new Error('Network error'));
      await openDialog();
      await userEvent.type(screen.getByLabelText(/to confirm/i), 'ada@example.com');
      await userEvent.click(
        within(screen.getByRole('dialog', { hidden: true })).getByRole('button', {
          name: /delete profile/i,
        }),
      );
      await waitFor(() =>
        expect(screen.getByRole('alert')).toHaveTextContent(/could not delete your profile/i),
      );
    });

    it('closes without deleting when cancelled', async () => {
      const deleteMe = vi.spyOn(apiModule.auth, 'deleteMe');
      await openDialog();
      await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect(screen.queryByLabelText(/to confirm/i)).not.toBeInTheDocument();
      expect(deleteMe).not.toHaveBeenCalled();
    });
  });

  it('says so when the email is not verified', async () => {
    const unverified = { ...ME, user: { ...ME.user, emailVerifiedAt: null } };
    await renderWithRouter(ProfilePage, '/profile', {
      queryData: [{ key: ['me'], data: unverified }],
    });
    expect(screen.getByText('Email not verified')).toBeInTheDocument();
  });

  it('shows dash when member since date is missing', async () => {
    const noDate = { ...ME, user: { ...ME.user, createdAt: '' } };
    await renderWithRouter(ProfilePage, '/profile', {
      queryData: [{ key: ['me'], data: noDate }],
    });
    expect(screen.getByText(/member since\s+—/i)).toBeInTheDocument();
  });

  it('shows generic fallback message on non-ApiError password change failure', async () => {
    vi.spyOn(apiModule.auth, 'changePassword').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(ProfilePage, '/profile', { queryData: [{ key: ['me'], data: ME }] });
    await userEvent.type(screen.getByLabelText(/current password/i), 'oldpassword1');
    await userEvent.type(screen.getByLabelText(/new password/i), 'newpassword123');
    await userEvent.click(screen.getByRole('button', { name: /update password/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Failed to change password'),
    );
  });

  it('shows spinner while sign-out-all is pending', async () => {
    vi.spyOn(apiModule.auth, 'signoutAll').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(ProfilePage, '/profile', {
      extraRoutes: SIGNIN_EXTRA,
      queryData: [{ key: ['me'], data: ME }],
    });
    await userEvent.click(screen.getByRole('button', { name: /sign out all/i }));
    expect(screen.getByRole('button', { name: /sign out all/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
