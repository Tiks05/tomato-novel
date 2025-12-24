namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Book entity for Entity Framework Core.
/// </summary>
public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("book");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Key
        // =========================
        builder.Property(b => b.UserId)
               .HasColumnName("user_id")
               .IsRequired();

        // =========================
        // Properties
        // =========================
        builder.Property(b => b.Title)
               .HasColumnName("title")
               .HasMaxLength(255)
               .IsRequired();

        builder.Property(b => b.ReaderType)
               .HasColumnName("reader_type")
               .HasMaxLength(8);

        builder.Property(b => b.ThemeType)
               .HasColumnName("theme_type")
               .HasMaxLength(64);

        builder.Property(b => b.RoleType)
               .HasColumnName("role_type")
               .HasMaxLength(64);

        builder.Property(b => b.PlotType)
               .HasColumnName("plot_type")
               .HasMaxLength(64);

        builder.Property(b => b.Hero)
               .HasColumnName("hero")
               .HasMaxLength(64);

        builder.Property(b => b.Status)
               .HasColumnName("status")
               .HasMaxLength(16);

        builder.Property(b => b.State)
               .HasColumnName("state")
               .IsRequired()
               .HasDefaultValue(0);

        builder.Property(b => b.WordCount)
               .HasColumnName("word_count");

        builder.Property(b => b.WordCountRange)
               .HasColumnName("word_count_range")
               .HasMaxLength(20);

        builder.Property(b => b.Tags)
               .HasColumnName("tags")
               .HasMaxLength(255);

        builder.Property(b => b.Intro)
               .HasColumnName("intro")
               .HasColumnType("text");

        builder.Property(b => b.CoverUrl)
               .HasColumnName("cover_url")
               .HasMaxLength(255);

        builder.Property(b => b.FavoriteCount)
               .HasColumnName("favorite_count")
               .HasDefaultValue(0);

        builder.Property(b => b.SignStatus)
               .HasColumnName("sign_status")
               .HasMaxLength(16)
               .HasDefaultValue("Unsigned");

        // =========================
        // Time fields
        // =========================
        builder.Property(b => b.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        builder.Property(b => b.UpdatedAt)
               .HasColumnName("updated_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes
        // =========================
        builder.HasIndex(b => b.UserId);
        builder.HasIndex(b => b.ReaderType);
        builder.HasIndex(b => b.Status);
        builder.HasIndex(b => b.State);
        builder.HasIndex(b => b.CreatedAt);

        // =========================
        // Constraints
        // =========================
        builder.HasCheckConstraint(
            "CK_book_state",
            "`state` >= 0 AND `state` <= 4");

        // =========================
        // Relationships
        // =========================

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
