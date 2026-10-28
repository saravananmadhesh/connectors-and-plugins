/**
 * `pnpm db:generate`: runs `drizzle-kit generate` and pins the hash of every new migration file.
 * Existing pins are never rewritten, so editing a committed migration stays a lint failure.
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { recordMigrationHashes } from './checks/migration-lint.js';

const root = resolve(import.meta.dirname, '..');
const generate = spawnSync('pnpm', ['exec', 'drizzle-kit', 'generate', ...process.argv.slice(2)], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
if (generate.status !== 0) process.exit(generate.status ?? 1);

const added = recordMigrationHashes({ root });
process.stdout.write(
  added.length > 0
    ? `db:generate: pinned ${added.join(', ')}\n`
    : 'db:generate: no new migration\n',
);
