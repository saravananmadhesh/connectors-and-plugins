import { describe, expect, it } from 'vitest';
import { buildTrail, scopeDestination, trailTitle } from './scope';

describe('buildTrail', () => {
  const names = { org: 'Acme' };

  it('starts the overview at the organization, which links back to it', () => {
    expect(buildTrail('/orgs/o1', names)).toEqual([
      { label: 'Acme', to: '/orgs/o1' },
      { label: 'Overview' },
    ]);
  });

  it('covers the projects list and a project, with its name once known', () => {
    expect(buildTrail('/orgs/o1/projects', names).map((c) => c.label)).toEqual([
      'Acme',
      'Projects',
    ]);
    expect(buildTrail('/orgs/o1/projects/p1', names).map((c) => c.label)).toEqual([
      'Acme',
      'Projects',
      'Project',
    ]);
    expect(buildTrail('/orgs/o1/projects/p1', { ...names, project: 'Storefront' })).toEqual([
      { label: 'Acme', to: '/orgs/o1' },
      { label: 'Projects', to: '/orgs/o1/projects' },
      { label: 'Storefront' },
    ]);
    expect(buildTrail('/orgs/o1/projects/p1/users', { ...names, project: 'Storefront' })).toEqual([
      { label: 'Acme', to: '/orgs/o1' },
      { label: 'Projects', to: '/orgs/o1/projects' },
      { label: 'Storefront', to: '/orgs/o1/projects/p1' },
      { label: 'Users' },
    ]);
    expect(buildTrail('/orgs/o1/projects/p1/nope', names)).toEqual([]);
    expect(buildTrail('/orgs/o1/projects/p1/extra/more', names)).toEqual([]);
  });

  it('covers the organization pages', () => {
    expect(buildTrail('/orgs/o1/members', names)).toEqual([
      { label: 'Acme', to: '/orgs/o1' },
      { label: 'Members' },
    ]);
    expect(buildTrail('/orgs/o1/settings', names).map((c) => c.label)).toEqual([
      'Acme',
      'Settings',
    ]);
    expect(buildTrail('/orgs/o1/teams', names)).toEqual([]);
  });

  describe('the plugin pages of an organization', () => {
    it('start at the organization, which links to its overview', () => {
      expect(buildTrail('/orgs/o1/marketplace', names)).toEqual([
        { label: 'Acme', to: '/orgs/o1' },
        { label: 'Marketplace' },
      ]);
      expect(buildTrail('/orgs/o1/installed', names).map((c) => c.label)).toEqual([
        'Acme',
        'Installed',
      ]);
      expect(buildTrail('/orgs/o1/get-started', names).map((c) => c.label)).toEqual([
        'Acme',
        'Get started',
      ]);
      expect(buildTrail('/orgs/o1/api-keys', names).map((c) => c.label)).toEqual([
        'Acme',
        'API keys',
      ]);
    });

    it('put the plugin under the marketplace of the same organization', () => {
      expect(buildTrail('/orgs/o1/marketplace/p1', names)).toEqual([
        { label: 'Acme', to: '/orgs/o1' },
        { label: 'Marketplace', to: '/orgs/o1/marketplace' },
        { label: 'Plugin' },
      ]);
    });

    it('name the organization plainly while it loads', () => {
      expect(buildTrail('/orgs/o1/installed')[0]).toEqual({
        label: 'Organization',
        to: '/orgs/o1',
      });
    });

    it('know nothing of the short addresses from before the organization was in them', () => {
      expect(buildTrail('/marketplace')).toEqual([]);
      expect(buildTrail('/orgs/o1/marketplace/p1/extra')).toEqual([]);
    });
  });

  it('puts personal pages under a group name that is not a link', () => {
    expect(buildTrail('/profile', { org: 'Acme', orgId: 'o1' })).toEqual([
      { label: 'Personal' },
      { label: 'Profile' },
    ]);
    expect(buildTrail('/profile')).toEqual([{ label: 'Personal' }, { label: 'Profile' }]);
  });

  it('gives no trail for an address it does not know', () => {
    for (const path of [
      '/nowhere',
      '/',
      '/marketplace/p1/extra',
      '/installed',
      '/orgs',
      '/orgs/o1/extra',
      '/orgs/o1/members/extra',
      '/orgs/o1/settings/extra',
      '/orgs/o1/teams',
      '/orgs/o1/teams/t1',
    ]) {
      expect(buildTrail(path)).toEqual([]);
    }
  });

  it('ignores a trailing slash', () => {
    expect(buildTrail('/orgs/o1/').map((c) => c.label)).toEqual(['Organization', 'Overview']);
  });
});

describe('trailTitle', () => {
  it('puts the page first and the product last', () => {
    expect(
      trailTitle([{ label: 'Acme', to: '/orgs/o1' }, { label: 'Members' }], 'BoldConnect'),
    ).toBe('Members · Acme · BoldConnect');
  });

  it('is the product alone for an empty trail', () => {
    expect(trailTitle([], 'BoldConnect')).toBe('BoldConnect');
  });
});

describe('scopeDestination', () => {
  it('stays on the same section of the new organization', () => {
    expect(scopeDestination('/orgs/o1/marketplace', { orgId: 'o2' })).toBe('/orgs/o2/marketplace');
    expect(scopeDestination('/orgs/o1/installed', { orgId: 'o2' })).toBe('/orgs/o2/installed');
    expect(scopeDestination('/orgs/o1/settings', { orgId: 'o2' })).toBe('/orgs/o2/settings');
    expect(scopeDestination('/orgs/o1/members/', { orgId: 'o2' })).toBe('/orgs/o2/members');
    expect(scopeDestination('/orgs/o1/projects', { orgId: 'o2' })).toBe('/orgs/o2/projects');
  });

  it('goes to the list when the page is one thing of the old organization', () => {
    expect(scopeDestination('/orgs/o1/projects/p1', { orgId: 'o2' })).toBe('/orgs/o2/projects');
    expect(scopeDestination('/orgs/o1/marketplace/p1', { orgId: 'o2' })).toBe(
      '/orgs/o2/marketplace',
    );
  });

  it('goes to the overview from a page that is not in an organization', () => {
    expect(scopeDestination('/orgs/o1', { orgId: 'o2' })).toBe('/orgs/o2');
    expect(scopeDestination('/profile', { orgId: 'o2' })).toBe('/orgs/o2');
  });
});
