/**
 * Repository check: Kubernetes manifests carry no SQL.
 *
 * The schema comes from `packages/db/migrations`, applied by `pnpm db:migrate` from the release
 * image. A manifest that embeds DDL or names a migration file that does not exist there is a
 * second, unreviewed copy of the schema that drifts from the Drizzle journal.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './scan.js';
import { repoFiles } from './scan.js';

const DDL = /\b(?:CREATE|ALTER|DROP)\s+(?:TABLE|ROLE|POLICY|INDEX|SCHEMA|EXTENSION)\b/i;
const GRANT = /\bGRANT\s+[A-Z, ]+\s+ON\b/;
const MIGRATION_NAME = /\b\d{4}_[a-z0-9_]+\.sql\b/g;

export function checkManifest(
  file: string,
  text: string,
  migrationFiles: ReadonlySet<string>,
): Finding[] {
  const findings: Finding[] = [];
  text.split(/\r?\n/).forEach((content, index) => {
    const report = (rule: string, message: string) =>
      findings.push({ rule, file, line: index + 1, text: message });
    if (DDL.test(content) || GRANT.test(content)) {
      report('manifest-sql/embedded-sql', 'a manifest must not embed SQL; run pnpm db:migrate');
    }
    for (const name of content.match(MIGRATION_NAME) ?? []) {
      if (!migrationFiles.has(name)) {
        report('manifest-sql/unknown-migration', `${name} is not in packages/db/migrations`);
      }
    }
  });
  return findings;
}

export function run(root: string): Finding[] {
  const directory = join(root, 'packages/db/migrations');
  const migrations = new Set(
    existsSync(directory) ? readdirSync(directory).filter((name) => name.endsWith('.sql')) : [],
  );
  return repoFiles(root)
    .filter((file) => /^k8s\/.*\.ya?ml$/.test(file) && !file.includes('migration'))
    .flatMap((file) => checkManifest(file, readFileSync(join(root, file), 'utf8'), migrations));
}
