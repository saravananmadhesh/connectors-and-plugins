#!/usr/bin/env node
// Checks every plugin before it can be merged. Run: npm run validate

import { readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { listPlugins, expectedFiles, listComponents } from "./build.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJSON = (p) => JSON.parse(readFileSync(join(root, p), "utf-8"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const schemas = {
  plugin: ajv.compile(readJSON("schemas/cursor-plugin.schema.json")),
  marketplace: ajv.compile(readJSON("schemas/cursor-marketplace.schema.json")),
  boldcreate: ajv.compile(readJSON("schemas/boldcreate.schema.json")),
  boldcreatePlugin: ajv.compile(readJSON("schemas/boldcreate-plugin.schema.json")),
  boldcreateMarketplace: ajv.compile(readJSON("schemas/boldcreate-marketplace.schema.json")),
};

let errors = 0;
const fail = (msg) => {
  console.error(`ERROR: ${msg}`);
  errors++;
};

function validate(kind, file) {
  if (!existsSync(join(root, file))) return fail(`${file} is missing`), null;
  let data;
  try {
    data = readJSON(file);
  } catch (e) {
    return fail(`${file} is not valid JSON: ${e.message}`), null;
  }
  if (!schemas[kind](data)) {
    for (const err of schemas[kind].errors) {
      fail(`${file} ${err.instancePath || "/"} ${err.message}`);
    }
  }
  return data;
}

const VAR_REF = /\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g;
const SEMVER = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

const names = listPlugins();
for (const name of names) {
  const base = `plugins/${name}`;
  const manifest = validate("plugin", `${base}/.cursor-plugin/plugin.json`);
  const meta = validate("boldcreate", `${base}/boldcreate.json`);
  if (!manifest) continue;

  if (manifest.name !== name) fail(`${base}: manifest name "${manifest.name}" must match folder name`);
  if (!SEMVER.test(manifest.version ?? "")) fail(`${base}: version "${manifest.version}" is not semver`);
  if (manifest.mcpServers !== "./mcp.json") fail(`${base}: mcpServers must be "./mcp.json"`);

  for (const f of ["README.md", "CHANGELOG.md", "mcp.json"]) {
    if (!existsSync(join(root, base, f))) fail(`${base}/${f} is missing`);
  }
  const changelog = existsSync(join(root, base, "CHANGELOG.md"))
    ? readFileSync(join(root, base, "CHANGELOG.md"), "utf-8")
    : "";
  if (!changelog.includes(`## ${manifest.version}`)) {
    fail(`${base}/CHANGELOG.md has no entry for version ${manifest.version}`);
  }

  if (!existsSync(join(root, base, "mcp.json"))) continue;
  const mcp = readJSON(`${base}/mcp.json`);
  const servers = Object.entries(mcp.mcpServers ?? {});
  if (!servers.length) fail(`${base}/mcp.json declares no servers`);

  const declared = new Set(Object.keys(manifest.variables?.properties ?? {}));
  const used = new Set();

  for (const [key, server] of servers) {
    const where = `${base}/mcp.json "${key}"`;
    if (meta?.transport === "streamable-http") {
      if (server.type !== "http") fail(`${where}: type must be "http" for streamable-http`);
      if (!server.url) fail(`${where}: url is required`);
    }
    if (server.url) {
      const literal = server.url.replace(VAR_REF, "x");
      if (!literal.startsWith("https://")) fail(`${where}: url must use https`);
      for (const m of server.url.matchAll(VAR_REF)) used.add(m[1]);
    }
    if (meta?.transport === "stdio") {
      if (server.type && server.type !== "stdio") fail(`${where}: type must be "stdio" for stdio`);
      if (!server.command) fail(`${where}: command is required`);
      if (server.url) fail(`${where}: a stdio server has no url`);
    }
    for (const a of server.args ?? []) for (const m of String(a).matchAll(VAR_REF)) used.add(m[1]);
    for (const [kind, map] of [["header", server.headers], ["env", server.env]]) {
      for (const [h, value] of Object.entries(map ?? {})) {
        const refs = [...String(value).matchAll(VAR_REF)].map((m) => m[1]);
        refs.forEach((r) => used.add(r));
        if (/authorization|key|token|secret|password/i.test(h) && refs.length === 0) {
          fail(`${where}: ${kind} "${h}" looks like a literal credential; use a \${VARIABLE}`);
        }
      }
    }
  }

  // Skills: folder name must match the SKILL.md name, and a description is required.
  for (const skill of listComponents(join(root, base)).skills) {
    const text = readFileSync(join(root, base, skill, "SKILL.md"), "utf-8");
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) {
      fail(`${base}/${skill}/SKILL.md has no frontmatter`);
      continue;
    }
    const nameLine = fm[1].match(/^name:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
    const folder = skill.split("/")[1];
    if (!nameLine) fail(`${base}/${skill}/SKILL.md frontmatter has no name`);
    else if (nameLine[1] !== folder) fail(`${base}/${skill}: SKILL.md name "${nameLine[1]}" must match folder "${folder}"`);
    if (!/^description:/m.test(fm[1])) fail(`${base}/${skill}/SKILL.md frontmatter has no description`);
  }
  for (const rule of listComponents(join(root, base)).rules) {
    const text = readFileSync(join(root, base, rule), "utf-8");
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm || !/^description:/m.test(fm[1])) fail(`${base}/${rule} needs frontmatter with a description`);
  }

  for (const v of used) if (!declared.has(v)) fail(`${base}: \${${v}} is used in mcp.json but not declared in variables`);
  for (const v of declared) if (!used.has(v)) fail(`${base}: variable ${v} is declared but never used in mcp.json`);
}

validate("marketplace", ".cursor-plugin/marketplace.json");
validate("boldcreateMarketplace", ".boldcreate-plugin/marketplace.json");
for (const name of names) validate("boldcreatePlugin", `plugins/${name}/.boldcreate-plugin/plugin.json`);

// Generated files must match their sources.
for (const [rel, text] of Object.entries(expectedFiles())) {
  const path = join(root, rel);
  if (!existsSync(path) || readFileSync(path, "utf-8") !== text) {
    fail(`${rel} is out of date; run: npm run build`);
  }
}

if (errors) {
  console.error(`\n${errors} problem(s) found.`);
  process.exit(1);
}
console.log(`All ${names.length} plugins are valid.`);
