using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Syncfusion.BoldCreate.Connect.Extensions;

public static class ServiceCollectionExtensions
{
    public const string HttpClientName = "Syncfusion.BoldCreate.Connect";

    /// <summary>Registers <see cref="ConnectClient"/> as a singleton on an <see cref="IHttpClientFactory"/> client, with the host's logger.</summary>
    public static IServiceCollection AddBoldCreateConnect(this IServiceCollection services, Action<ConnectClientOptions> configure)
    {
        ArgumentNullException.ThrowIfNull(configure);
        services.AddOptions<ConnectClientOptions>().Configure(configure);
        return Register(services);
    }

    /// <summary>Same, reading <c>ApiKey</c>, <c>BaseUrl</c> and the other settings from a configuration section.</summary>
    public static IServiceCollection AddBoldCreateConnect(this IServiceCollection services, IConfiguration section)
    {
        ArgumentNullException.ThrowIfNull(section);
        services.AddOptions<ConnectClientOptions>().Bind(section);
        return Register(services);
    }

    private static IServiceCollection Register(IServiceCollection services)
    {
        services.AddHttpClient(HttpClientName, client => client.Timeout = System.Threading.Timeout.InfiniteTimeSpan);
        services.AddSingleton(provider =>
        {
            var configured = provider.GetRequiredService<IOptions<ConnectClientOptions>>().Value;
            var options = new ConnectClientOptions
            {
                ApiKey = configured.ApiKey,
                BaseUrl = configured.BaseUrl,
                Timeout = configured.Timeout,
                Retry = configured.Retry,
                AllowInsecureHttp = configured.AllowInsecureHttp,
                SessionCache = configured.SessionCache ?? provider.GetService<ISessionCache>(),
                SessionRenewMargin = configured.SessionRenewMargin,
                TimeProvider = configured.TimeProvider,
                HttpClient = configured.HttpClient ?? provider.GetRequiredService<IHttpClientFactory>().CreateClient(HttpClientName),
                Logger = configured.Logger ?? provider.GetRequiredService<ILoggerFactory>().CreateLogger("Syncfusion.BoldCreate.Connect"),
                Delay = configured.Delay,
            };
            return new ConnectClient(options);
        });
        return services;
    }

    /// <summary>Uses <see cref="MemorySessionCache"/> unless the host registers its own <see cref="ISessionCache"/>.</summary>
    public static IServiceCollection AddBoldCreateConnectMemorySessionCache(this IServiceCollection services)
    {
        services.AddSingleton<ISessionCache>(_ => new MemorySessionCache());
        return services;
    }
}
