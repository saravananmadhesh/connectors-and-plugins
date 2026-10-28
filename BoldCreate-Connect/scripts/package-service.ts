import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const req = createRequire(import.meta.url);
const esbuildPath = req.resolve('esbuild', { paths: [req.resolve('tsx')] });
const esbuild = req(esbuildPath);

const targetApp = process.argv[2];
if (!targetApp) {
  process.stderr.write(
    'Usage: node scripts/package-service.ts <api|gateway|worker|admin|web-server>\n',
  );
  process.exit(1);
}

const serviceEntries: Record<string, { entry: string; outdir: string }> = {
  api: { entry: 'apps/api/src/index.ts', outdir: 'apps/api/dist' },
  gateway: { entry: 'apps/gateway/src/index.ts', outdir: 'apps/gateway/dist' },
  worker: { entry: 'apps/worker/src/index.ts', outdir: 'apps/worker/dist' },
  admin: { entry: 'apps/admin/src/index.ts', outdir: 'apps/admin/dist' },
  'web-server': { entry: 'apps/web/server/src/index.ts', outdir: 'apps/web/server/dist' },
};

const service = serviceEntries[targetApp];
if (!service) {
  process.stderr.write(
    `Unknown service: ${targetApp}. Valid services: ${Object.keys(serviceEntries).join(', ')}\n`,
  );
  process.exit(1);
}

const localPackagePlugin = {
  name: 'inline-local-packages',
  setup(buildConfig: {
    onResolve: (
      filter: { filter: RegExp },
      callback: (args: { path: string }) => { path: string; external?: boolean } | null,
    ) => void;
  }) {
    buildConfig.onResolve({ filter: /^@boldcreate-integrations\// }, (args) => {
      const pkgPath = args.path.slice('@boldcreate-integrations/'.length);
      const [pkgName, ...subpaths] = pkgPath.split('/');
      const pkgJsonPath = join(repoRoot, 'packages', pkgName ?? '', 'package.json');
      if (!existsSync(pkgJsonPath)) return null;
      const manifest = JSON.parse(readFileSync(pkgJsonPath, 'utf8')) as {
        exports?: Record<string, { development?: string; default?: string }>;
      };
      const subpathKey = subpaths.length > 0 ? `./${subpaths.join('/')}` : '.';
      const exportEntry = manifest.exports?.[subpathKey];
      if (exportEntry) {
        const target = exportEntry.development ?? exportEntry.default;
        if (target) {
          return { path: resolve(repoRoot, 'packages', pkgName ?? '', target) };
        }
      }
      return null;
    });

    buildConfig.onResolve({ filter: /^[^./]/ }, (args) => {
      // On Windows, absolute paths start with drive letters (e.g., D:\...) which match /^[^./]/
      // Do not mark absolute file paths as external.
      if (args.path.startsWith('@boldcreate-integrations/')) return null;
      if (/^[a-zA-Z]:[/\\]/.test(args.path) || args.path.startsWith('\\\\')) return null;
      return { path: args.path, external: true };
    });
  },
};

const buildOptions: Record<string, unknown> = {
  entryPoints: [resolve(repoRoot, service.entry)],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node24',
  outfile: resolve(repoRoot, service.outdir, 'index.js'),
  plugins: [localPackagePlugin],
  banner: {
    js: '// Standalone service build\n',
  },
};

await (esbuild.build as (opts: Record<string, unknown>) => Promise<unknown>)(buildOptions);

// Generate production package.json in dist/package.json
const catalog: Record<string, string> = {};
const workspaceYaml = readFileSync(join(repoRoot, 'pnpm-workspace.yaml'), 'utf8');
let inCatalog = false;
for (const line of workspaceYaml.split('\n')) {
  if (line.startsWith('catalog:')) {
    inCatalog = true;
    continue;
  }
  if (inCatalog && line.startsWith('  ')) {
    const match = line.match(/^  ['"]?([@a-zA-Z0-9/-]+)['"]?:\s*['"]?([^'"\s]+)['"]?/);
    if (match && match[1] && match[2]) {
      catalog[match[1]] = match[2];
    }
  } else if (inCatalog && !line.startsWith('  ') && line.trim().length > 0) {
    inCatalog = false;
  }
}

const distIndexContent = readFileSync(resolve(repoRoot, service.outdir, 'index.js'), 'utf8');
const importedPackages = new Set<string>();
const importRegex = /import\s+[\s\S]*?from\s+["'](.*?)["']/g;
let match: RegExpExecArray | null;
while ((match = importRegex.exec(distIndexContent)) !== null) {
  const spec = match[1];
  if (spec && !spec.startsWith('node:')) {
    const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
    if (pkg) importedPackages.add(pkg);
  }
}

const srcPkgJson = JSON.parse(
  readFileSync(resolve(repoRoot, dirname(service.entry), '..', 'package.json'), 'utf8'),
) as {
  dependencies?: Record<string, string>;
};

for (const dep of Object.keys(srcPkgJson.dependencies ?? {})) {
  if (!dep.startsWith('@boldcreate-integrations/')) {
    importedPackages.add(dep);
  }
}

const prodDependencies: Record<string, string> = {};
for (const pkg of Array.from(importedPackages).sort()) {
  if (catalog[pkg]) {
    prodDependencies[pkg] = catalog[pkg];
  }
}

const distPkgJson = {
  name: `@boldcreate-integrations/${targetApp}`,
  version: '0.0.0',
  private: true,
  type: 'module',
  main: 'index.js',
  dependencies: prodDependencies,
};

writeFileSync(
  resolve(repoRoot, service.outdir, 'package.json'),
  JSON.stringify(distPkgJson, null, 2) + '\n',
  'utf8',
);

process.stdout.write(
  `packaged standalone ${targetApp} into ${service.outdir}/index.js and ${service.outdir}/package.json\n`,
);
