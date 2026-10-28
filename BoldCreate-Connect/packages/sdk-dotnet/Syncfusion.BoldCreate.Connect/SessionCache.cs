using System.Collections.Concurrent;
using System.Text.Json;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect;

/// <summary>What a cache keeps of a session. The token is a secret: an out-of-process cache must encrypt it at rest.</summary>
public sealed record CachedSession(string Token, SessionIdentity Identity)
{
    /// <summary>Never prints the token.</summary>
    public override string ToString() => $"CachedSession({Identity.Id}, {Identity.UserId})";
}

/// <summary>Where a host keeps live sessions so it reuses them instead of creating one per request. Plug in Redis by implementing this.</summary>
public interface ISessionCache
{
    ValueTask<CachedSession?> GetAsync(string key, CancellationToken ct = default);

    ValueTask SetAsync(string key, CachedSession session, CancellationToken ct = default);

    ValueTask RemoveAsync(string key, CancellationToken ct = default);
}

/// <summary>An in-process cache. Entries are dropped when the session expires.</summary>
public sealed class MemorySessionCache(TimeProvider? timeProvider = null) : ISessionCache
{
    private readonly ConcurrentDictionary<string, CachedSession> _items = new(StringComparer.Ordinal);
    private readonly TimeProvider _time = timeProvider ?? TimeProvider.System;

    public ValueTask<CachedSession?> GetAsync(string key, CancellationToken ct = default)
    {
        if (_items.TryGetValue(key, out var item))
        {
            if (item.Identity.ExpiresAt > _time.GetUtcNow()) return ValueTask.FromResult<CachedSession?>(item);
            _items.TryRemove(key, out _);
        }

        return ValueTask.FromResult<CachedSession?>(null);
    }

    public ValueTask SetAsync(string key, CachedSession session, CancellationToken ct = default)
    {
        _items[key] = session;
        return ValueTask.CompletedTask;
    }

    public ValueTask RemoveAsync(string key, CancellationToken ct = default)
    {
        _items.TryRemove(key, out _);
        return ValueTask.CompletedTask;
    }
}

internal static class SessionCacheKey
{
    /// <summary>One key per user and per way the session was asked for; plugin order does not matter.</summary>
    public static string Of(string userId, CreateSessionOptions? options) =>
        JsonSerializer.Serialize(new
        {
            userId,
            plugins = options?.Plugins?.Order(StringComparer.Ordinal).ToArray(),
            set = options?.Set,
            expires = options?.ExpiresInSeconds,
            tools = options?.Tools is null ? null : new
            {
                disable = options.Tools.Disable?.Order(StringComparer.Ordinal).ToArray(),
                options.Tools.DisableDestructive,
            },
        }, Json.Options);
}
