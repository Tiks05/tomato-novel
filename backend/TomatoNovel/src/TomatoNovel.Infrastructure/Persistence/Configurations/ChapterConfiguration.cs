using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Chapter entity for Entity Framework Core.
/// </summary>
public class ChapterConfiguration : IEntityTypeConfiguration<Chapter>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Chapter> builder)
    {
        // Table name
        builder.ToTable("chapter");

        // Primary key
        builder.HasKey(c => c.Id);

        // Properties
        builder.Property(c => c.VolumeId)
            .IsRequired();

        builder.Property(c => c.ChapterNum)
            .IsRequired();

        builder.Property(c => c.Title)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(c => c.WordCount);

        builder.Property(c => c.Content)
            .HasColumnType("text")
            .IsRequired();

        builder.Property(c => c.Status)
            .HasMaxLength(20)
            .HasDefaultValue("published")
            .IsRequired();

        builder.Property(c => c.CreatedAt)
            .HasColumnType("datetime");

        builder.Property(c => c.UpdatedAt)
            .HasColumnType("datetime");

        // -------------------------
        // Navigation properties
        // -------------------------

        // Chapter → Volume (many chapters belong to one volume)
        builder.HasOne(c => c.Volume)
            .WithMany(v => v.Chapters)
            .HasForeignKey(c => c.VolumeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
