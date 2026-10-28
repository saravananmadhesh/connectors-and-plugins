/**
 * Runs the tests of the .NET SDK (packages/sdk-dotnet) as one step of `pnpm test`, with a
 * coverage gate, so a break of the .NET package shows up next to the TypeScript results.
 *
 *   pnpm exec tsx scripts/test-runner/dotnet-sdk.ts
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const minimum = { lines: 0.9, branches: 0.8 } as const;

export interface Coverage {
  lines: number;
  branches: number;
}

/** The totals of a Cobertura report. */
export function parseCoverage(xml: string): Coverage {
  const root = /<coverage\b[^>]*>/.exec(xml)?.[0] ?? '';
  const read = (name: string) => Number(new RegExp(`${name}="([\\d.]+)"`).exec(root)?.[1]);
  const lines = read('line-rate');
  const branches = read('branch-rate');
  if (Number.isNaN(lines) || Number.isNaN(branches)) {
    throw new Error('The coverage report has no line-rate and branch-rate.');
  }
  return { lines, branches };
}

/** The messages for every total below its minimum; empty when the gate passes. */
export function coverageFailures(coverage: Coverage, floor: Coverage = minimum): string[] {
  const failures: string[] = [];
  for (const key of ['lines', 'branches'] as const) {
    if (coverage[key] + 1e-9 < floor[key]) {
      failures.push(
        `.NET SDK ${key} coverage ${(coverage[key] * 100).toFixed(1)}% is below ${(floor[key] * 100).toFixed(0)}%.`,
      );
    }
  }
  return failures;
}

function findReport(directory: string): string | undefined {
  const found: string[] = [];
  const walk = (folder: string) => {
    for (const name of readdirSync(folder)) {
      const path = join(folder, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === 'coverage.cobertura.xml') found.push(path);
    }
  };
  walk(directory);
  return found.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)[0];
}

function main(): number {
  const root = resolve(import.meta.dirname, '..', '..');
  const solution = join(root, 'packages', 'sdk-dotnet', 'Syncfusion.BoldCreate.Connect.sln');
  const env = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' };

  const version = spawnSync('dotnet', ['--version'], { encoding: 'utf8', env });
  if (version.error || version.status !== 0) {
    process.stderr.write(
      'The .NET SDK (dotnet) is not installed or not on the PATH. It is needed to test packages/sdk-dotnet.\n' +
        'Install the .NET 8 SDK or newer, or run the other steps with --skip=dotnet.\n',
    );
    return 1;
  }

  const results = join(root, 'reports', 'dotnet');
  rmSync(results, { recursive: true, force: true });
  mkdirSync(results, { recursive: true });
  const test = spawnSync(
    'dotnet',
    [
      'test',
      solution,
      '-c',
      'Release',
      '--nologo',
      '--collect:XPlat Code Coverage',
      '--settings',
      join(
        root,
        'packages',
        'sdk-dotnet',
        'Syncfusion.BoldCreate.Connect.Tests',
        'coverlet.runsettings',
      ),
      '--results-directory',
      results,
    ],
    { stdio: 'inherit', env },
  );
  if (test.status !== 0) return test.status ?? 1;

  const report = existsSync(results) ? findReport(results) : undefined;
  if (!report) {
    process.stderr.write('The .NET test run wrote no coverage report.\n');
    return 1;
  }
  const coverage = parseCoverage(readFileSync(report, 'utf8'));
  process.stdout.write(
    `.NET SDK coverage: lines ${(coverage.lines * 100).toFixed(1)}%, branches ${(coverage.branches * 100).toFixed(1)}%\n`,
  );
  const failures = coverageFailures(coverage);
  for (const message of failures) process.stderr.write(`${message}\n`);
  return failures.length === 0 ? 0 : 1;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  process.exit(main());
}
