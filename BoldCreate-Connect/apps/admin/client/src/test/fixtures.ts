import type {
  AdminPluginDetailResponse,
  AdminPluginListResponse,
  AdminPluginSummary,
  AdminVersionDetailResponse,
  AdminVersionSummary,
} from '../lib/api';

export const PLUGIN_ID = '00000000-0000-4000-8000-0000000000a1';
export const NO_IMPACT = { installations: 0, organizations: 0, users: 0 };
export const SOME_IMPACT = { installations: 3, organizations: 2, users: 2 };

export const counts = (overrides: Partial<AdminPluginSummary['versionCounts']> = {}) => ({
  pending: 0,
  approved: 0,
  published: 0,
  rejected: 0,
  yanked: 0,
  ...overrides,
});

export const summary = (overrides: Partial<AdminPluginSummary> = {}): AdminPluginSummary => ({
  id: PLUGIN_ID,
  name: 'sample-plugin',
  displayName: 'Sample plugin',
  summary: 'Does sample things.',
  status: 'active',
  visibility: 'public',
  kinds: ['skill'],
  componentCounts: { skill: 1 },
  featured: false,
  verified: false,
  categories: [],
  source: {
    id: 's1',
    owner: 'acme',
    repository: 'plugins',
    ref: 'main',
    path: 'sample',
    lastStatus: 'succeeded',
    lastSyncedAt: '2026-10-11T00:00:00.000Z',
    lastError: null,
  },
  logoUrl: null,
  versionCounts: counts({ published: 1 }),
  publishedVersion: '1.0.0',
  installations: 0,
  updatedAt: '2026-10-11T00:00:00.000Z',
  ...overrides,
});

const ACTIONS: Record<AdminVersionSummary['status'], AdminVersionSummary['actions']> = {
  pending: ['approve', 'reject'],
  approved: ['reject', 'publish'],
  published: ['yank'],
  rejected: ['reopen'],
  yanked: [],
};

export const VERSION_ID = '00000000-0000-4000-8000-0000000000b1';

export const version = (overrides: Partial<AdminVersionSummary> = {}): AdminVersionSummary => {
  const status = overrides.status ?? 'published';
  return {
    id: VERSION_ID,
    version: '1.0.0',
    status,
    commitSha: 'a'.repeat(40),
    archiveSizeBytes: 2048,
    executionBlockedAt: null,
    ingestedAt: '2026-10-11T00:00:00.000Z',
    installations: 0,
    findings: 0,
    actions: ACTIONS[status],
    ...overrides,
  };
};

export const detail = (
  versions: AdminVersionSummary[],
  overrides: Partial<AdminPluginDetailResponse> = {},
): AdminPluginDetailResponse => ({
  ...summary(),
  description: 'A longer description.',
  keywords: [],
  metadataEdited: false,
  createdAt: '2026-10-11T00:00:00.000Z',
  versions,
  ...overrides,
});

export const scanned = (summaryOf: AdminVersionSummary): AdminVersionDetailResponse => ({
  ...summaryOf,
  pluginId: PLUGIN_ID,
  pluginName: 'sample-plugin',
  scan: {
    fileCount: 4,
    totalBytes: 900,
    components: [
      { kind: 'rule', name: 'style', description: 'Style rules', path: 'rules/style.md' },
      {
        kind: 'skill',
        name: 'review',
        description: 'Reviews a change',
        path: 'skills/review/SKILL.md',
      },
      { kind: 'skill', name: 'plan', description: '', path: 'skills/plan/SKILL.md' },
    ],
    hookCommands: [{ event: 'stop', command: 'echo done' }],
    mcpServers: [{ name: 'remote', transport: 'http', url: 'https://mcp.example.test' }],
    variables: [{ name: 'API_TOKEN', description: 'Token', required: true, secret: true }],
    skipped: [{ path: 'link', reason: 'Links are not copied.' }],
    findings: [{ path: 'notes.txt', kind: 'possible secret: GitHub token' }],
  },
});

/** A page of the plugin list; `total` defaults to the number of items. */
export const pageOf = (
  items: AdminPluginSummary[],
  overrides: Partial<AdminPluginListResponse> = {},
): AdminPluginListResponse => ({
  items,
  total: items.length,
  page: 1,
  pageSize: 25,
  ...overrides,
});
