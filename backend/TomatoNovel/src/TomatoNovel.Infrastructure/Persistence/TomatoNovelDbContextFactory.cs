namespace TomatoNovel.Infrastructure.Persistence;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

public class TomatoNovelDbContextFactory
    : IDesignTimeDbContextFactory<TomatoNovelDbContext>
{
    public TomatoNovelDbContext CreateDbContext(string[] args)
    {
        // 读取 appsettings.json（必须）
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var connectionString =
            configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException(
                "Connection string 'DefaultConnection' not found.");

        var optionsBuilder =
            new DbContextOptionsBuilder<TomatoNovelDbContext>();

        optionsBuilder.UseMySql(
            connectionString,
            ServerVersion.AutoDetect(connectionString));

        // 🔥 关键：启用 OpenIddict EF Core
        optionsBuilder.UseOpenIddict();

        return new TomatoNovelDbContext(optionsBuilder.Options);
    }
}
