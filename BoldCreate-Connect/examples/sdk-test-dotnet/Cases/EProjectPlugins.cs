// Group E: Project plugins.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- E        this group only
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

internal static class GroupEProjectPlugins
{
    public static async Task Run()
    {
        await T("E1", "Plugins.ListAsync", async () => (await connect.Plugins.ListAsync()).Select(p => $"{p.Name}@{p.Version}"));

        // Scenario: CatalogAsync with Q, Kind, Sort and paging. Expected: each applies.
        await T("E3", "Plugins.CatalogAsync filters, sort and paging", async () =>
        {
            var q = await connect.Plugins.CatalogAsync(new CatalogQuery { Q = "ralph" });
            var mcp = await connect.Plugins.CatalogAsync(new CatalogQuery { Kind = PluginKind.Mcp });
            var sorted = await connect.Plugins.CatalogAsync(new CatalogQuery { Sort = CatalogSort.Name, Direction = SortDirection.Asc, Limit = 100 });
            var page2 = await connect.Plugins.CatalogAsync(new CatalogQuery { Limit = 2, Page = 2 });
            var names = sorted.Items.Select(p => p.Name).ToList();
            Ok(q.Items.Any(p => p.Name == "ralph-loop"), "q");
            Ok(mcp.Items.All(p => p.ComponentCounts.Mcp > 0), "kind");
            Ok(names.SequenceEqual(names.Order(StringComparer.Ordinal)), "sort");
            Ok(page2.Page == 2 && page2.Items.Count <= 2, "page");
            return new { q = q.Items.Select(p => p.Name), mcp = mcp.Items.Select(p => p.Name), page2 = page2.Items.Select(p => p.Name) };
        });

        // Scenario: AddAsync / UpdateAsync / RemoveAsync of microsoft-learn. Expected: listed then gone.
        await T("E4", "Plugins.AddAsync, UpdateAsync, RemoveAsync", async () =>
        {
            var added = await connect.Plugins.AddAsync(PluginId("microsoft-learn"));
            var updated = await connect.Plugins.UpdateAsync(PluginId("microsoft-learn"), VersionId("microsoft-learn"));
            await connect.Plugins.RemoveAsync(PluginId("microsoft-learn"));
            var names = (await connect.Plugins.ListAsync()).Select(p => p.Name).ToList();
            Ok(!names.Contains("microsoft-learn") && updated.VersionId == VersionId("microsoft-learn"), string.Join(",", names));
            return $"{added.Name}@{updated.Version}";
        });

        // Scenario: AddAsync with another plugin's version; RemoveAsync of a plugin not in the project.
        // Expected: refused; 404.
        await T("E6", "Plugins.AddAsync with a foreign version is refused", () => Rejects<ConnectError>(() => connect.Plugins.AddAsync(PluginId("microsoft-learn"), new InstallOptions { VersionId = VersionId("ralph-loop") })));
        await T("E8", "Plugins.RemoveAsync of a plugin not in the project is 404", () => Rejects<ConnectNotFoundError>(() => connect.Plugins.RemoveAsync(PluginId("teaching"))));
    }
}
