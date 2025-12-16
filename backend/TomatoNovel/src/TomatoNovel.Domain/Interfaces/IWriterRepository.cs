namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface IWriterRepository
{
    List<News> GetNewsByType(string type, int limit);

    List<Classroom> GetClassroomsByCategory(string? categoryType);
}
