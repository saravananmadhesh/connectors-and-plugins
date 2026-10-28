/**
 * Blocked address ranges and IP literal parsing. Pure: no DNS, no I/O.
 */
import { isIP } from 'node:net';

export interface ParsedAddress {
  family: 4 | 6;
  value: bigint;
}

const V4_BLOCKED = [
  '0.0.0.0/8',
  '10.0.0.0/8',
  '100.64.0.0/10',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '172.16.0.0/12',
  '192.0.0.0/24',
  '192.168.0.0/16',
  '198.18.0.0/15',
  '224.0.0.0/4',
  '240.0.0.0/4',
  // Metadata endpoints (also inside the ranges above; listed so the intent is visible).
  '169.254.169.254/32',
  '169.254.170.2/32',
  '100.100.100.200/32',
];

const V6_BLOCKED = [
  '::/128',
  '::1/128',
  // IPv4-compatible addresses (deprecated); never legitimate.
  '::/96',
  'fc00::/7',
  'fe80::/10',
  'ff00::/8',
  '64:ff9b::/96',
  '64:ff9b:1::/48',
  '2001:db8::/32',
  'fd00:ec2::254/128',
];

/** Parses dotted IPv4. Only canonical dotted decimal; the URL parser normalises other forms. */
function parseV4(text: string): bigint | null {
  const parts = text.split('.');
  if (parts.length !== 4) return null;
  let value = 0n;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = (value << 8n) | BigInt(octet);
  }
  return value;
}

function parseV6(raw: string): bigint | null {
  let text = raw;
  if (text.includes('%')) return null;
  // An embedded IPv4 tail becomes two hextets.
  const lastColon = text.lastIndexOf(':');
  if (text.includes('.')) {
    const v4 = parseV4(text.slice(lastColon + 1));
    if (v4 === null) return null;
    text = `${text.slice(0, lastColon + 1)}${(v4 >> 16n).toString(16)}:${(v4 & 0xffffn).toString(16)}`;
  }
  const halves = text.split('::');
  if (halves.length > 2) return null;
  const toGroups = (part: string) => (part === '' ? [] : part.split(':'));
  const head = toGroups(halves[0] ?? '');
  const tail = halves.length === 2 ? toGroups(halves[1] ?? '') : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? head.length !== 8 : missing < 1) return null;
  const groups =
    halves.length === 1 ? head : [...head, ...Array<string>(missing).fill('0'), ...tail];
  let value = 0n;
  for (const group of groups) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(group)) return null;
    value = (value << 16n) | BigInt(parseInt(group, 16));
  }
  return value;
}

/** Parses an IPv4 or IPv6 address (brackets allowed); null when it is not an IP literal. */
export function parseAddress(raw: string): ParsedAddress | null {
  const text = raw.startsWith('[') && raw.endsWith(']') ? raw.slice(1, -1) : raw;
  const family = isIP(text);
  if (family === 4) {
    const value = parseV4(text);
    return value === null ? null : { family: 4, value };
  }
  if (family === 6) {
    const value = parseV6(text);
    return value === null ? null : { family: 6, value };
  }
  return null;
}

interface Range {
  family: 4 | 6;
  base: bigint;
  bits: number;
}

function toRange(cidr: string): Range {
  const [address, length] = cidr.split('/');
  const parsed = parseAddress(address ?? '');
  if (!parsed) throw new Error(`invalid CIDR ${cidr}`);
  return { family: parsed.family, base: parsed.value, bits: Number(length) };
}

const RANGES: Range[] = [...V4_BLOCKED, ...V6_BLOCKED].map(toRange);

function inRange(address: ParsedAddress, range: Range): boolean {
  if (address.family !== range.family) return false;
  const total = address.family === 4 ? 32n : 128n;
  const shift = total - BigInt(range.bits);
  return address.value >> shift === range.base >> shift;
}

const MAPPED_PREFIX = 0xffffn;

/** True when the address is in a blocked range. IPv4-mapped IPv6 uses the embedded IPv4. */
export function isBlockedAddress(raw: string): boolean {
  const address = parseAddress(raw);
  if (!address) return true;
  if (address.family === 6 && address.value >> 32n === MAPPED_PREFIX) {
    return isBlockedParsed({ family: 4, value: address.value & 0xffffffffn });
  }
  return isBlockedParsed(address);
}

function isBlockedParsed(address: ParsedAddress): boolean {
  return RANGES.some((range) => inRange(address, range));
}

/** True when the host text is an IP literal in any form the URL parser accepts. */
export function isIpLiteral(host: string): boolean {
  return parseAddress(host) !== null;
}

export function addressFamily(raw: string): 4 | 6 {
  const parsed = parseAddress(raw);
  return parsed ? parsed.family : 4;
}
