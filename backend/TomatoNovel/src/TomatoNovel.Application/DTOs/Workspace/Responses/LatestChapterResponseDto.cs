namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class LatestChapterResponseDto
{
    public int LatestVolumeSort { get; set; }
    public int LatestChapterNum { get; set; }
    public string LatestChapterTitle { get; set; } = string.Empty;
    public string? LatestChapterUpdatedAt { get; set; }
}
