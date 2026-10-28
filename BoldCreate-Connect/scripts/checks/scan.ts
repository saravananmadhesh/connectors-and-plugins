/**
 * Shared helpers for repository checks: findings, file listing and a small source tokenizer.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Finding {
  rule: string;
  file: string;
  line: number;
  text: string;
}

export function formatFinding(finding: Finding): string {
  return `${finding.rule} ${finding.file}:${finding.line} ${finding.text}`;
}

/** Files known to git (tracked, or untracked and not ignored) that still exist on disk. */
export function repoFiles(root: string): string[] {
  const out = execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
    {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 1 << 26,
    },
  );
  return [...new Set(out.split('\0').filter(Boolean))].filter((file) =>
    existsSync(join(root, file)),
  );
}

export function readText(root: string, file: string): string {
  return readFileSync(join(root, file), 'utf8');
}

export interface Token {
  kind: 'ident' | 'string';
  text: string;
  line: number;
}

const IDENT_START = /[A-Za-z_$]/;
const IDENT_PART = /[A-Za-z0-9_$]/;

/** Splits source text into identifiers and string literals; comments are dropped. */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let line = 1;
  let i = 0;
  while (i < text.length) {
    const ch = text[i]!;
    const next = text[i + 1];
    if (ch === '\n') {
      line += 1;
      i += 1;
    } else if (ch === '/' && next === '/') {
      while (i < text.length && text[i] !== '\n') i += 1;
    } else if (ch === '/' && next === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) {
        if (text[i] === '\n') line += 1;
        i += 1;
      }
      i += 2;
    } else if (ch === '"' || ch === "'" || ch === '`') {
      const start = line;
      let value = '';
      i += 1;
      while (i < text.length && text[i] !== ch) {
        if (text[i] === '\\') {
          value += text[i + 1] ?? '';
          i += 2;
          continue;
        }
        if (text[i] === '\n') {
          line += 1;
          if (ch !== '`') break;
        }
        value += text[i];
        i += 1;
      }
      i += 1;
      tokens.push({ kind: 'string', text: value, line: start });
    } else if (IDENT_START.test(ch)) {
      let j = i + 1;
      while (j < text.length && IDENT_PART.test(text[j]!)) j += 1;
      tokens.push({ kind: 'ident', text: text.slice(i, j), line });
      i = j;
    } else {
      i += 1;
    }
  }
  return tokens;
}

/** Splits an identifier, file name or path segment into lower-case words. */
export function words(name: string): string[] {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}
