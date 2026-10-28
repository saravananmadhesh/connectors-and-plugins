using System.IO.Compression;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Syncfusion.BoldCreate.Connect.Sync;
using Syncfusion.BoldCreate.Connect.Testing;

namespace Syncfusion.BoldCreate.Connect.Tests;

public sealed class SyncTests : IDisposable
{
    private readonly string _dir = Path.Combine(Path.GetTempPath(), "connect-sync-" + Guid.NewGuid().ToString("N"));
    private readonly FakeConnectHandler _handler = new();
    private readonly Dictionary<string, byte[]> _archives = [];
    private string _manifest = Manifest();
    private int _manifestStatus = 200;

    public SyncTests()
    {
        _handler.Default = request =>
        {
            var path = request.RequestUri!.AbsolutePath;
            if (path == "/v1/sync")
            {
                if (_manifestStatus != 200) return new HttpResponseMessage((HttpStatusCode)_manifestStatus);
                var etag = request.Headers.IfNoneMatch.FirstOrDefault()?.Tag;
                if (etag is not null && etag == "\"" + RevisionOf(_manifest) + "\"") return new HttpResponseMessage(HttpStatusCode.NotModified);
                return FakeConnectHandler.Reply(HttpStatusCode.OK, _manifest);
            }

            if (path.StartsWith("/v1/sync/components/", StringComparison.Ordinal))
            {
                var sha = path[(path.LastIndexOf('/') + 1)..];
                return _archives.TryGetValue(sha, out var bytes)
                    ? new HttpResponseMessage(HttpStatusCode.OK) { Content = new ByteArrayContent(bytes) }
                    : new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        };
    }

    public void Dispose()
    {
        if (Directory.Exists(_dir)) Directory.Delete(_dir, recursive: true);
    }

    private static string RevisionOf(string manifest) => JsonDocument.Parse(manifest).RootElement.GetProperty("revision").GetString()!;

    private static byte[] Tar(IEnumerable<(string Path, string Content, char Type)> entries)
    {
        using var raw = new MemoryStream();
        foreach (var (path, content, type) in entries)
        {
            var header = new byte[512];
            Encoding.ASCII.GetBytes(path).CopyTo(header, 0);
            var body = Encoding.UTF8.GetBytes(content);
            Encoding.ASCII.GetBytes(Convert.ToString(body.Length, 8).PadLeft(11, '0')).CopyTo(header, 124);
            header[156] = (byte)type;
            Encoding.ASCII.GetBytes("ustar").CopyTo(header, 257);
            raw.Write(header);
            raw.Write(body);
            raw.Write(new byte[(512 - (body.Length % 512)) % 512]);
        }

        raw.Write(new byte[1024]);
        using var output = new MemoryStream();
        using (var gzip = new GZipStream(output, CompressionLevel.Fastest, leaveOpen: true)) gzip.Write(raw.ToArray());
        return output.ToArray();
    }

    private static string Sha(byte[] bytes) => Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();

    private string Add(params (string Path, string Content)[] files)
    {
        var archive = Tar(files.Select(f => (f.Path, f.Content, '0')));
        var sha = Sha(archive);
        _archives[sha] = archive;
        return sha;
    }

    private static string Manifest(string revision = "r1", params (string Id, string Plugin, string Kind, string Name, string Sha)[] components)
    {
        var byPlugin = components.GroupBy(c => c.Plugin).Select(g =>
            "{\"installationId\":\"i\",\"pluginId\":\"plg_" + g.Key + "\",\"pluginName\":\"" + g.Key + "\",\"versionId\":\"v\",\"version\":\"1\",\"scope\":\"user\",\"yanked\":false,\"sha256\":\"x\",\"sizeBytes\":1,\"href\":\"h\",\"components\":["
            + string.Join(",", g.Select(c => "{\"id\":\"" + c.Id + "\",\"kind\":\"" + c.Kind + "\",\"name\":\"" + c.Name + "\",\"enabled\":true,\"sha256\":\"" + c.Sha + "\",\"sizeBytes\":1,\"href\":\"h\",\"path\":\"p\"}"))
            + "],\"mcp\":[],\"setup\":{\"kind\":\"none\"}}");
        return "{\"revision\":\"" + revision + "\",\"pollAfterSeconds\":60,\"entries\":[" + string.Join(",", byPlugin) + "],\"skipped\":[]}";
    }

    private ConnectSession Session(string userId = "u1") =>
        ConnectSession.FromToken(
            "stk_0123456789abcdef.abcdefghijklmnopqrstuvwxyz",
            new SessionIdentity("ses_1", userId, DateTimeOffset.UtcNow.AddDays(1)),
            new ConnectClientOptions
            {
                BaseUrl = "https://api.test",
                HttpClient = new HttpClient(_handler),
                Delay = (_, _) => Task.CompletedTask,
            });

    private string Read(string relative) => File.ReadAllText(Path.Combine(_dir, relative));

    [Fact]
    public async Task Places_files_writes_the_lock_and_reports()
    {
        var sha = Add(("skill/SKILL.md", "hello"), ("skill/ref/a.txt", "a"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "greeter", sha));
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });

        Assert.Equal(["cmp_1"], result.Added.Select(a => a.ComponentId));
        Assert.Equal("hello", Read("alpha/skill/SKILL.md"));
        Assert.Equal("a", Read("alpha/skill/ref/a.txt"));

        var lockJson = JsonDocument.Parse(Read(".connect/lock.json")).RootElement;
        Assert.Equal(1, lockJson.GetProperty("version").GetInt32());
        Assert.Equal("u1", lockJson.GetProperty("userId").GetString());
        var component = lockJson.GetProperty("components").GetProperty("cmp_1");
        Assert.Equal("skill", component.GetProperty("kind").GetString());
        Assert.Equal(Sha(Encoding.UTF8.GetBytes("hello")), component.GetProperty("files").GetProperty("skill/SKILL.md").GetString());
        Assert.False(File.Exists(Path.Combine(_dir, ".connect", "lock.pid")));

        var report = _handler.Calls.Single(c => c.Request.RequestUri!.AbsolutePath == "/v1/sync/reports");
        Assert.Contains("\"cmp_1\"", report.Body);
        Assert.DoesNotContain("stk_", Read(".connect/lock.json"));
    }

    [Fact]
    public async Task A_second_sync_with_the_same_revision_changes_nothing()
    {
        var sha = Add(("f.txt", "x"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", sha));
        await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        var again = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.Empty(again.Added);
        Assert.Single(again.Unchanged);
        Assert.False(again.Stale);
    }

    [Fact]
    public async Task Updates_changed_components_and_removes_gone_ones_with_their_empty_folders()
    {
        var one = Add(("deep/dir/f.txt", "one"));
        var two = Add(("g.txt", "two"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one), ("cmp_2", "beta", "rule", "m", two));
        await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });

        var one2 = Add(("deep/dir/f.txt", "one v2"));
        _manifest = Manifest("r2", ("cmp_1", "alpha", "skill", "n", one2));
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });

        Assert.Equal(["cmp_1"], result.Updated.Select(a => a.ComponentId));
        Assert.Equal(["cmp_2"], result.Removed.Select(a => a.ComponentId));
        Assert.Equal("one v2", Read("alpha/deep/dir/f.txt"));
        Assert.False(Directory.Exists(Path.Combine(_dir, "beta")));
    }

    [Fact]
    public async Task Keeps_a_file_changed_by_hand_unless_overwrite()
    {
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        await File.WriteAllTextAsync(Path.Combine(_dir, "alpha", "f.txt"), "mine");

        var one2 = Add(("f.txt", "two"));
        _manifest = Manifest("r2", ("cmp_1", "alpha", "skill", "n", one2));
        var kept = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.Empty(kept.Updated);
        Assert.Single(kept.Modified);
        Assert.Equal("mine", Read("alpha/f.txt"));

        _manifest = Manifest("r3", ("cmp_1", "alpha", "skill", "n", one2));
        var overwritten = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir, OnConflict = ConflictMode.Overwrite });
        Assert.Single(overwritten.Updated);
        Assert.Equal("two", Read("alpha/f.txt"));
    }

    [Fact]
    public async Task Does_not_replace_a_file_that_was_already_there()
    {
        Directory.CreateDirectory(Path.Combine(_dir, "alpha"));
        await File.WriteAllTextAsync(Path.Combine(_dir, "alpha", "f.txt"), "preexisting");
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.Empty(result.Added);
        Assert.Single(result.Modified);
        Assert.Equal("preexisting", Read("alpha/f.txt"));
    }

    [Fact]
    public async Task Skips_hooks_unless_allowed()
    {
        var hook = Add(("h.sh", "echo"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "hook", "h", hook));
        var skipped = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.Equal("hooks_not_allowed", Assert.Single(skipped.Skipped).Reason);
        Assert.False(File.Exists(Path.Combine(_dir, "alpha", "h.sh")));

        // The lock now holds r1, so a change of options alone gets "not modified"; a new revision brings the hook in.
        _manifest = Manifest("r2", ("cmp_1", "alpha", "hook", "h", hook));
        var allowed = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir, AllowHooks = true });
        Assert.Single(allowed.Added);
    }

    [Fact]
    public async Task Leaves_the_folder_alone_and_says_stale_when_the_server_is_down()
    {
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });

        _manifestStatus = 503;
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.True(result.Stale);
        Assert.Single(result.Unchanged);
        Assert.Equal("one", Read("alpha/f.txt"));

        var fresh = Path.Combine(_dir, "empty");
        await Assert.ThrowsAsync<ConnectError>(() => Session().SyncPluginsAsync(new SyncOptions { Dir = fresh }));
    }

    [Fact]
    public async Task Refuses_a_folder_that_belongs_to_another_user()
    {
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        await Session("u1").SyncPluginsAsync(new SyncOptions { Dir = _dir });
        var error = await Assert.ThrowsAsync<ConnectError>(() => Session("u2").SyncPluginsAsync(new SyncOptions { Dir = _dir }));
        Assert.Equal("lock_owner_mismatch", error.Code);
    }

    [Fact]
    public async Task Refuses_unsafe_archives_and_never_reports_them_stale()
    {
        var traversal = Tar([("../evil.txt", "x", '0')]);
        var link = Tar([("l", "", '2')]);
        foreach (var archive in new[] { traversal, link })
        {
            var sha = Sha(archive);
            _archives[sha] = archive;
            _manifest = Manifest("r" + sha[..4], ("cmp_1", "alpha", "skill", "n", sha));
            var error = await Assert.ThrowsAsync<ConnectError>(() => Session().SyncPluginsAsync(new SyncOptions { Dir = _dir }));
            Assert.Equal("archive_unsafe", error.Code);
        }

        Assert.False(File.Exists(Path.Combine(_dir, "..", "evil.txt")));
    }

    [Fact]
    public async Task A_component_that_does_not_match_its_hash_is_an_error()
    {
        var archive = Tar([("f.txt", "x", '0')]);
        _archives[new string('a', 64)] = archive;
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", new string('a', 64)));
        var error = await Assert.ThrowsAsync<ConnectIntegrityError>(() => Session().SyncPluginsAsync(new SyncOptions { Dir = _dir }));
        Assert.Equal("integrity_hash", error.Code);
    }

    [Fact]
    public async Task Reads_a_lock_written_by_the_typescript_sdk()
    {
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        Directory.CreateDirectory(Path.Combine(_dir, ".connect"));
        Directory.CreateDirectory(Path.Combine(_dir, "alpha"));
        await File.WriteAllTextAsync(Path.Combine(_dir, "alpha", "f.txt"), "one");
        await File.WriteAllTextAsync(Path.Combine(_dir, ".connect", "lock.json"),
            "{\n  \"version\": 1,\n  \"revision\": \"r0\",\n  \"userId\": \"u1\",\n  \"components\": {\n    \"cmp_1\": {\n      \"pluginName\": \"alpha\",\n      \"kind\": \"skill\",\n      \"name\": \"n\",\n      \"sha256\": \"" + one + "\",\n      \"files\": { \"f.txt\": \"" + Sha(Encoding.UTF8.GetBytes("one")) + "\" }\n    }\n  }\n}");
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir });
        Assert.Single(result.Unchanged);
        Assert.Empty(result.Added);
    }

    [Fact]
    public async Task Limits_the_sync_to_the_requested_plugins_and_kinds()
    {
        var a = Add(("a.txt", "a"));
        var b = Add(("b.txt", "b"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", a), ("cmp_2", "beta", "rule", "m", b));
        var result = await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir, Plugins = ["plg_beta"] });
        Assert.Equal(["cmp_2"], result.Added.Select(x => x.ComponentId));
        Assert.False(File.Exists(Path.Combine(_dir, "alpha", "a.txt")));
        Assert.Contains("plugins=plg_beta", _handler.Calls[0].Request.RequestUri!.Query);
    }

    [Fact]
    public async Task Replaces_a_guard_left_by_a_process_that_is_gone_and_reports_a_busy_folder()
    {
        var one = Add(("f.txt", "one"));
        _manifest = Manifest("r1", ("cmp_1", "alpha", "skill", "n", one));
        Directory.CreateDirectory(Path.Combine(_dir, ".connect"));
        var guard = Path.Combine(_dir, ".connect", "lock.pid");
        await File.WriteAllTextAsync(guard, "999999999");
        Assert.Single((await Session().SyncPluginsAsync(new SyncOptions { Dir = _dir })).Added);
        Assert.False(File.Exists(guard));

        await File.WriteAllTextAsync(guard, Environment.ProcessId.ToString(System.Globalization.CultureInfo.InvariantCulture));
        var busy = await Assert.ThrowsAsync<ConnectError>(() => Session().SyncPluginsAsync(
            new SyncOptions { Dir = _dir, GuardTimeout = TimeSpan.FromMilliseconds(100) }));
        Assert.Equal("sync_busy", busy.Code);
    }

    [Fact]
    public async Task An_unreadable_lock_file_is_an_error_not_a_reset()
    {
        Directory.CreateDirectory(Path.Combine(_dir, ".connect"));
        await File.WriteAllTextAsync(Path.Combine(_dir, ".connect", "lock.json"), "{ not json");
        var error = await Assert.ThrowsAsync<ConnectError>(() => Session().SyncPluginsAsync(new SyncOptions { Dir = _dir }));
        Assert.Equal("lock_unreadable", error.Code);
    }

    [Fact]
    public void Safe_paths_follow_the_typescript_rules()
    {
        foreach (var bad in new[] { "", "/a", "a/../b", "a//b", "a\\b", "C:/x", "./a", "a/." })
        {
            Assert.False(SyncFiles.SafeRelativePath(bad), bad);
        }

        Assert.True(SyncFiles.SafeRelativePath("a/b.txt"));
    }
}
