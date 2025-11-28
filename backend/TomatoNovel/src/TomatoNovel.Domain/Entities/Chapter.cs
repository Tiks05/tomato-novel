namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a chapter entity.
/// </summary>
public class Chapter
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the volume to which this chapter belongs.
    /// </summary>
    public int VolumeId { get; set; }

    /// <summary>
    /// Gets or sets the chapter number.
    /// </summary>
    public int ChapterNum { get; set; }

    /// <summary>
    /// Gets or sets the title of the chapter.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the word count of the chapter.
    /// </summary>
    public int? WordCount { get; set; }

    /// <summary>
    /// Gets or sets the content of the chapter.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the review status, such as published, reviewing, rejected, or pending.
    /// </summary>
    public string Status { get; set; } = "published";

    /// <summary>
    /// Gets or sets the creation timestamp.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Gets or sets the update timestamp.
    /// </summary>
    public DateTime UpdatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the navigation property for the volume to which this chapter belongs.
    /// </summary>
    public Volume Volume { get; set; } = default!;
}
