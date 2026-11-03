import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { AdminLimitResponse } from '../lib/api';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };

const limit = (overrides: Partial<AdminLimitResponse> = {}): AdminLimitResponse => ({
  key: 'project_requests_per_minute',
  label: 'Project requests per window',
  description: 'Calls a project may make in one window.',
  windowSeconds: 60,
  group: 'Requests',
  unit: 'per_window',
  defaultValue: 5000,
  min: 60,
  max: 100000,
  globalValue: null,
  effectiveValue: 5000,
  reason: null,
  updatedAt: null,
  ...overrides,
});

const serve = (items: AdminLimitResponse[]) =>
  stubApi((_method, path) => {
    if (path.endsWith('/session')) return SESSION;
    return { status: 200, body: { items } };
  });

async function openEditor(name = 'Edit Project requests per window') {
  const user = userEvent.setup();
  await user.click(await screen.findByRole('button', { name }));
  return user;
}

describe('limits page', () => {
  it('shows settings fixed by the deployment without an edit button', async () => {
    serve([
      limit(),
      limit({
        key: 'body_limit_bytes',
        label: 'Largest request body (admin service)',
        group: 'Environment only',
        unit: 'bytes',
        windowSeconds: 1,
        defaultValue: 262_144,
        effectiveValue: 262_144,
        min: 262_144,
        max: 262_144,
        editable: false,
      }),
    ]);
    await renderApp('/limits');
    expect(await screen.findByRole('heading', { name: 'Environment only' })).toBeInTheDocument();
    expect(screen.getAllByText('262,144').length).toBeGreaterThan(0);
    expect(screen.getByText('Environment')).toBeInTheDocument();
    expect(screen.getByText('Set in deployment config')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Edit Largest request body (admin service)' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Edit Project requests per window' }),
    ).toBeInTheDocument();
  });

  it('sends a visitor without a session to the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/limits');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('lists limits under their group with the value in force, built-in value and source', async () => {
    serve([
      limit(),
      limit({
        key: 'pod_max_inflight',
        label: 'Requests one api pod serves at once',
        group: 'Capacity',
        unit: 'concurrent',
        windowSeconds: 1,
        defaultValue: 200,
        effectiveValue: 300,
        globalValue: 300,
        min: 10,
        max: 5000,
        updatedAt: '2030-01-01T00:00:00Z',
      }),
    ]);
    await renderApp('/limits');
    expect(await screen.findByRole('heading', { name: 'Requests' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Capacity' })).toBeInTheDocument();
    expect(screen.getAllByText('5,000')).toHaveLength(2);
    expect(screen.getByText('per 60 seconds')).toBeInTheDocument();
    expect(screen.getByText('at once')).toBeInTheDocument();
    expect(screen.getAllByText('Built-in')).toHaveLength(3);
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getAllByText('Global only')).toHaveLength(2);
    expect(screen.queryByText(/per 1 seconds/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /audit log/ })).toBeInTheDocument();
  });

  it('names the unit of each capacity limit', async () => {
    serve([
      limit({
        key: 'db_queue_max_depth',
        label: 'Queue depth',
        unit: 'callers',
        defaultValue: 100,
        effectiveValue: 100,
        min: 1,
        max: 5000,
        group: 'Capacity',
      }),
      limit({
        key: 'db_queue_max_wait_seconds',
        label: 'Queue wait',
        unit: 'seconds',
        defaultValue: 5,
        effectiveValue: 5,
        min: 1,
        max: 30,
        group: 'Capacity',
      }),
      limit({
        key: 'db_queue_project_share_pct',
        label: 'Queue share',
        unit: 'percent',
        defaultValue: 25,
        effectiveValue: 25,
        min: 1,
        max: 100,
        group: 'Capacity',
      }),
    ]);
    await renderApp('/limits');
    expect(await screen.findByText('waiting')).toBeInTheDocument();
    expect(screen.getByText('seconds')).toBeInTheDocument();
    expect(screen.getByText('percent')).toBeInTheDocument();
    expect(screen.queryByText(/per 60 seconds/)).not.toBeInTheDocument();
  });

  it('labels a concurrency limit as requests at once', async () => {
    serve([
      limit({ key: 'pod_max_inflight', label: 'Pod cap', unit: 'concurrent', windowSeconds: 1 }),
    ]);
    await renderApp('/limits');
    await openEditor('Edit Pod cap');
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
  });

  it('rejects a value outside the bounds before any request is sent', async () => {
    const calls = serve([limit()]);
    await renderApp('/limits');
    const user = await openEditor();
    const value = screen.getByLabelText('Value');
    await user.clear(value);
    await user.type(value, '10');
    await user.type(screen.getByLabelText('Reason'), 'Test');
    expect(screen.getByText('Use a value from 60 to 100,000.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    expect(calls.some((call) => call.method === 'PUT')).toBe(false);
  });

  it('needs a reason, saves, and shows the new value after the dialog closes', async () => {
    let current = limit();
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'PUT') {
        current = limit({
          globalValue: 8000,
          effectiveValue: 8000,
          updatedAt: '2030-01-01T00:00:00Z',
        });
        return { status: 200, body: current };
      }
      return { status: 200, body: { items: [current] } };
    });
    await renderApp('/limits');
    const user = await openEditor();
    const value = screen.getByLabelText('Value');
    await user.clear(value);
    await user.type(value, '8000');
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
    await user.type(screen.getByLabelText('Reason'), 'Customer launch');
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(await screen.findByText('8,000')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('recorded in the audit log');
    expect(calls.find((call) => call.method === 'PUT')).toMatchObject({
      path: '/api/v1/admin/limits/project_requests_per_minute/global',
      body: { value: 8000, reason: 'Customer launch' },
    });
  });

  it('removes a stored value after a reason is given', async () => {
    let current = limit({ globalValue: 8000, effectiveValue: 8000 });
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'DELETE') {
        current = limit();
        return { status: 200, body: current };
      }
      return { status: 200, body: { items: [current] } };
    });
    await renderApp('/limits');
    const user = await openEditor();
    expect(screen.getByRole('button', { name: 'Remove override' })).toBeDisabled();
    await user.type(screen.getByLabelText('Reason'), 'Back to normal');
    await user.click(screen.getByRole('button', { name: 'Remove override' }));

    await waitFor(() => expect(screen.queryByText('Global')).not.toBeInTheDocument());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(calls.find((call) => call.method === 'DELETE')?.path).toBe(
      '/api/v1/admin/limits/project_requests_per_minute/global?reason=Back%20to%20normal',
    );
  });

  it('offers no removal while the built-in value is in force', async () => {
    serve([limit()]);
    await renderApp('/limits');
    await openEditor();
    expect(screen.queryByRole('button', { name: 'Remove override' })).not.toBeInTheDocument();
  });

  it('closes the dialog on cancel without sending anything', async () => {
    const calls = serve([limit()]);
    await renderApp('/limits');
    const user = await openEditor();
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(calls.some((call) => call.method === 'PUT' || call.method === 'DELETE')).toBe(false);
  });

  it('shows the server error when the save is refused', async () => {
    stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (method === 'PUT') return ERROR('validation_failed', 422);
      return { status: 200, body: { items: [limit()] } };
    });
    await renderApp('/limits');
    const user = await openEditor();
    const value = screen.getByLabelText('Value');
    await user.clear(value);
    await user.type(value, '8000');
    await user.type(screen.getByLabelText('Reason'), 'Try');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
