export interface RuntimeConfig {
  /** Where agents reach the gateway, as set for this environment on the web server. */
  gatewayUrl: string | null;
}

let loaded: Promise<RuntimeConfig> | null = null;

/** Reads the settings the web server publishes; once per page load, and never fails. */
export function loadRuntimeConfig(): Promise<RuntimeConfig> {
  loaded ??= fetch('/api/runtime-config', { credentials: 'include' })
    .then((res) =>
      res.ok ? (res.json() as Promise<{ gatewayUrl?: unknown }>) : ({} as { gatewayUrl?: unknown }),
    )
    .then((body) => ({
      gatewayUrl:
        typeof body.gatewayUrl === 'string' && body.gatewayUrl !== '' ? body.gatewayUrl : null,
    }))
    .catch(() => ({ gatewayUrl: null }));
  return loaded;
}

/** Forgets the stored answer, for tests. */
export function resetRuntimeConfig(): void {
  loaded = null;
}
