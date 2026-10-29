// Shared helpers for the .NET SDK cases in Cases/. Not a test file.
//
// Reads the keys that setup-local.mjs wrote, makes the project client, records each case (T), and
// holds what several groups share: the user that group D makes (userA), the session "kate" (groups
// K, L and P), and the folder the sync groups use. A group run on its own makes these itself.
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

namespace SdkTest;

internal static class Lib
{
    public static readonly string baseUrl = Environment.GetEnvironmentVariable("SDK_TEST_BASE_URL") ?? "http://localhost:3002";
    public static readonly string root = FindRepoRoot();
    public static readonly string statePath = Environment.GetEnvironmentVariable("SDK_TEST_STATE")
        ?? Path.Combine(root, "examples", "sdk-test", ".local", "state.json");
    public static readonly string[]? only = Environment.GetEnvironmentVariable("SDK_TEST_ONLY")?.Split(',');
    public static readonly JsonObject state = JsonNode.Parse(File.ReadAllText(statePath))!.AsObject();
    public static string S(string key) => state[key]?.GetValue<string>() ?? throw new InvalidOperationException($"state has no {key}");
    public static string PluginId(string name) => state["plugins"]![name]!["id"]!.GetValue<string>();
    public static string VersionId(string name) => state["plugins"]![name]!["versionId"]!.GetValue<string>();
    public static readonly string projectKey = S("projectKey");
    public static readonly string forYouKey = S("forYouKey");
    public static readonly string platformKey = S("platformKey");
    public static readonly string? webhookSecret = state["webhookSecret"]?.GetValue<string>();
    public static readonly string run = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString("x");
    public static string Uid(string name) => $"net-{run}-{name}";

    public static readonly List<object> results = new List<object>();
    public static readonly HttpClient http = new();

    public static async Task T(string id, string title, Func<Task<object?>> body)
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

    public static string Short(object? value)
    {
        var text = value as string ?? JsonSerializer.Serialize(value);
        return text.Length > 400 ? text[..400] : text;
    }

    public static string Describe(Exception e) => e is ConnectError c
        ? $"{c.GetType().Name} code={c.Code} status={c.Status} {c.Message}"
        : $"{e.GetType().Name} {e.Message}";

    public static void Ok(bool condition, string message)
    {
        if (!condition) throw new ExpectedException(message);
    }

    public static async Task<object?> Rejects<TError>(Func<Task> action, string? code = null, int? status = null) where TError : Exception
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

    public static Task<object?> Throws<TError>(Action action, string? code = null) where TError : Exception =>
        Rejects<TError>(() => { action(); return Task.CompletedTask; }, code);

    public static async Task<(int Status, JsonNode? Json, string? McpSession)> Post(string url, IReadOnlyDictionary<string, string> headers, object body, string? mcpSession = null)
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

    public static async Task<(int Status, JsonNode? Json)> Gateway(HttpMethod method, string path, string token, object? body = null)
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

    public static object Init() => new { jsonrpc = "2.0", id = 1, method = "initialize", @params = new { protocolVersion = "2025-06-18", capabilities = new { }, clientInfo = new { name = "sdk-test-dotnet", version = "1" } } };
    public static object Rpc(string method, object? p = null) => new { jsonrpc = "2.0", id = Random.Shared.Next(1, 1_000_000), method, @params = p ?? new { } };

    public static readonly ConnectClient connect = new ConnectClient(new ConnectClientOptions { ApiKey = projectKey, BaseUrl = baseUrl });
    public static ConnectClient Client(string key, Action<ConnectClientOptions>? more = null)
    {
        var o = new ConnectClientOptions { ApiKey = key, BaseUrl = baseUrl };
        more?.Invoke(o);
        return new ConnectClient(o);
    }

    // ─── What several groups share ─────────────────────────────────────────────────────────────

    /// <summary>The host user most groups act on. Group D creates it; others create it if D did not run.</summary>
    public static readonly string userA = Uid("alice");
    private static readonly HashSet<string> KnownUsers = [];
    public static void MarkUser(string userId) => KnownUsers.Add(userId);
    public static async Task EnsureUser(string userId)
    {
        if (KnownUsers.Contains(userId)) return;
        await connect.CreateAsync(userId);
        KnownUsers.Add(userId);
    }

    private static readonly Dictionary<string, ConnectSession> Sessions = [];
    /// <summary>One session per name, shared by the groups that use it.</summary>
    public static async Task<ConnectSession> SharedSession(string name)
    {
        if (!Sessions.TryGetValue(name, out var session))
        {
            session = await connect.CreateAsync(Uid(name));
            Sessions[name] = session;
        }
        return session;
    }

    private static (string Context7, string DeepWiki)? components;
    /// <summary>The Context7 and DeepWiki server components (groups H and K use them).</summary>
    public static async Task<(string Context7, string DeepWiki)> McpComponents()
    {
        if (components is null)
        {
            var plugins = await connect.Users.PluginsAsync((await connect.CreateAsync(Uid("g"))).UserId);
            components = (plugins.First(p => p.Name == "context7").Mcp[0].ComponentId, plugins.First(p => p.Name == "deepwiki").Mcp[0].ComponentId);
        }
        return components.Value;
    }

    /// <summary>
    /// The folder the sync groups (M, Q) write the synced plugin files into. By default a temporary
    /// folder deleted when the run ends. Set SDK_TEST_SYNC_DIR to keep the files: each run then
    /// writes to &lt;SDK_TEST_SYNC_DIR&gt;/net-&lt;run id&gt;/, one subfolder per case.
    /// </summary>
    public static readonly string? keepSync = Environment.GetEnvironmentVariable("SDK_TEST_SYNC_DIR");
    public static readonly string syncRoot = keepSync is { Length: > 0 }
        ? Directory.CreateDirectory(Path.Combine(Path.GetFullPath(keepSync), $"net-{run}")).FullName
        : Directory.CreateTempSubdirectory("sdk-net-sync-").FullName;

    public static string FindRepoRoot()
    {
        var dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir is not null && !File.Exists(Path.Combine(dir.FullName, "pnpm-workspace.yaml"))) dir = dir.Parent;
        return dir?.FullName ?? Directory.GetCurrentDirectory();
    }
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
