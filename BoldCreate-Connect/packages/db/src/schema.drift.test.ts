import { describe, it, expect } from 'vitest';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../../..');

function drizzleKit(args: string[], cwd: string) {
  return spawnSync(
    process.execPath,
    [path.join(root, 'node_modules/drizzle-kit/bin.cjs'), ...args],
    { cwd, encoding: 'utf8' },
  );
}

describe('schema drift', () => {
  it('keeps the Drizzle schema and the committed migrations in agreement', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'schema-drift-'));
    try {
      cpSync(path.join(root, 'packages/db/migrations'), path.join(dir, 'migrations'), {
        recursive: true,
      });
      const schema = path.join(root, 'packages/db/src/schema/index.ts').split(path.sep).join('/');
      writeFileSync(
        path.join(dir, 'drizzle.config.ts'),
        `export default { dialect: 'postgresql', schema: '${schema}', out: './migrations' };\n`,
      );

      const check = drizzleKit(['check', '--config', 'drizzle.config.ts'], dir);
      expect({ status: check.status, output: check.stdout + check.stderr }).toMatchObject({
        status: 0,
      });

      const generate = drizzleKit(
        ['generate', '--name', 'noop', '--config', 'drizzle.config.ts'],
        dir,
      );
      expect({ status: generate.status, output: generate.stdout + generate.stderr }).toMatchObject({
        status: 0,
      });
      expect(generate.stdout + generate.stderr).toMatch(/nothing to migrate/i);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }, 60_000);
});
