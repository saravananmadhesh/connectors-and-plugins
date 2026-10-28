import { describe, expect, it } from 'vitest';
import { validateMarketplaceSearch } from './marketplace-search';

describe('validateMarketplaceSearch', () => {
  it('keeps known filters', () => {
    expect(
      validateMarketplaceSearch({
        q: 'review',
        categories: ['tools', 'data'],
        sort: 'name',
        page: 3,
      }),
    ).toEqual({ q: 'review', categories: ['tools', 'data'], sort: 'name', page: 3 });
  });

  it('reads categories given as one comma separated value and drops repeats', () => {
    expect(validateMarketplaceSearch({ categories: 'tools,data,tools' }).categories).toEqual([
      'tools',
      'data',
    ]);
  });

  it('keeps the defaults out of the address', () => {
    expect(validateMarketplaceSearch({ sort: 'recent', page: 1 })).toEqual({
      q: undefined,
      categories: undefined,
      sort: undefined,
      page: undefined,
    });
  });

  it('drops empty, unknown and mistyped values', () => {
    expect(
      validateMarketplaceSearch({ q: '', categories: [3, ''], sort: 'popular', page: 'x' }),
    ).toEqual({ q: undefined, categories: undefined, sort: undefined, page: undefined });
    expect(validateMarketplaceSearch({ page: 2.5 }).page).toBeUndefined();
    expect(validateMarketplaceSearch({ page: -4 }).page).toBeUndefined();
  });
});
