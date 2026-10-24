# GitHub

Manage repos, issues, pull requests, and Actions.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://api.githubcopilot.com/mcp/` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://docs.github.com/en/copilot/how-tos/context/use-mcp/use-the-github-mcp-server |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub personal access token | Yes | Yes | Fine-grained or classic PAT from https://github.com/settings/tokens with the repo scopes you want the agent to use. |
