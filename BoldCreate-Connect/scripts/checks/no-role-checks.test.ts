import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './no-role-checks.js';

const root = resolve(import.meta.dirname, '../..');

describe('no role checks', () => {
  it.each([
    "if (role === 'OWNER') {}",
    "if (member.role !== 'ADMIN') {}",
    "if ('MEMBER' == role) {}",
    'if (principal.orgRole === other) {}',
    'if (orgRole != null) {}',
    "const ok = myRole === 'VIEWER';",
  ])('flags %s', (code) => {
    const findings = checkSource('apps/api/src/routes/x.ts', code);
    expect(findings).toHaveLength(1);
    expect(findings[0]?.rule).toBe('permissions/role-comparison');
    expect(findings[0]?.line).toBe(1);
  });

  it('accepts code that asks for an action and code that only carries roles as data', () => {
    const code = [
      "requireAction(principal, 'org:delete', { orgId });",
      "const row = { role: 'OWNER' };",
      'const badge = ROLE_BADGE[member.role];',
      'if (a === b) {}',
      "if (status === 'ADMINISTERED') {}",
    ].join('\n');
    expect(checkSource('apps/api/src/routes/x.ts', code)).toEqual([]);
  });

  it('reports the line of each comparison', () => {
    const code = "const a = 1;\n\nif (x.orgRole === 'OWNER') {}\n";
    expect(checkSource('apps/api/src/x.ts', code).map((finding) => finding.line)).toEqual([3]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
