// End-to-end test of the .NET SDK (packages/sdk-dotnet) against a running Connect stack.
// The cases live in Cases/, one file per group; this program runs them in order.
//
// How to run (from the repo root)
//   1. pnpm install && pnpm build && pnpm dev                (in its own terminal)
//   2. node examples/sdk-test/setup-local.mjs                (once; publishes plugins, makes keys)
//   3. dotnet run --project examples/sdk-test-dotnet         every group (.NET 8 or later)
//      dotnet run --project examples/sdk-test-dotnet -- K M  only groups K and M
//   Options: SDK_TEST_BASE_URL (default http://localhost:3002, the gateway), SDK_TEST_STATE
//   (default examples/sdk-test/.local/state.json), SDK_TEST_ONLY=A,K (another way to pick groups),
//   SDK_TEST_WEBHOOK_LOG (deliveries your webhook receiver saved, checked in J7), and
//   SDK_TEST_SYNC_DIR (keep the files groups M and Q sync, under <dir>/net-<run id>/).
//   Results: one line per case, then "<passed>/<total> passed". A full run writes
//   examples/sdk-test/.local/dotnet-results.json; a partial run writes dotnet-results-<groups>.json.
//
// Groups (file in Cases/), the same as examples/sdk-test/run.mjs with the .NET names:
//   A  AOptions.cs        options and input checks (offline)
//   B  BKeys.cs           project, wrong, For You and Platform keys
//   D  DSessions.cs       sessions (runs before C: C, H, I and P act on the user D makes)
//   C  CUsers.cs          users
//   E  EProjectPlugins.cs project plugins
//   F  FInstallPolicy.cs  install mode, allow-list, plugin sets
//   G  GAuthConfigs.cs    auth configs
//   H  HConnections.cs    connections
//   I  ILogsUsage.cs      logs and usage
//   J  JWebhooks.cs       webhooks
//   K  KSession.cs        session self-service ("For you"), manifest and component download
//   L  LMcp.cs            MCP calls through the session
//   M  MSync.cs           file sync with SyncPluginsAsync
//   N  NForYouPlatformKeys.cs  For You and Platform keys on the gateway
//   O  ORetryCancel.cs    cancellation, retry
//   P  PDotnetOnly.cs     .NET only: session cache, dependency injection, enumerators
//   Q  QComponents.cs     one component on or off for one user
// Expected result: every case passes, except the findings the test report lists as open.
// The keys and the session tokens are never printed.

using System.Text.Json;
using SdkTest.Cases;
using static SdkTest.Lib;

var groups = new Dictionary<string, Func<Task>>
{
    ["A"] = GroupAOptions.Run,
    ["B"] = GroupBKeys.Run,
    ["D"] = GroupDSessions.Run,
    ["C"] = GroupCUsers.Run,
    ["E"] = GroupEProjectPlugins.Run,
    ["F"] = GroupFInstallPolicy.Run,
    ["G"] = GroupGAuthConfigs.Run,
    ["H"] = GroupHConnections.Run,
    ["I"] = GroupILogsUsage.Run,
    ["J"] = GroupJWebhooks.Run,
    ["K"] = GroupKSession.Run,
    ["L"] = GroupLMcp.Run,
    ["M"] = GroupMSync.Run,
    ["N"] = GroupNForYouPlatformKeys.Run,
    ["O"] = GroupORetryCancel.Run,
    ["P"] = GroupPDotnetOnly.Run,
    ["Q"] = GroupQComponents.Run,
};

var picked = args.Select(a => a.ToUpperInvariant()).ToList();
var unknown = picked.Where(g => !groups.ContainsKey(g)).ToList();
if (unknown.Count > 0)
{
    Console.Error.WriteLine($"Unknown group {string.Join(", ", unknown)}; use {string.Join(" ", groups.Keys)}");
    return 2;
}
foreach (var name in picked.Count > 0 ? picked : [.. groups.Keys]) await groups[name]();

var passed = results.Count(r => JsonSerializer.Serialize(r).Contains("\"result\":\"pass\"", StringComparison.Ordinal));
Console.WriteLine($"\n{passed}/{results.Count} passed");
var ran = string.Concat(results.Select(r => JsonSerializer.SerializeToNode(r)!["id"]!.GetValue<string>().TakeWhile(char.IsLetter)).Select(c => new string([.. c])).Distinct()).ToLowerInvariant();
var file = picked.Count == 0 && only is null ? "dotnet-results.json" : $"dotnet-results-{ran}.json";
var outFile = Path.Combine(root, "examples", "sdk-test", ".local", file);
Directory.CreateDirectory(Path.GetDirectoryName(outFile)!);
await File.WriteAllTextAsync(outFile, JsonSerializer.Serialize(new { run, @base = baseUrl, results }, new JsonSerializerOptions { WriteIndented = true }));
if (keepSync is { Length: > 0 }) Console.WriteLine($"synced files kept in {syncRoot}");
else try { Directory.Delete(syncRoot, true); } catch (IOException) { }
return passed == results.Count ? 0 : 1;
