import { describe, expect, it } from 'vitest';
import {
  UpstreamError,
  expandVariables,
  hashTools,
  openSession,
  type UpstreamFetch,
  type UpstreamResponse,
} from './upstream.js';

const target = { url: 'https://mcp.example.com/mcp', headers: { authorization: 'Bearer k' } };

const reply = (
  body: unknown,
  init: { status?: number; type?: string; headers?: Record<string, string> } = {},
): UpstreamResponse => ({
  status: init.status ?? 200,
  headers: new Headers({ 'content-type': init.type ?? 'application/json', ...init.headers }),
  body: Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)),
});

interface Seen {
  method: string;
  id?: number | undefined;
  headers: Record<string, string>;
}

/** A scripted upstream: answers by JSON-RPC method and records what it was sent. */
function scripted(
  answers: Record<string, (params: Record<string, unknown>) => UpstreamResponse>,
  seen: Seen[] = [],
): UpstreamFetch {
  return (_url, init) => {
    const message = JSON.parse(init.body ?? '{}') as {
      method: string;
      id?: number;
      params?: Record<string, unknown>;
    };
    seen.push({ method: message.method, id: message.id, headers: init.headers });
    const answer = answers[message.method];
    if (!answer) return Promise.resolve(reply('', { status: 202 }));
    return Promise.resolve(answer(message.params ?? {}));
  };
}

const initialize = () =>
  reply(
    { jsonrpc: '2.0', id: 1, result: { capabilities: {} } },
    { headers: { 'mcp-session-id': 's-1' } },
  );

describe('openSession', () => {
  it('handshakes, then carries the session id and protocol version on later calls', async () => {
    const seen: Seen[] = [];
    const session = await openSession(
      scripted(
        {
          initialize,
          'tools/list': () => reply({ result: { tools: [{ name: 'a', description: 'd' }] } }),
        },
        seen,
      ),
      target,
    );
    await session.listTools();
    expect(seen.map((item) => item.method)).toEqual([
      'initialize',
      'notifications/initialized',
      'tools/list',
    ]);
    expect(seen[0]?.headers['authorization']).toBe('Bearer k');
    expect(seen[2]?.headers['mcp-session-id']).toBe('s-1');
    expect(seen[2]?.headers['mcp-protocol-version']).toBeDefined();
  });

  it('lists tools across pages and fills in defaults, skipping nameless ones', async () => {
    const pages = [
      {
        tools: [{ name: 'a', inputSchema: { type: 'object', x: 1 } }, { description: 'no name' }],
        nextCursor: 'p2',
      },
      { tools: [{ name: 'b', description: 5 }] },
    ];
    let page = 0;
    const session = await openSession(
      scripted({ initialize, 'tools/list': () => reply({ result: pages[page++] }) }),
      target,
    );
    expect(await session.listTools()).toEqual([
      { name: 'a', description: '', inputSchema: { type: 'object', x: 1 } },
      { name: 'b', description: '', inputSchema: { type: 'object' } },
    ]);
  });

  it('stops after twenty pages of a server that never ends', async () => {
    let calls = 0;
    const session = await openSession(
      scripted({
        initialize,
        'tools/list': () => {
          calls += 1;
          return reply({ result: { tools: [], nextCursor: 'again' } });
        },
      }),
      target,
    );
    await session.listTools();
    expect(calls).toBe(20);
  });

  it('reads the first message of an event stream', async () => {
    const session = await openSession(
      scripted({
        initialize,
        'tools/list': () =>
          reply('event: message\ndata: {"result":{"tools":[{"name":"s"}]}}\n\n', {
            type: 'text/event-stream',
          }),
      }),
      target,
    );
    expect((await session.listTools()).map((tool) => tool.name)).toEqual(['s']);
  });

  it('turns a tool error and a tool failure into results, not exceptions', async () => {
    const session = await openSession(
      scripted({
        initialize,
        'tools/call': (params) =>
          params['name'] === 'boom'
            ? reply({ error: { message: 'exploded' } })
            : reply({ result: { content: [{ type: 'text', text: 'no' }], isError: true } }),
      }),
      target,
    );
    expect(await session.callTool('boom', {})).toEqual({
      content: [{ type: 'text', text: 'exploded' }],
      isError: true,
    });
    expect((await session.callTool('other', {})).isError).toBe(true);
  });

  it('caps the timeout of a call', async () => {
    const timeouts: number[] = [];
    const fetcher: UpstreamFetch = (url, init, options) => {
      timeouts.push(options.timeoutMs);
      return scripted({ initialize, 'tools/call': () => reply({ result: { content: [] } }) })(
        url,
        init,
        options,
      );
    };
    const session = await openSession(fetcher, target);
    await session.callTool('t', {}, 10 * 60_000);
    expect(timeouts.at(-1)).toBe(120_000);
  });

  it.each([
    [401, 'upstream_unauthorized'],
    [403, 'upstream_unauthorized'],
    [500, 'upstream_unavailable'],
  ])('maps a %i answer to %s and keeps the challenge', async (status, code) => {
    const error = await openSession(
      scripted({
        initialize: () =>
          reply('', { status, headers: { 'www-authenticate': 'Bearer realm="x"' } }),
      }),
      target,
    ).catch((caught: unknown) => caught);
    expect(error).toBeInstanceOf(UpstreamError);
    expect((error as UpstreamError).code).toBe(code);
    expect((error as UpstreamError).challenge).toBe(
      status === 500 ? undefined : 'Bearer realm="x"',
    );
  });

  it.each([
    ['timeout', 'upstream_timeout'],
    ['url_not_allowed', 'url_not_allowed'],
    ['redirect', 'url_not_allowed'],
    ['ECONNRESET', 'upstream_unavailable'],
  ])('maps a transport error %s to %s', async (thrown, code) => {
    const fetcher: UpstreamFetch = () =>
      Promise.reject(Object.assign(new Error('x'), { code: thrown }));
    await expect(openSession(fetcher, target)).rejects.toMatchObject({ code });
  });

  it('refuses bad handshakes and bad replies as protocol errors', async () => {
    await expect(
      openSession(scripted({ initialize: () => reply({ error: { code: -1 } }) }), target),
    ).rejects.toMatchObject({ code: 'upstream_protocol' });
    await expect(
      openSession(scripted({ initialize: () => reply('not json') }), target),
    ).rejects.toMatchObject({ code: 'upstream_protocol' });
    await expect(
      openSession(
        scripted({ initialize: () => reply('event: x\n\n', { type: 'text/event-stream' }) }),
        target,
      ),
    ).rejects.toMatchObject({ code: 'upstream_protocol' });
    const session = await openSession(
      scripted({ initialize, 'tools/list': () => reply({ result: { tools: 'nope' } }) }),
      target,
    );
    await expect(session.listTools()).rejects.toMatchObject({ code: 'upstream_protocol' });
  });

  it('tolerates a server that rejects the acknowledgement but not one that denies it', async () => {
    const tolerant = scripted({
      initialize,
      'notifications/initialized': () => reply('', { status: 500 }),
      'tools/list': () => reply({ result: { tools: [] } }),
    });
    await expect(openSession(tolerant, target).then((s) => s.listTools())).resolves.toEqual([]);
    const denying = scripted({
      initialize,
      'notifications/initialized': () => reply('', { status: 401 }),
    });
    await expect(openSession(denying, target)).rejects.toMatchObject({
      code: 'upstream_unauthorized',
    });
  });
});

describe('hashTools and expandVariables', () => {
  it('hashes a tool list the same whatever its order, and differently when it changes', () => {
    const a = { name: 'a', description: '', inputSchema: {} };
    const b = { name: 'b', description: '', inputSchema: {} };
    expect(hashTools([a, b])).toBe(hashTools([b, a]));
    expect(hashTools([a, b])).not.toBe(hashTools([a, { ...b, description: 'x' }]));
  });

  it('expands known names and leaves unknown or malformed ones alone', () => {
    const values = new Map([
      ['TOKEN', 's3cret'],
      ['a-b', '1'],
    ]);
    expect(
      expandVariables('Bearer ${TOKEN} ${a-b} ${MISSING} ${} $TOKEN ${bad name}', values),
    ).toBe('Bearer s3cret 1 ${MISSING} ${} $TOKEN ${bad name}');
  });
});
