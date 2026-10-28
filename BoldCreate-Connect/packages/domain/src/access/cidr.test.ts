import { describe, expect, it } from 'vitest';
import { ipInCidrs, normalizeCidr } from './cidr.js';

describe('normalizeCidr', () => {
  it('keeps a valid block in lower case', () => {
    expect(normalizeCidr('203.0.113.0/24')).toBe('203.0.113.0/24');
    expect(normalizeCidr(' 2001:DB8::/32 ')).toBe('2001:db8::/32');
  });

  it('refuses a block that matches everything, a bare address and a bad prefix', () => {
    for (const raw of [
      '0.0.0.0/0',
      '::/0',
      '203.0.113.9',
      '203.0.113.0/33',
      '2001:db8::/129',
      '203.0.113.0/-1',
      '203.0.113.0/abc',
      '203.0.113.0/24/1',
      'fe80::1%eth0/64',
      'example.com/24',
      '',
    ]) {
      expect(normalizeCidr(raw)).toBeNull();
    }
  });
});

describe('ipInCidrs', () => {
  it('finds an address inside one of the blocks and refuses one outside all of them', () => {
    const blocks = ['203.0.113.0/24', '2001:db8::/32'];
    expect(ipInCidrs('203.0.113.9', blocks)).toBe(true);
    expect(ipInCidrs('2001:db8::5', blocks)).toBe(true);
    expect(ipInCidrs('203.0.114.9', blocks)).toBe(false);
    expect(ipInCidrs('2001:db9::5', blocks)).toBe(false);
  });

  it('reads an IPv4 address written as IPv6 as the IPv4 address', () => {
    expect(ipInCidrs('::ffff:203.0.113.9', ['203.0.113.0/24'])).toBe(true);
    expect(ipInCidrs('::ffff:198.51.100.9', ['203.0.113.0/24'])).toBe(false);
  });

  it('never allows a missing, malformed or zoned address', () => {
    for (const ip of [undefined, '', 'not-an-ip', '203.0.113.256', 'fe80::1%eth0']) {
      expect(ipInCidrs(ip, ['203.0.113.0/24', 'fe80::/10'])).toBe(false);
    }
  });

  it('allows nothing when the list is empty or holds an entry that cannot be read', () => {
    expect(ipInCidrs('203.0.113.9', [])).toBe(false);
    expect(ipInCidrs('203.0.113.9', ['garbage/xx', '203.0.113.0/99'])).toBe(false);
  });

  it('does not let an IPv4 block match an IPv6 address or the other way round', () => {
    expect(ipInCidrs('2001:db8::1', ['203.0.113.0/24'])).toBe(false);
    expect(ipInCidrs('203.0.113.9', ['2001:db8::/32'])).toBe(false);
  });
});
