import { mkdtemp, readdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { request } from 'node:http';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  createDashboardServer,
  probePort,
  repoScripts,
  serviceCatalog,
  systemInfo,
} from './server.js';

describe('dashboard facts', () => {
  it('lists repo scripts from the repository package file', async () => {
    const scripts = await repoScripts();
    expect(scripts).toContainEqual(expect.objectContaining({ name: 'dev' }));
  });

  it('returns no scripts for a missing package file', async () => {
    expect(await repoScripts(new URL('file:///missing-package.json'))).toEqual([]);
  });

  it('reports machine facts and the size of run files only', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'dashboard-info-'));
    try {
      await writeFile(join(directory, 'run-a.jsonl'), '12345');
      await writeFile(join(directory, 'notes.txt'), 'ignored');
      const info = await systemInfo(directory);
      expect(info).toMatchObject({ logFileCount: 1, logBytes: 5 });
      expect(info.memoryTotalBytes).toBeGreaterThan(info.memoryUsedBytes);
      expect(info.cpuPercent).toBeGreaterThanOrEqual(0);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});

describe('service catalog', () => {
  it('reports a listening port as up and a closed port as down', async () => {
    const server = createServer();
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Missing server address');
    try {
      expect(await probePort('127.0.0.1', address.port)).toBe(true);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
    expect(await probePort('127.0.0.1', address.port)).toBe(false);
  });

  it('groups endpoints by category with unique ids and only http links', () => {
    const catalog = serviceCatalog();
    expect(new Set(catalog.map((service) => service.id)).size).toBe(catalog.length);
    expect(new Set(catalog.map((service) => service.category))).toEqual(
      new Set(['Applications', 'Infrastructure']),
    );
    const urls = catalog.flatMap((service) => (service.url ? [service.url] : []));
    expect(urls.length).toBeGreaterThan(0);
    expect(urls.every((url) => /^http:\/\/localhost:\d+\//.test(url))).toBe(true);
  });

  it('lists every app process and infrastructure service', () => {
    const ids = serviceCatalog().map((service) => service.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'web',
        'api',
        'gateway',
        'admin',
        'worker',
        'redis',
        'mailpit',
        'mailpit-smtp',
        'object-store',
        'pgbouncer',
        'postgres',
      ]),
    );
  });

  it('is branded and themed like the web app', async () => {
    const html = await readFile(join(import.meta.dirname, 'dashboard.html'), 'utf8');
    expect(html).toContain('<title>BoldConnect · Dev dashboard</title>');
    expect(html).not.toContain('BoldCreate');
    // The web app's brand colours, its dark background and its wordmark face.
    expect(html).toContain('--accent: #d63a00');
    expect(html).toContain('--background: oklch(13.5% 0.02 262)');
    expect(html).toContain("font-family: 'Plus Jakarta Sans'");
    expect(html).toContain('fill="#FF6A1F"');
    // The page loads no file, so the face is embedded and the policy allows exactly that.
    expect(html).toContain('data:font/woff2;base64,');
    expect(html).toContain('font-src data:;');
    expect(html).not.toMatch(/src:\s*url\(['"]?https?:/);
    expect(html).not.toMatch(/Georgia|Tiempos/);
  });

  it('has a Tests view with a nav entry, run controls and a run list that opens each run', async () => {
    const html = await readFile(join(import.meta.dirname, 'dashboard.html'), 'utf8');
    expect(html).toContain('data-view-link="tests"');
    for (const id of ['tests-run', 'tests-stop', 'tests-runs']) {
      expect(html).toContain(`id="${id}"`);
    }
    // The details of a run are on the run's own page, not in a second copy here.
    expect(html).not.toContain('id="tests-detail-heading"');
    expect(html).not.toContain('id="tests-steps-table"');
    // Text from a run is only ever shown as text.
    const script = html.slice(
      html.indexOf('// ── Tests view'),
      html.indexOf('showView();\n      void refreshServices'),
    );
    expect(script.length).toBeGreaterThan(1000);
    expect(script).not.toMatch(/innerHTML|insertAdjacentHTML|outerHTML|document\.write/);
    expect(script).toContain("'X-Viewer-Action'");
    // Each run opens in a new page, can be cancelled while it goes, and links to its report.
    expect(script).toContain("'/runs/' + encodeURIComponent(run.runId)");
    expect(script).toContain("target = '_blank'");
    expect(script).toContain("'cancel-test-run'");
    expect(script).toContain("'/report'");
  });

  it('lists PgBouncer as infrastructure on the pooler port, without a web link', () => {
    const pooler = serviceCatalog().find((service) => service.id === 'pgbouncer');
    expect(pooler).toMatchObject({ category: 'Infrastructure', host: 'localhost', port: 6432 });
    expect(pooler?.url).toBeUndefined();
  });

  it('offers one object store link, to the store UI itself', () => {
    const stores = serviceCatalog().filter((service) => service.id.startsWith('object-store'));
    expect(stores.map((service) => service.url)).toEqual([
      'http://localhost:9001/files?path=/buckets/boldcreate-dev',
    ]);
  });
});

describe('dashboard server', () => {
  it('lists only run files, serves events and rejects unsafe callers and paths', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'viewer-test-'));
    const server = createDashboardServer(directory);
    try {
      await writeFile(join(directory, 'run-test.jsonl'), '{"service":"api","msg":"ready"}\n');
      await writeFile(join(directory, 'private.txt'), 'not a log');
      if (process.platform !== 'win32')
        await symlink(join(directory, 'private.txt'), join(directory, 'run-link.jsonl'));
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Missing server address');
      const base = `http://127.0.0.1:${address.port}`;
      const listing = await fetch(`${base}/api/files`);
      expect(await listing.json()).toEqual([expect.objectContaining({ name: 'run-test.jsonl' })]);
      const data = await fetch(`${base}/api/files/run-test.jsonl`);
      expect(await data.text()).toContain('ready');
      expect(data.headers.get('cache-control')).toBe('no-store');
      expect((await fetch(base)).headers.get('content-type')).toContain('text/html');
      const services = (await (await fetch(`${base}/api/services`)).json()) as Array<{
        id: string;
        up: boolean;
      }>;
      expect(services.map((service) => service.id)).toContain('api');
      expect(services.every((service) => typeof service.up === 'boolean')).toBe(true);
      expect(await (await fetch(`${base}/api/system`)).json()).toMatchObject({ logFileCount: 1 });
      expect(await (await fetch(`${base}/api/scripts`)).json()).toContainEqual(
        expect.objectContaining({ name: 'dev' }),
      );
      expect((await fetch(`${base}/api/files/private.txt`)).status).toBe(404);
      expect((await fetch(`${base}/api/files/%2e%2e%2fprivate.txt`)).status).toBe(404);
      expect((await fetch(`${base}/api/files`, { method: 'POST' })).status).toBe(405);
      expect(
        (await fetch(`${base}/api/files`, { headers: { Origin: 'https://attacker.example' } }))
          .status,
      ).toBe(403);
      const forbiddenHost = await new Promise<number | undefined>((resolve, reject) => {
        const req = request(
          `${base}/api/files`,
          { headers: { Host: 'attacker.example' } },
          (response) => {
            response.resume();
            resolve(response.statusCode);
          },
        );
        req.on('error', reject);
        req.end();
      });
      expect(forbiddenHost).toBe(403);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('deletes only run files and only for same-origin confirmed requests', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'viewer-delete-test-'));
    const server = createDashboardServer(directory);
    try {
      await writeFile(join(directory, 'run-a.jsonl'), '{"msg":"a"}\n');
      await writeFile(join(directory, 'run-b.jsonl'), '{"msg":"b"}\n');
      await writeFile(join(directory, 'private.txt'), 'keep');
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('Missing server address');
      const base = `http://127.0.0.1:${address.port}`;
      expect((await fetch(`${base}/api/files`, { method: 'DELETE' })).status).toBe(403);
      expect(
        (
          await fetch(`${base}/api/files`, {
            method: 'DELETE',
            headers: { Origin: base },
          })
        ).status,
      ).toBe(403);
      const result = await fetch(`${base}/api/files`, {
        method: 'DELETE',
        headers: { Origin: base, 'X-Viewer-Action': 'delete-all' },
      });
      expect(await result.json()).toEqual({ deleted: 2, failed: 0 });
      expect(await readdir(directory)).toEqual(['private.txt']);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await rm(directory, { recursive: true, force: true });
    }
  });
});

describe('test run endpoints', () => {
  function fakeTests() {
    const started: string[][] = [];
    let stopped = 0;
    return {
      started,
      stoppedCount: () => stopped,
      controller: {
        state: async () => ({ runs: [], active: null }),
        run: (id: string) =>
          id === 'run-20261103-100000-1' ? { item: { runId: id }, run: { runId: id } } : undefined,
        start: (ids: string[]) => {
          started.push(ids);
          return ids.includes('nope')
            ? { ok: false, status: 400, error: 'Unknown test step.' }
            : { ok: true, ids };
        },
        stop: () => {
          stopped += 1;
          return true;
        },
        log: async (run: string, step: string) =>
          run === 'run-20261103-100000-1' && step === 'unit' ? 'unit log' : undefined,
        report: async (id?: string) =>
          id === 'run-20261103-100000-1' ? '<html>report one</html>' : undefined,
      },
    };
  }

  async function withServer(
    run: (base: string, fake: ReturnType<typeof fakeTests>) => Promise<void>,
  ) {
    const directory = await mkdtemp(join(tmpdir(), 'viewer-tests-'));
    const fake = fakeTests();
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

  const post = (base: string, path: string, headers: Record<string, string>, body?: string) =>
    fetch(`${base}${path}`, { method: 'POST', headers, ...(body === undefined ? {} : { body }) });

  it('starts a run only for the same origin with the action header', async () => {
    await withServer(async (base, fake) => {
      const body = JSON.stringify({ steps: ['unit', 'lint'] });
      expect((await post(base, '/api/tests/run', {}, body)).status).toBe(403);
      expect((await post(base, '/api/tests/run', { origin: base }, body)).status).toBe(403);
      expect(
        (await post(base, '/api/tests/run', { 'x-viewer-action': 'run-tests' }, body)).status,
      ).toBe(403);
      expect(
        (
          await post(
            base,
            '/api/tests/run',
            { origin: 'http://evil.example', 'x-viewer-action': 'run-tests' },
            body,
          )
        ).status,
      ).toBe(403);
      // The other action's header does not start a run.
      expect(
        (
          await post(
            base,
            '/api/tests/run',
            { origin: base, 'x-viewer-action': 'stop-tests' },
            body,
          )
        ).status,
      ).toBe(403);
      expect(fake.started).toEqual([]);

      const ok = await post(
        base,
        '/api/tests/run',
        { origin: base, 'x-viewer-action': 'run-tests' },
        body,
      );
      expect(ok.status).toBe(202);
      expect(fake.started).toEqual([['unit', 'lint']]);
    });
  });

  it('refuses a body that is not a list of step names', async () => {
    await withServer(async (base, fake) => {
      const headers = { origin: base, 'x-viewer-action': 'run-tests' };
      for (const body of [
        '',
        'not json',
        '{}',
        '{"steps":"unit"}',
        '{"steps":[1]}',
        '{"steps":[["unit"]]}',
      ]) {
        expect((await post(base, '/api/tests/run', headers, body)).status).toBe(400);
      }
      const huge = JSON.stringify({ steps: Array.from({ length: 2000 }, () => 'unit') });
      expect((await post(base, '/api/tests/run', headers, huge)).status).toBe(400);
      expect(fake.started).toEqual([]);
    });
  });

  it('passes on the refusal of the controller', async () => {
    await withServer(async (base) => {
      const response = await post(
        base,
        '/api/tests/run',
        { origin: base, 'x-viewer-action': 'run-tests' },
        JSON.stringify({ steps: ['nope'] }),
      );
      expect(response.status).toBe(400);
      expect(await response.json()).toMatchObject({ ok: false, error: 'Unknown test step.' });
    });
  });

  it('stops a run only with its own header', async () => {
    await withServer(async (base, fake) => {
      expect((await post(base, '/api/tests/stop', { origin: base })).status).toBe(403);
      expect(
        (await post(base, '/api/tests/stop', { origin: base, 'x-viewer-action': 'run-tests' }))
          .status,
      ).toBe(403);
      expect(fake.stoppedCount()).toBe(0);
      const ok = await post(base, '/api/tests/stop', {
        origin: base,
        'x-viewer-action': 'stop-tests',
      });
      expect(ok.status).toBe(200);
      expect(fake.stoppedCount()).toBe(1);
    });
  });

  it('reads the run list, one run and a log, and answers 404 for what is not there', async () => {
    await withServer(async (base) => {
      const list = await fetch(`${base}/api/tests`);
      expect(list.status).toBe(200);
      expect(list.headers.get('cache-control')).toBe('no-store');
      expect((await fetch(`${base}/api/tests/runs/run-20261103-100000-1`)).status).toBe(200);
      expect((await fetch(`${base}/api/tests/runs/run-20261103-100000-9`)).status).toBe(404);
      expect((await fetch(`${base}/api/tests/runs/..%2F..%2Fpackage.json`)).status).toBe(404);
      const log = await fetch(`${base}/api/tests/runs/run-20261103-100000-1/log/unit`);
      expect(await log.text()).toBe('unit log');
      expect(log.headers.get('content-type')).toContain('text/plain');
      expect((await fetch(`${base}/api/tests/runs/run-20261103-100000-1/log/lint`)).status).toBe(
        404,
      );
      expect((await fetch(`${base}/api/tests/report`)).status).toBe(404);
      const report = await fetch(`${base}/api/tests/runs/run-20261103-100000-1/report`);
      expect(report.status).toBe(200);
      expect(report.headers.get('content-type')).toContain('text/html');
      expect(await report.text()).toBe('<html>report one</html>');
      expect((await fetch(`${base}/api/tests/runs/run-20261103-100000-9/report`)).status).toBe(404);
      expect((await fetch(`${base}/api/tests/runs/..%2F..%2Fpackage/report`)).status).toBe(404);
    });
  });

  it('does not allow other methods on the test endpoints', async () => {
    await withServer(async (base) => {
      for (const method of ['PUT', 'PATCH', 'DELETE']) {
        const response = await fetch(`${base}/api/tests/run`, {
          method,
          headers: { origin: base, 'x-viewer-action': 'run-tests' },
        });
        expect([403, 405]).toContain(response.status);
      }
    });
  });
});
