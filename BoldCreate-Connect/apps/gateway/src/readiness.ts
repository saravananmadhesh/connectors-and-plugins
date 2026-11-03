/**
 * What "ready" means for a gateway pod. With the api as the data source the pod serves traffic
 * as long as the api answers; it does not depend on Postgres, so a busy or restarting database
 * does not take every gateway pod out of the load balancer at once. With the database as the
 * data source the pod needs the database itself.
 */
export interface ReadinessOptions {
  dataSource: 'database' | 'api';
  /** `GET <api>/healthz`; resolves when the api process answers. */
  pingApi: () => Promise<unknown>;
  /** `SELECT 1` plus the startup checks. */
  pingDatabase: () => Promise<unknown>;
}

export function createReadiness(options: ReadinessOptions): () => Promise<unknown> {
  return options.dataSource === 'api' ? options.pingApi : options.pingDatabase;
}

/** Asks the api whether its process is up; any non-2xx answer or failure is "not ready". */
export function createApiPing(
  apiBaseUrl: string,
  doFetch: typeof fetch = fetch,
  timeoutMs = 800,
): () => Promise<void> {
  return async () => {
    const response = await doFetch(`${apiBaseUrl}/healthz`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) throw new Error(`api answered ${response.status}`);
  };
}
