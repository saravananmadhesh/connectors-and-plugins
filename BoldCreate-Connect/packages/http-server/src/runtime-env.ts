/**
 * Sets the thread pool size. Call it first in every entrypoint: libuv sizes the pool when the
 * first task is queued, so the value must be in place before any crypto, DNS or file work.
 */
export function applyRuntimeEnv(config: { UV_THREADPOOL_SIZE: number }): void {
  process.env['UV_THREADPOOL_SIZE'] = String(config.UV_THREADPOOL_SIZE);
}
