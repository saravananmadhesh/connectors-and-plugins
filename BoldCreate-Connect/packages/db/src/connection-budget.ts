/**
 * The connection budget of one database. Every number follows from the vCPU count, so resizing
 * the database means changing `DB_VCPU` and nothing else.
 *
 * Server connections are what Postgres itself holds open: about `4 x vCPU + 8` keeps a database
 * busy without making its queries compete for the CPU. Each login role gets a share of them as
 * a pooler pool size, and a role's `CONNECTION LIMIT` is that share plus headroom for direct
 * connections (migrations, an operator).
 */
export type BudgetRole = 'api' | 'gateway' | 'worker' | 'admin';

/**
 * Share of server connections per role, in tenths; the remainder is the pooler's reserve pool.
 * Shares follow what each service does with the database:
 * - api serves every REST call, including the gateway's key checks and tool resolution, so it
 *   carries almost all request traffic;
 * - gateway reaches the database through the api in every deployed environment and only needs
 *   a small share for the direct (`DATA_SOURCE=database`) mode;
 * - worker runs background jobs (webhook delivery, ingestion); it is capped so a backlog cannot
 *   starve live requests;
 * - admin is a handful of operators, so a single connection mostly suffices.
 */
const ROLE_SHARE_TENTHS: Record<BudgetRole, number> = { api: 5, gateway: 1, worker: 2, admin: 1 };
const DIRECT_HEADROOM = 2;

export interface ConnectionBudget {
  vCpu: number;
  serverConnections: number;
  /** Pooler pool size per role. */
  poolSize: Record<BudgetRole, number>;
  /** Value for the role's `CONNECTION LIMIT`. */
  roleLimit: Record<BudgetRole, number>;
}

export function deriveConnectionBudget(vCpu: number): ConnectionBudget {
  if (!Number.isInteger(vCpu) || vCpu < 1)
    throw new Error('vCpu must be a whole number, 1 or more');
  const serverConnections = 4 * vCpu + 8;
  const poolSize = {} as Record<BudgetRole, number>;
  const roleLimit = {} as Record<BudgetRole, number>;
  for (const role of Object.keys(ROLE_SHARE_TENTHS) as BudgetRole[]) {
    poolSize[role] = Math.max(1, Math.floor((serverConnections * ROLE_SHARE_TENTHS[role]) / 10));
    roleLimit[role] = poolSize[role] + DIRECT_HEADROOM;
  }
  return { vCpu, serverConnections, poolSize, roleLimit };
}

export interface BudgetCheckInput {
  /** The role's `CONNECTION LIMIT`. */
  roleLimit: number;
  /** Most pods the autoscaler may run for this service. */
  maxPods: number;
  /** `DB_POOL_MAX` of one pod. */
  poolMaxPerPod: number;
  /** Connections of the observability pool on the same role, per pod. */
  extraPoolPerPod?: number;
  /** When a pooler sits in front, pods connect to it and not to Postgres. */
  pooled: boolean;
  /** Pooler pool size for the role; required when `pooled`. */
  poolerPoolSize?: number;
}

/**
 * Returns a message for each way the budget can overflow, so a test fails before an autoscaler
 * can open more connections than a role may hold.
 */
export function checkConnectionBudget(input: BudgetCheckInput): string[] {
  const problems: string[] = [];
  const perPod = input.poolMaxPerPod + (input.extraPoolPerPod ?? 0);
  if (input.pooled) {
    if (input.poolerPoolSize === undefined) {
      problems.push('a pooled role needs a pooler pool size');
    } else if (input.poolerPoolSize > input.roleLimit) {
      problems.push(
        `pooler pool size ${input.poolerPoolSize} is above the role limit ${input.roleLimit}`,
      );
    }
    return problems;
  }
  const worst = input.maxPods * perPod;
  if (worst > input.roleLimit) {
    problems.push(
      `${input.maxPods} pods x ${perPod} connections = ${worst}, above the role limit ${input.roleLimit}`,
    );
  }
  return problems;
}

export interface ServerCapacityInput {
  /** The database's `max_connections`. */
  maxConnections: number;
  /** Every login role's `CONNECTION LIMIT`, the migrator included. */
  roleLimits: Record<string, number>;
  /** Connections kept free for superuser, monitoring and operator sessions. */
  headroom?: number;
}

/**
 * Returns a message when the role limits together could fill the database, so every role can
 * reach its limit at once and an operator can still connect.
 */
export function checkServerCapacity(input: ServerCapacityInput): string[] {
  const headroom = input.headroom ?? 10;
  const total = Object.values(input.roleLimits).reduce((sum, limit) => sum + limit, 0);
  if (total + headroom <= input.maxConnections) return [];
  return [
    `role limits add up to ${total} and ${headroom} stay free, above max_connections ${input.maxConnections}`,
  ];
}

/**
 * The `CONNECTION LIMIT` of each login role. With `DB_VCPU` set the limits follow the database
 * size (see `deriveConnectionBudget`); a `DB_ROLE_CONNECTION_LIMIT_<ROLE>` value always wins, and
 * the migrator keeps its default because it does not share the serving budget.
 */
export function resolveConnectionLimits<Role extends string>(
  env: Record<string, string | undefined>,
  defaults: Record<Role, number>,
): Record<Role, number> {
  const raw = env['DB_VCPU']?.trim();
  const budget = raw ? deriveConnectionBudget(Number(raw)) : undefined;
  const limits = { ...defaults };
  for (const role of Object.keys(defaults) as Role[]) {
    const derived = budget?.roleLimit[role as unknown as BudgetRole];
    if (derived !== undefined) limits[role] = derived;
    const explicit = env[`DB_ROLE_CONNECTION_LIMIT_${role.toUpperCase()}`]?.trim();
    if (explicit) {
      const value = Number(explicit);
      if (!Number.isInteger(value) || value < 1) {
        throw new Error(
          `DB_ROLE_CONNECTION_LIMIT_${role.toUpperCase()} must be a whole number, 1 or more`,
        );
      }
      limits[role] = value;
    }
  }
  return limits;
}
