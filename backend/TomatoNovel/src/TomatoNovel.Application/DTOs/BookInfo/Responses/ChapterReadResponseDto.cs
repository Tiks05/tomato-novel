namespace TomatoNovel.Application.DTOs.BookInfo.Responses;

public class ChapterReadResponseDto
{
    public string BookTitle { get; set; } = string.Empty;
    public string ChapterTitle { get; set; } = string.Empty;
    public int WordCount { get; set; }
    public string UpdatedAt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int ChapterIndex { get; set; }
    public int? PrevChapterId { get; set; }
    public int? NextChapterId { get; set; }
}
