// Group N: For You and Platform keys.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- N        this group only
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

internal static class GroupNForYouPlatformKeys
{
    public static async Task Run()
    {
        await T("N1", "SDK session refuses a For You key", () => Throws<ConnectError>(() => ConnectSession.FromToken(forYouKey, new SessionIdentity("fy", "me", DateTimeOffset.UtcNow.AddDays(1))), "invalid_token"));

        // Scenario: GET /v1/sync with the For You key. Expected: For team and For me installs.
        await T("N2", "For You key: gateway sync shows For team and For me installs", async () =>
        {
            var (status, json) = await Gateway(HttpMethod.Get, "/v1/sync", forYouKey);
            var entries = json?["entries"]?.AsArray().Select(e => $"{e!["pluginName"]}:{e["scope"]}").ToList() ?? [];
            Ok(status == 200 && new[] { "cursor-team-kit", "boldcreate-toolkit", "ralph-loop" }.All(n => entries.Any(e => e.StartsWith(n + ":", StringComparison.Ordinal))), $"{status} {string.Join(",", entries)}");
            return entries;
        });

        await T("N6", "Platform key cannot sync or call MCP", async () =>
        {
            var sync = await Gateway(HttpMethod.Get, "/v1/sync", platformKey);
            var mcp = await Gateway(HttpMethod.Post, "/mcp", platformKey, Rpc("tools/list"));
            Ok(sync.Status >= 400 && mcp.Status >= 400, $"{sync.Status} {mcp.Status}");
            return new { sync = sync.Status, mcp = mcp.Status };
        });
    }
}
