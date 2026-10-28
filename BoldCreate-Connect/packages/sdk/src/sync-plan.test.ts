import { describe, expect, it } from 'vitest';
import { planSync, type Lock } from './sync-plan.js';
import type { FileKind, Manifest } from './types.js';

const component = (
  id: string,
  kind: FileKind,
  sha256: string,
  over: Record<string, unknown> = {},
) => ({
  id,
  kind,
  name: id,
  enabled: true,
  sha256,
  sizeBytes: 1,
  href: '',
  path: '',
  ...over,
});

const manifest = (components: ReturnType<typeof component>[], plugin = 'alpha'): Manifest =>
  ({
    revision: 'r',
    pollAfterSeconds: 60,
    skipped: [],
    entries: [
      {
        installationId: 'ins',
        pluginId: `plg_${plugin}`,
        pluginName: plugin,
        versionId: 'pv',
        version: '1',
        scope: 'user',
        yanked: false,
        sha256: '',
        sizeBytes: 0,
        href: '',
        components,
        mcp: [],
        setup: { kind: 'none' },
      },
    ],
  }) as Manifest;

const locked = (
  id: string,
  kind: FileKind,
  sha256: string,
  pluginName = 'alpha',
): [string, Lock['components'][string]] => [
  id,
  { pluginName, kind, name: id, sha256, files: { [`${id}.md`]: 'h' } },
];

const lockOf = (...entries: ReturnType<typeof locked>[]): Lock => ({
  version: 1,
  revision: 'old',
  userId: 'u',
  components: Object.fromEntries(entries),
});

const ids = (list: { componentId: string }[]) => list.map((item) => item.componentId);

describe('planSync', () => {
  it('adds everything when there is no lock', () => {
    const plan = planSync(manifest([component('a', 'skill', 's1')]), undefined, {
      allowHooks: false,
    });
    expect(ids(plan.add)).toEqual(['a']);
    expect(plan.update).toEqual([]);
  });

  it('keeps what has the same hash and updates what has another', () => {
    const plan = planSync(
      manifest([component('a', 'skill', 's1'), component('b', 'rule', 's2')]),
      lockOf(locked('a', 'skill', 's1'), locked('b', 'rule', 'old')),
      { allowHooks: false },
    );
    expect(ids(plan.unchanged)).toEqual(['a']);
    expect(ids(plan.update)).toEqual(['b']);
  });

  it('removes what left the manifest and what was disabled', () => {
    const plan = planSync(
      manifest([component('a', 'skill', 's1', { enabled: false })]),
      lockOf(locked('a', 'skill', 's1'), locked('gone', 'rule', 's9')),
      { allowHooks: false },
    );
    expect(ids(plan.remove)).toEqual(['a', 'gone']);
    expect(plan.remove[1]?.files).toEqual(['gone.md']);
  });

  it('ignores a component with no archive', () => {
    const plan = planSync(manifest([component('a', 'skill', '')]), undefined, {
      allowHooks: false,
    });
    expect(plan.add).toEqual([]);
  });

  it('leaves kinds that were not asked for alone, in both directions', () => {
    const plan = planSync(
      manifest([component('s', 'skill', 's1'), component('r', 'rule', 's2')]),
      lockOf(locked('rule-old', 'rule', 'x'), locked('skill-old', 'skill', 'y')),
      { kinds: ['skill'], allowHooks: false },
    );
    expect(ids(plan.add)).toEqual(['s']);
    expect(ids(plan.remove)).toEqual(['skill-old']);
    expect(ids(plan.unchanged)).toEqual(['rule-old']);
  });

  it('leaves plugins that were not asked for alone', () => {
    const plan = planSync(
      manifest([component('a', 'skill', 's1')], 'alpha'),
      lockOf(locked('b', 'skill', 's2', 'beta')),
      { plugins: ['alpha'], allowHooks: false },
    );
    expect(ids(plan.add)).toEqual(['a']);
    expect(ids(plan.unchanged)).toEqual(['b']);
    expect(plan.remove).toEqual([]);
  });

  it('matches a plugin by its id as well as its name', () => {
    const plan = planSync(
      manifest([component('a', 'skill', 's1')], 'alpha'),
      undefined,
      { plugins: ['plg_alpha'], allowHooks: false },
      new Map([['alpha', 'plg_alpha']]),
    );
    expect(ids(plan.add)).toEqual(['a']);
  });

  it('skips a plugin that was not asked for', () => {
    const plan = planSync(manifest([component('a', 'skill', 's1')], 'alpha'), undefined, {
      plugins: ['beta'],
      allowHooks: false,
    });
    expect(plan.add).toEqual([]);
  });

  it('skips hooks unless they are allowed, and leaves placed hooks alone', () => {
    const closed = planSync(
      manifest([component('h', 'hook', 'sh')]),
      lockOf(locked('placed-hook', 'hook', 'x')),
      { allowHooks: false },
    );
    expect(closed.add).toEqual([]);
    expect(closed.skipped).toEqual([
      expect.objectContaining({ componentId: 'h', reason: 'hooks_not_allowed' }),
    ]);
    expect(ids(closed.unchanged)).toEqual(['placed-hook']);

    const open = planSync(manifest([component('h', 'hook', 'sh')]), undefined, {
      allowHooks: true,
    });
    expect(ids(open.add)).toEqual(['h']);
    expect(open.skipped).toEqual([]);
  });
});
