import { beforeEach, describe, expect, it } from 'vitest';
import {
  RECENT_LIMIT,
  RECENT_SCOPES_STORAGE_KEY,
  pushRecent,
  rankByRecent,
  readRecentScopes,
  rememberScope,
} from './recent-scopes';

beforeEach(() => window.localStorage.clear());

describe('pushRecent', () => {
  it('puts the id first and lists it once', () => {
    expect(pushRecent(['a', 'b', 'c'], 'b')).toEqual(['b', 'a', 'c']);
  });

  it('keeps at most the limit', () => {
    const many = Array.from({ length: RECENT_LIMIT + 3 }, (_, i) => `x${i}`);
    expect(pushRecent(many, 'new')).toHaveLength(RECENT_LIMIT);
    expect(pushRecent(many, 'new')[0]).toBe('new');
  });
});

describe('readRecentScopes', () => {
  it('is empty before anything is saved', () => {
    expect(readRecentScopes()).toEqual({ orgs: [] });
  });

  it('is empty when the saved value is damaged', () => {
    window.localStorage.setItem(RECENT_SCOPES_STORAGE_KEY, '{not json');
    expect(readRecentScopes()).toEqual({ orgs: [] });
  });

  it('drops entries that are not ids', () => {
    window.localStorage.setItem(
      RECENT_SCOPES_STORAGE_KEY,
      JSON.stringify({ orgs: ['o1', 5, null] }),
    );
    expect(readRecentScopes()).toEqual({ orgs: ['o1'] });
  });

  it('ignores a saved value of the wrong shape', () => {
    window.localStorage.setItem(RECENT_SCOPES_STORAGE_KEY, JSON.stringify({ orgs: 'x' }));
    expect(readRecentScopes()).toEqual({ orgs: [] });
  });
});

describe('rememberScope', () => {
  it('remembers organizations, newest first', () => {
    rememberScope('o1');
    const next = rememberScope('o2');
    expect(next).toEqual({ orgs: ['o2', 'o1'] });
    expect(readRecentScopes()).toEqual(next);
  });

  it('keeps working when storage is blocked', () => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('blocked');
    };
    try {
      expect(rememberScope('o1').orgs).toEqual(['o1']);
    } finally {
      Storage.prototype.setItem = original;
    }
  });
});

describe('rankByRecent', () => {
  const items = ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => ({ id }));

  it('shows a small list whole and in order', () => {
    expect(rankByRecent(items.slice(0, 3), [], undefined, 5)).toEqual({
      shown: items.slice(0, 3),
      hidden: 0,
    });
  });

  it('puts the current entry first, then recent ones, then the rest', () => {
    const { shown, hidden } = rankByRecent(items, ['d', 'b'], 'e', 4);
    expect(shown.map((item) => item.id)).toEqual(['e', 'd', 'b', 'a']);
    expect(hidden).toBe(2);
  });

  it('skips recent ids that no longer exist and does not repeat the current one', () => {
    const { shown } = rankByRecent(items, ['gone', 'c', 'c'], 'c', 3);
    expect(shown.map((item) => item.id)).toEqual(['c', 'a', 'b']);
  });

  it('ignores a current id that is not in the list', () => {
    expect(rankByRecent(items, [], 'zzz', 2).shown.map((item) => item.id)).toEqual(['a', 'b']);
  });
});
