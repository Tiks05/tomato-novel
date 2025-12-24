namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class LastChapterResponseDto
{
    public string? VolumeTitle { get; set; }

    public int? CurrentVolumeId { get; set; }

    public int LastVolumeId { get; set; }

    public string LastVolumeTitle { get; set; } = string.Empty;

    public int ChapterIndex { get; set; }

    public string? ChapterTitle { get; set; }

    public string? UpdatedAt { get; set; }
}
