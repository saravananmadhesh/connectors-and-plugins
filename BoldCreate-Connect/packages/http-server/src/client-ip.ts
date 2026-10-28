import { BlockList, isIP } from 'node:net';

const MAPPED_PREFIX = '::ffff:';

/** `::ffff:10.0.0.1` and `10.0.0.1` are the same address. */
export function normalizeIp(ip: string): string {
  const lower = ip.toLowerCase();
  if (lower.startsWith(MAPPED_PREFIX) && isIP(lower.slice(MAPPED_PREFIX.length)) === 4) {
    return lower.slice(MAPPED_PREFIX.length);
  }
  return lower;
}

/** Builds a matcher over a list of CIDR ranges or single addresses. Throws on a malformed entry. */
export function createTrustedProxyMatcher(entries: readonly string[]): (ip: string) => boolean {
  const list = new BlockList();
  for (const entry of entries) {
    const [address, prefix, extra] = entry.split('/');
    const family = address === undefined ? 0 : isIP(address);
    if (family === 0 || extra !== undefined) throw new Error(`invalid trusted proxy entry`);
    const type = family === 4 ? 'ipv4' : 'ipv6';
    if (prefix === undefined) {
      list.addAddress(address as string, type);
      continue;
    }
    const bits = Number(prefix);
    const max = family === 4 ? 32 : 128;
    if (!/^\d+$/.test(prefix) || bits > max) throw new Error(`invalid trusted proxy entry`);
    list.addSubnet(address as string, bits, type);
  }
  return (ip) => {
    const normalized = normalizeIp(ip);
    const family = isIP(normalized);
    if (family === 0) return false;
    return list.check(normalized, family === 4 ? 'ipv4' : 'ipv6');
  };
}

/**
 * The client address: the socket peer, unless the peer is a trusted proxy, in which case the
 * right-most `X-Forwarded-For` hop that is not itself a trusted proxy.
 */
export function resolveClientIp(
  remoteAddress: string,
  forwardedFor: string | undefined,
  isTrusted: (ip: string) => boolean,
): string {
  const remote = normalizeIp(remoteAddress);
  if (forwardedFor === undefined || !isTrusted(remote)) return remote;
  const hops = forwardedFor
    .split(',')
    .map((hop) => hop.trim())
    .filter((hop) => hop.length > 0);
  for (let index = hops.length - 1; index >= 0; index -= 1) {
    const hop = normalizeIp(hops[index] as string);
    if (isIP(hop) === 0) return remote;
    if (!isTrusted(hop)) return hop;
  }
  return hops.length > 0 ? normalizeIp(hops[0] as string) : remote;
}
