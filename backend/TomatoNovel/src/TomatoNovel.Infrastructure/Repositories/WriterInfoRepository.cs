namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class WriterInfoRepository : IWriterInfoRepository
{
    private readonly TomatoNovelDbContext dbContext;

    public WriterInfoRepository(TomatoNovelDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public User? GetAuthorById(int writerId)
    {
        return this.dbContext.Users
            .FirstOrDefault(u => u.Id == writerId && u.Role == "author");
    }

    public List<Book> GetBooksByAuthorId(int writerId)
    {
        return this.dbContext.Books
            .Where(b => b.UserId == writerId)
            .ToList();
    }

    public int GetTotalBookWordCount(int writerId)
    {
        return this.dbContext.Books
            .Where(b => b.UserId == writerId)
            .Sum(b => b.WordCount ?? 0);
    }

    public int GetMaxChapterNum(int bookId)
    {
        return this.dbContext.Chapters
            .Where(c => c.Volume.BookId == bookId)
            .Max(c => (int?)c.ChapterNum) ?? 0;
    }

    public string? GetMaxChapterTitle(int bookId, int maxChapterNum)
    {
        if (maxChapterNum == 0)
        {
            return null;
        }

        return this.dbContext.Chapters
            .Where(c =>
                c.Volume.BookId == bookId &&
                c.ChapterNum == maxChapterNum)
            .Select(c => c.Title)
            .FirstOrDefault();
    }

    public int GetTotalChapterWordCount(int bookId)
    {
        return this.dbContext.Chapters
            .Where(c => c.Volume.BookId == bookId)
            .Sum(c => c.WordCount ?? 0);
    }
}
