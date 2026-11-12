# Twilio

BoldCreate plugin that connects agents to Twilio through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Build powerful communications and customer engagement.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Twilio**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Twilio**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install twilio@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "twilio": {
      "type": "http",
      "url": "https://mcp.twilio.com/docs"
    }
  }
}
```

## Setup

No settings.

The server answered anonymous requests without asking for sign-in, so no account is needed to connect. This is Twilio's documentation MCP server (`twilio-docs-mcp`): it searches and retrieves Twilio docs.

The plugin also includes 57 Twilio and SendGrid skills for account setup, product selection, implementation patterns, and production guardrails. Twilio publishes the MCP and skills as Public Beta.

## Skills

The plugin includes skills from Twilio's official `twilio/ai` repository. They cover Messaging, Voice, Verify, SendGrid, and more. Twilio publishes them under a Public Beta; details may change before general availability.

## Docs

- Twilio MCP server: https://www.twilio.com/docs/ai/mcp
- Twilio skills: https://www.twilio.com/docs/ai/skills

## Logo

Icon from the vendor listing for Twilio, converted to PNG and centred on a white tile. It is the vendor's own icon and a trademark of its owner. It is not covered by the MIT licence.

## License

MIT
