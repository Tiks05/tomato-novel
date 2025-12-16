namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.BookInfo.Requests;
using TomatoNovel.Application.DTOs.BookInfo.Responses;
using TomatoNovel.Application.Exceptions;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;

public class BookInfoService : IBookInfoService
{
    private readonly IBookInfoRepository repository;

    public BookInfoService(IBookInfoRepository repository)
    {
        this.repository = repository;
    }

    public BookHeaderResponseDto GetBookHeader(int bookId)
    {
        var book = repository.GetBookWithAuthor(bookId)
            ?? throw new BusinessException(40020, "书籍不存在");

        var latestChapter = repository.GetLatestChapter(bookId);
        var totalWordCount = repository.GetTotalWordCount(bookId);

        return new BookHeaderResponseDto
        {
            Book = new()
            {
                Id = book.Id,
                Title = book.Title,
                CoverUrl = book.CoverUrl ?? string.Empty,
                Status = book.Status ?? string.Empty,
                WordCount = totalWordCount,
                Tags = book.Tags ?? string.Empty,
                UpdatedAt = book.UpdatedAt.ToString("yyyy-MM-dd HH:mm:ss"),
                LatestChapter = latestChapter?.ChapterNum ?? 0,
                LatestChapterTitle = latestChapter?.Title ?? string.Empty
            },
            Author = new()
            {
                Nickname = book.Author.Nickname ?? string.Empty,
                CoverUrl = book.Author.Avatar ?? string.Empty,
                Signature = book.Author.Signature ?? string.Empty,
                Path = $"/writerinfo/{book.Author.Id}"
            }
        };
    }

    public BookContentResponseDto GetBookContent(int bookId)
    {
        var book = repository.GetBook(bookId)
            ?? throw new BusinessException(40021, "书籍不存在");

        var volumes = repository.GetVolumesWithChapters(bookId);

        return new BookContentResponseDto
        {
            Intro = book.Intro ?? string.Empty,
            Volumes = volumes.Select((v, index) => new BookVolumeDto
            {
                Title = $"第{ToChinese(index + 1)}卷：{v.Title}",
                ChapterCount = v.Chapters.Count,
                Chapters = v.Chapters
                    .OrderBy(c => c.ChapterNum)
                    .Select(c => new BookChapterDto
                    {
                        Title = c.Title,
                        Path = $"/read/{bookId}/{v.Sort}/{c.ChapterNum}"
                    })
                    .ToList()
            }).ToList()
        };
    }

    public ChapterReadResponseDto ReadChapter(ChapterReadRequestDto request)
    {
        var volume = repository.GetVolumeByBookAndSort(
            request.BookId,
            request.VolumeId
        ) ?? throw new BusinessException(40022, "分卷不存在");

        var chapter = repository.GetChapter(volume.Id, request.ChapterId)
            ?? throw new BusinessException(40023, "章节不存在");

        var prev = repository.GetPrevChapter(volume.Id, chapter.ChapterNum);
        var next = repository.GetNextChapter(volume.Id, chapter.ChapterNum);

        return new ChapterReadResponseDto
        {
            BookTitle = volume.Book.Title,
            ChapterTitle = chapter.Title,
            WordCount = chapter.WordCount ?? chapter.Content.Length,
            UpdatedAt = chapter.UpdatedAt.ToString("yyyy-MM-dd"),
            Content = chapter.Content,
            ChapterIndex = chapter.ChapterNum,
            PrevChapterId = prev?.ChapterNum,
            NextChapterId = next?.ChapterNum
        };
    }

    private static string ToChinese(int num)
    {
        string[] digits = { "零", "一", "二", "三", "四", "五", "六", "七", "八", "九" };
        if (num <= 10) return num == 10 ? "十" : digits[num];
        if (num < 20) return "十" + digits[num % 10];
        return digits[num / 10] + "十" + (num % 10 == 0 ? "" : digits[num % 10]);
    }
}
