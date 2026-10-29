// Group D: Sessions.
// .NET SDK end-to-end cases. Every case states its scenario and expected result in the comment above it.
//
// How to run (after `pnpm dev` and `node examples/sdk-test/setup-local.mjs`, from the repo root)
//   dotnet run --project examples/sdk-test-dotnet -- D        this group only
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

internal static class GroupDSessions
{
    public static async Task Run()
    {
        var userB = Uid("bob");
        ConnectSession sessionA = null!;

        // Scenario: CreateAsync(userA). Expected: stk_ token, about 30 days.
        await T("D1", "create a session for a new user", async () =>
        {
            sessionA = await connect.CreateAsync(userA);
            MarkUser(userA);
            var days = (sessionA.ExpiresAt - DateTimeOffset.UtcNow).TotalDays;
            Ok(sessionA.Token.StartsWith("stk_", StringComparison.Ordinal), "not stk_");
            Ok(days is > 29 and < 31, $"days {days}");
            Ok(!sessionA.ToString().Contains(sessionA.Token, StringComparison.Ordinal), "ToString shows the token");
            return new { sessionA.Id, sessionA.UserId, days = Math.Round(days) };
        });

        // Scenario: same IdempotencyKey twice. Expected: the same session id.
        await T("D2", "same idempotency key gives back the first session", async () =>
        {
            var key = $"idem-{run}";
            var one = await connect.CreateAsync(userB, new CreateSessionOptions { IdempotencyKey = key });
            var two = await connect.CreateAsync(userB, new CreateSessionOptions { IdempotencyKey = key });
            Ok(one.Id == two.Id, $"{one.Id} {two.Id}");
            return one.Id;
        });

        // Scenario: Plugins = ["ralph-loop"]. Expected: manifest has ralph-loop only.
        await T("D3", "plugin allow-list narrows the session", async () =>
        {
            var s = await connect.CreateAsync(Uid("d3"), new CreateSessionOptions { Plugins = ["ralph-loop"] });
            var names = (await s.ManifestAsync()).Manifest!.Entries.Select(e => e.PluginName).ToList();
            Ok(names.SequenceEqual(["ralph-loop"]), string.Join(",", names));
            return names;
        });

        // Scenario: Plugins = ["teaching"] (not in the project). Expected: refused.
        await T("D4", "allow-list naming a plugin outside the project is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("d4"), new CreateSessionOptions { Plugins = ["teaching"] })));

        // Scenario: ExpiresInSeconds 3600. Expected: about an hour.
        await T("D5", "ExpiresInSeconds sets the lifetime", async () =>
        {
            var s = await connect.CreateAsync(Uid("d5"), new CreateSessionOptions { ExpiresInSeconds = 3600 });
            var minutes = (s.ExpiresAt - DateTimeOffset.UtcNow).TotalMinutes;
            Ok(minutes is > 55 and < 65, $"minutes {minutes}");
            return Math.Round(minutes);
        });

        // Scenario: 366 days. Expected: refused.
        await T("D6", "lifetime over 365 days is refused", () => Rejects<ConnectError>(() => connect.CreateAsync(Uid("d6"), new CreateSessionOptions { ExpiresInSeconds = 366 * 86400 })));

        // Scenario: Tools = { Disable = ["deepwiki.ask_question"], DisableDestructive = true }. Expected: stored.
        await T("D7", "tool policy is stored on the session", async () =>
        {
            var s = await connect.CreateAsync(Uid("d7"), new CreateSessionOptions { Tools = new ToolPolicy { Disable = ["deepwiki.ask_question"], DisableDestructive = true } });
            var info = await connect.Sessions.GetAsync(s.Id);
            Ok(info.Tools.Disable?.Contains("deepwiki.ask_question") == true, JsonSerializer.Serialize(info.Tools));
            return info.Tools;
        });

        // Scenario: Sessions.ListAsync(UserId = userB). Expected: only userB.
        await T("D8", "Sessions.ListAsync filters by user", async () =>
        {
            var page = await connect.Sessions.ListAsync(new SessionListOptions { UserId = userB });
            Ok(page.Items.Count >= 1 && page.Items.All(s => s.UserId == userB), "other users");
            return page.Items.Select(s => $"{s.UserId}:{s.Status}");
        });

        // Scenario: Limit 1 then the cursor. Expected: two different ids.
        await T("D9", "Sessions.ListAsync pages by cursor", async () =>
        {
            var one = await connect.Sessions.ListAsync(new SessionListOptions { Limit = 1 });
            Ok(one.NextCursor is not null, "no cursor");
            var two = await connect.Sessions.ListAsync(new SessionListOptions { Limit = 1, Cursor = one.NextCursor });
            Ok(one.Items[0].Id != two.Items[0].Id, "same item");
            return new[] { one.Items[0].Id, two.Items[0].Id };
        });

        // Scenario: GetAsync of an unknown id. Expected: ConnectNotFoundError.
        await T("D10", "Sessions.GetAsync of an unknown id is 404", () => Rejects<ConnectNotFoundError>(() => connect.Sessions.GetAsync("pjs_00000000000000000000000000000000")));

        // Scenario: DeleteAsync, then use the token. Expected: revoked, 401.
        await T("D11", "deleting a session ends it at once", async () =>
        {
            var s = await connect.CreateAsync(Uid("d11"));
            await connect.Sessions.DeleteAsync(s.Id);
            var info = await connect.Sessions.GetAsync(s.Id);
            var refused = await Rejects<ConnectAuthError>(() => s.ManifestAsync());
            Ok(info.Status == SessionStatus.Revoked, $"{info.Status}");
            return new { info.Status, refused };
        });

        // Scenario: RefreshAsync. Expected: new id, same user.
        await T("D12", "RefreshAsync gives a new session for the same user", async () =>
        {
            var fresh = await sessionA.RefreshAsync();
            Ok(fresh.Id != sessionA.Id && fresh.UserId == sessionA.UserId, "not fresh");
            return new { old = sessionA.Id, @new = fresh.Id };
        });

        // Scenario: RefreshAsync on a FromToken session. Expected: refresh_unavailable.
        await T("D13", "RefreshAsync on a FromToken session is refused", () => Rejects<ConnectError>(() => ConnectSession.FromToken(sessionA.Token, new SessionIdentity(sessionA.Id, sessionA.UserId, sessionA.ExpiresAt), new ConnectClientOptions { BaseUrl = baseUrl }).RefreshAsync(), "refresh_unavailable"));

        // Scenario: 21 live sessions for one user. Expected: the 21st refused.
        await T("D14", "a user can hold at most 20 live sessions", async () =>
        {
            var who = Uid("d14");
            var made = 0;
            try
            {
                for (; made < 21; made++) await connect.CreateAsync(who);
            }
            catch (ConnectError e)
            {
                Ok(made == 20, $"refused after {made}: {Describe(e)}");
                return $"refused at #{made + 1}: {e.Code} {e.Status}";
            }
            throw new ExpectedException("21 sessions were made");
        });
    }
}
