namespace TomatoNovel.Application.DTOs.Workspace.Requests;

public class ChapterDetailRequestDto
{
    /// <summary>
    /// Gets or sets 书籍 ID.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets 章节 ID.
    /// </summary>
    public int ChapterId { get; set; }
}
