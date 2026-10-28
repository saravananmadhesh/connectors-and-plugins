/**
 * Report model and renderers for the all-in-one test runner. Pure functions only,
 * so the summary and HTML output can be unit tested without running any suite.
 */
export type StepStatus = 'passed' | 'failed' | 'skipped';

export interface TestFailure {
  file: string;
  name: string;
  message: string;
}

export interface TestCounts {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}

export interface StepResult {
  id: string;
  name: string;
  command: string;
  status: StepStatus;
  exitCode: number | null;
  durationMs: number;
  warnings: number;
  tests?: TestCounts;
  failures: TestFailure[];
  logFile?: string;
  detailFile?: string;
  note?: string;
}

export interface RunSummary {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  overall: 'passed' | 'failed';
  environment: { node: string; platform: string; ci: boolean };
  steps: StepResult[];
}

interface VitestAssertion {
  fullName?: string;
  title?: string;
  status?: string;
  failureMessages?: string[];
}

interface VitestFile {
  name?: string;
  status?: string;
  message?: string;
  assertionResults?: VitestAssertion[];
}

interface VitestJson {
  testResults?: VitestFile[];
}

/** Extracts counts and failures from a Vitest `--reporter=json` document. */
export function parseVitestJson(raw: string): { tests: TestCounts; failures: TestFailure[] } {
  const doc = JSON.parse(raw) as VitestJson;
  const tests: TestCounts = { total: 0, passed: 0, failed: 0, skipped: 0 };
  const failures: TestFailure[] = [];

  for (const file of doc.testResults ?? []) {
    const assertions = file.assertionResults ?? [];
    for (const test of assertions) {
      tests.total += 1;
      if (test.status === 'passed') tests.passed += 1;
      else if (test.status === 'failed') {
        tests.failed += 1;
        failures.push({
          file: file.name ?? '',
          name: test.fullName ?? test.title ?? '',
          message: (test.failureMessages ?? []).join('\n'),
        });
      } else tests.skipped += 1;
    }
    // A file that failed to load or a failing hook reports no failed assertions
    if (file.status === 'failed' && !assertions.some((test) => test.status === 'failed')) {
      tests.total += 1;
      tests.failed += 1;
      failures.push({
        file: file.name ?? '',
        name: '(suite failed to run)',
        message: file.message ?? 'Suite failed without a message',
      });
    }
  }
  return { tests, failures };
}

interface PlaywrightResult {
  status?: string;
  error?: { message?: string };
  errors?: { message?: string }[];
}

interface PlaywrightTest {
  status?: string;
  results?: PlaywrightResult[];
}

interface PlaywrightSpec {
  title?: string;
  file?: string;
  tests?: PlaywrightTest[];
}

interface PlaywrightSuite {
  title?: string;
  file?: string;
  specs?: PlaywrightSpec[];
  suites?: PlaywrightSuite[];
}

interface PlaywrightJson {
  suites?: PlaywrightSuite[];
  errors?: { message?: string }[];
}

/** Extracts counts and failures from a Playwright `json` reporter document. */
export function parsePlaywrightJson(raw: string): { tests: TestCounts; failures: TestFailure[] } {
  const doc = JSON.parse(raw) as PlaywrightJson;
  const tests: TestCounts = { total: 0, passed: 0, failed: 0, skipped: 0 };
  const failures: TestFailure[] = [];

  const visit = (suite: PlaywrightSuite) => {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        tests.total += 1;
        if (test.status === 'expected' || test.status === 'flaky') tests.passed += 1;
        else if (test.status === 'skipped') tests.skipped += 1;
        else {
          tests.failed += 1;
          const messages = (test.results ?? []).flatMap((result) => [
            ...(result.errors ?? []).map((error) => error.message ?? ''),
            ...(result.errors === undefined && result.error ? [result.error.message ?? ''] : []),
          ]);
          failures.push({
            file: spec.file ?? suite.file ?? '',
            name: spec.title ?? '',
            message: stripAnsi(messages.join('\n')),
          });
        }
      }
    }
    for (const child of suite.suites ?? []) visit(child);
  };
  for (const suite of doc.suites ?? []) visit(suite);

  // Errors outside any test (config, global setup, a spec that failed to load)
  for (const error of doc.errors ?? []) {
    tests.total += 1;
    tests.failed += 1;
    failures.push({
      file: '',
      name: '(browser suite failed to run)',
      message: stripAnsi(error.message ?? 'Browser suite failed without a message'),
    });
  }
  return { tests, failures };
}

/**
 * A browser run that executed no test is acceptable only when the repository has no spec
 * file at all; with spec files present, zero tests means the suite silently did not run.
 */
export function browserRunStatus(counts: TestCounts, specFileCount: number): StepStatus {
  if (counts.failed > 0) return 'failed';
  if (counts.total === 0) return specFileCount === 0 ? 'passed' : 'failed';
  return 'passed';
}

/** Removes terminal color and cursor escape codes so captured logs are plain text. */
export function stripAnsi(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/[[0-9;?]*[ -/]*[@-~]/g, '');
}

/** Environment for child processes: colors are for terminals, not for captured logs. */
export function plainOutputEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const { FORCE_COLOR: _forced, ...rest } = env;
  return { ...rest, NO_COLOR: '1' };
}

/** Counts lint-style warning lines in captured command output. */
export function countWarnings(output: string): number {
  const found = output.match(/Found (\d+) warnings?/i);
  if (found?.[1]) return Number(found[1]);
  return (output.match(/^\S.*:\d+:\d+: warning /gm) ?? []).length;
}

export function buildSummary(
  steps: StepResult[],
  startedAt: Date,
  finishedAt: Date,
  environment: RunSummary['environment'],
): RunSummary {
  return {
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationMs: finishedAt.getTime() - startedAt.getTime(),
    overall: steps.some((step) => step.status === 'failed') ? 'failed' : 'passed',
    environment,
    steps,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}

function renderFailures(step: StepResult): string {
  if (step.failures.length === 0) return '';
  const items = step.failures
    .map(
      (failure) =>
        `<p><strong>${escapeHtml(failure.name)}</strong><br><code>${escapeHtml(
          failure.file,
        )}</code></p><pre>${escapeHtml(failure.message)}</pre>`,
    )
    .join('');
  return `<tr><td colspan="5"><details open><summary>${step.failures.length} failure(s)</summary>${items}</details></td></tr>`;
}

function renderRow(step: StepResult): string {
  const counts = step.tests
    ? `${step.tests.passed}/${step.tests.total} passed, ${step.tests.skipped} skipped`
    : '';
  const warnings = step.warnings ? `<br>${step.warnings} warning(s)` : '';
  const note = step.note ? `<br>${escapeHtml(step.note)}` : '';
  const links = [
    step.logFile ? `<a href="${escapeHtml(step.logFile)}">log</a>` : '',
    step.detailFile ? `<a href="${escapeHtml(step.detailFile)}">json</a>` : '',
  ]
    .filter(Boolean)
    .join(' · ');
  return `<tr class="${step.status}"><td>${escapeHtml(step.name)}<br><code>${escapeHtml(
    step.command,
  )}</code></td><td class="status">${step.status}</td><td>${formatDuration(
    step.durationMs,
  )}</td><td>${counts}${warnings}${note}</td><td>${links}</td></tr>${renderFailures(step)}`;
}

/** Renders a self-contained HTML report for review. */
export function renderHtml(summary: RunSummary): string {
  const rows = summary.steps.map(renderRow).join('\n');
  const ci = summary.environment.ci ? ' · CI' : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Test run report</title>
<style>
body{font-family:system-ui,sans-serif;margin:2rem;color:#111}
table{border-collapse:collapse;width:100%}
td,th{border:1px solid #ddd;padding:.5rem;vertical-align:top;text-align:left}
tr.passed .status{color:#0a7d33;font-weight:600}
tr.failed .status{color:#b42318;font-weight:600}
tr.skipped .status{color:#666}
pre{background:#f6f6f6;padding:.5rem;overflow:auto;max-height:20rem}
.overall.passed{color:#0a7d33}.overall.failed{color:#b42318}
</style>
</head>
<body>
<h1>Test run report</h1>
<p class="overall ${summary.overall}"><strong>Overall: ${summary.overall}</strong></p>
<p>Started ${escapeHtml(summary.startedAt)} · ${formatDuration(summary.durationMs)} · Node ${escapeHtml(
    summary.environment.node,
  )} · ${escapeHtml(summary.environment.platform)}${ci}</p>
<table>
<thead><tr><th>Step</th><th>Status</th><th>Duration</th><th>Details</th><th>Artifacts</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</body>
</html>
`;
}
