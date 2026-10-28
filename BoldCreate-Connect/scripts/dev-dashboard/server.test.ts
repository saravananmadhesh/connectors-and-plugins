import { mkdtemp, readdir, rm, symlink, writeFile } from 'node:fs/promises';
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
        'postgres',
      ]),
    );
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
