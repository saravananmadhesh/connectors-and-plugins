import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ROUTES } from '@boldcreate-integrations/contracts';
import { compareRoutes } from '@boldcreate-integrations/http-server';
import { bffRegistry } from './proxy.js';
import { buildTestWeb, type TestWeb } from './test-support.js';

let web: TestWeb | undefined;

afterEach(async () => {
  await web?.server.close();
  web = undefined;
});

describe('web routes', () => {
  it('serve the browser-facing registry under /api plus the entries of the web server', async () => {
    web = await buildTestWeb({ CLIENT_DIST_DIR: join(tmpdir(), 'does-not-exist-web') });
    const entries = [
      ...bffRegistry(),
      ...ROUTES.filter((route) => route.app === 'web' || route.app === 'all'),
    ];
    expect(entries.some((route) => route.pathTemplate.startsWith('/api/v1/'))).toBe(true);
    expect(compareRoutes(web.server.routes(), entries)).toEqual({ missing: [], unexpected: [] });
  });
});
