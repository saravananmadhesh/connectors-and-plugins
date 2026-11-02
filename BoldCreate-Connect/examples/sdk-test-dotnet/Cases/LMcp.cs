// Group L: MCP through the session.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- L        this group only
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

internal static class GroupLMcp
{
    public static async Task Run()
    {
        var sessionK = await SharedSession("kate");

        // Scenario: initialize, tools/list, tools/call on DeepWiki with McpAsync's URL and headers. Expected: answers.
        await T("L1", "DeepWiki: initialize, tools/list, tools/call", async () =>
        {
            var dw = (await sessionK.McpAsync(new McpOptions { Plugin = "deepwiki" }))[0];
            var init = await Post(dw.Url, dw.Headers, Init());
            Ok(init.Status == 200, $"initialize {init.Status} {init.Json}");
            var list = await Post(dw.Url, dw.Headers, Rpc("tools/list"), init.McpSession);
            var tools = list.Json?["result"]?["tools"]?.AsArray().Select(t => t!["name"]!.GetValue<string>()).ToList() ?? [];
            var call = await Post(dw.Url, dw.Headers, Rpc("tools/call", new { name = tools[0], arguments = new { repoName = "syncfusion/BoldCreate-Plugins" } }), init.McpSession);
            var text = call.Json?["result"]?["content"]?[0]?["text"]?.GetValue<string>();
            Ok(text is not null, $"tools/call {call.Status} {call.Json}");
            return new { tools, answer = text![..Math.Min(60, text!.Length)] };
        });

        // Scenario: a session with Tools.Disable ["deepwiki.ask_question"]. Expected: tools/list hides it.
        await T("L2", "session tool policy hides a disabled tool", async () =>
        {
            var s = await connect.CreateAsync(Uid("l2"), new CreateSessionOptions { Tools = new ToolPolicy { Disable = ["deepwiki.ask_question"] } });
            var dw = (await s.McpAsync(new McpOptions { Plugin = "deepwiki" }))[0];
            var init = await Post(dw.Url, dw.Headers, Init());
            var list = await Post(dw.Url, dw.Headers, Rpc("tools/list"), init.McpSession);
            var tools = list.Json?["result"]?["tools"]?.AsArray().Select(t => t!["name"]!.GetValue<string>()).ToList() ?? [];
            Ok(!tools.Contains("ask_question") && tools.Count > 0, string.Join(",", tools));
            return tools;
        });

        // Scenario: Context7 with its project key: tools/call. Expected: answer.
        await T("L4", "Context7 tools/call through the session", async () =>
        {
            var c7 = (await sessionK.McpAsync(new McpOptions { Plugin = "context7" }))[0];
            var init = await Post(c7.Url, c7.Headers, Init());
            var call = await Post(c7.Url, c7.Headers, Rpc("tools/call", new { name = "resolve-library-id", arguments = new { libraryName = "maui" } }), init.McpSession);
            Ok(call.Json?["result"]?["content"] is not null, $"{call.Status} {call.Json}");
            return call.Json!["result"]!["content"]![0]!["text"]!.GetValue<string>()[..40];
        });
    }
}
