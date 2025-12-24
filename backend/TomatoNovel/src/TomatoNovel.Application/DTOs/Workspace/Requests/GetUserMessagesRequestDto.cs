namespace TomatoNovel.Application.DTOs.Workspace.Requests;

/// <summary>
/// Request DTO for querying user messages.
public class GetUserMessagesRequestDto
{
    /// <summary>
    /// Gets or sets the user identifier.
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Gets or sets the message type filter.
    /// 审核提醒 / 作品通知 / 活动通知 / 系统通知 / 互动通知
    /// Null or empty means all types.
    /// </summary>
    public int? Type { get; set; }

    /// <summary>
    /// Gets or sets the page number.
    /// </summary>
    public int Page { get; set; } = 1;

    /// <summary>
    /// Gets or sets the page size.
    /// </summary>
    public int PageSize { get; set; } = 10;
}
