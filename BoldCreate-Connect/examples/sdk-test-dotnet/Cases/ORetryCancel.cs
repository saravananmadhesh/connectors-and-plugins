// Group O: Cancellation, retry.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- O        this group only
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

internal static class GroupORetryCancel
{
    public static async Task Run()
    {
        // Scenario: a cancelled token. Expected: OperationCanceledException (the .NET way), no call.
        await T("O1", "a cancelled token stops the call", () =>
        {
            using var cts = new CancellationTokenSource();
            cts.Cancel();
            return Rejects<OperationCanceledException>(() => connect.Users.ListAsync(ct: cts.Token));
        });

        // Scenario: a handler answering 503 twice. Expected: success on the third attempt.
        await T("O3", "GET is retried on 503", async () =>
        {
            var handler = new FailFirst(2, HttpStatusCode.ServiceUnavailable);
            using var c = Client(projectKey, o => { o.HttpClient = new HttpClient(handler); o.Retry = new RetryOptions { BaseDelay = TimeSpan.FromMilliseconds(10) }; });
            await c.Users.ListAsync(new UserListOptions { Limit = 1 });
            Ok(handler.Calls == 3, $"calls {handler.Calls}");
            return handler.Calls;
        });

        // Scenario: Timeout 1 ms, no retries. Expected: ConnectError network_error/timeout without the key.
        await T("O6", "timeout gives a ConnectError without the key", async () =>
        {
            using var c = Client(projectKey, o => { o.Timeout = TimeSpan.FromMilliseconds(1); o.Retry = new RetryOptions { MaxRetries = 0 }; });
            try { await c.UsageAsync(); }
            catch (ConnectError e)
            {
                Ok(!e.Message.Contains(projectKey, StringComparison.Ordinal), "key in message");
                return $"{e.Code} {e.Message}";
            }
            throw new ExpectedException("no timeout");
        });

        await T("O7", "errors carry a RequestId", async () =>
        {
            try { await connect.Sessions.GetAsync("pjs_00000000000000000000000000000000"); }
            catch (ConnectError e)
            {
                Ok(!string.IsNullOrEmpty(e.RequestId), "no request id");
                return e.RequestId;
            }
            throw new ExpectedException("no error");
        });
    }
}
