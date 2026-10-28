using Syncfusion.BoldCreate.Connect;
using Syncfusion.BoldCreate.Connect.Sync;

namespace ProjectHostExample;

/// <summary>A sign-in the user still has to follow.</summary>
public sealed record SignInLink(string Server, string RedirectUrl);

/// <summary>What <see cref="ProjectHost.PrepareUserAsync"/> did for one user. It holds no token.</summary>
public sealed record PreparedUser(
    string UserId, SyncResult Files, IReadOnlyList<string> Servers, IReadOnlyList<SignInLink> SignIn);

/// <summary>
/// What a host's server does for one of its users with <c>Syncfusion.BoldCreate.Connect</c>: reuse the user's
/// session, put the plugin files in the user's folder, write the MCP configuration for the agent and
/// find the servers that still need a sign-in. The same flow as <c>examples/project-host/host.mjs</c>.
/// The project key never leaves the <see cref="ConnectClient"/>, and the session token is never written to
/// disk: the MCP file carries a placeholder.
/// </summary>
public sealed class ProjectHost(ConnectClient client, string dir)
{
    /// <summary>Plugins named here are all a user sees; <c>null</c> leaves the user's own installs visible too.</summary>
    public IReadOnlyList<string>? Plugins { get; init; }

    public async Task<PreparedUser> PrepareUserAsync(string userId, string callbackUrl, CancellationToken ct = default)
    {
        // GetSessionAsync reuses one live session per user (a user may have 20; do not make one per request).
        var session = await client.GetSessionAsync(userId, new CreateSessionOptions { Plugins = Plugins }, ct);
        var folder = Path.Combine(dir, userId);

        var files = await session.SyncPluginsAsync(new SyncOptions { Dir = folder }, ct);

        var servers = await session.McpAsync(ct: ct);

        // The token stays a placeholder in the file; the agent's process gets it from CONNECT_TOKEN.
        await File.WriteAllTextAsync(Path.Combine(folder, "mcp.json"), servers.ToMcpConfig(), ct);

        var signIn = new List<SignInLink>();
        foreach (var server in servers.Where(s => !s.Ready && s.Setup.Kind == SetupKind.Connect))
        {
            var request = await session.AuthorizeAsync(server.Name, callbackUrl, ct);
            signIn.Add(new SignInLink(server.Name, request.RedirectUrl));
        }

        return new PreparedUser(userId, files, [.. servers.Select(s => s.Name)], signIn);
    }
}
