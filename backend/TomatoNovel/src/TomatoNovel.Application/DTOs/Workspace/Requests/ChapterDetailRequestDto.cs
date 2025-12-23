namespace TomatoNovel.Application.DTOs.Workspace.Requests;

public class ChapterDetailRequestDto
{
    /// <summary>
    /// 书籍 ID
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// 章节 ID
    /// </summary>
    public int ChapterId { get; set; }
}
