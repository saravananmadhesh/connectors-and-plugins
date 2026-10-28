/**
 * Repository check: app code of the api and the worker does not call `unwrapKey`.
 *
 * The api and the worker never call the key management port to read a key back. The api opens
 * sealed values only through the credentials package (an unsealer bound to the key cache); the
 * worker only wraps a freshly generated key.
 */
import type { Finding } from './scan.js';
import { parseSource, productionSources, readSource, walk } from './source-scan.js';

const SCOPE = [/^apps\/api\//, /^apps\/worker\//];

export function checkSource(file: string, text: string): Finding[] {
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];
  walk(program, (node) => {
    if (node.type === 'Identifier' && node['name'] === 'unwrapKey') {
      findings.push({
        rule: 'kms/unwrap-outside-readers',
        file,
        line: lineOf(node.start),
        text: 'unwrapKey is not called directly in the api or the worker; use the credentials package',
      });
    }
  });
  return findings;
}

export function run(root: string): Finding[] {
  return productionSources(root, SCOPE).flatMap((file) =>
    checkSource(file, readSource(root, file)),
  );
}
