using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

namespace TomatoNovel.Infrastructure.Persistence.Configurations;

/// <summary>
/// Configures the Favorite entity for Entity Framework Core.
/// </summary>
public class FavoriteConfiguration : IEntityTypeConfiguration<Favorite>
{
    /// <inheritdoc />
    public void Configure(EntityTypeBuilder<Favorite> builder)
    {
        // Table name
        builder.ToTable("favorite");

        // Primary key
        builder.HasKey(f => f.Id);

        // Properties
        builder.Property(f => f.UserId)
            .IsRequired();

        builder.Property(f => f.BookId)
            .IsRequired();

        builder.Property(f => f.CreatedAt)
            .HasColumnType("datetime");

        // Unique constraint: one user cannot favorite the same book twice
        builder.HasIndex(f => new { f.UserId, f.BookId })
            .IsUnique()
            .HasDatabaseName("uniq_favorite");

        // -------------------------
        // Navigation properties
        // -------------------------

        // Favorite → User (many favorites belong to one user)
        builder.HasOne(f => f.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Favorite → Book (many favorites belong to one book)
        builder.HasOne(f => f.Book)
            .WithMany(b => b.Favorites)
            .HasForeignKey(f => f.BookId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
