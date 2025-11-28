namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a news or announcement entry.
/// </summary>
public class News
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the news entry.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the content of the news entry. This may include rich text or HTML.
    /// </summary>
    public string? Content { get; set; }

    /// <summary>
    /// Gets or sets the URL of the notice image.
    /// </summary>
    public string? NoticeUrl { get; set; }

    /// <summary>
    /// Gets or sets the URL of the cover image.
    /// </summary>
    public string? CoverUrl { get; set; }

    /// <summary>
    /// Gets or sets the URL of the banner image.
    /// </summary>
    public string? BannerUrl { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether this news entry is displayed as a homepage banner.
    /// </summary>
    public bool IsBanner { get; set; } = false;

    /// <summary>
    /// Gets or sets a value indicating whether this news entry is marked as a notice.
    /// </summary>
    public bool IsNotice { get; set; } = false;

    /// <summary>
    /// Gets or sets the type of the news entry, such as "notice" or "active".
    /// </summary>
    public string Type { get; set; } = "notice";

    /// <summary>
    /// Gets or sets the timestamp when the news entry was created.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the news entry was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}
