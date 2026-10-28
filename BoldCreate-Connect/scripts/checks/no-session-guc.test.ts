import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkSource, run } from './no-session-guc.js';

const root = resolve(import.meta.dirname, '../..');

describe('no session-level settings', () => {
  it.each([
    "sql`SELECT set_config('app.tenant', ${orgId}, false)`",
    "sql`SELECT set_config('app.tenant', ${orgId})`",
    'await client.query("SELECT set_config(\'app.user\', $1, false)", [id])',
    'await client.query("SET app.tenant = \'x\'")',
    'await client.query("SET SESSION app.user = \'x\'")',
  ])('flags %s', (code) => {
    const findings = checkSource('apps/api/src/x.ts', code);
    expect(findings.map((f) => f.rule)).toContain('guc/session-level');
  });

  it.each([
    "sql`SELECT set_config('app.tenant', ${orgId ?? ''}, true)`",
    "sql`SELECT set_config('app.tenant', ${f(a, b)}, true), set_config('app.user', ${u}, true)`",
    'await client.query("SET LOCAL app.tenant = \'x\'")',
    "const doc = 'SET something else'",
  ])('accepts %s', (code) => {
    expect(checkSource('apps/api/src/x.ts', code)).toEqual([]);
  });

  it('flags a call whose argument list never closes', () => {
    expect(checkSource('apps/api/src/x.ts', "set_config('app.tenant', 'x'").length).toBe(1);
  });

  it('lets only withMaintenance write the maintenance setting', () => {
    const code = "sql`SELECT set_config('app.maintenance', ${purpose}, true)`";
    expect(checkSource('packages/db/src/maintenance.ts', code)).toEqual([]);
    const findings = checkSource('apps/worker/src/x.ts', code);
    expect(findings.map((f) => f.rule)).toEqual(['guc/maintenance-writer']);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
