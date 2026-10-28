/**
 * The private-process harness: starts an extra api with its own settings, reaches it, and
 * releases its port when it stops.
 */
import { describe, expect, it } from 'vitest';
import { isPortOpen, restartApp, startPrivateApi, stopApp } from './support/harness.js';

describe('private app harness', () => {
  it('starts a private api, answers /healthz and releases the port on stop', async () => {
    const app = await startPrivateApi({ LOGIN_THROTTLE_IP_LIMIT: '7' });
    try {
      const response = await fetch(`${app.url}/healthz`);
      expect(response.status).toBe(200);
      expect(await isPortOpen(app.port)).toBe(true);
    } finally {
      await stopApp('api');
    }
    expect(await isPortOpen(app.port)).toBe(false);
  }, 90_000);

  it('restarts a private process on a new port and refuses a second one of the same app', async () => {
    const first = await startPrivateApi();
    try {
      await expect(startPrivateApi()).rejects.toThrow('already running');
      const second = await restartApp('api');
      expect((await fetch(`${second.url}/healthz`)).status).toBe(200);
      expect(await isPortOpen(first.port)).toBe(false);
    } finally {
      await stopApp('api');
    }
  }, 120_000);

  it('rejects a restart when nothing is running', async () => {
    await expect(restartApp('worker')).rejects.toThrow('no private worker is running');
  });
});
