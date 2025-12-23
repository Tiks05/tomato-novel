namespace TomatoNovel.Application.DTOs.Workspace.Requests;

public class ChapterCreateRequestDto
{
    public int BookId { get; set; }
    public int? VolumeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int WordCount { get; set; }
}
