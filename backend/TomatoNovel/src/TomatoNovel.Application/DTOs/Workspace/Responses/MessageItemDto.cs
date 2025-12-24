namespace TomatoNovel.Application.DTOs.Workspace.Responses;

/// <summary>
/// DTO representing a message item.
/// </summary>
public class MessageItemDto
{
    /// <summary>
    /// Gets or sets the message identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the message category.
    /// 审核提醒 / 作品通知 / 活动通知 / 系统通知 / 互动通知
    /// </summary>
    public string Category { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the message title.
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// Gets or sets the message content (HTML allowed).
    /// </summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the display time string (e.g. 12-15).
    /// </summary>
    public string Time { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether the message has been read.
    /// </summary>
    public bool IsRead { get; set; }
}
