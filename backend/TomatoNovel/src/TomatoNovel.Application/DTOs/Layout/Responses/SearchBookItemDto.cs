namespace TomatoNovel.Application.DTOs.Layout.Responses;

public class SearchBookItemDto
{
    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int WordCount { get; set; }

    public string Intro { get; set; } = string.Empty;

    public string UpdatedAt { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 封面图（绝对路径）.
    /// </summary>
    public string Pic { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 收藏 / 人气.
    /// </summary>
    public int People { get; set; }

    /// <summary>
    /// Gets or sets 最新章节标题.
    /// </summary>
    public string Update { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 书籍详情页路径.
    /// </summary>
    public string Path { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 第一章阅读路径.
    /// </summary>
    public string ReadPath { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets 最新章节阅读路径.
    /// </summary>
    public string UpdatePath { get; set; } = string.Empty;
}
