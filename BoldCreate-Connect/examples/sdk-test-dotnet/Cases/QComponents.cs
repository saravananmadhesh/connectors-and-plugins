// Group Q: One component on or off for one user.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- Q        this group only
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

internal static class GroupQComponents
{
    public static async Task Run()
    {
        var userQ = Uid("quinn");
        var userQ2 = Uid("quentin");
        var sessionQ = await connect.CreateAsync(userQ);
        var sessionQ2 = await connect.CreateAsync(userQ2);
        async Task<UserPlugin> PluginOf(string userId, string name) => (await connect.Users.PluginsAsync(userId)).First(p => p.Name == name);

        // Scenario: Users.SetComponentEnabledAsync(userQ, deepwiki, its MCP component, false) on a project
        // plugin. Expected: off for userQ only; userQ's McpAsync drops deepwiki, userQ2's keeps it.
        await T("Q1", "Users.SetComponentEnabledAsync turns a project MCP server off for one user", async () =>
        {
            var dw = await PluginOf(userQ, "deepwiki");
            var componentId = dw.Mcp[0].ComponentId;
            var after = await connect.Users.SetComponentEnabledAsync(userQ, dw.PluginId, componentId, false);
            Ok(after.Components.Any(c => c.ComponentId == componentId && !c.Enabled), "not off");
            var mine = (await sessionQ.McpAsync()).Select(x => x.Name).ToList();
            var theirs = (await sessionQ2.McpAsync()).Select(x => x.Name).ToList();
            Ok(!mine.Contains("deepwiki") && theirs.Contains("deepwiki"), $"{string.Join(",", mine)} / {string.Join(",", theirs)}");
            return new { userQ = mine, userQ2 = theirs };
        });

        // Scenario: Users.ClearComponentEnabledAsync twice. Expected: back to the install default; repeat is safe.
        await T("Q3", "Users.ClearComponentEnabledAsync returns to the install default", async () =>
        {
            var dw = await PluginOf(userQ, "deepwiki");
            var componentId = dw.Mcp[0].ComponentId;
            await connect.Users.ClearComponentEnabledAsync(userQ, dw.PluginId, componentId);
            await connect.Users.ClearComponentEnabledAsync(userQ, dw.PluginId, componentId);
            var mine = (await sessionQ.McpAsync()).Select(x => x.Name).ToList();
            Ok(mine.Contains("deepwiki"), string.Join(",", mine));
            return mine;
        });

        // Scenario: the user's own install (teaching): SetComponentEnabledAsync off a skill, then
        // ClearComponentEnabledAsync. Expected: off stored on the install; clear is 404 there.
        await T("Q4", "SetComponentEnabledAsync on the user's own install; clear is 404 there", async () =>
        {
            await connect.Users.InstallAsync(userQ, PluginId("teaching"));
            var t = await PluginOf(userQ, "teaching");
            var skill = t.Components.First(c => c.Kind == "skill");
            var after = await connect.Users.SetComponentEnabledAsync(userQ, t.PluginId, skill.ComponentId, false);
            Ok(after.Components.Any(c => c.ComponentId == skill.ComponentId && !c.Enabled), "not off");
            var clear = await Rejects<ConnectNotFoundError>(() => connect.Users.ClearComponentEnabledAsync(userQ, t.PluginId, skill.ComponentId));
            await connect.Users.SetComponentEnabledAsync(userQ, t.PluginId, skill.ComponentId, true);
            return new { skill = skill.Name, clear };
        });

        // Scenario: session Plugins.SetComponentEnabledAsync(toolkit, one skill, false), then
        // ClearComponentEnabledAsync. Expected: manifest row Enabled false, download refused, sync removes
        // the skill; after clear, Enabled true and sync adds it back.
        var dirQ = Path.Combine(syncRoot, "quinn");
        await T("Q5", "session SetComponentEnabledAsync / ClearComponentEnabledAsync with manifest, download and sync", async () =>
        {
            var kit = (await sessionQ.Plugins.ListAsync()).First(p => p.Name == "boldcreate-toolkit");
            var skill = kit.Components.First(c => c.Kind == "skill");
            var only = new ManifestQuery { Plugins = ["boldcreate-toolkit"] };
            ManifestComponent Row(ManifestResult m) => m.Manifest!.Entries.SelectMany(e => e.Components).First(c => c.Id == skill.ComponentId);
            var before = Row(await sessionQ.ManifestAsync(only));
            await sessionQ.SyncPluginsAsync(new SyncOptions { Dir = dirQ, Plugins = ["boldcreate-toolkit"] });
            await sessionQ.Plugins.SetComponentEnabledAsync(kit.PluginId, skill.ComponentId, false);
            var off = Row(await sessionQ.ManifestAsync(only));
            var download = await Rejects<ConnectError>(() => sessionQ.ComponentAsync(before.Sha256));
            var removed = (await sessionQ.SyncPluginsAsync(new SyncOptions { Dir = dirQ, Plugins = ["boldcreate-toolkit"] })).Removed.Select(c => c.Name).ToList();
            await sessionQ.Plugins.ClearComponentEnabledAsync(kit.PluginId, skill.ComponentId);
            var on = Row(await sessionQ.ManifestAsync(only));
            var added = (await sessionQ.SyncPluginsAsync(new SyncOptions { Dir = dirQ, Plugins = ["boldcreate-toolkit"] })).Added.Select(c => c.Name).ToList();
            Ok(!off.Enabled && on.Enabled, $"enabled off={off.Enabled} on={on.Enabled}");
            Ok(removed.Contains(skill.Name) && added.Contains(skill.Name), $"removed {string.Join(",", removed)} added {string.Join(",", added)}");
            return new { skill = skill.Name, download, removed, added };
        });

        // Scenario: unknown component id, a plugin neither in the project nor installed, an empty user id.
        // Expected: 404, 404, and the SDK refusing the empty user id before any call.
        await T("Q7", "SetComponentEnabledAsync refuses unknown components, plugins and user ids", async () =>
        {
            var dw = await PluginOf(userQ, "deepwiki");
            var unknown = await Rejects<ConnectNotFoundError>(() => connect.Users.SetComponentEnabledAsync(userQ, dw.PluginId, "cmp_00000000000000000000000000000000", false));
            var notInstalled = await Rejects<ConnectNotFoundError>(() => sessionQ.Plugins.SetComponentEnabledAsync(PluginId("create-plugin"), "cmp_00000000000000000000000000000000", false));
            var emptyUser = await Rejects<ConnectError>(() => connect.Users.SetComponentEnabledAsync("", dw.PluginId, "x", false));
            return new { unknown, notInstalled, emptyUser };
        });
    }
}
