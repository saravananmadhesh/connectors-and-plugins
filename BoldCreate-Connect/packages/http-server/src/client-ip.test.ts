import { describe, expect, it } from 'vitest';
import { createTrustedProxyMatcher, normalizeIp, resolveClientIp } from './client-ip.js';

describe('createTrustedProxyMatcher', () => {
  const trusted = createTrustedProxyMatcher(['10.0.0.0/8', '192.168.1.5', 'fd00::/8']);

  it('matches ranges, single addresses and mapped addresses', () => {
    expect(trusted('10.20.30.40')).toBe(true);
    expect(trusted('192.168.1.5')).toBe(true);
    expect(trusted('::ffff:10.0.0.1')).toBe(true);
    expect(trusted('fd12::1')).toBe(true);
  });

  it('does not match outside the list or for garbage', () => {
    expect(trusted('11.0.0.1')).toBe(false);
    expect(trusted('192.168.1.6')).toBe(false);
    expect(trusted('not-an-ip')).toBe(false);
  });

  it('matches nothing when the list is empty', () => {
    expect(createTrustedProxyMatcher([])('10.0.0.1')).toBe(false);
  });

  it.each(['nope', '10.0.0.0/33', '10.0.0.0/x', '10.0.0.0/8/9', 'fd00::/129'])(
    'rejects the entry %s',
    (entry) => {
      expect(() => createTrustedProxyMatcher([entry])).toThrow('invalid trusted proxy entry');
    },
  );
});

describe('resolveClientIp', () => {
  const trusted = createTrustedProxyMatcher(['10.0.0.0/8']);

  it.each([
    ['no header', '1.2.3.4', undefined, '1.2.3.4'],
    ['untrusted peer ignores the header', '1.2.3.4', '6.6.6.6', '1.2.3.4'],
    ['trusted peer uses the header', '10.0.0.1', '6.6.6.6', '6.6.6.6'],
    ['right-most untrusted hop wins', '10.0.0.1', '6.6.6.6, 8.8.8.8', '8.8.8.8'],
    ['trusted hops are skipped', '10.0.0.1', '8.8.8.8, 10.5.5.5, 10.6.6.6', '8.8.8.8'],
    ['all hops trusted falls back to the first', '10.0.0.1', '10.5.5.5, 10.6.6.6', '10.5.5.5'],
    ['malformed hop falls back to the peer', '10.0.0.1', '8.8.8.8, garbage', '10.0.0.1'],
    ['empty header falls back to the peer', '10.0.0.1', ' , ', '10.0.0.1'],
    ['mapped peer is normalized', '::ffff:1.2.3.4', undefined, '1.2.3.4'],
  ])('%s', (_name, remote, header, expected) => {
    expect(resolveClientIp(remote, header, trusted)).toBe(expected);
  });
});

describe('normalizeIp', () => {
  it('unwraps IPv4-mapped addresses and lower-cases IPv6', () => {
    expect(normalizeIp('::FFFF:1.2.3.4')).toBe('1.2.3.4');
    expect(normalizeIp('FD00::A')).toBe('fd00::a');
    expect(normalizeIp('::ffff:nonsense')).toBe('::ffff:nonsense');
  });
});
