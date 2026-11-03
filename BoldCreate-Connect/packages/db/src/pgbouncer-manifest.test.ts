import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkServerCapacity, deriveConnectionBudget } from './connection-budget.js';

/** The database the manifests are sized for: 1 vCPU, `max_connections` 100. */
const DB_VCPU = 1;
const MAX_CONNECTIONS = 100;
const MIGRATOR_LIMIT = 5;
const ENVIRONMENTS = ['staging', 'preproduction', 'production'] as const;
const ROLES = ['api', 'gateway', 'worker', 'admin'] as const;

const root = join(import.meta.dirname, '..', '..', '..', 'k8s', 'pgbouncer');
const read = (environment: string, file: string): string =>
  readFileSync(join(root, environment, file), 'utf8');

function setting(ini: string, name: string): string {
  const found = new RegExp(`^\\s*${name}\\s*=\\s*(.*)$`, 'm').exec(ini);
  if (!found?.[1]) throw new Error(`${name} is not set`);
  return found[1].trim();
}

function userPools(ini: string): Record<string, number> {
  const pools: Record<string, number> = {};
  for (const match of ini.matchAll(/^\s*app_(\w+)\s*=\s*pool_size=(\d+)\s*$/gm)) {
    pools[match[1] as string] = Number(match[2]);
  }
  return pools;
}

describe.each(ENVIRONMENTS)('PgBouncer manifests for %s', (environment) => {
  const ini = read(environment, 'config-map.yaml');
  const deployment = read(environment, 'deployment.yaml');
  const replicas = Number(/replicas:\s*(\d+)/.exec(deployment)?.[1]);
  const budget = deriveConnectionBudget(DB_VCPU);
  const reserve = Number(setting(ini, 'reserve_pool_size'));
  const pools = userPools(ini);

  it('runs two replicas that never surge past the connection budget', () => {
    expect(replicas).toBe(2);
    expect(deployment).toContain('maxSurge: 0');
    expect(read(environment, 'pod-disruption-budget.yaml')).toContain('minAvailable: 1');
  });

  it('gives every login role a pool and nothing else', () => {
    expect(Object.keys(pools).sort()).toEqual([...ROLES].sort());
  });

  it.each(ROLES)('keeps the %s pool, on all replicas, within the role limit', (role) => {
    const worst = ((pools[role] as number) + reserve) * replicas;
    expect(worst).toBeLessThanOrEqual(budget.roleLimit[role]);
  });

  it('keeps all pools together within the database server connections', () => {
    const total = ROLES.reduce((sum, role) => sum + (pools[role] as number) * replicas, 0);
    expect(total).toBeLessThanOrEqual(budget.serverConnections);
  });

  it('gives the api the largest pool', () => {
    for (const role of ['gateway', 'worker', 'admin'] as const) {
      expect(pools['api'] as number).toBeGreaterThan(pools[role] as number);
    }
  });

  it('leaves room in max_connections for operators and the migrator', () => {
    expect(
      checkServerCapacity({
        maxConnections: MAX_CONNECTIONS,
        roleLimits: { ...budget.roleLimit, migrator: MIGRATOR_LIMIT },
      }),
    ).toEqual([]);
  });

  it('uses transaction pooling and bounded waits', () => {
    expect(setting(ini, 'pool_mode')).toBe('transaction');
    expect(Number(setting(ini, 'query_wait_timeout'))).toBeLessThanOrEqual(5);
    expect(Number(setting(ini, 'idle_transaction_timeout'))).toBeGreaterThan(0);
  });

  it('requires SCRAM and TLS on both sides', () => {
    expect(setting(ini, 'auth_type')).toBe('scram-sha-256');
    expect(setting(ini, 'client_tls_sslmode')).toBe('require');
    expect(setting(ini, 'server_tls_sslmode')).toBe('require');
  });

  it('pins a PgBouncer release that has the 1.26.1 security fixes', () => {
    const tag = /pgbouncer:(\d+)\.(\d+)\.(\d+)\s*$/m.exec(deployment);
    expect(tag).not.toBeNull();
    const [major, minor, patch] = [Number(tag?.[1]), Number(tag?.[2]), Number(tag?.[3])];
    expect(major * 1_000_000 + minor * 1_000 + patch).toBeGreaterThanOrEqual(1_026_001);
  });

  it('ignores the startup parameters the services send', () => {
    const ignored = setting(ini, 'ignore_startup_parameters').split(',');
    expect(ignored).toEqual(expect.arrayContaining(['options', 'statement_timeout']));
  });

  it('accepts connections only from the services that use the database', () => {
    const policy = read(environment, 'network-policy.yaml');
    for (const service of ['api', 'gateway', 'worker', 'admin']) {
      expect(policy).toContain(`boldcreate-integrations-${service}-${environment}`);
    }
    expect(policy).not.toContain(`integrations-web-${environment}`);
  });

  it('stays inside its own namespace and environment', () => {
    const others = ENVIRONMENTS.filter((name) => name !== environment);
    for (const file of ['config-map', 'deployment', 'service', 'network-policy']) {
      for (const other of others) {
        // "production" is inside "preproduction"; compare whole words.
        expect(read(environment, `${file}.yaml`)).not.toMatch(new RegExp(`-${other}\\b`));
      }
    }
  });
});
