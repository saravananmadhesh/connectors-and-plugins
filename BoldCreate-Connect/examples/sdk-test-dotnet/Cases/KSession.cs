// Group K: Session self-service ("For you").
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- K        this group only
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

internal static class GroupKSession
{
    public static async Task Run()
    {
        var (context7Component, _) = await McpComponents();
        var sessionK = await SharedSession("kate");

        await T("K1", "session CatalogAsync", async () => (await sessionK.CatalogAsync(new CatalogQuery { Q = "teach" })).Items.Select(p => p.Name));
        await T("K3", "session Plugins.ListAsync", async () => (await sessionK.Plugins.ListAsync()).Select(p => $"{p.Name}:{p.Source}"));

        // Scenario: InstallAsync(teaching) then UpdateAsync to the latest version. Expected: both work.
        await T("K4", "session Plugins.InstallAsync", async () =>
        {
            var p = await sessionK.Plugins.InstallAsync(PluginId("teaching"));
            return $"{p.Name}@{p.Version}";
        });
        await T("K5", "session Plugins.UpdateAsync", async () => (await sessionK.Plugins.UpdateAsync(PluginId("teaching"), VersionId("teaching"))).Version);

        // Scenario: install microsoft-learn, McpAsync lists it, RemoveAsync. Expected: listed then gone.
        await T("K6", "session installs and removes a no-auth MCP plugin", async () =>
        {
            await sessionK.Plugins.InstallAsync(PluginId("microsoft-learn"));
            var listed = (await sessionK.McpAsync()).Select(s => s.Name).ToList();
            await sessionK.Plugins.RemoveAsync(PluginId("microsoft-learn"));
            var after = (await sessionK.McpAsync()).Select(s => s.Name).ToList();
            Ok(listed.Contains("microsoft-learn") && !after.Contains("microsoft-learn"), $"{string.Join(",", listed)} / {string.Join(",", after)}");
            return listed;
        });

        await T("K8", "session cannot remove a project plugin", () => Rejects<ConnectError>(() => sessionK.Plugins.RemoveAsync(PluginId("cursor-team-kit"))));

        // Scenario: mode Off then install. Expected: install_not_allowed.
        await T("K9", "install mode Off is enforced on the session", async () =>
        {
            await connect.Catalog.SetModeAsync(InstallMode.Off);
            try { return await Rejects<ConnectAuthError>(() => sessionK.Plugins.InstallAsync(PluginId("create-plugin")), "install_not_allowed"); }
            finally { await connect.Catalog.SetModeAsync(InstallMode.Any); }
        });

        // Scenario: context7 out of the project; the user installs it and SetVariablesAsync. Expected: IsSet.
        await T("K10", "session Plugins.SetVariablesAsync on a plugin the user installed", async () =>
        {
            await connect.Plugins.RemoveAsync(PluginId("context7"));
            try
            {
                var s = await connect.CreateAsync(Uid("k10"));
                await s.Plugins.InstallAsync(PluginId("context7"));
                var p = await s.Plugins.SetVariablesAsync(PluginId("context7"), new Dictionary<string, string?> { ["CONTEXT7_API_KEY"] = "ctx7-user-value-987654" });
                Ok(p.Variables.Any(v => v.Name == "CONTEXT7_API_KEY" && v.IsSet), JsonSerializer.Serialize(p.Variables));
                return p.Variables;
            }
            finally { await connect.Plugins.AddAsync(PluginId("context7")); }
        });

        // Scenario: AuthConfigsAsync and McpAsync(Plugin = "deepwiki"). Expected: rows; one server with the token.
        await T("K12", "session AuthConfigsAsync and McpAsync filter", async () =>
        {
            var configs = await sessionK.AuthConfigsAsync();
            var one = await sessionK.McpAsync(new McpOptions { Plugin = "deepwiki" });
            Ok(one.Count == 1 && one[0].Headers["Authorization"] == $"Bearer {sessionK.Token}", "filter or header");
            return new { configs = configs.Select(a => $"{a.ServerName}:{a.AuthMode}:{a.Ready}"), url = one[0].Url };
        });

        // Scenario: the project value of Context7 cleared; McpAsync(RequireReady). Expected: ConnectSetupRequiredError.
        await T("K13", "McpAsync(RequireReady) throws when a server needs setup", async () =>
        {
            await connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["CONTEXT7_API_KEY"] = null });
            try
            {
                var s = await connect.CreateAsync(Uid("k13"));
                return await Rejects<ConnectSetupRequiredError>(() => s.McpAsync(new McpOptions { RequireReady = true }));
            }
            finally { await connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["CONTEXT7_API_KEY"] = "ctx7-test-value-123456" }); }
        });

        await T("K14", "AuthorizeAsync on a no-auth server is refused", () => Rejects<ConnectError>(() => sessionK.AuthorizeAsync("deepwiki", "https://host.example/back")));
        await T("K15", "AuthorizeAsync on an unknown server is 404", () => Rejects<ConnectNotFoundError>(() => sessionK.AuthorizeAsync("no-such-server", "https://host.example/back")));

        Manifest manifestK = null!;
        // Scenario: ManifestAsync, again with its Revision. Expected: NotModified the second time.
        await T("K16", "ManifestAsync and NotModified by revision", async () =>
        {
            manifestK = (await sessionK.ManifestAsync()).Manifest!;
            var again = await sessionK.ManifestAsync(new ManifestQuery { Revision = manifestK.Revision });
            Ok(again.NotModified, "not NotModified");
            return manifestK.Entries.Select(e => $"{e.PluginName}:{e.Scope}:{e.Components.Count}");
        });

        // Scenario: Kinds = [Skill], Plugins = ["ralph-loop"]. Expected: filters apply.
        await T("K17", "ManifestAsync kinds and plugins filters", async () =>
        {
            var skills = (await sessionK.ManifestAsync(new ManifestQuery { Kinds = [FileKind.Skill] })).Manifest!;
            var ralph = (await sessionK.ManifestAsync(new ManifestQuery { Plugins = ["ralph-loop"] })).Manifest!;
            var kinds = skills.Entries.SelectMany(e => e.Components.Select(c => c.Kind)).Distinct().ToList();
            Ok(kinds.All(k => k == FileKind.Skill) && ralph.Entries.All(e => e.PluginName == "ralph-loop"), $"{string.Join(",", kinds)}");
            return kinds;
        });

        // Scenario: ComponentAsync of a known and an unknown hash, and through a handler that flips a byte.
        // Expected: bytes; 404; ConnectIntegrityError.
        await T("K18", "ComponentAsync is checked by hash", async () =>
        {
            var c = manifestK.Entries.SelectMany(e => e.Components).First();
            var bytes = await sessionK.ComponentAsync(c.Sha256);
            Ok(bytes.Length == c.SizeBytes, $"{bytes.Length} != {c.SizeBytes}");
            return bytes.Length;
        });
        await T("K19", "ComponentAsync of an unknown hash is 404", () => Rejects<ConnectNotFoundError>(() => sessionK.ComponentAsync(new string('0', 64))));
        await T("K20", "a changed archive is refused by its hash", async () =>
        {
            var c = manifestK.Entries.SelectMany(e => e.Components).First();
            var evil = new HttpClient(new FlipLastByte(new HttpClientHandler()));
            var s = ConnectSession.FromToken(sessionK.Token, new SessionIdentity(sessionK.Id, sessionK.UserId, sessionK.ExpiresAt), new ConnectClientOptions { BaseUrl = baseUrl, HttpClient = evil });
            return await Rejects<ConnectIntegrityError>(() => s.ComponentAsync(c.Sha256));
        });

        await T("K21", "ReportAsync", async () =>
        {
            var c = manifestK.Entries.SelectMany(e => e.Components).First();
            await sessionK.ReportAsync(new SyncReport { Target = "sdk-test-dotnet", Applied = [new AppliedComponent(c.Id, c.Sha256)] });
            return "accepted";
        });
    }
}
