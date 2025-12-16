namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Comment entity for Entity Framework Core.
/// </summary>
public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("comment");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Keys
        // =========================
        builder.Property(c => c.UserId)
               .HasColumnName("user_id")
               .IsRequired();

        builder.Property(c => c.BookId)
               .HasColumnName("book_id")
               .IsRequired();

        builder.Property(c => c.ParentId)
               .HasColumnName("parent_id");

        builder.Property(c => c.ReplyToUserId)
               .HasColumnName("reply_to_user_id");

        // =========================
        // Properties
        // =========================
        builder.Property(c => c.Content)
               .HasColumnName("content")
               .HasColumnType("text")
               .IsRequired();

        builder.Property(c => c.Likes)
               .HasColumnName("likes")
               .HasDefaultValue(0);

        // =========================
        // Time fields
        // =========================
        builder.Property(c => c.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes（常用）
        // =========================
        builder.HasIndex(c => c.BookId);
        builder.HasIndex(c => c.UserId);
        builder.HasIndex(c => c.ParentId);
        builder.HasIndex(c => c.CreatedAt);

        // =========================
        // Relationships
        // =========================

        // Comment → User（评论作者）
        builder.HasOne(c => c.User)
               .WithMany(u => u.Comments)
               .HasForeignKey(c => c.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        // Comment → ReplyToUser（被回复的人，无反向集合）
        builder.HasOne(c => c.ReplyToUser)
               .WithMany()
               .HasForeignKey(c => c.ReplyToUserId)
               .OnDelete(DeleteBehavior.ClientSetNull);

        // Comment → Book
        builder.HasOne(c => c.Book)
               .WithMany(b => b.Comments)
               .HasForeignKey(c => c.BookId)
               .OnDelete(DeleteBehavior.Cascade);

        // =========================
        // Self-reference（父评论 → 子评论）
        // =========================
        builder.HasOne(c => c.Parent)
               .WithMany(p => p.Replies)
               .HasForeignKey(c => c.ParentId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
