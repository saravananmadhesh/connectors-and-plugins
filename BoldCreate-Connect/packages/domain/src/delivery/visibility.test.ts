import { describe, expect, it } from 'vitest';
import { pickEffective, type EffectiveInstallation } from './visibility.js';

const at = (minutes: number) => new Date(Date.UTC(2026, 0, 1, 0, minutes));

const row = (patch: Partial<EffectiveInstallation>): EffectiveInstallation => ({
  installationId: 'i-1',
  pluginId: 'plugin-a',
  pluginName: 'alpha',
  versionId: 'v-1',
  version: '1.0.0',
  versionStatus: 'published',
  scope: 'org',
  required: false,
  updatedAt: at(0),
  archiveSha256: 'a'.repeat(64),
  archiveSizeBytes: 10,
  ...patch,
});

describe('pickEffective', () => {
  it('keeps one installation per plugin', () => {
    const picked = pickEffective([
      row({ installationId: 'org', scope: 'org' }),
      row({ installationId: 'me', scope: 'user' }),
      row({ installationId: 'other', pluginId: 'plugin-b', pluginName: 'beta' }),
    ]);
    expect(picked.map((item) => item.installationId)).toEqual(['me', 'other']);
  });

  it('prefers the more specific scope: user, then organization', () => {
    const rows = [row({ installationId: 'org', scope: 'org' })];
    expect(pickEffective(rows)[0]?.installationId).toBe('org');
    expect(
      pickEffective([...rows, row({ installationId: 'me', scope: 'user' })])[0]?.installationId,
    ).toBe('me');
  });

  it('ranks a project install between the organization and the person', () => {
    const rows = [
      row({ installationId: 'org', scope: 'org' }),
      row({ installationId: 'project', scope: 'project' }),
    ];
    expect(pickEffective(rows)[0]?.installationId).toBe('project');
    expect(
      pickEffective([...rows, row({ installationId: 'me', scope: 'user' })])[0]?.installationId,
    ).toBe('me');
  });

  it('keeps a personal install next to an enforced organization one and serves the personal one', () => {
    const picked = pickEffective([
      row({ installationId: 'me', scope: 'user', updatedAt: at(1) }),
      row({ installationId: 'org', scope: 'org', required: true, updatedAt: at(30) }),
    ]);
    expect(picked).toHaveLength(1);
    expect(picked[0]?.installationId).toBe('me');
  });

  it('serves the enforced organization install when nothing narrower is active', () => {
    const picked = pickEffective([row({ installationId: 'org', scope: 'org', required: true })]);
    expect(picked.map((item) => item.installationId)).toEqual(['org']);
  });

  it('does not treat the flag as meaningful outside the organization scope', () => {
    const picked = pickEffective([
      row({ installationId: 'org', scope: 'org' }),
      row({ installationId: 'me', scope: 'user', required: true }),
    ]);
    expect(picked[0]?.installationId).toBe('me');
  });

  it('sorts the result by plugin name and handles no rows', () => {
    expect(pickEffective([])).toEqual([]);
    const names = pickEffective([
      row({ pluginId: 'z', pluginName: 'zulu', installationId: '1' }),
      row({ pluginId: 'm', pluginName: 'mike', installationId: '2' }),
    ]).map((item) => item.pluginName);
    expect(names).toEqual(['mike', 'zulu']);
  });
});
