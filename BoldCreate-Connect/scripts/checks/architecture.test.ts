import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkBarrel, checkRows, checkSource, exportTargets, run, unitOf } from './architecture.js';
import { repoFiles } from './scan.js';

const root = resolve(import.meta.dirname, '../..');
const pkg = (name: string): string => `@boldcreate-integrations/${name}`;
const rules = (file: string, code: string) =>
  checkSource(file, code, { exceptions: {} }).map((finding) => finding.rule);

describe('architecture check', () => {
  it('flags an app importing another app by path', () => {
    expect(rules('apps/api/src/x.ts', "import { a } from '../../gateway/src/a.js';")).toEqual([
      'architecture/relative-escape',
    ]);
  });

  it('flags domain importing adapters and adapters importing domain', () => {
    expect(rules('packages/domain/src/x.ts', `import { a } from '${pkg('adapters')}';`)).toEqual([
      'architecture/direction',
    ]);
    expect(rules('packages/adapters/src/x.ts', `import { a } from '${pkg('domain')}';`)).toEqual([
      'architecture/direction',
    ]);
  });

  it('flags ports importing anything', () => {
    expect(
      rules('packages/ports/src/x.ts', `import type { A } from '${pkg('contracts')}';`),
    ).toEqual(['architecture/direction']);
  });

  it('accepts listed imports and subpaths', () => {
    expect(rules('apps/api/src/x.ts', `import { a } from '${pkg('domain')}';`)).toEqual([]);
    expect(rules('apps/api/src/x.ts', `import { a } from '${pkg('adapters')}/redis';`)).toEqual([]);
  });

  it('lets a client import contracts only with import type', () => {
    const file = 'apps/web/client/src/x.ts';
    expect(rules(file, `import { a } from '${pkg('contracts')}';`)).toEqual([
      'architecture/type-only',
    ]);
    expect(rules(file, `import type { A } from '${pkg('contracts')}';`)).toEqual([]);
    expect(rules(file, `import { type A, type B } from '${pkg('contracts')}';`)).toEqual([]);
    expect(rules(file, `import { type A, b } from '${pkg('contracts')}';`)).toEqual([
      'architecture/type-only',
    ]);
    expect(rules(file, `import { a } from '${pkg('domain')}';`)).toEqual([
      'architecture/direction',
    ]);
  });

  it('flags re-exports and dynamic imports like static ones', () => {
    expect(rules('packages/ports/src/x.ts', `export * from '${pkg('db')}';`)).toHaveLength(1);
    expect(rules('packages/ports/src/x.ts', `await import('${pkg('db')}');`)).toHaveLength(1);
  });

  it('allows the alias only in the web client', () => {
    expect(rules('apps/web/client/src/x.ts', "import { a } from '@/lib/a';")).toEqual([]);
    expect(rules('apps/api/src/x.ts', "import { a } from '@/lib/a';")).toEqual([
      'architecture/alias',
    ]);
  });

  it('flags relative imports that leave the package, not ones that stay', () => {
    expect(rules('packages/db/src/a/x.ts', "import { a } from '../b.js';")).toEqual([]);
    expect(rules('packages/db/src/x.ts', "import { a } from '../../domain/src/a.js';")).toEqual([
      'architecture/relative-escape',
    ]);
    expect(rules('apps/web/server/src/x.ts', "import { a } from '../../client/src/a.js';")).toEqual(
      ['architecture/relative-escape'],
    );
  });

  it('flags require and __dirname', () => {
    expect(rules('apps/api/src/x.ts', "const a = require('node:fs');")).toEqual([
      'architecture/require',
    ]);
    expect(rules('apps/api/src/x.ts', 'const a = __dirname;')).toEqual(['architecture/dirname']);
  });

  it('prints importer -> imported in the finding text', () => {
    const [found] = checkSource(
      'packages/ports/src/x.ts',
      `import type { A } from '${pkg('db')}';`,
    );
    expect(found?.text).toContain('packages/ports -> @boldcreate-integrations/db');
  });

  it('honours a listed exception for one file only', () => {
    const code = `import { a } from '${pkg('security')}';`;
    const options = { exceptions: { 'packages/credentials/src/a.ts': ['security'] } };
    expect(checkSource('packages/credentials/src/a.ts', code, options)).toEqual([]);
    expect(checkSource('packages/credentials/src/b.ts', code, options)).toHaveLength(1);
  });

  it('flags barrel files below src folders only', () => {
    expect(checkBarrel('packages/foo/src/bar/index.ts')).toHaveLength(1);
    expect(checkBarrel('packages/foo/src/index.ts')).toEqual([]);
    expect(checkBarrel('apps/api/src/index.ts')).toEqual([]);
    expect(checkBarrel('packages/db/src/schema/index.ts')).toEqual([]);
    expect(checkBarrel('packages/foo/src/bar/index.ts', ['packages/foo/src/bar/index.ts'])).toEqual(
      [],
    );
  });

  it('flags a package folder without a rule row', () => {
    const files = ['packages/new-thing/package.json', 'packages/ports/package.json'];
    expect(checkRows(files).map((finding) => finding.file)).toEqual([
      'packages/new-thing/package.json',
    ]);
  });

  it('maps files to units', () => {
    expect(unitOf('apps/web/client/src/a.ts')?.rule).toBe('apps/web/client');
    expect(unitOf('apps/web/server/src/a.ts')?.base).toBe('apps/web/server');
    expect(unitOf('apps/api/src/a.ts')?.rule).toBe('apps/*');
    expect(unitOf('tests/integration/a.ts')).toBeNull();
  });

  it('treats export targets as allowed entry points', () => {
    expect(exportTargets(root, repoFiles(root))).toContain('packages/adapters/src/kms/index.ts');
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  }, 60_000);
});
