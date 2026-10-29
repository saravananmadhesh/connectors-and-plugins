using System.Net;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

/// <summary>Every call of the client against the route, body and answer shape of the API (same as the TypeScript contract tests).</summary>
public class ContractTests
{
    private const string Key = "prk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";
    private const string Token = "stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";
    private const string T = "2026-01-01T00:00:00Z";

    private static string Page(string item) => "{\"items\":[" + item + "],\"nextCursor\":null}";

    private static readonly string PluginRow = "{\"pluginId\":\"plg_1\",\"name\":\"n\",\"displayName\":\"N\",\"versionId\":\"ver_1\",\"version\":\"1.0.0\",\"createdAt\":\"" + T + "\",\"updatedAt\":\"" + T + "\"}";

    private static readonly string UserPluginRow =
        "{\"pluginId\":\"plg_1\",\"name\":\"n\",\"displayName\":\"N\",\"source\":\"project\",\"removable\":false,\"versionId\":\"v\",\"version\":\"1\",\"latestVersionId\":\"v2\",\"updateAvailable\":true,\"installedAt\":\"" + T + "\",\"updatedAt\":\"" + T + "\","
        + "\"components\":[{\"componentId\":\"cmp_1\",\"kind\":\"skill\",\"name\":\"s\",\"enabled\":true}],\"variables\":[{\"name\":\"TOKEN\",\"secret\":true,\"isSet\":false}],"
        + "\"mcp\":[{\"componentId\":\"cmp_2\",\"serverName\":\"srv\",\"authConfigId\":\"auc_1\",\"authMode\":\"oauth_dcr\",\"setup\":{\"kind\":\"connect\"},\"ready\":false,\"connection\":{\"id\":\"con_1\",\"status\":\"needs_reauth\",\"expiresAt\":null,\"connectedAt\":\"" + T + "\"}}]}";

    private static readonly string AuthConfigRow =
        "{\"id\":\"auc_1\",\"componentId\":\"cmp_2\",\"pluginId\":\"plg_1\",\"pluginName\":\"n\",\"serverName\":\"srv\",\"name\":\"d\",\"authMode\":\"shared_secret\",\"isDefault\":true,\"status\":\"active\",\"clientId\":null,\"clientSecretSet\":false,\"secretSet\":true,\"secretLastFour\":\"1234\",\"scopes\":null,\"callbackUrl\":\"https://cb\","
        + "\"variables\":[{\"name\":\"A\",\"description\":\"\",\"required\":true,\"secret\":true,\"isSet\":false,\"custom\":false}],\"tools\":[{\"name\":\"t\",\"description\":\"d\"}],\"createdAt\":\"" + T + "\",\"updatedAt\":\"" + T + "\"}";

    private static readonly string CatalogRow =
        "{\"id\":\"plg_1\",\"name\":\"n\",\"displayName\":\"N\",\"summary\":\"s\",\"keywords\":[\"k\"],\"status\":\"deprecated\",\"visibility\":\"public\",\"publisherOrganizationId\":null,\"featured\":true,\"verified\":false,\"categories\":[{\"slug\":\"c\",\"name\":\"C\"}],\"logoUrl\":null,\"updatedAt\":\"" + T + "\",\"latestVersion\":{\"id\":\"v\",\"version\":\"1\"},\"componentCounts\":{\"agent\":1,\"skill\":2,\"mcp\":3,\"hook\":4,\"rule\":5},\"installed\":true}";

    private static readonly string SessionRow =
        "{\"id\":\"ses_1\",\"userId\":\"u1\",\"plugins\":[\"a\"],\"tools\":{\"disable\":[\"x\"],\"disableDestructive\":true},\"authConfigs\":[{\"pluginId\":\"p\",\"serverName\":\"s\",\"authConfigId\":\"a\"}],\"status\":\"revoked\",\"createdAt\":\"" + T + "\",\"expiresAt\":\"" + T + "\",\"lastUsedAt\":\"" + T + "\"}";

    private static readonly string SetRow =
        "{\"id\":\"set_1\",\"name\":\"s\",\"plugins\":[{\"pluginId\":\"plg_1\",\"name\":\"n\",\"displayName\":\"N\"}],\"createdAt\":\"" + T + "\",\"updatedAt\":\"" + T + "\"}";

    private static (ConnectClient Client, FakeConnectHandler Handler) Make()
    {
        var handler = new FakeConnectHandler();
        return (new ConnectClient(new ConnectClientOptions { ApiKey = Key, BaseUrl = "https://api.test", HttpClient = new HttpClient(handler) }), handler);
    }

    private static async Task<ConnectSession> SessionOf(ConnectClient client, FakeConnectHandler handler)
    {
        handler.Enqueue(HttpStatusCode.Created, "{\"id\":\"ses_1\",\"userId\":\"u1\",\"token\":\"" + Token + "\",\"expiresAt\":\"" + T + "\"}");
        return await client.CreateAsync("u1");
    }

    private static void Expect(FakeConnectHandler handler, int index, HttpMethod method, string pathAndQuery, string? body = null)
    {
        var (request, sent) = handler.Calls[index];
        Assert.Equal(method, request.Method);
        Assert.Equal(pathAndQuery, request.RequestUri!.PathAndQuery);
        Assert.Equal(body, sent);
    }

    [Fact]
    public async Task Users_set_one_component_on_or_off()
    {
        var (client, handler) = Make();
        handler.Enqueue(HttpStatusCode.OK, UserPluginRow);

        await client.Users.SetComponentEnabledAsync("u", "plg_1", "cmp/1", false);

        Expect(handler, 0, HttpMethod.Put, "/v1/project/user-plugins/plg_1/components/cmp%2F1", "{\"userId\":\"u\",\"enabled\":false}");
    }

    [Fact]
    public async Task Users_clear_one_component_preference()
    {
        var (client, handler) = Make();
        handler.Enqueue(HttpStatusCode.OK, UserPluginRow);

        await client.Users.ClearComponentEnabledAsync("u", "plg_1", "cmp/1");

        Expect(handler, 0, HttpMethod.Delete, "/v1/project/user-plugins/plg_1/components/cmp%2F1?userId=u");
    }

    [Fact]
    public async Task Session_turns_one_component_on_or_off_and_clears_it_again()
    {
        var (client, handler) = Make();
        var session = await SessionOf(client, handler);
        handler.Enqueue(HttpStatusCode.OK, UserPluginRow);
        handler.Enqueue(HttpStatusCode.OK, UserPluginRow);

        await session.Plugins.SetComponentEnabledAsync("plg_1", "cmp/1", false);
        await session.Plugins.ClearComponentEnabledAsync("plg_1", "cmp/1");

        Expect(handler, 1, HttpMethod.Put, "/v1/session/plugins/plg_1/components/cmp%2F1", "{\"enabled\":false}");
        Expect(handler, 2, HttpMethod.Delete, "/v1/session/plugins/plg_1/components/cmp%2F1");
    }

    [Fact]
    public async Task Project_plugins_and_users()
    {
        var (client, handler) = Make();
        handler.Enqueue(HttpStatusCode.OK, PluginRow);
        handler.Enqueue(HttpStatusCode.OK, PluginRow);
        handler.Enqueue(HttpStatusCode.NoContent);
        handler.Enqueue(HttpStatusCode.OK, "{\"id\":\"i\",\"userId\":\"u\",\"displayName\":\"Ann\",\"status\":\"suspended\",\"createdAt\":\"" + T + "\",\"lastSeenAt\":\"" + T + "\",\"sessionCount\":2,\"connectionCount\":3,\"lastSyncedAt\":null,\"connectionsMissing\":1}");
        handler.Enqueue(HttpStatusCode.OK, Page(UserPluginRow));

        var added = await client.Plugins.AddAsync("plg 1", new InstallOptions { VersionId = "ver_2" });
        Assert.Equal("1.0.0", added.Version);
        await client.Plugins.UpdateAsync("plg_1", "ver_3");
        await client.Plugins.RemoveAsync("plg_1");
        var user = await client.Users.SetNameAsync("u", "Ann");
        Assert.Equal(ProjectUserStatus.Suspended, user.Status);
        var plugins = await client.Users.PluginsAsync("u");

        Expect(handler, 0, HttpMethod.Put, "/v1/project/plugins/plg%201", "{\"versionId\":\"ver_2\"}");
        Expect(handler, 1, HttpMethod.Put, "/v1/project/plugins/plg_1", "{\"versionId\":\"ver_3\"}");
        Expect(handler, 2, HttpMethod.Delete, "/v1/project/plugins/plg_1");
        Expect(handler, 3, HttpMethod.Put, "/v1/project/users", "{\"userId\":\"u\",\"displayName\":\"Ann\"}");
        Expect(handler, 4, HttpMethod.Get, "/v1/project/user-plugins?userId=u&limit=100");

        var mcp = plugins[0].Mcp[0];
        Assert.Equal(PluginSource.Project, plugins[0].Source);
        Assert.Equal(McpAuthMode.OauthDcr, mcp.AuthMode);
        Assert.Equal(SetupKind.Connect, mcp.Setup.Kind);
        Assert.Equal(ConnectionStatus.NeedsReauth, mcp.Connection!.Status);
        Assert.True(plugins[0].Variables[0].Secret);
        Assert.Equal("skill", plugins[0].Components[0].Kind);
    }

    [Fact]
    public async Task Catalog_policy_and_plugin_sets()
    {
        var (client, handler) = Make();
        handler.Default = request => request.Method == HttpMethod.Get && request.RequestUri!.AbsolutePath.EndsWith("allowed-plugins", StringComparison.Ordinal)
            ? FakeConnectHandler.Reply(HttpStatusCode.OK, Page("{\"pluginId\":\"plg_1\",\"name\":\"n\",\"displayName\":\"N\",\"allowedAt\":\"" + T + "\"}"))
            : request.Method == HttpMethod.Get && request.RequestUri!.AbsolutePath.EndsWith("plugin-sets", StringComparison.Ordinal)
                ? FakeConnectHandler.Reply(HttpStatusCode.OK, Page(SetRow))
                : request.Method == HttpMethod.Delete || request.Method == HttpMethod.Put
                    ? FakeConnectHandler.Reply(HttpStatusCode.NoContent, null)
                    : FakeConnectHandler.Reply(HttpStatusCode.OK, SetRow);

        Assert.Equal("plg_1", (await client.Catalog.AllowedAsync())[0].PluginId);
        await client.Catalog.AllowAsync("plg 1");
        await client.Catalog.DisallowAsync("plg_1");
        Assert.Equal("set_1", (await client.Catalog.Sets.ListAsync())[0].Id);
        await client.Catalog.Sets.CreateAsync("s", ["plg_1"]);
        await client.Catalog.Sets.CreateAsync("bare");
        await client.Catalog.Sets.UpdateAsync("set 1", "renamed");
        await client.Catalog.Sets.AddAsync("set_1", "plg_1");
        await client.Catalog.Sets.RemoveAsync("set_1", "plg_1");
        await client.Catalog.Sets.DeleteAsync("set_1");

        var calls = handler.Calls.Select(c => (c.Request.Method.Method, c.Request.RequestUri!.PathAndQuery, c.Body)).ToArray();
        Assert.Equal(("PUT", "/v1/project/allowed-plugins/plg%201", null), calls[1]);
        Assert.Equal(("DELETE", "/v1/project/allowed-plugins/plg_1", null), calls[2]);
        Assert.Equal(("POST", "/v1/project/plugin-sets", "{\"name\":\"s\",\"plugins\":[\"plg_1\"]}"), calls[4]);
        Assert.Equal(("POST", "/v1/project/plugin-sets", "{\"name\":\"bare\"}"), calls[5]);
        Assert.Equal(("PATCH", "/v1/project/plugin-sets/set%201", "{\"name\":\"renamed\"}"), calls[6]);
        Assert.Equal(("PUT", "/v1/project/plugin-sets/set_1/plugins/plg_1", null), calls[7]);
        Assert.Equal(("DELETE", "/v1/project/plugin-sets/set_1/plugins/plg_1", null), calls[8]);
        Assert.Equal(("DELETE", "/v1/project/plugin-sets/set_1", null), calls[9]);
    }

    [Fact]
    public async Task Sessions_connections_auth_configs_logs_usage_and_webhooks()
    {
        var (client, handler) = Make();
        handler.Enqueue(HttpStatusCode.OK, Page(SessionRow));
        handler.Enqueue(HttpStatusCode.OK, SessionRow);
        handler.Enqueue(HttpStatusCode.NoContent);
        handler.Enqueue(HttpStatusCode.OK, Page("{\"id\":\"con_1\",\"userId\":\"u\",\"componentId\":\"cmp_1\",\"serverName\":\"s\",\"authConfigId\":null,\"kind\":\"api_key\",\"valueNames\":[\"A\"],\"status\":\"active\",\"expiresAt\":\"" + T + "\",\"createdAt\":\"" + T + "\"}"));
        handler.Enqueue(HttpStatusCode.NoContent);
        handler.Enqueue(HttpStatusCode.OK, Page(AuthConfigRow));
        handler.Enqueue(HttpStatusCode.OK, Page("{\"id\":\"log_1\",\"action\":\"tool.call\",\"result\":\"denied\",\"createdAt\":\"" + T + "\",\"user\":{\"id\":\"i\",\"userId\":null},\"target\":{\"kind\":\"k\",\"id\":\"t\"},\"tool\":\"x\",\"outcome\":\"o\",\"durationMs\":5,\"appliedCount\":2}"));
        handler.Enqueue(HttpStatusCode.OK, "{\"from\":\"" + T + "\",\"to\":\"" + T + "\",\"days\":[{\"date\":\"2026-01-01\",\"activeUsers\":1,\"toolCalls\":2,\"errors\":0}],\"topUsers\":[{\"id\":\"i\",\"userId\":\"u\",\"toolCalls\":2}]}");
        handler.Enqueue(HttpStatusCode.OK, Page("{\"id\":\"d\",\"eventId\":\"e\",\"type\":\"user.created\",\"status\":\"failed\",\"attempts\":3,\"nextAttemptAt\":null,\"lastStatusCode\":500,\"createdAt\":\"" + T + "\"}"));

        var sessions = await client.Sessions.ListAsync(new SessionListOptions { UserId = "u1", Limit = 10, Cursor = "c" });
        Assert.Equal(SessionStatus.Revoked, sessions.Items[0].Status);
        Assert.True(sessions.Items[0].Tools.DisableDestructive);
        Assert.Equal("a", (await client.Sessions.GetAsync("ses 1")).AuthConfigs[0].AuthConfigId);
        await client.Sessions.DeleteAsync("ses_1");
        var connections = await client.Connections.ListAsync(new ConnectionListOptions { UserId = "u", ComponentId = "cmp_1" });
        Assert.Equal(ConnectionKind.ApiKey, connections[0].Kind);
        await client.Connections.DeleteAsync("con 1");
        var configs = await client.AuthConfigs.ListAsync();
        Assert.Equal(AuthConfigMode.SharedSecret, configs[0].AuthMode);
        Assert.Equal("t", configs[0].Tools![0].Name);
        var logs = await client.Logs.ListAsync(new LogListOptions { Action = "tool.call", UserId = "u" });
        Assert.Equal(LogResult.Denied, logs.Items[0].Result);
        Assert.Equal(5, logs.Items[0].DurationMs);
        var usage = await client.UsageAsync();
        Assert.Equal(2, usage.TopUsers[0].ToolCalls);
        var deliveries = await client.Webhooks.DeliveriesAsync(new DeliveryListOptions { Status = DeliveryStatus.Failed });
        Assert.Equal(DeliveryStatus.Failed, deliveries.Items[0].Status);

        Expect(handler, 0, HttpMethod.Get, "/v1/project/sessions?cursor=c&limit=10&userId=u1");
        Expect(handler, 1, HttpMethod.Get, "/v1/project/sessions/ses%201");
        Expect(handler, 2, HttpMethod.Delete, "/v1/project/sessions/ses_1");
        Expect(handler, 3, HttpMethod.Get, "/v1/project/connections?userId=u&componentId=cmp_1&limit=100");
        Expect(handler, 4, HttpMethod.Delete, "/v1/project/connections/con%201");
        Expect(handler, 5, HttpMethod.Get, "/v1/project/auth-configs?limit=100");
        Expect(handler, 6, HttpMethod.Get, "/v1/project/logs?userId=u&action=tool.call");
        Expect(handler, 7, HttpMethod.Get, "/v1/project/usage");
        Expect(handler, 8, HttpMethod.Get, "/v1/project/webhook/deliveries?status=failed");
    }

    [Fact]
    public async Task Session_catalog_auth_configs_plugins_and_variables()
    {
        var (client, handler) = Make();
        var session = await SessionOf(client, handler);
        handler.Enqueue(HttpStatusCode.OK, "{\"items\":[" + CatalogRow + "],\"total\":1,\"page\":1,\"pageSize\":20}");
        handler.Enqueue(HttpStatusCode.OK, Page(UserPluginRow));
        handler.Enqueue(HttpStatusCode.OK, PluginRow);
        handler.Enqueue(HttpStatusCode.OK, PluginRow);
        handler.Enqueue(HttpStatusCode.NoContent);
        handler.Enqueue(HttpStatusCode.OK, UserPluginRow);

        var catalog = await session.CatalogAsync(new CatalogQuery { Q = "git", Keyword = "k", Categories = "c", Page = 2, Limit = 5 });
        Assert.Equal(PluginStatus.Deprecated, catalog.Items[0].Status);
        Assert.Equal(3, catalog.Items[0].ComponentCounts.Mcp);
        Assert.True(catalog.Items[0].Installed);
        var configs = await session.AuthConfigsAsync();
        Assert.Equal(("plg_1", "cmp_2", "srv", McpAuthMode.OauthDcr, false), (configs[0].PluginId, configs[0].ComponentId, configs[0].ServerName, configs[0].AuthMode, configs[0].Ready));
        await session.Plugins.InstallAsync("plg_1", new InstallOptions { VersionId = "v9" });
        await session.Plugins.UpdateAsync("plg_1", "v10");
        await session.Plugins.RemoveAsync("plg_1");
        var variables = await session.Plugins.SetVariablesAsync("plg_1", new Dictionary<string, string?> { ["TOKEN"] = "secret", ["OLD"] = null });

        Assert.Equal("plg_1", variables.PluginId);
        Expect(handler, 1, HttpMethod.Get, "/v1/session/catalog?q=git&keyword=k&categories=c&page=2&limit=5");
        Expect(handler, 2, HttpMethod.Get, "/v1/session/plugins?limit=100");
        Expect(handler, 3, HttpMethod.Put, "/v1/session/plugins/plg_1", "{\"versionId\":\"v9\"}");
        Expect(handler, 4, HttpMethod.Put, "/v1/session/plugins/plg_1", "{\"versionId\":\"v10\"}");
        Expect(handler, 5, HttpMethod.Delete, "/v1/session/plugins/plg_1");
        Expect(handler, 6, HttpMethod.Put, "/v1/session/plugins/plg_1/variables", "{\"values\":{\"TOKEN\":\"secret\",\"OLD\":null}}");
    }

    [Fact]
    public async Task Webhook_deliveries_client_verify_matches_the_static_helper()
    {
        var (client, _) = Make();
        var error = Assert.Throws<ConnectError>(() => client.Webhooks.Verify(new VerifyWebhookOptions
        {
            RawBody = ReadOnlyMemory<byte>.Empty,
            Headers = new Dictionary<string, string?>(),
            Secret = "s",
        }));
        Assert.Equal("webhook_invalid", error.Code);
        await Task.CompletedTask;
    }

    [Fact]
    public async Task Component_size_mismatch_is_an_integrity_error_and_a_session_with_no_servers_is_empty()
    {
        var (client, handler) = Make();
        var session = await SessionOf(client, handler);
        handler.Enqueue(HttpStatusCode.NotModified);
        Assert.Empty(await session.McpAsync());

        var content = new ByteArrayContent([1, 2, 3]);
        content.Headers.ContentLength = 99;
        handler.Enqueue(HttpStatusCode.OK, null, r => r.Content = content);
        var error = await Assert.ThrowsAsync<ConnectIntegrityError>(() => session.ComponentAsync(new string('0', 64)));
        Assert.Equal("integrity_size", error.Code);
    }

    [Fact]
    public async Task Authorize_without_a_matching_server_is_not_found()
    {
        var (client, handler) = Make();
        var session = await SessionOf(client, handler);
        handler.Enqueue(HttpStatusCode.OK, "{\"revision\":\"r\",\"pollAfterSeconds\":1,\"entries\":[],\"skipped\":[]}");
        var error = await Assert.ThrowsAsync<ConnectNotFoundError>(() => session.AuthorizeAsync("nope", "https://cb"));
        Assert.Equal(404, error.Status);
    }

    [Fact]
    public async Task A_manifest_with_skipped_components_reads_every_field()
    {
        var (client, handler) = Make();
        var session = await SessionOf(client, handler);
        handler.Enqueue(HttpStatusCode.OK,
            "{\"revision\":\"r\",\"pollAfterSeconds\":30,\"entries\":[],\"skipped\":[{\"pluginId\":\"p\",\"versionId\":\"v\",\"componentId\":null,\"kind\":\"hook\",\"reason\":\"no_archive\"},{\"pluginId\":\"p\",\"versionId\":\"v\",\"componentId\":\"c\",\"kind\":null,\"reason\":\"unsupported_kind\"}]}");
        var result = await session.ManifestAsync();
        Assert.False(result.NotModified);
        Assert.Equal(SkipReason.NoArchive, result.Manifest!.Skipped[0].Reason);
        Assert.Equal(PluginKind.Hook, result.Manifest.Skipped[0].Kind);
        Assert.Null(result.Manifest.Skipped[1].Kind);
        Assert.Equal(30, result.Manifest.PollAfterSeconds);
    }
}
