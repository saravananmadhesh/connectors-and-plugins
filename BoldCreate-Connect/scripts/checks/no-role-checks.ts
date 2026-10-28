/**
 * Repository check: no role checks outside the permission module.
 *
 * Who may do what is decided by `authorize` and its matrix. Code that compares a role to a role
 * name, or reads `orgRole` in a comparison, is making a decision on its own and
 * gets out of step with the matrix. Contracts, the schema and the permission module are the only
 * places that name roles.
 */
import type { Finding } from './scan.js';
import { parseSource, productionSources, readSource, walk, type AstNode } from './source-scan.js';

const ROLE_NAMES = new Set(['OWNER', 'ADMIN', 'MEMBER', 'VIEWER']);
const ROLE_PROPERTIES = new Set(['orgRole']);
const COMPARISONS = new Set(['===', '!==', '==', '!=']);

const SCOPE = [/^apps\//, /^packages\//];
const EXEMPT = [
  /^packages\/domain\/src\/permissions\//,
  /^packages\/contracts\//,
  /^packages\/db\//,
  /^packages\/ports\//,
  /\/src\/test\//,
];

function isRoleLiteral(node: unknown): boolean {
  const candidate = node as AstNode | undefined;
  return (
    candidate?.type === 'Literal' &&
    typeof candidate['value'] === 'string' &&
    ROLE_NAMES.has(candidate['value'])
  );
}

function namesRoleProperty(node: unknown): boolean {
  const candidate = node as AstNode | undefined;
  if (!candidate) return false;
  if (candidate.type === 'Identifier') return ROLE_PROPERTIES.has(candidate['name'] as string);
  if (candidate.type === 'MemberExpression') {
    return namesRoleProperty(candidate['property']);
  }
  return false;
}

export function checkSource(file: string, text: string): Finding[] {
  const { program, lineOf } = parseSource(file, text);
  const findings: Finding[] = [];
  walk(program, (node) => {
    if (node.type !== 'BinaryExpression' || !COMPARISONS.has(node['operator'] as string)) return;
    const { left, right } = node as unknown as { left: unknown; right: unknown };
    if (isRoleLiteral(left) || isRoleLiteral(right)) {
      findings.push({
        rule: 'permissions/role-comparison',
        file,
        line: lineOf(node.start),
        text: 'compares a role name; ask authorize for the action instead',
      });
    } else if (namesRoleProperty(left) || namesRoleProperty(right)) {
      findings.push({
        rule: 'permissions/role-comparison',
        file,
        line: lineOf(node.start),
        text: 'compares orgRole; ask authorize for the action instead',
      });
    }
  });
  return findings;
}

export function run(root: string): Finding[] {
  return productionSources(root, SCOPE)
    .filter((file) => !EXEMPT.some((pattern) => pattern.test(file)))
    .flatMap((file) => checkSource(file, readSource(root, file)));
}
