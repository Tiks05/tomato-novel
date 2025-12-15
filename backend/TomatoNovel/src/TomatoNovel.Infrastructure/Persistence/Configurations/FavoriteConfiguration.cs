namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Favorite entity for Entity Framework Core.
/// </summary>
public class FavoriteConfiguration : IEntityTypeConfiguration<Favorite>
{
    public void Configure(EntityTypeBuilder<Favorite> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("favorite");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(f => f.Id);

        builder.Property(f => f.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Keys
        // =========================

        builder.Property(f => f.UserId)
               .HasColumnName("user_id")
               .IsRequired();

        builder.Property(f => f.BookId)
               .HasColumnName("book_id")
               .IsRequired();

        // =========================
        // Properties
        // =========================

        builder.Property(f => f.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetime");

        // =========================
        // Indexes
        // =========================

        // 一个用户不能重复收藏同一本书
        builder.HasIndex(f => new { f.UserId, f.BookId })
               .IsUnique()
               .HasDatabaseName("uniq_favorite");

        builder.HasIndex(f => f.UserId);
        builder.HasIndex(f => f.BookId);

        // =========================
        // Relationships
        // =========================

        // Favorite → User (N:1)
        builder.HasOne(f => f.User)
               .WithMany(u => u.Favorites)
               .HasForeignKey(f => f.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        // Favorite → Book (N:1)
        builder.HasOne(f => f.Book)
               .WithMany(b => b.Favorites)
               .HasForeignKey(f => f.BookId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
