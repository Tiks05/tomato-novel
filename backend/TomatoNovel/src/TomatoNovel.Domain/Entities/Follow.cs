namespace TomatoNovel.Domain.Entities;

/// <summary>
/// Represents a user follow relationship.
/// </summary>
public class Follow
{
    /// <summary>
    /// Gets or sets the primary key identifier.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user who follows another user.
    /// </summary>
    public int FollowerId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the user being followed.
    /// </summary>
    public int FollowedId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the follow action was created.
    /// </summary>
    public DateTime CreatedAt { get; set; }

    // -------------------------
    // Navigation properties
    // -------------------------

    /// <summary>
    /// Gets or sets the user who initiated the follow action.
    /// </summary>
    public User Follower { get; set; } = default!;

    /// <summary>
    /// Gets or sets the user who is being followed.
    /// </summary>
    public User Followed { get; set; } = default!;
}
