using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

public class ClientTests
{
    private const string Key = "prk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";

    private static (ConnectClient Client, FakeConnectHandler Handler, List<TimeSpan> Delays) Make()
    {
        var handler = new FakeConnectHandler();
        var delays = new List<TimeSpan>();
        var client = new ConnectClient(new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            HttpClient = new HttpClient(handler),
            Delay = (span, _) =>
            {
                delays.Add(span);
                return Task.CompletedTask;
            },
        });
        return (client, handler, delays);
    }

    private static string Items(string item, string cursor) => "{\"items\":[" + item + "],\"nextCursor\":" + cursor + "}";

    private const string PluginJson =
        """{"pluginId":"plg_1","name":"n","displayName":"N","versionId":"ver_1","version":"1.0.0","createdAt":"2026-01-01T00:00:00Z","updatedAt":"2026-01-01T00:00:00Z"}""";

    [Fact]
    public void Requires_an_api_key() =>
        Assert.Equal("invalid_key", Assert.Throws<ConnectError>(() => new ConnectClient(new ConnectClientOptions())).Code);

    [Fact]
    public void Printing_never_shows_the_key()
    {
        var (client, _, _) = Make();
        Assert.DoesNotContain("prk_", client.ToString());
    }

    [Fact]
    public async Task Sends_the_bearer_key_and_builds_the_query()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, """{"items":[],"nextCursor":null}""");
        await client.Users.ListAsync(new UserListOptions { UserId = "a b", Limit = 5, Search = null });
        var request = handler.Calls[0].Request;
        Assert.Equal($"Bearer {Key}", request.Headers.Authorization!.ToString());
        Assert.Equal("https://api.test/v1/project/users?limit=5&userId=a%20b", request.RequestUri!.AbsoluteUri);
    }

    [Fact]
    public async Task Retries_reads_on_429_502_503_and_honors_retry_after()
    {
        var (client, handler, delays) = Make();
        handler.Enqueue((HttpStatusCode)429, null, r => r.Headers.Add("Retry-After", "2"));
        handler.Enqueue(HttpStatusCode.BadGateway);
        handler.Enqueue(HttpStatusCode.OK, """{"items":[],"nextCursor":null}""");
        await client.Plugins.ListAsync();
        Assert.Equal(3, handler.Calls.Count);
        Assert.Equal([TimeSpan.FromSeconds(2), TimeSpan.FromMilliseconds(500)], delays);
    }

    [Fact]
    public async Task Gives_up_after_three_retries_and_maps_rate_limit()
    {
        var (client, handler, _) = Make();
        handler.Default = _ => FakeConnectHandler.Reply((HttpStatusCode)429, """{"error":{"code":"rate_limited","message":"slow down","requestId":"req_1"}}""",
            r => r.Headers.Add("Retry-After", "7"));
        var error = await Assert.ThrowsAsync<ConnectRateLimitError>(() => client.Plugins.ListAsync());
        Assert.Equal(4, handler.Calls.Count);
        Assert.Equal(7, error.RetryAfterSeconds);
        Assert.Equal("req_1", error.RequestId);
        Assert.Equal("rate_limited", error.Code);
    }

    [Fact]
    public async Task Retries_idempotent_writes_and_posts_with_a_key_but_never_a_bare_post()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.ServiceUnavailable);
        handler.Enqueue(HttpStatusCode.OK, PluginJson);
        await client.Users.InstallAsync("u1", "plg_1");
        Assert.Equal(2, handler.Calls.Count);

        // A session creation carries an idempotency key, so the API answers a repeat with the first answer.
        handler.Calls.Clear();
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.ServiceUnavailable, null);
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.CreateAsync("u1"));
        Assert.Equal(503, error.Status);
        Assert.Equal(4, handler.Calls.Count);
        Assert.Single(handler.Calls.Select(c => c.Request.Headers.GetValues("Idempotency-Key").Single()).Distinct());

        // A POST without a key is never repeated.
        var session = ConnectSession.FromToken("stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz",
            new SessionIdentity("s", "u1", DateTimeOffset.UtcNow.AddDays(1)),
            new ConnectClientOptions { BaseUrl = "https://api.test", HttpClient = new HttpClient(handler) });
        handler.Calls.Clear();
        await Assert.ThrowsAsync<ConnectError>(() => session.ReportAsync(new SyncReport { Applied = [] }));
        Assert.Single(handler.Calls);
    }

    [Fact]
    public async Task Does_not_retry_other_failures_and_maps_classes()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Unauthorized, """{"error":{"code":"invalid_key","message":"bad"}}""");
        await Assert.ThrowsAsync<ConnectAuthError>(() => client.Plugins.ListAsync());
        handler.Enqueue(HttpStatusCode.NotFound, "not json");
        var missing = await Assert.ThrowsAsync<ConnectNotFoundError>(() => client.Sessions.GetAsync("ses_1"));
        Assert.Equal("http_404", missing.Code);
        Assert.Equal(2, handler.Calls.Count);
    }

    [Fact]
    public async Task Redacts_keys_in_messages()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.BadRequest, "{\"error\":{\"code\":\"x\",\"message\":\"bad " + Key + "\"}}");
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        Assert.Contains("prk_0123456789abcdef.[redacted]", error.Message);
        Assert.DoesNotContain("abcdefghijklmnopqrstuvwxyz", error.Message);
    }

    [Fact]
    public async Task Maps_a_network_failure_and_keeps_caller_cancellation()
    {
        var (client, handler, _) = Make();
        handler.Default = _ => throw new HttpRequestException("boom");
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Sessions.DeleteAsync("ses_1"));
        Assert.Equal("network_error", error.Code);
        Assert.Equal(4, handler.Calls.Count);

        using var cancelled = new CancellationTokenSource();
        await cancelled.CancelAsync();
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() => client.Plugins.ListAsync(cancelled.Token));
    }

    [Fact]
    public async Task Pages_by_cursor_with_limit_100()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, Items(PluginJson, "\"c1\""));
        handler.Enqueue(HttpStatusCode.OK, Items(PluginJson, "null"));
        var all = await client.Plugins.ListAsync();
        Assert.Equal(2, all.Count);
        Assert.Equal("https://api.test/v1/project/plugins?limit=100", handler.Calls[0].Request.RequestUri!.ToString());
        Assert.Equal("https://api.test/v1/project/plugins?limit=100&cursor=c1", handler.Calls[1].Request.RequestUri!.ToString());
    }

    [Fact]
    public async Task Streams_pages_lazily()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, Items(PluginJson, "\"c1\""));
        await foreach (var _ in client.Plugins.EnumerateAsync()) break;
        Assert.Single(handler.Calls);
    }

    [Fact]
    public async Task Install_sends_the_user_in_the_body_and_uninstall_in_the_query()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, PluginJson);
        handler.Enqueue(HttpStatusCode.NoContent);
        await client.Users.InstallAsync("u 1", "plg/1", new InstallOptions { VersionId = "ver_2" });
        await client.Users.UninstallAsync("u 1", "plg/1");
        Assert.Equal("""{"userId":"u 1","versionId":"ver_2"}""", handler.Calls[0].Body);
        Assert.Equal("https://api.test/v1/project/user-plugins/plg%2F1", handler.Calls[0].Request.RequestUri!.AbsoluteUri);
        Assert.Equal("https://api.test/v1/project/user-plugins/plg%2F1?userId=u%201", handler.Calls[1].Request.RequestUri!.AbsoluteUri);
        Assert.Equal(HttpMethod.Delete, handler.Calls[1].Request.Method);
    }

    [Fact]
    public async Task Set_variables_sends_nulls_to_clear()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.NoContent);
        await client.AuthConfigs.SetVariablesAsync("cmp_1", new Dictionary<string, string?> { ["A"] = "1", ["B"] = null });
        Assert.Equal("""{"values":{"A":"1","B":null}}""", handler.Calls[0].Body);
    }

    [Fact]
    public async Task Catalog_policy_uses_wire_names()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, """{"mode":"allowlist"}""");
        handler.Enqueue(HttpStatusCode.OK, "{}");
        Assert.Equal(InstallMode.Allowlist, await client.Catalog.ModeAsync());
        await client.Catalog.SetModeAsync(InstallMode.Any);
        Assert.Equal("""{"mode":"any"}""", handler.Calls[1].Body);
        await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => client.Catalog.SetModeAsync(InstallMode.Unknown));
    }

    [Fact]
    public async Task Catalog_query_flags_are_text()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, """{"items":[],"total":0,"page":1,"pageSize":20}""");
        await client.Plugins.CatalogAsync(new CatalogQuery { Featured = true, Kind = PluginKind.Mcp, Sort = CatalogSort.Recent, Direction = SortDirection.Desc });
        Assert.Equal("https://api.test/v1/project/catalog?kind=mcp&featured=true&sort=recent&direction=desc",
            handler.Calls[0].Request.RequestUri!.ToString());
    }

    [Fact]
    public async Task Logs_and_usage_send_iso_dates()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, """{"items":[],"nextCursor":null}""");
        handler.Enqueue(HttpStatusCode.OK, """{"from":"2026-01-01T00:00:00Z","to":"2026-01-02T00:00:00Z","days":[],"topUsers":[]}""");
        var from = new DateTimeOffset(2026, 1, 1, 2, 0, 0, TimeSpan.FromHours(2));
        await client.Logs.ListAsync(new LogListOptions { From = from });
        await client.UsageAsync(new UsageOptions { To = from });
        Assert.EndsWith("from=2026-01-01T00%3A00%3A00.000Z", handler.Calls[0].Request.RequestUri!.Query);
        Assert.EndsWith("to=2026-01-01T00%3A00%3A00.000Z", handler.Calls[1].Request.RequestUri!.Query);
    }

    [Fact]
    public async Task Start_connection_returns_the_address()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK, """{"connectUrl":"https://c/x","expiresAt":"2026-01-01T00:00:00Z"}""");
        var started = await client.Connections.StartAsync("u", "cmp_1", "https://cb");
        Assert.Equal("https://c/x", started.ConnectUrl);
        Assert.Equal("""{"userId":"u","componentId":"cmp_1","callbackUrl":"https://cb"}""", handler.Calls[0].Body);
    }

    [Fact]
    public async Task Unknown_enum_values_read_as_unknown()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.OK,
            """{"items":[{"id":"1","userId":"u","displayName":"d","status":"archived","createdAt":"2026-01-01T00:00:00Z","lastSeenAt":null,"sessionCount":1,"connectionCount":0,"lastSyncedAt":null,"connectionsMissing":0}],"nextCursor":null}""");
        var page = await client.Users.ListAsync();
        Assert.Equal(ProjectUserStatus.Unknown, page.Items[0].Status);
    }

    // ---- sessions ----

    private const string SessionJson =
        """{"id":"ses_1","userId":"u1","token":"stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz","plugins":["a"],"tools":{},"authConfigs":[],"status":"active","createdAt":"2026-01-01T00:00:00Z","expiresAt":"2026-02-01T00:00:00Z","lastUsedAt":null}""";

    private const string ManifestJson =
        """{"revision":"r1","pollAfterSeconds":60,"entries":[{"installationId":"i","pluginId":"plg_1","pluginName":"alpha","versionId":"v","version":"1","scope":"user","yanked":false,"sha256":"s","sizeBytes":1,"href":"h","components":[],"mcp":[{"componentId":"cmp_9","name":"n","serverName":"srv","url":"https://m/mcp","transport":"http","description":"","ready":false,"setup":{"kind":"variables","names":["TOKEN"]}}],"setup":{"kind":"none"}}],"skipped":[]}""";

    [Fact]
    public async Task Empty_plugin_list_is_refused_and_null_is_allowed()
    {
        var (client, handler, _) = Make();
        Assert.Equal("invalid_plugins", (await Assert.ThrowsAsync<ConnectError>(() => client.CreateAsync("u1", new CreateSessionOptions { Plugins = [] }))).Code);
        Assert.Empty(handler.Calls);
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        await client.CreateAsync("u1");
        Assert.Equal("""{"userId":"u1"}""", handler.Calls[0].Body);
    }

    [Fact]
    public async Task Creates_a_session_that_never_prints_its_token()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1", new CreateSessionOptions { Plugins = ["a"], ExpiresInSeconds = 60 });
        Assert.Equal("""{"userId":"u1","plugins":["a"],"expiresInSeconds":60}""", handler.Calls[0].Body);
        Assert.Equal("ses_1", session.Id);
        Assert.DoesNotContain("stk_", session.ToString());
        Assert.StartsWith("stk_", session.Token);
    }

    [Fact]
    public async Task Session_lists_servers_with_its_token_and_enforces_ready()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.OK, ManifestJson);

        var servers = await session.McpAsync();
        Assert.Equal("srv", servers[0].Name);
        Assert.Equal($"Bearer {session.Token}", servers[0].Headers["Authorization"]);
        Assert.DoesNotContain("stk_", servers[0].ToString());
        Assert.Equal($"Bearer {session.Token}", handler.Calls[1].Request.Headers.Authorization!.ToString());

        var error = await Assert.ThrowsAsync<ConnectSetupRequiredError>(() => session.McpAsync(new McpOptions { RequireReady = true }));
        Assert.Equal(SetupKind.Variables, error.Setup.Kind);
        Assert.Equal(["TOKEN"], error.Setup.Names);
        Assert.Empty(await session.McpAsync(new McpOptions { Plugin = "other" }));
    }

    [Fact]
    public async Task Manifest_sends_etag_and_reports_not_modified()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Enqueue(HttpStatusCode.NotModified);
        var result = await session.ManifestAsync(new ManifestQuery { Revision = "r1", Kinds = [FileKind.Skill, FileKind.Agent], Plugins = ["a", "b"] });
        Assert.True(result.NotModified);
        var request = handler.Calls[1].Request;
        Assert.Equal("\"r1\"", request.Headers.IfNoneMatch.ToString());
        Assert.Equal("?kinds=skill%2Cagent&plugins=a%2Cb", request.RequestUri!.Query);
    }

    [Fact]
    public async Task Component_is_checked_against_its_hash()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        var bytes = Encoding.UTF8.GetBytes("archive");
        var sha = Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();
        handler.Default = _ => new HttpResponseMessage(HttpStatusCode.OK) { Content = new ByteArrayContent(bytes) };
        Assert.Equal(bytes, await session.ComponentAsync(sha));
        var error = await Assert.ThrowsAsync<ConnectIntegrityError>(() => session.ComponentAsync(new string('0', 64)));
        Assert.Equal("integrity_hash", error.Code);
    }

    [Fact]
    public async Task Authorize_by_server_name_then_wait_for_the_connection()
    {
        var (client, handler, delays) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Enqueue(HttpStatusCode.OK, ManifestJson);
        handler.Enqueue(HttpStatusCode.OK, """{"redirectUrl":"https://r"}""");
        var request = await session.AuthorizeAsync("srv", "https://cb");
        Assert.Equal("https://r", request.RedirectUrl);
        Assert.Equal("""{"componentId":"cmp_9","callbackUrl":"https://cb"}""", handler.Calls[2].Body);

        const string row = """{"id":"con_1","userId":"u1","componentId":"cmp_9","serverName":"srv","authConfigId":null,"kind":"oauth","valueNames":[],"status":"active","expiresAt":null,"createdAt":"2026-01-01T00:00:00Z"}""";
        handler.Enqueue(HttpStatusCode.OK, """{"items":[],"nextCursor":null}""");
        handler.Enqueue(HttpStatusCode.OK, Items(row, "null"));
        var connection = await request.WaitForConnectionAsync();
        Assert.Equal("con_1", connection.Id);
        Assert.Single(delays);
    }

    [Fact]
    public async Task Waiting_times_out()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Enqueue(HttpStatusCode.OK, """{"redirectUrl":"https://r"}""");
        var request = await session.AuthorizeAsync("cmp_1", "https://cb");
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.OK, """{"items":[],"nextCursor":null}""");
        var error = await Assert.ThrowsAsync<ConnectError>(() => request.WaitForConnectionAsync(
            new WaitOptions { Timeout = TimeSpan.FromSeconds(4), PollInterval = TimeSpan.FromSeconds(2) }));
        Assert.Equal("connection_timeout", error.Code);
    }

    [Fact]
    public async Task Refresh_makes_a_new_session_and_a_stored_one_cannot_refresh()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        handler.Enqueue(HttpStatusCode.Created, SessionJson.Replace("ses_1", "ses_2", StringComparison.Ordinal));
        var session = await client.CreateAsync("u1", new CreateSessionOptions { Plugins = ["a"] });
        var fresh = await session.RefreshAsync();
        Assert.Equal("ses_2", fresh.Id);
        Assert.Equal(handler.Calls[0].Body, handler.Calls[1].Body);

        var stored = ConnectSession.FromToken(session.Token, new SessionIdentity("ses_1", "u1", session.ExpiresAt));
        Assert.Equal("refresh_unavailable", (await Assert.ThrowsAsync<ConnectError>(() => stored.RefreshAsync())).Code);
        Assert.Throws<ConnectError>(() => ConnectSession.FromToken("prk_x", new SessionIdentity("a", "b", DateTimeOffset.UtcNow)));
    }

    [Fact]
    public async Task Report_defaults_skipped_to_empty()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Enqueue(HttpStatusCode.NoContent);
        await session.ReportAsync(new SyncReport { Applied = [new AppliedComponent("cmp_1", "abc")] });
        Assert.Equal("""{"applied":[{"componentId":"cmp_1","sha256":"abc"}],"skipped":[]}""", handler.Calls[1].Body);
    }

    [Fact]
    public async Task Session_plugins_install_and_set_variables()
    {
        var (client, handler, _) = Make();
        handler.Enqueue(HttpStatusCode.Created, SessionJson);
        var session = await client.CreateAsync("u1");
        handler.Enqueue(HttpStatusCode.OK, PluginJson);
        await session.Plugins.InstallAsync("plg_1");
        Assert.Equal("{}", handler.Calls[1].Body);
        Assert.Equal("https://api.test/v1/session/plugins/plg_1", handler.Calls[1].Request.RequestUri!.ToString());
    }

    // ---- MCP config parity with the TypeScript SDK (expected text generated by toMcpConfig) ----

    private static readonly McpServer[] Servers =
    [
        new("a b", "https://x/mcp?q=1&r=<2>", new Dictionary<string, string> { ["Authorization"] = "Bearer stk_abc", ["X"] = "é" }, true, new ConnectSetup(SetupKind.None)),
        new("second", "https://y", new Dictionary<string, string>(), true, new ConnectSetup(SetupKind.None)),
    ];

    [Fact]
    public void Mcp_config_matches_the_typescript_output()
    {
        Assert.Equal(
            "{\n  \"mcpServers\": {\n    \"a b\": {\n      \"type\": \"http\",\n      \"url\": \"https://x/mcp?q=1&r=<2>\",\n      \"headers\": {\n        \"Authorization\": \"Bearer ${CONNECT_TOKEN}\",\n        \"X\": \"é\"\n      }\n    },\n    \"second\": {\n      \"type\": \"http\",\n      \"url\": \"https://y\",\n      \"headers\": {}\n    }\n  }\n}\n",
            Servers.ToMcpConfig());
        Assert.Equal(
            "{\n  \"servers\": {\n    \"a b\": {\n      \"type\": \"http\",\n      \"url\": \"https://x/mcp?q=1&r=<2>\",\n      \"headers\": {\n        \"Authorization\": \"Bearer stk_abc\",\n        \"X\": \"é\"\n      }\n    },\n    \"second\": {\n      \"type\": \"http\",\n      \"url\": \"https://y\",\n      \"headers\": {}\n    }\n  }\n}\n",
            Servers.ToMcpConfig(new McpConfigOptions { Format = McpConfigFormat.Vscode, LiteralToken = true }));
        Assert.Equal("{\n  \"mcpServers\": {}\n}\n", Array.Empty<McpServer>().ToMcpConfig());
    }

    // ---- webhooks ----

    private static (Dictionary<string, string?> Headers, byte[] Body) Signed(string secret, string body, long timestamp)
    {
        var signature = Convert.ToBase64String(HMACSHA256.HashData(
            Encoding.UTF8.GetBytes(secret), Encoding.UTF8.GetBytes($"msg_1.{timestamp}.{body}")));
        return (new Dictionary<string, string?>
        {
            ["Webhook-Id"] = "msg_1",
            ["webhook-timestamp"] = timestamp.ToString(System.Globalization.CultureInfo.InvariantCulture),
            ["webhook-signature"] = $"v1,wrong v1,{signature}",
        }, Encoding.UTF8.GetBytes(body));
    }

    private const string EventBody =
        """{"id":"evt_1","type":"user.created","createdAt":"2026-01-01T00:00:00Z","projectId":"prj_1","userId":"u1","data":{"a":1}}""";

    [Fact]
    public void Verifies_a_webhook_when_any_signature_matches()
    {
        var now = DateTimeOffset.UtcNow;
        var (headers, body) = Signed("whsec", EventBody, now.ToUnixTimeSeconds());
        var evt = Webhooks.Verify(new VerifyWebhookOptions { RawBody = body, Headers = headers, Secret = "whsec" });
        Assert.Equal("user.created", evt.Type);
        Assert.Equal(1, evt.Data["a"].GetInt32());
    }

    [Fact]
    public void Rejects_a_wrong_secret_an_old_timestamp_and_missing_headers()
    {
        var now = DateTimeOffset.UtcNow;
        var (headers, body) = Signed("whsec", EventBody, now.ToUnixTimeSeconds());
        Assert.Equal("webhook_invalid", Assert.Throws<ConnectError>(() =>
            Webhooks.Verify(new VerifyWebhookOptions { RawBody = body, Headers = headers, Secret = "other" })).Code);

        var (oldHeaders, oldBody) = Signed("whsec", EventBody, now.AddMinutes(-10).ToUnixTimeSeconds());
        Assert.Contains("outside", Assert.Throws<ConnectError>(() =>
            Webhooks.Verify(new VerifyWebhookOptions { RawBody = oldBody, Headers = oldHeaders, Secret = "whsec" })).Message);
        Assert.Equal(EventBody.Length > 0, Webhooks.Verify(new VerifyWebhookOptions
        {
            RawBody = oldBody, Headers = oldHeaders, Secret = "whsec", ToleranceSeconds = 3600,
        }) is not null);

        Assert.Contains("missing", Assert.Throws<ConnectError>(() =>
            Webhooks.Verify(new VerifyWebhookOptions { RawBody = body, Headers = new Dictionary<string, string?>(), Secret = "whsec" })).Message);
    }

    [Fact]
    public void Rejects_a_body_that_is_not_json_even_when_signed()
    {
        var (headers, body) = Signed("whsec", "not json", DateTimeOffset.UtcNow.ToUnixTimeSeconds());
        Assert.Contains("not JSON", Assert.Throws<ConnectError>(() =>
            Webhooks.Verify(new VerifyWebhookOptions { RawBody = body, Headers = headers, Secret = "whsec" })).Message);
    }

    [Fact]
    public void Json_options_are_the_documented_shape() =>
        Assert.Equal("needs_reauth", JsonSerializer.Deserialize<string>(JsonSerializer.Serialize(Internal.WireNames.ToWire(ConnectionStatus.NeedsReauth))));
}
