import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import * as root from './index.js';
import * as node from './sync.js';

const source = (name: string) => readFileSync(join(import.meta.dirname, name), 'utf8');

/** Names exported by a file, including types, read from its text. */
function exportedNames(text: string): string[] {
  const names = new Set<string>();
  for (const match of text.matchAll(/export (?:type )?\{([^}]*)\}/g)) {
    for (const part of (match[1] ?? '').split(',')) {
      const name = part
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (name) names.add(name);
    }
  }
  for (const match of text.matchAll(
    /export (?:declare )?(?:class|interface|type|const|function) (\w+)/g,
  )) {
    if (match[1]) names.add(match[1]);
  }
  return [...names];
}

const FORBIDDEN = ['Session', 'ConnectionRequest', 'connect'];

describe('public names', () => {
  const index = [...exportedNames(source('index.ts')), ...exportedNames(source('types.ts'))];
  const nodeEntry = exportedNames(source('sync.ts'));

  it('exports exactly the runtime values of the root entry', () => {
    expect(Object.keys(root).sort()).toEqual([
      'ConnectAuthError',
      'ConnectClient',
      'ConnectError',
      'ConnectIntegrityError',
      'ConnectNotFoundError',
      'ConnectRateLimitError',
      'ConnectSession',
      'ConnectSetupRequiredError',
    ]);
  });

  it('exports exactly the runtime values of the node entry', () => {
    expect(Object.keys(node).sort()).toEqual(['TOKEN_PLACEHOLDER', 'syncPlugins', 'toMcpConfig']);
  });

  it.each([
    ['index.ts', index],
    ['sync.ts', nodeEntry],
  ])('has no bare Session, ConnectionRequest or connect in %s', (_file, names) => {
    expect(names.length).toBeGreaterThan(0);
    for (const name of FORBIDDEN) expect(names).not.toContain(name);
  });

  it('prefixes the names that could clash with the ConnectClient prefix', () => {
    for (const name of ['ConnectSession', 'ConnectRequest', 'ConnectError']) {
      expect([...index, ...exportedNames(source('session.ts'))]).toContain(name);
    }
  });

  it('names a connect instance with a lower case word only in examples', () => {
    expect(Object.keys(root)).not.toContain('connect');
  });
});
