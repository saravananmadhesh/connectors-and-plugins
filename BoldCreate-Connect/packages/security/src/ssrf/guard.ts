/**
 * Outbound URL validation. Every server-side request to a URL that a user, a plugin or a remote
 * document supplied goes through `checkUrl`, and the connection itself goes through the pinned
 * dispatcher (see `dispatcher.ts`) so a DNS answer validated here is the address that is used.
 */
import { lookup } from 'node:dns/promises';
import { isBlockedAddress, addressFamily, isIpLiteral } from './addresses.js';
import { SsrfError } from './errors.js';
import type { SsrfPurpose } from './purposes.js';
import { SSRF_PURPOSES } from './purposes.js';

export const DNS_TIMEOUT_MS = 3000;

export interface SsrfGuardOptions {
  /** True in staging and production (`isDeployed(config.DEPLOY_ENV)`). */
  deployed: boolean;
  /** Non-default ports that may be called. */
  allowedPorts?: number[];
  /** The only loopback allowance, ignored when deployed: hosts that may use `http` and loopback. */
  allowHttpHosts?: string[];
  resolver?: (host: string) => Promise<string[]>;
  dnsTimeoutMs?: number;
}

export interface CheckedUrl {
  url: URL;
  address: string;
  family: 4 | 6;
  /** Host name for TLS SNI and the Host header. */
  servername: string;
}

export interface SsrfGuard {
  checkUrl(
    raw: string,
    opts: { purpose: SsrfPurpose; allowedHosts?: string[] },
  ): Promise<CheckedUrl>;
  /** Resolves a host name once and rejects every blocked answer. */
  resolveHost(hostname: string): Promise<{ address: string; family: 4 | 6 }>;
}

async function defaultResolver(host: string): Promise<string[]> {
  const answers = await lookup(host, { all: true, verbatim: true });
  return answers.map((answer) => answer.address);
}

function stripBrackets(host: string): string {
  return host.startsWith('[') && host.endsWith(']') ? host.slice(1, -1) : host;
}

export function createSsrfGuard(options: SsrfGuardOptions): SsrfGuard {
  const resolver = options.resolver ?? defaultResolver;
  const dnsTimeoutMs = options.dnsTimeoutMs ?? DNS_TIMEOUT_MS;
  const allowedPorts = new Set(options.allowedPorts ?? []);
  const httpHosts = new Set((options.allowHttpHosts ?? []).map((host) => host.toLowerCase()));

  /** Loopback and plain http are allowed only outside deployed environments, by name. */
  const isExemptHost = (host: string) => !options.deployed && httpHosts.has(host.toLowerCase());

  async function resolveWithTimeout(host: string): Promise<string[]> {
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new SsrfError('url_not_allowed', 'dns')), dnsTimeoutMs);
    });
    try {
      return await Promise.race([resolver(host), timeout]);
    } catch (error) {
      if (error instanceof SsrfError) throw error;
      throw new SsrfError('url_not_allowed', 'dns');
    } finally {
      clearTimeout(timer);
    }
  }

  async function resolveHost(hostname: string) {
    const host = stripBrackets(hostname);
    const exempt = isExemptHost(host);
    if (isIpLiteral(host)) {
      if (!exempt && isBlockedAddress(host))
        throw new SsrfError('url_not_allowed', 'blocked_address');
      return { address: host, family: addressFamily(host) };
    }
    const answers = await resolveWithTimeout(host);
    if (answers.length === 0) throw new SsrfError('url_not_allowed', 'dns');
    // Every answer must be allowed; one private address among public ones is a rejection.
    if (!exempt && answers.some((answer) => isBlockedAddress(answer))) {
      throw new SsrfError('url_not_allowed', 'blocked_address');
    }
    // One address is pinned for the connection. Prefer IPv4: a deployment without IPv6 routes would
    // fail on an IPv6 answer that DNS happens to list first, though the host is reachable.
    const address = answers.find((answer) => addressFamily(answer) === 4) ?? answers[0]!;
    return { address, family: addressFamily(address) };
  }

  return {
    resolveHost,

    async checkUrl(raw, { purpose, allowedHosts }) {
      const limits = SSRF_PURPOSES[purpose];
      if (limits.requiresAllowedHosts && (!allowedHosts || allowedHosts.length === 0)) {
        throw new SsrfError('configuration');
      }
      // The URL parser silently drops tabs and newlines and treats a backslash as a slash.
      // eslint-disable-next-line no-control-regex
      if (/[\u0000- \u007f\\]/.test(raw)) throw new SsrfError('url_not_allowed', 'syntax');
      let url: URL;
      try {
        url = new URL(raw);
      } catch {
        throw new SsrfError('url_not_allowed', 'syntax');
      }
      if (url.username !== '' || url.password !== '') {
        throw new SsrfError('url_not_allowed', 'userinfo');
      }
      const host = stripBrackets(url.hostname);
      if (host === '') throw new SsrfError('url_not_allowed', 'host');
      if (url.protocol !== 'https:') {
        if (url.protocol !== 'http:' || !isExemptHost(host)) {
          throw new SsrfError('url_not_allowed', 'scheme');
        }
      }
      if (url.port !== '' && !allowedPorts.has(Number(url.port))) {
        throw new SsrfError('url_not_allowed', 'port');
      }
      if (allowedHosts && !allowedHosts.map((entry) => entry.toLowerCase()).includes(host)) {
        throw new SsrfError('url_not_allowed', 'host');
      }
      const { address, family } = await resolveHost(host);
      return { url, address, family, servername: host };
    },
  };
}
