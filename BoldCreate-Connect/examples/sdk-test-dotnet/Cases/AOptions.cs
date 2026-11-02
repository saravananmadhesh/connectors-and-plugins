// Group A: Options and input checks (offline).
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- A        this group only
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

internal static class GroupAOptions
{
    public static async Task Run()
    {
        // Scenario: new ConnectClient with an empty key. Expected: ConnectError invalid_key.
        await T("A1", "constructor refuses an empty key", () => Throws<ConnectError>(() => _ = new ConnectClient(new ConnectClientOptions()), "invalid_key"));

        // Scenario: BaseUrl http://example.com. Expected: invalid_base_url.
        await T("A2", "http base URL on a remote host is refused", () => Throws<ConnectError>(() => _ = Client("prk_x", o => o.BaseUrl = "http://example.com"), "invalid_base_url"));

        // Scenario: same with AllowInsecureHttp. Expected: made.
        await T("A3", "AllowInsecureHttp lets an http host through", async () =>
        {
            using var c = Client("prk_x", o => { o.BaseUrl = "http://example.com"; o.AllowInsecureHttp = true; });
            return await Task.FromResult<object?>(c.BaseUrl);
        });

        // Scenario: base URL with user:password@. Expected: invalid_base_url.
        await T("A4", "base URL with credentials is refused", () => Throws<ConnectError>(() => _ = Client("prk_x", o => o.BaseUrl = "https://u:p@api.example.com"), "invalid_base_url"));

        // Scenario: ToString of a client and of a session identity. Expected: no key.
        await T("A5", "ToString never shows the key", () =>
        {
            var text = connect.ToString();
            Ok(!text.Contains(projectKey, StringComparison.Ordinal), "key shown");
            return Task.FromResult<object?>(text);
        });

        // Scenario: CreateAsync with Plugins = []. Expected: invalid_plugins.
        await T("A6", "CreateAsync refuses an empty plugin list", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("a6"), new CreateSessionOptions { Plugins = [] }), "invalid_plugins"));

        // Scenario: user id "" and 256 characters. Expected: invalid_user_id.
        await T("A7", "CreateAsync refuses a user id of 0 or 256 characters", async () =>
        {
            await Rejects<ConnectError>(() => connect.CreateAsync(""), "invalid_user_id");
            return await Rejects<ConnectError>(() => connect.CreateAsync(new string('x', 256)), "invalid_user_id");
        });

        // Scenario: IdempotencyKey "has space". Expected: invalid_idempotency_key.
        await T("A8", "idempotency key with a space is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("a8"), new CreateSessionOptions { IdempotencyKey = "has space" }), "invalid_idempotency_key"));

        // Scenario: Timeout -1 s and Retry.MaxRetries -1. Expected: invalid_option.
        await T("A9", "negative timeout and retries are refused", async () =>
        {
            await Throws<ConnectError>(() => _ = Client("prk_x", o => o.Timeout = TimeSpan.FromSeconds(-1)), "invalid_option");
            return await Throws<ConnectError>(() => _ = Client("prk_x", o => o.Retry = new RetryOptions { MaxRetries = -1 }), "invalid_option");
        });

        // Scenario: ConnectSession.FromToken("prk_abc"). Expected: invalid_token.
        await T("A10", "FromToken refuses a token that is not stk_", () => Throws<ConnectError>(() => ConnectSession.FromToken("prk_abc", new SessionIdentity("x", "u", DateTimeOffset.UtcNow)), "invalid_token"));

        // Scenario: ToMcpConfig standard / vscode / literal. Expected: placeholder unless LiteralToken.
        await T("A11", "ToMcpConfig standard, vscode and literal token", () =>
        {
            var servers = new[] { new McpServer("a", "https://g/a/mcp", new Dictionary<string, string> { ["Authorization"] = "Bearer stk_secret" }, true, new ConnectSetup(SetupKind.None)) };
            var std = JsonNode.Parse(servers.ToMcpConfig())!;
            var vs = JsonNode.Parse(servers.ToMcpConfig(new McpConfigOptions { Format = McpConfigFormat.Vscode }))!;
            var lit = JsonNode.Parse(servers.ToMcpConfig(new McpConfigOptions { LiteralToken = true }))!;
            Ok(std["mcpServers"]!["a"]!["headers"]!["Authorization"]!.GetValue<string>() == $"Bearer {McpConfig.TokenPlaceholder}", "standard keeps the token");
            Ok(vs["servers"]!["a"] is not null, "vscode shape");
            Ok(lit["mcpServers"]!["a"]!["headers"]!["Authorization"]!.GetValue<string>() == "Bearer stk_secret", "literal");
            return Task.FromResult<object?>(std["mcpServers"]!["a"]!.ToJsonString());
        });
    }
}
