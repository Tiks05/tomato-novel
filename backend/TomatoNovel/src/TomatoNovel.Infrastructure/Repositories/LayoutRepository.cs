namespace TomatoNovel.Infrastructure.Repositories;

using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

/// <summary>
/// EF Core implementation of ILayoutRepository.
/// </summary>
public class LayoutRepository : ILayoutRepository
{
    private readonly TomatoNovelDbContext context;

    public LayoutRepository(TomatoNovelDbContext context)
    {
        this.context = context;
    }

    // -----------------------------
    // User
    // -----------------------------

    /// <summary>
    /// Get user by primary key.
    /// </summary>
    /// <returns></returns>
    public User GetUserById(long userId)
    {
        return this.context.Users
                   .FirstOrDefault(u => u.Id == userId)
               ?? throw new Exception("用户不存在");
    }

    /// <summary>
    /// Update user profile with avatar.
    /// </summary>
    public void UpdateUser(
        User user,
        Stream avatarStream,
        string avatarUuid)
    {
        // -----------------------------
        // 情况一：没有上传头像
        // -----------------------------
        if (avatarStream == null || string.IsNullOrWhiteSpace(avatarUuid))
        {
            // 只更新基础信息（昵称、签名等）
            this.context.Users.Update(user);
            this.context.SaveChanges();
            return;
        }

        // -----------------------------
        // 情况二：上传了新头像
        // -----------------------------
        var fileName = $"{avatarUuid}.png";

        var savePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "wwwroot",
            "uploads",
            "user",
            "avatars",
            fileName);

        // 确保目录存在
        Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);

        // 写入文件
        using (var fs = new FileStream(savePath, FileMode.Create))
        {
            avatarStream.CopyTo(fs);
        }

        // 更新用户头像路径
        user.Avatar = $"/uploads/user/avatars/{fileName}";

        // -----------------------------
        // 更新数据库
        // -----------------------------
        this.context.Users.Update(user);
        this.context.SaveChanges();
    }

    // -----------------------------
    // Book search
    // -----------------------------
    public int CountBooks(
        string? keyword,
        int stateIndex,
        int numIndex,
        int timeIndex)
    {
        var query =
            from book in this.context.Books
            join user in this.context.Users on book.UserId equals user.Id
            select new
            {
                book,
                AuthorName = user.Nickname,
            };

        // keyword
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(x =>
                x.book.Title.Contains(keyword) ||
                x.AuthorName.Contains(keyword));
        }

        // state
        if (stateIndex == 1)
        {
            query = query.Where(x => x.book.Status == "已完结");
        }
        else if (stateIndex == 2)
        {
            query = query.Where(x => x.book.Status == "连载中");
        }

        // word count
        if (numIndex == 1)
        {
            query = query.Where(x => x.book.WordCount < 300_000);
        }
        else if (numIndex == 2)
        {
            query = query.Where(x => x.book.WordCount >= 300_000 && x.book.WordCount < 500_000);
        }
        else if (numIndex == 3)
        {
            query = query.Where(x => x.book.WordCount >= 500_000 && x.book.WordCount < 1_000_000);
        }
        else if (numIndex == 4)
        {
            query = query.Where(x => x.book.WordCount >= 1_000_000);
        }

        // time
        var now = DateTime.Now;
        if (timeIndex == 1)
        {
            query = query.Where(x => x.book.UpdatedAt >= now.AddMinutes(-30));
        }
        else if (timeIndex == 2)
        {
            query = query.Where(x => x.book.UpdatedAt >= now.Date);
        }
        else if (timeIndex == 3)
        {
            query = query.Where(x => x.book.UpdatedAt >= now.Date.AddDays(-(int)now.DayOfWeek + 1));
        }
        else if (timeIndex == 4)
        {
            query = query.Where(x => x.book.UpdatedAt >= new DateTime(now.Year, now.Month, 1));
        }
        else if (timeIndex == 5)
        {
            query = query.Where(x => x.book.UpdatedAt >= new DateTime(now.Year, 1, 1));
        }

        return query.Count();
    }

    public List<(
        int BookId,
        string Title,
        string Author,
        string Status,
        int WordCount,
        string Intro,
        DateTime UpdatedAt,
        string CoverUrl,
        int FavoriteCount,
        string? LatestChapterTitle,
        int? FirstVolumeSort,
        int? FirstChapterNum,
        int? LatestVolumeSort,
        int? LatestChapterNum)> SearchBooks(
        string? keyword,
        int stateIndex,
        int numIndex,
        int timeIndex,
        int type,
        int page,
        int pageSize)
    {
        var baseQuery =
            from book in this.context.Books
            join user in this.context.Users on book.UserId equals user.Id
            select new
            {
                Book = book,
                AuthorName = user.Nickname,
            };

        // -------- filters --------
        if (!string.IsNullOrWhiteSpace(keyword))
        {
            baseQuery = baseQuery.Where(x =>
                x.Book.Title.Contains(keyword) ||
                x.AuthorName.Contains(keyword));
        }

        if (stateIndex == 1)
        {
            baseQuery = baseQuery.Where(x => x.Book.Status == "已完结");
        }
        else if (stateIndex == 2)
        {
            baseQuery = baseQuery.Where(x => x.Book.Status == "连载中");
        }

        if (numIndex == 1)
        {
            baseQuery = baseQuery.Where(x => x.Book.WordCount < 300_000);
        }
        else if (numIndex == 2)
        {
            baseQuery = baseQuery.Where(x => x.Book.WordCount >= 300_000 && x.Book.WordCount < 500_000);
        }
        else if (numIndex == 3)
        {
            baseQuery = baseQuery.Where(x => x.Book.WordCount >= 500_000 && x.Book.WordCount < 1_000_000);
        }
        else if (numIndex == 4)
        {
            baseQuery = baseQuery.Where(x => x.Book.WordCount >= 1_000_000);
        }

        var now = DateTime.Now;
        if (timeIndex == 1)
        {
            baseQuery = baseQuery.Where(x => x.Book.UpdatedAt >= now.AddMinutes(-30));
        }
        else if (timeIndex == 2)
        {
            baseQuery = baseQuery.Where(x => x.Book.UpdatedAt >= now.Date);
        }
        else if (timeIndex == 3)
        {
            baseQuery = baseQuery.Where(x => x.Book.UpdatedAt >= now.Date.AddDays(-(int)now.DayOfWeek + 1));
        }
        else if (timeIndex == 4)
        {
            baseQuery = baseQuery.Where(x => x.Book.UpdatedAt >= new DateTime(now.Year, now.Month, 1));
        }
        else if (timeIndex == 5)
        {
            baseQuery = baseQuery.Where(x => x.Book.UpdatedAt >= new DateTime(now.Year, 1, 1));
        }

        // -------- sort --------
        baseQuery = type switch
        {
            1 => baseQuery.OrderByDescending(x => x.Book.FavoriteCount),
            2 => baseQuery.OrderByDescending(x => x.Book.UpdatedAt),
            _ => baseQuery.OrderByDescending(x => x.Book.Id),
        };

        // -------- paging --------
        var pageData = baseQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var bookIds = pageData.Select(x => x.Book.Id).ToList();

        // -------- first chapter --------
        var firstChapterMap =
            (from v in this.context.Volumes
             join c in this.context.Chapters on v.Id equals c.VolumeId
             where bookIds.Contains(v.BookId)
             orderby v.Sort, c.ChapterNum
             select new
             {
                 v.BookId,
                 v.Sort,
                 c.ChapterNum,
             })
            .AsEnumerable()
            .GroupBy(x => x.BookId)
            .ToDictionary(g => g.Key, g => g.First());

        // -------- latest chapter --------
        var latestChapterMap =
            (from v in this.context.Volumes
             join c in this.context.Chapters on v.Id equals c.VolumeId
             where bookIds.Contains(v.BookId)
             orderby c.CreatedAt descending
             select new
             {
                 v.BookId,
                 v.Sort,
                 c.ChapterNum,
                 c.Title,
             })
            .AsEnumerable()
            .GroupBy(x => x.BookId)
            .ToDictionary(g => g.Key, g => g.First());

        // -------- flatten --------
        return pageData.Select(x =>
        {
            firstChapterMap.TryGetValue(x.Book.Id, out var first);
            latestChapterMap.TryGetValue(x.Book.Id, out var latest);

            return (
                BookId: x.Book.Id,
                Title: x.Book.Title,
                Author: x.AuthorName,
                Status: x.Book.Status ?? string.Empty,
                WordCount: x.Book.WordCount ?? 0,
                Intro: x.Book.Intro ?? string.Empty,
                UpdatedAt: x.Book.UpdatedAt,
                CoverUrl: x.Book.CoverUrl ?? string.Empty,
                FavoriteCount: x.Book.FavoriteCount,
                LatestChapterTitle: latest?.Title,
                FirstVolumeSort: first?.Sort,
                FirstChapterNum: first?.ChapterNum,
                LatestVolumeSort: latest?.Sort,
                LatestChapterNum: latest?.ChapterNum);
        }).ToList();
    }
}
