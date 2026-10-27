# Gemini Enterprise Agent Platform (Vertex AI)

BoldCreate plugin that connects agents to Gemini Enterprise Agent Platform (Vertex AI) through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) servers over streamable HTTP.

Generate content, run predictions, and manage models, endpoints, tuning, and evaluation on Vertex AI.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Gemini Enterprise Agent Platform (Vertex AI)**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Gemini Enterprise Agent Platform (Vertex AI)**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install google-cloud-agent-platform@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "agent-platform-generate": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/generate",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-predict": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/predict",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-models": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/models",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-endpoints": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/endpoints",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-tuning": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/tuning",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-evaluation": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/evaluation",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-prompts": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/prompts",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-retrieval": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/retrieval",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    },
    "agent-platform-notebook": {
      "type": "http",
      "url": "https://aiplatform.googleapis.com/mcp/notebook",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}",
        "CLIENT_SECRET": "${CLIENT_SECRET}"
      }
    }
  }
}
```

## Setup

Set these when you install the plugin. Secrets are stored encrypted and sent only to the MCP server.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Client ID** (`CLIENT_ID`) | Yes | No | A Google OAuth client your team created. Every team member signs in under it. |
| **Client secret** (`CLIENT_SECRET`) | Yes | Yes | The secret for that OAuth client. Stored encrypted. |

Auth is OAuth. The first time the agent calls a tool, each member signs in to their own account in the browser. Tool calls run with that member's permissions.

## Set up your team's OAuth client

Google's MCP servers don't support dynamic client registration, so a team admin provides one Google OAuth client and every member signs in under it. Consent screens and audit logs then show your team's own app.

1. In the Google Cloud console, open **Google Auth Platform → Clients** and create a client of type **Web application**.
2. Add the BoldCreate Connect OAuth callback URL (shown on the plugin's settings page) as an authorized redirect URI.
3. Add these scopes to the project's OAuth consent screen:
   - `https://www.googleapis.com/auth/cloud-platform`
4. In BoldCreate Connect, open the plugin's settings and enter the **Client ID** and **Client secret**.

Claude Code plugins can't carry an OAuth client secret, so the generated Claude Code manifest leaves the client out. In Claude Code, pass the client when you add the server, for example `claude mcp add --transport http --client-id <id> --client-secret google-cloud-agent-platform <url>`.

## Before you connect

You need a Google Cloud project with the product's API enabled, and your Google account needs the MCP Tool User role (`roles/mcp.toolUser`), plus the product roles for what the agent should do on that project.

## Servers

This plugin installs 9 servers:

- `agent-platform-generate`: `https://aiplatform.googleapis.com/mcp/generate`
- `agent-platform-predict`: `https://aiplatform.googleapis.com/mcp/predict`
- `agent-platform-models`: `https://aiplatform.googleapis.com/mcp/models`
- `agent-platform-endpoints`: `https://aiplatform.googleapis.com/mcp/endpoints`
- `agent-platform-tuning`: `https://aiplatform.googleapis.com/mcp/tuning`
- `agent-platform-evaluation`: `https://aiplatform.googleapis.com/mcp/evaluation`
- `agent-platform-prompts`: `https://aiplatform.googleapis.com/mcp/prompts`
- `agent-platform-retrieval`: `https://aiplatform.googleapis.com/mcp/retrieval`
- `agent-platform-notebook`: `https://aiplatform.googleapis.com/mcp/notebook`

## Docs

- Gemini Enterprise Agent Platform (Vertex AI) MCP server: https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/use-agent-platform-mcp
- Tools reference: https://docs.cloud.google.com/gemini-enterprise-agent-platform/reference/mcp
- Google's MCP server list: https://docs.cloud.google.com/mcp/supported-products

## Logo

Google Gemini mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #8E75B2, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
