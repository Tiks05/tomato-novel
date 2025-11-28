using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Book entity for Entity Framework Core.
/// </summary>
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        // Table name
        builder.ToTable("book");

        // Primary key
        builder.HasKey(b => b.Id);

        // Basic properties
        builder.Property(b => b.Title)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(b => b.ReaderType)
            .HasMaxLength(8);

        builder.Property(b => b.ThemeType)
            .HasMaxLength(64);

        builder.Property(b => b.RoleType)
            .HasMaxLength(64);

        builder.Property(b => b.PlotType)
            .HasMaxLength(64);

        builder.Property(b => b.Hero)
            .HasMaxLength(64);

        builder.Property(b => b.Status)
            .HasMaxLength(16);

        builder.Property(b => b.WordCount);

        builder.Property(b => b.WordCountRange)
            .HasMaxLength(20);

        builder.Property(b => b.Tags)
            .HasMaxLength(255);

        builder.Property(b => b.Intro)
            .HasColumnType("text");

        builder.Property(b => b.CoverUrl)
            .HasMaxLength(255);

        builder.Property(b => b.FavoriteCount)
            .HasDefaultValue(0);

        builder.Property(b => b.SignStatus)
            .HasMaxLength(16)
            .HasDefaultValue("Unsigned");

        // Time fields
        builder.Property(b => b.CreatedAt)
            .HasColumnType("datetime");

        builder.Property(b => b.UpdatedAt)
            .HasColumnType("datetime");

        // -------------------------
        // Relations
        // -------------------------

        // Book → User (Author)
        builder.HasOne(b => b.Author)
            .WithMany(u => u.Books)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Book → Volume (1:N)
        builder.HasMany(b => b.Volumes)
            .WithOne(v => v.Book)
            .HasForeignKey(v => v.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        // Book → Favorite (1:N)
        builder.HasMany(b => b.Favorites)
            .WithOne(f => f.Book)
            .HasForeignKey(f => f.BookId)
            .OnDelete(DeleteBehavior.Cascade);

        // Book → Comment (1:N)
        builder.HasMany(b => b.Comments)
            .WithOne(c => c.Book)
            .HasForeignKey(c => c.BookId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
