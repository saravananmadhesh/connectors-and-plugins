/**
 * Shared configuration helpers. Each app owns its schema in `apps/<app>/src/config.ts` and
 * calls `loadEnv` with it at startup; the process fails before listening if any required
 * variable is missing or holds a placeholder.
 *
 * Rules:
 * - Never read process.env outside an app's `config.ts`.
 * - Fail fast: throw on missing/placeholder secrets; messages name variables, never values.
 * - No defaults for secrets; defaults only for non-sensitive tunables.
 *
 * Development / test: call `loadDevEnv(path?)` once at the top of a script or test runner to
 * populate process.env from a .env file. It is a no-op when NODE_ENV=production.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as z from 'zod/v4';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const nonEmpty = z.string().min(1);
export const port = z.coerce.number().int().min(1).max(65535);

/** Reject placeholder values that look like template variables. */
export const secret = nonEmpty.refine(
  (v) => !v.startsWith('REPLACE_') && !v.startsWith('{{') && v !== 'changeme',
  { message: 'value appears to be a placeholder — set a real secret' },
);

export function loadEnv(schema: z.ZodType, source: NodeJS.ProcessEnv = process.env): unknown {
  const result = schema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Configuration error:\n${issues}`);
  }
  return result.data;
}

// ─── Shared base ──────────────────────────────────────────────────────────────

export const BaseSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
});

// ─── Dev / test env loader ────────────────────────────────────────────────────

/**
 * Parse a .env file and merge its values into process.env.
 * Existing process.env values are NOT overwritten (shell wins).
 * No-op when NODE_ENV=production.
 *
 * @param filePath Absolute or repo-relative path to the .env file.
 *                 Defaults to `.env.development` at the repo root.
 */
export function loadDevEnv(filePath?: string): void {
  if (process.env['NODE_ENV'] === 'production') return;

  const target = filePath ? resolve(filePath) : resolve(process.cwd(), '.env.development');

  if (!existsSync(target)) return;

  const raw = readFileSync(target, 'utf8');

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    // Skip blank lines and comments
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();

    // Never overwrite a value already set in the environment
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
}
