import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  formatHashList,
  hashOf,
  lintMigrations,
  parseHashList,
  recordMigrationHashes,
  riskyStatements,
  run,
  statementsOf,
  type MigrationLintConfig,
} from './migration-lint.js';

const repoRoot = resolve(import.meta.dirname, '../..');

let root: string;

const baseline = 'CREATE TABLE "thing" ("id" uuid PRIMARY KEY NOT NULL);';

function write(relative: string, content: string): void {
  const path = join(root, relative);
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, content);
}

function seed(
  migrations: Record<string, string>,
  config: Partial<MigrationLintConfig> = {},
  pin = true,
): void {
  for (const [name, sql] of Object.entries(migrations)) write(`migrations/${name}.sql`, sql);
  write(
    'migration-lint.json',
    JSON.stringify({ firstLinted: '0002', contractAllow: [], ...config }),
  );
  mkdirSync(join(root, 'adr'), { recursive: true });
  if (pin) recordMigrationHashes(locations());
}

const locations = () => ({
  root,
  migrationsDir: 'migrations',
  configFile: 'migration-lint.json',
  hashFile: 'migrations.sha256',
  adrDir: 'adr',
});

const rules = () => lintMigrations(locations()).map((entry) => entry.rule);

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'migration-lint-'));
});
afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('statementsOf', () => {
  it('splits on breakpoints and drops comments and extra whitespace', () => {
    const sql =
      'ALTER TABLE "a"\n  ADD COLUMN "b" text; -- note\n--> statement-breakpoint\nSELECT 1;';
    expect(statementsOf(sql)).toEqual(['ALTER TABLE "a" ADD COLUMN "b" text;', 'SELECT 1;']);
  });
});

describe('riskyStatements', () => {
  it.each([
    ['DROP TABLE "thing";', 'DROP TABLE'],
    ['ALTER TABLE "thing" DROP COLUMN "x";', 'DROP COLUMN'],
    ['ALTER TABLE "thing" ALTER COLUMN "x" SET DATA TYPE integer;', 'ALTER COLUMN TYPE'],
    ['ALTER TABLE "thing" ALTER COLUMN "x" TYPE integer;', 'ALTER COLUMN TYPE'],
    ['ALTER TABLE "thing" RENAME COLUMN "x" TO "y";', 'RENAME'],
    ['ALTER TABLE "thing" RENAME TO "things";', 'RENAME'],
    ['ALTER TABLE "thing" ALTER COLUMN "x" SET NOT NULL;', 'SET NOT NULL'],
    ['ALTER TABLE "thing" DROP CONSTRAINT "c";', 'DROP CONSTRAINT'],
  ])('flags %s', (sql, expected) => {
    expect(riskyStatements(sql).join('\n')).toContain(expected);
  });

  it('accepts additive changes', () => {
    const sql = [
      'ALTER TABLE "thing" ADD COLUMN "x" text NOT NULL DEFAULT \'a\';',
      'CREATE TABLE "other" ("id" uuid PRIMARY KEY NOT NULL);',
      'ALTER TABLE "thing" ADD CONSTRAINT "c" CHECK (x <> \'\');',
    ].join('\n--> statement-breakpoint\n');
    expect(riskyStatements(sql)).toEqual([]);
  });

  it('accepts a dropped constraint that the same file replaces on the same table', () => {
    const sql = [
      'ALTER TABLE "thing" DROP CONSTRAINT "c";',
      'ALTER TABLE "thing" ADD CONSTRAINT "c" CHECK (x <> \'b\');',
    ].join('\n--> statement-breakpoint\n');
    expect(riskyStatements(sql)).toEqual([]);
  });

  it('flags a dropped constraint whose replacement is on another table', () => {
    const sql = [
      'ALTER TABLE "thing" DROP CONSTRAINT "c";',
      'ALTER TABLE "other" ADD CONSTRAINT "c" CHECK (x <> \'b\');',
    ].join('\n--> statement-breakpoint\n');
    expect(riskyStatements(sql)).toHaveLength(1);
  });

  it('allows a plain index only when it is the only statement', () => {
    expect(riskyStatements('CREATE INDEX "i" ON "thing" ("x");')).toEqual([]);
    const together = [
      'ALTER TABLE "thing" ADD COLUMN "x" text;',
      'CREATE INDEX "i" ON "thing" ("x");',
    ].join('\n--> statement-breakpoint\n');
    expect(riskyStatements(together).join()).toContain('CREATE INDEX');
    const concurrent = [
      'ALTER TABLE "thing" ADD COLUMN "x" text;',
      'CREATE UNIQUE INDEX CONCURRENTLY "i" ON "thing" ("x");',
    ].join('\n--> statement-breakpoint\n');
    expect(riskyStatements(concurrent)).toEqual([]);
  });
});

describe('lintMigrations', () => {
  it('passes a clean set', () => {
    seed({
      '0000_baseline': baseline,
      '0001_next': 'ALTER TABLE "thing" ADD COLUMN "x" text;',
      '0002_add': 'ALTER TABLE "thing" ADD COLUMN "y" text;',
    });
    expect(rules()).toEqual([]);
  });

  it('flags DROP COLUMN after the baseline', () => {
    seed({
      '0000_baseline': baseline,
      '0001_next': 'ALTER TABLE "thing" ADD COLUMN "x" text;',
      '0002_drop': 'ALTER TABLE "thing" DROP COLUMN "x";',
    });
    expect(rules()).toEqual(['migration/contract-change']);
  });

  it('does not flag the same statement before the baseline', () => {
    seed({
      '0000_baseline': baseline,
      '0001_drop': 'ALTER TABLE "thing" DROP COLUMN "x";',
      '0002_add': 'ALTER TABLE "thing" ADD COLUMN "y" text;',
    });
    expect(rules()).toEqual([]);
  });

  it('allows a contract change listed with an ADR that exists', () => {
    seed(
      {
        '0000_baseline': baseline,
        '0002_drop': 'ALTER TABLE "thing" DROP COLUMN "x";',
      },
      { contractAllow: [{ tag: '0002_drop', adr: '0010-drop-x.md' }] },
    );
    write('adr/0010-drop-x.md', '# Drop x\n');
    expect(rules()).toEqual([]);
  });

  it('refuses a listed contract change whose ADR file is missing', () => {
    seed(
      {
        '0000_baseline': baseline,
        '0002_drop': 'ALTER TABLE "thing" DROP COLUMN "x";',
      },
      { contractAllow: [{ tag: '0002_drop', adr: '0010-drop-x.md' }] },
    );
    expect(rules()).toEqual(['migration/adr-missing']);
  });

  it('refuses an allow entry for a migration that does not exist', () => {
    seed(
      { '0000_baseline': baseline },
      { contractAllow: [{ tag: '0005_gone', adr: '0010-drop-x.md' }] },
    );
    expect(rules()).toEqual(['migration/allow-unknown']);
  });

  it('fails without a config file or with a config that has no sequence', () => {
    seed({ '0000_baseline': baseline });
    rmSync(join(root, 'migration-lint.json'));
    expect(rules()).toEqual(['migration/config-missing']);
    write('migration-lint.json', JSON.stringify({ firstLinted: 'later', contractAllow: [] }));
    expect(rules()).toEqual(['migration/config-invalid']);
  });
});

describe('migration pins', () => {
  it('fails when a committed migration is edited', () => {
    seed({ '0000_baseline': baseline });
    write('migrations/0000_baseline.sql', `${baseline}\nALTER TABLE "thing" ADD COLUMN "x" text;`);
    expect(rules()).toEqual(['migration/edited']);
  });

  it('fails when a pinned migration is deleted', () => {
    seed({ '0000_baseline': baseline, '0001_next': 'SELECT 1;' });
    rmSync(join(root, 'migrations/0001_next.sql'));
    expect(rules()).toEqual(['migration/removed']);
  });

  it('fails for a migration that was never pinned', () => {
    seed({ '0000_baseline': baseline });
    write('migrations/0001_new.sql', 'SELECT 1;');
    expect(rules()).toEqual(['migration/unpinned']);
  });

  it('fails when the hash list is missing', () => {
    seed({ '0000_baseline': baseline }, {}, false);
    expect(rules()).toEqual(['migration/hashes-missing']);
  });

  it('pins new files only and never rewrites an existing pin', () => {
    seed({ '0000_baseline': baseline });
    const before = readFileSync(join(root, 'migrations.sha256'), 'utf8');
    write('migrations/0000_baseline.sql', 'SELECT 2;');
    write('migrations/0001_new.sql', 'SELECT 1;');
    expect(recordMigrationHashes(locations())).toEqual(['0001_new.sql']);
    const after = parseHashList(readFileSync(join(root, 'migrations.sha256'), 'utf8'));
    expect(after.get('0000_baseline.sql')).toBe(parseHashList(before).get('0000_baseline.sql'));
    expect(after.get('0001_new.sql')).toBe(hashOf('SELECT 1;'));
    expect(recordMigrationHashes(locations())).toEqual([]);
  });

  it('round-trips the hash list format', () => {
    const hashes = new Map([
      ['0001_b.sql', hashOf('b')],
      ['0000_a.sql', hashOf('a')],
    ]);
    const text = formatHashList(hashes);
    expect(text.split('\n')[0]).toContain('0000_a.sql');
    expect(parseHashList(text)).toEqual(hashes);
  });
});

describe('repository migrations', () => {
  it('pass the lint', () => {
    expect(run(repoRoot)).toEqual([]);
  });
});
