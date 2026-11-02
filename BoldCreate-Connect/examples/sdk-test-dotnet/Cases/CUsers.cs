// Group C: Users.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- C        this group only
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

internal static class GroupCUsers
{
    public static async Task Run()
    {
        await EnsureUser(userA);

        // Scenario: ListAsync(UserId = userA). Expected: that user.
        await T("C1", "Users.ListAsync by userId", async () =>
        {
            var page = await connect.Users.ListAsync(new UserListOptions { UserId = userA });
            Ok(page.Items.Count == 1 && page.Items[0].UserId == userA, $"{page.Items.Count}");
            return page.Items[0];
        });

        // Scenario: SetNameAsync, then Search by the user id prefix. Expected: found.
        await T("C2", "Users.SetNameAsync and search", async () =>
        {
            var u = await connect.Users.SetNameAsync(userA, "Alice Host");
            var found = await connect.Users.ListAsync(new UserListOptions { Search = $"net-{run}-al" });
            Ok(u.DisplayName == "Alice Host" && found.Items.Any(x => x.UserId == userA), "not found");
            return new { u.DisplayName, hits = found.Items.Count };
        });

        // Scenario: SetNameAsync for a new id. Expected: the user is added.
        await T("C3", "Users.SetNameAsync adds a new user", async () => (await connect.Users.SetNameAsync(Uid("c3"), "Named First")).UserId);

        // Scenario: PluginsAsync(userA). Expected: project plugins only.
        await T("C5", "Users.PluginsAsync lists project plugins", async () =>
        {
            var list = await connect.Users.PluginsAsync(userA);
            Ok(list.Count >= 4 && list.All(p => p.Source == PluginSource.Project), "not all project");
            return list.Select(p => $"{p.Name}:{p.Source}");
        });

        // Scenario: InstallAsync(userA, teaching). Expected: listed with Source User.
        await T("C6", "Users.InstallAsync adds a plugin for one user", async () =>
        {
            await connect.Users.InstallAsync(userA, PluginId("teaching"));
            var t = (await connect.Users.PluginsAsync(userA)).FirstOrDefault(p => p.Name == "teaching");
            Ok(t?.Source == PluginSource.User, $"{t?.Source}");
            return $"{t!.Name}:{t.Source}";
        });

        // Scenario: InstallAsync with a VersionId, then UninstallAsync. Expected: installed then gone.
        await T("C7", "Users.InstallAsync with a version, then UninstallAsync", async () =>
        {
            var p = await connect.Users.InstallAsync(userA, PluginId("create-plugin"), new InstallOptions { VersionId = VersionId("create-plugin") });
            await connect.Users.UninstallAsync(userA, PluginId("create-plugin"));
            var names = (await connect.Users.PluginsAsync(userA)).Select(x => x.Name).ToList();
            Ok(p.VersionId == VersionId("create-plugin") && !names.Contains("create-plugin"), string.Join(",", names));
            return $"{p.Name}@{p.Version}";
        });

        // Scenario: UninstallAsync of a project plugin and InstallAsync of an unknown id. Expected: refused, 404.
        await T("C9", "Users.UninstallAsync of a project plugin is refused", () => Rejects<ConnectError>(() => connect.Users.UninstallAsync(userA, PluginId("cursor-team-kit"))));
        await T("C10", "Users.InstallAsync of an unknown plugin is 404", () => Rejects<ConnectNotFoundError>(() => connect.Users.InstallAsync(userA, "plg_00000000000000000000000000000000")));
    }
}
