/**
 * A deep agent that uses the plugins installed for one BoldCreate API key.
 *
 *   1. `boldcreate-integrations-sync.mjs` places the plugin files in a folder (skills, rules, agents).
 *   2. The agent loads the synced skills from that folder.
 *   3. The agent reaches the tools of the installed MCP servers through the gateway's `/mcp`,
 *      with the same key. Tool names look like `<server>__<tool>`.
 *
 * Set BOLDCREATE_INTEGRATIONS_URL and BOLDCREATE_INTEGRATIONS_API_KEY, plus the key of your model
 * provider, then run:
 *
 *   node agent.mjs "Summarise the open pull requests"
 *
 * This file needs `npm install`. The sync helper itself needs nothing.
 */

import { resolve } from 'node:path';
import { existsSync, readdirSync } from 'node:fs';
import { Client, SyncError, sync } from './boldcreate-integrations-sync.mjs';

const MODEL = process.env.MODEL ?? 'anthropic:claude-sonnet-5-5';
const FOLDER = resolve(process.env.BOLDCREATE_INTEGRATIONS_DIR ?? 'boldcreate-plugins');

function settings() {
  const url = process.env.BOLDCREATE_INTEGRATIONS_URL ?? '';
  const key = process.env.BOLDCREATE_INTEGRATIONS_API_KEY ?? '';
  if (!url || !key) {
    throw new Error('Set BOLDCREATE_INTEGRATIONS_URL and BOLDCREATE_INTEGRATIONS_API_KEY');
  }
  return { url: url.replace(/\/+$/, ''), key };
}

/** Folders of plugins that are already on disk, for when a sync cannot run. */
function placedOnDisk() {
  if (!existsSync(FOLDER)) return [];
  return readdirSync(FOLDER, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(resolve(FOLDER, entry.name, '.boldcreate-archive')),
    )
    .map((entry) => ({ dir: entry.name }));
}

async function buildAgent({ url, key }) {
  const { createDeepAgent, FilesystemBackend } = await import('deepagents');
  const { MultiServerMCPClient } = await import('@langchain/mcp-adapters');

  // Files first: a failed sync must not stop the agent from using what is already on disk.
  let plugins;
  try {
    const result = await sync(new Client(url, key), FOLDER, {
      target: 'deepagents',
      kinds: ['skill'],
    });
    for (const warning of result.warnings) process.stderr.write(`warning: ${warning}\n`);
    plugins = result.plugins;
  } catch (error) {
    if (!(error instanceof SyncError)) throw error;
    process.stderr.write(
      `warning: sync failed, using the files already on disk (${error.message})\n`,
    );
    plugins = placedOnDisk();
  }
  const skills = plugins
    .filter((plugin) => existsSync(resolve(FOLDER, plugin.dir, 'skills')))
    .map((plugin) => `/${plugin.dir}/skills/`);

  // Tools: one connection to the gateway carries every installed server.
  const mcp = new MultiServerMCPClient({
    mcpServers: {
      boldcreate: {
        transport: 'http',
        url: `${url}/mcp`,
        headers: { Authorization: `Bearer ${key}` },
      },
    },
  });
  const tools = await mcp.getTools();

  const agent = createDeepAgent({
    model: MODEL,
    tools,
    systemPrompt: 'You are a helpful assistant. Use your skills and tools when they fit.',
    backend: new FilesystemBackend({ rootDir: FOLDER, virtualMode: true }),
    skills,
  });
  return { agent, close: () => mcp.close() };
}

async function main(task) {
  const { agent, close } = await buildAgent(settings());
  try {
    const reply = await agent.invoke({ messages: [{ role: 'user', content: task }] });
    process.stdout.write(`${reply.messages.at(-1).content}\n`);
  } finally {
    await close();
  }
}

if (process.argv.length < 3) {
  process.stderr.write('Usage: node agent.mjs "your task"\n');
  process.exitCode = 2;
} else {
  await main(process.argv.slice(2).join(' '));
}
