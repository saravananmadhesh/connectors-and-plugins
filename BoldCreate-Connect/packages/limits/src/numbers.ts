/** Default lifetime of a stored idempotent response, in seconds. */
export const IDEMPOTENCY_TTL_SECONDS = 86_400;

/** What an organization key may do in one window. */
export const API_KEY_LIMITS = {
  requestsPerMinutePerKey: 3_000,
} as const;

/** Projects: what an organization's host applications, their keys, users and sessions are limited to. */
export const PROJECT_LIMITS = {
  projectsPerOrganization: 25,
  keysPerProject: 10,
  keyLifetimeDaysDefault: 90,
  keyLifetimeDaysMax: 365,
  /** How long a rotated key keeps working beside its replacement. */
  keyRotationGraceSeconds: 3_600,
  usersPerProject: 50_000,
  pluginsPerProject: 100,
  allowedPluginsPerProject: 100,
  setsPerProject: 20,
  pluginsPerSet: 50,
  installsPerProjectUser: 25,
  sessionsPerUser: 20,
  /** What a project's calls, by key and by session together, may make in one window. */
  requestsPerMinutePerProject: 5_000,
  requestWindowSeconds: 60,
  pluginsPerSession: 100,
  sessionToolPolicyEntries: 50,
  /** How long a repeated create answers with the first response. */
  idempotencyWindowSeconds: 86_400,
  sessionLifetimeSecondsDefault: 2_592_000,
  sessionLifetimeSecondsMax: 31_536_000,
  requestsPerMinutePerKey: 5_000,
  /** The longest range one usage read covers, and how far back it reaches by default. */
  usageRangeDays: 92,
  /** Sends of one webhook event before it is given up. */
  webhookMaxAttempts: 8,
  /** Days a webhook delivery row is kept. */
  webhookRetentionDays: 14,
  /** Longest wait for the host's server to answer one send. */
  webhookTimeoutSeconds: 5,
} as const;
