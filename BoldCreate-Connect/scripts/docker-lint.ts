import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const IMAGE_TARGETS = ['api', 'gateway', 'worker', 'web', 'admin'] as const;

const TARGET_DIRECTORY: Record<string, string> = { web: 'apps/web/server' };
const SECRET_NAME = /SECRET|PASSWORD|TOKEN|KEY/i;

interface Stage {
  name: string;
  instructions: { keyword: string; args: string }[];
}

function parseStages(dockerfile: string): Stage[] {
  const joined = dockerfile.replace(/\\\r?\n/g, ' ');
  const stages: Stage[] = [];
  for (const raw of joined.split(/\r?\n/)) {
    const line = raw.trim();
    if (line === '' || line.startsWith('#')) continue;
    const [keyword = '', ...rest] = line.split(/\s+/);
    const args = rest.join(' ');
    if (keyword.toUpperCase() === 'FROM') {
      const name = /\sAS\s+(\S+)/i.exec(` ${args}`)?.[1];
      stages.push({ name: name ?? '', instructions: [] });
      continue;
    }
    stages.at(-1)?.instructions.push({ keyword: keyword.toUpperCase(), args });
  }
  return stages;
}

async function readText(path: string): Promise<string | null> {
  try {
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}

async function readMain(repoRoot: string, directory: string): Promise<string | null> {
  const text = await readText(join(repoRoot, directory, 'package.json'));
  if (text === null) return null;
  const main = (JSON.parse(text) as { main?: string }).main;
  return main === undefined ? null : main.replace(/^\.\//, '');
}

async function listManifestFolders(repoRoot: string): Promise<string[]> {
  const found: string[] = [];
  for (const group of ['packages', 'apps']) {
    const entries = await readdir(join(repoRoot, group), { withFileTypes: true });
    for (const entry of entries.filter((item) => item.isDirectory())) {
      const base = `${group}/${entry.name}`;
      if (existsSync(join(repoRoot, base, 'package.json'))) found.push(base);
      for (const nested of ['client', 'server']) {
        if (existsSync(join(repoRoot, base, nested, 'package.json')))
          found.push(`${base}/${nested}`);
      }
    }
  }
  return found.sort();
}

function checkTarget(stage: Stage | undefined, target: string, expectedMain: string | null) {
  const problems: string[] = [];
  if (stage === undefined) return [`Dockerfile has no target named ${target}`];
  const keywords = stage.instructions.map((item) => item.keyword);
  if (!keywords.includes('HEALTHCHECK')) problems.push(`target ${target} has no HEALTHCHECK`);
  const users = stage.instructions.filter((item) => item.keyword === 'USER');
  if (users.at(-1)?.args !== 'node') problems.push(`target ${target} does not end as USER node`);
  if (!keywords.includes('EXPOSE')) problems.push(`target ${target} has no EXPOSE`);
  const env = stage.instructions.filter((item) => item.keyword === 'ENV');
  if (!env.some((item) => /^NODE_ENV[= ]production$/.test(item.args))) {
    problems.push(`target ${target} does not set NODE_ENV=production`);
  }
  const cmd = stage.instructions.filter((item) => item.keyword === 'CMD').at(-1);
  if (cmd === undefined) return [...problems, `target ${target} has no CMD`];
  let command: string[] = [];
  try {
    command = JSON.parse(cmd.args) as string[];
  } catch {
    return [...problems, `target ${target} CMD is not a JSON array`];
  }
  const entry = command.at(-1)?.replace(/^\.\//, '');
  if (command[0] !== 'node') problems.push(`target ${target} CMD must start with node`);
  if (expectedMain === null) {
    problems.push(`target ${target} application has no main in its package.json`);
  } else if (entry !== expectedMain) {
    problems.push(
      `target ${target} CMD runs ${entry ?? ''} but the package main is ${expectedMain}`,
    );
  }
  return problems;
}

/** Static checks of the image definition; Docker itself is not run by the repository tests. */
export async function checkDocker(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const dockerfile = await readText(join(repoRoot, 'Dockerfile'));
  if (dockerfile === null) return ['Dockerfile is missing'];
  if (dockerfile.includes('ENTRYPOINT_MODE')) problems.push('Dockerfile mentions ENTRYPOINT_MODE');

  const stages = parseStages(dockerfile);
  for (const stage of stages) {
    for (const item of stage.instructions) {
      if (
        (item.keyword === 'ENV' || item.keyword === 'ARG') &&
        SECRET_NAME.test(item.args.split(/[= ]/)[0] ?? '')
      ) {
        problems.push(`stage ${stage.name} sets ${item.args.split(/[= ]/)[0]} in an image layer`);
      }
    }
  }

  for (const target of IMAGE_TARGETS) {
    const directory = TARGET_DIRECTORY[target] ?? `apps/${target}`;
    problems.push(
      ...checkTarget(
        stages.find((stage) => stage.name === target),
        target,
        await readMain(repoRoot, directory),
      ),
    );
    if (existsSync(join(repoRoot, directory, 'Dockerfile'))) {
      problems.push(`${directory}/Dockerfile must not exist; the root Dockerfile is the only one`);
    }
  }

  const deps = stages.find((stage) => stage.name === 'deps');
  const copied = new Set(
    (deps?.instructions ?? [])
      .filter((item) => item.keyword === 'COPY')
      .map((item) => item.args.split(/\s+/)[0] ?? ''),
  );
  for (const manifest of await listManifestFolders(repoRoot)) {
    if (!copied.has(`${manifest}/package.json`)) {
      problems.push(`deps stage does not copy ${manifest}/package.json`);
    }
  }

  const dockerignore = (await readText(join(repoRoot, '.dockerignore'))) ?? '';
  const ignored = dockerignore.split(/\r?\n/).map((line) => line.trim());
  for (const pattern of ['.env*', '.cache', 'node_modules', '**/dist']) {
    if (!ignored.includes(pattern)) problems.push(`.dockerignore does not list ${pattern}`);
  }

  const pipeline = (await readText(join(repoRoot, '.azure', 'ci.yml'))) ?? '';
  for (const section of ['trigger', 'pr']) {
    const block =
      new RegExp(`^${section}:\\r?\\n(?:[ \\t]+.*\\r?\\n)+`, 'm').exec(pipeline)?.[0] ?? '';
    if (!/^\s+-\s+development\s*$/m.test(block)) {
      problems.push(`.azure/ci.yml ${section} branches do not include development`);
    }
  }
  return problems;
}
