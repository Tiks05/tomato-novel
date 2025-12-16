namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class HomeRepository : IHomeRepository
{
    private readonly TomatoNovelDbContext db;

    public HomeRepository(TomatoNovelDbContext db)
    {
        this.db = db;
    }

    // ---------------- Top Books ----------------
    public List<(int Id, string Title, string? Tags, string? CoverUrl)> GetTopBooks()
    {
        return this.db.Books
            .OrderByDescending(b => b.FavoriteCount)
            .Take(30)
            .Select(b => new { b.Id, b.Title, b.Tags, b.CoverUrl })
            .AsEnumerable()
            .Select(b => (b.Id, b.Title, b.Tags, b.CoverUrl))
            .ToList();
    }

    // ---------------- News ----------------
    public List<(int Id, string Title)> GetNewsList(int limit)
    {
        return this.db.News
            .OrderByDescending(n => n.CreatedAt)
            .Take(limit)
            .Select(n => new { n.Id, n.Title })
            .AsEnumerable()
            .Select(n => (n.Id, n.Title))
            .ToList();
    }

    // ---------------- Writers ----------------
    public List<(int Id,
        string Nickname,
        string? Masterpiece,
        string AuthorLevel,
        string? LifePhoto)> GetWriterList()
    {
        return this.db.Users
            .Where(u =>
                u.AuthorLevel == "殿堂作家" ||
                u.AuthorLevel == "金番作家")
            .OrderBy(u => u.AuthorLevel == "殿堂作家" ? 0 : 1)
            .Select(u => new
            {
                u.Id,
                u.Nickname,
                u.Masterpiece,
                u.AuthorLevel,
                u.LifePhoto,
            })
            .AsEnumerable() // 🔑 切换到内存
            .Select(u => (
                u.Id,
                u.Nickname,
                u.Masterpiece,
                u.AuthorLevel!,
                u.LifePhoto))
            .ToList();
    }

    // ---------------- Recommend ----------------
    public (
        List<(int Id,
              string Title,
              string Intro,
              string? CoverUrl,
              string AuthorNickname)> Male,
        List<(int Id,
              string Title,
              string Intro,
              string? CoverUrl,
              string AuthorNickname)> Female) GetRecommendBooks()
    {
        // 示例逻辑：你可以按原 Flask 逻辑细化
        var books = this.db.Books
            .Include(b => b.Author)
            .OrderByDescending(b => b.FavoriteCount)
            .Take(10)
            .Select(b => new
            {
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                AuthorNickname = b.Author.Nickname,
            })
            .AsEnumerable()
            .Select(b => (
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                b.AuthorNickname))
            .ToList();

        var male = books.Take(5).ToList();
        var female = books.Skip(5).Take(5).ToList();

        return (male, female);
    }

    // ---------------- Ranking ----------------
    public (
        List<(int Id,
              string Title,
              string Intro,
              string? CoverUrl,
              string AuthorNickname)> Hot,
        List<(int Id,
              string Title,
              string Intro,
              string? CoverUrl,
              string AuthorNickname)> Newest) GetRanking(string readerType, string plotType)
    {
        var query = this.db.Books
            .Include(b => b.Author)
            .Where(b =>
                b.PlotType == plotType &&
                b.ReaderType == readerType);

        var hot = query
            .OrderByDescending(b => b.FavoriteCount)
            .Take(10)
            .Select(b => new
            {
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                AuthorNickname = b.Author.Nickname,
            })
            .AsEnumerable()
            .Select(b => (
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                b.AuthorNickname))
            .ToList();

        var newest = query
            .OrderByDescending(b => b.CreatedAt)
            .Take(10)
            .Select(b => new
            {
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                AuthorNickname = b.Author.Nickname,
            })
            .AsEnumerable()
            .Select(b => (
                b.Id,
                b.Title,
                b.Intro,
                b.CoverUrl,
                b.AuthorNickname))
            .ToList();

        return (hot, newest);
    }

    // ---------------- Recent Updates ----------------
    public List<(
        string PlotType,
        string BookTitle,
        int BookId,
        string ChapterTitle,
        string AuthorNickname,
        DateTime UpdatedAt)> GetRecentUpdates(int limit)
    {
        var list = (
                from c in this.db.Chapters.AsNoTracking()
                join v in this.db.Volumes.AsNoTracking() on c.VolumeId equals v.Id
                join b in this.db.Books.AsNoTracking() on v.BookId equals b.Id
                join a in this.db.Users.AsNoTracking() on b.UserId equals a.Id
                orderby c.UpdatedAt descending
                select new
                {
                    PlotType = b.PlotType ?? string.Empty,
                    BookTitle = b.Title,
                    BookId = b.Id,
                    ChapterTitle = c.Title,
                    AuthorNickname = a.Nickname ?? "未知作者",
                    UpdatedAt = c.UpdatedAt,
                })
            .Take(limit)
            .ToList();

        return list.Select(x => (
            x.PlotType,
            x.BookTitle,
            x.BookId,
            x.ChapterTitle,
            x.AuthorNickname,
            x.UpdatedAt)).ToList();
    }
}
