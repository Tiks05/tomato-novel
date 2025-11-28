namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a novel entity.
/// </summary>
public class Book
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the author user identifier (foreign key to User.Id).
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Gets or sets the title of the book.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the reader channel, such as male or female.
    /// </summary>
    public string? ReaderType { get; set; }

    /// <summary>
    /// Gets or sets the theme category.
    /// </summary>
    public string? ThemeType { get; set; }

    /// <summary>
    /// Gets or sets the role category.
    /// </summary>
    public string? RoleType { get; set; }

    /// <summary>
    /// Gets or sets the plot category.
    /// </summary>
    public string? PlotType { get; set; }

    /// <summary>
    /// Gets or sets the name of the protagonist.
    /// </summary>
    public string? Hero { get; set; }

    /// <summary>
    /// Gets or sets the serialization status, such as completed or ongoing.
    /// </summary>
    public string? Status { get; set; }

    /// <summary>
    /// Gets or sets the actual word count of the book.
    /// </summary>
    public int? WordCount { get; set; }

    /// <summary>
    /// Gets or sets the word count range description.
    /// </summary>
    public string? WordCountRange { get; set; }

    /// <summary>
    /// Gets or sets the comma-separated tag list.
    /// </summary>
    public string? Tags { get; set; }

    /// <summary>
    /// Gets or sets the introduction text of the book.
    /// </summary>
    public string? Intro { get; set; }

    /// <summary>
    /// Gets or sets the URL of the cover image.
    /// </summary>
    public string? CoverUrl { get; set; }

    /// <summary>
    /// Gets or sets the number of times the book has been favorited.
    /// </summary>
    public int FavoriteCount { get; set; } = 0;

    /// <summary>
    /// Gets or sets the sign status, such as unsigned or signed.
    /// </summary>
    public string SignStatus { get; set; } = "Unsigned";

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
    /// Gets or sets the author navigation property.
    /// </summary>
    public User Author { get; set; } = default!;

    /// <summary>
    /// Gets or sets the collection of volumes under this book.
    /// </summary>
    public ICollection<Volume> Volumes { get; set; } = new List<Volume>();

    /// <summary>
    /// Gets or sets the collection of favorite records associated with this book.
    /// </summary>
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    /// <summary>
    /// Gets or sets the collection of comments related to this book.
    /// </summary>
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
