using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Volume entity for Entity Framework Core.
/// </summary>
public class VolumeConfiguration : IEntityTypeConfiguration<Volume>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Volume> builder)
    {
        // Table name
        builder.ToTable("volume");

        // Primary key
        builder.HasKey(v => v.Id);

        // Properties
        builder.Property(v => v.BookId)
            .IsRequired();

        builder.Property(v => v.Title)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(v => v.Sort)
            .HasDefaultValue(0);

        builder.Property(v => v.CreatedAt)
            .HasColumnType("datetime");

        // -------------------------
        // Navigation properties
        // -------------------------

        // Volume → Book (many volumes belong to one book)
        builder.HasOne(v => v.Book)
            .WithMany(b => b.Volumes)
            .HasForeignKey(v => v.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        // Volume → Chapter (one volume has many chapters)
        builder.HasMany(v => v.Chapters)
            .WithOne(c => c.Volume)
            .HasForeignKey(c => c.VolumeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
