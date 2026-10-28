import { describe, expect, it } from 'vitest';
import { assignServerNames, canonicalServerName } from './server-name.js';

describe('canonicalServerName', () => {
  it.each([
    ['GitHub', 'github'],
    ['my server', 'my-server'],
    ['a__b', 'a-b'],
    ['--x--', 'x'],
  ])('turns %s into %s', (raw, expected) => {
    expect(canonicalServerName(raw)).toBe(expected);
  });
});

describe('assignServerNames', () => {
  it('keeps the first of two servers that share a name, ordered by plugin then component', () => {
    const named = assignServerNames([
      { pluginName: 'b', name: 'Docs', alias: null },
      { pluginName: 'a', name: 'docs', alias: null },
      { pluginName: 'a', name: 'other', alias: null },
    ]);
    expect(named.map((item) => [item.name, item.server.pluginName])).toEqual([
      ['docs', 'a'],
      ['other', 'a'],
    ]);
  });

  it('uses the alias over the component name and drops empty names', () => {
    const named = assignServerNames([
      { pluginName: 'a', name: 'x', alias: 'Renamed Server' },
      { pluginName: 'a', name: '___', alias: null },
    ]);
    expect(named.map((item) => item.name)).toEqual(['renamed-server']);
  });
});
