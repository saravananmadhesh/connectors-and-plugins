using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect;

public sealed record InstallOptions
{
    public string? VersionId { get; init; }
}

public sealed record UserListOptions : PageOptions
{
    public string? UserId { get; init; }

    public string? Search { get; init; }
}

public sealed record SessionListOptions : PageOptions
{
    public string? UserId { get; init; }
}

public sealed record ConnectionListOptions
{
    public string? UserId { get; init; }

    public string? ComponentId { get; init; }
}

public sealed record LogListOptions : PageOptions
{
    public string? UserId { get; init; }

    public string? Action { get; init; }

    public DateTimeOffset? From { get; init; }

    public DateTimeOffset? To { get; init; }
}

public sealed record UsageOptions
{
    public DateTimeOffset? From { get; init; }

    public DateTimeOffset? To { get; init; }
}

public sealed record DeliveryListOptions : PageOptions
{
    public DeliveryStatus? Status { get; init; }
}

public sealed record StartedConnection(string ConnectUrl, DateTimeOffset ExpiresAt);

internal static class Paths
{
    public static string Id(string value) => Uri.EscapeDataString(value);

    public static Query CatalogQuery(CatalogQuery? q) => new Query()
        .Add("q", q?.Q).Add("keyword", q?.Keyword).Add("kind", q?.Kind).Add("categories", q?.Categories)
        .Add("featured", q?.Featured).Add("sort", q?.Sort).Add("direction", q?.Direction)
        .Add("page", q?.Page).Add("limit", q?.Limit);
}

/// <summary>
/// The people of the host. A user appears the first time a session or a name is set for them;
/// deleting one is a console action and not offered here. No user id goes into a path.
/// </summary>
public sealed class UsersApi
{
    private readonly ConnectHttp _http;

    internal UsersApi(ConnectHttp http) => _http = http;

    public async Task<Page<ProjectUser>> ListAsync(UserListOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<Page<ProjectUser>>(HttpMethod.Get, "/v1/project/users",
            query: new Query().Add(options).Add("userId", options?.UserId).Add("search", options?.Search), ct: ct)
            .ConfigureAwait(false) ?? throw Empty();

    public async Task<ProjectUser> SetNameAsync(string userId, string displayName, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return await _http.JsonAsync<ProjectUser>(HttpMethod.Put, "/v1/project/users", new { userId, displayName }, ct: ct)
            .ConfigureAwait(false) ?? throw Empty();
    }

    /// <summary>The plugins of one user with their components, variables, setup and connection state.</summary>
    public async Task<IReadOnlyList<UserPlugin>> PluginsAsync(string userId, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return await _http.AllPagesAsync<UserPlugin>("/v1/project/user-plugins", new Query().Add("userId", userId), ct)
            .ConfigureAwait(false);
    }

    public IAsyncEnumerable<UserPlugin> EnumeratePluginsAsync(string userId, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return _http.PagesAsync<UserPlugin>("/v1/project/user-plugins", new Query().Add("userId", userId), ConnectHttp.MaxPages, ct);
    }

    public async Task<ProjectPlugin> InstallAsync(
        string userId, string pluginId, InstallOptions? options = null, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return await _http.JsonAsync<ProjectPlugin>(HttpMethod.Put, $"/v1/project/user-plugins/{Paths.Id(pluginId)}",
            new { userId, versionId = options?.VersionId }, ct: ct).ConfigureAwait(false) ?? throw Empty();
    }

    public Task UninstallAsync(string userId, string pluginId, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return _http.SendAsync(HttpMethod.Delete, $"/v1/project/user-plugins/{Paths.Id(pluginId)}",
            query: new Query().Add("userId", userId), ct: ct);
    }

    /// <summary>
    /// Turns one component on or off for the user. On the user's own install it changes the install;
    /// on a plugin the project provides it stores the user's own preference and the install's value
    /// stays the default.
    /// </summary>
    public async Task<UserPlugin> SetComponentEnabledAsync(
        string userId, string pluginId, string componentId, bool enabled, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return await _http.JsonAsync<UserPlugin>(HttpMethod.Put,
            $"/v1/project/user-plugins/{Paths.Id(pluginId)}/components/{Paths.Id(componentId)}",
            new { userId, enabled }, ct: ct).ConfigureAwait(false) ?? throw Empty();
    }

    /// <summary>
    /// Drops the user's own preference for one component, so the user follows the install again. A
    /// plugin the user installed has no preference and is not found here.
    /// </summary>
    public async Task<UserPlugin> ClearComponentEnabledAsync(
        string userId, string pluginId, string componentId, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        return await _http.JsonAsync<UserPlugin>(HttpMethod.Delete,
            $"/v1/project/user-plugins/{Paths.Id(pluginId)}/components/{Paths.Id(componentId)}",
            query: new Query().Add("userId", userId), ct: ct).ConfigureAwait(false) ?? throw Empty();
    }

    internal static ConnectError Empty() => new("The answer had no body.", "empty_answer", 200);
}

/// <summary>The plugins every user of the project gets, and the catalog they are picked from.</summary>
public sealed class PluginsApi
{
    private readonly ConnectHttp _http;

    internal PluginsApi(ConnectHttp http) => _http = http;

    public Task<IReadOnlyList<ProjectPlugin>> ListAsync(CancellationToken ct = default) =>
        _http.AllPagesAsync<ProjectPlugin>("/v1/project/plugins", null, ct);

    public IAsyncEnumerable<ProjectPlugin> EnumerateAsync(CancellationToken ct = default) =>
        _http.PagesAsync<ProjectPlugin>("/v1/project/plugins", null, ConnectHttp.MaxPages, ct);

    public async Task<ProjectPlugin> AddAsync(string pluginId, InstallOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<ProjectPlugin>(HttpMethod.Put, $"/v1/project/plugins/{Paths.Id(pluginId)}",
            new { versionId = options?.VersionId }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public async Task<ProjectPlugin> UpdateAsync(string pluginId, string versionId, CancellationToken ct = default) =>
        await _http.JsonAsync<ProjectPlugin>(HttpMethod.Put, $"/v1/project/plugins/{Paths.Id(pluginId)}",
            new { versionId }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public Task RemoveAsync(string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, $"/v1/project/plugins/{Paths.Id(pluginId)}", ct: ct);

    public async Task<CatalogPage> CatalogAsync(CatalogQuery? query = null, CancellationToken ct = default) =>
        await _http.JsonAsync<CatalogPage>(HttpMethod.Get, "/v1/project/catalog", query: Paths.CatalogQuery(query), ct: ct)
            .ConfigureAwait(false) ?? throw UsersApi.Empty();
}

/// <summary>What a user may install on their own: the mode, the allowed plugins and the plugin sets.</summary>
public sealed class CatalogPolicyApi
{
    private readonly ConnectHttp _http;

    internal CatalogPolicyApi(ConnectHttp http)
    {
        _http = http;
        Sets = new PluginSetsApi(http);
    }

    public PluginSetsApi Sets { get; }

    private sealed record ModeBody(InstallMode Mode);

    public async Task<InstallMode> ModeAsync(CancellationToken ct = default) =>
        (await _http.JsonAsync<ModeBody>(HttpMethod.Get, "/v1/project/user-install-mode", ct: ct).ConfigureAwait(false)
            ?? throw UsersApi.Empty()).Mode;

    public Task SetModeAsync(InstallMode mode, CancellationToken ct = default) =>
        mode == InstallMode.Unknown
            ? throw new ArgumentOutOfRangeException(nameof(mode), "Pick a mode: Off, Allowlist or Any.")
            : _http.SendAsync(HttpMethod.Put, "/v1/project/user-install-mode", new ModeBody(mode), ct: ct);

    public Task<IReadOnlyList<AllowedPlugin>> AllowedAsync(CancellationToken ct = default) =>
        _http.AllPagesAsync<AllowedPlugin>("/v1/project/allowed-plugins", null, ct);

    public Task AllowAsync(string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Put, $"/v1/project/allowed-plugins/{Paths.Id(pluginId)}", ct: ct);

    public Task DisallowAsync(string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, $"/v1/project/allowed-plugins/{Paths.Id(pluginId)}", ct: ct);
}

public sealed class PluginSetsApi
{
    private readonly ConnectHttp _http;

    internal PluginSetsApi(ConnectHttp http) => _http = http;

    private static string SetPath(string setId) => $"/v1/project/plugin-sets/{Paths.Id(setId)}";

    public Task<IReadOnlyList<PluginSet>> ListAsync(CancellationToken ct = default) =>
        _http.AllPagesAsync<PluginSet>("/v1/project/plugin-sets", null, ct);

    public async Task<PluginSet> CreateAsync(string name, IReadOnlyList<string>? pluginIds = null, CancellationToken ct = default) =>
        await _http.JsonAsync<PluginSet>(HttpMethod.Post, "/v1/project/plugin-sets",
            new { name, plugins = pluginIds }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public async Task<PluginSet> UpdateAsync(string setId, string? name = null, CancellationToken ct = default) =>
        await _http.JsonAsync<PluginSet>(HttpMethod.Patch, SetPath(setId), new { name }, ct: ct)
            .ConfigureAwait(false) ?? throw UsersApi.Empty();

    public Task DeleteAsync(string setId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, SetPath(setId), ct: ct);

    public Task AddAsync(string setId, string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Put, $"{SetPath(setId)}/plugins/{Paths.Id(pluginId)}", ct: ct);

    public Task RemoveAsync(string setId, string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, $"{SetPath(setId)}/plugins/{Paths.Id(pluginId)}", ct: ct);
}

/// <summary>The sessions of the project; a session token itself is shown once, when it is created.</summary>
public sealed class SessionsApi
{
    private readonly ConnectHttp _http;

    internal SessionsApi(ConnectHttp http) => _http = http;

    public async Task<Page<SessionInfo>> ListAsync(SessionListOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<Page<SessionInfo>>(HttpMethod.Get, "/v1/project/sessions",
            query: new Query().Add(options).Add("userId", options?.UserId), ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public async Task<SessionInfo> GetAsync(string sessionId, CancellationToken ct = default) =>
        await _http.JsonAsync<SessionInfo>(HttpMethod.Get, $"/v1/project/sessions/{Paths.Id(sessionId)}", ct: ct)
            .ConfigureAwait(false) ?? throw UsersApi.Empty();

    public Task DeleteAsync(string sessionId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, $"/v1/project/sessions/{Paths.Id(sessionId)}", ct: ct);
}

/// <summary>The sign-ins of the project's users to MCP servers. Tokens and values are never returned.</summary>
public sealed class ConnectionsApi
{
    private readonly ConnectHttp _http;

    internal ConnectionsApi(ConnectHttp http) => _http = http;

    private static Query QueryOf(ConnectionListOptions? options) =>
        new Query().Add("userId", options?.UserId).Add("componentId", options?.ComponentId);

    public Task<IReadOnlyList<Connection>> ListAsync(ConnectionListOptions? options = null, CancellationToken ct = default) =>
        _http.AllPagesAsync<Connection>("/v1/project/connections", QueryOf(options), ct);

    public IAsyncEnumerable<Connection> EnumerateAsync(ConnectionListOptions? options = null, CancellationToken ct = default) =>
        _http.PagesAsync<Connection>("/v1/project/connections", QueryOf(options), ConnectHttp.MaxPages, ct);

    /// <summary>An address to send the user to so they sign in; they come back to <paramref name="callbackUrl"/>.</summary>
    public async Task<StartedConnection> StartAsync(
        string userId, string componentId, string callbackUrl, CancellationToken ct = default) =>
        await _http.JsonAsync<StartedConnection>(HttpMethod.Post, "/v1/project/connections",
            new { userId, componentId, callbackUrl }, ct: ct, idempotencyKey: Guid.NewGuid().ToString("N")).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public Task DeleteAsync(string connectionId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, $"/v1/project/connections/{Paths.Id(connectionId)}", ct: ct);
}

/// <summary>
/// How the project signs its users in to MCP servers, and the values those servers need. A value is
/// sent and never read back. Only plugins with an MCP component have an auth config.
/// </summary>
public sealed class AuthConfigsApi
{
    private readonly ConnectHttp _http;

    internal AuthConfigsApi(ConnectHttp http) => _http = http;

    public Task<IReadOnlyList<AuthConfig>> ListAsync(CancellationToken ct = default) =>
        _http.AllPagesAsync<AuthConfig>("/v1/project/auth-configs", null, ct);

    public IAsyncEnumerable<AuthConfig> EnumerateAsync(CancellationToken ct = default) =>
        _http.PagesAsync<AuthConfig>("/v1/project/auth-configs", null, ConnectHttp.MaxPages, ct);

    /// <summary>Sets the values of a component; a null value clears it.</summary>
    public Task SetVariablesAsync(
        string componentId, IReadOnlyDictionary<string, string?> values, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Put, $"/v1/project/auth-configs/{Paths.Id(componentId)}/variables",
            new { values }, ct: ct);
}

public sealed class LogsApi
{
    private readonly ConnectHttp _http;

    internal LogsApi(ConnectHttp http) => _http = http;

    public async Task<Page<LogEntry>> ListAsync(LogListOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<Page<LogEntry>>(HttpMethod.Get, "/v1/project/logs",
            query: new Query().Add(options).Add("userId", options?.UserId).Add("action", options?.Action)
                .Add("from", options?.From).Add("to", options?.To), ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();
}
