// Group H: Connections.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- H        this group only
//   dotnet run --project examples/sdk-test-dotnet               every group

using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.Extensions.DependencyInjection;
using Syncfusion.BoldCreate.Connect;
using Syncfusion.BoldCreate.Connect.Extensions;
using Syncfusion.BoldCreate.Connect.Sync;
using static SdkTest.Lib;

namespace SdkTest.Cases;

internal static class GroupHConnections
{
    public static async Task Run()
    {
        var (_, deepwikiComponent) = await McpComponents();
        await EnsureUser(userA);

        await T("H1", "Connections.ListAsync", async () => (await connect.Connections.ListAsync(new ConnectionListOptions { UserId = userA })).Count);
        await T("H2", "Connections.StartAsync on a no-auth server is refused", () => Rejects<ConnectError>(() => connect.Connections.StartAsync(userA, deepwikiComponent!, "https://host.example/back")));
        await T("H3", "Connections.DeleteAsync of an unknown id is 404", () => Rejects<ConnectNotFoundError>(() => connect.Connections.DeleteAsync("con_00000000000000000000000000000000")));
    }
}
