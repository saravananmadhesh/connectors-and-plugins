import { describe, expect, it } from 'vitest';
import type { AdminAuditEntry } from './api';
import { actionText, actionTone, contextRows, targetPath, targetText } from './audit';

const entry = (overrides: Partial<AdminAuditEntry> = {}): AdminAuditEntry => ({
  id: '00000000-0000-4000-8000-000000000001',
  at: '2026-10-11T00:00:00.000Z',
  actorId: 'ops@example.test',
  actorKind: 'platform_admin',
  action: 'plugin.updated',
  targetKind: 'plugin',
  targetId: '00000000-0000-4000-8000-0000000000a1',
  result: 'success',
  context: { name: 'alpha' },
  orgId: null,
  requestId: null,
  ip: null,
  ...overrides,
});

describe('audit wording', () => {
  it('has a sentence for the events admins cause, and readable words for the rest', () => {
    expect(actionText('plugin_version.yanked')).toBe('Yanked a version');
    expect(actionText('kill_switch.lifted')).toBe('Kill switch lifted');
  });

  it('colours removals and failures red, new things green, caution amber', () => {
    expect(actionTone(entry({ action: 'plugin.deleted' }))).toBe('destructive');
    expect(actionTone(entry({ action: 'plugin_version.yanked' }))).toBe('destructive');
    expect(actionTone(entry({ action: 'plugin_version.published' }))).toBe('success');
    expect(actionTone(entry({ action: 'plugin.deprecated' }))).toBe('warning');
    expect(actionTone(entry({ action: 'plugin_ingestion.requested' }))).toBe('info');
    expect(actionTone(entry({ action: 'plugin.updated' }))).toBe('secondary');
    expect(actionTone(entry({ action: 'plugin.updated', result: 'denied' }))).toBe('destructive');
  });
});

describe('what an event was about', () => {
  it('names a plugin, a version, a source and a category from what was recorded', () => {
    expect(targetText(entry())).toBe('alpha');
    expect(targetText(entry({ targetKind: 'plugin_version', context: { version: '1.2.0' } }))).toBe(
      'version 1.2.0',
    );
    expect(targetText(entry({ targetKind: 'plugin_version', context: null }))).toBe('a version');
    expect(
      targetText(
        entry({ targetKind: 'plugin_source', context: { owner: 'acme', repository: 'tools' } }),
      ),
    ).toBe('acme/tools');
    expect(targetText(entry({ targetKind: 'plugin_source', context: null }))).toBe('a source');
    expect(targetText(entry({ targetKind: 'category', context: null }))).toBe('category');
    expect(targetText(entry({ targetKind: null, targetId: null, context: null }))).toBeNull();
  });

  it('links a plugin and a version, and nothing that is gone or unknown', () => {
    expect(targetPath(entry())).toEqual({
      to: '/plugins/$pluginId',
      params: { pluginId: '00000000-0000-4000-8000-0000000000a1' },
    });
    expect(targetPath(entry({ action: 'plugin.deleted' }))).toBeNull();
    expect(
      targetPath(
        entry({ targetKind: 'plugin_version', targetId: 'v1', context: { pluginId: 'p1' } }),
      ),
    ).toEqual({
      to: '/plugins/$pluginId/versions/$versionId',
      params: { pluginId: 'p1', versionId: 'v1' },
    });
    expect(
      targetPath(entry({ targetKind: 'plugin_version', targetId: 'v1', context: {} })),
    ).toBeNull();
    expect(targetPath(entry({ targetId: null }))).toBeNull();
    expect(targetPath(entry({ targetKind: 'category' }))).toBeNull();
  });

  it('lists the recorded context as it was stored', () => {
    expect(contextRows({ name: 'alpha', fields: ['summary'], count: 2 })).toEqual([
      ['name', 'alpha'],
      ['fields', '["summary"]'],
      ['count', '2'],
    ]);
    expect(contextRows(null)).toEqual([]);
  });
});
