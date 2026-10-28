/**
 * Lists what a plugin contains so an operator can review it before approving: components by
 * kind, every hook command, every MCP server, and files that look like they hold a secret.
 * Findings carry the path and the kind of match, never the matched text.
 */
import type { ManifestVariable } from './manifest.js';
import type { SkippedItem } from './tar.js';

export type ScannedKind = 'mcp' | 'skill' | 'rule' | 'hook' | 'agent';

export interface ScannedComponent {
  kind: ScannedKind;
  name: string;
  description: string;
  metadata: Record<string, unknown>;
}

export interface HookCommand {
  event: string;
  command: string;
}

export interface McpServerEntry {
  name: string;
  transport: 'http' | 'stdio';
  url?: string;
  command?: string;
}

export interface ScanFinding {
  path: string;
  kind: string;
}

export interface ScanReport {
  fileCount: number;
  totalBytes: number;
  components: ScannedComponent[];
  hookCommands: HookCommand[];
  mcpServers: McpServerEntry[];
  variables: ManifestVariable[];
  skipped: SkippedItem[];
  findings: ScanFinding[];
}

const MARKDOWN = /\.(md|mdc|markdown)$/i;
const SECRET_PATTERNS: [string, RegExp][] = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  [
    'hard-coded credential',
    /\b(?:api[_-]?key|secret|token|password)\b["']?\s*[:=]\s*["'][A-Za-z0-9/+_.=-]{12,}["']/i,
  ],
];

interface Frontmatter {
  [key: string]: string;
}

/** Reads simple `key: value` lines between the leading `---` fences. */
export function parseFrontmatter(text: string): Frontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const result: Frontmatter = {};
  if (!match?.[1]) return result;
  for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (pair?.[1] !== undefined && pair[2] !== undefined) {
      result[pair[1]] = pair[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return result;
}

const text = (files: ReadonlyMap<string, Buffer>, path: string): string =>
  (files.get(path) as Buffer).toString('utf8');

function clip(value: string | undefined, max: number, fallback = ''): string {
  return (value ?? fallback).slice(0, max);
}

function scanHooks(files: ReadonlyMap<string, Buffer>, report: ScanReport): void {
  const body = files.get('hooks/hooks.json');
  if (!body) return;
  let parsed: unknown;
  try {
    parsed = JSON.parse(body.toString('utf8'));
  } catch {
    report.findings.push({ path: 'hooks/hooks.json', kind: 'invalid JSON' });
    return;
  }
  const hooks = (parsed as { hooks?: unknown } | null)?.hooks;
  if (typeof hooks !== 'object' || hooks === null) return;
  for (const [event, entries] of Object.entries(hooks)) {
    const commands: string[] = [];
    const walk = (value: unknown): void => {
      if (Array.isArray(value)) value.forEach(walk);
      else if (typeof value === 'object' && value !== null) {
        const record = value as Record<string, unknown>;
        if (typeof record['command'] === 'string') commands.push(record['command']);
        Object.values(record).forEach(walk);
      }
    };
    walk(entries);
    for (const command of commands)
      report.hookCommands.push({ event, command: command.slice(0, 500) });
    report.components.push({
      kind: 'hook',
      name: clip(event, 60),
      description: `Hook triggered on ${event}`.slice(0, 200),
      metadata: {
        path: 'hooks/hooks.json',
        event,
        commands: commands.map((command) => command.slice(0, 500)),
      },
    });
  }
}

function scanMcp(files: ReadonlyMap<string, Buffer>, report: ScanReport): void {
  const body = files.get('mcp.json');
  if (!body) return;
  let parsed: unknown;
  try {
    parsed = JSON.parse(body.toString('utf8'));
  } catch {
    report.findings.push({ path: 'mcp.json', kind: 'invalid JSON' });
    return;
  }
  const servers = (parsed as { mcpServers?: unknown } | null)?.mcpServers;
  if (typeof servers !== 'object' || servers === null) return;
  for (const [name, spec] of Object.entries(servers)) {
    const detail =
      typeof spec === 'object' && spec !== null ? (spec as Record<string, unknown>) : {};
    const url = typeof detail['url'] === 'string' ? detail['url'] : undefined;
    const command = typeof detail['command'] === 'string' ? detail['command'] : undefined;
    const { names: headerNames, templates: headers } = scanHeaders(
      detail['headers'],
      report,
      `${name}`,
    );
    const entry: McpServerEntry = {
      name: clip(name, 60),
      transport: url ? 'http' : 'stdio',
      ...(url ? { url: url.slice(0, 500) } : {}),
      ...(command ? { command: command.slice(0, 500) } : {}),
    };
    report.mcpServers.push(entry);
    report.components.push({
      kind: 'mcp',
      name: entry.name,
      description: 'MCP server',
      metadata: {
        path: 'mcp.json',
        transport: entry.transport,
        ...(url ? { url } : {}),
        ...(command ? { command } : {}),
        ...(headerNames.length > 0 ? { headerNames } : {}),
        ...(Object.keys(headers).length > 0 ? { headers } : {}),
      },
    });
  }
}

/** Headers that carry a credential: their value must come from a variable, never be written out. */
const CREDENTIAL_HEADER = /authorization|token|secret|key|password|cookie/i;
const VARIABLE_REFERENCE = /\$\{[A-Za-z0-9_-]{1,64}\}/;
const MAX_HEADERS = 20;

/**
 * The headers a server declares. The gateway sends them with each `${NAME}` filled in from the
 * installation's variables, so a value that refers to a variable is kept as a template. A value
 * written out in the plugin is never kept, because it may be a secret; when the header's name says
 * it carries a credential, that is reported as a finding as well.
 */
function scanHeaders(
  raw: unknown,
  report: ScanReport,
  server: string,
): { names: string[]; templates: Record<string, string> } {
  const names: string[] = [];
  const templates: Record<string, string> = {};
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return { names, templates };
  for (const [header, value] of Object.entries(raw)) {
    if (names.length >= MAX_HEADERS) break;
    if (!/^[A-Za-z0-9-]{1,100}$/.test(header)) continue;
    names.push(header);
    if (typeof value !== 'string') continue;
    if (VARIABLE_REFERENCE.test(value)) {
      templates[header] = value.slice(0, 1000);
    } else if (CREDENTIAL_HEADER.test(header)) {
      report.findings.push({
        path: 'mcp.json',
        kind: `header ${header} of ${clip(server, 60)} holds a credential written into the plugin; it was not kept`,
      });
    }
  }
  return { names, templates };
}

const WINDOWS_RESERVED = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;

/** Paths a client could not place safely on every system. They are findings, not failures. */
function scanPaths(paths: readonly string[], report: ScanReport): void {
  const lower = new Map<string, string>();
  for (const path of paths) {
    const segments = path.split('/');
    if (
      path.includes('\0') ||
      segments.includes('..') ||
      path.startsWith('/') ||
      /^[A-Za-z]:/.test(path)
    ) {
      report.findings.push({ path, kind: 'unsafe path' });
      continue;
    }
    if (segments.some((segment) => WINDOWS_RESERVED.test(segment))) {
      report.findings.push({ path, kind: 'reserved file name on Windows' });
    }
    const key = path.toLowerCase();
    const first = lower.get(key);
    if (first !== undefined && first !== path) {
      report.findings.push({ path, kind: `differs only by case from ${first}` });
    } else lower.set(key, path);
  }
}

export function scanPlugin(
  files: ReadonlyMap<string, Buffer>,
  variables: ManifestVariable[],
  skipped: SkippedItem[],
): ScanReport {
  const report: ScanReport = {
    fileCount: files.size,
    totalBytes: [...files.values()].reduce((sum, file) => sum + file.length, 0),
    components: [],
    hookCommands: [],
    mcpServers: [],
    variables,
    skipped,
    findings: [],
  };

  for (const path of [...files.keys()].sort()) {
    const skill = /^skills\/([^/]+)\/SKILL\.md$/.exec(path);
    if (skill?.[1]) {
      const front = parseFrontmatter(text(files, path));
      report.components.push({
        kind: 'skill',
        name: clip(front['name'], 60, skill[1]),
        description: clip(front['description'], 500),
        metadata: { path: `skills/${skill[1]}` },
      });
    }
    const rule = /^rules\/([^/]+)$/.exec(path);
    if (rule?.[1] && MARKDOWN.test(path)) {
      const front = parseFrontmatter(text(files, path));
      report.components.push({
        kind: 'rule',
        name: clip(front['name'], 60, rule[1].replace(MARKDOWN, '')),
        description: clip(front['description'], 500),
        metadata: { path, mode: front['alwaysApply'] === 'true' ? 'always' : 'agent-decides' },
      });
    }
    const agent = /^agents\/([^/]+)$/.exec(path);
    if (agent?.[1] && MARKDOWN.test(path)) {
      const front = parseFrontmatter(text(files, path));
      report.components.push({
        kind: 'agent',
        name: clip(front['name'], 60, agent[1].replace(MARKDOWN, '')),
        description: clip(front['description'], 500),
        metadata: { path },
      });
    }

    const content = text(files, path);
    for (const [kind, pattern] of SECRET_PATTERNS) {
      if (pattern.test(content)) report.findings.push({ path, kind: `possible secret: ${kind}` });
    }
  }
  scanHooks(files, report);
  scanMcp(files, report);
  scanPaths([...files.keys()].sort(), report);
  for (const component of report.components) {
    const path = component.metadata['path'];
    if (component.kind !== 'mcp' && (typeof path !== 'string' || path === '')) {
      report.findings.push({ path: component.name, kind: `${component.kind} has no path` });
    }
  }

  // The database keeps one component per (kind, name); keep the first and say so.
  const seen = new Set<string>();
  report.components = report.components.filter((component) => {
    const key = `${component.kind}:${component.name}`;
    if (seen.has(key)) {
      report.skipped.push({ path: component.name, reason: `duplicate ${component.kind} name` });
      return false;
    }
    seen.add(key);
    return true;
  });
  return report;
}
