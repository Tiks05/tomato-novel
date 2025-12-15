namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Chapter entity for Entity Framework Core.
/// </summary>
public class ChapterConfiguration : IEntityTypeConfiguration<Chapter>
{
    public void Configure(EntityTypeBuilder<Chapter> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("chapter");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Keys
        // =========================
        builder.Property(c => c.VolumeId)
               .HasColumnName("volume_id")
               .IsRequired();

        // =========================
        // Properties
        // =========================

        builder.Property(c => c.ChapterNum)
               .HasColumnName("chapter_num")
               .IsRequired();

        builder.Property(c => c.Title)
               .HasColumnName("title")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(c => c.WordCount)
               .HasColumnName("word_count");

        builder.Property(c => c.Content)
               .HasColumnName("content")
               .HasColumnType("text")
               .IsRequired();

        builder.Property(c => c.Status)
               .HasColumnName("status")
               .HasMaxLength(20)
               .HasDefaultValue("published")
               .IsRequired();

        // =========================
        // Time fields
        // =========================

        builder.Property(c => c.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        builder.Property(c => c.UpdatedAt)
               .HasColumnName("updated_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes（常用）
        // =========================

        builder.HasIndex(c => c.VolumeId);
        builder.HasIndex(c => new { c.VolumeId, c.ChapterNum })
               .IsUnique();

        // =========================
        // Relationships
        // =========================

        // Chapter → Volume (N:1)
        builder.HasOne(c => c.Volume)
               .WithMany(v => v.Chapters)
               .HasForeignKey(c => c.VolumeId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
