/**
 * Inspect or clean the isolated test stack.
 *
 *   pnpm test:stack            list what holds the test ports and whether a run is active
 *   pnpm test:stack -- stop    stop leftovers of a crashed run (refuses while a run is active)
 *
 * Only processes whose command line points into this repository or its temporary test
 * directories are ever stopped.
 */
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { isProcessAlive, readLock } from './run-lock.js';
import { defaultPorts } from './stack.js';

export const root = resolve(import.meta.dirname, '..', '..');
export const lockPath = join(root, '.cache', 'test-run.lock');

export interface PortHolder {
  port: number;
  pid: number;
  name: string;
  commandLine: string;
}

function windowsHolders(ports: number[]): PortHolder[] {
  const script =
    `Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue | ` +
    `Where-Object { @(${ports.join(',')}) -contains $_.LocalPort } | ForEach-Object { ` +
    `$p = Get-CimInstance Win32_Process -Filter "ProcessId=$($_.OwningProcess)"; ` +
    `[pscustomobject]@{ port = $_.LocalPort; pid = $_.OwningProcess; name = $p.Name; ` +
    `commandLine = [string]$p.CommandLine } } | ConvertTo-Json -Compress`;
  const out = spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', script], {
    encoding: 'utf8',
  }).stdout.trim();
  if (!out) return [];
  const parsed = JSON.parse(out) as PortHolder | PortHolder[];
  return Array.isArray(parsed) ? parsed : [parsed];
}

function posixHolders(ports: number[]): PortHolder[] {
  const holders: PortHolder[] = [];
  for (const port of ports) {
    const pids = spawnSync('lsof', ['-ti', `tcp:${port}`, '-sTCP:LISTEN'], { encoding: 'utf8' })
      .stdout.split(/\s+/)
      .filter(Boolean);
    for (const raw of pids) {
      const pid = Number(raw);
      const commandLine = spawnSync('ps', ['-p', raw, '-o', 'args='], { encoding: 'utf8' }).stdout;
      holders.push({ port, pid, name: commandLine.split(' ')[0] ?? '', commandLine });
    }
  }
  return holders;
}

export function portHolders(): PortHolder[] {
  const ports = Object.values(defaultPorts);
  const found = process.platform === 'win32' ? windowsHolders(ports) : posixHolders(ports);
  const seen = new Set<string>();
  return found.filter((holder) => {
    const key = `${holder.port}:${holder.pid}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** True when the command line belongs to this repository or a temporary test directory. */
export function isOurs(commandLine: string): boolean {
  const normalized = commandLine.replaceAll('\\', '/').toLowerCase();
  return [root, tmpdir()].some((base) =>
    normalized.includes(base.replaceAll('\\', '/').toLowerCase()),
  );
}

export function stopLeftovers(): { stopped: PortHolder[]; foreign: PortHolder[] } {
  const holders = portHolders();
  const stopped: PortHolder[] = [];
  const foreign: PortHolder[] = [];
  for (const holder of holders) {
    if (!isOurs(holder.commandLine)) {
      foreign.push(holder);
      continue;
    }
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/PID', String(holder.pid), '/T', '/F']);
    } else {
      try {
        process.kill(holder.pid, 'SIGKILL');
      } catch {
        // already gone
      }
    }
    stopped.push(holder);
  }
  return { stopped, foreign };
}

const describe = (holder: PortHolder) =>
  `  :${holder.port}  pid ${holder.pid}  ${holder.name}${isOurs(holder.commandLine) ? '' : '  (not from this repository)'}`;

function main(): number {
  const command = process.argv.slice(2).find((arg) => arg !== '--') ?? 'status';
  const lock = readLock(lockPath);
  const active = lock !== undefined && isProcessAlive(lock.pid);
  if (command === 'status') {
    console.log(
      active
        ? `A test run is active (pid ${lock.pid}, started ${lock.startedAt}).`
        : 'No test run is active.',
    );
    const holders = portHolders();
    if (holders.length === 0) console.log('The test ports are free.');
    else {
      console.log('Test ports in use:');
      for (const holder of holders) console.log(describe(holder));
      if (!active) console.log('These are leftovers; run "pnpm test:stack -- stop".');
    }
    return 0;
  }
  if (command === 'stop') {
    if (active) {
      console.error(`A test run is active (pid ${lock.pid}); stop that run instead.`);
      return 1;
    }
    const { stopped, foreign } = stopLeftovers();
    for (const holder of stopped) console.log(`stopped${describe(holder)}`);
    for (const holder of foreign) console.log(`left alone${describe(holder)}`);
    if (stopped.length === 0 && foreign.length === 0) console.log('Nothing to stop.');
    return foreign.length > 0 ? 1 : 0;
  }
  console.error(`Unknown command "${command}". Use "status" or "stop".`);
  return 2;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  process.exit(main());
}
