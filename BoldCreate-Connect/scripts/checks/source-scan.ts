/**
 * Shared helpers for checks that need the syntax tree: parsing with oxc and walking nodes.
 */
import { parseSync } from 'oxc-parser';
import { readText, repoFiles } from './scan.js';

export interface AstNode {
  type: string;
  start: number;
  [key: string]: unknown;
}

/** Calls `visit` for every node of the tree, depth first. */
export function walk(node: unknown, visit: (node: AstNode) => void): void {
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  if (node === null || typeof node !== 'object') return;
  const candidate = node as AstNode;
  if (typeof candidate.type === 'string') visit(candidate);
  for (const [key, value] of Object.entries(candidate)) {
    if (key !== 'parent' && typeof value === 'object') walk(value, visit);
  }
}

export interface ParsedSource {
  program: unknown;
  lineOf(offset: number): number;
}

export function parseSource(file: string, text: string): ParsedSource {
  const { program } = parseSync(file, text);
  const lineStarts = [0];
  for (let i = 0; i < text.length; i += 1) if (text[i] === '\n') lineStarts.push(i + 1);
  return {
    program,
    lineOf(offset) {
      let low = 0;
      let high = lineStarts.length - 1;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if ((lineStarts[mid] as number) <= offset) low = mid;
        else high = mid - 1;
      }
      return low + 1;
    },
  };
}

const TEST_FILE = /\.(?:[a-z0-9]+\.)?test\.tsx?$|\.contract\.ts$|\/testing\.ts$|\/fixtures\//;
const SOURCE_FILE = /\.(?:ts|tsx|mts)$/;

/** Tracked source files under the given roots, excluding tests, helpers and `scripts` folders. */
export function productionSources(root: string, roots: readonly RegExp[]): string[] {
  return repoFiles(root).filter(
    (file) =>
      SOURCE_FILE.test(file) &&
      !TEST_FILE.test(file) &&
      !file.includes('/scripts/') &&
      !file.includes('/dist/') &&
      !file.includes('/node_modules/') &&
      roots.some((pattern) => pattern.test(file)),
  );
}

export function readSource(root: string, file: string): string {
  return readText(root, file);
}
