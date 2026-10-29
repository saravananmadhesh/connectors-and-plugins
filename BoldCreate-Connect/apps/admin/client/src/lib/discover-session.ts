import type { DiscoverPluginsResponse, InstallPluginsResponse } from './api';
import { DEFAULT_HIDE, type CandidateFilter, type HideOption } from './discover';

export interface DiscoverOptions {
  featured: boolean;
  verified: boolean;
  private: boolean;
}

/** What the Find plugins tab shows, kept while the admin visits other tabs and pages. */
export interface DiscoverSession {
  url: string;
  branch: string;
  options: DiscoverOptions;
  found: DiscoverPluginsResponse | null;
  /** Identifies one inspection, so the results restart only when a new one is made. */
  foundAt: number;
  /** Null until the results were touched, so a single plugin can start preselected. */
  selected: string[] | null;
  installed: InstallPluginsResponse | null;
  query: string;
  filter: CandidateFilter;
  hide: HideOption[];
}

const EMPTY: DiscoverSession = {
  url: '',
  branch: '',
  options: { featured: false, verified: false, private: false },
  found: null,
  foundAt: 0,
  selected: null,
  installed: null,
  query: '',
  filter: 'all',
  hide: [...DEFAULT_HIDE],
};

let session: DiscoverSession = EMPTY;

export const readDiscoverSession = (): DiscoverSession => session;

export function updateDiscoverSession(patch: Partial<DiscoverSession>): void {
  session = { ...session, ...patch };
}

export function clearDiscoverSession(): void {
  session = EMPTY;
}
