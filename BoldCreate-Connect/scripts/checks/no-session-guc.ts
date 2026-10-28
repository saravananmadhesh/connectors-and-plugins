/**
 * Repository check: request-scoped database settings are transaction-local.
 *
 * Row policies read `app.tenant`, `app.user` and `app.maintenance`. A session-level setting would
 * survive on a pooled connection and leak into the next request, so `set_config` must always be
 * called with `true` as its last argument, `SET` must be `SET LOCAL`, and the maintenance setting
 * is only ever written by `withMaintenance`.
 */
import type { Finding } from './scan.js';
import { productionSources, readSource } from './source-scan.js';

const SCOPE = [/^apps\//, /^packages\//];
const MAINTENANCE_WRITER = 'packages/db/src/maintenance.ts';

/** The text between the parentheses of the call that starts at `open`, or null when unbalanced. */
function callArguments(text: string, open: number): string | null {
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    const char = text[i];
    if (char === '(') depth += 1;
    else if (char === ')') {
      depth -= 1;
      if (depth === 0) return text.slice(open + 1, i);
    }
  }
  return null;
}

/** The last argument of a call's argument text, ignoring commas inside brackets and `${...}`. */
function lastArgument(args: string): string {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < args.length; i += 1) {
    const char = args[i];
    if (char === '(' || char === '[' || char === '{') depth += 1;
    else if (char === ')' || char === ']' || char === '}') depth -= 1;
    else if (char === ',' && depth === 0) start = i + 1;
  }
  return args.slice(start).trim();
}

export function checkSource(file: string, text: string): Finding[] {
  const findings: Finding[] = [];
  const lineAt = (offset: number) => text.slice(0, offset).split('\n').length;
  const report = (rule: string, offset: number, message: string) =>
    findings.push({ rule, file, line: lineAt(offset), text: message });

  for (const match of text.matchAll(/set_config\s*\(/g)) {
    const args = callArguments(text, match.index + match[0].length - 1);
    if (args === null || lastArgument(args) !== 'true') {
      report('guc/session-level', match.index, 'set_config must be called with is_local = true');
    }
    if (args?.includes('app.maintenance') && file !== MAINTENANCE_WRITER) {
      report(
        'guc/maintenance-writer',
        match.index,
        'app.maintenance is only set by withMaintenance',
      );
    }
  }
  for (const match of text.matchAll(/\bSET\s+(?!LOCAL\b)(?:SESSION\s+)?app\./gi)) {
    report('guc/session-level', match.index, 'use SET LOCAL for app.* settings');
  }
  return findings;
}

export function run(root: string): Finding[] {
  return productionSources(root, SCOPE).flatMap((file) =>
    checkSource(file, readSource(root, file)),
  );
}
