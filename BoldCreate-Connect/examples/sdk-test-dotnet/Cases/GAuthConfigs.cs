// Group G: Auth configs.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- G        this group only
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

internal static class GroupGAuthConfigs
{
    public static async Task Run()
    {
        string? context7Component = null;
        string? deepwikiComponent = null;

        // Scenario: AuthConfigs.ListAsync; component ids from Users.PluginsAsync. Expected: a list.
        await T("G1", "AuthConfigs.ListAsync", async () =>
        {
            var g = (await connect.CreateAsync(Uid("g"))).UserId;
            var plugins = await connect.Users.PluginsAsync(g);
            context7Component = plugins.First(p => p.Name == "context7").Mcp[0].ComponentId;
            deepwikiComponent = plugins.First(p => p.Name == "deepwiki").Mcp[0].ComponentId;
            var list = await connect.AuthConfigs.ListAsync();
            return new { configs = list.Count, context7Component };
        });

        // Scenario: SetVariablesAsync(context7, CONTEXT7_API_KEY). Expected: the server is ready for users.
        await T("G2", "AuthConfigs.SetVariablesAsync sets a project value", async () =>
        {
            await connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["CONTEXT7_API_KEY"] = "ctx7-test-value-123456" });
            var s = await connect.CreateAsync(Uid("g2"));
            var c7 = (await s.AuthConfigsAsync()).First(a => a.ComponentId == context7Component);
            Ok(c7.Ready, $"{c7.Setup}");
            return new { c7.Ready, c7.Setup.Kind };
        });

        // Scenario: SetVariablesAsync with an invalid name. Expected: 400.
        await T("G3b", "AuthConfigs.SetVariablesAsync refuses an invalid name", () => Rejects<ConnectError>(() => connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["bad name!"] = "x" }), status: 400));
    }
}
