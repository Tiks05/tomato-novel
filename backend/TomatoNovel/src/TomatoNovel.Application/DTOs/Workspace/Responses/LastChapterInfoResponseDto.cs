namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class LastChapterInfoResponseDto
{
    public int? VolumeIndex { get; set; }
    public string? VolumeTitle { get; set; }
    public int? ChapterIndex { get; set; }
    public string? ChapterTitle { get; set; }
}
