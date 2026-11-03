import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { createDashboardServer } from './server.js';

const RUN = 'run-20261103-100000-1';

function fakeController() {
  const calls: string[] = [];
  return {
    calls,
    controller: {
      state: async () => ({ runs: [], active: null }),
      run: () => undefined,
      start: () => ({ ok: true, ids: [] }),
      stop: () => true,
      cancel: (id: string) => {
        calls.push(`cancel ${id}`);
        return id === RUN
          ? { ok: true, requestedAt: 'now' }
          : { ok: false, status: 404, error: 'Unknown run.' };
      },
      forceStop: (id: string) => {
        calls.push(`force ${id}`);
        return { ok: false, status: 409, error: 'Give the run a few seconds to stop by itself.' };
      },
      remove: (id: string) => {
        calls.push(`remove ${id}`);
        return id === RUN
          ? { ok: true, deleted: [id] }
          : { ok: false, status: 409, error: 'That run is going. Cancel it first.' };
      },
      removeFinished: () => {
        calls.push('removeFinished');
        return { ok: true, deleted: [RUN] };
      },
      tests: (
        id: string,
        step: string,
        query: { status?: string; q?: string; offset?: number; limit?: number },
      ) => {
        calls.push(`tests ${id} ${step} ${JSON.stringify(query)}`);
        return id === RUN && step === 'unit'
          ? {
              total: 1,
              matched: 1,
              counts: { passed: 1, failed: 0, skipped: 0 },
              offset: 0,
              items: [],
            }
          : undefined;
      },
      log: async () => undefined,
      report: async () => undefined,
    },
  };
}

async function withServer(
  run: (base: string, fake: ReturnType<typeof fakeController>) => Promise<void>,
) {
  const directory = await mkdtemp(join(tmpdir(), 'viewer-actions-'));
  const fake = fakeController();
  const server = createDashboardServer(directory, fake.controller as never);
  try {
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing server address');
    await run(`http://127.0.0.1:${address.port}`, fake);
  } finally {
    server.close();
    server.closeAllConnections();
    await rm(directory, { recursive: true, force: true });
  }
}

const send = (
  base: string,
  method: string,
  path: string,
  headers: Record<string, string> = {},
  body?: string,
) => fetch(`${base}${path}`, { method, headers, ...(body === undefined ? {} : { body }) });

describe('cancelling a run over http', () => {
  it('needs the same origin and the cancel header', async () => {
    await withServer(async (base, fake) => {
      const path = `/api/tests/runs/${RUN}/cancel`;
      expect((await send(base, 'POST', path)).status).toBe(403);
      expect((await send(base, 'POST', path, { origin: base })).status).toBe(403);
      expect(
        (await send(base, 'POST', path, { 'x-viewer-action': 'cancel-test-run' })).status,
      ).toBe(403);
      expect(
        (
          await send(base, 'POST', path, {
            origin: 'http://evil.example',
            'x-viewer-action': 'cancel-test-run',
          })
        ).status,
      ).toBe(403);
      // The header of another action does not do.
      expect(
        (await send(base, 'POST', path, { origin: base, 'x-viewer-action': 'run-tests' })).status,
      ).toBe(403);
      expect(fake.calls).toEqual([]);

      const ok = await send(base, 'POST', path, {
        origin: base,
        'x-viewer-action': 'cancel-test-run',
      });
      expect(ok.status).toBe(202);
      expect(fake.calls).toEqual([`cancel ${RUN}`]);
    });
  });

  it('passes on the answer for an unknown run, and force goes to the force path only when asked', async () => {
    await withServer(async (base, fake) => {
      const headers = { origin: base, 'x-viewer-action': 'cancel-test-run' };
      const missing = await send(
        base,
        'POST',
        '/api/tests/runs/run-20261103-100000-9/cancel',
        headers,
      );
      expect(missing.status).toBe(404);
      const forced = await send(
        base,
        'POST',
        `/api/tests/runs/${RUN}/cancel`,
        headers,
        JSON.stringify({ force: true }),
      );
      expect(forced.status).toBe(409);
      expect(fake.calls).toEqual(['cancel run-20261103-100000-9', `force ${RUN}`]);
    });
  });

  it('treats anything but force: true as a plain cancel, and refuses a body that is not json', async () => {
    await withServer(async (base, fake) => {
      const headers = { origin: base, 'x-viewer-action': 'cancel-test-run' };
      const path = `/api/tests/runs/${RUN}/cancel`;
      await send(base, 'POST', path, headers, JSON.stringify({ force: 'yes' }));
      expect(fake.calls).toEqual([`cancel ${RUN}`]);
      expect((await send(base, 'POST', path, headers, 'not json')).status).toBe(400);
      expect((await send(base, 'POST', path, headers, 'x'.repeat(10_000))).status).toBe(400);
      expect(fake.calls).toEqual([`cancel ${RUN}`]);
    });
  });
});

describe('deleting runs over http', () => {
  it('deletes one run only with the same origin and its own header', async () => {
    await withServer(async (base, fake) => {
      const path = `/api/tests/runs/${RUN}`;
      expect((await send(base, 'DELETE', path)).status).toBe(403);
      expect((await send(base, 'DELETE', path, { origin: base })).status).toBe(403);
      expect(
        (await send(base, 'DELETE', path, { 'x-viewer-action': 'delete-test-run' })).status,
      ).toBe(403);
      expect(
        (await send(base, 'DELETE', path, { origin: base, 'x-viewer-action': 'delete-test-runs' }))
          .status,
      ).toBe(403);
      expect(
        (await send(base, 'DELETE', path, { origin: base, 'x-viewer-action': 'delete-all' }))
          .status,
      ).toBe(403);
      expect(fake.calls).toEqual([]);

      const ok = await send(base, 'DELETE', path, {
        origin: base,
        'x-viewer-action': 'delete-test-run',
      });
      expect(ok.status).toBe(200);
      expect(await ok.json()).toEqual({ ok: true, deleted: [RUN] });
      expect(fake.calls).toEqual([`remove ${RUN}`]);
    });
  });

  it('passes on the refusal for a run that is going', async () => {
    await withServer(async (base) => {
      const response = await send(base, 'DELETE', '/api/tests/runs/run-20261103-100000-7', {
        origin: base,
        'x-viewer-action': 'delete-test-run',
      });
      expect(response.status).toBe(409);
      expect(JSON.stringify(await response.json())).toContain('Cancel');
    });
  });

  it('deletes all finished runs only with the header for that', async () => {
    await withServer(async (base, fake) => {
      expect((await send(base, 'DELETE', '/api/tests/runs', { origin: base })).status).toBe(403);
      expect(
        (
          await send(base, 'DELETE', '/api/tests/runs', {
            origin: base,
            'x-viewer-action': 'delete-test-run',
          })
        ).status,
      ).toBe(403);
      expect(fake.calls).toEqual([]);
      const ok = await send(base, 'DELETE', '/api/tests/runs', {
        origin: base,
        'x-viewer-action': 'delete-test-runs',
      });
      expect(ok.status).toBe(200);
      expect(fake.calls).toEqual(['removeFinished']);
    });
  });
});

describe('the single tests of a step over http', () => {
  it('passes the filters on, with safe defaults', async () => {
    await withServer(async (base, fake) => {
      const page = await send(
        base,
        'GET',
        `/api/tests/runs/${RUN}/tests/unit?status=failed&q=pg&offset=20&limit=50`,
      );
      expect(page.status).toBe(200);
      expect(page.headers.get('content-type')).toContain('application/json');
      expect(fake.calls[0]).toBe(
        `tests ${RUN} unit {"status":"failed","q":"pg","offset":20,"limit":50}`,
      );
      await send(base, 'GET', `/api/tests/runs/${RUN}/tests/unit?status=bogus&offset=abc&limit=-1`);
      expect(fake.calls[1]).toBe(`tests ${RUN} unit {"status":"all","q":"","offset":0,"limit":-1}`);
    });
  });

  it('answers 404 for a step or a run with no tests', async () => {
    await withServer(async (base) => {
      expect((await send(base, 'GET', `/api/tests/runs/${RUN}/tests/lint`)).status).toBe(404);
      expect(
        (await send(base, 'GET', '/api/tests/runs/run-20261103-100000-9/tests/unit')).status,
      ).toBe(404);
      expect((await send(base, 'GET', '/api/tests/runs/..%2F..%2Fx/tests/unit')).status).toBe(404);
    });
  });
});

describe('the run page', () => {
  it('serves the page for a well-formed run id only', async () => {
    await withServer(async (base) => {
      const page = await send(base, 'GET', `/runs/${RUN}`);
      expect(page.status).toBe(200);
      expect(page.headers.get('content-type')).toContain('text/html');
      expect(await page.text()).toContain('Test run');
      for (const path of [
        '/runs/',
        '/runs/x',
        '/runs/..%2F..%2Fpackage.json',
        '/runs/run-1',
        `/runs/${RUN}/x`,
      ]) {
        expect((await send(base, 'GET', path)).status).toBe(404);
      }
    });
  });

  it('may be shown in a frame of this origin and in no other', async () => {
    await withServer(async (base) => {
      const run = await send(base, 'GET', `/runs/${RUN}`);
      expect(run.headers.get('x-frame-options')).toBe('SAMEORIGIN');
      expect(run.headers.get('content-security-policy')).toContain("frame-ancestors 'self'");
      // Every other page, and the data, still refuse to be framed.
      for (const path of ['/', '/api/tests']) {
        const other = await send(base, 'GET', path);
        expect(other.headers.get('x-frame-options')).toBe('DENY');
        expect(other.headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
      }
    });
  });

  it('lets the dashboard frame only its own pages', async () => {
    await withServer(async (base) => {
      const dashboard = await send(base, 'GET', '/');
      expect(dashboard.headers.get('content-security-policy')).toContain("frame-src 'self'");
    });
  });
});

describe('the run page file', () => {
  const read = () => readFile(join(import.meta.dirname, 'run.html'), 'utf8');

  it('shows text from a run only as text', async () => {
    const html = await read();
    const script = html.slice(html.lastIndexOf('<script>'));
    expect(script.length).toBeGreaterThan(5000);
    expect(script).not.toMatch(/innerHTML|insertAdjacentHTML|outerHTML|document\.write|eval\(/);
  });

  it('sends the header of each action it can start', async () => {
    const html = await read();
    expect(html).toContain("'X-Viewer-Action': 'cancel-test-run'");
    expect(html).toContain("'X-Viewer-Action': 'delete-test-run'");
    expect(html).toContain("method: 'DELETE'");
  });

  it('loads nothing from outside and allows no network but its own', async () => {
    const html = await read();
    expect(html).toContain("default-src 'none'");
    expect(html).toContain("connect-src 'self'");
    expect(html).not.toMatch(/<script[^>]+src=|<link[^>]+href="https?:|@import|url\(['"]?https?:/);
  });

  it('uses the same colours, logo and wordmark face as the dashboard', async () => {
    const [run, dashboard] = await Promise.all([
      read(),
      readFile(join(import.meta.dirname, 'dashboard.html'), 'utf8'),
    ]);
    const tokens = (html: string) => {
      const start = html.indexOf('/* The wordmark face of the web app');
      const end = html.indexOf('body {', start);
      return html.slice(start, end).replace(/\s+/g, ' ').trim();
    };
    expect(tokens(run).length).toBeGreaterThan(5000);
    expect(tokens(run)).toBe(tokens(dashboard));
    expect(run).toContain('fill="#FF6A1F"');
    expect(run).toContain('data:font/woff2;base64,');
  });

  it('drops its own header inside the popup, and tells the dashboard when it deleted a run', async () => {
    const html = await read();
    expect(html).toContain('html.embedded header.top');
    expect(html).toContain(
      "parent.postMessage({ type: 'test-run-deleted', runId }, location.origin)",
    );
  });
});

describe('the popup in the dashboard page', () => {
  it('opens a run in a frame of its own page, keeps the new-tab link, and can delete', async () => {
    const html = await readFile(join(import.meta.dirname, 'dashboard.html'), 'utf8');
    expect(html).toContain('<dialog id="run-dialog"');
    expect(html).toContain('id="run-dialog-open"');
    expect(html).toContain("frame-src 'self'");
    expect(html).toContain("document.createElement('iframe')");
    expect(html).toContain('event.origin !== location.origin');
    expect(html).toContain("'delete-test-run'");
    expect(html).toContain("'delete-test-runs'");
    expect(html).toContain('id="tests-delete-finished"');
  });
});
