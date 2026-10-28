/**
 * The services only reach one upstream port, so every suite that plays an upstream server shares
 * it. Suites run in parallel, so a listener waits for the previous holder to let go.
 */
import type { Server } from 'node:http';
import { requireEnv } from '../test-env.js';

export const FIXTURE_PORT = Number(requireEnv('TEST_UPSTREAM_PORT'));
export const FIXTURE_ORIGIN = `http://127.0.0.1:${FIXTURE_PORT}`;

const WAIT_MS = 120_000;

export async function listenOnFixturePort(server: Server): Promise<Server> {
  const deadline = Date.now() + WAIT_MS;
  for (;;) {
    try {
      await new Promise<void>((resolve, reject) => {
        const failed = (error: Error) => reject(error);
        server.once('error', failed);
        server.listen(FIXTURE_PORT, '127.0.0.1', () => {
          server.off('error', failed);
          resolve();
        });
      });
      return server;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EADDRINUSE' || Date.now() > deadline) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
}
