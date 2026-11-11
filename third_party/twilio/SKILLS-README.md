# Twilio Developer Kit

Official Twilio skills for AI coding agents. The skills cover account setup, product selection, implementation patterns, and production guardrails for Messaging, Voice, Verify, SendGrid, and other Twilio products.

Twilio publishes these skills as a Public Beta. Their content may change and is not covered by the Twilio Support Terms or Service Level Agreement.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Twilio Developer Kit**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Twilio Developer Kit**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install twilio-developer-kit@boldcreate-plugins`.

For the Twilio documentation MCP server, install the separate **Twilio** plugin. The server and these skills are separate because this marketplace represents MCP and skill-pack plugins as separate entries.

## Skills

This plugin includes 57 skills from Twilio's official `twilio/ai` repository, under `skills/`. Each skill has a `SKILL.md` and may include its own references and assets.

## Source

Copied from [twilio/ai](https://github.com/twilio/ai), commit `803790a281f0ef11d2928ffb41bc8422237fb434`. Three upstream files needed small marketplace-compatibility edits: added missing Agent Skills frontmatter to `twilio-agent-connect`, replaced angle brackets in one description, and aligned `twilio-isv-sms-best-practices`' declared name with its folder name.

## License

MIT. See [LICENSE](LICENSE).
