/**
 * Repository check: naming conventions.
 *
 * - Files and folders are kebab-case (React component files are PascalCase under pages, components
 *   and layouts).
 * - Database tables, columns and constraints are snake_case; tables are singular.
 * - JSON field names in the shared contracts are camelCase.
 * - URL templates use plural kebab-case collection segments.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as z from 'zod/v4';
import * as contracts from '../../packages/contracts/src/index.js';
import { repoFiles, readText, type Finding } from './scan.js';
import { schemaNames, type DbNames } from './vocabulary.js';

export interface NamingAllow {
  /** Files exempt from the file name rule, as regular expression sources. */
  files: string[];
  /** URL segments that are singular on purpose. */
  singularSegments: string[];
  /** JSON field names that are not camelCase on purpose. */
  jsonFields: string[];
}

const SCANNED_ROOTS = ['apps/', 'packages/', 'scripts/', 'tests/', 'fixtures/'];
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SNAKE = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const CAMEL = /^[a-z][A-Za-z0-9]*$/;
const COMPONENT_FILE =
  /^apps\/(?:web|admin)\/client\/src\/(?:pages|components|layouts)\/(?:.*\/)?[A-Z][A-Za-z0-9]*(?:\.[a-z.]+)?\.tsx$/;
// The .NET SDK follows .NET file and folder naming (PascalCase), not the kebab-case of the TypeScript code.
const SKIPPED = [
  /^packages\/sdk-dotnet\//,
  /\/migrations\//,
  /\/node_modules\//,
  /\/dist\//,
  /package-lock\.json$/,
];
const ALLOWED_FILES = new Set([
  'README.md',
  'CHANGELOG.md',
  'SECURITY.md',
  'CLAUDE.md',
  'AGENTS.md',
  'Dockerfile',
]);
const URL_PARAM = /^(?::[A-Za-z][A-Za-z0-9]*|\{[A-Za-z][A-Za-z0-9]*\})$/;

export function loadAllow(root: string): NamingAllow {
  return JSON.parse(
    readFileSync(join(root, 'scripts/checks/naming.allow.json'), 'utf8'),
  ) as NamingAllow;
}

export function checkFileName(file: string, allow: NamingAllow): Finding[] {
  if (!SCANNED_ROOTS.some((prefix) => file.startsWith(prefix))) return [];
  if (SKIPPED.some((pattern) => pattern.test(file))) return [];
  if (allow.files.some((source) => new RegExp(source).test(file))) return [];
  if (COMPONENT_FILE.test(file)) return [];
  const findings: Finding[] = [];
  for (const segment of file.split('/')) {
    if (ALLOWED_FILES.has(segment) || segment.startsWith('.') || segment === '__fixtures__') {
      continue;
    }
    const base = segment.split('.')[0] ?? '';
    if (!KEBAB.test(base)) {
      findings.push({ rule: 'naming/file', file, line: 1, text: `"${segment}" is not kebab-case` });
    }
  }
  return findings;
}

export function checkDbNaming(db: DbNames): Finding[] {
  const findings: Finding[] = [];
  for (const { table, names } of db.tables) {
    if (!SNAKE.test(table)) {
      findings.push({
        rule: 'naming/database',
        file: `table ${table}`,
        line: 1,
        text: 'table name is not snake_case',
      });
    } else if (table.endsWith('s')) {
      findings.push({
        rule: 'naming/database',
        file: `table ${table}`,
        line: 1,
        text: 'table name must be singular',
      });
    }
    for (const name of names) {
      if (!SNAKE.test(name)) {
        findings.push({
          rule: 'naming/database',
          file: `table ${table}`,
          line: 1,
          text: `${name} is not snake_case`,
        });
      }
    }
  }
  return findings;
}

function collectFields(schema: unknown, found: Set<string>, depth = 0): void {
  if (!schema || typeof schema !== 'object' || depth > 12) return;
  const node = schema as Record<string, unknown>;
  const properties = node['properties'];
  if (properties && typeof properties === 'object') {
    for (const [name, child] of Object.entries(properties)) {
      found.add(name);
      collectFields(child, found, depth + 1);
    }
  }
  for (const key of ['items', 'additionalProperties', 'not'])
    collectFields(node[key], found, depth + 1);
  for (const key of ['anyOf', 'oneOf', 'allOf', 'prefixItems']) {
    const list = node[key];
    if (Array.isArray(list)) for (const child of list) collectFields(child, found, depth + 1);
  }
  const defs = node['$defs'];
  if (defs && typeof defs === 'object') {
    for (const child of Object.values(defs)) collectFields(child, found, depth + 1);
  }
}

/** Names of every JSON property of every exported contract schema. */
export function contractFields(source: Record<string, unknown> = contracts): Set<string> {
  const found = new Set<string>();
  for (const value of Object.values(source)) {
    if (!value || typeof value !== 'object' || !('_zod' in value)) continue;
    try {
      collectFields(
        z.toJSONSchema(value as z.ZodType, { unrepresentable: 'any', io: 'input' }),
        found,
      );
    } catch {
      // schemas that cannot be represented are skipped
    }
  }
  return found;
}

export function checkJsonFields(fields: Set<string>, allow: NamingAllow): Finding[] {
  return [...fields]
    .filter((name) => !CAMEL.test(name) && !allow.jsonFields.includes(name))
    .sort()
    .map((name) => ({
      rule: 'naming/json-field',
      file: 'packages/contracts',
      line: 1,
      text: `JSON field "${name}" is not camelCase`,
    }));
}

export function checkUrlTemplate(
  path: string,
  allow: NamingAllow,
  file = 'url',
  line = 1,
): Finding[] {
  const findings: Finding[] = [];
  const segments = path.split('?')[0]!.split('/').filter(Boolean);
  for (const segment of segments) {
    if (URL_PARAM.test(segment) || /^v\d+$/.test(segment) || segment === 'api') continue;
    if (segment.includes('.')) continue; // static asset
    if (!/^[a-z]+(?:-[a-z]+)*$/.test(segment)) {
      findings.push({
        rule: 'naming/url',
        file,
        line,
        text: `"${segment}" in ${path} is not lower-case kebab-case`,
      });
      continue;
    }
    const last = segment.split('-').pop() ?? segment;
    if (!allow.singularSegments.includes(segment) && !last.endsWith('s')) {
      findings.push({
        rule: 'naming/url',
        file,
        line,
        text: `"${segment}" in ${path} is not a plural collection`,
      });
    }
  }
  return findings;
}

const ROUTE_CALL =
  /\b(?:app|sub)\.(?:get|post|put|patch|delete)\(\s*(?:\n\s*)?['"`](\/[^'"`]*)['"`]/g;

export function checkRouteFile(file: string, text: string, allow: NamingAllow): Finding[] {
  const findings: Finding[] = [];
  for (const match of text.matchAll(ROUTE_CALL)) {
    const line = text.slice(0, match.index).split('\n').length;
    findings.push(...checkUrlTemplate(match[1]!, allow, file, line));
  }
  return findings;
}

const ROUTE_FILES = /^apps\/(?:api|web\/server)\/src\/(?:routes\/)?[a-z-]+\.ts$/;

export function run(root: string): Finding[] {
  const allow = loadAllow(root);
  const findings: Finding[] = [];
  for (const file of repoFiles(root)) {
    findings.push(...checkFileName(file, allow));
    if (ROUTE_FILES.test(file) && !file.endsWith('.test.ts')) {
      findings.push(...checkRouteFile(file, readText(root, file), allow));
    }
  }
  const names = schemaNames();
  findings.push(...checkDbNaming(names));
  findings.push(...checkJsonFields(contractFields(), allow));
  return findings;
}
