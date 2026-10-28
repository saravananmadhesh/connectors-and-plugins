using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect;

public sealed record VerifyWebhookOptions
{
    /// <summary>The body exactly as it arrived.</summary>
    public required ReadOnlyMemory<byte> RawBody { get; init; }

    /// <summary>The request headers; names are matched without regard to case.</summary>
    public required IEnumerable<KeyValuePair<string, string?>> Headers { get; init; }

    public required string Secret { get; init; }

    public int ToleranceSeconds { get; init; } = Webhooks.DefaultToleranceSeconds;

    /// <summary>The time to compare with; tests set it.</summary>
    public TimeProvider? TimeProvider { get; init; }
}

public static partial class Webhooks
{
    public const int DefaultToleranceSeconds = 300;

    [GeneratedRegex(@"^\d{1,12}$")]
    private static partial Regex TimestampPattern();

    private static ConnectError Invalid(string message) => new(message, "webhook_invalid", 400);

    private static string? HeaderOf(IEnumerable<KeyValuePair<string, string?>> headers, string name) =>
        headers.FirstOrDefault(h => h.Key.Equals(name, StringComparison.OrdinalIgnoreCase)).Value;

    /// <summary>
    /// Checks the signature and the age of a webhook and returns its body. The signature is HMAC-SHA256
    /// over <c>&lt;webhook-id&gt;.&lt;webhook-timestamp&gt;.&lt;raw body&gt;</c> in base64, sent as <c>v1,&lt;signature&gt;</c>;
    /// a header with several signatures passes when any one matches.
    /// </summary>
    public static WebhookEvent Verify(VerifyWebhookOptions options)
    {
        ArgumentNullException.ThrowIfNull(options);
        var id = HeaderOf(options.Headers, "webhook-id");
        var timestamp = HeaderOf(options.Headers, "webhook-timestamp");
        var signature = HeaderOf(options.Headers, "webhook-signature");
        if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(timestamp) || string.IsNullOrEmpty(signature))
        {
            throw Invalid("The webhook headers are missing.");
        }

        if (!TimestampPattern().IsMatch(timestamp)) throw Invalid("The webhook timestamp is not valid.");

        var now = (options.TimeProvider ?? TimeProvider.System).GetUtcNow().ToUnixTimeSeconds();
        if (Math.Abs(now - long.Parse(timestamp, System.Globalization.CultureInfo.InvariantCulture)) > options.ToleranceSeconds)
        {
            throw Invalid("The webhook timestamp is outside the allowed time.");
        }

        var body = options.RawBody.Span;
        var prefix = Encoding.UTF8.GetBytes($"{id}.{timestamp}.");
        var signed = new byte[prefix.Length + body.Length];
        prefix.CopyTo(signed, 0);
        body.CopyTo(signed.AsSpan(prefix.Length));
        var expected = Encoding.UTF8.GetBytes(
            "v1," + Convert.ToBase64String(HMACSHA256.HashData(Encoding.UTF8.GetBytes(options.Secret), signed)));

        var matches = false;
        foreach (var candidate in signature.Split(' '))
        {
            var given = Encoding.UTF8.GetBytes(candidate);
            if (given.Length == expected.Length && CryptographicOperations.FixedTimeEquals(given, expected)) matches = true;
        }

        if (!matches) throw Invalid("The webhook signature does not match.");

        try
        {
            return JsonSerializer.Deserialize<WebhookEvent>(body, Json.Options)
                ?? throw Invalid("The webhook body is not JSON.");
        }
        catch (JsonException)
        {
            throw Invalid("The webhook body is not JSON.");
        }
    }
}

/// <summary>Webhook helpers on the client: <c>Verify</c> works offline, <c>DeliveriesAsync</c> calls the API.</summary>
public sealed class WebhooksApi
{
    private readonly ConnectHttp _http;

    internal WebhooksApi(ConnectHttp http) => _http = http;

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Performance", "CA1822:Mark members as static",
        Justification = "Kept on the instance so client.Webhooks.Verify mirrors the TypeScript SDK.")]
    public WebhookEvent Verify(VerifyWebhookOptions options) => Webhooks.Verify(options);

    public async Task<Page<WebhookDelivery>> DeliveriesAsync(DeliveryListOptions? options = null, CancellationToken ct = default) =>
        await _http.JsonAsync<Page<WebhookDelivery>>(HttpMethod.Get, "/v1/project/webhook/deliveries",
            query: new Query().Add(options).Add("status", options?.Status), ct: ct).ConfigureAwait(false) ?? throw UsersApi.Empty();
}
