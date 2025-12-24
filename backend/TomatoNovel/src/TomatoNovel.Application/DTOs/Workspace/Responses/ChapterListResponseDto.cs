namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class ChapterListResponseDto
{
    public string Title { get; set; } = string.Empty;

    public List<VolumeItemDto> Volumes { get; set; } = [];

    public List<ChapterItemDto> List { get; set; } = [];
}
