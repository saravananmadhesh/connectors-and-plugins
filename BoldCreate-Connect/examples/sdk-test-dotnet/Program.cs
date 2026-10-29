// End-to-end test of the .NET SDK (packages/sdk-dotnet) against a running Connect stack.
//
// How to run
//   1. pnpm install && pnpm build && pnpm dev                (from the repo root)
//   2. node examples/sdk-test/setup-local.mjs                (once; publishes plugins, makes keys)
//   3. dotnet run --project examples/sdk-test-dotnet         (this program; .NET 8 or later)
//   Options: SDK_TEST_BASE_URL (default http://localhost:3002, the gateway), SDK_TEST_STATE
//   (default examples/sdk-test/.local/state.json), SDK_TEST_ONLY=A,K (run some groups only).
//   Results: one line per case on stdout and examples/sdk-test/.local/dotnet-results.json.
//
// What it covers: the same groups as examples/sdk-test/run.mjs, with the .NET names, plus what
// only the .NET SDK has (GetSessionAsync with a session cache, ForgetSessionAsync,
// AddBoldCreateConnect for dependency injection, EnumerateAsync paging, CancellationToken).
//   A  options and input checks (offline)   B  keys          C  users       D  sessions
//   E  project plugins                       F  install policy and plugin sets
//   G  auth configs    H  connections        I  logs, usage   J  webhooks
//   K  session self-service ("For you")      L  MCP calls through the session
//   M  file sync       N  For You / Platform keys            O  cancellation, retry
//   P  .NET only: session cache, dependency injection, enumerators
//   Q  one component on or off for one user (Users and session Set/ClearComponentEnabledAsync)
// Every case has its scenario and expected result in the comment above it.
// The keys and the session tokens are never printed.

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

var baseUrl = Environment.GetEnvironmentVariable("SDK_TEST_BASE_URL") ?? "http://localhost:3002";
var root = FindRepoRoot();
var statePath = Environment.GetEnvironmentVariable("SDK_TEST_STATE")
    ?? Path.Combine(root, "examples", "sdk-test", ".local", "state.json");
var only = Environment.GetEnvironmentVariable("SDK_TEST_ONLY")?.Split(',');
var state = JsonNode.Parse(File.ReadAllText(statePath))!.AsObject();
string S(string key) => state[key]?.GetValue<string>() ?? throw new InvalidOperationException($"state has no {key}");
string PluginId(string name) => state["plugins"]![name]!["id"]!.GetValue<string>();
string VersionId(string name) => state["plugins"]![name]!["versionId"]!.GetValue<string>();
var projectKey = S("projectKey");
var forYouKey = S("forYouKey");
var platformKey = S("platformKey");
var webhookSecret = state["webhookSecret"]?.GetValue<string>();
var run = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString("x");
string Uid(string name) => $"net-{run}-{name}";

var results = new List<object>();
using var http = new HttpClient();

async Task T(string id, string title, Func<Task<object?>> body)
{
    var group = new string(id.TakeWhile(char.IsLetter).ToArray());
    if (only is not null && !only.Contains(group)) return;
    var sw = Stopwatch.StartNew();
    try
    {
        var evidence = Short(await body());
        results.Add(new { id, title, result = "pass", evidence, ms = sw.ElapsedMilliseconds });
        Console.WriteLine($"PASS {id} {title}: {evidence}");
    }
    catch (Exception e)
    {
        var evidence = e is ExpectedException ? e.Message : Describe(e);
        results.Add(new { id, title, result = "fail", evidence, ms = sw.ElapsedMilliseconds });
        Console.WriteLine($"FAIL {id} {title}: {evidence}");
    }
}

static string Short(object? value)
{
    var text = value as string ?? JsonSerializer.Serialize(value);
    return text.Length > 400 ? text[..400] : text;
}

static string Describe(Exception e) => e is ConnectError c
    ? $"{c.GetType().Name} code={c.Code} status={c.Status} {c.Message}"
    : $"{e.GetType().Name} {e.Message}";

static void Ok(bool condition, string message)
{
    if (!condition) throw new ExpectedException(message);
}

static async Task<object?> Rejects<TError>(Func<Task> action, string? code = null, int? status = null) where TError : Exception
{
    try
    {
        await action();
    }
    catch (Exception e)
    {
        Ok(e is TError, $"expected {typeof(TError).Name}, got {Describe(e)}");
        if (code is not null) Ok(e is ConnectError c1 && c1.Code == code, $"expected code {code}, got {Describe(e)}");
        if (status is not null) Ok(e is ConnectError c2 && c2.Status == status, $"expected status {status}, got {Describe(e)}");
        return e is ConnectError c ? $"{c.GetType().Name} {c.Code} {c.Status}" : e.GetType().Name;
    }
    throw new ExpectedException("expected an error, the call succeeded");
}

Task<object?> Throws<TError>(Action action, string? code = null) where TError : Exception =>
    Rejects<TError>(() => { action(); return Task.CompletedTask; }, code);

async Task<(int Status, JsonNode? Json, string? McpSession)> Post(string url, IReadOnlyDictionary<string, string> headers, object body, string? mcpSession = null)
{
    using var request = new HttpRequestMessage(HttpMethod.Post, url)
    {
        Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json"),
    };
    foreach (var (name, value) in headers) request.Headers.TryAddWithoutValidation(name, value);
    request.Headers.TryAddWithoutValidation("Accept", "application/json, text/event-stream");
    request.Headers.TryAddWithoutValidation("MCP-Protocol-Version", "2025-06-18");
    if (mcpSession is not null) request.Headers.TryAddWithoutValidation("Mcp-Session-Id", mcpSession);
    using var response = await http.SendAsync(request);
    var text = await response.Content.ReadAsStringAsync();
    var json = text.TrimStart().StartsWith('{') ? JsonNode.Parse(text)
        : text.Split('\n').FirstOrDefault(l => l.StartsWith("data:", StringComparison.Ordinal)) is { } data ? JsonNode.Parse(data[5..]) : null;
    var sid = response.Headers.TryGetValues("Mcp-Session-Id", out var values) ? values.First() : mcpSession;
    return ((int)response.StatusCode, json, sid);
}

async Task<(int Status, JsonNode? Json)> Gateway(HttpMethod method, string path, string token, object? body = null)
{
    using var request = new HttpRequestMessage(method, baseUrl + path);
    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
    request.Headers.TryAddWithoutValidation("Accept", "application/json, text/event-stream");
    if (body is not null) request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
    using var response = await http.SendAsync(request);
    var text = await response.Content.ReadAsStringAsync();
    JsonNode? json = null;
    try { json = string.IsNullOrEmpty(text) ? null : JsonNode.Parse(text.TrimStart().StartsWith('{') ? text : text.Split('\n').First(l => l.StartsWith("data:", StringComparison.Ordinal))[5..]); } catch (JsonException) { }
    return ((int)response.StatusCode, json);
}

object Init() => new { jsonrpc = "2.0", id = 1, method = "initialize", @params = new { protocolVersion = "2025-06-18", capabilities = new { }, clientInfo = new { name = "sdk-test-dotnet", version = "1" } } };
object Rpc(string method, object? p = null) => new { jsonrpc = "2.0", id = Random.Shared.Next(1, 1_000_000), method, @params = p ?? new { } };

var connect = new ConnectClient(new ConnectClientOptions { ApiKey = projectKey, BaseUrl = baseUrl });
ConnectClient Client(string key, Action<ConnectClientOptions>? more = null)
{
    var o = new ConnectClientOptions { ApiKey = key, BaseUrl = baseUrl };
    more?.Invoke(o);
    return new ConnectClient(o);
}

// ─── A. Options and input checks (offline) ───────────────────────────────────────────────────

// Scenario: new ConnectClient with an empty key. Expected: ConnectError invalid_key.
await T("A1", "constructor refuses an empty key", () => Throws<ConnectError>(() => _ = new ConnectClient(new ConnectClientOptions()), "invalid_key"));

// Scenario: BaseUrl http://example.com. Expected: invalid_base_url.
await T("A2", "http base URL on a remote host is refused", () => Throws<ConnectError>(() => _ = Client("prk_x", o => o.BaseUrl = "http://example.com"), "invalid_base_url"));

// Scenario: same with AllowInsecureHttp. Expected: made.
await T("A3", "AllowInsecureHttp lets an http host through", async () =>
{
    using var c = Client("prk_x", o => { o.BaseUrl = "http://example.com"; o.AllowInsecureHttp = true; });
    return await Task.FromResult<object?>(c.BaseUrl);
});

// Scenario: base URL with user:password@. Expected: invalid_base_url.
await T("A4", "base URL with credentials is refused", () => Throws<ConnectError>(() => _ = Client("prk_x", o => o.BaseUrl = "https://u:p@api.example.com"), "invalid_base_url"));

// Scenario: ToString of a client and of a session identity. Expected: no key.
await T("A5", "ToString never shows the key", () =>
{
    var text = connect.ToString();
    Ok(!text.Contains(projectKey, StringComparison.Ordinal), "key shown");
    return Task.FromResult<object?>(text);
});

// Scenario: CreateAsync with Plugins = []. Expected: invalid_plugins.
await T("A6", "CreateAsync refuses an empty plugin list", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("a6"), new CreateSessionOptions { Plugins = [] }), "invalid_plugins"));

// Scenario: user id "" and 256 characters. Expected: invalid_user_id.
await T("A7", "CreateAsync refuses a user id of 0 or 256 characters", async () =>
{
    await Rejects<ConnectError>(() => connect.CreateAsync(""), "invalid_user_id");
    return await Rejects<ConnectError>(() => connect.CreateAsync(new string('x', 256)), "invalid_user_id");
});

// Scenario: IdempotencyKey "has space". Expected: invalid_idempotency_key.
await T("A8", "idempotency key with a space is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("a8"), new CreateSessionOptions { IdempotencyKey = "has space" }), "invalid_idempotency_key"));

// Scenario: Timeout -1 s and Retry.MaxRetries -1. Expected: invalid_option.
await T("A9", "negative timeout and retries are refused", async () =>
{
    await Throws<ConnectError>(() => _ = Client("prk_x", o => o.Timeout = TimeSpan.FromSeconds(-1)), "invalid_option");
    return await Throws<ConnectError>(() => _ = Client("prk_x", o => o.Retry = new RetryOptions { MaxRetries = -1 }), "invalid_option");
});

// Scenario: ConnectSession.FromToken("prk_abc"). Expected: invalid_token.
await T("A10", "FromToken refuses a token that is not stk_", () => Throws<ConnectError>(() => ConnectSession.FromToken("prk_abc", new SessionIdentity("x", "u", DateTimeOffset.UtcNow)), "invalid_token"));

// Scenario: ToMcpConfig standard / vscode / literal. Expected: placeholder unless LiteralToken.
await T("A11", "ToMcpConfig standard, vscode and literal token", () =>
{
    var servers = new[] { new McpServer("a", "https://g/a/mcp", new Dictionary<string, string> { ["Authorization"] = "Bearer stk_secret" }, true, new ConnectSetup(SetupKind.None)) };
    var std = JsonNode.Parse(servers.ToMcpConfig())!;
    var vs = JsonNode.Parse(servers.ToMcpConfig(new McpConfigOptions { Format = McpConfigFormat.Vscode }))!;
    var lit = JsonNode.Parse(servers.ToMcpConfig(new McpConfigOptions { LiteralToken = true }))!;
    Ok(std["mcpServers"]!["a"]!["headers"]!["Authorization"]!.GetValue<string>() == $"Bearer {McpConfig.TokenPlaceholder}", "standard keeps the token");
    Ok(vs["servers"]!["a"] is not null, "vscode shape");
    Ok(lit["mcpServers"]!["a"]!["headers"]!["Authorization"]!.GetValue<string>() == "Bearer stk_secret", "literal");
    return Task.FromResult<object?>(std["mcpServers"]!["a"]!.ToJsonString());
});

// ─── B. Keys ─────────────────────────────────────────────────────────────────────────────────

// Scenario: a made-up prk_ key. Expected: ConnectAuthError 401.
await T("B1", "unknown project key is refused with 401", () => Rejects<ConnectAuthError>(() => Client("prk_notarealkey000000000000").Users.ListAsync(), status: 401));

// Scenario: the project key lists users. Expected: a page.
await T("B2", "project key works on the gateway", async () => (await connect.Users.ListAsync(new UserListOptions { Limit = 1 })).Items.Count);

// Scenario: For You key / Platform key as the client key. Expected: ConnectAuthError.
await T("B3", "For You key cannot call project routes", () => Rejects<ConnectAuthError>(() => Client(forYouKey).Users.ListAsync()));
await T("B4", "Platform key cannot call project routes", () => Rejects<ConnectAuthError>(() => Client(platformKey).Plugins.ListAsync()));

// Scenario: the project key on the api port 3001. Expected: refused.
await T("B5", "project key on the api port is refused", () => Rejects<ConnectAuthError>(() => Client(projectKey, o => o.BaseUrl = "http://localhost:3001").Users.ListAsync()));

// ─── D. Sessions ─────────────────────────────────────────────────────────────────────────────

var userA = Uid("alice");
var userB = Uid("bob");
ConnectSession sessionA = null!;

// Scenario: CreateAsync(userA). Expected: stk_ token, about 30 days.
await T("D1", "create a session for a new user", async () =>
{
    sessionA = await connect.CreateAsync(userA);
    var days = (sessionA.ExpiresAt - DateTimeOffset.UtcNow).TotalDays;
    Ok(sessionA.Token.StartsWith("stk_", StringComparison.Ordinal), "not stk_");
    Ok(days is > 29 and < 31, $"days {days}");
    Ok(!sessionA.ToString().Contains(sessionA.Token, StringComparison.Ordinal), "ToString shows the token");
    return new { sessionA.Id, sessionA.UserId, days = Math.Round(days) };
});

// Scenario: same IdempotencyKey twice. Expected: the same session id.
await T("D2", "same idempotency key gives back the first session", async () =>
{
    var key = $"idem-{run}";
    var one = await connect.CreateAsync(userB, new CreateSessionOptions { IdempotencyKey = key });
    var two = await connect.CreateAsync(userB, new CreateSessionOptions { IdempotencyKey = key });
    Ok(one.Id == two.Id, $"{one.Id} {two.Id}");
    return one.Id;
});

// Scenario: Plugins = ["ralph-loop"]. Expected: manifest has ralph-loop only.
await T("D3", "plugin allow-list narrows the session", async () =>
{
    var s = await connect.CreateAsync(Uid("d3"), new CreateSessionOptions { Plugins = ["ralph-loop"] });
    var names = (await s.ManifestAsync()).Manifest!.Entries.Select(e => e.PluginName).ToList();
    Ok(names.SequenceEqual(["ralph-loop"]), string.Join(",", names));
    return names;
});

// Scenario: Plugins = ["teaching"] (not in the project). Expected: refused.
await T("D4", "allow-list naming a plugin outside the project is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("d4"), new CreateSessionOptions { Plugins = ["teaching"] })));

// Scenario: ExpiresInSeconds 3600. Expected: about an hour.
await T("D5", "ExpiresInSeconds sets the lifetime", async () =>
{
    var s = await connect.CreateAsync(Uid("d5"), new CreateSessionOptions { ExpiresInSeconds = 3600 });
    var minutes = (s.ExpiresAt - DateTimeOffset.UtcNow).TotalMinutes;
    Ok(minutes is > 55 and < 65, $"minutes {minutes}");
    return Math.Round(minutes);
});

// Scenario: 366 days. Expected: refused.
await T("D6", "lifetime over 365 days is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("d6"), new CreateSessionOptions { ExpiresInSeconds = 366 * 86400 })));

// Scenario: Tools = { Disable = ["deepwiki.ask_question"], DisableDestructive = true }. Expected: stored.
await T("D7", "tool policy is stored on the session", async () =>
{
    var s = await connect.CreateAsync(Uid("d7"), new CreateSessionOptions { Tools = new ToolPolicy { Disable = ["deepwiki.ask_question"], DisableDestructive = true } });
    var info = await connect.Sessions.GetAsync(s.Id);
    Ok(info.Tools.Disable?.Contains("deepwiki.ask_question") == true, JsonSerializer.Serialize(info.Tools));
    return info.Tools;
});

// Scenario: Sessions.ListAsync(UserId = userB). Expected: only userB.
await T("D8", "Sessions.ListAsync filters by user", async () =>
{
    var page = await connect.Sessions.ListAsync(new SessionListOptions { UserId = userB });
    Ok(page.Items.Count >= 1 && page.Items.All(s => s.UserId == userB), "other users");
    return page.Items.Select(s => $"{s.UserId}:{s.Status}");
});

// Scenario: Limit 1 then the cursor. Expected: two different ids.
await T("D9", "Sessions.ListAsync pages by cursor", async () =>
{
    var one = await connect.Sessions.ListAsync(new SessionListOptions { Limit = 1 });
    Ok(one.NextCursor is not null, "no cursor");
    var two = await connect.Sessions.ListAsync(new SessionListOptions { Limit = 1, Cursor = one.NextCursor });
    Ok(one.Items[0].Id != two.Items[0].Id, "same item");
    return new[] { one.Items[0].Id, two.Items[0].Id };
});

// Scenario: GetAsync of an unknown id. Expected: ConnectNotFoundError.
await T("D10", "Sessions.GetAsync of an unknown id is 404", () => Rejects<ConnectNotFoundError>(() => connect.Sessions.GetAsync("pjs_00000000000000000000000000000000")));

// Scenario: DeleteAsync, then use the token. Expected: revoked, 401.
await T("D11", "deleting a session ends it at once", async () =>
{
    var s = await connect.CreateAsync(Uid("d11"));
    await connect.Sessions.DeleteAsync(s.Id);
    var info = await connect.Sessions.GetAsync(s.Id);
    var refused = await Rejects<ConnectAuthError>(() => s.ManifestAsync());
    Ok(info.Status == SessionStatus.Revoked, $"{info.Status}");
    return new { info.Status, refused };
});

// Scenario: RefreshAsync. Expected: new id, same user.
await T("D12", "RefreshAsync gives a new session for the same user", async () =>
{
    var fresh = await sessionA.RefreshAsync();
    Ok(fresh.Id != sessionA.Id && fresh.UserId == sessionA.UserId, "not fresh");
    return new { old = sessionA.Id, @new = fresh.Id };
});

// Scenario: RefreshAsync on a FromToken session. Expected: refresh_unavailable.
await T("D13", "RefreshAsync on a FromToken session is refused", () => Rejects<ConnectError>(() => ConnectSession.FromToken(sessionA.Token, new SessionIdentity(sessionA.Id, sessionA.UserId, sessionA.ExpiresAt), new ConnectClientOptions { BaseUrl = baseUrl }).RefreshAsync(), "refresh_unavailable"));

// Scenario: 21 live sessions for one user. Expected: the 21st refused.
await T("D14", "a user can hold at most 20 live sessions", async () =>
{
    var who = Uid("d14");
    var made = 0;
    try
    {
        for (; made < 21; made++) await connect.CreateAsync(who);
    }
    catch (ConnectError e)
    {
        Ok(made == 20, $"refused after {made}: {Describe(e)}");
        return $"refused at #{made + 1}: {e.Code} {e.Status}";
    }
    throw new ExpectedException("21 sessions were made");
});

// ─── C. Users ────────────────────────────────────────────────────────────────────────────────

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

// ─── E. Project plugins ──────────────────────────────────────────────────────────────────────

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

// ─── F. Install policy and plugin sets ───────────────────────────────────────────────────────

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

// ─── G. Auth configs ─────────────────────────────────────────────────────────────────────────

string? context7Component = null;
string? deepwikiComponent = null;

// Scenario: AuthConfigs.ListAsync; component ids from Users.PluginsAsync. Expected: a list.
await T("G1", "AuthConfigs.ListAsync", async () =>
{
    var g = (await connect.CreateAsync(Uid("g"))).UserId;
    var plugins = await connect.Users.PluginsAsync(g);
    context7Component = plugins.First(p => p.Name == "context7").Mcp[0].ComponentId;
    deepwikiComponent = plugins.First(p => p.Name == "deepwiki").Mcp[0].ComponentId;
    var list = await connect.AuthConfigs.ListAsync();
    return new { configs = list.Count, context7Component };
});

// Scenario: SetVariablesAsync(context7, CONTEXT7_API_KEY). Expected: the server is ready for users.
await T("G2", "AuthConfigs.SetVariablesAsync sets a project value", async () =>
{
    await connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["CONTEXT7_API_KEY"] = "ctx7-test-value-123456" });
    var s = await connect.CreateAsync(Uid("g2"));
    var c7 = (await s.AuthConfigsAsync()).First(a => a.ComponentId == context7Component);
    Ok(c7.Ready, $"{c7.Setup}");
    return new { c7.Ready, c7.Setup.Kind };
});

// Scenario: SetVariablesAsync with an invalid name. Expected: 400.
await T("G3b", "AuthConfigs.SetVariablesAsync refuses an invalid name", () => Rejects<ConnectError>(() => connect.AuthConfigs.SetVariablesAsync(context7Component!, new Dictionary<string, string?> { ["bad name!"] = "x" }), status: 400));

// ─── H. Connections ──────────────────────────────────────────────────────────────────────────

await T("H1", "Connections.ListAsync", async () => (await connect.Connections.ListAsync(new ConnectionListOptions { UserId = userA })).Count);
await T("H2", "Connections.StartAsync on a no-auth server is refused", () => Rejects<ConnectError>(() => connect.Connections.StartAsync(userA, deepwikiComponent!, "https://host.example/back")));
await T("H3", "Connections.DeleteAsync of an unknown id is 404", () => Rejects<ConnectNotFoundError>(() => connect.Connections.DeleteAsync("con_00000000000000000000000000000000")));

// ─── I. Logs and usage ───────────────────────────────────────────────────────────────────────

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

// ─── J. Webhooks ─────────────────────────────────────────────────────────────────────────────

string Sign(string secret, string id, string ts, string body) =>
    "v1," + Convert.ToBase64String(HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), Encoding.UTF8.GetBytes($"{id}.{ts}.{body}")));
var sample = JsonSerializer.Serialize(new { id = "evt_1", type = "user.created", createdAt = DateTimeOffset.UtcNow, projectId = S("projectId"), data = new { } });
string Now() => DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
KeyValuePair<string, string?>[] Headers(string id, string ts, string sig) => [new("webhook-id", id), new("webhook-timestamp", ts), new("webhook-signature", sig)];

// Scenario: Verify a good signature / a tampered body / a 301 s old timestamp / two signatures.
// Expected: event / webhook_invalid / webhook_invalid / event.
await T("J1", "Webhooks.Verify accepts a good signature", () =>
{
    Ok(webhookSecret is not null, "no webhook secret in state");
    var ts = Now();
    var e = connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = Headers("m1", ts, Sign(webhookSecret!, "m1", ts, sample)), Secret = webhookSecret! });
    return Task.FromResult<object?>(e.Type);
});
await T("J2", "Webhooks.Verify refuses a tampered body", () =>
{
    var ts = Now();
    return Throws<ConnectError>(() => connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample.Replace("user.created", "user.createe", StringComparison.Ordinal)), Headers = Headers("m1", ts, Sign(webhookSecret!, "m1", ts, sample)), Secret = webhookSecret! }), "webhook_invalid");
});
await T("J3", "Webhooks.Verify refuses an old timestamp", () =>
{
    var ts = (DateTimeOffset.UtcNow.ToUnixTimeSeconds() - 301).ToString();
    return Throws<ConnectError>(() => connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = Headers("m", ts, Sign(webhookSecret!, "m", ts, sample)), Secret = webhookSecret! }), "webhook_invalid");
});
await T("J4", "Webhooks.Verify with several signatures", () =>
{
    var ts = Now();
    var e = connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = [new("Webhook-Id", "m2"), new("Webhook-Timestamp", ts), new("Webhook-Signature", $"{Sign("old", "m2", ts, sample)} {Sign(webhookSecret!, "m2", ts, sample)}")], Secret = webhookSecret! });
    return Task.FromResult<object?>(e.Id);
});

// Scenario: DeliveriesAsync with and without Status. Expected: deliveries, filter applies.
await T("J6", "Webhooks.DeliveriesAsync", async () =>
{
    var page = await connect.Webhooks.DeliveriesAsync(new DeliveryListOptions { Limit = 50 });
    var delivered = await connect.Webhooks.DeliveriesAsync(new DeliveryListOptions { Status = DeliveryStatus.Delivered });
    Ok(page.Items.Count > 0 && delivered.Items.All(d => d.Status == DeliveryStatus.Delivered), "deliveries");
    return new { types = page.Items.Select(d => d.Type).Distinct(), statuses = page.Items.Select(d => d.Status).Distinct() };
});

// Scenario: real deliveries saved by the receiver (SDK_TEST_WEBHOOK_LOG). Expected: all verify.
await T("J7", "a real delivery passes Webhooks.Verify", () =>
{
    var log = Environment.GetEnvironmentVariable("SDK_TEST_WEBHOOK_LOG");
    Ok(log is not null && File.Exists(log), "SDK_TEST_WEBHOOK_LOG not set (no receiver); skipped");
    var types = File.ReadAllLines(log!).Select(l => JsonNode.Parse(l)!).Select(d => connect.Webhooks.Verify(new VerifyWebhookOptions
    {
        RawBody = Encoding.UTF8.GetBytes(d["rawBody"]!.GetValue<string>()),
        Headers = d["headers"]!.AsObject().Select(h => new KeyValuePair<string, string?>(h.Key, h.Value?.ToString())),
        Secret = webhookSecret!,
        ToleranceSeconds = 86400,
    }).Type).Distinct().ToList();
    return Task.FromResult<object?>(types);
});

// ─── K. Session self-service ("For you") ─────────────────────────────────────────────────────

var sessionK = await connect.CreateAsync(Uid("kate"));

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

// ─── L. MCP through the session ──────────────────────────────────────────────────────────────

// Scenario: initialize, tools/list, tools/call on DeepWiki with McpAsync's URL and headers. Expected: answers.
await T("L1", "DeepWiki: initialize, tools/list, tools/call", async () =>
{
    var dw = (await sessionK.McpAsync(new McpOptions { Plugin = "deepwiki" }))[0];
    var init = await Post(dw.Url, dw.Headers, Init());
    Ok(init.Status == 200, $"initialize {init.Status} {init.Json}");
    var list = await Post(dw.Url, dw.Headers, Rpc("tools/list"), init.McpSession);
    var tools = list.Json?["result"]?["tools"]?.AsArray().Select(t => t!["name"]!.GetValue<string>()).ToList() ?? [];
    var call = await Post(dw.Url, dw.Headers, Rpc("tools/call", new { name = tools[0], arguments = new { repoName = "syncfusion/BoldCreate-Plugins" } }), init.McpSession);
    var text = call.Json?["result"]?["content"]?[0]?["text"]?.GetValue<string>();
    Ok(text is not null, $"tools/call {call.Status} {call.Json}");
    return new { tools, answer = text![..Math.Min(60, text.Length)] };
});

// Scenario: a session with Tools.Disable ["deepwiki.ask_question"]. Expected: tools/list hides it.
await T("L2", "session tool policy hides a disabled tool", async () =>
{
    var s = await connect.CreateAsync(Uid("l2"), new CreateSessionOptions { Tools = new ToolPolicy { Disable = ["deepwiki.ask_question"] } });
    var dw = (await s.McpAsync(new McpOptions { Plugin = "deepwiki" }))[0];
    var init = await Post(dw.Url, dw.Headers, Init());
    var list = await Post(dw.Url, dw.Headers, Rpc("tools/list"), init.McpSession);
    var tools = list.Json?["result"]?["tools"]?.AsArray().Select(t => t!["name"]!.GetValue<string>()).ToList() ?? [];
    Ok(!tools.Contains("ask_question") && tools.Count > 0, string.Join(",", tools));
    return tools;
});

// Scenario: Context7 with its project key: tools/call. Expected: answer.
await T("L4", "Context7 tools/call through the session", async () =>
{
    var c7 = (await sessionK.McpAsync(new McpOptions { Plugin = "context7" }))[0];
    var init = await Post(c7.Url, c7.Headers, Init());
    var call = await Post(c7.Url, c7.Headers, Rpc("tools/call", new { name = "resolve-library-id", arguments = new { libraryName = "maui" } }), init.McpSession);
    Ok(call.Json?["result"]?["content"] is not null, $"{call.Status} {call.Json}");
    return call.Json!["result"]!["content"]![0]!["text"]!.GetValue<string>()[..40];
});

// ─── M. File sync ────────────────────────────────────────────────────────────────────────────

var syncRoot = Directory.CreateTempSubdirectory("sdk-net-sync-").FullName;
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

// ─── N. For You and Platform keys ────────────────────────────────────────────────────────────

await T("N1", "SDK session refuses a For You key", () => Throws<ConnectError>(() => ConnectSession.FromToken(forYouKey, new SessionIdentity("fy", "me", DateTimeOffset.UtcNow.AddDays(1))), "invalid_token"));

// Scenario: GET /v1/sync with the For You key. Expected: For team and For me installs.
await T("N2", "For You key: gateway sync shows For team and For me installs", async () =>
{
    var (status, json) = await Gateway(HttpMethod.Get, "/v1/sync", forYouKey);
    var entries = json?["entries"]?.AsArray().Select(e => $"{e!["pluginName"]}:{e["scope"]}").ToList() ?? [];
    Ok(status == 200 && new[] { "cursor-team-kit", "boldcreate-toolkit", "ralph-loop" }.All(n => entries.Any(e => e.StartsWith(n + ":", StringComparison.Ordinal))), $"{status} {string.Join(",", entries)}");
    return entries;
});

await T("N6", "Platform key cannot sync or call MCP", async () =>
{
    var sync = await Gateway(HttpMethod.Get, "/v1/sync", platformKey);
    var mcp = await Gateway(HttpMethod.Post, "/mcp", platformKey, Rpc("tools/list"));
    Ok(sync.Status >= 400 && mcp.Status >= 400, $"{sync.Status} {mcp.Status}");
    return new { sync = sync.Status, mcp = mcp.Status };
});

// ─── O. Cancellation, retry ──────────────────────────────────────────────────────────────────

// Scenario: a cancelled token. Expected: OperationCanceledException (the .NET way), no call.
await T("O1", "a cancelled token stops the call", () =>
{
    using var cts = new CancellationTokenSource();
    cts.Cancel();
    return Rejects<OperationCanceledException>(() => connect.Users.ListAsync(ct: cts.Token));
});

// Scenario: a handler answering 503 twice. Expected: success on the third attempt.
await T("O3", "GET is retried on 503", async () =>
{
    var handler = new FailFirst(2, HttpStatusCode.ServiceUnavailable);
    using var c = Client(projectKey, o => { o.HttpClient = new HttpClient(handler); o.Retry = new RetryOptions { BaseDelay = TimeSpan.FromMilliseconds(10) }; });
    await c.Users.ListAsync(new UserListOptions { Limit = 1 });
    Ok(handler.Calls == 3, $"calls {handler.Calls}");
    return handler.Calls;
});

// Scenario: Timeout 1 ms, no retries. Expected: ConnectError network_error/timeout without the key.
await T("O6", "timeout gives a ConnectError without the key", async () =>
{
    using var c = Client(projectKey, o => { o.Timeout = TimeSpan.FromMilliseconds(1); o.Retry = new RetryOptions { MaxRetries = 0 }; });
    try { await c.UsageAsync(); }
    catch (ConnectError e)
    {
        Ok(!e.Message.Contains(projectKey, StringComparison.Ordinal), "key in message");
        return $"{e.Code} {e.Message}";
    }
    throw new ExpectedException("no timeout");
});

await T("O7", "errors carry a RequestId", async () =>
{
    try { await connect.Sessions.GetAsync("pjs_00000000000000000000000000000000"); }
    catch (ConnectError e)
    {
        Ok(!string.IsNullOrEmpty(e.RequestId), "no request id");
        return e.RequestId;
    }
    throw new ExpectedException("no error");
});

// ─── P. .NET only ────────────────────────────────────────────────────────────────────────────

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

// ─── Q. One component on or off for one user ─────────────────────────────────────────────────

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

// ─── Summary ─────────────────────────────────────────────────────────────────────────────────

var passed = results.Count(r => JsonSerializer.Serialize(r).Contains("\"result\":\"pass\"", StringComparison.Ordinal));
Console.WriteLine($"\n{passed}/{results.Count} passed");
var outFile = Path.Combine(root, "examples", "sdk-test", ".local", "dotnet-results.json");
Directory.CreateDirectory(Path.GetDirectoryName(outFile)!);
await File.WriteAllTextAsync(outFile, JsonSerializer.Serialize(new { run, @base = baseUrl, results }, new JsonSerializerOptions { WriteIndented = true }));
return passed == results.Count ? 0 : 1;

static string FindRepoRoot()
{
    var dir = new DirectoryInfo(AppContext.BaseDirectory);
    while (dir is not null && !File.Exists(Path.Combine(dir.FullName, "pnpm-workspace.yaml"))) dir = dir.Parent;
    return dir?.FullName ?? Directory.GetCurrentDirectory();
}

sealed class ExpectedException(string message) : Exception(message);

/// <summary>Flips the last byte of a component download, to check the hash guard.</summary>
sealed class FlipLastByte(HttpMessageHandler inner) : DelegatingHandler(inner)
{
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var response = await base.SendAsync(request, cancellationToken);
        if (request.RequestUri!.AbsolutePath.Contains("/v1/sync/components/", StringComparison.Ordinal))
        {
            var bytes = await response.Content.ReadAsByteArrayAsync(cancellationToken);
            bytes[^1] ^= 1;
            var content = new ByteArrayContent(bytes);
            foreach (var h in response.Content.Headers) content.Headers.TryAddWithoutValidation(h.Key, h.Value);
            response.Content = content;
        }
        return response;
    }
}

/// <summary>Answers the first <c>count</c> calls with <c>status</c>, then passes through.</summary>
sealed class FailFirst(int count, HttpStatusCode status) : DelegatingHandler(new HttpClientHandler())
{
    public int Calls { get; private set; }

    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) =>
        ++Calls <= count ? Task.FromResult(new HttpResponseMessage(status)) : base.SendAsync(request, cancellationToken);
}
