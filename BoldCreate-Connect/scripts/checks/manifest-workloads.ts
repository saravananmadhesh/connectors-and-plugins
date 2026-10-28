/**
 * Repository check: every Deployment is locked down, and one that runs more than a single
 * replica has a PodDisruptionBudget.
 *
 * Required in each `k8s/<service>/<env>/deployment.yaml`: no service account token, a non-root
 * user, the runtime seccomp profile, resource requests and limits, no privilege escalation, a
 * read-only root filesystem and every capability dropped.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Finding } from './scan.js';
import { repoFiles } from './scan.js';

const REQUIRED: ReadonlyArray<readonly [rule: string, pattern: RegExp, message: string]> = [
  ['no-token', /automount\w+:\s*false/, 'turn off the automounted API token'],
  ['non-root', /runAsNonRoot:\s*true/, 'set runAsNonRoot: true'],
  [
    'seccomp',
    /seccompProfile:\s*\{\s*type:\s*RuntimeDefault\s*\}/,
    'set seccompProfile RuntimeDefault',
  ],
  ['requests', /requests:\s*\{[^}]*cpu[^}]*memory/, 'set cpu and memory requests'],
  ['limits', /limits:\s*\{[^}]*memory/, 'set a memory limit'],
  ['no-escalation', /allowPrivilegeEscalation:\s*false/, 'set allowPrivilegeEscalation: false'],
  ['read-only-root', /readOnlyRootFilesystem:\s*true/, 'set readOnlyRootFilesystem: true'],
  ['drop-capabilities', /drop:\s*\[\s*ALL\s*\]/, 'drop ALL capabilities'],
];

export function checkDeployment(file: string, text: string, hasBudget: boolean): Finding[] {
  const findings: Finding[] = [];
  for (const [rule, pattern, message] of REQUIRED) {
    if (!pattern.test(text)) {
      findings.push({ rule: `manifest-workloads/${rule}`, file, line: 1, text: message });
    }
  }
  const replicas = Number(/^\s*replicas:\s*(\d+)/m.exec(text)?.[1] ?? 1);
  if (replicas >= 2 && !hasBudget) {
    findings.push({
      rule: 'manifest-workloads/pod-disruption-budget',
      file,
      line: 1,
      text: `${replicas} replicas need a pod-disruption-budget.yaml next to the Deployment`,
    });
  }
  return findings;
}

export function run(root: string): Finding[] {
  return repoFiles(root)
    .filter((file) => /^k8s\/[^/]+\/[^/]+\/deployment\.yaml$/.test(file))
    .flatMap((file) =>
      checkDeployment(
        file,
        readFileSync(join(root, file), 'utf8'),
        existsSync(join(root, file.replace(/deployment\.yaml$/, 'pod-disruption-budget.yaml'))),
      ),
    );
}
