export type SsrfPurpose = 'mcp_upstream' | 'github_source' | 'oidc_token' | 'oidc_jwks' | 'webhook';

export interface PurposeLimits {
  maxBytes: number;
  timeoutMs: number;
  redirect: 'error' | 'manual-return';
  requiresAllowedHosts: boolean;
}

/** Limits per outbound purpose. A call site may lower them, never raise them. */
export const SSRF_PURPOSES: Record<SsrfPurpose, PurposeLimits> = {
  mcp_upstream: {
    maxBytes: 1024 * 1024,
    timeoutMs: 120_000,
    redirect: 'error',
    requiresAllowedHosts: false,
  },
  github_source: {
    maxBytes: 100 * 1024 * 1024,
    timeoutMs: 60_000,
    redirect: 'manual-return',
    requiresAllowedHosts: true,
  },
  oidc_token: {
    maxBytes: 256 * 1024,
    timeoutMs: 10_000,
    redirect: 'error',
    requiresAllowedHosts: false,
  },
  oidc_jwks: {
    maxBytes: 256 * 1024,
    timeoutMs: 10_000,
    redirect: 'error',
    requiresAllowedHosts: false,
  },
  // A host's own receiver: the answer is only read for its status, so a small body is plenty.
  webhook: {
    maxBytes: 64 * 1024,
    timeoutMs: 10_000,
    redirect: 'error',
    requiresAllowedHosts: false,
  },
};
