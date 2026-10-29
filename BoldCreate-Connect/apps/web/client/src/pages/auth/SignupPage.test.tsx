/**
 * SignupPage tests.
 * Covers: field validation, successful signup → "check email" state,
 * server error display, duplicate email (generic success).
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignupPage } from './SignupPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const EXTRA = [
  { path: '/signin', component: () => <div>signin</div> },
  { path: '/accept-invite', component: () => <div>accept invite</div> },
];

describe('SignupPage', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renders all form fields and submit button', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows "check your email" after successful signup', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockResolvedValue({ userId: 'u1' });
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => expect(screen.getByText(/check your email/i)).toBeInTheDocument());
    // The address is named, resend is on the page (waiting out the minute just passed), and there
    // is a way back to fix a mistyped address.
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resend email in [0-9]+s/i })).toBeDisabled();
    expect(screen.queryByText(/sign in to resend/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /start again/i }));
    expect(screen.getByRole('button', { name: /^sign up$/i })).toBeInTheDocument();
  });

  it('fixes the invited address, signs in and goes on to the invitation without a verification step', async () => {
    localStorage.setItem('pending-invite-token', 'tok-1');
    localStorage.setItem('pending-invite-email', 'ada@example.com');
    localStorage.setItem('pending-invite-org', 'Acme');
    const signup = vi.spyOn(apiModule.auth, 'signup').mockResolvedValue({ userId: 'u1' });
    const signin = vi.spyOn(apiModule.auth, 'signin').mockResolvedValue({} as never);
    vi.spyOn(apiModule.auth, 'me').mockResolvedValue({} as never);
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    expect(screen.getByText(/you are joining Acme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveValue('ada@example.com');
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('readonly');
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => expect(screen.getByText('accept invite')).toBeInTheDocument());
    expect(signup).toHaveBeenCalledWith(expect.objectContaining({ inviteToken: 'tok-1' }));
    expect(signin).toHaveBeenCalledWith({ email: 'ada@example.com', password: 'password12345' });
    localStorage.clear();
  });

  it('tells an invited person who is already registered to sign in', async () => {
    localStorage.setItem('pending-invite-token', 'tok-1');
    localStorage.setItem('pending-invite-email', 'ada@example.com');
    vi.spyOn(apiModule.auth, 'signup').mockResolvedValue({ userId: 'u1' });
    vi.spyOn(apiModule.auth, 'signin').mockRejectedValue(
      new apiModule.ApiError(401, 'invalid_credentials', 'Incorrect email or password'),
    );
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/already registered/i));
    localStorage.clear();
  });

  it('tells someone with a verified profile to sign in instead', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Conflict'),
    );
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('This email is already registered.');
    expect(within(alert).getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/signin');
    expect(within(alert).getByRole('link', { name: 'reset your password' })).toBeInTheDocument();
    expect(screen.queryByText(/check your email/i)).not.toBeInTheDocument();
  });

  it('shows server error message on API failure', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockRejectedValue(
      new apiModule.ApiError(500, 'internal_error', 'Email already registered'),
    );
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Email already registered'),
    );
  });

  it('shows password length validation error on blur', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/^password$/i), 'short');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'short');
    await userEvent.tab();
    await waitFor(() => expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument());
  });

  it('does not send the form while the two passwords differ', async () => {
    const signup = vi.spyOn(apiModule.auth, 'signup').mockResolvedValue({ userId: 'u1' });
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12346');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByText('The two passwords do not match')).toBeInTheDocument(),
    );
    expect(signup).not.toHaveBeenCalled();
  });

  it('has a link to sign in', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows generic fallback message on non-ApiError failure', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockRejectedValue(new Error('Network error'));
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong'),
    );
  });

  it('shows spinner while signup is pending', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password12345');
    await userEvent.type(screen.getByLabelText(/^repeat password$/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByRole('button', { name: /sign up/i })).toBeDisabled();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('shows name required validation error when name is cleared', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    const nameInput = screen.getByLabelText(/full name/i);
    await userEvent.type(nameInput, 'Ada');
    await userEvent.clear(nameInput);
    await waitFor(() => expect(screen.getByText(/name is required/i)).toBeInTheDocument());
  });
});
