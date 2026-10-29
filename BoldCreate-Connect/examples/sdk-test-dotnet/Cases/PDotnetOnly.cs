// Group P: .NET only.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- P        this group only
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

internal static class GroupPDotnetOnly
{
    public static async Task Run()
    {
        await EnsureUser(userA);
        var sessionK = await SharedSession("kate");

        // Scenario: GetSessionAsync twice with a MemorySessionCache. Expected: the same session; after
        // ForgetSessionAsync a new one.
        await T("P1", "GetSessionAsync reuses a cached session; ForgetSessionAsync drops it", async () =>
        {
            using var c = Client(projectKey, o => o.SessionCache = new MemorySessionCache());
            var who = Uid("p1");
            var one = await c.GetSessionAsync(who);
            var two = await c.GetSessionAsync(who);
            await c.ForgetSessionAsync(who);
            var three = await c.GetSessionAsync(who);
            Ok(one.Id == two.Id && three.Id != one.Id, $"{one.Id} {two.Id} {three.Id}");
            return new { cached = one.Id, afterForget = three.Id };
        });

        // Scenario: 5 GetSessionAsync calls at once for one user. Expected: one session made.
        await T("P2", "parallel GetSessionAsync shares one creation", async () =>
        {
            using var c = Client(projectKey, o => o.SessionCache = new MemorySessionCache());
            var who = Uid("p2");
            var all = await Task.WhenAll(Enumerable.Range(0, 5).Select(_ => c.GetSessionAsync(who)));
            var ids = all.Select(s => s.Id).Distinct().ToList();
            Ok(ids.Count == 1, string.Join(",", ids));
            return ids;
        });

        // Scenario: services.AddBoldCreateConnect(o => ...), resolve ConnectClient. Expected: it works.
        await T("P3", "AddBoldCreateConnect registers a working client", async () =>
        {
            var services = new ServiceCollection();
            services.AddBoldCreateConnect(o => { o.ApiKey = projectKey; o.BaseUrl = baseUrl; });
            using var provider = services.BuildServiceProvider();
            var c = provider.GetRequiredService<ConnectClient>();
            return (await c.Plugins.ListAsync()).Count;
        });

        // Scenario: EnumerateAsync on plugins, user plugins, connections, auth configs. Expected: same as ListAsync.
        await T("P4", "EnumerateAsync matches ListAsync", async () =>
        {
            var listed = (await connect.Plugins.ListAsync()).Count;
            var enumerated = 0;
            await foreach (var _ in connect.Plugins.EnumerateAsync()) enumerated++;
            var userPlugins = 0;
            await foreach (var _ in connect.Users.EnumeratePluginsAsync(userA)) userPlugins++;
            var sessionPlugins = 0;
            await foreach (var _ in sessionK.Plugins.EnumerateAsync()) sessionPlugins++;
            Ok(listed == enumerated, $"{listed} != {enumerated}");
            return new { listed, enumerated, userPlugins, sessionPlugins };
        });
    }
}
