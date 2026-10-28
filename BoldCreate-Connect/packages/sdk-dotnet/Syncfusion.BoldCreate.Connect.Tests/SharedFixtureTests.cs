using System.Text;
using System.Text.Json;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect.Tests;

/// <summary>The same JSON files the TypeScript tests read (packages/sdk/fixtures), so the SDKs cannot drift on them.</summary>
public class SharedFixtureTests
{
    private sealed class Clock(DateTimeOffset now) : TimeProvider
    {
        public override DateTimeOffset GetUtcNow() => now;
    }

    private static JsonElement Fixture(string name) =>
        JsonDocument.Parse(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "fixtures", name))).RootElement;

    public static TheoryData<int> McpCases()
    {
        var data = new TheoryData<int>();
        for (var i = 0; i < Fixture("mcp-config.json").GetArrayLength(); i++) data.Add(i);
        return data;
    }

    public static TheoryData<int> RedactCases()
    {
        var data = new TheoryData<int>();
        for (var i = 0; i < Fixture("redact.json").GetArrayLength(); i++) data.Add(i);
        return data;
    }

    public static TheoryData<int> WebhookCases()
    {
        var data = new TheoryData<int>();
        for (var i = 0; i < Fixture("webhook.json").GetProperty("cases").GetArrayLength(); i++) data.Add(i);
        return data;
    }

    [Theory]
    [MemberData(nameof(McpCases))]
    public void Mcp_config_matches(int index)
    {
        var item = Fixture("mcp-config.json")[index];
        var servers = item.GetProperty("servers").Deserialize<List<McpServer>>(Json.Options)!;
        var options = item.GetProperty("options");
        var config = new McpConfigOptions
        {
            Format = options.GetProperty("format").GetString() == "vscode" ? McpConfigFormat.Vscode : McpConfigFormat.Standard,
            LiteralToken = options.TryGetProperty("literalToken", out var literal) && literal.GetBoolean(),
        };
        Assert.Equal(item.GetProperty("expected").GetString(), servers.ToMcpConfig(config));
    }

    [Theory]
    [MemberData(nameof(RedactCases))]
    public void Redaction_matches(int index)
    {
        var item = Fixture("redact.json")[index];
        Assert.Equal(item.GetProperty("expected").GetString(), Redaction.Redact(item.GetProperty("input").GetString()!));
    }

    [Theory]
    [MemberData(nameof(WebhookCases))]
    public void Webhook_verification_matches(int index)
    {
        var file = Fixture("webhook.json");
        var item = file.GetProperty("cases")[index];
        var expected = item.GetProperty("expected");
        var options = new VerifyWebhookOptions
        {
            RawBody = Encoding.UTF8.GetBytes(item.GetProperty("rawBody").GetString()!),
            Headers = item.GetProperty("headers").EnumerateObject()
                .Select(p => new KeyValuePair<string, string?>(p.Name, p.Value.GetString())).ToList(),
            Secret = file.GetProperty("secret").GetString()!,
            ToleranceSeconds = file.GetProperty("toleranceSeconds").GetInt32(),
            TimeProvider = new Clock(DateTimeOffset.Parse(file.GetProperty("now").GetString()!, System.Globalization.CultureInfo.InvariantCulture)),
        };

        if (expected.GetProperty("ok").GetBoolean())
        {
            var evt = Webhooks.Verify(options);
            Assert.Equal(expected.GetProperty("type").GetString(), evt.Type);
            Assert.Equal(expected.GetProperty("id").GetString(), evt.Id);
            Assert.Equal(expected.GetProperty("userId").GetString(), evt.UserId);
        }
        else
        {
            var error = Assert.Throws<ConnectError>(() => Webhooks.Verify(options));
            Assert.Equal(expected.GetProperty("code").GetString(), error.Code);
            Assert.Equal(expected.GetProperty("status").GetInt32(), error.Status);
            Assert.Equal(expected.GetProperty("message").GetString(), error.Message);
        }
    }
}
