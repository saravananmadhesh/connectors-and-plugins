/**
 * Repository check: no secret-looking value is committed.
 *
 * Flags a 64-character hex string assigned to a name containing SECRET, PASSWORD or KEY, and
 * the old development password. Lines whose text contains `FIXTURE_` (a deliberately seeded
 * test value) and a few reference paths are exempt.
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const OLD_DEV_PASSWORD = ['dev', 'password'].join('');

const SECRET_ASSIGNMENT = /(?:SECRET|PASSWORD|KEY)\w*["'\]]*\s*[:=]\s*[^\n]*?[0-9a-f]{64}/i;

const ALLOWED_PATHS = [
  /^docs\/reference\//,
  /^docs\/plan\//,
  /^pnpm-lock\.yaml$/,
  /^skills-lock\.json$/,
  /^k8s\/staging-migration\.yaml$/,
  /^scripts\/generate-migration-manifest\.ts$/,
  // Sequential, obviously fake keys that exercise log redaction
  /^packages\/sdk\/fixtures\/redact\.json$/,
  /^packages\/sdk-dotnet\/[^/]+Tests\/[^/]+\.cs$/,
];

/** A whole API key: the key id of any kind, a dot, and a secret of the generated length. */
const API_KEY_VALUE = /\b(?:fyk|plk|ptk|prk|stk)_[0-9a-f]{16}\.[A-Za-z0-9_-]{32,}/;

/** A URL carrying a login: scheme://user:password@host. */
const URL_WITH_LOGIN = /\b[a-z][a-z0-9+.-]*:\/\/[^\s:/@'"`]*:([^\s/@"`]+)@([^\s/:'"`]+)/i;

/** Placeholders, variable references and local hosts are not secrets. */
function isHarmlessLogin(password: string, host: string): boolean {
  return (
    password.length < 6 ||
    /^(?:\$|\{|<|%7B|REPLACE_|changeme|password$|pass$|x+$|\*+$)/i.test(password) ||
    /^(?:localhost|127\.0\.0\.1|\$|example\.|.*\.example\.)/i.test(host)
  );
}

function urlLoginIsSecret(line: string): boolean {
  const match = URL_WITH_LOGIN.exec(line);
  return match !== null && !isHarmlessLogin(match[1] ?? '', match[2] ?? '');
}

export interface SecretViolation {
  file: string;
  line: number;
  reason: string;
}

export function scanText(file: string, text: string): SecretViolation[] {
  if (ALLOWED_PATHS.some((pattern) => pattern.test(file))) return [];
  const violations: SecretViolation[] = [];
  text.split(/\r?\n/).forEach((content, index) => {
    if (content.includes('FIXTURE_')) return;
    if (content.toLowerCase().includes(OLD_DEV_PASSWORD)) {
      violations.push({ file, line: index + 1, reason: 'hardcoded development password' });
    } else if (SECRET_ASSIGNMENT.test(content)) {
      violations.push({ file, line: index + 1, reason: 'hex secret assigned to a secret name' });
    } else if (urlLoginIsSecret(content)) {
      violations.push({ file, line: index + 1, reason: 'a URL with an embedded password' });
    } else if (API_KEY_VALUE.test(content)) {
      violations.push({ file, line: index + 1, reason: 'a whole API key' });
    }
  });
  return violations;
}

export function gitTrackedFiles(root: string): string[] {
  return execFileSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1 << 26,
  })
    .split('\0')
    .filter(Boolean);
}

/** Scans tracked text files under `root`; `listFiles` exists so tests can supply their own list. */
export function findCommittedSecrets(
  root: string,
  listFiles: (root: string) => string[] = gitTrackedFiles,
): SecretViolation[] {
  const violations: SecretViolation[] = [];
  for (const file of listFiles(root)) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch {
      continue; // tracked but deleted in the working tree
    }
    if (buffer.includes(0)) continue; // binary
    violations.push(...scanText(file, buffer.toString('utf8')));
  }
  return violations;
}
