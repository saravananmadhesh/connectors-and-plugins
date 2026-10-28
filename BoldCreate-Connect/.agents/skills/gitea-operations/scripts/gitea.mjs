// Run with Node.js 24+: node .agents/skills/gitea-operations/scripts/gitea.mjs ...
import { readFile } from 'node:fs/promises';

const BASE = 'https://gitea.syncfusion.com/api/v1';
const MAX_FILE_BYTES = 256 * 1024;
const MAX_TREE_LINES = 200;
const MAX_TREE_REQUESTS = 60;
const DEFAULT_FILE_LINES = 120;
const COMMANDS = 'repository-info, list-branches, list-folder, read-file, pull-request-info, list-pull-request-files, commit-info, list-commit-files, commit-file';
const ALIASES = { tree: 'list-folder', file: 'read-file', pr: 'pull-request-info', commit: 'commit-info' };

function fail(message) {
  throw new Error(message);
}

function options(args) {
  const result = new Map();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];
    if (!key?.startsWith('--') || !value || value.startsWith('--') || result.has(key)) {
      fail('Expected unique --option value pairs. See SKILL.md.');
    }
    result.set(key, value);
  }
  return result;
}

function required(opts, key) {
  return opts.get(key) || fail(`Missing ${key}`);
}

function validateKeys(opts, allowed) {
  for (const key of opts.keys()) {
    if (!allowed.includes(key)) fail(`Unexpected option ${key}`);
  }
}

function repoPath(opts) {
  const owner = required(opts, '--owner');
  const repo = required(opts, '--repo');
  if (![owner, repo].every((part) => /^[\w.-]+$/.test(part) && part !== '.' && part !== '..')) {
    fail('Invalid repository owner or name');
  }
  return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
}

function filePath(value) {
  const segments = value.split('/');
  if (segments.some((part) => !part || part === '.' || part === '..' || part.includes('\\'))) {
    fail('File path must contain nonempty repository-relative segments');
  }
  return segments.map(encodeURIComponent).join('/');
}

function identifier(value, label) {
  if (!/^[\w./-]+$/.test(value) || value.includes('..') || value.startsWith('-')) fail(`Invalid ${label}`);
  return value;
}

async function api(path, init = {}, allowMissing = false, withPagination = false) {
  const token = process.env.GITEA_TOKEN;
  if (!token) fail('GITEA_TOKEN is not set in the local environment');
  const response = await fetch(`${BASE}${path}`, {
    ...init,
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (response.status === 404 && allowMissing) return null;
  if (!response.ok) fail(`Gitea API returned HTTP ${response.status}`);
  const data = await response.json();
  return withPagination ? { data, hasNextPage: /rel="next"/.test(response.headers.get('link') || '') } : data;
}

function text(value) {
  return typeof value === 'string' ? value : '';
}

function boundedInteger(value, label, maximum) {
  if (!/^[1-9]\d*$/.test(value) || Number(value) > maximum) fail(`Invalid ${label} (1-${maximum})`);
  return Number(value);
}

function print(value) {
  console.log(JSON.stringify(value));
}

function treeItems(data) {
  if (!data || !Array.isArray(data.tree)) fail('Gitea did not return a tree');
  if (data.truncated) fail('Gitea truncated this folder; narrow --path or --depth');
  return data.tree.filter((item) => item && typeof item.path === 'string'
    && (item.type === 'tree' || item.type === 'blob'));
}

async function folderItems(repo, ref, prefix, depth) {
  let treeRef = ref;
  let requests = 0;
  const getTree = async (sha, recursive) => {
    if (++requests > MAX_TREE_REQUESTS) fail('Tree request budget exceeded; narrow --path or --depth');
    return await api(`${repo}/git/trees/${encodeURIComponent(sha)}?recursive=${recursive ? 1 : 0}`);
  };
  for (const part of prefix ? prefix.split('/') : []) {
    const children = treeItems(await getTree(treeRef, false));
    const folder = children.find((item) => item.type === 'tree' && item.path === part);
    if (!folder?.sha) fail('Folder not found at this ref');
    treeRef = folder.sha;
  }
  if (depth === 1) return treeItems(await getTree(treeRef, false));
  const recursive = await getTree(treeRef, true);
  if (!recursive || !Array.isArray(recursive.tree)) fail('Gitea did not return a tree');
  if (!recursive.truncated) return treeItems(recursive);
  // A large tree can be truncated even when the requested folder is small. Walk
  // only its visible levels, rather than trusting an incomplete recursive list.
  const pending = [{ sha: treeRef, prefix: '', level: 0 }];
  const entries = [];
  while (pending.length) {
    const folder = pending.shift();
    const children = treeItems(await getTree(folder.sha, false));
    for (const item of children) {
      const path = folder.prefix ? `${folder.prefix}/${item.path}` : item.path;
      entries.push({ path, type: item.type });
      if (item.type === 'tree' && folder.level + 1 < depth) {
        if (!item.sha) fail('Folder entry missing SHA');
        pending.push({ sha: item.sha, prefix: path, level: folder.level + 1 });
      }
    }
  }
  return entries;
}

async function run(command, opts) {
  const common = ['--owner', '--repo'];
  const repo = repoPath(opts);
  if (command === 'repository-info') {
    validateKeys(opts, common);
    const item = await api(repo);
    print({ name: item.full_name, defaultBranch: item.default_branch, private: item.private, url: item.html_url });
    return;
  }
  if (command === 'list-branches') {
    validateKeys(opts, [...common, '--page', '--limit']);
    const page = boundedInteger(opts.get('--page') || '1', 'page', 10000);
    const limit = boundedInteger(opts.get('--limit') || '20', 'limit', 100);
    const result = await api(`${repo}/branches?page=${page}&limit=${limit}`, {}, false, true);
    if (!Array.isArray(result.data)) fail('Gitea did not return branches');
    print({ page, hasNextPage: result.hasNextPage, branches: result.data.map((item) => ({
      name: item.name, sha: item.commit?.id,
    })) });
    return;
  }
  if (command === 'list-folder') {
    validateKeys(opts, [...common, '--ref', '--path', '--depth', '--max']);
    const ref = required(opts, '--ref');
    const prefix = opts.has('--path') ? required(opts, '--path') : '';
    if (prefix) filePath(prefix);
    const depth = boundedInteger(opts.get('--depth') || '2', 'depth', 20);
    const max = boundedInteger(opts.get('--max') || '80', 'max', MAX_TREE_LINES);
    const entries = await folderItems(repo, ref, prefix, depth);
    const children = entries.filter((item) => item.path.split('/').length <= depth);
    children.sort((a, b) => {
      const aParts = a.path.split('/');
      const bParts = b.path.split('/');
      for (let i = 0; i < Math.min(aParts.length, bParts.length); i++) {
        if (aParts[i] !== bParts[i]) return aParts[i].localeCompare(bParts[i]);
      }
      return aParts.length - bParts.length;
    });
    console.log(`${prefix || '.'}/ (ref: ${ref}, depth: ${depth})`);
    for (const item of children.slice(0, max)) {
      const parts = item.path.split('/');
      console.log(`${'  '.repeat(parts.length - 1)}${parts.at(-1)}${item.type === 'tree' ? '/' : ''}`);
    }
    if (children.length > max) console.log(`... ${children.length - max} more entries; narrow --path or increase --max`);
    return;
  }
  if (command === 'read-file') {
    validateKeys(opts, [...common, '--path', '--ref', '--start-line', '--end-line', '--all']);
    const path = filePath(required(opts, '--path'));
    const ref = required(opts, '--ref');
    const item = await api(`${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`);
    if (!item || item.type !== 'file' || item.encoding !== 'base64') fail('Not a base64-encoded file');
    const bytes = Buffer.from(text(item.content).replace(/\s/g, ''), 'base64');
    if (bytes.length > MAX_FILE_BYTES || bytes.includes(0)) fail('File is too large or not text');
    const start = opts.get('--start-line');
    const end = opts.get('--end-line');
    if (!!start !== !!end) fail('Specify both --start-line and --end-line');
    if (opts.has('--all') && opts.get('--all') !== 'yes') fail('Use --all yes to print the entire file');
    if (opts.has('--all') && start) fail('Choose either --all yes or a line range');
    const contents = bytes.toString('utf8');
    if (start && end) {
      const first = boundedInteger(start, 'start-line', 100000);
      const last = boundedInteger(end, 'end-line', 100000);
      if (last < first || last - first >= 300) fail('Requested range must contain 1-300 lines');
      const lines = contents.split('\n');
      if (first > lines.length) fail('Start line exceeds file length');
      process.stdout.write(lines.slice(first - 1, last).map((line, i) => `${first + i}: ${line}`).join('\n') + '\n');
    } else if (opts.get('--all') === 'yes') process.stdout.write(contents);
    else {
      const lines = contents.split('\n');
      process.stdout.write(lines.slice(0, DEFAULT_FILE_LINES).map((line, i) => `${i + 1}: ${line}`).join('\n') + '\n');
      if (lines.length > DEFAULT_FILE_LINES) {
        console.log(`... ${lines.length - DEFAULT_FILE_LINES} more lines; use --start-line ${DEFAULT_FILE_LINES + 1} --end-line ${Math.min(lines.length, DEFAULT_FILE_LINES + 120)} or --all yes`);
      }
    }
    return;
  }
  if (command === 'pull-request-info') {
    validateKeys(opts, [...common, '--number', '--include-body']);
    const number = required(opts, '--number');
    if (!/^[1-9]\d*$/.test(number)) fail('Invalid PR number');
    const item = await api(`${repo}/pulls/${number}`);
    if (!item) fail('PR not found');
    const includeBody = opts.get('--include-body');
    if (includeBody && includeBody !== 'yes') fail('Use --include-body yes to request the PR description');
    print({ number: item.number, title: item.title, state: item.state,
      draft: item.draft, base: item.base?.ref,
      head: item.head?.ref, url: item.html_url,
      ...(includeBody === 'yes' ? { body: item.body } : {}) });
    return;
  }
  if (command === 'list-pull-request-files') {
    validateKeys(opts, [...common, '--number', '--page', '--limit']);
    const number = required(opts, '--number');
    if (!/^[1-9]\d*$/.test(number)) fail('Invalid PR number');
    const page = boundedInteger(opts.get('--page') || '1', 'page', 10000);
    const limit = boundedInteger(opts.get('--limit') || '30', 'limit', 100);
    const result = await api(`${repo}/pulls/${number}/files?page=${page}&limit=${limit}`, {}, false, true);
    if (!Array.isArray(result.data)) fail('Gitea did not return PR files');
    print({ number: Number(number), page, hasNextPage: result.hasNextPage,
      files: result.data.map((item) => ({ path: item.filename, status: item.status })) });
    return;
  }
  if (command === 'commit-info' || command === 'list-commit-files') {
    validateKeys(opts, [...common, '--sha', ...(command === 'list-commit-files' ? ['--max'] : [])]);
    const sha = required(opts, '--sha');
    if (!/^[a-f\d]{40,64}$/i.test(sha)) fail('Expected full commit SHA');
    const item = await api(`${repo}/git/commits/${sha}`);
    if (!item) fail('Commit not found');
    if (command === 'list-commit-files') {
      const max = boundedInteger(opts.get('--max') || '80', 'max', 200);
      if (!Array.isArray(item.files)) fail('Gitea did not return commit files');
      print({ sha: item.sha, returned: Math.min(item.files.length, max), omitted: Math.max(0, item.files.length - max),
        files: item.files.slice(0, max).map((file) => ({ path: file.filename, status: file.status })) });
    } else {
      const message = text(item.commit?.message || item.message);
      print({ sha: item.sha, message: message.slice(0, 240), messageTruncated: message.length > 240,
        author: item.commit?.author?.name || item.author?.login,
        parents: item.parents?.map((parent) => parent.sha) });
    }
    return;
  }
  if (command === 'commit-file') {
    validateKeys(opts, [...common, '--path', '--branch', '--local-file', '--message', '--confirm', '--expected-sha']);
    const path = filePath(required(opts, '--path'));
    const branch = identifier(required(opts, '--branch'), 'branch');
    const message = required(opts, '--message');
    const localFile = required(opts, '--local-file');
    const contents = await readFile(localFile);
    if (contents.length > MAX_FILE_BYTES) fail('File exceeds 256 KiB limit');
    const existing = await api(`${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`, {}, true);
    if (existing && existing.type !== 'file') fail('Target exists and is not a file');
    const sha = existing ? text(existing.sha) : undefined;
    if (existing && !sha) fail('Existing file has no blob SHA');
    if (opts.has('--confirm') && opts.get('--confirm') !== 'yes') fail('Use --confirm yes only after reviewing the dry run');
    if (opts.get('--confirm') !== 'yes') {
      print({ dryRun: true, action: sha ? 'update' : 'create', branch,
        path: required(opts, '--path'), bytes: contents.length, currentSha: sha });
      return;
    }
    if (sha && opts.get('--expected-sha') !== sha) {
      fail('Target SHA changed or missing; rerun dry run and pass --expected-sha for the reviewed version');
    }
    if (!sha && opts.has('--expected-sha')) fail('Target is new; omit --expected-sha');
    const result = await api(`${repo}/contents/${path}`, {
      method: sha ? 'PUT' : 'POST',
      body: JSON.stringify({ branch, message, content: contents.toString('base64'), ...(sha ? { sha } : {}) }),
    });
    print({ action: sha ? 'updated' : 'created', path: required(opts, '--path'),
      branch, commitSha: result?.commit?.sha });
    return;
  }
  fail(`Commands: ${COMMANDS}`);
}

try {
  const [requestedCommand, ...args] = process.argv.slice(2);
  if (!requestedCommand) fail(`Commands: ${COMMANDS}`);
  await run(ALIASES[requestedCommand] || requestedCommand, options(args));
} catch (error) {
  // Do not print request bodies, authorization headers, or exception objects.
  console.error(error instanceof Error ? error.message : 'Gitea operation failed');
  process.exitCode = 1;
}
