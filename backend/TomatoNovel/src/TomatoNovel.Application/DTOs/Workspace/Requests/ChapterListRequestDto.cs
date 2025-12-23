namespace TomatoNovel.Application.DTOs.Workspace.Requests;

public class ChapterListRequestDto
{
    public int BookId { get; set; }
    public string? Title { get; set; }
    public string? VolumeId { get; set; }
    public string? Status { get; set; }
}
