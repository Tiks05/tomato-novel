namespace TomatoNovel.Application.DTOs.Workspace.Requests;

public class ChapterUpdateRequestDto
{
    public int BookId { get; set; }

    public int ChapterId { get; set; }

    public int ChapterNum { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public int WordCount { get; set; }

    public bool IsDraft { get; set; }
}
