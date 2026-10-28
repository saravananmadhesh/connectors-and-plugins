import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checkDeployment, run } from './manifest-workloads.js';

const root = resolve(import.meta.dirname, '../..');
const good = readFileSync(resolve(root, 'k8s/api/staging/deployment.yaml'), 'utf8');
const rules = (text: string, hasBudget = true) =>
  checkDeployment('k8s/a/b/deployment.yaml', text, hasBudget).map((f) => f.rule);

describe('workload hardening in manifests', () => {
  it('accepts a locked-down Deployment', () => {
    expect(rules(good)).toEqual([]);
  });

  it.each([
    ['automountServiceAccountToken: false', 'no-token'],
    ['runAsNonRoot: true', 'non-root'],
    ['seccompProfile: { type: RuntimeDefault }', 'seccomp'],
    ['requests: { cpu: 100m, memory: 256Mi }', 'requests'],
    ['allowPrivilegeEscalation: false', 'no-escalation'],
    ['readOnlyRootFilesystem: true', 'read-only-root'],
    ['capabilities: { drop: [ALL] }', 'drop-capabilities'],
  ])('flags a Deployment without %s', (line, rule) => {
    expect(rules(good.replace(line, ''))).toEqual([`manifest-workloads/${rule}`]);
  });

  it('flags a memory limit that is missing', () => {
    expect(rules(good.replace("limits: { cpu: '1', memory: 1024Mi }", ''))).toEqual([
      'manifest-workloads/limits',
    ]);
  });

  it('asks for a budget when there are two replicas', () => {
    const two = good.replace('replicas: 1', 'replicas: 2');
    expect(rules(two, false)).toEqual(['manifest-workloads/pod-disruption-budget']);
    expect(rules(two, true)).toEqual([]);
  });

  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
  });
});
