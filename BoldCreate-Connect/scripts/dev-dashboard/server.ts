/**
 * Development dashboard server: serves the dashboard page, captured run logs, service
 * reachability, machine facts and repo scripts on loopback only.
 *
 * Standalone: `pnpm run dev:dashboard` (also started by `pnpm run dev`).
 */
import { spawn } from 'node:child_process';
import { constants } from 'node:fs';
import { mkdir, open, readFile, readdir, stat, unlink } from 'node:fs/promises';
import { createServer } from 'node:http';
import { connect } from 'node:net';
import { cpus, freemem, loadavg, totalmem } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { devPorts, localUrl } from '../dev-ports.js';

// ── Service catalog ───────────────────────────────────────────────────────────

export interface ServiceEndpoint {
  id: string;
  name: string;
  category: string;
  description: string;
  host: string;
  port: number;
  /** Browser URL; omitted for endpoints that are not HTTP (databases, SMTP). */
  url?: string;
}

export interface ServiceStatus extends ServiceEndpoint {
  up: boolean;
  latencyMs: number | null;
}

export function serviceCatalog(): ServiceEndpoint[] {
  const ports = devPorts();
  const { web, api, gateway, admin } = ports;
  const http = localUrl;
  return [
    {
      id: 'web',
      name: 'Web app',
      category: 'Applications',
      description: 'Customer web server',
      host: 'localhost',
      port: web,
      url: http(web),
    },
    {
      id: 'api',
      name: 'API',
      category: 'Applications',
      description: 'Backend for frontend',
      host: 'localhost',
      port: api,
      url: http(api),
    },
    {
      id: 'gateway',
      name: 'Gateway',
      category: 'Applications',
      description: 'MCP gateway',
      host: 'localhost',
      port: gateway,
      url: http(gateway),
    },
    {
      id: 'admin',
      name: 'Admin',
      category: 'Applications',
      description: 'Operator console (health only so far)',
      host: 'localhost',
      port: admin,
      url: http(admin),
    },
    {
      id: 'worker',
      name: 'Worker',
      category: 'Applications',
      description: 'Background jobs (health only)',
      host: 'localhost',
      port: ports.workerHealth,
      url: http(ports.workerHealth),
    },
    {
      id: 'redis',
      name: 'Redis',
      category: 'Infrastructure',
      description: `Browser (read-only); redis://localhost:${ports.redis}; cache, flags, login throttle`,
      host: 'localhost',
      port: ports.redis,
      url: http(ports.redisUi),
    },
    {
      id: 'mailpit',
      name: 'Mailpit',
      category: 'Infrastructure',
      description: 'Captured email inbox',
      host: 'localhost',
      port: ports.mailpitHttp,
      url: http(ports.mailpitHttp),
    },
    {
      id: 'mailpit-smtp',
      name: 'Mailpit SMTP',
      category: 'Infrastructure',
      description: `smtp://localhost:${ports.mailpitSmtp}`,
      host: 'localhost',
      port: ports.mailpitSmtp,
    },
    {
      id: 'object-store',
      name: 'Object store',
      category: 'Infrastructure',
      description: `Storage UI (buckets and files); S3 API http://localhost:${ports.objectStore}, bucket boldcreate-dev`,
      host: 'localhost',
      port: ports.objectStoreUi,
      url: http(ports.objectStoreUi, '/files?path=/buckets/boldcreate-dev'),
    },
    {
      id: 'postgres',
      name: 'Postgres',
      category: 'Infrastructure',
      description: `Browser (read-only); postgres://localhost:${ports.postgres}`,
      host: 'localhost',
      port: ports.postgres,
      url: http(ports.postgresUi),
    },
  ];
}

export function probeTimed(
  host: string,
  port: number,
  timeoutMs = 800,
): Promise<{ up: boolean; latencyMs: number | null }> {
  return new Promise((resolve) => {
    const started = performance.now();
    const socket = connect({ host, port });
    const finish = (up: boolean) => {
      socket.destroy();
      resolve({ up, latencyMs: up ? Math.round((performance.now() - started) * 10) / 10 : null });
    };
    socket.setTimeout(timeoutMs, () => finish(false));
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
  });
}

export async function probePort(host: string, port: number, timeoutMs = 800): Promise<boolean> {
  return (await probeTimed(host, port, timeoutMs)).up;
}

export async function serviceStatuses(): Promise<ServiceStatus[]> {
  const cache = new Map<number, ReturnType<typeof probeTimed>>();
  return Promise.all(
    serviceCatalog().map(async (service) => {
      let probe = cache.get(service.port);
      if (!probe) {
        probe = probeTimed(service.host, service.port);
        cache.set(service.port, probe);
      }
      return { ...service, ...(await probe) };
    }),
  );
}

// ── Machine and repo facts ─────────────────────────────────────────────────

export interface RepoScript {
  name: string;
  command: string;
}

export interface SystemInfo {
  node: string;
  platform: string;
  arch: string;
  cpuCount: number;
  cpuPercent: number;
  memoryTotalBytes: number;
  memoryUsedBytes: number;
  loadAverage: number[];
  viewerUptimeSeconds: number;
  viewerRssBytes: number;
  logFileCount: number;
  logBytes: number;
}

type CpuSample = { idle: number; total: number };
let previousCpu: CpuSample | undefined;

function sampleCpu(): CpuSample {
  let idle = 0;
  let total = 0;
  for (const { times } of cpus()) {
    idle += times.idle;
    total += times.user + times.nice + times.sys + times.idle + times.irq;
  }
  return { idle, total };
}

function cpuPercent(): number {
  const current = sampleCpu();
  const before = previousCpu ?? current;
  previousCpu = current;
  const total = current.total - before.total;
  if (total <= 0) return 0;
  return Math.round((1 - (current.idle - before.idle) / total) * 1000) / 10;
}

async function logFootprint(directory: string) {
  let logFileCount = 0;
  let logBytes = 0;
  try {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isFile() || !/^run-[a-zA-Z0-9-]+\.jsonl$/.test(entry.name)) continue;
      try {
        logBytes += (await stat(join(directory, entry.name))).size;
        logFileCount++;
      } catch {
        /* A run may be removed by retention while measuring. */
      }
    }
  } catch {
    /* No log directory yet. */
  }
  return { logFileCount, logBytes };
}

export async function systemInfo(logDirectory: string): Promise<SystemInfo> {
  const total = totalmem();
  return {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    cpuCount: cpus().length,
    cpuPercent: cpuPercent(),
    memoryTotalBytes: total,
    memoryUsedBytes: total - freemem(),
    loadAverage: loadavg(),
    viewerUptimeSeconds: Math.round(process.uptime()),
    viewerRssBytes: process.memoryUsage().rss,
    ...(await logFootprint(logDirectory)),
  };
}

export async function repoScripts(
  packageJson = new URL('../../package.json', import.meta.url),
): Promise<RepoScript[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(packageJson, 'utf8'));
    const scripts =
      typeof parsed === 'object' && parsed !== null && 'scripts' in parsed
        ? (parsed as { scripts: unknown }).scripts
        : undefined;
    if (typeof scripts !== 'object' || scripts === null) return [];
    return Object.entries(scripts)
      .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
      .map(([name, command]) => ({ name, command }));
  } catch {
    return [];
  }
}

// ── Browser launcher ──────────────────────────────────────────────────────────

export function openBrowser(url: string) {
  if (process.env['CI'] || process.env['LOG_VIEWER_OPEN'] === '0') return;
  const [command, args]: [string, string[]] =
    process.platform === 'win32'
      ? ['rundll32', ['url.dll,FileProtocolHandler', url]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]];
  try {
    const child = spawn(command, args, { detached: true, stdio: 'ignore' });
    child.on('error', () => undefined);
    child.unref();
  } catch {
    /* The viewer URL is also printed to the console. */
  }
}

// ── HTTP server ───────────────────────────────────────────────────────────────

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const validName = /^run-[a-zA-Z0-9-]+\.jsonl$/;
const defaultDirectory = fileURLToPath(new URL('./logs/', import.meta.url));

export function createDashboardServer(directory = defaultDirectory) {
  return createServer(async (request, response) => {
    const host = request.headers.host ?? '';
    if (
      !/^(localhost|127\.0\.0\.1):\d+$/.test(host) ||
      (request.headers.origin !== undefined && request.headers.origin !== `http://${host}`) ||
      (request.headers['sec-fetch-site'] !== undefined &&
        !['same-origin', 'none'].includes(String(request.headers['sec-fetch-site'])))
    ) {
      response.writeHead(403).end();
      return;
    }
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    response.setHeader(
      'Content-Security-Policy',
      "default-src 'none'; img-src data:; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
    );
    const path = request.url ?? '';
    if (request.method === 'DELETE' && path === '/api/files') {
      if (
        request.headers.origin !== `http://${host}` ||
        request.headers['x-viewer-action'] !== 'delete-all'
      ) {
        response.writeHead(403).end();
        return;
      }
      try {
        let deleted = 0;
        let failed = 0;
        await mkdir(directory, { recursive: true });
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          if (!entry.isFile() || !validName.test(entry.name)) continue;
          try {
            await unlink(join(directory, entry.name));
            deleted++;
          } catch {
            /* A file held open by a running capture cannot always be removed. */
            failed++;
          }
        }
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ deleted, failed }));
      } catch {
        response.writeHead(500).end();
      }
      return;
    }
    if (request.method !== 'GET') {
      response.writeHead(405, { Allow: 'GET, DELETE' }).end();
      return;
    }
    try {
      if (path === '/' || path === '/dashboard.html') {
        const file = await open(new URL('./dashboard.html', import.meta.url), 'r');
        try {
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(await file.readFile());
        } finally {
          await file.close();
        }
      } else if (path === '/api/services') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(await serviceStatuses()));
      } else if (path === '/api/system') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(await systemInfo(directory)));
      } else if (path === '/api/scripts') {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(await repoScripts()));
      } else if (path === '/api/files') {
        await mkdir(directory, { recursive: true });
        const files = [];
        for (const entry of await readdir(directory, { withFileTypes: true })) {
          if (!entry.isFile() || !validName.test(entry.name)) continue;
          try {
            const file = await open(
              join(directory, entry.name),
              constants.O_RDONLY | constants.O_NOFOLLOW,
            );
            try {
              const stat = await file.stat();
              if (stat.isFile())
                files.push({ name: entry.name, size: stat.size, modified: stat.mtimeMs });
            } finally {
              await file.close();
            }
          } catch {
            /* A run may be removed by retention while listing. */
          }
        }
        files.sort((a, b) => b.modified - a.modified);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(files));
      } else if (path.startsWith('/api/files/')) {
        const name = path.slice('/api/files/'.length);
        if (!validName.test(name)) {
          response.writeHead(404).end();
          return;
        }
        const file = await open(join(directory, name), constants.O_RDONLY | constants.O_NOFOLLOW);
        try {
          const stat = await file.stat();
          if (!stat.isFile()) {
            response.writeHead(404).end();
            return;
          }
          if (stat.size > MAX_FILE_BYTES) {
            response.writeHead(413).end();
            return;
          }
          response.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
          if (stat.size === 0) {
            response.end();
            return;
          }
          const stream = file.createReadStream({ start: 0, end: stat.size - 1, autoClose: false });
          response.once('close', () => stream.destroy());
          await new Promise<void>((resolve, reject) => {
            stream.once('error', reject);
            stream.once('close', resolve);
            stream.once('end', resolve);
            stream.pipe(response);
          });
        } finally {
          await file.close();
        }
      } else {
        response.writeHead(404).end();
      }
    } catch {
      if (!response.headersSent) response.writeHead(404).end();
      else response.destroy();
    }
  });
}

export async function startDashboardServer(port = devPorts().dashboard) {
  const server = createDashboardServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, 'localhost', resolve);
  });
  return server;
}

// ── Standalone entry ──────────────────────────────────────────────────────────

if (process.argv[1] && resolve(process.argv[1]) === import.meta.filename) {
  const server = await startDashboardServer();
  const dashboardUrl = localUrl(devPorts().dashboard);
  process.stdout.write(`Dev dashboard: ${dashboardUrl}\n`);
  openBrowser(dashboardUrl);
  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      server.close();
      server.closeAllConnections();
    });
  }
}
