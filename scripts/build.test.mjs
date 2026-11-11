import test from "node:test";
import assert from "node:assert/strict";
import { claudeManifest, boldcreateManifest, isCommunityPlugin } from "./build.mjs";

const twilio = { name: "twilio", dir: "third_party/twilio" };

test("MCP plugins under third_party are included in vendor-component validation", () => {
  assert.equal(isCommunityPlugin(twilio.dir), true);
});

test("Twilio Claude manifest contains MCP configuration alongside skills support", () => {
  const manifest = claudeManifest(twilio);
  assert.ok(manifest.mcpServers);
  assert.equal(manifest.name, "twilio");
});

test("Twilio BoldCreate manifest exposes both MCP and skills", () => {
  const manifest = boldcreateManifest(twilio);
  assert.equal(manifest.components.mcp.length, 1);
  assert.equal(manifest.components.skills.length, 57);
});
