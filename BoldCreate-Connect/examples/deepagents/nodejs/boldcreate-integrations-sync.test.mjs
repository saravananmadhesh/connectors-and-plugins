import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, afterEach, before, describe, it } from 'node:test';
import { gzipSync } from 'node:zlib';
import {
  Client,
  SyncError,
  clean,
  folderName,
  readArchive,
  skillDirs,
  sync,
} from './boldcreate-integrations-sync.mjs';

const KEY = 'fyk_0123456789abcdef.secret-value';

/** A tar.gz with the given members: `{ name, body, type }`. */
function tarGz(members) {
  const blocks = [];
  for (const { name, body = '', type = '0' } of members) {
    const data = Buffer.from(body);
    const header = Buffer.alloc(512);
    header.write(name, 0, 100, 'utf8');
    header.write('0000644\0', 100);
    header.write('0000000\0', 108);
    header.write('0000000\0', 116);
    header.write(`${data.length.toString(8).padStart(11, '0')}\0`, 124);
    header.write('00000000000\0', 136);
    header.write('        ', 148);
    header.write(type, 156);
    header.write('ustar\0', 257);
    header.write('00', 263);
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(`${sum.toString(8).padStart(6, '0')}\0 `, 148);
    blocks.push(header, data, Buffer.alloc((512 - (data.length % 512)) % 512));
  }
  blocks.push(Buffer.alloc(1024));
  return gzipSync(Buffer.concat(blocks));
}

const sha = (buffer) => createHash('sha256').update(buffer).digest('hex');

describe('helpers', () => {
  it('cleans member names', () => {
    assert.equal(clean('a/./b//c.md'), 'a/b/c.md');
    for (const bad of ['', '../x', 'a/../../x', '/etc/passwd', 'a\\b', 'C:/x', 'a\0b']) {
      assert.equal(clean(bad), null, JSON.stringify(bad));
    }
  });

  it('makes a safe folder name', () => {
    assert.equal(folderName('../evil name'), '_evil_name');
    assert.equal(folderName('...'), 'plugin');
    assert.equal(folderName('a'.repeat(300)).length, 100);
  });

  it('reads regular files, skips links, refuses escapes and garbage', () => {
    const { files, notes } = readArchive(
      tarGz([
        { name: 'skills/a/SKILL.md', body: 'hello' },
        { name: 'dir/', type: '5' },
        { name: 'link', type: '2' },
      ]),
    );
    assert.equal(files.get('skills/a/SKILL.md').toString(), 'hello');
    assert.equal(files.size, 1);
    assert.deepEqual(notes, ['skipped link: not a regular file']);
    assert.throws(() => readArchive(tarGz([{ name: '../x', body: '1' }])), SyncError);
    assert.throws(() => readArchive(Buffer.from('not an archive')), SyncError);
  });

  it('rejects a bad address or key without echoing the key', () => {
    assert.throws(() => new Client('ftp://x', KEY), /http/);
    assert.throws(() => new Client('http://x', ''), /key/);
    assert.throws(() => new Client('http://x', 'a b'), /key/);
  });
});

describe('against a fake service', () => {
  let server;
  let base;
  let state;
  const roots = [];

  const reset = () => {
    state = { entries: [], archives: new Map(), etag: '"r1"', hits: [], mode: {}, reports: [] };
  };

  before(async () => {
    reset();
    server = createServer((req, res) => {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => {
        const url = new URL(req.url, 'http://x');
        state.hits.push(`${req.method} ${url.pathname}`);
        if (req.headers.authorization !== `Bearer ${KEY}`) {
          res.writeHead(401, { 'content-type': 'application/json' });
          return res.end(JSON.stringify({ error: { code: 'unauthorized' } }));
        }
        if (state.mode.flaky > 0) {
          state.mode.flaky -= 1;
          res.writeHead(503, { 'retry-after': '0' });
          return res.end();
        }
        if (state.mode.redirect) {
          res.writeHead(302, { location: 'http://127.0.0.1:1/steal' });
          return res.end();
        }
        if (url.pathname === '/v1/sync') {
          if (req.headers['if-none-match'] === state.etag) {
            res.writeHead(304);
            return res.end();
          }
          res.writeHead(200, { etag: state.etag, 'content-type': 'application/json' });
          return res.end(
            JSON.stringify({ revision: 'r1', pollAfterSeconds: 60, entries: state.entries }),
          );
        }
        if (url.pathname === '/v1/sync/reports') {
          state.reports.push(JSON.parse(Buffer.concat(chunks).toString()));
          res.writeHead(204);
          return res.end();
        }
        const found = /^\/v1\/plugin-versions\/([^/]+)\/archive$/.exec(url.pathname);
        if (found && state.archives.has(found[1])) {
          res.writeHead(200);
          return res.end(state.archives.get(found[1]));
        }
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: { code: 'not_found' } }));
      });
    });
    await new Promise((done) => server.listen(0, '127.0.0.1', done));
    base = `http://127.0.0.1:${server.address().port}`;
  });

  after(() => server.close());
  afterEach(() => {
    for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
    reset();
  });

  const folder = () => {
    const root = mkdtempSync(join(tmpdir(), 'bci-node-'));
    roots.push(root);
    return root;
  };
  const client = (key = KEY) => new Client(base, key, { sleep: async () => {}, retries: 2 });
  const publish = (name, files, extra = {}) => {
    const archive = tarGz(files);
    const id = `pv_${name}`;
    state.archives.set(id, archive);
    state.entries.push({
      pluginName: name,
      version: '1.0.0',
      versionId: id,
      sha256: sha(archive),
      sizeBytes: archive.length,
      href: `/v1/plugin-versions/${id}/archive`,
      components: [],
      ...extra,
    });
  };

  it('places files, then answers 304 and leaves them alone', async () => {
    publish('alpha', [{ name: 'skills/review/SKILL.md', body: 'v1' }]);
    const root = folder();
    const first = await sync(client(), root, { target: 'deepagents', kinds: ['skill'] });
    assert.equal(first.applied.length, 1);
    assert.equal(readFileSync(join(root, 'alpha', 'skills', 'review', 'SKILL.md'), 'utf8'), 'v1');
    assert.deepEqual(skillDirs(root, first.plugins), [join(root, 'alpha', 'skills')]);
    const second = await sync(client(), root, { target: 'deepagents', kinds: ['skill'] });
    assert.equal(second.changed, false);
    assert.equal(second.plugins.length, 1);
    assert.equal(state.hits.filter((h) => h.includes('archive')).length, 1);
  });

  it('fetches again when a placed folder was deleted by hand', async () => {
    publish('alpha', [{ name: 'a.md', body: 'x' }]);
    const root = folder();
    await sync(client(), root);
    rmSync(join(root, 'alpha'), { recursive: true });
    const again = await sync(client(), root);
    assert.equal(again.applied.length, 1);
    assert.ok(existsSync(join(root, 'alpha', 'a.md')));
  });

  it('removes only folders it made, and updates on a new hash', async () => {
    publish('alpha', [{ name: 'a.md', body: '1' }]);
    const root = folder();
    mkdirSync(join(root, 'mine'));
    writeFileSync(join(root, 'mine', 'keep.txt'), 'mine');
    await sync(client(), root);
    state.entries = [];
    state.etag = '"r2"';
    publish('beta', [{ name: 'b.md', body: '2' }]);
    const result = await sync(client(), root);
    assert.deepEqual(result.removed, ['alpha']);
    assert.ok(existsSync(join(root, 'mine', 'keep.txt')));
    assert.ok(existsSync(join(root, 'beta', 'b.md')));
  });

  it('warns about a withdrawn version and keeps it', async () => {
    publish('alpha', [{ name: 'a.md', body: '1' }], { yanked: true });
    const result = await sync(client(), folder());
    assert.match(result.warnings[0], /withdrawn/);
    assert.equal(result.applied.length, 1);
  });

  it('refuses an archive whose hash or size is wrong, and an odd address', async () => {
    publish('alpha', [{ name: 'a.md', body: '1' }], { sha256: 'f'.repeat(64) });
    await assert.rejects(sync(client(), folder()), /hash/);
    state.entries = [];
    publish('beta', [{ name: 'a.md', body: '1' }], { sizeBytes: 3 });
    await assert.rejects(sync(client(), folder()), /size|larger|wrong|more data/);
    state.entries = [];
    publish('gamma', [{ name: 'a.md' }], { href: 'http://evil.example/x' });
    await assert.rejects(sync(client(), folder()), /not an archive/);
  });

  it('does not leave a half written folder when an archive escapes', async () => {
    publish('alpha', [{ name: '../escape', body: 'x' }]);
    const root = folder();
    await assert.rejects(sync(client(), root), /leaves the plugin folder/);
    assert.equal(existsSync(join(root, 'alpha')), false);
    assert.equal(existsSync(join(root, '..', 'escape')), false);
  });

  it('retries a busy service, then gives up with a plain message', async () => {
    publish('alpha', [{ name: 'a.md', body: '1' }]);
    state.mode.flaky = 2;
    assert.equal((await sync(client(), folder())).applied.length, 1);
    state.mode.flaky = 10;
    await assert.rejects(sync(client(), folder()), /503/);
  });

  it('never follows a redirect', async () => {
    state.mode.redirect = true;
    await assert.rejects(sync(client(), folder()), /302|refused/);
  });

  it('explains a wrong key without printing it', async () => {
    const wrong = 'fyk_ffffffffffffffff.other-secret';
    await assert.rejects(sync(client(wrong), folder()), (error) => {
      assert.match(error.message, /401/);
      assert.ok(!error.message.includes('other-secret'));
      return true;
    });
  });

  it('reports what was placed when asked', async () => {
    publish('alpha', [{ name: 'a.md', body: '1' }]);
    await sync(client(), folder(), { report: true, target: 'deepagents' });
    assert.equal(state.reports.length, 1);
    assert.equal(state.reports[0].applied.length, 1);
    assert.equal(state.reports[0].target, 'deepagents');
  });
});
