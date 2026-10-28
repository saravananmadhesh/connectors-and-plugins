import { createServer, type IncomingHttpHeaders, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fetch } from 'undici';
import { createPinnedDispatcher } from './dispatcher.js';
import { SsrfError } from './errors.js';
import { guardedFetch } from './fetch.js';
import { createSsrfGuard } from './guard.js';

interface Seen {
  host: string | undefined;
  remote: string | undefined;
  headers: IncomingHttpHeaders;
  url: string | undefined;
}

let server: Server;
let port: number;
const seen: Seen[] = [];

beforeAll(async () => {
  server = createServer((req, res) => {
    seen.push({
      host: req.headers.host,
      remote: req.socket.remoteAddress,
      headers: req.headers,
      url: req.url,
    });
    if (req.url === '/redirect-metadata') {
      res.writeHead(302, { location: 'http://169.254.169.254/latest' });
      res.end();
    } else if (req.url === '/redirect-allowed') {
      res.writeHead(302, { location: `http://allowed.test:${port}/final` });
      res.end();
    } else if (req.url === '/redirect-elsewhere') {
      res.writeHead(302, { location: `http://other.test:${port}/final` });
      res.end();
    } else if (req.url === '/big') {
      res.writeHead(200);
      res.end(Buffer.alloc(5000));
    } else if (req.url === '/slow') {
      res.writeHead(200, { 'transfer-encoding': 'chunked' });
      res.write('first');
      setTimeout(() => res.end('second'), 400);
    } else {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('ok');
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  port = (server.address() as AddressInfo).port;
});

afterAll(async () => {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
});

const HOSTS = ['127.0.0.1', 'fixture.test', 'allowed.test', 'other.test', 'a.test', 'b.test'];

function makeGuard(resolver?: (host: string) => Promise<string[]>) {
  return createSsrfGuard({
    deployed: false,
    allowHttpHosts: HOSTS,
    allowedPorts: [port],
    resolver: resolver ?? (async () => ['127.0.0.1']),
  });
}

async function code(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof SsrfError) return error.code;
    throw error;
  }
  return 'none';
}

describe('guardedFetch', () => {
  it('fetches an allowed fixture', async () => {
    const response = await guardedFetch(
      makeGuard(),
      `http://127.0.0.1:${port}/`,
      {},
      {
        purpose: 'mcp_upstream',
      },
    );
    expect(response.status).toBe(200);
    expect(response.body.toString()).toBe('ok');
  });

  it('does not follow a redirect to a metadata address', async () => {
    const result = await code(
      guardedFetch(
        makeGuard(),
        `http://127.0.0.1:${port}/redirect-metadata`,
        {},
        {
          purpose: 'mcp_upstream',
        },
      ),
    );
    expect(result).toBe('redirect');
    expect(seen.some((entry) => entry.host === '169.254.169.254')).toBe(false);
  });

  it('connects to the address validated first, even if the resolver changes its answer', async () => {
    let calls = 0;
    const resolver = async () => (calls++ === 0 ? ['127.0.0.1'] : ['10.9.9.9']);
    seen.length = 0;
    const response = await guardedFetch(
      makeGuard(resolver),
      `http://fixture.test:${port}/`,
      {},
      {
        purpose: 'mcp_upstream',
      },
    );
    expect(response.status).toBe(200);
    expect(seen.at(-1)?.remote).toContain('127.0.0.1');
    expect(calls).toBe(1);
  });

  it('keeps the original Host header', async () => {
    seen.length = 0;
    await guardedFetch(
      makeGuard(),
      `http://fixture.test:${port}/host`,
      {},
      {
        purpose: 'mcp_upstream',
      },
    );
    expect(seen.at(-1)?.host).toBe(`fixture.test:${port}`);
  });

  it('aborts a body over the cap', async () => {
    const result = await code(
      guardedFetch(
        makeGuard(),
        `http://127.0.0.1:${port}/big`,
        {},
        {
          purpose: 'mcp_upstream',
          maxBytes: 1000,
        },
      ),
    );
    expect(result).toBe('too_large');
  });

  it('never raises a limit above the purpose cap', async () => {
    const response = await guardedFetch(
      makeGuard(),
      `http://127.0.0.1:${port}/big`,
      {},
      {
        purpose: 'mcp_upstream',
        maxBytes: 10 * 1024 * 1024 * 1024,
      },
    );
    expect(response.body.byteLength).toBe(5000);
  });

  it('times out a slow response', async () => {
    const result = await code(
      guardedFetch(
        makeGuard(),
        `http://127.0.0.1:${port}/slow`,
        {},
        {
          purpose: 'mcp_upstream',
          timeoutMs: 100,
        },
      ),
    );
    expect(result).toBe('timeout');
  });

  it('refuses a call to a loopback address when deployed', async () => {
    const deployed = createSsrfGuard({ deployed: true, allowedPorts: [port] });
    expect(
      await code(
        guardedFetch(deployed, `https://127.0.0.1:${port}/`, {}, { purpose: 'mcp_upstream' }),
      ),
    ).toBe('url_not_allowed');
  });

  it('does not send credentials unless the caller sets them', async () => {
    seen.length = 0;
    await guardedFetch(
      makeGuard(),
      `http://127.0.0.1:${port}/headers`,
      {},
      {
        purpose: 'mcp_upstream',
      },
    );
    expect(seen.at(-1)?.headers['authorization']).toBeUndefined();
    expect(seen.at(-1)?.headers['cookie']).toBeUndefined();
  });
});

describe('github_source redirects', () => {
  const options = {
    purpose: 'github_source' as const,
    allowedHosts: ['127.0.0.1', 'allowed.test'],
  };

  it('returns the validated redirect target', async () => {
    const response = await guardedFetch(
      makeGuard(),
      `http://127.0.0.1:${port}/redirect-allowed`,
      {},
      options,
    );
    expect(response.status).toBe(302);
    expect(response.redirectTo?.host).toBe(`allowed.test:${port}`);
  });

  it('rejects a redirect outside the allowed hosts', async () => {
    expect(
      await code(
        guardedFetch(makeGuard(), `http://127.0.0.1:${port}/redirect-elsewhere`, {}, options),
      ),
    ).toBe('redirect');
  });

  it('rejects a redirect to a blocked address', async () => {
    expect(
      await code(
        guardedFetch(
          makeGuard(),
          `http://127.0.0.1:${port}/redirect-metadata`,
          {},
          {
            purpose: 'github_source',
            allowedHosts: ['127.0.0.1', '169.254.169.254'],
          },
        ),
      ),
    ).toBe('redirect');
  });

  it('is a configuration error without allowed hosts', async () => {
    expect(
      await code(
        guardedFetch(makeGuard(), `http://127.0.0.1:${port}/`, {}, { purpose: 'github_source' }),
      ),
    ).toBe('configuration');
  });

  it('allows a caller that follows three hops and fails the fourth', async () => {
    let hops = 0;
    const follow = async (url: string): Promise<void> => {
      const response = await guardedFetch(makeGuard(), url, {}, options);
      if (response.redirectTo) {
        hops += 1;
        if (hops > 3) throw new Error('too many hops');
        await follow(`http://127.0.0.1:${port}/redirect-allowed`);
      }
    };
    await expect(follow(`http://127.0.0.1:${port}/redirect-allowed`)).rejects.toThrow(
      'too many hops',
    );
    expect(hops).toBe(4);
  });
});

describe('pinned dispatcher', () => {
  it('streams: the first chunk arrives before the response ends', async () => {
    const dispatcher = createPinnedDispatcher(makeGuard(), { purpose: 'mcp_upstream' });
    const started = Date.now();
    const response = await fetch(`http://fixture.test:${port}/slow`, { dispatcher });
    const reader = response.body!.getReader();
    const first = await reader.read();
    const firstAt = Date.now() - started;
    expect(Buffer.from(first.value!).toString()).toBe('first');
    expect(firstAt).toBeLessThan(300);
    await reader.cancel();
    await dispatcher.close();
  });

  it('rejects connections to blocked answers', async () => {
    const dispatcher = createPinnedDispatcher(
      createSsrfGuard({
        deployed: false,
        allowedPorts: [port],
        resolver: async () => ['10.1.1.1'],
      }),
      { purpose: 'mcp_upstream' },
    );
    await expect(fetch(`http://internal.test:${port}/`, { dispatcher })).rejects.toBeInstanceOf(
      Error,
    );
    await dispatcher.close();
  });

  it('keys connections by ip, port and name', async () => {
    const other = createServer((_, res) => res.end('x'));
    await new Promise<void>((resolve) => other.listen(0, '127.0.0.1', resolve));
    const otherPort = (other.address() as AddressInfo).port;
    const guard = createSsrfGuard({
      deployed: false,
      allowHttpHosts: HOSTS,
      allowedPorts: [port, otherPort],
      resolver: async () => ['127.0.0.1'],
    });
    const dispatcher = createPinnedDispatcher(guard, { purpose: 'mcp_upstream' });
    for (const url of [
      `http://a.test:${port}/`,
      `http://b.test:${port}/`,
      `http://a.test:${otherPort}/`,
    ]) {
      await (await fetch(url, { dispatcher })).arrayBuffer();
    }
    expect(dispatcher.poolKeys().sort()).toEqual(
      [
        `127.0.0.1|${port}|a.test`,
        `127.0.0.1|${port}|b.test`,
        `127.0.0.1|${otherPort}|a.test`,
      ].sort(),
    );
    await dispatcher.close();
    other.closeAllConnections();
    await new Promise((resolve) => other.close(resolve));
  });
});
