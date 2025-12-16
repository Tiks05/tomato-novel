namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface ILibraryRepository
{
    IQueryable<Book> QueryBooks();
}
