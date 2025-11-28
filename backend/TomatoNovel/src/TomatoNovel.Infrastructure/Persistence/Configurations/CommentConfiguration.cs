using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Comment entity for Entity Framework Core.
/// </summary>
public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        // Table name
        builder.ToTable("comment");

        // Primary key
        builder.HasKey(c => c.Id);

        // Properties
        builder.Property(c => c.UserId)
            .IsRequired();

        builder.Property(c => c.BookId)
            .IsRequired();

        builder.Property(c => c.ParentId);

        builder.Property(c => c.ReplyToUserId);

        builder.Property(c => c.Content)
            .HasColumnType("text")
            .IsRequired();

        builder.Property(c => c.Likes)
            .HasDefaultValue(0);

        builder.Property(c => c.CreatedAt)
            .HasColumnType("datetime");

        // -------------------------
        // Navigation: User (author of the comment)
        // -------------------------

        builder.HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // -------------------------
        // Navigation: Reply-to user (no collection navigation on User)
        // -------------------------

        builder.HasOne(c => c.ReplyToUser)
            .WithMany()
            .HasForeignKey(c => c.ReplyToUserId)
            .OnDelete(DeleteBehavior.ClientSetNull);

        // -------------------------
        // Navigation: Book
        // -------------------------

        builder.HasOne(c => c.Book)
            .WithMany(b => b.Comments)
            .HasForeignKey(c => c.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        // -------------------------
        // Self-reference: Parent Comment → Replies
        // -------------------------

        builder.HasOne(c => c.Parent)
            .WithMany(p => p.Replies)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
