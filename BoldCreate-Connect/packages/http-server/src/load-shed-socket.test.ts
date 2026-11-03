import { afterEach, describe, expect, it } from 'vitest';
import { buildTestServer, type TestServer } from './testing.js';

let server: TestServer | undefined;
afterEach(async () => {
  await server?.app.close();
  server = undefined;
});

async function open(maxInflight: number): Promise<{ server: TestServer; base: string }> {
  const built = buildTestServer({ config: { HTTP_MAX_INFLIGHT: maxInflight } });
  server = built;
  built.app.get('/ok', async () => ({ ok: true }));
  built.app.get('/empty', async (_request, reply) => reply.status(204).send());
  built.app.get('/bad', async (_request, reply) => reply.status(500).send({ error: 'x' }));
  built.app.get('/throws', async () => {
    throw new Error('boom');
  });
  await built.app.listen({ port: 0, host: '127.0.0.1' });
  const address = built.app.server.address();
  const port = typeof address === 'object' && address ? address.port : 0;
  return { server: built, base: `http://127.0.0.1:${port}` };
}

describe('the in-flight count over real connections', () => {
  it.each(['/ok', '/empty', '/bad', '/throws', '/missing'])(
    'returns to zero after many sequential calls to %s',
    async (path) => {
      const { base } = await open(3);
      for (let i = 0; i < 30; i += 1) {
        const response = await fetch(`${base}${path}`);
        await response.arrayBuffer();
        expect(response.status).not.toBe(503);
      }
    },
  );

  it('returns to zero after calls the client abandons', async () => {
    const { base } = await open(3);
    for (let i = 0; i < 20; i += 1) {
      const controller = new AbortController();
      const pending = fetch(`${base}/ok`, { signal: controller.signal }).catch(() => undefined);
      controller.abort();
      await pending;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    for (let i = 0; i < 10; i += 1) {
      const response = await fetch(`${base}/ok`);
      await response.arrayBuffer();
      expect(response.status).toBe(200);
    }
  });

  it('returns to zero after concurrent bursts', async () => {
    const { base } = await open(50);
    for (let round = 0; round < 10; round += 1) {
      const responses = await Promise.all(Array.from({ length: 20 }, () => fetch(`${base}/ok`)));
      await Promise.all(responses.map((response) => response.arrayBuffer()));
      expect(responses.every((response) => response.status === 200)).toBe(true);
    }
  });
});
