using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the User entity for Entity Framework Core.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // Table name
        builder.ToTable("user");

        // Primary key
        builder.HasKey(u => u.Id);

        // Properties
        builder.Property(u => u.Phone)
            .HasMaxLength(11)
            .IsRequired();

        builder.HasIndex(u => u.Phone)
            .IsUnique();

        builder.Property(u => u.Password)
            .HasMaxLength(60);

        builder.Property(u => u.Nickname)
            .HasMaxLength(16);

        builder.Property(u => u.Role)
            .HasMaxLength(16);

        builder.Property(u => u.Avatar)
            .HasMaxLength(255);

        builder.Property(u => u.Signature)
            .HasMaxLength(255);

        builder.Property(u => u.LifePhoto)
            .HasMaxLength(255);

        builder.Property(u => u.Masterpiece)
            .HasMaxLength(64);

        builder.Property(u => u.AuthorLevel)
            .HasMaxLength(16);

        builder.Property(u => u.Level)
            .HasDefaultValue(0);

        builder.Property(u => u.BecomeAuthorAt)
            .HasColumnType("datetime");

        builder.Property(u => u.CreatedAt)
            .HasColumnType("datetime");

        // -------------------------
        // Navigation properties
        // -------------------------

        // User → Books (1:N)
        builder.HasMany(u => u.Books)
            .WithOne(b => b.Author)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Comments (1:N)
        builder.HasMany(u => u.Comments)
            .WithOne(c => c.User)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Favorites (1:N)
        builder.HasMany(u => u.Favorites)
            .WithOne(f => f.User)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // User → Follows (1:N, follower side)
        builder.HasMany(u => u.Follows)
            .WithOne(f => f.Follower)
            .HasForeignKey(f => f.FollowerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
