import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Id } from '@boldcreate-integrations/contracts';
import type { MeResponse } from '@/lib/api';
import { readActiveOrg } from '@/lib/active-org';
import { RECENT_SCOPES_STORAGE_KEY } from '@/lib/recent-scopes';
import { renderWithRouter } from '@/test/render-with-router';
import { ScopeSwitcher } from './ScopeSwitcher';

const membership = (id: string, name: string): MeResponse['memberships'][number] => ({
  organizationId: id as Id<'org'>,
  organizationName: name,
  organizationSlug: name.toLowerCase().replace(/\s+/g, '-'),
  role: 'ADMIN',
  status: 'active',
});

const orgsOf = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    membership(`o${i + 1}`, i === 0 ? 'Acme' : `Org ${i + 1}`),
  );

interface Options {
  orgs?: number;
  path?: string;
  /** The route the switcher itself sits on. */
  main?: string;
}

const EXTRA = [
  { path: '/orgs/$orgId', component: () => <div>org page</div> },
  { path: '/orgs/$orgId/members', component: () => <div>org members</div> },
];

function open(options: Options = {}) {
  const { orgs = 2 } = options;
  function Harness() {
    const [palette, setPalette] = useState(false);
    return (
      <ScopeSwitcher
        memberships={orgsOf(orgs)}
        orgId="o1"
        paletteOpen={palette}
        onPaletteOpenChange={setPalette}
      />
    );
  }
  const main = options.main ?? '/orgs/$orgId/members';
  return renderWithRouter(Harness, main, {
    extraRoutes: EXTRA.filter((route) => route.path !== main),
    url: options.path ?? '/orgs/o1/members',
  });
}

const trigger = () => screen.getByRole('button', { name: 'Switch organization' });

async function openMenu() {
  await userEvent.click(trigger());
  return screen.findByRole('menu');
}

beforeEach(() => window.localStorage.clear());

describe('ScopeSwitcher trigger', () => {
  it('names the organization', async () => {
    await open();
    expect(trigger()).toHaveTextContent('Acme');
  });

  it('explains the shortcut in a tooltip and to assistive technology', async () => {
    await open();
    expect(trigger()).toHaveAttribute('aria-keyshortcuts', 'Control+K Meta+K');
    expect(trigger()).toHaveAccessibleDescription(/switch organization \(.*K\)/i);
  });

  it('renders nothing when the active organization is not among the memberships', async () => {
    function Lost() {
      return (
        <ScopeSwitcher
          memberships={orgsOf(1)}
          orgId="zzz"
          paletteOpen={false}
          onPaletteOpenChange={() => {}}
        />
      );
    }
    await renderWithRouter(Lost, '/x');
    expect(screen.queryByRole('button', { name: /switch organization/i })).not.toBeInTheDocument();
  });
});

describe('ScopeSwitcher menu', () => {
  it('lists every organization, with no overflow hint', async () => {
    await open({ orgs: 3 });
    const menu = await openMenu();
    for (const name of ['Acme', 'Org 2', 'Org 3']) {
      expect(within(menu).getByRole('menuitem', { name: new RegExp(name) })).toBeInTheDocument();
    }
    expect(within(menu).queryByText(/more organizations/i)).not.toBeInTheDocument();
  });

  it('marks the current organization', async () => {
    await open();
    const menu = await openMenu();
    const current = within(menu).getAllByLabelText('Current organization');
    expect(current).toHaveLength(1);
    expect(current[0]!.closest('[role="menuitem"]')).toHaveTextContent('Acme');
  });

  it('offers no team entries', async () => {
    await open();
    const menu = await openMenu();
    expect(within(menu).queryByRole('menuitem', { name: /team/i })).not.toBeInTheDocument();
  });

  it('opens the dialog for a new organization', async () => {
    await open();
    await openMenu();
    await userEvent.click(screen.getByRole('menuitem', { name: /new organization/i }));
    expect(await screen.findByRole('dialog', { name: /new organization/i })).toBeInTheDocument();
  });

  it('says how many organizations are not listed', async () => {
    await open({ orgs: 12 });
    const menu = await openMenu();
    expect(
      within(menu).getByText('7 more organizations. Search to find them.'),
    ).toBeInTheDocument();
  });

  it('puts recent organizations first', async () => {
    window.localStorage.setItem(RECENT_SCOPES_STORAGE_KEY, JSON.stringify({ orgs: ['o11', 'o9'] }));
    await open({ orgs: 12 });
    const menu = await openMenu();
    const names = within(menu)
      .getAllByRole('menuitem', { name: /^(Acme|Org \d+)/ })
      .map((item) => item.textContent);
    expect(names.slice(0, 3)).toEqual(['Acme', 'Org 11', 'Org 9']);
  });
});

describe('ScopeSwitcher choosing', () => {
  it('goes to another organization, remembers it and keeps the members page', async () => {
    const { router } = await open();
    await openMenu();
    await userEvent.click(screen.getByRole('menuitem', { name: /Org 2/ }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/orgs/o2/members'));
    expect(readActiveOrg()).toEqual({ orgId: 'o2' });
    expect(window.localStorage.getItem(RECENT_SCOPES_STORAGE_KEY)).toContain('o2');
  });

  it('lands on the overview from a page that has no counterpart', async () => {
    const { router } = await open({ path: '/orgs/o1', main: '/orgs/$orgId' });
    await openMenu();
    await userEvent.click(screen.getByRole('menuitem', { name: /Org 2/ }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/orgs/o2'));
  });
});

describe('ScopeSwitcher search', () => {
  async function openSearch(options: Options = {}) {
    const view = await open(options);
    await openMenu();
    await userEvent.click(screen.getByRole('menuitem', { name: /search organizations/i }));
    const dialog = await screen.findByRole('dialog', { name: 'Switch organization' });
    return { ...view, dialog, box: within(dialog).getByRole('combobox') };
  }

  it('opens from the menu with the cursor in the search box', async () => {
    const { box } = await openSearch({ orgs: 12 });
    expect(box).toHaveFocus();
    expect(screen.getByRole('listbox', { name: 'Results' })).toBeInTheDocument();
  });

  it('lists the organizations as one group, with the current one selected', async () => {
    const { dialog } = await openSearch({ orgs: 2 });
    expect(within(dialog).getByRole('group', { name: 'Organizations' })).toBeInTheDocument();
    expect(within(dialog).queryByRole('group', { name: /teams/i })).not.toBeInTheDocument();
    expect(within(dialog).getByRole('option', { name: /Acme/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('narrows as the user types and says when nothing matches', async () => {
    const { dialog, box } = await openSearch({ orgs: 40 });
    await userEvent.type(box, 'Org 3');
    const options = within(dialog).getAllByRole('option');
    expect(options.map((option) => option.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining('Org 3')]),
    );
    expect(within(dialog).queryByRole('option', { name: /Org 4/ })).not.toBeInTheDocument();
    await userEvent.clear(box);
    await userEvent.type(box, 'zzzz');
    expect(within(dialog).queryAllByRole('option')).toHaveLength(0);
    expect(within(dialog).getByRole('status')).toHaveTextContent('Nothing matches “zzzz”.');
  });

  it('caps a group and says how many more there are', async () => {
    const { dialog } = await openSearch({ orgs: 80 });
    expect(
      within(dialog).getByText('50 more. Keep typing to narrow the list.'),
    ).toBeInTheDocument();
  });

  it('moves with the arrow keys, wraps around and goes with Enter', async () => {
    const { box, router } = await openSearch({ orgs: 3 });
    await userEvent.keyboard('{ArrowDown}');
    expect(box).toHaveAttribute('aria-activedescendant', expect.stringContaining('option-1'));
    expect(screen.getByRole('option', { name: /Org 2/ })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    expect(screen.getByRole('option', { name: /Org 3/, selected: true })).toBeInTheDocument();
    await userEvent.keyboard('{Home}{End}{Home}{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(router.state.location.pathname).toBe('/orgs/o2/members'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('goes to the clicked result', async () => {
    const { router } = await openSearch({ orgs: 3 });
    await userEvent.click(screen.getByRole('option', { name: /Org 3/ }));
    await waitFor(() => expect(router.state.location.pathname).toBe('/orgs/o3/members'));
  });

  it('follows the pointer and ignores Enter when nothing matches', async () => {
    const { box } = await openSearch({ orgs: 3 });
    await userEvent.hover(screen.getByRole('option', { name: /Org 2/ }));
    expect(screen.getByRole('option', { name: /Org 2/ })).toHaveAttribute('aria-selected', 'true');
    await userEvent.type(box, 'zzzz{Enter}{ArrowDown}{End}');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(box).not.toHaveAttribute('aria-activedescendant');
  });

  it('marks the current organization and closes with Escape', async () => {
    const { dialog } = await openSearch();
    expect(within(dialog).getByRole('option', { name: /Acme/ })).toHaveTextContent('Current');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('starts fresh each time it opens', async () => {
    const { box } = await openSearch({ orgs: 3 });
    await userEvent.type(box, 'Org 2');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await userEvent.click(trigger());
    await userEvent.click(await screen.findByRole('menuitem', { name: /search organizations/i }));
    expect(await screen.findByRole('combobox')).toHaveValue('');
  });
});

describe('ScopeSwitcher search opened from outside', () => {
  it('lists the organizations', async () => {
    function Odd() {
      return (
        <ScopeSwitcher
          memberships={orgsOf(2)}
          orgId="o1"
          paletteOpen
          onPaletteOpenChange={vi.fn()}
        />
      );
    }
    await renderWithRouter(Odd, '/x');
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('group', { name: 'Organizations' })).toBeInTheDocument();
  });
});
