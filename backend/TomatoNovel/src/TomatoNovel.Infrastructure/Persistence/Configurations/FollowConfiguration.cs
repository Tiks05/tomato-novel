using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Follow entity for Entity Framework Core.
/// </summary>
public class FollowConfiguration : IEntityTypeConfiguration<Follow>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Follow> builder)
    {
        // Table name
        builder.ToTable("follow");

        // Primary key
        builder.HasKey(f => f.Id);

        // Properties
        builder.Property(f => f.FollowerId)
            .IsRequired();

        builder.Property(f => f.FollowedId)
            .IsRequired();

        builder.Property(f => f.CreatedAt)
            .HasColumnType("datetime");

        // Unique constraint: one user cannot follow the same user twice
        builder.HasIndex(f => new { f.FollowerId, f.FollowedId })
            .IsUnique()
            .HasDatabaseName("uniq_follow");

        // -------------------------
        // Navigation properties
        // -------------------------

        // Follow → Follower (one user can follow many others)
        builder.HasOne(f => f.Follower)
            .WithMany(u => u.Follows)
            .HasForeignKey(f => f.FollowerId)
            .OnDelete(DeleteBehavior.Cascade);

        // Follow → Followed (we do not expose a collection navigation on User here)
        builder.HasOne(f => f.Followed)
            .WithMany()
            .HasForeignKey(f => f.FollowedId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
