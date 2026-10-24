#!/usr/bin/env node
// Checks every plugin before it can be merged. Run: npm run validate

import { readFileSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { listPlugins, expectedFiles } from "./build.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJSON = (p) => JSON.parse(readFileSync(join(root, p), "utf-8"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const schemas = {
  plugin: ajv.compile(readJSON("schemas/cursor-plugin.schema.json")),
  marketplace: ajv.compile(readJSON("schemas/cursor-marketplace.schema.json")),
  boldcreate: ajv.compile(readJSON("schemas/boldcreate.schema.json")),
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
    for (const [h, value] of Object.entries(server.headers ?? {})) {
      const refs = [...String(value).matchAll(VAR_REF)].map((m) => m[1]);
      refs.forEach((r) => used.add(r));
      if (/authorization|key|token|secret/i.test(h) && refs.length === 0) {
        fail(`${where}: header "${h}" looks like a literal credential; use a \${VARIABLE}`);
      }
    }
  }

  for (const v of used) if (!declared.has(v)) fail(`${base}: \${${v}} is used in mcp.json but not declared in variables`);
  for (const v of declared) if (!used.has(v)) fail(`${base}: variable ${v} is declared but never used in mcp.json`);
}

validate("marketplace", ".cursor-plugin/marketplace.json");

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
