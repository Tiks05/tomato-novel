namespace TomatoNovel.Domain.Interfaces;

public interface IHomeRepository
{
    // Top Books
    List<(int Id, string Title, string? Tags, string? CoverUrl)>
        GetTopBooks();

    // News
    List<(int Id, string Title)>
        GetNewsList(int limit);

    // Writers
    List<(int Id,
            string Nickname,
            string? Masterpiece,
            string AuthorLevel,
            string? LifePhoto)>
        GetWriterList();

    // Recommend (男女推荐书籍的最小信息)
    (List<(int Id,
            string Title,
            string Intro,
            string? CoverUrl,
            string AuthorNickname)> Male,
        List<(int Id,
            string Title,
            string Intro,
            string? CoverUrl,
            string AuthorNickname)> Female)
        GetRecommendBooks();

    // Ranking
    (List<(int Id,
            string Title,
            string Intro,
            string? CoverUrl,
            string AuthorNickname)> Hot,
        List<(int Id,
            string Title,
            string Intro,
            string? CoverUrl,
            string AuthorNickname)> Newest)
        GetRanking(string readerType, string plotType);

    // Recent Updates
    List<(string PlotType,
            string BookTitle,
            int BookId,
            string ChapterTitle,
            string AuthorNickname,
            DateTime UpdatedAt)>
        GetRecentUpdates(int limit);
}
