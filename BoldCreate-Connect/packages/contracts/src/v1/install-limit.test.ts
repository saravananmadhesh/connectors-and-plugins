import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { InstallPluginsBodySchema, MAX_INSTALL_PATHS } from './plugin-sources.js';

describe('install limit', () => {
  it('is the most folders one install request accepts', () => {
    const base = { owner: 'acme', repository: 'plugins' };
    const paths = (count: number) => Array.from({ length: count }, (_, index) => `p${index}`);
    expect(
      InstallPluginsBodySchema.safeParse({ ...base, paths: paths(MAX_INSTALL_PATHS) }).success,
    ).toBe(true);
    expect(
      InstallPluginsBodySchema.safeParse({ ...base, paths: paths(MAX_INSTALL_PATHS + 1) }).success,
    ).toBe(false);
  });

  it('is the same number the admin client uses to cap its selection', () => {
    const client = readFileSync(
      new URL('../../../../apps/admin/client/src/lib/discover.ts', import.meta.url),
      'utf8',
    );
    expect(client).toContain(`export const MAX_INSTALL_PATHS = ${MAX_INSTALL_PATHS};`);
  });
});
