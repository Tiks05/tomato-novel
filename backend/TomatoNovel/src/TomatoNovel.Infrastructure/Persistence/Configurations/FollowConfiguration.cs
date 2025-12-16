namespace TomatoNovel.Infrastructure.Persistence.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TomatoNovel.Domain.Entities;

/// <summary>
/// Configures the Follow entity for Entity Framework Core.
/// </summary>
public class FollowConfiguration : IEntityTypeConfiguration<Follow>
{
    public void Configure(EntityTypeBuilder<Follow> builder)
    {
        // =========================
        // Table
        // =========================
        builder.ToTable("follow");

        // =========================
        // Primary Key
        // =========================
        builder.HasKey(f => f.Id);

        builder.Property(f => f.Id)
               .HasColumnName("id");

        // =========================
        // Foreign Keys
        // =========================
        builder.Property(f => f.FollowerId)
               .HasColumnName("follower_id")
               .IsRequired();

        builder.Property(f => f.FollowedId)
               .HasColumnName("followed_id")
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

        // 一个用户不能重复关注同一个用户
        builder.HasIndex(f => new { f.FollowerId, f.FollowedId })
               .IsUnique()
               .HasDatabaseName("uniq_follow");

        builder.HasIndex(f => f.FollowerId);
        builder.HasIndex(f => f.FollowedId);

        // =========================
        // Relationships
        // =========================

        // Follow → Follower（发起关注的人）
        builder.HasOne(f => f.Follower)
               .WithMany(u => u.Follows)
               .HasForeignKey(f => f.FollowerId)
               .OnDelete(DeleteBehavior.Cascade);

        // Follow → Followed（被关注的人，无反向集合）
        builder.HasOne(f => f.Followed)
               .WithMany()
               .HasForeignKey(f => f.FollowedId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
