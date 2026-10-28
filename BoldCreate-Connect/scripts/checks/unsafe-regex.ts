/**
 * Repository check: regular expressions in source must not backtrack catastrophically.
 *
 * Every regular expression literal and `new RegExp('<literal>')` is run through `safe-regex2`;
 * `new RegExp(<non-literal>)` is banned because its pattern cannot be checked.
 */
import safeRegex from 'safe-regex2';
import type { Finding } from './scan.js';
import { parseSource, productionSources, readSource, walk, type AstNode } from './source-scan.js';

const SCOPE = [/^apps\/.*\/src\//, /^packages\/[^/]+\/src\//];

const isRegExpCallee = (callee: unknown): boolean =>
  (callee as AstNode | undefined)?.type === 'Identifier' &&
  (callee as AstNode)['name'] === 'RegExp';

export function checkSource(file: string, text: string): Finding[] {
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];
  const add = (node: AstNode, message: string) =>
    findings.push({ rule: 'regex/unsafe', file, line: lineOf(node.start), text: message });

  walk(program, (node) => {
    const regex = node['regex'] as { pattern: string } | undefined;
    if (node.type === 'Literal' && regex) {
      if (!safeRegex(regex.pattern)) add(node, `/${regex.pattern}/ can backtrack catastrophically`);
      return;
    }
    if (
      (node.type === 'NewExpression' || node.type === 'CallExpression') &&
      isRegExpCallee(node['callee'])
    ) {
      const first = (node['arguments'] as AstNode[])[0];
      if (first?.type === 'Literal' && typeof first['value'] === 'string') {
        if (!safeRegex(first['value'])) add(node, `RegExp pattern can backtrack catastrophically`);
      } else {
        add(node, 'RegExp built from a non-literal cannot be checked');
      }
    }
  });
  return findings;
}

export function run(root: string): Finding[] {
  return productionSources(root, SCOPE).flatMap((file) =>
    checkSource(file, readSource(root, file)),
  );
}
