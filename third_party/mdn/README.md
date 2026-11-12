# MDN

BoldCreate plugin that connects agents to MDN through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search & retrieval of MDN docs & browser compat data.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **MDN**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **MDN**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install mdn@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "mdn": {
      "type": "http",
      "url": "https://mcp.mdn.mozilla.net/"
    }
  }
}
```

## Setup

No settings.

The server answered anonymous requests without asking for sign-in, so no account is needed to connect. The tools search MDN docs and return browser compatibility data.

## Docs

- MDN Web Docs: https://developer.mozilla.org/

## Logo

Icon downloaded from the Claude connector directory listing for MDN. It is the vendor's own icon and a trademark of its owner. It is not covered by the MIT licence.

## License

MIT
