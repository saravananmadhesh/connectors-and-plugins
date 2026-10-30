import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type {
  AdminErrorGroup,
  AdminErrorGroupDetailResponse,
  AdminErrorOccurrence,
  AdminOpsEvent,
} from '../lib/api';
import { EMPTY_STATS } from '../test/stats';
import { ERROR, renderApp, stubApi, type FakeApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const GROUP_ID = '00000000-0000-4000-8000-0000000000a1';

const group = (overrides: Partial<AdminErrorGroup> = {}): AdminErrorGroup => ({
  id: GROUP_ID,
  service: 'api',
  area: 'kms',
  title: 'KMS unwrap failed: permission denied',
  status: 'unresolved',
  count: 1234,
  firstSeen: new Date(Date.now() - 86_400_000).toISOString(),
  lastSeen: new Date(Date.now() - 3_600_000).toISOString(),
  appVersion: '4821',
  resolvedAt: null,
  resolvedBy: null,
  ...overrides,
});

const occurrence = (overrides: Partial<AdminErrorOccurrence> = {}): AdminErrorOccurrence => ({
  id: '00000000-0000-4000-8000-0000000000b1',
  occurredAt: new Date(Date.now() - 7_200_000).toISOString(),
  environment: 'production',
  appVersion: '4821',
  instanceId: 'api-7d9f',
  requestId: 'req-42',
  traceId: null,
  orgId: null,
  stack: 'Error: permission denied\n    at unwrap (kms.ts:10:5)',
  context: { keyVersion: 3 },
  ...overrides,
});

const event = (overrides: Partial<AdminOpsEvent> = {}): AdminOpsEvent => ({
  id: '00000000-0000-4000-8000-0000000000c1',
  occurredAt: new Date(Date.now() - 600_000).toISOString(),
  service: 'worker',
  kind: 'startup_check_failed',
  severity: 'error',
  environment: 'production',
  appVersion: '4821',
  instanceId: 'worker-1',
  orgId: null,
  detail: { check: 'kms', errorClass: 'PermissionDenied' },
  ...overrides,
});

function stubObservability(handlers: {
  [path: string]: (query: URLSearchParams, body: unknown) => unknown;
}) {
  const api: FakeApi = (_method, path, requestBody) => {
    if (path.endsWith('/session')) return SESSION;
    const url = new URL(path, 'http://x');
    const handler = handlers[url.pathname];
    if (handler) {
      const body = handler(url.searchParams, requestBody);
      return typeof body === 'object' && body !== null && 'status' in body
        ? (body as FakeReply)
        : { status: 200, body };
    }
    return { status: 200, body: { items: [] } };
  };
  return stubApi(api, EMPTY_STATS);
}

const ERRORS = '/api/v1/admin/observability/errors';
const EVENTS = '/api/v1/admin/observability/events';
const STORAGE = '/api/v1/admin/observability/storage';

describe('errors list', () => {
  it('lists error groups with their state, cause and counts, linking to each', async () => {
    stubObservability({
      [ERRORS]: () => ({
        nextCursor: null,
        items: [
          group(),
          group({
            id: GROUP_ID.replace('a1', 'a2'),
            title: 'Blob read failed',
            count: 7,
            status: 'resolved',
            area: null,
          }),
        ],
      }),
    });
    await renderApp('/observability?tab=errors');
    expect(await screen.findByText('KMS unwrap failed: permission denied')).toBeInTheDocument();
    expect(screen.getByText('api · kms')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    const table = within(screen.getByRole('table'));
    expect(table.getByText('Unresolved')).toBeInTheDocument();
    expect(table.getByText('Resolved')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blob read failed' })).toHaveAttribute(
      'href',
      `/observability/errors/${GROUP_ID.replace('a1', 'a2')}`,
    );
    expect(screen.getByText('2 errors shown')).toBeInTheDocument();
  });

  it('fetches older errors with the cursor the server gave', async () => {
    const calls = stubObservability({
      [ERRORS]: (query) =>
        query.get('cursor') === 'more'
          ? {
              nextCursor: null,
              items: [group({ id: GROUP_ID.replace('a1', 'a3'), title: 'Older failure' })],
            }
          : { nextCursor: 'more', items: [group()] },
    });
    await renderApp('/observability?tab=errors');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Load older errors' }));
    expect(await screen.findByText('Older failure')).toBeInTheDocument();
    expect(calls.at(-1)?.path).toContain('cursor=more');
  });

  it('keeps the chosen filters in the address and sends them to the server', async () => {
    const calls = stubObservability({ [ERRORS]: () => ({ nextCursor: null, items: [group()] }) });
    const { router } = await renderApp('/observability?tab=errors');
    const user = userEvent.setup();
    await screen.findByText('KMS unwrap failed: permission denied');
    await user.selectOptions(screen.getByLabelText('State'), 'resolved');
    await user.selectOptions(screen.getByLabelText('Service'), 'worker');
    await waitFor(() => expect(calls.at(-1)?.path).toContain('service=worker'));
    expect(calls.at(-1)?.path).toContain('status=resolved');
    expect(router.state.location.search).toEqual({
      tab: 'errors',
      status: 'resolved',
      service: 'worker',
    });
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    await waitFor(() => expect(router.state.location.search).toEqual({ tab: 'errors' }));
  });

  it('says so when nothing was reported, or nothing matches', async () => {
    stubObservability({ [ERRORS]: () => ({ nextCursor: null, items: [] }) });
    await renderApp('/observability?tab=errors');
    expect(await screen.findByText('No errors have been reported')).toBeInTheDocument();
  });

  it('says so when the filters match nothing', async () => {
    stubObservability({ [ERRORS]: () => ({ nextCursor: null, items: [] }) });
    await renderApp('/observability?tab=errors&status=ignored');
    expect(await screen.findByText('No errors match these filters')).toBeInTheDocument();
  });

  it('shows the reason when the list cannot be read', async () => {
    stubObservability({ [ERRORS]: () => ERROR('internal', 500) });
    await renderApp('/observability?tab=errors');
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});

describe('error detail', () => {
  const detail = (g = group(), occurrences = [occurrence()]): AdminErrorGroupDetailResponse => ({
    group: g,
    occurrences,
  });

  it('shows the group and opens an occurrence to its stack and context', async () => {
    stubObservability({ [`${ERRORS}/${GROUP_ID}`]: () => detail() });
    await renderApp(`/observability/errors/${GROUP_ID}`);
    expect(
      await screen.findByRole('heading', { name: 'KMS unwrap failed: permission denied' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Seen 1,234 times/)).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Show occurrence from/ }));
    expect(await screen.findByText(/at unwrap \(kms\.ts:10:5\)/)).toBeInTheDocument();
    expect(screen.getByText('keyVersion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copy request' })).toBeInTheDocument();
  });

  it('says when an occurrence kept no stack', async () => {
    stubObservability({
      [`${ERRORS}/${GROUP_ID}`]: () =>
        detail(group(), [occurrence({ stack: null, context: null })]),
    });
    await renderApp(`/observability/errors/${GROUP_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /Show occurrence from/ }));
    expect(await screen.findByText(/No stack was kept/)).toBeInTheDocument();
  });

  it('resolves the group and shows its new state', async () => {
    const calls = stubObservability({
      [`${ERRORS}/${GROUP_ID}`]: () => detail(),
      [`${ERRORS}/${GROUP_ID}/status`]: () =>
        detail(
          group({
            status: 'resolved',
            resolvedAt: new Date().toISOString(),
            resolvedBy: 'ops@example.test',
          }),
        ),
    });
    await renderApp(`/observability/errors/${GROUP_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Mark resolved' }));
    expect(await screen.findByRole('button', { name: 'Reopen' })).toBeInTheDocument();
    expect(calls.find((call) => call.method === 'POST')?.body).toEqual({ status: 'resolved' });
  });

  it('shows why a status change failed and keeps the buttons', async () => {
    stubObservability({
      [`${ERRORS}/${GROUP_ID}`]: () => detail(),
      [`${ERRORS}/${GROUP_ID}/status`]: () => ERROR('not_found', 404),
    });
    await renderApp(`/observability/errors/${GROUP_ID}`);
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Ignore' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('no longer exists');
    expect(screen.getByRole('button', { name: 'Ignore' })).toBeEnabled();
  });

  it('says so when the group does not exist', async () => {
    stubObservability({ [`${ERRORS}/${GROUP_ID}`]: () => ERROR('not_found', 404) });
    await renderApp(`/observability/errors/${GROUP_ID}`);
    expect(await screen.findByRole('alert')).toHaveTextContent('no longer exists');
    expect(screen.getByRole('link', { name: /All errors/ })).toBeInTheDocument();
  });
});

describe('events', () => {
  it('lists events in words and opens one to its recorded details', async () => {
    stubObservability({ [EVENTS]: () => ({ nextCursor: null, items: [event()] }) });
    await renderApp('/observability?tab=events');
    expect(await screen.findByText('Startup check failed')).toBeInTheDocument();
    expect(screen.getByText('Error', { selector: 'span' })).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Show details of Startup check failed' }));
    expect(await screen.findByText('PermissionDenied')).toBeInTheDocument();
    expect(screen.getByText('worker-1')).toBeInTheDocument();
  });

  it('sends the kind once typing is committed', async () => {
    const calls = stubObservability({ [EVENTS]: () => ({ nextCursor: null, items: [event()] }) });
    const { router } = await renderApp('/observability?tab=events');
    await screen.findByText('Startup check failed');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Kind'), 'key.{Enter}');
    await waitFor(() => expect(calls.at(-1)?.path).toContain('kind=key.'));
    expect(router.state.location.search).toEqual({ tab: 'events', kind: 'key.' });
  });

  it('says so when nothing has been recorded', async () => {
    stubObservability({ [EVENTS]: () => ({ nextCursor: null, items: [] }) });
    await renderApp('/observability?tab=events');
    expect(await screen.findByText('No events have been recorded')).toBeInTheDocument();
  });

  it('shows the reason when events cannot be read', async () => {
    stubObservability({ [EVENTS]: () => ERROR('internal', 500) });
    await renderApp('/observability?tab=events');
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});

describe('storage', () => {
  const storage = (maxTotalBytes: number) => ({
    totalBytes: 512 * 1024 * 1024,
    maxTotalBytes,
    tables: [
      {
        table: 'error_event',
        rows: 12_000,
        bytes: 400 * 1024 * 1024,
        oldest: '2026-01-01T00:00:00.000Z',
      },
      { table: 'ops_event', rows: 0, bytes: 8192, oldest: null },
    ],
  });

  it('shows the size per table and how full the limit is', async () => {
    stubObservability({ [STORAGE]: () => storage(1024 * 1024 * 1024) });
    await renderApp('/observability?tab=storage');
    expect(await screen.findByText('512.0 MB')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
    expect(screen.getByText('Error event')).toBeInTheDocument();
    expect(screen.getByText('12,000')).toBeInTheDocument();
  });

  it('says so when there is no size limit', async () => {
    stubObservability({ [STORAGE]: () => storage(0) });
    await renderApp('/observability?tab=storage');
    expect(await screen.findByText(/No size limit is set/)).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('shows the reason when storage cannot be read', async () => {
    stubObservability({ [STORAGE]: () => ERROR('internal', 500) });
    await renderApp('/observability?tab=storage');
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});

const OVERVIEW = '/api/v1/admin/observability/overview';
const PURGE = '/api/v1/admin/observability/purge';

const overview = (overrides: object = {}) => ({
  window: '24h',
  since: new Date(Date.now() - 86_400_000).toISOString(),
  unresolvedGroups: 3,
  activeGroups: 5,
  newGroups: 2,
  topGroups: [group()],
  services: [{ service: 'api', activeGroups: 4, problemEvents: 1 }],
  events: { info: 10, warning: 7, error: 1 },
  ...overrides,
});

describe('overview', () => {
  it('opens on what needs attention, with the loudest errors and each service', async () => {
    stubObservability({ [OVERVIEW]: () => overview() });
    await renderApp('/observability');
    const summary = within(await screen.findByRole('region', { name: 'Summary' }));
    expect(summary.getByText('Unresolved errors').parentElement).toHaveTextContent('3');
    expect(summary.getByText('Warnings').parentElement).toHaveTextContent('7');
    expect(
      screen.getByRole('link', { name: 'KMS unwrap failed: permission denied' }),
    ).toHaveAttribute('href', `/observability/errors/${GROUP_ID}`);
    expect(screen.getByText('1,234×')).toBeInTheDocument();
    const services = within(screen.getByRole('region', { name: 'By service' }));
    expect(services.getByText('api')).toBeInTheDocument();
  });

  it('asks for the chosen period and keeps it in the address', async () => {
    const calls = stubObservability({ [OVERVIEW]: () => overview() });
    const { router } = await renderApp('/observability');
    await screen.findByRole('region', { name: 'Summary' });
    const overviewCalls = () => calls.filter((call) => call.path.startsWith(OVERVIEW));
    expect(overviewCalls().at(-1)?.path).toContain('window=24h');
    const user = userEvent.setup();
    await user.selectOptions(screen.getByLabelText('Period'), '7d');
    await waitFor(() => expect(overviewCalls().at(-1)?.path).toContain('window=7d'));
    expect(router.state.location.search).toEqual({ period: '7d' });
  });

  it('says so when nothing is unresolved, and shows the reason when it cannot be read', async () => {
    stubObservability({ [OVERVIEW]: () => overview({ topGroups: [], services: [] }) });
    await renderApp('/observability');
    expect(await screen.findByText('No unresolved errors in this period')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'By service' })).not.toBeInTheDocument();
    vi.unstubAllGlobals();
    stubObservability({ [OVERVIEW]: () => ERROR('internal', 500) });
    await renderApp('/observability');
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong');
  });
});

describe('searching and reloading', () => {
  it('sends the words to find and keeps them in the address', async () => {
    const calls = stubObservability({ [ERRORS]: () => ({ nextCursor: null, items: [group()] }) });
    const { router } = await renderApp('/observability?tab=errors');
    await screen.findByText('KMS unwrap failed: permission denied');
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Search'), 'permission{Enter}');
    await waitFor(() => expect(calls.at(-1)?.path).toContain('q=permission'));
    expect(router.state.location.search).toEqual({ tab: 'errors', q: 'permission' });
  });

  it('reads the page again on request, and only while no read is under way', async () => {
    const calls = stubObservability({ [ERRORS]: () => ({ nextCursor: null, items: [group()] }) });
    await renderApp('/observability?tab=errors');
    await screen.findByText('KMS unwrap failed: permission denied');
    const before = calls.filter((call) => call.path.startsWith(ERRORS)).length;
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Refresh' }));
    await waitFor(() =>
      expect(calls.filter((call) => call.path.startsWith(ERRORS)).length).toBe(before + 1),
    );
    expect(await screen.findByRole('button', { name: 'Refresh' })).toBeEnabled();
  });
});

describe('deleting older records', () => {
  const storageOf = () => ({
    totalBytes: 1024,
    maxTotalBytes: 0,
    tables: [
      { table: 'error_event', rows: 12_000, bytes: 512, oldest: '2026-01-01T00:00:00.000Z' },
      { table: 'ops_event', rows: 5, bytes: 512, oldest: null },
    ],
  });

  it('repeats a large delete until nothing is left, then says how many were removed', async () => {
    const steps = [
      { removed: 500, done: false },
      { removed: 120, done: true },
    ];
    const calls = stubObservability({
      [STORAGE]: storageOf,
      [PURGE]: () => steps.shift(),
    });
    await renderApp('/observability?tab=storage');
    const date = await screen.findByLabelText('Delete error event older than');
    fireEvent.change(date, { target: { value: '2026-01-01' } });
    const user = userEvent.setup();
    const [first] = screen.getAllByRole('button', { name: /Delete older/ });
    await user.click(first!);
    const dialog = within(await screen.findByRole('dialog'));
    expect(dialog.getByText(/cannot be undone/)).toBeInTheDocument();
    await user.click(dialog.getByRole('button', { name: 'Delete' }));
    expect(await screen.findByText('Removed 620 rows.')).toBeInTheDocument();
    const purges = calls.filter((call) => call.path === PURGE);
    expect(purges).toHaveLength(2);
    expect(purges[0]?.body).toEqual({
      table: 'error_event',
      before: new Date('2026-01-01T00:00:00').toISOString(),
    });
  });

  it('needs a date, and shows the reason when the delete fails', async () => {
    stubObservability({ [STORAGE]: storageOf, [PURGE]: () => ERROR('forbidden', 403) });
    await renderApp('/observability?tab=storage');
    const date = await screen.findByLabelText('Delete error event older than');
    const [first] = screen.getAllByRole('button', { name: /Delete older/ });
    expect(first).toBeDisabled();
    fireEvent.change(date, { target: { value: '2026-01-01' } });
    const user = userEvent.setup();
    await user.click(first!);
    const dialog = within(await screen.findByRole('dialog'));
    await user.click(dialog.getByRole('button', { name: 'Delete' }));
    expect(await dialog.findByRole('alert')).toHaveTextContent('The page expired');
  });

  it('says so when a large delete stops part-way', async () => {
    stubObservability({ [STORAGE]: storageOf, [PURGE]: () => ({ removed: 5, done: false }) });
    await renderApp('/observability?tab=storage');
    fireEvent.change(await screen.findByLabelText('Delete error event older than'), {
      target: { value: '2026-01-01' },
    });
    const user = userEvent.setup();
    await user.click(screen.getAllByRole('button', { name: /Delete older/ })[0]!);
    await user.click(
      within(await screen.findByRole('dialog')).getByRole('button', { name: 'Delete' }),
    );
    expect(await screen.findByText(/so far; run it again to continue/)).toBeInTheDocument();
  });
});
