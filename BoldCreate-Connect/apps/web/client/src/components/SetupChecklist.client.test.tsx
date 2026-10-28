import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { SetupChecklist } from './SetupChecklist';
import * as apiModule from '@/lib/api';
import { readSetupFlag, writeSetupFlag } from '@/lib/setup-progress';
import { renderWithRouter } from '@/test/render-with-router';

interface Mock {
  installs?: unknown[];
  keys?: unknown[];
  variables?: unknown[];
}

function mockData({ installs = [], keys = [], variables = [] }: Mock) {
  vi.spyOn(apiModule.installations, 'list').mockResolvedValue({
    items: installs,
    nextCursor: null,
  } as unknown as Awaited<ReturnType<typeof apiModule.installations.list>>);
  vi.spyOn(apiModule.installations, 'listVariables').mockResolvedValue({
    items: variables,
    nextCursor: null,
  } as unknown as Awaited<ReturnType<typeof apiModule.installations.listVariables>>);
  vi.spyOn(apiModule.orgApiKeys, 'list').mockResolvedValue({
    items: keys,
    nextCursor: null,
  } as unknown as Awaited<ReturnType<typeof apiModule.orgApiKeys.list>>);
}

const show = () => renderWithRouter(() => <SetupChecklist orgId="o" />, '/', { url: '/' });

const step = (name: string) => screen.getByRole('link', { name: new RegExp(`^${name}`) });

describe('SetupChecklist', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('leaves every step open for a new team', async () => {
    mockData({});
    await show();
    expect(await screen.findByText('0 of 5 done')).toBeInTheDocument();
    expect(step('Install a plugin')).toHaveTextContent('(not done)');
    expect(screen.getByRole('meter', { name: 'Setup progress' })).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  it('ticks browsing once the marketplace was visited', async () => {
    writeSetupFlag('browsed-marketplace', 'o', true);
    mockData({});
    await show();
    expect(await screen.findByText('1 of 5 done')).toBeInTheDocument();
    expect(step('Browse the marketplace')).toHaveTextContent('(done)');
  });

  it('ticks browsing and installing once a plugin is installed', async () => {
    mockData({ installs: [{ id: 'i' }], variables: [{ name: 'A', required: true, isSet: false }] });
    await show();
    expect(await screen.findByText('2 of 5 done')).toBeInTheDocument();
    expect(step('Browse the marketplace')).toHaveTextContent('(done)');
    expect(step('Install a plugin')).toHaveTextContent('(done)');
    expect(step('Configure it')).toHaveTextContent('(not done)');
  });

  it('ticks configuring when every required variable is given, and ignores optional ones', async () => {
    mockData({
      installs: [{ id: 'i' }],
      variables: [
        { name: 'A', required: true, isSet: true },
        { name: 'B', required: false, isSet: false },
      ],
    });
    await show();
    expect(await screen.findByText('3 of 5 done')).toBeInTheDocument();
    expect(step('Configure it')).toHaveTextContent('(done)');
  });

  it('counts a plugin that asks for nothing as configured', async () => {
    mockData({ installs: [{ id: 'i' }], variables: [] });
    await show();
    expect(await screen.findByText('3 of 5 done')).toBeInTheDocument();
  });

  it('does not count configuring when the variables could not be read', async () => {
    mockData({ installs: [{ id: 'i' }] });
    vi.spyOn(apiModule.installations, 'listVariables').mockRejectedValue(new Error('down'));
    await show();
    expect(await screen.findByText('2 of 5 done')).toBeInTheDocument();
    expect(step('Configure it')).toHaveTextContent('(not done)');
  });

  describe('plugins installed for the organization or the user', () => {
    const listFor = (byScope: Record<string, unknown[]>) =>
      vi.spyOn(apiModule.installations, 'list').mockImplementation(async (_org, scope) => {
        return {
          items: byScope[scope] ?? [],
          nextCursor: null,
        } as unknown as Awaited<ReturnType<typeof apiModule.installations.list>>;
      });

    it('counts a plugin installed for the whole organization', async () => {
      mockData({ variables: [{ name: 'A', required: true, isSet: true }] });
      listFor({ org: [{ id: 'i1' }] });
      await show();
      expect(await screen.findByText('3 of 5 done')).toBeInTheDocument();
      expect(step('Install a plugin')).toHaveTextContent('(done)');
      expect(step('Configure it')).toHaveTextContent('(done)');
      expect(apiModule.installations.listVariables).toHaveBeenCalledWith('o', 'org', 'i1');
    });

    it('counts a plugin installed for the user alone', async () => {
      mockData({ variables: [] });
      listFor({ me: [{ id: 'i2' }] });
      await show();
      expect(await screen.findByText('3 of 5 done')).toBeInTheDocument();
      expect(apiModule.installations.listVariables).toHaveBeenCalledWith('o', 'me', 'i2');
    });

    it('asks for the variables of every scope before it calls the plugins configured', async () => {
      mockData({});
      listFor({ org: [{ id: 'a' }], me: [{ id: 'b' }] });
      vi.spyOn(apiModule.installations, 'listVariables').mockImplementation(
        async (_o, _s, id) =>
          ({
            items: [{ name: 'V', required: true, isSet: id === 'a' }],
            nextCursor: null,
          }) as unknown as Awaited<ReturnType<typeof apiModule.installations.listVariables>>,
      );
      await show();
      expect(await screen.findByText('2 of 5 done')).toBeInTheDocument();
      expect(step('Configure it')).toHaveTextContent('(not done)');
    });
  });

  it('ticks the key step once a key exists, and ignores revoked keys', async () => {
    mockData({
      keys: [
        { id: 'k1', revokedAt: '2026-01-01' },
        { id: 'k2', revokedAt: null },
      ],
    });
    await show();
    expect(await screen.findByText('1 of 5 done')).toBeInTheDocument();
    expect(step('Create an API key')).toHaveTextContent('(done)');
  });

  it('does not count only revoked keys', async () => {
    mockData({ keys: [{ id: 'k1', revokedAt: '2026-01-01' }] });
    await show();
    expect(await screen.findByText('0 of 5 done')).toBeInTheDocument();
  });

  it('lets the user confirm and undo connecting the agent, and remembers it', async () => {
    mockData({});
    await show();
    await userEvent.click(await screen.findByRole('button', { name: 'Mark done' }));
    expect(await screen.findByText('1 of 5 done')).toBeInTheDocument();
    expect(readSetupFlag('connected-agent', 'o')).toBe(true);
    expect(step('Connect your agent')).toHaveTextContent('(done)');
    await userEvent.click(screen.getByRole('button', { name: 'Mark not done' }));
    expect(await screen.findByText('0 of 5 done')).toBeInTheDocument();
    expect(readSetupFlag('connected-agent', 'o')).toBe(false);
  });

  it('says so when every step is done', async () => {
    writeSetupFlag('connected-agent', 'o', true);
    mockData({ installs: [{ id: 'i' }], keys: [{ id: 'k', revokedAt: null }], variables: [] });
    await show();
    expect(await screen.findByText('5 of 5 done')).toBeInTheDocument();
    expect(within(screen.getByRole('status')).getByText(/all set/i)).toBeInTheDocument();
  });
});
