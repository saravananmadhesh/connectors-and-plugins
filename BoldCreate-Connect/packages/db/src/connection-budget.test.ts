import { describe, expect, it } from 'vitest';
import {
  checkConnectionBudget,
  checkServerCapacity,
  deriveConnectionBudget,
  resolveConnectionLimits,
} from './connection-budget.js';

describe('deriveConnectionBudget', () => {
  it('gives 12 server connections for 1 vCPU and splits them across roles', () => {
    const budget = deriveConnectionBudget(1);
    expect(budget.serverConnections).toBe(12);
    expect(budget.poolSize).toEqual({ api: 6, gateway: 1, worker: 2, admin: 1 });
    expect(budget.roleLimit).toEqual({ api: 8, gateway: 3, worker: 4, admin: 3 });
  });

  it.each([1, 2, 4, 8, 16])('gives the api the largest share at %i vCPU', (vCpu) => {
    const { poolSize } = deriveConnectionBudget(vCpu);
    expect(poolSize.api).toBeGreaterThan(poolSize.worker);
    expect(poolSize.worker).toBeGreaterThanOrEqual(poolSize.admin);
    expect(poolSize.api).toBeGreaterThan(poolSize.gateway);
    expect(Math.min(...Object.values(poolSize))).toBeGreaterThanOrEqual(1);
  });

  it.each([1, 2, 4, 8, 16])('fits a 100-connection database at %i vCPU', (vCpu) => {
    const { roleLimit } = deriveConnectionBudget(vCpu);
    expect(
      checkServerCapacity({ maxConnections: 100, roleLimits: { ...roleLimit, migrator: 5 } }),
    ).toEqual([]);
  });

  it.each([1, 2, 4, 8, 16])('never allots more than the server connections at %i vCPU', (vCpu) => {
    const budget = deriveConnectionBudget(vCpu);
    const total = Object.values(budget.poolSize).reduce((sum, size) => sum + size, 0);
    expect(total).toBeLessThanOrEqual(budget.serverConnections);
  });

  it('grows with the vCPU count and needs no other input', () => {
    expect(deriveConnectionBudget(4).serverConnections).toBe(24);
    expect(deriveConnectionBudget(8).poolSize.api).toBeGreaterThan(
      deriveConnectionBudget(2).poolSize.api,
    );
  });

  it('rejects a vCPU count that is not a whole number of 1 or more', () => {
    expect(() => deriveConnectionBudget(0)).toThrow('whole number');
    expect(() => deriveConnectionBudget(1.5)).toThrow('whole number');
  });
});

describe('checkServerCapacity', () => {
  it('passes when the limits and the headroom fit in max_connections', () => {
    expect(checkServerCapacity({ maxConnections: 100, roleLimits: { a: 45, b: 45 } })).toEqual([]);
  });

  it('fails when every role at its limit would leave no room for an operator', () => {
    const [problem] = checkServerCapacity({ maxConnections: 100, roleLimits: { a: 45, b: 46 } });
    expect(problem).toContain('91');
    expect(problem).toContain('max_connections 100');
  });

  it('honours a custom headroom', () => {
    expect(
      checkServerCapacity({ maxConnections: 100, roleLimits: { a: 95 }, headroom: 5 }),
    ).toEqual([]);
    expect(
      checkServerCapacity({ maxConnections: 100, roleLimits: { a: 96 }, headroom: 5 }),
    ).toHaveLength(1);
  });

  it('flags the old direct defaults (40/40/20/10/5) on a 100-connection database', () => {
    expect(
      checkServerCapacity({
        maxConnections: 100,
        roleLimits: { api: 40, gateway: 40, worker: 20, admin: 10, migrator: 5 },
      }),
    ).toHaveLength(1);
  });
});

describe('checkConnectionBudget', () => {
  it('passes while pods x pool stays within the role limit without a pooler', () => {
    expect(
      checkConnectionBudget({ roleLimit: 40, maxPods: 4, poolMaxPerPod: 8, pooled: false }),
    ).toEqual([]);
  });

  it('fails when the autoscaler could open more connections than the role may hold', () => {
    const problems = checkConnectionBudget({
      roleLimit: 40,
      maxPods: 20,
      poolMaxPerPod: 8,
      extraPoolPerPod: 2,
      pooled: false,
    });
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('20 pods x 10 connections = 200');
  });

  it('with a pooler, pod count does not matter but the pool size must fit the role', () => {
    expect(
      checkConnectionBudget({
        roleLimit: 5,
        maxPods: 500,
        poolMaxPerPod: 10,
        pooled: true,
        poolerPoolSize: 3,
      }),
    ).toEqual([]);
    expect(
      checkConnectionBudget({
        roleLimit: 5,
        maxPods: 1,
        poolMaxPerPod: 1,
        pooled: true,
        poolerPoolSize: 9,
      })[0],
    ).toContain('above the role limit');
    expect(
      checkConnectionBudget({ roleLimit: 5, maxPods: 1, poolMaxPerPod: 1, pooled: true })[0],
    ).toContain('needs a pooler pool size');
  });
});

describe('resolveConnectionLimits', () => {
  const defaults = { api: 40, gateway: 40, worker: 20, admin: 10, migrator: 5 };

  it('keeps the defaults when nothing is set', () => {
    expect(resolveConnectionLimits({}, defaults)).toEqual(defaults);
  });

  it('follows the database size with DB_VCPU and leaves the migrator alone', () => {
    const limits = resolveConnectionLimits({ DB_VCPU: '4' }, defaults);
    const budget = deriveConnectionBudget(4);
    expect(limits).toEqual({ ...budget.roleLimit, migrator: 5 });
  });

  it('lets an explicit role value win over DB_VCPU', () => {
    const limits = resolveConnectionLimits(
      { DB_VCPU: '4', DB_ROLE_CONNECTION_LIMIT_API: '25' },
      defaults,
    );
    expect(limits.api).toBe(25);
    expect(limits.gateway).toBe(deriveConnectionBudget(4).roleLimit.gateway);
  });

  it('rejects a value that is not a whole number', () => {
    expect(() =>
      resolveConnectionLimits({ DB_ROLE_CONNECTION_LIMIT_API: 'many' }, defaults),
    ).toThrow('whole number');
    expect(() => resolveConnectionLimits({ DB_VCPU: '0' }, defaults)).toThrow('whole number');
  });
});
