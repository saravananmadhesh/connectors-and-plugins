import { describe, expect, it } from 'vitest';
import { isBlockedAddress, parseAddress } from './addresses.js';
import { SsrfError } from './errors.js';
import { createSsrfGuard, type SsrfGuardOptions } from './guard.js';

describe('blocked addresses', () => {
  it.each([
    '0.0.0.0',
    '0.255.255.255',
    '10.0.0.1',
    '100.64.0.0',
    '100.127.255.255',
    '127.0.0.1',
    '169.254.169.254',
    '169.254.170.2',
    '100.100.100.200',
    '172.16.0.1',
    '172.31.255.255',
    '192.0.0.1',
    '192.168.1.1',
    '198.18.0.1',
    '198.19.255.255',
    '224.0.0.1',
    '240.0.0.1',
    '255.255.255.255',
    '::',
    '::1',
    'fc00::1',
    'fdff::1',
    'fe80::1',
    'ff02::1',
    '64:ff9b::7f00:1',
    '64:ff9b:1::1',
    '::ffff:127.0.0.1',
    '::ffff:7f00:1',
    '::ffff:10.1.2.3',
    '2001:db8::1',
    'fd00:ec2::254',
    '::7f00:1',
  ])('blocks %s', (address) => {
    expect(isBlockedAddress(address)).toBe(true);
  });

  it.each([
    '100.63.255.255',
    '100.128.0.0',
    '172.15.255.255',
    '172.32.0.0',
    '192.0.1.1',
    '192.169.0.1',
    '198.17.255.255',
    '198.20.0.0',
    '223.255.255.255',
    '8.8.8.8',
    '1.1.1.1',
    '2606:4700:4700::1111',
    '::ffff:8.8.8.8',
    '2001:4860:4860::8888',
  ])('allows %s', (address) => {
    expect(isBlockedAddress(address)).toBe(false);
  });

  it('treats unparseable input as blocked', () => {
    expect(isBlockedAddress('not-an-ip')).toBe(true);
    expect(parseAddress('1.2.3')).toBeNull();
    expect(parseAddress('fe80::1%eth0')).toBeNull();
  });
});

const publicResolver = async () => ['93.184.216.34'];

function guard(options: Partial<SsrfGuardOptions> = {}) {
  return createSsrfGuard({ deployed: true, resolver: publicResolver, ...options });
}

const check = (raw: string, options: Partial<SsrfGuardOptions> = {}, hosts?: string[]) =>
  guard(options).checkUrl(raw, {
    purpose: 'mcp_upstream',
    ...(hosts ? { allowedHosts: hosts } : {}),
  });

async function reason(promise: Promise<unknown>): Promise<string | undefined> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof SsrfError) return `${error.code}:${error.reason}`;
    throw error;
  }
  return 'allowed';
}

describe('checkUrl', () => {
  it('accepts a public https URL and returns the pinned address', async () => {
    const result = await check('https://Example.com/path?q=1');
    expect(result).toMatchObject({
      address: '93.184.216.34',
      family: 4,
      servername: 'example.com',
    });
    expect(result.url.pathname).toBe('/path');
  });

  it.each([
    ['https://a@evil.example/', 'userinfo'],
    ['https://%40evil.example/', 'syntax'],
    ['https://user:pass@host.example/', 'userinfo'],
    ['https://a%2540b@host.example/', 'userinfo'],
    ['https://host.example\\@evil.example/', 'syntax'],
    ['https://host.example/\n', 'syntax'],
    ['not a url', 'syntax'],
    ['http://example.com/', 'scheme'],
    ['ftp://example.com/', 'scheme'],
    ['https://example.com:8443/', 'port'],
  ])('rejects %s', async (raw, expected) => {
    expect(await reason(check(raw))).toBe(`url_not_allowed:${expected}`);
  });

  it('rejects http in staging even for a listed host', async () => {
    expect(await reason(check('http://example.com/', { allowHttpHosts: ['example.com'] }))).toBe(
      'url_not_allowed:scheme',
    );
  });

  it('allows a non-default port only when listed', async () => {
    expect(await reason(check('https://example.com:8443/', { allowedPorts: [8443] }))).toBe(
      'allowed',
    );
  });

  it.each([
    'https://127.0.0.1/',
    'https://2130706433/',
    'https://0177.0.0.1/',
    'https://0x7f.1/',
    'https://[::1]/',
    'https://[::ffff:127.0.0.1]/',
    'https://[64:ff9b::7f00:1]/',
    'https://169.254.169.254/latest/meta-data',
    'https://10.0.0.5/',
  ])('rejects the literal address in %s', async (raw) => {
    expect(await reason(check(raw))).toBe('url_not_allowed:blocked_address');
  });

  it('rejects a host name that resolves to a blocked address', async () => {
    const resolver = async () => ['10.0.0.9'];
    expect(await reason(check('https://internal.example/', { resolver }))).toBe(
      'url_not_allowed:blocked_address',
    );
  });

  it('rejects mixed answers when one is private', async () => {
    const resolver = async () => ['93.184.216.34', '192.168.0.10'];
    expect(await reason(check('https://mixed.example/', { resolver }))).toBe(
      'url_not_allowed:blocked_address',
    );
    const v6 = async () => ['93.184.216.34', '::1'];
    expect(await reason(check('https://mixed.example/', { resolver: v6 }))).toBe(
      'url_not_allowed:blocked_address',
    );
  });

  it('fails closed on NXDOMAIN, an empty answer and a timeout', async () => {
    const nxdomain = async () => {
      throw Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' });
    };
    expect(await reason(check('https://gone.example/', { resolver: nxdomain }))).toBe(
      'url_not_allowed:dns',
    );
    expect(await reason(check('https://empty.example/', { resolver: async () => [] }))).toBe(
      'url_not_allowed:dns',
    );
    const never = () => new Promise<string[]>(() => undefined);
    expect(
      await reason(check('https://slow.example/', { resolver: never, dnsTimeoutMs: 20 })),
    ).toBe('url_not_allowed:dns');
  });

  it('allows loopback http only for listed hosts outside deployed environments', async () => {
    const options = { deployed: false, allowHttpHosts: ['127.0.0.1', 'fixture.test'] };
    expect(await reason(check('http://127.0.0.1:9/', { ...options, allowedPorts: [9] }))).toBe(
      'allowed',
    );
    const loopback = async () => ['127.0.0.1'];
    expect(await reason(check('http://fixture.test/', { ...options, resolver: loopback }))).toBe(
      'allowed',
    );
    expect(await reason(check('http://localhost/', { ...options, resolver: loopback }))).toBe(
      'url_not_allowed:scheme',
    );
    // The allowance does not exist when deployed.
    expect(
      await reason(check('https://127.0.0.1/', { deployed: true, allowHttpHosts: ['127.0.0.1'] })),
    ).toBe('url_not_allowed:blocked_address');
  });

  it('checks allowedHosts before any DNS lookup', async () => {
    let lookups = 0;
    const resolver = async () => {
      lookups += 1;
      return ['93.184.216.34'];
    };
    expect(await reason(check('https://other.example/', { resolver }, ['api.github.com']))).toBe(
      'url_not_allowed:host',
    );
    expect(lookups).toBe(0);
    expect(await reason(check('https://API.github.com/', { resolver }, ['api.github.com']))).toBe(
      'allowed',
    );
  });

  it('requires allowedHosts for purposes that need them', async () => {
    const result = await reason(
      guard().checkUrl('https://api.github.com/', { purpose: 'github_source' }),
    );
    expect(result).toBe('configuration:undefined');
  });

  it('accepts the OIDC purposes for a public https host', async () => {
    for (const purpose of ['oidc_token', 'oidc_jwks'] as const) {
      await expect(
        guard().checkUrl('https://login.example/keys', { purpose }),
      ).resolves.toBeDefined();
    }
  });

  it('uses the fixed message for every refusal', async () => {
    const error = await check('https://10.0.0.1/').catch((e: Error) => e);
    expect((error as Error).message).toBe('url_not_allowed');
  });
});
