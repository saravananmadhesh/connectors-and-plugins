using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Syncfusion.BoldCreate.Connect.Extensions;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

public class ExtensionsTests
{
    private const string Key = "prk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz";

    private static string Session(string id, DateTimeOffset expires) =>
        "{\"id\":\"" + id + "\",\"userId\":\"u1\",\"token\":\"stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz\",\"plugins\":[\"a\"],\"tools\":{},\"authConfigs\":[],\"status\":\"active\",\"createdAt\":\"2026-01-01T00:00:00Z\",\"expiresAt\":\""
        + expires.ToString("O", System.Globalization.CultureInfo.InvariantCulture) + "\",\"lastUsedAt\":null}";

    private sealed class Clock(DateTimeOffset now) : TimeProvider
    {
        public DateTimeOffset Now { get; set; } = now;

        public override DateTimeOffset GetUtcNow() => Now;
    }

    private static (ConnectClient Client, FakeConnectHandler Handler, Clock Clock) Make()
    {
        var handler = new FakeConnectHandler();
        var clock = new Clock(new DateTimeOffset(2026, 1, 1, 0, 0, 0, TimeSpan.Zero));
        var client = new ConnectClient(new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            HttpClient = new HttpClient(handler),
            TimeProvider = clock,
            SessionCache = new MemorySessionCache(clock),
        });
        return (client, handler, clock);
    }

    [Fact]
    public async Task Reuses_a_cached_session_until_the_renew_margin()
    {
        var (client, handler, clock) = Make();
        handler.Enqueue(HttpStatusCode.Created, Session("ses_1", clock.Now.AddHours(1)));
        handler.Enqueue(HttpStatusCode.Created, Session("ses_2", clock.Now.AddHours(2)));
        var options = new CreateSessionOptions { Plugins = ["b", "a"] };

        var first = await client.GetSessionAsync("u1", options);
        var again = await client.GetSessionAsync("u1", new CreateSessionOptions { Plugins = ["a", "b"] });
        Assert.Equal("ses_1", again.Id);
        Assert.Equal(first.Token, again.Token);
        Assert.Single(handler.Calls);

        clock.Now = clock.Now.AddMinutes(56);
        Assert.Equal("ses_2", (await client.GetSessionAsync("u1", options)).Id);
        Assert.Equal(2, handler.Calls.Count);
    }

    [Fact]
    public async Task Different_users_and_options_do_not_share_a_session()
    {
        var (client, handler, clock) = Make();
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.Created, Session("ses_x", clock.Now.AddHours(1)));
        await client.GetSessionAsync("u1");
        await client.GetSessionAsync("u2");
        await client.GetSessionAsync("u1", new CreateSessionOptions { Plugins = ["a"] });
        Assert.Equal(3, handler.Calls.Count);
    }

    [Fact]
    public async Task Concurrent_calls_share_one_creation_and_forget_drops_it()
    {
        var (client, handler, clock) = Make();
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.Created, Session("ses_x", clock.Now.AddHours(1)));
        await Task.WhenAll(Enumerable.Range(0, 5).Select(_ => client.GetSessionAsync("u1")));
        Assert.Single(handler.Calls);
        await client.ForgetSessionAsync("u1");
        await client.GetSessionAsync("u1");
        Assert.Equal(2, handler.Calls.Count);
    }

    [Fact]
    public async Task Without_a_cache_every_call_creates()
    {
        var handler = new FakeConnectHandler();
        handler.Default = _ => FakeConnectHandler.Reply(HttpStatusCode.Created, Session("s", DateTimeOffset.UtcNow.AddHours(1)));
        using var client = new ConnectClient(new ConnectClientOptions { ApiKey = Key, HttpClient = new HttpClient(handler) });
        await client.GetSessionAsync("u1");
        await client.GetSessionAsync("u1");
        Assert.Equal(2, handler.Calls.Count);
    }

    [Fact]
    public void Cached_session_never_prints_its_token() =>
        Assert.DoesNotContain("stk_", new CachedSession("stk_secret", new SessionIdentity("a", "b", DateTimeOffset.UtcNow)).ToString());

    [Fact]
    public void Registers_the_client_from_code_and_from_configuration()
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddBoldCreateConnect(o => o.ApiKey = Key);
        services.AddBoldCreateConnectMemorySessionCache();
        using var provider = services.BuildServiceProvider();
        var client = provider.GetRequiredService<ConnectClient>();
        Assert.Same(client, provider.GetRequiredService<ConnectClient>());
        Assert.Equal("https://api.boldcreate.com", client.BaseUrl);

        var configuration = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Connect:ApiKey"] = Key,
            ["Connect:BaseUrl"] = "https://api.other",
        }).Build();
        var second = new ServiceCollection();
        second.AddLogging();
        second.AddBoldCreateConnect(configuration.GetSection("Connect"));
        using var other = second.BuildServiceProvider();
        Assert.Equal("https://api.other", other.GetRequiredService<ConnectClient>().BaseUrl);
    }
}
