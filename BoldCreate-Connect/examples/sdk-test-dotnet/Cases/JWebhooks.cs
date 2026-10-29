// Group J: Webhooks.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- J        this group only
//   dotnet run --project examples/sdk-test-dotnet               every group

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
using static SdkTest.Lib;

namespace SdkTest.Cases;

internal static class GroupJWebhooks
{
    public static async Task Run()
    {
        string Sign(string secret, string id, string ts, string body) =>
            "v1," + Convert.ToBase64String(HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), Encoding.UTF8.GetBytes($"{id}.{ts}.{body}")));
        var sample = JsonSerializer.Serialize(new { id = "evt_1", type = "user.created", createdAt = DateTimeOffset.UtcNow, projectId = S("projectId"), data = new { } });
        string Now() => DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString();
        KeyValuePair<string, string?>[] Headers(string id, string ts, string sig) => [new("webhook-id", id), new("webhook-timestamp", ts), new("webhook-signature", sig)];

        // Scenario: Verify a good signature / a tampered body / a 301 s old timestamp / two signatures.
        // Expected: event / webhook_invalid / webhook_invalid / event.
        await T("J1", "Webhooks.Verify accepts a good signature", () =>
        {
            Ok(webhookSecret is not null, "no webhook secret in state");
            var ts = Now();
            var e = connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = Headers("m1", ts, Sign(webhookSecret!, "m1", ts, sample)), Secret = webhookSecret! });
            return Task.FromResult<object?>(e.Type);
        });
        await T("J2", "Webhooks.Verify refuses a tampered body", () =>
        {
            var ts = Now();
            return Throws<ConnectError>(() => connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample.Replace("user.created", "user.createe", StringComparison.Ordinal)), Headers = Headers("m1", ts, Sign(webhookSecret!, "m1", ts, sample)), Secret = webhookSecret! }), "webhook_invalid");
        });
        await T("J3", "Webhooks.Verify refuses an old timestamp", () =>
        {
            var ts = (DateTimeOffset.UtcNow.ToUnixTimeSeconds() - 301).ToString();
            return Throws<ConnectError>(() => connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = Headers("m", ts, Sign(webhookSecret!, "m", ts, sample)), Secret = webhookSecret! }), "webhook_invalid");
        });
        await T("J4", "Webhooks.Verify with several signatures", () =>
        {
            var ts = Now();
            var e = connect.Webhooks.Verify(new VerifyWebhookOptions { RawBody = Encoding.UTF8.GetBytes(sample), Headers = [new("Webhook-Id", "m2"), new("Webhook-Timestamp", ts), new("Webhook-Signature", $"{Sign("old", "m2", ts, sample)} {Sign(webhookSecret!, "m2", ts, sample)}")], Secret = webhookSecret! });
            return Task.FromResult<object?>(e.Id);
        });

        // Scenario: DeliveriesAsync with and without Status. Expected: deliveries, filter applies.
        await T("J6", "Webhooks.DeliveriesAsync", async () =>
        {
            var page = await connect.Webhooks.DeliveriesAsync(new DeliveryListOptions { Limit = 50 });
            var delivered = await connect.Webhooks.DeliveriesAsync(new DeliveryListOptions { Status = DeliveryStatus.Delivered });
            Ok(page.Items.Count > 0 && delivered.Items.All(d => d.Status == DeliveryStatus.Delivered), "deliveries");
            return new { types = page.Items.Select(d => d.Type).Distinct(), statuses = page.Items.Select(d => d.Status).Distinct() };
        });

        // Scenario: real deliveries saved by the receiver (SDK_TEST_WEBHOOK_LOG). Expected: all verify.
        await T("J7", "a real delivery passes Webhooks.Verify", () =>
        {
            var log = Environment.GetEnvironmentVariable("SDK_TEST_WEBHOOK_LOG");
            Ok(log is not null && File.Exists(log), "SDK_TEST_WEBHOOK_LOG not set (no receiver); skipped");
            var types = File.ReadAllLines(log!).Select(l => JsonNode.Parse(l)!).Select(d => connect.Webhooks.Verify(new VerifyWebhookOptions
            {
                RawBody = Encoding.UTF8.GetBytes(d["rawBody"]!.GetValue<string>()),
                Headers = d["headers"]!.AsObject().Select(h => new KeyValuePair<string, string?>(h.Key, h.Value?.ToString())),
                Secret = webhookSecret!,
                ToleranceSeconds = 86400,
            }).Type).Distinct().ToList();
            return Task.FromResult<object?>(types);
        });
    }
}
