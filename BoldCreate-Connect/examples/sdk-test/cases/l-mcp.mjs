/**
 * Group L: MCP through the session (no-auth HTTP servers)
 * TypeScript SDK end-to-end cases for MCP calls through the session: initialize, tools/list, tools/call on DeepWiki, Microsoft Learn and Context7. It uses the session "kate" (made here if group K did not run).
 *
 * How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`)
 *   node examples/sdk-test/cases/l-mcp.mjs      this group only
 *   node examples/sdk-test/run.mjs                    every group, in order
 * Every case below states its scenario and its expected result in the comment above it.
 * Results: examples/sdk-test/.local/ts-results-l.json (this file alone).
 */
import { readFile } from 'node:fs/promises';
import { uid, P, test, ok, connect, mcpCall, sharedSession } from './lib.mjs';

const sessionK = await sharedSession('kate');

const upstreamLog = process.env.SDK_TEST_MCP_LOG;
// Scenario: initialize, tools/list and tools/call on DeepWiki through the URL and headers that
// session.mcp() gives. Expected: 200s, the server's tools, a text answer.
await test('L1', 'DeepWiki: initialize, tools/list, tools/call', async () => {
  const [dw] = await sessionK.mcp({ plugin: 'deepwiki' });
  const init = await mcpCall(dw, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'sdk-test', version: '1' },
  });
  ok(
    init.status === 200 && init.data?.result,
    `initialize ${init.status} ${JSON.stringify(init.data).slice(0, 200)}`,
  );
  const list = await mcpCall(dw, 'tools/list', {}, init.sessionId);
  const tools = list.data?.result?.tools?.map((t) => t.name) ?? [];
  ok(tools.length > 0, `tools/list ${list.status} ${JSON.stringify(list.data).slice(0, 200)}`);
  const call = await mcpCall(
    dw,
    'tools/call',
    { name: tools[0], arguments: { repoName: 'syncfusion/BoldCreate-Plugins' } },
    init.sessionId,
  );
  ok(
    call.data?.result?.content?.[0]?.text,
    `tools/call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`,
  );
  return { url: dw.url, tools, answer: call.data.result.content[0].text.slice(0, 80) };
});

// Scenario: a session that disables 'deepwiki.ask_question'. Expected: tools/list hides it and a
// call to it is refused.
await test('L2', 'session tool policy hides a disabled tool', async () => {
  const s = await connect.create(uid('l2'), { tools: { disable: ['deepwiki.ask_question'] } });
  const [dw] = await s.mcp({ plugin: 'deepwiki' });
  const init = await mcpCall(dw, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const list = await mcpCall(dw, 'tools/list', {}, init.sessionId);
  const tools = list.data?.result?.tools?.map((t) => t.name) ?? [];
  const call = await mcpCall(
    dw,
    'tools/call',
    { name: 'ask_question', arguments: { repoName: 'a/b', question: 'q' } },
    init.sessionId,
  );
  ok(!tools.includes('ask_question'), `tools ${tools}`);
  ok(
    call.data?.error || call.data?.result?.isError || call.status >= 400,
    `call ${JSON.stringify(call.data).slice(0, 200)}`,
  );
  return { tools, call: JSON.stringify(call.data?.error ?? call.data?.result).slice(0, 120) };
});

// Scenario: the user installs microsoft-learn on their own and calls microsoft_docs_search.
// Expected: works the same way as a project plugin.
await test('L3', 'Microsoft Learn installed by the user: tools/call', async () => {
  const s = await connect.create(uid('l3'));
  await s.plugins.install(P('microsoft-learn').id);
  const [ml] = await s.mcp({ plugin: 'microsoft-learn' });
  ok(ml, 'no microsoft-learn server');
  const init = await mcpCall(ml, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const call = await mcpCall(
    ml,
    'tools/call',
    { name: 'microsoft_docs_search', arguments: { query: '.NET MAUI' } },
    init.sessionId,
  );
  ok(call.data?.result?.content, `call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`);
  return call.data.result.content[0].text.slice(0, 80);
});

// Scenario: Context7 with the project key value set; call resolve-library-id. Expected: works,
// and the upstream receives the Context7 key, never the stk_ session token.
await test('L4', 'Context7 gets its own key, not the session token', async () => {
  const [c7] = await sessionK.mcp({ plugin: 'context7' });
  ok(c7, 'no context7 server in the session');
  const init = await mcpCall(c7, 'initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 't', version: '1' },
  });
  const call = await mcpCall(
    c7,
    'tools/call',
    { name: 'resolve-library-id', arguments: { libraryName: 'react' } },
    init.sessionId,
  );
  ok(call.data?.result?.content, `call ${call.status} ${JSON.stringify(call.data).slice(0, 200)}`);
  if (upstreamLog) {
    const seen = (await readFile(upstreamLog, 'utf8'))
      .trim()
      .split('\n')
      .map((l) => JSON.parse(l));
    ok(
      !seen.some((r) => r.authorization?.startsWith('Bearer stk_')),
      'a session token reached an upstream server',
    );
    const c7auth = seen.filter((r) => r.host === 'mcp.context7.com').map((r) => r.authorization);
    return {
      answer: call.data.result.content[0].text.slice(0, 60),
      upstreamAuth: [...new Set(c7auth)],
    };
  }
  return call.data.result.content[0].text.slice(0, 60);
});

// Scenario: the MCP URL called without a token, and with a deleted session's token.
// Expected: 401 both times.
await test('L5', 'MCP endpoint refuses no token and an ended session', async () => {
  const s = await connect.create(uid('l5'));
  const [dw] = await s.mcp({ plugin: 'deepwiki' });
  const none = await mcpCall({ url: dw.url, headers: {} }, 'tools/list', {});
  await connect.sessions.delete(s.id);
  const ended = await mcpCall(dw, 'tools/list', {});
  ok(none.status === 401 && ended.status === 401, `no token ${none.status}, ended ${ended.status}`);
  return { none: none.status, ended: ended.status };
});
