namespace TomatoNovel.Application.DTOs.Workspace.Responses;

public class BookRankItemDto
{
    public int Num { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public string Pic { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
}
