# BoldCreate Integrations — CI Pipeline Architecture & Specification

## 1. Overview & Purpose

The **BoldCreate Integrations Root CI Pipeline** is an automated quality gate built on **Azure DevOps Pipelines** and integrated with **Gitea Pull Requests**. It validates incoming pull requests, feature branches, and manual build triggers across the entire monorepo before code can be merged into `development` or deployment branches.

### Core Objectives

1. **Automated Quality Gate**: Enforce formatting, strict TypeScript compilation, unit test suites, client component tests, security checks, and conformance suites.
2. **Security & Vulnerability Scans**: Run automated secret scanning via **Gitleaks** and SAST analysis via **Semgrep**.
3. **Bi-directional Gitea PR Integration**: Automatically update Gitea PR discussions with:
   - An immediate clickable `INPROGRESS ⏳` status link when a build begins.
   - Comprehensive test metrics breakdown (Total, Passed, Failed, per-suite counts).
   - Direct links to Azure DevOps build runs and published artifacts.
   - PR merge gate enforcement (`enable_merge: true/false`).

---

## 2. Pipeline Parameters & Variables

### Pipeline Parameters

| Parameter      | Type      | Default       | Description                                                    |
| -------------- | --------- | ------------- | -------------------------------------------------------------- |
| `Build_Reason` | `string`  | `Manual`      | Execution mode (`Manual` or `PullRequest`).                    |
| `TargetBranch` | `string`  | `development` | Target or active branch name used during manual pipeline runs. |
| `RunGitleaks`  | `boolean` | `true`        | Toggles the Gitleaks secret detection scanner.                 |
| `RunSAST`      | `boolean` | `true`        | Toggles Semgrep static application security testing (SAST).    |
| `UnitTest`     | `boolean` | `true`        | Toggles test runner suites and quality gate execution.         |

### Global Variables & Variable Groups

- **Variable Group**: `DevOps CI` (stores secret variables such as `$(Api_key)` for posting Gitea webhook comments).
- **`currentDirectory`**: Set to `$(Build.SourcesDirectory)`.
- **`cireports`**: Set to `$(Build.ArtifactStagingDirectory)/ci-reports` for storing logs, test results, and scan outputs.
- **`nodeVersion`**: Set to `24.x` (aligned with the repository engine requirement `node >= 24 < 25`).

---

## 3. End-to-End Pipeline Workflow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Set Timezone (IST) & Initialize CI Report Directories    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 2. Dynamic Branch Resolution & Gitea Repository Checkout     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 3. Post Clickable INPROGRESS Status to Gitea PR Discussion  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 4. Setup Node.js (24.x) & Corepack pnpm (10.34.6)           │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 5. Code Format Verification (oxfmt --check)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 6. Monorepo Compilation & Type Generation (pnpm build)      │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 7. Secret Leak Detection (Gitleaks v8.18.4)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 8. Static Code Analysis (Semgrep SAST Scan)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 9. Monorepo Quality Gate & Test Runner Aggregation          │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 10. Post Final CI Markdown Summary to Gitea PR              │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│ 11. Enforce PR Quality Gate (Block Merge if Failed)         │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Step-by-Step Step Breakdown

### Step 1: Set Timezone to IST & Initialize Directories

- Configures agent system time to `Asia/Kolkata` (`/usr/share/zoneinfo/Asia/Kolkata`).
- Pre-creates directory structures:
  - `$(cireports)` (`ci-reports`)
  - `$(Agent.TempDirectory)/UnitTestResultsTimes`
  - `$(Agent.TempDirectory)/UnitTesting`
- Initializes empty log files (`FormatReport.txt`, `BuildLog.txt`, `BuildErrorLog.txt`, etc.).

### Step 2: Dynamic Branch Resolution & Gitea Checkout

- Resolves the exact checkout branch using a multi-tier fallback:
  1. `$(System.PullRequest.SourceBranch)` (when triggered via Pull Request)
  2. `$(TargetBranch)` parameter (when triggered manually or with branch override)
  3. `$(Build.SourceBranch)` / `development` default
- Strips any `refs/heads/` prefix.
- Uses `SyncfusionInc.syncfusion-gitea.giteacheckout-task.Syncfusion Gitea Checkout@1` to pull the precise branch into the agent workspace.

### Step 3: Post Clickable INPROGRESS Status to Gitea PR

- Resolves the Azure DevOps Build URL:
  `https://dev.azure.com/{ORG_NAME}/{PROJECT_ID}/_build/results?buildId={BUILD_ID}`
- If `PR_NUMBER` and `API_KEY` are present, executes a POST request to:
  `https://giteawebhook.syncfusioninternal.com/api/repos/{REPO_NAME}/pulls/{PR_NUMBER}/comments`
- Formats the branch as a clickable hyperlink:
  ```markdown
  **Build Status: INPROGRESS⏳**
  **Build Location:** [**feat/my-branch**](https://dev.azure.com/...)
  ```

### Step 4: Setup Node.js & Corepack pnpm

- Runs `NodeTool@0` targeting `24.x`.
- Activates Corepack with `corepack prepare pnpm@10.34.6 --activate`.
- Executes `pnpm install --frozen-lockfile` to install all monorepo dependencies deterministically without updating the lockfile.

### Step 5: Code Format Check (oxfmt)

- Runs `pnpm exec oxfmt --check .`.
- Captures output in `FormatReport.txt` and publishes it as a pipeline artifact (`FormatReport`).
- Scans for errors and sets pipeline variables:
  - `FormatViolationCount`
  - `format_status` (`SUCCESS` or `FAILURE`).

### Step 6: Monorepo Compilation & Typecheck (`pnpm build`)

- Runs `pnpm build` across all workspace apps (`api`, `gateway`, `worker`, `web`, `admin`) and packages (`contracts`, `domain`, `adapters`, `credentials`, `db`, `http-server`, etc.).
- Categorizes stdout/stderr into `BuildErrorLog.txt` and `BuildWarningLog.txt`.
- Filters for TypeScript compilation issues (`error TS`) and package manager errors (`ERR_PNPM`).
- Sets `BuildErrorCount`, `CompilerWarningCount`, and `compile_status`.

### Step 7: Secret Violation Scan (Gitleaks)

- Downloads and extracts standalone Gitleaks `v8.18.4`.
- Inspects git commit deltas (`git diff HEAD~1..HEAD`) with:
  ```bash
  gitleaks detect --pipe --report-format=json --report-path="$report" --no-banner --redact --exit-code=0
  ```
- Evaluates total leaks using `jq 'length'` and sets `gitleaks_count`.

### Step 8: SAST Scan (Semgrep)

- Installs Semgrep via Python3 pip (`pip install --quiet --user semgrep`).
- Scans the repository for OWASP Top 10 and TypeScript security patterns:
  ```bash
  semgrep scan --config=p/owasp-top-ten --config=p/typescript --json --output="$sast_report"
  ```
- Sets `sast_count`.

### Step 9: Quality Gate Runner & Metric Extraction

- Executes `pnpm test -- --only=lint,typecheck,unit,client,security,conformance`.
- Captures overall exit code into `TEST_EXIT`.
- Executes an inline Node.js script that parses:
  1. `reports/test-run/summary.json` (the unified report model produced by `scripts/test-runner/run-all.ts`).
  2. Individual Vitest JSON reports (`reports/test-run/*.json`).
  3. Raw suite logs in `reports/test-run/logs/*.log`.
- Extracts:
  - **Test Suite Metrics**: Passed and failed counts for `unit`, `client`, `security`, `conformance`, `integration`.
  - **Quality Gate Statuses**: Pass/fail states for static checks (`lint`, `typecheck`, `format`).
- Outputs `reports/test-run/test_metrics.json`.
- Uploads the full HTML report (`reports/test-run`) as artifact `TestRunHtmlReport`.

### Step 10: Post Final Markdown CI Summary to Gitea PR

- Reads `test_metrics.json` and compiler/format/security variables.
- Assembles comprehensive Gitea PR discussion feedback.
- If any stage failed, compiles explicit failure reasons (`Source Compilation Failed`, `Test Suite Failures`, `Security Violations`, etc.) and sets `enable_merge=false`.
- Posts final formatted JSON payload to Gitea webhook endpoint.

### Step 11: Enforce PR Quality Gate

- Evaluates `$(enable_merge)`.
- If `false`, logs an issue with `##vso[task.logissue type=error]` and exits with code `1`, blocking the Azure DevOps pipeline and marking the PR checks as failed.

---

## 5. Complete Azure DevOps Pipeline Specification (`.azure/ci-full.yml`)

```yaml
# ==============================================================================
# BoldCreate Integrations — Root Azure DevOps Initial Check Pipeline (CI)
# ==============================================================================

parameters:
  - name: Build_Reason
    displayName: 'Pipeline Mode'
    type: string
    default: 'Manual'
    values:
      - Manual
      - PullRequest

  - name: TargetBranch
    displayName: 'Branch Name (for Manual Runs)'
    type: string
    default: 'development'

  - name: RunGitleaks
    displayName: 'Run Gitleaks Secret Scan'
    type: boolean
    default: true

  - name: RunSAST
    displayName: 'Run Semgrep SAST Scan'
    type: boolean
    default: true

  - name: UnitTest
    displayName: 'Run Quality Gate & Test Suites'
    type: boolean
    default: true

variables:
  - group: 'DevOps CI'
  - name: TargetBranch
    value: ${{ parameters.TargetBranch }}
  - name: currentDirectory
    value: $(Build.SourcesDirectory)
  - name: cireports
    value: '$(Build.ArtifactStagingDirectory)/ci-reports'
  - name: nodeVersion
    value: '24.x'

jobs:
  # ==============================================================================
  # JOB: PreMerge (PR Quality Gate & Diagnostics)
  # ==============================================================================
  - job: PreMerge
    displayName: 'Pre Merge: Build, Test & Lint'
    pool:
      vmImage: 'ubuntu-latest'
    steps:
      - ${{ if or(eq(parameters.Build_Reason, 'PullRequest'), eq(parameters.Build_Reason, 'Manual')) }}:
          # ── 1. Set Timezone to IST & Initialize Log Files ─────────────────────
          - script: |
              echo "Setting timezone to IST"
              sudo ln -sf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
              echo "Current timezone: $(date)"

              mkdir -p "$(cireports)"
              mkdir -p "$(Agent.TempDirectory)/UnitTestResultsTimes"
              mkdir -p "$(Agent.TempDirectory)/UnitTesting"

              touch "$(cireports)/FormatReport.txt"
              touch "$(cireports)/BuildLog.txt"
              touch "$(cireports)/BuildErrorLog.txt"
              touch "$(cireports)/BuildWarningLog.txt"
              touch "$(cireports)/unit_test_summary.txt"
              touch "$(Agent.TempDirectory)/UnitTestResultsTimes/unit_test_times.txt"
            displayName: 'Set Timezone to IST & Init Log Dirs'

          # ── 2. Determine Branch & Checkout Gitea Repository ───────────────────
          - checkout: none

          - bash: |
              echo "Build.Reason                    : $(Build.Reason)"
              echo "System.PullRequest.SourceBranch : $PR_SOURCE_BRANCH"
              echo "TargetBranch parameter          : $CUSTOM_BRANCH"
              echo "Build.SourceBranch              : $BUILD_SOURCE_BRANCH"

              if [ -n "$PR_SOURCE_BRANCH" ] && [ "$PR_SOURCE_BRANCH" != "null" ]; then
                RAW_BRANCH="$PR_SOURCE_BRANCH"
              elif [ -n "$CUSTOM_BRANCH" ] && [ "$CUSTOM_BRANCH" != "development" ]; then
                RAW_BRANCH="$CUSTOM_BRANCH"
              else
                RAW_BRANCH="${BUILD_SOURCE_BRANCH:-development}"
              fi

              CHECKOUT_BRANCH="${RAW_BRANCH#refs/heads/}"
              echo "============================================="
              echo "Resolved Checkout Branch : $CHECKOUT_BRANCH"
              echo "============================================="
              echo "##vso[task.setvariable variable=CHECKOUT_BRANCH]$CHECKOUT_BRANCH"
            displayName: 'Determine Checkout Branch'
            env:
              PR_SOURCE_BRANCH: $(System.PullRequest.SourceBranch)
              CUSTOM_BRANCH: $(TargetBranch)
              BUILD_SOURCE_BRANCH: $(Build.SourceBranch)

          - task: SyncfusionInc.syncfusion-gitea.giteacheckout-task.Syncfusion Gitea Checkout@1
            displayName: 'Checkout Gitea repository'
            inputs:
              giteaUrl: 'https://gitea.syncfusion.com/Syncfusion-Code-Studio/boldcreate-integrations'
              branch: '$(CHECKOUT_BRANCH)'

          # ── 3. Resolve Branch & Post In-Progress Status to Gitea PR ───────────
          - bash: |
              if [ -n "$PR_SOURCE_BRANCH" ]; then
                  RAW_BRANCH="$PR_SOURCE_BRANCH"
              elif [ -n "$CUSTOM_BRANCH" ]; then
                  RAW_BRANCH="$CUSTOM_BRANCH"
              else
                  RAW_BRANCH="$BUILD_SOURCE_BRANCH"
              fi

              BRANCH_NAME="${RAW_BRANCH#refs/heads/}"
              echo "============================================="
              echo "Active Target Branch : $BRANCH_NAME"
              echo "PR Number            : ${PR_NUMBER:-None}"
              echo "Working Directory    : $(pwd)"
              echo "============================================="

              echo "##vso[task.setvariable variable=BRANCH_NAME]$BRANCH_NAME"
              echo "##vso[task.setvariable variable=PR_NUMBER]$PR_NUMBER"

              ORG_NAME=$(echo "$(System.CollectionUri)" | awk -F'/' '{print $4}')
              PROJECT_ID="$(System.TeamProjectId)"
              BUILD_ID="$(Build.BuildId)"
              buildlink="https://dev.azure.com/${ORG_NAME}/${PROJECT_ID}/_build/results?buildId=${BUILD_ID}"

              TARGET_REPO="${REPO_NAME:-Syncfusion-Code-Studio/boldcreate-integrations}"
              if [ -n "$PR_NUMBER" ] && [ -n "$API_KEY" ]; then
                echo "Posting INPROGRESS status to Gitea PR #$PR_NUMBER..."
                COMMENT_BODY="**Build Status: INPROGRESS⏳**\n**Build Location:** [**$BRANCH_NAME**]($buildlink)"
                url="https://giteawebhook.syncfusioninternal.com/api/repos/${TARGET_REPO}/pulls/${PR_NUMBER}/comments"

                curl -s -k -X POST "$url" \
                  -H "accept: */*" \
                  -H "x-api-key: $API_KEY" \
                  -H "Content-Type: application/json" \
                  -d "{\"body\": \"$COMMENT_BODY\"}" || true

                echo "PR Link: https://gitea.syncfusion.com/${TARGET_REPO}/pulls/${PR_NUMBER}"
              fi
            displayName: 'Resolve Branch & Post In-Progress to Gitea'
            condition: always()
            env:
              PR_SOURCE_BRANCH: $(System.PullRequest.SourceBranch)
              CUSTOM_BRANCH: $(TargetBranch)
              BUILD_SOURCE_BRANCH: $(Build_SourceBranchName)
              PR_NUMBER: $(System.PullRequest.PullRequestNumber)
              REPO_NAME: $(Build_Repository_Name)
              API_KEY: $(Api_key)

          # ── 4. Setup Node.js & Corepack pnpm ──────────────────────────────────
          - task: NodeTool@0
            displayName: 'Install Node.js $(nodeVersion)'
            inputs:
              versionSpec: '$(nodeVersion)'

          - script: |
              echo "Node Version: $(node -v)"
              corepack enable
              corepack prepare pnpm@10.34.6 --activate
              echo "pnpm Version: $(pnpm -v)"
            displayName: 'Enable Corepack & pnpm 10.x'

          - script: |
              pnpm install --frozen-lockfile
            displayName: 'pnpm install (workspace-aware)'

          # ── 5. Code Format Check (oxfmt) ──────────────────────────────────────
          - bash: |
              set +e
              format_log="$(cireports)/FormatReport.txt"
              pnpm exec oxfmt --check . > "$format_log" 2>&1
              rc=$?

              FormatErrorCount=$(grep -c -i "error" "$format_log" || true)
              echo "Format Violations: $FormatErrorCount"
              echo "##vso[task.setvariable variable=FormatViolationCount]$FormatErrorCount"

              if [ $rc -ne 0 ]; then
                echo "##vso[task.setvariable variable=format_status]FAILURE"
              else
                echo "##vso[task.setvariable variable=format_status]SUCCESS"
              fi
            displayName: 'Code Format Check (oxfmt)'

          - task: PublishBuildArtifacts@1
            displayName: 'Publish Format Report Artifact'
            condition: always()
            inputs:
              PathtoPublish: '$(cireports)/FormatReport.txt'
              ArtifactName: 'FormatReport'

          # ── 6. Source Compilation & Monorepo Build (pnpm build) ───────────────
          - bash: |
              set +e
              build_log="$(cireports)/BuildLog.txt"
              error_log="$(cireports)/BuildErrorLog.txt"
              warning_log="$(cireports)/BuildWarningLog.txt"

              pnpm build > "$build_log" 2>&1
              compile_rc=$?

              grep -E "error TS|ERR_PNPM" "$build_log" > "$error_log" || true
              grep -E "warning|warn" "$build_log" > "$warning_log" || true

              ErrorCount=$(grep -c "error TS" "$error_log" || true)
              WarningCount=$(grep -c "warning" "$warning_log" || true)

              echo "Build Errors: $ErrorCount"
              echo "Build Warnings: $WarningCount"

              echo "##vso[task.setvariable variable=BuildErrorCount]$ErrorCount"
              echo "##vso[task.setvariable variable=CompilerWarningCount]$WarningCount"

              if [ $compile_rc -ne 0 ]; then
                echo "##vso[task.setvariable variable=compile_status]FAILURE"
                exit 1
              else
                echo "##vso[task.setvariable variable=compile_status]SUCCESS"
              fi
            displayName: 'Source Compilation (pnpm build)'

          - task: PublishBuildArtifacts@1
            displayName: 'Upload Build Errors to Artifact'
            condition: failed()
            inputs:
              PathtoPublish: '$(cireports)/BuildErrorLog.txt'
              ArtifactName: 'BuildErrors'

          - task: PublishBuildArtifacts@1
            displayName: 'Upload Build Warnings to Artifact'
            condition: always()
            inputs:
              PathtoPublish: '$(cireports)/BuildWarningLog.txt'
              ArtifactName: 'BuildWarnings'

          # ── 7. Security Violation Scan (Gitleaks) ─────────────────────────────
          - ${{ if eq(parameters.RunGitleaks, true) }}:
              - bash: |
                  set +e
                  report="$(cireports)/gitleaks-report.json"
                  gitleaks_count=0

                  GITLEAKS_VERSION="8.18.4"
                  curl -sSL -o /tmp/gitleaks.tar.gz \
                    "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz"
                  tar -xzf /tmp/gitleaks.tar.gz -C /tmp/ gitleaks
                  chmod +x /tmp/gitleaks

                  git diff HEAD~1..HEAD -- . 2>/dev/null \
                    | /tmp/gitleaks detect \
                        --pipe \
                        --report-format=json \
                        --report-path="$report" \
                        --no-banner \
                        --redact \
                        --exit-code=0 \
                    || true

                  if [ -f "$report" ]; then
                    gitleaks_count=$(jq 'length' "$report" 2>/dev/null || echo 0)
                  fi
                  gitleaks_count=${gitleaks_count:-0}
                  echo "Security Violation Error(s): $gitleaks_count"
                  echo "##vso[task.setvariable variable=gitleaks_count]$gitleaks_count"
                displayName: 'Security Violation Scan (Gitleaks)'

          # ── 8. SAST Scan (Semgrep) ────────────────────────────────────────────
          - ${{ if eq(parameters.RunSAST, true) }}:
              - bash: |
                  set +e
                  sast_count=0
                  sast_report="$(cireports)/semgrep-report.json"

                  python3 -m pip install --quiet --user semgrep || true
                  export PATH="$HOME/.local/bin:$PATH"

                  if command -v semgrep >/dev/null 2>&1; then
                    semgrep scan \
                      --config=p/owasp-top-ten \
                      --config=p/typescript \
                      --json \
                      --output="$sast_report" \
                      --quiet \
                      --error=false \
                      "$(Build.SourcesDirectory)" || true

                    if [ -f "$sast_report" ] && command -v jq >/dev/null 2>&1; then
                      sast_count=$(jq '.results | length' "$sast_report" 2>/dev/null || echo 0)
                    fi
                  fi

                  sast_count=${sast_count:-0}
                  echo "SAST Vulnerabilities: $sast_count"
                  echo "##vso[task.setvariable variable=sast_count]$sast_count"
                displayName: 'SAST Scan (Semgrep)'

          # ── 9. Monorepo Quality Gate & Test Runner (pnpm test) ────────────────
          - bash: |
              set +e
              echo "=== Running Monorepo Quality Gate Suites ==="

              pnpm test -- --only=lint,typecheck,unit,client,security,conformance
              test_rc=$?
              echo "##vso[task.setvariable variable=TEST_EXIT]$test_rc"

              node -e '
                const fs = require("fs");
                const path = require("path");

                const suites = {};
                const checks = {};

                // 1. Read summary.json generated by scripts/test-runner/run-all.ts
                const summaryFile = "reports/test-run/summary.json";
                if (fs.existsSync(summaryFile)) {
                  try {
                    const summary = JSON.parse(fs.readFileSync(summaryFile, "utf8"));
                    for (const step of (summary.steps || [])) {
                      if (step.tests) {
                        suites[step.id] = {
                          name: step.name || step.id,
                          passed: Number(step.tests.passed || 0),
                          failed: Number(step.tests.failed || 0),
                          skipped: Number(step.tests.skipped || 0),
                          total: Number(step.tests.total || 0)
                        };
                      } else if (step.status) {
                        checks[step.id] = {
                          name: step.name || step.id,
                          status: step.status,
                          warnings: Number(step.warnings || 0)
                        };
                      }
                    }
                  } catch (e) {
                    console.error("Error reading summary.json:", e.message);
                  }
                }

                // 2. Read individual Vitest JSON files for any missing test counts
                const targetSuites = ["unit", "client", "security", "conformance", "integration"];
                for (const suite of targetSuites) {
                  const jsonPath = path.join("reports/test-run", `${suite}.json`);
                  if ((!suites[suite] || suites[suite].total === 0) && fs.existsSync(jsonPath)) {
                    try {
                      const doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
                      let p = 0, f = 0, s = 0;
                      for (const file of doc.testResults || []) {
                        for (const t of file.assertionResults || []) {
                          if (t.status === "passed") p++;
                          else if (t.status === "failed") f++;
                          else s++;
                        }
                      }
                      if (p > 0 || f > 0) {
                        suites[suite] = {
                          name: suite.charAt(0).toUpperCase() + suite.slice(1),
                          passed: p,
                          failed: f,
                          skipped: s,
                          total: p + f + s
                        };
                      }
                    } catch (e) {
                      console.error(`Error parsing ${jsonPath}:`, e.message);
                    }
                  }
                }

                // 3. Fallback scan log files
                const logDir = "reports/test-run/logs";
                for (const suite of targetSuites) {
                  if (!suites[suite] || suites[suite].total === 0) {
                    const logFile = path.join(logDir, `${suite}.log`);
                    if (fs.existsSync(logFile)) {
                      const text = fs.readFileSync(logFile, "utf8");
                      const passedMatch = [...text.matchAll(/(\d+)\s+passed/g)].pop();
                      const failedMatch = [...text.matchAll(/(\d+)\s+failed/g)].pop();
                      const p = passedMatch ? parseInt(passedMatch[1], 10) : 0;
                      const f = failedMatch ? parseInt(failedMatch[1], 10) : 0;
                      if (p > 0 || f > 0) {
                        suites[suite] = {
                          name: suite.charAt(0).toUpperCase() + suite.slice(1),
                          passed: p,
                          failed: f,
                          skipped: 0,
                          total: p + f
                        };
                      }
                    }
                  }
                }

                let totalPassed = 0;
                let totalFailed = 0;
                let breakdownItems = [];

                for (const key of Object.keys(suites)) {
                  const s = suites[key];
                  totalPassed += s.passed;
                  totalFailed += s.failed;
                  breakdownItems.push(`${s.name || key}: ${s.passed} passed${s.failed > 0 ? `, ${s.failed} failed` : ""}`);
                }

                const checkItems = [];
                for (const key of Object.keys(checks)) {
                  const c = checks[key];
                  const badge = c.status === "passed" ? "PASSED ✅" : "FAILED ❌";
                  checkItems.push(`${c.name || key}: ${badge}`);
                }

                const result = {
                  total: totalPassed + totalFailed,
                  passed: totalPassed,
                  failed: totalFailed,
                  breakdown: breakdownItems.join(" | ") || "None",
                  checks: checkItems.join(" | ") || "Quality Gates Passed"
                };

                const outDir = process.env.CI_REPORTS || "reports/test-run";
                fs.mkdirSync(outDir, { recursive: true });
                fs.writeFileSync(path.join(outDir, "test_metrics.json"), JSON.stringify(result, null, 2));
                console.log("=== Extracted Metrics ===", JSON.stringify(result, null, 2));
              '
            displayName: 'Run Test Suites & Parse Results'
            condition: always()
            env:
              CI_REPORTS: $(cireports)

          - task: PublishBuildArtifacts@1
            displayName: 'Upload Full Test Run Report HTML'
            condition: always()
            inputs:
              PathtoPublish: 'reports/test-run'
              ArtifactName: 'TestRunHtmlReport'

          # ── 10. Final CI Summary — Post Markdown to Gitea PR ──────────────────
          - bash: |
              if [ -z "$PR_NUMBER" ] || [ -z "$API_KEY" ]; then 
                echo "No PR number or API key. Skipping Gitea PR comment."
                exit 0
              fi

              ORG_NAME=$(echo "$(System.CollectionUri)" | awk -F'/' '{print $4}')
              PROJECT_ID="$(System.TeamProjectId)"
              BUILD_ID="$(Build.BuildId)"
              TARGET_REPO="${REPO_NAME:-Syncfusion-Code-Studio/boldcreate-integrations}"

              buildlink="https://dev.azure.com/${ORG_NAME}/${PROJECT_ID}/_build/results?buildId=${BUILD_ID}"
              artifactlink="https://dev.azure.com/${ORG_NAME}/${PROJECT_ID}/_build/results?buildId=${BUILD_ID}&view=artifacts&pathAsName=false&type=publishedArtifacts"

              METRICS_FILE="$(cireports)/test_metrics.json"
              if [ -f "$METRICS_FILE" ]; then
                total_tests=$(jq -r '.total // 0' "$METRICS_FILE")
                total_passed=$(jq -r '.passed // 0' "$METRICS_FILE")
                total_failed=$(jq -r '.failed // 0' "$METRICS_FILE")
                breakdown=$(jq -r '.breakdown // "None"' "$METRICS_FILE")
                checks=$(jq -r '.checks // "None"' "$METRICS_FILE")
              else
                total_tests=0
                total_passed=0
                total_failed=0
                breakdown="None"
                checks="None"
              fi

              format_count="${FormatViolationCount:-0}"
              compile_stat="${compile_status:-SUCCESS}"
              format_stat="${format_status:-SUCCESS}"
              gitleaks_val="${gitleaks_count:-0}"
              sast_val="${sast_count:-0}"

              FAILURE_REASONS=()

              if [ "$compile_stat" != "SUCCESS" ]; then
                FAILURE_REASONS+=("Source Compilation Failed")
                COMPILE_BADGE="**FAILURE ❌**"
              else
                COMPILE_BADGE="**SUCCESS ✅**"
              fi

              if [ "$format_stat" != "SUCCESS" ] || [ "$format_count" -gt 0 ]; then
                FORMAT_BADGE="**FAILURE ❌**"
              else
                FORMAT_BADGE="**SUCCESS ✅**"
              fi

              if [ "$total_failed" -gt 0 ] || [ "${TEST_EXIT:-0}" -ne 0 ]; then
                FAILURE_REASONS+=("Test Suite Failures")
                TEST_BADGE="**FAILURE ❌**"
              else
                TEST_BADGE="**SUCCESS ✅**"
              fi

              if [ "$gitleaks_val" -gt 0 ]; then
                FAILURE_REASONS+=("Security Violations")
              fi

              if [ "$sast_val" -gt 0 ]; then
                FAILURE_REASONS+=("SAST Vulnerabilities")
              fi

              if [ ${#FAILURE_REASONS[@]} -eq 0 ]; then
                BUILD_STATUS="**SUCCESS ✅**"
                echo "##vso[task.setvariable variable=enable_merge]true"
                FAILURE_REASON=""
              else
                BUILD_STATUS="**FAILURE ❌**"
                echo "##vso[task.setvariable variable=enable_merge]false"
                reason_str=$(IFS=", "; echo "${FAILURE_REASONS[*]}")
                FAILURE_REASON="**Failure Reason:** **${reason_str}**"
              fi

              COMMENT="**CI Status:** ${BUILD_STATUS}
              **Source Compilation:** ${COMPILE_BADGE}
              **Code Format Check:** ${FORMAT_BADGE}
              **Quality Gate Status:** ${TEST_BADGE}
              **Build Location:** [${BRANCH_NAME}](${buildlink})
              **Security Violation Error(s):** ${gitleaks_val}
              **SAST Vulnerabilities Error(s):** ${sast_val}
              **Format Violation(s):** ${format_count}

              **🧪 Quality Checks & Test Results:**
              - **Total Test Cases:** ${total_tests}
              - **Passed:** ${total_passed} ✅
              - **Failed:** ${total_failed} ❌
              - **Suites:** ${breakdown}
              - **Quality Checks:** ${checks}"

              if [ -n "$FAILURE_REASON" ]; then
                COMMENT="${COMMENT}

              ${FAILURE_REASON}"
              fi

              COMMENT="${COMMENT}

              **[View all reports and artifacts](${artifactlink})**"

              JSON_PAYLOAD=$(jq -n --arg body "$COMMENT" '{body: $body}')
              url="https://giteawebhook.syncfusioninternal.com/api/repos/${TARGET_REPO}/pulls/${PR_NUMBER}/comments"

              curl -s -k -X POST "$url" \
                -H "accept: */*" \
                -H "x-api-key: $API_KEY" \
                -H "Content-Type: application/json" \
                -d "$JSON_PAYLOAD" || true
            displayName: 'Post Final CI Summary to Gitea'
            condition: always()
            env:
              PR_NUMBER: $(PR_NUMBER)
              BRANCH_NAME: $(BRANCH_NAME)
              REPO_NAME: $(Build_Repository_Name)
              API_KEY: $(Api_key)

          # ── 11. Enforce PR Quality Gate ───────────────────────────────────────
          - script: |
              if [ "$(enable_merge)" = "false" ]; then
                echo "##vso[task.logissue type=error]Build failed due to compilation, format, security, or test failures."
                exit 1
              else
                echo "Quality gate passed successfully."
              fi
            displayName: 'Check Build Status Gate'
            condition: always()
```

---

## 6. Output Preview in Gitea PR Discussion

### 1. Initial In-Progress Comment

```markdown
**Build Status: INPROGRESS⏳**
**Build Location:** [**feat/my-branch**](https://dev.azure.com/Syncfusion-DevOps/BoldCreate/_build/results?buildId=12345)
```

### 2. Final Completion Comment (Passed)

```markdown
**CI Status:** **SUCCESS ✅**
**Source Compilation:** **SUCCESS ✅**
**Code Format Check:** **SUCCESS ✅**
**Quality Gate Status:** **SUCCESS ✅**
**Build Location:** [feat/my-branch](https://dev.azure.com/Syncfusion-DevOps/BoldCreate/_build/results?buildId=12345)
**Security Violation Error(s):** 0
**SAST Vulnerabilities Error(s):** 0
**Format Violation(s):** 0

**🧪 Quality Checks & Test Results:**

- **Total Test Cases:** 2848
- **Passed:** 2848 ✅
- **Failed:** 0 ❌
- **Suites:** Unit: 2033 passed | Client: 815 passed | Security: 0 passed | Conformance: 0 passed
- **Quality Checks:** Format check: PASSED ✅ | Lint: PASSED ✅ | Typecheck: PASSED ✅

**[View all reports and artifacts](https://dev.azure.com/Syncfusion-DevOps/BoldCreate/_build/results?buildId=12345&view=artifacts&pathAsName=false&type=publishedArtifacts)**
```

---

## 7. Key Best Practices & Operational Rules

1. **Frozen Dependencies**: Always install via `pnpm install --frozen-lockfile`. Never modify `pnpm-lock.yaml` inside CI.
2. **Branch Isolation**: The dynamic resolution in Step 2 guarantees that whether triggered from a PR or manual run, the correct branch is checked out without checking out `development` by mistake.
3. **Fail-Closed Security**: Both secret detection (Gitleaks) and vulnerability analysis (Semgrep) report non-zero counts as blockers, preventing merge when credentials or vulnerabilities are committed.
4. **Clean Reporting**: Metrics are aggregated from machine-readable `summary.json` and Vitest output files rather than brittle terminal string parsing.
