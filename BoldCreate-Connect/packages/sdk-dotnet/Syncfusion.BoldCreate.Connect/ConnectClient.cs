using Microsoft.Extensions.Logging;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect;

public sealed class ConnectClientOptions
{
    public const string DefaultBaseUrl = "https://api.boldcreate.com";

    /// <summary>A project key (<c>prk_</c>). Keep it on your server.</summary>
    public string ApiKey { get; set; } = string.Empty;

    public string BaseUrl { get; set; } = DefaultBaseUrl;

    /// <summary>The HTTP client to use. When it is not set the client makes and owns one.</summary>
    public HttpClient? HttpClient { get; set; }

    public TimeSpan Timeout { get; set; } = TimeSpan.FromSeconds(30);

    /// <summary>How GET, PUT and DELETE are retried; a POST never is.</summary>
    public RetryOptions Retry { get; set; } = new();

    /// <summary>Allow <c>http:</c> for a host that is not loopback. Off by default.</summary>
    public bool AllowInsecureHttp { get; set; }

    /// <summary>Receives retries and failures; never headers, bodies or variable values.</summary>
    public ILogger? Logger { get; set; }

    /// <summary>Used by <see cref="ConnectClient.GetSessionAsync"/> to reuse sessions. None by default.</summary>
    public ISessionCache? SessionCache { get; set; }

    /// <summary>A cached session is replaced this long before it expires.</summary>
    public TimeSpan SessionRenewMargin { get; set; } = TimeSpan.FromMinutes(5);

    public TimeProvider TimeProvider { get; set; } = TimeProvider.System;

    /// <summary>Waits between attempts and polls; tests replace it.</summary>
    internal Func<TimeSpan, CancellationToken, Task>? Delay { get; set; }
}

/// <summary>Retry policy for reads and idempotent writes. Defaults match the TypeScript SDK.</summary>
public sealed class RetryOptions
{
    /// <summary>Retries after the first attempt; 0 turns retrying off.</summary>
    public int MaxRetries { get; set; } = 3;

    /// <summary>Wait before the first retry; it doubles each time.</summary>
    public TimeSpan BaseDelay { get; set; } = TimeSpan.FromMilliseconds(250);

    /// <summary>The longest wait, also the cap on a <c>Retry-After</c>.</summary>
    public TimeSpan MaxDelay { get; set; } = TimeSpan.FromSeconds(10);
}

public sealed class CreateSessionOptions
{
    /// <summary>
    /// The plugins the session may see. <c>null</c> means no allow list. An empty list is refused:
    /// Connect reads it as "everything the user can see".
    /// </summary>
    public IReadOnlyList<string>? Plugins { get; set; }

    public string? Set { get; set; }

    public int? ExpiresInSeconds { get; set; }

    public ToolPolicy? Tools { get; set; }

    /// <summary>
    /// Your own key for this creation. Without one the client makes a key per call, so a retry after a
    /// network error gives back the first session instead of a second one.
    /// </summary>
    public string? IdempotencyKey { get; set; }
}

/// <summary>
/// The client of a host: manage the project's users, plugins, sessions, connections and logs with
/// a project key, and mint a <see cref="ConnectSession"/> for one user at a time.
/// </summary>
public sealed class ConnectClient : IDisposable
{
    private readonly ConnectHttp _http;
    private readonly Transport _transport;
    private readonly HttpClient? _owned;
    private readonly ConnectClientOptions _options;
    private readonly System.Collections.Concurrent.ConcurrentDictionary<string, SemaphoreSlim> _locks = new(StringComparer.Ordinal);

    public ConnectClient(ConnectClientOptions options)
    {
        ArgumentNullException.ThrowIfNull(options);
        if (string.IsNullOrEmpty(options.ApiKey))
        {
            throw new ConnectError("An API key is required.", "invalid_key", 0);
        }

        _options = options;
        var client = options.HttpClient;
        if (client is null)
        {
            _owned = new HttpClient { Timeout = System.Threading.Timeout.InfiniteTimeSpan };
            client = _owned;
        }

        if (string.IsNullOrWhiteSpace(options.BaseUrl)) options.BaseUrl = ConnectClientOptions.DefaultBaseUrl;
        Checks.Options(options);
        BaseUrl = options.BaseUrl;
        var delay = options.Delay ?? ((span, ct) => Task.Delay(span, ct));
        _transport = new Transport(client, BaseUrl, options.Timeout, options.Logger, delay, options.Retry);
        _http = new ConnectHttp(_transport, options.ApiKey);
        Users = new UsersApi(_http);
        Sessions = new SessionsApi(_http);
        Plugins = new PluginsApi(_http);
        Catalog = new CatalogPolicyApi(_http);
        AuthConfigs = new AuthConfigsApi(_http);
        Connections = new ConnectionsApi(_http);
        Logs = new LogsApi(_http);
        Webhooks = new WebhooksApi(_http);
    }

    public UsersApi Users { get; }

    public SessionsApi Sessions { get; }

    public PluginsApi Plugins { get; }

    public CatalogPolicyApi Catalog { get; }

    public AuthConfigsApi AuthConfigs { get; }

    public ConnectionsApi Connections { get; }

    public LogsApi Logs { get; }

    public WebhooksApi Webhooks { get; }

    public string BaseUrl { get; }

    private sealed record Created(
        string Token, string Id, string UserId, DateTimeOffset ExpiresAt);

    /// <summary>A session for one user of the host, who is added to the project if new.</summary>
    public async Task<ConnectSession> CreateAsync(
        string userId, CreateSessionOptions? options = null, CancellationToken ct = default)
    {
        Checks.UserId(userId);
        if (options?.Plugins is { Count: 0 })
        {
            throw new ConnectError(
                "An empty plugin list means \"everything the user can see\". Pass null for no allow list or name the plugins.",
                "invalid_plugins", 0);
        }

        var created = await _http.JsonAsync<Created>(HttpMethod.Post, "/v1/project/sessions", new
        {
            userId,
            plugins = options?.Plugins,
            set = options?.Set,
            expiresInSeconds = options?.ExpiresInSeconds,
            tools = options?.Tools,
        }, ct: ct, idempotencyKey: options?.IdempotencyKey ?? Guid.NewGuid().ToString("N")).ConfigureAwait(false) ?? throw UsersApi.Empty();
        return new ConnectSession(
            created.Token,
            new SessionIdentity(created.Id, created.UserId, created.ExpiresAt),
            _transport,
            token => RenewAsync(userId, options, token));
    }

    /// <summary>
    /// A session for the user, reused from <see cref="ConnectClientOptions.SessionCache"/> while it has more than
    /// the renew margin left. Without a cache this is the same as <see cref="CreateAsync"/>. Calls for the same
    /// user and options at the same time share one creation.
    /// </summary>
    public async Task<ConnectSession> GetSessionAsync(
        string userId, CreateSessionOptions? options = null, CancellationToken ct = default)
    {
        var cache = _options.SessionCache;
        if (cache is null) return await CreateAsync(userId, options, ct).ConfigureAwait(false);
        var key = SessionCacheKey.Of(userId, options);
        var gate = _locks.GetOrAdd(key, static _ => new SemaphoreSlim(1, 1));
        await gate.WaitAsync(ct).ConfigureAwait(false);
        try
        {
            var cached = await cache.GetAsync(key, ct).ConfigureAwait(false);
            if (cached is not null && cached.Identity.ExpiresAt - _options.SessionRenewMargin > _options.TimeProvider.GetUtcNow())
            {
                return new ConnectSession(cached.Token, cached.Identity, _transport, token => RenewAsync(userId, options, token));
            }

            var session = await CreateAsync(userId, options, ct).ConfigureAwait(false);
            await cache.SetAsync(
                key, new CachedSession(session.Token, new SessionIdentity(session.Id, session.UserId, session.ExpiresAt)), ct)
                .ConfigureAwait(false);
            return session;
        }
        finally
        {
            gate.Release();
        }
    }

    /// <summary>Forgets the cached session of a user and options, for example after the user signs out.</summary>
    public async Task ForgetSessionAsync(string userId, CreateSessionOptions? options = null, CancellationToken ct = default)
    {
        if (_options.SessionCache is { } cache)
        {
            await cache.RemoveAsync(SessionCacheKey.Of(userId, options), ct).ConfigureAwait(false);
        }
    }

    // A renewed session is a new creation, so it must not reuse the key of the first one.
    private Task<ConnectSession> RenewAsync(string userId, CreateSessionOptions? options, CancellationToken ct) =>
        CreateAsync(userId, options is null ? null : new CreateSessionOptions
        {
            Plugins = options.Plugins,
            Set = options.Set,
            ExpiresInSeconds = options.ExpiresInSeconds,
            Tools = options.Tools,
        }, ct);

    public async Task<Usage> UsageAsync(UsageOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<Usage>(HttpMethod.Get, "/v1/project/usage",
            query: new Query().Add("from", options?.From).Add("to", options?.To), ct: ct).ConfigureAwait(false)
            ?? throw UsersApi.Empty();

    /// <summary>The key never shows in what is printed.</summary>
    public override string ToString() => Redaction.Redact($"ConnectClient({BaseUrl})");

    public void Dispose() => _owned?.Dispose();
}
