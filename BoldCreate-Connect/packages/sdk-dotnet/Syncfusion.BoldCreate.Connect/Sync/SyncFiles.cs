using System.Diagnostics;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Syncfusion.BoldCreate.Connect.Internal;

namespace Syncfusion.BoldCreate.Connect.Sync;

internal static class SyncFiles
{
    public const int MaxEntries = 500;
    public const int MaxFileBytes = 5 * 1024 * 1024;
    public const int MaxTotalBytes = 50 * 1024 * 1024;

    private const int Block = 512;
    private const string StateDirName = ".connect";

    private static readonly StringComparison PathComparison =
        OperatingSystem.IsWindows() ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal;

    public static readonly StringComparer PathComparer =
        OperatingSystem.IsWindows() ? StringComparer.OrdinalIgnoreCase : StringComparer.Ordinal;

    private static readonly JsonSerializerOptions LockOptions = new(Json.Options) { WriteIndented = true };

    private static ConnectError Unsafe(string message) => new(message, "archive_unsafe", 0);

    public static string Sha256Hex(ReadOnlySpan<byte> bytes) => Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();

    /// <summary>Whether a relative path stays inside the folder it is placed in.</summary>
    public static bool SafeRelativePath(string path)
    {
        if (path.Length == 0 || path.Contains('\0') || path.Contains('\\')) return false;
        if (path.StartsWith('/') || (path.Length >= 2 && char.IsAsciiLetter(path[0]) && path[1] == ':')) return false;
        return path.Split('/').All(part => part.Length > 0 && part != "." && part != "..");
    }

    private static string Field(byte[] header, int start, int length)
    {
        var span = header.AsSpan(start, length);
        var end = span.IndexOf((byte)0);
        return Encoding.UTF8.GetString(end == -1 ? span : span[..end]);
    }

    /// <summary>
    /// Reads a gzip-compressed ustar archive into a map of path to bytes. It refuses <c>..</c>, absolute
    /// and drive paths, links, device files, more than 500 entries, a file over 5 MiB and a total
    /// over 50 MiB. Modes in the archive are ignored.
    /// </summary>
    public static Dictionary<string, byte[]> ExtractArchive(byte[] archive)
    {
        var limit = MaxTotalBytes + (MaxEntries * 2 * Block) + (2 * Block);
        byte[] tar;
        try
        {
            using var gzip = new GZipStream(new MemoryStream(archive), CompressionMode.Decompress);
            using var output = new MemoryStream();
            var buffer = new byte[81920];
            int read;
            while ((read = gzip.Read(buffer, 0, buffer.Length)) > 0)
            {
                if (output.Length + read > limit) throw Unsafe("The archive could not be unpacked or is too large.");
                output.Write(buffer, 0, read);
            }

            tar = output.ToArray();
        }
        catch (InvalidDataException)
        {
            throw Unsafe("The archive could not be unpacked or is too large.");
        }

        var files = new Dictionary<string, byte[]>(StringComparer.Ordinal);
        long total = 0;
        var entries = 0;
        for (var offset = 0; offset + Block <= tar.Length;)
        {
            var header = tar.AsSpan(offset, Block).ToArray();
            if (header.All(b => b == 0)) break;
            entries++;
            if (entries > MaxEntries) throw Unsafe("The archive has too many entries.");
            var name = Field(header, 0, 100);
            var prefix = Field(header, 345, 155);
            var path = prefix.Length == 0 ? name : $"{prefix}/{name}";
            var sizeText = Field(header, 124, 12).Trim();
            long size;
            try
            {
                size = sizeText.Length == 0 ? 0 : Convert.ToInt64(sizeText, 8);
            }
            catch (Exception ex) when (ex is FormatException or ArgumentException or OverflowException)
            {
                throw Unsafe("The archive is damaged.");
            }

            var type = (char)header[156];
            var bodyStart = offset + Block;
            if (size < 0 || bodyStart + size > tar.Length) throw Unsafe("The archive is damaged.");
            offset = (int)(bodyStart + ((size + Block - 1) / Block * Block));
            if (type == '5') continue;
            if (type != '0' && type != '\0') throw Unsafe("The archive holds an entry that is not a file.");
            if (!SafeRelativePath(path)) throw Unsafe("The archive holds a path that is not allowed.");
            if (size > MaxFileBytes) throw Unsafe("The archive holds a file that is too large.");
            total += size;
            if (total > MaxTotalBytes) throw Unsafe("The archive is too large.");
            files[path] = tar.AsSpan(bodyStart, (int)size).ToArray();
        }

        return files;
    }

    public static string StateDir(string dir) => Path.Combine(dir, StateDirName);

    private static string LockPath(string dir) => Path.Combine(StateDir(dir), "lock.json");

    private static string GuardPath(string dir) => Path.Combine(StateDir(dir), "lock.pid");

    /// <summary>Where a placed file lives; throws if the plugin name or path would leave the folder.</summary>
    public static string DestinationOf(string dir, string pluginName, string path)
    {
        if (!SafeRelativePath(pluginName) || pluginName.Contains('/') || !SafeRelativePath(path))
        {
            throw Unsafe("A path in the manifest is not allowed.");
        }

        var root = Path.GetFullPath(dir);
        var full = Path.GetFullPath(Path.Combine(root, pluginName, path));
        if (!full.StartsWith(root.TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar, PathComparison))
        {
            throw Unsafe("A path in the manifest is not allowed.");
        }

        return full;
    }

    public static async Task<Lock?> ReadLockAsync(string dir, CancellationToken ct)
    {
        try
        {
            var bytes = await File.ReadAllBytesAsync(LockPath(dir), ct).ConfigureAwait(false);
            return JsonSerializer.Deserialize<Lock>(bytes, Json.Options) ?? throw new JsonException();
        }
        catch (Exception ex) when (ex is FileNotFoundException or DirectoryNotFoundException)
        {
            return null;
        }
        catch (Exception ex) when (ex is JsonException or IOException or UnauthorizedAccessException)
        {
            throw new ConnectError("The lock file in the folder cannot be read.", "lock_unreadable", 0, null, ex);
        }
    }

    /// <summary>Written last, through a temporary file, so a stopped sync never leaves a half lock.</summary>
    public static async Task WriteLockAsync(string dir, Lock lockFile, CancellationToken ct)
    {
        Directory.CreateDirectory(StateDir(dir));
        var temporary = $"{LockPath(dir)}.{Guid.NewGuid()}.tmp";
        var text = JsonSerializer.Serialize(lockFile, LockOptions).Replace("\r\n", "\n", StringComparison.Ordinal);
        await File.WriteAllTextAsync(temporary, text, new UTF8Encoding(false), ct).ConfigureAwait(false);
        File.Move(temporary, LockPath(dir), overwrite: true);
    }

    /// <summary>The hash of a file on disk, or null when it is not there.</summary>
    public static async Task<string?> HashOnDiskAsync(string path, CancellationToken ct)
    {
        try
        {
            return Sha256Hex(await File.ReadAllBytesAsync(path, ct).ConfigureAwait(false));
        }
        catch (Exception ex) when (ex is FileNotFoundException or DirectoryNotFoundException)
        {
            return null;
        }
    }

    /// <summary>Puts files in place: written in a staging folder first, then moved, with a fixed mode.</summary>
    public static async Task PlaceFilesAsync(string dir, IReadOnlyDictionary<string, byte[]> files, CancellationToken ct)
    {
        var staging = Path.Combine(StateDir(dir), "tmp", Guid.NewGuid().ToString());
        Directory.CreateDirectory(staging);
        try
        {
            var staged = new List<(string Source, string Destination)>();
            var index = 0;
            foreach (var (destination, bytes) in files)
            {
                var source = Path.Combine(staging, (index++).ToString(System.Globalization.CultureInfo.InvariantCulture));
                await File.WriteAllBytesAsync(source, bytes, ct).ConfigureAwait(false);
                if (!OperatingSystem.IsWindows())
                {
                    File.SetUnixFileMode(source, UnixFileMode.UserRead | UnixFileMode.UserWrite | UnixFileMode.GroupRead | UnixFileMode.OtherRead);
                }

                staged.Add((source, destination));
            }

            foreach (var (source, destination) in staged)
            {
                Directory.CreateDirectory(Path.GetDirectoryName(destination)!);
                File.Move(source, destination, overwrite: true);
            }
        }
        finally
        {
            try
            {
                Directory.Delete(staging, recursive: true);
            }
            catch (IOException)
            {
                // a leftover staging folder is harmless
            }
        }
    }

    /// <summary>Removes a file and the folders it leaves empty, up to but not including the sync folder.</summary>
    public static void RemoveFile(string dir, string path)
    {
        if (File.Exists(path)) File.Delete(path);
        var root = Path.GetFullPath(dir).TrimEnd(Path.DirectorySeparatorChar) + Path.DirectorySeparatorChar;
        for (var folder = Path.GetDirectoryName(path); folder is not null && folder.StartsWith(root, PathComparison); folder = Path.GetDirectoryName(folder))
        {
            try
            {
                Directory.Delete(folder);
            }
            catch (IOException)
            {
                break;
            }
        }
    }

    private static bool Alive(int pid)
    {
        try
        {
            using var process = Process.GetProcessById(pid);
            return !process.HasExited;
        }
        catch (ArgumentException)
        {
            return false;
        }
        catch (InvalidOperationException)
        {
            return false;
        }
    }

    /// <summary>
    /// One sync at a time in a folder: the guard file is created exclusively and removed afterwards.
    /// A guard left by a process that no longer exists is replaced.
    /// </summary>
    public static async Task<T> WithFolderGuardAsync<T>(
        string dir, Func<Task<T>> work, TimeSpan timeout, TimeSpan poll, CancellationToken ct)
    {
        Directory.CreateDirectory(StateDir(dir));
        var deadline = DateTime.UtcNow + timeout;
        for (;;)
        {
            try
            {
                await using (var stream = new FileStream(GuardPath(dir), FileMode.CreateNew, FileAccess.Write, FileShare.Read))
                {
                    await stream.WriteAsync(Encoding.ASCII.GetBytes(Environment.ProcessId.ToString(System.Globalization.CultureInfo.InvariantCulture)), ct)
                        .ConfigureAwait(false);
                }

                break;
            }
            // On Windows a guard that another process is deleting at that moment answers "access denied".
            catch (Exception ex) when ((ex is IOException && File.Exists(GuardPath(dir)))
                || (ex is UnauthorizedAccessException && OperatingSystem.IsWindows()))
            {
                string text;
                try
                {
                    text = await File.ReadAllTextAsync(GuardPath(dir), ct).ConfigureAwait(false);
                }
                catch (IOException)
                {
                    text = string.Empty;
                }

                if (int.TryParse(text.Trim(), out var holder) && !Alive(holder))
                {
                    try
                    {
                        File.Delete(GuardPath(dir));
                    }
                    catch (IOException)
                    {
                        // somebody else removed it first
                    }

                    continue;
                }

                if (DateTime.UtcNow > deadline) throw new ConnectError("Another sync is running in this folder.", "sync_busy", 0);
                await Task.Delay(poll, ct).ConfigureAwait(false);
            }
        }

        try
        {
            return await work().ConfigureAwait(false);
        }
        finally
        {
            try
            {
                File.Delete(GuardPath(dir));
            }
            catch (IOException)
            {
                // the guard is advisory
            }
        }
    }
}
