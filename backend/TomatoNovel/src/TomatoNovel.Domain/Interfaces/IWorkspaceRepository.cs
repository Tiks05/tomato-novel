namespace TomatoNovel.Domain.Interfaces;

using TomatoNovel.Domain.Entities;

public interface IWorkspaceRepository
{
    User GetUser(long userId);

    public void UpdateAuthor(
        User user,
        Stream? avatarStream,
        string? avatarUuid);

    IEnumerable<Book> GetBooksByUser(int userId);

    Book GetBook(int bookId);

    void AddBook(
        Book book,
        Stream? coverStream,
        string? coverUuid);

    void UpdateBook(
        Book book,
        Stream? coverStream,
        string? coverUuid);

    IEnumerable<News> GetNotices(int limit);

    IEnumerable<News> GetNews(int limit);

    IEnumerable<Book> GetRankBooks(string readerType, string category);

    IEnumerable<Volume> GetVolumesByBook(int bookId);

    /// <summary>
    /// Get all chapters under a specific volume.
    /// </summary>
    /// <param name="volumeId">Volume identifier</param>
    /// <returns>List of chapters</returns>
    IEnumerable<Chapter> GetChaptersByVolume(int volumeId);

    IEnumerable<Chapter> GetChaptersByBook(int bookId);

    Volume? GetLastVolume(int bookId);

    Chapter? GetLastChapterByVolume(int volumeId);

    Chapter? GetLatestChapterByBook(int bookId);

    Chapter? GetChapter(int chapterId);

    Volume? GetVolume(int volumeId);

    void RemoveBook(Book book);

    void AddVolume(Volume volume);

    void RemoveVolume(Volume volume);

    void AddChapter(Chapter chapter);

    void RemoveChapter(Chapter chapter);

    int CountMessages(int userId, string? type);

    List<Message> GetMessages(
        int userId,
        string? type,
        int page,
        int pageSize);

    void MarkMessagesAsRead(List<int> messageIds);

    void SaveChanges();
}
