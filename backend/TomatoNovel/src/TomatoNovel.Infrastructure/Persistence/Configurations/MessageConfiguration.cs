namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Message entity for Entity Framework Core.
/// </summary>
public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("message");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Key
        // =========================
        builder.Property(m => m.UserId)
               .HasColumnName("user_id")
               .IsRequired();

        // =========================
        // Properties
        // =========================
        builder.Property(m => m.Type)
               .HasColumnName("type")
               .IsRequired();

        builder.Property(m => m.Title)
               .HasColumnName("title")
               .HasMaxLength(255);

        builder.Property(m => m.Content)
               .HasColumnName("content")
               .HasColumnType("text")
               .IsRequired();

        builder.Property(m => m.IsRead)
               .HasColumnName("is_read")
               .HasDefaultValue(false)
               .IsRequired();

        builder.Property(m => m.ReadAt)
               .HasColumnName("read_at")
               .HasColumnType("datetime");

        // =========================
        // Time fields
        // =========================
        builder.Property(m => m.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime")
               .IsRequired();

        // =========================
        // Indexes
        // =========================
        builder.HasIndex(m => m.UserId);
        builder.HasIndex(m => m.Type);
        builder.HasIndex(m => m.IsRead);
        builder.HasIndex(m => m.CreatedAt);

        // =========================
        // Relationships
        // =========================

        // Message → User
        builder.HasOne(m => m.User)
               .WithMany(u => u.Messages)
               .HasForeignKey(m => m.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
