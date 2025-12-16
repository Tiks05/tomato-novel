namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class BookInfoRepository : IBookInfoRepository
{
    private readonly TomatoNovelDbContext db;

    public BookInfoRepository(TomatoNovelDbContext db)
    {
        this.db = db;
    }

    public Book? GetBook(int bookId)
        => this.db.Books.FirstOrDefault(b => b.Id == bookId);

    public Book? GetBookWithAuthor(int bookId)
        => this.db.Books
            .Include(b => b.Author)
            .FirstOrDefault(b => b.Id == bookId);

    public List<Volume> GetVolumesWithChapters(int bookId)
        => this.db.Volumes
            .Where(v => v.BookId == bookId)
            .Include(v => v.Chapters)
            .OrderBy(v => v.Sort)
            .ToList();

    public Chapter? GetLatestChapter(int bookId)
        => this.db.Chapters
            .Where(c => c.Volume.BookId == bookId)
            .OrderByDescending(c => c.UpdatedAt)
            .FirstOrDefault();

    public int GetTotalWordCount(int bookId)
        => this.db.Chapters
            .Where(c => c.Volume.BookId == bookId)
            .Sum(c => c.WordCount ?? c.Content.Length);

    public Volume? GetVolumeByBookAndSort(int bookId, int sort)
        => this.db.Volumes
            .Include(v => v.Book)
            .FirstOrDefault(v => v.BookId == bookId && v.Sort == sort);

    public Chapter? GetChapter(int volumeId, int chapterNum)
        => this.db.Chapters
            .FirstOrDefault(c => c.VolumeId == volumeId && c.ChapterNum == chapterNum);

    public Chapter? GetPrevChapter(int volumeId, int chapterNum)
        => this.db.Chapters
            .Where(c => c.VolumeId == volumeId && c.ChapterNum < chapterNum)
            .OrderByDescending(c => c.ChapterNum)
            .FirstOrDefault();

    public Chapter? GetNextChapter(int volumeId, int chapterNum)
        => this.db.Chapters
            .Where(c => c.VolumeId == volumeId && c.ChapterNum > chapterNum)
            .OrderBy(c => c.ChapterNum)
            .FirstOrDefault();
}
