using System.Security.Cryptography;
using System.Text.Json;
using System.Text.RegularExpressions;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect;

/// <summary>What identifies a session apart from its token.</summary>
public sealed record SessionIdentity(string Id, string UserId, DateTimeOffset ExpiresAt);

public sealed record McpOptions
{
    /// <summary>Only the servers of this plugin (its name or its id).</summary>
    public string? Plugin { get; init; }

    /// <summary>Throw <see cref="ConnectSetupRequiredError"/> for a server that is not ready.</summary>
    public bool RequireReady { get; init; }
}

public sealed record WaitOptions
{
    public TimeSpan Timeout { get; init; } = TimeSpan.FromMinutes(2);

    public TimeSpan PollInterval { get; init; } = TimeSpan.FromSeconds(2);
}

/// <summary>An MCP server of a plugin with what the user still has to do before it works.</summary>
public sealed record SessionAuthConfig(
    string PluginId,
    string ComponentId,
    string ServerName,
    string? AuthConfigId,
    McpAuthMode AuthMode,
    ConnectSetup Setup,
    bool Ready);

/// <summary>A sign-in that was started; send the user to <see cref="RedirectUrl"/>, then wait for it to finish.</summary>
public sealed class ConnectRequest
{
    private readonly Func<WaitOptions?, CancellationToken, Task<Connection>> _wait;

    internal ConnectRequest(string redirectUrl, Func<WaitOptions?, CancellationToken, Task<Connection>> wait)
    {
        RedirectUrl = redirectUrl;
        _wait = wait;
    }

    public string RedirectUrl { get; }

    public Task<Connection> WaitForConnectionAsync(WaitOptions? options = null, CancellationToken ct = default) =>
        _wait(options, ct);
}

/// <summary>
/// One user's session: the token an agent or the host's browser code uses for that user only. The
/// token is held privately; <see cref="ToString"/> never shows it.
/// </summary>
public sealed partial class ConnectSession
{
    private readonly string _token;
    private readonly ConnectHttp _http;
    private readonly Transport _transport;
    private readonly Func<CancellationToken, Task<ConnectSession>>? _renew;

    internal ConnectSession(
        string token, SessionIdentity identity, Transport transport,
        Func<CancellationToken, Task<ConnectSession>>? renew = null)
    {
        _token = token;
        _transport = transport;
        _http = new ConnectHttp(transport, token);
        _renew = renew;
        Id = identity.Id;
        UserId = identity.UserId;
        ExpiresAt = identity.ExpiresAt;
        Plugins = new SessionPluginsApi(_http);
    }

    public string Id { get; }

    public string UserId { get; }

    public DateTimeOffset ExpiresAt { get; }

    public SessionPluginsApi Plugins { get; }

    /// <summary>The token, for the one place that hands it to an agent.</summary>
    public string Token => _token;

    /// <summary>Rebuilds a session from a stored token and what was stored with it.</summary>
    public static ConnectSession FromToken(string token, SessionIdentity identity, ConnectClientOptions? options = null)
    {
        ArgumentNullException.ThrowIfNull(identity);
        if (token is null || !token.StartsWith("stk_", StringComparison.Ordinal))
        {
            throw new ConnectError("A session token starts with stk_.", "invalid_token", 0);
        }

        options ??= new ConnectClientOptions();
        if (string.IsNullOrWhiteSpace(options.BaseUrl)) options.BaseUrl = ConnectClientOptions.DefaultBaseUrl;
        Checks.Options(options);
        var client = options.HttpClient ?? new HttpClient { Timeout = System.Threading.Timeout.InfiniteTimeSpan };
        var delay = options.Delay ?? ((span, ct) => Task.Delay(span, ct));
        return new ConnectSession(token, identity, new Transport(client, options.BaseUrl, options.Timeout, options.Logger, delay, options.Retry));
    }

    /// <summary>The servers an agent can be pointed at; each carries the session token in its headers.</summary>
    public async Task<IReadOnlyList<McpServer>> McpAsync(McpOptions? options = null, CancellationToken ct = default)
    {
        var result = await ManifestAsync(null, ct).ConfigureAwait(false);
        var servers = new List<McpServer>();
        if (result.Manifest is null) return servers;
        foreach (var entry in result.Manifest.Entries)
        {
            if (options?.Plugin is { } plugin && entry.PluginName != plugin && entry.PluginId != plugin) continue;
            foreach (var server in entry.Mcp)
            {
                if (options?.RequireReady == true && !server.Ready)
                {
                    throw new ConnectSetupRequiredError(
                        $"{server.ServerName} is not ready to use.", "setup_required", 0, server.Setup);
                }

                servers.Add(new McpServer(
                    server.ServerName,
                    server.Url,
                    new Dictionary<string, string> { ["Authorization"] = $"Bearer {_token}" },
                    server.Ready,
                    server.Setup));
            }
        }

        return servers;
    }

    [GeneratedRegex("^cmp_")]
    private static partial Regex ComponentIdPattern();

    private sealed record RedirectBody(string RedirectUrl);

    /// <summary>Starts the user's sign-in to a server, named by its component id or its server name.</summary>
    public async Task<ConnectRequest> AuthorizeAsync(
        string componentOrServer, string callbackUrl, CancellationToken ct = default)
    {
        var componentId = ComponentIdPattern().IsMatch(componentOrServer)
            ? componentOrServer
            : await ComponentOfAsync(componentOrServer, ct).ConfigureAwait(false);
        var started = await _http.JsonAsync<RedirectBody>(HttpMethod.Post, "/v1/session/connections",
            new { componentId, callbackUrl }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();
        return new ConnectRequest(started.RedirectUrl, (wait, token) => WaitForAsync(componentId, wait, token));
    }

    /// <summary>What each server of the user's plugins needs: the auth setup and whether it is ready.</summary>
    public async Task<IReadOnlyList<SessionAuthConfig>> AuthConfigsAsync(CancellationToken ct = default)
    {
        var plugins = await Plugins.ListAsync(ct).ConfigureAwait(false);
        return plugins.SelectMany(plugin => plugin.Mcp.Select(server => new SessionAuthConfig(
            plugin.PluginId, server.ComponentId, server.ServerName, server.AuthConfigId,
            server.AuthMode, server.Setup, server.Ready))).ToList();
    }

    /// <summary>The plugins this user may install.</summary>
    public async Task<CatalogPage> CatalogAsync(CatalogQuery? query = null, CancellationToken ct = default) =>
        await _http.JsonAsync<CatalogPage>(HttpMethod.Get, "/v1/session/catalog",
            query: Paths.CatalogQuery(query), ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    /// <summary>The plugin files to place. Pass the last revision to get "not modified" when it is current.</summary>
    public async Task<ManifestResult> ManifestAsync(ManifestQuery? query = null, CancellationToken ct = default)
    {
        var q = new Query()
            .Add("kinds", query?.Kinds is null ? null : string.Join(',', query.Kinds.Select(WireNames.ToWire)))
            .Add("plugins", query?.Plugins is null ? null : string.Join(',', query.Plugins));
        var headers = string.IsNullOrEmpty(query?.Revision)
            ? null
            : new Dictionary<string, string> { ["If-None-Match"] = $"\"{query.Revision}\"" };
        var answer = await _http.RawAsync(HttpMethod.Get, "/v1/sync", null, q, headers, ct: ct).ConfigureAwait(false);
        if (answer.StatusCode == 304) return new ManifestResult(null);
        return new ManifestResult(ConnectHttp.Parse<Manifest>(answer));
    }

    /// <summary>One component archive, checked against its hash and size before it is returned.</summary>
    public async Task<byte[]> ComponentAsync(string sha256, CancellationToken ct = default)
    {
        var answer = await _http.RawAsync(HttpMethod.Get, $"/v1/sync/components/{Paths.Id(sha256)}", null, null,
            new Dictionary<string, string> { ["Accept"] = "application/gzip" }, ct: ct).ConfigureAwait(false);
        var declared = answer.ContentHeaders.ContentLength;
        if (declared is { } length && length != answer.Bytes.Length)
        {
            throw new ConnectIntegrityError(
                "The component has a different size than announced.", "integrity_size", answer.StatusCode);
        }

        var actual = Convert.ToHexString(SHA256.HashData(answer.Bytes)).ToLowerInvariant();
        if (!string.Equals(actual, sha256, StringComparison.Ordinal))
        {
            throw new ConnectIntegrityError(
                "The component does not match its hash.", "integrity_hash", answer.StatusCode);
        }

        return answer.Bytes;
    }

    /// <summary>Tells the API which components were placed.</summary>
    public Task ReportAsync(SyncReport report, CancellationToken ct = default)
    {
        ArgumentNullException.ThrowIfNull(report);
        return _http.SendAsync(HttpMethod.Post, "/v1/sync/reports",
            new { target = report.Target, applied = report.Applied, skipped = report.Skipped ?? [] }, ct: ct);
    }

    /// <summary>A fresh session for the same user; only a session made by <see cref="ConnectClient.CreateAsync"/> can do this.</summary>
    public Task<ConnectSession> RefreshAsync(CancellationToken ct = default) =>
        _renew is null
            ? throw new ConnectError("This session was not created here, so it cannot be renewed.", "refresh_unavailable", 0)
            : _renew(ct);

    /// <summary>What may be printed or logged; never the token.</summary>
    public override string ToString() => $"ConnectSession({Id}, {UserId})";

    private async Task<string> ComponentOfAsync(string serverName, CancellationToken ct)
    {
        var result = await ManifestAsync(null, ct).ConfigureAwait(false);
        var found = result.Manifest?.Entries
            .SelectMany(entry => entry.Mcp)
            .FirstOrDefault(server => server.ServerName == serverName);
        return found?.ComponentId
            ?? throw new ConnectNotFoundError($"No server named {serverName} was found for this user.", "not_found", 404);
    }

    private async Task<Connection> WaitForAsync(string componentId, WaitOptions? options, CancellationToken ct)
    {
        options ??= new WaitOptions();
        var waited = TimeSpan.Zero;
        for (;;)
        {
            var connections = await _http.AllPagesAsync<Connection>("/v1/session/connections", null, ct).ConfigureAwait(false);
            var found = connections.FirstOrDefault(
                c => c.ComponentId == componentId && c.Status == ConnectionStatus.Active);
            if (found is not null) return found;
            if (waited + options.PollInterval > options.Timeout)
            {
                throw new ConnectError("The sign-in did not finish in time.", "connection_timeout", 0);
            }

            await _transport.Delay(options.PollInterval, ct).ConfigureAwait(false);
            waited += options.PollInterval;
        }
    }
}

/// <summary>The plugins of the session's user.</summary>
public sealed class SessionPluginsApi
{
    private readonly ConnectHttp _http;

    internal SessionPluginsApi(ConnectHttp http) => _http = http;

    private static string PluginPath(string pluginId) => $"/v1/session/plugins/{Paths.Id(pluginId)}";

    public Task<IReadOnlyList<UserPlugin>> ListAsync(CancellationToken ct = default) =>
        _http.AllPagesAsync<UserPlugin>("/v1/session/plugins", null, ct);

    public IAsyncEnumerable<UserPlugin> EnumerateAsync(CancellationToken ct = default) =>
        _http.PagesAsync<UserPlugin>("/v1/session/plugins", null, ConnectHttp.MaxPages, ct);

    public async Task<ProjectPlugin> InstallAsync(string pluginId, InstallOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<ProjectPlugin>(HttpMethod.Put, PluginPath(pluginId),
            new { versionId = options?.VersionId }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public async Task<ProjectPlugin> UpdateAsync(string pluginId, string versionId, CancellationToken ct = default) =>
        await _http.JsonAsync<ProjectPlugin>(HttpMethod.Put, PluginPath(pluginId),
            new { versionId }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    public Task RemoveAsync(string pluginId, CancellationToken ct = default) =>
        _http.SendAsync(HttpMethod.Delete, PluginPath(pluginId), ct: ct);

    /// <summary>Sets the values a plugin asks for; a value is sent and never read back.</summary>
    public async Task<UserPlugin> SetVariablesAsync(
        string pluginId, IReadOnlyDictionary<string, string?> values, CancellationToken ct = default) =>
        await _http.JsonAsync<UserPlugin>(HttpMethod.Put, $"{PluginPath(pluginId)}/variables",
            new { values }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    /// <summary>Turns one component on or off for the user; on a project-provided plugin this stores the user's own preference.</summary>
    public async Task<UserPlugin> SetComponentEnabledAsync(
        string pluginId, string componentId, bool enabled, CancellationToken ct = default) =>
        await _http.JsonAsync<UserPlugin>(HttpMethod.Put, $"{PluginPath(pluginId)}/components/{Paths.Id(componentId)}",
            new { enabled }, ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();

    /// <summary>Drops the user's own preference for one component, so the user follows the install again.</summary>
    public async Task<UserPlugin> ClearComponentEnabledAsync(
        string pluginId, string componentId, CancellationToken ct = default) =>
        await _http.JsonAsync<UserPlugin>(HttpMethod.Delete, $"{PluginPath(pluginId)}/components/{Paths.Id(componentId)}",
            ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();
}
