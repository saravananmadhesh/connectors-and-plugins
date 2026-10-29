import { describe, expect, it } from 'vitest';
import type { DiscoveredPlugin, InstalledSource } from './api';
import {
  candidateState,
  canInstall,
  describeCounts,
  filterCandidates,
  githubFolderUrl,
  needsAttention,
  sourceHealth,
  usesStdio,
} from './discover';

const candidate = (overrides: Partial<DiscoveredPlugin> = {}): DiscoveredPlugin => ({
  path: 'a',
  name: 'a',
  displayName: 'A',
  logoUrl: null,
  version: '1.0.0',
  summary: null,
  categories: [],
  componentCounts: {},
  mcpTransports: [],
  problem: null,
  installed: null,
  ...overrides,
});

const installed = (overrides: Partial<NonNullable<DiscoveredPlugin['installed']>> = {}) => ({
  sourceId: '00000000-0000-4000-8000-000000000001',
  pluginId: '00000000-0000-4000-8000-0000000000a1',
  pluginStatus: 'active' as const,
  syncStatus: 'succeeded' as const,
  lastSyncedAt: null,
  lastError: null,
  ...overrides,
});

const source = (overrides: Partial<InstalledSource> = {}): InstalledSource => ({
  id: '00000000-0000-4000-8000-000000000001',
  owner: 'acme',
  repository: 'plugins',
  ref: 'main',
  path: 'a',
  lastCommitSha: null,
  lastSyncedAt: '2026-10-11T00:00:00.000Z',
  lastStatus: 'succeeded',
  lastError: null,
  lastNote: null,
  createdAt: '2026-10-10T00:00:00.000Z',
  plugin: { id: 'p1', name: 'a', displayName: 'A', status: 'active' },
  ...overrides,
});

describe('where a folder found in a repository stands', () => {
  it('is available, installed, installing, with problems or unusable', () => {
    expect(candidateState(candidate()).key).toBe('available');
    expect(candidateState(candidate({ installed: installed() })).key).toBe('installed');
    expect(candidateState(candidate({ installed: installed({ syncStatus: 'running' }) })).key).toBe(
      'syncing',
    );
    expect(
      candidateState(candidate({ installed: installed({ syncStatus: 'failed', lastError: 'x' }) })),
    ).toMatchObject({ key: 'problem', tone: 'destructive', reason: 'x' });
    expect(
      candidateState(candidate({ installed: installed({ syncStatus: 'failed' }) })).reason,
    ).toBe('The last sync failed.');
    expect(candidateState(candidate({ problem: 'No manifest.' }))).toMatchObject({
      key: 'blocked',
      reason: 'No manifest.',
    });
  });

  it('flags a source that produced no plugin, whether or not it ever synced', () => {
    const none = { pluginId: null, pluginStatus: null };
    expect(
      candidateState(candidate({ installed: installed({ ...none, syncStatus: null }) })).reason,
    ).toMatch(/never synced/);
    expect(
      candidateState(candidate({ installed: installed({ ...none, syncStatus: 'succeeded' }) }))
        .reason,
    ).toMatch(/did not create a plugin/);
  });
});

describe('how an added source is doing', () => {
  it('is healthy, syncing, failed, never synced or without a plugin', () => {
    expect(sourceHealth(source()).key).toBe('healthy');
    expect(sourceHealth(source({ lastStatus: 'queued' })).key).toBe('syncing');
    expect(sourceHealth(source({ lastStatus: 'failed', lastError: 'Boom' }))).toMatchObject({
      key: 'failed',
      reason: 'Boom',
    });
    expect(sourceHealth(source({ lastStatus: 'failed' })).reason).toBe('The last sync failed.');
    expect(sourceHealth(source({ lastStatus: null })).key).toBe('never');
    expect(sourceHealth(source({ plugin: null })).key).toBe('empty');
  });

  it('treats a marketplace list as fine, since it has no plugin of its own', () => {
    const list = source({ plugin: null, lastNote: 'Found 2 plugins.' });
    expect(sourceHealth(list).key).toBe('lists');
    expect(needsAttention(list)).toBe(false);
  });

  it('asks for attention on a failure, a missing plugin and a source never synced', () => {
    expect(needsAttention(source())).toBe(false);
    expect(needsAttention(source({ lastStatus: 'running' }))).toBe(false);
    expect(needsAttention(source({ lastStatus: 'failed' }))).toBe(true);
    expect(needsAttention(source({ plugin: null }))).toBe(true);
    expect(needsAttention(source({ lastStatus: null }))).toBe(true);
  });
});

describe('describeCounts', () => {
  it('writes customizations in plain words, one or many', () => {
    expect(describeCounts({ skill: 3, mcp: 1 })).toBe('3 skills · 1 MCP server');
    expect(describeCounts({ hook: 1, agent: 2, rule: 0, unknown: 4 })).toBe('2 agents · 1 hook');
    expect(describeCounts({})).toBe('');
  });
});

describe('filterCandidates', () => {
  const list = [
    candidate({ path: 'tools/mail', name: 'mail', displayName: 'Mail', summary: 'Send email' }),
    candidate({
      path: 'tools/chat',
      name: 'chat',
      displayName: 'Chat',
      summary: 'Team rooms',
      categories: ['social'],
      installed: installed(),
    }),
    candidate({ path: 'x', name: null, displayName: null, problem: 'Bad manifest.' }),
    candidate({ path: 'sync', name: 'sync', installed: installed({ syncStatus: 'running' }) }),
  ];
  const paths = (plugins: DiscoveredPlugin[]) => plugins.map((plugin) => plugin.path);

  it('keeps everything with no words and no state filter', () => {
    expect(filterCandidates(list, '', 'all')).toHaveLength(4);
    expect(filterCandidates(list, '   ', 'all')).toHaveLength(4);
  });

  it('matches every word anywhere in the name, description, folder or category, ignoring case', () => {
    expect(paths(filterCandidates(list, 'MAIL', 'all'))).toEqual(['tools/mail']);
    expect(paths(filterCandidates(list, 'rooms social', 'all'))).toEqual(['tools/chat']);
    expect(paths(filterCandidates(list, 'tools', 'all'))).toEqual(['tools/mail', 'tools/chat']);
    expect(filterCandidates(list, 'mail chat', 'all')).toEqual([]);
  });

  it('finds a folder with no name by its path', () => {
    expect(paths(filterCandidates(list, 'x', 'all'))).toContain('x');
  });

  it('filters by state', () => {
    expect(paths(filterCandidates(list, '', 'available'))).toEqual(['tools/mail']);
    expect(paths(filterCandidates(list, '', 'installed'))).toEqual(['tools/chat']);
    expect(paths(filterCandidates(list, '', 'attention'))).toEqual(['x', 'sync']);
  });

  it('combines the words with the state filter', () => {
    expect(filterCandidates(list, 'chat', 'available')).toEqual([]);
    expect(paths(filterCandidates(list, 'chat', 'installed'))).toEqual(['tools/chat']);
  });

  it('hides installed plugins and plugins with a stdio MCP server, together or apart', () => {
    const both = [
      ...list,
      candidate({ path: 'local', mcpTransports: ['stdio'] }),
      candidate({ path: 'mixed', mcpTransports: ['http', 'stdio'] }),
      candidate({ path: 'remote', mcpTransports: ['http'] }),
    ];
    expect(paths(filterCandidates(both, '', 'all', ['installed']))).not.toContain('tools/chat');
    expect(paths(filterCandidates(both, '', 'all', ['stdio']))).toEqual([
      'tools/mail',
      'tools/chat',
      'x',
      'sync',
      'remote',
    ]);
    expect(paths(filterCandidates(both, '', 'all', ['installed', 'stdio']))).toEqual([
      'tools/mail',
      'x',
      'sync',
      'remote',
    ]);
    expect(filterCandidates(both, '', 'all', [])).toHaveLength(7);
  });

  it('allows installing only what is new and has no stdio server', () => {
    expect(usesStdio(candidate({ mcpTransports: ['http', 'stdio'] }))).toBe(true);
    expect(usesStdio(candidate({ mcpTransports: ['http'] }))).toBe(false);
    expect(canInstall(candidate())).toBe(true);
    expect(canInstall(candidate({ mcpTransports: ['stdio'] }))).toBe(false);
    expect(canInstall(candidate({ installed: installed() }))).toBe(false);
  });
});

describe('githubFolderUrl', () => {
  const repo = { owner: 'acme', repository: 'tools', ref: 'release/1.0' };
  it('points at the folder on the inspected branch', () => {
    expect(githubFolderUrl(repo, 'plugins/mail kit')).toBe(
      'https://github.com/acme/tools/tree/release/1.0/plugins/mail%20kit',
    );
  });
  it('points at the branch root for the repository root', () => {
    expect(githubFolderUrl(repo, '')).toBe('https://github.com/acme/tools/tree/release/1.0');
  });
});
