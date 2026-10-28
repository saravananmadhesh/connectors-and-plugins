/**
 * Repository lint: runs every check in scripts/checks and exits non-zero on any finding.
 */
import { resolve } from 'node:path';
import { formatFinding, type Finding } from './checks/scan.js';
import { run as runNaming } from './checks/naming.js';
import { run as runVocabulary } from './checks/vocabulary.js';
import { run as runRuntimeBans } from './checks/runtime-bans.js';
import { run as runUnsafeRegex } from './checks/unsafe-regex.js';
import { run as runArchitecture } from './checks/architecture.js';
import { run as runNoRoleChecks } from './checks/no-role-checks.js';
import { run as runKmsUsage } from './checks/kms-usage.js';
import { run as runCacheKeys } from './checks/cache-keys.js';
import { run as runNoSessionGuc } from './checks/no-session-guc.js';
import { run as runSingleResolver } from './checks/single-resolver.js';
import { run as runMigrationLint } from './checks/migration-lint.js';
import { run as runManifestSql } from './checks/manifest-sql.js';
import { run as runManifestWorkloads } from './checks/manifest-workloads.js';

const root = resolve(import.meta.dirname, '..');
const findings: Finding[] = [
  ...runVocabulary(root),
  ...runNaming(root),
  ...runRuntimeBans(root),
  ...runUnsafeRegex(root),
  ...runArchitecture(root),
  ...runNoRoleChecks(root),
  ...runKmsUsage(root),
  ...runCacheKeys(root),
  ...runNoSessionGuc(root),
  ...runSingleResolver(root),
  ...runMigrationLint(root),
  ...runManifestSql(root),
  ...runManifestWorkloads(root),
];

for (const finding of findings) process.stdout.write(`${formatFinding(finding)}\n`);
if (findings.length > 0) {
  process.stdout.write(`lint-repo: ${findings.length} finding(s)\n`);
  process.exit(1);
}
process.stdout.write('lint-repo: clean\n');
