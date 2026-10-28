import { describe, expect, it } from 'vitest';
import { packComponentArchives } from './component-archives.js';
import type { ScannedComponent } from './scan.js';

const component = (
  kind: ScannedComponent['kind'],
  name: string,
  path?: string,
): ScannedComponent => ({
  kind,
  name,
  description: '',
  metadata: path === undefined ? {} : { path },
});

const files = (entries: Record<string, string>) =>
  new Map(Object.entries(entries).map(([name, body]) => [name, Buffer.from(body)]));

describe('packComponentArchives', () => {
  const tree = files({
    'skills/a/SKILL.md': 'a',
    'skills/a/notes.md': 'notes',
    'skills/b/SKILL.md': 'b',
    'rules/r.md': 'rule',
    'agents/x.md': 'agent',
    'hooks/hooks.json': '{}',
  });

  it('gives the same hash for the same input, run twice', () => {
    const list = [component('skill', 'a', 'skills/a')];
    const first = packComponentArchives(tree, list).get('skill:a');
    const second = packComponentArchives(tree, list).get('skill:a');
    expect(first?.sha256).toBe(second?.sha256);
    expect(first?.sha256).toMatch(/^[0-9a-f]{64}$/);
  });

  it('keeps the hash of a component whose files did not change when another one does', () => {
    const list = [component('skill', 'a', 'skills/a'), component('skill', 'b', 'skills/b')];
    const before = packComponentArchives(tree, list);
    const changed = new Map(tree);
    changed.set('skills/b/SKILL.md', Buffer.from('b2'));
    const after = packComponentArchives(changed, list);
    expect(after.get('skill:a')?.sha256).toBe(before.get('skill:a')?.sha256);
    expect(after.get('skill:b')?.sha256).not.toBe(before.get('skill:b')?.sha256);
  });

  it('packs a skill folder, a rule file and an agent file; MCP has none', () => {
    const out = packComponentArchives(tree, [
      component('skill', 'a', 'skills/a'),
      component('rule', 'r', 'rules/r.md'),
      component('agent', 'x', 'agents/x.md'),
      component('mcp', 'srv'),
    ]);
    expect([...out.keys()].sort()).toEqual(['agent:x', 'rule:r', 'skill:a']);
  });

  it('shares one archive between all hooks of a version', () => {
    const out = packComponentArchives(tree, [
      component('hook', 'h1', 'hooks/hooks.json'),
      component('hook', 'h2', 'hooks/hooks.json'),
    ]);
    expect(out.get('hook:h1')?.sha256).toBe(out.get('hook:h2')?.sha256);
  });

  it('leaves out a component with no path or no files', () => {
    const out = packComponentArchives(tree, [
      component('skill', 'none'),
      component('skill', 'missing', 'skills/zzz'),
      component('rule', 'gone', 'rules/gone.md'),
    ]);
    expect(out.size).toBe(0);
  });
});
