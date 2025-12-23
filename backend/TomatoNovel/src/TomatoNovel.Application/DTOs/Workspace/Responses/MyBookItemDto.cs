namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class MyBookItemDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Pic { get; set; } = string.Empty;
    public string LatestChapterTitle { get; set; } = string.Empty;
    public int LatestChapterNum { get; set; }
    public int TotalChapters { get; set; }
    public int Words { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
}
