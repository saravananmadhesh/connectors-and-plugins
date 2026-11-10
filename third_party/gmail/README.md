# Gmail

BoldCreate plugin that connects agents to Gmail through Google's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server over streamable HTTP.

Search, read, and draft Gmail messages and threads, and manage labels, Trash and Spam.

> **Developer Preview.** Google's Workspace MCP servers are part of the Google Workspace Developer Preview Program and may change before general availability.

## Install

- **BoldCreate Connect:** open **Marketplace**, find **Gmail**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Gmail**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install gmail@boldcreate-plugins`.

## MCP

```json
{
  "mcpServers": {
    "gmail": {
      "type": "http",
      "url": "https://gmailmcp.googleapis.com/mcp/v1"
    }
  }
}
```

## Setup

There is nothing to set when you install the plugin. Auth is OAuth: the first time the agent calls a tool, each member signs in to their own account in the browser, and tool calls run with that member's permissions. The plugin requests these scopes:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.compose`

## Before you connect

Your Google Cloud project must be enrolled in the Google Workspace Developer Preview Program, with the product's API and its MCP service enabled. A Workspace admin may need to allow the app for your domain.

## What it can do

The server lists 23 tools. Descriptions and markings are taken from the server's `tools/list` response, checked on 2026-11-10.

| Tool | Marked by the server | What the server says it does |
| --- | --- | --- |
| `search_threads` | Read-only | Lists email threads, filtered by a query string, with pagination. |
| `get_thread` | Read-only | Retrieves a thread and a list of its messages. It does not return drafts. |
| `get_message` | Read-only | Retrieves a message by its message ID. |
| `list_drafts` | Read-only | Lists draft emails, optionally filtered by a query string. |
| `get_draft` | Read-only | Retrieves a draft by ID, including a link to view and edit it in Gmail. |
| `list_labels` | Read-only | Lists all labels, to find the label IDs the label tools need. |
| `create_draft` | Not read-only | Creates a new draft. It takes recipients, a subject and body content, and can reply to an existing message. |
| `create_label` | Not read-only | Creates a new label. Nested labels use a forward slash. |
| `label_thread` | Not read-only | Adds labels to an entire thread, including messages added to it later. |
| `label_message` | Not read-only | Adds labels to a message. |
| `update_message_labels` | Not read-only | Adds and removes labels on a message in one step. |
| `untrash_thread` | Not read-only | Removes a thread from the Trash. It does not return the thread to the Inbox. |
| `untrash_message` | Not read-only | Removes a message from the Trash. It does not return the message to the Inbox. |
| `unmark_thread_spam` | Not read-only | Unmarks a thread as Spam. It does not return the thread to the Inbox. |
| `unmark_message_spam` | Not read-only | Unmarks a message as Spam. It does not return the message to the Inbox. |
| `unlabel_thread` | Not read-only, destructive | Removes labels from an entire thread. |
| `unlabel_message` | Not read-only, destructive | Removes labels from a message. |
| `trash_thread` | Not read-only, destructive | Moves an entire thread to the Trash (soft delete). |
| `trash_message` | Not read-only, destructive | Moves a message to the Trash (soft delete). |
| `mark_thread_spam` | Not read-only, destructive | Marks an entire thread as Spam. |
| `mark_message_spam` | Not read-only, destructive | Marks a message as Spam. |
| `apply_sensitive_thread_label` | Not read-only, destructive | Adds a Trash or Spam label to one thread. Its description says to prefer `trash_thread` or `mark_thread_spam`. |
| `apply_sensitive_message_label` | Not read-only, destructive | Adds a Trash or Spam label to one message. Its description says to prefer `trash_message` or `mark_message_spam`. |

The server returns no resources. The list has no tool that sends mail.

## Write access

The server marks 17 of the 23 tools as not read-only. They create drafts and labels, and change labels, Trash and Spam state on the signed-in member's mail.

8 of them are marked destructive: `unlabel_thread`, `unlabel_message`, `trash_thread`, `trash_message`, `mark_thread_spam`, `mark_message_spam`, `apply_sensitive_thread_label`, `apply_sensitive_message_label`. Trash is a soft delete, according to the tool descriptions.

The descriptions of `apply_sensitive_thread_label` and `apply_sensitive_message_label` mention `batch_apply_sensitive_thread_labels` and `batch_apply_sensitive_message_labels`. Those two tools are not in the server's list.

## Scopes

The plugin requests these scopes, which are the Gmail scopes in Google's guide:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.compose`

The server's OAuth metadata lists 18 more Gmail scopes as supported: `https://mail.google.com/`, `gmail.drafts`, `gmail.drafts.create`, `gmail.drafts.readonly`, `gmail.labels`, `gmail.labels.create`, `gmail.labels.readonly`, `gmail.messages`, `gmail.messages.delete`, `gmail.messages.modify`, `gmail.messages.readonly`, `gmail.metadata`, `gmail.modify`, `gmail.send`, `gmail.send.self`, `gmail.settings.basic`, `gmail.settings.filters`, `gmail.settings.filters.readonly`. The plugin does not request them.

Google's reference page for the Gmail server lists 11 tools. The server returns 23. The 12 tools missing from Google's page are `get_draft`, `apply_sensitive_thread_label`, `apply_sensitive_message_label`, `trash_thread`, `untrash_thread`, `trash_message`, `untrash_message`, `mark_thread_spam`, `unmark_thread_spam`, `mark_message_spam`, `unmark_message_spam` and `update_message_labels`. Google documents no scope for them. The server's per-tool OAuth metadata shows that 16 of the 23 tools accept neither `gmail.readonly` nor `gmail.compose`. They accept `gmail.modify`, `https://mail.google.com/` and some narrower message and label scopes. The plugin does not request those, so these 16 tools may fail when called. I could not sign in to test this.

## Rate limits

Google's guide for the Workspace MCP servers lists no rate limits for the Gmail server.

## Security notes

- Google's guide says the Workspace MCP servers inherit the same permissions and data governance controls as the user.

## Docs

- Gmail MCP server: https://developers.google.com/workspace/guides/configure-mcp-servers

## Logo

Copied from Cursor's `gmail` plugin in [cursor/plugins](https://github.com/cursor/plugins/tree/main/third_party/gmail) (MIT).

## License

MIT
