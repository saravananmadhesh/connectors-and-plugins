/**
 * The configuration of the local PgBouncer (see `pgbouncer-native.ts`). It mirrors the deployed
 * settings in `k8s/pgbouncer/*` (transaction pooling, one pool per role, the same ignored startup
 * parameters, a bounded wait); only the transport differs, because the local database has no TLS.
 */

export const DEFAULT_POOLER_PORT = 6432;

/** Server connections a role may hold at most; the deployed total is twice this (two replicas). */
export const LOCAL_POOL_SIZES = { api: 6, gateway: 1, worker: 2, admin: 1 } as const;
export type PoolerRole = keyof typeof LOCAL_POOL_SIZES;

export interface PoolerIniOptions {
  /** Where PgBouncer reaches PostgreSQL. */
  dbHost: string;
  dbPort: number;
  poolSizes: Record<PoolerRole, number>;
  /** Where the user list is, as PgBouncer reads the path (forward slashes on Windows). */
  authFile: string;
  /** Port PgBouncer listens on, on the loopback address only. */
  listenPort?: number;
  /** Where PgBouncer writes its log; empty is standard output. */
  logFile?: string;
}

/** Throws on a value that would make an invalid or surprising configuration. */
function assertSafe(name: string, value: string): void {
  if (!/^[A-Za-z0-9_.:-]+$/.test(value)) throw new Error(`${name} has characters not allowed`);
}

/** A path in the ini file: no line breaks or comment characters that would change the file. */
function assertPath(name: string, value: string): void {
  if (/[\r\n;#]/.test(value)) throw new Error(`${name} has characters not allowed`);
}

function assertPort(name: string, value: number): void {
  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(`${name} must be a port number`);
  }
}

export function pgbouncerIni(options: PoolerIniOptions): string {
  assertSafe('dbHost', options.dbHost);
  assertPort('dbPort', options.dbPort);
  assertPort('listenPort', options.listenPort ?? DEFAULT_POOLER_PORT);
  assertPath('authFile', options.authFile);
  if (options.logFile) assertPath('logFile', options.logFile);
  const users = (Object.keys(options.poolSizes) as PoolerRole[]).map((role) => {
    const size = options.poolSizes[role];
    if (!Number.isInteger(size) || size < 1) {
      throw new Error(`pool size of ${role} must be 1 or more`);
    }
    return `app_${role} = pool_size=${size}`;
  });
  return [
    '[databases]',
    `* = host=${options.dbHost} port=${options.dbPort}`,
    '',
    '[pgbouncer]',
    'listen_addr = 127.0.0.1',
    `listen_port = ${options.listenPort ?? DEFAULT_POOLER_PORT}`,
    'pidfile =',
    `logfile = ${options.logFile ?? ''}`,
    'pool_mode = transaction',
    'max_client_conn = 2000',
    'default_pool_size = 1',
    'reserve_pool_size = 0',
    'query_wait_timeout = 5',
    'server_idle_timeout = 300',
    'server_lifetime = 3600',
    'server_connect_timeout = 5',
    'client_login_timeout = 10',
    'idle_transaction_timeout = 15',
    'ignore_startup_parameters = extra_float_digits,options',
    'track_extra_parameters = IntervalStyle,statement_timeout,lock_timeout',
    'auth_type = scram-sha-256',
    `auth_file = ${options.authFile}`,
    'client_tls_sslmode = disable',
    'server_tls_sslmode = prefer',
    'log_connections = 0',
    'log_disconnections = 0',
    '',
    '[users]',
    ...users,
    '',
  ].join('\n');
}

/** One `userlist.txt` line. PgBouncer derives the SCRAM exchange from a plain password. */
export function userlistLine(user: string, password: string): string {
  if (!/^[A-Za-z0-9_]+$/.test(user)) throw new Error('user has characters not allowed');
  return `"${user}" "${password.replaceAll('"', '""')}"`;
}

export function userlist(passwords: Record<PoolerRole, string>): string {
  const lines = (Object.keys(passwords) as PoolerRole[]).map((role) => {
    if (!passwords[role]) throw new Error(`the password of ${role} is empty`);
    return userlistLine(`app_${role}`, passwords[role]);
  });
  return `${lines.join('\n')}\n`;
}

/** The same login on the pooler's port; everything else in the URL stays as it was. */
export function pooledDatabaseUrl(databaseUrl: string, port: number): string {
  const url = new URL(databaseUrl);
  url.hostname = '127.0.0.1';
  url.port = String(port);
  return url.toString();
}
