namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the News entity for Entity Framework Core.
/// </summary>
public class NewsConfiguration : IEntityTypeConfiguration<News>
{
    public void Configure(EntityTypeBuilder<News> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("news");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(n => n.Id);

        builder.Property(n => n.Id)
               .HasColumnName("id");

        // =========================
        // Properties
        // =========================
        builder.Property(n => n.Title)
               .HasColumnName("title")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(n => n.Content)
               .HasColumnName("content")
               .HasColumnType("text");

        builder.Property(n => n.NoticeUrl)
               .HasColumnName("notice_url")
               .HasMaxLength(255);

        builder.Property(n => n.CoverUrl)
               .HasColumnName("cover_url")
               .HasMaxLength(255);

        builder.Property(n => n.BannerUrl)
               .HasColumnName("banner_url")
               .HasMaxLength(255);

        builder.Property(n => n.IsBanner)
               .HasColumnName("is_banner")
               .HasDefaultValue(false);

        builder.Property(n => n.IsNotice)
               .HasColumnName("is_notice")
               .HasDefaultValue(false);

        builder.Property(n => n.Type)
               .HasColumnName("type")
               .HasMaxLength(16)
               .HasDefaultValue("notice")
               .IsRequired();

        builder.Property(n => n.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        builder.Property(n => n.UpdatedAt)
               .HasColumnName("updated_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes (optional but common)
        // =========================
        builder.HasIndex(n => n.Type);
        builder.HasIndex(n => n.IsBanner);
        builder.HasIndex(n => n.IsNotice);
        builder.HasIndex(n => n.CreatedAt);

        // =========================
        // Relationships
        // =========================
        // News has no navigation properties
    }
}
