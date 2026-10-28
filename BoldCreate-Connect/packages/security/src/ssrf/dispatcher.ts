/**
 * An undici dispatcher that connects only to addresses the guard validated. The host name is
 * resolved once per new connection, every blocked answer is rejected, and the socket goes to the
 * validated address while TLS SNI and the Host header keep the original host name. It never
 * follows redirects (it is a dispatcher, not a fetch wrapper).
 */
import { Agent, buildConnector, type Dispatcher } from 'undici';
import type { SsrfGuard } from './guard.js';
import { SsrfError } from './errors.js';
import type { SsrfPurpose } from './purposes.js';

export interface PinnedDispatcherOptions {
  purpose: SsrfPurpose;
  allowedHosts?: string[];
  /** Addresses already validated by `checkUrl`, per host name; used instead of a second lookup. */
  pinned?: Record<string, { address: string; family: 4 | 6 }>;
}

export interface PinnedDispatcher extends Dispatcher {
  /** Distinct `ip|port|sni` keys of the connections made so far. */
  poolKeys(): string[];
}

export function createPinnedDispatcher(
  guard: SsrfGuard,
  options: PinnedDispatcherOptions,
): PinnedDispatcher {
  const connector = buildConnector({});
  const keys = new Set<string>();
  const allowed = options.allowedHosts?.map((host) => host.toLowerCase());

  const agent = new Agent({
    connect(connectOptions, callback) {
      const hostname = connectOptions.hostname.replace(/^\[|\]$/g, '').toLowerCase();
      const run = async () => {
        if (allowed && !allowed.includes(hostname)) throw new SsrfError('url_not_allowed', 'host');
        const target = options.pinned?.[hostname] ?? (await guard.resolveHost(hostname));
        keys.add(`${target.address}|${connectOptions.port}|${hostname}`);
        return target;
      };
      run().then(
        (target) =>
          connector(
            {
              ...connectOptions,
              hostname: target.address,
              host: target.address,
              servername: hostname,
            },
            callback,
          ),
        (error: unknown) => callback(error as Error, null),
      );
    },
  });
  return Object.assign(agent, { poolKeys: () => [...keys] });
}
