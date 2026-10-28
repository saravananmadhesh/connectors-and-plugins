using System.Diagnostics;
using System.Globalization;
using System.Net;
using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace Syncfusion.BoldCreate.Connect.Internal;

internal sealed record RawAnswer(HttpStatusCode Status, HttpResponseHeaders Headers, HttpContentHeaders ContentHeaders, byte[] Bytes)
{
    public int StatusCode => (int)Status;
}

/// <summary>The settings one HTTP pipeline needs; a client and the sessions it makes share them.</summary>
internal sealed record Transport(
    HttpClient HttpClient,
    string BaseUrl,
    TimeSpan Timeout,
    ILogger? Logger,
    Func<TimeSpan, CancellationToken, Task> Delay,
    RetryOptions Retry);

/// <summary>Log messages carry the method and status only: never a path, header, body or value.</summary>
internal static partial class Log
{
    [LoggerMessage(EventId = 1, Level = LogLevel.Debug, Message = "Retrying {Method} (attempt {Attempt}, last status {Status})")]
    public static partial void Retrying(ILogger logger, string method, int attempt, int status);
}

internal static class Checks
{
    private static readonly HashSet<string> Loopback = new(StringComparer.OrdinalIgnoreCase) { "localhost", "127.0.0.1", "[::1]" };

    /// <summary>A base address must be https, or http on this machine; anything else sends the key in clear text.</summary>
    public static void BaseUrl(string baseUrl, bool allowInsecureHttp)
    {
        if (!Uri.TryCreate(baseUrl, UriKind.Absolute, out var url))
        {
            throw new ConnectError("The base URL is not a valid address.", "invalid_base_url", 0);
        }

        var secure = url.Scheme == Uri.UriSchemeHttps
            || (url.Scheme == Uri.UriSchemeHttp && (allowInsecureHttp || Loopback.Contains(url.Host)));
        if (!secure || url.UserInfo.Length > 0)
        {
            throw new ConnectError("The base URL must use https and carry no credentials.", "invalid_base_url", 0);
        }
    }

    /// <summary>A user id as Connect accepts it: 1 to 255 characters.</summary>
    public static void UserId(string? userId)
    {
        if (userId is null || userId.Length is < 1 or > 255)
        {
            throw new ConnectError("A user id must have 1 to 255 characters.", "invalid_user_id", 0);
        }
    }

    /// <summary>An idempotency key as the API accepts it: 1 to 255 printable characters without a space.</summary>
    public static void IdempotencyKey(string key)
    {
        if (key.Length is < 1 or > 255 || key.Any(c => c is < '!' or > '~'))
        {
            throw new ConnectError("An idempotency key has 1 to 255 printable characters, no spaces.", "invalid_idempotency_key", 0);
        }
    }

    public static void Options(ConnectClientOptions options)
    {
        BaseUrl(options.BaseUrl, options.AllowInsecureHttp);
        if (options.Timeout <= TimeSpan.Zero && options.Timeout != System.Threading.Timeout.InfiniteTimeSpan)
        {
            throw new ConnectError("The option Timeout must be longer than zero.", "invalid_option", 0);
        }

        var retry = options.Retry;
        if (retry.MaxRetries < 0 || retry.BaseDelay < TimeSpan.Zero || retry.MaxDelay < TimeSpan.Zero)
        {
            throw new ConnectError("The retry settings must be 0 or more.", "invalid_option", 0);
        }
    }
}

/// <summary>Query parameters; a null value is left out, as in the TypeScript SDK.</summary>
internal sealed class Query
{
    private readonly List<KeyValuePair<string, string>> _items = [];

    public IReadOnlyList<KeyValuePair<string, string>> Items => _items;

    public Query Add(string name, string? value)
    {
        if (value is not null) _items.Add(new(name, value));
        return this;
    }

    public Query Add(string name, int? value) =>
        Add(name, value?.ToString(CultureInfo.InvariantCulture));

    public Query Add(string name, bool? value) => Add(name, value is null ? null : value.Value ? "true" : "false");

    public Query Add(string name, DateTimeOffset? value) =>
        Add(name, value?.ToUniversalTime().ToString("yyyy-MM-dd'T'HH:mm:ss.fff'Z'", CultureInfo.InvariantCulture));

    public Query Add<T>(string name, T? value) where T : struct, Enum =>
        Add(name, value is null ? null : WireNames.ToWire(value.Value));

    public Query Add(PageOptions? page) => Add("cursor", page?.Cursor).Add("limit", page?.Limit);
}

/// <summary>One place that calls the API: bearer token, timeout, retry of idempotent calls, error mapping.</summary>
internal sealed class ConnectHttp(Transport transport, string token)
{
    /// <summary>Spans carry the method and status only: no path ids, headers or bodies.</summary>
    public static readonly ActivitySource Source = new("Syncfusion.BoldCreate.Connect", "0.1.0");

    public const int MaxPages = 200;

    private static readonly HashSet<int> RetryStatuses = [429, 502, 503];

    public static int? RetryAfterOf(string? value) =>
        value is not null && value.Trim().Length > 0 && value.Trim().All(char.IsAsciiDigit)
        && int.TryParse(value.Trim(), NumberStyles.None, CultureInfo.InvariantCulture, out var seconds)
            ? seconds
            : null;

    /// <summary>A JSON call; an answer without a body gives the default value.</summary>
    public async Task<T?> JsonAsync<T>(
        HttpMethod method, string path, object? body = null, Query? query = null,
        IReadOnlyDictionary<string, string>? headers = null, string? idempotencyKey = null, CancellationToken ct = default)
    {
        var answer = await RawAsync(method, path, body, query, headers, idempotencyKey, ct).ConfigureAwait(false);
        return answer.Bytes.Length == 0 ? default : Parse<T>(answer);
    }

    /// <summary>The JSON body of an answer; a body that is not JSON is an error of the API, not a crash.</summary>
    public static T Parse<T>(RawAnswer answer)
    {
        try
        {
            return JsonSerializer.Deserialize<T>(answer.Bytes, Json.Options)
                ?? throw new ConnectError("The answer is empty.", "invalid_response", answer.StatusCode);
        }
        catch (JsonException ex)
        {
            throw new ConnectError("The answer is not valid JSON.", "invalid_response", answer.StatusCode, null, ex);
        }
    }

    /// <summary>A call whose answer is not used.</summary>
    public async Task SendAsync(
        HttpMethod method, string path, object? body = null, Query? query = null, CancellationToken ct = default) =>
        await RawAsync(method, path, body, query, null, ct: ct).ConfigureAwait(false);

    /// <summary>The answer as bytes, with its status; any status of 400 and over throws.</summary>
    public async Task<RawAnswer> RawAsync(
        HttpMethod method, string path, object? body = null, Query? query = null,
        IReadOnlyDictionary<string, string>? headers = null, string? idempotencyKey = null, CancellationToken ct = default)
    {
        // GET, PUT and DELETE are idempotent in this API. A POST is retried only with an idempotency key,
        // because the API then answers a repeat with the first answer.
        if (idempotencyKey is not null)
        {
            Checks.IdempotencyKey(idempotencyKey);
            headers = new Dictionary<string, string>(headers ?? new Dictionary<string, string>()) { ["Idempotency-Key"] = idempotencyKey };
        }

        var idempotent = idempotencyKey is not null
            || method == HttpMethod.Get || method == HttpMethod.Put || method == HttpMethod.Delete;
        for (var attempt = 0; ; attempt++)
        {
            ct.ThrowIfCancellationRequested();
            RawAnswer? answer = null;
            Exception? cause = null;
            try
            {
                answer = await OnceAsync(method, path, body, query, headers, ct).ConfigureAwait(false);
            }
            catch (Exception error) when (error is HttpRequestException or TimeoutException or OperationCanceledException && !ct.IsCancellationRequested)
            {
                cause = error;
            }

            var retriable = idempotent && attempt < transport.Retry.MaxRetries
                && (answer is null || RetryStatuses.Contains(answer.StatusCode));
            if (retriable)
            {
                var asked = answer is null ? null : RetryAfterOf(Header(answer.Headers, "retry-after"));
                var delay = asked is { } seconds
                    ? TimeSpan.FromSeconds(seconds)
                    : TimeSpan.FromTicks((long)Math.Min(transport.Retry.BaseDelay.Ticks * Math.Pow(2, attempt), transport.Retry.MaxDelay.Ticks));
                if (delay > transport.Retry.MaxDelay) delay = transport.Retry.MaxDelay;
                if (transport.Logger is { } logger) Log.Retrying(logger, method.Method, attempt + 1, answer?.StatusCode ?? 0);
                await transport.Delay(delay, ct).ConfigureAwait(false);
                continue;
            }

            if (answer is null)
            {
                var timedOut = cause is OperationCanceledException or TimeoutException;
                var reason = timedOut ? "the request timed out" : cause?.Message ?? "unknown error";
                throw new ConnectError(
                    $"The request could not be made: {Redaction.Redact(reason)}",
                    timedOut ? "timeout" : "network_error", 0, null, cause);
            }

            if (answer.StatusCode >= 400) throw Failure(answer);
            return answer;
        }
    }

    private static string? Header(HttpHeaders headers, string name) =>
        headers.TryGetValues(name, out var values) ? values.FirstOrDefault() : null;

    private async Task<RawAnswer> OnceAsync(
        HttpMethod method, string path, object? body, Query? query,
        IReadOnlyDictionary<string, string>? headers, CancellationToken ct)
    {
        using var activity = Source.StartActivity("BoldCreate.Connect " + method.Method, ActivityKind.Client);
        activity?.SetTag("http.request.method", method.Method);
        using var request = new HttpRequestMessage(method, BuildUri(path, query));
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        if (headers is not null)
        {
            foreach (var (name, value) in headers)
            {
                if (name.Equals("accept", StringComparison.OrdinalIgnoreCase))
                {
                    request.Headers.Accept.Clear();
                    request.Headers.TryAddWithoutValidation("Accept", value);
                }
                else
                {
                    request.Headers.TryAddWithoutValidation(name, value);
                }
            }
        }

        if (body is not null)
        {
            request.Content = new ByteArrayContent(JsonSerializer.SerializeToUtf8Bytes(body, body.GetType(), Json.Options));
            request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        }

        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
        timeout.CancelAfter(transport.Timeout);
        using var response = await transport.HttpClient
            .SendAsync(request, HttpCompletionOption.ResponseContentRead, timeout.Token).ConfigureAwait(false);
        var bytes = await response.Content.ReadAsByteArrayAsync(timeout.Token).ConfigureAwait(false);
        activity?.SetTag("http.response.status_code", (int)response.StatusCode);
        if (response.Headers.TryGetValues("x-request-id", out var ids)) activity?.SetTag("connect.request_id", ids.FirstOrDefault());
        return new RawAnswer(response.StatusCode, response.Headers, response.Content.Headers, bytes);
    }

    private Uri BuildUri(string path, Query? query)
    {
        var builder = new StringBuilder(transport.BaseUrl.TrimEnd('/')).Append(path);
        if (query is { Items.Count: > 0 })
        {
            builder.Append('?');
            builder.AppendJoin('&', query.Items.Select(
                item => $"{Uri.EscapeDataString(item.Key)}={Uri.EscapeDataString(item.Value)}"));
        }

        return new Uri(builder.ToString());
    }

    /// <summary>Turns a failed answer into the error class that fits its status.</summary>
    private static ConnectError Failure(RawAnswer answer)
    {
        string? code = null, message = null, requestId = null;
        try
        {
            using var document = JsonDocument.Parse(answer.Bytes);
            if (document.RootElement.TryGetProperty("error", out var error) && error.ValueKind == JsonValueKind.Object)
            {
                code = Text(error, "code");
                message = Text(error, "message");
                requestId = Text(error, "requestId");
            }
        }
        catch (JsonException)
        {
            // an answer without a JSON body still has a status
        }

        code ??= $"http_{answer.StatusCode}";
        requestId ??= Header(answer.Headers, "x-request-id");
        message ??= $"The request failed with status {answer.StatusCode}.";
        return answer.StatusCode switch
        {
            401 or 403 => new ConnectAuthError(message, code, answer.StatusCode, requestId),
            404 => new ConnectNotFoundError(message, code, answer.StatusCode, requestId),
            429 => new ConnectRateLimitError(
                message, code, answer.StatusCode, requestId, RetryAfterOf(Header(answer.Headers, "retry-after"))),
            _ => new ConnectError(message, code, answer.StatusCode, requestId),
        };

        static string? Text(JsonElement element, string name) =>
            element.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.String ? value.GetString() : null;
    }

    /// <summary>Every item of a list that pages by cursor, one page at a time.</summary>
    public async IAsyncEnumerable<T> PagesAsync<T>(
        string path, Query? query = null, int maxPages = MaxPages,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        string? cursor = null;
        for (var page = 0; page < maxPages; page++)
        {
            var q = new Query();
            if (query is not null)
            {
                foreach (var item in query.Items) q.Add(item.Key, item.Value);
            }

            q.Add("limit", 100).Add("cursor", cursor);
            var result = await JsonAsync<Page<T>>(HttpMethod.Get, path, null, q, null, ct: ct).ConfigureAwait(false)
                ?? throw new ConnectError("The answer had no body.", "empty_answer", 200);
            foreach (var item in result.Items) yield return item;
            if (string.IsNullOrEmpty(result.NextCursor)) yield break;
            cursor = result.NextCursor;
        }
    }

    public async Task<IReadOnlyList<T>> AllPagesAsync<T>(string path, Query? query = null, CancellationToken ct = default)
    {
        var items = new List<T>();
        await foreach (var item in PagesAsync<T>(path, query, MaxPages, ct).ConfigureAwait(false)) items.Add(item);
        return items;
    }
}
