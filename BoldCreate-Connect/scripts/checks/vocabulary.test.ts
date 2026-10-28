import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import { getTableConfig, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import {
  checkDbNames,
  checkPath,
  checkSource,
  loadAllow,
  run,
  schemaNames,
  type VocabularyAllow,
} from './vocabulary.js';

const root = resolve(import.meta.dirname, '../..');
const allow: VocabularyAllow = {
  identifiers: ['bundles', 'vitestProject'],
  phrases: ['account deletion'],
  paths: [],
};

describe('vocabulary: identifiers', () => {
  it('flags a banned word in a camelCase identifier', () => {
    const findings = checkSource('packages/domain/src/x.ts', 'const bundleId = 1;', allow);
    expect(findings).toHaveLength(1);
    expect(findings[0]).toMatchObject({ rule: 'vocabulary/identifier', line: 1 });
  });

  it('flags snake_case, PascalCase and plural variants', () => {
    const text = 'const bundle_id = 1;\nconst ProviderConfig = 2;\nconst capabilities = 3;';
    expect(checkSource('packages/domain/src/x.ts', text, allow)).toHaveLength(3);
  });

  it('does not flag words that merely contain a banned word', () => {
    const text = 'const bundler = 1;\nconst projection = 2;\nconst bundled = 3;';
    expect(checkSource('packages/domain/src/x.ts', text, allow)).toEqual([]);
  });

  it('allows listed identifiers', () => {
    const text = 'const bundles = [];\nconst vitestProject = "unit";';
    expect(checkSource('scripts/x.ts', text, allow)).toEqual([]);
  });

  it('ignores comments', () => {
    const text = '// the old bundle name\n/* workspace */\nconst ok = 1;';
    expect(checkSource('packages/domain/src/x.ts', text, allow)).toEqual([]);
  });

  it('flags an API key identifier that mentions a token', () => {
    const findings = checkSource('apps/api/src/x.ts', 'const apiKeyToken = 1;', allow);
    expect(findings.map((f) => f.rule)).toContain('vocabulary/api-key-token');
    expect(checkSource('apps/api/src/x.ts', 'const sessionToken = 1;', allow)).toEqual([]);
  });
});

describe('vocabulary: strings and paths', () => {
  it('flags banned words in UI strings but allows listed phrases', () => {
    const bad = checkSource(
      'apps/web/client/src/pages/X.tsx',
      'const a = "Create a workspace";',
      allow,
    );
    expect(bad).toHaveLength(1);
    expect(bad[0]).toMatchObject({ rule: 'vocabulary/ui-string' });
    const ok = checkSource(
      'apps/web/client/src/pages/X.tsx',
      'const a = "Account deletion";',
      allow,
    );
    expect(ok).toEqual([]);
  });

  it('flags banned words in route strings', () => {
    const findings = checkSource('apps/api/src/routes/x.ts', "app.get('/v1/bundles/:id')", allow);
    expect(findings.map((f) => f.rule)).toEqual(['vocabulary/route']);
  });

  it('does not scan ordinary strings outside the UI', () => {
    expect(checkSource('packages/domain/src/x.ts', "const a = 'bundle';", allow)).toEqual([]);
  });

  it('flags banned words in file names', () => {
    expect(checkPath('packages/domain/src/account.ts', allow)).toHaveLength(1);
    expect(checkPath('packages/domain/src/profile.ts', allow)).toEqual([]);
  });

  it('allows integration only in test locations', () => {
    expect(checkPath('tests/integration/x.integration.test.ts', allow)).toEqual([]);
    expect(checkPath('apps/api/src/integration.ts', allow)).toHaveLength(1);
  });

  it('skips documentation, migrations and CHANGELOG', () => {
    expect(checkPath('docs/plan/bundle.md', allow)).toEqual([]);
    expect(checkPath('packages/db/migrations/0000_bundle.sql', allow)).toEqual([]);
    expect(checkPath('CHANGELOG.md', allow)).toEqual([]);
  });
});

describe('vocabulary: database names', () => {
  it('flags a table named after a banned word', () => {
    const bundles = pgTable('bundles', { id: uuid('id').primaryKey(), name: text('name') });
    expect(getTableConfig(bundles).name).toBe('bundles');
    const findings = checkDbNames(schemaNames({ bundles }));
    expect(findings.length).toBeGreaterThan(0);
    expect(findings[0]).toMatchObject({ rule: 'vocabulary/database' });
  });

  it('flags a banned column name', () => {
    const table = pgTable('thing', {
      id: uuid('id').primaryKey(),
      providerId: text('provider_id'),
    });
    expect(checkDbNames(schemaNames({ table })).map((f) => f.text)).toEqual([
      '"provider" in database name provider_id',
    ]);
  });
});

describe('vocabulary: allowed database names', () => {
  it('skips names on the allow list and still flags the others', () => {
    const table = pgTable('thing', {
      id: uuid('id').primaryKey(),
      provider: text('provider'),
      providerId: text('provider_id'),
    });
    const findings = checkDbNames(schemaNames({ table }), ['provider']);
    expect(findings.map((f) => f.text)).toEqual(['"provider" in database name provider_id']);
  });
});

describe('vocabulary: repository', () => {
  it('has the allow list loaded from data', () => {
    expect(loadAllow(root).identifiers).toContain('vitestProject');
  });

  // Reads every source file; with the other suites running it needs more than the default 5 s.
  it('passes on the repository', { timeout: 60_000 }, () => {
    expect(run(root)).toEqual([]);
  });
});
