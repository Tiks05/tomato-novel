namespace TomatoNovel.Application.Services;

using TomatoNovel.Application.DTOs.Library.Requests;
using TomatoNovel.Application.DTOs.Library.Responses;
using TomatoNovel.Application.Interfaces;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;

public class LibraryService : ILibraryService
{
    private readonly ILibraryRepository libraryRepository;

    public LibraryService(ILibraryRepository libraryRepository)
    {
        this.libraryRepository = libraryRepository;
    }

    public BookListResponseDto GetBooks(BookListQueryRequestDto request)
    {
        var query = this.libraryRepository.QueryBooks();

        // Reader type
        if (!string.IsNullOrWhiteSpace(request.ReaderType))
        {
            query = query.Where(b => b.ReaderType == request.ReaderType);
        }

        // Category group
        if (!string.IsNullOrWhiteSpace(request.CategoryGroup) &&
            !string.IsNullOrWhiteSpace(request.CategoryType))
        {
            query = request.CategoryGroup switch
            {
                "theme_type" => query.Where(b => b.ThemeType == request.CategoryType),
                "role_type" => query.Where(b => b.RoleType == request.CategoryType),
                "plot_type" => query.Where(b => b.PlotType == request.CategoryType),
                _ => query,
            };
        }

        // Status
        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(b => b.Status == request.Status);
        }

        // Word count range
        query = request.WordCountRange switch
        {
            "30万以下" => query.Where(b => b.WordCount < 300_000),
            "30-50万" => query.Where(b => b.WordCount >= 300_000 && b.WordCount <= 500_000),
            "50-100万" => query.Where(b => b.WordCount >= 500_000 && b.WordCount <= 1_000_000),
            "100-200万" => query.Where(b => b.WordCount >= 1_000_000 && b.WordCount <= 2_000_000),
            "200万以上" => query.Where(b => b.WordCount >= 2_000_000),
            _ => query,
        };

        // Sort
        query = request.Sort switch
        {
            "hot" => query.OrderByDescending(b => b.FavoriteCount),
            "new" => query.OrderByDescending(b => b.UpdatedAt),
            "words" => query.OrderByDescending(b => b.WordCount),
            _ => query,
        };

        var total = query.Count();

        var books = query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToList();

        return new BookListResponseDto
        {
            Total = total,
            Records = books.Select(MapToDto).ToList(),
        };
    }

    private static BookItemDto MapToDto(Book book)
    {
        return new BookItemDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = book.Author?.Nickname ?? string.Empty,
            Status = book.Status ?? string.Empty,
            WordCount = book.WordCount ?? 0,
            Intro = book.Intro ?? string.Empty,
            CoverUrl = book.CoverUrl ?? string.Empty,
            UpdatedAt = FormatTime(book.UpdatedAt),
            Path = $"/bookinfo/{book.Id}",
        };
    }

    private static string FormatTime(DateTime updatedAt)
    {
        var delta = DateTime.UtcNow - updatedAt;

        if (delta.TotalDays >= 1)
        {
            return updatedAt.ToString("yyyy-MM-dd HH:mm");
        }

        if (delta.TotalHours >= 1)
        {
            return $"{(int)delta.TotalHours}小时前";
        }

        if (delta.TotalMinutes >= 1)
        {
            return $"{(int)delta.TotalMinutes}分钟前";
        }

        return $"{(int)delta.TotalSeconds}秒前";
    }
}
