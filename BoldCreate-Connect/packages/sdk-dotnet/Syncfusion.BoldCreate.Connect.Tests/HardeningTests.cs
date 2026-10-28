using System.Net;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Logging;
using Syncfusion.BoldCreate.Connect.Sync;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

public class HardeningTests
{
    private const string Key = "prk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";
    private const string Token = "stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";

    private static ConnectClient Make(FakeConnectHandler handler, Action<ConnectClientOptions>? configure = null, List<TimeSpan>? delays = null)
    {
        var options = new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            HttpClient = new HttpClient(handler),
            Delay = (span, _) =>
            {
                delays?.Add(span);
                return Task.CompletedTask;
            },
        };
        configure?.Invoke(options);
        return new ConnectClient(options);
    }

    [Theory]
    [InlineData("http://api.example.com")]
    [InlineData("ftp://x")]
    [InlineData("not a url")]
    [InlineData("https://user:pass@api.example.com")]
    public void Refuses_an_address_that_would_expose_the_key(string url) =>
        Assert.Equal("invalid_base_url", Assert.Throws<ConnectError>(() => Make(new FakeConnectHandler(), o => o.BaseUrl = url)).Code);

    [Theory]
    [InlineData("https://api.example.com")]
    [InlineData("http://localhost:3000")]
    [InlineData("http://127.0.0.1:5000")]
    [InlineData("http://[::1]:5000")]
    public void Accepts_https_and_loopback_http(string url) =>
        Assert.Equal(url, Make(new FakeConnectHandler(), o => o.BaseUrl = url).BaseUrl);

    [Fact]
    public void Insecure_http_needs_an_explicit_switch() =>
        Assert.NotNull(Make(new FakeConnectHandler(), o =>
        {
            o.BaseUrl = "http://api.example.com";
            o.AllowInsecureHttp = true;
        }));

    [Fact]
    public void Rejects_bad_settings()
    {
        Assert.Equal("invalid_option", Assert.Throws<ConnectError>(() => Make(new FakeConnectHandler(), o => o.Timeout = TimeSpan.Zero)).Code);
        Assert.Equal("invalid_option", Assert.Throws<ConnectError>(() => Make(new FakeConnectHandler(), o => o.Retry.MaxRetries = -1)).Code);
        Assert.Equal("invalid_option", Assert.Throws<ConnectError>(() => Make(new FakeConnectHandler(), o => o.Retry.BaseDelay = TimeSpan.FromSeconds(-1))).Code);
        Assert.NotNull(Make(new FakeConnectHandler(), o => o.Timeout = Timeout.InfiniteTimeSpan));
    }

    [Fact]
    public async Task User_ids_have_1_to_255_characters_and_an_empty_plugin_list_is_refused()
    {
        var handler = new FakeConnectHandler();
        using var client = Make(handler);
        foreach (var bad in new[] { "", new string('x', 256) })
        {
            Assert.Equal("invalid_user_id", (await Assert.ThrowsAsync<ConnectError>(() => client.CreateAsync(bad))).Code);
            Assert.Equal("invalid_user_id", (await Assert.ThrowsAsync<ConnectError>(() => client.Users.InstallAsync(bad, "plg_1"))).Code);
            Assert.Equal("invalid_user_id", (await Assert.ThrowsAsync<ConnectError>(() => client.Users.UninstallAsync(bad, "plg_1"))).Code);
            Assert.Equal("invalid_user_id", (await Assert.ThrowsAsync<ConnectError>(() => client.Users.PluginsAsync(bad))).Code);
            Assert.Equal("invalid_user_id", (await Assert.ThrowsAsync<ConnectError>(() => client.Users.SetNameAsync(bad, "n"))).Code);
        }

        Assert.Equal("invalid_plugins", (await Assert.ThrowsAsync<ConnectError>(
            () => client.CreateAsync("u1", new CreateSessionOptions { Plugins = [] }))).Code);
        Assert.Empty(handler.Calls);
    }

    [Fact]
    public async Task Retry_settings_are_followed_and_zero_turns_retrying_off()
    {
        var handler = new FakeConnectHandler { Default = _ => FakeConnectHandler.Reply(HttpStatusCode.ServiceUnavailable, null) };
        var delays = new List<TimeSpan>();
        using var client = Make(handler, o => o.Retry = new RetryOptions
        {
            MaxRetries = 2,
            BaseDelay = TimeSpan.FromMilliseconds(100),
            MaxDelay = TimeSpan.FromMilliseconds(150),
        }, delays);
        await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        Assert.Equal(3, handler.Calls.Count);
        Assert.Equal([TimeSpan.FromMilliseconds(100), TimeSpan.FromMilliseconds(150)], delays);

        var off = new FakeConnectHandler { Default = handler.Default };
        using var once = Make(off, o => o.Retry.MaxRetries = 0);
        await Assert.ThrowsAsync<ConnectError>(() => once.Plugins.ListAsync());
        Assert.Single(off.Calls);
    }

    [Fact]
    public async Task Retry_after_is_capped_by_the_longest_wait()
    {
        var handler = new FakeConnectHandler();
        handler.Enqueue((HttpStatusCode)429, null, r => r.Headers.Add("Retry-After", "3600"));
        handler.Enqueue(HttpStatusCode.OK, "{\"items\":[],\"nextCursor\":null}");
        var delays = new List<TimeSpan>();
        using var client = Make(handler, delays: delays);
        await client.Plugins.ListAsync();
        Assert.Equal([TimeSpan.FromSeconds(10)], delays);
    }

    [Fact]
    public async Task A_timeout_is_reported_and_retried_for_reads_only()
    {
        var handler = new FakeConnectHandler();
        handler.Default = _ => throw new TaskCanceledException("slow");
        using var client = Make(handler, o => o.Retry.MaxRetries = 1);
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        Assert.Equal("timeout", error.Code);
        Assert.Equal(2, handler.Calls.Count);
    }

    [Fact]
    public async Task A_slow_server_hits_the_timeout()
    {
        using var client = new ConnectClient(new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            Timeout = TimeSpan.FromMilliseconds(30),
            Retry = new RetryOptions { MaxRetries = 0 },
            HttpClient = new HttpClient(new SlowHandler()),
        });
        Assert.Equal("timeout", (await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync())).Code);
    }

    private sealed class SlowHandler : HttpMessageHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
        {
            await Task.Delay(Timeout.Infinite, ct);
            return new HttpResponseMessage();
        }
    }

    [Fact]
    public async Task Caller_cancellation_is_not_retried_and_not_wrapped()
    {
        var handler = new FakeConnectHandler { Default = _ => FakeConnectHandler.Reply(HttpStatusCode.ServiceUnavailable, null) };
        using var cts = new CancellationTokenSource();
        var options = new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            HttpClient = new HttpClient(handler),
            Delay = (_, _) =>
            {
                cts.Cancel();
                return Task.CompletedTask;
            },
        };
        using var cancelling = new ConnectClient(options);
        await Assert.ThrowsAnyAsync<OperationCanceledException>(() => cancelling.Plugins.ListAsync(cts.Token));
        Assert.Single(handler.Calls);
    }

    [Fact]
    public async Task Session_creation_keeps_one_key_across_retries_uses_a_given_key_and_renews_with_a_new_one()
    {
        const string session = "{\"id\":\"ses_1\",\"userId\":\"u1\",\"token\":\"stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz\",\"expiresAt\":\"2026-02-01T00:00:00Z\"}";
        var handler = new FakeConnectHandler();
        handler.Enqueue(HttpStatusCode.ServiceUnavailable);
        handler.Enqueue(HttpStatusCode.Created, session);
        handler.Enqueue(HttpStatusCode.Created, session);
        using var client = Make(handler);
        var created = await client.CreateAsync("u1", new CreateSessionOptions { IdempotencyKey = "mine-1" });
        string KeyOf(int i) => handler.Calls[i].Request.Headers.GetValues("Idempotency-Key").Single();
        Assert.Equal(["mine-1", "mine-1"], [KeyOf(0), KeyOf(1)]);
        Assert.DoesNotContain("idempotency", handler.Calls[0].Body!, StringComparison.OrdinalIgnoreCase);

        await created.RefreshAsync();
        Assert.NotEqual("mine-1", KeyOf(2));
        Assert.Equal(32, KeyOf(2).Length);

        foreach (var bad in new[] { "", "has space", "é", new string('k', 256) })
        {
            Assert.Equal("invalid_idempotency_key", (await Assert.ThrowsAsync<ConnectError>(
                () => client.CreateAsync("u1", new CreateSessionOptions { IdempotencyKey = bad }))).Code);
        }
    }

    [Fact]
    public async Task An_answer_that_is_not_json_is_an_error_of_the_api()
    {
        var handler = new FakeConnectHandler();
        handler.Enqueue(HttpStatusCode.OK, "<html>");
        using var client = Make(handler);
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        Assert.Equal("invalid_response", error.Code);
        Assert.Equal(200, error.Status);
    }

    [Fact]
    public async Task Fields_the_server_adds_later_are_ignored()
    {
        var handler = new FakeConnectHandler();
        handler.Enqueue(HttpStatusCode.OK, "{\"items\":[{\"id\":\"1\",\"userId\":\"u\",\"displayName\":\"d\",\"status\":\"active\",\"createdAt\":\"2026-01-01T00:00:00Z\",\"lastSeenAt\":null,\"sessionCount\":1,\"connectionCount\":0,\"lastSyncedAt\":null,\"connectionsMissing\":0,\"someNewField\":{\"a\":1}}],\"nextCursor\":null,\"alsoNew\":true}");
        using var client = Make(handler);
        Assert.Equal("1", (await client.Users.ListAsync()).Items[0].Id);
    }

    // ---- security: no secret reaches a log, a message, a lock file or a printed value ----

    private sealed class CaptureLogger : ILogger
    {
        public List<string> Lines { get; } = [];

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter) =>
            Lines.Add(formatter(state, exception) + exception);
    }

    [Fact]
    public async Task Logs_and_errors_never_hold_the_key_or_the_token()
    {
        var logger = new CaptureLogger();
        var handler = new FakeConnectHandler();
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.ServiceUnavailable,
            "{\"error\":{\"code\":\"x\",\"message\":\"seen " + Key + " and " + Token + "\"}}");
        using var client = Make(handler, o => o.Logger = logger);
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        var everything = string.Join('\n', logger.Lines) + error + error.Message + client;
        Assert.DoesNotContain("abcdefghijklmnopqrstuvwxyz", everything);
        Assert.NotEmpty(logger.Lines);
    }

    [Fact]
    public async Task A_network_error_message_is_redacted()
    {
        var handler = new FakeConnectHandler { Default = _ => throw new HttpRequestException("failed for " + Key) };
        using var client = Make(handler, o => o.Retry.MaxRetries = 0);
        var error = await Assert.ThrowsAsync<ConnectError>(() => client.Plugins.ListAsync());
        Assert.DoesNotContain("abcdefghijklmnopqrstuvwxyz", error.Message);
    }

    [Fact]
    public void Redaction_keeps_the_key_id_and_hides_the_secret()
    {
        Assert.Equal("a prk_0123456789abcdef.[redacted] b", Redaction.Redact("a " + Key + " b"));
        Assert.Equal("stk_0123456789abcdef.[redacted]", Redaction.Redact(Token));
        Assert.Equal("nothing here", Redaction.Redact("nothing here"));
    }

    [Fact]
    public void Every_public_type_hides_secrets_when_printed()
    {
        var identity = new SessionIdentity("s", "u", DateTimeOffset.UtcNow);
        var session = ConnectSession.FromToken(Token, identity);
        var server = new McpServer("n", "https://x", new Dictionary<string, string> { ["Authorization"] = "Bearer " + Token }, true, new ConnectSetup(SetupKind.None));
        foreach (var text in new[] { session.ToString(), server.ToString(), new CachedSession(Token, identity).ToString() })
        {
            Assert.DoesNotContain("stk_", text);
        }
    }

    // ---- sync: the revision is kept while something was left out ----

    [Fact]
    public async Task Sync_keeps_the_old_revision_while_a_hook_is_skipped()
    {
        var dir = Path.Combine(Path.GetTempPath(), "connect-rev-" + Guid.NewGuid().ToString("N"));
        try
        {
            const string manifest = "{\"revision\":\"rev9\",\"pollAfterSeconds\":60,\"entries\":[{\"installationId\":\"i\",\"pluginId\":\"plg_a\",\"pluginName\":\"alpha\",\"versionId\":\"v\",\"version\":\"1\",\"scope\":\"user\",\"yanked\":false,\"sha256\":\"x\",\"sizeBytes\":1,\"href\":\"h\",\"components\":[{\"id\":\"cmp_h\",\"kind\":\"hook\",\"name\":\"h\",\"enabled\":true,\"sha256\":\"abc\",\"sizeBytes\":1,\"href\":\"h\",\"path\":\"p\"}],\"mcp\":[],\"setup\":{\"kind\":\"none\"}}],\"skipped\":[]}";
            var handler = new FakeConnectHandler { Default = _ => FakeConnectHandler.Reply(HttpStatusCode.OK, manifest) };
            var session = ConnectSession.FromToken(Token, new SessionIdentity("s", "u1", DateTimeOffset.UtcNow.AddDays(1)),
                new ConnectClientOptions { BaseUrl = "https://api.test", HttpClient = new HttpClient(handler) });
            var result = await session.SyncPluginsAsync(new SyncOptions { Dir = dir });
            Assert.Single(result.Skipped);
            Assert.Contains("\"revision\": \"\"", await File.ReadAllTextAsync(Path.Combine(dir, ".connect", "lock.json")));
            await session.SyncPluginsAsync(new SyncOptions { Dir = dir });
            Assert.Null(handler.Calls[^1].Request.Headers.IfNoneMatch.FirstOrDefault());
        }
        finally
        {
            if (Directory.Exists(dir)) Directory.Delete(dir, recursive: true);
        }
    }

    // ---- the public surface: a change to it must be deliberate (mirrors exports.test.ts) ----

    [Fact]
    public void The_public_surface_is_what_the_package_documents()
    {
        var assembly = typeof(ConnectClient).Assembly;
        var names = assembly.GetExportedTypes()
            .Where(t => t.Namespace is "Syncfusion.BoldCreate.Connect" or "Syncfusion.BoldCreate.Connect.Sync"
                or "Syncfusion.BoldCreate.Connect.Extensions" or "Syncfusion.BoldCreate.Connect.Testing")
            .Where(t => !t.IsEnum && (t.IsAbstract || t.IsClass || t.IsInterface))
            .Where(t => !t.Name.Contains("Options", StringComparison.Ordinal) || t.Name is "ConnectClientOptions" or "RetryOptions" or "CreateSessionOptions" or "SyncOptions")
            .Select(t => t.Namespace![("Syncfusion.BoldCreate.Connect".Length)..].TrimStart('.') + (t.Namespace.Length > "Syncfusion.BoldCreate.Connect".Length ? "." : string.Empty) + t.Name)
            .Where(n => n is "ConnectClient" or "ConnectSession" or "ConnectClientOptions" or "ConnectError" or "ConnectAuthError"
                or "ConnectNotFoundError" or "ConnectRateLimitError" or "ConnectIntegrityError" or "ConnectSetupRequiredError"
                or "RetryOptions" or "CreateSessionOptions" or "McpConfig" or "Webhooks" or "ISessionCache" or "MemorySessionCache"
                or "Sync.SyncOptions" or "Sync.SessionSyncExtensions" or "Extensions.ServiceCollectionExtensions" or "Testing.FakeConnectHandler")
            .Order(StringComparer.Ordinal)
            .ToArray();
        Assert.Equal(
            [
                "ConnectAuthError", "ConnectClient", "ConnectClientOptions", "ConnectError", "ConnectIntegrityError",
                "ConnectNotFoundError", "ConnectRateLimitError", "ConnectSession", "ConnectSetupRequiredError",
                "CreateSessionOptions", "Extensions.ServiceCollectionExtensions", "ISessionCache", "McpConfig", "MemorySessionCache",
                "RetryOptions", "Sync.SessionSyncExtensions", "Sync.SyncOptions", "Testing.FakeConnectHandler", "Webhooks",
            ],
            names);
    }

    [Fact]
    public void Every_public_async_method_takes_a_cancellation_token_last()
    {
        var offenders = new List<string>();
        foreach (var type in typeof(ConnectClient).Assembly.GetExportedTypes())
        {
            foreach (var method in type.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static | BindingFlags.DeclaredOnly))
            {
                var returnsTask = typeof(Task).IsAssignableFrom(method.ReturnType)
                    || method.ReturnType.IsGenericType && method.ReturnType.GetGenericTypeDefinition() == typeof(IAsyncEnumerable<>);
                if (!returnsTask || type == typeof(Testing.FakeConnectHandler)) continue;
                var last = method.GetParameters().LastOrDefault();
                if (last?.ParameterType != typeof(CancellationToken) || !last.HasDefaultValue || !method.Name.EndsWith("Async", StringComparison.Ordinal))
                {
                    offenders.Add($"{type.Name}.{method.Name}");
                }
            }
        }

        Assert.Empty(offenders);
    }

    // ---- smoke: a real HTTP round trip through HttpClient, not a fake handler ----

    [Fact]
    public async Task Talks_to_a_real_http_server()
    {
        var port = FreePort();
        using var listener = new HttpListener();
        listener.Prefixes.Add($"http://127.0.0.1:{port}/");
        listener.Start();
        string? auth = null;
        var served = Task.Run(async () =>
        {
            for (var i = 0; i < 2; i++)
            {
                var context = await listener.GetContextAsync();
                auth = context.Request.Headers["Authorization"];
                var body = context.Request.Url!.AbsolutePath == "/v1/project/plugins"
                    ? "{\"items\":[],\"nextCursor\":null}"
                    : "{\"error\":{\"code\":\"not_found\",\"message\":\"no\",\"requestId\":\"req_9\"}}";
                context.Response.StatusCode = context.Request.Url.AbsolutePath == "/v1/project/plugins" ? 200 : 404;
                context.Response.ContentType = "application/json";
                var bytes = Encoding.UTF8.GetBytes(body);
                await context.Response.OutputStream.WriteAsync(bytes);
                context.Response.Close();
            }
        });

        using var client = new ConnectClient(new ConnectClientOptions { ApiKey = Key, BaseUrl = $"http://127.0.0.1:{port}" });
        Assert.Empty(await client.Plugins.ListAsync());
        Assert.Equal($"Bearer {Key}", auth);
        var missing = await Assert.ThrowsAsync<ConnectNotFoundError>(() => client.Sessions.GetAsync("ses_x"));
        Assert.Equal("req_9", missing.RequestId);
        await served;
        listener.Stop();
    }

    private static int FreePort()
    {
        var socket = new System.Net.Sockets.TcpListener(IPAddress.Loopback, 0);
        socket.Start();
        var port = ((IPEndPoint)socket.LocalEndpoint).Port;
        socket.Stop();
        return port;
    }
}
