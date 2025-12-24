namespace TomatoNovel.Application.Interfaces;

using TomatoNovel.Application.DTOs.Workspace.Requests;
using TomatoNovel.Application.DTOs.Workspace.Responses;

public interface IWorkspaceService
{
    AuthorApplyResponseDto ApplyAuthor(
        long userId,
        string name,
        string introduction,
        Stream? avatarStream);

    WriterStatsResponseDto GetWriterStats(int userId);

    NoticeListResponseDto GetNoticeList(int limit);

    NewsListResponseDto GetNewsList(int limit);

    BookRankResponseDto GetBookRank(string readerType, string category);

    void CreateBook(
        long userId,
        string name,
        int readerType,
        string tag,
        string hero1,
        string hero2,
        string introduction,
        Stream? coverStream);

    MyBookListResponseDto GetMyBookList(MyBookListRequestDto request);

    BookDetailResponseDto GetBookDetail(int bookId);

    void DeleteBook(int bookId);

    void UpdateBook(
        long userId,
        string name,
        int readerType,
        string tag,
        string hero1,
        string hero2,
        string introduction,
        Stream? coverStream);

    LastChapterInfoResponseDto GetLastChapterInfo(int bookId);

    void CreateChapter(ChapterCreateRequestDto request);

    ChapterListResponseDto GetChapterList(ChapterListRequestDto request);

    void DeleteChapter(int chapterId);

    void UpdateChapter(ChapterUpdateRequestDto request);

    ChapterDetailResponseDto GetChapterDetail(int bookId, int chapterId);

    void DeleteVolume(int bookId, int volumeId);

    void UpdateVolume(int volumeId, int bookId, string title);

    void CreateVolume(int bookId, string title, int sort);

    LastChapterResponseDto GetLastChapterByBook(int bookId);

    LastChapterResponseDto GetLastChapterByVolume(int bookId, int volumeId);

    LatestChapterResponseDto GetLatestChapter(int bookId);

    MessagesResponseDto GetUserMessages(GetUserMessagesRequestDto request);

    void MarkMessagesAsRead(MarkMessagesAsReadRequestDto request);
}
