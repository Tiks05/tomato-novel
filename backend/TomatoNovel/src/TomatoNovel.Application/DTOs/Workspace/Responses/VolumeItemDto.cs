namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class VolumeItemDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Sort { get; set; }
    public string CreatedAt { get; set; } = string.Empty;
}
