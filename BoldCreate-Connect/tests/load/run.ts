/**
 * Load runner entry point.
 *
 *   pnpm exec tsx tests/load/run.ts --target=<url> [--smoke | --full]
 *
 * Requires K6_ALLOW_LOAD=1 and a target host listed in K6_ALLOWED_HOSTS (default
 * localhost,127.0.0.1). Any violation prints a refusal and exits 2. Run through the test runner
 * (`pnpm test -- --only=load`) the target is the gateway of its isolated stack. Smoke is a handful
 * of users and fails on any unexpected answer; full is the sizing run: 5,000 project users and
 * 1,000 active users.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isRefusal, planLoadRun } from './guard.js';
import type { ScenarioSize } from './scenario.js';

const args = process.argv.slice(2);
const stackGateway = process.env['TEST_GATEWAY_URL'];
if (!args.some((arg) => arg.startsWith('--target=')) && stackGateway) {
  args.push(`--target=${stackGateway}`);
}

// The test runner passes no arguments to a step; LOAD_FULL=1 picks the sizing run there.
const modeGiven = ['--smoke', '--full', '--ramp'].some((flag) => args.includes(flag));
if (process.env['LOAD_RAMP'] === '1' && !modeGiven) args.push('--ramp');
else if (process.env['LOAD_FULL'] === '1' && !modeGiven) args.push('--full');

const plan = planLoadRun(args, process.env);
if (isRefusal(plan)) {
  process.stderr.write(`[load] refused: ${plan.refusal}\n`);
  process.exit(2);
}

const log = (line: string) => process.stdout.write(`[load] ${line}\n`);

const { bootstrapLoadProject } = await import('./bootstrap.js');
const { FULL_SIZE, SMOKE_SIZE, runScenario } = await import('./scenario.js');
const { formatSummary } = await import('./stats.js');
/** LOAD_USERS and LOAD_ACTIVE shrink a run to reproduce a finding without the full wait. */
function sizeOf(base: ScenarioSize): ScenarioSize {
  const read = (name: string, fallback: number) => {
    const value = Number(process.env[name]);
    return Number.isInteger(value) && value > 0 ? value : fallback;
  };
  return {
    ...base,
    users: read('LOAD_USERS', base.users),
    activeUsers: read('LOAD_ACTIVE', base.activeUsers),
  };
}

log(`${plan.mode} run against ${plan.target.origin}`);
const project = await bootstrapLoadProject();
const outDir = join(import.meta.dirname, '..', '..', 'reports', 'load');

if (plan.mode === 'ramp') {
  const { formatWindows, runRamp } = await import('./ramp.js');
  const { liftRequestBudget } = await import('./bootstrap.js');
  await liftRequestBudget(project.rawProjectId);
  const read = (name: string, fallback: number) => {
    const value = Number(process.env[name]);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  const ramp = await runRamp({
    gatewayUrl: plan.target.origin,
    projectKey: project.projectKey,
    targetUsers: read('RAMP_USERS', 3_000),
    spawnPerSecond: read('RAMP_SPAWN_PER_SECOND', 100),
    thinkMs: read('RAMP_THINK_MS', 3_000),
    holdSeconds: read('RAMP_HOLD_SECONDS', 30),
    timeoutMs: read('RAMP_TIMEOUT_MS', 10_000),
    log,
  });
  process.stdout.write(`${formatWindows(ramp.windows)}
`);
  process.stdout.write(`totals: ${JSON.stringify(ramp.totals)}
`);
  log(
    ramp.firstDegraded
      ? `first degraded window: from ${ramp.firstDegraded.fromSecond} s with about ${ramp.firstDegraded.users} users`
      : 'no degraded window',
  );
  await mkdir(outDir, { recursive: true });
  await writeFile(
    join(outDir, 'ramp.json'),
    `${JSON.stringify(ramp, null, 2)}
`,
  );
  // The ramp measures where the service gives out, so a degraded window is a finding, not a failure.
  process.exit(0);
}

const result = await runScenario({
  gatewayUrl: plan.target.origin,
  projectKey: project.projectKey,
  size: sizeOf(plan.mode === 'full' ? FULL_SIZE : SMOKE_SIZE),
  log,
});
process.stdout.write(`${formatSummary(result.calls)}\n`);
await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, `${plan.mode}.json`), `${JSON.stringify(result, null, 2)}\n`);
if (result.failed > 0) {
  log(`FAILED: ${result.failed} unexpected answers`);
  process.exitCode = 1;
} else {
  log('PASSED');
}
