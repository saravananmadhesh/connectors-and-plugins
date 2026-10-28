using System.Net;
using ProjectHostExample;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

/// <summary>The .NET example host (examples/project-host-dotnet) against a fake HTTP handler: no network, no key.</summary>
public sealed class ProjectHostTests : IDisposable
{
    private const string Key = "prk_0123456789abcdef.PROJECT-KEY-PROJECT-KEY-PROJECT";
    private const string Token = "stk_fedcba9876543210.zyxwvutsrqponmlkjihgfedcba012345";

    private readonly string _dir = Path.Combine(Path.GetTempPath(), "connect-host-" + Guid.NewGuid().ToString("N"));

    public void Dispose()
    {
        if (Directory.Exists(_dir)) Directory.Delete(_dir, recursive: true);
    }

    private static string Session(string expires) =>
        "{\"id\":\"ses_1\",\"userId\":\"user-42\",\"token\":\"" + Token + "\",\"expiresAt\":\"" + expires + "\"}";

    private const string Manifest =
        "{\"revision\":\"rev1\",\"pollAfterSeconds\":60,\"skipped\":[],\"entries\":[{\"installationId\":\"i\",\"pluginId\":\"plg_a\",\"pluginName\":\"alpha\",\"versionId\":\"v\",\"version\":\"1\",\"scope\":\"user\",\"yanked\":false,\"sha256\":\"\",\"sizeBytes\":0,\"href\":\"\",\"components\":[],"
        + "\"mcp\":[{\"componentId\":\"cmp_1\",\"name\":\"search\",\"serverName\":\"alpha-search\",\"url\":\"https://gateway.test/alpha-search/mcp\",\"transport\":\"http\",\"description\":\"\",\"ready\":true,\"setup\":{\"kind\":\"none\"}},"
        + "{\"componentId\":\"cmp_2\",\"name\":\"git\",\"serverName\":\"alpha-git\",\"url\":\"https://gateway.test/alpha-git/mcp\",\"transport\":\"http\",\"description\":\"\",\"ready\":false,\"setup\":{\"kind\":\"connect\"}}],\"setup\":{\"kind\":\"none\"}}]}";

    private (ProjectHost Host, FakeConnectHandler Handler) Make()
    {
        var handler = new FakeConnectHandler();
        handler.Default = request => request.RequestUri!.AbsolutePath switch
        {
            "/v1/project/sessions" => FakeConnectHandler.Reply(HttpStatusCode.Created, Session(DateTimeOffset.UtcNow.AddDays(30).ToString("O", System.Globalization.CultureInfo.InvariantCulture))),
            "/v1/sync" => FakeConnectHandler.Reply(HttpStatusCode.OK, Manifest),
            "/v1/session/connections" => FakeConnectHandler.Reply(HttpStatusCode.OK, "{\"redirectUrl\":\"https://sign-in.test/alpha-git\"}"),
            _ => new HttpResponseMessage(HttpStatusCode.NoContent),
        };
        var client = new ConnectClient(new ConnectClientOptions
        {
            ApiKey = Key,
            BaseUrl = "https://api.test",
            HttpClient = new HttpClient(handler),
            SessionCache = new MemorySessionCache(),
        });
        return (new ProjectHost(client, _dir), handler);
    }

    [Fact]
    public async Task Prepares_a_user_with_servers_an_mcp_file_and_a_sign_in_link()
    {
        var (host, _) = Make();
        var result = await host.PrepareUserAsync("user-42", "https://yourapp.example/back");

        Assert.Equal(["alpha-search", "alpha-git"], result.Servers);
        var link = Assert.Single(result.SignIn);
        Assert.Equal(("alpha-git", "https://sign-in.test/alpha-git"), (link.Server, link.RedirectUrl));
        Assert.False(result.Files.Stale);

        var mcp = await File.ReadAllTextAsync(Path.Combine(_dir, "user-42", "mcp.json"));
        Assert.Contains("\"alpha-search\"", mcp);
        Assert.Contains("Bearer ${CONNECT_TOKEN}", mcp);
    }

    [Fact]
    public async Task Never_writes_the_token_or_the_key_to_disk_or_into_the_result()
    {
        var (host, _) = Make();
        var result = await host.PrepareUserAsync("user-42", "https://yourapp.example/back");
        var everything = string.Concat(Directory.EnumerateFiles(_dir, "*", SearchOption.AllDirectories).Select(File.ReadAllText))
            + System.Text.Json.JsonSerializer.Serialize(result);
        Assert.DoesNotContain("stk_", everything);
        Assert.DoesNotContain("PROJECT-KEY", everything);
    }

    [Fact]
    public async Task Reuses_one_session_per_user()
    {
        var (host, handler) = Make();
        await host.PrepareUserAsync("user-42", "https://yourapp.example/back");
        await host.PrepareUserAsync("user-42", "https://yourapp.example/back");
        Assert.Single(handler.Calls, c => c.Request.RequestUri!.AbsolutePath == "/v1/project/sessions");
    }
}
