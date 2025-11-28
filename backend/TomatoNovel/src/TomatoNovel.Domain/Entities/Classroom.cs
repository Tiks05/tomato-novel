namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a classroom content entry, such as a writing class or live session.
/// </summary>
public class Classroom
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the main title.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the category type (for example: live, writing).
    /// </summary>
    public string? CategoryType { get; set; }

    /// <summary>
    /// Gets or sets the URL of the cover image.
    /// </summary>
    public string? CoverUrl { get; set; }

    /// <summary>
    /// Gets or sets the introduction or summary text.
    /// </summary>
    public string? Intro { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the classroom content contains a video button.
    /// </summary>
    public bool IsIncludeVideo { get; set; } = false;

    /// <summary>
    /// Gets or sets the rich text content, which may include HTML, text, or embedded videos.
    /// </summary>
    public string? Content { get; set; }

    /// <summary>
    /// Gets or sets the creation timestamp.
    /// </summary>
    public DateTime CreateAt { get; set; }
}
