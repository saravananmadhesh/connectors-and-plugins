import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResendVerification } from './ResendVerification';
import * as apiModule from '@/lib/api';

function show(props: { startsWaiting?: boolean } = {}) {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <ResendVerification email="ada@example.com" {...props} />
    </QueryClientProvider>,
  );
}

describe('ResendVerification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => vi.useRealTimers());

  it('waits out the minute after sign-up, then counts down to an enabled button', async () => {
    show({ startsWaiting: true });
    expect(screen.getByRole('button', { name: 'Resend email in 60s' })).toBeDisabled();
    // Each second schedules the next, so the clock moves one second at a time.
    for (let second = 0; second < 60; second++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });
    }
    expect(screen.getByRole('button', { name: 'Resend email' })).toBeEnabled();
  });

  it('sends the mail, confirms it and waits again', async () => {
    const resend = vi.spyOn(apiModule.auth, 'resendVerification').mockResolvedValue(undefined);
    show();
    await userEvent.click(screen.getByRole('button', { name: 'Resend email' }));
    await waitFor(() => expect(resend).toHaveBeenCalledWith('ada@example.com'));
    expect(await screen.findByText(/sent another link to ada@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resend email in 60s' })).toBeDisabled();
  });

  it('says so when the mail could not be sent, and lets the person try again', async () => {
    vi.spyOn(apiModule.auth, 'resendVerification').mockRejectedValue(
      new apiModule.ApiError(500, 'internal_error', 'Request failed'),
    );
    show();
    await userEvent.click(screen.getByRole('button', { name: 'Resend email' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Request failed');
    expect(screen.getByRole('button', { name: 'Resend email' })).toBeEnabled();
  });
});
