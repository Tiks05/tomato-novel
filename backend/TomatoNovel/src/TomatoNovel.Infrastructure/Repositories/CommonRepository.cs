using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

namespace TomatoNovel.Infrastructure.Repositories;

public class CommonRepository : ICommonRepository
{
    private readonly TomatoNovelDbContext db;

    public CommonRepository(TomatoNovelDbContext db)
    {
        this.db = db;
    }

    /// <summary>
    /// Gets banner news records for homepage display.
    /// </summary>
    public List<(int Id, string? BannerUrl)> GetBannerNews(int limit)
    {
        return this.db.News
            .Where(n => n.IsBanner && n.Type == "active")
            .OrderByDescending(n => n.CreatedAt)
            .Select(n => new
            {
                n.Id,
                n.BannerUrl
            })
            .Take(limit)
            .AsEnumerable()          // ← 关键改动
            .Select(x => (x.Id, x.BannerUrl))
            .ToList();
    }

    // ---------------- Adapt ----------------
    public List<(int Id, string? CoverUrl)> GetAdaptBooks(int? limit)
    {
        return db.Books
            .Take(limit ?? 10)
            .Select(b => new { b.Id, b.CoverUrl })
            .AsEnumerable()
            .Select(b => (b.Id, b.CoverUrl))
            .ToList();
    }
}
