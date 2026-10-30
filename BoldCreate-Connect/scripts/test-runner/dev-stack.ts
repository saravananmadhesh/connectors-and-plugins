import { connect } from 'node:net';
import { devPorts } from '../dev-ports.js';

/** Whether something accepts connections on the local port. */
export function isListening(port: number, timeoutMs = 300): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = connect({ host: '127.0.0.1', port });
    const done = (listening: boolean) => {
      socket.destroy();
      resolve(listening);
    };
    socket.setTimeout(timeoutMs, () => done(false));
    socket.once('connect', () => done(true));
    socket.once('error', () => done(false));
  });
}

/**
 * A line to print when a development stack is up beside a test run, or undefined. The two use
 * different ports and databases, so they do not clash, but they share the machine and a loaded
 * one makes timing-sensitive tests slower.
 */
export async function devStackNote(
  env: NodeJS.ProcessEnv = process.env,
): Promise<string | undefined> {
  const ports = devPorts(env);
  const [api, postgres] = await Promise.all([isListening(ports.api), isListening(ports.postgres)]);
  if (!api && !postgres) return undefined;
  return (
    'a development stack is running (pnpm dev); it shares this machine, so a test can time out ' +
    'under load. Stop it for a faster, steadier run.'
  );
}
