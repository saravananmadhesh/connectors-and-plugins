import { describe, expect, it } from 'vitest';
import { isRefusal, planLoadRun } from './guard.js';

const allowed = { K6_ALLOW_LOAD: '1' };

describe('planLoadRun', () => {
  it('accepts a loopback target in smoke mode by default', () => {
    const plan = planLoadRun(['--target=http://localhost:3002'], allowed);
    expect(isRefusal(plan)).toBe(false);
    expect(plan).toMatchObject({ mode: 'smoke' });
  });

  it('accepts full mode and a host from the allow list', () => {
    const plan = planLoadRun(['--target=https://staging.example.test', '--full'], {
      ...allowed,
      K6_ALLOWED_HOSTS: 'localhost, staging.example.test',
    });
    expect(plan).toMatchObject({ mode: 'full' });
  });

  it.each([
    [[], allowed, '--target'],
    [['--target=not a url'], allowed, 'not a valid URL'],
    [['--target=ftp://localhost'], allowed, 'http or https'],
    [['--target=http://localhost'], {}, 'K6_ALLOW_LOAD=1'],
    [['--target=http://localhost'], { K6_ALLOW_LOAD: '0' }, 'K6_ALLOW_LOAD=1'],
    [['--target=http://other.example.test'], allowed, 'K6_ALLOWED_HOSTS'],
    [['--target=http://localhost', '--smoke', '--full'], allowed, 'either'],
    [['--target=http://localhost', '--bogus'], allowed, 'Unknown option'],
  ])('refuses %j', (args, env, text) => {
    const plan = planLoadRun(args, env);
    expect(isRefusal(plan) && plan.refusal).toContain(text);
  });

  it('refuses a production host even when it is on the allow list', () => {
    const plan = planLoadRun(['--target=https://api.prod.example.test'], {
      ...allowed,
      K6_ALLOWED_HOSTS: 'api.prod.example.test',
    });
    expect(isRefusal(plan) && plan.refusal).toContain('production');
  });
});
