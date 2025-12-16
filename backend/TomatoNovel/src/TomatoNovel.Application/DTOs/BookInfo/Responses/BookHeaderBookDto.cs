namespace TomatoNovel.Application.DTOs.BookInfo.Responses;

public class BookHeaderBookDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string CoverUrl { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int WordCount { get; set; }
    public string Tags { get; set; } = string.Empty;
    public string UpdatedAt { get; set; } = string.Empty;
    public int LatestChapter { get; set; }
    public string LatestChapterTitle { get; set; } = string.Empty;
}
