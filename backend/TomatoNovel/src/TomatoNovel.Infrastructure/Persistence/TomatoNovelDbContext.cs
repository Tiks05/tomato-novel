using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using System.Reflection;

namespace TomatoNovel.Infrastructure.Persistence;

/// <summary>
/// Represents the Entity Framework database context for the TomatoNovel application.
/// </summary>
public class TomatoNovelDbContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the <see cref="TomatoNovelDbContext"/> class.
    /// </summary>
    /// <param name="options">The database context options.</param>
    public TomatoNovelDbContext(DbContextOptions<TomatoNovelDbContext> options)
        : base(options)
    {
    }

    // -------------------------
    // DbSet definitions
    // -------------------------

    /// <summary>
    /// Gets or sets the user entity set.
    /// </summary>
    public DbSet<User> Users { get; set; } = default!;

    /// <summary>
    /// Gets or sets the book entity set.
    /// </summary>
    public DbSet<Book> Books { get; set; } = default!;

    /// <summary>
    /// Gets or sets the volume entity set.
    /// </summary>
    public DbSet<Volume> Volumes { get; set; } = default!;

    /// <summary>
    /// Gets or sets the chapter entity set.
    /// </summary>
    public DbSet<Chapter> Chapters { get; set; } = default!;

    /// <summary>
    /// Gets or sets the comment entity set.
    /// </summary>
    public DbSet<Comment> Comments { get; set; } = default!;

    /// <summary>
    /// Gets or sets the favorite entity set.
    /// </summary>
    public DbSet<Favorite> Favorites { get; set; } = default!;

    /// <summary>
    /// Gets or sets the follow entity set.
    /// </summary>
    public DbSet<Follow> Follows { get; set; } = default!;

    /// <summary>
    /// Gets or sets the classroom entity set.
    /// </summary>
    public DbSet<Classroom> Classrooms { get; set; } = default!;

    /// <summary>
    /// Gets or sets the news entity set.
    /// </summary>
    public DbSet<News> News { get; set; } = default!;

    // -------------------------
    // Model configuration
    // -------------------------

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all IEntityTypeConfiguration<T> automatically from the assembly.
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
