import { beforeEach, describe, expect, it } from 'vitest';
import {
  AREA_STORAGE_KEY,
  areaDestination,
  availableAreas,
  inProject,
  pathArea,
  readArea,
  resolveArea,
  saveArea,
} from './area';

beforeEach(() => window.localStorage.clear());

describe('pathArea', () => {
  it.each([
    '/orgs/o1/get-started',
    '/orgs/o1/marketplace',
    '/orgs/o1/marketplace/p1',
    '/orgs/o1/installed',
    '/orgs/o1/api-keys/',
  ])('%s belongs to For You', (path) => {
    expect(pathArea(path)).toBe('for-you');
  });

  it.each(['/orgs/o1/projects/p1', '/orgs/o1/projects/p1/'])('%s belongs to Platform', (path) => {
    expect(pathArea(path)).toBe('platform');
  });

  it.each([
    '/',
    '/profile',
    '/orgs/o1',
    '/orgs/o1/members',
    '/orgs/o1/settings',
    '/orgs/o1/projects',
  ])('%s is shared by both areas', (path) => {
    expect(pathArea(path)).toBeUndefined();
  });
});

describe('availableAreas', () => {
  it('offers both to a person who may use For You', () => {
    expect(availableAreas(true)).toEqual(['for-you', 'platform']);
  });

  it('offers only Platform to a viewer', () => {
    expect(availableAreas(false)).toEqual(['platform']);
  });
});

describe('resolveArea', () => {
  const both = availableAreas(true);

  it('lets the page decide when it has an area', () => {
    expect(resolveArea('/orgs/o1/installed', 'platform', both)).toBe('for-you');
    expect(resolveArea('/orgs/o1/projects/p1', 'for-you', both)).toBe('platform');
  });

  it('keeps the last area on shared pages', () => {
    expect(resolveArea('/orgs/o1/members', 'platform', both)).toBe('platform');
    expect(resolveArea('/profile', 'for-you', both)).toBe('for-you');
  });

  it('starts on the first area when nothing was chosen', () => {
    expect(resolveArea('/profile', undefined, both)).toBe('for-you');
  });

  it('never returns an area that is not on offer', () => {
    const viewer = availableAreas(false);
    expect(resolveArea('/orgs/o1/installed', 'for-you', viewer)).toBe('platform');
    expect(resolveArea('/profile', 'for-you', viewer)).toBe('platform');
  });
});

describe('saved area', () => {
  it('reads back what was saved', () => {
    saveArea('platform');
    expect(readArea()).toBe('platform');
  });

  it('ignores anything else', () => {
    window.localStorage.setItem(AREA_STORAGE_KEY, 'galaxy');
    expect(readArea()).toBeUndefined();
  });

  it('survives blocked storage', () => {
    const get = Storage.prototype.getItem;
    const set = Storage.prototype.setItem;
    Storage.prototype.getItem = () => {
      throw new Error('blocked');
    };
    Storage.prototype.setItem = () => {
      throw new Error('blocked');
    };
    try {
      expect(readArea()).toBeUndefined();
      expect(() => saveArea('for-you')).not.toThrow();
    } finally {
      Storage.prototype.getItem = get;
      Storage.prototype.setItem = set;
    }
  });
});

describe('inProject', () => {
  it('is true on a project page and its sections, false elsewhere', () => {
    expect(inProject('/orgs/o1/projects/p1')).toBe(true);
    expect(inProject('/orgs/o1/projects/p1/')).toBe(true);
    expect(inProject('/orgs/o1/projects')).toBe(false);
    expect(inProject('/orgs/o1/members')).toBe(false);
  });
});

describe('areaDestination', () => {
  it('lands on the first page of the area', () => {
    expect(areaDestination('/orgs/o1/installed', 'platform', 'o1')).toBe('/orgs/o1/projects');
    expect(areaDestination('/orgs/o1/projects/p1', 'for-you', 'o1')).toBe('/orgs/o1/marketplace');
  });

  it('stays on a page that already belongs to the area', () => {
    expect(areaDestination('/orgs/o1/projects/p1/', 'platform', 'o1')).toBe('/orgs/o1/projects/p1');
  });

  it('leaves a shared organization page for the default of the area', () => {
    expect(areaDestination('/orgs/o1/members', 'for-you', 'o1')).toBe('/orgs/o1/marketplace');
    expect(areaDestination('/orgs/o1/members', 'platform', 'o1')).toBe('/orgs/o1/projects');
  });

  it('sends someone in no organization to the home address', () => {
    expect(areaDestination('/profile', 'platform', undefined)).toBe('/orgs');
  });
});
