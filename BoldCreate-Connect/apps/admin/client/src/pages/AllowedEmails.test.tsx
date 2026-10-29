import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminAllowedEmailResponse } from '../lib/api';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const entry = (overrides: Partial<AdminAllowedEmailResponse> = {}): AdminAllowedEmailResponse => ({
  email: 'ops@example.test',
  source: 'config',
  status: 'verified',
  addedBy: null,
  createdAt: '2026-10-28T00:00:00.000Z',
  ...overrides,
});

describe('allowed users page', () => {
  it('sends a visitor without a session to the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/allowed-users');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('lists each address with its status and where it came from', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return {
        status: 200,
        body: {
          items: [
            entry(),
            entry({
              email: 'new@example.test',
              source: 'added',
              status: 'invited',
              addedBy: 'ops@example.test',
            }),
          ],
        },
      };
    });
    await renderApp('/allowed-users');
    const row = (await screen.findByText('new@example.test')).closest('tr') as HTMLElement;
    expect(within(row).getByText('Waiting for the link')).toBeInTheDocument();
    expect(within(row).getByText('Added by ops@example.test')).toBeInTheDocument();
    const own = screen
      .getAllByText('ops@example.test')
      .find((node) => node.closest('tr'))!
      .closest('tr') as HTMLElement;
    expect(within(own).getByText('Deployment settings')).toBeInTheDocument();
    expect(within(own).queryByRole('button', { name: /Remove/ })).not.toBeInTheDocument();
  });

  it('adds an address and says the link was sent', async () => {
    let items = [entry()];
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'POST') {
        const added = entry({
          email: 'new@example.test',
          source: 'added',
          status: 'invited',
          addedBy: 'ops@example.test',
        });
        items = [...items, added];
        return { status: 201, body: added };
      }
      return { status: 200, body: { items } };
    });
    await renderApp('/allowed-users');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText('Email address'), ' new@example.test ');
    await user.click(screen.getByRole('button', { name: 'Add and send link' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Added new@example.test');
    expect(await screen.findByRole('cell', { name: 'new@example.test' })).toBeInTheDocument();
    expect(calls.find((call) => call.method === 'POST')?.body).toEqual({
      email: 'new@example.test',
    });
  });

  it('explains an address that is already listed', async () => {
    stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'POST') return ERROR('conflict', 409);
      return { status: 200, body: { items: [entry()] } };
    });
    await renderApp('/allowed-users');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText('Email address'), 'ops@example.test');
    await user.click(screen.getByRole('button', { name: 'Add and send link' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'cannot be done in the current state',
    );
  });

  it('resends the link to an address that has not verified yet', async () => {
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'POST') return { status: 204 };
      return {
        status: 200,
        body: {
          items: [
            entry({ email: 'new@example.test', source: 'added', status: 'invited', addedBy: 'x' }),
          ],
        },
      };
    });
    await renderApp('/allowed-users');
    const user = userEvent.setup();
    await user.click(
      await screen.findByRole('button', { name: 'Resend link to new@example.test' }),
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Resend link to new@example.test' }),
      ).toHaveTextContent('Link sent'),
    );
    expect(calls.find((call) => call.method === 'POST')?.path).toBe(
      '/api/v1/admin/allowed-emails/new%40example.test/invite',
    );
  });

  it('removes an added address after asking', async () => {
    let items = [
      entry(),
      entry({ email: 'old@example.test', source: 'added', status: 'verified', addedBy: 'x' }),
    ];
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'DELETE') {
        items = items.slice(0, 1);
        return { status: 204 };
      }
      return { status: 200, body: { items } };
    });
    await renderApp('/allowed-users');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Remove old@example.test' }));
    expect(calls.some((call) => call.method === 'DELETE')).toBe(false);
    await user.click(screen.getByRole('button', { name: 'Yes, remove' }));
    await waitFor(() => expect(screen.queryByText('old@example.test')).not.toBeInTheDocument());
    expect(calls.find((call) => call.method === 'DELETE')?.path).toBe(
      '/api/v1/admin/allowed-emails/old%40example.test',
    );
  });
});
