/**
 * ForgotPasswordPage tests.
 * Covers: renders, successful submit → "check email", back link.
 */
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import * as apiModule from '@/lib/api';
import { renderWithRouter } from '@/test/render-with-router';

describe('ForgotPasswordPage', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('renders email field and submit button', async () => {
    await renderWithRouter(ForgotPasswordPage, '/forgot-password');
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('shows "check your email" after successful submit', async () => {
    vi.spyOn(apiModule.auth, 'forgotPassword').mockResolvedValue(undefined);
    await renderWithRouter(ForgotPasswordPage, '/forgot-password');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    await waitFor(() => expect(screen.getByText(/check your email/i)).toBeInTheDocument());
  });

  it('has a back to sign in link', async () => {
    await renderWithRouter(ForgotPasswordPage, '/forgot-password');
    expect(screen.getByRole('link', { name: /back to sign in/i })).toBeInTheDocument();
  });

  it('shows spinner while submit is pending', async () => {
    vi.spyOn(apiModule.auth, 'forgotPassword').mockReturnValue(new Promise(() => {}));
    await renderWithRouter(ForgotPasswordPage, '/forgot-password');
    await userEvent.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await userEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
