namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class ChapterItemDto
{
    public int Id { get; set; }

    public int VolumeId { get; set; }

    public int ChapterNum { get; set; }

    public string Title { get; set; } = string.Empty;

    public int WordCount { get; set; }

    public string UpdatedAt { get; set; } = string.Empty;

    public string? Status { get; set; }

    public string? StatusText { get; set; }

    public int TypoCount { get; set; }
}
