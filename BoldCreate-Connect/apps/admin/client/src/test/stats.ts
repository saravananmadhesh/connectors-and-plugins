import type { AdminStatsResponse } from '../lib/api';

/** Statistics of an empty catalog, for tests that only render the home page on the way. */
export const EMPTY_STATS: AdminStatsResponse = {
  periodDays: 30,
  generatedAt: '2026-10-11T00:00:00.000Z',
  totals: {
    plugins: 0,
    versions: 0,
    sources: 0,
    categories: 0,
    installations: 0,
    organizations: 0,
    users: 0,
  },
  pluginsByStatus: { active: 0, deprecated: 0, suspended: 0 },
  versionsByStatus: { pending: 0, approved: 0, published: 0, rejected: 0, yanked: 0 },
  needsReview: 0,
  sourcesByStatus: { succeeded: 0, failed: 0, queued: 0, running: 0, neverSynced: 0 },
  timeline: [],
  categories: [],
  topPlugins: [],
  components: {
    total: 0,
    byKind: { skill: 0, agent: 0, mcp: 0, hook: 0, rule: 0 },
    pluginsByKind: { skill: 0, agent: 0, mcp: 0, hook: 0, rule: 0 },
  },
};
