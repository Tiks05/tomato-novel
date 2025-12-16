namespace TomatoNovel.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using TomatoNovel.Domain.Entities;
using TomatoNovel.Domain.Interfaces;
using TomatoNovel.Infrastructure.Persistence;

public class LibraryRepository : ILibraryRepository
{
    private readonly TomatoNovelDbContext dbContext;

    public LibraryRepository(TomatoNovelDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public IQueryable<Book> QueryBooks()
    {
        return this.dbContext.Books
            .AsNoTracking()
            .Include(b => b.Author);
    }
}
