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

  describe('pages of the active organization', () => {
    const inOrg = { org: 'Acme', orgId: 'o1' };

    it('start at the organization, which links to its overview', () => {
      expect(buildTrail('/marketplace', inOrg)).toEqual([
        { label: 'Acme', to: '/orgs/o1' },
        { label: 'Marketplace' },
      ]);
      expect(buildTrail('/installed', inOrg).map((c) => c.label)).toEqual(['Acme', 'Installed']);
      expect(buildTrail('/get-started', inOrg).map((c) => c.label)).toEqual([
        'Acme',
        'Get started',
      ]);
      expect(buildTrail('/api-keys', inOrg).map((c) => c.label)).toEqual(['Acme', 'API keys']);
    });

    it('put the plugin under the marketplace', () => {
      expect(buildTrail('/marketplace/p1', inOrg)).toEqual([
        { label: 'Acme', to: '/orgs/o1' },
        { label: 'Marketplace', to: '/marketplace' },
        { label: 'Plugin' },
      ]);
    });

    it('name the organization plainly while it loads', () => {
      expect(buildTrail('/installed', { orgId: 'o1' })[0]).toEqual({
        label: 'Organization',
        to: '/orgs/o1',
      });
    });

    it('have only the page when there is no organization', () => {
      expect(buildTrail('/marketplace')).toEqual([{ label: 'Marketplace' }]);
      expect(buildTrail('/marketplace/p1')).toEqual([
        { label: 'Marketplace', to: '/marketplace' },
        { label: 'Plugin' },
      ]);
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
      trailTitle([{ label: 'Acme', to: '/orgs/o1' }, { label: 'Members' }], 'BoldCreate'),
    ).toBe('Members · Acme · BoldCreate');
  });

  it('is the product alone for an empty trail', () => {
    expect(trailTitle([], 'BoldCreate')).toBe('BoldCreate');
  });
});

describe('scopeDestination', () => {
  it('goes to the overview of the new organization', () => {
    expect(scopeDestination('/marketplace', { orgId: 'o2' })).toBe('/orgs/o2');
    expect(scopeDestination('/orgs/o1/settings', { orgId: 'o1' })).toBe('/orgs/o1');
  });

  it('keeps the members page', () => {
    expect(scopeDestination('/orgs/o1/members', { orgId: 'o2' })).toBe('/orgs/o2/members');
    expect(scopeDestination('/orgs/o1/members/', { orgId: 'o2' })).toBe('/orgs/o2/members');
  });
});
