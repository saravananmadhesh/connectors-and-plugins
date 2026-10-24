#!/usr/bin/env node
// Generates files that must stay in sync with each plugin's Cursor manifest:
//   plugins/<name>/.claude-plugin/plugin.json   (Claude Code manifest)
//   .cursor-plugin/marketplace.json             (Cursor marketplace index)
//   .claude-plugin/marketplace.json             (Claude Code marketplace index)
//
// Source of truth per plugin: .cursor-plugin/plugin.json + mcp.json.
// Usage: node scripts/build.mjs          write the files
//        node scripts/build.mjs --check  fail if any file is out of date

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

const MARKETPLACE = {
  name: "boldcreate-plugins",
  owner: { name: "BoldCreate Connect" },
  description:
    "Reviewed AI-agent plugins for BoldCreate Connect: remote MCP servers developers use every day.",
};

const readJSON = (p) => JSON.parse(readFileSync(p, "utf-8"));
const toText = (obj) => JSON.stringify(obj, null, 2) + "\n";

export function listPlugins() {
  const dir = join(root, "plugins");
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

// Cursor fills ${VAR}; Claude Code fills ${user_config.VAR}.
function toClaudeRefs(value, vars) {
  if (typeof value === "string") {
    return value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (m, key) =>
      vars.includes(key) ? `\${user_config.${key}}` : m
    );
  }
  if (Array.isArray(value)) return value.map((v) => toClaudeRefs(v, vars));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, toClaudeRefs(v, vars)])
    );
  }
  return value;
}

export function claudeManifest(name) {
  const dir = join(root, "plugins", name);
  const cursor = readJSON(join(dir, ".cursor-plugin/plugin.json"));
  const mcp = readJSON(join(dir, "mcp.json"));
  const props = cursor.variables?.properties ?? {};
  const required = new Set(cursor.variables?.required ?? []);
  const vars = Object.keys(props);

  const manifest = {
    name: cursor.name,
    displayName: cursor.displayName,
    version: cursor.version,
    description: cursor.description,
    author: cursor.author,
    homepage: cursor.homepage,
    repository: cursor.repository,
    keywords: cursor.keywords,
  };

  if (vars.length) {
    manifest.userConfig = Object.fromEntries(
      vars.map((key) => {
        const p = props[key];
        const opt = { type: "string", title: p.title, description: p.description };
        if (required.has(key)) opt.required = true;
        if (p.default !== undefined) opt.default = p.default;
        opt.sensitive = p["x-sensitive"] !== false;
        return [key, opt];
      })
    );
  }

  manifest.mcpServers = toClaudeRefs(mcp.mcpServers, vars);
  return manifest;
}

export function marketplaces(names) {
  const entries = names.map((name) => {
    const m = readJSON(join(root, "plugins", name, ".cursor-plugin/plugin.json"));
    return { name: m.name, description: m.description };
  });
  const cursor = {
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description },
    plugins: entries.map((e) => ({ ...e, source: `plugins/${e.name}` })),
  };
  const claude = {
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description },
    plugins: entries.map((e) => ({ name: e.name, source: `./plugins/${e.name}`, description: e.description })),
  };
  return { cursor, claude };
}

export function expectedFiles() {
  const names = listPlugins();
  const files = {};
  for (const name of names) {
    files[`plugins/${name}/.claude-plugin/plugin.json`] = toText(claudeManifest(name));
  }
  const { cursor, claude } = marketplaces(names);
  files[".cursor-plugin/marketplace.json"] = toText(cursor);
  files[".claude-plugin/marketplace.json"] = toText(claude);
  return files;
}

function main() {
  let stale = 0;
  for (const [rel, text] of Object.entries(expectedFiles())) {
    const path = join(root, rel);
    const current = existsSync(path) ? readFileSync(path, "utf-8") : null;
    if (current === text) continue;
    if (check) {
      console.error(`OUT OF DATE: ${rel} (run: node scripts/build.mjs)`);
      stale++;
    } else {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, text);
      console.log(`wrote ${rel}`);
    }
  }
  if (check && stale) process.exit(1);
  if (check) console.log("Generated files are up to date.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
