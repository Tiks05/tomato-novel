namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class WorkspaceRepository : IWorkspaceRepository
{
    private readonly TomatoNovelDbContext db;

    public WorkspaceRepository(TomatoNovelDbContext db)
    {
        this.db = db;
    }

    public User GetUser(long userId) =>
        db.Users.First(u => u.Id == userId);

    public void AddBook(
        Book book,
        Stream? coverStream,
        string? coverUuid
    )
    {
        // -----------------------------
        // 封面处理
        // -----------------------------
        if (coverStream == null || string.IsNullOrWhiteSpace(coverUuid))
        {
            book.CoverUrl = "/uploads/covers/default_cover.png";
        }
        else
        {
            var fileName = $"{coverUuid}.png";
            var savePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "uploads",
                "covers",
                fileName
            );

            Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);

            using (var fs = new FileStream(savePath, FileMode.Create))
            {
                coverStream.CopyTo(fs);
            }

            book.CoverUrl = $"/uploads/covers/{fileName}";
        }

        db.Books.Add(book);
    }

    public void UpdateBook(
        Book book,
        Stream? coverStream,
        string? coverUuid
    )
    {
        // -----------------------------
        // 封面处理（只有传了新封面才更新）
        // -----------------------------
        if (coverStream != null && !string.IsNullOrWhiteSpace(coverUuid))
        {
            var fileName = $"{coverUuid}.png";
            var savePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "uploads",
                "covers",
                fileName
            );

            Directory.CreateDirectory(Path.GetDirectoryName(savePath)!);

            using (var fs = new FileStream(savePath, FileMode.Create))
            {
                coverStream.CopyTo(fs);
            }

            book.CoverUrl = $"/uploads/covers/{fileName}";
        }
    }


    public void UpdateAuthor(
        User user,
        Stream? avatarStream,
        string? avatarUuid)
    {
        // -----------------------------
        // 情况一：没有上传头像
        // -----------------------------
        if (avatarStream == null || string.IsNullOrWhiteSpace(avatarUuid))
        {
            // 只更新作家基础信息
            this.db.Users.Update(user);
            this.db.SaveChanges();
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
        this.db.Users.Update(user);
        this.db.SaveChanges();
    }


    public IEnumerable<Book> GetBooksByUser(int userId) =>
        db.Books.Where(b => b.UserId == userId).ToList();

    public Book GetBook(int bookId) =>
        db.Books.Include(b => b.Author).First(b => b.Id == bookId);

    public IEnumerable<News> GetNotices(int limit) =>
        db.News.Where(n => n.IsNotice).OrderByDescending(n => n.CreatedAt).Take(limit).ToList();

    public IEnumerable<News> GetNews(int limit) =>
        db.News.Where(n => n.Type == "active").OrderByDescending(n => n.CreatedAt).Take(limit).ToList();

    public IEnumerable<Book> GetRankBooks(string readerType, string category) =>
        db.Books.Include(b => b.Author)
                .Where(b => b.ReaderType == readerType && b.PlotType == category && b.Status == "连载中")
                .OrderByDescending(b => b.CreatedAt)
                .Take(4)
                .ToList();

    public IEnumerable<Volume> GetVolumesByBook(int bookId) =>
        db.Volumes.Where(v => v.BookId == bookId).OrderBy(v => v.Sort).ToList();

    public IEnumerable<Chapter> GetChaptersByBook(int bookId) =>
        db.Chapters.Include(c => c.Volume)
                   .Where(c => c.Volume.BookId == bookId)
                   .ToList();

    public Volume? GetLastVolume(int bookId) =>
        db.Volumes.Where(v => v.BookId == bookId).OrderByDescending(v => v.Sort).FirstOrDefault();

    public Chapter? GetLastChapterByVolume(int volumeId) =>
        db.Chapters.Where(c => c.VolumeId == volumeId)
                   .OrderByDescending(c => c.ChapterNum)
                   .FirstOrDefault();

    public Chapter? GetLatestChapterByBook(int bookId) =>
        db.Chapters.Include(c => c.Volume)
                   .Where(c => c.Volume.BookId == bookId)
                   .OrderByDescending(c => c.UpdatedAt)
                   .FirstOrDefault();


    public Chapter? GetChapter(int chapterId)
    {
        return db.Chapters
            .Include(c => c.Volume)
            .FirstOrDefault(c => c.Id == chapterId);
    }

    public Volume? GetVolume(int volumeId) =>
        db.Volumes.FirstOrDefault(v => v.Id == volumeId);
    public void RemoveBook(Book book) => db.Books.Remove(book);

    public void AddVolume(Volume volume) => db.Volumes.Add(volume);
    public void RemoveVolume(Volume volume) => db.Volumes.Remove(volume);

    public void AddChapter(Chapter chapter) => db.Chapters.Add(chapter);
    public void RemoveChapter(Chapter chapter) => db.Chapters.Remove(chapter);

    public void SaveChanges() => db.SaveChanges();
}
