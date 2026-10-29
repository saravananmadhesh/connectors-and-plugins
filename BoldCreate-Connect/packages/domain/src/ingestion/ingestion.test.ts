import { gunzipSync, gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { parseManifest } from './manifest.js';
import { readCollection } from './collection.js';
import { discoverPlugins, inspectSource, prepareIngestion } from './ingest.js';
import { parseFrontmatter, scanPlugin } from './scan.js';
import { extractTarGz, IngestionError, packTarGz } from './tar.js';

const files = (entries: Record<string, string>): Map<string, Buffer> =>
  new Map(Object.entries(entries).map(([path, body]) => [path, Buffer.from(body)]));

/** A repository archive the way GitHub serves it: everything under one top-level folder. */
const repoArchive = (entries: Record<string, string>): Buffer =>
  packTarGz(
    new Map(
      Object.entries(entries).map(([path, body]) => [`repo-abc123/${path}`, Buffer.from(body)]),
    ),
  );

const manifest = (extra: Record<string, unknown> = {}): string =>
  JSON.stringify({ name: 'sample-plugin', version: '1.2.3', description: 'A sample.', ...extra });

/** Rewrites the type flag of the first entry (and fixes the checksum). */
function withTypeFlag(archive: Buffer, flag: string): Buffer {
  const tar = Buffer.from(gunzipSync(archive));
  tar.write(flag, 156, 1, 'ascii');
  tar.write('        ', 148, 8, 'ascii');
  let sum = 0;
  for (let index = 0; index < 512; index += 1) sum += tar[index] ?? 0;
  tar.write(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8, 'ascii');
  return gzipSync(tar);
}

describe('tar', () => {
  it('round-trips files and strips the top-level folder', () => {
    const result = extractTarGz(repoArchive({ 'a.txt': 'one', 'dir/b.txt': 'two' }));
    expect([...result.files.keys()].sort()).toEqual(['a.txt', 'dir/b.txt']);
    expect(result.files.get('dir/b.txt')?.toString()).toBe('two');
    expect(result.skipped).toEqual([]);
  });

  it('packs the same bytes for the same files', () => {
    const input = files({ 'b.txt': '2', 'a.txt': '1' });
    expect(packTarGz(input).equals(packTarGz(new Map([...input].reverse())))).toBe(true);
  });

  it('keeps long paths', () => {
    const path = `${'d'.repeat(60)}/${'e'.repeat(60)}/${'f'.repeat(60)}.txt`;
    const result = extractTarGz(repoArchive({ [path]: 'x' }));
    expect(result.files.has(path)).toBe(true);
  });

  it.each(['../escape.txt', 'a/../../escape.txt', String.raw`a\b.txt`])(
    'rejects the path %s',
    (path) => {
      const archive = packTarGz(new Map([[`repo/${path}`, Buffer.from('x')]]));
      expect(() => extractTarGz(archive)).toThrow(IngestionError);
    },
  );

  it('rejects an absolute entry name', () => {
    const archive = packTarGz(new Map([['/etc/passwd', Buffer.from('x')]]));
    expect(() => extractTarGz(archive)).toThrow('unsafe path');
  });

  it('skips links and reports them', () => {
    const archive = withTypeFlag(repoArchive({ 'link.txt': '' }), '2');
    const result = extractTarGz(archive);
    expect(result.files.size).toBe(0);
    expect(result.skipped).toEqual([{ path: 'link.txt', reason: 'link' }]);
  });

  it('enforces file count and size limits', () => {
    const many = repoArchive({ a: '1', b: '1', c: '1' });
    const limits = { maxFiles: 2, maxFileBytes: 10, maxTotalBytes: 100 };
    expect(() => extractTarGz(many, limits)).toThrow('too many files');
    expect(() => extractTarGz(repoArchive({ big: 'x'.repeat(11) }), limits)).toThrow('too large');
  });

  it('rejects data that is not a gzip archive', () => {
    expect(() => extractTarGz(Buffer.from('not an archive'))).toThrow(IngestionError);
  });
});

describe('manifest', () => {
  it('reads plugin.json first and falls back to the cursor location', () => {
    const root = parseManifest(files({ 'plugin.json': manifest({ displayName: 'Sample' }) }));
    expect(root).toMatchObject({ name: 'sample-plugin', version: '1.2.3', displayName: 'Sample' });
    expect(root.format).toBe('plugin.json');
    const cursor = parseManifest(files({ '.cursor-plugin/plugin.json': manifest() }));
    expect(cursor.format).toBe('cursor-plugin');
  });

  it.each(['x', 'ab', 'a1', 'x-ray', 'a'.repeat(40), '7'])('accepts the name %s', (name) => {
    expect(parseManifest(files({ 'plugin.json': manifest({ name }) })).name).toBe(name);
  });

  it.each(['', '-x', 'x-', '-', 'X', 'a_b', 'a b', 'a.b', 'a'.repeat(41), 42])(
    'rejects the name %j',
    (name) => {
      expect(() => parseManifest(files({ 'plugin.json': manifest({ name }) }))).toThrow(
        'manifest name must be 1 to 40 characters',
      );
    },
  );

  it('keeps only a safe image path as the logo', () => {
    const logoOf = (logo: unknown) =>
      parseManifest(files({ 'plugin.json': manifest({ logo }) })).logo;
    expect(logoOf('assets/logo.png')).toBe('assets/logo.png');
    expect(logoOf('./logo.svg')).toBe('logo.svg');
    for (const bad of [undefined, '', '../logo.png', 'https://x.example/l.png', 'logo.txt', 5]) {
      expect(logoOf(bad)).toBeNull();
    }
  });

  it('collects keywords, categories and variables', () => {
    const parsed = parseManifest(
      files({
        'plugin.json': manifest({
          keywords: ['a', ' b '],
          tags: ['c'],
          category: 'dev',
          categories: ['dev', 'ops'],
          variables: {
            API_URL: { description: 'Base URL', required: true },
            TOKEN: { secret: true },
          },
        }),
      }),
    );
    expect(parsed.keywords).toEqual(['a', 'b', 'c']);
    expect(parsed.categories).toEqual(['dev', 'ops']);
    expect(parsed.variables).toEqual([
      { name: 'API_URL', description: 'Base URL', required: true, secret: false },
      { name: 'TOKEN', description: '', required: false, secret: true },
    ]);
  });

  describe('variables written as a JSON Schema', () => {
    const variablesOf = (variables: unknown) =>
      parseManifest(files({ 'plugin.json': manifest({ variables }) })).variables;

    it('lists the properties, not the schema keywords', () => {
      expect(
        variablesOf({
          type: 'object',
          properties: {
            GITHUB_TOKEN: {
              type: 'string',
              description: 'Personal access token',
              format: 'password',
            },
            GITHUB_HOST: { type: 'string' },
            API_KEY: { type: 'string', writeOnly: true },
            OTHER: { secret: true, required: true },
          },
          required: ['GITHUB_TOKEN'],
        }),
      ).toEqual([
        {
          name: 'GITHUB_TOKEN',
          description: 'Personal access token',
          required: true,
          secret: true,
        },
        { name: 'GITHUB_HOST', description: '', required: false, secret: false },
        { name: 'API_KEY', description: '', required: false, secret: true },
        { name: 'OTHER', description: '', required: true, secret: true },
      ]);
    });

    it('reads the GitHub plugin of the Cursor marketplace as one required, masked variable', () => {
      expect(
        variablesOf({
          type: 'object',
          properties: {
            GITHUB_PERSONAL_ACCESS_TOKEN: {
              type: 'string',
              title: 'GitHub personal access token',
              description: 'Fine-grained or classic PAT with the repo scopes you want to use.',
            },
          },
          required: ['GITHUB_PERSONAL_ACCESS_TOKEN'],
        }),
      ).toEqual([
        {
          name: 'GITHUB_PERSONAL_ACCESS_TOKEN',
          description: 'Fine-grained or classic PAT with the repo scopes you want to use.',
          required: true,
          secret: true,
        },
      ]);
    });

    it('uses the title when a property has no description', () => {
      expect(
        variablesOf({ type: 'object', properties: { REGION: { title: 'Cloud region' } } }),
      ).toEqual([{ name: 'REGION', description: 'Cloud region', required: false, secret: false }]);
    });

    it('masks properties named like credentials unless the schema says they are not secret', () => {
      const secretOf = (name: string, spec: object) =>
        variablesOf({ type: 'object', properties: { [name]: spec } })[0]?.secret;
      for (const name of [
        'API_TOKEN',
        'CLIENT_SECRET',
        'DB_PASSWORD',
        'OPENAI_API_KEY',
        'AWS_ACCESS_KEY_ID',
      ]) {
        expect(secretOf(name, {})).toBe(true);
      }
      expect(secretOf('API_TOKEN', { secret: false })).toBe(false);
      expect(secretOf('REGION', {})).toBe(false);
    });

    it('does not guess secrets in a plain map of names', () => {
      expect(variablesOf({ API_TOKEN: {} })).toEqual([
        { name: 'API_TOKEN', description: '', required: false, secret: false },
      ]);
    });

    it('declares nothing for a schema without properties', () => {
      expect(variablesOf({ type: 'object', properties: {} })).toEqual([]);
    });

    it('ignores a required list that is not a list of names', () => {
      expect(variablesOf({ type: 'object', properties: { A: {} }, required: 'A' })).toEqual([
        { name: 'A', description: '', required: false, secret: false },
      ]);
    });

    it('still checks the names of the properties', () => {
      expect(() => variablesOf({ type: 'object', properties: { 'bad name': {} } })).toThrow(
        'variable name',
      );
    });

    it('keeps a map that names its own variables type, properties or required', () => {
      expect(variablesOf({ type: {}, properties: { secret: true }, required: {} })).toEqual([
        { name: 'type', description: '', required: false, secret: false },
        { name: 'properties', description: '', required: false, secret: true },
        { name: 'required', description: '', required: false, secret: false },
      ]);
    });

    it('does not read a map variable called type as a schema', () => {
      expect(variablesOf({ type: { required: true }, properties: {} })).toEqual([
        { name: 'type', description: '', required: true, secret: false },
        { name: 'properties', description: '', required: false, secret: false },
      ]);
    });
  });

  it.each([
    ['no manifest', {}, 'No plugin.json'],
    ['bad json', { 'plugin.json': '{' }, 'not valid JSON'],
    ['array', { 'plugin.json': '[]' }, 'JSON object'],
    ['bad name', { 'plugin.json': manifest({ name: 'Bad Name' }) }, 'manifest name'],
    ['no version', { 'plugin.json': manifest({ version: undefined }) }, 'manifest version'],
    ['bad version', { 'plugin.json': manifest({ version: '1.0' }) }, 'manifest version'],
    [
      'bad variable',
      { 'plugin.json': manifest({ variables: { 'bad name': {} } }) },
      'variable name',
    ],
  ])('rejects %s with a readable message', (_label, entries, message) => {
    expect(() => parseManifest(files(entries))).toThrow(message);
  });
});

describe('scan', () => {
  const sample = files({
    'plugin.json': manifest(),
    'skills/review/SKILL.md': '---\nname: code-review\ndescription: Reviews code\n---\nbody',
    'rules/style.mdc': '---\ndescription: Style\nalwaysApply: true\n---\nbody',
    'agents/helper.md': 'no frontmatter',
    'hooks/hooks.json': JSON.stringify({
      hooks: {
        beforeShell: [{ command: './check.sh' }],
        stop: { hooks: [{ command: 'echo done' }] },
      },
    }),
    'mcp.json': JSON.stringify({
      mcpServers: { remote: { url: 'https://mcp.example.test/mcp' }, local: { command: 'node' } },
    }),
  });

  it('lists components by kind with their details', () => {
    const report = scanPlugin(sample, [], []);
    const byKind = (kind: string) =>
      report.components.filter((c) => c.kind === kind).map((c) => c.name);
    expect(byKind('skill')).toEqual(['code-review']);
    expect(byKind('rule')).toEqual(['style']);
    expect(byKind('agent')).toEqual(['helper']);
    expect(byKind('hook').sort()).toEqual(['beforeShell', 'stop']);
    expect(byKind('mcp').sort()).toEqual(['local', 'remote']);
    expect(report.components.find((c) => c.kind === 'rule')?.metadata).toMatchObject({
      mode: 'always',
    });
  });

  it('lists every hook command and every MCP server', () => {
    const report = scanPlugin(sample, [], []);
    expect(report.hookCommands).toEqual([
      { event: 'beforeShell', command: './check.sh' },
      { event: 'stop', command: 'echo done' },
    ]);
    expect(report.mcpServers).toEqual([
      { name: 'remote', transport: 'http', url: 'https://mcp.example.test/mcp' },
      { name: 'local', transport: 'stdio', command: 'node' },
    ]);
  });

  describe('paths a client could not place', () => {
    const findings = (names: string[]) =>
      scanPlugin(files(Object.fromEntries(names.map((name) => [name, 'x']))), [], []).findings.map(
        (f) => `${f.path}: ${f.kind}`,
      );

    it('reports a reserved Windows name, with or without an extension', () => {
      expect(findings(['skills/a/con', 'skills/a/NUL.txt', 'skills/a/console.md']).sort()).toEqual([
        'skills/a/NUL.txt: reserved file name on Windows',
        'skills/a/con: reserved file name on Windows',
      ]);
    });

    it('reports names that differ only by case and paths that climb out', () => {
      const out = findings(['skills/a/Notes.md', 'skills/a/notes.md', 'skills/../x.md', 'a\0b.md']);
      expect(out).toContain('skills/a/notes.md: differs only by case from skills/a/Notes.md');
      expect(out).toContain('skills/../x.md: unsafe path');
      expect(out).toContain('a\0b.md: unsafe path');
    });

    it('reports nothing for ordinary paths', () => {
      expect(findings(['skills/a/SKILL.md', 'rules/style.mdc'])).toEqual([]);
    });
  });

  describe('MCP server headers', () => {
    const mcpMetadata = (servers: unknown) => {
      const report = scanPlugin(
        files({ 'mcp.json': JSON.stringify({ mcpServers: servers }) }),
        [],
        [],
      );
      return { report, metadata: report.components.find((c) => c.kind === 'mcp')?.metadata };
    };

    it('keeps the header templates of the GitHub plugin so the gateway can fill in the token', () => {
      const { metadata } = mcpMetadata({
        github: {
          type: 'http',
          url: 'https://api.githubcopilot.com/mcp/',
          headers: { Authorization: 'Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}' },
        },
      });
      expect(metadata).toMatchObject({
        transport: 'http',
        headerNames: ['Authorization'],
        headers: { Authorization: 'Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}' },
      });
    });

    it('drops a credential written into the plugin and reports it without repeating it', () => {
      const secret = 'ghp_' + 'b'.repeat(36);
      const { report, metadata } = mcpMetadata({
        remote: {
          url: 'https://mcp.example.test/mcp',
          headers: { Authorization: `Bearer ${secret}`, 'X-Api-Key': secret },
        },
      });
      expect(metadata).toMatchObject({ headerNames: ['Authorization', 'X-Api-Key'] });
      expect(metadata).not.toHaveProperty('headers');
      const headerFindings = report.findings
        .map((finding) => finding.kind)
        .filter((kind) => kind.startsWith('header '));
      expect(headerFindings).toEqual([
        expect.stringContaining('header Authorization of remote holds a credential'),
        expect.stringContaining('header X-Api-Key of remote holds a credential'),
      ]);
      expect(JSON.stringify(report)).not.toContain(secret);
    });

    it('keeps only values that refer to a variable, never one written out, and skips unusable entries', () => {
      const { report, metadata } = mcpMetadata({
        remote: {
          url: 'https://mcp.example.test/mcp',
          headers: {
            'X-Org': '${ORG_ID}',
            'X-Region': 'eu-west',
            'bad header': '${ORG_ID}',
            'X-Count': 5,
          },
        },
      });
      expect(metadata).toMatchObject({
        headerNames: ['X-Org', 'X-Region', 'X-Count'],
        headers: { 'X-Org': '${ORG_ID}' },
      });
      expect(JSON.stringify(metadata)).not.toContain('eu-west');
      // A plain value with an ordinary name is not a finding; it is just not kept.
      expect(report.findings.filter((finding) => finding.kind.startsWith('header '))).toEqual([]);
    });

    it('declares no headers when the server has none or they are not an object', () => {
      expect(mcpMetadata({ a: { url: 'https://x.example.test' } }).metadata).not.toHaveProperty(
        'headers',
      );
      for (const headers of [['A'], 'A', null]) {
        expect(
          mcpMetadata({ a: { url: 'https://x.example.test', headers } }).metadata,
        ).not.toHaveProperty('headerNames');
      }
    });

    it('keeps at most twenty headers', () => {
      const headers = Object.fromEntries(Array.from({ length: 30 }, (_, i) => [`X-H${i}`, '${V}']));
      const { metadata } = mcpMetadata({ a: { url: 'https://x.example.test', headers } });
      expect(Object.keys((metadata as { headers: object }).headers)).toHaveLength(20);
    });
  });

  it('flags secrets by path and kind without repeating them', () => {
    const secret = 'ghp_' + 'a'.repeat(36);
    const report = scanPlugin(
      files({ 'plugin.json': manifest(), 'scripts/run.sh': `TOKEN=${secret}`, 'ok.md': 'nothing' }),
      [],
      [],
    );
    expect(report.findings).toEqual([
      { path: 'scripts/run.sh', kind: 'possible secret: GitHub token' },
    ]);
    expect(JSON.stringify(report)).not.toContain(secret);
  });

  it('reports invalid hook and MCP files instead of failing', () => {
    const report = scanPlugin(files({ 'hooks/hooks.json': '{', 'mcp.json': 'nope' }), [], []);
    expect(report.findings.map((finding) => finding.path).sort()).toEqual([
      'hooks/hooks.json',
      'mcp.json',
    ]);
  });

  it('keeps only the names of MCP headers, never their values', () => {
    const report = scanPlugin(
      files({
        'mcp.json': JSON.stringify({
          mcpServers: {
            a: {
              url: 'https://mcp.example.com/mcp',
              headers: {
                'X-Team': 'super-secret-value',
                'bad name': 'x',
                Authorization: 'Bearer t',
              },
            },
            b: { url: 'https://mcp.example.com/b', headers: ['list'] },
            c: { command: 'npx', headers: 'text' },
          },
        }),
      }),
      [],
      [],
    );
    const byName = new Map(report.components.map((item) => [item.name, item.metadata]));
    expect(byName.get('a')).toMatchObject({ headerNames: ['X-Team', 'Authorization'] });
    expect(byName.get('b')).not.toHaveProperty('headerNames');
    expect(byName.get('c')).not.toHaveProperty('headerNames');
    expect(JSON.stringify(report)).not.toContain('super-secret-value');
  });

  it('keeps one component per kind and name and says what it dropped', () => {
    const report = scanPlugin(
      files({
        'skills/one/SKILL.md': '---\nname: same\n---\n',
        'skills/two/SKILL.md': '---\nname: same\n---\n',
      }),
      [],
      [],
    );
    expect(report.components).toHaveLength(1);
    expect(report.skipped).toEqual([{ path: 'same', reason: 'duplicate skill name' }]);
  });

  it('parses frontmatter lines', () => {
    expect(parseFrontmatter('---\nname: "x"\nother: y\n---\n')).toEqual({ name: 'x', other: 'y' });
    expect(parseFrontmatter('plain')).toEqual({});
  });
});

describe('prepareIngestion', () => {
  it('builds a repacked archive of just the plugin folder with a stable hash', () => {
    const archive = repoArchive({
      'README.md': 'root',
      'plugins/sample/plugin.json': manifest(),
      'plugins/sample/rules/r.md': 'rule',
    });
    const first = prepareIngestion(archive, 'plugins/sample');
    const second = prepareIngestion(archive, 'plugins/sample');
    expect(first.manifest.name).toBe('sample-plugin');
    expect(first.scan.fileCount).toBe(2);
    expect(first.archiveSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(first.archiveSha256).toBe(second.archiveSha256);
    expect([...extractTarGzNoTop(first.archive)].sort()).toEqual(['plugin.json', 'rules/r.md']);
  });

  it('fails when the folder is missing or has no manifest', () => {
    const archive = repoArchive({ 'plugin.json': manifest() });
    expect(() => prepareIngestion(archive, 'nope')).toThrow('folder was not found');
    expect(() => prepareIngestion(repoArchive({ 'a.txt': 'x' }), '')).toThrow('No plugin.json');
  });
});

/** Paths inside a packed archive, which has no top-level folder. */
function extractTarGzNoTop(archive: Buffer): string[] {
  const tar = gunzipSync(archive);
  const names: string[] = [];
  for (let offset = 0; offset + 512 <= tar.length;) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const end = header.indexOf(0);
    names.push(header.subarray(0, end).toString());
    const size = Number.parseInt(header.subarray(124, 135).toString(), 8);
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  return names;
}

describe('collections', () => {
  const listing = (plugins: unknown[], extra: Record<string, unknown> = {}): string =>
    JSON.stringify({ name: 'collection', plugins, ...extra });

  it('reads the plugin folders a marketplace manifest lists', () => {
    const result = readCollection(
      files({
        '.cursor-plugin/marketplace.json': listing([
          { name: 'a', source: './plugins/a' },
          { name: 'b', source: 'plugins/b/' },
          { name: 'again', source: './plugins/a' },
        ]),
      }),
    );
    expect(result?.entries).toEqual([{ folder: 'plugins/a' }, { folder: 'plugins/b' }]);
    expect(result?.skipped).toEqual([]);
  });

  it('resolves names against a plugin root and skips what is not safe or not local', () => {
    const result = readCollection(
      files({
        '.claude-plugin/marketplace.json': listing(
          [
            { name: 'inside', source: 'inside' },
            { name: 'outside', source: '../outside' },
            { name: 'remote', source: { source: 'github', repo: 'x/y' } },
            { name: 'root', source: './' },
          ],
          { metadata: { pluginRoot: './plugins' } },
        ),
      }),
    );
    expect(result?.entries).toEqual([{ folder: 'plugins/inside' }]);
    expect(result?.skipped).toEqual([
      'outside: the folder is not a safe relative path',
      'remote: only plugins inside this repository are supported',
      'root: the folder is not a safe relative path',
    ]);
  });

  it('says nothing when there is no listing and rejects a broken one', () => {
    expect(readCollection(files({ 'README.md': 'hi' }))).toBeNull();
    expect(() => readCollection(files({ 'marketplace.json': '{' }))).toThrow(
      'The marketplace manifest is not valid JSON.',
    );
    expect(() => readCollection(files({ 'marketplace.json': '{"plugins":"no"}' }))).toThrow(
      /"plugins" array/,
    );
  });

  it('stops at five hundred entries and says so', () => {
    const many = Array.from({ length: 510 }, (_, index) => ({
      name: `p${index}`,
      source: `./plugins/p${index}`,
    }));
    const result = readCollection(files({ 'marketplace.json': listing(many) }));
    expect(result?.entries).toHaveLength(500);
    expect(result?.skipped).toEqual(['only the first 500 entries are read']);
  });
});

describe('inspectSource', () => {
  it('treats a folder with a plugin manifest as one plugin', () => {
    const result = inspectSource(repoArchive({ 'plugin.json': manifest() }), '');
    expect(result.kind).toBe('plugin');
  });

  it('lists the plugins of a folder that has a marketplace manifest and no plugin manifest', () => {
    const archive = repoArchive({
      '.cursor-plugin/marketplace.json': JSON.stringify({
        plugins: [
          { name: 'a', source: './plugins/a' },
          { name: 'ghost', source: './plugins/ghost' },
        ],
      }),
      'plugins/a/plugin.json': manifest({ name: 'plugin-a' }),
    });
    const result = inspectSource(archive, '');
    expect(result).toEqual({
      kind: 'collection',
      folders: ['plugins/a'],
      skipped: ['plugins/ghost: no plugin manifest in this folder'],
    });
  });

  it('prefers the plugin manifest when both exist', () => {
    const archive = repoArchive({
      'plugin.json': manifest(),
      'marketplace.json': JSON.stringify({ plugins: [] }),
    });
    expect(inspectSource(archive, '').kind).toBe('plugin');
  });

  it('still reports a missing manifest when nothing lists plugins', () => {
    expect(() => inspectSource(repoArchive({ 'README.md': 'hi' }), '')).toThrow(IngestionError);
  });
});

describe('discoverPlugins', () => {
  const listing = (extra: Record<string, string> = {}): Buffer =>
    repoArchive({
      '.cursor-plugin/marketplace.json': JSON.stringify({
        plugins: [
          { name: 'a', source: './plugins/a' },
          { name: 'broken', source: './plugins/broken' },
          { name: 'ghost', source: './plugins/ghost' },
          { name: 'remote', source: { repo: 'x/y' } },
        ],
      }),
      'plugins/a/plugin.json': manifest({ name: 'plugin-a', categories: ['Tools'] }),
      'plugins/a/skills/one/SKILL.md': '---\nname: one\ndescription: First\n---\nBody',
      'plugins/broken/plugin.json': '{not json',
      ...extra,
    });

  it('describes a single plugin with its component counts', () => {
    const found = discoverPlugins(
      repoArchive({ 'plugin.json': manifest(), 'skills/one/SKILL.md': '---\nname: one\n---\nx' }),
      '',
    );
    expect(found.layout).toBe('plugin');
    expect(found.candidates).toHaveLength(1);
    expect(found.candidates[0]).toMatchObject({
      path: '',
      problem: null,
      componentCounts: { skill: 1 },
      manifest: { name: 'sample-plugin', version: '1.2.3' },
    });
  });

  it('lists every plugin of a multi-plugin repository, each with its own folder', () => {
    const found = discoverPlugins(listing(), '');
    expect(found.layout).toBe('collection');
    expect(found.candidates.map((candidate) => candidate.path)).toEqual([
      'plugins/a',
      'plugins/broken',
      'plugins/ghost',
    ]);
    expect(found.candidates[0]).toMatchObject({
      problem: null,
      manifest: { name: 'plugin-a', categories: ['Tools'] },
    });
    expect(found.notes).toEqual(['remote: only plugins inside this repository are supported']);
  });

  it('reports a folder that cannot be installed instead of failing the listing', () => {
    const [, broken, ghost] = discoverPlugins(listing(), '').candidates;
    expect(broken?.problem).toEqual(expect.any(String));
    expect(broken?.manifest).toBeNull();
    expect(ghost).toMatchObject({
      manifest: null,
      problem: 'No plugin manifest in this folder.',
    });
  });

  it('prefixes plugin folders with the folder that was inspected', () => {
    const archive = repoArchive({
      'team/marketplace.json': JSON.stringify({ plugins: [{ name: 'a', source: './a' }] }),
      'team/a/plugin.json': manifest(),
    });
    expect(discoverPlugins(archive, 'team').candidates[0]?.path).toBe('team/a');
  });

  it('reports a folder without a manifest as not installable', () => {
    const found = discoverPlugins(repoArchive({ 'README.md': 'hi' }), '');
    expect(found.layout).toBe('plugin');
    expect(found.candidates[0]).toMatchObject({ manifest: null, problem: expect.any(String) });
  });

  it('fails when the folder does not exist in the repository', () => {
    expect(() => discoverPlugins(repoArchive({ 'a.txt': 'x' }), 'nope')).toThrow(IngestionError);
  });
});
