import { describe, expect, it } from 'vitest';
import { defaultDevPorts, devPorts, localUrl } from './dev-ports.js';

describe('devPorts', () => {
  it('uses the defaults when nothing is set', () => {
    expect(devPorts({})).toEqual(defaultDevPorts);
  });

  it('reads overrides from the environment', () => {
    const ports = devPorts({ PORT_API: '4001', PORT_DASHBOARD: '6000', PORT_POSTGRES: '55432' });
    expect(ports.api).toBe(4001);
    expect(ports.dashboard).toBe(6000);
    expect(ports.postgres).toBe(55432);
    expect(ports.web).toBe(defaultDevPorts.web);
  });

  it('falls back to the default for empty or invalid values', () => {
    const ports = devPorts({
      PORT_WEB: '',
      PORT_API: 'abc',
      PORT_GATEWAY: '0',
    });
    expect(ports.web).toBe(3000);
    expect(ports.api).toBe(3001);
    expect(ports.gateway).toBe(3002);
  });
});

describe('object store ports', () => {
  it('gives every development port a distinct default', () => {
    const values = Object.values(defaultDevPorts);
    expect(new Set(values).size).toBe(values.length);
  });

  it('overrides the S3 and UI ports separately', () => {
    const ports = devPorts({
      PORT_OBJECT_STORE: '9100',
      PORT_OBJECT_STORE_UI: '9101',
    });
    expect([ports.objectStore, ports.objectStoreUi]).toEqual([9100, 9101]);
  });
});

describe('localUrl', () => {
  it('builds a localhost URL', () => {
    expect(localUrl(3001)).toBe('http://localhost:3001/');
    expect(localUrl(3001, '/docs')).toBe('http://localhost:3001/docs');
    expect(localUrl(3001, '')).toBe('http://localhost:3001');
  });
});
