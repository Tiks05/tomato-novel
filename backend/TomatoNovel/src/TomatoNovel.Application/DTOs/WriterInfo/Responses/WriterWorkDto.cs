namespace TomatoNovel.Application.DTOs.WriterInfo.Responses;

public class WriterWorkDto
{
    public string Title { get; set; } = string.Empty;

    public string CoverUrl { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int WordCount { get; set; }

    public string Tags { get; set; } = string.Empty;

    public string Intro { get; set; } = string.Empty;

    public string? UpdatedAt { get; set; }

    public string BookinfoPath { get; set; } = string.Empty;

    public int? MaxChapter { get; set; }

    public string? MaxChapterTitle { get; set; }
}
