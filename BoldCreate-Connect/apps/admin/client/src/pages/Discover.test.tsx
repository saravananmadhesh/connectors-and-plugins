import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DiscoverPluginsResponse } from '../lib/api';
import { ERROR, renderApp, stubApi, type FakeReply } from '../test/render-app';

afterEach(() => {
  vi.unstubAllGlobals();
});

/** The plugin cards only; the filter above them has its own words for the same states. */
const cards = () => within(screen.getAllByRole('list').at(-1) as HTMLElement);

const SESSION: FakeReply = { status: 200, body: { email: 'ops@example.test' } };
const SOURCE_ID = '00000000-0000-4000-8000-000000000001';
const PLUGIN_UUID = '00000000-0000-4000-8000-0000000000a1';

const installedAs = (overrides: Partial<NonNullable<Candidate['installed']>> = {}) => ({
  sourceId: SOURCE_ID,
  pluginId: PLUGIN_UUID,
  pluginStatus: 'active' as const,
  syncStatus: 'succeeded' as const,
  lastSyncedAt: '2026-10-11T00:00:00.000Z',
  lastError: null,
  ...overrides,
});

type Candidate = DiscoverPluginsResponse['plugins'][number];

const plugin = (path: string, overrides: Partial<Candidate> = {}): Candidate => ({
  path,
  name: `plugin-${path}`,
  displayName: `Plugin ${path}`,
  logoUrl: null,
  version: '1.0.0',
  summary: `Does ${path}`,
  categories: [],
  componentCounts: { skill: 2 },
  mcpTransports: [],
  problem: null,
  installed: null,
  ...overrides,
});

const found = (
  plugins: Candidate[],
  layout: DiscoverPluginsResponse['layout'] = 'collection',
): DiscoverPluginsResponse => ({
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  commitSha: 'b'.repeat(40),
  layout,
  plugins,
  notes: [],
});

async function inspect(
  user: ReturnType<typeof userEvent.setup>,
  url = 'https://github.com/acme/plugins',
) {
  await user.type(await screen.findByLabelText(/GitHub URL/), url);
  await user.click(screen.getByRole('button', { name: 'Inspect repository' }));
}

describe('discover page', () => {
  it('keeps the inspection when switching tabs, and Clear starts over', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover'))
        return { status: 200, body: found([plugin('a'), plugin('b')]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    expect(await screen.findByText(/lists 2 plugins/)).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: /Plugin a/ }));

    await user.click(screen.getByRole('tab', { name: /Added repositories/ }));
    await user.click(await screen.findByRole('tab', { name: 'Find plugins' }));
    expect(await screen.findByText(/lists 2 plugins/)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub URL/)).toHaveValue('https://github.com/acme/plugins');
    expect(screen.getByRole('checkbox', { name: /Plugin a/ })).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.queryByText(/lists 2 plugins/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub URL/)).toHaveValue('');
  });

  it('sends a visitor without a session to the sign-in page', async () => {
    stubApi(() => ERROR('unauthenticated', 401));
    await renderApp('/discover');
    expect(await screen.findByRole('heading', { name: 'Admin sign in' })).toBeInTheDocument();
  });

  it('moves an installed plugin to Installed and reloads the other tabs once its sync finishes', async () => {
    let installedYet = false;
    let polls = 0;
    const source = (lastStatus: 'queued' | 'succeeded') => ({
      id: SOURCE_ID,
      owner: 'acme',
      repository: 'plugins',
      ref: 'main',
      path: 'stored-differently',
      lastCommitSha: null,
      lastSyncedAt: null,
      lastStatus,
      lastError: null,
      lastNote: null,
      createdAt: '2026-10-11T00:00:00.000Z',
      plugin:
        lastStatus === 'succeeded'
          ? { id: PLUGIN_UUID, name: 'plugin-b', displayName: 'Plugin b', status: 'active' }
          : null,
    });
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('b')]) };
      if (path.endsWith('/install')) {
        installedYet = true;
        return {
          status: 200,
          body: { items: [{ path: 'b', outcome: 'added', source: { id: SOURCE_ID } }] },
        };
      }
      if (method === 'GET' && path.endsWith('/plugin-sources')) {
        if (!installedYet) return { status: 200, body: { items: [] } };
        polls += 1;
        return { status: 200, body: { items: [source(polls < 2 ? 'queued' : 'succeeded')] } };
      }
      return { status: 200, body: { items: [], total: 0 } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    await user.click(await screen.findByRole('checkbox', { name: /Plugin b/ }));
    await user.click(screen.getByRole('button', { name: 'Install 1 selected plugin' }));

    expect(await cards().findByText('Installing')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Install result' })).toBeInTheDocument();
    const pluginLoads = () =>
      calls.filter((call) => call.method === 'GET' && call.path.includes('/admin/plugins')).length;
    const before = pluginLoads();
    expect(await cards().findByText('Installed', {}, { timeout: 8000 })).toBeInTheDocument();
    await waitFor(() => expect(pluginLoads()).toBeGreaterThan(before));
    expect(screen.queryByRole('region', { name: 'Install result' })).not.toBeInTheDocument();
  }, 20000);

  it('lists the plugins of a multi-plugin repository and installs only the chosen ones', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) {
        return {
          status: 200,
          body: found([
            plugin('a'),
            plugin('b', { categories: ['Tools'], mcpTransports: ['http'] }),
            plugin('c', { installed: installedAs() }),
            plugin('d', { name: null, displayName: null, problem: 'No plugin manifest.' }),
          ]),
        };
      }
      if (path.endsWith('/install')) {
        return {
          status: 200,
          body: {
            items: [
              { path: 'b', outcome: 'added', source: {} },
              { path: 'a', outcome: 'exists', source: {} },
            ],
          },
        };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);

    expect(await screen.findByText(/lists 4 plugins/)).toBeInTheDocument();
    expect(screen.getAllByText('2 skills')).toHaveLength(4);
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getAllByText('MCP http')).toHaveLength(1);
    expect(screen.getByRole('link', { name: 'Open Plugin a on GitHub' })).toHaveAttribute(
      'href',
      expect.stringMatching(new RegExp('^https://github.com/.+/tree/.+/a$')),
    );
    expect(cards().getAllByText('Not installed')).toHaveLength(2);
    expect(cards().getByText('Installed')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open plugin' })).toBeInTheDocument();
    expect(screen.getByText("Can't be installed")).toBeInTheDocument();
    expect(screen.getByText('No plugin manifest.')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Plugin c/ })).toBeDisabled();
    const enabled = screen
      .getAllByRole('checkbox', { name: /^Select Plugin / })
      .filter((box) => !(box as HTMLInputElement).disabled);
    expect(enabled).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Install 0 selected plugins' })).toBeDisabled();

    await user.click(screen.getByRole('checkbox', { name: /Plugin b/ }));
    await user.click(screen.getByRole('button', { name: 'Install 1 selected plugin' }));

    const result = await screen.findByRole('region', { name: 'Install result' });
    expect(within(result).getByText('1 plugin queued, 1 already added.')).toBeInTheDocument();
    expect(calls.find((call) => call.path.endsWith('/install'))?.body).toEqual({
      owner: 'acme',
      repository: 'plugins',
      ref: 'main',
      paths: ['b'],
      featured: false,
      verified: false,
      visibility: 'public',
    });
    expect(within(result).getByRole('link', { name: /Review/ })).toBeInTheDocument();
  });

  it('locks plugins with a stdio MCP server and can hide them and installed ones', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) {
        return {
          status: 200,
          body: found([
            plugin('a'),
            plugin('local', { mcpTransports: ['stdio'] }),
            plugin('c', { installed: installedAs() }),
          ]),
        };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);

    expect(await screen.findByRole('checkbox', { name: /Plugin a/ })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Plugin local/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hide (1)' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Hide (1)' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: 'MCP stdio' }));
    await user.keyboard('{Escape}');
    expect(await screen.findByRole('checkbox', { name: /Plugin local/ })).toBeDisabled();
    expect(screen.getByText(/Cannot be installed yet/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Select all that can be installed' }));
    expect(screen.getByRole('button', { name: 'Install 1 selected plugin' })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: 'Hide' }));
    await user.click(await screen.findByRole('menuitemcheckbox', { name: 'MCP stdio' }));
    expect(screen.queryByRole('checkbox', { name: /Plugin local/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole('menuitemcheckbox', { name: 'Installed' }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('checkbox', { name: /Plugin c/ })).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Plugin a/ })).toBeInTheDocument();
    expect(screen.getByText('Showing 1 of 3')).toBeInTheDocument();
  });

  it('reads the repository, branch and folder from one link', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('tools')]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    await inspect(userEvent.setup(), 'https://github.com/acme/plugins/tree/release/plugins/tools');
    await screen.findByText(/lists 1 plugin/);
    expect(calls.find((call) => call.path.endsWith('/discover'))?.body).toEqual({
      owner: 'acme',
      repository: 'plugins',
      ref: 'release',
      path: 'plugins/tools',
    });
  });

  it('lets the branch field override the one in the link', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('a')]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await user.type(await screen.findByLabelText(/Branch or tag/), 'v2');
    await inspect(user, 'acme/plugins');
    await screen.findByText(/lists 1 plugin/);
    expect(calls.find((call) => call.path.endsWith('/discover'))?.body).toMatchObject({
      owner: 'acme',
      repository: 'plugins',
      ref: 'v2',
    });
  });

  it('refuses something that is not a repository link before asking the server', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    await inspect(userEvent.setup(), 'https://example.com/not-github');
    expect(await screen.findByRole('alert')).toHaveTextContent('not a GitHub repository link');
    expect(calls.some((call) => call.path.endsWith('/discover'))).toBe(false);
  });

  it('starts the installed plugins as featured, verified and private when asked', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('a')], 'plugin') };
      if (path.endsWith('/install')) {
        return { status: 200, body: { items: [{ path: 'a', outcome: 'added', source: {} }] } };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('checkbox', { name: 'Featured' }));
    await user.click(screen.getByRole('checkbox', { name: 'Verified' }));
    await user.click(screen.getByRole('switch', { name: 'Private' }));
    await inspect(user);
    await user.click(await screen.findByRole('button', { name: 'Install 1 selected plugin' }));
    await screen.findByRole('region', { name: 'Install result' });
    expect(calls.find((call) => call.path.endsWith('/install'))?.body).toMatchObject({
      featured: true,
      verified: true,
      visibility: 'private',
    });
  });

  it('selects everything that can be installed in one click', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) {
        return {
          status: 200,
          body: found([plugin('a'), plugin('b'), plugin('c', { installed: installedAs() })]),
        };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    await user.click(
      await screen.findByRole('button', { name: 'Select all that can be installed' }),
    );
    expect(screen.getByRole('button', { name: 'Install 2 selected plugins' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(screen.getByRole('button', { name: 'Install 0 selected plugins' })).toBeDisabled();
  });

  it('preselects the plugin of a single-plugin repository', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('')], 'plugin') };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(await screen.findByText(/a single plugin/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Install 1 selected plugin' })).toBeEnabled();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('repository root')).toBeInTheDocument();
  });

  it('says so when nothing was found and keeps install out of reach', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([]) };
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(await screen.findByText('No plugins were found in this folder.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Install/ })).not.toBeInTheDocument();
  });

  it('explains why a repository could not be inspected', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      return {
        status: 400,
        body: {
          error: {
            code: 'validation_failed',
            message: 'x',
            requestId: 'r',
            details: [
              { field: 'repository', message: 'The ref could not be resolved to a commit.' },
            ],
          },
        },
      };
    });
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The ref could not be resolved to a commit.',
    );
  });

  it('shows the reason when installing fails and lets the admin try again', async () => {
    let attempts = 0;
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/discover')) return { status: 200, body: found([plugin('a')], 'plugin') };
      if (path.endsWith('/install')) {
        attempts += 1;
        return attempts === 1
          ? ERROR('rate_limited', 429)
          : { status: 200, body: { items: [{ path: 'a', outcome: 'added', source: {} }] } };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    await user.click(await screen.findByRole('button', { name: 'Install 1 selected plugin' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Too many tries');
    await user.click(screen.getByRole('button', { name: 'Install 1 selected plugin' }));
    await waitFor(() =>
      expect(screen.getByText('1 plugin queued, 0 already added.')).toBeInTheDocument(),
    );
  });
});

describe('discover states', () => {
  const stubFound = (plugins: Candidate[], extra?: (path: string) => FakeReply | null) =>
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      const custom = extra?.(path);
      if (custom) return custom;
      if (path.endsWith('/discover')) return { status: 200, body: found(plugins) };
      return { status: 200, body: { items: [] } };
    });

  it('tells apart installed, installing, broken and unusable folders', async () => {
    stubFound([
      plugin('ok', { installed: installedAs() }),
      plugin('new', {
        installed: installedAs({ pluginId: null, pluginStatus: null, syncStatus: 'queued' }),
      }),
      plugin('failed', {
        installed: installedAs({
          pluginId: null,
          pluginStatus: null,
          syncStatus: 'failed',
          lastError: 'Ref not found.',
        }),
      }),
      plugin('empty', {
        installed: installedAs({ pluginId: null, pluginStatus: null, syncStatus: 'succeeded' }),
      }),
      plugin('never', {
        installed: installedAs({ pluginId: null, pluginStatus: null, syncStatus: null }),
      }),
      plugin('bad', { problem: 'Version must be semantic.' }),
    ]);
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(
      await within(await screen.findByRole('list')).findByText('Installed'),
    ).toBeInTheDocument();
    expect(screen.getByText('Installing')).toBeInTheDocument();
    expect(screen.getAllByText('Installed with problems')).toHaveLength(3);
    expect(screen.getByText('Ref not found.')).toBeInTheDocument();
    expect(screen.getByText(/sync finished but did not create a plugin/)).toBeInTheDocument();
    expect(screen.getByText(/never synced, so no plugin exists yet/)).toBeInTheDocument();
    expect(screen.getByText("Can't be installed")).toBeInTheDocument();
    for (const name of [/Plugin ok/, /Plugin new/, /Plugin failed/, /Plugin bad/]) {
      expect(screen.getByRole('checkbox', { name })).toBeDisabled();
    }
  });

  it("shows each plugin's own logo, never the repository owner's, and a default when it cannot load", async () => {
    const own = (path: string) =>
      `https://raw.githubusercontent.com/acme/plugins/${'a'.repeat(40)}/${path}/assets/logo.png`;
    stubFound([
      plugin('a', { logoUrl: own('a') }),
      plugin('b', { logoUrl: own('b') }),
      plugin('c'),
    ]);
    const { container } = await renderApp('/discover');
    await inspect(userEvent.setup());
    await screen.findByText(/lists 3 plugins/);
    const sources = [...container.querySelectorAll('img')].map((image) =>
      image.getAttribute('src'),
    );
    expect(sources).toEqual([own('a'), own('b')]);
    expect(container.querySelector('img[src*="github.com/acme.png"]')).toBeNull();
    // The plugin without a logo and the repository heading show the default tile.
    expect(container.querySelectorAll('[data-logo="default"]')).toHaveLength(2);
    for (const image of container.querySelectorAll('img')) fireEvent.error(image);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelectorAll('[data-logo="default"]')).toHaveLength(4);
  });

  it('lists a folder that cannot be installed under its declared title, not its folder path', async () => {
    stubFound([
      plugin('third_party/odd', {
        name: null,
        displayName: 'Odd Tool',
        problem: 'The manifest name must be 1 to 40 characters.',
      }),
    ]);
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(await screen.findByRole('checkbox', { name: 'Select Odd Tool' })).toBeDisabled();
    expect(screen.getByText('Odd Tool')).toBeInTheDocument();
    expect(screen.getByText('third_party/odd')).toBeInTheDocument();
  });

  it('puts the install button above the plugin cards', async () => {
    stubFound([plugin('a'), plugin('b')]);
    await renderApp('/discover');
    await inspect(userEvent.setup());
    const button = await screen.findByRole('button', { name: /^Install 0 selected plugins/ });
    const list = screen.getByRole('list');
    expect(button.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('lays the cards out so the number per row follows the available width', async () => {
    stubFound([plugin('a'), plugin('b')]);
    await renderApp('/discover');
    await inspect(userEvent.setup());
    await screen.findByRole('list');
    expect(screen.getByRole('list').className).toContain('auto-fill');
  });

  it('shows every plugin of a large repository as its own card', async () => {
    stubFound(Array.from({ length: 100 }, (_, index) => plugin(`p${index}`)));
    await renderApp('/discover');
    await inspect(userEvent.setup());
    expect(await screen.findByText('Showing 100 of 100')).toBeInTheDocument();
    expect(cards().getAllByRole('listitem')).toHaveLength(100);
  });

  it('searches by name, description and folder and says how many are shown', async () => {
    stubFound([
      plugin('third_party/alpha', { displayName: 'Alpha Mail', summary: 'Send email' }),
      plugin('third_party/beta', { displayName: 'Beta Chat', summary: 'Team chat rooms' }),
      plugin('tools/gamma', { displayName: 'Gamma', summary: 'Build things', categories: ['dev'] }),
    ]);
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    const search = await screen.findByRole('searchbox', { name: 'Search plugins' });
    await user.type(search, 'chat');
    expect(screen.getByText('Showing 1 of 3')).toBeInTheDocument();
    expect(cards().getByText('Beta Chat')).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, 'third_party');
    expect(screen.getByText('Showing 2 of 3')).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, 'DEV gamma');
    expect(cards().getByText('Gamma')).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, 'nothing like this');
    expect(screen.getByText('No plugin matches your search.')).toBeInTheDocument();
  });

  it('filters the cards by their state', async () => {
    stubFound([
      plugin('new'),
      plugin('done', { installed: installedAs() }),
      plugin('bad', { problem: 'Version must be semantic.' }),
    ]);
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    const show = await screen.findByRole('combobox', { name: 'Show' });
    await user.selectOptions(show, 'Not installed');
    expect(screen.getByText('Showing 1 of 3')).toBeInTheDocument();
    await user.selectOptions(show, 'Installed');
    expect(cards().getByText('Plugin done')).toBeInTheDocument();
    await user.selectOptions(show, 'Needs attention');
    expect(cards().getByText('Plugin bad')).toBeInTheDocument();
    await user.selectOptions(show, 'All');
    expect(screen.getByText('Showing 3 of 3')).toBeInTheDocument();
  });

  it('selects all only among the cards that are shown, keeping earlier picks', async () => {
    stubFound([plugin('mail-a'), plugin('mail-b'), plugin('chat-a')]);
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    await user.click(await screen.findByRole('checkbox', { name: 'Select Plugin chat-a' }));
    await user.type(screen.getByRole('searchbox', { name: 'Search plugins' }), 'mail');
    await user.click(screen.getByRole('button', { name: 'Select all that can be installed' }));
    expect(screen.getByRole('button', { name: 'Install 3 selected plugins' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(screen.getByRole('button', { name: 'Install 0 selected plugins' })).toBeDisabled();
  });

  it('selects at most the install limit and says why the rest cannot be selected', async () => {
    const many = Array.from({ length: 55 }, (_, index) => plugin(`p${index}`));
    stubFound(many);
    await renderApp('/discover');
    const user = userEvent.setup();
    await inspect(user);
    expect(
      await screen.findByText(/55 plugins can be installed, but one install takes at most 50/),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Select all that can be installed' }));
    expect(screen.getByRole('button', { name: 'Install 50 selected plugins' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Select all that can be installed' })).toBeDisabled();
    expect(
      screen.getByText(/50 plugins are selected, the most one install can take/),
    ).toBeVisible();
    expect(screen.getByRole('checkbox', { name: 'Select Plugin p54' })).toBeDisabled();
    expect(screen.getAllByText(/Cannot be selected: one install takes at most 50/)).toHaveLength(5);
    await user.click(screen.getByRole('checkbox', { name: 'Select Plugin p0' }));
    expect(screen.getByRole('button', { name: 'Install 49 selected plugins' })).toBeEnabled();
    expect(screen.getByRole('checkbox', { name: 'Select Plugin p54' })).toBeEnabled();
  });

  it('offers added repositories as history and inspects the one picked, then hides the history', async () => {
    const calls = stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/plugin-sources')) {
        return {
          status: 200,
          body: {
            items: [
              sourceItem('succeeded', { path: 'alpha' }),
              sourceItem('succeeded', { id: PLUGIN_UUID, path: 'beta' }),
              sourceItem('succeeded', {
                id: SOURCE_ID.replace(/1$/, '2'),
                repository: 'other',
                ref: 'dev',
              }),
            ],
          },
        };
      }
      if (path.endsWith('/discover')) {
        return { status: 200, body: found([plugin('a'), plugin('b')]) };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    const user = userEvent.setup();
    const history = await screen.findByRole('region', { name: 'Repository history' });
    expect(within(history).getAllByRole('button')).toHaveLength(2);
    await user.click(within(history).getByRole('button', { name: /acme\/other/ }));

    expect(await screen.findByText(/lists 2 plugins/)).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Repository history' })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub URL/)).toHaveValue('https://github.com/acme/other');
    expect(screen.getByLabelText(/Branch or tag/)).toHaveValue('dev');
    expect(calls.find((call) => call.path.endsWith('/discover'))?.body).toEqual({
      owner: 'acme',
      repository: 'other',
      ref: 'dev',
      path: '',
    });
  });

  it('points to the added repositories when some folder needs attention', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/plugin-sources')) {
        return { status: 200, body: { items: [sourceItem('failed')] } };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover');
    expect(await screen.findByText(/1 added folder needs attention/)).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'See which' }));
    expect(await screen.findByRole('region', { name: 'acme/plugins' })).toBeInTheDocument();
  });
});

const sourceItem = (
  lastStatus: 'succeeded' | 'failed' | 'queued' | null,
  overrides: Record<string, unknown> = {},
) => ({
  id: SOURCE_ID,
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  path: 'alpha',
  lastCommitSha: null,
  lastSyncedAt: lastStatus === 'succeeded' ? '2026-10-11T00:00:00.000Z' : null,
  lastStatus,
  lastError: lastStatus === 'failed' ? 'Ref not found.' : null,
  lastNote: null,
  createdAt: '2026-10-10T00:00:00.000Z',
  plugin:
    lastStatus === 'succeeded'
      ? { id: PLUGIN_UUID, name: 'alpha', displayName: 'Alpha', status: 'active' }
      : null,
  ...overrides,
});

describe('added repositories', () => {
  function stubSources(items: ReturnType<typeof sourceItem>[]) {
    return stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/plugin-sources') && method === 'GET') {
        return { status: 200, body: { items } };
      }
      if (path.endsWith('/bulk-sync')) return { status: 200, body: { queued: [], skipped: [] } };
      return { status: 200, body: { items: [] } };
    });
  }

  it('groups folders by repository and puts the one with a problem first', async () => {
    stubSources([
      sourceItem('succeeded', { id: 'a1', path: 'good' }),
      sourceItem('failed', { id: 'a2', path: 'broken' }),
      sourceItem('succeeded', {
        id: 'b1',
        owner: 'zeta',
        repository: 'tools',
        path: '',
        plugin: { id: PLUGIN_UUID, name: 'zeta', displayName: 'Zeta', status: 'suspended' },
      }),
    ]);
    await renderApp('/discover?tab=repositories');
    const user = userEvent.setup();
    const acme = await screen.findByRole('region', { name: 'acme/plugins' });
    const zeta = screen.getByRole('region', { name: 'zeta/tools' });
    expect(acme.compareDocumentPosition(zeta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Repositories start collapsed: the summary shows, the folders do not.
    expect(acme).toHaveTextContent('1 needs attention');
    expect(within(acme).queryByText('Ref not found.')).not.toBeInTheDocument();
    expect(within(acme).getByRole('button', { name: 'Expand acme/plugins' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await user.click(screen.getByRole('button', { name: 'Expand all' }));
    expect(within(acme).getByText('Sync failed')).toBeInTheDocument();
    expect(within(acme).getByText('Ref not found.')).toBeInTheDocument();
    expect(acme).toHaveTextContent('1 needs attention');
    expect(within(zeta).getByText('Suspended')).toBeInTheDocument();
    expect(within(zeta).getByText('Healthy')).toBeInTheDocument();
    expect(within(zeta).getByText('repository root')).toBeInTheDocument();
  });

  it('edits a source with its repository, branch and folder filled in', async () => {
    const calls = stubApi((method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/plugin-sources') && method === 'GET') {
        return { status: 200, body: { items: [sourceItem('succeeded')] } };
      }
      if (method === 'PUT' && path.endsWith(`/plugin-sources/${SOURCE_ID}`)) {
        return { status: 200, body: sourceItem('queued') };
      }
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover?tab=repositories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Expand acme/plugins' }));
    await user.click(screen.getByRole('button', { name: 'Edit Alpha source' }));
    const form = screen.getByRole('form', { name: 'Edit source' });
    expect(within(form).getByLabelText('Repository')).toHaveValue('acme/plugins');
    expect(within(form).getByLabelText('Branch or tag')).toHaveValue('main');
    expect(within(form).getByLabelText('Folder in the repository')).toHaveValue('alpha');

    await user.clear(within(form).getByLabelText('Folder in the repository'));
    await user.type(within(form).getByLabelText('Folder in the repository'), 'beta');
    await user.click(within(form).getByRole('button', { name: 'Save and sync' }));
    await waitFor(() =>
      expect(calls.find((call) => call.method === 'PUT')?.body).toEqual({
        owner: 'acme',
        repository: 'plugins',
        ref: 'main',
        path: 'beta',
      }),
    );
    await waitFor(() => expect(screen.queryByRole('form', { name: 'Edit source' })).toBeNull());
  });

  it('filters to what needs attention and says when everything is healthy', async () => {
    stubSources([sourceItem('succeeded')]);
    await renderApp('/discover?tab=repositories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /Needs attention \(0\)/ }));
    expect(screen.getByText('Everything is healthy.')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'acme/plugins' })).not.toBeInTheDocument();
  });

  it('syncs one folder again, or every idle folder of a repository', async () => {
    const calls = stubSources([
      sourceItem('failed', { id: 'a1', path: 'one' }),
      sourceItem('succeeded', { id: 'a2', path: 'two' }),
      sourceItem('queued', { id: 'a3', path: 'three' }),
    ]);
    await renderApp('/discover?tab=repositories');
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: 'Expand acme/plugins' }));
    await user.click(await screen.findByRole('button', { name: 'Sync one again' }));
    await waitFor(() =>
      expect(calls.find((call) => call.path.endsWith('/bulk-sync'))?.body).toEqual({ ids: ['a1'] }),
    );
    expect(screen.getByRole('button', { name: 'Sync three again' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Sync all' }));
    await waitFor(() =>
      expect(calls.filter((call) => call.path.endsWith('/bulk-sync')).at(-1)?.body).toEqual({
        ids: ['a1', 'a2'],
      }),
    );
  });

  it('is empty before any repository is added', async () => {
    stubSources([]);
    await renderApp('/discover?tab=repositories');
    expect(await screen.findByText('No repositories added yet')).toBeInTheDocument();
  });

  it('explains a marketplace list instead of calling it a problem', async () => {
    stubSources([
      sourceItem('succeeded', {
        path: '',
        plugin: null,
        lastNote: 'Found 3 plugins and added a source for each.',
      }),
    ]);
    await renderApp('/discover?tab=repositories');
    await userEvent.setup().click(await screen.findByRole('button', { name: 'Expand all' }));
    expect(await screen.findByText('Lists plugins')).toBeInTheDocument();
    expect(screen.getByText('Found 3 plugins and added a source for each.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Needs attention \(0\)/ })).toBeInTheDocument();
  });

  it('shows the error when the repositories cannot be loaded', async () => {
    stubApi((_method, path) => {
      if (path.endsWith('/session')) return SESSION;
      if (path.endsWith('/plugin-sources')) return ERROR('internal', 500);
      return { status: 200, body: { items: [] } };
    });
    await renderApp('/discover?tab=repositories');
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
