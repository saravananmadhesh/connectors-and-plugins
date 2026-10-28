import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Crumb } from '@/lib/scope';
import { renderWithRouter } from '@/test/render-with-router';
import { Breadcrumbs } from './Breadcrumbs';

const render = (trail: Crumb[]) => renderWithRouter(() => <Breadcrumbs trail={trail} />, '/x');

describe('Breadcrumbs', () => {
  it('links every step above the page and marks the page itself', async () => {
    await render([
      { label: 'Acme', to: '/orgs/o1' },
      { label: 'Projects', to: '/orgs/o1/projects' },
      { label: 'Platform' },
    ]);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(within(nav).getByRole('link', { name: 'Acme' })).toHaveAttribute('href', '/orgs/o1');
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/orgs/o1/projects',
    );
    expect(within(nav).queryByRole('link', { name: 'Platform' })).not.toBeInTheDocument();
    expect(within(nav).getByText('Platform')).toHaveAttribute('aria-current', 'page');
  });

  it('shows a step without an address as plain text', async () => {
    await render([{ label: 'Reports' }, { label: 'Marketplace' }]);
    expect(screen.getByText('Reports').closest('a')).toBeNull();
    expect(screen.getByText('Marketplace')).toHaveAttribute('aria-current', 'page');
  });

  it('shows plain text for a middle step that has no address', async () => {
    await render([
      { label: 'Reports' },
      { label: 'Installed', to: '/installed' },
      { label: 'Here' },
    ]);
    expect(screen.getByText('Reports').closest('a')).toBeNull();
    expect(screen.getByRole('link', { name: 'Installed' })).toBeInTheDocument();
  });

  it('shows nothing for an empty trail', async () => {
    await render([]);
    expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).not.toBeInTheDocument();
  });
});
