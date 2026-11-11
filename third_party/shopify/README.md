# Shopify

BoldCreate plugin that connects agents to Shopify through Shopify's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Create and manage your store with Shopify.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Shopify**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Shopify**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install shopify@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "shopify": {
      "type": "http",
      "url": "https://setup.shopify.com/mcp",
      "auth": {
        "CLIENT_ID": "${CLIENT_ID}"
      }
    }
  }
}
```

## Setup

Set this when you install the plugin. It is not a secret.

| Setting | Required | Secret | What to enter |
| --- | --- | --- | --- |
| **Client ID** (`CLIENT_ID`) | No (default `2a457b21c946d5bc8d1675d1b3b8c2d6`) | No | The OAuth client ID that Shopify publishes in its own Shopify AI Toolkit plugin for Cursor. Replace it with your own client ID if your team registers one. |

Auth is OAuth. The first time the agent calls a tool, each member signs in in the browser and connects a Shopify store. Tool calls run with that member's access to that store.

## Authentication

The server's OAuth metadata, checked on 2026-11-10, says:

- It supports Client ID Metadata Documents, and does not list a registration endpoint, so it does not support dynamic client registration.
- It accepts public clients only (`none` for token endpoint authentication), so there is no client secret.
- PKCE with S256 is required. The grants are authorization code and refresh token.

The default client ID above comes from Shopify's Cursor plugin. I could not test it through BoldCreate Connect, so it is not confirmed that it accepts Connect's redirect URL. If sign-in fails, replace it with a client ID that your team registers with Shopify.

The server lists 37 OAuth scopes. They include read scopes such as `read_all_orders`, `read_analytics` and `read_apps`, and write scopes such as `write_orders`, `write_products`, `write_customers`, `write_discounts`, `write_inventory` and `write_themes`.

## What it can do

The server lists 37 tools. Markings are taken from the server's `tools/list` response, checked on 2026-11-10. It returned the list without sign-in. Which store the tools act on depends on the store a member connects.

| Marked by the server | Count | Tools |
| --- | --- | --- |
| Read-only | 20 | `find-mock-shop-catalogs`, `get-digital-products-install-status`, `generate-domain-names`, `generate-business-names`, `search_products`, `get-shop-info`, `get-product`, `list-orders`, `get-order`, `list-customers`, `get-inventory-levels`, `run-analytics-query`, `search_collections`, `get-collection`, `graphql_schema`, `graphql_query`, `get-digital-product`, `test-digital-products-connection`, `validate_graphql_codeblocks`, `search_docs_chunks` |
| Not read-only | 10 | `import-mock-shop-catalog`, `open-digital-products-install`, `create-product`, `create-discount`, `add-to-collection`, `create-collection`, `update-collection`, `switch-shop`, `create-digital-product`, `create-digital-product-from-link` |
| Destructive | 5 | `update-product`, `set-inventory`, `bulk-update-product-status`, `graphql_mutation`, `publish-digital-product` |
| No marking | 2 | `upload-digital-product-file`, `upload-digital-product-media` |

The server returns no resources and no prompts. `validate_graphql_codeblocks` is described by the server as a compatibility no-op.

## Write access

The tools that are not read-only change the connected store: they create and update products, collections, discount codes, inventory and digital products, and `import-mock-shop-catalog` copies up to 16 sample products into it. The server marks `update-product`, `set-inventory`, `bulk-update-product-status`, `graphql_mutation` and `publish-digital-product` as destructive.

`graphql_mutation` runs a GraphQL mutation against the Shopify Admin API when no dedicated tool covers a request. Its description says some dangerous mutations are blocked for safety, such as refunds, gift card writes, staff management, theme deletion and theme publishing, and that theme file writes are allowed on unpublished themes only.

`switch-shop` revokes the current store's access token, so the next tool call asks for authorization for a new store.

## Rate limits

I found no rate limits for this MCP server. Shopify's API limits page says the figures for each API are documented with that API, for example the GraphQL Admin API's calculated query cost by plan. Tool calls that reach the Admin API may be subject to those limits.

## Security notes

- The server lists write scopes for orders, products, customers, discounts, inventory and themes, so a member who connects a store grants the agent that access.
- Keep your MCP client's tool approval on for the tools that change a store.

## Not included

This plugin does not include Shopify's agent skills, hooks or scripts from [Shopify/Shopify-AI-Toolkit](https://github.com/Shopify/Shopify-AI-Toolkit). Shopify's README says its skill scripts and a `PostToolUse` hook send usage events to `shopify.dev` by default, including search queries, validated code and, on Claude Code, the user's latest prompt. Shopify documents an opt-out file and the `OPT_OUT_INSTRUMENTATION` variable in that README.

Shopify's Dev MCP server, which Shopify's documentation says runs locally and needs no authentication, is separate and is not part of this plugin.

## Docs

- Shopify AI Toolkit: https://shopify.dev/docs/apps/build/ai-toolkit
- Shopify API limits: https://shopify.dev/docs/api/usage/limits
- Shopify AI Toolkit source: https://github.com/Shopify/Shopify-AI-Toolkit

## Logo

Shopify mark from [Simple Icons](https://simpleicons.org) (CC0) in brand colour #7AB55C, on a padded white tile. The mark is a trademark of its owner.

## License

MIT
