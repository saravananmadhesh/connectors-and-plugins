import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const repoRoot = join(import.meta.dirname, '..');

const SERVICE_DIST_FILES = [
  'apps/api/dist/index.js',
  'apps/gateway/dist/index.js',
  'apps/worker/dist/index.js',
  'apps/admin/dist/index.js',
  'apps/web/server/dist/index.js',
];

describe('standalone service distributions', () => {
  it('bundles workspace dependencies into dist/index.js so packages/ is not required at runtime', () => {
    for (const distFile of SERVICE_DIST_FILES) {
      const fullPath = join(repoRoot, distFile);
      expect(existsSync(fullPath)).toBe(true);
      const content = readFileSync(fullPath, 'utf8');
      expect(content).not.toMatch(/from\s+['"]@boldcreate-integrations\//);
      expect(content).not.toMatch(/require\(['"]@boldcreate-integrations\//);
    }
  });
});
