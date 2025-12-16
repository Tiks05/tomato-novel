namespace TomatoNovel.Application.DTOs.Library.Responses;

public class BookItemDto
{
    /// <summary>
    /// 书籍 ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// 书名
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// 作者名
    /// </summary>
    public string Author { get; set; } = string.Empty;

    /// <summary>
    /// 连载状态
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// 字数
    /// </summary>
    public int WordCount { get; set; }

    /// <summary>
    /// 简介
    /// </summary>
    public string Intro { get; set; } = string.Empty;

    /// <summary>
    /// 封面完整 URL
    /// </summary>
    public string CoverUrl { get; set; } = string.Empty;

    /// <summary>
    /// 更新时间（已格式化，如：3小时前）
    /// </summary>
    public string UpdatedAt { get; set; } = string.Empty;

    /// <summary>
    /// 跳转路径（如 /bookinfo/1）
    /// </summary>
    public string Path { get; set; } = string.Empty;
}
