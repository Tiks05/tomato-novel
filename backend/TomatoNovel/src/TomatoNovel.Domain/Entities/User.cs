namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a user entity.
/// </summary>
public class User
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the user's phone number. This value must be unique.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the hashed password. This may be null, for example in third-party login scenarios.
    /// </summary>
    public string? Password { get; set; }

    /// <summary>
    /// Gets or sets the user's nickname.
    /// </summary>
    public string? Nickname { get; set; }

    /// <summary>
    /// Gets or sets the user's role, such as user, author, or admin.
    /// </summary>
    public string? Role { get; set; }

    /// <summary>
    /// Gets or sets the URL of the user's avatar image.
    /// </summary>
    public string? Avatar { get; set; }

    /// <summary>
    /// Gets or sets the user's personal signature.
    /// </summary>
    public string? Signature { get; set; }

    /// <summary>
    /// Gets or sets the URL of the user's life photo.
    /// </summary>
    public string? LifePhoto { get; set; }

    /// <summary>
    /// Gets or sets the user's representative work.
    /// </summary>
    public string? Masterpiece { get; set; }

    /// <summary>
    /// Gets or sets the author's textual level, such as "LV3".
    /// </summary>
    public string? AuthorLevel { get; set; }

    /// <summary>
    /// Gets or sets the numerical author level, starting from 0.
    /// </summary>
    public int Level { get; set; } = 0;

    /// <summary>
    /// Gets or sets the timestamp indicating when the user became an author.
    /// </summary>
    public DateTime? BecomeAuthorAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the user registered.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the collection of books written by the user.
    /// </summary>
    public ICollection<Book> Books { get; set; } = new List<Book>();

    /// <summary>
    /// Gets or sets the collection of comments posted by the user.
    /// </summary>
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    /// <summary>
    /// Gets or sets the collection of favorite records created by the user.
    /// </summary>
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    /// <summary>
    /// Gets or sets the collection of follow relationships associated with the user.
    /// </summary>
    public ICollection<Follow> Follows { get; set; } = new List<Follow>();
}
