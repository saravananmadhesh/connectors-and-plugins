import { BlockList, isIP } from 'node:net';

/**
 * A CIDR block in its lower-case form (`10.0.0.0/8`, `2001:db8::/32`), or null when it is not one.
 * A block that matches every address (prefix 0) is refused: an allowlist that allows everything
 * only looks like protection.
 */
export function normalizeCidr(raw: string): string | null {
  const parts = raw.trim().split('/');
  if (parts.length !== 2) return null;
  const [address, prefixText] = parts as [string, string];
  const version = isIP(address);
  if (version === 0 || address.includes('%')) return null;
  if (!/^\d{1,3}$/.test(prefixText)) return null;
  const prefix = Number(prefixText);
  const max = version === 4 ? 32 : 128;
  if (prefix < 1 || prefix > max) return null;
  return `${address.toLowerCase()}/${prefix}`;
}

/** An IPv4 address written as an IPv6 one (`::ffff:203.0.113.9`) is read as the IPv4 address. */
function plainAddress(ip: string): string {
  const lower = ip.trim().toLowerCase();
  const mapped = lower.startsWith('::ffff:') ? lower.slice(7) : null;
  return mapped !== null && isIP(mapped) === 4 ? mapped : lower;
}

/**
 * Whether `ip` lies inside one of the blocks. A missing or malformed address is never inside, so a
 * key limited by address cannot be used from a caller whose address is unknown.
 */
export function ipInCidrs(ip: string | undefined, cidrs: readonly string[]): boolean {
  if (!ip) return false;
  const address = plainAddress(ip);
  const version = isIP(address);
  if (version === 0 || address.includes('%')) return false;
  const list = new BlockList();
  for (const cidr of cidrs) {
    const [network, prefix] = cidr.split('/') as [string, string];
    const family = isIP(network) === 4 ? 'ipv4' : 'ipv6';
    try {
      list.addSubnet(network, Number(prefix), family);
    } catch {
      // An entry that cannot be read allows nothing.
    }
  }
  return list.check(address, version === 4 ? 'ipv4' : 'ipv6');
}
