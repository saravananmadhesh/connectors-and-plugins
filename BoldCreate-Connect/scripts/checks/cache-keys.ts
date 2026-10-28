/**
 * Repository check: cache, lock and limiter calls take a key built by `tenantKey` or `globalKey`
 * (or a variable typed `CacheKey`), and only the redis adapter imports `ioredis`.
 */
import type { Finding } from './scan.js';
import { parseSource, productionSources, readSource, walk, type AstNode } from './source-scan.js';

const SCOPE = [/^apps\//, /^packages\//];
const REDIS_ADAPTER = /^packages\/adapters\/src\/redis\//;

const KEYED_CALLS: Readonly<Record<string, readonly string[]>> = {
  cache: ['get', 'set', 'delete', 'increment'],
  lock: ['acquire'],
  limiter: ['check', 'reset'],
};
const KEY_BUILDERS = new Set(['tenantKey', 'globalKey']);

function nameOf(node: unknown): string | null {
  const candidate = node as AstNode | null;
  if (!candidate) return null;
  if (candidate.type === 'Identifier') return candidate['name'] as string;
  if (candidate.type === 'MemberExpression' && candidate['computed'] === false) {
    return nameOf(candidate['property']);
  }
  return null;
}

function isKeyBuilderCall(node: unknown): boolean {
  const candidate = node as AstNode | null;
  return (
    candidate?.type === 'CallExpression' && KEY_BUILDERS.has(nameOf(candidate['callee']) ?? '')
  );
}

/** Names that are known to hold a `CacheKey`: annotated with it, or assigned from a key builder. */
function cacheKeyNames(program: unknown, text: string): Set<string> {
  const names = new Set<string>();
  walk(program, (node) => {
    if (node.type === 'Identifier') {
      const annotation = node['typeAnnotation'] as
        | { start: number; end: number }
        | null
        | undefined;
      if (annotation && /\bCacheKey\b/.test(text.slice(annotation.start, annotation.end))) {
        names.add(node['name'] as string);
      }
    }
    if (node.type === 'VariableDeclarator' && isKeyBuilderCall(node['init'])) {
      const id = node['id'] as AstNode;
      if (id.type === 'Identifier') names.add(id['name'] as string);
    }
  });
  return names;
}

export function checkSource(file: string, text: string): Finding[] {
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];
  const known = cacheKeyNames(program, text);

  walk(program, (node) => {
    if (node.type === 'ImportDeclaration' && !REDIS_ADAPTER.test(file)) {
      const source = node['source'] as { value?: unknown };
      if (source.value === 'ioredis') {
        findings.push({
          rule: 'cache-keys/ioredis-import',
          file,
          line: lineOf(node.start),
          text: 'ioredis is only imported by the redis adapter',
        });
      }
    }
    if (node.type !== 'CallExpression') return;
    const callee = node['callee'] as AstNode;
    if (callee.type !== 'MemberExpression' || callee['computed'] !== false) return;
    const receiver = nameOf(callee['object']);
    const method = nameOf(callee['property']);
    if (!receiver || !method || !KEYED_CALLS[receiver]?.includes(method)) return;
    const first = (node['arguments'] as AstNode[])[0];
    if (!first) return;
    if (isKeyBuilderCall(first)) return;
    if (first.type === 'Identifier' && known.has(first['name'] as string)) return;
    findings.push({
      rule: 'cache-keys/untyped-key',
      file,
      line: lineOf(node.start),
      text: `${receiver}.${method} needs a key from tenantKey(...) or globalKey(...)`,
    });
  });
  return findings;
}

export function run(root: string): Finding[] {
  return productionSources(root, SCOPE).flatMap((file) =>
    checkSource(file, readSource(root, file)),
  );
}
