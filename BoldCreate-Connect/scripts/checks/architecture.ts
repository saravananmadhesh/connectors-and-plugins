/**
 * Repository check: dependency direction between apps and packages.
 *
 * Imports of workspace packages must follow the rows in `architecture.rules.ts`; relative imports
 * may not leave their package; no app imports another app; no barrel files below `src` folders;
 * no `require(` and no `__dirname`.
 */
import { posix } from 'node:path';
import type { Finding } from './scan.js';
import { repoFiles } from './scan.js';
import { parseSource, readSource, walk } from './source-scan.js';
import {
  APP_UNIT,
  ARCHITECTURE_RULES,
  BARREL_ALLOW,
  IMPORT_EXCEPTIONS,
  PACKAGE_SCOPE,
  TYPE_ONLY_UNITS,
} from './architecture.rules.js';

export interface ArchitectureOptions {
  rules?: Readonly<Record<string, readonly string[]>>;
  typeOnly?: Readonly<Record<string, readonly string[]>>;
  exceptions?: Readonly<Record<string, readonly string[]>>;
}

interface Unit {
  /** Key of the rules table. */
  rule: string;
  /** Folder that relative imports may not leave. */
  base: string;
  /** Name used in messages. */
  name: string;
}

const SOURCE_FILE = /\.(?:ts|tsx|mts)$/;

/** The unit a source file belongs to, or null for files outside apps and packages. */
export function unitOf(file: string): Unit | null {
  const parts = file.split('/');
  if (parts[0] === 'packages' && parts[1] !== undefined) {
    const base = `packages/${parts[1]}`;
    return { rule: base, base, name: base };
  }
  if (parts[0] === 'apps' && parts[1] !== undefined) {
    if (parts[2] === 'client') {
      const base = `apps/${parts[1]}/client`;
      return { rule: base, base, name: base };
    }
    const base =
      parts[1] === 'web' && parts[2] === 'server' ? 'apps/web/server' : `apps/${parts[1]}`;
    return { rule: APP_UNIT, base, name: `apps/${parts[1]}` };
  }
  return null;
}

interface ImportRef {
  source: string;
  line: number;
  typeOnly: boolean;
}

function collectImports(program: unknown, lineOf: (offset: number) => number): ImportRef[] {
  const refs: ImportRef[] = [];
  walk(program, (node) => {
    const source = node['source'] as { value?: unknown } | null | undefined;
    if (
      (node.type === 'ImportDeclaration' ||
        node.type === 'ExportAllDeclaration' ||
        node.type === 'ExportNamedDeclaration' ||
        node.type === 'ImportExpression') &&
      typeof source?.value === 'string'
    ) {
      const specifiers = (node['specifiers'] as { importKind?: string }[] | undefined) ?? [];
      const typeOnly =
        node['importKind'] === 'type' ||
        node['exportKind'] === 'type' ||
        (node.type === 'ImportDeclaration' &&
          specifiers.length > 0 &&
          specifiers.every((specifier) => specifier.importKind === 'type'));
      refs.push({ source: source.value, line: lineOf(node.start), typeOnly });
    }
  });
  return refs;
}

function finding(rule: string, file: string, line: number, text: string): Finding {
  return { rule: `architecture/${rule}`, file, line, text };
}

function isInside(path: string, base: string): boolean {
  return path === base || path.startsWith(`${base}/`);
}

export function checkSource(
  file: string,
  text: string,
  options: ArchitectureOptions = {},
): Finding[] {
  const unit = unitOf(file);
  if (unit === null) return [];
  const rules = options.rules ?? ARCHITECTURE_RULES;
  const typeOnlyRules = options.typeOnly ?? TYPE_ONLY_UNITS;
  const allowed = rules[unit.rule];
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];

  for (const ref of collectImports(program, lineOf)) {
    const report = (rule: string, detail: string): void => {
      findings.push(finding(rule, file, ref.line, `${unit.name} -> ${ref.source} (${detail})`));
    };
    if (ref.source.startsWith(PACKAGE_SCOPE)) {
      const target = ref.source.slice(PACKAGE_SCOPE.length).split('/')[0] ?? '';
      if (
        allowed !== undefined &&
        !allowed.includes(target) &&
        !(options.exceptions ?? IMPORT_EXCEPTIONS)[file]?.includes(target)
      ) {
        report('direction', `${unit.name} may not import ${target}`);
      } else if (typeOnlyRules[unit.rule]?.includes(target) === true && !ref.typeOnly) {
        report('type-only', `${target} must be imported with import type`);
      }
    } else if (ref.source.startsWith('@/') && unit.rule !== 'apps/web/client') {
      report('alias', '@/ alias is only for the web client');
    } else if (ref.source.startsWith('.')) {
      const resolved = posix.normalize(posix.join(posix.dirname(file), ref.source));
      if (!isInside(resolved, unit.base)) {
        report('relative-escape', 'relative import leaves its package');
      }
    }
  }

  walk(program, (node) => {
    if (node.type === 'Identifier' && node['name'] === '__dirname') {
      findings.push(finding('dirname', file, lineOf(node.start), 'use import.meta.dirname'));
    }
    const callee = node['callee'] as { type?: string; name?: string } | undefined;
    if (
      node.type === 'CallExpression' &&
      callee?.type === 'Identifier' &&
      callee.name === 'require'
    ) {
      findings.push(finding('require', file, lineOf(node.start), 'require() is not allowed'));
    }
  });
  return findings;
}

/** Barrel files: `index.ts` below a `src` subfolder. */
export function checkBarrel(file: string, allow: readonly string[] = BARREL_ALLOW): Finding[] {
  if (!/\/src\/.+\/index\.tsx?$/.test(file) || allow.includes(file)) return [];
  return [finding('barrel', file, 1, 'index.ts barrel files are not allowed below src folders')];
}

/** Package folders that have a manifest but no row in the rules. */
export function checkRows(
  files: readonly string[],
  rules: Readonly<Record<string, readonly string[]>> = ARCHITECTURE_RULES,
): Finding[] {
  const folders = new Set<string>();
  for (const file of files) {
    const match = /^packages\/([^/]+)\/package\.json$/.exec(file);
    if (match?.[1] !== undefined) folders.add(`packages/${match[1]}`);
  }
  return [...folders]
    .filter((folder) => rules[folder] === undefined)
    .sort()
    .map((folder) =>
      finding('missing-row', `${folder}/package.json`, 1, `${folder} has no row in the rules`),
    );
}

/** Source files that package manifests publish as entry points; they may be index files. */
export function exportTargets(root: string, files: readonly string[]): string[] {
  const targets: string[] = [];
  const collect = (value: unknown, dir: string): void => {
    if (typeof value === 'string') targets.push(posix.normalize(posix.join(dir, value)));
    else if (value !== null && typeof value === 'object') {
      for (const child of Object.values(value)) collect(child, dir);
    }
  };
  for (const file of files) {
    if (!/^packages\/[^/]+\/package\.json$/.test(file)) continue;
    const manifest = JSON.parse(readSource(root, file)) as { exports?: unknown };
    collect(manifest.exports, posix.dirname(file));
  }
  return targets;
}

export function run(root: string): Finding[] {
  const files = repoFiles(root);
  const sources = files.filter(
    (file) =>
      SOURCE_FILE.test(file) &&
      /^(?:apps|packages)\//.test(file) &&
      !file.includes('/dist/') &&
      !file.includes('/node_modules/'),
  );
  const barrelAllow = [...BARREL_ALLOW, ...exportTargets(root, files)];
  return [
    ...checkRows(files),
    ...sources.flatMap((file) => [
      ...checkBarrel(file, barrelAllow),
      ...checkSource(file, readSource(root, file)),
    ]),
  ];
}
