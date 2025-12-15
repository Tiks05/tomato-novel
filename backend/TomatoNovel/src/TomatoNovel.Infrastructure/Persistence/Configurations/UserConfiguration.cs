namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the User entity for Entity Framework Core.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("user");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
               .HasColumnName("id");

        // =========================
        // Properties
        // =========================

        builder.Property(u => u.Phone)
               .HasColumnName("phone")
               .HasMaxLength(11)
               .IsRequired();

        builder.HasIndex(u => u.Phone)
               .IsUnique();

        builder.Property(u => u.PasswordHash)
               .HasColumnName("password_hash")
               .HasMaxLength(60);

        builder.Property(u => u.Nickname)
               .HasColumnName("nickname")
               .HasMaxLength(16);

        builder.Property(u => u.Role)
               .HasColumnName("role")
               .HasMaxLength(16);

        builder.Property(u => u.Avatar)
               .HasColumnName("avatar")
               .HasMaxLength(255);

        builder.Property(u => u.Signature)
               .HasColumnName("signature")
               .HasMaxLength(255);

        builder.Property(u => u.LifePhoto)
               .HasColumnName("life_photo")
               .HasMaxLength(255);

        builder.Property(u => u.Masterpiece)
               .HasColumnName("masterpiece")
               .HasMaxLength(64);

        builder.Property(u => u.AuthorLevel)
               .HasColumnName("author_level")
               .HasMaxLength(16);

        builder.Property(u => u.Level)
               .HasColumnName("level")
               .HasDefaultValue(0);

        builder.Property(u => u.BecomeAuthorAt)
               .HasColumnName("become_author_at")
               .HasColumnType("datetime");

        builder.Property(u => u.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        // =========================
        // Relationships
        // =========================

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
