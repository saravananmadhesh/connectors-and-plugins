/**
 * Repository check: forbidden vocabulary.
 *
 * The product vocabulary is fixed (plugin, component, connection, project, session, organization). Old and
 * foreign words must not appear in identifiers, file names, database object names, route paths or
 * UI strings. Exceptions are data in `vocabulary.allow.json`.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core';
import * as schema from '../../packages/db/src/schema/index.js';
import { repoFiles, readText, tokenize, words, type Finding } from './scan.js';

export interface VocabularyAllow {
  /** Identifiers that are allowed even though they contain a banned word. */
  identifiers: string[];
  /** Phrases (lower case) that are allowed inside UI strings. */
  phrases: string[];
  /** Files exempt from the check, as regular expression sources. */
  paths: string[];
  /** Database object names that are allowed even though they contain a banned word. */
  databaseNames?: string[];
}

export const BANNED_WORDS = new Set([
  'company',
  'companies',
  'account',
  'accounts',
  'workspace',
  'workspaces',
  'bundle',
  'bundles',
  'integration',
  'integrations',
  'capability',
  'capabilities',
  'subscription',
  'subscriptions',
  'provider',
  'providers',
]);

/** Words banned in database object names only. */
export const BANNED_DB_WORDS = new Set([...BANNED_WORDS, 'repo', 'repos', 'release', 'releases']);

const SCANNED_ROOTS = ['apps/', 'packages/', 'scripts/', 'tests/', 'fixtures/'];
const SOURCE_EXTENSIONS = /\.(?:ts|tsx|mts|mjs)$/;
const SKIPPED_PATHS = [/\/migrations\//, /\/node_modules\//, /\/dist\//, /package-lock\.json$/];
const UI_PATH = /^apps\/web\/client\/src\/.*\.tsx$/;
const ROUTE_STRING = /^\/(?:api\/)?v1\//;

export function loadAllow(root: string): VocabularyAllow {
  return JSON.parse(
    readFileSync(join(root, 'scripts/checks/vocabulary.allow.json'), 'utf8'),
  ) as VocabularyAllow;
}

function bannedIn(name: string, banned: Set<string>): string | undefined {
  return words(name).find((word) => banned.has(word));
}

function integrationAllowedPath(file: string): boolean {
  return file.startsWith('tests/integration/') || /\.integration\.test\.tsx?$/.test(file);
}

export function checkPath(file: string, allow: VocabularyAllow): Finding[] {
  if (!SCANNED_ROOTS.some((prefix) => file.startsWith(prefix))) return [];
  if (SKIPPED_PATHS.some((pattern) => pattern.test(file))) return [];
  if (allow.paths.some((source) => new RegExp(source).test(file))) return [];
  const findings: Finding[] = [];
  for (const segment of file.split('/')) {
    const bare = segment.replace(/\.integration\.test(?=\.)/, '');
    const word = bannedIn(bare, BANNED_WORDS);
    if (!word) continue;
    if (word.startsWith('integration') && integrationAllowedPath(file)) continue;
    if (/^boldcreate-integrations$/.test(segment)) continue;
    findings.push({
      rule: 'vocabulary/path',
      file,
      line: 1,
      text: `"${word}" in path segment ${segment}`,
    });
  }
  return findings;
}

export function checkSource(file: string, text: string, allow: VocabularyAllow): Finding[] {
  if (!SCANNED_ROOTS.some((prefix) => file.startsWith(prefix))) return [];
  if (!SOURCE_EXTENSIONS.test(file) || SKIPPED_PATHS.some((pattern) => pattern.test(file))) {
    return [];
  }
  if (allow.paths.some((source) => new RegExp(source).test(file))) return [];
  const findings: Finding[] = [];
  const allowedIdentifiers = new Set(allow.identifiers);
  let previous = '';
  for (const token of tokenize(text)) {
    const afterModuleKeyword = previous === 'from' || previous === 'import';
    previous = token.kind === 'ident' ? token.text : '';
    if (token.kind === 'ident') {
      if (allowedIdentifiers.has(token.text)) continue;
      const word = bannedIn(token.text, BANNED_WORDS);
      if (word) {
        findings.push({
          rule: 'vocabulary/identifier',
          file,
          line: token.line,
          text: `"${word}" in identifier ${token.text}`,
        });
      }
      if (
        /apiKey/i.test(token.text) &&
        /Token/.test(token.text) &&
        !/^(?:session|csrf|verification)/.test(token.text)
      ) {
        findings.push({
          rule: 'vocabulary/api-key-token',
          file,
          line: token.line,
          text: `API keys are keys, not tokens: ${token.text}`,
        });
      }
      continue;
    }
    if (afterModuleKeyword) continue; // module specifier
    const isUi = UI_PATH.test(file);
    const isRoute = ROUTE_STRING.test(token.text);
    if (!isUi && !isRoute) continue;
    let lowered = token.text.toLowerCase();
    for (const phrase of allow.phrases) lowered = lowered.split(phrase).join(' ');
    const bannedWord = (lowered.match(/[a-z]+/g) ?? []).find((word) => BANNED_WORDS.has(word));
    if (bannedWord) {
      findings.push({
        rule: isRoute ? 'vocabulary/route' : 'vocabulary/ui-string',
        file,
        line: token.line,
        text: `"${bannedWord}" in ${JSON.stringify(token.text.slice(0, 60))}`,
      });
    }
  }
  return findings;
}

export interface DbNames {
  tables: Array<{ table: string; names: string[] }>;
}

/** Table, column, constraint and index names of every table exported from the schema. */
export function schemaNames(source: Record<string, unknown> = schema): DbNames {
  const tables: DbNames['tables'] = [];
  for (const value of Object.values(source)) {
    if (!value || typeof value !== 'object' || !('getSQL' in value)) continue;
    let config: ReturnType<typeof getTableConfig>;
    try {
      config = getTableConfig(value as PgTable);
    } catch {
      continue;
    }
    const names = [
      ...config.columns.map((column) => column.name),
      ...config.checks.map((check) => check.name),
      ...config.uniqueConstraints.map((unique) => unique.name).filter((n): n is string => !!n),
      ...config.foreignKeys.map((fk) => fk.getName()),
      ...config.indexes.map((index) => index.config.name).filter((n): n is string => !!n),
      ...config.primaryKeys.map((pk) => pk.getName()),
    ];
    tables.push({ table: config.name, names });
  }
  return { tables };
}

export function checkDbNames(db: DbNames, allowed: readonly string[] = []): Finding[] {
  const findings: Finding[] = [];
  const allowedNames = new Set(allowed);
  for (const { table, names } of db.tables) {
    for (const name of [table, ...names]) {
      if (allowedNames.has(name)) continue;
      const word = bannedIn(name, BANNED_DB_WORDS);
      if (word) {
        findings.push({
          rule: 'vocabulary/database',
          file: `table ${table}`,
          line: 1,
          text: `"${word}" in database name ${name}`,
        });
      }
    }
  }
  return findings;
}

export function run(root: string): Finding[] {
  const allow = loadAllow(root);
  const findings: Finding[] = [];
  for (const file of repoFiles(root)) {
    findings.push(...checkPath(file, allow));
    if (SOURCE_EXTENSIONS.test(file)) {
      findings.push(...checkSource(file, readText(root, file), allow));
    }
  }
  findings.push(...checkDbNames(schemaNames(), allow.databaseNames));
  return findings;
}
