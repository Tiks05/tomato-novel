namespace TomatoNovel.Domain.Entities;

using System.ComponentModel.DataAnnotations.Schema;

/// <summary>
/// Represents a user entity.
/// </summary>
[Table("user")]
public class User
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the user's phone number.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's hashed password.
    /// </summary>
    public string? PasswordHash { get; set; }

    /// <summary>
    /// Gets or sets the user's nickname.
    /// </summary>
    public string? Nickname { get; set; }

    /// <summary>
    /// Gets or sets the user's role.
    /// </summary>
    public string? Role { get; set; }

    /// <summary>
    /// Gets or sets the user's avatar.
    /// </summary>
    public string? Avatar { get; set; }

    /// <summary>
    /// Gets or sets the user's signature.
    /// </summary>
    public string? Signature { get; set; }

    /// <summary>
    /// Gets or sets the user's life photo.
    /// </summary>
    public string? LifePhoto { get; set; }

    /// <summary>
    /// Gets or sets the user's masterpiece.
    /// </summary>
    public string? Masterpiece { get; set; }

    /// <summary>
    /// Gets or sets the author's textual level.
    /// </summary>
    public string? AuthorLevel { get; set; }

    /// <summary>
    /// Gets or sets the numerical author level.
    /// </summary>
    public int Level { get; set; } = 0;

    /// <summary>
    /// Gets or sets the timestamp when the user became an author.
    /// </summary>
    public DateTime? BecomeAuthorAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the user registered.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------------------------------------
    // Navigation properties
    // -------------------------------------------------------
    public ICollection<Book> Books { get; set; } = new List<Book>();

    public ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public ICollection<Follow> Follows { get; set; } = new List<Follow>();
}
