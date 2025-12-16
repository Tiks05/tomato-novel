namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface IWriterInfoRepository
{
    User? GetAuthorById(int writerId);

    List<Book> GetBooksByAuthorId(int writerId);

    int GetTotalBookWordCount(int writerId);

    int GetMaxChapterNum(int bookId);

    string? GetMaxChapterTitle(int bookId, int maxChapterNum);

    int GetTotalChapterWordCount(int bookId);
}
