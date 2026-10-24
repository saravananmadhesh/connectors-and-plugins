#!/usr/bin/env node
// Generates files that must stay in sync with each plugin's Cursor manifest:
//   plugins/<name>/.claude-plugin/plugin.json   (Claude Code manifest)
//   .cursor-plugin/marketplace.json             (Cursor marketplace index)
//   .claude-plugin/marketplace.json             (Claude Code marketplace index)
//   plugins/<name>/.boldcreate-plugin/plugin.json  (BoldCreate Connect manifest)
//   .boldcreate-plugin/marketplace.json            (BoldCreate Connect marketplace index)
//
// Source of truth per plugin: .cursor-plugin/plugin.json + mcp.json + boldcreate.json.
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

// Non-MCP components found in the plugin folder, using the default layout
// Cursor and Claude Code both discover: skills/<name>/SKILL.md,
// rules/*.mdc, agents/*.md, commands/*.md, hooks/hooks.json.
export function listComponents(dir) {
  const files = (sub, ext) =>
    existsSync(join(dir, sub))
      ? readdirSync(join(dir, sub), { withFileTypes: true })
          .filter((d) => d.isFile() && d.name.endsWith(ext))
          .map((d) => `${sub}/${d.name}`)
          .sort()
      : [];
  const skills = existsSync(join(dir, "skills"))
    ? readdirSync(join(dir, "skills"), { withFileTypes: true })
        .filter((d) => d.isDirectory() && existsSync(join(dir, "skills", d.name, "SKILL.md")))
        .map((d) => `skills/${d.name}`)
        .sort()
    : [];
  return {
    skills,
    rules: files("rules", ".mdc"),
    hooks: existsSync(join(dir, "hooks/hooks.json")) ? ["hooks/hooks.json"] : [],
    agents: files("agents", ".md"),
    commands: files("commands", ".md"),
  };
}

// Self-contained manifest BoldCreate ingests: metadata, components with
// transport and auth, typed variables with a secret flag, rollout info.
export function boldcreateManifest(name) {
  const dir = join(root, "plugins", name);
  const cursor = readJSON(join(dir, ".cursor-plugin/plugin.json"));
  const mcp = readJSON(join(dir, "mcp.json"));
  const meta = readJSON(join(dir, "boldcreate.json"));
  const props = cursor.variables?.properties ?? {};
  const required = new Set(cursor.variables?.required ?? []);

  const variables = Object.fromEntries(
    Object.entries(props).map(([key, p]) => {
      const v = { title: p.title, description: p.description, required: required.has(key), secret: p["x-sensitive"] !== false };
      if (p.default !== undefined) v.default = p.default;
      return [key, v];
    })
  );

  const mcpComponents = Object.entries(mcp.mcpServers).map(([key, server]) => {
    const c = { name: key, transport: meta.transport };
    if (server.url) c.url = server.url;
    if (server.headers) c.headers = server.headers;
    if (server.command) c.command = server.command;
    if (server.args) c.args = server.args;
    if (server.env) c.env = server.env;
    c.auth = { type: meta.auth, alternatives: meta.alternativeAuth ?? [] };
    return c;
  });

  return {
    $schema: "../../../schemas/boldcreate-plugin.schema.json",
    name: cursor.name,
    displayName: cursor.displayName,
    version: cursor.version,
    description: cursor.description,
    author: cursor.author,
    homepage: cursor.homepage,
    repository: cursor.repository,
    category: cursor.category,
    keywords: cursor.keywords,
    hostedBy: meta.hostedBy,
    docs: meta.docs,
    rollout: { phase: meta.phase, ...(meta.wave ? { wave: meta.wave } : {}) },
    supportedByGateway: meta.transport === "streamable-http",
    variables,
    components: { mcp: mcpComponents, ...listComponents(dir) },
    endpointCheck: meta.endpointCheck ?? null,
  };
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
  const boldcreate = {
    $schema: "../schemas/boldcreate-marketplace.schema.json",
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description, formatVersion: 1 },
    plugins: names.map((name) => {
      const m = boldcreateManifest(name);
      const mcp = m.components.mcp;
      return {
        name: m.name,
        displayName: m.displayName,
        version: m.version,
        description: m.description,
        source: `plugins/${m.name}`,
        category: m.category,
        components: Object.entries(m.components).filter(([, v]) => v.length).map(([k]) => k),
        transports: [...new Set(mcp.map((c) => c.transport))],
        auth: [...new Set(mcp.map((c) => c.auth.type))],
        requiresSecrets: Object.values(m.variables).some((v) => v.secret),
        rollout: m.rollout,
        supportedByGateway: m.supportedByGateway,
      };
    }),
  };
  return { cursor, claude, boldcreate };
}

export function expectedFiles() {
  const names = listPlugins();
  const files = {};
  for (const name of names) {
    files[`plugins/${name}/.claude-plugin/plugin.json`] = toText(claudeManifest(name));
    files[`plugins/${name}/.boldcreate-plugin/plugin.json`] = toText(boldcreateManifest(name));
  }
  const { cursor, claude, boldcreate } = marketplaces(names);
  files[".cursor-plugin/marketplace.json"] = toText(cursor);
  files[".claude-plugin/marketplace.json"] = toText(claude);
  files[".boldcreate-plugin/marketplace.json"] = toText(boldcreate);
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
