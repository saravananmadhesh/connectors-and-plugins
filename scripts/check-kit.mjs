#!/usr/bin/env node
// Checks the skills, agents, rules and hooks of Syncfusion (first-party) plugins, and the
// context budgets they must stay within:
//   TB-1  auto-skill descriptions, agent descriptions and always-on rules <= 600 tokens
//         (characters / 4), each auto-skill description <= 40 words. Claude Code counts
//         the session-start hook text in place of the rules.
//   TB-2  SKILL.md <= 150 lines
//   TB-3  agent file <= 80 lines
//   AC-8  every skill has tests/scenarios/<skill>.md
//   Self-contained components: BoldCreate Connect syncs each skill folder, agent, rule and
//   hook file on its own, so nothing may rely on files elsewhere in the plugin folder.
// Community plugins under third_party/ are kept as published, so checkCommunity only checks
// that their components load and warns about files BoldCreate Connect cannot deliver yet.
// Usage: node scripts/check-kit.mjs   (also run by npm run validate)

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { parse as parseYaml } from "yaml";
import { listPlugins, isMcpPlugin, kitComponents, CLAUDE_HOOKS, CURSOR_HOOKS, PLUGINS_DIR } from "./build.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const BUDGETS = {
  alwaysLoadedTokens: 600,
  autoDescriptionWords: 40,
  skillLines: 150,
  agentLines: 80,
};

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const tokens = (s) => Math.ceil(s.trim().length / 4);
const lineCount = (s) => s.replace(/\n$/, "").split("\n").length;

function readDoc(path) {
  const text = readFileSync(path, "utf-8").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { text, frontmatter: null, body: text };
  let frontmatter;
  try {
    frontmatter = parseYaml(m[1]) ?? {};
  } catch (e) {
    frontmatter = { __error: e.message };
  }
  return { text, frontmatter, body: m[2] };
}

export function checkKit(dir) {
  const errors = [];
  const fail = (msg) => errors.push(msg);
  const base = join(root, dir);
  const { skills, agents, rules } = kitComponents(dir);
  const always = [];

  const frontmatterOf = (rel) => {
    const doc = readDoc(join(base, rel));
    if (!doc.frontmatter) fail(`${dir}/${rel}: frontmatter is missing`);
    else if (doc.frontmatter.__error) fail(`${dir}/${rel}: frontmatter is not valid YAML: ${doc.frontmatter.__error}`);
    return { ...doc, fm: doc.frontmatter && !doc.frontmatter.__error ? doc.frontmatter : {} };
  };

  for (const name of skills) {
    const rel = `skills/${name}/SKILL.md`;
    const { text, fm } = frontmatterOf(rel);
    const where = `${dir}/${rel}`;
    if (fm.name !== name) fail(`${where}: name "${fm.name}" must match the folder name`);
    if (fm.license !== "MIT") fail(`${where}: license must be MIT`);
    const description = typeof fm.description === "string" ? fm.description.trim() : "";
    if (!description) fail(`${where}: description is missing`);
    const manual = fm["disable-model-invocation"] === true;
    if (manual) {
      if (description.includes("\n")) fail(`${where}: a manual skill description must be one line`);
    } else if (description) {
      if (words(description) > BUDGETS.autoDescriptionWords) {
        fail(`${where}: auto description has ${words(description)} words (TB-1 limit ${BUDGETS.autoDescriptionWords})`);
      }
      always.push({ what: `skill ${name}`, text: description });
    }
    const lines = lineCount(text);
    if (lines > BUDGETS.skillLines) fail(`${where}: ${lines} lines (TB-2 limit ${BUDGETS.skillLines})`);
    if (!existsSync(join(base, "tests/scenarios", `${name}.md`))) {
      fail(`${dir}/tests/scenarios/${name}.md is missing (AC-8: one scenario file per skill)`);
    }
  }

  const scenarioDir = join(base, "tests/scenarios");
  if (existsSync(scenarioDir)) {
    for (const file of readdirSync(scenarioDir).filter((f) => f.endsWith(".md"))) {
      const name = file.slice(0, -3);
      const { fm } = frontmatterOf(`tests/scenarios/${file}`);
      if (!skills.includes(name)) fail(`${dir}/tests/scenarios/${file}: no skill named "${name}"`);
      if (fm.skill !== name) fail(`${dir}/tests/scenarios/${file}: skill "${fm.skill}" must match the file name`);
    }
  }

  for (const name of agents) {
    const rel = `agents/${name}.md`;
    const { text, fm } = frontmatterOf(rel);
    const where = `${dir}/${rel}`;
    if (fm.name !== name) fail(`${where}: name "${fm.name}" must match the file name`);
    if (typeof fm.description !== "string" || !fm.description.trim()) fail(`${where}: description is missing`);
    else always.push({ what: `agent ${name}`, text: fm.description });
    if (typeof fm.tools !== "string" || !fm.tools.trim()) fail(`${where}: tools is missing`);
    const lines = lineCount(text);
    if (lines > BUDGETS.agentLines) fail(`${where}: ${lines} lines (TB-3 limit ${BUDGETS.agentLines})`);
  }

  for (const name of rules) {
    const rel = `rules/${name}.mdc`;
    const { body, fm } = frontmatterOf(rel);
    const where = `${dir}/${rel}`;
    if (typeof fm.description !== "string" || !fm.description.trim()) fail(`${where}: description is missing`);
    if (typeof fm.alwaysApply !== "boolean") fail(`${where}: alwaysApply must be true or false`);
    if (fm.alwaysApply === true) always.push({ what: `rule ${name}`, text: body });
    else if (!fm.globs) fail(`${where}: a rule that is not always on needs globs`);
  }

  const total = always.reduce((n, a) => n + tokens(a.text), 0);
  if (total > BUDGETS.alwaysLoadedTokens) {
    fail(`${dir}: always-loaded text is about ${total} tokens (TB-1 limit ${BUDGETS.alwaysLoadedTokens})`);
  }

  // Claude Code has no rules: the session-start hook prints the always-on rules there.
  let claudeTotal = always.filter((a) => !a.what.startsWith("rule ")).reduce((n, a) => n + tokens(a.text), 0);
  const hasAlwaysRules = always.some((a) => a.what.startsWith("rule "));

  if (existsSync(join(base, "hooks/hooks.json"))) {
    fail(`${dir}/hooks/hooks.json: Cursor loads this file; put Claude Code hooks in ${CLAUDE_HOOKS}`);
  }
  const hooksFile = join(base, CLAUDE_HOOKS);
  if (existsSync(hooksFile)) {
    try {
      const hooks = JSON.parse(readFileSync(hooksFile, "utf-8")).hooks;
      if (!hooks || typeof hooks !== "object" || Array.isArray(hooks)) fail(`${dir}/${CLAUDE_HOOKS}: needs a top-level "hooks" object`);
      else {
        const commands = Object.values(hooks).flat().flatMap((h) => h.hooks ?? []).map((h) => h.command ?? "");
        for (const command of commands) {
          if (/CLAUDE_PLUGIN_ROOT\}?\//.test(command)) {
            fail(`${dir}/${CLAUDE_HOOKS}: a hook command reads or runs a file from the plugin folder; BoldCreate Connect delivers only the hooks file, so keep the command self-contained`);
          }
        }
        const sessionStart = (hooks.SessionStart ?? []).flatMap((h) => h.hooks ?? []).map((h) => h.command ?? "").join("\n");
        claudeTotal += tokens(sessionStart);
      }
    } catch (e) {
      fail(`${dir}/${CLAUDE_HOOKS} is not valid JSON: ${e.message}`);
    }
  } else if (hasAlwaysRules) {
    fail(`${dir}/${CLAUDE_HOOKS} is missing; Claude Code needs a session-start hook for the always-on rules`);
  }
  if (claudeTotal > BUDGETS.alwaysLoadedTokens) {
    fail(`${dir}: skill and agent descriptions plus the session-start hook are about ${claudeTotal} tokens (TB-1 limit ${BUDGETS.alwaysLoadedTokens})`);
  }

  // BoldCreate Connect delivers components one by one, so plugin-level folders never reach the user.
  const allowedTop = new Set([
    ".boldcreate-plugin", ".claude-plugin", ".cursor-plugin", "boldcreate.json",
    "skills", "agents", "rules", "hooks", "assets", "tests", "README.md", "CHANGELOG.md", "LICENSE",
  ]);
  for (const entry of readdirSync(base)) {
    if (!allowedTop.has(entry)) {
      fail(`${dir}/${entry}: BoldCreate Connect does not deliver plugin-level files; move it into the skill folder that uses it`);
    }
  }
  if (existsSync(join(base, "hooks"))) {
    for (const entry of readdirSync(join(base, "hooks"))) {
      if (`hooks/${entry}` !== CLAUDE_HOOKS) fail(`${dir}/hooks/${entry}: BoldCreate Connect delivers only ${CLAUDE_HOOKS}; inline the script in the hook command`);
    }
  }
  const outsideRefs = /kit root|two levels above|this plugin's folder|\.\.\/\.\.\//i;
  const components = [
    ...skills.flatMap((s) => readdirSync(join(base, "skills", s)).map((f) => `skills/${s}/${f}`)),
    ...agents.map((a) => `agents/${a}.md`),
    ...rules.map((r) => `rules/${r}.mdc`),
  ];
  for (const rel of components) {
    const m = readFileSync(join(base, rel), "utf-8").match(outsideRefs);
    if (m) fail(`${dir}/${rel}: refers to a file outside its component ("${m[0]}"); keep the file in the skill folder`);
  }

  const summary =
    `${dir}: ${skills.length} skills, ${agents.length} agents, ${rules.length} rules; ` +
    `always-loaded about ${total} tokens in Cursor and ${claudeTotal} in Claude Code (limit ${BUDGETS.alwaysLoadedTokens})`;
  return { errors, summary };
}

export function checkCommunity(dir) {
  const errors = [];
  const warnings = [];
  const base = join(root, dir);
  const { skills, agents, rules, hooks } = kitComponents(dir);

  const frontmatterOf = (rel) => {
    const doc = readDoc(join(base, rel));
    if (!doc.frontmatter) errors.push(`${dir}/${rel}: frontmatter is missing`);
    else if (doc.frontmatter.__error) errors.push(`${dir}/${rel}: frontmatter is not valid YAML: ${doc.frontmatter.__error}`);
    return doc.frontmatter && !doc.frontmatter.__error ? doc.frontmatter : {};
  };
  const needs = (rel, fm, keys) => {
    for (const key of keys) {
      if (typeof fm[key] !== "string" || !fm[key].trim()) errors.push(`${dir}/${rel}: ${key} is missing`);
    }
  };

  for (const name of skills) {
    const rel = `skills/${name}/SKILL.md`;
    const fm = frontmatterOf(rel);
    needs(rel, fm, ["name", "description"]);
    if (fm.name && fm.name !== name) errors.push(`${dir}/${rel}: name "${fm.name}" must match the folder name`);
  }
  for (const name of agents) {
    const rel = `agents/${name}.md`;
    const fm = frontmatterOf(rel);
    needs(rel, fm, ["name", "description"]);
  }
  for (const name of rules) {
    const rel = `rules/${name}.mdc`;
    const fm = frontmatterOf(rel);
    needs(rel, fm, ["description"]);
  }
  const hooksFile = join(base, CURSOR_HOOKS);
  if (existsSync(hooksFile)) {
    try {
      const parsed = JSON.parse(readFileSync(hooksFile, "utf-8")).hooks;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) errors.push(`${dir}/${CURSOR_HOOKS}: needs a top-level "hooks" object`);
    } catch (e) {
      errors.push(`${dir}/${CURSOR_HOOKS} is not valid JSON: ${e.message}`);
    }
    const scripts = readdirSync(join(base, "hooks")).filter((f) => `hooks/${f}` !== CURSOR_HOOKS);
    if (scripts.length) {
      warnings.push(`${dir}/hooks: BoldCreate Connect delivers only the hooks file today, not ${scripts.join(", ")}; the hooks work from Cursor's marketplace install`);
    }
  }

  const known = new Set([
    ".boldcreate-plugin", ".claude-plugin", ".cursor-plugin", "boldcreate.json",
    "skills", "agents", "rules", "hooks", "assets", "README.md", "CHANGELOG.md", "LICENSE",
  ]);
  const extra = readdirSync(base).filter((e) => !known.has(e));
  if (extra.length) warnings.push(`${dir}: BoldCreate Connect does not deliver plugin-level files (${extra.join(", ")})`);

  // A skill may link to a sibling skill, but not to plugin-level files that never reach the user.
  const skillsDir = join(base, "skills");
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
  for (const file of skills.flatMap((s) => walk(join(skillsDir, s))).filter((f) => f.endsWith(".md"))) {
    for (const [, link] of readFileSync(file, "utf-8").matchAll(/\]\((\.\.\/[^)\s#]*)/g)) {
      if (!resolve(dirname(file), link).startsWith(skillsDir + "/")) {
        warnings.push(`${dir}/${file.slice(base.length + 1)}: links to ${link}, outside the skills folder`);
      }
    }
  }

  const summary = `${dir}: community plugin, ${skills.length} skills, ${agents.length} agents, ${rules.length} rules, ${hooks.length} hook events`;
  return { errors, warnings, summary };
}

// Syncfusion plugins at the repository root.
export function firstPartyPlugins() {
  return listPlugins().filter((p) => {
    if (p.dir.startsWith(`${PLUGINS_DIR}/`)) return false;
    const cursor = JSON.parse(readFileSync(join(root, p.dir, ".cursor-plugin/plugin.json"), "utf-8"));
    return !isMcpPlugin(cursor);
  });
}

function main() {
  let count = 0;
  for (const p of firstPartyPlugins()) {
    const { errors, summary } = checkKit(p.dir);
    errors.forEach((e) => console.error(`ERROR: ${e}`));
    count += errors.length;
    console.log(summary);
  }
  if (count) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
