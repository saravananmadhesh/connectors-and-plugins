/**
 * Environment of the apps when they run on this machine against staging services. The values
 * come from one gitignored file with a `[common]` section and one section per app, so each app
 * gets only its own keys, like in `app-env.ts`.
 */
import type { AppName } from './app-env.js';

export const STAGING_APPS: readonly AppName[] = ['api', 'gateway', 'admin', 'worker', 'web'];

type Section = 'common' | AppName;

/** Values that mean a variable was copied from the template and never filled in. */
const PLACEHOLDER = /^(REPLACE_|\{\{)/;

/** Hosts that mean Redis is local, not staging (a database may be reached through a local proxy). */
const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[?::1\]?)$/;

export function parseStagingEnv(text: string): Record<Section, Record<string, string>> {
  const sections: Record<Section, Record<string, string>> = {
    common: {},
    api: {},
    gateway: {},
    admin: {},
    worker: {},
    web: {},
  };
  let current: Section | undefined;
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const header = /^\[([a-z]+)\]$/.exec(line);
    if (header) {
      const name = header[1] as Section;
      if (!(name in sections)) throw new Error(`line ${index + 1}: unknown section [${name}]`);
      current = name;
      continue;
    }
    const eq = line.indexOf('=');
    if (eq < 1) throw new Error(`line ${index + 1}: expected NAME=value`);
    if (current === undefined) throw new Error(`line ${index + 1}: value before any [section]`);
    sections[current][line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return sections;
}

/** The app's environment: `[common]` first, then its own section on top. */
export function stagingAppEnv(
  app: AppName,
  sections: Record<Section, Record<string, string>>,
): Record<string, string> {
  return { NODE_ENV: 'production', ...sections.common, ...sections[app], DEPLOY_ENV: 'staging' };
}

/** Problems that make the run unsafe or pointless; empty when the app's environment is usable. */
export function stagingProblems(app: AppName, env: Record<string, string>): string[] {
  const problems: string[] = [];
  for (const [name, value] of Object.entries(env)) {
    if (PLACEHOLDER.test(value)) problems.push(`${app}: ${name} still has a placeholder value`);
  }
  if (Object.keys(env).length <= 3) problems.push(`${app}: no values for this app`);
  for (const name of ['DATABASE_URL', 'REDIS_URL']) {
    const value = env[name];
    if (value === undefined) continue;
    try {
      const host = new URL(value).hostname;
      if (name === 'REDIS_URL' && LOCAL_HOST.test(host)) {
        problems.push(`${app}: ${name} points at this machine; staging must be a remote service`);
      }
    } catch {
      problems.push(`${app}: ${name} is not a valid URL`);
    }
  }
  if (env['KMS_ADAPTER'] === 'local') problems.push(`${app}: KMS_ADAPTER=local is refused`);
  // AWS keys (S3 and SES) are read by the AWS SDK; one without the other never authenticates.
  if ((env['AWS_ACCESS_KEY_ID'] === undefined) !== (env['AWS_SECRET_ACCESS_KEY'] === undefined)) {
    problems.push(`${app}: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set together`);
  }
  for (const name of ['BLOB_ACCESS_KEY_ID', 'BLOB_SECRET_ACCESS_KEY']) {
    if (env[name] !== undefined) {
      problems.push(
        `${app}: ${name} is refused on staging; use AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY`,
      );
    }
  }
  return problems;
}
