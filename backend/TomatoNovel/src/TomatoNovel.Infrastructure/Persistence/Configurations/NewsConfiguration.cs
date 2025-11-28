using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the News entity for Entity Framework Core.
/// </summary>
public class NewsConfiguration : IEntityTypeConfiguration<News>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<News> builder)
    {
        // Table name
        builder.ToTable("news");

        // Primary key
        builder.HasKey(n => n.Id);

        // Properties
        builder.Property(n => n.Title)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(n => n.Content)
            .HasColumnType("text");

        builder.Property(n => n.NoticeUrl)
            .HasMaxLength(255);

        builder.Property(n => n.CoverUrl)
            .HasMaxLength(255);

        builder.Property(n => n.BannerUrl)
            .HasMaxLength(255);

        builder.Property(n => n.IsBanner)
            .HasDefaultValue(false);

        builder.Property(n => n.IsNotice)
            .HasDefaultValue(false);

        builder.Property(n => n.Type)
            .HasMaxLength(16)
            .HasDefaultValue("notice")
            .IsRequired();

        builder.Property(n => n.CreatedAt)
            .HasColumnType("datetime");

        builder.Property(n => n.UpdatedAt)
            .HasColumnType("datetime");

        // No navigation properties to configure for News.
    }
}
