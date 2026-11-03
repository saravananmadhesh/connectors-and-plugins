import { PROJECT_LIMITS } from './numbers.js';

/**
 * Limits an administrator can change without a deploy. Each key has a built-in value, bounds the
 * server enforces on every write, and the window it is counted over. A new adjustable limit is one
 * entry here; storage, resolution and the admin screens read this table.
 */
export const LIMIT_DEFINITIONS = {
  project_requests_per_minute: {
    label: 'Project requests per window',
    description: 'Calls a project may make with its keys and sessions together in one window.',
    default: PROJECT_LIMITS.requestsPerMinutePerProject,
    min: 60,
    max: 100_000,
    windowSeconds: PROJECT_LIMITS.requestWindowSeconds,
    unit: 'per_window',
    group: 'Requests',
  },
  pod_max_inflight: {
    label: 'Requests one api pod serves at once',
    description:
      'A pod over this number refuses new requests with a fast 503 and Retry-After, so it never queues more than it can serve. Raise it after the database is resized.',
    default: 200,
    min: 10,
    max: 5000,
    windowSeconds: 1,
    unit: 'concurrent',
    group: 'Capacity',
  },
  db_queue_max_depth: {
    label: 'Callers one api pod lets wait for the database',
    description:
      'Callers beyond this number are refused at once with a 503 instead of waiting, so a busy database cannot grow the queue or the memory of a pod.',
    default: 100,
    min: 1,
    max: 5000,
    windowSeconds: 1,
    unit: 'callers',
    group: 'Capacity',
  },
  db_queue_max_wait_seconds: {
    label: 'Seconds a call waits for the database',
    description:
      'A call that waits longer is refused with a 503. Keep it below the request timeout so the caller gets an answer.',
    default: 5,
    min: 1,
    max: 30,
    windowSeconds: 1,
    unit: 'seconds',
    group: 'Capacity',
  },
  db_queue_project_share_pct: {
    label: 'Share of the database queue one organization may fill',
    description:
      'While another organization waits, one organization may hold at most this percent of the queue. At 100 one organization may use all of it.',
    default: 25,
    min: 1,
    max: 100,
    windowSeconds: 1,
    unit: 'percent',
    group: 'Capacity',
  },
  key_requests_per_minute: {
    label: 'Gateway requests per key per minute',
    description: 'Calls one gateway key may make in a minute before it is told to slow down (429).',
    default: 600,
    min: 10,
    max: 100_000,
    windowSeconds: 60,
    unit: 'per_window',
    group: 'Requests',
  },
  mcp_max_inflight_calls: {
    label: 'Tool calls one gateway pod runs at once',
    description:
      'Tool calls beyond this number on one pod are answered busy at once, so long upstream calls cannot use up the pod.',
    default: 100,
    min: 1,
    max: 5000,
    windowSeconds: 1,
    unit: 'concurrent',
    group: 'Capacity',
  },
  event_loop_lag_shed_ms: {
    label: 'Event loop delay at which a pod refuses requests',
    description:
      'A pod whose event loop stays this slow (p99) refuses new requests with a 503 until it recovers.',
    default: 250,
    min: 50,
    max: 5000,
    windowSeconds: 1,
    unit: 'milliseconds',
    group: 'Capacity',
  },
  heap_shed_percent: {
    label: 'Memory use at which a pod refuses requests',
    description:
      'A pod whose heap stays above this percent of its limit refuses new requests with a 503 until it recovers.',
    default: 85,
    min: 50,
    max: 99,
    windowSeconds: 1,
    unit: 'percent',
    group: 'Capacity',
  },
} as const;

export type LimitUnit =
  | 'per_window'
  | 'concurrent'
  | 'callers'
  | 'seconds'
  | 'milliseconds'
  | 'bytes'
  | 'percent';

export type LimitKey = keyof typeof LIMIT_DEFINITIONS;

export const LIMIT_KEYS = Object.keys(LIMIT_DEFINITIONS) as LimitKey[];

export function isLimitKey(value: string): value is LimitKey {
  return Object.hasOwn(LIMIT_DEFINITIONS, value);
}

/** Most specific first. A level with no value defers to the next one. */
export const LIMIT_SCOPES = ['project', 'organization', 'global'] as const;
export type LimitScope = (typeof LIMIT_SCOPES)[number];

/**
 * The scopes a write may target. Resolution already honours every scope; widening this list (and
 * adding the admin routes) is all it takes to let administrators set organization or project
 * values.
 */
export const WRITABLE_LIMIT_SCOPES: readonly LimitScope[] = ['global'];

/** Where a resolved value came from. */
export type LimitSource = LimitScope | 'default';
