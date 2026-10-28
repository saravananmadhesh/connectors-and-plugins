/**
 * SignupPage tests.
 * Covers: field validation, successful signup → "check email" state,
 * server error display, duplicate email (generic success).
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignupPage } from './SignupPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

const EXTRA = [{ path: '/signin', component: () => <div>signin</div> }];

describe('SignupPage', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renders all form fields and submit button', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows "check your email" after successful signup', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockResolvedValue({ userId: 'u1' });
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => expect(screen.getByText(/check your email/i)).toBeInTheDocument());
  });

  it('shows server error message on API failure', async () => {
    vi.spyOn(apiModule.auth, 'signup').mockRejectedValue(
      new apiModule.ApiError(409, 'conflict', 'Email already registered'),
    );
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/full name/i), 'Ada');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Email already registered'),
    );
  });

  it('shows password length validation error on blur', async () => {
    await renderWithRouter(SignupPage, '/signup', { extraRoutes: EXTRA });
    await userEvent.type(screen.getByLabelText(/password/i), 'short');
    await userEvent.tab();
    await waitFor(() => expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument());
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
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
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
    await userEvent.type(screen.getByLabelText(/password/i), 'password12345');
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
