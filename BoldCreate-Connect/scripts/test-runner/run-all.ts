/**
 * Runs every quality and test script in one pass, identically on a developer machine
 * and in CI, with no Docker. Live-stack suites run against an isolated embedded
 * PostgreSQL, a pinned Mailpit binary and the api, gateway and worker
 * processes on non-default ports.
 *
 * Usage:
 *   pnpm test                          every step, one at a time, in order
 *   pnpm test -- --only=unit,client    run only the named steps
 *   pnpm test -- --skip=build,audit    run all default steps except the named ones
 *   pnpm test -- --only=integration --files=tests/integration/x.integration.test.ts
 *                                      limit the Vitest steps to the given files
 *   pnpm test -- --postgres=docker     run the stack's PostgreSQL in Docker (or external) instead of embedded
 *   pnpm test -- --bail                stop starting new steps after the first failure
 *
 * Output: reports/test-run/summary.json, reports/test-run/index.html, per-step logs
 * under reports/test-run/logs and Vitest JSON per suite. Exit code is non-zero when
 * any step fails.
 */
import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import {
  buildSummary,
  countWarnings,
  browserRunStatus,
  parsePlaywrightJson,
  parseVitestJson,
  plainOutputEnv,
  renderHtml,
  stripAnsi,
  type StepResult,
} from './report.js';
import { acquireLock, releaseLock } from './run-lock.js';
import { startStack, type RunningStack } from './stack.js';
import { lockPath, stopLeftovers } from './stack-control.js';
import { checkArguments, jsonOut, steps, type StepDefinition } from './steps.js';

const root = resolve(import.meta.dirname, '..', '..');
const outDir = join(root, 'reports', 'test-run');
const logDir = join(outDir, 'logs');

function listArg(name: string): string[] | undefined {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  return arg
    ? arg
        .slice(name.length + 3)
        .split(',')
        .filter(Boolean)
    : undefined;
}

const args = process.argv.slice(2);
const argumentError = checkArguments(args);
if (argumentError) {
  console.error(argumentError);
  process.exit(2);
}

// `--postgres=docker` reaches the stack (and its child processes) as POSTGRES_MODE
const postgresArg = process.argv.find((value) => value.startsWith('--postgres='));
if (postgresArg) process.env['POSTGRES_MODE'] = postgresArg.slice('--postgres='.length);

const only = listArg('only');
const files = listArg('files') ?? [];
const skip = listArg('skip') ?? [];

const bail = args.includes('--bail');
const selected = steps
  .filter((step) => (only ? only.includes(step.id) : !step.optional && !skip.includes(step.id)))
  .map((step) =>
    step.vitest && files.length > 0
      ? { ...step, command: `${step.command} ${files.join(' ')}` }
      : step,
  );

const lock = acquireLock(lockPath);
if (!lock.acquired) {
  console.error(
    `[test-runner] another test run is active (pid ${lock.holder.pid}, started ${lock.holder.startedAt}). ` +
      'Wait for it to finish; two runs share the same ports and report folder. ' +
      'Check with "pnpm test:stack".',
  );
  process.exit(2);
}
process.on('exit', () => releaseLock(lockPath));

if (lock.replacedStale && selected.some((step) => step.needsStack)) {
  const { stopped, foreign } = stopLeftovers();
  for (const holder of stopped) {
    console.log(
      `[test-runner] stopped leftover ${holder.name} (pid ${holder.pid}) on :${holder.port}`,
    );
  }
  for (const holder of foreign) {
    console.log(
      `[test-runner] :${holder.port} is held by ${holder.name} (pid ${holder.pid}), not from this repository`,
    );
  }
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(logDir, { recursive: true });

const running = new Set<ChildProcess>();

function killTree(child: ChildProcess) {
  if (child.pid === undefined) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F']);
  else child.kill('SIGTERM');
}

function runCommand(
  command: string,
  logPath: string,
  env: NodeJS.ProcessEnv,
): Promise<{ code: number | null; output: string }> {
  return new Promise((resolveRun) => {
    const log = createWriteStream(logPath);
    let output = '';
    const child = spawn(command, { shell: true, cwd: root, env });
    running.add(child);
    const collect = (chunk: Buffer) => {
      const text = stripAnsi(chunk.toString());
      output += text;
      log.write(text);
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.on('error', (error) => {
      output += String(error);
      log.write(String(error));
    });
    child.on('close', (code) => {
      running.delete(child);
      log.end();
      resolveRun({ code, output });
    });
  });
}

const startedAt = new Date();
const results = new Map<string, StepResult>();
let failed = false;
let stack: RunningStack | undefined;
let stackStart: Promise<void> | undefined;
let stackError: string | undefined;

function ensureStack(): Promise<void> {
  stackStart ??= (async () => {
    console.log(
      `[test-runner] starting isolated stack (${process.env['POSTGRES_MODE'] ?? 'embedded'} Postgres, Mailpit, services)`,
    );
    try {
      stack = await startStack({ logDir: join(logDir, 'services') });
    } catch (error) {
      stackError = error instanceof Error ? error.message : String(error);
      console.error(`[test-runner] stack failed to start: ${stackError}`);
    }
  })();
  return stackStart;
}

let interrupted = false;
async function shutdown(code: number) {
  if (interrupted) return;
  interrupted = true;
  for (const child of running) killTree(child);
  if (stackStart) await stackStart;
  if (stack) await stack.stop();
  process.exit(code);
}
process.on('SIGINT', () => void shutdown(130));
process.on('SIGTERM', () => void shutdown(143));

const skippedResult = (step: StepDefinition, note: string): StepResult => ({
  id: step.id,
  name: step.name,
  command: step.command,
  status: 'skipped',
  exitCode: null,
  durationMs: 0,
  warnings: 0,
  failures: [],
  note,
});

/** Spec files of the browser suite; none yet means the suite has nothing to run. */
function countE2eSpecs(): number {
  const dir = join(root, 'tests', 'e2e');
  if (!existsSync(dir)) return 0;
  return readdirSync(dir, { recursive: true }).filter((entry) =>
    String(entry).endsWith('.e2e.test.ts'),
  ).length;
}

let browsersReady: Promise<void> | undefined;

/**
 * Installs the Chromium build the browser suite needs, once per run. Its output goes to its
 * own log, which is not part of the warning count. Skipped when the browsers path already
 * holds a Chromium build.
 */
function ensureBrowsers(env: NodeJS.ProcessEnv): Promise<void> {
  browsersReady ??= (async () => {
    const path = process.env['PLAYWRIGHT_BROWSERS_PATH'];
    if (path && existsSync(path) && readdirSync(path).some((name) => name.startsWith('chromium'))) {
      return;
    }
    const { code } = await runCommand(
      'pnpm exec playwright install chromium',
      join(logDir, 'e2e-setup.log'),
      env,
    );
    if (code !== 0) throw new Error('Chromium install failed (see logs/e2e-setup.log)');
  })();
  return browsersReady;
}

async function runStep(step: StepDefinition): Promise<StepResult> {
  const base: StepResult = {
    id: step.id,
    name: step.name,
    command: step.command,
    status: 'passed',
    exitCode: 0,
    durationMs: 0,
    warnings: 0,
    failures: [],
    logFile: `logs/${step.id}.log`,
  };

  if (step.needsStack) {
    await ensureStack();
    if (!stack) {
      return {
        ...base,
        status: 'failed',
        exitCode: null,
        note: `Live stack unavailable: ${stackError ?? 'not started'}`,
      };
    }
  }

  const env = plainOutputEnv({
    ...process.env,
    ...(step.needsStack ? stack?.env : {}),
    ...step.env,
  });
  // Playwright's workers set FORCE_COLOR themselves; NO_COLOR next to it makes Node warn
  if (step.playwright) delete env['NO_COLOR'];

  if (step.playwright) {
    const specFiles = countE2eSpecs();
    if (specFiles === 0) {
      return {
        ...base,
        status: browserRunStatus({ total: 0, passed: 0, failed: 0, skipped: 0 }, 0),
        durationMs: 0,
        note: 'No browser spec files exist',
      };
    }
    await ensureBrowsers(env);
  }

  const started = Date.now();
  const { code, output } = await runCommand(step.command, join(logDir, `${step.id}.log`), env);
  // The web process lists the client files once at start, so it must restart after a build
  if (step.id === 'build' && code === 0 && stackStart) {
    await stackStart;
    await stack?.restartWeb();
  }
  const result: StepResult = {
    ...base,
    exitCode: code,
    durationMs: Date.now() - started,
    warnings: countWarnings(output),
    status: code === 0 ? 'passed' : 'failed',
  };

  if (step.vitest) {
    const file = join(root, jsonOut(step.id));
    if (existsSync(file)) {
      const parsed = parseVitestJson(readFileSync(file, 'utf8'));
      result.tests = parsed.tests;
      result.failures = parsed.failures;
      result.detailFile = `${step.id}.json`;
    } else {
      result.status = 'failed';
      result.note = 'Vitest produced no JSON report';
    }
  }

  if (step.playwright) {
    const file = join(root, jsonOut(step.id));
    if (existsSync(file)) {
      const parsed = parsePlaywrightJson(readFileSync(file, 'utf8'));
      result.tests = parsed.tests;
      result.failures = parsed.failures;
      result.detailFile = `${step.id}.json`;
      if (result.status === 'passed') {
        result.status = browserRunStatus(parsed.tests, countE2eSpecs());
        if (result.status === 'failed') result.note = 'The browser suite ran no tests';
      }
    } else {
      result.status = 'failed';
      result.note = 'Playwright produced no JSON report';
    }
  }
  return result;
}

// Start the live stack in the background so its startup overlaps with the earlier steps
if (selected.some((step) => step.needsStack)) void ensureStack();

async function executeStep(step: StepDefinition): Promise<void> {
  if (bail && failed) {
    results.set(step.id, skippedResult(step, 'Not run: an earlier step failed (--bail)'));
    return;
  }
  console.log(`[test-runner] ${step.name} ...`);
  let result: StepResult;
  try {
    result = await runStep(step);
  } catch (error) {
    result = {
      ...skippedResult(step, `Runner error: ${error instanceof Error ? error.message : error}`),
      status: 'failed',
    };
  }
  results.set(step.id, result);
  if (result.status === 'failed') failed = true;
  const counts = result.tests ? ` (${result.tests.passed}/${result.tests.total} tests)` : '';
  console.log(
    `[test-runner] ${step.name}: ${result.status.toUpperCase()}${counts} in ${(result.durationMs / 1000).toFixed(1)} s`,
  );
}

// Read-only checks that sit next to each other in the list run together; the rest run one at a time
for (let index = 0; index < selected.length;) {
  const group = [selected[index]!];
  while (group[0]!.concurrent && selected[index + group.length]?.concurrent) {
    group.push(selected[index + group.length]!);
  }
  index += group.length;
  await Promise.all(group.map(executeStep));
}

if (stackStart) await stackStart;
if (stack) await stack.stop();

for (const step of steps) {
  if (!results.has(step.id)) {
    results.set(
      step.id,
      skippedResult(
        step,
        step.optional && !only ? `Optional: run with --only=${step.id}` : 'Skipped',
      ),
    );
  }
}

const summary = buildSummary(
  steps.map((step) => results.get(step.id)!),
  startedAt,
  new Date(),
  {
    node: process.version,
    platform: `${process.platform}-${process.arch}`,
    ci: Boolean(process.env['CI'] ?? process.env['TF_BUILD']),
  },
);
writeFileSync(join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
writeFileSync(join(outDir, 'index.html'), renderHtml(summary));

console.log(
  `\n[test-runner] overall: ${summary.overall.toUpperCase()} in ${(summary.durationMs / 1000).toFixed(1)} s`,
);
console.log(`[test-runner] report: ${join(outDir, 'index.html')}`);
process.exit(summary.overall === 'passed' ? 0 : 1);
