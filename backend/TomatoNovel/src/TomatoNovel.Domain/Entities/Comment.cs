namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a comment entity.
/// </summary>
public class Comment
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user who posted the comment.
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the book to which this comment belongs.
    /// </summary>
    public int BookId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the parent comment, used for nested replies.
    /// </summary>
    public int? ParentId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user being mentioned or replied to.
    /// </summary>
    public int? ReplyToUserId { get; set; }

    /// <summary>
    /// Gets or sets the number of likes this comment has received.
    /// </summary>
    public int? Likes { get; set; }

    /// <summary>
    /// Gets or sets the textual content of the comment.
    /// </summary>
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the timestamp when the comment was created.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the user who posted the comment.
    /// </summary>
    public User User { get; set; } = default!;

    /// <summary>
    /// Gets or sets the user being mentioned or replied to.
    /// </summary>
    public User? ReplyToUser { get; set; }

    /// <summary>
    /// Gets or sets the book associated with this comment.
    /// </summary>
    public Book Book { get; set; } = default!;

    /// <summary>
    /// Gets or sets the parent comment in the nested reply structure.
    /// </summary>
    public Comment? Parent { get; set; }

    /// <summary>
    /// Gets or sets the collection of child comments (nested replies).
    /// </summary>
    public ICollection<Comment> Replies { get; set; } = new List<Comment>();
}
