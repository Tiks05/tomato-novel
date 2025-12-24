namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class ChapterDetailResponseDto
{
    public int VolumeIndex { get; set; }

    public string VolumeTitle { get; set; } = string.Empty;

    public int ChapterNum { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;
}
