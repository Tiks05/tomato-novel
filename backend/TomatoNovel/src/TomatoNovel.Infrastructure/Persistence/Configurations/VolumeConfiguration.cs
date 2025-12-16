namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Volume entity for Entity Framework Core.
/// </summary>
public class VolumeConfiguration : IEntityTypeConfiguration<Volume>
{
    public void Configure(EntityTypeBuilder<Volume> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("volume");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(v => v.Id);

        builder.Property(v => v.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Key
        // =========================
        builder.Property(v => v.BookId)
               .HasColumnName("book_id")
               .IsRequired();

        // =========================
        // Properties
        // =========================
        builder.Property(v => v.Title)
               .HasColumnName("title")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(v => v.Sort)
               .HasColumnName("sort")
               .HasDefaultValue(0);

        // =========================
        // Time fields
        // =========================
        builder.Property(v => v.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes（常用）
        // =========================
        builder.HasIndex(v => v.BookId);
        builder.HasIndex(v => new { v.BookId, v.Sort });

        // =========================
        // Relationships
        // =========================

        // Volume → Book (N:1)
        builder.HasOne(v => v.Book)
               .WithMany(b => b.Volumes)
               .HasForeignKey(v => v.BookId)
               .OnDelete(DeleteBehavior.Cascade);

        // Volume → Chapter (1:N)
        builder.HasMany(v => v.Chapters)
               .WithOne(c => c.Volume)
               .HasForeignKey(c => c.VolumeId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
