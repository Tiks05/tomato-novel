using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Classroom entity for Entity Framework Core.
/// </summary>
public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Classroom> builder)
    {
        // Table name
        builder.ToTable("classroom");

        // Primary key
        builder.HasKey(c => c.Id);

        // Properties
        builder.Property(c => c.Title)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(c => c.CategoryType)
            .HasMaxLength(50);

        builder.Property(c => c.CoverUrl)
            .HasMaxLength(255);

        builder.Property(c => c.Intro)
            .HasMaxLength(255);

        builder.Property(c => c.IsIncludeVideo)
            .HasDefaultValue(false);

        builder.Property(c => c.Content)
            .HasColumnType("text");

        builder.Property(c => c.CreateAt)
            .HasColumnType("datetime");

        // No navigation properties to configure here.
    }
}
