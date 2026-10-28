export const RECENT_SCOPES_STORAGE_KEY = 'web-recent-scopes';

/** How many recent choices are kept for each list. */
export const RECENT_LIMIT = 8;

export interface RecentScopes {
  orgs: string[];
}

const EMPTY: RecentScopes = { orgs: [] };

function ids(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === 'string')
    : [];
}

/** The organizations the user switched to lately; ids only, nothing secret. */
export function readRecentScopes(): RecentScopes {
  try {
    const raw = window.localStorage.getItem(RECENT_SCOPES_STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as { orgs?: unknown };
    return { orgs: ids(parsed.orgs) };
  } catch {
    return EMPTY;
  }
}

/** `id` first, the rest after it in order, each id once, at most `limit` long. */
export function pushRecent(list: readonly string[], id: string, limit = RECENT_LIMIT): string[] {
  return [id, ...list.filter((entry) => entry !== id)].slice(0, limit);
}

/** Records a switch to an organization. */
export function rememberScope(orgId: string): RecentScopes {
  const next: RecentScopes = { orgs: pushRecent(readRecentScopes().orgs, orgId) };
  try {
    window.localStorage.setItem(RECENT_SCOPES_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked; recents then last until the page closes.
  }
  return next;
}

export interface Ranked<T> {
  shown: T[];
  /** How many entries did not fit. */
  hidden: number;
}

/**
 * The entries a short list shows: the current one first, then the recent ones in recent order,
 * then the rest as given, cut to `cap`. A short list therefore shows everything; a long one
 * sees what it uses.
 */
export function rankByRecent<T extends { id: string }>(
  items: readonly T[],
  recent: readonly string[],
  currentId: string | undefined,
  cap: number,
): Ranked<T> {
  const byId = new Map(items.map((item) => [item.id, item]));
  const first = [currentId, ...recent].filter(
    (id, index, all): id is string => id !== undefined && all.indexOf(id) === index && byId.has(id),
  );
  const head = first.map((id) => byId.get(id)!);
  const tail = items.filter((item) => !first.includes(item.id));
  const all = [...head, ...tail];
  return { shown: all.slice(0, cap), hidden: Math.max(0, all.length - cap) };
}
