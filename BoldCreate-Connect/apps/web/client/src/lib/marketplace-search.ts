import type { PluginSort } from './api';

/** The marketplace filters that live in the address; `categories` are slugs. */
export interface MarketplaceSearch {
  q?: string | undefined;
  categories?: string[] | undefined;
  sort?: PluginSort | undefined;
  page?: number | undefined;
}

export const SORTS: readonly { value: PluginSort; label: string }[] = [
  { value: 'recent', label: 'Recently added' },
  { value: 'updated', label: 'Recently updated' },
  { value: 'name', label: 'Name A to Z' },
];

export const DEFAULT_SORT: PluginSort = 'recent';

/** Reads the filters from the address; anything unknown is dropped and the defaults stay out of it. */
export function validateMarketplaceSearch(search: Record<string, unknown>): MarketplaceSearch {
  const text = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
  const raw = Array.isArray(search.categories)
    ? search.categories
    : typeof search.categories === 'string'
      ? search.categories.split(',')
      : [];
  const categories = [
    ...new Set(raw.filter((slug): slug is string => typeof slug === 'string' && slug !== '')),
  ];
  const sort = SORTS.find((item) => item.value === search.sort)?.value;
  const page = Number(search.page);
  return {
    q: text(search.q),
    categories: categories.length > 0 ? categories : undefined,
    sort: sort && sort !== DEFAULT_SORT ? sort : undefined,
    page: Number.isInteger(page) && page > 1 ? page : undefined,
  };
}
