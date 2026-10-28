import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkManifest, run } from './manifest-sql.js';

const root = resolve(import.meta.dirname, '../..');
const known = new Set(['0000_baseline.sql']);

describe('no SQL in manifests', () => {
  it.each([
    '    CREATE TABLE "session" (',
    '    alter table user add column x int;',
    '    GRANT SELECT ON user TO app_api;',
  ])('flags %s', (line) => {
    expect(checkManifest('k8s/x.yaml', line, known).map((f) => f.rule)).toEqual([
      'manifest-sql/embedded-sql',
    ]);
  });

  it('flags a migration file that is not in the migrations folder', () => {
    const findings = checkManifest('k8s/x.yaml', '0009_made_up.sql: |', known);
    expect(findings).toEqual([
      {
        rule: 'manifest-sql/unknown-migration',
        file: 'k8s/x.yaml',
        line: 1,
        text: '0009_made_up.sql is not in packages/db/migrations',
      },
    ]);
  });

  it('accepts a real migration name and ordinary manifests', () => {
    expect(checkManifest('k8s/x.yaml', 'file: 0000_baseline.sql\nkind: Job', known)).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
