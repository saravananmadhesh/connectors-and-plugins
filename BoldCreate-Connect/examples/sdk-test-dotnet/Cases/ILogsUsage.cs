// Group I: Logs and usage.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- I        this group only
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

internal static class GroupILogsUsage
{
    public static async Task Run()
    {
        await EnsureUser(userA);

        // Scenario: Logs.ListAsync with UserId + Action. Expected: only those rows.
        await T("I2", "Logs.ListAsync filters by user and action", async () =>
        {
            var page = await connect.Logs.ListAsync(new LogListOptions { UserId = userA, Action = "session.created" });
            Ok(page.Items.Count >= 1 && page.Items.All(e => e.Action == "session.created" && e.User?.UserId == userA), "filter");
            return page.Items.Count;
        });

        // Scenario: From = tomorrow. Expected: empty.
        await T("I3", "Logs.ListAsync From in the future is empty", async () =>
        {
            var page = await connect.Logs.ListAsync(new LogListOptions { From = DateTimeOffset.UtcNow.AddDays(1) });
            Ok(page.Items.Count == 0, $"{page.Items.Count}");
            return 0;
        });

        // Scenario: UsageAsync with and without a window. Expected: From/To echoed.
        await T("I4", "UsageAsync", async () =>
        {
            var u = await connect.UsageAsync();
            var w = await connect.UsageAsync(new UsageOptions { From = DateTimeOffset.UtcNow.AddDays(-7), To = DateTimeOffset.UtcNow });
            return new { u.From, w.To, days = w.Days.Count };
        });
    }
}
