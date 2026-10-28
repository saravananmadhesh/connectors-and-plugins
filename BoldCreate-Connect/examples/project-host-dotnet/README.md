# A host product with the .NET package

The .NET twin of [`../project-host`](../project-host): one server flow that gives each of a host's users plugins, MCP servers and files through `Syncfusion.BoldCreate.Connect`. Guide: [integration.md](../../docs/guides/integration.md).

| File             | What it is                                                                              |
| ---------------- | --------------------------------------------------------------------------------------- |
| `ProjectHost.cs` | Reuses a session per user, syncs plugin files, writes the MCP file, lists sign-in links |
| `Program.cs`     | Runs `ProjectHost` against a real project                                               |

The flow is tested with a fake HTTP handler in `packages/sdk-dotnet/Syncfusion.BoldCreate.Connect.Tests` (`ProjectHostTests`); no network, no project key.

## Run it

1. In the console, create a project and a project key with the scopes `sessions:write`, `sessions:read` and `plugins:read`, and add the plugins your users should have.
2. Then:

```sh
CONNECT_PROJECT_KEY=prk_... CONNECT_USER_ID=user-42 CONNECT_DIR=./agents dotnet run
```

The output lists the files placed, the servers found and a sign-in link for every server the user still has to connect.
