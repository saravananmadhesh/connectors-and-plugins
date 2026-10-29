// Group F: Install policy and plugin sets.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- F        this group only
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

internal static class GroupFInstallPolicy
{
    public static async Task Run()
    {
        // Scenario: ModeAsync, SetModeAsync(Allowlist), back. Expected: Allowlist in between.
        await T("F1", "Catalog.ModeAsync and SetModeAsync", async () =>
        {
            var before = await connect.Catalog.ModeAsync();
            await connect.Catalog.SetModeAsync(InstallMode.Allowlist);
            var during = await connect.Catalog.ModeAsync();
            await connect.Catalog.SetModeAsync(before);
            Ok(during == InstallMode.Allowlist, $"{during}");
            return new { before, during };
        });

        // Scenario: AllowAsync, AllowedAsync, DisallowAsync. Expected: listed then gone.
        await T("F2", "Catalog allow, allowed, disallow", async () =>
        {
            await connect.Catalog.AllowAsync(PluginId("teaching"));
            var listed = (await connect.Catalog.AllowedAsync()).Select(a => a.Name).ToList();
            await connect.Catalog.DisallowAsync(PluginId("teaching"));
            var after = (await connect.Catalog.AllowedAsync()).Select(a => a.Name).ToList();
            Ok(listed.Contains("teaching") && !after.Contains("teaching"), "allow-list");
            return new { listed, after };
        });

        // Scenario: plugin set create/add/rename/remove, a session from it by name, delete.
        // Expected: every change reflected; the session holds only the set's plugins.
        await T("F3", "plugin sets and a session made from one", async () =>
        {
            var set = await connect.Catalog.Sets.CreateAsync($"NetStarter {run}", [PluginId("ralph-loop")]);
            await connect.Catalog.Sets.AddAsync(set.Id, PluginId("cursor-team-kit"));
            await connect.Catalog.Sets.UpdateAsync(set.Id, $"NetStarter {run} v2");
            await connect.Catalog.Sets.RemoveAsync(set.Id, PluginId("ralph-loop"));
            var found = (await connect.Catalog.Sets.ListAsync()).First(s => s.Id == set.Id);
            var s = await connect.CreateAsync(Uid("f3"), new CreateSessionOptions { Set = found.Name });
            var names = (await s.ManifestAsync()).Manifest!.Entries.Select(e => e.PluginName).ToList();
            await connect.Catalog.Sets.DeleteAsync(set.Id);
            var gone = (await connect.Catalog.Sets.ListAsync()).All(x => x.Id != set.Id);
            Ok(found.Name.EndsWith("v2", StringComparison.Ordinal) && names.SequenceEqual(["cursor-team-kit"]) && gone, $"{found.Name} {string.Join(",", names)} {gone}");
            return new { found.Name, manifest = names };
        });
    }
}
