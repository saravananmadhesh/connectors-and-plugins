import { createServer, type Server } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { devStackNote, isListening } from './dev-stack.js';

let server: Server | undefined;

const listen = (): Promise<number> =>
  new Promise((resolve) => {
    server = createServer().listen(0, '127.0.0.1', () => {
      const address = server?.address();
      resolve(typeof address === 'object' && address ? address.port : 0);
    });
  });

afterEach(() => {
  server?.close();
  server = undefined;
});

describe('isListening', () => {
  it('sees an open port and a closed one', async () => {
    const port = await listen();
    expect(await isListening(port)).toBe(true);
    server?.close();
    expect(await isListening(port)).toBe(false);
  });
});

describe('devStackNote', () => {
  it('names a running development stack and stays silent without one', async () => {
    const port = await listen();
    const quiet = { PORT_API: '1', PORT_POSTGRES: '1' };
    expect(await devStackNote(quiet)).toBeUndefined();
    expect(await devStackNote({ ...quiet, PORT_API: String(port) })).toContain('development stack');
  });
});
