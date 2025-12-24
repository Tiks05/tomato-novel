namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a message/notification entity.
/// </summary>
public sealed class Message
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the recipient user identifier (foreign key to User.Id).
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Gets or sets the message type.
    /// 审核提醒 / 作品通知 / 活动通知 / 系统通知 / 互动通知.
    /// </summary>
    public int Type { get; set; }

    /// <summary>
    /// Gets or sets the message title.
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// Gets or sets the message content.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether the message has been read.
    /// </summary>
    public bool IsRead { get; set; } = false;

    /// <summary>
    /// Gets or sets the timestamp when the message was read.
    /// </summary>
    public DateTime? ReadAt { get; set; }

    /// <summary>
    /// Gets or sets the creation timestamp.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the recipient user navigation property.
    /// </summary>
    public User User { get; set; } = default!;
}
