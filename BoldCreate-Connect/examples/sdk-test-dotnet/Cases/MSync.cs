// Group M: File sync.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- M        this group only
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

internal static class GroupMSync
{
    public static async Task Run()
    {
        static List<string> Tree(string dir) => Directory.Exists(dir)
            ? Directory.GetFiles(dir, "*", SearchOption.AllDirectories).Select(f => Path.GetRelativePath(dir, f).Replace('\\', '/')).ToList()
            : [];
        var sessionM = await connect.CreateAsync(Uid("mia"));
        var dirM = Path.Combine(syncRoot, "mia");

        // Scenario: SyncPluginsAsync on an empty folder. Expected: added, hooks skipped, no token on disk.
        await T("M1", "first sync places files, skips hooks", async () =>
        {
            var r = await sessionM.SyncPluginsAsync(new SyncOptions { Dir = dirM });
            var leaked = Tree(dirM).Any(f => File.ReadAllText(Path.Combine(dirM, f)).Contains(sessionM.Token, StringComparison.Ordinal));
            Ok(r.Added.Count > 0 && r.Skipped.Count > 0 && !leaked, $"added {r.Added.Count} skipped {r.Skipped.Count} leaked {leaked}");
            return new { added = r.Added.Count, skipped = r.Skipped.Select(s => $"{s.PluginName}/{s.Name}:{s.Reason}"), files = Tree(dirM).Count };
        });

        await T("M2", "second sync changes nothing", async () =>
        {
            var r = await sessionM.SyncPluginsAsync(new SyncOptions { Dir = dirM });
            Ok(r.Added.Count + r.Updated.Count + r.Removed.Count == 0, $"{r.Added.Count}/{r.Updated.Count}/{r.Removed.Count}");
            return r.Unchanged.Count;
        });

        // Scenario: AllowHooks. Expected: hooks placed with the scripts they run.
        await T("M3", "AllowHooks places hooks and their scripts", async () =>
        {
            var r = await sessionM.SyncPluginsAsync(new SyncOptions { Dir = dirM, AllowHooks = true });
            var ralph = Tree(Path.Combine(dirM, "ralph-loop"));
            Ok(r.Added.Any(c => c.Kind == FileKind.Hook), "no hooks added");
            Ok(ralph.Any(f => f.EndsWith(".sh", StringComparison.Ordinal)), $"ralph-loop hook scripts missing: {string.Join(",", ralph.Where(f => f.Contains("hook", StringComparison.Ordinal)))}");
            return ralph;
        });

        // Scenario: the same folder read by the TypeScript SDK's lock rules: .connect/ lock exists, one per folder.
        await T("M4", "toolkit skills, agents and rules on disk", () =>
        {
            var kit = Tree(Path.Combine(dirM, "boldcreate-toolkit"));
            var skills = kit.Where(f => f.StartsWith("skills/", StringComparison.Ordinal)).Select(f => f.Split('/')[1]).Distinct().Count();
            Ok(skills >= 10, $"skills {skills}");
            return Task.FromResult<object?>(new { skills, agents = kit.Count(f => f.StartsWith("agents/", StringComparison.Ordinal)), rules = kit.Count(f => f.StartsWith("rules/", StringComparison.Ordinal)), lockDir = Directory.GetFiles(Path.Combine(dirM, ".connect")).Select(Path.GetFileName) });
        });

        // Scenario: fresh folder; install teaching, sync, edit a file, remove teaching, sync (Skip) then
        // sync (Overwrite). Expected: kept + listed in Modified; then removed.
        var dirC = Path.Combine(syncRoot, "conflict");
        var sessionC = await connect.CreateAsync(Uid("cara"));
        await T("M5", "a hand-edited file is kept on conflict (Skip), removed on Overwrite", async () =>
        {
            await sessionC.Plugins.InstallAsync(PluginId("teaching"));
            await sessionC.SyncPluginsAsync(new SyncOptions { Dir = dirC });
            var target = Path.Combine(dirC, "teaching", Tree(Path.Combine(dirC, "teaching"))[0]);
            await File.WriteAllTextAsync(target, "edited by hand\n");
            await sessionC.Plugins.RemoveAsync(PluginId("teaching"));
            var skip = await sessionC.SyncPluginsAsync(new SyncOptions { Dir = dirC });
            var kept = File.Exists(target) && await File.ReadAllTextAsync(target) == "edited by hand\n";
            var over = await sessionC.SyncPluginsAsync(new SyncOptions { Dir = dirC, OnConflict = ConflictMode.Overwrite });
            var left = Tree(Path.Combine(dirC, "teaching"));
            Ok(kept && skip.Modified.Count == 1 && left.Count == 0, $"kept {kept} modified {skip.Modified.Count} left {left.Count}");
            return new { modified = skip.Modified.Count, removedOnOverwrite = over.Removed.Count };
        });

        // Scenario (same bug as the TS case M13): sync with AllowHooks, install teaching, sync without
        // AllowHooks, remove teaching, sync. Expected: teaching's files removed.
        await T("M13", "a removed plugin is removed after a hook-skipping sync", async () =>
        {
            var d = Path.Combine(syncRoot, "revision");
            var s = await connect.CreateAsync(Uid("m13"));
            await s.SyncPluginsAsync(new SyncOptions { Dir = d, AllowHooks = true });
            await s.Plugins.InstallAsync(PluginId("teaching"));
            var placed = await s.SyncPluginsAsync(new SyncOptions { Dir = d });
            await s.Plugins.RemoveAsync(PluginId("teaching"));
            var r = await s.SyncPluginsAsync(new SyncOptions { Dir = d });
            var left = Tree(Path.Combine(d, "teaching"));
            Ok(left.Count == 0, $"teaching files left: {left.Count}; the second sync skipped {placed.Skipped.Count} hooks; the last sync removed {r.Removed.Count}, unchanged {r.Unchanged.Count}");
            return r.Removed.Count;
        });

        await T("M7", "sync Kinds filter", async () =>
        {
            var s = await connect.CreateAsync(Uid("m7"));
            var r = await s.SyncPluginsAsync(new SyncOptions { Dir = Path.Combine(syncRoot, "rules"), Kinds = [FileKind.Rule] });
            Ok(r.Added.Count > 0 && r.Added.All(c => c.Kind == FileKind.Rule), "kinds");
            return r.Added.Select(c => $"{c.PluginName}/{c.Name}");
        });

        await T("M8", "sync Plugins filter", async () =>
        {
            var s = await connect.CreateAsync(Uid("m8"));
            var r = await s.SyncPluginsAsync(new SyncOptions { Dir = Path.Combine(syncRoot, "ctk"), Plugins = ["cursor-team-kit"] });
            Ok(r.Added.Count > 0 && r.Added.All(c => c.PluginName == "cursor-team-kit"), "plugins");
            return r.Added.Count;
        });

        await T("M9", "a folder of another user is refused", async () =>
        {
            var other = await connect.CreateAsync(Uid("m9"));
            return await Rejects<ConnectError>(() => other.SyncPluginsAsync(new SyncOptions { Dir = dirM }), "lock_owner_mismatch");
        });

        await T("M10", "unreachable server gives Stale and leaves files", async () =>
        {
            var before = Tree(dirM).Count;
            var dead = ConnectSession.FromToken(sessionM.Token, new SessionIdentity(sessionM.Id, sessionM.UserId, sessionM.ExpiresAt),
                new ConnectClientOptions { BaseUrl = "http://127.0.0.1:9", Retry = new RetryOptions { MaxRetries = 0 }, Timeout = TimeSpan.FromSeconds(2) });
            var r = await dead.SyncPluginsAsync(new SyncOptions { Dir = dirM });
            Ok(r.Stale && Tree(dirM).Count == before, $"stale {r.Stale}");
            return new { r.Stale, files = before };
        });

        // Scenario: the TypeScript SDK and the .NET SDK sync the same folder one after the other (shared
        // lock file). Expected: the second one finds everything unchanged. Needs node on PATH.
        await T("M14", "a folder synced by .NET is read as unchanged by the TypeScript SDK", async () =>
        {
            var d = Path.Combine(syncRoot, "shared");
            var s = await connect.CreateAsync(Uid("m14"));
            var first = await s.SyncPluginsAsync(new SyncOptions { Dir = d });
            var script = Path.Combine(syncRoot, "ts-sync.mjs");
            var sdk = new Uri(Path.Combine(root, "packages", "sdk", "dist", "index.js")).AbsoluteUri;
            var sync = new Uri(Path.Combine(root, "packages", "sdk", "dist", "sync.js")).AbsoluteUri;
            await File.WriteAllTextAsync(script, $$"""
                import { ConnectSession } from '{{sdk}}';
                import { syncPlugins } from '{{sync}}';
                const s = ConnectSession.fromToken(process.env.T, JSON.parse(process.env.I), { baseUrl: process.env.B });
                const r = await syncPlugins(s, { dir: process.env.D });
                process.stdout.write(JSON.stringify({ added: r.added.length, updated: r.updated.length, removed: r.removed.length, unchanged: r.unchanged.length, modified: r.modified.length }));
                """);
            var psi = new ProcessStartInfo("node", script) { RedirectStandardOutput = true, RedirectStandardError = true };
            psi.Environment["T"] = s.Token;
            psi.Environment["I"] = JsonSerializer.Serialize(new { id = s.Id, userId = s.UserId, expiresAt = s.ExpiresAt });
            psi.Environment["B"] = baseUrl;
            psi.Environment["D"] = d;
            using var p = Process.Start(psi)!;
            var output = await p.StandardOutput.ReadToEndAsync();
            var error = await p.StandardError.ReadToEndAsync();
            await p.WaitForExitAsync();
            Ok(p.ExitCode == 0, $"node exit {p.ExitCode}: {error}");
            var ts = JsonNode.Parse(output)!;
            Ok(ts["added"]!.GetValue<int>() == 0 && ts["modified"]!.GetValue<int>() == 0 && ts["removed"]!.GetValue<int>() == 0, $".NET added {first.Added.Count}, then TS {output}");
            return new { dotnetAdded = first.Added.Count, ts = output };
        });

        try { Directory.Delete(syncRoot, true); } catch (IOException) { }
    }
}
