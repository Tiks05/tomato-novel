namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Classroom entity for Entity Framework Core.
/// </summary>
public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom>
{
    public void Configure(EntityTypeBuilder<Classroom> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("classroom");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Id)
               .HasColumnName("id");

        // =========================
        // Properties
        // =========================
        builder.Property(c => c.Title)
               .HasColumnName("title")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(c => c.CategoryType)
               .HasColumnName("category_type")
               .HasMaxLength(50);

        builder.Property(c => c.CoverUrl)
               .HasColumnName("cover_url")
               .HasMaxLength(255);

        builder.Property(c => c.Intro)
               .HasColumnName("intro")
               .HasMaxLength(255);

        builder.Property(c => c.IsIncludeVideo)
               .HasColumnName("is_include_video")
               .HasDefaultValue(false);

        builder.Property(c => c.Content)
               .HasColumnName("content")
               .HasColumnType("text");

        builder.Property(c => c.CreateAt)
               .HasColumnName("create_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes（可选）
        // =========================
        builder.HasIndex(c => c.CategoryType);
        builder.HasIndex(c => c.CreateAt);

        // =========================
        // Relationships
        // =========================
        // Classroom 当前无导航属性
    }
}
