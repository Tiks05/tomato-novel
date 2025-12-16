namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface IBookInfoRepository
{
    Book? GetBook(int bookId);

    Book? GetBookWithAuthor(int bookId);

    List<Volume> GetVolumesWithChapters(int bookId);

    Chapter? GetLatestChapter(int bookId);

    int GetTotalWordCount(int bookId);

    Volume? GetVolumeByBookAndSort(int bookId, int sort);

    Chapter? GetChapter(int volumeId, int chapterNum);

    Chapter? GetPrevChapter(int volumeId, int chapterNum);

    Chapter? GetNextChapter(int volumeId, int chapterNum);
}
