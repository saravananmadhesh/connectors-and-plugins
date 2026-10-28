/**
 * Redis adapters: cache (with pub/sub), lock and limiter over one `ioredis` connection.
 *
 * There is no in-memory fallback: when Redis is unreachable every call rejects with
 * `redis_unavailable`.
 */
import { randomUUID } from 'node:crypto';
import { Redis } from 'ioredis';
import { readTlsCa } from './tls-ca.js';
import type {
  CacheKey,
  CachePort,
  LimiterPort,
  LimitResult,
  LockHandle,
  LockPort,
} from '@boldcreate-integrations/ports';

export interface RedisAdapterOptions {
  /** `redis://`, `rediss://` (TLS) URL, or Sentinel string (`mymaster,host1:26379,host2:26379`). */
  url: string;
  /** Milliseconds a command may take before it rejects with `redis_unavailable`. */
  commandTimeoutMs?: number;
  /** Prefix added to every key (for example to separate test runs). */
  keyPrefix?: string;
  /** Credentials of a managed service; they take precedence over any in the URL. */
  username?: string | undefined;
  password?: string | undefined;
  /** Path of a PEM file with the certificate authority that signed the server certificate. */
  tlsCaFile?: string | undefined;
}

/** Parses comma-separated Sentinel strings like `mymaster,host1:port1,host2:port2`. */
export function parseSentinelEndpoints(
  raw: string,
): { name: string; sentinels: Array<{ host: string; port: number }> } | undefined {
  if (
    !raw.includes(',') &&
    !raw.startsWith('sentinel://') &&
    !raw.startsWith('redis-sentinel://')
  ) {
    return undefined;
  }
  const clean = raw.replace(/^(redis-sentinel|sentinel):\/\//, '');
  const parts = clean
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return undefined;

  const name = parts[0];
  if (!name) return undefined;
  const sentinels: Array<{ host: string; port: number }> = [];

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    const colon = part.lastIndexOf(':');
    if (colon !== -1) {
      const host = part.slice(0, colon);
      const port = Number.parseInt(part.slice(colon + 1), 10);
      sentinels.push({ host, port: Number.isFinite(port) ? port : 26379 });
    } else {
      sentinels.push({ host: part, port: 26379 });
    }
  }

  return { name, sentinels };
}

/** The connection settings that depend on TLS and credentials. */
export function redisSecurityOptions(options: RedisAdapterOptions) {
  const tls = options.url.startsWith('rediss://');
  return {
    ...(options.username ? { username: options.username } : {}),
    ...(options.password ? { password: options.password, sentinelPassword: options.password } : {}),
    ...(tls ? { tls: options.tlsCaFile ? { ca: readTlsCa(options.tlsCaFile) } : {} } : {}),
  };
}

export interface RedisConfig {
  REDIS_URL: string;
  REDIS_USERNAME?: string | undefined;
  REDIS_PASSWORD?: string | undefined;
  REDIS_TLS_CA?: string | undefined;
  /** Prefix added to every key, for example to separate test runs. */
  keyPrefix?: string | undefined;
}

export function createRedisAdaptersFromConfig(config: RedisConfig): RedisAdapters {
  return createRedisAdapters({
    url: config.REDIS_URL,
    username: config.REDIS_USERNAME,
    password: config.REDIS_PASSWORD,
    tlsCaFile: config.REDIS_TLS_CA,
    ...(config.keyPrefix === undefined ? {} : { keyPrefix: config.keyPrefix }),
  });
}

export interface RedisAdapters {
  cache: CachePort;
  lock: LockPort;
  limiter: LimiterPort;
  close(): Promise<void>;
}

const UNAVAILABLE = 'redis_unavailable';

const RELEASE_SCRIPT = `
if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end`;

const EXTEND_SCRIPT = `
if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('pexpire', KEYS[1], ARGV[2]) else return 0 end`;

/** INCR, set the expiry on the first hit, and return the count with the remaining ttl (ms). */
const LIMIT_SCRIPT = `
local count = redis.call('incr', KEYS[1])
if count == 1 then redis.call('pexpire', KEYS[1], ARGV[1]) end
local ttl = redis.call('pttl', KEYS[1])
return {count, ttl}`;

const INCREMENT_SCRIPT = `
local count = redis.call('incr', KEYS[1])
if count == 1 and tonumber(ARGV[1]) > 0 then redis.call('expire', KEYS[1], ARGV[1]) end
return count`;

export function createRedisAdapters(options: RedisAdapterOptions): RedisAdapters {
  const timeout = options.commandTimeoutMs ?? 2000;
  const prefix = options.keyPrefix ?? '';
  const sentinel = parseSentinelEndpoints(options.url);
  const connect = () =>
    sentinel
      ? new Redis({
          name: sentinel.name,
          sentinels: sentinel.sentinels,
          commandTimeout: timeout,
          connectTimeout: timeout,
          maxRetriesPerRequest: 0,
          enableOfflineQueue: false,
          retryStrategy: () => null,
          lazyConnect: true,
          ...redisSecurityOptions(options),
        })
      : new Redis(options.url, {
          commandTimeout: timeout,
          connectTimeout: timeout,
          maxRetriesPerRequest: 0,
          enableOfflineQueue: false,
          retryStrategy: () => null,
          lazyConnect: true,
          ...redisSecurityOptions(options),
        });
  const client = connect();
  let subscriber: Redis | undefined;
  const handlers = new Map<string, Set<(message: string) => void>>();

  let connecting: Promise<void> | undefined;

  /** Concurrent first calls share one connection attempt instead of racing to start it. */
  async function ready(): Promise<void> {
    if (client.status === 'ready') return;
    if (client.status === 'wait' || client.status === 'end') {
      connecting ??= client.connect().finally(() => {
        connecting = undefined;
      });
    }
    if (connecting) await connecting;
  }

  async function run<T>(operation: (redis: Redis) => Promise<T>): Promise<T> {
    try {
      await ready();
      return await operation(client);
    } catch (error) {
      if (error instanceof Error && error.message === UNAVAILABLE) throw error;
      throw new Error(UNAVAILABLE, { cause: error });
    }
  }

  const k = (key: CacheKey) => `${prefix}${key}`;

  async function subscriberClient(): Promise<Redis> {
    if (!subscriber) {
      subscriber = connect();
      subscriber.on('message', (channel: string, message: string) => {
        for (const handler of handlers.get(channel) ?? []) handler(message);
      });
      subscriber.on('error', () => undefined);
      await subscriber.connect();
    }
    return subscriber;
  }

  client.on('error', () => undefined);

  const cache: CachePort = {
    get: (key) => run((r) => r.get(k(key))),
    async set(key, value, opts) {
      await run((r) =>
        opts?.ttlSeconds ? r.set(k(key), value, 'EX', opts.ttlSeconds) : r.set(k(key), value),
      );
    },
    async delete(key) {
      await run((r) => r.del(k(key)));
    },
    increment: (key, opts) =>
      run(async (r) =>
        Number(await r.eval(INCREMENT_SCRIPT, 1, k(key), String(opts?.ttlSeconds ?? 0))),
      ),
    async publish(channel, message) {
      await run((r) => r.publish(`${prefix}${channel}`, message));
    },
    async subscribe(channel, handler) {
      const full = `${prefix}${channel}`;
      try {
        const sub = await subscriberClient();
        let set = handlers.get(full);
        if (!set) {
          set = new Set();
          handlers.set(full, set);
          await sub.subscribe(full);
        }
        set.add(handler);
        return async () => {
          const current = handlers.get(full);
          current?.delete(handler);
          if (current && current.size === 0) {
            handlers.delete(full);
            await sub.unsubscribe(full).catch(() => undefined);
          }
        };
      } catch (error) {
        throw new Error(UNAVAILABLE, { cause: error });
      }
    },
    async ping() {
      await run((r) => r.ping());
    },
  };

  const lock: LockPort = {
    async acquire(key, opts): Promise<LockHandle | null> {
      const token = randomUUID();
      const reply = await run((r) => r.set(k(key), token, 'PX', opts.ttlMs, 'NX'));
      if (reply !== 'OK') return null;
      return {
        token,
        extend: async (ttlMs) =>
          (await run((r) => r.eval(EXTEND_SCRIPT, 1, k(key), token, String(ttlMs)))) === 1,
        release: async () => (await run((r) => r.eval(RELEASE_SCRIPT, 1, k(key), token))) === 1,
      };
    },
  };

  const limiter: LimiterPort = {
    async check(key, opts): Promise<LimitResult> {
      const [count, ttl] = (await run((r) =>
        r.eval(LIMIT_SCRIPT, 1, k(key), String(opts.windowSeconds * 1000)),
      )) as [number, number];
      return {
        allowed: count <= opts.limit,
        remaining: Math.max(0, opts.limit - count),
        resetAt: new Date(Date.now() + Math.max(0, ttl)),
      };
    },
    async reset(key) {
      await run((r) => r.del(k(key)));
    },
  };

  return {
    cache,
    lock,
    limiter,
    async close() {
      subscriber?.disconnect();
      client.disconnect();
    },
  };
}
