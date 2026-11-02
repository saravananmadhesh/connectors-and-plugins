// Group B: Keys.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- B        this group only
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

internal static class GroupBKeys
{
    public static async Task Run()
    {
        // Scenario: a made-up prk_ key. Expected: ConnectAuthError 401.
        await T("B1", "unknown project key is refused with 401", () => Rejects<ConnectAuthError>(() => Client("prk_notarealkey000000000000").Users.ListAsync(), status: 401));

        // Scenario: the project key lists users. Expected: a page.
        await T("B2", "project key works on the gateway", async () => (await connect.Users.ListAsync(new UserListOptions { Limit = 1 })).Items.Count);

        // Scenario: For You key / Platform key as the client key. Expected: ConnectAuthError.
        await T("B3", "For You key cannot call project routes", () => Rejects<ConnectAuthError>(() => Client(forYouKey).Users.ListAsync()));
        await T("B4", "Platform key cannot call project routes", () => Rejects<ConnectAuthError>(() => Client(platformKey).Plugins.ListAsync()));

        // Scenario: the project key on the api port 3001. Expected: refused.
        await T("B5", "project key on the api port is refused", () => Rejects<ConnectAuthError>(() => Client(projectKey, o => o.BaseUrl = "http://localhost:3001").Users.ListAsync()));
    }
}
