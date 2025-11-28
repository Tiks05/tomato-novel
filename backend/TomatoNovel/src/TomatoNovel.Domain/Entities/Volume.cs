namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a volume entity within a book.
/// </summary>
public class Volume
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the book to which this volume belongs.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets the title of the volume.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the sort order value of the volume.
    /// </summary>
    public int Sort { get; set; } = 0;

    /// <summary>
    /// Gets or sets the timestamp when the volume was created.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the navigation property for the book to which this volume belongs.
    /// </summary>
    public Book Book { get; set; } = default!;

    /// <summary>
    /// Gets or sets the collection of chapters contained in this volume.
    /// </summary>
    public ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
}
