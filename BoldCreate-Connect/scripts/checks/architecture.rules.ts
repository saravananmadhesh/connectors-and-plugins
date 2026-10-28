/**
 * Dependency-direction rules as data. Keys are importer units, values are the workspace packages
 * (names without the scope) the unit may import. A row for a package that does not exist yet is
 * allowed; an existing package without a row fails the check.
 */
export const PACKAGE_SCOPE = '@boldcreate-integrations/';

export const APP_UNIT = 'apps/*';

export const ARCHITECTURE_RULES: Readonly<Record<string, readonly string[]>> = {
  [APP_UNIT]: [
    'contracts',
    'config',
    'observability',
    'http-server',
    'security',
    'credentials',
    'ports',
    'adapters',
    'db',
    'domain',
    'limits',
    'plugin-kinds',
    'oauth',
  ],
  'apps/web/client': ['contracts'],
  'apps/admin/client': ['contracts'],
  'packages/domain': [
    'contracts',
    'db',
    'ports',
    'credentials',
    'limits',
    'security',
    'observability',
    'plugin-kinds',
  ],
  'packages/adapters': ['ports', 'contracts', 'config', 'observability', 'db'],
  'packages/ports': [],
  'packages/contracts': [],
  'packages/config': [],
  'packages/security': [],
  'packages/limits': ['contracts'],
  'packages/credentials': ['ports', 'contracts'],
  'packages/db': ['contracts', 'observability'],
  'packages/observability': [],
  'packages/http-server': ['contracts', 'config', 'observability', 'security', 'ports'],
  'packages/plugin-kinds': ['contracts'],
  'packages/oauth': ['contracts', 'security', 'ports'],
  'packages/sdk': ['contracts'],
  'packages/cli': ['contracts', 'sdk'],
};

/** Units whose runtime imports of these packages must be `import type`. */
export const TYPE_ONLY_UNITS: Readonly<Record<string, readonly string[]>> = {
  'apps/web/client': ['contracts'],
  'apps/admin/client': ['contracts'],
};

/** Barrel files allowed below a `src` subfolder. */
export const BARREL_ALLOW: readonly string[] = ['packages/db/src/schema/index.ts'];

/**
 * Individual files that may import a package their unit's row does not list. Each entry goes away
 * when the code it covers is replaced.
 */
export const IMPORT_EXCEPTIONS: Readonly<Record<string, readonly string[]>> = {
  // Test support that runs sealing against the local key management adapter and a fake clock.
  'packages/credentials/src/org-key-fixture.ts': ['adapters'],
};
