/**
 * Repository check for database migrations.
 *
 * Migrations after the lint baseline must keep the previous release running on the new schema:
 * destructive or locking statements are refused unless the migration is listed in
 * `packages/db/migration-lint.json` with the decision that explains it. Every migration file is also
 * pinned by hash, so a committed migration cannot be edited afterwards.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { formatFinding, type Finding } from './scan.js';

export const MIGRATIONS_DIR = 'packages/db/migrations';
export const LINT_CONFIG = 'packages/db/migration-lint.json';
export const HASH_FILE = 'packages/db/migrations.sha256';
export const ADR_DIR = 'docs/architecture';

export interface ContractAllowEntry {
  tag: string;
  adr: string;
}

export interface MigrationLintConfig {
  /** Tag, or just the numeric prefix, of the first migration that is linted. */
  firstLinted: string;
  contractAllow: ContractAllowEntry[];
}

const BREAKPOINT = '--> statement-breakpoint';

function finding(rule: string, file: string, text: string, line = 1): Finding {
  return { rule: `migration/${rule}`, file, line, text };
}

const sequenceOf = (tag: string): number => Number.parseInt(/^\d+/.exec(tag)?.[0] ?? '', 10);

/** The statements of a migration, comments removed and whitespace collapsed. */
export function statementsOf(sql: string): string[] {
  return sql
    .split(BREAKPOINT)
    .map((statement) =>
      statement
        .replace(/--[^\n]*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((statement) => statement.length > 0);
}

const IDENT = String.raw`(?:"[^"]+"|[\w.]+)`;
const alterTable = new RegExp(String.raw`^ALTER TABLE (?:IF EXISTS )?(?:ONLY )?(${IDENT})`, 'i');

function tableOf(statement: string): string | null {
  return alterTable.exec(statement)?.[1]?.replaceAll('"', '').toLowerCase() ?? null;
}

/** What one migration does that the previous release may not survive. */
export function riskyStatements(sql: string): string[] {
  const statements = statementsOf(sql);
  const added = new Set(
    statements
      .filter((statement) => /\bADD CONSTRAINT\b/i.test(statement))
      .map(tableOf)
      .filter((table): table is string => table !== null),
  );
  const risks: string[] = [];
  for (const statement of statements) {
    if (/^DROP TABLE\b/i.test(statement)) risks.push(`DROP TABLE: ${statement}`);
    if (/\bDROP COLUMN\b/i.test(statement)) risks.push(`DROP COLUMN: ${statement}`);
    if (/\bALTER COLUMN\b.*\bTYPE\b/i.test(statement))
      risks.push(`ALTER COLUMN TYPE: ${statement}`);
    if (/^ALTER TABLE\b.*\bRENAME\b/i.test(statement)) risks.push(`RENAME: ${statement}`);
    if (/\bALTER COLUMN\b.*\bSET NOT NULL\b/i.test(statement)) {
      risks.push(`SET NOT NULL on an existing column: ${statement}`);
    }
    if (/\bDROP CONSTRAINT\b/i.test(statement)) {
      const table = tableOf(statement);
      if (table === null || !added.has(table)) {
        risks.push(`DROP CONSTRAINT without a replacement in the same file: ${statement}`);
      }
    }
    if (
      statements.length > 1 &&
      /^CREATE (?:UNIQUE )?INDEX\b/i.test(statement) &&
      !/^CREATE (?:UNIQUE )?INDEX CONCURRENTLY\b/i.test(statement)
    ) {
      risks.push(`CREATE INDEX without CONCURRENTLY in a multi-statement file: ${statement}`);
    }
  }
  return risks;
}

export function hashOf(content: Buffer | string): string {
  return createHash('sha256').update(content).digest('hex');
}

/** `<sha256>  <file>` lines to a map. */
export function parseHashList(text: string): Map<string, string> {
  const hashes = new Map<string, string>();
  for (const line of text.split('\n')) {
    const match = /^([0-9a-f]{64}) {2}(\S+)$/.exec(line.trim());
    if (match) hashes.set(match[2]!, match[1]!);
  }
  return hashes;
}

export function formatHashList(hashes: ReadonlyMap<string, string>): string {
  return [...hashes]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, hash]) => `${hash}  ${file}`)
    .join('\n')
    .concat('\n');
}

export interface LintLocations {
  root: string;
  migrationsDir?: string;
  configFile?: string;
  hashFile?: string;
  adrDir?: string;
}

function resolved(locations: LintLocations) {
  const { root } = locations;
  return {
    root,
    migrations: join(root, locations.migrationsDir ?? MIGRATIONS_DIR),
    config: join(root, locations.configFile ?? LINT_CONFIG),
    hashes: join(root, locations.hashFile ?? HASH_FILE),
    adrs: join(root, locations.adrDir ?? ADR_DIR),
    migrationsRel: locations.migrationsDir ?? MIGRATIONS_DIR,
    configRel: locations.configFile ?? LINT_CONFIG,
    hashesRel: locations.hashFile ?? HASH_FILE,
  };
}

function migrationFiles(dir: string): string[] {
  return existsSync(dir)
    ? readdirSync(dir)
        .filter((name) => /^\d+_.+\.sql$/.test(name))
        .sort()
    : [];
}

function readConfig(path: string): MigrationLintConfig {
  return JSON.parse(readFileSync(path, 'utf8')) as MigrationLintConfig;
}

export function lintMigrations(locations: LintLocations): Finding[] {
  const paths = resolved(locations);
  const findings: Finding[] = [];
  if (!existsSync(paths.config)) {
    return [finding('config-missing', paths.configRel, 'migration-lint.json is missing')];
  }
  const config = readConfig(paths.config);
  const first = sequenceOf(config.firstLinted);
  if (Number.isNaN(first)) {
    return [finding('config-invalid', paths.configRel, 'firstLinted needs a numeric prefix')];
  }
  const files = migrationFiles(paths.migrations);
  const tags = new Set(files.map((name) => name.replace(/\.sql$/, '')));

  for (const entry of config.contractAllow) {
    if (!tags.has(entry.tag)) {
      findings.push(
        finding(
          'allow-unknown',
          paths.configRel,
          `contractAllow lists "${entry.tag}", which does not exist`,
        ),
      );
    }
  }

  for (const name of files) {
    const rel = `${paths.migrationsRel}/${name}`;
    const tag = name.replace(/\.sql$/, '');
    if (sequenceOf(tag) < first) continue;
    const risks = riskyStatements(readFileSync(join(paths.migrations, name), 'utf8'));
    if (risks.length === 0) continue;
    const allowed = config.contractAllow.find((entry) => entry.tag === tag);
    if (!allowed) {
      for (const risk of risks) {
        findings.push(
          finding('contract-change', rel, `${risk} (needs a contractAllow entry with an ADR)`),
        );
      }
    } else if (!existsSync(join(paths.adrs, allowed.adr))) {
      findings.push(
        finding(
          'adr-missing',
          rel,
          `contractAllow names ADR "${allowed.adr}", which does not exist`,
        ),
      );
    }
  }

  findings.push(...checkHashes(locations, files));
  return findings;
}

/** Every migration file is pinned; a changed, removed or unlisted file is a finding. */
function checkHashes(locations: LintLocations, files: string[]): Finding[] {
  const paths = resolved(locations);
  if (!existsSync(paths.hashes)) {
    return [finding('hashes-missing', paths.hashesRel, 'the migration hash list is missing')];
  }
  const pinned = parseHashList(readFileSync(paths.hashes, 'utf8'));
  const findings: Finding[] = [];
  for (const name of files) {
    const rel = `${paths.migrationsRel}/${name}`;
    const expected = pinned.get(name);
    if (expected === undefined) {
      findings.push(
        finding('unpinned', rel, 'not in the hash list; generate migrations with pnpm db:generate'),
      );
    } else if (hashOf(readFileSync(join(paths.migrations, name))) !== expected) {
      findings.push(
        finding('edited', rel, 'a committed migration was changed; add a new migration instead'),
      );
    }
  }
  for (const name of pinned.keys()) {
    if (!files.includes(name)) {
      findings.push(
        finding('removed', `${paths.migrationsRel}/${name}`, 'a pinned migration is missing'),
      );
    }
  }
  return findings;
}

/** Pins every migration that is not pinned yet. Existing pins are never rewritten. */
export function recordMigrationHashes(locations: LintLocations): string[] {
  const paths = resolved(locations);
  const pinned = existsSync(paths.hashes)
    ? parseHashList(readFileSync(paths.hashes, 'utf8'))
    : new Map<string, string>();
  const added: string[] = [];
  for (const name of migrationFiles(paths.migrations)) {
    if (pinned.has(name)) continue;
    pinned.set(name, hashOf(readFileSync(join(paths.migrations, name))));
    added.push(name);
  }
  if (added.length > 0) writeFileSync(paths.hashes, formatHashList(pinned));
  return added;
}

export function run(root: string): Finding[] {
  return lintMigrations({ root });
}

if (import.meta.main) {
  const findings = run(resolve(import.meta.dirname, '..', '..'));
  for (const entry of findings) process.stdout.write(`${formatFinding(entry)}\n`);
  process.stdout.write(
    findings.length > 0 ? `db:lint: ${findings.length} finding(s)\n` : 'db:lint: clean\n',
  );
  process.exit(findings.length > 0 ? 1 : 0);
}
