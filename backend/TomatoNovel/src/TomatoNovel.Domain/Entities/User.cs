using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a user entity.
/// </summary>
[Table("user")]
public class User
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    [Column("id")]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the user's phone number.
    /// </summary>
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user's hashed password.
    /// </summary>
    [Column("password_hash")]
    public string? PasswordHash { get; set; }

    /// <summary>
    /// Gets or sets the user's nickname.
    /// </summary>
    [Column("nickname")]
    public string? Nickname { get; set; }

    /// <summary>
    /// Gets or sets the user's role.
    /// </summary>
    [Column("role")]
    public string? Role { get; set; }

    /// <summary>
    /// Gets or sets the user's avatar.
    /// </summary>
    [Column("avatar")]
    public string? Avatar { get; set; }

    /// <summary>
    /// Gets or sets the user's signature.
    /// </summary>
    [Column("signature")]
    public string? Signature { get; set; }

    /// <summary>
    /// Gets or sets the user's life photo.
    /// </summary>
    [Column("life_photo")]
    public string? LifePhoto { get; set; }

    /// <summary>
    /// Gets or sets the user's masterpiece.
    /// </summary>
    [Column("masterpiece")]
    public string? Masterpiece { get; set; }

    /// <summary>
    /// Gets or sets the author's textual level.
    /// </summary>
    [Column("author_level")]
    public string? AuthorLevel { get; set; }

    /// <summary>
    /// Gets or sets the numerical author level.
    /// </summary>
    [Column("level")]
    public int Level { get; set; } = 0;

    /// <summary>
    /// Gets or sets the timestamp when the user became an author.
    /// </summary>
    [Column("become_author_at")]
    public DateTime? BecomeAuthorAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the user registered.
    /// </summary>
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    // -------------------------------------------------------
    // Navigation properties
    // -------------------------------------------------------

    public ICollection<Book> Books { get; set; } = new List<Book>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    public ICollection<Follow> Follows { get; set; } = new List<Follow>();
}
