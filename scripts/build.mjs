#!/usr/bin/env node
// Generates files that must stay in sync with each plugin's Cursor manifest:
//   <plugin>/.claude-plugin/plugin.json      (Claude Code manifest)
//   <plugin>/.boldcreate-plugin/plugin.json  (BoldCreate Connect manifest)
//   .cursor-plugin/marketplace.json          (Cursor marketplace index)
//   .claude-plugin/marketplace.json          (Claude Code marketplace index)
//   .boldcreate-plugin/marketplace.json      (BoldCreate Connect marketplace index)
//
// <plugin> is third_party/<name> for MCP plugins and <name> at the repo root for
// first-party plugins. Sources per plugin: .cursor-plugin/plugin.json, boldcreate.json,
// and either mcp.json or the skills/, agents/, rules/ and hooks/ folders.
// Usage: node scripts/build.mjs          write the files
//        node scripts/build.mjs --check  fail if any file is out of date

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");

export const PLUGINS_DIR = "third_party";
const NOT_PLUGINS = new Set([PLUGINS_DIR, "node_modules", "schemas", "scripts"]);

const MARKETPLACE = {
  name: "boldcreate-plugins",
  owner: { name: "Syncfusion" },
  description:
    "Reviewed AI-agent plugins for BoldCreate Connect: remote MCP servers developers use every day, and a tool kit for the whole software delivery lifecycle.",
};

const readJSON = (p) => JSON.parse(readFileSync(p, "utf-8"));
const toText = (obj) => JSON.stringify(obj, null, 2) + "\n";
const subdirs = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()
    : [];
const filesWith = (dir, ext) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).filter((d) => d.isFile() && d.name.endsWith(ext)).map((d) => d.name).sort()
    : [];

// Each plugin is { name, dir } with dir relative to the repo root.
export function listPlugins() {
  const firstParty = subdirs(root)
    .filter((n) => !n.startsWith(".") && !NOT_PLUGINS.has(n))
    .filter((n) => existsSync(join(root, n, ".cursor-plugin/plugin.json")))
    .map((name) => ({ name, dir: name }));
  const vendor = subdirs(join(root, PLUGINS_DIR)).map((name) => ({ name, dir: `${PLUGINS_DIR}/${name}` }));
  return [...firstParty, ...vendor].sort((a, b) => a.name.localeCompare(b.name));
}

// Cursor auto-loads hooks/hooks.json in its own format, so Claude Code hooks live in a separate file.
export const CLAUDE_HOOKS = "hooks/claude-hooks.json";

export const isMcpPlugin = (cursor) => cursor.mcpServers !== undefined;

// Skill, agent, rule and hook names found in a first-party plugin.
export function kitComponents(dir) {
  const base = join(root, dir);
  const skills = subdirs(join(base, "skills")).filter((n) => existsSync(join(base, "skills", n, "SKILL.md")));
  const agents = filesWith(join(base, "agents"), ".md").map((f) => f.slice(0, -3));
  const rules = filesWith(join(base, "rules"), ".mdc").map((f) => f.slice(0, -4));
  const hooksFile = join(base, CLAUDE_HOOKS);
  const hooks = existsSync(hooksFile) ? Object.keys(readJSON(hooksFile).hooks ?? {}).sort() : [];
  return { skills, agents, rules, hooks };
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

export function claudeManifest({ dir }) {
  const base = join(root, dir);
  const cursor = readJSON(join(base, ".cursor-plugin/plugin.json"));

  const manifest = {
    name: cursor.name,
    displayName: cursor.displayName,
    version: cursor.version,
    description: cursor.description,
    author: cursor.author,
    homepage: cursor.homepage,
    repository: cursor.repository,
    license: cursor.license,
    keywords: cursor.keywords,
  };
  if (cursor.logo) manifest.icon = `./${cursor.logo}`;

  if (!isMcpPlugin(cursor)) {
    // Claude Code scans skills/ by default. Agents are listed one by one so that
    // only top-level agent files load. Claude Code has no rule component; the
    // session-start hook loads instructions.md instead.
    const { agents } = kitComponents(dir);
    if (agents.length) manifest.agents = agents.map((a) => `./agents/${a}.md`);
    if (existsSync(join(base, CLAUDE_HOOKS))) manifest.hooks = `./${CLAUDE_HOOKS}`;
    return manifest;
  }

  const mcp = readJSON(join(base, "mcp.json"));
  const props = cursor.variables?.properties ?? {};
  const required = new Set(cursor.variables?.required ?? []);

  // Cursor's "auth" block (OAuth client ID and secret, used by Google servers)
  // has no Claude Code equivalent in a plugin, so it is dropped here, along
  // with any variable used only inside it.
  const servers = Object.fromEntries(
    Object.entries(mcp.mcpServers).map(([k, { auth, ...rest }]) => [k, rest])
  );
  const usedText = JSON.stringify(servers);
  const vars = Object.keys(props).filter((v) => usedText.includes(`\${${v}}`));

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

  manifest.mcpServers = toClaudeRefs(servers, vars);
  return manifest;
}

// Self-contained manifest BoldCreate ingests: metadata, components with
// transport and auth, typed variables with a secret flag, rollout info.
export function boldcreateManifest({ dir }) {
  const base = join(root, dir);
  const cursor = readJSON(join(base, ".cursor-plugin/plugin.json"));
  const meta = readJSON(join(base, "boldcreate.json"));
  const props = cursor.variables?.properties ?? {};
  const required = new Set(cursor.variables?.required ?? []);
  const mcpPlugin = isMcpPlugin(cursor);

  const variables = Object.fromEntries(
    Object.entries(props).map(([key, p]) => {
      const v = { title: p.title, description: p.description, required: required.has(key), secret: p["x-sensitive"] !== false };
      if (p.default !== undefined) v.default = p.default;
      return [key, v];
    })
  );

  const mcpComponents = mcpPlugin
    ? Object.entries(readJSON(join(base, "mcp.json")).mcpServers).map(([key, server]) => {
        const c = { name: key, transport: meta.transport, url: server.url };
        if (server.headers) c.headers = server.headers;
        c.auth = { type: meta.auth, alternatives: meta.alternativeAuth ?? [] };
        if (server.auth) {
          c.auth.oauthClient = { clientId: server.auth.CLIENT_ID, clientSecret: server.auth.CLIENT_SECRET };
        }
        if (meta.oauthScopes?.length) c.auth.scopes = meta.oauthScopes;
        return c;
      })
    : [];
  const kit = mcpPlugin ? { skills: [], agents: [], rules: [], hooks: [] } : kitComponents(dir);

  return {
    $schema: `${"../".repeat(dir.split("/").length + 1)}schemas/boldcreate-plugin.schema.json`,
    name: cursor.name,
    displayName: cursor.displayName,
    version: cursor.version,
    description: cursor.description,
    author: cursor.author,
    homepage: cursor.homepage,
    repository: cursor.repository,
    license: cursor.license,
    logo: cursor.logo,
    category: cursor.category,
    keywords: cursor.keywords,
    ...(meta.hostedBy ? { hostedBy: meta.hostedBy } : {}),
    ...(meta.stage ? { stage: meta.stage } : {}),
    docs: meta.docs,
    rollout: { phase: meta.phase, ...(meta.wave ? { wave: meta.wave } : {}) },
    supportedByGateway: mcpPlugin && meta.transport === "streamable-http",
    variables,
    components: {
      mcp: mcpComponents,
      skills: kit.skills,
      rules: kit.rules,
      hooks: kit.hooks,
      agents: kit.agents,
      commands: [],
    },
    endpointCheck: meta.endpointCheck ?? null,
  };
}

export function marketplaces(plugins) {
  const entries = plugins.map((p) => {
    const m = readJSON(join(root, p.dir, ".cursor-plugin/plugin.json"));
    return { name: m.name, description: m.description, dir: p.dir };
  });
  const cursor = {
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description },
    plugins: entries.map((e) => ({ name: e.name, description: e.description, source: e.dir })),
  };
  const claude = {
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description },
    plugins: entries.map((e) => ({ name: e.name, source: `./${e.dir}`, description: e.description })),
  };
  const boldcreate = {
    $schema: "../schemas/boldcreate-marketplace.schema.json",
    name: MARKETPLACE.name,
    owner: MARKETPLACE.owner,
    metadata: { description: MARKETPLACE.description, formatVersion: 1 },
    plugins: plugins.map((p) => {
      const m = boldcreateManifest(p);
      const mcp = m.components.mcp;
      return {
        name: m.name,
        displayName: m.displayName,
        version: m.version,
        description: m.description,
        source: p.dir,
        logo: `${p.dir}/${m.logo}`,
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
  const plugins = listPlugins();
  const files = {};
  for (const p of plugins) {
    files[`${p.dir}/.claude-plugin/plugin.json`] = toText(claudeManifest(p));
    files[`${p.dir}/.boldcreate-plugin/plugin.json`] = toText(boldcreateManifest(p));
  }
  const { cursor, claude, boldcreate } = marketplaces(plugins);
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
