namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a favorite record, indicating that a user has favorited a book.
/// </summary>
public class Favorite
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user who favorited the book.
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the book that was favorited.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the book was favorited.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the user who created the favorite record.
    /// </summary>
    public User User { get; set; } = default!;

    /// <summary>
    /// Gets or sets the book that was favorited.
    /// </summary>
    public Book Book { get; set; } = default!;
}
