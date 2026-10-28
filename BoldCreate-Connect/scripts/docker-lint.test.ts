import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { checkDocker } from './docker-lint.js';

const repoRoot = join(import.meta.dirname, '..');
const temporaryRoots: string[] = [];

const APP_DIRECTORIES = [
  'apps/api',
  'apps/gateway',
  'apps/worker',
  'apps/admin',
  'apps/web/server',
];

interface Overrides {
  dockerfile?: (text: string) => string;
  dockerignore?: string;
  pipeline?: string;
  main?: Record<string, string>;
  extraFiles?: string[];
  extraPackage?: string;
}

async function makeRepo(overrides: Overrides = {}): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'docker-lint-'));
  temporaryRoots.push(root);
  const write = async (path: string, content: string) => {
    await mkdir(join(root, path, '..'), { recursive: true });
    await writeFile(join(root, path), content);
  };
  const dockerfile = await readFile(join(repoRoot, 'Dockerfile'), 'utf8');
  await write('Dockerfile', (overrides.dockerfile ?? ((text) => text))(dockerfile));
  await write(
    '.dockerignore',
    overrides.dockerignore ?? (await readFile(join(repoRoot, '.dockerignore'), 'utf8')),
  );
  await write(
    '.azure/ci.yml',
    overrides.pipeline ?? (await readFile(join(repoRoot, '.azure', 'ci.yml'), 'utf8')),
  );
  for (const directory of APP_DIRECTORIES) {
    await write(
      `${directory}/package.json`,
      JSON.stringify({ main: overrides.main?.[directory] ?? 'dist/index.js' }),
    );
  }
  await write('apps/web/client/package.json', '{}');
  await write('packages/config/package.json', '{}');
  if (overrides.extraPackage !== undefined) {
    await write(`packages/${overrides.extraPackage}/package.json`, '{}');
  }
  for (const file of overrides.extraFiles ?? []) await write(file, '');
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe('image definition', () => {
  it('passes on this repository', async () => {
    expect(await checkDocker(repoRoot)).toEqual([]);
  });

  it('passes on a fixture copy of the real files', async () => {
    expect(await checkDocker(await makeRepo())).toEqual([]);
  });

  it('fails when a target is missing', async () => {
    const root = await makeRepo({
      dockerfile: (text) => text.replace('AS worker', 'AS sidecar'),
    });
    expect(await checkDocker(root)).toContain('Dockerfile has no target named worker');
  });

  it('fails when a mode flag returns', async () => {
    const root = await makeRepo({ dockerfile: (text) => `${text}\n# ENTRYPOINT_MODE=api\n` });
    expect(await checkDocker(root)).toContain('Dockerfile mentions ENTRYPOINT_MODE');
  });

  it('fails when a target runs as root', async () => {
    const root = await makeRepo({
      dockerfile: (text) => text.replace('USER node\nEXPOSE 3001', 'EXPOSE 3001'),
    });
    expect(await checkDocker(root)).toEqual(['target api does not end as USER node']);
  });

  it('fails when a target has no health check', async () => {
    const root = await makeRepo({
      dockerfile: (text) => text.replace(/HEALTHCHECK[^\n]*\\\n[^\n]*3002[^\n]*\n/, ''),
    });
    expect(await checkDocker(root)).toEqual(['target gateway has no HEALTHCHECK']);
  });

  it('fails when the command does not match the package main', async () => {
    const root = await makeRepo({ main: { 'apps/worker': 'dist/main.js' } });
    expect(await checkDocker(root)).toEqual([
      'target worker CMD runs dist/index.js but the package main is dist/main.js',
    ]);
  });

  it('fails when the command is not a JSON array', async () => {
    const root = await makeRepo({
      dockerfile: (text) =>
        text.replace(
          /CMD \["node", "--max-old-space-size=1536", "dist\/index.js"\]\n\n(FROM \$\{NODE_IMAGE\} AS api)/,
          'CMD node dist/index.js\n\n$1',
        ),
    });
    expect(await checkDocker(root)).toEqual(['target admin CMD is not a JSON array']);
  });

  it('fails when a secret is baked into a layer', async () => {
    const root = await makeRepo({
      dockerfile: (text) => text.replace('ENV NODE_ENV=production', 'ENV COOKIE_SECRET=abc'),
    });
    const problems = await checkDocker(root);
    expect(problems).toContain('stage admin sets COOKIE_SECRET in an image layer');
  });

  it('fails when an app keeps its own Dockerfile', async () => {
    const root = await makeRepo({ extraFiles: ['apps/api/Dockerfile'] });
    expect(await checkDocker(root)).toEqual([
      'apps/api/Dockerfile must not exist; the root Dockerfile is the only one',
    ]);
  });

  it('fails when a workspace package manifest is not copied before install', async () => {
    const root = await makeRepo({ extraPackage: 'newcomer' });
    expect(await checkDocker(root)).toEqual([
      'deps stage does not copy packages/newcomer/package.json',
    ]);
  });

  it('fails when the ignore file loses an entry', async () => {
    const root = await makeRepo({ dockerignore: 'node_modules\n**/dist\n' });
    expect(await checkDocker(root)).toEqual([
      '.dockerignore does not list .env*',
      '.dockerignore does not list .cache',
    ]);
  });

  it('fails when the pipeline does not trigger on development', async () => {
    const root = await makeRepo({
      pipeline:
        'trigger:\n  branches:\n    include:\n      - main\n\npr:\n  branches:\n    include:\n      - development\n',
    });
    expect(await checkDocker(root)).toEqual([
      '.azure/ci.yml trigger branches do not include development',
    ]);
  });

  it('reports a missing Dockerfile', async () => {
    const root = await mkdtemp(join(tmpdir(), 'docker-lint-empty-'));
    temporaryRoots.push(root);
    expect(await checkDocker(root)).toEqual(['Dockerfile is missing']);
  });
});
