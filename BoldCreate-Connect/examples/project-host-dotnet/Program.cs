// Runs the host flow for one user against a real project.
//
//   CONNECT_PROJECT_KEY=prk_... CONNECT_USER_ID=user-42 CONNECT_DIR=./agents dotnet run
//
// CONNECT_BASE_URL is optional. The key and the session token are never printed.
using System.Text.Json;
using ProjectHostExample;
using Syncfusion.BoldCreate.Connect;

var apiKey = Environment.GetEnvironmentVariable("CONNECT_PROJECT_KEY");
var userId = Environment.GetEnvironmentVariable("CONNECT_USER_ID");
if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(userId))
{
    Console.Error.WriteLine("Set CONNECT_PROJECT_KEY and CONNECT_USER_ID.");
    return 1;
}

var options = new ConnectClientOptions { ApiKey = apiKey, SessionCache = new MemorySessionCache() };
if (Environment.GetEnvironmentVariable("CONNECT_BASE_URL") is { Length: > 0 } baseUrl) options.BaseUrl = baseUrl;

using var client = new ConnectClient(options);
var host = new ProjectHost(client, Environment.GetEnvironmentVariable("CONNECT_DIR") ?? "./agents");
var result = await host.PrepareUserAsync(
    userId, Environment.GetEnvironmentVariable("CONNECT_CALLBACK_URL") ?? "https://yourapp.example/connected");
Console.WriteLine(JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true }));
return 0;
