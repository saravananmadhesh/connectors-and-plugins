# Figma

BoldCreate plugin that connects agents to Figma through the vendor's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Give AI agents the design context to generate code from your Figma files, and write native Figma content back to the canvas.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Figma**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Figma**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install figma@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

## Setup

No settings.

The first time the agent calls a tool, each member signs in to their own account in the browser (OAuth). Tool calls run with that member's permissions.

## Client access

Figma's documentation says only clients listed in the Figma MCP catalog, such as VS Code, Cursor and Claude Code, can connect to the Figma MCP server. A developer who wants to connect a new MCP client can join Figma's waitlist. Figma's documentation does not say whether BoldCreate Connect is in the catalog.

## Authentication

Auth is OAuth. The server's OAuth metadata lists the scope `mcp:connect`, a registration endpoint, and PKCE with S256. Figma's documentation says you can only use the server with Figma files you already have access to, and it accepts links to a Figma Design, FigJam or Figma Make file.

Figma's documentation says enterprise-managed authorization is available for Claude through Okta Cross App Access (XAA).

## What it can do

Figma's "Tools and prompts" page lists the tools below. The endpoint requires sign-in before it lists tools, so this section comes from [Figma's documentation](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/). Figma says some tools are remote only and some are used by Figma's own skills as part of a larger workflow.

**Read tools**

| Tool | What Figma says it does |
| --- | --- |
| `download_assets` | Downloads exports and original source images. |
| `get_code_connect_map` | Gets Code Connect mappings for selected instances. |
| `get_code_connect_suggestions` | Suggests Code Connect mappings (Figma-prompted). |
| `get_context_for_code_connect` | Gets component metadata for Code Connect templates (Figma-prompted). |
| `get_design_context` | Gets design context and code for a layer or selection. |
| `get_figjam` | Converts FigJam diagrams to XML. |
| `get_generative_plugin` | Reads a generative plugin's source. |
| `get_libraries` | Lists subscribed and available libraries. |
| `get_metadata` | Gets a lightweight XML outline of a selection. |
| `get_motion_context` | Gets keyframe animation data and code snippets. |
| `get_screenshot` | Takes a screenshot of a selection. |
| `get_shader` | Reads a shader's source. |
| `get_variable_defs` | Lists variables and styles used in a selection. |
| `list_file_shaders` | Lists shaders used in a specific file. |
| `list_generative_plugins` | Lists generative plugins in your library. |
| `list_shaders` | Lists shader effects and fills in your library. |
| `search_design_system` | Searches libraries for components, variables and styles. |
| `whoami` | Gets your identity, plans and seats. |

**Write tools**

| Tool | What Figma says it does |
| --- | --- |
| `add_code_connect_map` | Maps a Figma component to a code component. |
| `create_generative_plugin` | Creates a generative plugin starter. |
| `create_new_file` | Creates a blank Figma Design, FigJam or Figma Slides file. |
| `create_shader` | Creates a shader effect or fill starter. |
| `generate_diagram` | Generates a FigJam diagram from a description or Mermaid syntax. |
| `generate_figma_design` | Turns live web UI into design layers. |
| `generate_image` | Generates and places an image in a Figma file. |
| `html_to_figma` | Converts an HTML document into design layers. |
| `send_code_connect_mappings` | Confirms suggested Code Connect mappings (Figma-prompted). |
| `send_code_to_figma` | Imports a local project into Figma as a Make file or code layer. |
| `update_generative_plugin` | Updates a generative plugin's source. |
| `update_shader` | Updates a shader's source. |
| `upload_assets` | Uploads images and SVGs into a Figma file. |
| `use_figma` | Creates, edits and inspects content in Figma files. |

Figma lists nine Weave tools separately: `weave_cancel_tool_run`, `weave_find_model`, `weave_get_model_run_output`, `weave_get_tool_inputs`, `weave_get_tool_run_output`, `weave_list_tools`, `weave_run_model`, `weave_run_tool` and `weave_upload_asset`. Figma says you need a paid standalone Figma Weave account to run Weave tools, that runs use your Weave credits, and that your agent shows you the cost and asks you to confirm before a paid run.

The server also provides one MCP prompt, `create_design_system_rules`.

## Write access

Figma's documentation says `use_figma` can create, edit, delete or inspect content in Figma files, and that your seat type determines what you can create or edit. Several other tools write to Figma files, listed above. Figma's README says write to canvas is available for free during the beta period and will eventually be a usage-based paid feature.

## AI credits

Figma's documentation says most MCP server tools do not use Figma AI credits. These do:

- `generate_image` uses credits for each image. The cost depends on the image model.
- `send_prompt` uses credits when the Figma Make agent creates or changes code.
- `send_code_to_figma` does not use credits for the first upload. Prompting and later changes do.

Figma Weave tools use Weave credits instead.

## Rate limits

Figma's "Rate limits & access" page says limits depend on your plan and seat, and that per-minute limits apply in addition to daily or monthly limits.

| Seat | Starter | Professional | Organization | Enterprise |
| --- | --- | --- | --- | --- |
| View, Collab | Up to 20 per month | Up to 20 per month | Up to 20 per month | Up to 20 per month |
| Full, Dev | None listed | Up to 200 per day, 10 per minute | Up to 200 per day, 15 per minute | Up to 600 per day, 20 per minute |

Education plans have the same limits as Full and Dev seats on the Professional plan. Rate limits apply to tools that read data from Figma. Some tools are exempt, including tools that write to Figma files, such as `add_code_connect_map`, `create_new_file`, `generate_figma_design` and `whoami`. Actions that use Figma AI credits do not count toward MCP rate limits. Figma may change rate limits at any time.

## Beta features

Figma's README says its skills are currently available as a Beta feature. Figma's tools page says Figma Specs is in open beta and is only available on plans where Specs is turned on.

## Security notes

- Figma's documentation says you can only use the MCP server with Figma files you already have access to.
- By using the Figma MCP server and the related resources, you agree to the [Figma Developer Terms](https://www.figma.com/legal/developer-terms/), according to Figma's README.

## Skills

This plugin does not include Figma's agent skills. Figma publishes them in [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide), which has no licence file, so they are not copied here. Figma's README says the skills are governed by the Figma Developer Terms.

## Docs

- Figma MCP server: https://developers.figma.com/docs/figma-mcp-server/remote-server-installation
- Tools and prompts: https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/
- Rate limits and access: https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/
- Figma skills and plugin source: https://github.com/figma/mcp-server-guide

## Logo

Figma mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #F24E1E, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
