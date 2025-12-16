namespace TomatoNovel.Infrastructure.Repositories;

using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class WriterRepository : IWriterRepository
{
    private readonly TomatoNovelDbContext dbContext;

    public WriterRepository(TomatoNovelDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public List<News> GetNewsByType(string type, int limit)
    {
        return this.dbContext.News
            .Where(n => n.Type == type)
            .OrderByDescending(n => n.UpdatedAt)
            .Take(limit)
            .ToList();
    }

    public List<Classroom> GetClassroomsByCategory(string? categoryType)
    {
        var query = this.dbContext.Classrooms.AsQueryable();

        if (!string.IsNullOrWhiteSpace(categoryType))
        {
            query = query.Where(c => c.CategoryType == categoryType);
        }

        return query
            .OrderByDescending(c => c.CreateAt)
            .Take(10)
            .ToList();
    }
}
